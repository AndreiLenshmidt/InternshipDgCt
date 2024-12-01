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
         </div>
      </>
   );
}
