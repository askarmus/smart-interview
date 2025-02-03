import { Button } from "@heroui/react";
import React, { useState, useRef, useEffect } from "react";
import { AiFillStepForward, AiOutlineAudio } from "react-icons/ai";

interface AudioRecorderProps {
  hasAnswered: boolean;
  setHasAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  onNextQuestion: () => void;
  currentQuestion: any;
  invitationId: string;
  onRecordingComplete: (questionId: string) => void;
  onAudioRecorded: (file: File, startTime: Date, endTime: Date) => void; // Move audio upload to parent
  onStopRecording?: () => void; // Optional prop for stopping recording externally
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  hasAnswered,
  setHasAnswered,
  onNextQuestion,
  onAudioRecorded,
  onStopRecording,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [startTime, setStartTime] = useState<Date>(new Date());

  useEffect(() => {
    if (hasAnswered) {
      setIsRecording(false);
    }
  }, [hasAnswered]);

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const file = new File([blob], `recording-${Date.now()}.webm`, {
          type: "audio/webm",
        });

        onAudioRecorded(file, startTime, new Date()); // Call parent function
        setHasAnswered(true);
      };

      mediaRecorderRef.current.start();
      setStartTime(new Date());
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);

    // Call optional stopRecording function from parent if provided
    if (onStopRecording) {
      onStopRecording();
    }
  };

  const handleAnswerClick = (): void => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleNextQuestion = (): void => {
    setHasAnswered(false);
    onNextQuestion();
  };

  return (
    <div>
      {!hasAnswered ? (
        <>
          <Button
            color="danger"
            variant="bordered"
            endContent={
              !isRecording ? (
                <AiOutlineAudio />
              ) : (
                <span className="recording"></span>
              )
            }
            onPress={handleAnswerClick}
          >
            {isRecording ? "Stop Recording" : "Answer"}
          </Button>
        </>
      ) : (
        <Button
          color="danger"
          variant="bordered"
          endContent={<AiFillStepForward />}
          onPress={handleNextQuestion}
        >
          Next Question
        </Button>
      )}
    </div>
  );
};

export default AudioRecorder;
