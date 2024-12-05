import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authActions } from '@/modules/AuthPage/authSlicer';
import { taskActions } from '@/modules/TaskPage/slicerTask';
import { appApi } from '@/api/appApi';

const allActions = {
   ...authActions,
};

export const useActions = () => {
   const dispatch = useDispatch();
   return bindActionCreators(allActions, dispatch);
};
