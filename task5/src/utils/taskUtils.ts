import { ResponseFile, User, Comment } from '@/api/data.types';

const addFile = (inputFile: ResponseFile, fileList: ResponseFile[], addFilesTOState: CallableFunction) => {
   addFilesTOState([inputFile, ...fileList]);
};

const sendFiles = async (
   objWithFiles: HTMLInputElement | DataTransfer,
   addFilesTOState: CallableFunction,
   fileList: ResponseFile[],
   sendler: CallableFunction,
   addFiles: CallableFunction,
   id: number,
   inForm: boolean
) => {
   const form = new FormData();
   if (objWithFiles.files) {
      for (const file of objWithFiles.files) {
         form.append('file[]', file);
      }
      const paylord = await sendler(form);
      if (paylord.data) {
         for (const responseFile of paylord.data.data) {
            const queries = inForm
               ? { comment: id, file: responseFile?.id || -1 }
               : { task: id, file: responseFile?.id || -1 };
            const response = await addFiles(queries);
            if (response.data) {
               addFile(responseFile, fileList, addFilesTOState);
            }
         }
      }
   }
};

const dateFormatter = (date: string | undefined) => {
   if (!date) return date;
   const formatted = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
   }).format(new Date(date));

   return formatted;
};

const commentFormatter = (value: string, activeUser: User | undefined, fileList: ResponseFile[]): Comment => {
   const date = new Date(Date.now()).toDateString();
   return {
      id: Date.now() + Math.floor(Math.random() * 10000),
      content: value,
      files: fileList,
      user: activeUser,
      created_at: date,
      updated_at: date,
   };
};

export { addFile, sendFiles, dateFormatter, commentFormatter };
