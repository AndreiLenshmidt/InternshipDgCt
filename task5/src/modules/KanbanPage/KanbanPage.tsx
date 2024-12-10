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
import { JSXElementConstructor, useEffect, useMemo, useRef } from 'react';
import { groupBy, groupByObject } from '@/utils/core';
import { projectsUrl, projectUrl } from '@/consts';
import { Stage, TaskMultiple } from '@/api/data.types';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars';
import { Scrollbar } from 'react-scrollbars-custom';
import { useResize } from '@/hooks/resize';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
// import task from '@/pages/projects/kanban/task';

const ScrollBar = Scrollbars as unknown as JSXElementConstructor<ScrollbarProps>;

export function KanbanPage() {
   //
   //
   const router = useRouter();
   
   const wrapper = useRef<HTMLDivElement>(null);
   
   const route = useMemo(() => router.query['task-slug'] as string, [router.query['task-slug']]);
   const loaded = useMemo(() => ({ skip: !router.query['task-slug'] }), [router.query['task-slug']]);
   
   const { height } = useResize();
   
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

   useEffect(() => {
      height;

      debugger
      console.log(wrapper.current?.offsetWidth);
      // $0.getBoundingClientRect().y
   }, [wrapper]);

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

         {/* autoHeight autoHeightMin={500} */}
         {/* // width: (width || 0) - 336, // TODO (reTODO) with s/m */}

         <Scrollbar
            noScrollY
            style={{
               height: 300 // height || 0, // TODO
            }}
         >
            <div ref={wrapper} className={style.kanban_container}>               
               {/* <DndContext id={'11'} onDragStart={(e) => {}} onDragEnd={(e) => console.log('dropped', e.active.id, e.over?.id)}> */}
               <DndProvider backend={HTML5Backend}>
                  <div className={style.kanban}>
                     {project?.flow?.possibleProjectStages?.map((stage) => {
                        if (stage.id) {
                           const [stageTasks, stageInfo] = stagedTasks[stage.id] || [];

                           return (
                              <TasksColumn key={stage.id} stage={stage} tasksAmount={stageTasks?.length || 0}>
                                 <Scrollbar noScrollX style={{ height: 800, width: 250 }}>
                                    {stageTasks?.map((task) => {
                                       return <TaskCard task={task} key={task.id} />;
                                    })}
                                 </Scrollbar>
                                 {/* ScrollbarsCustom-Scroller, ScrollbarsCustom-Wrapper, ScrollbarsCustom-Scroller? -> display: contents; */}
                                 {/* ScrollbarsCustom-Scroller, ScrollbarsCustom-Wrapper -> overflow: null; */}
                              </TasksColumn>
                           );
                        }

                        return null;
                     })}
                  </div>
               </DndProvider>
               {/* </DndContext> */}
            </div>
         </Scrollbar>

         <TaskModalCreationEditing isOpen={true} onClose={() => true} slug="xxxx" taskId={7} />
      </>
   );
}
