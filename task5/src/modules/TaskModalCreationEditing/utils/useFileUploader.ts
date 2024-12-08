import { ResponseFile } from '@/api/data.types';
import { useSendFilesMutation } from '@/api/appApi';

export type ResponseFileWithObject = ResponseFile & {
   fileObject: File;
};

export const useFileUploader = () => {
   const [sendler, { data: response, isLoading, isError }] = useSendFilesMutation();

   const sendFiles = async (files: ResponseFileWithObject[]) => {
      if (!files.length) {
         console.error('Нет файлов для отправки');
         return [];
      }

      const form = new FormData();

      console.log(files, 'files');

      Array.from(files).forEach((file) => {
         form.append('file[]', file.fileObject);
      });

      try {
         const response = await sendler(form);
         console.log('Файлы успешно загружены:', response);

         return response;
      } catch (error) {
         console.error('Ошибка при загрузке файлов:', error);
         return [];
      }
   };

   return { sendFiles };
};
