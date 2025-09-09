import { JSX } from 'react';

import ProjectCardSkeleton from './ProjectCardSkeleton';

/**
 * Props for ProjectListingSkeleton component
 */
interface ProjectListingSkeletonProps {
  count?: number;
  className?: string;
}

/**
 * Skeleton loader for project listing grid
 */
const ProjectListingSkeleton = ({ count = 6, className = '' }: ProjectListingSkeletonProps): JSX.Element => (
  <div className={`px-8 pb-8 ${className}`}>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default ProjectListingSkeleton;
