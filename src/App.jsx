import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import * as caseConverter from 'change-object-case';
import {toast} from 'react-toastify';

// axios.defaults.baseURL = 'https://example.com';

const caseConverterOptions = {recursive: true, arrayRecursive: true};

axios.interceptors.request.use(
  config => {
    config.params = caseConverter.snakeKeys(config?.params, caseConverterOptions);
    config.data = caseConverter.snakeKeys(config?.data, caseConverterOptions);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger

    response.data = caseConverter.camelKeys(response?.data, caseConverterOptions);
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Handle 401
    return Promise.reject(error);
  }
);

const performGetRequest = async ({url, params}) => {
  const response = await axios.get(url, {
    params,
  });
  return response.data;
};

const performPostRequest = async ({url, data, params}) => {
  const response = await axios.post(url, data, {
    params,
  });
  return response.data;
};

const useGetQuery = (key, url, params = {}) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => {
      return performGetRequest({url, params});
    },
  });
};

const usePostMutation = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: ({data, params}) => {
      return performPostRequest({url, data, params});
    },
    onSuccess,
    onError,
  });
};

function App() {
  const queryClient = useQueryClient();

  // const { data, isLoading } = useGetQuery("posts", "https://jsonplaceholder.typicode.com/posts", { "abcMno": "xyz" })
  const {data, isLoading} = useGetQuery('posts', '', {uuid: ''});

  const onPostPostSuccess = () => {
    queryClient.invalidateQueries({queryKey: ['posts']});
  };

  const onPostPostError = () => {
    toast.error('Error while posting post.');
  };

  const {mutate} = usePostMutation('https://jsonplaceholder.typicode.com/posts', onPostPostSuccess, onPostPostError);

  /* eslint-disable */
  const onClickTitle = id => {
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      UUID: {data?.uuid} <br />
      Name: {data?.setting?.botName}
    </div>
  );
}

export default App;
