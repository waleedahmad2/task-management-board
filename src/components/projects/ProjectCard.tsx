import { JSX } from 'react';

import { Users } from 'lucide-react';

import { ProjectCardProps } from '#/types';
import { cn } from '#/utils';
import MemberAvatar from './MemberAvatar';
import ProjectCardFooter from './ProjectCardFooter';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardOwner from './ProjectCardOwner';

/**
 * Project card component displaying project information and members
 */
const ProjectCard = ({ project, onClick, className = '' }: ProjectCardProps): JSX.Element => {
  const { name, description, createdAt, updatedAt, owner, members } = project;

  const handleClick = (): void => {
    onClick?.(project);
  };

  return (
    <div
      className={cn(
        'group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer relative overflow-hidden',
        className
      )}
      onClick={handleClick}
    >
      {/* Gradient overlay on hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/30 transition-all duration-300 pointer-events-none' />

      {/* Action menu */}

      {/* Header with title and status */}
      <ProjectCardHeader name={name} description={description} />

      {/* Owner info */}
      <ProjectCardOwner owner={owner} />

      {/* Members section */}
      <div className='mb-5 relative z-10'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center'>
            <Users className='w-4 h-4 text-gray-500 mr-2' />
            <span className='text-sm font-semibold text-gray-700'>Team Members</span>
            <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full'>
              {members.length}
            </span>
          </div>
        </div>

        {/* Member avatars with enhanced z-index stacking */}
        <div className='flex items-center'>
          <div className='flex -space-x-3'>
            {members.slice(0, 5).map((member, index) => (
              <MemberAvatar key={member.id} member={member} index={index} showTooltip={true} size='md' />
            ))}
          </div>

          {/* Enhanced "more members" indicator */}
          {members.length > 5 && (
            <div className='ml-4 flex items-center'>
              <div className='w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold border-2 border-white shadow-sm'>
                +{members.length - 5}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced footer with dates */}
      <ProjectCardFooter createdAt={createdAt} updatedAt={updatedAt} />
    </div>
  );
};

export default ProjectCard;
