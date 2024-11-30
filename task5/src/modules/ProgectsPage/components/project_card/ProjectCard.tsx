import style from './project-card.module.css';

// import ProjectLogo1 from '@public/images/media/ProjectLogo.svg';


export function ProjectCard() {
   return (
      <div className={style.card}>
         <img src="/images/media/ProjectLogo.svg" alt="." />
         <h5>DS Внутренние проекты</h5>
         <div className={style.hint}>12 сотрудников</div>
      </div>
   );
}