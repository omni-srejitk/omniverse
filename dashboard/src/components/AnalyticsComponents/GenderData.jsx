import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GenderChart } from '../Charts';
import { selectFilteredAgeGenderData } from '../../redux/actions/dataActions';
import { fetchDateWiseSales } from '../../services/apiCalls';
import { getFilteredAgeGenderData } from '../../utils/helperFunctions';
import { ComingSoon } from '../Placeholders/ComingSoon';
import { Card } from '../Cards';

export const GenderData = () => {
  const dispatch = useDispatch();
  const [genderData, setGenderData] = useState([]);
  const BRAND = localStorage.getItem('Name');
  const FILTEREDAGEGENDERDATA = useSelector(selectFilteredAgeGenderData);
  const { data: data, isLoading: isDataLoading } = fetchDateWiseSales(BRAND);

  const FILTERSTATE = useSelector((state) => state.filter);

  useEffect(() => {
    if (isDataLoading) return;
    getFilteredAgeGenderData(FILTERSTATE, data, dispatch);
  }, [isDataLoading, FILTERSTATE, data]);

  useEffect(() => {
    parseGenderData(FILTEREDAGEGENDERDATA, isDataLoading);
  }, [FILTEREDAGEGENDERDATA, isDataLoading]);

  const parseGenderData = (arr, loading) => {
    if (loading) return;
    let temp = new Map();
    let hasGenderArray = [];
    hasGenderArray = arr?.filter((item) => {
      if (item[9] !== null) {
        return item;
      }
    });
    hasGenderArray?.map((item) => {
      if (temp.has(item[9])) {
        temp.set(item[9], temp.get(item[9]) + 1);
      } else {
        temp.set(item[9], 1);
      }
    });
    let genderData = Object.fromEntries(temp);
    genderData = { ...genderData, All: genderData.Male + genderData.Female };
    setGenderData(genderData);
  };
  return (
    <Card
      title='Gender Split'
      info='Binary gender distribution of consumers who are purchasing your products inside stores. This data is collected by our promoters'
      classes={'max-h-[25rem]'}
    >
      <div className='h-80 w-full rounded-xl border-2 border-transparent'>
        <GenderChart data={genderData} />
      </div>
    </Card>
  );
};
