import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChartComp } from '../Charts/PieChart/PieChartComp';
import { fetchDateWiseSales } from '../../services/apiCalls';
import { ComingSoon } from '../Placeholders/ComingSoon';
import { Card } from '../Cards';

export const AgeData = () => {
  const dispatch = useDispatch();
  const [ageData, setAgeData] = useState([]);
  const BRAND = localStorage.getItem('Name');
  const { data: data, isLoading: isDataLoading } = fetchDateWiseSales(BRAND);

  useEffect(() => {
    parseAgeData(data, isDataLoading);
  }, [data, isDataLoading]);

  const parseAgeData = (arr) => {
    let ageMap = new Map();

    let hasAgeArray = arr?.filter((item) => {
      if (item[8] !== null) {
        return item;
      }
    });
    hasAgeArray?.map((sale) => {
      const MIN = Math.floor(+sale[8]?.split('-')[0]?.trim() / 10) * 10;
      const MAX = Math.ceil(+sale[8]?.split('-')[1]?.trim() / 10) * 10;
      const RANGE = `${MIN}-${MAX}`;
      if (ageMap.has(RANGE)) {
        ageMap.set(RANGE, ageMap.get(RANGE) + 1);
      } else {
        ageMap.set(RANGE, 1);
      }
    });

    const ageData = Object.fromEntries(ageMap);

    let res = Object.entries(ageData)?.map((data) => {
      return {
        name: data[0],
        value: data[1],
      };
    });

    setAgeData(res);
  };
  return (
    <>
      <Card
        title='Age Split'
        info='The age wise split of the consumers who are purchasing your products inside stores. This data is collected by our promoters.'
        classes={'max-h-[25rem]'}
      >
        <div className='h-80 w-full rounded-xl border-2 border-transparent'>
          {ageData?.length == 0 ? (
            <ComingSoon
              logo={'pie_chart'}
              title={'No matching data.'}
              subtitle={'You will soon see age wise sale ratio here.'}
            />
          ) : (
            <PieChartComp data={ageData} />
          )}
        </div>
      </Card>
    </>
  );
};
