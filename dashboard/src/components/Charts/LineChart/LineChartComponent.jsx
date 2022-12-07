import moment from 'moment';
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { calculateDayWiseGMV } from '../../../utils/helperFunctions';

export const LineChartComponent = ({ data }) => {
  const chartData = calculateDayWiseGMV(data);

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart width={'95%'} height={'100%'} data={chartData}>
        <Line
          type='monotone'
          strokeWidth={3}
          dataKey='gmv'
          stroke='#60a5fa'
          dot={false}
        />
        <CartesianGrid
          strokeDasharray='3 0'
          stroke='#d1d5db'
          opacity={'0.7'}
          vertical={false}
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey='date'
          interval={'preserveEnd'}
          tickFormatter={(str) => {
            return moment(str, 'DD-MM-YY').format('MMM D');
          }}
          minTickGap={35}
        />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
