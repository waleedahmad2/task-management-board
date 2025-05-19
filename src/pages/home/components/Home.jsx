import React from 'react';

const Home = () => {
  /**
   * @example
   * const { data, isLoading, error } = useGetQuery({
   *   key: 'users',
   *   url: '/api/users',
   *   params: { role: 'admin' },
   * });
   */

  /**
   * Example usage of the `usePostMutation` custom hook to create a new post.
   *
   * This example uses the mutation hook returned by `usePostMutation`, which wraps a POST request.
   * It also leverages built-in toast notifications by passing `successMessage` and `errorMessage` options.
   *
   * @example
   * const { mutate: createPost } = usePostMutation(
   *   '/posts',                     // API endpoint
   *   handleSuccess,               // Success callback (optional)
   *   handleError,                 // Error callback (optional)
   *   {
   *     invalidateKeys: ['posts'],            // Query keys to invalidate on success
   *     successMessage: 'Post created successfully!', // Toast message on success
   *     errorMessage: 'Failed to create post.',       // Toast message on error
   *   }
   * );
   *
   * // Call the mutation:
   * createPost({
   *   payload: { title: 'Hello', body: 'World' },  // Data to send
   * });
   */

  return <div className="text-xl text-center mt-5 text-blue-500">Cogent Labs</div>;
};

export { Home };
