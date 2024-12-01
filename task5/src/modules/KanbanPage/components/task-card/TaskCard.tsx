import style from './task-card.module.css';

export function TaskCard() {
   return (
      <div className={style.card}>
         <div className={style.header}>
            <h5>id: 5244624</h5>
            <div className={style.prioritize}>• Высокий</div>
         </div>
         <h3>Добавить автотесты авторизациии почтовых уведомлений</h3>
         <h4>author</h4>
         <div className={style.tags}>
            <span>разработка</span>
            <span>задача</span>
         </div>
      </div>
   );
}