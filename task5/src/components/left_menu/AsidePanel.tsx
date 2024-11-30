// import Image from 'next/image';

import style from './aside-panel.module.css';
import Logo from '@public/images/Logo.svg'

export function AsidePanel() {
   return (
      <>
         <div className={style.container}>
            <div className={style.collapse_btn}></div>
            <div className={style.title}>
               <Logo />
               <h3>DS KANBAN</h3>
            </div>
         </div>
      </>
   );
}
