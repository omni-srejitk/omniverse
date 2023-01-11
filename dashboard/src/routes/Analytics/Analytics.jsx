import React, { startTransition, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticsChartComp from '../../components/AnalyticsComponents/AnalyticsChartComp';
import PieChartStoreComp from '../../components/AnalyticsComponents/PieChartStoreComp';
import { GenderData } from '../../components/AnalyticsComponents/GenderData';
import VerticalBarChartComp from '../../components/AnalyticsComponents/VerticalBarChartComp';
import { AgeData } from '../../components/AnalyticsComponents/AgeData';
import UnitSoldComp from '../../components/AnalyticsComponents/UnitSoldComp';
import { Filter, Select } from '../../components';
import { DateSelector } from '../../components/DateSelector/DateSelector';
import { selectPopupState, selectDurationFilter } from '../../redux/actions';
import {
  selectAllItems,
  selectAllStores,
} from '../../redux/actions/dataActions';
import { fetchDailyGMV, fetchDateWiseSales } from '../../services/apiCalls';
import { getFilteredData } from '../../utils/helperFunctions';
import {
  setDurationFilter,
  setFilterEndDate,
  setFilterStartDate,
} from '../../redux/features/filterSlice';
import SaleLog from '../../components/AnalyticsComponents/SaleLog';
import { selectAllFilteredDates } from '../../redux/actions';

export const Analytics = () => {
  const BRAND = localStorage.getItem('Name');
  const { data } = fetchDateWiseSales(BRAND);
  const LIVESTORES = useSelector(selectAllStores);
  const ALLITEMS = useSelector(selectAllItems);
  const SHOWPOPUP = useSelector(selectPopupState);
  const { isLoading: isGMVLoading, data: dailyGMVData } = fetchDailyGMV(BRAND);
  const FILTERSTATE = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const allDates = useSelector(selectAllFilteredDates);
  const lengthOfAllDates = allDates?.length;

  const DASHBOARD_FILTERS = {
    'By Product': ALLITEMS,
    'By Store': LIVESTORES,
  };
  const OVERVIEW_FILTERS = (
    <div className='flex items-center gap-4'>
      <Select />
      <Filter filter={DASHBOARD_FILTERS} />
    </div>
  );
  const FILTERBYDURATION = useSelector(selectDurationFilter);
  function filterchange() {
    FILTERBYDURATION !== 'Lifetime'
      ? dispatch(setDurationFilter('Lifetime'))
      : '';
  }

  useEffect(() => {
    filterchange();
    if (data) {
      getFilteredData(FILTERSTATE, data, dispatch);
      dispatch(setFilterStartDate(allDates[0]));
      dispatch(setFilterEndDate(allDates[lengthOfAllDates - 1]));
    }
  }, []);
  useEffect(() => {
    if (data) {
      getFilteredData(FILTERSTATE, data, dispatch);
    }
  }, [FILTERSTATE, data]);

  return (
    <main className='page__content'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='page__title'>Analytics</h1>
        {OVERVIEW_FILTERS}
      </div>
      <div className='max-w-screen mb-40 grid h-fit min-h-screen w-full grid-cols-1 grid-rows-[7] items-center justify-start  gap-8 lg:grid-cols-3 lg:grid-rows-[repeat(3,minmax(25rem,1fr))]'>
        <AnalyticsChartComp />
        <VerticalBarChartComp />
        <UnitSoldComp />
        <AgeData />
        <GenderData />
        <SaleLog />
        <PieChartStoreComp />
      </div>

      {SHOWPOPUP.datePicker && <DateSelector />}
    </main>
  );
};
