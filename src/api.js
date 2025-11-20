import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers['x-auth-token'] = token;
    }
    return req;
});

// Auth
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Posts
export const createPost = (formData) => API.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const getFeedPosts = () => API.get('/posts/feed');
export const likePost = (id) => API.put(`/posts/${id}/like`);

// Admin
export const getAllUsers = () => API.get('/users');
export const banUser = (id) => API.put(`/users/ban/${id}`);
export const unbanUser = (id) => API.put(`/users/unban/${id}`);
