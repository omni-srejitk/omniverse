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
  Legend,
} from 'recharts';

export const AreaCharts = ({
  data = [],
  XAxisKey,
  YAxisKey,
  DataKey,
  color,
}) => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <AreaChart width={'100%'} height={'50%'} data={data}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={color} stopOpacity='0.9' />
            <stop offset='75%' stopColor={color} stopOpacity='0.1' />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={XAxisKey}
          style={{
            fontSize: '0.7rem',
            margin: '1rem 0 0',
            fontFamily: 'Inter',
          }}
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
        <CartesianGrid opacity={'0.2'} />
        <Tooltip />
        <Legend
          formatter={(value) => (
            <span className='text-color-class'>{value}</span>
          )}
        />
        <Area
          type='monotone'
          dataKey={DataKey}
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
