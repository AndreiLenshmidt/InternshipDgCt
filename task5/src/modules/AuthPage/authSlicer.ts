import { ServerResponse } from '@/modules/AuthPage/api/authTypes';
import { TypeRootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cookies } from 'next/headers';

const initialState: ServerResponse = { token: '' };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<ServerResponse | undefined>
    ) => {
      state.token = action?.payload?.token;
      console.log(state.token);
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
export const selectToken = (state: TypeRootState) => state.auth.token;
