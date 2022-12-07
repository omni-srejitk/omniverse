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
  Brush,
} from 'recharts';
export const BarCharts = ({
  data = [],
  XAxisKey,
  YAxisKey,
  DataKey,
  color,
}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <BarChart
        width={'100%'}
        height={'50%'}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 45,
        }}
        data={data}
      >
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={color} stopOpacity='0.9' />
            <stop offset='100%' stopColor={color} stopOpacity='0.7' />
          </linearGradient>
        </defs>

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
        {/* // TODO  Add this only on developmenmt server */}
        <Brush dataKey={DataKey} height={30} stroke={color} />
        <Bar dataKey={DataKey} fill={color} axisLine={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
