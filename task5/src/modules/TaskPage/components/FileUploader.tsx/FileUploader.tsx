import { DragEvent, useEffect, useRef, useState } from 'react';
import styles from './uploader.module.scss';
// import { useActions } from '@/store/hooks/useActions';
// import { selectTask } from '../../slicerTask';

const BYTES_IN_MB = 1048576;
const MAX_FILE_SIZE = 10;

export default function FileUploader({
   addFilesTOState,
   fileList,
}: {
   addFilesTOState: CallableFunction;
   fileList: File[];
}) {
   // const [dragStyle, setDrafStyle] = useState<string>('');
   const fileValidation = (file: File, fileList: File[]) => {
      if (file.size > BYTES_IN_MB * MAX_FILE_SIZE) {
         // console.log(file.size, BYTES_IN_MB * MAX_FILE_SIZE);
         return false;
      } else if (fileList.filter((item) => item.name === file.name).length !== 0) {
         return false;
      } else {
         return true;
      }
   };
   const addFiles = (inputFileList: FileList) => {
      const files = new DataTransfer();
      for (const file of inputFileList) {
         if (fileValidation(file, fileList)) {
            files.items.add(file);
         }
      }
      addFilesTOState([...fileList, ...files.files]);
   };
   // const dragEnterHandler = (e: DragEvent<HTMLLabelElement>) => {
   //    e.preventDefault();
   //    console.log('dragE');
   //    // setDrafStyle('upload_dragstyle');
   //    // addFiles(e.target?.files);
   // };
   // const dragOverHandler = (e: DragEvent<HTMLLabelElement>) => {
   //    e.preventDefault();
   //    console.log('dragO');
   //    // setDrafStyle('');
   //    // addFiles(e.target?.files);
   // };
   const dropHandler = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      addFiles(e.dataTransfer.files);
      console.log('drop');
   };

   return (
      <label
         className={styles.upload}
         // onDragEnter={(e) => dragEnterHandler(e)}
         // onDragOverCapture={(e) => dragOverHandler(e)}
         onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
         }}
         onDrop={(e) => dropHandler(e)}
      >
         <p className={styles.upload_text}>Выбери файлы или перетащи их сюда</p>
         <input
            onChange={(e) => (e.target?.files ? addFiles(e.target?.files) : false)}
            className={styles.upload_input}
            name="avatar"
            type="file"
            multiple
            // accept="image/png, image/jpeg, image/jpg"
         />
      </label>
   );
}
