import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AnalyticsChart,
  Button,
  Card,
  Filter,
  Select,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components';
import { GenderChart } from '../../components/Charts';
import { UnitSold } from '../../components/Charts/Analytics/UnitSold';
import { VerticalBarChart } from '../../components/Charts/BarChart/VerticalBarChart';
import { PieChartComp } from '../../components/Charts/PieChart/PieChartComp';
import { DateSelector } from '../../components/DateSelector/DateSelector';
import { ComingSoon } from '../../components/Placeholders/ComingSoon';
import { usePrepareData } from '../../hooks/usePrepareData';
import {
  selectFilterEndDate,
  selectFilterStartDate,
  selectPopupState,
} from '../../redux/actions';

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
import { CSVLink } from 'react-csv';
import { PieChartChange } from '../../components/Charts/PieChart/PieChartChange';
export const Analytics = () => {
  const [genderData, setGenderData] = useState({});
  const [ageData, setAgeData] = useState([]);
  const [topStore, setTopStore] = useState([]);
  const [auditLog, setAuditLog] = useState([]);

  const BRAND = localStorage.getItem('Name');

  const LIVESTORES = useSelector(selectAllStores);
  const ALLITEMS = useSelector(selectAllItems);
  const SHOWPOPUP = useSelector(selectPopupState);
  const { isLoading: isGMVLoading, data: dailyGMVData } = fetchDailyGMV(BRAND);
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  const FILTEREDAGEGENDERDATA = useSelector(selectFilteredAgeGenderData);
  const { data: genderStatsData, isLoading: isGenderStatsLoading } =
    fetchAgeandGenderData(BRAND);
  const FILTERSTATE = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { isLoading: isLiveStoresDataLoading, data: liveStoresData } =
    fetchAllLiveStores(BRAND);
  const PREPARE_DATA = usePrepareData();

  const DASHBOARD_FILTERS = {
    'By Product': ALLITEMS,
    'By Store': LIVESTORES,
  };

  const STARTDATE = useSelector(selectFilterStartDate);
  const ENDDATE = useSelector(selectFilterEndDate);
  const OVERVIEW_FILTERS = (
    <div className='flex items-center gap-4'>
      <Select />
      <Filter filter={DASHBOARD_FILTERS} />
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

  const fetchTopStores = (array) => {
    const storeData = new Map();
    let arr = [];
    // checking if total stores array's store is matching livestores
    // so that only live stores are shown in pie chart
    array?.forEach((a) => {
      liveStoresData?.forEach((l) => {
        if (l.customer === a[1]) {
          a = [...a, l.customer_name];
          arr.push(a);
        }
      });
    });
    // if (arr?.length) {
    arr?.map((saleData) => {
      if (storeData.get(saleData[1])) {
        storeData.set(saleData[1], storeData.get(saleData[1]) + saleData[2]);
      } else {
        storeData.set(saleData[1], saleData[2]);
      }
    });
    let topStores = Array.from(storeData)?.sort((a, b) => +b[1] - +a[1]);
    // ?.slice(0, 3);
    let valueArray = []; //array that has stores which constitute 80% of business
    let sumOfValues = 0; //total sum of value (business money)
    let sum80 = 0; //to push elements which constitute 80% of sumOfValues
    topStores?.forEach((element) => {
      sumOfValues += element[1];
    });
    topStores?.forEach((element) => {
      sum80 += element[1]; //adding value to sum80
      if (sum80 <= sumOfValues * 0.8) {
        //if sum80 is less than 80% of total value
        valueArray.push(element); //then only push that particular element
        liveStoresData.filter((e) => {
          if (element[0] == e.customer) {
            element.push(e.customer_name);
          }
        });
      } else {
      }
    });
    let tempsss = topStores?.map((sale) => {
      if (valueArray?.includes(sale)) {
        return {
          name: sale[2],
          value: sale[1],
          satisfies: true,
        };
      } else {
        return {
          name: sale[2],
          value: sale[1],
          satisfies: false,
        };
      }
    });

    setTopStore(tempsss);
  };

  const parseAgeData = (arr) => {
    let ageMap = new Map();

    arr?.map((sale) => {
      const MIN = Math.floor(+sale.age.split('-')[0]?.trim() / 10) * 10;
      const MAX = Math.ceil(+sale.age.split('-')[1]?.trim() / 10) * 10;
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

    auditLog.sort(
      (a, b) => moment(b.Date, 'DD-MM-YY') - moment(a.Date, 'DD-MM-YY')
    );

    setAuditLog(auditLog);
  };
  const TOP_SKU = fetchItemsSales(FILTEREDSALEDATA);

  const SELECTED_RANGE = (
    <div className='flex w-fit  items-center gap-1 rounded-full p-2'>
      <p>
        From{' '}
        <span className='mx-1 rounded-full bg-gray-100 p-2 text-sm font-medium text-gray-700'>
          {STARTDATE}
        </span>{' '}
        to{' '}
        <span className='mx-1 rounded-full bg-gray-100 p-2 text-sm font-medium text-gray-700'>
          {ENDDATE}
        </span>
      </p>
    </div>
  );

  const csvData = FILTEREDSALEDATA.map((elem) => {
    const ALLOWED = ['DD-MM-YY', 'DD/MM/YY'];
    const date = moment(elem[0].trim(), ALLOWED).format('DD-MM-YY');
    return {
      date: `${date}`,
      Store: `${elem[1]}`,
      Quantity: `${elem[2]}`,
      SkuName: `${elem[6]}`,
      Price: `${elem[7]}`,
    };
  });

  const csvHeader = [
    { label: 'Date', key: 'date' },
    { label: 'Store', key: 'Store' },
    { label: 'Quantity', key: 'Quantity' },
    { label: 'SkuName', key: 'SkuName' },
    { label: 'Price', key: 'Price' },
  ];

  const CSVBUTTON = (
    <CSVLink
      data={csvData}
      headers={csvHeader}
      filename={`Omniflo Audit Report - ${BRAND} / ${moment().format(
        'DD-MM-YY'
      )}`}
    >
      <Button>Export to CSV</Button>
    </CSVLink>
  );

  useEffect(() => {
    parseGenderData(FILTEREDAGEGENDERDATA, isGenderStatsLoading);
    parseAgeData(FILTEREDAGEGENDERDATA, isGenderStatsLoading);
  }, [FILTEREDAGEGENDERDATA, isGenderStatsLoading]);

  useEffect(() => {
    fetchTopStores(FILTEREDSALEDATA);
    fetchAuditData(FILTEREDSALEDATA);
  }, [FILTEREDSALEDATA, liveStoresData]);

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

      <div className='max-w-screen mb-40 grid h-fit min-h-screen w-full grid-cols-1 grid-rows-[7] items-center justify-start  gap-8 lg:grid-cols-3 lg:grid-rows-[repeat(3,minmax(25rem,1fr))]'>
        <Card
          title='Total Sales'
          info='Gross Merchandise Value of SKUs sold in the selected period.'
          classes={'row-span-1 w-full h-full col-span-1 lg:col-span-2'}
          cardHeader={SELECTED_RANGE}
        >
          <AnalyticsChart data={FILTEREDSALEDATA} />
        </Card>
        <Card
          title='Bestsellers'
          info='These are your top selling items for the selected period.'
          classes={'w-full h-[25rem] col-span-1 row-span-1'}
        >
          <div className='h-full w-full'>
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
        <Card
          title='Units Sold'
          info='Total quantity of SKUs sold in the selected period.'
          classes={'row-span-1 col-span-1 max-h-[25rem]'}
        >
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

        <Card
          title='Age Split'
          info='The age wise split of the consumers who are purchasing your products inside stores. This data is collected by our promoters.'
          classes={'max-h-[25rem]'}
        >
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
        <Card
          title='Gender Split'
          info='Binary gender distribution of consumers who are purchasing your products inside stores. This data is collected by our promoters'
          classes={'max-h-[25rem]'}
        >
          <div className='h-80 w-full rounded-xl border-2 border-transparent'>
            <GenderChart data={genderData} />
          </div>
        </Card>
        <Card
          title='Audit Log'
          info='A historical data sheet of all the sales based on audits.'
          classes={
            'row-span-1 col-span-1 lg:col-span-2 max-h-[25rem] overflow-hidden'
          }
          cardHeader={CSVBUTTON}
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
                  <tr className='min-h-20 flex w-full' key={audit.Date}>
                    <td
                      aria-colspan={audit?.Value?.length}
                      className='flex w-1/4 flex-grow items-center  justify-start overflow-x-scroll text-ellipsis whitespace-pre-wrap break-words  border-y-2 border-gray-100 px-2  font-semibold scrollbar-thin'
                    >
                      {audit.Date}
                    </td>
                    <td className='h-full w-full '>
                      <table className='flex h-full w-full flex-grow flex-col'>
                        <tbody className='h-full w-full'>
                          {audit.Value?.map((sale) => (
                            <tr
                              key={`${sale[0]} -
                              ${sale[1]} -
                                ${sale[2]} -
                                ${sale[3]} -
                                ${sale[4]} -
                                ${sale[5]} -
                                ${sale[6]}-    ${sale[7]} -`}
                              className='flex h-full w-full'
                            >
                              <td className='flex h-20 w-1/3 flex-grow items-center justify-start overflow-x-scroll text-ellipsis whitespace-pre-wrap  break-words border-2 border-gray-100 px-2 font-medium  text-gray-600 scrollbar-thin'>
                                {sale[6] || 0}
                              </td>
                              <td className='flex h-20 w-1/3 flex-grow items-center justify-start overflow-x-scroll text-ellipsis whitespace-pre-wrap  break-words border-2 border-gray-100 px-2 font-semibold  text-gray-600 scrollbar-thin'>
                                {sale[2] || 0}
                              </td>
                              <td className='flex h-20 w-1/3 flex-grow items-center justify-start overflow-x-scroll text-ellipsis whitespace-pre-wrap break-words  border-2 border-gray-100 px-2 font-semibold text-gray-600  scrollbar-thin'>
                                &#8377;{sale[7] || 0}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </TableContainer>
          )}
        </Card>
        <Card
          title='Top Stores'
          info='Best performing stores based on quantity of items sold.'
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
              <PieChartChange data={topStore} vertical cy='30%' />
            )}
          </div>
        </Card>
      </div>

      {SHOWPOPUP.datePicker && <DateSelector />}
    </main>
  );
};
