import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DATE_FILTERS } from '../../utils/constants';
import { selectDurationFilter, selectAllDates } from '../../redux/actions';
import { filterDates } from '../../utils/helperFunctions';
import { setDurationFilter } from '../../redux/features/filterSlice';

export const Select = ({ showState, setShowState }) => {
  const dispatch = useDispatch();
  const DATES = useSelector(selectAllDates);
  const FILTERBYDURATION = useSelector(selectDurationFilter);

  return (
    <div className='relative w-max '>
      <div
        onClick={() =>
          setShowState({
            ...showState,
            durationFilter: !showState.durationFilter,
            productFilter: false,
          })
        }
        className='flex cursor-pointer items-center justify-between rounded-lg border-2  border-gray-100 bg-white px-4 py-2 font-medium hover:border-gray-400'
      >
        {FILTERBYDURATION}
        <span className='material-icons'>
          {showState.durationFilter ? 'expand_less' : 'expand_more'}
        </span>
      </div>
      <ul
        className={` ${
          !showState.durationFilter ? 'invisible h-0' : 'h-fit'
        } absolute z-20 my-1 flex w-32 flex-col items-center justify-start rounded-lg border-2 border-gray-50 bg-white `}
      >
        {DATE_FILTERS?.map((item) => (
          <li
            key={item.id}
            onClick={(e) => {
              dispatch(setDurationFilter(item.title));
              filterDates(item.title, DATES, dispatch);
              setShowState({ ...showState, durationFilter: false });
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
