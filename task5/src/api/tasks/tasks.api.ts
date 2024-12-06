import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
import { TaskSingle, TaskMultiple, TaskType, Stage } from '@/api/data.types';
import { BASE_API_URL } from '@/consts';
import { prepareHeaders } from '@/utils/api';


export const tasksApi = createApi({
   reducerPath: 'api/tasks',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL, prepareHeaders }),
   endpoints: (build) => ({
      getTaskStages: build.query<{ data: Array<Stage> }, void>({ query: () => `/stage` }),
      getTaskTypes: build.query<{ data: Array<TaskType> }, void>({ query: () => `/task_type` }),
      getAllTasks: build.query<{ data: Array<TaskMultiple> }, string>({ query: (slug: string) => `/project/${slug}/task` }),
   }),
});

export const { useGetAllTasksQuery, useGetTaskTypesQuery, useGetTaskStagesQuery } = tasksApi;