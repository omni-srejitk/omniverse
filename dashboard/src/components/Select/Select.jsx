import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DATE_FILTERS } from '../../utils/constants';
import {
  selectAllDates,
  selectDurationFilter,
  selectPopupState,
} from '../../redux/actions';

import {
  setDurationFilter,
  setFilterEndDate,
  setFilterStartDate,
} from '../../redux/features/filterSlice';
import {
  setDatePickerPopup,
  setDurationPopup,
} from '../../redux/features/popupSlice';

export const Select = () => {
  const dispatch = useDispatch();
  const FILTERBYDURATION = useSelector(selectDurationFilter);
  const SHOWPOPUP = useSelector(selectPopupState);
  const SALEDATE = useSelector(selectAllDates);
  const FIRSTSALEDATE = SALEDATE.slice(0,1)[0]


  return (
    <div className='relative w-max '>
      <div
        onClick={() =>
          SHOWPOPUP.durationFilter
            ? dispatch(setDurationPopup(false))
            : dispatch(setDurationPopup(true))
        }
        className='flex cursor-pointer items-center justify-between rounded-lg border-2  border-gray-100 bg-white px-4 py-2 font-medium hover:border-gray-400'
      >
        {FILTERBYDURATION}
        <span className='material-icons'>
          {SHOWPOPUP.durationFilter ? 'expand_less' : 'expand_more'}
        </span>
      </div>
      <ul
        className={` ${
          !SHOWPOPUP.durationFilter ? 'invisible h-0' : 'h-fit'
        } absolute right-0 z-20 my-1 flex w-40 flex-col items-center justify-start rounded-lg border-2 border-gray-50 bg-white `}
      >
        {DATE_FILTERS?.map((item) => (
          <li
            key={item.id}
            onClick={(e) => {
              dispatch(setDurationFilter(item.title));
              if (item.title === 'Custom Range') {
                dispatch(setDatePickerPopup(true));
              } else if (item.title === 'Lifetime') {
                dispatch(setFilterStartDate(FIRSTSALEDATE));
                dispatch(setFilterEndDate(item.endDate));
              } else {
                dispatch(setFilterStartDate(item.startDate));
                dispatch(setFilterEndDate(item.endDate));
                dispatch(setDurationPopup(false));
              }
            }}
            className=' w-full cursor-pointer px-4 py-2 text-right font-semibold text-gray-500 hover:bg-gray-100 hover:text-black'
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
