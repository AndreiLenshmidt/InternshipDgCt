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
   }),
});


export const { useGetProjectsQuery, useGetProjectQuery } = projectsApi;


