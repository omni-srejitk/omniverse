import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Buttons';
import { Card } from '../../components/Cards/Card/Card';
import { StatCard } from '../../components/Cards/StatsCard/StatCard';
import { Filter } from '../../components/Filter/Filter';
import {
  TableBody,
  TableContainer,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/Table';
import {
  selectAllInventory,
  selectAllItems,
  selectAllStores,
  selectAllWarehouse,
  selectInventoryList,
  selectWarehouseList,
  setAllInventory,
  setAllInventoryList,
  setAllWarehouse,
  setAllWarehouseList,
} from '../../redux/features/dataSlice';
import {
  selectAllFilteredItems,
  selectAllFilteredStores,
} from '../../redux/features/filterSlice';
import {
  fetchDeployedQuantity,
  fetchWarehouseQuantity,
} from '../../services/apiCalls';

export const Inventory = () => {
  const BRAND = JSON.parse(localStorage.getItem('Name'));
  const [showState, setShowState] = useState({
    productFilter: false,
  });

  const [options, setOptions] = useState('ALL');

  const [stocklist, setStocklist] = useState({});

  const INVENTORY_COUNT = useSelector(selectAllInventory);
  const WAREHOUSE_COUNT = useSelector(selectAllWarehouse);
  const { isLoading: isInventoryLoading, data: inventoryRes } =
    fetchDeployedQuantity(BRAND);

  const { isLoading: isWarehouseLoading, data: warehouseRes } =
    fetchWarehouseQuantity(BRAND);

  const INVENTORY_LIST = !isInventoryLoading && inventoryRes?.data?.message;
  const WAREHOUSE_LIST = !isWarehouseLoading && warehouseRes?.data?.message;
  const FILTERED_ITEMS = useSelector(selectAllFilteredItems);
  const FILTERED_STORES = useSelector(selectAllFilteredStores);
  const dispatch = useDispatch();
  const ALLITEMS = useSelector(selectAllItems);
  const ALLSTORES = useSelector(selectAllStores);

  const applyInventoryFilters = (
    FILTERED_ITEMS,
    FILTERED_STORES,
    INVENTORY_LIST,
    WAREHOUSE_LIST
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
      ALL: [...INV_LIST, WARE_LIST],
      INVENTORY: [...INV_LIST],
      WAREHOUSE: [...WARE_LIST],
    });
  };

  useEffect(() => {
    if (!isInventoryLoading && !isWarehouseLoading) {
      applyInventoryFilters(
        FILTERED_ITEMS,
        FILTERED_STORES,
        INVENTORY_LIST,
        WAREHOUSE_LIST
      );
    }
  }, [
    FILTERED_ITEMS,
    FILTERED_STORES,
    isInventoryLoading,
    INVENTORY_LIST,
    isWarehouseLoading,
  ]);

  const FILTERS = {
    'By Product': ALLITEMS,
    'By Store': ALLSTORES,
  };

  const INVENTORY_FILTERS = (
    <Filter
      filter={FILTERS}
      showState={showState}
      setShowState={setShowState}
    />
  );

  const INVENTORY_OPTIONS = (
    <div className='flex h-fit w-fit flex-col items-center justify-between lg:flex-row'>
      <Button active={options === 'ALL'} clickFunc={() => setOptions('ALL')}>
        All
      </Button>
      <Button
        active={options === 'INVENTORY'}
        clickFunc={() => setOptions('INVENTORY')}
      >
        In Store
      </Button>
      <Button
        active={options === 'WAREHOUSE'}
        clickFunc={() => setOptions('WAREHOUSE')}
      >
        In Warehouse
      </Button>
    </div>
  );

  return (
    <main className='page__content'>
      <section className='h-fit w-full'>
        <h1 className='page__title'>Inventory</h1>
        <Card title='Overview' cardHeader={INVENTORY_FILTERS}>
          <div className='card_body flex h-fit  w-full gap-2 overflow-x-scroll scrollbar-thin lg:grid lg:grid-cols-3 lg:gap-4 '>
            <StatCard
              icon='inventory'
              title='In Stores'
              metric={INVENTORY_COUNT}
              loading={isInventoryLoading}
              background='bg-green-100'
              spinner={'border-green-200'}
              tooltip={'Total count of items in store.'}
            />
            <StatCard
              icon='warehouse'
              title='In Warehouse'
              metric={WAREHOUSE_COUNT}
              loading={isWarehouseLoading}
              tooltip={'Total count of items in warehouse.'}
              background='bg-blue-100'
              spinner={'border-blue-200'}
            />
            <StatCard
              icon='local_shipping'
              title='Total Shipped'
              metric={'0'}
              background='bg-gray-100'
              spinner={'border-purple-200'}
              showLabel
              tooltip={'Total count of items shipped.'}
            />
          </div>
        </Card>
      </section>
      <section className='my-8 mb-40 h-fit w-full lg:my-4'>
        <Card title={'Details'} cardHeader={INVENTORY_OPTIONS}>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableHeader>S. No</TableHeader>
                {options !== 'WAREHOUSE' && (
                  <TableHeader>Store Name</TableHeader>
                )}
                <TableHeader>Product Name</TableHeader>
                <TableHeader>SKU</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Category</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isInventoryLoading &&
              !isWarehouseLoading &&
              stocklist[options]?.length > 0 ? (
                stocklist[options]?.map(
                  ({ item_name, item_code, qty, customer_name }, idx) => (
                    <TableRow
                      key={`${item_name} + ${customer_name} + ${item_code}`}
                    >
                      <TableData>{idx + 1}</TableData>
                      {options !== 'WAREHOUSE' && (
                        <TableData>{customer_name || '-'}</TableData>
                      )}
                      <TableData>{item_name}</TableData>
                      <TableData>{item_code}</TableData>
                      <TableData>{qty}</TableData>
                      <TableData>
                        {customer_name ? (
                          <div
                            className='rounded-md bg-green-200 px-2 font-semibold
                          '
                          >
                            Inventory
                          </div>
                        ) : (
                          <div className='rounded-md bg-orange-200 px-2 font-semibold '>
                            Warehouse
                          </div>
                        )}
                      </TableData>
                    </TableRow>
                  )
                )
              ) : (
                <div className='flex h-[10rem] w-full flex-col items-center justify-center font-semibold text-gray-400'>
                  <p>No data found for the applied filters.</p>
                  <p>Please reset and try again.</p>{' '}
                </div>
              )}
            </TableBody>
          </TableContainer>
        </Card>
      </section>
    </main>
  );
};
