import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  TableBody,
  TableContainer,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components';
import { GenderChart } from '../../components/Charts';
import { LineCharts } from '../../components/Charts/LineChart/LineChart';
import { PieChartComp } from '../../components/Charts/PieChart/PieChartComp';
import { selectFilteredSalesData } from '../../redux/actions/dataActions';
import {
  fetchAgeandGenderData,
  fetchAllLiveStores,
  fetchDailyGMV,
} from '../../services/apiCalls';
import { getFilteredData } from '../../utils/helperFunctions';
export const Analytics = () => {
  const [genderData, setGenderData] = useState({});
  const [ageData, setAgeData] = useState([]);
  const [topStore, setTopStore] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const comparatorFn = (curr = 100, prev = 0, duration = 30) => {
    let perc = (((curr - prev) * 100) / duration).toFixed(2);

    return perc;
  };

  const BRAND = localStorage.getItem('Name');

  const { isLoading: isGMVLoading, data: dailyGMVData } = fetchDailyGMV(BRAND);
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);

  const { data: genderStatsData, isLoading: isGenderStatsLoading } =
    fetchAgeandGenderData(BRAND);
  const FILTERSTATE = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { isLoading, data: liveStoresData } = fetchAllLiveStores(BRAND);

  console.log(liveStoresData);
  useEffect(() => {
    if (isGMVLoading) return;
    getFilteredData(FILTERSTATE, dailyGMVData, dispatch);
  }, [isGMVLoading, FILTERSTATE, dailyGMVData]);

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

  //console.log(FILTEREDSALEDATA);
  const fetchTopStores = (arr) => {
    const storeData = new Map();

    if (arr?.length > 0) {
      arr?.map((saleData) => {
        if (storeData.get(saleData[1])) {
          storeData.set(saleData[1], storeData.get(saleData[1]) + saleData[2]);
        } else {
          storeData.set(saleData[1], saleData[2]);
        }
      });

      let topStores = Array.from(storeData)
        ?.sort((a, b) => +b[1] - +a[1])
        ?.slice(0, 3);

      let tempsss = topStores.map((sale) => {
        let foundSale = liveStoresData?.find(
          (store) => store.customer === sale[0]
        );

        return {
          name: foundSale.customer_name,
          value: sale[1],
        };
      });

      setTopStore(tempsss);
    }
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

  const fetchAuditData = (arr) => {
    const datemap = new Map();
    arr?.map((saleData) => {
      if (datemap.has(saleData[0])) {
        const foundField = datemap.get(saleData[0]);
        datemap.set(saleData[0], [...foundField, saleData]);
      } else {
        datemap.set(saleData[0], [saleData]);
      }
    });

    let auditLog = [];
    let dateDictionary = Object.fromEntries(datemap);

    for (let key of Object.keys(dateDictionary)) {
      auditLog.push({
        Date: key,
        Value: dateDictionary[key],
      });
    }

    setAuditLog(auditLog);
  };

  comparatorFn();

  useEffect(() => {
    parseGenderData(genderStatsData, isGenderStatsLoading);
    parseAgeData(genderStatsData, isGenderStatsLoading);
  }, [genderStatsData, isGenderStatsLoading]);

  useEffect(() => {
    fetchTopStores(FILTEREDSALEDATA);
    fetchAuditData(FILTEREDSALEDATA);
  }, [FILTEREDSALEDATA]);
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
        <Card title='Top Stores'>
          <div className='h-80 w-full rounded-xl border-2 border-transparent'>
            <PieChartComp data={topStore} />
          </div>
        </Card>
        <Card>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableHeader>Date</TableHeader>
                <TableHeader>SKUs</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>GMV</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLog?.map((audit) => (
                <tr className='min-h-20 flex max-h-40 w-full' key={audit.Date}>
                  <td className='flex w-full flex-grow items-center justify-start  overflow-x-scroll text-ellipsis whitespace-pre-wrap break-words px-2  font-semibold scrollbar-thin'>
                    {audit.Date}
                  </td>
                  <td className='flex h-full w-full flex-grow flex-col items-start '>
                    {audit.Value?.map((sale) => (
                      <TableRow className='flex w-full flex-grow items-start justify-between'>
                        <TableData>{sale[6] || 0}</TableData>
                      </TableRow>
                    ))}
                  </td>
                  <td className='flex h-full w-full flex-grow flex-col items-start '>
                    {audit.Value?.map((sale) => (
                      <TableRow className='flex w-full flex-grow items-start justify-between'>
                        <td className='flex w-full flex-grow items-center justify-start  overflow-x-scroll text-ellipsis whitespace-nowrap break-words px-2  font-semibold scrollbar-thin'>
                          {sale[2]}
                        </td>
                      </TableRow>
                    ))}
                  </td>
                  <td className='flex h-full w-full flex-grow flex-col items-start '>
                    {audit.Value?.map((sale) => (
                      <TableRow className='flex w-full flex-grow items-start justify-between'>
                        <td className='flex w-full flex-grow items-center justify-start  overflow-x-scroll text-ellipsis whitespace-nowrap break-words px-2  font-semibold scrollbar-thin'>
                          {sale[7]}
                        </td>
                      </TableRow>
                    ))}
                  </td>
                </tr>
              ))}
            </TableBody>
          </TableContainer>
        </Card>
      </div>
    </main>
  );
};
