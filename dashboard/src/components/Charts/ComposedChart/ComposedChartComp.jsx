import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const ComposedChartComp = (data) => {
 
  // data should have three arrays : for both charts, and XAxis 
  // let data.barChartValue array;  barChartValue for barChart 
  // let data.lineChartValue array; lineChart value for lineChart   
  // let data.XAxisValue array;   
  
  return (
    <ResponsiveContainer width={'100%'} height={'100%'} aspect={3}>
      <ComposedChart
        width="100%" 
        height="50%" 
        data={data}
        >
        <XAxis 
        dataKey={data.XAxisValue} 
        style={{
            fontSize: '0.7rem',
            margin: '1rem 0 0',
            fontFamily: 'Inter',
          }}
        />
        <YAxis 
        style={{
            fontSize: '0.7rem',
            margin: '1rem 0 0',
            fontFamily: 'Inter',
          }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: "black", opacity: '0.9', borderRadius: '1rem',}}
          wrapperStyle={{outline: 'none'}}
          labelStyle={{ color: "white" }}
          itemStyle={{ color: "cyan" }}
        />        
        <Bar dataKey={data.barChartValue} stackOffset='sign' barSize={8} fill="#413ea0" />
        <Line dataKey={data.lineChartValue} stroke="black" dot={false}/>
        <CartesianGrid stroke="#f5f5f5" opacity='0.2'/>
      </ComposedChart>
    </ResponsiveContainer>
  )
}
