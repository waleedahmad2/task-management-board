import { JSX } from 'react';

interface KanbanEmptyProps {
  label: string;
  className?: string;
}

const KanbanEmpty = ({ label, className = '' }: KanbanEmptyProps): JSX.Element => (
  <div className={`bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
    <div className='text-gray-400 mb-2'>
      <svg className='w-8 h-8 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
      </svg>
    </div>
    <p className='text-sm text-gray-500'>No {label}</p>
  </div>
);

export default KanbanEmpty;
