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
import InfoModal from '../InfoModal/InfoModal';
import { useModalInfo } from '@/hooks/useModalInfo';

export default function TaskContent({
   task,
   activeUser,
}: {
   task: TaskSingle | undefined;
   activeUser: User | undefined;
}) {
   const isAdmin = activeUser?.is_admin;
   const [selectedOptionComp, setSelectedOptionComp] = useState<string | (string | undefined)[] | undefined>(
      task?.stage?.name || 'не установлено'
   );
   const [files, setFiles] = useState<ResponseFile[]>(task?.files || []);
   const [filesComments, setFIlesComments] = useState<ResponseFile[]>([]);
   const [comments, setComments] = useState<Comment[]>(task?.comments || []);
   const [selectOptions, setSelectOptions] = useState<(string | (string | undefined)[] | undefined)[]>([]);
   const modalInfo = useModalInfo();

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
      if (task?.comments) {
         setComments(task?.comments);
      }
   }, [task?.stage?.name, task?.files, task?.comments]);

   useEffect(() => {
      if (task?.dev_link) {
         modalInfo.setCloseModal(true);
         modalInfo.setModalTitle('Успешно');
         modalInfo.setModalInfo('Статус задачи успешно изменен');
      } else if (task?.stage?.name !== selectedOptionComp) {
         modalInfo.setCloseModal(true);
         modalInfo.setModalTitle('Ошибка');
         modalInfo.setModalType('error');
         modalInfo.setModalInfo('Сначала добавьте Dev Link в меню редактирования задачи');
         task?.stage?.name && setSelectedOptionComp(task?.stage?.name);
      }
   }, [selectedOptionComp]);

   const copyLinkHandler = async () => {
      await navigator.clipboard.writeText(window.location.href);
      modalInfo.setCloseModal(true);
      modalInfo.setModalTitle('Успешно');
      modalInfo.setModalType('info');
      modalInfo.setModalInfo('Ссылка успешно скопирована');
   };

   return (
      <>
         <div className={styles.content}>
            <div className={styles.flex}>
               <h2 className={styles.content_title}>{task?.name || 'Название задачи'}</h2>
               <CopyLink className={styles.content_copy} onClick={copyLinkHandler} />
            </div>
            <div className={styles.content_desc}>{parse(task?.description || '<p>Описание задачи</p>')}</div>
            <FileUploader
               isEdit={true}
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
                  <p className={`${styles.aside_text} ${styles.pb8}`} style={{ color: '#3787eb' }}>
                     <span># </span>
                     <Link href={`/projects/task/${task?.epic?.id}`}>
                        {task?.epic?.id} {task?.epic?.name}
                     </Link>
                  </p>
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
                     {task?.layout_link ? (
                        <Link href={`${task?.layout_link}`}>{task?.layout_link}</Link>
                     ) : (
                        <span>layout link отсутсвует</span>
                     )}
                  </p>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Dev Link</p>
                  <p className={styles.aside_text} style={{ color: '#3787eb' }}>
                     {task?.dev_link ? (
                        <Link href={`${task?.dev_link}`}>{task?.dev_link}</Link>
                     ) : (
                        <span>dev link отсутсвует</span>
                     )}
                  </p>
               </div>
            </div>
            <div className={`${styles.aside_infobox} ${styles.pt16}`}>
               <div>
                  <p className={`${styles.aside_text} ${styles.pb8}`}>Markup Link</p>
                  <p className={styles.aside_text} style={{ color: '#3787eb' }}>
                     {task?.markup_link ? (
                        <Link href={`${task?.markup_link}`}>{task?.markup_link}</Link>
                     ) : (
                        <span>markup link отсутсвует</span>
                     )}
                  </p>
               </div>
            </div>
            {modalInfo.modal ? (
               <InfoModal
                  type={modalInfo.modalType}
                  title={modalInfo.modalTitle}
                  info={modalInfo.modalInfo}
                  setClose={modalInfo.setCloseModal}
               />
            ) : (
               <></>
            )}
         </div>
      </>
   );
}
