import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { Switch } from '@components/switch/Switch';
import { useRouter } from 'next/router';
import { useDrag } from 'react-dnd';
import { TaskCard } from './components/task-card/TaskCard';
import style from './kanban-page.module.css';
import { TasksColumn } from './components/tasks-column/TaskColumn';
import { DndContext, useDroppable } from '@dnd-kit/core';
import TaskModalCreationEditing from '../TaskModalCreationEditing/page';
import { useGetAllTasksQuery, useGetTaskPrioritiesQuery, useGetTaskTagsQuery } from '@/api/tasks/tasks.api';
import { useGetProjectQuery } from '../ProjectsPage/api/api';
import { JSXElementConstructor, useEffect, useMemo } from 'react';
import { groupBy, groupByObject } from '@/utils/core';
import { projectsUrl, projectUrl } from '@/consts';
import { Stage, TaskMultiple } from '@/api/data.types';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars';
// import { Scrollbar } from 'react-scrollbars-custom';
// import task from '@/pages/projects/kanban/task';


const ScrollBar = Scrollbars as unknown as JSXElementConstructor<ScrollbarProps>;


export function KanbanPage() {
   //
   //
   const router = useRouter();

   const route = useMemo(() => router.query['task-slug'] as string, [router.query['task-slug']]);
   const loaded = useMemo(() => ({ skip: !router.query['task-slug'] }), [router.query['task-slug']]);

   const { data: { data: project } = { data: null }, error } = useGetProjectQuery(route, loaded);
   const { data: { data: priorities } = { data: null } } = useGetTaskPrioritiesQuery(undefined, loaded);

   const {
      data: { data: tasks } = { data: [] },
      isLoading,
      isSuccess,
      isError,
   } = useGetAllTasksQuery(route, { skip: !router.query['task-slug'] || !(project && priorities) }); //  || !taskStages?.length

   const stagedTasks = useMemo(() => {
      return groupByObject(
         project?.flow?.possibleProjectStages as Required<Stage>[],
         tasks as (Record<PropertyKey, unknown> & TaskMultiple)[],
         'stage'
      );
   }, [tasks, project?.flow?.possibleProjectStages]);

   const { isOver, setNodeRef } = useDroppable({
      id: 'droppable',
   });

   const dropstyle = { color: isOver ? 'green' : undefined };

   // interface Scrollbars {
   //    refs: Record<string, any>;
   // }

   return (
      <>
         <BreadCrumbs
            crumbs={[
               { text: 'Главная', url: '/' },
               { text: 'Проекты', url: projectsUrl },
               { text: project?.name || '', url: `/${projectUrl}/${router.query['task-slug']}` },
            ]}
         />

         {/* {JSON.stringify(project)} */}

         <div className={style.title}>
            <h1>{project?.name}</h1>

            <Switch onChange={(v) => v} checked={false} />
            <h6>Только мои</h6>

            <button>
               <span>+</span>
               Добавить задачу
            </button>
         </div>

         <div className={style.filters}>
            <div>
               <label htmlFor="task_name">Название задачи</label>
               <input name="task_name" type="text" placeholder="Название задачи" />
            </div>
            <div>
               <label htmlFor="username">Выбрать пользователей</label>
               <input name="username" type="text" placeholder="Пользователи" />
            </div>
            <div>
               <label htmlFor="username">Выбрать тип</label>
               <input name="username" type="text" placeholder="Выбрать тип" />
            </div>
            <div>
               <label htmlFor="username">Выбрать компонент</label>
               <input name="username" type="text" placeholder="Выбрать компонент" />
            </div>
         </div>

         <div className={style.filters}>
            <div>
               <input name="username" type="text" placeholder="Дата начала" />
            </div>
            <div>
               <input name="username" type="text" placeholder="Дата завершения" />
            </div>
         </div>

         <ScrollBar
            style={{ width: 500, height: 300 }}
         >
            <div className={style.kanban_container}>
               <DndContext id={'11'} onDragEnd={(e) => console.log('dropped', e.active.id, e.over?.id)}>
                  <div className={style.kanban}>
                     {project?.flow?.possibleProjectStages?.map((stage) => {
                        if (stage.id) {
                           const [stageTasks, stageInfo] = stagedTasks[stage.id] || [];

                           return (
                              <TasksColumn key={stage.id} stage={stage} tasksAmount={stageTasks?.length || 0}>
                                 {stageTasks?.map((task) => {
                                    return <TaskCard task={task} key={task.id} />;
                                 })}
                              </TasksColumn>
                           );
                        }

                        return null;
                     })}
                  </div>
               </DndContext>
            </div>
         </ScrollBar>

         <TaskModalCreationEditing isOpen={true} onClose={() => true} slug="xxxx" taskId={7} />
      </>
   );
}
