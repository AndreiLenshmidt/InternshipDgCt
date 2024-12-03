import { PropsWithChildren } from 'react';
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { AsidePanel } from '@components/left_menu/AsidePanel';

import { useRouter } from 'next/router';

import styles from './task-page.module.scss';

export default function Layout({ children }: PropsWithChildren) {
   console.log('layout...');

   const isModal = false;

   if (isModal) {
      return <div className={styles.layout_modal}>{children}</div>
   } else {
      return (
         <div className={styles.layout_page}>
            <AsidePanel />
            <div className={styles.layout_content}>
               <BreadCrumbs
                  crumbs={[
                     { text: 'Главная', url: '' },
                     { text: 'Проекты', url: '' },
                     { text: 'Название проекта', url: '' },
                  ]}
               />
               {children}
            </div>
         </div>
      );
   }

   // return <main>{children}</main>;
}
