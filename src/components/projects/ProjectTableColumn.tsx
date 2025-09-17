import { JSX } from 'react';

import { Calendar, User } from 'lucide-react';

import { STATUS_COLORS, PROJECT_COLUMN_TYPES, PROJECT_TABLE_CONFIG, type ProjectColumnType } from '#/constants';
import { Project, ProjectStatus } from '#/types';
import { formatDate } from '#/utils';
import MemberAvatar from './MemberAvatar';

interface ProjectTableColumnProps {
  project: Project;
  columnType: ProjectColumnType;
}

const getStatusColor = (status: ProjectStatus): string => {
  return STATUS_COLORS[status] || STATUS_COLORS.archived;
};

const ProjectTableColumn = ({ project, columnType }: ProjectTableColumnProps): JSX.Element => {
  const { name, description, owner, members = [], createdAt, updatedAt, status } = project || {};

  const renderColumn = (): JSX.Element => {
    switch (columnType) {
      case PROJECT_COLUMN_TYPES.NAME: {
        return (
          <div>
            <div className='text-sm font-medium text-gray-900'>{name}</div>
            <div className='text-sm text-gray-500 line-clamp-1'>{description}</div>
          </div>
        );
      }

      case PROJECT_COLUMN_TYPES.OWNER: {
        const { name: ownerName, email, avatar } = owner || {};
        return (
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mr-3'>
              {avatar ? (
                <img src={avatar} alt={ownerName} className='w-full h-full rounded-full object-cover' />
              ) : (
                <User className='w-4 h-4 text-indigo-600' />
              )}
            </div>
            <div>
              <div className='text-sm font-medium text-gray-900'>{ownerName}</div>
              <div className='text-xs text-gray-500'>{email}</div>
            </div>
          </div>
        );
      }

      case PROJECT_COLUMN_TYPES.MEMBERS: {
        const visibleMembers = members?.slice(0, PROJECT_TABLE_CONFIG.VISIBLE_MEMBERS_LIMIT) || [];
        const remainingCount = members?.length - PROJECT_TABLE_CONFIG.VISIBLE_MEMBERS_LIMIT || 0;
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

      case PROJECT_COLUMN_TYPES.CREATED_AT: {
        return (
          <div className='flex items-center text-sm text-gray-500'>
            <Calendar className='w-4 h-4 mr-2' />
            {formatDate(createdAt)}
          </div>
        );
      }

      case PROJECT_COLUMN_TYPES.UPDATED_AT: {
        return <div className='text-sm text-gray-500'>{formatDate(updatedAt)}</div>;
      }

      case PROJECT_COLUMN_TYPES.STATUS: {
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
