import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../modules/AuthPage/api/authApi';
import authReduser from '@/modules/AuthPage/authSlicer';
import { projectsApi } from '@/modules/ProjectsPage/api/api';
import { taskApiActions } from '@/modules/TaskModalCreationEditing/api/taskApiActions';
import { appApi } from '@/api/appApi';

// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReduser,
      [projectsApi.reducerPath]: projectsApi.reducer,
      [appApi.reducerPath]: appApi.reducer,
      [taskApiActions.reducerPath]: taskApiActions.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(authApi.middleware)
         .concat(projectsApi.middleware)
         .concat(appApi.middleware)
         .concat(taskApiActions.middleware),

   [appApi.reducerPath]: appApi.reducer,
});

// setupListeners(store.dispatch);
export type TypeRootState = ReturnType<typeof store.getState>;
