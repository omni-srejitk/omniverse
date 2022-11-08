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
import { Charts } from '../../components/Charts/Charts';

export const Dashboard = () => {
  const [duration, setDuration] = useState([]);

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
      <Select duration={duration} setDuration={setDuration} />
      <Filter filter={FILTERS} />
    </div>
  );

  return (
    <main className='page__content'>
      <h1 className='page__title'>Dashboard</h1>

      <Card title='Overview' cardHeader={OVERVIEW_FILTERS}>
        <div className='card_body flex h-fit w-[95%] justify-start overflow-x-auto'>
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
      <div className='grid h-fit w-full grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-2 lg:grid-rows-1'>
        <Carousal />
        <Card title='Cumalative Sales'>
          <div className='h-[20rem] w-full border-2 border-black'>
            <Charts data={datalist} />
          </div>
        </Card>
      </div>
    </main>
  );
};
