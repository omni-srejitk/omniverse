import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AnalyticsChart,
  Card,
  Filter,
  Select,
  TableBody,
  TableContainer,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components';
import { GenderChart } from '../../components/Charts';
import { UnitSold } from '../../components/Charts/Analytics/UnitSold';
import { VerticalBarChart } from '../../components/Charts/BarChart/VerticalBarChart';
import { PieChartComp } from '../../components/Charts/PieChart/PieChartComp';
import { ComingSoon } from '../../components/Placeholders/comingSoon';
import {
  selectAllItems,
  selectAllStores,
  selectFilteredAgeGenderData,
  selectFilteredSalesData,
} from '../../redux/actions/dataActions';
import {
  fetchAgeandGenderData,
  fetchAllLiveStores,
  fetchDailyGMV,
} from '../../services/apiCalls';
import {
  fetchItemsSales,
  getFilteredAgeGenderData,
  getFilteredData,
} from '../../utils/helperFunctions';
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

  const LIVESTORES = useSelector(selectAllStores);
  const ALLITEMS = useSelector(selectAllItems);

  const { isLoading: isGMVLoading, data: dailyGMVData } = fetchDailyGMV(BRAND);
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  const FILTEREDAGEGENDERDATA = useSelector(selectFilteredAgeGenderData);
  const { data: genderStatsData, isLoading: isGenderStatsLoading } =
    fetchAgeandGenderData(BRAND);
  const FILTERSTATE = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { isLoading: isLiveStoresDataLoading, data: liveStoresData } =
    fetchAllLiveStores(BRAND);

  const [showState, setShowState] = useState({
    durationFilter: false,
    productFilter: false,
  });
  const DASHBOARD_FILTERS = {
    'By Product': ALLITEMS,
    'By Store': LIVESTORES,
  };

  const OVERVIEW_FILTERS = (
    <div className='flex items-center gap-4'>
      <Select showState={showState} setShowState={setShowState} />
      <Filter
        filter={DASHBOARD_FILTERS}
        showState={showState}
        setShowState={setShowState}
      />
    </div>
  );
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
        let foundSale = liveStoresData?.find((store) => {
          return store?.customer === sale[0];
        });

        return {
          name: foundSale?.customer_name,
          value: sale[1],
        };
      });

      setTopStore(tempsss);
    }
  };

  const parseAgeData = (arr) => {
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

  const TOP_SKU = fetchItemsSales(FILTEREDSALEDATA);

  useEffect(() => {
    parseGenderData(FILTEREDAGEGENDERDATA, isGenderStatsLoading);
    parseAgeData(FILTEREDAGEGENDERDATA, isGenderStatsLoading);
  }, [FILTEREDAGEGENDERDATA, isGenderStatsLoading]);

  useEffect(() => {
    fetchTopStores(FILTEREDSALEDATA);
    fetchAuditData(FILTEREDSALEDATA);
  }, [FILTEREDSALEDATA]);

  useEffect(() => {
    if (isGMVLoading) return;
    getFilteredData(FILTERSTATE, dailyGMVData, dispatch);
  }, [isGMVLoading, FILTERSTATE, dailyGMVData]);

  useEffect(() => {
    if (isGenderStatsLoading) return;
    getFilteredAgeGenderData(FILTERSTATE, genderStatsData, dispatch);
  }, [isGenderStatsLoading, FILTERSTATE, genderStatsData]);

  return (
    <main className='page__content'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='page__title'>Analytics</h1>
        {OVERVIEW_FILTERS}
      </div>

      <div className='max-w-screen  mb-40 grid h-fit min-h-screen w-full grid-cols-1 grid-rows-[7] items-center justify-start  gap-8 lg:grid-cols-3 lg:grid-rows-[repeat(3,minmax(25rem,1fr))]'>
        <Card
          title='Total Sales'
          classes={'row-span-1 w-full h-full col-span-1 lg:col-span-2'}
        >
          <AnalyticsChart data={FILTEREDSALEDATA} />
        </Card>
        <Card title='Top SKU' classes={'w-full h-full col-span-1 row-span-1'}>
          <div className='h-full max-h-[25rem] w-full'>
            {TOP_SKU?.length === 0 ? (
              <ComingSoon
                logo={'assessment'}
                title='No Data Found.'
                subtitle='Please try again with different filters.'
              />
            ) : (
              <VerticalBarChart
                data={TOP_SKU}
                XAxisKey={'qty'}
                YAxisKey={'item'}
                dataKey={'qty'}
                color={'#6ee7b7'}
              />
            )}
          </div>
        </Card>
        <Card title='Unit Sold' classes={'row-span-1 col-span-1 max-h-[25rem]'}>
          {FILTEREDSALEDATA?.length === 0 ? (
            <ComingSoon
              logo={'insert_chart'}
              title={'No matching data.'}
              subtitle={'You will soon see unit wise sale data here.'}
            />
          ) : (
            <UnitSold
              data={FILTEREDSALEDATA}
              XAxisKey={'date'}
              YAxisKey={'qty'}
              DataKey={'qty'}
              color={'#a7f3d0'}
            />
          )}
        </Card>

        <Card title='Age Split' classes={'max-h-[25rem]'}>
          <div className='h-80 w-full rounded-xl border-2 border-transparent'>
            {ageData?.length === 0 ? (
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
        <Card title='Gender Split' classes={'max-h-[25rem]'}>
          <div className='h-80 w-full rounded-xl border-2 border-transparent'>
            <GenderChart data={genderData} />
          </div>
        </Card>
        <Card
          title='Audit Log'
          classes={
            'row-span-1 col-span-1 lg:col-span-2 max-h-[25rem] overflow-hidden'
          }
        >
          {auditLog?.length === 0 ? (
            <ComingSoon
              logo={'table_chart'}
              title={'No matching data.'}
              subtitle={'You will soon see unit wise ssale audits here.'}
            />
          ) : (
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
                  <tr
                    className='min-h-20 flex max-h-40 w-full'
                    key={audit.Date}
                  >
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
          )}
        </Card>
        <Card
          title='Top Stores'
          classes={'max-h-[25rem] col-span-1 overflow-hidden'}
        >
          <div className='h-80 w-full rounded-xl border-2 border-transparent'>
            {topStore?.length === 0 ? (
              <ComingSoon
                logo={'pie_chart'}
                title={'No matching data.'}
                subtitle={'You will soon see unit wise sale ratio here.'}
              />
            ) : (
              <PieChartComp data={topStore} vertical />
            )}
          </div>
        </Card>
      </div>
    </main>
  );
};
