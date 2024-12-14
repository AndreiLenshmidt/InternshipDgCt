import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { Switch } from '@components/switch/Switch';
import { TaskModalCreationEditing } from '@/modules/TaskModalCreationEditing/page';
import { useRouter } from 'next/router';
import { useDrag } from 'react-dnd';
import { TaskCard } from './components/task-card/TaskCard';
import style from './kanban-page.module.scss';
import { TasksColumn } from './components/tasks-column/TaskColumn';
import { useGetAllTasksQuery, useGetTaskPrioritiesQuery, useGetTaskTagsQuery } from '@/api/tasks/tasks.api';
import { useGetProjectQuery } from '../ProjectsPage/api/api';
import { JSXElementConstructor, useEffect, useMemo, useState, useRef } from 'react';
import { groupBy, groupByObject } from '@/utils/core';
import { projectsUrl, projectUrl } from '@/consts';
import { Stage, TaskMultiple, User } from '@/api/data.types';
import { Scrollbar } from 'react-scrollbars-custom';
import { useResize } from '@/hooks/resize';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ModalTask from '../TaskPage/ModalTask';
import { useStagedTasks } from './hooks/stagedTasks';
import { useGetCurrentUserQuery } from '@/api/appApi';
import InfoModal from '@/modules/TaskPage/components/InfoModal/InfoModal';
import { useModalInfo } from '@/hooks/useModalInfo';

// import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars';
// import task from '@/pages/projects/kanban/task';

// const ScrollBar = Scrollbars as unknown as JSXElementConstructor<ScrollbarProps>;

export function KanbanPage() {
   //
   //
   const router = useRouter();
   const route = useMemo(() => router.query['task-slug'] as string, [router.query['task-slug']]);

   const { tasks, stagedTasks, tasksRefetch, user, showJustMine, project, isSuccess } = useStagedTasks(route);

   // const dropstyle = { color: isOver ? 'green' : undefined };

   ///
   /// ДЛЯ ОТКРЫТИЯ ОКНА СОЗДАНИЯ/ РЕДАКТИРОВАНИЯ ЗАДАЧИ:
   ///

   // Для открытия окна создания/ редактирования задачи
   const modalInfo = useModalInfo();
   const [projectSlag, setProjectSlag] = useState<string>('');
   const [taskIdEditTask, setTaskIdEditTask] = useState<number | undefined>();
   const [isOpenCreateTask, setIsOpenCreateTask] = useState(false);
   const [newTaskId, setNewTaskId] = useState<number | undefined>();
   const [newTaskFlag, setNewTaskFlag] = useState(false);
   const [tasksLocal, setTasksLocal] = useState<TaskMultiple[]>([]);
   const [delTaskFlag, setDelTaskFlag] = useState(false);

   // ------------------------------------------------
   const [isOpenTask, setOpenTask] = useState<boolean>(false);
   const [currentStage, setCurrentStage] = useState<Stage>();

   // const { data: { data: project } = { data: null }, error } = useGetProjectQuery(route, loaded);
   // const { data: { data: priorities } = { data: null } } = useGetTaskPrioritiesQuery(undefined, loaded);

   // const {
   //    data: { data: tasks } = { data: [] },
   //    isLoading,
   //    isSuccess,
   //    isError,
   //    refetch,
   // } = useGetAllTasksQuery(route, { skip: !router.query['task-slug'] || !(project && priorities) }); //  || !taskStages?.length
   // const stagedTasks = useMemo(() => {
   //    return groupByObject(
   //       project?.flow?.possibleProjectStages as Required<Stage>[],
   //       tasks as (Record<PropertyKey, unknown> & TaskMultiple)[],
   //       'stage'
   //    );
   // }, [tasks, project?.flow?.possibleProjectStages]);

   console.log(tasks, 'tasks');

   useEffect(() => {
      if (isSuccess) {
         setTasksLocal(tasks);
      }
   }, [isSuccess, tasks]);

   // const { isOver, setNodeRef } = useDroppable({
   //    id: 'droppable',
   // });

   // const dropstyle = { color: isOver ? 'green' : undefined };

   // Функция для получения newTaskId от дочернего компонента
   const handleNewTaskId = (taskId: number) => {
      setNewTaskId(taskId);
   };

   const delTaskFunc = (flag: boolean) => {
      setDelTaskFlag(flag);
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

   const handleOpenTask = (id: number | undefined, stage: Stage) => {
      setCurrentStage(stage);
      setTaskIdEditTask(id);
      setProjectSlag(route);
      setOpenTask(true);
      setDelTaskFlag(false);
   };

   /////////////////////////

   // InfoModal в случае успешного создания задачи
   useEffect(() => {
      if (newTaskFlag && newTaskId && isSuccess) {
         modalInfo.setCloseModal(true);
         modalInfo.setModalTitle('Успех');
         modalInfo.setModalType('info');
         modalInfo.setModalInfo('Задача успешно создана');

         tasksRefetch();
         setDelTaskFlag(false);
      }
   }, [newTaskFlag, tasksRefetch, newTaskId]);

   useEffect(() => {
      if (delTaskFlag && isSuccess) {
         modalInfo.setCloseModal(true);
         modalInfo.setModalTitle('Успех');
         modalInfo.setModalType('info');
         modalInfo.setModalInfo('Задача успешно удалена');

         tasksRefetch();
         setDelTaskFlag(false);
      }
   }, [delTaskFlag, tasksRefetch]);

   useEffect(() => {
      if (isSuccess) {
         tasksRefetch();
      }
   }, [isOpenTask]);

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

            <Switch onChange={(v) => (showJustMine((v) => !v), true)} checked={false} />
            <h6>Только мои</h6>

            {user?.is_admin ? (
               <button onClick={handlerNewTask}>
                  <span>+</span>
                  Добавить задачу
               </button>
            ) : (
               ''
            )}
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

         {modalInfo.modal ? (
            <InfoModal
               type={modalInfo.modalType}
               title={modalInfo.modalTitle}
               info={modalInfo.modalInfo}
               setClose={modalInfo.setCloseModal}
            />
         ) : (
            <></>
         )}

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
            <ModalTask
               id={taskIdEditTask}
               projectSlug={projectSlag}
               onClose={setOpenTask}
               refetch={tasksRefetch}
               delTaskFunc={delTaskFunc}
               currentStage={currentStage}
            />
         )}

         {/* autoHeight autoHeightMin={500} */}
         {/* // width: (width || 0) - 336, // TODO (reTODO) with s/m */}

         <Scrollbar
            noScrollY
            style={{
               height: 300, // height || 0, // TODO
            }}
         >
            <div className={style.kanban_container}>
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
                                                openTask={() => handleOpenTask(task?.id, stage)}
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
