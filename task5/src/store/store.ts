import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../modules/AuthPage/api/authApi";
import authReduser from "@/modules/AuthPage/authSlicer";
// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// setupListeners(store.dispatch);
export type TypeRootState = ReturnType<typeof store.getState>;
