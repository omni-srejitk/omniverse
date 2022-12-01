import { useQuery } from '@tanstack/react-query';
import axios from '../axios';
import { cleanAllStoresData } from '../utils/helperFunctions';

export const fetchInventoryCount = (BRAND) => {
  return useQuery(
    ['inventory_count'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.total_inventory?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message,
    }
  );
};

export const fetchSalesData = (BRAND) => {
  return useQuery(['gmv_sale_data'], () => {
    return axios.get(
      `${import.meta.env.VITE_BASE_URL}` +
        `.gmv_sales_date_wise?brand=${encodeURI(BRAND)}`
    );
  });
};

export const fetchLiveStoreCount = (BRAND) => {
  return useQuery(
    ['livestore_count'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.total_live_store?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message[0][0],
    }
  );
};

export const fetchStoreImages = (BRAND) => {
  return useQuery(
    ['carousal_images'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.image_api?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message,
    }
  );
};

export const fetchDeployedQuantity = (BRAND) => {
  return useQuery(
    ['deployed_qty'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.deployed_quantity?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message,
    }
  );
};

export const fetchWarehouseQuantity = (BRAND) => {
  return useQuery(
    ['warehouse_qty'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.warehouse_quantity?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message,
    }
  );
};

export const fetchAllLiveStores = (BRAND) => {
  return useQuery(
    ['live-stores'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.stores_lives?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message,
    }
  );
};

export const fetchAllStoresData = (BRAND) => {
  return useQuery(
    ['customer_profile'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.customer_profile?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => cleanAllStoresData(data?.data?.message),
    }
  );
};

export const fetchDailyGMV = (BRAND) => {
  return useQuery(
    ['daily_gmv'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.calculate_gmv?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message,
    }
  );
};

// * Feat : New + Faster API
export const fetchDateWiseSales = (BRAND) => {
  return useQuery(
    ['datewise_sales'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.calculate_sales_date_wise?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message,
    }
  );
};

export const fetchAgeandGenderData = (BRAND) => {
  return useQuery(
    ['age_and_gender'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.age_and_gender?brand=${encodeURI(BRAND)}`
      );
    },
    {
      select: (data) => data?.data?.message,
    }
  );
};
