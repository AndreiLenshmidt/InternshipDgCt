import style from './project-card.module.css';
import FavLogo from '@public/images/icons/favorite-icon.svg';

// import ProjectLogo1 from '@public/images/media/ProjectLogo.svg';


export function ProjectCard() {
   return (
      <div className={style.card}>
         <div className={style.favorite_icon}>
            <FavLogo />
         </div>
         <img src="/images/media/ProjectLogo.svg" alt="." />
         <h5>DS Внутренние проекты</h5>
         <div className={style.hint}>12 сотрудников</div>
      </div>
   );
}