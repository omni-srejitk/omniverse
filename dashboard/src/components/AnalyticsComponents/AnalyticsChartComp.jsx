import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredSalesData } from '../../redux/actions/dataActions';
import { AnalyticsChart } from '../Cards';
import { Card } from '../Cards';
import { selectFilterEndDate } from '../../redux/actions';
import { selectFilterStartDate } from '../../redux/actions';

const AnalyticsChartComp = () => {
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  const STARTDATE = useSelector(selectFilterStartDate);
  const ENDDATE = useSelector(selectFilterEndDate);
  const SELECTED_RANGE = (
    <div className='flex w-fit  items-center gap-1 rounded-full p-2'>
      <p>
        From{' '}
        <span className='mx-1 rounded-full bg-gray-100 p-2 text-sm font-medium text-gray-700'>
          {STARTDATE}
        </span>{' '}
        to{' '}
        <span className='mx-1 rounded-full bg-gray-100 p-2 text-sm font-medium text-gray-700'>
          {ENDDATE}
        </span>
      </p>
    </div>
  );
  return (
    <Card
      title='Total Sales'
      info='Gross Merchandise Value of SKUs sold in the selected period.'
      classes={'row-span-1 w-full h-full col-span-1 lg:col-span-2'}
      cardHeader={SELECTED_RANGE}
    >
      <AnalyticsChart data={FILTEREDSALEDATA} />
    </Card>
  );
};

export default AnalyticsChartComp;
