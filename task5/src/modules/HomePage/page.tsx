import Image from 'next/image';
import Snow from '@public/media/snow.svg';
import Link from 'next/link';
import styles from './Home.module.scss';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

export default function MainPage() {
   const [token, _, removeCookie] = useCookies(['token-auth']);

   const [inOut, setInOut] = useState(!!token['token-auth']);

   useEffect(() => {
      if (token['token-auth']) {
         setInOut(true);
      }
   });

   const logOut = () => {
      removeCookie('token-auth');
      globalThis.document.cookie = '';
      location.reload();
      setInOut(false);
   };

   return (
      <div className={`wrapped ${styles.bkg}`}>
         <Snow className={styles.snow} />
         <header className={styles.header}>
            <Image src="/mainlogo.svg" alt="logo" width={159} height={43} priority={true} />
            <Link className={styles.link} href={!inOut ? '/auth' : '/'} onClick={() => inOut && logOut()}>
               {!inOut ? 'Войти' : 'Выйти'}
            </Link>
         </header>
         <main className={styles.main}>
            <div className={styles.main_box}>
               <p className={styles.main_info}>Добро пожаловать на главную страницу планировщика задач Kanban!</p>
               <p className={styles.main_info}>
                  Чтобы начать работать в Kanban доске нажмите на кнопку "войти" и введите свой логин и пароль если еще
                  этого не сделали.
               </p>
               <p className={styles.main_info}>
                  Если вы уже зарегистрированы, то можете начать работу, нажав на кнопку "перейти к проектам".
               </p>
               <Link className={styles.link} href={inOut ? '/projects' : '/auth'}>
                  {inOut ? 'Перейти к проектам' : 'Войти'}
               </Link>
            </div>
         </main>
         <footer className={styles.footer}>
            <p className="developer">Андрей Леншмидт</p>
            <p className="developer">Александр Саншайн</p>
            <p className="developer">Максим Егоров</p>
         </footer>
      </div>
   );
}
