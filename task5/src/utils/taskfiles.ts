import { ResponseFile } from '@/api/data.types';

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
            addFile(responseFile, fileList, addFilesTOState);
         }
      }
   }
};

export { addFile, sendFiles };
