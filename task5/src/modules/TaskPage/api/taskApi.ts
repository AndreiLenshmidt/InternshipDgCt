import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
import { TaskSingle, TaskMultiple } from '@/api/data.types';
import { BASE_URL } from '@/consts';

const token = getCookie('token-auth');

export const taskApi = createApi({
   reducerPath: 'api/single_task',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
   endpoints: (build) => ({
      getTaskByTaskId: build.query<{ data: TaskSingle }, number>({
         query: (id: number | undefined) => ({
            url: `/task/${id}`,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      //   getAllTasks: build.query<TaskMultiple, string>({
      //      query: (slug: string) => ({
      //         url: `/project/${slug}/task`,
      //         headers: {
      //            Authorization: `Bearer ${token}`,
      //         },
      //      }),
      //   }),
   }),
});

export const { useGetTaskByTaskIdQuery } = taskApi;
