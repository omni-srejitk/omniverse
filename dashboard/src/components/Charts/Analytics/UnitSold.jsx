import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  selectAllFilteredDates,
  selectCumlativeAmtData,
  selectCumlativeCountData,
  selectUnitsSold,
} from '../../../redux/actions';
import {
  calculateDayWiseItemsSold,
  computeAnalyticsSalesNumber2,
} from '../../../utils/helperFunctions';

export const UnitSold = (props) => {
  const { data, XAxisKey, YAxisKey, DataKey, color } = props;
  const FILTEREDDATE = useSelector(selectAllFilteredDates);
  const FIRSTDATE = moment(FILTEREDDATE, 'DD-MM-YY').format('LL');
  const SALE_UNIT = useSelector(selectUnitsSold);
  const LASTDATE = moment().format('LL');
  const DIFF = moment(LASTDATE, 'LL').diff(moment(FIRSTDATE, 'LL'), 'days');
  const CUMLATIVE_SALE = useSelector(selectCumlativeCountData);
  const CUMLATIVE_AMT = useSelector(selectCumlativeAmtData);
  const PREV_DATA = computeAnalyticsSalesNumber2(
    CUMLATIVE_SALE,
    CUMLATIVE_AMT,
    DIFF
  );

  const chartData = calculateDayWiseItemsSold(data)?.slice(-7);

  const PERC_SALE_UNIT = PREV_DATA?.percentageChangeCount;
  return (
    <div className='h-full max-h-[18rem] min-h-[10rem] w-full'>
      <h1 className='text-3xl font-semibold'>{SALE_UNIT}</h1>
      <div className='my-2 mb-4  flex items-center gap-2'>
        <div className='flex w-fit items-center justify-center gap-1 rounded-xl bg-green-200 p-1'>
          <span className='material-icons m-0 p-0 text-sm'>
            {PERC_SALE_UNIT > 0 ? 'arrow_upwards' : 'arrow_downwards'}
          </span>
          <p className='pr-2 text-sm font-medium'>{PERC_SALE_UNIT || 0}%</p>
        </div>
        <p className='font-medium text-gray-400'>vs {FIRSTDATE}</p>
      </div>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <BarChart
          width={'100%'}
          height={'100%'}
          margin={{
            top: 20,
            bottom: 45,
          }}
          data={chartData}
        >
          <XAxis
            dataKey={XAxisKey}
            style={{
              fontSize: '0.7rem',
              margin: '1rem 0 0',
              fontFamily: 'Inter',
            }}
            axisLine={false}
            tickLine={false}
            margin={{ top: -20 }}
            interval={'preserveStartEnd'}
            tickFormatter={(str) => {
              return moment(str, 'DD-MM-YY').format('MMM D');
            }}
          />
          <YAxis
            allowDecimals={false}
            dataKey={YAxisKey}
            style={{
              fontSize: '0.7rem',
              margin: '1rem 0 0',
              fontFamily: 'Inter',
            }}
            tickLine={false}
            axisLine={false}
            interval={'preserveStartEnd'}
          />
          <CartesianGrid
            strokeDasharray='3 0'
            stroke='#d1d5db'
            opacity={'0.2'}
            vertical={false}
          />
          <Tooltip />

          <Bar dataKey={DataKey} fill={color} axisLine={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
