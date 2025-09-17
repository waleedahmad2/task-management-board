import { JSX } from 'react';

import { Users } from 'lucide-react';

import { ProjectMember } from '#/types';
import MemberAvatar from './MemberAvatar';

interface ProjectCardTeamMembersProps {
  members: ProjectMember[];
  className?: string;
}

/**
 * Displays team members section with avatars and count
 */
const ProjectCardTeamMembers = ({ members = [], className = '' }: ProjectCardTeamMembersProps): JSX.Element => {
  const membersCount = members.length;
  const visibleMembers = members.slice(0, 5);
  const remainingCount = membersCount - 5;

  return (
    <div className={`mb-5 relative z-10 ${className}`}>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center'>
          <Users className='w-4 h-4 text-gray-500 mr-2' />
          <span className='text-sm font-semibold text-gray-700'>Team Members</span>
          <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full'>
            {membersCount}
          </span>
        </div>
      </div>

      <div className='flex items-center'>
        <div className='flex -space-x-3'>
          {visibleMembers.map((member, index) => (
            <MemberAvatar key={member?.id} member={member} index={index} showTooltip={true} size='md' />
          ))}
        </div>

        {remainingCount > 0 && (
          <div className='ml-4 flex items-center'>
            <div className='w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold border-2 border-white shadow-sm'>
              +{remainingCount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCardTeamMembers;
