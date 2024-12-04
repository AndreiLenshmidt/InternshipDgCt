import { PropsWithChildren } from "react";
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { AsidePanel } from '@components/left_menu/AsidePanel';

import { useRouter } from 'next/router';

import style from '../projects-page.module.css';


export default function Layout({ children }: PropsWithChildren) {
   

   // console.log('layout...');
   
   
   return (
      <div className={style.container}>
         <AsidePanel />
         <div className={style.content}>{children}</div>
      </div>
   );

   // return <main>{children}</main>;
}
