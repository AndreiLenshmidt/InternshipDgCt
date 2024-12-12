import { configureStore } from '@reduxjs/toolkit';
import { projectsApi } from '@/modules/ProjectsPage/api/api';
import { taskApiActions } from '@/modules/TaskModalCreationEditing/api/taskApiActions';
import { appApi } from '@/api/appApi';

// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
   reducer: {
      [projectsApi.reducerPath]: projectsApi.reducer,
      [appApi.reducerPath]: appApi.reducer,
      [taskApiActions.reducerPath]: taskApiActions.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(projectsApi.middleware).concat(appApi.middleware).concat(taskApiActions.middleware),
});

// setupListeners(store.dispatch);
export type TypeRootState = ReturnType<typeof store.getState>;
