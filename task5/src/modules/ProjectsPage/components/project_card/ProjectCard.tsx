import { BASE_URL } from '@/consts';
import FavLogo from '@public/icons/favorite-icon.svg';
import Link from 'next/link';
import { ProjectItem } from '../../api/api';
import style from './project-card.module.css';


// import ProjectLogo1 from '@public/media/ProjectLogo.svg';

type PropsType = {
   project?: ProjectItem
};

export function ProjectCard({ project }: PropsType) {
   return (
      <Link className={style.card} href={'/projects/' + project?.slug}>
         <div className={style.favorite_icon}>
            <FavLogo />
         </div>
         <img src={project?.logo?.link ? BASE_URL + project?.logo?.link : '/media/ProjectLogo.svg'} alt="." />
         <h5>{project?.name || 'DS Внутренние проекты'}</h5>
         <div className={style.hint}>{project?.user_count ? `${project.user_count} сотрудников` : 'TODO'}</div>
      </Link>
   );
}
