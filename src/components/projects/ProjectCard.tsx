import { JSX } from 'react';

import { ProjectCardProps } from '#/types';
import { cn } from '#/utils';
import ProjectCardFooter from './ProjectCardFooter';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardOwner from './ProjectCardOwner';
import ProjectCardTeamMembers from './ProjectCardTeamMembers';

/**
 * Displays a project card with team members, owner info, and creation dates.
 * Shows project details in a card format with hover effects and member avatars.
 */
const ProjectCard = ({ project, onClick, className = '' }: ProjectCardProps): JSX.Element => {
  const { name, description, createdAt, updatedAt, owner, members = [] } = project || {};

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
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/30 transition-all duration-300 pointer-events-none' />
      <ProjectCardHeader name={name} description={description} />
      <ProjectCardOwner owner={owner} />
      <ProjectCardTeamMembers members={members} />
      <ProjectCardFooter createdAt={createdAt} updatedAt={updatedAt} />
    </div>
  );
};

export default ProjectCard;
