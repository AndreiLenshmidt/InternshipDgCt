import React, { useState } from 'react';
import style from './SelectCustom.module.css';

type Option<T> = {
  label: string;
  value: T;
};

type SelectCustomProps<T> = {
  value: T[];
  onChange: (value: T[]) => void;
  options: Option<T>[];
  label?: string;
  titleSelect: string;
  required?: boolean;
};

export default function SelectCustomCheckbox<T>({
  value,
  onChange,
  options,
  label,
  titleSelect,
  required = false,
}: SelectCustomProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue: T) => {
    if (value.includes(optionValue)) {
      // Удаляем из выбранных, если уже есть
      onChange(value.filter((item) => item !== optionValue));
    } else {
      // Добавляем в выбранные
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className={style['select-custom']}>
      {label && (
        <label>
          {label} {required && <span>*</span>}
        </label>
      )}
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
      </div>
      {isOpen && (
        <ul className={style['dropdown-list']}>
          {options.map((option, ind) => (
            <li key={ind} className={style['dropdown-item']}>
              <label>
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
