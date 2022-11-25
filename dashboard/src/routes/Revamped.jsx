import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AreaCharts,
  BarCharts,
  Card,
  Filter,
  Select,
  Spinner,
  StatCard,
} from '../components';
import {
  selectAllStores,
  selectCumlativeAmtData,
  selectCumlativeCountData,
  selectSaleAmount,
  selectUnitsSold,
} from '../redux/actions';
import {
  selectAllItems,
  selectFilteredSalesData,
} from '../redux/actions/dataActions';
import { setAllSaleAmount, setAllUnitsSold } from '../redux/features/dataSlice';
import { fetchDailyGMV, fetchInventoryCount } from '../services/apiCalls';
import {
  calculateDailyGMV,
  fetchCumalativeSaleAmount,
  fetchCumalativeSaleCount,
  getFilteredData,
  prepareSaleData,
} from '../utils/helperFunctions';

export const Revamped = () => {
  const BRAND = localStorage.getItem('Name');
  const [showState, setShowState] = useState({
    durationFilter: false,
    productFilter: false,
  });
  const { isLoading: isGMVLoading, data: dailyGMVData } = fetchDailyGMV(BRAND);
  const { isLoading: isInventoryLoading, data: inventoryData } =
    fetchInventoryCount(BRAND);
  const dispatch = useDispatch();
  const UNITS_SOLD = useSelector(selectUnitsSold);
  const SALE_AMT = useSelector(selectSaleAmount);
  const LIVESTORES = useSelector(selectAllStores)?.length;
  const BARCHART = useSelector(selectCumlativeCountData);
  const AREACHART = useSelector(selectCumlativeAmtData);
  const FILTERSTATE = useSelector((state) => state.filter);
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  const ALLITEMS = useSelector(selectAllItems);

  useEffect(() => {
    if (FILTEREDSALEDATA?.length > 0) {
      calculateDailyGMV(FILTEREDSALEDATA, dispatch);
      fetchCumalativeSaleCount(FILTEREDSALEDATA, dispatch);
      fetchCumalativeSaleAmount(FILTEREDSALEDATA, dispatch);
    }
  }, [FILTEREDSALEDATA]);

  useEffect(() => {
    if (!isGMVLoading) {
      prepareSaleData(dailyGMVData, dispatch);
    }
  }, [isGMVLoading, dailyGMVData]);

  const DASHBOARD_FILTERS = {
    'By Product': ALLITEMS,
    // 'By Store': ALLSTORES.map((store) => store.customer_name),
  };

  const OVERVIEW_FILTERS = (
    <div className='items-centerS flex gap-4'>
      <Select showState={showState} setShowState={setShowState} />
      <Filter
        filter={DASHBOARD_FILTERS}
        showState={showState}
        setShowState={setShowState}
      />
    </div>
  );

  useEffect(() => {
    if (isGMVLoading) return;
    getFilteredData(FILTERSTATE, dailyGMVData, dispatch);
  }, [isGMVLoading, FILTERSTATE, dailyGMVData]);

  return (
    <main className='page__content'>
      <section className='h-fit w-full'>
        <h1 className='page__title'>Welcome {BRAND}! 👋</h1>
        <Card title='Overview' cardHeader={OVERVIEW_FILTERS}>
          <div className='card_body flex h-fit w-full justify-start overflow-x-auto scrollbar-thin'>
            <StatCard
              icon='home'
              title='Units Sold'
              metric={UNITS_SOLD}
              loading={isGMVLoading}
              background='bg-green-100'
              spinner={'border-green-200'}
              tooltip={'Total count of items sold.'}
            />
            <StatCard
              icon='insights'
              title='Total GMV'
              metric={SALE_AMT}
              loading={isGMVLoading}
              tooltip={'Total sale of items sold.'}
              background='bg-blue-100'
              spinner={'border-blue-200'}
              currency
            />
            <StatCard
              icon='store'
              title='Total Stores'
              loading={isGMVLoading}
              metric={LIVESTORES}
              background='bg-purple-100'
              spinner={'border-purple-200'}
              tooltip={'Total no of stores where item is active.'}
            />
            <StatCard
              icon='warehouse'
              title='Total Deployed'
              metric={inventoryData}
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
            {isGMVLoading ? (
              <Spinner
                color={'border-blue-200'}
                position={'top-1/2 left-1/2'}
                loading={isGMVLoading}
              />
            ) : (
              <AreaCharts
                data={AREACHART}
                XAxisKey={'Date'}
                YAxisKey={'Unit_Amt'}
                DataKey={'Unit_Amt'}
                color={'#3b82f6'}
              />
            )}
          </div>
        </Card>
        <Card
          title='Sales '
          classes={
            'row-span-1 lg:col-span-2 max-h-[20rem] flex-grow overflow-hidden justify-center items-center order-2'
          }
        >
          <div className='relative flex h-full w-full flex-grow items-center justify-center rounded-xl  bg-gray-100/50'>
            {isGMVLoading ? (
              <Spinner
                color={'border-green-200'}
                position={'top-1/2 left-1/2'}
                loading={isGMVLoading}
              />
            ) : (
              <BarCharts
                data={BARCHART}
                XAxisKey={'Date'}
                YAxisKey={'Unit_Sold'}
                DataKey={'Unit_Sold'}
                color={'#86efac'}
              />
            )}
          </div>
        </Card>
      </section>
    </main>
  );
};
