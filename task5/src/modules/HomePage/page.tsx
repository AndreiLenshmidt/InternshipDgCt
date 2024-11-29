"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.scss";
// import { useGetOAuthTokenQuery } from "@/storeless/api/authApi";
import { useEffect } from "react";
// import { useEffect } from "react";

export default function MainPage() {
  // const url = "http://dskanban.dev.digital-sector.ru/api";
  // useEffect(() => {
  //   const auth = async () => {
  //     const respons = await fetch(
  //       " https://trainee-academy.devds.ru/api/auth/token?email=dsdeveloper2%40digital-sector.ru&password=tBK8x32NVPDG57zSAcXJUh",
  //       {
  //         // headers: { accept: "application/json" },
  //         method: "POST",
  //       }
  //     );
  //     const data = await respons.json();
  //     console.log(data);
  //   };
  //   auth();
  // });
  // dsdeveloper2@digital-sector.ru
  // tBK8x32NVPDG57zSAcXJUh
  // glavarevdva@digital-sector.ru
  // wmK86tTbdxveXBrHynQ4Uj

  // const { data, isLoading, error } = useGetOAuthTokenQuery({
  //   email: "dsdeveloper2@digital-sector.ru",
  //   password: "tBK8x32NVPDG57zSAcXJUh",
  // });

  // console.log(data);

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
