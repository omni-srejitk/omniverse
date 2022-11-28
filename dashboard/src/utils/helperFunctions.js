import moment from 'moment';
import {
  setAllDates,
  setAllInventory,
  setAllInventoryList,
  setAllItems,
  setAllPrices,
  setAllSaleAmount,
  setAllSalesData,
  setAllStores,
  setAllUnitsSold,
  setAllWarehouse,
  setAllWarehouseList,
  setFilteredSaleData,
} from '../redux/features/dataSlice';
import { setFilteredDates } from '../redux/features/filterSlice';
import {
  setCumlativeSum,
  setCumlativeUnits,
} from '../redux/features/graphSlice';

export const prepareData = (salesData = [], STORES, dispatch) => {
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
  dispatch(setAllStores(STORES));
  dispatch(setAllPrices(prices));
  dispatch(setAllSalesData(sale_count));
};

export const computeSalesNumber = (
  dates = [],
  stores = [],
  items = [],
  prices,
  salesData
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

export const applyInventoryFilters = (
  FILTERED_ITEMS,
  FILTERED_STORES,
  INVENTORY_LIST,
  WAREHOUSE_LIST,
  dispatch,
  setStocklist
) => {
  let INV_LIST = [...INVENTORY_LIST];
  let WARE_LIST = [...WAREHOUSE_LIST];
  let INV_COUNT = 0;
  let WARE_COUNT = 0;
  if (FILTERED_ITEMS?.length > 0) {
    INV_LIST = INV_LIST?.filter((item) =>
      FILTERED_ITEMS?.includes(item.item_name)
    );
    WARE_LIST = WARE_LIST?.filter((item) =>
      FILTERED_ITEMS?.includes(item.item_name)
    );
  }
  if (FILTERED_STORES?.length > 0) {
    INV_LIST = INV_LIST?.filter((item) =>
      FILTERED_STORES?.includes(item.customer_name)
    );
  }
  INV_COUNT = INV_LIST?.reduce((acc, curr) => (acc += curr.qty), 0);
  WARE_COUNT = WARE_LIST?.reduce((acc, curr) => (acc += curr.qty), 0);
  dispatch(setAllInventory(INV_COUNT));
  dispatch(setAllInventoryList(INV_LIST));
  dispatch(setAllWarehouse(WARE_COUNT));
  dispatch(setAllWarehouseList(WARE_LIST));

  setStocklist({
    ALL: [...INV_LIST, ...WARE_LIST],
    INVENTORY: [...INV_LIST],
    WAREHOUSE: [...WARE_LIST],
  });
};

export const reduceImages = (arr, setSrclist) => {
  let reducedSrc = arr?.map((meta) => {
    return {
      ...meta,
      image: meta?.image?.replace('engine-omniflo', 'engine-omniflo-reduced'),
    };
  });

  setSrclist(reducedSrc);
};

export const cleanAllStoresData = (data) => {
  return data?.map((store) => {
    let affliatedBrands = {};
    let brands = JSON.parse(store?.brand_present) || {};
    for (let key of Object.keys(brands)) {
      if (brands[key]) {
        affliatedBrands[key] = brands[key].split(',');
      }
    }

    let address = store?.address?.split(',');
    let locality = address?.at(-3)?.trim();

    return { ...store, brand_present: affliatedBrands, locality };
  });
};

//accepts the same arguement as computeSalesNumber

export const computeAnalyticsSalesNumber = (
  dates = [],
  stores = [],
  items = [],
  prices,
  salesData,
  days // days arguement will tell how many days to go behind
) => {
  // finding the previous date
  const lastSevenDaysDate = moment().subtract(days, 'days').format('DD-MM-YY');

  const presentDate = moment().format('DD-MM-YY');
  const { checkThis } = computeSalesNumber(
    dates,
    stores,
    items,
    prices,
    salesData
  );

  const lastSevenDaysData = checkThis[lastSevenDaysDate];
  const presentData = checkThis[presentDate];

  //calculate percent change only when the data is present
  let percentageChangeGMV;
  let percentageChangeSales;
  if (lastSevenDaysData && presentData) {
    percentageChangeGMV =
      (presentData.TOTAL_GMV - lastSevenDaysData.TOTAL_GMV) / 100;
    percentageChangeSales =
      (presentData.TOTAL_SALES - lastSevenDaysData.TOTAL_SALES) / 100;
  }

  return { presentData, percentageChangeSales, percentageChangeGMV };
};

// ! Calculate GMV 2.0 Related Formulas

export const fetchAllDates = (sale_data = []) => {
  const DATE_MAP = new Set();
  sale_data?.map((sale) =>
    DATE_MAP.add(moment(sale[0], 'DD-MM-YY').format('DD-MM-YY'))
  );
  const DATES = Array.from(DATE_MAP);
  return DATES;
};

export const fetchAllStores = (sale_data = []) => {
  const STORE_MAP = new Set();
  sale_data?.map((sale) => STORE_MAP.add(sale[1]));
  const STORES = Array.from(STORE_MAP);
  return STORES;
};

export const fetchAllItems = (sale_data = []) => {
  const ITEM_MAP = new Set();
  sale_data?.map((sale) => ITEM_MAP.add(sale[6]));
  const ITEMS = Array.from(ITEM_MAP);
  return ITEMS;
};

export const fetchCumalativeSaleCount = (sale_data = [], dates, dispatch) => {
  const SALE_COUNT = new Map();
  let UNIT_SALE = 0;
  let firstDate = moment(dates[0], 'DD-MM-YY');
  const endDate = moment();
  const ALL_DATES = [];
  const SALE_DATA = {};
  let DAYWISE_SOLD = [];

  for (let i = firstDate; i <= endDate; i = moment(i).add(1, 'd')) {
    ALL_DATES.push(moment(i, 'DD-MM-YY').format('DD-MM-YY'));
  }

  if (sale_data?.length > 0) {
    ALL_DATES.map((date) => {
      sale_data?.map((sale) => {
        if (moment(date, 'DD-MM-YY').isSame(moment(sale[0], 'DD-MM-YY'))) {
          UNIT_SALE += +sale[2];
          SALE_COUNT.set(sale[0], UNIT_SALE);
        } else {
          UNIT_SALE += 0;
          SALE_COUNT.set(date, UNIT_SALE);
        }
      });
    });
  } else {
    ALL_DATES.map((date) => {
      UNIT_SALE = 0;
      SALE_COUNT.set(date, UNIT_SALE);
    });
  }

  Array.from(SALE_COUNT)?.map((item) => (SALE_DATA[item[0]] = item[1]));

  for (let key of Object.keys(SALE_DATA)) {
    DAYWISE_SOLD.push({ Date: key, Unit_Sold: SALE_DATA[key] });
  }
  DAYWISE_SOLD = DAYWISE_SOLD?.sort(
    (a, b) =>
      moment(a.Date, 'DD-MM-YY').format('DD-MM-YY') -
      moment(b.Date, 'DD-MM-YY').format('DD-MM-YY')
  );

  dispatch(setCumlativeUnits(DAYWISE_SOLD));
};

export const fetchCumalativeSaleAmount = (sale_data = [], dates, dispatch) => {
  const SALE_COUNT = new Map();
  let UNIT_AMT = 0;
  let firstDate = moment(dates[0], 'DD-MM-YY');
  const endDate = moment();
  const ALL_DATES = [];
  const SALE_DATA = {};
  let DAYWISE_SALE = [];

  for (let i = firstDate; i <= endDate; i = moment(i).add(1, 'd')) {
    ALL_DATES.push(moment(i, 'DD-MM-YY').format('DD-MM-YY'));
  }

  if (sale_data?.length > 0) {
    ALL_DATES.map((date) => {
      sale_data?.map((sale) => {
        if (moment(date, 'DD-MM-YY').isSame(moment(sale[0], 'DD-MM-YY'))) {
          UNIT_AMT += +sale[7];
          SALE_COUNT.set(sale[0], UNIT_AMT);
        } else {
          UNIT_AMT += 0;
          SALE_COUNT.set(date, UNIT_AMT);
        }
      });
    });
  } else {
    ALL_DATES.map((date) => {
      UNIT_AMT = 0;
      SALE_COUNT.set(date, UNIT_AMT);
    });
  }

  Array.from(SALE_COUNT)?.map((item) => (SALE_DATA[item[0]] = item[1]));

  for (let key of Object.keys(SALE_DATA)) {
    DAYWISE_SALE.push({ Date: key, Unit_Amt: SALE_DATA[key] });
  }
  DAYWISE_SALE = DAYWISE_SALE?.sort(
    (a, b) =>
      moment(a.Date, 'DD-MM-YY').format('DD-MM-YY') -
      moment(b.Date, 'DD-MM-YY').format('DD-MM-YY')
  );

  dispatch(setCumlativeSum(DAYWISE_SALE));
};

export const calculateDailyGMV = (arr, dispatch) => {
  let SALE =
    arr.length === 0 ? 0 : arr?.reduce((acc, curr) => (acc += curr[2]), 0);
  let GMV =
    arr.length === 0 ? 0 : arr?.reduce((acc, curr) => (acc += curr[7]), 0);

  dispatch(setAllUnitsSold(SALE));
  dispatch(setAllSaleAmount(GMV));
};
//  * DONE
const filterByStore = ({ filteredStores }, arr) => {
  if (filteredStores?.length > 0) {
    let filteredByStores = arr?.filter((sale) => {
      return filteredStores?.includes(sale[1]);
    });

    return filteredByStores;
  } else {
    return arr;
  }
};

// * DONE
const filterByItem = ({ filteredItems }, arr) => {
  if (filteredItems?.length > 0) {
    return arr?.filter((sale) => filteredItems.includes(sale[6]));
  } else {
    return arr;
  }
};

// * DONE.
export const filterByDate = ({ filterDuration }, arr) => {
  switch (filterDuration) {
    case 'This Week':
      const firstDayOfWeek = moment().startOf('week');
      const currDayOfWeek = moment().endOf('week');

      return arr?.filter((item) =>
        moment(item[0], 'DD-MM-YY').isBetween(
          moment(firstDayOfWeek, 'DD-MM-YY'),
          moment(currDayOfWeek, 'DD-MM-YY')
        )
      );

    case 'This Month':
      const firstDayOfMonth = moment().startOf('month');
      const currDayOfMonth = moment().endOf('month');

      return arr?.filter((item) =>
        moment(item[0], 'DD-MM-YY').isBetween(
          moment(firstDayOfMonth, 'DD-MM-YY'),
          moment(currDayOfMonth, 'DD-MM-YY')
        )
      );
    default:
      return arr;
  }
};

const applyFilters =
  (state, ...args) =>
  (datalist) => {
    return args.reduce((acc, curr) => {
      return curr(state, acc);
    }, datalist);
  };

export const getFilteredData = (filterState, data, dispatch) => {
  const res = applyFilters(
    filterState,
    filterByDate,
    filterByItem,
    filterByStore
  )(data);
  dispatch(setFilteredSaleData(res));
};

export const prepareSaleData = (sale_data, dispatch) => {
  const ALL_SALE_DATES = fetchAllDates(sale_data);
  const ALL_STORES = fetchAllStores(sale_data);
  const ALL_ITEMS = fetchAllItems(sale_data);

  dispatch(setAllDates(ALL_SALE_DATES));
  dispatch(setAllStores(ALL_STORES));
  dispatch(setAllItems(ALL_ITEMS));
};
