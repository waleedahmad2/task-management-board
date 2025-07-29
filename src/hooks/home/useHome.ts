import { useGetQuery } from '#/services';
import { User } from '#/types/user';

interface UseHomeResult {
  usersData: User[] | undefined;
  isUsersLoading: boolean;
  usersError: unknown;
}

export const useHome = (): UseHomeResult => {
  const { data, isFetching, error } = useGetQuery<User[]>({
    key: 'users',
    url: 'https://jsonplaceholder.typicode.com/users',
  });

  return {
    usersData: data,
    isUsersLoading: isFetching,
    usersError: error,
  };
};
