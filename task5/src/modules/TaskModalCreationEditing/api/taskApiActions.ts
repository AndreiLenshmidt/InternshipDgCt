import { TaskMultiple, TaskSingle } from '@/api/data.types';
import { BASE_URL } from '@/consts';
import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const tasksApi = createApi({
//    reducerPath: 'projects',
//    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
//    endpoints: (builder) => ({
//       getTasks: builder.query<ProjectShort[], string>({
//          query: (idTask) => {
//             return {
//                url: `/project/${idTask}/task`,
//                headers: {
//                   Authorization: `Bearer ${getCookie('token-auth')}`,
//                },
//             };
//          },
//       }),
//    }),
// });

// export const { useGetTasksQuery } = tasksApi;

const token = getCookie('token-auth');

export const taskApiActions = createApi({
   reducerPath: 'api/single_task_actions',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
   endpoints: (build) => ({
      getTaskByTaskId: build.query<TaskSingle, number>({
         query: (id: number) => ({
            url: `/task/${id}`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      updateTask: build.mutation<void, { id: number; body: Partial<TaskSingle> }>({
         query: ({ id, body }) => ({
            url: `/task/${id}`,
            method: 'PATCH',
            body: body,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      createTask: build.mutation<TaskSingle, Partial<TaskSingle>>({
         query: (slug) => ({
            url: `/project/${slug}/task`,
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      deleteTask: build.mutation<void, number>({
         query: (id) => ({
            url: `/task/${id}`,
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      getTasks: build.query<TaskSingle[], string>({
         query: (slug: string) => ({
            url: `/project/${slug}/task`,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
   }),
});

export const {
   useGetTaskByTaskIdQuery,
   useUpdateTaskMutation,
   useCreateTaskMutation,
   useDeleteTaskMutation,
   useGetTasksQuery,
} = taskApiActions;
