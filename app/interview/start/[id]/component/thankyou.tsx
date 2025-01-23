import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Navbar,
  NavbarBrand,
} from "@heroui/react";
import React, { useState } from "react";
import { InvitationDetails } from "../interface/invitation.detail.int";
import Image from "next/image";

interface InterviewCardProps {
  invitationDetails: InvitationDetails;
}

const ThankYou: React.FC<InterviewCardProps> = ({ invitationDetails }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar maxWidth="full">
        <NavbarBrand>
          {invitationDetails.company.logo ? (
            <Image
              src={invitationDetails.company.logo}
              width={100}
              height={50}
              alt={`${invitationDetails.company.name} Logo`}
            />
          ) : (
            <p className="font-bold text-inherit">
              {invitationDetails.company.name}
            </p>
          )}
        </NavbarBrand>
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
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  askarmus@gmail.com
                </h5>
              </div>
            </div>
            <div>
              <h3 className="text-xxl font-semibold">
                <span className="text-gray-400  font-semibold ">
                  Intterviwing Position:
                </span>{" "}
                Senior Softwar Enginner
              </h3>
              <p className="text-gray-500">Acme Corporation</p>
            </div>
          </CardHeader>

          <CardBody>
            <div className="text-tiny uppercase font-bold mb-5">
              Thank you for completing the online interview. We will review your
              responses and get back to you once we are satisfied with the
              evaluation. We appreciate your time and effort!
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
};

export default ThankYou;
