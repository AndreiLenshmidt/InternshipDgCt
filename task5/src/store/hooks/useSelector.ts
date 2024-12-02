import { useSelector } from 'react-redux';
import { selectToken } from '@/modules/AuthPage/authSlicer';
import { useCookies } from 'react-cookie';

export const useAuth = () => {
  const token = useSelector(selectToken);
  const [cookie] = useCookies(['token-auth']);
  return token === '' ? cookie['token-auth'] : token;
};
