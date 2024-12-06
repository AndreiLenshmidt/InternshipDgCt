import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
import { TaskSingle, TaskMultiple, User } from '@/api/data.types';
import { BASE_URL } from '@/consts';

const token = getCookie('token-auth');
export const BASE_URL_API = BASE_URL + 'api';

export const appApi = createApi({
   reducerPath: 'api/single_task',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
   endpoints: (build) => ({
      getTaskByTaskId: build.query<{ data: TaskSingle }, number>({
         query: (id: number | undefined) => ({
            url: `/task/${id}`,
            headers: {
               Authorization: `Bearer ${token}`,
               accept: 'application/json',
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
      getTasks: build.query<TaskSingle[], { slug: string; filters?: Record<string, string | number | number[]> }>({
         query: ({ slug, filters }) => {
            const searchParams = new URLSearchParams();
            if (filters) {
               Object.entries(filters).forEach(([key, value]) => {
                  if (Array.isArray(value)) {
                     // Если значение — массив, добавляем каждый элемент
                     value.forEach((v) => searchParams.append(`filter[${key}][]`, v.toString()));
                  } else {
                     // Если значение — строка или число
                     searchParams.append(`filter[${key}][]`, value.toString());
                  }
               });
            }
            return {
               url: `/project/${slug}/task?${searchParams.toString()}`,
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            };
         },
      }),
      getUsers: build.query<User[], string>({
         query: (slug) => ({
            url: `/project/${slug}/user`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      // getTaskComments: build.query<{ data: TaskSingle }, number>({
      //    query: (id: number | undefined) => ({
      //       url: `/task/${id}/comment`,
      //       headers: {
      //          Authorization: `Bearer ${token}`,
      //          accept: 'application/json',
      //       },
      //    }),
      // }),
      // sendUSerComment: build.mutation<{ data: TaskSingle }, number>({
      //    query: (id: number | undefined) => ({
      //       url: `/task/${id}/comment`,
      //       method: 'POST',
      //       headers: {
      //          accept: 'application/json',
      //          'Content-Type': 'application/json',
      //          Authorization: `Bearer ${token}`,
      //       },
      //       body: JSON.stringify({
      //          content: 'string',
      //          files: [0],
      //       }),
      //    }),
      // }),
      // patchUSerComment: build.mutation<{ data: TaskSingle }, number>({
      //    query: (id: number | undefined) => ({
      //       url: `/task/${id}/comment`,
      //       method: 'PATCH',
      //       headers: {
      //          accept: 'application/json',
      //          'Content-Type': 'application/json',
      //          Authorization: `Bearer ${token}`,
      //       },
      //       body: JSON.stringify({
      //          content: 'string',
      //          files: [0],
      //       }),
      //    }),
      // }),
      // deleteUSerComment: build.mutation<{ data: TaskSingle }, number>({
      //    query: (id: number | undefined) => ({
      //       url: `/task/${id}/comment`,
      //       method: 'DELETE',
      //       headers: {
      //          accept: 'application/json',
      //          Authorization: `Bearer ${token}`,
      //       },
      //    }),
      // }),
      getAllTasks: build.query<TaskMultiple, string>({
         query: (slug: string) => ({
            url: `/project/${slug}/task`,
            headers: {
               accept: 'application/json',
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      getCurrentUser: build.query<{ data: User }, void>({
         query: () => ({
            url: '/auth/user',
            headers: {
               accept: 'application/json',
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
   useGetUsersQuery,
   // useGetTaskCommentsQuery,
   // useSendUSerCommentMutation,
   // usePatchUSerCommentMutation,
   // useDeleteUSerCommentMutation,
   useGetAllTasksQuery,
   useGetCurrentUserQuery,
} = appApi;
