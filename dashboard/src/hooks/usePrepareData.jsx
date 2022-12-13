import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDailyGMV } from '../services/apiCalls';
import { prepareSaleData } from '../utils/helperFunctions';

export const usePrepareData = () => {
  const [isPreparing, setIsPreparing] = useState(false);
  const BRAND = localStorage.getItem('Name');
  const { isLoading: isGMVLoading, data: dailyGMVData } = fetchDailyGMV(BRAND);
  const dispatch = useDispatch();

  const callPrepareData = (isGMVLoading) => {
    setIsPreparing(true);
    try {
      if (isGMVLoading) return;
      prepareSaleData(dailyGMVData, dispatch);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPreparing(false);
    }
  };

  useEffect(() => {
    callPrepareData(isGMVLoading);
  }, [isGMVLoading]);

  return { isPreparing, isGMVLoading };
};
