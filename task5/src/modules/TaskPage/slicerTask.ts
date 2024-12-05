import { TypeRootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Task = {
   filesDesription: FileList | null | undefined;
};

const initialState: Task = { filesDesription: null };

export const taskSlice = createSlice({
   name: 'task',
   initialState,
   reducers: {
      addFilesInDescription: (state, action: PayloadAction<FileList | undefined>) => {
         state.filesDesription = action.payload;
      },
   },
});

export default taskSlice.reducer;
export const taskActions = taskSlice.actions;
export const selectTask = (state: TypeRootState) => state.task.filesDesription;
