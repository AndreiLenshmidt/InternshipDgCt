// import Image from 'next/image';
import styles from './file.module.scss';

export default function FilePriview(prop: { file: string }) {
   return (
      <div className={styles.file_box}>
         <figure className={styles.file_imgbox}>
            <img className={styles.file_img} src={'#'} width={184} height={88} alt="#" />
         </figure>
         <p className={styles.file_name}>photo_2023_23_04_112345.jpg</p>
         <p className={styles.file_date}>1 мар. 2023</p>
      </div>
   );
}
