import { TaskSingle, User, Component, Priority, TaskType, ResponseFile } from '@/api/data.types';
import { BASE_URL, BASE_API_URL } from '@/consts';
import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = getCookie('token-auth');
// console.log(token);

export const taskApiActions = createApi({
   reducerPath: 'api/single_task_actions',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
   endpoints: (build) => ({
      getTaskByTaskId: build.query<{ data: TaskSingle }, number>({
         query: (id: number) => ({
            url: `/task/${id}`,
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

      createTask: build.mutation<TaskSingle, { slug: string; body: Partial<TaskSingle> }>({
         query: ({ slug, body }) => ({
            url: `/project/${slug}/task`,
            method: 'POST',
            body,
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

      getComponents: build.query<{ data: Component[] }, void>({
         query: () => ({
            url: `/component`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),

      getPriorities: build.query<Priority[], void>({
         query: () => ({
            url: `/priority`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),

      getTaskTypes: build.query<TaskType[], void>({
         query: () => ({
            url: `/task_type`,
            method: 'GET',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      sendFilesTask: build.mutation<ResponseFile, { taskId: number; fileId: number | undefined }>({
         query: ({ taskId, fileId }) => ({
            url: `/task/${taskId}/file/${fileId}`,
            method: 'PATCH',
            headers: {
               accept: 'application/json',
               Authorization: `Bearer ${token}`,
            },
         }),
      }),
      deleteFileTask: build.mutation<void, { taskId: number; fileId: number | undefined }>({
         query: ({ taskId, fileId }) => ({
            url: `/task/${taskId}/file/${fileId}`,
            method: 'DELETE',
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
   useGetComponentsQuery,
   useGetPrioritiesQuery,
   useGetTaskTypesQuery,
   useSendFilesTaskMutation,
   useDeleteFileTaskMutation,
} = taskApiActions;

// Использование фильтрации
// const { data, error, isLoading } = useGetTasksQuery({
//    slug: 'my-project',
//    filters: { type_id: [1]},
// });

// const { data: tasks = [], error } = useGetTasksQuery({
//    slug: 'project1',
//    filters: { id: [5, 10, 15] }, // Несколько id
// });

// const { data, error, isLoading } = useGetTasksQuery({
//    slug: 'my-project',
//    filters: { type_id: []}, // Все значения
// });

// Это выполнит запрос с фильтрацией:
//GET /project/my-project/task?filter[type_id]=1&filter[name]=Example%20Task

// Без фильтрации
// const {data: tasks = [],isLoading, error,} = useGetTasksQuery({
//    slug: 'project1', // указываем только slug
// });

//getUsers
//const { data: users, error, isLoading } = useGetUsersQuery('project2');
