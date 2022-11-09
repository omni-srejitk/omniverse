import React from 'react';
import moment from 'moment';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
export const BarCharts = ({ data = [], filter = 'All Time', color }) => {
  return (
    <ResponsiveContainer width={'100%'} height={'80%'}>
      <BarChart width={'100%'} height={'100% '} data={data}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={color} stopOpacity='0.9' />
            <stop offset='100%' stopColor={color} stopOpacity='0.7' />
          </linearGradient>
        </defs>
        <XAxis
          dataKey='Date'
          tickMargin={'3'}
          axisLine={false}
          tickLine={false}
          padding={{ left: 10 }}
          interval={'preserveStartEnd'}
          tickFormatter={(str) => {
            return moment(str, 'DD-MM-YY').format('Do MMM');
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
        <Bar dataKey={'Sales'} fill='url(#color)' axisLine={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
