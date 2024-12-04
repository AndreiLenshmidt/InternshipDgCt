import { Comment } from '@/api/data.types';
import styles from './comment.module.scss';

export default function CommentComp({ comment }: { comment: Comment | undefined }) {
   return (
      <div className={styles.comment}>
         <div className={styles.flex}>
            <div className={`${styles.flex} ${styles.userinfo}`}>
               <figure className={styles.avatarbox}>
                  <img src={comment?.user?.avatar?.link} alt={comment?.user?.avatar?.original_name} />
               </figure>
               <div>
                  <p className={styles.username}>{comment?.user?.name}</p>
                  <p className={styles.userdate}>{comment?.updated_at || comment?.updated_at}</p>
               </div>
            </div>
            <div>icons</div>
         </div>
         <p className={styles.text}>{comment?.content}</p>
      </div>
   );
}
