import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { Switch } from '@components/switch/Switch';
import { useRouter } from 'next/router';
import { useDrag } from 'react-dnd';
import { TaskCard } from './components/task-card/TaskCard';
import style from './kanban-page.module.css';
import { TasksColumn } from './components/tasks-column/TaskColumn';
import { DndContext, useDroppable } from '@dnd-kit/core';
import TaskModalCreationEditing from '../TaskModalCreationEditing/page';
import task from '@/pages/projects/kanban/task';
import { useGetAllTasksQuery } from '@/api/tasks/tasks.api';
import { useGetProjectQuery } from '../ProjectsPage/api/api';

const projectUrl = 'projects';

export function KanbanPage() {
   //
   const router = useRouter();

   const { isOver, setNodeRef } = useDroppable({
      id: 'droppable',
   });

   const dropstyle = {
      color: isOver ? 'green' : undefined,
   };

   const {
      data: { data: tasks } = { data: [] },
      isLoading,
      isSuccess,
      isError,
   } = useGetAllTasksQuery(router.query['task-slug'] as string);

   const { data: { data: project } = { data: null }, error } = useGetProjectQuery(router.query['task-slug'] as string);

   return (
      <>
         <BreadCrumbs
            crumbs={[
               { text: 'Главная', url: '/' },
               { text: 'Проекты', url: '/' + projectUrl },
               { text: '[Demo Project]', url: `/${projectUrl}/${router.query['task-slug']}` },
            ]}
         />

         {JSON.stringify(tasks)}

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

         <TaskModalCreationEditing isOpen={true} onClose={() => true} slug="xxxx" taskId={7} />
      </>
   );
}
