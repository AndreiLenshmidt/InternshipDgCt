import React, { useState, useEffect, useRef } from 'react';
import style from '@/components/select_custom/select-custom.module.scss';
import ArrowDown from '@public/icons/arrow-down-select.svg';
import { Component, Priority, Stage, TaskType } from '@/api/data.types';

type SelectCustomProps<T> = {
   value: TaskType | Stage | Priority | Component | undefined;
   onChange: (value: TaskType | Stage | Priority | Component | undefined) => void;
   options: TaskType[] | Stage[] | Priority[] | Component[] | undefined; // Опции для выпадающего списка
   titleSelect: string; // Подсказка при выборе
   label?: string; // Текст для `<label>`
   required?: boolean; // Указание, обязательное поле или нет
   errors?: string; // Сообщение об ошибке
   isLoading?: boolean; // Флаг загрузки
   fetchError?: string; // Сообщение об ошибке при загрузке
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
      <div className={style['select-custom']} ref={dropdownRef}>
         {label && (
            <label className={style.label} htmlFor="select-custom">
               {label} {required && <span>*</span>}
            </label>
         )}
         {isLoading ? (
            <p>Загрузка...</p> // Показываем индикатор загрузки
         ) : fetchError ? (
            <p className={style.error}>{fetchError}</p> // Если ошибка, показываем сообщение
         ) : (
            <div className={style['select-wrp']}>
               <div
                  className={`${style['select']} ${isOpen ? style['open'] : ''}`}
                  onClick={() => setIsOpen((prev) => !prev)} // Клик по селекту для открытия
               >
                  <span className={`${style['select-title']} ${value ? style.selected : ''}`}>
                     {value ? String(value) : titleSelect}
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
                              {optionRenderer ? optionRenderer(option) : option.name}
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
