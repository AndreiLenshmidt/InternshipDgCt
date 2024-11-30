'use client';

import { AsidePanel } from '@components/left_menu/AsidePanel';
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { ProjectCard } from './components/project_card/ProjectCard';

import style from './projects-page.module.css';
import { useResize } from '@/hooks/resize';
import { useMemo, useCallback } from 'react';

export function ProjectPage() {
   const { width } = useResize();

   useMemo(() => {
      const columnsCount = Math.floor((width - 272) / 208);
      // document.getElementsByTagName('html')[0].style.setProperty('--my-css-var', myVar);
      // document.body.style.setProperty('--background-color', 'blue');
      // globalThis.document.documentElement.style.setProperty('--columns-count', columnsCount.toString());

      globalThis.document?.documentElement.style.setProperty('--columns-count', columnsCount.toString());
   }, [width]);

   // const columnsCount = useMemo(() => {
   //    console.log(width);
   //    return Math.floor((width - 272) / 208)
   // }, [width]);

   // console.log(columnsCount);

   return (
      <div className={style.container}>
         <AsidePanel />
         <div className={style.content}>
            <BreadCrumbs
               crumbs={[
                  { text: 'Главная', url: '' },
                  { text: 'Проекты', url: '' },
               ]}
            />

            <h1>Проекты</h1>

            <div className={style.filters}>
               <div>
                  <h6>Номер проекта</h6>
                  <input type="text" placeholder="Введите название проекта" />
               </div>
               <div>
                  <h6>Номер задачи</h6>
                  <input type="text" placeholder="Введите номер задачи" />
               </div>
            </div>
            <div className={style.archive_checkbox}>
               <input type="checkbox" name="" id="" />
               <span>Показать архивные проекты</span>
            </div>

            <h4>Избранные проекты</h4>

            {/*  style={{ gridTemplateColumns: `repeat(${columnsCount || 4}, 1fr)` }} */}

            {/* style={{ gridTemplateColumns: `repeat(${columnsCount || 4}, 1fr)` }} */}
            <div className={style.favorite_projects}>
               <ProjectCard />
               <ProjectCard />
            </div>

            <hr />

            <div className={style.projects}>
               <ProjectCard />
               <ProjectCard />
               <ProjectCard />
               <ProjectCard />
               <ProjectCard />
               {/* <ProjectCard />
               <ProjectCard />
               <ProjectCard />
               <ProjectCard />
               <ProjectCard />
               <ProjectCard /> */}
            </div>
         </div>
      </div>
   );
}
