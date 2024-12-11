import { Stage, TaskMultiple, ValidationError } from '@/api/data.types';
import { tasksApi, useGetAllTasksQuery, useLazyGetAllTasksQuery, useUpdateTaskMutation } from '@/api/tasks/tasks.api';
import { useRouter } from 'next/router';
// import { useDroppable } from '@dnd-kit/core';
import { LegacyRef, PropsWithChildren, useState } from 'react';
import { useDrop } from 'react-dnd';
import style from '../../kanban-page.module.css';

export function TasksColumn({
   children,
   stage,
   tasksAmount,
   // tasks,
}: { stage: Stage; tasksAmount: number; tasks?: TaskMultiple[] } & PropsWithChildren) {
   //
   // const { isOver, setNodeRef } = useDroppable({
   //    id: stage.id || 'droppable',
   // });

   const router = useRouter();

   const [getTasks, tasks] = useLazyGetAllTasksQuery();
   const [updateTask, result] = useUpdateTaskMutation({
      fixedCacheKey: 'shared-update-task',
   });

   /**
    * @description - работает некорректно на leave hover
    */
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
         // const { data } = tasksApi.endpoints.getAllTasks.useQuery('');  // <- raw data
         // const { data } = tasksApi.useGetAllTasksQuery(router.query['task-slug']);        // -//- via slice object (== via s/m)
         // const [updatePost, { data }] = api.endpoints.updatePost.useMutation()

         
         getTasks(router.query['task-slug'] as string).then(({data: tasks}) => {
            
            const { data } = tasks || {};
            const task = data?.find((task) => task.id === (item as { id: number }).id);
            
            // debugger;
            updateTask({ ...task, stage: stage.id }).then((e) => {
               if ('error' in e) {
                  const { data: error } = e.error as { data: ValidationError };
                  console.log(error);
                  
                  
                  alert(Object.values(error.errors as Record<string, string[]>)[0] || error.message);
               }
            });
         })

         // updateTask();
         // handleUpdate(item.id, );
         // updateTask()
      },
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
