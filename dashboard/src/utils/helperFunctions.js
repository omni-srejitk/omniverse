import moment from 'moment';

export const prepareData = (salesData = []) => {
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
        };
        sale_count[date][item] += salesData[date][store_names][item][0];
      }
    }
    sale_count[date]['All'] = Object.values(sale_count[date]).reduce(
      (a, b) => (a += b),
      0
    );
    sale_count[date]['Cumalative'] = Object.values(sale_count)?.reduce(
      (acc, curr) => {
        return (acc += curr.All);
      },
      0
    );
  }

  stores = Array.from(stores);
  items = Array.from(items);

  return { dates, stores, items, prices, sale_count };
};

export const computeSalesNumber = (
  dates,
  stores,
  items,
  prices,
  salesData,
  sale_count
) => {
  const startDate = moment(dates[0], 'DD-MM-YY');
  const endDate = moment();
  let sales = 0;
  let gmv = 0;
  let j = 0;
  let cumlativeSalesReport = {};
  let items_count = {};

  console.log(stores);
  for (var i = startDate; i <= endDate; i = moment(i).add(1, 'd')) {
    if (i.isSame(moment(dates[j], 'DD-MM-YY'))) {
      const d = dates[j].format('DD-MM-YY');
      for (var store in salesData[d]) {
        let sum = 0;
        for (var item of items) {
          if (stores.includes(store) && item in salesData[d][store]) {
            sales += salesData[d][store][item][0];
            gmv += salesData[d][store][item][0] * prices[item];
            items_count[d] = {
              ...items_count[d],
              [item]: sum,
            };
            items_count[d][item] = sum + salesData[d][store][item][0];
          }
        }
      }
      j++;
    }
  }

  cumlativeSalesReport = {
    TOTAL_SALES: sales,
    TOTAL_GMV: gmv,
    SALE_COUNT: sale_count,
  };

  return { cumlativeSalesReport };
};
