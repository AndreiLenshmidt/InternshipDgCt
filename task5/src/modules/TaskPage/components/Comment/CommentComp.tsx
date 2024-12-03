import styles from './comment.module.scss';

export default function CommentComp({ comment }: { comment: string }) {
   return (
      <div className={styles.comment}>
         <div className={styles.flex}>
            <div className={`${styles.flex} ${styles.userinfo}`}>
               <figure className={styles.avatarbox}>
                  <img src="#" alt="#" />
               </figure>
               <div>
                  <p className={styles.username}>Прекраснопуський Хома</p>
                  <p className={styles.userdate}>16 авг. 2022 22:22</p>
               </div>
            </div>
            <div>icons</div>
         </div>
         <p className={styles.text}>
            Задача выполнена, можно проверять.Внесены изменения в роуты: -
            http://demo.ru./swagger/index.html#/common/get_header__typePage_
         </p>
      </div>
   );
}
