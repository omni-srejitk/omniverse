import React, { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { StatCard } from '../../components/Cards/Stats/StatCard';
import { Filter } from '../../components/Filter/Filter';
import { Select } from '../../components/Select/Select';
import { Carousal } from '../../components/Carousal/Carousal';
import { Card } from '../../components/Cards/Card/Card';
import axios from '../../axios';

import { computeSalesNumber, prepareData } from '../../utils/helperFunctions';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useFilter } from '../../context/StoreContext/FilterContext';
import { Charts } from '../../components/Charts/Charts';
const BRAND = 'BeyondWater';

export const Dashboard = () => {
  const [duration, setDuration] = useState([]);
  const [prodDate, setProdData] = useState({
    items: [],
    stores: [],
    sale_count: [],
  });
  const { filterState } = useFilter();
  const { isLoading: isInventoryLoading, data: resData } = useQuery(
    ['inventory_count'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.total_inventory?brand=${encodeURI(BRAND)}`
      );
    }
  );
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

  const checkDuration = (setDuration, dates, filterByDate) => {
    switch (filterByDate) {
      case 'This Week':
        const firstDayOfWeek = moment().startOf('week');
        const currDayOfWeek = moment().endOf('week');

        setDuration(
          dates.filter((date) =>
            moment(date).isBetween(
              moment(firstDayOfWeek, 'DD-MM-YY'),
              moment(currDayOfWeek, 'DD-MM-YY')
            )
          )
        );
        break;

      case 'This Month':
        const firstDayOfMonth = moment().startOf('month');
        const currDayOfMonth = moment().endOf('month');

        setDuration(
          dates.filter((date) =>
            moment(date, 'DD-MM-YY').isBetween(
              moment(firstDayOfMonth, 'DD-MM-YY'),
              moment(currDayOfMonth, 'DD-MM-YY')
            )
          )
        );
        break;

      default:
        setDuration(dates);
    }
  };

  useEffect(() => {
    checkDuration(setDuration, dates, filterState.filterByDate);
  }, [dates, setDuration, filterState.filterByDate]);

  const checkFilters = (items, stores, setProdData, filterBy) => {
    if (filterBy.length === 0) {
      setProdData({
        ...prodDate,
        items,
        stores,
      });
    } else {
      let filteredItems = items.filter((item) => filterBy.includes(item));
      let filteredStores = stores.filter((store) => filterBy.includes(store));
      setProdData({
        ...prodDate,
        items: filteredItems,
        stores: filteredStores,
      });
    }
  };
  var { items, stores, dates, prices, sale_count } = useMemo(
    () => prepareData(GMV_SALES_DATA),
    [GMV_SALES_DATA]
  );
  useEffect(() => {
    checkFilters(items, stores, setProdData, filterState.filterBy);
  }, [items, stores, setProdData, filterState.filterByDate]);

  useEffect(() => {
    checkDuration(setDuration, dates, filterState.filterByDate);
  }, [dates, filterState.filterByDate]);

  const { cumlativeSalesReport } = computeSalesNumber(
    duration,
    prodDate.stores,
    prodDate.items,
    prices,
    GMV_SALES_DATA,
    sale_count
  );
  const FILTERS = {
    'By Product': prodDate.items,
    'By Store': prodDate.stores,
  };

  const OVERVIEW_FILTERS = (
    <div className='flex items-center gap-4'>
      <Select duration={duration} setDuration={setDuration} />
      <Filter filter={FILTERS} setFilter={setProdData} />
    </div>
  );

  let GRAPHDATA = [];

  for (let key of Object.keys(cumlativeSalesReport.SALE_COUNT)) {
    GRAPHDATA.push({ Date: key, ...cumlativeSalesReport.SALE_COUNT[key] });
  }
  GRAPHDATA = GRAPHDATA?.sort(
    (a, b) =>
      moment(a.Date, 'DD-MM-YY').format('DD-MM-YY') -
      moment(b.Date, 'DD-MM-YY').format('DD-MM-YY')
  );

  console.log(GRAPHDATA);

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
        <Card title='Cumalative Sales'>
          <div className='h-[20rem] w-full border-2 border-black'>
            <Charts data={GRAPHDATA} />
          </div>
        </Card>
      </div>
    </main>
  );
};
