import React, { useState, useEffect, useRef } from 'react';
import style from '@/components/select_custom/select-custom.module.scss';
import ArrowDown from '@public/icons/arrow-down-select.svg';
import { Component, Priority, Stage, TaskType } from '@/api/data.types';

type SelectCustomProps<T> = {
   value: TaskType | Stage | Priority | Component | undefined;
   onChange: (value: TaskType | Stage | Priority | Component | undefined) => void;
   options: TaskType[] | Stage[] | Priority[] | Component[] | undefined;
   titleSelect: string;
   label?: string;
   required?: boolean;
   errors?: string; // Сообщение об ошибке
   isLoading?: boolean; // Флаг загрузки
   fetchError?: string; // Сообщение об ошибке при загрузке
   maxWidth?: number | string;
   optionRenderer?: (option: TaskType | Stage | Priority | Component | undefined) => React.ReactNode; // Позволяет кастомизировать отображение опций
};

export default function SelectCustom<T>({
   value,
   onChange,
   options,
   titleSelect,
   label,
   required,
   errors,
   isLoading,
   fetchError,
   optionRenderer,
   maxWidth,
}: SelectCustomProps<T>) {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   // Закрытие при клике вне компонента
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };

      if (isOpen) {
         document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isOpen]);

   return (
      <div className={style['select-custom']} ref={dropdownRef} style={{ maxWidth: maxWidth }}>
         {label && (
            <label className={style.label} htmlFor="select-custom">
               {label} {required && <span>*</span>}
            </label>
         )}
         {isLoading ? (
            <p>Загрузка...</p>
         ) : fetchError ? (
            <p className={style.error}>{fetchError}</p>
         ) : (
            <div className={style['select-wrp']}>
               <div
                  className={`${style['select']} ${isOpen ? style['open'] : ''}`}
                  onClick={() => setIsOpen((prev) => !prev)}
               >
                  <span className={`${style['select-title']} ${value?.name ? style.selected : ''}`}>
                     {value?.name ? (optionRenderer ? optionRenderer(value) : String(value.name)) : titleSelect}
                  </span>
               </div>

               {isOpen && (
                  <ul className={style['dropdown-list']}>
                     {options &&
                        options.map((option, index) => (
                           <li
                              className={style['dropdown-item']}
                              key={index}
                              onClick={() => {
                                 onChange(option);
                                 setIsOpen(false);
                              }}
                           >
                              <span style={{ backgroundColor: option.color ? option.color : '' }}>
                                 {optionRenderer ? optionRenderer(option) : option.name}
                              </span>
                           </li>
                        ))}
                  </ul>
               )}
               <span className={`${style['dropdown-arrow']} ${isOpen ? style['open'] : ''}`}>
                  <ArrowDown />
               </span>
            </div>
         )}

         {errors && <p className={style.error}>{errors}</p>}
      </div>
   );
}

// Использование
{
   /* <SelectCustom<TaskType>
   value={watch('selectedOptionTasks')}
   onChange={(value) => {
      setValue('selectedOptionTasks', value);
   }}
   options={taskTypes}
   label="Тип задачи"
   titleSelect="Задача"
   required
/>; */
}
