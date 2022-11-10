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

  const customAxisLabels = ({ x, y, stroke, value }) => {
    return (
      <text x={x} y={y} dy={-4} fill={'#000'} fontSize={10} textAnchor='middle'>
        {value}
      </text>
    );
  };
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <BarChart width={'100%'} height={'100% '} data={data}>
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
          // tickCount={data?.length}
          // label={customAxisLabels}
          margin={{ top: -20 }}
          interval={'preserveStartEnd'}
          tickFormatter={(str) => {
            return moment(str, 'DD-MM-YY').format('DD-MM-YY');
          }}
        />
        <YAxis
          dataKey='TOTAL_GMV'
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
          formatter={(value, entry, index) => (
            <span className='text-color-class'>{value}</span>
          )}
        />

        <Bar dataKey={'TOTAL_GMV'} fill={color} axisLine={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
