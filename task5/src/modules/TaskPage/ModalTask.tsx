import styles from './task-page.module.scss';
import TaskContent from './components/TaskContent/TaskContent';
import { taskApi, useGetTaskByTaskIdQuery } from './api/taskApi';
import { BASE_URL } from '@/consts';

export default function ModalTask({ id }: { id: number }) {
   const { data, isLoading, isSuccess } = useGetTaskByTaskIdQuery(id);
   console.log(data?.data);

   if (isLoading) {
      return;
   } else {
      return (
         <div className={styles.layout_modal}>
            <div className={styles.layout_modalbox}>
               <TaskContent task={data?.data} link={`${BASE_URL}/task/${id}`} />
            </div>
         </div>
      );
   }
}
