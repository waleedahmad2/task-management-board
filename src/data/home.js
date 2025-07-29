import { apiEndpoints } from '#/constants';
import { usePostMutation, useGetQuery } from '#/services';

/**
 * Custom hook to encapsulate data fetching and mutations for the Home page.
 * * - All fetching logic lives in `data/home.js`
 *
 * This hook fetches a list  users and provides a method to create a new post.
 * It utilizes custom `useGetQuery` and `usePostMutation` hooks for query and mutation logic.
 *
 * @returns {{
 *   users: Array|undefined,
 *   loadingUsers: boolean,
 *   handleCreate: () => void,
 *   isPosting: boolean
 * }}
 */
export const useHomeData = () => {
  const { data: usersData, isLoading: isUsersLoading } = useGetQuery({
    key: 'users',
    url: apiEndpoints.GET_USERS,
    // params: { role: 'admin' }, // Optional query parameters
  });

  /**
   * Mutation to create a new post.
   * Handles success and error with toast messages and invalidates `posts` query on success.
   *
   * @example
   * });
   *   */
  const {
    mutate: createPost,            // Function to call the mutation
    isPending: isPosting,          // Indicates if the mutation is in progress
    // isSuccess,                  // Indicates if the mutation was successful
    // isError,                    // Indicates if the mutation encountered an error
  } = usePostMutation({
    url: apiEndpoints.POST_CREATE_USER,
    //  handleSuccess,            // Success callback (optional)
    //   handleError,             // Error callback (optional)
    options: {
      invalidateKeys: ['posts'],
      successMessage: 'Post created!',
      errorMessage: 'Failed to create post',
    },
  });

  // Expose data and mutation handlers for UI
  return {
    usersData,
    isUsersLoading,
    createPost,
    isPosting,
  };
};
