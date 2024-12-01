import FavLogo from '@public/images/icons/favorite-icon.svg';
import Link from 'next/link';
import style from './project-card.module.css';

// import ProjectLogo1 from '@public/images/media/ProjectLogo.svg';

type PropsType = {};

export function ProjectCard({}: PropsType) {
   return (
      <Link className={style.card} href={'/projects/44'}>
         <div className={style.favorite_icon}>
            <FavLogo />
         </div>
         <img src="/images/media/ProjectLogo.svg" alt="." />
         <h5>DS Внутренние проекты</h5>
         <div className={style.hint}>12 сотрудников</div>
      </Link>
   );
}
