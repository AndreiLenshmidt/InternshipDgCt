import { BASE_URL } from '../consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseSplitApi = createApi({
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/' }),
   endpoints: () => ({}),
})