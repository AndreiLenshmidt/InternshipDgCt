// import Image from 'next/image';
import { ResponseFile } from '@/api/data.types';
import styles from './file.module.scss';
import Close from '@public/icons/close.svg';
import Cart from '@public/icons/task-delete.svg';

export default function FilePriview({
   file,
   inComment,
   deleteFile,
   files,
   editMode,
}: {
   file: ResponseFile;
   inComment: boolean;
   deleteFile: CallableFunction;
   files: ResponseFile[];
   editMode: boolean;
}) {
   if (inComment) {
      return (
         <div className={styles.file_smallbox}>
            <p className={styles.file_name} style={{ paddingTop: 0, color: '#2d2d2d', maxWidth: 85 }}>
               {file?.original_name}
            </p>
            {editMode ? (
               <Close
                  className={styles.file_closeicon}
                  onClick={() => deleteFile(files.filter((item) => item?.id !== file?.id))}
               />
            ) : (
               <></>
            )}
         </div>
      );
   } else {
      return (
         <div className={styles.file_box}>
            <figure className={styles.file_imgbox}>
               <img className={styles.file_img} src={file?.link} width={184} alt={file?.original_name} />
            </figure>
            <p className={styles.file_name}>{file?.original_name}</p>
            <p className={styles.file_date}>{file?.updated_at || file?.created_at}</p>
            <Cart
               className={styles.file_carticon}
               onClick={() => deleteFile(files.filter((item) => item?.id !== file?.id))}
            />
         </div>
      );
   }
}
