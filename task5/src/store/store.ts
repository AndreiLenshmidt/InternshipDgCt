import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../modules/AuthPage/api/authApi';
import authReduser from '@/modules/AuthPage/authSlicer';
import { projectsApi } from '@/modules/ProjectsPage/api/api';
import { appApi } from '@/api/appApi';
// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReduser,
      [projectsApi.reducerPath]: projectsApi.reducer,
      [appApi.reducerPath]: appApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware).concat(projectsApi.middleware).concat(appApi.middleware),
});

// setupListeners(store.dispatch);
export type TypeRootState = ReturnType<typeof store.getState>;
