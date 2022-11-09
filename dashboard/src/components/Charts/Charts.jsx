import moment from 'moment';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
export const AreaCharts = ({ data = [], filter = 'All Time', color }) => {
  return (
    <ResponsiveContainer width={'100%'} height={'80%'}>
      <AreaChart width={'100%'} height={'100% '} data={data}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={color} stopOpacity='0.9' />
            <stop offset='75%' stopColor={color} stopOpacity='0.1' />
          </linearGradient>
        </defs>
        <XAxis
          dataKey='Date'
          tickMargin={0}
          axisLine={false}
          tickLine={false}
          tickCount={data.length}
          interval={'preserveStartEnd'}
          tickFormatter={(str) => {
            return moment(str, 'DD-MM-YY').format('Do');
          }}
        />
        <YAxis
          dataKey='Sales'
          tickLine={false}
          axisLine={false}
          interval={'preserveStartEnd'}
        />
        <CartesianGrid opacity={'0.2'} />
        <Tooltip />
        <Area
          type='monotone'
          dataKey={'Sales'}
          width={'100%'}
          height={'90%'}
          stroke={color}
          fill='url(#color)'
          axisLine={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
