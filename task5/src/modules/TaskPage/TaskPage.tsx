import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { AsidePanel } from '@components/left_menu/AsidePanel';
import styles from './task-page.module.scss';
import { useGetCurrentUserQuery, useGetTaskByTaskIdQuery } from '@/api/appApi';
import { useRouter } from 'next/router';
import TaskContent from './components/TaskContent/TaskContent';
import { useEffect } from 'react';

export default function TaskPage() {
   const router = useRouter();
   const taskId = Number(router.query['slug']);
   const projectSlug = router.query['task-slug'] as string;
   const { data, isLoading } = useGetTaskByTaskIdQuery(taskId);
   console.log(data?.data);

   const { data: user } = useGetCurrentUserQuery();
   console.log(user?.data);

   useEffect(() => {
      if (!data?.data) {
         router.replace('/404');
      }
   });

   useEffect(() => {
      if (data?.data.project?.slug !== projectSlug && data?.data.project?.slug) {
         router.replace('/404');
      }
   }, [data?.data.project?.slug]);

   return (
      <div className={styles.layout_page}>
         {isLoading ? (
            <div className="loader" style={{ margin: '36% auto' }}></div>
         ) : (
            <>
               <AsidePanel />
               <div className={styles.layout_content}>
                  <BreadCrumbs
                     crumbs={[
                        { text: 'Главная', url: '/' },
                        { text: 'Проекты', url: '/projects' },
                        { text: 'Задачи', url: '/projects/task' },
                        {
                           text: `Задачa id: ${taskId}`,
                           url: `/projects/task/${taskId}`,
                        },
                     ]}
                  />
                  <div className={styles.page_container}>
                     <TaskContent task={data?.data} activeUser={user?.data} projectSlug={projectSlug} />
                  </div>
               </div>
            </>
         )}
      </div>
   );
}
