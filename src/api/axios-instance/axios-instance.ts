import axios from 'axios';
import { ApiRoutes } from '../api-paths';

const axiosInstance = axios.create({
  baseURL: ApiRoutes.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
