import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { AsidePanel } from '@components/left_menu/AsidePanel';
import styles from './task-page.module.scss';
import { useGetCurrentUserQuery, useGetTaskByTaskIdQuery } from '@/api/appApi';
import { useRouter } from 'next/router';
import TaskContent from './components/TaskContent/TaskContent';

export default function TaskPage() {
   const router = useRouter();
   const { data, isLoading } = useGetTaskByTaskIdQuery(Number(router.query['slug']));
   console.log(data?.data);

   const { data: user } = useGetCurrentUserQuery();
   console.log(user?.data);

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
                           text: `Задачa id: ${Number(router.query['slug'])}`,
                           url: `/projects/task/${Number(router.query['slug'])}`,
                        },
                     ]}
                  />
                  <div className={styles.page_container}>
                     <TaskContent task={data?.data} activeUser={user?.data} />
                  </div>
               </div>
            </>
         )}
      </div>
   );
}
