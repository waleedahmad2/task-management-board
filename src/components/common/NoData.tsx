import { JSX } from 'react';

/**
 * Props for NoData component
 */
interface NoDataProps {
  title?: string;
  message?: string;
  className?: string;
}

/**
 * Empty state component that displays when there's no data to show.
 * Provides customizable title and message for different empty states throughout the app.
 */
const NoData = ({
  title = 'No Recent Activity Yet',
  message = 'Your recent AI agent tasks will show up here as you start using them.',
  className = '',
}: NoDataProps): JSX.Element => (
  <div className={`flex items-center justify-center min-h-screen ${className}`}>
    <div className='flex flex-col max-w-[22rem] items-center justify-center gap-2 text-center'>
      <p className='font-inter text-base font-medium leading-6 text-gray-700'>{title}</p>
      {message && <p className='font-inter text-sm leading-4 text-gray-500 max-w-md'>{message}</p>}
    </div>
  </div>
);

export default NoData;
