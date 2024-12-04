import React, { useEffect, useRef, useState } from 'react';
import style from '@/components/select_custom_checkbox/SelectCustomCheckbox.module.scss';
import ArrowDown from '@public/icons/arrow-down-select.svg';
import Close from '@public/icons/close.svg';

interface Option<T> {
   label: string;
   value: T;
}

interface SelectCustomProps<T> {
   value: T[];
   onChange: (newValue: T[]) => void; // Функция для обновления значений
   options: Option<T>[];
   label?: string;
   titleSelect?: string; // Заголовок, если ничего не выбрано
   required?: boolean;
}

export default function SelectCustomCheckbox<T>({
   value,
   onChange,
   options,
   label,
   titleSelect = 'Выберите значение',
   required = false,
}: SelectCustomProps<T>) {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   // const [valueMain, setValueMain] = useState<T[]>([]);

   // Переключение состояния выбранности
   const toggleOption = (optionValue: T) => {
      if (value.includes(optionValue)) {
         onChange(value.filter((item) => item !== optionValue)); // Удалить значение
      } else {
         onChange([...value, optionValue]); // Добавить значение
      }
   };

   // Функция для удаления элемента
   const removeItem = (valueToRemove: T) => {
      console.log(value, 'value --- SelectCustomCheckbox');

      onChange(value.filter((v) => v !== valueToRemove)); // Удаляем из массива выбранных значений
   };

   // Закрытие при клике вне компонента
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false); // Закрыть выпадающий список
         }
      };

      if (isOpen) {
         document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isOpen]);

   // console.log(value, 'value --- SelectCustomCheckbox');
   // console.log(options, 'options --- SelectCustomCheckbox');

   return (
      <div className={style['select-custom']} ref={dropdownRef}>
         {/* Заголовок */}
         {label && (
            <label className={style['label']}>
               {label} {required && <span className={style['required']}>*</span>}
            </label>
         )}

         {/* Выпадающий заголовок */}
         <div
            className={`${style['dropdown']} ${isOpen ? style['open'] : ''}`}
            onClick={() => setIsOpen((prev) => !prev)}
         >
            <div className={style['dropdown-header-wrp']}>
               <div className={style['dropdown-header']}>
                  {value.length > 0
                     ? options
                          .filter((option) => value.includes(option.value))
                          .map((option, index) => (
                             <span className={style['dropdown-item-header']} key={index}>
                                {option.label}

                                {/* Крестик для удаления */}
                                <span
                                   className={style['close-wrp']}
                                   onClick={(e) => {
                                      e.stopPropagation();
                                      removeItem(option.value);
                                   }}
                                >
                                   <Close />
                                </span>
                             </span>
                          ))
                     : titleSelect}
               </div>
            </div>

            <span className={`${style['dropdown-arrow']} ${isOpen ? style['open'] : ''}`}>
               <ArrowDown />
            </span>
         </div>

         {/* Список опций */}
         {isOpen && (
            <ul className={style['dropdown-list']}>
               {options.map((option, ind) => (
                  <li key={ind} className={style['dropdown-item']}>
                     <label className={style['checkbox-label']}>
                        <input
                           type="checkbox"
                           checked={value.includes(option.value)}
                           onChange={() => toggleOption(option.value)}
                           className={style['checkbox-input']}
                        />
                        <span className={style['checkbox-custom']}></span>
                        {option.label}
                     </label>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}
