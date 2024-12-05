// import Image from 'next/image';
import { File } from '@/api/data.types';
import styles from './file.module.scss';

export default function FilePriview({ file }: { file: File }) {
   return (
      <div className={styles.file_box}>
         <figure className={styles.file_imgbox}>
            <img className={styles.file_img} src={file?.link} width={184} height={88} alt={file?.original_name} />
         </figure>
         <p className={styles.file_name}>{file?.original_name}</p>
         <p className={styles.file_date}>{file?.updated_at || file?.created_at}</p>
      </div>
   );
}
