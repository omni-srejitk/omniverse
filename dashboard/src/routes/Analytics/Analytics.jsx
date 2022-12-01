import React, { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../../components';
import { GenderChart } from '../../components/Charts';
import { LineCharts } from '../../components/Charts/LineChart/LineChart';
import { PieChartComp } from '../../components/Charts/PieChart/PieChartComp';
import {
  fetchAgeandGenderData,
} from '../../services/apiCalls';

export const Analytics = () => {
  const [genderData, setGenderData] = useState({});
  const [ageData, setAgeData] = useState([]);
  const comparatorFn = (curr = 100, prev = 0, duration = 30) => {
    let perc = (((curr - prev) * 100) / duration).toFixed(2);

    return perc;
  };

  const BRAND = localStorage.getItem('Name');

  const { data: genderStatsData, isLoading: isGenderStatsLoading } =
    fetchAgeandGenderData(BRAND);

  const parseGenderData = (arr, loading) => {
    if (loading) return;
    let temp = new Map();

    arr?.map((item) => {
      if (temp.has(item.gender)) {
        temp.set(item.gender, temp.get(item.gender) + 1);
      } else {
        temp.set(item.gender, 1);
      }
    });

    let genderData = Object.fromEntries(temp);
    genderData = { ...genderData, All: genderData.Male + genderData.Female };

    setGenderData(genderData);
  };

  const parseAgeData = (arr, loading) => {
    if (loading) return;
    let ageMap = new Map();

    arr?.map((sale) => {
      const MIN = Math.floor(+sale.age.split('-')[0].trim() / 10) * 10;
      const MAX = Math.ceil(+sale.age.split('-')[1].trim() / 10) * 10;
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

  comparatorFn();

  useEffect(() => {
    parseGenderData(genderStatsData, isGenderStatsLoading);
    parseAgeData(genderStatsData, isGenderStatsLoading);
  }, [genderStatsData, isGenderStatsLoading]);

  return (
    <main className='page__content'>
      <h1 className='page__title'>Analytics</h1>
      <div className='mb-40 h-fit min-h-screen w-full flex-col items-center justify-start'>
        <Card title={'Total Sales'}>
          <div className='h-full w-full'>
            <h1 className='text-4xl font-semibold'>&#8377; 55,000</h1>
            <div className='my-2 flex w-fit items-center justify-between gap-3'>
              <div className='my-2 flex w-fit items-center justify-center rounded-full bg-green-100 px-2 py-1'>
                <span className='material-icons text-base text-green-500'>
                  arrow_upwards
                </span>
                <p className='text-sm font-semibold text-green-500'> 37 %</p>
              </div>
              <p className='font-semibold text-gray-400/70'>
                {' '}
                vs Sept 8th 2022
              </p>
            </div>
            <div className='h-40 w-full'>
              <LineCharts />
            </div>
          </div>
        </Card>
        <Card title='Gender Split'>
          <div className='h-80 w-full rounded-xl border-2 border-transparent'>
            <GenderChart data={genderData} />
          </div>
        </Card>
        <Card title='Age Split'>
          <div className='h-80 w-full rounded-xl border-2 border-transparent'>
            <PieChartComp data={ageData} />
          </div>
        </Card>
      </div>
    </main>
  );
};
