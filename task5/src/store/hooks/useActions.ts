import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authActions } from '@/modules/AuthPage/authSlicer';
import { taskActions } from '@/modules/TaskPage/slicerTask';

const allActions = {
   ...authActions,
   ...taskActions,
};

export const useActions = () => {
   const dispatch = useDispatch();
   return bindActionCreators(allActions, dispatch);
};
