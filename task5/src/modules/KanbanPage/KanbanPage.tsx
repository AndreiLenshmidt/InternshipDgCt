import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { Switch } from '@components/switch/Switch';
import { TaskModalCreationEditing } from '@/modules/TaskModalCreationEditing/page';
import { useRouter } from 'next/router';
import { useDrag } from 'react-dnd';
import { TaskCard } from './components/task-card/TaskCard';
import style from './kanban-page.module.css';
import { TasksColumn } from './components/tasks-column/TaskColumn';
import { useGetAllTasksQuery, useGetTaskPrioritiesQuery, useGetTaskTagsQuery } from '@/api/tasks/tasks.api';
import { useGetProjectQuery } from '../ProjectsPage/api/api';
import { JSXElementConstructor, useEffect, useMemo, useState, useRef } from 'react';
import { groupBy, groupByObject } from '@/utils/core';
import { projectsUrl, projectUrl } from '@/consts';
import { Stage, TaskMultiple } from '@/api/data.types';
import { Scrollbar } from 'react-scrollbars-custom';
import { useResize } from '@/hooks/resize';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ModalTask from '../TaskPage/ModalTask';
import { useGetCurrentUserQuery } from '@/api/appApi';

// import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars';
// import task from '@/pages/projects/kanban/task';

// const ScrollBar = Scrollbars as unknown as JSXElementConstructor<ScrollbarProps>;

export function KanbanPage() {
   //
   //
   const router = useRouter();

   const wrapper = useRef<HTMLDivElement>(null);
   const [justMine, setJustMine] = useState(false);

   const route = useMemo(() => router.query['task-slug'] as string, [router.query['task-slug']]);
   const loaded = useMemo(() => ({ skip: !router.query['task-slug'] }), [router.query['task-slug']]);

   // Для открытия окна создания/ редактирования задачи
   const [projectSlag, setProjectSlag] = useState<string>('');
   const [taskIdEditTask, setTaskIdEditTask] = useState<number | undefined>();
   const [isOpenCreateTask, setIsOpenCreateTask] = useState(false);
   const [newTaskId, setNewTaskId] = useState<number | undefined>();
   const [newTaskFlag, setNewTaskFlag] = useState(false);
   // ------------------------------------------------
   const [isOpenTask, setOpenTask] = useState<boolean>(false);

   const { height } = useResize();

   const { data: { data: user } = { data: null } } = useGetCurrentUserQuery();

   const { data: { data: project } = { data: null }, error } = useGetProjectQuery(route, loaded);
   const { data: { data: priorities } = { data: null } } = useGetTaskPrioritiesQuery(undefined, loaded);

   const {
      data: { data: tasks } = { data: [] },
      isLoading,
      isSuccess,
      isError,
   } = useGetAllTasksQuery(route, { skip: !router.query['task-slug'] || !(project && priorities) }); //  || !taskStages?.length

   const stagedTasks = useMemo(() => {
      const grouped = groupByObject(
         project?.flow?.possibleProjectStages as Required<Stage>[],
         tasks as (Record<PropertyKey, unknown> & TaskMultiple)[],
         'stage',
         justMine ? (item) => item.created_by === user?.id : undefined
      );
      return grouped;
   }, [tasks, project?.flow?.possibleProjectStages, justMine]);

   useEffect(() => {
      console.log(wrapper.current?.offsetWidth);
      // $0.getBoundingClientRect().y
   }, [wrapper]);

   // const { isOver, setNodeRef } = useDroppable({
   //    id: 'droppable',
   // });

   // const dropstyle = { color: isOver ? 'green' : undefined };

   // interface Scrollbars {
   //    refs: Record<string, any>;
   // }
   // const { isOver, setNodeRef } = useDroppable({
   //    id: 'droppable',
   // });

   // const dropstyle = { color: isOver ? 'green' : undefined };

   // Функция для получения newTaskId от дочернего компонента
   const handleNewTaskId = (taskId: number) => {
      setNewTaskId(taskId);
   };

   const handlerNewTask = () => {
      setNewTaskFlag(true);
      setTaskIdEditTask(undefined);

      const taskSlug = router.query['task-slug'];
      if (Array.isArray(taskSlug)) {
         setProjectSlag(taskSlug[0]);
      } else if (typeof taskSlug === 'string') {
         setProjectSlag(taskSlug);
      } else {
         setProjectSlag('');
      }

      setIsOpenCreateTask(!isOpenCreateTask);
   };

   const handleOpenTask = (id: number | undefined) => {
      setTaskIdEditTask(id);
      setProjectSlag(route);
      setOpenTask(true);
   };

   // console.log(router.query['task-slug'], 'router.query[task-slug]'); //, isCloseModal: boolean

   return (
      <div className={style.base} style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4rem)' }}>
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

            <Switch
               onChange={(v) => {
                  setJustMine(!justMine);
                  return true;
               }}
               checked={false}
            />
            <h6>Только мои</h6>

            <button onClick={handlerNewTask}>
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

         {isOpenCreateTask && (
            <TaskModalCreationEditing
               isOpen={isOpenCreateTask}
               onClose={() => setIsOpenCreateTask(false)}
               slugName={projectSlag}
               taskId={taskIdEditTask}
               newTaskId={newTaskId}
               onNewTaskId={handleNewTaskId}
               newTaskFlag={newTaskFlag}
            />
         )}
         {isOpenTask && taskIdEditTask && (
            <ModalTask id={taskIdEditTask} projectSlug={projectSlag} onClose={setOpenTask} />
         )}

         <Scrollbar
            noScrollY
            style={{
               height: 300, // height || 0, // TODO
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
                              tasks as (Record<PropertyKey, unknown> & TaskMultiple)[],
                              (
                                 <TasksColumn
                                    key={stage.id}
                                    stage={stage}
                                    tasksAmount={stageTasks?.length || 0}
                                    tasks={tasks}
                                 >
                                    <Scrollbar noScrollX style={{ height: 800, width: 250 }}>
                                       {stageTasks?.map((task) => {
                                          return (
                                             <TaskCard
                                                task={task}
                                                key={task.id}
                                                openTask={() => handleOpenTask(task?.id)}
                                             />
                                          );
                                       })}
                                    </Scrollbar>
                                    {/* ScrollbarsCustom-Scroller, ScrollbarsCustom-Wrapper, ScrollbarsCustom-Scroller? -> display: contents; */}
                                    {/* ScrollbarsCustom-Scroller, ScrollbarsCustom-Wrapper -> overflow: null; */}
                                 </TasksColumn>
                              )
                           );
                        }

                        return null;
                     })}
                  </div>
               </DndProvider>
               {/* </DndContext> */}
            </div>
         </Scrollbar>
      </div>
   );
}
