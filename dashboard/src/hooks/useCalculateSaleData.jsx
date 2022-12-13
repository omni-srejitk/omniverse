import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDates } from '../redux/actions';
import { selectFilteredSalesData } from '../redux/actions/dataActions';
import {
  calculateDailyGMV,
  fetchCumalativeSaleAmount,
  fetchCumalativeSaleCount,
} from '../utils/helperFunctions';

export const useCalculateSaleData = (isLoading) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const dispatch = useDispatch();
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  const ALLDATES = useSelector(selectAllDates);

  const calculateData = (isLoading, FILTEREDSALEDATA) => {
    setIsCalculating(true);
    try {
      if (isLoading) return;
      calculateDailyGMV(FILTEREDSALEDATA, dispatch);
      fetchCumalativeSaleCount(FILTEREDSALEDATA, ALLDATES, dispatch);
      fetchCumalativeSaleAmount(FILTEREDSALEDATA, ALLDATES, dispatch);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCalculating(false);
    }
  };
  useEffect(() => {
    calculateData(isLoading, FILTEREDSALEDATA);
  }, [isLoading, FILTEREDSALEDATA]);

  return { isCalculating };
};
