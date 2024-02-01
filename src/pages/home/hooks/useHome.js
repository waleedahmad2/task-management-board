import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useGetQuery, usePostMutation, apiEndpoints, queryKeys } from '@services';
import { POST_ERROR_MESSAGE } from '@constants';

export function useHome() {
  const queryClient = useQueryClient();

  const { data, isFetching } = useGetQuery(queryKeys?.USERS, apiEndpoints.POSTS, { abcMno: 'xyz' });

  const onPostPostSuccess = () => queryClient.invalidateQueries({ queryKey: [queryKeys?.USERS] });

  const onPostPostError = () => toast.error(POST_ERROR_MESSAGE);

  const { mutate } = usePostMutation(apiEndpoints?.POSTS, onPostPostSuccess, onPostPostError);

  const onClickTitle = () => {
    mutate({
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
      params: {
        abcMno: 'xyz',
      },
    });
  };

  return { data, isFetching, onClickTitle };
}
