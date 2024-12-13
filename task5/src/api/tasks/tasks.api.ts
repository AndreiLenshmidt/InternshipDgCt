import { Component } from '../data.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
import { TaskSingle, TaskMultiple, TaskType, Stage, Priority } from '@/api/data.types';
import { BASE_API_URL } from '@/consts';
import { prepareHeaders } from '@/utils/api';
import { TypeRootState } from '@/store/store';


export const tasksApi = createApi({
   tagTypes: ['AllTasks', 'Task'],
   reducerPath: 'api/tasks',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL, prepareHeaders }),
   endpoints: (build) => ({
      getTaskTypes: build.query<{ data: Array<TaskType> }, void>({ query: () => `/task_type` }),
      getTaskTags: build.query<{ data: Array<Component & {color?: string}> }, void>({ query: () => `/component` }),
      getTaskPriorities: build.query<{ data: Array<Priority> }, void>({ query: () => `/priority` }),
      getAllTasks: build.query<{ data: Array<TaskMultiple> }, string>({ query: (slug: string) => `/project/${slug}/task`, providesTags: ['Task'], }),

      updateTask: build.mutation<TaskMultiple, Partial<TaskMultiple> & Pick<TaskMultiple, 'id'>>({
         query: (task) => {
            const { id, ...patch } = task;
            
            // debugger
            return {
               url: `/task/${id}`,
               method: 'PATCH',
               body: patch,
            }
         },
         invalidatesTags: ['AllTasks']
         // transformResponse: (response: { data: TaskMultiple }, meta, arg) => response.data,
      })
      // getTaskStages: build.query<{ data: Array<Stage> }, void>({ query: () => `/stage` }),
   }),
});

export const {
   useGetAllTasksQuery,   
   useGetTaskPrioritiesQuery,
   useGetTaskTagsQuery,
   useGetTaskTypesQuery,
   
   useLazyGetAllTasksQuery,

   useUpdateTaskMutation
   // useLazyGetTaskPrioritiesQuery,
   // useGetTaskStagesQuery
} = tasksApi;


/**
 * @link { https://stackoverflow.com/questions/76212082/how-to-use-rtk-query-in-combination-with-selectors }
 * @link {https://dev.to/riyadhossain/how-to-use-redux-toolkit-rtk-query-in-react-42l2}
 */
//
export const selectPriorities = (state: TypeRootState) => tasksApi.endpoints.getTaskPriorities.select()(state).data;




