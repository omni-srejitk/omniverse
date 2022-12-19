import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AreaCharts,
  BarCharts,
  Card,
  Carousal,
  Select,
  StatCard,
  Spinner,
} from '../../components';
import { DateSelector } from '../../components/DateSelector/DateSelector';
import { ComingSoon } from '../../components/Placeholders/ComingSoon';
import { useCalculateSaleData } from '../../hooks/useCalculateSaleData';
import { usePrepareData } from '../../hooks/usePrepareData';
import {
  selectCumlativeAmtData,
  selectCumlativeCountData,
  selectPopupState,
  selectSaleAmount,
  selectUnitsSold,
} from '../../redux/actions';

import {
  setAuthToken,
  setBrandName,
  setloginStatus,
} from '../../redux/features/authSlice';
import {
  fetchDailyGMV,
  fetchInventoryCount,
  fetchLiveStoreCount,
  fetchStoreImages,
} from '../../services/apiCalls';
import { getFilteredData } from '../../utils/helperFunctions';

export const Dashboard = () => {
  const BRAND = localStorage.getItem('Name');
  const { data: dailyGMVData } = fetchDailyGMV(BRAND);
  const { isLoading: isInventoryLoading, data: inventoryData } =
    fetchInventoryCount(BRAND);
  const { isLoading: isInventoryCountLoading, data: inventoryCountData } =
    fetchLiveStoreCount(BRAND);
  const { isLoading: ImageLoading, data: imageData } = fetchStoreImages(BRAND);
  const dispatch = useDispatch();
  const UNITS_SOLD = useSelector(selectUnitsSold);
  const SALE_AMT = useSelector(selectSaleAmount);
  const LIVESTORES_COUNT = inventoryCountData;
  const BARCHART = useSelector(selectCumlativeCountData);
  const AREACHART = useSelector(selectCumlativeAmtData);
  const FILTERSTATE = useSelector((state) => state.filter);
  const TOKEN = JSON.parse(localStorage.getItem('Token'));
  const NAME = localStorage.getItem('Name');
  const SHOWPOPUP = useSelector(selectPopupState);
  const { isGMVLoading } = usePrepareData();
  const { isCalculating } = useCalculateSaleData(isGMVLoading);

  const OVERVIEW_FILTERS = (
    <div className='flex items-center gap-4'>
      <Select />
    </div>
  );

  useEffect(() => {
    if (TOKEN) {
      dispatch(setloginStatus(true));
      dispatch(setAuthToken(TOKEN));
      dispatch(setBrandName(NAME));
    }
  }, [TOKEN, NAME]);

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
              loading={isCalculating}
              background='bg-green-100'
              spinner={'border-green-200'}
              tooltip={'Total quantity of SKUs sold in the selected period.'}
            />
            <StatCard
              icon='insights'
              title='Total GMV'
              metric={SALE_AMT}
              loading={isCalculating}
              tooltip={
                'Gross Merchandise Value of SKUs sold in the selected period.'
              }
              background='bg-blue-100'
              spinner={'border-blue-200'}
              currency
            />
            <StatCard
              icon='store'
              title='Total Stores'
              loading={isInventoryCountLoading}
              metric={LIVESTORES_COUNT}
              background='bg-purple-100'
              spinner={'border-purple-200'}
              tooltip={"Total number of stores you're currently active in."}
            />
            <StatCard
              icon='warehouse'
              title='Total Deployed'
              metric={inventoryData}
              loading={isInventoryLoading}
              tooltip={
                'The number of SKUs which is currently present inside active stores.'
              }
              background='bg-yellow-100'
              spinner={'border-yellow-200'}
            />
          </div>
        </Card>
      </section>
      <section className='grid-rows-[repeat(2,20rem] my-4 mb-36 grid h-full w-full grid-cols-1 gap-4 md:mb-0 lg:grid-cols-3 lg:pb-6'>
        <Card
          title='Cumalative Sales'
          info='A cumalative graph of GMV in the selected period.'
          classes={
            'row-span-1 lg:col-span-2 order-1 max-h-[20rem] flex-grow overflow-hidden justify-center items-center'
          }
        >
          <div className='relative flex h-full  max-h-[13rem] w-full flex-grow items-center justify-center rounded-xl bg-gray-50/50'>
            {isCalculating ? (
              <Spinner
                color={'border-blue-200'}
                position={'top-1/2 left-1/2'}
                loading={isCalculating}
              />
            ) : AREACHART?.length === 0 ? (
              <ComingSoon
                logo={'insert_chart'}
                title='No Data Found.'
                subtitle='Please try again with different filters.'
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
          title='Showcase'
          classes={
            'row-span-2 flex-grow max-h-[42rem] col-span-1 order-3 lg:order-2 '
          }
        >
          <Carousal imagelist={imageData} loading={ImageLoading} />
        </Card>
        <Card
          title='Quantity Sold '
          info='A cumalative graph of quantity of items sold in the selected period.'
          classes={
            'row-span-1 lg:col-span-2 max-h-[20rem] flex-grow overflow-hidden justify-center items-center order-2'
          }
        >
          <div className='relative flex h-full  max-h-[14rem] w-full flex-grow items-center justify-center rounded-xl  bg-gray-50/50'>
            {isCalculating ? (
              <Spinner
                color={'border-green-200'}
                position={'top-1/2 left-1/2'}
                loading={isCalculating}
              />
            ) : BARCHART?.length === 0 ? (
              <ComingSoon
                logo={'insert_chart'}
                title='No Data Found.'
                subtitle='Please try again with different filters.'
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
      {SHOWPOPUP.datePicker && <DateSelector />}
    </main>
  );
};
