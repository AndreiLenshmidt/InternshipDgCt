import { useDraggable } from '@dnd-kit/core';
import { useDrag } from 'react-dnd';
import style from './task-card.module.css';

export function TaskCard({ id }: { id?: string }) {
   // const [{ opacity }, dragRef] = useDrag(
   //    () => ({
   //       type: 'image',
   //       item: { id: 11111111 },
   //       collect: (monitor) => ({
   //          opacity: monitor.isDragging() ? 0.5 : 1,
   //       }),
   //    }),
   //    []
   // );

   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: id || 'draggable',
   });

   const dragstyle = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   return (
      <div className={style.card} ref={setNodeRef} {...listeners} {...attributes} style={dragstyle}>
         <div className={style.header}>
            <h5>id: 5244624</h5>
            <div className={style.prioritize}>• Высокий</div>
         </div>
         <h3>Добавить автотесты авторизациии почтовых уведомлений</h3>
         <h4>author</h4>
         <div className={style.tags}>
            <span>разработка</span>
            <span>задача</span>
         </div>
      </div>
   );
}
