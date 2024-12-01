import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';
import { useRouter } from 'next/router';

import style from './kanban-page.module.css';


export function KanbanPage() {

   const router = useRouter();

   console.log(router.query['task-slug']);

   return (
      <>
         <BreadCrumbs
            crumbs={[
               { text: 'Главная', url: '' },
               { text: 'Проекты', url: '' },
               { text: 'Demo Project', url: ''}
            ]}
         />

         <h1>Проекты</h1>
      </>
   );
}
