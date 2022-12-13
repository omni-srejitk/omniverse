import React from 'react';
import {
  fetchDailyGMV,
  fetchDeployedQuantity,
} from '../../../services/apiCalls';
import { StoreLabels } from '../../Labels';
import { TierLabel } from '../../Labels/TierLabels/TierLabels';

export const StoreCard = ({
  store,
  tags = {},
  label = 'FLAGSHIP',
  setShowModal,
  setStoreDetail,
  showLabel = true,
}) => {
  const { customer_name, sub_type, locality } = store;
  const BRAND = localStorage.getItem('Name');
  const { isLoading: isCalculateGMVLoading, data: dailyGMVData } =
    fetchDailyGMV(BRAND);
  const { isLoading: isDeployedQtyLoading, data: deployedQtyData } =
    fetchDeployedQuantity(BRAND);
  const createStoreWiseInventory = (dailyGMVData, storeID) => {
    const STORES = new Map();

    dailyGMVData?.map((sale) => {
      if (STORES.has(sale[1])) {
        return STORES.set(sale[1], STORES.get(sale[1]) + sale[2]);
      } else {
        return STORES.set(sale[1], sale[2]);
      }
    });

    const res = Object.fromEntries(STORES);

    return res[storeID];
  };

  const createStoreWiseDeployed = (deployedQtyData, storeName) => {
    const STORES = new Map();
    deployedQtyData?.map((sale) => {
      if (STORES.has(sale.customer_name)) {
        return STORES.set(
          sale.customer_name,
          STORES.get(sale.customer_name) + sale.qty
        );
      } else {
        return STORES.set(sale.customer_name, sale.qty);
      }
    });
    const res = Object.fromEntries(STORES);

    return res[storeName];
  };

  const STORE_DEP = createStoreWiseDeployed(
    deployedQtyData,
    store.customer_name
  );

  const STORE_INV = createStoreWiseInventory(dailyGMVData, store.customer);

  const fetchStoreIcon = (type) => {
    if (type === 'Grocery store') {
      return (
        <span className='material-icons flex h-full w-full items-center justify-center text-blue-500'>
          storefront
        </span>
      );
    } else if (type === 'Supermarket') {
      return (
        <span className='material-icons flex h-full w-full items-center justify-center text-blue-500'>
          store
        </span>
      );
    } else if (type === 'Hypermarket') {
      return (
        <span className='material-icons flex h-full w-full items-center justify-center text-green-500'>
          shopping_cart
        </span>
      );
    } else if (type === 'Not Found' || type === undefined) {
      return (
        <span className='material-icons flex h-full w-full items-center justify-center text-orange-500'>
          local_mall
        </span>
      );
    } else {
      return (
        <span className='material-icons flex h-full w-full items-center justify-center text-yellow-500'>
          local_mall
        </span>
      );
    }
  };
  return (
    <div className='relative h-full w-full rounded-lg bg-white px-6 py-5'>
      <div className='flex w-full items-center justify-start'>
        <div className='ml-4 w-full overflow-hidden'>
          <h1
            title={customer_name}
            className='overflow-ellipsis whitespace-pre break-words text-lg font-semibold'
          >
            {customer_name}
          </h1>
        </div>
      </div>

      <div className='mt-4 flex h-fit w-full gap-4'>
        <div className='flex w-full flex-col items-center justify-center rounded-xl bg-gray-200/50'>
          <div className='h-14 w-14 rounded-full bg-white'>
            {fetchStoreIcon(sub_type)}
          </div>
          <p className='mt-4 w-full px-4 text-center font-semibold text-gray-600'>
            You'll soon see {customer_name} details here.
          </p>
        </div>
        <div className=' flex h-full w-full flex-col items-end justify-center gap-4'>
          <div className='flex w-full flex-col gap-6  rounded-xl border-2 border-gray-200 bg-green-50 p-4 shadow-sm'>
            <div>
              <div className='flex w-fit items-center justify-between gap-2 whitespace-pre break-words'>
                <p className='text-sm font-semibold'>Total units sold</p>
                <span
                  title={'Total units sold'}
                  className='material-icons text-base'
                >
                  info
                </span>
              </div>
              <h3 className='text-4xl font-semibold'>{STORE_INV || 0}</h3>
            </div>
          </div>
          <div className=' flex w-full flex-col justify-center gap-6 rounded-xl border-2 border-gray-200 bg-blue-50 py-4 px-2 shadow-sm'>
            <div>
              <div className='flex w-fit items-center justify-between gap-2 whitespace-pre break-words'>
                <p className='text-sm font-semibold'>Currently in store</p>
                <span
                  title={'The number of items currently in store'}
                  className='material-icons text-base'
                >
                  info
                </span>
              </div>
              <h3 className='text-4xl font-semibold'>{STORE_DEP || 0}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
