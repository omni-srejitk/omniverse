import React from 'react';
import { PieChartChange } from '../Charts/PieChart/PieChartChange';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredSalesData } from '../../redux/actions/dataActions';
import { fetchAllLiveStores } from '../../services/apiCalls';
import { ComingSoon } from '../Placeholders/ComingSoon';
import { Card } from '../Cards';

const PieChartStoreComp = () => {
  const [topStore, setTopStore] = useState([]);
  const FILTEREDSALEDATA = useSelector(selectFilteredSalesData);
  let BRAND = localStorage.getItem('Name');

  const { isLoading: isLiveStoresDataLoading, data: liveStoresData } =
    fetchAllLiveStores(BRAND);
  useEffect(() => {
    fetchTopStores(FILTEREDSALEDATA);
  }, [FILTEREDSALEDATA, liveStoresData]);
  const fetchTopStores = (array) => {
    const storeData = new Map();
    let activeStoresData = [];
    array?.forEach((arr) => {
      liveStoresData?.forEach((store) => {
        if (store.customer === arr[1]) {
          arr = [...arr, store.customer_name];
          activeStoresData.push(arr);
        }
      });
    });
    activeStoresData?.map((saleData) => {
      if (storeData.get(saleData[1])) {
        storeData.set(saleData[1], storeData.get(saleData[1]) + saleData[2]);
      } else {
        storeData.set(saleData[1], saleData[2]);
      }
    });
    let topStores = Array.from(storeData)?.sort((a, b) => +b[1] - +a[1]);
    // ?.slice(0, 3);
    let valueArray = [];
    let sumOfValues = 0;
    let sum80 = 0;

    topStores?.forEach((element) => {
      sumOfValues += element[1];
    });

    topStores?.forEach((element) => {
      sum80 += element[1];
      if (sum80 <= sumOfValues * 0.8) {
        valueArray.push(element);
        liveStoresData.filter((e) => {
          if (element[0] == e.customer) {
            element.push(e.customer_name);
          }
        });
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
  return (
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
  );
};

export default PieChartStoreComp;
