import React, { useEffect, useMemo, useState } from 'react';
import { StatCard } from '../../components/Cards/StatsCard/StatCard';
import { Filter } from '../../components/Filter/Filter';
import { Select } from '../../components/Select/Select';
import { Carousal } from '../../components/Carousal/Carousal';
import { Card } from '../../components/Cards/Card/Card';
import { useFilter } from '../../context/FilterContext/FilterContext';
import { AreaCharts } from '../../components/Charts/Charts';
import { BarCharts } from '../../components/Charts/BarChart/BarChart';
import { Spinner } from '../../components/Loaders/Spinner/Spinner';
import {
  fetchAllLiveStores,
  fetchInventoryCount,
  fetchLiveStoreCount,
  fetchSalesData,
} from '../../services/apiCalls';
import { computeSalesNumber, prepareData } from '../../utils/helperFunctions';
export const Dashboard = () => {
  const { filterState, filterDispatch } = useFilter();
  const [showState, setShowState] = useState({
    durationFilter: false,
    productFilter: false,
  });

  const BRAND = JSON.parse(localStorage.getItem('Name'));

  const { isLoading: isGMVDataLoading, data: gmvSaleRes } =
    fetchSalesData(BRAND);

  const { isLoading: isInventoryLoading, data: resData } =
    fetchInventoryCount(BRAND);
  const GMV_SALES_DATA = !isGMVDataLoading && gmvSaleRes?.data['message'];

  var { items, stores, dates, prices, sale_count } = useMemo(
    () => prepareData(GMV_SALES_DATA, filterDispatch),
    [GMV_SALES_DATA]
  );
  const { data: allStoresData, isLoading: isAllStoresLoading } =
    fetchAllLiveStores(BRAND);

  const STORES_LIST =
    !isAllStoresLoading && Object.values(allStoresData?.data['message']);
  useEffect(() => {
    if (localStorage.getItem('Token')) {
      filterDispatch({ type: 'LOGIN' });
    }
  }, []);

  const { cumlativeSalesReport } = useMemo(
    () =>
      computeSalesNumber(
        filterState.FILTERED_DATES,
        filterState.FILTERED_STORES,
        filterState.FILTERED_ITEMS,
        prices,
        GMV_SALES_DATA,
        sale_count
      ),
    [
      filterState.FILTERED_DATES,
      filterState.FILTERED_STORES,
      filterState.FILTERED_ITEMS,
      prices,
      GMV_SALES_DATA,
      sale_count,
    ]
  );

  useEffect(() => {
    filterDispatch({ type: 'SET_DATES', payload: dates });
    filterDispatch({ type: 'SET_ITEMS', payload: items });
    filterDispatch({ type: 'SET_STORES', payload: STORES_LIST[0] });
    filterDispatch({ type: 'SET_FILTERED_DATES', payload: dates });
    filterDispatch({ type: 'SET_FILTERED_ITEMS', payload: items });
    filterDispatch({ type: 'SET_FILTERED_STORES', payload: STORES_LIST[0] });
  }, [dates, STORES_LIST[0], items]);
  const InventoryData = !isInventoryLoading && resData.data['message'];

  const { isLoading: isLiveStoreLoading, data: liveStoreData } =
    fetchLiveStoreCount(BRAND);

  const liveStoreCount = !isLiveStoreLoading && liveStoreData.data['message'];

  const FILTERS = {
    'By Product': items,
    'By Store': STORES_LIST[0],
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
    filterState.ISLOGGED && (
      <main className='page__content'>
        <section className='h-fit w-full'>
          <h1 className='page__title'>Welcome {BRAND}</h1>
          <Card title='Overview' cardHeader={OVERVIEW_FILTERS}>
            <div className='card_body flex h-fit w-full justify-start overflow-x-auto scrollbar-thin'>
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
                title='In Inventory'
                metric={InventoryData}
                loading={isInventoryLoading}
                tooltip={'Total no of items in inventory deployed.'}
                background='bg-yellow-100'
                spinner={'border-yellow-200'}
              />
            </div>
          </Card>
        </section>
        <section className='grid-rows-[repeat(2,20rem] my-4 mb-36 grid h-full w-full grid-cols-1 gap-4 md:mb-0 lg:grid-cols-3 lg:pb-6'>
          <Card
            title='Cumalative Sales'
            classes={
              'row-span-1 lg:col-span-2 order-1 max-h-[20rem] flex-grow overflow-hidden justify-center items-center'
            }
          >
            <div className='relative flex h-full w-full flex-grow items-center justify-center rounded-xl bg-gray-100/50'>
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
          <Card
            title='Showcase'
            classes={
              'row-span-2 flex-grow max-h-[42rem] col-span-1 order-3 lg:order-2 '
            }
          >
            <Carousal />
          </Card>

          <Card
            title='Sales '
            classes={
              'row-span-1 lg:col-span-2 max-h-[20rem] flex-grow overflow-hidden justify-center items-center order-2'
            }
          >
            <div className='relative flex h-full w-full flex-grow items-center justify-center rounded-xl  bg-gray-100/50'>
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
        </section>
      </main>
    )
  );
};
