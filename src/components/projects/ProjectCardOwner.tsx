import { JSX } from 'react';

import { User } from 'lucide-react';

interface ProjectCardOwnerProps {
  owner: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  className?: string;
}

const ProjectCardOwner = ({ owner, className = '' }: ProjectCardOwnerProps): JSX.Element => {
  const { name, avatar } = owner || {};

  return (
    <div className={`flex items-center mb-5 relative z-10 ${className}`}>
      <div className='w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mr-3 ring-2 ring-indigo-50'>
        {avatar ? (
          <img src={avatar} alt={name} className='w-full h-full rounded-full object-cover' />
        ) : (
          <User className='w-5 h-5 text-indigo-600' />
        )}
      </div>
      <div>
        <p className='text-sm font-semibold text-gray-900'>{name}</p>
        <p className='text-xs text-indigo-600 font-medium'>Project Owner</p>
      </div>
    </div>
  );
};

export default ProjectCardOwner;
