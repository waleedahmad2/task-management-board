import { JSX } from 'react';

import { Calendar, User } from 'lucide-react';

import { STATUS_COLORS } from '#/constants';
import { Project, ProjectStatus } from '#/types';
import { formatDate } from '#/utils';
import MemberAvatar from './MemberAvatar';

export type ColumnType = 'name' | 'owner' | 'members' | 'createdAt' | 'updatedAt' | 'status';

interface ProjectTableColumnProps {
  project: Project;
  columnType: ColumnType;
}

const getStatusColor = (status: ProjectStatus): string => {
  return STATUS_COLORS[status] || STATUS_COLORS.archived;
};

const ProjectTableColumn = ({ project, columnType }: ProjectTableColumnProps): JSX.Element => {
  const renderColumn = (): JSX.Element => {
    switch (columnType) {
      case 'name': {
        const { name, description } = project || {};
        return (
          <div>
            <div className='text-sm font-medium text-gray-900'>{name}</div>
            <div className='text-sm text-gray-500 line-clamp-1'>{description}</div>
          </div>
        );
      }

      case 'owner': {
        const { owner } = project || {};
        const { name, email, avatar } = owner || {};
        return (
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mr-3'>
              {avatar ? (
                <img src={avatar} alt={name} className='w-full h-full rounded-full object-cover' />
              ) : (
                <User className='w-4 h-4 text-indigo-600' />
              )}
            </div>
            <div>
              <div className='text-sm font-medium text-gray-900'>{name}</div>
              <div className='text-xs text-gray-500'>{email}</div>
            </div>
          </div>
        );
      }

      case 'members': {
        const { members = [] } = project || {};
        const visibleMembers = members?.slice(0, 3) || [];
        const remainingCount = members?.length - 3 || 0;
        return (
          <div className='flex items-center'>
            <div className='flex -space-x-2 mr-3'>
              {visibleMembers.map((member, index) => (
                <MemberAvatar key={member?.id} member={member} index={index} showTooltip={true} size='sm' />
              ))}
            </div>
            {remainingCount > 0 && <span className='text-xs text-gray-500'>+{remainingCount} more</span>}
          </div>
        );
      }

      case 'createdAt': {
        const { createdAt } = project || {};
        return (
          <div className='flex items-center text-sm text-gray-500'>
            <Calendar className='w-4 h-4 mr-2' />
            {formatDate(createdAt)}
          </div>
        );
      }

      case 'updatedAt': {
        const { updatedAt } = project || {};
        return <div className='text-sm text-gray-500'>{formatDate(updatedAt)}</div>;
      }

      case 'status': {
        const { status } = project || {};
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full border capitalize ${getStatusColor(status)}`}>
            {status}
          </span>
        );
      }

      default:
        return <div>Unknown column type</div>;
    }
  };

  return renderColumn();
};

export default ProjectTableColumn;
