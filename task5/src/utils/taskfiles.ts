// import { useDeleteUSerCommentMutation } from '@/api/appApi';
import { ResponseFile } from '@/api/data.types';
import { BYTES_IN_MB, MAX_FILE_SIZE } from '@/consts';
import { DragEvent } from 'react';

// const [delComment, { isLoading, isError, isSuccess }] = useDeleteUSerCommentMutation();

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
const addFiles = (inputFileList: FileList, fileList: ResponseFile[], addFilesTOState: CallableFunction) => {
   // const files = new DataTransfer();
   for (const file of inputFileList) {
      if (fileValidation(file, fileList)) {
         // files.items.add(file);
         const correctFormatFile = fileFormatter(file);
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
