import { ServerResponse } from "@/modules/AuthPage/api/authTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ServerResponse = { token: "" };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<ServerResponse | undefined>
    ) => {
      state.token = action?.payload?.token;
      // console.log(state.token);
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
