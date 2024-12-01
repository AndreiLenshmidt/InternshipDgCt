import { useDroppable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';
import style from '../../kanban-page.module.css';

export function TasksColumn({ children, title }: { title: string } & PropsWithChildren) {
   // 
   const { isOver, setNodeRef } = useDroppable({
      id: title || 'droppable',
   });

   const dropstyle = {
      backgroundColor: isOver ? 'lightgray' : undefined,
   };   

   return (
      <div className="col" ref={setNodeRef}>
         <h4 data-count={4}>{title}</h4>
         <div className={style.tasks} style={dropstyle}>
            {children}
         </div>
      </div>
   );
}
