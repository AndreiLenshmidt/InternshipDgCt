import { prepareHeaders } from '../../../utils/api';
// Import the RTK Query methods from the React-specific entry point
import { ProjectShort } from '@/api/data.types';
import { BASE_API_URL } from '@/consts'
import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export type ProjectItem = ProjectShort & { is_favorite: boolean, user_count: number, is_archived: 0 | 1 };

export const projectsApi = createApi({
   reducerPath: 'projects',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL, prepareHeaders }),
   endpoints: (builder) => ({
      getProjects: builder.query<{ data: Array<ProjectItem> }, void>({ query: () => '/project' }),
      getProject: builder.query<{ data: ProjectItem }, string>({ query: (slug: string) => `/project/${slug}` }),
   }),
});


export const { useGetProjectsQuery, useGetProjectQuery } = projectsApi;


// export const { useProjectsQuery } = projectsApi

