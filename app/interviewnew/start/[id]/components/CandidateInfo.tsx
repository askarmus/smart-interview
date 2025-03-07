import { Avatar } from "@heroui/react";
import React from "react";
import { AiOutlineBank, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

const CandidateInfo: React.FC<any> = ({ candidate, job, company }) => {
  return (
    <div className='w-full mb-10'>
      <dl className='grid grid-cols-1 lg:grid-cols-3'>
        <div className=' flex max-w-xs flex-col  '>
          <div className='flex items-center gap-3 w-full sm:w-auto'>
            <Avatar name='XZ' className='w-12 h-12 text-lg' color='primary' />
            <div>
              <h2 className='text-lg font-semibold'>Hello, {candidate.name}</h2>
              <div className='flex items-center text-gray-500 text-sm gap-1'>
                <AiOutlineMail className='w-4 h-4' />
                <span> {candidate.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className=' flex max-w-xs flex-col'>
          <p className='text-gray-400 text-sm'>Interviewing Position</p>
          <div className='flex items-center gap-1   font-semibold'>
            <AiOutlineUser className='w-4 h-4' />
            <span>{job.jobTitle}</span>
          </div>
        </div>
        <div className=' flex max-w-xs flex-col  '>
          <p className='text-gray-400 text-sm'>Company</p>
          <div className='flex items-center gap-1 font-semibold'>
            <AiOutlineBank className='w-4 h-4' />
            <span>{company.name}</span>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default CandidateInfo;
