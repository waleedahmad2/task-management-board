import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { POST_ERROR_MESSAGE } from '#/constants';
import { useGetQuery, usePostMutation, apiEndpoints, queryKeys } from '#/services';

export function useHome() {
  const queryClient = useQueryClient();

  const { data, isFetching } = useGetQuery(queryKeys?.USERS, apiEndpoints.POSTS, { abcMno: 'xyz' });

  const onPostPostSuccess = () => queryClient.invalidateQueries({ queryKey: [queryKeys?.USERS] });

  const onPostPostError = () => toast.error(POST_ERROR_MESSAGE);

  const { mutate } = usePostMutation(apiEndpoints?.POSTS, onPostPostSuccess, onPostPostError);

  const onClickTitle = () => {
    mutate({
      payload: {
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
