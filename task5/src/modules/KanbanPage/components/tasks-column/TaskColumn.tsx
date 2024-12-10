import { Stage } from '@/api/data.types';
// import { useDroppable } from '@dnd-kit/core';
import { LegacyRef, PropsWithChildren, useState } from 'react';
import { useDrop } from 'react-dnd';
import style from '../../kanban-page.module.css';

export function TasksColumn({ children, stage, tasksAmount }: { stage: Stage; tasksAmount: number } & PropsWithChildren) {
   //
   // const { isOver, setNodeRef } = useDroppable({
   //    id: stage.id || 'droppable',
   // });

   const [isOver, setOver] = useState(false);

   const dropstyle = {
      backgroundColor: isOver ? 'lightgray' : 'red',
   };

  const [collectedProps, drop] = useDrop(() => ({
     accept: 'text',
     hover(item, monitor) {
      //   console.log(item, stage.name, monitor.isOver());
      //   setOver(monitor.isOver());
     },
     drop(item, monitor) {
        console.warn(item);
     }
  }));   

   return (
      // ref={setNodeRef}
      <div className="col" ref={drop as unknown as LegacyRef<HTMLDivElement>}>
         <h4 data-count={tasksAmount}>{stage.name}</h4>
         {/* style={dropstyle} */}
         <div className={style.tasks}>
            {children}
         </div>
      </div>
   );
}
