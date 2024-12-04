import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
import { TaskSingle, TaskMultiple } from '@/api/data.types';
import { BASE_API_URL } from '@/consts';


export const tasksApi = createApi({
   reducerPath: 'api/tasks',
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_API_URL,
      prepareHeaders: (headers, { getState }) => {
         // 
         const token = getCookie('token-auth');
         
         if (token) {
            headers.set('authorization', `Bearer ${token}`)
         }
         return headers
      },
   }),
   endpoints: (build) => ({
      getAllTasks: build.query<{ data: Array<TaskMultiple>}, string>({
         query: (slug: string) => `/project/${slug}/task`,
      }),
   }),
});

export const { useGetAllTasksQuery } = tasksApi;