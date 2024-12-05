import Bold from '@public/icons/fs-bold.svg';
import Italic from '@public/icons/fs-italic.svg';
import Code from '@public/icons/fs-code.svg';
import OlMarker from '@public/icons/fs-marker.svg';
import UlMarker from '@public/icons/fs-marker-num.svg';
import styles from './commform.module.scss';
import FileUploader from '../FileUploader.tsx/FileUploader';
import { TaskSingle } from '@/api/data.types';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

export default function CommentForm({
   task,
   addFilesTOState,
   fileList,
}: {
   task: TaskSingle | undefined;
   addFilesTOState: CallableFunction;
   fileList: File[];
}) {
   const [value, setValue] = useState('');
   const [fontWeight, setBold] = useState(400);
   const [fontStyle, setItalic] = useState('normal');
   // const [code, setCode] = useState('');
   const [olMarker, setOl] = useState('');
   const [ulMarker, setUl] = useState('');

   // const texterea = useRef<HTMLTextAreaElement>(null);

   return (
      <form>
         <div className={styles.comments}>
            <h3 className={styles.commtitle}>Комментарии</h3>
            <div className={styles.commstyler}>
               <Bold className={styles.icon} onClick={() => (fontWeight === 400 ? setBold(800) : setBold(400))} />
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
               onChange={(e) => setValue(e.target.value)}
               className={styles.texterea}
               style={{ fontWeight: fontWeight, fontStyle: fontStyle }}
               value={value}
            ></textarea>
         </div>
         <FileUploader addFilesTOState={addFilesTOState} fileList={fileList} />
         <button className={styles.submitter} type="submit">
            Отправить
         </button>
      </form>
   );
}
