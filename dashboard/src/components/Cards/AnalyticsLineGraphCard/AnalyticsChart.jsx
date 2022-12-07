import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAllFilteredDates,
  selectCumlativeAmtData,
  selectCumlativeCountData,
  selectSaleAmount,
} from '../../../redux/actions';
import { computeAnalyticsSalesNumber2 } from '../../../utils/helperFunctions';
import { LineChartComponent } from '../../Charts/LineChart/LineChartComponent';

export const AnalyticsChart = ({ data }) => {
  const FILTEREDDATE = useSelector(selectAllFilteredDates);
  const FIRSTDATE = moment(FILTEREDDATE, 'DD-MM-YY').format('LL');
  const SALE_AMOUNT = useSelector(selectSaleAmount);
  const LASTDATE = moment().format('LL');
  const DIFF = moment(LASTDATE, 'LL').diff(moment(FIRSTDATE, 'LL'), 'days');
  const CUMLATIVE_SALE = useSelector(selectCumlativeCountData);
  const CUMLATIVE_AMT = useSelector(selectCumlativeAmtData);
  const PREV_DATA = computeAnalyticsSalesNumber2(
    CUMLATIVE_SALE,
    CUMLATIVE_AMT,
    DIFF
  );

  const PERC_SALE = PREV_DATA?.percentageChangeGMV;
  return (
    <div className='h-full max-h-[18rem] w-full'>
      <h1 className='text-3xl font-semibold'>&#8377;{SALE_AMOUNT}</h1>
      <div className='my-2 mb-4  flex items-center gap-2'>
        <div className='flex w-fit items-center justify-center gap-1 rounded-xl bg-green-200 p-1'>
          <span className='material-icons m-0 p-0 text-sm'>
            {PERC_SALE > 0 ? 'arrow_upwards' : 'arrow_downwards'}
          </span>
          <p className='pr-2 text-sm font-medium'>{PERC_SALE || 0}%</p>
        </div>
        <p className='font-medium text-gray-400'>vs {FIRSTDATE}</p>
      </div>
      <LineChartComponent data={data} />
    </div>
  );
};
