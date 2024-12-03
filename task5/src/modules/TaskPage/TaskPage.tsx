import { useGetTaskByTaskIdQuery } from './api/taskApi';
import FilePriview from './components/FilePreveiw/FilePreview';
import FileUploader from './components/FileUploader.tsx/FileUploader';
import styles from './task-page.module.scss';
import CopyLink from '@public/icons/copy-task-link.svg';
import CommentComp from './components/Comment/CommentComp';
import CommentForm from './components/CommentForm/CommentForm';
import Edit from '@public/icons/task-edit.svg';
import Create from '@public/icons/task-create.svg';
import Delete from '@public/icons/task-delete.svg';
import Clock from '@public/icons/clock.svg';
import Calendar from '@public/icons/calendar.svg';

export default function TaskPage(prop: { id: number }) {
   // const { data: tasks } = useGetAllTasksQuery('project2');
   // console.log(tasks);

   // const { data, isLoading, isSuccess, isError } = useGetTaskByTaskIdQuery(prop.id);
   // console.log(data, isLoading, isSuccess, isError);

   return (
      <div className={styles.page_container}>
         <div className={styles.page_content}>
            <div className={styles.flex}>
               <h2 className={styles.page_title}>TASK–295 Сделать лендинг Добровольческая и контрактная служба</h2>
               <CopyLink className={styles.page_copy} />
            </div>
            <div className={styles.page_desc}>
               <a className="page_text">https://task.demo.ru/task-302</a>
               <p className="page_text">
                  Необходимо сверстать проект согласно макетам https://www.figma.com/file/demoId
               </p>
               <p className="page_text">
                  Главная согласована, можно продолжать https://tilda.cc/page/?pageid=1111111111111111
               </p>
            </div>
            <CommentForm />
            <div>
               {'12'.split('').map((item, index) => (
                  <CommentComp comment={item} key={index} />
               ))}
            </div>
         </div>
         <div className={styles.aside}>
            <div className={`${styles.flex} ${styles.aside_box}`}>
               <p className="id">id: 192494</p>
               <div>
                  <Edit className={styles.aside_icon} />
                  <Delete className={styles.aside_icon} />
                  <Create className={styles.aside_icon} />
               </div>
            </div>
            <div className={styles.aside_select}>
               <p className={styles.aside_option}>Новая</p>
            </div>
            <div className={`${styles.flex} ${styles.aside_tabbox}`}>
               <div>
                  <p className={styles.aside_tasktext}>Приоритет</p>
                  <p className={styles.aside_tabtext}>Высокий</p>
               </div>
               <div>
                  <p className={styles.aside_tasktext}>Компонент</p>
                  <p className={styles.aside_tabtext}>Администрирование</p>
               </div>
               <div>
                  <p className={styles.aside_tasktext}>Тип</p>
                  <p className={styles.aside_tabtext}>Новый функционал</p>
               </div>
            </div>
            <div className={styles.flexcentre}>
               <span className={styles.aside_text}>Оценка</span>
               <div className={styles.flexcentre}>
                  <span className={styles.aside__textblack}>18ч</span>
                  <Clock className={styles.aside_clock} />
               </div>
            </div>
            <div className={styles.aside_infobox}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Дата создания</p>
                  <p className={styles.aside__textblack}>
                     <Calendar fill="#3787eb" width={14} height={14} />
                     20.03.2023
                  </p>
               </div>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Дата начала</p>
                  <p className={styles.aside__textblack}>
                     <Calendar fill="#3787eb" width={14} height={14} />
                     20.03.2023
                  </p>
               </div>
            </div>
            <div className={styles.aside_infobox}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Эпик</p>
                  <p className={styles.aside_text}>#28458 Разработка (бэк) ЛК</p>
               </div>
            </div>
            <div className={styles.aside_infobox}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Исполнитель</p>
                  <div className={`${styles.flex} ${styles.pb8}`}>
                     <figure className={styles.avatarbox}>
                        <img src="#" alt="#" />
                     </figure>
                     <p className={styles.flexcentre}>Прекраснопуський Хома</p>
                  </div>
                  <div className={`${styles.flex}`}>
                     <figure className={styles.avatarbox}>
                        <img src="#" alt="#" />
                     </figure>
                     <p className={styles.flexcentre}>Прекраснопуський Хома</p>
                  </div>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Постановщик</p>
                  <div className={`${styles.flex} ${styles.pb8}`}>
                     <figure className={styles.avatarbox}>
                        <img src="#" alt="#" />
                     </figure>
                     <p className={styles.flexcentre}>Прекраснопуський Хома</p>
                  </div>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Layout Link</p>
                  <p className={styles.aside_text}>http://kanban.digital-sector.ru/projects...</p>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Dev Link</p>
                  <p className={styles.aside_text}>http://kanban.digital-sector.ru/projects...</p>
               </div>
            </div>
         </div>
      </div>
   );
}
