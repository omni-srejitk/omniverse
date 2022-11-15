import moment from 'moment';
const filterByDate = ({ filterByDate }, array) => {
  switch (filterByDate) {
    case 'This Week':
      const firstDayOfWeek = moment().startOf('week');
      const currDayOfWeek = moment().endOf('week');

      return array?.filter((item) =>
        moment(item.Date, 'DD-MM-YY').isBetween(
          moment(firstDayOfWeek, 'DD-MM-YY'),
          moment(currDayOfWeek, 'DD-MM-YY')
        )
      );

    case 'This Month':
      const firstDayOfMonth = moment().startOf('month');
      const currDayOfMonth = moment().endOf('month');

      return array?.filter((item) =>
        moment(item.Date, 'DD-MM-YY').isBetween(
          moment(firstDayOfMonth, 'DD-MM-YY'),
          moment(currDayOfMonth, 'DD-MM-YY')
        )
      );
    default:
      return array;
  }
};

const filterByStore = ({ filterBy }, array) => {
  if (filterBy?.length === 0) {
    return array;
  } else {
    return array?.filter((item) => {
      return item.Stores?.some((store) =>
        filterBy?.some(
          (appliedFilters) =>
            String(appliedFilters).toLowerCase() === store.toLowerCase()
        )
      );
    });
  }
};

const filterByItems = ({ filterBy }, array) => {
  if (filterBy?.length === 0) {
    return array;
  } else {
    return array?.filter((item) => {
      return item.Items?.some((item) =>
        filterBy?.some(
          (appliedFilters) =>
            String(appliedFilters).toLowerCase() === item.toLowerCase()
        )
      );
    });
  }
};

const applyFilters =
  (state, ...args) =>
  (datalist) => {
    return args.reduce((acc, curr) => {
      return curr(state, acc);
    }, datalist);
  };

export const getFilteredData = (state, datalist) =>
  applyFilters(state, filterByDate, filterByStore, filterByItems)(datalist);
