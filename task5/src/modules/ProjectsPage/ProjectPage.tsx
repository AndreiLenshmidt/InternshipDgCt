'use client';

import { useMemo, useReducer, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { projectsUrl } from '@/consts';
import { useResize } from '@/hooks/resize';
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { useGetProjectsQuery } from './api/api';
import { ProjectCard } from './components/project_card/ProjectCard';
import { projectsFilterFormSchema } from './utils/validationSchema';

import style from './projects-page.module.css';

type FormSchema = z.infer<typeof projectsFilterFormSchema>;

export function ProjectPage() {
   //
   const { width } = useResize();

   const { data: { data: projects } = { data: [] }, isLoading, isSuccess, isError, error } = useGetProjectsQuery();

   const [filterData, setFilterData] = useState<Record<keyof FormSchema, string>>({ projectName: '', taskId: '' });
   const viewedProjects = useMemo(
      () => projects.filter((p) => p.name && ~p.name.toLowerCase().indexOf(filterData.projectName.toLowerCase())),
      [projects, filterData]
   );
 
   const [justArchive, switchArchiveProjects] = useReducer((v) => !v, false);

   const {
      register,
      clearErrors,
      handleSubmit,      
      reset,
      // setFocus,
      formState: { isDirty, isSubmitting, errors },
   } = useForm<FormSchema>({
      resolver: zodResolver(projectsFilterFormSchema),
      defaultValues: {
         projectName: '',
      },
   });

   useMemo(() => {
      const columnsCount = Math.floor((width - 272) / 264); // 208 - on `5/1168`
      globalThis.document?.documentElement.style.setProperty('--columns-count', columnsCount.toString());
   }, [width]);

   const onSubmit: SubmitHandler<FormSchema> = (data) => {

      if ((data.projectName?.length || 0) >= 3) {
         setFilterData(data as typeof filterData);
      }

      // filterData = data as typeof filterData;
      // просто выводим данные в консоль
      console.log(data);
      // сбрасываем состояние формы (очищаем поля)
      // reset();
   };

   return (
      <>
         <BreadCrumbs
            crumbs={[
               { text: 'Главная', url: '/' },
               { text: 'Проекты', url: projectsUrl },
            ]}
         />

         <br />

         <h1>Проекты</h1>

         <form className={style.filters} onSubmit={handleSubmit(onSubmit)}>
            {/* {JSON.stringify(errors)} */}

            <div data-error={errors.projectName?.message}>
               <label htmlFor="projectName" className="label">
                  Название проекта
               </label>
               <input
                  style={{ backgroundColor: errors.projectName ? '#FFF1F0' : undefined }}
                  type="text"
                  id="projectName"
                  placeholder="Введите название проекта"
                  {...register('projectName')}
               />
            </div>
            <div data-error={errors.taskId?.message}>
               <label htmlFor="taskId" className="label">
                  Номер задачи
               </label>
               <input
                  style={{ backgroundColor: errors.taskId ? '#FFF1F0' : undefined }}
                  type="text"
                  id="taskId"
                  placeholder="Введите номер задачи"
                  // onInput={(e) => {if ((e.target as HTMLInputElement).value === '') reset(); }}
                  {...register('taskId', {
                     setValueAs: (v: string) => (v.length ? +v : ''),
                     required: false,
                     // valueAsNumber: true,
                  })}
               />
            </div>
            <button type="submit" style={{ display: 'none' }}></button>
         </form>
         <div className={style.archive_checkbox}>
            <input type="checkbox" name="" id="" onChange={switchArchiveProjects} />
            <span>Показать архивные проекты</span>
         </div>

         {justArchive ? (
            <div className={style.projects} style={{ marginTop: '40px' }}>
               {viewedProjects
                  .filter((proj) => proj.is_archived)
                  .map((proj) => {
                     return (
                        <ProjectCard
                           key={proj.id}
                           project={proj}
                           onChange={(isFavorite) => {
                              proj.is_favorite = isFavorite;
                           }}
                        />
                     );
                  })}
            </div>
         ) : (
            <>
               {projects.some((proj) => proj.is_favorite && !proj.is_archived) ? (
                  <>
                     <h4 style={{ margin: '3rem 0 2rem' }}>Избранные проекты</h4>

                     <div className={style.favorite_projects}>
                        {viewedProjects
                           .filter((proj) => proj.is_favorite && !proj.is_archived)
                           .map((proj) => {
                              return <ProjectCard key={proj.id} project={proj} />;
                           })}
                     </div>

                     <hr />
                  </>
               ) : (
                  <div style={{ marginTop: '40px' }}></div>
               )}

               <div className={style.projects}>
                  {viewedProjects
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
