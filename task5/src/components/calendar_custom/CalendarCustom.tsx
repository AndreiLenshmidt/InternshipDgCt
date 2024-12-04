import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import style from '@/components/calendar_custom/calendar-custom.module.scss';
import CalendarIcon from '@public/icons/calendar.svg';

interface CalendarCustomProps {
   value?: { startDate?: string; endDate?: string };
   onChange: (dates: { startDate: string | null; endDate: string | null }) => void;
}

type TileDisabledParams = {
   date: Date;
};

export default function CalendarCustom({ value, onChange }: CalendarCustomProps) {
   const [startDate, setStartDate] = useState<Date | null>(value?.startDate ? new Date(value.startDate) : null);
   const [endDate, setEndDate] = useState<Date | null>(value?.endDate ? new Date(value.endDate) : null);
   const [errorsShow, setErrorsShow] = useState<string | null>(null);
   const [showStartCalendar, setShowStartCalendar] = useState<boolean>(false); // Состояние для показа календаря начала
   const [showEndCalendar, setShowEndCalendar] = useState<boolean>(false); // Состояние для показа календаря завершения
   const calendarRef = useRef<HTMLDivElement | null>(null);

   // Обработчик выбора даты (для начала и завершения)
   const handleDateClick = (date: Date) => {
      if (showStartCalendar) {
         setStartDate(date);
         onChange({ startDate: date.toISOString(), endDate: endDate ? endDate.toISOString() : null });
         setShowStartCalendar(false);
      } else if (showEndCalendar) {
         setEndDate(date);
         onChange({ startDate: startDate ? startDate.toISOString() : null, endDate: date.toISOString() });
         setShowEndCalendar(false);
      }
   };

   // Обработчик клика вне области календаря
   const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
         setShowStartCalendar(false);
         setShowEndCalendar(false);
      }
   };

   useEffect(() => {
      const handle = (event: MouseEvent) => handleClickOutside(event);
      document.addEventListener('mousedown', handle);
      return () => {
         document.removeEventListener('mousedown', handle);
      };
   }, []);

   // Добавление классов для ячеек
   const tileClassName = ({ date }: TileDisabledParams) => {
      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;

      if (startDateObj && date < startDateObj) return style.disabledDate;
      if (startDateObj && date.toDateString() === startDateObj.toDateString()) return style.startDate;
      if (startDateObj && endDateObj && date > startDateObj && date < endDateObj) return style.range;
      if (endDateObj && date.toDateString() === endDateObj.toDateString()) return style.endDate;
      return '';
   };

   // Отключение выбора недопустимых дат
   const tileDisabled = ({ date }: TileDisabledParams) => {
      const today = new Date();

      if (date < today) return true;

      if (showStartCalendar && endDate && date > endDate) return true;

      if (showEndCalendar && startDate && date < new Date(startDate)) return true;

      return false;
   };

   // Переключение календарей
   const handleStartDateClick = () => {
      setShowStartCalendar(!showStartCalendar);
      setShowEndCalendar(false);
   };

   const handleEndDateClick = () => {
      setShowEndCalendar(!showEndCalendar);
      setShowStartCalendar(false);
   };

   return (
      <div className={style['date-range-picker']} ref={calendarRef}>
         <div className={style['inputs-date']}>
            {/* Дата начала */}
            <div className={style['input-wrp']} onClick={handleStartDateClick}>
               <label>Дата начала</label>
               <div className={style['inp']}>
                  <input
                     type="text"
                     value={startDate ? startDate.toLocaleDateString() : ''}
                     placeholder="Дата начала"
                     readOnly
                  />
                  <span className={style['calendar-icon']}>
                     <CalendarIcon />
                  </span>

                  {showStartCalendar && (
                     <div className="calendar-wrapper">
                        <Calendar
                           locale="ru"
                           className="custom-calendar"
                           value={startDate || new Date()}
                           onClickDay={handleDateClick}
                           formatMonthYear={(locale, date) =>
                              `${date.toLocaleString(locale, { month: 'long' })} ${date.getFullYear()}`
                           }
                           tileClassName={tileClassName}
                           tileDisabled={tileDisabled}
                        />
                     </div>
                  )}
               </div>
            </div>

            {/* Дата завершения */}
            <div className={style['input-wrp']} onClick={handleEndDateClick}>
               <label>Дата завершения</label>
               <div className={style['inp']}>
                  <input
                     type="text"
                     value={endDate ? endDate.toLocaleDateString() : ''}
                     placeholder="Дата завершения"
                     readOnly
                  />
                  <span className={style['calendar-icon']}>
                     <CalendarIcon />
                  </span>

                  {showEndCalendar && (
                     <div className="calendar-wrapper">
                        <Calendar
                           locale="ru"
                           className="custom-calendar"
                           value={endDate || new Date()}
                           onClickDay={handleDateClick}
                           formatMonthYear={(locale, date) =>
                              `${date.toLocaleString(locale, { month: 'long' })} ${date.getFullYear()}`
                           }
                           tileClassName={tileClassName}
                           tileDisabled={tileDisabled}
                        />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

// Использование
// const handleDateChange = (dates: { startDate: string | null; endDate: string | null }) => {
//    console.log('Дата начала:', dates.startDate);
//    console.log('Дата завершения:', dates.endDate);
// };

// return <CalendarCustom value={{ startDate: '2024-12-01', endDate: '2024-12-10' }} onChange={handleDateChange} />;
