import React, { useState, useEffect } from 'react';
import style from '@/ui/SelectCustom/SelectCustom.module.scss';

type SelectCustomProps<T> = {
  value: T;
  onChange: (value: T) => void;
  options: T[]; // Опции для выпадающего списка
  titleSelect: string; // Подсказка при выборе
  label?: string; // Текст для `<label>`
  required?: boolean; // Указание, обязательное поле или нет
  errors?: string; // Сообщение об ошибке
  isLoading?: boolean; // Флаг загрузки
  fetchError?: string; // Сообщение об ошибке при загрузке
  optionRenderer?: (option: T) => React.ReactNode; // Позволяет кастомизировать отображение опций
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
  const [taskTypes, setTaskTypes] = useState<string[]>([]); //<{ label: string; value: string }[]>
  const [loading, setLoading] = useState<boolean>(true);
  // const [fetchError, setFetchError] = useState<string>('');

  useEffect(() => {
    setTaskTypes([
      'Задача',
      'Баг',
      'Улучшение',
      'Новая функциональность',
      'Эпик',
      'Релиз',
      'Бэклог',
    ]);
  }, []);

  // console.log(taskTypes, 'taskTypes');
  console.log(options, 'options');

  return (
    <div className={style['select-custom']}>
      {label && (
        <label htmlFor="select-custom">
          {label} {required && <span>*</span>}
        </label>
      )}
      {isLoading ? (
        <p>Загрузка...</p> // Показываем индикатор загрузки
      ) : fetchError ? (
        <p className={style.error}>{fetchError}</p> // Если ошибка, показываем сообщение
      ) : (
        <select
          className={style.select}
          id="select-custom"
          value={value as unknown as string} // Преобразуем тип для использования в HTML
          onChange={(e) => onChange(e.target.value as T)}
          required={required}
        >
          <option value="" disabled>
            {titleSelect}
          </option>
          {options.map((option, index) => (
            <option
              className={style.options}
              key={index}
              value={option as unknown as string} // Преобразуем тип для значения
            >
              {optionRenderer ? optionRenderer(option) : String(option)}
            </option>
          ))}
        </select>
      )}
      {errors && <p className={style.error}>{errors}</p>}
    </div>
  );
}
