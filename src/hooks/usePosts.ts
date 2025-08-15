import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi, usersApi, commentsApi, type Post, type User, type Comment } from '@/services/api';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getAllPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postsApi.getPostById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getAllUsers,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useUserPosts = (userId: number) => {
  return useQuery({
    queryKey: ['posts', 'user', userId],
    queryFn: () => postsApi.getUserPosts(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePostComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', 'post', postId],
    queryFn: () => commentsApi.getPostComments(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};