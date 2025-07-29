import React from 'react';

import { useHome } from '#/hooks';

//  * Intended to be used in scalable React applications as part of a separation-of-concerns pattern:
//  * - UI components (e.g. Home.jsx) only focus on UI Making

const Home = () => {
  const { users, isLoading, handleCreate, isPosting } = useHome();

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center text-blue-600'>Cogent Labs</h1>

      <div className='mb-4 text-center'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
          onClick={handleCreate}
          disabled={isPosting}
        >
          {isPosting ? 'Creating...' : 'Create Dummy User'}
        </button>
      </div>

      <h2 className='text-xl font-semibold mb-2'>Users List</h2>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <ul className='list-disc list-inside'>
          {users &&
            Object.values(users).map(user => (
              <div key={user.id} className='p-4 border rounded shadow-sm mb-2'>
                <h2 className='text-lg font-semibold'>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Company: {user.company?.name}</p>
                <p>City: {user.address?.city}</p>
              </div>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
