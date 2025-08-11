import type { UseQueryOptions } from '@tanstack/react-query';

import type { Post } from './types';

// -------- GET POSTS --------

export type PostsResponse = Record<number, Post>;

// Props for the useGetPosts hook

export interface UseGetPostsProps {
  params?: Record<string, any>;
  options?: Omit<
    UseQueryOptions<PostsResponse, Error, PostsResponse, [string, Record<string, any>]>,
    'queryKey' | 'queryFn'
  >;
}

// -------- CREATE POST --------
export interface CreatePostPayload {
  userId?: number;
  title?: string;
  body?: string;
}

export interface CreatePostResponse {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostVariables {
  payload?: CreatePostPayload;
  params?: Record<string, any>;
}
