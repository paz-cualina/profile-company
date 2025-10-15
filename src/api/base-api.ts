import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiRoutes } from './api-paths';
import axiosQueryConfig from './query-config';

export const baseApi = createApi({
  reducerPath: 'kirevaApi',
  endpoints: () => ({}),
  baseQuery: axiosQueryConfig({
    baseUrl: ApiRoutes.BASE_URL,
  }),
  tagTypes: ['Companies'],
});

export const { reducer, middleware } = baseApi;
