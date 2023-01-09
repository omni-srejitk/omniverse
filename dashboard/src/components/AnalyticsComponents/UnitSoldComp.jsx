import React from 'react';
import { UnitSold } from '../Charts/Analytics/UnitSold';
import { selectFilteredSalesData } from '../../redux/actions/dataActions';
import { useSelector } from 'react-redux';
import { ComingSoon } from '../Placeholders/ComingSoon';
import { Card } from '../Cards';

const UnitSoldComp = () => {
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  return (
    <Card
      title='Units Sold'
      info='Total quantity of SKUs sold in the selected period.'
      classes={'row-span-1 col-span-1 max-h-[25rem]'}
    >
      {FILTEREDSALEDATA?.length === 0 ? (
        <ComingSoon
          logo={'insert_chart'}
          title={'No matching data.'}
          subtitle={'You will soon see unit wise sale data here.'}
        />
      ) : (
        <UnitSold
          data={FILTEREDSALEDATA}
          XAxisKey={'date'}
          YAxisKey={'qty'}
          DataKey={'qty'}
          color={'#a7f3d0'}
        />
      )}
    </Card>
  );
};

export default UnitSoldComp;
