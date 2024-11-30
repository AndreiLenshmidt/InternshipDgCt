'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.scss';
import { useAuth } from '@/store/hooks/useSelector';

export default function MainPage() {
  // dsdeveloper2@digital-sector.ru
  // tBK8x32NVPDG57zSAcXJUh
  // glavarevdva@digital-sector.ru
  // wmK86tTbdxveXBrHynQ4Uj

  const token = useAuth();
  console.log(token);

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
        <Link className={styles.link} href="/auth">
          Вход
        </Link>
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
