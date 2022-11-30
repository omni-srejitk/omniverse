import React from 'react';
import { Card } from '../../components';
import { LineCharts } from '../../components/Charts/LineChart/LineChart';
import { PieChartComp } from '../../components/Charts/PieChart/PieChartComp';

export const Analytics = () => {
  const comparatorFn = (curr = 100, prev = 0, duration = 30) => {
    let perc = (((curr - prev) * 100) / duration).toFixed(2);

    return perc;
  };

  comparatorFn();

  return (
    <main className='page__content'>
      <h1 className='page__title'>Analytics</h1>
      <div className='h-fit min-h-screen w-full flex-col items-center justify-start'>
        <Card title={'Total Sales'}>
          <div className='h-full w-full'>
            <h1 className='text-4xl font-semibold'>&#8377; 55,000</h1>
            <div className='my-2 flex w-fit items-center justify-between gap-3'>
              <div className='my-2 flex w-fit items-center justify-center rounded-full bg-green-100 px-2 py-1'>
                <span className='material-icons text-base text-green-500'>
                  arrow_upwards
                </span>
                <p className='text-sm font-semibold text-green-500'> 37 %</p>
              </div>
              <p className='font-semibold text-gray-400/70'>
                {' '}
                vs Sept 8th 2022
              </p>
            </div>
            <div className='h-40 w-full'>
              <LineCharts />
            </div>
          </div>
        </Card>
        <Card title='Age split'>
          <div className='h-80 w-full'>
            <PieChartComp />
            
          </div>
        </Card>
      </div>
    </main>
  );
};
