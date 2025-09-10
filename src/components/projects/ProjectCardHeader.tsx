import { JSX } from 'react';

import { cn } from '#/utils';

/**
 * Props for ProjectCardHeader component
 */
interface ProjectCardHeaderProps {
  name: string;
  description: string;
  className?: string;
}

/**
 * Project card header component with title, description and status
 */
const ProjectCardHeader = ({ name, description, className = '' }: ProjectCardHeaderProps): JSX.Element => (
  <div className={cn('flex items-start justify-between mb-5 relative z-10', className)}>
    <div className='flex-1 pr-4'>
      <h3 className='text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors duration-200'>
        {name}
      </h3>
      <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed'>{description}</p>
    </div>
  </div>
);

export default ProjectCardHeader;
