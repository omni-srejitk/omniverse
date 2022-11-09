import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import { StatCard } from '../../components/Cards/Stats/StatCard';
import { Filter } from '../../components/Filter/Filter';
import { Select } from '../../components/Select/Select';
import { Carousal } from '../../components/Carousal/Carousal';
import { Card } from '../../components/Cards/Card/Card';
import axios from '../../axios';

import { useQuery } from '@tanstack/react-query';
import { useFilter } from '../../context/FilterContext/FilterContext';
import { AreaCharts } from '../../components/Charts/Charts';
import { BarCharts } from '../../components/Charts/BarChart/BarChart';

export const Dashboard = () => {
  const [showState, setShowState] = useState({
    durationFilter: false,
    productFilter: false,
  });
  const { filterState, datalist, cumlativeSalesReport, isGMVDataLoading } =
    useFilter();
  const { isLoading: isInventoryLoading, data: resData } = useQuery(
    ['inventory_count'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.total_inventory?brand=${encodeURI(filterState.BRAND)}`
      );
    }
  );

  const InventoryData = !isInventoryLoading && resData.data['message'];

  const { isLoading: isLiveStoreLoading, data: liveStoreData } = useQuery(
    ['livestore_count'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.total_live_store?brand=${encodeURI(filterState.BRAND)}`
      );
    }
  );

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
            color='bg-green-100'
          />
          <StatCard
            icon='insights'
            title='Total GMV'
            metric={cumlativeSalesReport.TOTAL_GMV}
            loading={isGMVDataLoading}
            color='bg-blue-100'
            currency
          />
          <StatCard
            icon='store'
            title='Total Stores'
            loading={isLiveStoreLoading}
            metric={liveStoreCount}
            color='bg-purple-100'
          />
          <StatCard
            icon='store'
            title='Inventory Deployed'
            metric={InventoryData}
            loading={isInventoryLoading}
            color='bg-yellow-100'
          />
        </div>
      </Card>
      <div className='grid h-fit w-full grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-2 lg:grid-rows-2'>
        <Card
          title='Cumalative Sales'
          classes={
            'row-span-1  overflow-hidden flex-grow h-full justify-center items-center'
          }
        >
          <div className='flex h-[20rem] w-full items-center justify-center rounded-xl bg-gray-100/50'>
            <AreaCharts
              data={datalist}
              filter={filterState.filterBy}
              color={'#3b82f6'}
            />
          </div>
        </Card>
        <Carousal />
        <Card title='Unit Sales ' classes={'row-span-1 flex-grow h-full'}>
          <div className='flex h-[20rem] w-full items-center justify-center rounded-xl bg-gray-100/50'>
            <BarCharts
              data={datalist}
              filter={filterState.filterBy}
              color={'#86efac'}
            />
          </div>
        </Card>
      </div>
    </main>
  );
};
