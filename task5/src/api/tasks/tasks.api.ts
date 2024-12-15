import type { Api, Component } from '../data.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
import { TaskSingle, TaskMultiple, TaskType, Stage, Priority } from '@/api/data.types';
import { BASE_API_URL } from '@/consts';
import { prepareHeaders } from '@/utils/api';
import { TypeRootState } from '@/store/store';

type TaskUpType = Parameters<Api<unknown>['task']['taskPartialUpdate']>[1]

export const tasksApi = createApi({
   tagTypes: ['Task', 'Tasks'],
   reducerPath: 'api/tasks',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL, prepareHeaders }),
   endpoints: (build) => ({
      getTaskTypes: build.query<{ data: Array<TaskType> }, void>({ query: () => `/task_type` }),
      getTaskTags: build.query<{ data: Array<Component & { color?: string }> }, void>({ query: () => `/component` }),
      getTaskPriorities: build.query<{ data: Array<Priority> }, void>({ query: () => `/priority` }),
      getTask: build.query<{ data: TaskSingle }, string>({ query: (id: string) => `/task/${id}`, providesTags: ['Task'], }),
      getAllTasks: build.query<{ data: Array<TaskMultiple> }, { slug: string, taskFilter?: { name: string, user_id: number, type_id: number }}>({
         query: ({slug}) => {
            let baseUrl = `/project/${slug}/task?`            
            return baseUrl;
         },
         providesTags: ['Tasks'],
      }),

      updateTask: build.mutation<TaskSingle, Partial<TaskUpType> & {id: number, projectslug: string}>({
         query: (task) => {
            const { id, ...patch } = task;
            return {
               url: `/task/${id}`,
               method: 'PATCH',
               body: patch,
            }
         },
         async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
            const patchResult = dispatch(
               tasksApi.util.updateQueryData('getAllTasks', {slug: patch.projectslug}, (draft) => {
                  Object.assign(draft, patch)
               })
            )
            try {
               await queryFulfilled
            } catch {
               patchResult.undo()

               /**
                * Alternatively, on failure you can invalidate the corresponding cache tags
                * to trigger a re-fetch:
                * dispatch(api.util.invalidateTags(['Post']))
                */
            }
         },
         invalidatesTags: ['Tasks']
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
   useGetTaskQuery,
   
   useLazyGetTaskQuery,
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
