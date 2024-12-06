// import { useDeleteUSerCommentMutation } from '@/api/appApi';
import { useSendFilesMutation } from '@/api/appApi';
import { ResponseFile } from '@/api/data.types';
import { BYTES_IN_MB, MAX_FILE_SIZE } from '@/consts';
import { DragEvent } from 'react';

const fileValidation = (file: File, fileList: ResponseFile[]) => {
   if (file.size > BYTES_IN_MB * MAX_FILE_SIZE) {
      return false;
   } else if (fileList.filter((item) => item?.original_name === file.name).length !== 0) {
      return false;
   } else {
      return true;
   }
};
const fileFormatter = (file: File): ResponseFile => {
   const date = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
   }).format(new Date(Date.now()));
   return {
      id: Date.now() + Math.floor(Math.random() * 10000),
      original_name: file.name,
      link: window.URL.createObjectURL(file),
      created_at: date,
      updated_at: date,
   };
};
const addFiles = async (
   inputFileList: FileList,
   fileList: ResponseFile[],
   addFilesTOState: CallableFunction,
   sendler: CallableFunction
) => {
   // const files = new DataTransfer();
   for (const file of inputFileList) {
      if (fileValidation(file, fileList)) {
         // files.items.add(file);
         const fileReader = new FileReader();
         fileReader.readAsArrayBuffer(file);

         const form = new FormData();
         const correctFormatFile = fileFormatter(file);
         fileReader.onload = function () {
            // fileReader.result;
            form.append('file', new File([fileReader.result], file.name));
            // console.log(fileReader.result);
            console.log(paylord);
         };
         const paylord = await sendler(form);
         fileList.push(correctFormatFile);

         // console.log(correctFormatFile);
      }
      addFilesTOState([...fileList]);
   }
};
const dropHandler = (e: DragEvent<HTMLLabelElement>, fileList: ResponseFile[], addFilesTOState: CallableFunction) => {
   e.preventDefault();
   addFiles(e.dataTransfer.files, fileList, addFilesTOState);
   //    console.log('drop');
};

export { addFiles, dropHandler };
