import styles from './task-page.module.scss';
import Close from '@public/icons/close.svg';
import TaskContent from './components/TaskContent/TaskContent';
import { useGetCurrentUserQuery, useGetTaskByTaskIdQuery } from '@/api/appApi';
import { MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Stage } from '@/api/data.types';

export default function ModalTask({
   id,
   projectSlug,
   onClose,
   refetch,
   delTaskFunc,
   currentStage,
}: {
   id: number;
   projectSlug: string;
   onClose: CallableFunction;
   refetch: CallableFunction;
   delTaskFunc?: (flag: boolean) => void;
   currentStage?: Stage;
}) {
   const { data: task, isLoading, isError } = useGetTaskByTaskIdQuery(id);
   console.log(task?.data, 'task?.data************');

   const { data: user } = useGetCurrentUserQuery();
   // console.log(user?.data);

   const modalCloseHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains(styles.layout_modal)) {
         onClose(false);
      }
   };

   const modal = createPortal(
      <div className={styles.layout_modal} onClick={(e) => modalCloseHandler(e)}>
         <button className={styles['close-button-modal']} type="button" onClick={() => onClose(false)}>
            <Close />
         </button>
         {isLoading ? (
            <div className="loader" style={{ margin: '36% auto' }}></div>
         ) : isError ? (
            <div className={styles.layout_modalbox}>
               <p>Задача не найдена</p>
            </div>
         ) : (
            <div className={styles.layout_modalbox}>
               <TaskContent
                  task={task?.data}
                  activeUser={user?.data}
                  projectSlug={projectSlug}
                  onClose={onClose}
                  refetch={refetch}
                  delTaskFunc={delTaskFunc}
                  currentStage={currentStage}
               />
            </div>
         )}
      </div>,
      document.body
   );

   return modal;
}
