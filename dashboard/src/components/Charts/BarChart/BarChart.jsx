import React from 'react';
import moment from 'moment';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
export const BarCharts = ({ data = [], filter = 'All Time', color }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <BarChart width={'100%'} height={'50%'} data={data}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={color} stopOpacity='0.9' />
            <stop offset='100%' stopColor={color} stopOpacity='0.7' />
          </linearGradient>
        </defs>

        <XAxis
          dataKey='Date'
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
            return moment(str, 'DD-MM-YY').format('Do');
          }}
        />
        <YAxis
          dataKey='TOTAL_GMV'
          style={{
            fontSize: '0.7rem',
            margin: '1rem 0 0',
            fontFamily: 'Inter',
          }}
          tickLine={false}
          axisLine={false}
          interval={'preserveStartEnd'}
          tickFormatter={(str) => {
            return formatter.format(str).slice(0, 3) + 'k';
          }}
        />
        <CartesianGrid opacity={'0.2'} />
        <Tooltip />
        <Legend
          formatter={(value) => (
            <span className='text-color-class'>{value}</span>
          )}
        />

        <Bar dataKey={'TOTAL_GMV'} fill={color} axisLine={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
