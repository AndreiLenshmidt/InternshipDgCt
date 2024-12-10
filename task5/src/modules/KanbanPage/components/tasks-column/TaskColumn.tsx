import { Stage } from '@/api/data.types';
// import { useDroppable } from '@dnd-kit/core';
import { LegacyRef, PropsWithChildren } from 'react';
import { useDrop } from 'react-dnd';
import style from '../../kanban-page.module.css';

export function TasksColumn({ children, stage, tasksAmount }: { stage: Stage; tasksAmount: number } & PropsWithChildren) {
   //
   // const { isOver, setNodeRef } = useDroppable({
   //    id: stage.id || 'droppable',
   // });

   // const dropstyle = {
   //    backgroundColor: isOver ? 'lightgray' : undefined,
   // };

  const [collectedProps, drop] = useDrop(() => ({
     accept: 'text',
  }));   

   return (
      // ref={setNodeRef}
      <div className="col" ref={drop as unknown as LegacyRef<HTMLDivElement>}>
         <h4 data-count={tasksAmount}>{stage.name}</h4>
         {/* style={dropstyle} */}
         <div className={style.tasks}>{children}</div>
      </div>
   );
}
