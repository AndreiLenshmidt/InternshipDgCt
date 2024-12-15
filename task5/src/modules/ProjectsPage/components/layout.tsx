import { PropsWithChildren } from 'react';
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { AsidePanel } from '@components/left_menu/AsidePanel';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useRouter } from 'next/router';

import style from '../projects-page.module.scss';

export default function Layout({ children }: PropsWithChildren) {
   // console.log('layout...');

   return (
      <div className={style.container}>
         <Provider store={store}>
            <AsidePanel />
         </Provider>
         <div className={style.content}>{children}</div>
      </div>
   );

   // return <main>{children}</main>;
}
