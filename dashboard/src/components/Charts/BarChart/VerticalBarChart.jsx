import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
export const VerticalBarChart = (props) => {
  const { data, dataKey, color = '#86efac', XAxisKey, YAxisKey } = props;

  const SLICE_LENGTH = data?.length > 5 ? 5 : data?.length;
  const SLICED_DATA = data?.slice(0, SLICE_LENGTH);
  return (
    <ResponsiveContainer width={'100%'} height={'90%'}>
      <BarChart height={'100%'} data={SLICED_DATA} layout='vertical'>
        <XAxis
          dataKey={XAxisKey}
          style={{
            fontSize: '0.7rem',
            margin: '1rem',
            fontFamily: 'Inter',
          }}
          axisLine={false}
          tickLine={false}
          margin={{ top: -20 }}
          interval={'preserveStartEnd'}
          type='number'
        />
        <YAxis
          dataKey={YAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={5}
          style={{
            fontSize: '0.7rem',
            margin: '1rem',
            fontFamily: 'Inter',
            textAlign: 'start',
          }}
          interval={'preserveStartEnd'}
          type='category'
        />
        <CartesianGrid opacity={'0.2'} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'black',
            opacity: '0.9',
            borderRadius: '1rem',
          }}
          wrapperStyle={{ outline: 'none' }}
          labelStyle={{ color: 'white' }}
          itemStyle={{ color: 'cyan' }}
        />
        <Bar dataKey={dataKey} fill={color} axisLine={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
