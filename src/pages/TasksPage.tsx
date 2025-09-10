import { JSX } from 'react';

export default function TasksPage(): JSX.Element {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold text-gray-900'>My Tasks</h1>
      <p className='text-gray-600 mt-2'>Tasks assigned to you will appear here.</p>
    </div>
  );
}
