import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import style from '@/ui/CalendarCustom/CalendarCustom.module.scss';
import CalendarIcon from '@public/icons/calendar.svg';

interface CalendarCustomProps {
  value?: string;
  onChange: (date: string) => void;
}

type TileDisabledParams = {
  date: Date;
};

export default function CalendarCustom({
  value,
  onChange,
}: CalendarCustomProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [animationState, setAnimationState] = useState<
    'open' | 'hidden' | null
  >(null);
  const [errorsShow, setErrorsShow] = useState<string | null>(null);
  const [dateSelected, setDateSelected] = useState<boolean>(false); // Флаг для отслеживания выбора даты
  const [showStartCalendar, setShowStartCalendar] = useState<boolean>(false); // Состояние для открытия календаря начала
  const [showEndCalendar, setShowEndCalendar] = useState<boolean>(false); // Состояние для открытия календаря завершения
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Выбор даты
  const handleDateClick = (date: Date) => {
    if (showStartCalendar) {
      setStartDate(date);
      onChange(date.toISOString());
    } else if (showEndCalendar) {
      setEndDate(date);
      onChange(date.toISOString());
    }
    setShowStartCalendar(false); // Закрыть календарь после выбора
    setShowEndCalendar(false); // Закрыть календарь после выбора
  };

  // Закрытие календаря при клике вне его области

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setShowStartCalendar(false);
      setShowEndCalendar(false);
    }
  };

  // Обработчик клика на документ
  useEffect(() => {
    if (calendarRef.current) {
      const handle = (event: MouseEvent) => handleClickOutside(event);
      document.addEventListener('mousedown', handle);

      // Убираем обработчик при размонтировании компонента
      return () => {
        document.removeEventListener('mousedown', handle);
      };
    }
  }, []);

  // Добавляем классы
  const tileClassName = ({ date }: TileDisabledParams) => {
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    // Если есть startDate и текущий день раньше, чем startDate, блокируем эту дату
    if (startDateObj && date < startDateObj) {
      return style.disabledDate; // Класс для блокировки
    }

    // Если текущий день равен startDate, применяем стиль startDate
    if (startDateObj && date.toDateString() === startDateObj.toDateString()) {
      return style.startDate;
    }

    // Если есть и startDate, и endDate, и текущий день в диапазоне между ними
    if (
      startDateObj &&
      endDateObj &&
      date > startDateObj &&
      date < endDateObj
    ) {
      return style.range;
    }

    // Если текущий день равен endDate, применяем стиль endDate
    if (endDateObj && date.toDateString() === endDateObj.toDateString()) {
      return style.endDate;
    }

    return '';
  };

  // Отключение ячеек календаря
  const tileDisabled = ({ date }: TileDisabledParams) => {
    const today = new Date();

    // Разрешаем выбирать все даты начиная с сегодняшнего дня, включая startDate
    if (date < today) {
      return true; // Блокируем все даты до сегодняшнего дня
    }

    // Дата начала не может быть больше даты завершения!
    if (showStartCalendar) {
      if (endDate && date > endDate) {
        return true;
      }
    }

    // Разрешаем выбор startDate всегда, даже если endDate выбрана
    if (showStartCalendar) {
      return false;
    }

    // Для выбора endDate, проверяем, чтобы оно не было раньше startDate
    if (startDate && date < new Date(startDate)) {
      return true; // Блокируем дату завершения, которая раньше startDate
    }

    return false; // Разрешаем все остальные даты
  };

  // Показать календарь с анимацией // ???
  // const openCalendar = (type: 'start' | 'end') => {
  //   setShowCalendar(type);
  //   setAnimationState('open');
  // };

  // Скрыть календарь с анимацией // ???
  const closeCalendar = () => {
    setShowStartCalendar(false);
    setShowEndCalendar(false);
    setAnimationState('hidden');
    setTimeout(() => {
      setShowStartCalendar(false); // Закрыть календарь после выбора
      setShowEndCalendar(false);
    }, 300);
  };

  // Обработчик клика по полю "Дата начала"
  const handleInputClick = () => {
    // // Если календарь уже открыт для выбора даты начала, и дата не была выбрана
    // if (showCalendar === 'start' && !dateSelected) {
    //   closeCalendar(); // Закрыть календарь
    // } else {
    //   setShowCalendar('start'); // Открыть календарь для выбора даты начала
    // }
  };

  const handleStartDateClick = () => {
    if (showStartCalendar) {
      setShowStartCalendar(false); // Закрыть, если уже открыт
    } else {
      setAnimationState('open');
      setShowStartCalendar(true); // Открыть календарь для даты начала
      setShowEndCalendar(false); // Закрыть календарь для даты завершения
    }
  };

  const handleEndDateClick = () => {
    if (showEndCalendar) {
      setShowEndCalendar(false); // Закрыть, если уже открыт
    } else {
      setAnimationState('open');
      setShowEndCalendar(true); // Открыть календарь для даты завершения
      setShowStartCalendar(false); // Закрыть календарь для даты начала
    }
  };

  return (
    <div className={style['date-range-picker']} ref={calendarRef}>
      <div className={style['inputs-date']}>
        <div
          className={style['input-wrp']}
          onClick={() => {
            handleStartDateClick();
            setShowStartCalendar(!showStartCalendar);
          }}
        >
          <label>Дата начала</label>
          <div className={style['inp']}>
            <input
              type="text"
              value={startDate ? startDate.toLocaleDateString() : ''}
              placeholder="Дата начала"
              readOnly
              // onClick={() => openCalendar('start')}
            />
            <span className={style['calendar-icon']}>
              <CalendarIcon />
            </span>

            {/* ---------------- Дата Начала --------------------- */}
            {showStartCalendar && (
              <div className="calendar-wrapper">
                <Calendar
                  locale="ru"
                  className="custom-calendar"
                  value={startDate || new Date()}
                  onClickDay={(date) => handleDateClick(date)}
                  formatMonthYear={(locale, date) =>
                    `${date.toLocaleString(locale, { month: 'long' })} ${date.getFullYear()}`
                  }
                  tileClassName={tileClassName}
                  tileDisabled={tileDisabled}
                />
              </div>
            )}
          </div>

          {errorsShow ? <p className={style.error}>{errorsShow}</p> : ''}
        </div>

        {/* Дата завершения */}
        <div
          className={style['input-wrp']}
          onClick={() => {
            handleEndDateClick();
            setShowEndCalendar(!showEndCalendar);
          }}
        >
          <label>Дата завершения</label>
          <div className={style['inp']}>
            <input
              type="text"
              value={endDate ? endDate.toLocaleDateString() : ''}
              placeholder="Дата завершения"
              readOnly
              // onClick={() => openCalendar('end')}
            />
            <span className={style['calendar-icon']}>
              <CalendarIcon />
            </span>

            {/* Календарь для выбора даты завершения */}
            {showEndCalendar && (
              <div className="calendar-wrapper">
                <Calendar
                  locale="ru"
                  className="custom-calendar"
                  value={endDate || new Date()}
                  onClickDay={(date) => handleDateClick(date)}
                  formatMonthYear={(locale, date) =>
                    `${date.toLocaleString(locale, { month: 'long' })} ${date.getFullYear()}`
                  }
                  tileClassName={tileClassName}
                  tileDisabled={tileDisabled}
                />
              </div>
            )}
          </div>

          {errorsShow ? <p className={style.error}>{errorsShow}</p> : ''}
        </div>
      </div>
    </div>
  );
}
