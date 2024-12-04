import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { AsidePanel } from '@components/left_menu/AsidePanel';
import styles from './task-page.module.scss';
import { useGetTaskByTaskIdQuery } from './api/taskApi';
import { useRouter } from 'next/router';
import TaskContent from './components/TaskContent/TaskContent';
import { BASE_URL } from '@/consts';

export default function TaskPage() {
   const router = useRouter();
   // console.log(id);
   const { data } = useGetTaskByTaskIdQuery(Number(router.query['slug']));
   console.log(data?.data);

   return (
      <div className={styles.layout_page}>
         <AsidePanel />
         <div className={styles.layout_content}>
            <BreadCrumbs
               crumbs={[
                  { text: 'Главная', url: '' },
                  { text: 'Проекты', url: '' },
                  { text: 'Название проекта', url: '' },
               ]}
            />
            <div className={styles.page_container}>
               <TaskContent task={data?.data} link={`${BASE_URL}${router.asPath}`} />
            </div>
         </div>
      </div>
   );
}
