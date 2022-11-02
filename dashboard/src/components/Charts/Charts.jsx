import React from 'react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export const Charts = () => {
  const [saleData, setSaleData] = useState({
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  return <Line data={saleData} />;
};
