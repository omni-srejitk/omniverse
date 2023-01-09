import React from 'react';
import { fetchItemsSales } from '../../utils/helperFunctions';
import { VerticalBarChart } from '../Charts/BarChart/VerticalBarChart';
import { ComingSoon } from '../Placeholders/ComingSoon';
import { useSelector } from 'react-redux';
import { selectFilteredSalesData } from '../../redux/actions/dataActions';
import { Card } from '../Cards';

const VerticalBarChartComp = () => {
  let FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  const TOP_SKU = fetchItemsSales(FILTEREDSALEDATA);
  return (
    <Card
      title='Bestsellers'
      info='These are your top selling items for the selected period.'
      classes={'w-full h-[25rem] col-span-1 row-span-1'}
    >
      {TOP_SKU?.length === 0 ? (
        <ComingSoon
          logo={'assessment'}
          title='No Data Found.'
          subtitle='Please try again with different filters.'
        />
      ) : (
        <VerticalBarChart
          data={TOP_SKU}
          XAxisKey={'qty'}
          YAxisKey={'item'}
          dataKey={'qty'}
          // color={'#6ee7b7'}
        />
      )}
    </Card>
  );
};

export default VerticalBarChartComp;
