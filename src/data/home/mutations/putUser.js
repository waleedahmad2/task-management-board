// Just the sample of the code

// import { useMutation } from '@tanstack/react-query';
// import { performPutRequest } from '../utils/apiClient';

// /**
//  * Custom hook to update a post using PUT request.
//  *
//  * @param {Function} onSuccess - Callback on successful PUT.
//  * @param {Function} onError - Callback on error.
//  * @returns {Object} - React Query mutation object (mutate, isPending, error, etc.)
//  *
//  * Usage:
//  * const { mutate: updatePost, isPending } = usePutPosts(onSuccess, onError);
//  * updatePost({ postId: 1, payload: { title: 'Updated' } });
//  */
// export const usePutPosts = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: ({ postId, payload = {}, params = {}, config = {} }) => {
//       if (!postId) throw new Error('postId is required for updating a post');
//       return performPutRequest({
//         url: `/posts/${postId}`,
//         payload,
//         params,
//         config,
//       });
//     },
//     onSuccess,
//     onError,
//   });
// };
