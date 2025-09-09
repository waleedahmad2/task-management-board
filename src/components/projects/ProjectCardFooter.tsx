import { JSX } from 'react';

import { formatDate } from '#/utils';

/**
 * Props for ProjectCardFooter component
 */
interface ProjectCardFooterProps {
  createdAt: string;
  updatedAt: string;
  className?: string;
}

/**
 * Project card footer component displaying creation and update dates
 */
const ProjectCardFooter = ({ updatedAt, className = '' }: ProjectCardFooterProps): JSX.Element => (
  <div
    className={`flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 relative z-10 ${className}`}
  >
    <div className='flex items-center'>
      <span className='font-medium'> Last Updated: {formatDate(updatedAt)}</span>
    </div>
  </div>
);

export default ProjectCardFooter;
