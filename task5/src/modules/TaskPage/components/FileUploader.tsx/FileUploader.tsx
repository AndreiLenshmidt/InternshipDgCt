import { useAddFilesToCommemtMutation, useAddFilesToTaskMutation, useSendFilesMutation } from '@/api/appApi';
import styles from './uploader.module.scss';
import { ResponseFile } from '@/api/data.types';
import { sendFiles } from '@/utils/taskUtils';
import { useRef } from 'react';
import { useRouter } from 'next/router';

export default function FileUploader({
   inForm,
   addFilesTOState,
   fileList,
   commentId,
}: {
   inForm: boolean;
   addFilesTOState: CallableFunction;
   fileList: ResponseFile[];
   commentId?: number;
}) {
   const upload = useRef(null);
   // обработать isLoading, isError
   const [sendler, { isLoading, isError }] = useSendFilesMutation();

   const [addFilesToTask, { isLoading: addedLoading, isError: errorAdded }] = useAddFilesToTaskMutation();
   const [addFileToComments, {}] = useAddFilesToCommemtMutation();

   const router = useRouter();
   const taskID = Number(router.query['slug']);

   return (
      <label
         className={styles.upload}
         onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
         }}
         onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) {
               const mutation = inForm ? addFileToComments : addFilesToTask;
               const id = inForm && commentId ? commentId : taskID;
               return sendFiles(e.dataTransfer, addFilesTOState, fileList, sendler, mutation, id, inForm);
            }
         }}
      >
         <p className={styles.upload_text}>Выбери файлы или перетащи их сюда</p>
         <input
            ref={upload}
            onChange={() => {
               if (upload.current) {
                  const mutation = inForm ? addFileToComments : addFilesToTask;
                  const id = inForm && commentId ? commentId : taskID;
                  return sendFiles(upload.current, addFilesTOState, fileList, sendler, mutation, id, inForm);
               }
            }}
            className={styles.upload_input}
            name="avatar"
            type="file"
            multiple
         />
      </label>
   );
}
