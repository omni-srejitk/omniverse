import moment from 'moment';
import {
  setAllDates,
  setAllItems,
  setAllPrices,
  setAllSalesData,
  setAllStores,
} from '../redux/features/dataSlice';
import { setFilteredDates } from '../redux/features/filterSlice';

export const prepareData = (salesData = [], dispatch) => {
  let stores = new Set();
  let items = new Set();
  const prices = {};
  const dates = [];
  const sale_count = {};
  for (let date in salesData) {
    dates.push(moment(date, 'DD-MM-YY').format('DD-MM-YY'));
    for (let store_names in salesData[date]) {
      stores.add(store_names);
      for (let item in salesData[date][store_names]) {
        items.add(item);
        prices[item] = salesData[date][store_names][item][1];
        sale_count[date] = {
          ...sale_count[date],
          [item]: 0,
          All: 0,
          Cumalative: 0,
          Stores: [],
          Items: [],
        };
        sale_count[date][item] += salesData[date][store_names][item][0];
      }
    }
    sale_count[date]['All'] = Object.values(sale_count[date]).reduce(
      (a, b) => (a += +b),
      0
    );
    sale_count[date]['Cumalative'] = Object.values(sale_count)?.reduce(
      (acc, curr) => {
        return (acc += +curr.All);
      },
      0
    );
  }

  stores = Array.from(stores);
  items = Array.from(items);

  dispatch(setAllDates(dates));
  dispatch(setFilteredDates(dates));
  dispatch(setAllItems(items));
  dispatch(setAllStores(stores));
  dispatch(setAllPrices(prices));
  dispatch(setAllSalesData(sale_count));
};

export const computeSalesNumber = (
  dates = [],
  stores = [],
  items = [],
  prices,
  salesData,
) => {
  const startDate = moment(dates[0], 'DD-MM-YY');
  const endDate = moment();
  let sales = 0;
  let gmv = 0;
  let j = 0;
  let UNIT_SALE = 0;
  let cumlativeSalesReport = {};
  let checkThis = {};

  for (let i = startDate; i <= endDate; i = moment(i).add(1, 'd')) {
    if (i.isSame(moment(dates[j], 'DD-MM-YY'))) {
      const d = moment(dates[j], 'DD-MM-YY').format('DD-MM-YY');
      for (let store in salesData[d]) {
        for (let item of items) {
          if (stores.includes(store) && item in salesData[d][store]) {
            sales += salesData[d][store][item][0];
            UNIT_SALE = salesData[d][store][item][0];
            gmv += salesData[d][store][item][0] * prices[item];

          }
        }
      }
      j++;
    }

    checkThis[moment(i).format('DD-MM-YY')] = {
      TOTAL_SALES: sales,
      TOTAL_GMV: gmv,
      UNIT_SALE,
    };
  }

  let SALES_DATA = [];

  for (let key of Object.keys(checkThis)) {
    SALES_DATA.push({ Date: key, ...checkThis[key] });
  }
  SALES_DATA = SALES_DATA?.sort(
    (a, b) =>
      moment(a.Date, 'DD-MM-YY').format('DD-MM-YY') -
      moment(b.Date, 'DD-MM-YY').format('DD-MM-YY')
  );

  cumlativeSalesReport = {
    TOTAL_SALES: sales,
    TOTAL_GMV: gmv,
    GRAPH_DATA: SALES_DATA,
  };

  return { cumlativeSalesReport, checkThis };
};

export const calcTickCount = (duration) => {
  switch (duration) {
    case 'All Time':
      return 8;
    case 'This Week':
      return 8;
    case 'This Month':
      return 10;
    default:
      return 10;
  }
};

export const cacheImages = async (srcArray, setLoading) => {
  const promises = await srcArray?.map((src) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();

      img.src = src['image'];
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  });
  await Promise.all(promises);

  setLoading(false);
};

export const filterDates = (val, DATES, dispatch) => {
  switch (val) {
    case 'This Week':
      const firstDayOfWeek = moment().startOf('week');
      const currDayOfWeek = moment().endOf('week');

      const filteredWeek = DATES?.filter((date) =>
        moment(date, 'DD-MM-YY').isBetween(
          moment(firstDayOfWeek, 'DD-MM-YY'),
          moment(currDayOfWeek, 'DD-MM-YY')
        )
      );
      return dispatch(setFilteredDates(filteredWeek));

    case 'This Month':
      const firstDayOfMonth = moment().startOf('month');
      const currDayOfMonth = moment().endOf('month');
      const filteredMonth = DATES?.filter((date) =>
        moment(date, 'DD-MM-YY').isBetween(
          moment(firstDayOfMonth, 'DD-MM-YY'),
          moment(currDayOfMonth, 'DD-MM-YY')
        )
      );
      return dispatch(setFilteredDates(filteredMonth));
    default:
      return dispatch(setFilteredDates(DATES));
  }
};
