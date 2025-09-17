import { JSX } from 'react';

import { Comment } from '#/types';
import { formatDate } from '#/utils';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps): JSX.Element => {
  const { content, sender, createdAt } = comment || {};
  const { name, avatar } = sender || {};

  return (
    <div className='flex space-x-3 p-4 border-b border-gray-100 last:border-b-0'>
      <div className='flex-shrink-0'>
        {avatar ? (
          <img src={avatar} alt={name} className='w-8 h-8 rounded-full object-cover' />
        ) : (
          <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium'>
            {name?.charAt(0)?.toUpperCase()}
          </div>
        )}
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center space-x-2 mb-1'>
          <h4 className='text-sm font-medium text-gray-900'>{name}</h4>
          <span className='text-xs text-gray-500'>{formatDate(createdAt)}</span>
        </div>
        <p className='text-sm text-gray-700 whitespace-pre-wrap'>{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
