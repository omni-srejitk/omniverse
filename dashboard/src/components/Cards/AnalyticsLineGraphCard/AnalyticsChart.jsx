import React from 'react';
import { LineChartComponent } from '../../Charts/LineChart/LineChartComponent';
import { ComingSoon } from '../../Placeholders/ComingSoon';

export const AnalyticsChart = ({ data }) => {
  const TOTAL_SALES =
    data.length === 0 ? 0 : data?.reduce((acc, curr) => (acc += curr[7]), 0);

  return (
    <div className='h-full max-h-[18rem] w-full'>
      <h1 className='mb-6 text-3xl font-semibold'>
        &#8377;
        {TOTAL_SALES.toLocaleString('en-IN', {
          maximumFractionDigits: 2,
        })}
      </h1>
      {data?.length === 0 ? (
        <ComingSoon
          logo={'auto_graph'}
          title='No Data Found.'
          subtitle='Please try again with different filters.'
        />
      ) : (
        <LineChartComponent data={data} />
      )}
    </div>
  );
};
