import { useMemo } from 'react';

import { useCreatePost } from '#/data';
import { useGetPosts } from '#/data';

/**
 * useHome — Generic business logic hook
 *
 * This hook encapsulates reusable business logic for fetching and transforming user data
 * AND for preparing payloads, validating and other business rules for GET, POST, PUT, DELETE operations.
 *
 * Intended to be used in scalable React apps:
 * - Business rules (filtering, validation, Input functions): `hooks/useHome.js`
 * - Data fetching layer: `data/home/queries/getPosts.js`
 * - Data mutations (POST, PUT, DELETE): `data/home/mutations/createPosts.js` etc
 * - UI rendering only: `Home.jsx`
 *
 * @returns {{
 *   users: Array<{
 *     id: number,
 *     name: string,
 *     email: string,
 *     username: string,
 *     address?: {
 *       street: string,
 *       suite: string,
 *       city: string,
 *       zipcode: string,
 *       geo: {
 *         lat: string,
 *         lng: string,
 *       }
 *     },
 *     phone: string,
 *     website: string,
 *     company?: {
 *       name: string,
 *       catchPhrase: string,
 *       bs: string
 *     }
 *   }>,
 *   isLoading: boolean,
 *   handleCreatePost: () => void,
 *   isPosting: boolean,
 * }}
 */

export const useHome = () => {
  const { mutate: createPost, isPending: isPosting } = useCreatePost(
    () => console.warn('User created'),
    err => console.error(err.message)
  );

  // Fetch users data
  const { data: postsData, isLoading: isPostsLoading } = useGetPosts();

  // Example: filter only users from "Johns Group"
  const filteredPosts = useMemo(() => {
    return (!isPostsLoading && Object.values(postsData).filter(post => post?.id === 1)) || [];
  }, [postsData]);

  /**
   * Business logic before creating a user.
   * - This is where you can add validations, transform payloads, etc.
   */

  const handleCreatePost = () => {
    // 👇 Dummy logic: payload with static title/body, later can use dynamic form
    const newUserPayload = {
      title: 'Dummy Title',
      body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    };

    // Example validation can be added here before mutation
    if (!newUserPayload.title || !newUserPayload.body) {
      console.warn('Invalid payload!');
      return;
    }

    createPost({ payload: newUserPayload });
  };

  return {
    posts: filteredPosts,
    isLoading: isPostsLoading,
    handleCreatePost,
    isPosting,
  };
};
