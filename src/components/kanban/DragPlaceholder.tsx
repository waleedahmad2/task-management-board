import { JSX } from 'react';

interface DragPlaceholderProps {
  taskTitle: string;
  message?: string;
  className?: string;
}

const DragPlaceholder = ({ taskTitle, message = 'Drop here', className = '' }: DragPlaceholderProps): JSX.Element => {
  return (
    <div className={`opacity-50 border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg p-3 mb-4 ${className}`}>
      <div className='text-sm text-blue-600 font-medium'>
        {message} "{taskTitle}"
      </div>
    </div>
  );
};

export default DragPlaceholder;
