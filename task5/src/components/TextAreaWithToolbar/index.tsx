import React, { useEffect, useRef, useState } from 'react';
import style from '@/components/TextAreaWithToolbar/TextAreaWithToolbar.module.scss';

interface TextAreaWithToolbarProps {
   value: string;
   onChange: (value: string) => void;
   error?: string;
}

export default function TextAreaWithToolbar({ value, onChange, error }: TextAreaWithToolbarProps) {
   const [text, setText] = useState<string>('');
   const [isBold, setIsBold] = useState<boolean>(false);
   const [isItalic, setIsItalic] = useState<boolean>(false);
   const [isCode, setIsCode] = useState<boolean>(false);
   const [weightingText, setWeightingText] = useState('');
   const [styledText, setStyledText] = useState('');
   const [familyText, setFamilyText] = useState('');
   const [listMode, setListMode] = useState<'none' | 'bullet' | 'numbered'>('none'); // Режим списка

   const [activeStyles, setActiveStyles] = useState({
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontFamily: 'inherit',
   }); // Активные стили

   const textAreaRef = useRef<HTMLTextAreaElement>(null);

   // Функции для управления стилями
   const toggleBold = () => setIsBold(!isBold);
   const toggleItalic = () => setIsItalic(!isItalic);
   const toggleCode = () => setIsCode(!isCode);

   // Функция для установки режима списка
   const applyFormat = (format: 'bullet' | 'numbered') => {
      setListMode(format);
      const textarea = textAreaRef.current;
      if (textarea) textarea.focus();
   };
   //  const applyFormat = (format: 'bullet' | 'numbered') => {
   //     const textarea = textAreaRef.current;
   //     if (textarea) {
   //        textarea.focus(); // Сохраняем фокус на textarea
   //        setListMode(format); // Устанавливаем режим списка
   //     }
   //  };

   // Функция обработки ввода

   const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = textAreaRef.current;
      if (textarea && listMode !== 'none') {
         const { value, selectionStart } = textarea;

         // Определяем текущую строку
         const lastNewlineIndex = value.lastIndexOf('\n', selectionStart - 1);
         const currentLine = value.substring(lastNewlineIndex + 1, selectionStart);

         // Добавляем маркер списка только если строка ещё не помечена
         if (
            (listMode === 'bullet' && !currentLine.startsWith('• ')) ||
            (listMode === 'numbered' && !currentLine.match(/^\d+\.\s/))
         ) {
            const prefix =
               listMode === 'bullet'
                  ? '• ' // Маркер для маркированного списка
                  : `${(value.match(/\n/g)?.length || 0) + 1}. `; // Номер для нумерованного списка

            const newValue = value.substring(0, lastNewlineIndex + 1) + prefix + value.substring(lastNewlineIndex + 1);
            setText(newValue);
         } else {
            setText(e.target.value); // Если маркер уже есть, просто обновляем текст
         }
      } else {
         setText(e.target.value); // В режиме "none" обновляем текст как обычно
      }
   };

   // const applyFormat = (format: string) => {
   //   const textarea = textAreaRef.current; // Получаем текущий элемент textarea
   //   if (textarea) {
   //     textarea.focus(); // Сохраняем фокус на textarea
   //     if (format === 'list') {
   //       setText((prev) => `${prev}\n• `); // Добавляет символ точки
   //     } else if (format === 'numbered-list') {
   //       const lines = text.split('\n');
   //       const numbered = lines
   //         .map((line, index) => `${index + 1}. ${line}`)
   //         .join('\n');
   //       setText(numbered);
   //     }
   //   }
   // };

   // Функция для применения стиля
   const applyStyle = (style: string) => {
      const newStyles = { ...activeStyles };

      if (style === 'bold') {
         newStyles.fontWeight = newStyles.fontWeight === 'bold' ? 'normal' : 'bold';
      } else if (style === 'italic') {
         newStyles.fontStyle = newStyles.fontStyle === 'italic' ? 'normal' : 'italic';
      } else if (style === 'code') {
         newStyles.fontFamily = newStyles.fontFamily === 'monospace' ? 'inherit' : 'monospace';
      }

      setActiveStyles(newStyles);

      // Сохраняем фокус на textarea
      const textarea = textAreaRef.current;
      if (textarea) {
         textarea.focus();
      }
   };
   // const applyStyleToSelection = (style: string) => {
   //   const textarea = textAreaRef.current; // Получаем текущий элемент textarea
   //   if (textarea) {
   //     const { selectionStart, selectionEnd, value } = textarea;
   //     const selectedText = value.substring(selectionStart, selectionEnd);

   //     let styledText = selectedText;
   //     console.log(styledText, 'styledText');

   //     if (style === 'bold') {
   //       styledText = `${selectedText}`;
   //       toggleBold();
   //       setWeightingText('700');
   //     } else if (style === 'italic') {
   //       styledText = `${selectedText}`;
   //       toggleItalic();
   //       setStyledText('italic');
   //     } else if (style === 'code') {
   //       styledText = `${selectedText}`;
   //       toggleCode();
   //       setFamilyText('monospace');
   //     }

   //     const newText =
   //       value.substring(0, selectionStart) +
   //       styledText +
   //       value.substring(selectionEnd);

   //     setText(newText);

   //     // Сохраняем выделение после обновления текста
   //     textarea.setSelectionRange(
   //       selectionStart + styledText.length,
   //       selectionStart + styledText.length
   //     );

   //     textarea.focus(); // Сохраняем фокус на textarea
   //   }
   // };

   // useEffect(() => {}, [weightingText, styledText, familyText]);

   return (
      <div className={style['textarea-wrp']}>
         {/* Панель инструментов */}
         <div className={style['textarea-header']}>
            <button
               // onClick={() => applyStyleToSelection('bold')}
               style={{ fontWeight: isBold ? '700' : '400' }}
            >
               Жирный
            </button>
            <button
               // onClick={() => applyStyleToSelection('italic')}
               style={{ fontStyle: isItalic ? 'italic' : 'normal' }}
            >
               Курсив
            </button>
            <button
               // onClick={() => applyStyleToSelection('code')}
               style={{ fontFamily: isCode ? 'monospace' : 'inherit' }}
            >
               Код
            </button>
            <button onClick={() => applyFormat('bullet')}>Список</button>
            <button onClick={() => applyFormat('numbered')}>Нумерованный список</button>
         </div>

         {/* Поле ввода */}
         <textarea
            ref={textAreaRef}
            className={style.textarea}
            value={text}
            onChange={handleInput}
            style={{
               fontWeight: isBold ? '700' : '400',
               fontStyle: isItalic ? 'italic' : 'normal',
               fontFamily: isCode ? 'monospace' : 'inherit',
            }}
         />
      </div>
   );
}
