import styles from './modal.module.scss';
import { Children, MouseEvent } from 'react';

export default function CenterModal({
   buttonOk,
   buttonEsc,
   backgroundClosable,
   setClose,
   handlerOk,
   handlerEsc,
   children,
}: {
   buttonOk: string;
   buttonEsc: string;
   backgroundClosable: boolean;
   setClose: CallableFunction;
   handlerOk: CallableFunction;
   handlerEsc: CallableFunction;
   children: JSX.Element;
}) {
   const backCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target instanceof HTMLDivElement) {
         if (backgroundClosable && e.target.className === styles.modal_bkg && e.target instanceof HTMLDivElement) {
            setClose(false);
         }
      }
   };

   return (
      <div className={styles.modal_bkg} onClick={(e) => backCloseHandler(e)}>
         {/* {modal ? (
            <CenterModal
               children={<h4>this is modal</h4>}
               buttonOk="ok"
               buttonEsc="esc"
               backgroundClosable={true}
               setClose={setClose}
               handlerOk={() => console.log('ok')}
               handlerEsc={() => console.log('esc')}
            />
         ) : (
            <></>
         )} */}
         <div className={styles.modal}>
            <div className={styles.title}>{children}</div>
            <div className={styles.btnbox}>
               <button
                  className={`${styles.btn} ${styles.ok}`}
                  onClick={() => {
                     setClose(false);
                     return handlerOk();
                  }}
               >
                  {buttonOk}
               </button>
               <button
                  className={`${styles.btn} ${styles.esc}`}
                  onClick={() => {
                     setClose(false);
                     handlerEsc();
                  }}
               >
                  {buttonEsc}
               </button>
            </div>
         </div>
      </div>
   );
}
