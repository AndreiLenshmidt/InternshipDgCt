import { useEffect, useState } from 'react';
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { Switch } from '@components/switch/Switch';
import { TaskModalCreationEditing } from '@/modules/TaskModalCreationEditing/page';
import { useRouter } from 'next/router';
import { useDrag } from 'react-dnd';
import { TaskCard } from './components/task-card/TaskCard';
import style from './kanban-page.module.css';
import { TasksColumn } from './components/tasks-column/TaskColumn';
import { DndContext, useDroppable } from '@dnd-kit/core';
import task from '@/pages/projects/kanban/task';

const projectUrl = 'projects';

export function KanbanPage() {
   //
   const router = useRouter();

   // Для открытия окна создания/ редактирования задачи
   const [projectSlag, setProjectSlag] = useState<string>('');
   const [taskIdEditTask, setTaskIdEditTask] = useState<number | undefined>();
   const [isOpenCreateTask, setIsOpenCreateTask] = useState(false);
   const [newTaskId, setNewTaskId] = useState<number | undefined>();
   const [newTaskFlag, setNewTaskFlag] = useState(false);
   // ------------------------------------------------

   const { isOver, setNodeRef } = useDroppable({
      id: 'droppable',
   });

   const dropstyle = {
      color: isOver ? 'green' : undefined,
   };

   // Функция для получения newTaskId от дочернего компонента
   const handleNewTaskId = (taskId: number) => {
      setNewTaskId(taskId);
   };

   const handlerNewTask = () => {
      setNewTaskFlag(true);
      setTaskIdEditTask(undefined);
      setProjectSlag('project4'); //!!! поменять на slag
      setIsOpenCreateTask(!isOpenCreateTask);
   };

   // console.log(router.query['task-slug'], 'router.query[task-slug]');

   return (
      <>
         <BreadCrumbs
            crumbs={[
               { text: 'Главная', url: '/' },
               { text: 'Проекты', url: '/' + projectUrl },
               { text: '[Demo Project]', url: `/${projectUrl}/${router.query['task-slug']}` },
            ]}
         />

         <div className={style.title}>
            <h1>[Demo Project]</h1>

            <Switch onChange={(v) => v} checked={false} />
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

         <div className={style.kanban_container}>
            <DndContext id={'111'} onDragEnd={(e) => console.log('dropped', e.active.id, e.over?.id)}>
               <div className={style.kanban}>
                  <TasksColumn title={'Новые'}>
                     <TaskCard />
                     <TaskCard id={'2'} />
                     <TaskCard />
                  </TasksColumn>

                  <TasksColumn title={'В работе'}>
                     <TaskCard />
                  </TasksColumn>

                  <TasksColumn title={'Выполнены'}>
                     <TaskCard />
                     <TaskCard />
                  </TasksColumn>

                  <TasksColumn title={'В ревью'}></TasksColumn>

                  <TasksColumn title={'В тестировании'}>
                     <TaskCard />
                  </TasksColumn>
               </div>
            </DndContext>
         </div>
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
      </>
   );
}
