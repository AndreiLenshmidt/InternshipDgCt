import { Comment, User } from '@/api/data.types';
import styles from './comment.module.scss';
import Edit from '@public/icons/task-edit.svg';
import Delete from '@public/icons/task-delete.svg';
import Copy from '@public/icons/copy-comment.svg';
import Close from '@public/icons/close.svg';
import { useState } from 'react';
import FilePriview from '../FilePreveiw/FilePreview';
import CommentForm from '../CommentForm/CommentForm';

export default function CommentComp({
   comment,
   activeUser,
}: {
   comment: Comment | undefined;
   activeUser: User | undefined;
}) {
   const [editMode, setEditMode] = useState(false);
   const [commentFiles, setCommentFiles] = useState(comment?.files || []);
   const deleteCommentHandler = () => {
      console.log('delete');
   };
   const deleteFileFromComment = () => {};

   const escapeEditComment = () => {
      setEditMode(!editMode);
      setCommentFiles(comment?.files || []);
   };
   return (
      <div className={styles.comment}>
         <div className={styles.flex}>
            <div className={`${styles.flex} ${styles.userinfo}`}>
               <figure className={styles.avatarbox}>
                  <img src={comment?.user?.avatar?.link} alt={comment?.user?.avatar?.original_name} />
               </figure>
               <div>
                  <p className={styles.username}>{comment?.user?.name}</p>
                  <p className={styles.userdate}>{comment?.updated_at || comment?.updated_at}</p>
               </div>
            </div>
            {editMode ? (
               <Close onClick={() => escapeEditComment()} className={styles.close} />
            ) : (
               <div>
                  {comment?.user?.id === activeUser?.id ? (
                     <Edit onClick={() => setEditMode(!editMode)} className={styles.commenticon} />
                  ) : (
                     <></>
                  )}
                  <Copy
                     className={styles.commenticon}
                     onClick={async () => await navigator.clipboard.writeText(window.location.href)}
                  />
                  {comment?.user?.id === activeUser?.id ? (
                     <Delete onClick={deleteCommentHandler} className={styles.commenticon} />
                  ) : (
                     <></>
                  )}
               </div>
            )}
         </div>
         {editMode ? (
            <CommentForm
               editableComment={comment}
               submitType={'edit'}
               activeUser={activeUser}
               fileList={commentFiles || []}
               changeFilesInState={setCommentFiles}
            />
         ) : (
            <p className={styles.text}>{comment?.content}</p>
         )}
         {!editMode ? (
            <div className={styles.preview}>
               {commentFiles.map((file, index) => (
                  <FilePriview
                     key={index}
                     file={file}
                     files={commentFiles}
                     editMode={editMode}
                     inComment={true}
                     deleteFile={setCommentFiles}
                  />
               ))}
            </div>
         ) : (
            <></>
         )}
      </div>
   );
}
