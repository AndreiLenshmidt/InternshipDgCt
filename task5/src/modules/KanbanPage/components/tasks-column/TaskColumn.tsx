import { Stage } from '@/api/data.types';
import { PropsWithChildren } from 'react';
import style from '../../kanban-page.module.scss';

export function TasksColumn({
   children,
   stage,
   tasksAmount,
}: { stage: Stage; tasksAmount: number } & PropsWithChildren) {
   //
   // const { isOver, setNodeRef } = useDroppable({
   //    id: stage.id || 'droppable',
   // });

   // const dropstyle = {
   //    backgroundColor: isOver ? 'lightgray' : undefined,
   // };

   return (
      // ref={setNodeRef}
      <div className="col">
         <h4 data-count={tasksAmount}>{stage.name}</h4>
         {/*  style={dropstyle} */}
         <div className={style.tasks}>{children}</div>
      </div>
   );
}
