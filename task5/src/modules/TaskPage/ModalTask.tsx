import styles from './task-page.module.scss';
import TaskContent from './components/TaskContent/TaskContent';
import { useGetCurrentUserQuery, useGetTaskByTaskIdQuery } from '@/api/appApi';
import { MouseEvent } from 'react';
import { createPortal } from 'react-dom';

export default function ModalTask({
   id,
   projectSlug,
   onClose,
}: {
   id: number;
   projectSlug: string;
   onClose: CallableFunction;
}) {
   const { data: task, isLoading } = useGetTaskByTaskIdQuery(id);
   console.log(task?.data);

   const { data: user } = useGetCurrentUserQuery();
   console.log(user?.data);

   const modalCloseHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains(styles.layout_modal)) {
         onClose(false);
      }
   };

   const modal = createPortal(
      <div className={styles.layout_modal} onClick={(e) => modalCloseHandler(e)}>
         {isLoading ? (
            <div className="loader" style={{ margin: '36% auto' }}></div>
         ) : (
            <div className={styles.layout_modalbox}>
               <TaskContent task={task?.data} activeUser={user?.data} projectSlug={projectSlug} />
            </div>
         )}
      </div>,
      document.body
   );

   return modal;
}
