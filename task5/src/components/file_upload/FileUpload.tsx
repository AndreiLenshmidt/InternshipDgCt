import React, { useState, useEffect } from 'react';
import style from '@/components/file_upload/file-upload.module.scss';
import Clipper from '@public/icons/clipper.svg';
import { BASE_URL } from '@/consts';
import { ResponseFile } from '@/api/data.types';
import { useFileUploader } from '@/modules/TaskModalCreationEditing/utils/useFileUploader';
import { useDelFilesFromTaskMutation } from '@/api/appApi.ts';

type ResponseFileWithObject = ResponseFile & {
   fileObject: File;
};
interface FileUploadProps {
   taskId: number;
   files: ResponseFileWithObject[];
   onFilesChange: ((files: ResponseFileWithObject[]) => void) | undefined;
   error?: string;
}

export default function FileUpload({ taskId, files, onFilesChange, error }: FileUploadProps) {
   const [isDragging, setIsDragging] = useState(false);
   const [permissions, setPermissions] = useState(false);
   const [fileLocal, setFileLocal] = useState([]);
   const [respDtLocal, setRespDtLocal] = useState({});
   const [deleteFileTaskMutation] = useDelFilesFromTaskMutation();
   const { sendFiles } = useFileUploader();

   // Проверка, является ли файл изображением
   const isImageFile = (fileName: string): boolean => {
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
      const ext = fileName.split('.').pop()?.toLowerCase();
      return imageExtensions.includes(ext || '');
   };

   // Проверка на дубликаты
   const isDuplicateFile = (newFile: ResponseFileWithObject): boolean => {
      return fileLocal.some((file) => file?.original_name === newFile?.original_name || file?.link === newFile?.link);
   };

   // Обработчики Drag and Drop
   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
   };

   const handleDragLeave = () => {
      setIsDragging(false);
   };

   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const droppedFiles = event.dataTransfer.files;
      const updatedFiles: ResponseFileWithObject[] = [...fileLocal];

      for (const file of Array.from(droppedFiles)) {
         if (!file) continue;

         const newFile: ResponseFileWithObject = {
            // id: 0, //  Math.floor(Math.random() * 1000)
            original_name: file.name,
            link: URL.createObjectURL(file),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),

            fileObject: file,
         };

         if (!isDuplicateFile(newFile)) {
            updatedFiles.push(newFile);
         }
      }

      if (updatedFiles) {
         setPermissions(false);
         setFileLocal(updatedFiles);
         handleFileUpload(updatedFiles);
      } else {
         setPermissions(true);
      }
   };

   // Отправляем файлы если есть
   const handleFileUpload = async (files: ResponseFileWithObject[]) => {
      if (!files.length) return;

      const filterFileId = files.filter((file) => file.id === undefined);
      const filesId = files.filter((file) => file.id !== undefined);

      try {
         let newFiles = [];
         const uploadedFiles = await sendFiles(filterFileId); // записывает файл на сервер

         if (filesId.length > 0) newFiles = [...filesId, ...uploadedFiles];
         if (filesId.length === 0) newFiles = uploadedFiles;

         if (onFilesChange) {
            onFilesChange(newFiles);
         }
      } catch (error) {
         console.error('Ошибка при загрузке файлов:', error);
      }
   };

   // Обработчик изменения файла
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = event.target.files;
      if (!newFiles) return;

      const updatedFiles: ResponseFileWithObject[] = [...fileLocal];

      for (const file of Array.from(newFiles)) {
         const newFile: ResponseFileWithObject = {
            // id: 0,
            original_name: file.name,
            link: URL.createObjectURL(file),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),

            fileObject: file,
         } as ResponseFile & { fileObject: File };

         if (!isDuplicateFile(newFile)) {
            setPermissions(false);
            updatedFiles.push(newFile);
         }
      }

      if (updatedFiles) {
         setPermissions(false);
         setFileLocal(updatedFiles);
         handleFileUpload(updatedFiles);
      } else {
         setPermissions(true);
      }

      event.target.value = ''; // Сброс поля ввода
   };

   // Удаляем файлы к задаче(файлы остаются в базе)
   const handleDeleteFile = async (taskId: number, file: ResponseFileWithObject[]) => {
      try {
         let response;
         if (file[0]?.id) {
            response = await deleteFileTaskMutation({ task: taskId, file: file[0]?.id }).unwrap();
         }
         if (onFilesChange) onFilesChange(response?.data?.files);
         setRespDtLocal(response?.data);
         console.log('Файл успешно удалён из задачи:', response?.data?.files);
      } catch (error) {
         console.error('Ошибка при удалении файла:', error);
      }
   };

   // Удаление файла
   const handleRemoveFile = (file: ResponseFileWithObject) => {
      const updatedFiles: ResponseFileWithObject[] | undefined = fileLocal?.filter(
         (f) => f?.original_name !== file?.original_name
      );

      setFileLocal(updatedFiles);

      const deletedFile: ResponseFileWithObject[] | undefined = fileLocal?.filter(
         (f) => f?.original_name === file?.original_name
      );

      handleDeleteFile(taskId, deletedFile);
   };

   useEffect(() => {
      if (files?.length > 0 && fileLocal.length === 0) {
         const updatedFiles = files
            .filter((file) => file.id !== undefined)
            .map((file) => ({
               ...file,
               link: BASE_URL + file.link, // Добавляем префикс к свойству link; // Учитываем только файлы с id
            }));
         setFileLocal(updatedFiles);
      }
   }, [files]);

   // console.log(files, '-=-=-= files');
   // console.log(fileLocal, '-=-=-= fileLocal');

   return (
      <div className={style['files-upload']}>
         {/* Предпросмотр загруженных файлов */}
         <div className={style['files-prev']}>
            {fileLocal.length > 0 && (
               <ul className={style['list']}>
                  {fileLocal.map((file: ResponseFileWithObject, index: number) => (
                     <li className={style['item']} key={index}>
                        {isImageFile(file?.original_name) ? (
                           <div>
                              <img src={file.link} alt={file.original_name} className={style['preview-image']} />
                              <p>{file?.original_name || 'Без имени'}</p>
                           </div>
                        ) : (
                           <a href={file?.link} target="_blank" rel="noopener noreferrer">
                              {file?.original_name || 'Без имени'}
                           </a>
                        )}
                        <button type="button" onClick={() => handleRemoveFile(file)}>
                           ✕
                        </button>
                     </li>
                  ))}
               </ul>
            )}
         </div>

         {/* Зона загрузки файлов */}
         <div
            className={`${style['inp-wrp']} ${isDragging ? style['drag-active'] : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
         >
            <label className={style['label']} htmlFor="file-upload">
               <div className={style['icon-wrp']}>
                  <Clipper />
               </div>
               <span>Выбери файлы или перетащи их сюда</span>
            </label>
            <input className={style['input']} id="file-upload" type="file" onChange={handleFileChange} />
         </div>

         {/* Ошибка (если есть) */}
         {permissions && <div className={style['error']}>У вас нет разрешения на загрузку файла.</div>}
         {error && <div className={style['error']}>{error}</div>}
      </div>
   );
}

// Использование
// const [files, setFiles] = useState<File[]>([]);

//   const handleFilesChange = (newFiles: File[]) => {
//      setFiles(newFiles);
//   };

// return (
//    <div>
//       <h1>Загрузка файлов</h1>
//       <FileUpload
//          files={files}
//          onFilesChange={askData.can_attach_file ? handleFilesChange : undefined} // Разрешение на загрузку файлов // taskData.can_attach_file
//          error={files.length === 0 ? 'Необходимо загрузить хотя бы один файл' : undefined}
//       />
//    </div>
// );
