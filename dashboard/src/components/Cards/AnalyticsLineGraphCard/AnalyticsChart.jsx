import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAllFilteredDates,
  selectCumlativeAmtData,
  selectCumlativeCountData,
} from '../../../redux/actions';
import { computeAnalyticsSalesNumber2 } from '../../../utils/helperFunctions';
import { LineChartComponent } from '../../Charts/LineChart/LineChartComponent';
import { ComingSoon } from '../../Placeholders/ComingSoon';

export const AnalyticsChart = ({ data }) => {
  const FILTEREDDATE = useSelector(selectAllFilteredDates);
  const FIRSTDATE = moment(FILTEREDDATE, 'DD-MM-YY').format('LL');
  const LASTDATE = moment().format('LL');
  const DIFF = moment(LASTDATE, 'LL').diff(moment(FIRSTDATE, 'LL'), 'days');
  const CUMLATIVE_SALE = useSelector(selectCumlativeCountData);
  const CUMLATIVE_AMT = useSelector(selectCumlativeAmtData);
  const PREV_DATA = computeAnalyticsSalesNumber2(
    CUMLATIVE_SALE,
    CUMLATIVE_AMT,
    DIFF
  );

  const TOTAL_SALES =
    data.length === 0 ? 0 : data?.reduce((acc, curr) => (acc += curr[7]), 0);

  return (
    <div className='h-full max-h-[18rem] w-full'>
      <h1 className='mb-6 text-3xl font-semibold'>&#8377;{TOTAL_SALES}</h1>
      {data?.length === 0 ? (
        <ComingSoon
          logo={'auto_graph'}
          title='No Data Found.'
          subtitle='Please try again with different filters.'
        />
      ) : (
        <LineChartComponent data={data} />
      )}
    </div>
  );
};
