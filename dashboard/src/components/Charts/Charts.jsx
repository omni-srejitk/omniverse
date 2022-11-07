import moment from 'moment';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
export const Charts = ({
  data = [],
  filter = 'All Time',
  color = '#8884d8',
}) => {
  console.log('Graph data', data);
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart width={1000} height={1000} data={data}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={color} stopOpacity='0.9' />
            <stop offset='75%' stopColor={color} stopOpacity='0.1' />
          </linearGradient>
        </defs>
        <XAxis
          dataKey='Date'
          tickMargin={1}
          tickCount={data.length}
          tickFormatter={(str) => {
            return moment(str, 'DD-MM-YY').format('D');
          }}
        />
        <YAxis dataKey={'Cumalative'} />
        <Tooltip />
        <Area
          type='monotone'
          dataKey={'Cumalative'}
          stroke={color}
          fill='url(#color)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
