import { TaskSingle } from '@/api/data.types';
import styles from './task-modal.module.scss';
import CopyLink from '@public/icons/copy-task-link.svg';
import CommentComp from '../Comment/CommentComp';
import CommentForm from '../CommentForm/CommentForm';
import Edit from '@public/icons/task-edit.svg';
import Create from '@public/icons/task-create.svg';
import Delete from '@public/icons/task-delete.svg';
import Clock from '@public/icons/clock.svg';
import Calendar from '@public/icons/calendar.svg';
import parse from 'html-react-parser';

export default function TaskContent({ task, link }: { task: TaskSingle | undefined; link: string }) {
   const isAdmin = false;
   const isOpen = 'none';
   return (
      <>
         <div className={styles.content}>
            <div className={styles.flex}>
               <h2 className={styles.content_title}>{task?.name || 'Название задачи'}</h2>
               <CopyLink className={styles.content_copy} />
            </div>
            <div className={styles.content_desc}>{parse(task?.description || '<p>Описание задачи</p>')}</div>
            <CommentForm task={task} />
            <div>
               {task?.comments ? (
                  task?.comments.map((item, index) => <CommentComp comment={item} key={index} />)
               ) : (
                  <></>
               )}
            </div>
         </div>
         <div className={styles.aside}>
            <div className={`${styles.flex} ${styles.aside_box}`}>
               <p className="id">id: {task?.id}</p>
               <div>
                  <Edit className={styles.aside_icon} />
                  {isAdmin ? <Delete className={styles.aside_icon} /> : <></>}
                  {isAdmin ? <Create className={styles.aside_icon} /> : <></>}
               </div>
            </div>
            <div className={styles.aside_select}>
               <p className={styles.aside_option}>{task?.stage?.name}</p>
               {task?.possibleTaskNextStages?.map((nexStage, index) => (
                  <p key={index} className={`${styles.aside_option} ${styles[isOpen]}`}>
                     {nexStage.name}
                  </p>
               ))}
            </div>
            <div className={`${styles.flex} ${styles.aside_tabbox}`}>
               <div>
                  <p className={styles.aside_tasktext}>Приоритет</p>
                  <p className={styles.aside_tabtext}>{task?.priority?.name}</p>
               </div>
               <div>
                  <p className={styles.aside_tasktext}>Компонент</p>
                  <p className={styles.aside_tabtext} style={{ backgroundColor: task?.component?.color }}>
                     {task?.component?.name}
                  </p>
               </div>
               <div>
                  <p className={styles.aside_tasktext}>Тип</p>
                  <p className={styles.aside_tabtext}>{task?.stage?.name}</p>
               </div>
            </div>
            <div className={styles.flexcentre}>
               <span className={styles.aside_text}>Оценка</span>
               <div className={styles.flexcentre}>
                  <span className={styles.aside__textblack}>{task?.bugs_tracked_time}ч</span>
                  <Clock className={styles.aside_clock} />
               </div>
            </div>
            <div className={styles.aside_infobox}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Дата создания</p>
                  <p className={styles.aside__textblack}>
                     <Calendar className={styles.aside_calendar} />
                     {new Intl.DateTimeFormat('ru-RU').format(new Date(task?.created_at || 0))}
                  </p>
               </div>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Дата начала</p>
                  <p className={styles.aside__textblack}>
                     <Calendar className={styles.aside_calendar} />
                     {task?.date_start
                        ? new Intl.DateTimeFormat('ru-RU').format(new Date(task?.date_start))
                        : 'не установлена'}
                  </p>
               </div>
            </div>
            <div className={styles.aside_infobox}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Эпик</p>
                  <p className={styles.aside_text}>
                     #{task?.epic?.id} {task?.epic?.name}
                  </p>
               </div>
            </div>
            <div className={styles.aside_infobox}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Исполнитель</p>
                  {task?.users ? (
                     task.users.map((user, index) => (
                        <div key={index} className={`${styles.flexcentre} ${styles.pb8}`}>
                           <figure className={styles.avatarbox}>
                              {user.avatar?.link ? (
                                 <img src={`https://trainee-academy.devds.ru${user.avatar?.link}`} alt={user.name} />
                              ) : (
                                 <></>
                              )}
                           </figure>
                           <p className={styles.flexcentre}>
                              {user.surname} {user.name} {user.patronymic}
                           </p>
                        </div>
                     ))
                  ) : (
                     <></>
                  )}
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Постановщик</p>
                  <div className={`${styles.flex} ${styles.pb8}`}>
                     <figure className={styles.avatarbox}>
                        {task?.created_by?.avatar?.link ? (
                           <img
                              height={32}
                              src={`https://trainee-academy.devds.ru${task?.created_by?.avatar?.link}`}
                              alt={task?.created_by?.name}
                           />
                        ) : (
                           <></>
                        )}
                     </figure>
                     <p className={styles.flexcentre}>
                        {task?.created_by?.surname} {task?.created_by?.name} {task?.created_by?.patronymic}
                     </p>
                  </div>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Layout Link</p>
                  <p className={styles.aside_text}>{task?.layout_link || 'нет'}</p>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Dev Link</p>
                  <p className={styles.aside_text}>{task?.dev_link || 'нет'}</p>
               </div>
            </div>
         </div>
      </>
   );
}
