'use client';

import styles from './auth.module.scss';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetOAuthTokenMutation } from './api/authApi';
import { FormDataType, LoginRequest } from './api/authTypes';
import { useState } from 'react';
import { useActions } from '@/store/hooks/useActions';

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

  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const [login, { isLoading }] = useGetOAuthTokenMutation();

  const { setAuthToken } = useActions();

  const onSubmit = async (formData: LoginRequest) => {
    console.log(formData);
    setFormData(formData);
    try {
      const paylord = await login(formData);
      setAuthToken(paylord.data);
    } catch (e) {}
  };

  return (
    <div className={styles.auth}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Вход</h2>
        <div className={styles.relative}>
          <label className={styles.label} htmlFor="auth-email">
            Электронная почта
          </label>
          <input
            id="auth-email"
            className={styles.input}
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
          {/* <label className={styles.foremail} htmlFor="auth-email">
            Электронная почта
          </label> */}
        </div>
        <div className={styles.relative}>
          <label htmlFor="auth-password" className={styles.label}>
            Пароль
          </label>
          <input
            type="password"
            className={styles.input}
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
          {/* <label className={styles.forpassword} htmlFor="auth-password">
            Пароль
          </label> */}
        </div>
        <input type="submit" value="Войти" className={styles.submit} />
      </form>
    </div>
  );
}
