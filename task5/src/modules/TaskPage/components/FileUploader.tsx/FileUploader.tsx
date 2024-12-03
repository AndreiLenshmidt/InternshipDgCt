import styles from './uploader.module.scss';

export default function FileUploader() {
   return (
      <div className={styles.upload}>
         <p className={styles.upload_text}>Выбери файлы или перетащи их сюда</p>
      </div>
   );
}
