import Bold from '@public/icons/fs-bold.svg';
import Italic from '@public/icons/fs-italic.svg';
import Code from '@public/icons/fs-code.svg';
import OlMarker from '@public/icons/fs-marker.svg';
import UlMarker from '@public/icons/fs-marker-num.svg';
import styles from './commform.module.scss';
import FileUploader from '../FileUploader.tsx/FileUploader';
import { ResponseFile, TaskSingle, User, Comment } from '@/api/data.types';
import { FormEvent, useEffect, useRef, useState, FocusEvent, KeyboardEvent } from 'react';
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
   const [bold, setBold] = useState('icon');
   const [italic, setItalic] = useState('icon');
   const [code, setCode] = useState('icon');
   const [olMarker, setOl] = useState('icon');
   const [ulMarker, setUl] = useState('icon');
   const [currentEl, setCurrent] = useState<HTMLElement>();
   const commentRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (submitType === 'edit' && editableComment?.content && commentRef.current) {
         setValue((commentRef.current.innerHTML = editableComment?.content));
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

   useEffect(() => {
      const p = document.createElement('p');
      p.className = 'editable';
      p.textContent = 'Описание';
      if (!commentRef.current) return;
      commentRef.current.append(p);
   }, []);

   const resetCommentFields = () => {
      if (!commentRef.current) return;
      commentRef.current.innerHTML = '<p class="editable">Описание</p>';
      setBold('icon');
      setItalic('icon');
      setCode('icon');
      setUl('icon');
      setOl('icon');
      setValue('');
      changeFilesInState([]);
   };

   const setFocus = (elem: HTMLElement) => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(elem);
      range.collapse(false);
      if (selection) {
         selection.removeAllRanges();
         selection.addRange(range);
      }
   };

   const boldHandler = () => {
      if (!commentRef.current) return;
      if (!commentRef.current.lastElementChild) return;
      if (bold === 'icon') {
         const strong = document.createElement('strong');
         strong.className = 'editable strong';
         strong.innerHTML = '&nbsp;';
         // console.log(currentEl);
         currentEl?.append(strong);
         setCurrent(strong);
         setFocus(strong);
         setBold('activeicon');
      } else if (bold === 'activeicon') {
         const elem = commentRef.current.lastElementChild;
         if (elem instanceof HTMLParagraphElement) {
            elem.innerHTML += '&nbsp;';
            setFocus(elem);
            setCurrent(elem);
         } else if (elem.lastChild instanceof HTMLLIElement) {
            elem.lastChild.innerHTML += '&nbsp;';
            setFocus(elem.lastChild);
            setCurrent(elem.lastChild);
         }
         setBold('icon');
         setItalic('icon');
         setCode('icon');
      }
   };

   const italicHandler = () => {
      if (!commentRef.current) return;
      if (!commentRef.current.lastElementChild) return;
      if (italic === 'icon') {
         const em = document.createElement('em');
         em.className = 'editable italic';
         em.innerHTML = '&nbsp;';
         // console.dir(currentEl);
         currentEl?.append(em);
         setCurrent(em);
         setFocus(em);
         setItalic('activeicon');
      } else if (italic === 'activeicon') {
         const elem = commentRef.current.lastElementChild;
         if (elem instanceof HTMLParagraphElement) {
            elem.innerHTML += '&nbsp;';
            setFocus(elem);
            setCurrent(elem);
         } else if (elem.lastChild instanceof HTMLLIElement) {
            elem.lastChild.innerHTML += '&nbsp;';
            setFocus(elem.lastChild);
            setCurrent(elem.lastChild);
         }
         setBold('icon');
         setItalic('icon');
         setCode('icon');
      }
   };

   const codeHandler = () => {
      if (!commentRef.current) return;
      if (!commentRef.current.lastElementChild) return;
      if (code === 'icon') {
         const code = document.createElement('code');
         code.className = 'editable code';
         code.innerHTML = '&nbsp;';
         // console.dir(currentEl);
         currentEl?.append(code);
         setCurrent(code);
         setFocus(code);
         setCode('activeicon');
      } else if (code === 'activeicon') {
         const elem = commentRef.current.lastElementChild;
         if (elem instanceof HTMLParagraphElement) {
            elem.innerHTML += '&nbsp;';
            setFocus(elem);
            setCurrent(elem);
         } else if (elem.lastChild instanceof HTMLLIElement) {
            elem.lastChild.innerHTML += '&nbsp;';
            setFocus(elem.lastChild);
            setCurrent(elem.lastChild);
         }
         setBold('icon');
         setItalic('icon');
         setCode('icon');
      }
   };

   const ulListHandler = () => {
      if (!commentRef.current) return;
      if (ulMarker === 'icon') {
         const ul = document.createElement('ul');
         const li = document.createElement('li');
         li.innerHTML = '<br>';
         li.className = 'editable item-ul';
         ul.append(li);
         commentRef.current.append(ul);
         setCurrent(li);
         setFocus(ul);
         setUl('activeicon');
         setOl('icon');
         setBold('icon');
         setItalic('icon');
         setCode('icon');
      } else if (ulMarker === 'activeicon') {
         const p = document.createElement('p');
         const elem = commentRef.current;
         p.className = 'editable';
         p.innerHTML += '<br>';
         elem.append(p);
         setFocus(p);
         setBold('icon');
         setItalic('icon');
         setCode('icon');
         setUl('icon');
         setOl('icon');
      }
   };
   const olListHandler = () => {
      if (!commentRef.current) return;
      if (olMarker === 'icon' && commentRef.current) {
         const ol = document.createElement('ol');
         const li = document.createElement('li');
         li.innerHTML = '<br>';
         li.className = 'editable item';
         ol.append(li);
         commentRef.current.append(ol);
         setCurrent(li);
         setFocus(ol);
         setOl('activeicon');
         setUl('icon');
         setBold('icon');
         setItalic('icon');
         setCode('icon');
      } else if (olMarker === 'activeicon') {
         const p = document.createElement('p');
         const elem = commentRef.current;
         p.className = 'editable';
         p.innerHTML += '<br>';
         elem.append(p);
         setFocus(p);
         setBold('icon');
         setItalic('icon');
         setCode('icon');
         setOl('icon');
         setUl('icon');
      }
   };

   const inputHandler = (e: FormEvent<HTMLDivElement>) => {
      if (e.target instanceof HTMLDivElement) {
         setValue(e.target.innerHTML);
      }
   };

   const focusHandler = (e: FocusEvent<HTMLDivElement, Element>) => {
      if (e.target.innerHTML === '<p class="editable">Описание</p>') {
         e.target.innerHTML = '<p class="editable"><br></p>';
         const child = e.target.lastChild;
         child instanceof HTMLElement && setCurrent(child);
      }
   };

   const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
      if (!commentRef.current) return;
      if (e.key === 'Backspace' && commentRef.current.innerHTML === '<p class="editable"><br></p>') {
         e.preventDefault();
      }
   };

   useEffect(() => {
      if (commentRef.current?.lastChild instanceof HTMLParagraphElement) {
         setCurrent(commentRef.current?.lastChild);
      }
      if (commentRef.current?.lastChild?.lastChild instanceof HTMLLIElement) {
         setCurrent(commentRef.current?.lastChild?.lastChild);
      }
   }, [commentRef.current?.lastChild, commentRef.current?.lastChild?.lastChild]);

   return (
      <form onSubmit={(e) => submitHandler(e)}>
         <div className={styles.comments}>
            <h3 className={styles.commtitle}>Комментарии</h3>
            <div className={styles.commstyler}>
               <Bold className={styles[bold]} onClick={boldHandler} />
               <Italic className={styles[italic]} onClick={italicHandler} />
               <Code className={styles[code]} onClick={codeHandler} />
               <OlMarker className={styles[olMarker]} onClick={olListHandler} />
               <UlMarker className={styles[ulMarker]} onClick={ulListHandler} />
            </div>
            <div
               ref={commentRef}
               spellCheck="true"
               className={styles.texterea}
               contentEditable={true}
               onInput={(e) => inputHandler(e)}
               onFocus={(e) => focusHandler(e)}
               onKeyDown={(e) => keyDownHandler(e)}
            ></div>
         </div>
         <FileUploader inForm={true} addFilesTOState={changeFilesInState} fileList={fileList} />
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
