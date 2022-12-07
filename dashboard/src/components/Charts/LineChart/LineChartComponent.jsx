import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { fetchDailyGMV } from '../../../services/apiCalls';
import { calculateDayWiseGMV } from '../../../utils/helperFunctions';

const BRAND = localStorage.getItem('Name');

export const LineChartComponent = () => {
  const { isLoading: isCalculateGMVLoading, data: dailyGMVData } =
    fetchDailyGMV(BRAND);
  const chartData = calculateDayWiseGMV(dailyGMVData);
  return (
    <LineChart width={600} height={300} data={chartData}>
      <Line type='monotone' dataKey='gmv' stroke='#8884d8' />
      <CartesianGrid stroke='#ccc' />
      <XAxis dataKey='date' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
