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

// TODO Seperate Store and Item Filtering
// const filterByStore = ({ filterBy }, array) => {
//   console.log({ filterBy, array });
//   if (filterBy?.length === 0) {
//     return array;
//   } else {
//     return array?.filter((item) =>
//       [...Object.keys(item)]?.some((filter) => filterBy?.includes(filter))
//     );
//   }
// };

const filterByItems = ({ filterBy }, array) => {
  if (filterBy?.length === 0) {
    return array;
  } else {
    return array?.filter((item) =>
      [...Object.keys(item)]?.some((filter) =>
        filterBy?.includes(
          (appliedFilters) => String(appliedFilters) === String(filter)
        )
      )
    );
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
  applyFilters(state, filterByDate, filterByItems)(datalist);
