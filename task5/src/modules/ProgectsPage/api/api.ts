// Import the RTK Query methods from the React-specific entry point
import { ProjectShort } from '@/api/data.types';
import { BASE_URL } from '@/consts'
import { getCookie } from '@/utils/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type ProjectItem = ProjectShort & { is_favorite: boolean, user_count: number, is_archived: 0 | 1 };

export const projectsApi = createApi({
   reducerPath: 'projects',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
   endpoints: (builder) => ({
      getProjects: builder.query<{ data: Array<ProjectItem> }, void>({
         query: () => {
            return {
               url: `/project`,
               headers: {
                  Authorization: `Bearer ${getCookie('token-auth')}`
               }
            }
         }
      }),
   }),
})


export const { useGetProjectsQuery } = projectsApi;



// export const { useProjectsQuery } = projectsApi



// // Use the `Post` type we've already defined in `postsSlice`,
// // and then re-export it for ease of use
// import type { Post } from '@/features/posts/postsSlice'
// export type { Post }

// // Define our single API slice object
// export const apiSlice = createApi({
//    // The cache reducer expects to be added at `state.api` (already default - this is optional)
//    reducerPath: 'api',
//    // All of our requests will have URLs starting with '/fakeApi'
//    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
//    // The "endpoints" represent operations and requests for this server
//    endpoints: builder => ({
//       // The `getPosts` endpoint is a "query" operation that returns data.
//       // The return value is a `Post[]` array, and it takes no arguments.
//       getPosts: builder.query<Post[], void>({
//          // The URL for the request is '/fakeApi/posts'
//          query: () => '/posts'
//       })
//    })
// })

// // Export the auto-generated hook for the `getPosts` query endpoint
// export const { useGetPostsQuery } = apiSlice