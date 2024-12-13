import { Component } from '../data.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
import { TaskSingle, TaskMultiple, TaskType, Stage, Priority } from '@/api/data.types';
import { BASE_API_URL } from '@/consts';
import { prepareHeaders } from '@/utils/api';
import { TypeRootState } from '@/store/store';

export const tasksApi = createApi({
   reducerPath: 'api/tasks',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL, prepareHeaders }),
   endpoints: (build) => ({
      getTaskTypes: build.query<{ data: Array<TaskType> }, void>({ query: () => `/task_type` }),
      getTaskTags: build.query<{ data: Array<Component & { color?: string }> }, void>({ query: () => `/component` }),
      getTaskPriorities: build.query<{ data: Array<Priority> }, void>({ query: () => `/priority` }),
      getAllTasks: build.query<{ data: Array<TaskMultiple> }, string>({
         query: (slug: string) => `/project/${slug}/task`,
      }),

      // getTaskStages: build.query<{ data: Array<Stage> }, void>({ query: () => `/stage` }),
   }),
});

export const {
   useGetAllTasksQuery,
   useGetTaskPrioritiesQuery,
   useGetTaskTagsQuery,
   useGetTaskTypesQuery,

   // useLazyGetTaskPrioritiesQuery,
   // useGetTaskStagesQuery
} = tasksApi;

/**
 * @link { https://stackoverflow.com/questions/76212082/how-to-use-rtk-query-in-combination-with-selectors }
 * @link {https://dev.to/riyadhossain/how-to-use-redux-toolkit-rtk-query-in-react-42l2}
 */
//
export const selectPriorities = (state: TypeRootState) => tasksApi.endpoints.getTaskPriorities.select()(state).data;
