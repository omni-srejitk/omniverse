import moment from 'moment';

export const prepareData = (salesData = [], filterDispatch) => {
  let stores = new Set();
  let items = new Set();
  const prices = {};
  const dates = [];
  const sale_count = {};
  for (let date in salesData) {
    dates.push(moment(date, 'DD-MM-YY'));
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

  filterDispatch({ type: 'SET_DATES', payload: dates });
  filterDispatch({ type: 'SET_ITEMS', payload: items });
  filterDispatch({ type: 'SET_STORES', payload: stores });
  filterDispatch({ type: 'SET_FILTERED_DATES', payload: dates });
  filterDispatch({ type: 'SET_FILTERED_ITEMS', payload: items });
  filterDispatch({ type: 'SET_FILTERED_STORES', payload: stores });

  return { dates, stores, items, prices, sale_count };
};

export const computeSalesNumber = (
  dates = [],
  stores = [],
  items = [],
  prices,
  salesData,
  sale_count
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
      const d = dates[j].format('DD-MM-YY');
      for (let store in salesData[d]) {
        for (let item of items) {
          if (stores.includes(store) && item in salesData[d][store]) {
            sales += salesData[d][store][item][0];
            UNIT_SALE = salesData[d][store][item][0];
            gmv += salesData[d][store][item][0] * prices[item];
            sale_count[d] = {
              ...sale_count[d],
              Sales: sales,
              GMV: gmv,
              Stores: [...sale_count[d]['Stores'], store],
              Items: [...sale_count[d]['Items'], item],
            };
          }
        }
      }
      j++;
    }

    checkThis[moment(i).format('DD-MM-YY')] = {
      TOTAL_SALES: sales,
      TOTAL_GMV: gmv,
      UNIT_SALE,
      // ITEMS_SOLD: sale_count[moment(i).format('DD-MM-YY')]
      //   ? sale_count[moment(i).format('DD-MM-YY')]?.Items
      //   : [],
      // SALE_STORES: sale_count[moment(i).format('DD-MM-YY')]
      //   ? sale_count[moment(i).format('DD-MM-YY')]?.Stores
      //   : [],
      // CUMALATIVE: sale_count[moment(i).format('DD-MM-YY')]
      //   ? sale_count[moment(i).format('DD-MM-YY')]?.Cumalative
      //   : 0,
      // ALL: sale_count[moment(i).format('DD-MM-YY')]
      //   ? sale_count[moment(i).format('DD-MM-YY')]?.All
      //   : 0,
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

  let GRAPHDATA = [];

  for (let key of Object.keys(sale_count)) {
    GRAPHDATA.push({ Date: key, ...sale_count[key] });
  }
  GRAPHDATA = GRAPHDATA?.sort(
    (a, b) =>
      moment(a.Date, 'DD-MM-YY').format('DD-MM-YY') -
      moment(b.Date, 'DD-MM-YY').format('DD-MM-YY')
  );

  cumlativeSalesReport = {
    TOTAL_SALES: sales,
    TOTAL_GMV: gmv,
    SALE_DATA: GRAPHDATA,
    GRAPH_DATA: SALES_DATA,
  };

  console.log('Sales Report', checkThis);

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
