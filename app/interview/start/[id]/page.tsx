"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@heroui/react";
import {
  AiOutlineAudio,
  AiOutlineClockCircle,
  AiOutlinePlayCircle,
  AiTwotoneRocket,
} from "react-icons/ai";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getInvitationDetails } from "@/services/invitation.service";
import InterviewCard from "./component/interview.card";
import InterviewCardLoading from "./component/interview.card.loading";
import Image from "next/image";
import AudioRecorder from "@/components/AudioRecorder";
import { startInterview } from "@/services/interview.service";
import ThankYou from "./component/thankyou";
import InterviewExpired from "./component/interview.expired";

export interface Question {
  id: string;
  text: string;
  audioUrl: string;
  isQuestion: boolean;
}
export default function InterviewPage() {
  const { id } = useParams();

  const [currentTime, setCurrentTime] = useState("11:07:14 AM");
  const [isStarted, setStart] = useState(false);
  const [isExpiredOrCompleted, setExpiredOrCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startingInterview, setStartingInterview] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showReplayButton, setShowReplayButton] = useState(false);
  const [recordedQuestions, setRecordedQuestions] = useState<number[]>([]); // Track completed recordings

  const handleRecordingComplete = (questionId: number): void => {
    setRecordedQuestions((prev) => [...prev, questionId]);
    setShowReplayButton(false);
  };

  const [invitationDetails, setInvitationDetails] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const handleNextQuestion = (): void => {
    setShowReplayButton(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setHasAnswered(false);
      const audioUrl = questions[currentQuestionIndex]?.audioUrl;
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
        audio.addEventListener("ended", () => {
          setShowReplayButton(true);
        });
      }
    }
  };

  const readWelcomeMessage = () => {
    const audio = new Audio(invitationDetails.job.welcomeAudioUrl);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });

    audio.addEventListener("ended", () => {
      setCurrentQuestionIndex(0);
      const firstQuestion = new Audio(questions[0].audioUrl);
      firstQuestion.play();
    });
  };

  const fetchInvitationDetails = async () => {
    if (!id) return;
    try {
      const data = await getInvitationDetails(id as string);

      setInvitationDetails(data);
      if (data.status === "started") {
        setStart(true);
      } else if (data.status === "completed" || data.status === "expired") {
        setExpiredOrCompleted(true);
      } else if (data.status === "pending") {
        setShowWelcomeMessage(true);
      }

      setQuestions(data.job.questions || []);
    } catch (error) {
      console.error("Error fetching invitation details:", error);
    }
  };

  const handleStartInterview = async () => {
    setStartingInterview(true); // Show the loading spinner
    try {
      const invitationId = id as string;
      await startInterview({ invitationId });
      setStart(true);
    } catch (error) {
      console.error("Error starting the interview:", error);
    } finally {
      setStartingInterview(false); // Hide the loading spinner
    }
  };

  useEffect(() => {
    fetchInvitationDetails();
  }, [id, isStarted]);

  if (!invitationDetails) {
    return <InterviewCardLoading />;
  }

  const { candidateName, candidateEmail, job, company } = invitationDetails;

  if (recordedQuestions.length === questions.length) {
    return <ThankYou invitationDetails={invitationDetails} />;
  }

  return (
    <>
      {isStarted && !isExpiredOrCompleted && (
        <div className="min-h-screen bg-gray-100">
          <Navbar maxWidth="full">
            <NavbarBrand>
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  width={100}
                  height={40}
                />
              ) : (
                <p className="font-bold text-inherit">{company.name}</p>
              )}
            </NavbarBrand>

            <NavbarContent justify="end">
              <NavbarItem>
                <div className="flex items-center gap-2">
                  <AiOutlineClockCircle />
                  <span>{currentTime}</span>
                </div>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <main className="max-w-7xl mx-auto px-6 py-8">
            <Card className="p-8" shadow="none">
              <CardHeader className="justify-between mb-10">
                <div className="flex gap-5">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      <span className="text-small tracking-tight text-default-400">
                        Hello,
                      </span>{" "}
                      {candidateName}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      {candidateEmail}
                    </h5>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold">
                    <span className="text-gray-400 text-sm font-weight: 100 ">
                      Interviewing Position:
                    </span>{" "}
                    {job.jobTitle}
                  </h3>
                  <h3 className="text-md font-semibold">
                    <span className="text-gray-400 text-sm font-weight: 100 ">
                      Company:
                    </span>{" "}
                    {company.name}
                  </h3>
                </div>
              </CardHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="py-4" shadow="sm">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                      Questions # {1 + currentQuestionIndex} of {10}
                    </p>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <div>
                      <blockquote className="border px-4 my-6 py-3 rounded-xl [&>p]:m-0 border-default-200 dark:border-default-100 bg-default-200/20">
                        {currentQuestionIndex != -1 &&
                          questions[currentQuestionIndex]?.text}

                        {currentQuestionIndex == -1 &&
                          invitationDetails.job.welcomeMessage}
                      </blockquote>
                      <div className="flex items-center space-x-4">
                        {showReplayButton && (
                          <Button
                            size="sm"
                            color="primary"
                            endContent={<AiOutlinePlayCircle />}
                            onPress={() => {
                              const audio = new Audio(
                                questions[currentQuestionIndex]?.audioUrl
                              );
                              audio.play();
                            }}
                          >
                            Replay
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="absolute  bottom-0 z-10 border-1">
                    <div className="flex flex-grow gap-2 items-center">
                      {currentQuestionIndex != -1 && (
                        <AudioRecorder
                          onRecordingComplete={handleRecordingComplete} // Pass this callback
                          currentQuestion={questions[currentQuestionIndex]}
                          invitationId={id as string}
                          hasAnswered={hasAnswered}
                          setHasAnswered={setHasAnswered}
                          onNextQuestion={handleNextQuestion}
                        />
                      )}

                      {currentQuestionIndex == -1 && (
                        <Button
                          endContent={<AiTwotoneRocket />}
                          color="danger"
                          variant="bordered"
                          onPress={() => readWelcomeMessage()}
                        >
                          Start Interview
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>

                {/* Candidate Section */}
                <div className="flex flex-col gap-6">
                  <Card className="py-4" shadow="sm">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <p className="text-tiny uppercase font-bold">Video</p>
                    </CardHeader>
                    <CardBody>
                      <div className="w-full aspect-video bg-black rounded-lg"></div>
                    </CardBody>
                  </Card>
                  <Card className="py-4" shadow="sm">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <p className="text-tiny uppercase font-bold">
                        INTERVIWER
                      </p>
                    </CardHeader>
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src={invitationDetails.interviewer.photoUrl}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {invitationDetails.interviewer.name}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            {invitationDetails.interviewer.jobTitle}
                          </h5>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">
                      <p>{invitationDetails.interviewer.biography}</p>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Card>
          </main>
        </div>
      )}
      {!isStarted && !isExpiredOrCompleted && (
        <InterviewCard
          loading={startingInterview}
          onStartButtonClick={handleStartInterview}
          invitationDetails={invitationDetails}
        />
      )}
      {currentQuestionIndex > questions.length - 1 && (
        <ThankYou invitationDetails={invitationDetails} />
      )}
      {isExpiredOrCompleted && <InterviewExpired />}
    </>
  );
}
