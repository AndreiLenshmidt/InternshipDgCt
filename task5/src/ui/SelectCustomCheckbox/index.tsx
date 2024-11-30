import React, { useState } from 'react';
import style from '@/ui/SelectCustomCheckbox/SelectCustomCheckbox.module.scss';
import ArrowDown from '@public/images/icons/arrow-down-select.svg';

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

  // Переключение состояния выбранности
  const toggleOption = (optionValue: T) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue)); // Удалить значение
    } else {
      onChange([...value, optionValue]); // Добавить значение
    }
  };

  return (
    <div className={style['select-custom']}>
      {/* Заголовок */}
      {label && (
        <label className={style['label']}>
          {label} {required && <span className={style['required']}>*</span>}
        </label>
      )}

      {/* Выпадающий заголовок */}
      <div
        className={style['dropdown']}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={style['dropdown-header']}>
          {value.length > 0
            ? options
                .filter((option) => value.includes(option.value))
                .map((option) => option.label)
                .join(', ')
            : titleSelect}
        </div>
        <span
          className={`${style['dropdown-arrow']} ${isOpen ? style['open'] : ''}`}
        >
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
