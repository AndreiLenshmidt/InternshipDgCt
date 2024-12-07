import { useSendFilesMutation } from '@/api/appApi';
import styles from './uploader.module.scss';
import { ResponseFile } from '@/api/data.types';
import { addFiles, dropHandler } from '@/utils/taskfiles';
// import { Blob, File } from 'buffer';
import { ChangeEvent, useState } from 'react';

export default function FileUploader({
   addFilesTOState,
   fileList,
}: {
   addFilesTOState: CallableFunction;
   fileList: ResponseFile[];
}) {
   // const [data] = useState<FormData>(new FormData());
   const [sendler, { data: response, isLoading, isError }] = useSendFilesMutation();

   const sendFiles = async (
      e: ChangeEvent<HTMLInputElement>,
      addFilesTOState: CallableFunction,
      fileList: ResponseFile[]
   ) => {
      e.target?.files ? addFiles(e.target?.files, fileList, addFilesTOState) : false;
      const form = new FormData();
      if (e.target?.files) {
         for (const file of e.target?.files) {
            form.append('file[]', file);
         }
         const paylord = await sendler(form);
         console.log(paylord);
      }
   };

   return (
      <label
         className={styles.upload}
         onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
         }}
         onDrop={(e) => dropHandler(e, fileList, addFilesTOState)}
      >
         <p className={styles.upload_text}>Выбери файлы или перетащи их сюда</p>
         <input
            onChange={(e) => sendFiles(e, addFilesTOState, fileList)}
            className={styles.upload_input}
            name="avatar"
            type="file"
            multiple
         />
      </label>
   );
}
