import { baseApi } from '../../base-api';
import { buildPath } from '../../../utils/helpers';
import { ApiRoutes } from '../../api-paths';
import type { Company } from '../../models/company/company.model';

export const {
  endpoints: companyEndpoints,
  useGetCompanyListQuery,
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useEditCompanyMutation,
  useDeleteCompanyMutation,
} = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyList: builder.query<Company[], void>({
      query: () => ({
        url: ApiRoutes.COMPANIES,
        method: 'GET',
      }),
      providesTags: ['Companies'],
    }),
    createCompany: builder.mutation<Company, Partial<Company>>({
      query: (company) => ({
        url: ApiRoutes.COMPANIES,
        method: 'POST',
        body: company,
      }),
      invalidatesTags: ['Companies'],
    }),
    getCompanyById: builder.query<Company, number>({
      query: (id) => ({
        url: buildPath(ApiRoutes.COMPANY_DETAIL, { companyId: id }),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Companies', id }],
    }),
    editCompany: builder.mutation<Company, Partial<Company> & { id: number }>({
      query: ({ id, ...company }) => ({
        url: buildPath(ApiRoutes.COMPANY_UPDATE, { companyId: id }),
        method: 'PUT',
        body: company,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Companies', { type: 'Companies', id }],
    }),
    deleteCompany: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: buildPath(ApiRoutes.COMPANY_DELETE, { companyId: id }),
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => ['Companies', { type: 'Companies', id }],
    }),
  }),
});
