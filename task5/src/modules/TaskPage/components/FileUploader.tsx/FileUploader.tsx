import styles from './uploader.module.scss';
import { ResponseFile } from '@/api/data.types';
import { addFiles, dropHandler } from '@/utils/taskfiles';

export default function FileUploader({
   addFilesTOState,
   fileList,
}: {
   addFilesTOState: CallableFunction;
   fileList: ResponseFile[];
}) {
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
            onChange={(e) => (e.target?.files ? addFiles(e.target?.files, fileList, addFilesTOState) : false)}
            className={styles.upload_input}
            name="avatar"
            type="file"
            multiple
         />
      </label>
   );
}
