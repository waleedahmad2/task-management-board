import { useGetQuery, usePostMutation, apiEndpoints, queryKeys } from '@services';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const Home = () => {
  const queryClient = useQueryClient();

  const { data, isFetching } = useGetQuery(queryKeys?.USERS, apiEndpoints.POSTS, { abcMno: 'xyz' });

  const onPostPostSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys?.USERS] });
  };

  const onPostPostError = () => {
    toast.error('Error while posting post.');
  };

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
  return isFetching ? (
    <div> Loading...</div>
  ) : (
    <>
      <div>
        UUID: {data?.uuid} <br />
        Name: {data?.setting?.botName}
      </div>
      <button onClick={onClickTitle}> Click me to Post</button>
    </>
  );
};
