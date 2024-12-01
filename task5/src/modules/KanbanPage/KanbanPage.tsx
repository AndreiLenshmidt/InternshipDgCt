import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { Switch } from '@components/switch/Switch';
import { useRouter } from 'next/router';
import { useDrag } from 'react-dnd';
import { TaskCard } from './components/task-card/TaskCard';
import style from './kanban-page.module.css';
import { DndContext, useDroppable } from '@dnd-kit/core';

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

   console.log(router.query['task-slug']);

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
            <DndContext>
               <div className={style.kanban}>
                  <div className="col">
                     <h4 data-count={4}>Новые</h4>
                     <div className={style.tasks}>
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                     </div>
                  </div>

                  <div className="col" ref={setNodeRef} style={dropstyle}>
                     <h4 data-count={4}>В работе</h4>
                     <div className={style.tasks}>
                        <TaskCard />
                     </div>
                  </div>

                  <div className="col">
                     <h4 data-count={4}>Выполнены</h4>
                     <div className={style.tasks}>
                        <TaskCard />
                        <TaskCard />
                     </div>
                  </div>

                  <div className="col">
                     <h4 data-count={4}>В ревью</h4>
                     <div className={style.tasks}></div>
                  </div>

                  <div className="col">
                     <h4 data-count={4}>В тестировании</h4>
                     <div className={style.tasks}>
                        <TaskCard />
                     </div>
                  </div>
               </div>
            </DndContext>
         </div>
      </>
   );
}
