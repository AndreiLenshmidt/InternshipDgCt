import Calendar from 'react-calendar';
import CalendarIcon from '@public/icons/calendar.svg';
import style from './range-calendar.module.css';
import { useEffect, useRef, useState } from 'react';
import { Value, Range } from 'react-calendar/dist/cjs/shared/types';

export function RangeCalendar({
   onChange,
   placeholder,
   registerOptions = {},
   fieldName = '',
}: {
   placeholder: string;
   onChange: Function;
   registerOptions?: object;
   fieldName?: string;
}) {
   //
   const [calendarShowing, setShowing] = useState(false);
   const [selectedRange, setSelectedRange] = useState<[Date?, Date?]>([undefined, undefined]);
   const wrapper = useRef<HTMLDivElement>(null);
   const input = useRef<HTMLInputElement>(null);

   function rangePicked(dates: Range<Date | undefined>) {
      // console.log(dates);
      setSelectedRange(dates);

      // setTimeout(() => setShowing(false), 200)
      setShowing(false);

      const [startDate, endDate] = dates;

      onChange({ startDate, endDate });
   }

   useEffect(() => {
      let focused = false;

      wrapper.current?.addEventListener('focusin', (e) => (focused = true));
      wrapper.current?.addEventListener('focusout', (e) => {
         focused = false;
         setTimeout(() => {
            if (!focused) setShowing(false);
         }, 50);
      });
   }, [wrapper]);

   return (
      <div className={`${'range_calendar'} ${style.range_calendar}`} tabIndex={0} ref={wrapper}>
         <input
            name={fieldName}
            id={fieldName}
            type="text"
            placeholder={placeholder}
            readOnly
            onClick={() => setShowing((v) => !v)}
            ref={input}
            {...registerOptions}
            value={
               selectedRange.reduce((ac, it) => ac && !!it, true)
                  ? (selectedRange[0]?.toLocaleDateString('ru') || '') +
                    ' - ' +
                    (selectedRange[1]?.toLocaleDateString('ru') || '')
                  : ''
            }
         />
         <span className={style.calendar_icon}>
            <CalendarIcon />
         </span>

         {calendarShowing ? (
            <Calendar
               onChange={(v) => rangePicked(v as Range<Date | undefined>)}
               value={selectedRange[0] ? (selectedRange as [Date, Date]) : undefined}
               selectRange={true}
               className={style.calendar}
               defaultActiveStartDate={undefined}
               formatMonthYear={(locale, date) =>
                  `${date.toLocaleString(locale, { month: 'long' })} ${date.getFullYear()}`
               }
            />
         ) : (
            ''
         )}

         {/* // <CalendarCustom
            //    value={{
            //       startDate: field.value?.startDate ?? undefined,
            //       endDate: field.value?.endDate ?? undefined,
            //    }}
            //    onChange={field.onChange}
            // /> */}
      </div>
   );
}
