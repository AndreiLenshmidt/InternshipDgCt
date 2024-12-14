import { prepareHeaders } from '../../../utils/api';
// Import the RTK Query methods from the React-specific entry point
import { ProjectMultiple, ProjectShort, ProjectSingle } from '@/api/data.types';
import { BASE_API_URL } from '@/consts'
import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export type ProjectItem = ProjectMultiple & { is_favorite: boolean, is_archived: 0 | 1 };


export const projectsApi = createApi({
   reducerPath: 'projects',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL, prepareHeaders }),
   endpoints: (builder) => ({
      getProjects: builder.query<{ data: Array<ProjectItem> }, void>({ query: () => '/project' }),
      getProject: builder.query<{ data: ProjectSingle }, string>({ query: (slug: string) => `/project/${slug}` }),

      // updateProject: build.mutation<ProjectSingle, Partial<TaskUpType> & { id: number, projectslug: string }>({
      //    query: (task) => {
      //       const { id, ...patch } = task;
      //       return {
      //          url: `/task/${id}`,
      //          method: 'PATCH',
      //          body: patch,
      //       }
      //    },
      //    async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
      //       const patchResult = dispatch(
      //          tasksApi.util.updateQueryData('getAllTasks', patch.projectslug, (draft) => {
      //             Object.assign(draft, patch)
      //          })
      //       )
      //       try {
      //          await queryFulfilled
      //       } catch {
      //          patchResult.undo()

      //          /**
      //           * Alternatively, on failure you can invalidate the corresponding cache tags
      //           * to trigger a re-fetch:
      //           * dispatch(api.util.invalidateTags(['Post']))
      //           */
      //       }
      //    },
      //    invalidatesTags: ['Tasks']
      //    // transformResponse: (response: { data: TaskMultiple }, meta, arg) => response.data,
      // })
   }),
});


export const { useGetProjectsQuery, useGetProjectQuery } = projectsApi;


