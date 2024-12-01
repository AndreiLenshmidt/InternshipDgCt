import { useDroppable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';
import style from '../../kanban-page.module.css';

export function TasksColumn({ children, title }: { title: string } & PropsWithChildren) {
   // 
   const { isOver, setNodeRef } = useDroppable({
      id: 'droppable',
   });

   const dropstyle = {
      color: isOver ? 'green' : undefined,
   };   

   return (
      <div className="col" ref={setNodeRef} style={dropstyle}>
         <h4 data-count={4}>{title}</h4>
         <div className={style.tasks}>{children}</div>
      </div>
   );
}
