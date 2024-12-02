'use client';

import { AsidePanel } from '@components/left_menu/AsidePanel';
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { ProjectCard } from './components/project_card/ProjectCard';

import style from './projects-page.module.css';
import { useResize } from '@/hooks/resize';
import { useMemo, useCallback } from 'react';
import { useGetProjectsQuery } from './api/api';

export function ProjectPage() {
   //
   const { width } = useResize();

   const { data: posts = [], isLoading, isSuccess, isError, error } = useGetProjectsQuery();   

   useMemo(() => {
      const columnsCount = Math.floor((width - 272) / 264); // 208 - on `5/1168`
      globalThis.document?.documentElement.style.setProperty('--columns-count', columnsCount.toString());
   }, [width]);

   return (
      <>
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
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
         </div>
      </>
   );
}
