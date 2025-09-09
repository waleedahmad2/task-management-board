import { JSX } from 'react';

import { User } from 'lucide-react';

/**
 * Props for ProjectCardOwner component
 */
interface ProjectCardOwnerProps {
  owner: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  className?: string;
}

/**
 * Project card owner component displaying owner information
 */
const ProjectCardOwner = ({ owner, className = '' }: ProjectCardOwnerProps): JSX.Element => (
  <div className={`flex items-center mb-5 relative z-10 ${className}`}>
    <div className='w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mr-3 ring-2 ring-indigo-50'>
      {owner.avatar ? (
        <img src={owner.avatar} alt={owner.name} className='w-full h-full rounded-full object-cover' />
      ) : (
        <User className='w-5 h-5 text-indigo-600' />
      )}
    </div>
    <div>
      <p className='text-sm font-semibold text-gray-900'>{owner.name}</p>
      <p className='text-xs text-indigo-600 font-medium'>Project Owner</p>
    </div>
  </div>
);

export default ProjectCardOwner;
