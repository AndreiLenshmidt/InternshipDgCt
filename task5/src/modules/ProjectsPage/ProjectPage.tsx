'use client';

import { AsidePanel } from '@components/left_menu/AsidePanel';
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { ProjectCard } from './components/project_card/ProjectCard';

import style from './projects-page.module.css';
import { useResize } from '@/hooks/resize';
import { useMemo, useCallback, useReducer } from 'react';
import { useGetProjectsQuery } from './api/api';
import { projectsUrl } from '@/consts';

export function ProjectPage() {
   //
   const { width } = useResize();

   const { data: { data: projects } = { data: [] }, isLoading, isSuccess, isError, error } = useGetProjectsQuery();

   const [justArchive, switchArchiveProjects] = useReducer((v) => !v, false);

   useMemo(() => {
      const columnsCount = Math.floor((width - 272) / 264); // 208 - on `5/1168`
      globalThis.document?.documentElement.style.setProperty('--columns-count', columnsCount.toString());
   }, [width]);

   return (
      <>
         <BreadCrumbs
            crumbs={[
               { text: 'Главная', url: '/' },
               { text: 'Проекты', url: projectsUrl },
            ]}
         />

         {isLoading ? 'isLoading' : 'no-Loading'}
         <br />
         {isSuccess ? 'isSuccess' : 'noSuccess'}
         <br />
         {isError ? error : 'no-error'}
         <br />
         {/* {projects ? projects.data : '___'} */}

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
            <input type="checkbox" name="" id="" onChange={switchArchiveProjects} />
            <span>Показать архивные проекты</span>
         </div>

         {justArchive ? (
            <div className={style.projects} style={{ marginTop: '40px' }}>
               {projects
                  .filter((proj) => proj.is_archived)
                  .map((proj) => {
                     return <ProjectCard key={proj.id} project={proj} onChange={(isFavorite) => {proj.is_favorite = isFavorite}} />;
                  })}
            </div>
         ) : (
            <>
               {projects.some((proj) => proj.is_favorite && !proj.is_archived) ? (
                  <>
                     <h4>Избранные проекты</h4>

                     <div className={style.favorite_projects}>
                        {/* {JSON.stringify(projects.data)} */}
                        {projects
                           .filter((proj) => proj.is_favorite && !proj.is_archived)
                           .map((proj) => {
                              return <ProjectCard key={proj.id} project={proj} />;
                           })}
                     </div>

                     <hr />
                  </>
               ) : (
                  <div style={{marginTop: '40px'}}></div>
               )}

               <div className={style.projects}>
                  {projects
                     .filter((proj) => !proj.is_favorite && !proj.is_archived)
                     .map((proj) => {
                        return <ProjectCard key={proj.id} project={proj} />;
                     })}
               </div>
            </>
         )}
      </>
   );
}
