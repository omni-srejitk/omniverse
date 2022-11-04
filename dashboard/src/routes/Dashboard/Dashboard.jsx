import React, { useState } from 'react';
import { useEffect } from 'react';
import { StatCard } from '../../components/Cards/Stats/StatCard';
import { Filter } from '../../components/Filter/Filter';
import { Select } from '../../components/Select/Select';
import { Carousal } from '../../components/Carousal/Carousal';
import { Card } from '../../components/Cards/Card/Card';
import { Charts } from '../../components/Charts/Charts';
import axios from '../../axios';

import { computeSalesNumber, prepareData } from '../../utils/helperFunctions';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
const BRAND = 'BeyondWater';

export const Dashboard = () => {
  const [duration, setDuration] = useState('This Week');

  const { isLoading: isInventoryLoading, data: resData } = useQuery(
    ['inventory_count'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.total_inventory?brand=${encodeURI(BRAND)}`
      );
    }
  );

  const InventoryData = !isInventoryLoading && resData.data['message'];

  const { isLoading: isLiveStoreLoading, data: liveStoreData } = useQuery(
    ['livestore_count'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.total_live_store?brand=${encodeURI(BRAND)}`
      );
    }
  );

  const liveStoreCount = !isLiveStoreLoading && liveStoreData.data['message'];

  const { isLoading: isGMVDataLoading, data: gmvSaleRes } = useQuery(
    ['gmv_sale_data'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.gmv_sales_date_wise?brand=${encodeURI(BRAND)}`
      );
    }
  );

  const GMV_SALES_DATA = !isGMVDataLoading && gmvSaleRes.data['message'];

  var { dates, stores, items, prices, sale_count } =
    prepareData(GMV_SALES_DATA);
  const { cumlativeSalesReport } = computeSalesNumber(
    dates,
    stores,
    items,
    prices,
    GMV_SALES_DATA
  );

  // let sales_date_wise = [];
  // for (let key in cumlativeSalesReport) {
  //   sales_date_wise.push(cumlativeSalesReport[key]['gmv']);
  // }

  const OVERVIEW_FILTERS = (
    <div className='flex items-center gap-4'>
      <Select duration={duration} setDuration={setDuration} />
      <Filter />
    </div>
  );

  let GRAPHDATA = [];

  for (let key of Object.keys(sale_count)) {
    GRAPHDATA.push({ Date: key, ...sale_count[key] });
  }
  GRAPHDATA = GRAPHDATA?.sort(
    (a, b) =>
      moment(a.Date).format('DD-MM-YY') - moment(b.Date).format('DD-MM-YY')
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
            color='bg-green-100'
          />
          <StatCard
            icon='insights'
            title='Total GMV'
            metric={cumlativeSalesReport.TOTAL_GMV}
            color='bg-blue-100'
            currency
          />
          <StatCard
            icon='store'
            title='Total Stores'
            metric={liveStoreCount}
            color='bg-purple-100'
          />
          <StatCard
            icon='store'
            title='Inventory Deployed'
            metric={InventoryData}
            color='bg-yellow-100'
          />
        </div>
      </Card>
      <div className='grid h-fit w-full grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-2 lg:grid-rows-1'>
        <Carousal />
        {/* <Card title='Cumalative Sales'>
          <div className='h-[20rem] w-full border-2 border-black'>
            <Charts data={GRAPHDATA} />
          </div>
        </Card> */}
      </div>
    </main>
  );
};
