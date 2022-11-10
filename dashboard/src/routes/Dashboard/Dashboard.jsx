import React, { useCallback, useMemo, useState } from 'react';
import { StatCard } from '../../components/Cards/Stats/StatCard';
import { Filter } from '../../components/Filter/Filter';
import { Select } from '../../components/Select/Select';
import { Carousal } from '../../components/Carousal/Carousal';
import { Card } from '../../components/Cards/Card/Card';
import { useFilter } from '../../context/FilterContext/FilterContext';
import { AreaCharts } from '../../components/Charts/Charts';
import { BarCharts } from '../../components/Charts/BarChart/BarChart';
import { Spinner } from '../../components/Loaders/Spinner/Spinner';
import {
  fetchInventoryCount,
  fetchLiveStoreCount,
} from '../../services/apiCalls';

export const Dashboard = () => {
  const [showState, setShowState] = useState({
    durationFilter: false,
    productFilter: false,
  });

  const { filterState, cumlativeSalesReport, isGMVDataLoading } = useFilter();
  const { isLoading: isInventoryLoading, data: resData } = fetchInventoryCount(
    filterState?.BRAND
  );

  const InventoryData = !isInventoryLoading && resData.data['message'];

  const { isLoading: isLiveStoreLoading, data: liveStoreData } =
    fetchLiveStoreCount(filterState.BRAND);

  const liveStoreCount = !isLiveStoreLoading && liveStoreData.data['message'];

  const FILTERS = {
    'By Product': filterState.ITEMS,
    'By Store': filterState.STORES,
  };

  const OVERVIEW_FILTERS = (
    <div className='items-centerS flex gap-4'>
      <Select showState={showState} setShowState={setShowState} />
      <Filter
        filter={FILTERS}
        showState={showState}
        setShowState={setShowState}
      />
    </div>
  );

  return (
    <main className='page__content'>
      <h1 className='page__title'>Dashboard</h1>

      <Card title='Overview' cardHeader={OVERVIEW_FILTERS}>
        <div className='card_body flex h-fit w-[95%] justify-start overflow-x-auto scrollbar-thin'>
          <StatCard
            icon='home'
            title='Units Sold'
            metric={cumlativeSalesReport.TOTAL_SALES}
            loading={isGMVDataLoading}
            background='bg-green-100'
            spinner={'border-green-200'}
            tooltip={'Total count of items sold.'}
          />
          <StatCard
            icon='insights'
            title='Total GMV'
            metric={cumlativeSalesReport.TOTAL_GMV}
            loading={isGMVDataLoading}
            tooltip={'Total sale of items sold.'}
            background='bg-blue-100'
            spinner={'border-blue-200'}
            currency
          />
          <StatCard
            icon='store'
            title='Total Stores'
            loading={isLiveStoreLoading}
            metric={liveStoreCount}
            background='bg-purple-100'
            spinner={'border-purple-200'}
            tooltip={'Total no of stores where item is active.'}
          />
          <StatCard
            icon='store'
            title='Inventory Deployed'
            metric={InventoryData}
            loading={isInventoryLoading}
            tooltip={'Total no of items in inventory deployed.'}
            background='bg-yellow-100'
            spinner={'border-yellow-200'}
          />
        </div>
      </Card>
      <div className='mb-36 grid h-fit w-full grid-cols-1 grid-rows-4 gap-4 md:mb-0 lg:grid-cols-2 lg:grid-rows-4'>
        <Card
          title='Cumalative Sales'
          classes={
            'row-span-2 order-1 overflow-hidden justify-center items-center'
          }
        >
          <div className='items-center relative flex h-[20rem] w-full flex-grow justify-center rounded-xl bg-gray-100/50'>
            {isGMVDataLoading ? (
              <Spinner
                color={'border-blue-200'}
                position={'top-1/2 left-1/2'}
                loading={isGMVDataLoading}
              />
            ) : (
              <AreaCharts
                data={cumlativeSalesReport.GRAPH_DATA}
                filter={filterState.filterBy}
                color={'#3b82f6'}
              />
            )}
          </div>
        </Card>
        <Carousal />
        <Card title='Sales ' classes={'row-span-2 flex-grow order-2'}>
          <div className='items-center relative flex h-[20rem] w-full justify-center rounded-xl bg-gray-100/50'>
            {isGMVDataLoading ? (
              <Spinner
                color={'border-green-200'}
                position={'top-1/2 left-1/2'}
                loading={isGMVDataLoading}
              />
            ) : (
              <BarCharts
                data={cumlativeSalesReport.GRAPH_DATA}
                filter={filterState.filterBy}
                color={'#86efac'}
              />
            )}
          </div>
        </Card>
      </div>
    </main>
  );
};
