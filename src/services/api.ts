import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const postsApi = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  getUserPosts: async (userId: number): Promise<Post[]> => {
    const response = await api.get(`/posts?userId=${userId}`);
    return response.data;
  },
};

export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

export const commentsApi = {
  getPostComments: async (postId: number): Promise<Comment[]> => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },

  getAllComments: async (): Promise<Comment[]> => {
    const response = await api.get('/comments');
    return response.data;
  },
};

export default api;