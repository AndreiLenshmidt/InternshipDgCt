import { AsidePanel } from '@components/left_menu/AsidePanel';
import { BreadCrumbs } from '@components/bread_crumbs/BreadCrumbs';

import style from './projects-page.module.css';

export function ProjectPage() {
   return (
      <div className={style.container}>
         <AsidePanel />
         <div className={style.content}>
            <BreadCrumbs crumbs={[{ text: 'Главная', url: '' }, { text: 'Проекты', url: '' }]} />
         </div>
      </div>
   );
}
