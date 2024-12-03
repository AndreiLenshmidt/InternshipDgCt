import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../modules/AuthPage/api/authApi';
import authReduser from '@/modules/AuthPage/authSlicer';
import { projectsApi } from '@/modules/ProjectsPage/api/api';
import { taskApi } from '@/modules/TaskPage/api/taskApi';
import { taskApiActions } from '@/modules/TaskModalCreationEditing/api/taskApiActions';
// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReduser,
      [projectsApi.reducerPath]: projectsApi.reducer,
      [taskApi.reducerPath]: taskApi.reducer,
      [taskApiActions.reducerPath]: taskApiActions.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(authApi.middleware)
         .concat(projectsApi.middleware)
         .concat(taskApi.middleware)
         .concat(taskApiActions.middleware),
});

// setupListeners(store.dispatch);
export type TypeRootState = ReturnType<typeof store.getState>;
