import { BASE_URL } from '@/consts';
import FavLogo from '@public/icons/favorite-icon.svg';
import Link from 'next/link';
import { useState } from 'react';
import { ProjectItem, useUpdateProjectMutation } from '../../api/api';
import style from './project-card.module.css';


// import ProjectLogo1 from '@public/media/ProjectLogo.svg';

type PropsType = {
   project?: ProjectItem;
   onChange?: (isFavorite: boolean) => void
};

export function ProjectCard({ project, onChange }: PropsType) {
   //
   const [isFavorite, setFavorite] = useState(project?.is_favorite);

   const [updateProject, _result] = useUpdateProjectMutation({
      fixedCacheKey: 'shared-update-project',
   });

   /**
    * 
    * @param e 
    */
   const switchFavoriteState = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      // const markFavorite = !isFavorite;

      if (project) {
                  
         // setFavorite(markFavorite);
         // if (onChange) {
         //    onChange(markFavorite);
         // }
   
         updateProject({id: project?.id as number, type: 'project', setFavorite: !project.is_favorite})
      }

   };

   return (
      <Link className={style.card} href={'/projects/' + project?.slug}>
         <div className={style.favorite_icon} onClick={switchFavoriteState}>
            <FavLogo />
         </div>
         <img src={project?.logo?.link ? BASE_URL + project?.logo?.link : '/media/ProjectLogo.svg'} alt="." />
         <h5>{project?.name || 'DS Внутренние проекты'}</h5>
         <div className={style.hint}>
            {project?.user_count ? `${project.user_count} сотрудников` : 'Сотрудников не найдено'}
         </div>
      </Link>
   );
}
