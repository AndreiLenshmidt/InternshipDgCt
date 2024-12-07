import { TaskMultiple } from '@/api/data.types';
import { store, TypeRootState as GlobalState, TypeRootState } from '@/store/store';
import { useDraggable } from '@dnd-kit/core';
import { useEffect, useMemo } from 'react';
// import { RootState } from '@reduxjs/toolkit/dist/query/react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import style from './task-card.module.css';
import { groupBy } from '../../../../utils/core';
import { useGetTaskPrioritiesQuery, useGetTaskTagsQuery, useGetTaskTypesQuery } from '@/api/tasks/tasks.api';

// const priorities = {
//    1: 'Низкий',
//    2: 'Высокий',
// };

// (getState() as RootState).auth.token

export function TaskCard({ task }: { task: TaskMultiple }) {
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

   // const useStateSelector = useSelector.withTypes<GlobalState>();
   // const count = useStateSelector((state) => state['api/tasks']);
   // const count = useStateSelector((state) => state.tasks);

   const { data: { data: tagsInfo } = { data: null } } = useGetTaskTagsQuery(undefined);
   const { data: { data: prioritiesInfo } = { data: [] } } = useGetTaskPrioritiesQuery(undefined);
   const { data: { data: tasktypesInfo } = { data: [] } } = useGetTaskTypesQuery(undefined);   

   const priorities = useMemo(
      () =>
         prioritiesInfo.reduce(
            (acc, cur) => ((acc[cur.id as number] = cur.name || ''), acc),
            {} as Record<number, string>
         ),
      [prioritiesInfo]
   );

   const tag = useMemo(() => tagsInfo?.find((v) => v.id === task.id), [tagsInfo]);
   const tasktype = useMemo(() => tasktypesInfo?.find((v) => v.id === task.id), [tasktypesInfo]);

   useEffect(() => {
      console.log(tasktypesInfo);
   }, [tasktypesInfo]);

   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: task.id || 'draggable',
   });

   const dragstyle = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   return (
      <div className={style.card} ref={setNodeRef} {...listeners} {...attributes} style={dragstyle}>
         <div className={style.header}>
            <h5>id: {task.id}</h5>
            <div className={style.prioritize}>• {priorities[task.priority as keyof typeof priorities]}</div>
         </div>
         <h3>
            {task.name}
            {/* {store.getState()['api/tasks'].queries} */}
            {/* {(store.getState() as RootState)} */}
         </h3>
         <h4>{task.created_by}</h4>
         <div className={style.tags}>
            <span style={{ backgroundColor: tag?.color }}>{tag?.name}</span>
            <span>{tasktype?.name}</span>
         </div>
      </div>
   );
}
