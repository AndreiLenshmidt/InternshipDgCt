import Image from 'next/image';

import style from './aside-panel.module.css';
import Logo from '@public/images/Logo.svg';
import Collapse from '@public/images/icons/collapse-btn.svg';
import ProjectsIcon from '@public/images/icons/projects.svg';
import { useReducer, useState } from 'react';

export function AsidePanel() {
   const [expanded, changeExpanded] = useReducer((v) => !v, true);

   return (
      <div className={[style.container, expanded ? '' : style.collapsed].join(' ')}>
         <div className={style.title}>
            <Logo />
            <h3>DS KANBAN</h3>
         </div>

         <div className={style.user}>
            {/*  style={{ backgroundImage: '' }} */}
            <div className={style.ava}></div>
            <div className="username">
               <h3>[[Админ Питоновский]]</h3>
               <h4>[[Web-дизайнер]]</h4>
            </div>
         </div>
         <button className={style.exit}>Выйти</button>

         <hr />

         {!expanded ? (
            <div className={style.projects_logo}>
               <ProjectsIcon />
            </div>
         ) : (
            <div className={style.projects}>
               <div className={style.projects_title}>
                  <ProjectsIcon />
                  <h3>Проекты</h3>
               </div>
            </div>
         )}

         <div className={style.collapse_btn} title="Свернуть" onClick={changeExpanded}>
            <Collapse />
         </div>
      </div>
   );
}
