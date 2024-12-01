import styles from './auth.module.scss';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetOAuthTokenMutation } from './api/authApi';
import { FormDataType, LoginRequest } from './api/authTypes';
import { useActions } from '@/store/hooks/useActions';
import { useCookies } from 'react-cookie';

const schema: ZodType<FormDataType> = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(25),
  })
  .required();

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const [login, { isLoading }] = useGetOAuthTokenMutation();

  const { setAuthToken } = useActions();
  const [_, setCookie] = useCookies(['token-auth']);

  const onSubmit = async (formData: LoginRequest) => {
    // console.log(formData);
    // setFormData(formData);
    try {
      const paylord = await login(formData);
      setAuthToken(paylord.data);
      setCookie('token-auth', paylord.data?.token);
      // console.log(cookies['token-auth']);
    } catch (e) {
      // redirect to main
    }
  };

  return (
    <div className={styles.auth}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Вход</h2>
        <div className={styles.input_box}>
          <label className={styles.label} htmlFor="auth-email">
            Электронная почта
          </label>
          <input
            id="auth-email"
            className={styles.input}
            placeholder="Электронная почта"
            autoComplete="off"
            {...register('email')}
            // onChange={() => {
            //   console.log('gyg');
            // }}
          />
          <p>{errors.email?.message}</p>
          <label className={styles.foremail} htmlFor="auth-email">
            Электронная почта
          </label>
        </div>
        <div className={styles.input_box}>
          <label htmlFor="auth-password" className={styles.label}>
            Пароль
          </label>
          <input
            type="password"
            className={styles.input}
            placeholder="Пароль"
            autoComplete="off"
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
          <label className={styles.forpassword} htmlFor="auth-password">
            Пароль
          </label>
        </div>
        <input type="submit" value="Войти" className={styles.submit} />
      </form>
    </div>
  );
}
