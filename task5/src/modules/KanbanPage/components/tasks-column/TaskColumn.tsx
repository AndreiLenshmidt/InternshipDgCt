import { Stage } from '@/api/data.types';
import { useDroppable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';
import style from '../../kanban-page.module.css';

export function TasksColumn({ children, stage, tasksAmount }: { stage: Stage; tasksAmount: number } & PropsWithChildren) {
   //
   const { isOver, setNodeRef } = useDroppable({
      id: stage.id || 'droppable',
   });

   const dropstyle = {
      backgroundColor: isOver ? 'lightgray' : undefined,
   };

   return (
      <div className="col" ref={setNodeRef}>
         <h4 data-count={tasksAmount}>{stage.name}</h4>
         <div className={style.tasks} style={dropstyle}>
            {children}
         </div>
      </div>
   );
}
