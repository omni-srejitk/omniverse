import moment from 'moment';
import React, { useState } from 'react';
import { Button } from '../Buttons';
import { MonthCalendar } from '../MonthCalendar/MonthCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { selectPopupState } from '../../redux/actions';
import {
  setFilterEndDate,
  setFilterStartDate,
} from '../../redux/features/filterSlice';
import { setDatePickerPopup } from '../../redux/features/popupSlice';
export const DateSelector = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currMonth, setCurrMonth] = useState(moment().format('MMMM'));
  const [prevMonth, setPrevMonth] = useState(
    moment().subtract(1, 'months').format('MMMM')
  );

  const today = moment().format('MMMM');
  const dispatch = useDispatch();
  const addMonth = (duration) => {
    const updatedmonth = moment(currMonth, 'MMMM')
      .subtract(duration, 'months')
      .format('MMMM');
    setCurrMonth(updatedmonth);
    setPrevMonth(
      moment(prevMonth, 'MMMM').subtract(duration, 'months').format('MMMM')
    );
  };

  const resetDates = () => {
    setStartDate('');
    setEndDate('');
  };

  const applyDates = () => {
    dispatch(setFilterStartDate(startDate));
    dispatch(setFilterEndDate(endDate));
    dispatch(setDatePickerPopup(false));
  };

  return (
    <div className=' w-full'>
      <div
        className='absolute top-[12rem] left-0 right-0 z-50 mx-auto h-fit max-h-[calc(100vh-15rem)]
      w-[calc(100vw-3rem)] rounded-2xl bg-white px-8  py-4 shadow-md lg:top-[14.5rem]  lg:left-[unset] lg:right-[2.5rem] lg:w-[calc(100vw-35rem)]'
      >
        <div className='relative h-full w-full'>
          {/* //* Button Group */}
          <div className='flex items-center justify-between'>
            <button
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white disabled:text-gray-200 hover:bg-gray-200 disabled:hover:bg-white'
              onClick={() => addMonth(1)}
            >
              <span className='material-icons'>chevron_left</span>
            </button>

            <button
              onClick={() => addMonth(-1)}
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white disabled:text-gray-200 hover:bg-gray-200 disabled:hover:bg-white'
              disabled={moment(currMonth, 'MMMM').isSame(moment(today, 'MMMM'))}
            >
              <span className='material-icons'>chevron_right</span>
            </button>
          </div>

          {/* //* Month Calendar */}
          <div className='flex w-full  items-center justify-center gap-40'>
            <MonthCalendar
              month={prevMonth}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              disableFutureDates
            />
            <MonthCalendar
              month={currMonth}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              disableFutureDates
            />
          </div>
          <div className='mt-6 flex items-center justify-end gap-4'>
            <Button
              onClick={() => dispatch(setDatePickerPopup(false))}
              type={'OUTLINED'}
            >
              Close
            </Button>
            <Button onClick={resetDates} type={'OUTLINED'}>
              Reset
            </Button>
            <Button onClick={() => applyDates()} type={'OUTLINED'}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
