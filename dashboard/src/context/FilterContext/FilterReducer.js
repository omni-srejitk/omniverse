export const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_DATE_FILTER':
      return { ...state, filterByDate: payload };
    case 'SET_FILTERS':
      const isFilterExisting = state.filterBy.includes(payload);
      if (isFilterExisting) {
        const removeFilter = state.filterBy.filter(
          (filter) => filter !== payload
        );
        return { ...state, filterBy: removeFilter };
      } else {
        return { ...state, filterBy: [...state.filterBy, payload] };
      }
    case 'SET_ITEMS':
      return { ...state, ITEMS: payload };
    case 'SET_STORES':
      return { ...state, STORES: payload };
    case 'SET_DATES':
      return { ...state, DATES: payload };
    case 'SET_FILTERED_ITEMS':
      return { ...state, FILTERED_ITEMS: payload };
    case 'SET_FILTERED_STORES':
      return { ...state, FILTERED_STORES: payload };
    case 'SET_FILTERED_DATES':
      return { ...state, FILTERED_DATES: payload };
    case 'SET_GMVDATA':
      return { ...state, gmv_data: payload };
    case 'CLEAR_ITEMS_FILTER':
      return { ...state, filterBy: payload };
    case 'CLEAR_FILTERED_ITEMS':
      return { ...state, FILTERED_ITEMS: payload };
    case 'CLEAR_FILTERED_STORES':
      return { ...state, FILTERED_STORES: payload };
    case 'CLEAR_FILTERED_DATES':
      return { ...state, FILTERED_DATES: payload };
    default:
      return state;
  }
};
