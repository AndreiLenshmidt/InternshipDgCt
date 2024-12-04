import Bold from '@public/icons/fs-bold.svg';
import Italic from '@public/icons/fs-italic.svg';
import Code from '@public/icons/fs-code.svg';
import OlMarker from '@public/icons/fs-marker.svg';
import UlMarker from '@public/icons/fs-marker-num.svg';
import styles from './commform.module.scss';
import FileUploader from '../FileUploader.tsx/FileUploader';
import FilePriview from '../FilePreveiw/FilePreview';
import { TaskSingle } from '@/api/data.types';

export default function CommentForm({ task }: { task: TaskSingle | undefined }) {
   return (
      <form>
         <div className={styles.comments}>
            <FileUploader />
            <div className={styles.preveiw_box}>
               {task?.files ? task?.files.map((item, index) => <FilePriview file={item} key={index} />) : <></>}
            </div>
            <h3 className={styles.commtitle}>Комментарии</h3>
            <div className={styles.commstyler}>
               <Bold />
               <Italic />
               <Code />
               <OlMarker />
               <UlMarker />
            </div>
            <textarea className={styles.texterea} name="comment" placeholder="Описание"></textarea>
         </div>
         <FileUploader />
         <button className={styles.submitter} type="submit">
            Отправить
         </button>
      </form>
   );
}
