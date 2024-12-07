import { TaskType, User } from '@/api/data.types';
import { BASE_API_URL } from '@/consts';
import { prepareHeaders } from '@/utils/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
   reducerPath: 'api/user',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL, prepareHeaders }),
   endpoints: (build) => ({
      getCurrentUser: build.query<{ data: Array<User> }, void>({ query: () => `/auth/user` }),
   }),
});

export const {
   useGetCurrentUserQuery,
} = userApi;
