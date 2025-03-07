import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Card, CardHeader, CardBody, Accordion, AccordionItem, Tab, Tabs, Chip, Spinner, DrawerFooter } from "@heroui/react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import FeaturedBadge from "./featured,badge";
import DownloadAndEmailPDF from "./DownloadPDFButton";
import EvaluationTable from "./EvaluationTable";
import EvaluationChart from "./EvaluationChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);
ChartJS.register(ArcElement, Tooltip, Legend);

export const ViewResultDrawer: React.FC<{ isOpen: boolean; onClose: () => void; interviewerData: any }> = ({ isOpen, onClose, interviewerData }) => {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onClose} size='3xl'>
      <DrawerContent>
        <DrawerHeader className='w-full'>
          <Card className='w-full'>
            <CardBody className='p-0 w-full'>
              <FeaturedBadge weight={interviewerData?.overallWeight} />
              <div className='grid grid-cols-12 gap-4 p-5 w-full'>
                <div className='col-span-9'>
                  <p className='text-sm font-semibold'>{interviewerData?.name}</p>
                  <p className='text-sm text-gray-400'>{interviewerData?.jobTitle}</p>
                </div>
                <div className='col-span-3 flex justify-end items-start'>
                  <div>
                    <p className='rounded-lg text-sky-500 text-sm py-1 px-3 center'>Overall Score </p>
                    <p className='rounded-lg text-sky-500 font-bold bg-sky-100 py-1 px-3 text-sm text-center'>{((interviewerData?.overallWeight / 30) * 100).toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </DrawerHeader>

        <DrawerBody>
          <Tabs aria-label='Options'>
            <Tab key='overallresult' title='Overall Result'>
              <EvaluationChart data={interviewerData}></EvaluationChart>
              <EvaluationTable data={interviewerData} />
              <Card className='p-2 mt-6 w-full'>
                <CardHeader className='text-sm font-semibold'>Feedabck</CardHeader>
                <CardBody className='  w-full'>
                  <ul className='list-disc list-inside space-y-2'>
                    {interviewerData?.notes?.summary?.map((item, index) => (
                      <li key={index} className='text-gray-700 text-sm'>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </DrawerBody>
        <DrawerFooter>
          <DownloadAndEmailPDF result={interviewerData} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
