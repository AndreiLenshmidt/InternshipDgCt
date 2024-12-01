import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { useRouter } from 'next/router';

import style from './kanban-page.module.css';
import { Switch } from '../../components/switch/Switch';

const projectUrl = 'projects';

export function KanbanPage() {
   const router = useRouter();

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
      </>
   );
}
