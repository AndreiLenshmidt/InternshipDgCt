import React, { useState } from 'react';
import style from '@/components/file_upload/file-upload.module.scss';
import Clipper from '@public/icons/clipper.svg';
import { ResponseFile } from '@/api/data.types';
import { useFileUploader } from '@/modules/TaskModalCreationEditing/utils/useFileUploader';
import {
   useSendFilesTaskMutation,
   useDeleteFileTaskMutation,
} from '@/modules/TaskModalCreationEditing/api/taskApiActions';

type ResponseFileWithObject = ResponseFile & {
   fileObject: File;
};
interface FileUploadProps {
   files: ResponseFile[];
   onFilesChange: ((files: ResponseFileWithObject[]) => void) | undefined;
   error?: string;
}

export default function FileUpload({ files, onFilesChange, error }: FileUploadProps) {
   const [isDragging, setIsDragging] = useState(false);
   const [permissions, setPermissions] = useState(false);
   const [deleteFileTaskMutation] = useDeleteFileTaskMutation();

   // Проверка на дубликаты
   const isDuplicateFile = (newFile: ResponseFile): boolean => {
      return files.some((file) => file?.original_name === newFile?.original_name || file?.link === newFile?.link);
   };

   // Обработчик изменения файла
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = event.target.files;
      if (!newFiles) return;

      const updatedFiles = [...files];

      for (const file of Array.from(newFiles)) {
         const newFile: ResponseFileWithObject = {
            id: Math.floor(Math.random() * 1000),
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

      if (onFilesChange) {
         setPermissions(false);
         onFilesChange(updatedFiles);
      } else {
         setPermissions(true);
      }

      event.target.value = ''; // Сброс поля ввода
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
      const updatedFiles: ResponseFile[] = [...files];
      for (const file of Array.from(droppedFiles)) {
         if (!file) continue;

         const newFile: ResponseFile = {
            original_name: file.name,
            link: URL.createObjectURL(file),
            created_at: new Date().toISOString(),
         };

         if (!isDuplicateFile(newFile)) {
            updatedFiles.push(newFile);
         }
      }

      onFilesChange(updatedFiles);
   };

   // Удаляем файлы к задаче(файлы остаются в базе)
   const handleDeleteFile = async (taskId: number, files: ResponseFileWithObject[]) => {
      try {
         const response = await deleteFileTaskMutation({ taskId: taskId, fileId: files.id }).unwrap();
         console.log('Файл успешно удалён из задачи');
      } catch (error) {
         console.error('Ошибка при удалении файла:', error);
      }
   };

   // Удаление файла
   const handleRemoveFile = (file: ResponseFile) => {
      const updatedFiles: ResponseFile[] | undefined = files.filter((f) => f?.link !== file?.link);
      onFilesChange(updatedFiles);

      console.log(file, 'file delete');
      // handleDeleteFile(taskId: 27, files:file)
   };

   // Проверка, является ли файл изображением
   const isImageFile = (fileName: string): boolean => {
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
      const ext = fileName.split('.').pop()?.toLowerCase();
      return imageExtensions.includes(ext || '');
   };

   return (
      <div className={style['files-upload']}>
         {/* Предпросмотр загруженных файлов */}
         <div className={style['files-prev']}>
            {files.length > 0 && (
               <ul className={style['list']}>
                  {files.map((file, index) => (
                     <li className={style['item']} key={index}>
                        {isImageFile(file?.original_name || '') ? (
                           <img src={file.link} alt={file.original_name} className={style['preview-image']} />
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
            <input className={style['input']} id="file-upload" type="file" multiple onChange={handleFileChange} />
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
