import React, { useState } from 'react';
import style from '@/components/file_upload/file-upload.module.scss';
import Clipper from '@public/icons/clipper.svg';

interface FileUploadProps {
   files: string[];
   onFilesChange: (files: string[]) => void;
   error?: string;
}

export default function FileUpload({ files, onFilesChange, error }: FileUploadProps) {
   const [isDragging, setIsDragging] = useState(false);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = event.target.files;
      if (!newFiles) return;

      const updatedFiles = [...files];
      for (const file of Array.from(newFiles)) {
         // Преобразование файла в URL
         const fileUrl = URL.createObjectURL(file);
         updatedFiles.push(fileUrl);
      }

      onFilesChange(updatedFiles); // Обновляем файлы в форме
      event.target.value = ''; // Сбрасываем поле для повторного выбора
   };

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
      const updatedFiles = [...files];
      for (const file of Array.from(droppedFiles)) {
         const fileUrl = URL.createObjectURL(file);
         updatedFiles.push(fileUrl);
      }

      onFilesChange(updatedFiles);
   };

   const handleRemoveFile = (fileUrl: string) => {
      const updatedFiles = files.filter((url) => url !== fileUrl);
      onFilesChange(updatedFiles);
   };

   return (
      <div className={style['files-upload']}>
         <div className={style['files-prev']}>
            {files.length > 0 && (
               <ul className={style['list']}>
                  {files.map((fileUrl, index) => (
                     <li className={style['item']} key={index}>
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                           {fileUrl}
                        </a>
                        <button type="button" onClick={() => handleRemoveFile(fileUrl)}>
                           ✕
                        </button>
                     </li>
                  ))}
               </ul>
            )}
         </div>
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
      </div>
   );
}
