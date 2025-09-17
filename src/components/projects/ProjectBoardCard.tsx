import { JSX, useCallback } from 'react';

import { Project } from '#/types';

interface ProjectBoardCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
}

export const ProjectBoardCard = ({ project, onProjectClick }: ProjectBoardCardProps): JSX.Element => {
  const handleProjectClick = useCallback((): void => {
    onProjectClick(project);
  }, [onProjectClick, project]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      key={project.id}
      onClick={handleProjectClick}
      className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 cursor-pointer transition-all duration-200 group'
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
            {project.name}
          </h3>
          {project.description && <p className='text-sm text-gray-600 mt-1 line-clamp-2'>{project.description}</p>}
        </div>
        <div className='ml-2'>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusConfig(project.status)}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between text-sm text-gray-500'>
        <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
        <div className='flex items-center space-x-1'>
          <span>👥</span>
          <span>{project.members?.length || 0}</span>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-gray-100'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-500'>Click to open board</span>
          <span className='text-blue-600 group-hover:text-blue-700'>→</span>
        </div>
      </div>
    </div>
  );
};
