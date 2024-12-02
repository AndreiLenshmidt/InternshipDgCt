import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.scss';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

export default function MainPage() {
   const [inOut, setInOut] = useState(false);
   const [cookies, setCookie] = useCookies(['userIsAuth']);
   const [token, _, removeCookie] = useCookies(['token-auth']);

   useEffect(() => {
      if (cookies.userIsAuth) {
         setInOut(true);
      }
   });

   const LogInLogOutButton = ({ inOut }: { inOut: boolean }) => {
      const logOut = () => {
         setCookie('userIsAuth', false);
         removeCookie('token-auth');
         setInOut(false);
      };
      if (inOut) {
         return (
            <Link className={styles.link} href="/" onClick={() => logOut()}>
               Выйти
            </Link>
         );
      } else {
         return (
            <Link className={styles.link} href="/auth">
               Войти
            </Link>
         );
      }
   };

   return (
      <div className="wrapped">
         <header className={styles.header}>
            <Image src="/mainlogo.svg" alt="logo" width={159} height={43} priority={true} />
            <LogInLogOutButton inOut={inOut} />
         </header>
         <main>Main</main>
         <footer className={styles.footer}>
            <p className="developer">Андрей Леншмидт</p>
            <p className="developer">Александр Саншайн</p>
            <p className="developer">Максим Егоров</p>
         </footer>
      </div>
   );
}
