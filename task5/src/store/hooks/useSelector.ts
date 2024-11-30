// import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '@/modules/AuthPage/authSlicer';

export const useAuth = () => {
  const token = useSelector(selectToken);
  return token;
};
