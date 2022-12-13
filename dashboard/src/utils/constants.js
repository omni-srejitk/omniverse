import moment from 'moment';

export const SIDEBAR_LINKS = [
  {
    id: 1,
    icon: 'home',
    title: 'Dashboard',
    link: '/dashboard',
    active: true,
  },
  {
    id: 2,
    icon: 'inventory',
    title: 'Inventory',
    link: '/inventory',
    active: true,
  },
  {
    id: 3,
    icon: 'bar_chart',
    title: 'Analytics',
    link: '/analytics',
    active: true,
  },
  {
    id: 4,
    icon: 'shopping_bag',
    title: 'Stores',
    link: '/stores',
    active: false,
  },
  {
    id: 5,
    icon: 'podcasts',
    title: 'Marketing',
    link: '/marketing',
    active: false,
  },
];

export const DATE_FILTERS = [
  {
    id: 1,
    title: 'Lifetime',
    startDate: '',
    endDate: moment().format('DD-MM-YY'),
  },
  {
    id: 2,
    title: 'This Week',
    startDate: moment().startOf('week').format('DD-MM-YY'),
    endDate: moment().endOf('week').format('DD-MM-YY'),
  },
  {
    id: 3,
    title: 'Last Week',
    startDate: moment().subtract(1, 'week').startOf('week').format('DD-MM-YY'),
    endDate: moment().subtract(1, 'week').endOf('week').format('DD-MM-YY'),
  },
  {
    id: 4,
    title: 'This Month',
    startDate: moment().startOf('month').format('DD-MM-YY'),
    endDate: moment().subtract(1, 'week').endOf('month').format('DD-MM-YY'),
  },
  {
    id: 5,
    title: 'Last Month',
    startDate: moment()
      .subtract(1, 'month')
      .startOf('month')
      .format('DD-MM-YY'),
    endDate: moment().subtract(1, 'month').endOf('month').format('DD-MM-YY'),
  },
  {
    id: 6,
    title: 'Past 3 Months',
    startDate: moment()
      .subtract(3, 'month')
      .startOf('month')
      .format('DD-MM-YY'),
    endDate: moment().subtract(1, 'month').endOf('month').format('DD-MM-YY'),
  },
  {
    id: 7,
    title: 'Year to Date',
    startDate: moment().startOf('year').format('DD-MM-YY'),
    endDate: moment().format('DD-MM-YY'),
  },
  {
    id: 8,
    title: 'Custom Range',
    startDate: '',
    endDate: '',
  },
];
