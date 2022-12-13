import moment from 'moment';
import {
  selectDurationFilter,
  selectFilterEndDate,
  selectFilterStartDate,
} from '../../redux/actions';
import { useSelector } from 'react-redux';
export const MonthCalendar = ({
  month,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  disablePastDates = false,
  disableFutureDates = false,
}) => {
  const firstDay = moment(month, 'MMMM').startOf('month').format('d');
  const daysInMonth = moment(month, 'MMMM').daysInMonth();
  const daysInCurrMonthArr = [];
  const weekArray = moment.weekdaysShort();

  const DURATION_FILTER = useSelector(selectDurationFilter);

  const handleDateClick = (e) => {
    const dateValue = e.target.dataset.date;
    if (startDate) {
      if (
        moment(dateValue, 'DD-MM-YY').isBefore(moment(startDate, 'DD-MM-YY'))
      ) {
        setEndDate(startDate);
        setStartDate(dateValue);
      } else {
        setEndDate(dateValue);
      }
    } else {
      setStartDate(dateValue);
    }
  };

  const createNumberOfDays = (
    firstDay,
    daysInMonth,
    arr,
    startDate,
    endDate
  ) => {
    const today = moment();
    let rows = [];
    let cells = [];
    for (let i = 1; i <= firstDay; i++) {
      arr.push(
        <td className='flex h-[3rem] w-[3rem] flex-grow-0 items-center justify-center'></td>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currDate = i + '-' + month;
      const date = moment(currDate, 'D-MMMM').format('DD-MM-YY');

      arr.push(
        <td
          key={date}
          className={`group flex h-[3rem] w-[3rem]  cursor-pointer items-center justify-center
          ${
            disableFutureDates && moment(date, 'DD-MM-YY').isAfter(today)
              ? 'pointer-events-none text-gray-300'
              : ''
          }

          ${
            disablePastDates && moment(date, 'DD-MM-YY').isBefore(today)
              ? 'pointer-events-none text-gray-300'
              : ''
          }

          ${
            moment(startDate, 'DD-MM-YY').isSame(moment(date, 'DD-MM-YY')) ||
            (moment(endDate, 'DD-MM-YY').isSame(moment(date, 'DD-MM-YY')) &&
              startDate &&
              endDate)
              ? ' bg-gray-100'
              : ''
          }

          ${
            moment(endDate, 'DD-MM-YY').isAfter(
              moment(startDate, 'DD-MM-YY')
            ) && moment(startDate, 'DD-MM-YY').isSame(moment(date, 'DD-MM-YY'))
              ? 'rounded-l-full'
              : ''
          }

          ${startDate && endDate ? '' : 'rounded-full'}

          ${
            moment(endDate, 'DD-MM-YY').isBefore(
              moment(startDate, 'DD-MM-YY')
            ) && moment(startDate, 'DD-MM-YY').isSame(moment(date, 'DD-MM-YY'))
              ? ' rounded-r-full'
              : ''
          }

          ${
            moment(startDate, 'DD-MM-YY').isBefore(
              moment(endDate, 'DD-MM-YY')
            ) && moment(endDate, 'DD-MM-YY').isSame(moment(date, 'DD-MM-YY'))
              ? ' rounded-r-full'
              : ''
          }

          ${
            moment(date, 'DD-MM-YY').isBetween(
              moment(startDate, 'DD-MM-YY'),
              moment(endDate, 'DD-MM-YY')
            )
              ? 'rounded-none bg-gray-100 '
              : ''
          }
      `}
        >
          <div
            disabled={moment(date, 'DD-MM-YY').isAfter(today)}
            data-date={date}
            onClick={(e) => handleDateClick(e)}
            className={`flex h-full w-full       
            ${
              moment(startDate, 'DD-MM-YY').isSame(moment(date, 'DD-MM-YY')) ||
              moment(endDate, 'DD-MM-YY').isSame(moment(date, 'DD-MM-YY'))
                ? 'bg-black text-white'
                : ''
            } items-center justify-center rounded-full border-2 border-transparent disabled:text-yellow-500 group-hover:border-black`}
          >
            {i}
          </div>
        </td>
      );
    }

    arr.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }

      if (i === arr?.length - 1) {
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return (
        i !== 0 && (
          <tr className='col-span-7 row-span-1 flex w-full justify-start'>
            {d}
          </tr>
        )
      );
    });

    return daysinmonth;
  };
  const daysArr = createNumberOfDays(
    firstDay,
    daysInMonth,
    daysInCurrMonthArr,
    startDate,
    endDate
  );

  return (
    <div className='flex flex-col items-center justify-center  first:hidden lg:first:flex'>
      <p className=' text-lg font-medium'>{month}</p>
      <table>
        <thead className='w-full'>
          <tr className='my-4 grid w-full grid-cols-7 grid-rows-1'>
            {weekArray?.map((weekDay) => (
              <th
                key={weekDay}
                className='flex h-10 w-10 items-center justify-center'
              >
                {weekDay}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='grid w-full grid-cols-7 grid-rows-5'>{daysArr}</tbody>
      </table>
    </div>
  );
};
