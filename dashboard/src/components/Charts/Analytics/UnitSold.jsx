import moment from 'moment';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { calculateDayWiseItemsSold } from '../../../utils/helperFunctions';

export const UnitSold = (props) => {
  const { data, XAxisKey, YAxisKey, DataKey, color } = props;
  const SALE_UNIT =
    data.length === 0 ? 0 : data?.reduce((acc, curr) => (acc += curr[2]), 0);

  const chartData = calculateDayWiseItemsSold(data)?.slice(-7);

  return (
    <div className='h-full max-h-[18rem] min-h-[10rem] w-full'>
      <h1 className='text-3xl font-semibold'>{SALE_UNIT}</h1>

      <ResponsiveContainer width={'100%'} height={'100%'}>
        <BarChart
          width={'100%'}
          height={'100%'}
          margin={{
            top: 20,
            bottom: 45,
            left: -35,
          }}
          data={chartData}
        >
          <XAxis
            dataKey={XAxisKey}
            style={{
              fontSize: '0.7rem',
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
