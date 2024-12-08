import { ResponseFile, TaskSingle, User, Comment } from '@/api/data.types';
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
import MarkersTask from '../Markers/Markers';
import SelectCustom from '@/components/SelectCustom';
import { useEffect, useState } from 'react';
import FileUploader from '../FileUploader.tsx/FileUploader';
import FilePriview from '../FilePreveiw/FilePreview';
import Link from 'next/link';

export default function TaskContent({
   task,
   activeUser,
}: {
   task: TaskSingle | undefined;
   activeUser: User | undefined;
}) {
   const isAdmin = activeUser?.is_admin;
   // const isOpen = 'none';
   // const [value, setValue] = useState('');
   const [selectedOptionComp, setSelectedOptionComp] = useState<string | (string | undefined)[] | undefined>(
      task?.stage?.name || 'не установлено'
   );
   const [files, setFiles] = useState<ResponseFile[]>(task?.files || []);
   const [filesComments, setFIlesComments] = useState<ResponseFile[]>([]);
   const [comments, setComments] = useState<Comment[]>(task?.comments || []);
   const [selectOptions, setSelectOptions] = useState<(string | (string | undefined)[] | undefined)[]>([]);

   useEffect(() => {
      if (task?.possibleTaskNextStages) {
         setSelectOptions(task?.possibleTaskNextStages?.map((stage) => stage.name));
      }
   }, [task?.possibleTaskNextStages]);

   useEffect(() => {
      if (task?.stage?.name) {
         setSelectedOptionComp(task?.stage?.name);
      }
      if (task?.files) {
         setFiles(task?.files);
      }
   }, [task?.stage?.name, task?.files]);

   return (
      <>
         <div className={styles.content}>
            <div className={styles.flex}>
               <h2 className={styles.content_title}>{task?.name || 'Название задачи'}</h2>
               <CopyLink
                  className={styles.content_copy}
                  onClick={async () => await navigator.clipboard.writeText(window.location.href)}
               />
            </div>
            <div className={styles.content_desc}>{parse(task?.description || '<p>Описание задачи</p>')}</div>
            <FileUploader
               inForm={false}
               addFilesTOState={task?.can_attach_file ? setFiles : () => {}}
               fileList={files}
            />
            <div className={styles.content_preveiw}>
               {files.map((item, index) => (
                  <FilePriview
                     editMode={true}
                     deleteFile={setFiles}
                     files={files}
                     file={item}
                     key={index}
                     inComment={false}
                  />
               ))}
            </div>
            <CommentForm
               submitType="create"
               task={task}
               changeFilesInState={task?.can_attach_file ? setFIlesComments : () => {}}
               fileList={filesComments}
               activeUser={activeUser}
               comments={comments}
               setComments={setComments}
            />
            <div>
               {comments.map((item, index) => (
                  <CommentComp
                     allComments={comments}
                     setComments={setComments}
                     activeUser={activeUser}
                     comment={item}
                     key={index}
                  />
               ))}
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
            <SelectCustom
               value={selectedOptionComp}
               onChange={(value) => setSelectedOptionComp(value)}
               titleSelect={`${selectedOptionComp}`}
               options={selectOptions}
            />
            <div className={`${styles.flex} ${styles.aside_tabbox}`}>
               <MarkersTask priority={task?.priority} component={task?.component} stage={task?.stage} />
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
                     {task?.date_start || 'нет'}
                  </p>
               </div>
            </div>
            <div className={styles.aside_infobox}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Эпик</p>
                  <Link
                     href={`/projects/task/${task?.epic?.id}`}
                     className={styles.aside_text}
                     style={{ color: '#3787eb' }}
                  >
                     #{task?.epic?.id} {task?.epic?.name}
                  </Link>
               </div>
            </div>
            <div className={styles.aside_infobox}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Исполнитель</p>
                  {task?.users ? (
                     task.users.map((user, index) => (
                        <div key={index} className={styles.pb8} style={{ display: 'flex' }}>
                           <figure className={styles.avatarbox}>
                              {user.avatar?.link ? (
                                 <img src={`https://trainee-academy.devds.ru${user.avatar?.link}`} alt={user.name} />
                              ) : (
                                 <></>
                              )}
                           </figure>
                           <p style={{ paddingLeft: 8, flexBasis: '80%' }}>
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
                  <div className={styles.pb8} style={{ display: 'flex' }}>
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
                     <p style={{ paddingLeft: 8, flexBasis: '80%' }}>
                        {task?.created_by?.surname} {task?.created_by?.name} {task?.created_by?.patronymic}
                     </p>
                  </div>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Layout Link</p>
                  <p className={styles.aside_text} style={{ color: '#3787eb' }}>
                     <Link href={`${task?.layout_link}`}>{task?.layout_link || 'нет'}</Link>
                  </p>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Dev Link</p>
                  <p className={styles.aside_text} style={{ color: '#3787eb' }}>
                     <Link href={`${task?.dev_link}`}>{task?.dev_link || 'нет'}</Link>
                  </p>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Markup Link</p>
                  <p className={styles.aside_text} style={{ color: '#3787eb' }}>
                     <Link href={`${task?.markup_link}`}>{task?.markup_link || 'нет'}</Link>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
}
