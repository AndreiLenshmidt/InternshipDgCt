import Image from 'next/image';

import style from './aside-panel.module.css';
import Logo from '@public/Logo.svg';
import Collapse from '@public/icons/collapse-btn.svg';
import ProjectsIcon from '@public/icons/projects.svg';
import Link from 'next/link';
import { useReducer, useState } from 'react';
import { projectsUrl, projectUrl } from '@/consts';

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
                  <Link href={projectsUrl}>
                     <h3>Проекты</h3>
                  </Link>
               </div>
            </div>
         )}

         <div className={style.collapse_btn} title="Свернуть" onClick={changeExpanded}>
            <Collapse />
         </div>
      </div>
   );
}
