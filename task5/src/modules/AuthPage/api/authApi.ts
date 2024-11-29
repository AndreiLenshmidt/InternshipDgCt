import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, ServerResponse } from "./authTypes";

const BASE_URL = "https://trainee-academy.devds.ru/api";

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getOAuthToken: build.mutation<ServerResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: `/auth/token?email=${email}&password=${password}`,
        method: "POST",
      }),
    }),
    // protected: build.mutation<{ message: string }, void>({
    //   query: () => "protected",
    // }),
  }),
});

export const { useGetOAuthTokenMutation } = authApi;
