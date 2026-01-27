'use client';

import React from 'react';

export interface TeamOnLeaveMember {
  name: string;
  department: string;
  dates: string;
  avatar: string;
  useAvatarUrl: boolean;
}

export interface TeamOnLeaveProps {
  members: TeamOnLeaveMember[];
}

const TeamOnLeave = ({ members }: TeamOnLeaveProps) => {
  return (
    <div className='bg-card p-6 border border-border rounded-lg'>
      <h2 className='mb-4 font-bold text-card-foreground text-xl'>
        Team on Leave
      </h2>
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
        {members.map((member, index) => (
          <div
            key={member.name + index}
            className='flex items-center gap-4 bg-muted p-4 rounded-lg'
          >
            {member.useAvatarUrl ? (
              <img
                src={member.avatar}
                alt={member.name}
                className='rounded-full w-12 h-12 object-cover'
              />
            ) : (
              <div className='flex justify-center items-center bg-gradient-to-br from-primary to-primary/80 rounded-full w-12 h-12 font-semibold text-primary-foreground text-sm'>
                {member.avatar}
              </div>
            )}
            <div className='flex-1'>
              <p className='font-medium text-card-foreground'>
                {member.name}
              </p>
              <p className='text-muted-foreground text-sm'>
                {member.department}
              </p>
              <p className='mt-1 text-muted-foreground text-xs'>
                {member.dates}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamOnLeave;
