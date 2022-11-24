import React, { useEffect, useMemo, useState } from 'react';
import {
  fetchDailyGMV,
  fetchInventoryCount,
  fetchStoreImages,
} from '../../services/apiCalls';
import { computeSalesNumber } from '../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllGMVSalesData,
  selectAllItems,
  selectAllPrices,
  selectAllSalesData,
  selectAllStores,
  selectAllFilteredDates,
  selectAllFilteredItems,
  selectAllFilteredStores,
  selectLoadingState,
  selectLoginStatus,
} from '../../redux/actions';

import {
  AreaCharts,
  BarCharts,
  Card,
  Carousal,
  Filter,
  Select,
  Spinner,
  StatCard,
} from '../../components';
import {
  setAuthToken,
  setBrandName,
  setloginStatus,
} from '../../redux/features/authSlice';

export const Dashboard = () => {
  const [showState, setShowState] = useState({
    durationFilter: false,
    productFilter: false,
  });

  const BRAND = localStorage.getItem('Name');
  const { isLoading: isCalculateGMVLoading, data } = fetchDailyGMV(BRAND);

  const calculateDailyGMV = (arr) => {
    let SALE = arr?.reduce((acc, curr) => (acc += curr[2]), 0);
    let GMV = arr?.reduce((acc, curr) => (acc += curr[7]), 0);
  };

  const filterByStore = (state, arr) => {
    return arr?.filter((sale) => state.includes(sale[1]));
  };

  const filterByItem = (state, arr) => {
    return arr?.filter((sale) => state.includes(sale[6]));
  };

  calculateDailyGMV(data);

  const { isLoading: isInventoryLoading, data: resData } =
    fetchInventoryCount(BRAND);
  const dispatch = useDispatch();
  const isGMVDataLoading = useSelector(selectLoadingState);
  const PRICES = useSelector(selectAllPrices);
  const SALE_DATA = useSelector(selectAllSalesData);
  const ISLOGGED = useSelector(selectLoginStatus);
  const ALLITEMS = useSelector(selectAllItems);
  const ALLSTORES = useSelector(selectAllStores);
  const FILTERED_DATES = useSelector(selectAllFilteredDates);
  const FILTERED_ITEMS = useSelector(selectAllFilteredItems);
  const FILTERED_STORES = useSelector(selectAllFilteredStores);

  const LIVESTORES_LENGTH = ALLSTORES?.length;
  const TOKEN = JSON.parse(localStorage.getItem('Token'));
  const NAME = localStorage.getItem('Name');
  const GMV_SALES_DATA = useSelector(selectAllGMVSalesData);
  useEffect(() => {
    if (TOKEN) {
      dispatch(setloginStatus(true));
      dispatch(setAuthToken(TOKEN));
      dispatch(setBrandName(NAME));
    }
  }, [TOKEN, NAME]);

  const { cumlativeSalesReport } = useMemo(() => {
    const STORES =
      FILTERED_STORES?.length === 0
        ? ALLSTORES.map((store) => store.customer_name)
        : FILTERED_STORES;
    const ITEMS = FILTERED_ITEMS?.length === 0 ? ALLITEMS : FILTERED_ITEMS;
    return computeSalesNumber(
      FILTERED_DATES,
      STORES,
      ITEMS,
      PRICES,
      GMV_SALES_DATA,
      SALE_DATA
    );
  }, [
    FILTERED_DATES,
    FILTERED_STORES,
    FILTERED_ITEMS,
    PRICES,
    GMV_SALES_DATA,
    SALE_DATA,
  ]);

  const InventoryData = !isInventoryLoading && resData?.data['message'];

  const DASHBOARD_FILTERS = {
    'By Product': ALLITEMS,
    'By Store': ALLSTORES.map((store) => store.customer_name),
  };

  const { isLoading: ImageLoading, data: ImageData } = fetchStoreImages(BRAND);

  let IMG_DATA = !ImageLoading && ImageData?.data['message'];

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

  return (
    ISLOGGED && (
      <main className='page__content'>
        <section className='h-fit w-full'>
          <h1 className='page__title'>Welcome {BRAND}! 👋</h1>
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
                loading={isGMVDataLoading}
                metric={LIVESTORES_LENGTH}
                background='bg-purple-100'
                spinner={'border-purple-200'}
                tooltip={'Total no of stores where item is active.'}
              />
              <StatCard
                icon='store'
                title='Total Deployed'
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
            <Carousal src={IMG_DATA} loading={ImageLoading} />
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
