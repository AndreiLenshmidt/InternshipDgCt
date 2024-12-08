import Bold from '@public/icons/fs-bold.svg';
import Italic from '@public/icons/fs-italic.svg';
import Code from '@public/icons/fs-code.svg';
import OlMarker from '@public/icons/fs-marker.svg';
import UlMarker from '@public/icons/fs-marker-num.svg';
import styles from './commform.module.scss';
import FileUploader from '../FileUploader.tsx/FileUploader';
import { ResponseFile, TaskSingle, User, Comment } from '@/api/data.types';
import { FormEvent, useEffect, useState } from 'react';
import FilePriview from '../FilePreveiw/FilePreview';

export default function CommentForm({
   task,
   changeFilesInState,
   fileList,
   activeUser,
   comments,
   editableComment,
   setComments,
   submitType,
   closeEdit,
}: {
   task?: TaskSingle | undefined;
   changeFilesInState: CallableFunction;
   fileList: ResponseFile[];
   activeUser: User | undefined;
   comments?: Comment[];
   editableComment?: Comment;
   setComments?: CallableFunction;
   submitType: 'create' | 'edit';
   closeEdit?: CallableFunction;
}) {
   const [value, setValue] = useState('');
   const [fontWeight, setBold] = useState(400);
   const [fontStyle, setItalic] = useState('normal');
   // const [code, setCode] = useState('');
   const [olMarker, setOl] = useState('');
   const [ulMarker, setUl] = useState('');
   // const copyEditableComment = {
   //    content: editableComment?.content,
   //    files: editableComment?.files,
   // };

   useEffect(() => {
      if (submitType === 'edit' && editableComment?.content) {
         setValue(editableComment?.content);
      }
   }, []);

   const submitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (value.length === 0) return;
      if (comments && setComments && submitType === 'create') {
         const comment = commentFormatter(value, activeUser, fileList);
         setComments([comment, ...comments]);
         // console.log(comments);
         resetCommentFields();
         // fetcher create comment
      } else if (submitType === 'edit') {
         if (editableComment?.content) {
            editableComment.content = value;
         }
         closeEdit && closeEdit(false);
         // fetcher edit comment
      }
   };
   const commentFormatter = (value: string, activeUser: User | undefined, fileList: ResponseFile[]): Comment => {
      const date = new Intl.DateTimeFormat('ru-RU', {
         day: 'numeric',
         month: 'short',
         year: 'numeric',
      }).format(new Date(Date.now()));
      return {
         id: Date.now() + Math.floor(Math.random() * 10000),
         content: value,
         files: fileList,
         user: activeUser,
         created_at: date,
         updated_at: date,
      };
   };

   const resetCommentFields = () => {
      setValue('');
      changeFilesInState([]);
   };

   const boldHandler = () => {};
   const inputHandler = (e: FormEvent<HTMLDivElement>) => {
      // setValue(e.target.outerText);
      // // console.dir(e.target);
      // console.log(value);
   };

   return (
      <form onSubmit={(e) => submitHandler(e)}>
         <div className={styles.comments}>
            <h3 className={styles.commtitle}>Комментарии</h3>
            <div className={styles.commstyler}>
               <Bold
                  className={styles.icon}
                  // onClick={() => (fontWeight === 400 ? setBold(800) : setBold(400))}
                  onClick={boldHandler}
               />
               <Italic
                  className={styles.icon}
                  onClick={() => (fontStyle === 'normal' ? setItalic('italic') : setItalic('normal'))}
               />
               <Code
                  className={styles.icon}
                  onClick={() =>
                     !value.startsWith('<code>') ? setValue(`<code>${value}</code>`) : setValue(value.slice(6, -7))
                  }
               />
               <OlMarker className={styles.icon} onClick={() => {}} />
               <UlMarker className={styles.icon} onClick={() => {}} />
            </div>
            <textarea
               // contentEditable={true}
               autoFocus={submitType === 'edit'}
               onChange={(e) => setValue(e.target.value)}
               className={styles.texterea}
               style={{ fontWeight: fontWeight, fontStyle: fontStyle }}
               value={value}
            ></textarea>
            {/* <div className={styles.texterea} contentEditable={true} onInput={(e) => inputHandler(e)}></div> */}
         </div>
         <FileUploader addFilesTOState={changeFilesInState} fileList={fileList} />
         <div className={styles.preveiw_box}>
            {fileList ? (
               fileList.map((item, index) => (
                  <FilePriview
                     editMode={true}
                     files={fileList}
                     deleteFile={changeFilesInState}
                     inComment={true}
                     file={item}
                     key={index}
                  />
               ))
            ) : (
               <></>
            )}
         </div>
         <button className={styles.submitter} type="submit">
            Отправить
         </button>
      </form>
   );
}
