import React from 'react';
import { useState } from 'react';
import { useFilter } from '../../context/FilterContext/FilterContext';
import { DATE_FILTERS } from '../../utils/constants';
import moment from 'moment';
export const Select = () => {
  const [showState, setShowState] = useState(false);
  const { filterState, filterDispatch } = useFilter();

  const filterDates = (val, DATES, dispatch) => {
    switch (val) {
      case 'This Week':
        const firstDayOfWeek = moment().startOf('week');
        const currDayOfWeek = moment().endOf('week');

        const filteredWeek = DATES.filter((date) =>
          moment(date, 'DD-MM-YY').isBetween(
            moment(firstDayOfWeek, 'DD-MM-YY'),
            moment(currDayOfWeek, 'DD-MM-YY')
          )
        );
        return dispatch({ type: 'SET_FILTERED_DATES', payload: filteredWeek });
        break;
      case 'This Month':
        const firstDayOfMonth = moment().startOf('month');
        const currDayOfMonth = moment().endOf('month');
        const filteredMonth = DATES.filter((date) =>
          moment(date, 'DD-MM-YY').isBetween(
            moment(firstDayOfMonth, 'DD-MM-YY'),
            moment(currDayOfMonth, 'DD-MM-YY')
          )
        );
        return dispatch({ type: 'SET_FILTERED_DATES', payload: filteredMonth });
      default:
        return dispatch({ type: 'SET_FILTERED_DATES', payload: DATES });
    }
  };
  return (
    <div className='relative w-max '>
      <div
        onClick={() => setShowState((prevState) => !prevState)}
        className='border-gray- 100 flex cursor-pointer items-center justify-between  rounded-2xl border-2 px-4 py-2 font-medium hover:border-gray-400'
      >
        {filterState.filterByDate}
        <span className='material-icons'>
          {showState ? 'expand_less' : 'expand_more'}
        </span>
      </div>
      <ul
        className={` ${
          !showState ? 'invisible h-0' : 'h-fit'
        } fixed z-20 my-1 flex flex-col items-center justify-start rounded-xl border-2 border-gray-50 bg-white `}
      >
        {DATE_FILTERS?.map((item) => (
          <li
            key={item.id}
            onClick={(e) => {
              filterDispatch({
                type: 'SET_DATE_FILTER',
                payload: item.title,
              });
              filterDates(item.title, filterState.DATES, filterDispatch);
              setShowState(false);
            }}
            className=' cursor-pointer px-4 py-2 font-semibold text-gray-500 hover:text-black'
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
