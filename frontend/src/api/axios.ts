import axios from 'axios';
import { store } from '../redux/store';
import { logoutSuccess } from '../redux/authSlice';

const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logoutSuccess());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
