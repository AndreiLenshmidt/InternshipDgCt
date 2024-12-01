import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.scss';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// export function getStaticProps() {}

export default function MainPage() {
  // dsdeveloper2@digital-sector.ru
  // tBK8x32NVPDG57zSAcXJUh
  // glavarevdva@digital-sector.ru
  // wmK86tTbdxveXBrHynQ4Uj
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
    <>
      <header className={styles.header}>
        <Image
          src="/logo.svg"
          alt="logo"
          width={159}
          height={43}
          priority={true}
        />
        <LogInLogOutButton inOut={inOut} />
      </header>
      <main>Main</main>
      <footer className={styles.footer}>
        <p className="developer">Андрей Леншмидт</p>
        <p className="developer">Александр Саншайн</p>
        <p className="developer">Максим Егоров</p>
      </footer>
    </>
  );
}
