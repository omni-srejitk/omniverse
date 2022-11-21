import './App.css';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RouterConfig } from './config/RouterConfig';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { prepareData } from './utils/helperFunctions';
import { fetchSalesData } from './services/apiCalls';
import { setLoadingState } from './redux/features/authSlice';
import { setAllGMVSaleData } from './redux/features/dataSlice';
function App() {
  const { pathname } = useLocation();
  let BRAND = JSON.parse(localStorage.getItem('Name'));

  const { isLoading: isGMVDataLoading, data: gmvSaleRes } =
    fetchSalesData(BRAND);

  const GMV_SALES_DATA = !isGMVDataLoading && gmvSaleRes?.data['message'];
  const dispatch = useDispatch();

  useEffect(() => {
    const STORES = !isLiveStoresLoading && storesRes?.data?.message[BRAND];
    if (isGMVDataLoading || isLiveStoresLoading) {
      dispatch(setLoadingState(true));
    }
    if (
      !isGMVDataLoading &&
      !isLiveStoresLoading &&
      gmvSaleRes?.data['message']
    ) {
      prepareData(GMV_SALES_DATA, STORES, dispatch);
      dispatch(setAllGMVSaleData(GMV_SALES_DATA));
    }

    dispatch(setLoadingState(false));
  }, [isGMVDataLoading, isLiveStoresLoading, GMV_SALES_DATA]);

  return (
    <div className='App'>
      {pathname == '/' ? null : <Sidebar />}
      {pathname == '/' ? null : <Header />}

      <RouterConfig />
      <Toaster />
    </div>
  );
}

export default App;
