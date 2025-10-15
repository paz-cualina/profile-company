import { AxiosError, type AxiosRequestConfig } from 'axios';
import axiosInstance from './axios-instance/axios-instance';

// Payload type for the API
type Payload = AxiosRequestConfig & { body?: object };

// Base query for the API
const axiosQueryConfig =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, ...rest }: Payload) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        data: rest.body ?? rest.data,
        ...rest,
      } as Payload);
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosQueryConfig;
