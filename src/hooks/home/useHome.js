import { useGetQuery } from '#/services';

/**
 * Custom hook for Home component combining your custom hooks.
 */

export const useHome = () => {
  const { data, isFetching, error } = useGetQuery({
    key: 'users',
    url: 'https://jsonplaceholder.typicode.com/users',
  });

  return {
    usersData: data,
    isUsersLoading: isFetching,
    usersError: error,
  };
};
