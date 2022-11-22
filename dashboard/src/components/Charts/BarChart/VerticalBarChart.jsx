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
export const VerticalBarChart = (data) => {
  // data = array of objects and 
  // BarChartData for Bar chart component, XAxisValue and YAxisValue

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <BarChart 
      width={'100%'} 
      height={'100%'} 
      data={data} 
      layout="vertical"
      >
        <XAxis
          dataKey={data.XAxisValue}
          style={{
            fontSize: '0.7rem',
            margin: '1rem 0 0',
            fontFamily: 'Inter',
          }}
          axisLine={false}
          tickLine={false}
          margin={{ top: -20 }}
          interval={'preserveStartEnd'}
          type="number"
        />
        <YAxis
          dataKey={data.YAxisValue}
          style={{
            fontSize: '0.7rem',
            fontFamily: 'Inter',
          }}
          tickLine={false}
          axisLine={false}
          interval={'preserveStartEnd'}
          type="category"
        />
        <CartesianGrid opacity={'0.2'} />
        <Tooltip 
          contentStyle={{ backgroundColor: "black", opacity: '0.9', borderRadius: '1rem',}}
          wrapperStyle={{outline: 'none'}}
          labelStyle={{ color: "white" }}
          itemStyle={{ color: "cyan" }}
        />
        <Bar dataKey={data.XAxisValue} fill={'#86efac'} axisLine={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
