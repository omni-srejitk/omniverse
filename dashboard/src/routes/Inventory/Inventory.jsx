import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Filter,
  Spinner,
  StatCard,
  TableBody,
  TableContainer,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components';
import { usePrepareData } from '../../hooks/usePrepareData';

import {
  selectAllInventory,
  selectAllItems,
  selectAllWarehouse,
  selectAllFilteredItems,
  selectAllFilteredStores,
} from '../../redux/actions';

import {
  fetchDeployedQuantity,
  fetchWarehouseQuantity,
} from '../../services/apiCalls';
import { applyInventoryFilters } from '../../utils/helperFunctions';

export const Inventory = () => {
  const BRAND = localStorage.getItem('Name');
  const { isLoading: isInventoryLoading, data: inventoryRes } =
    fetchDeployedQuantity(BRAND);

  const { isLoading: isWarehouseLoading, data: warehouseRes } =
    fetchWarehouseQuantity(BRAND);
  const [showState, setShowState] = useState({
    productFilter: false,
  });
  const [options, setOptions] = useState('INVENTORY');
  const [stocklist, setStocklist] = useState({});
  const dispatch = useDispatch();

  const INVENTORY_LIST = !isInventoryLoading && inventoryRes;
  const WAREHOUSE_LIST = !isWarehouseLoading && warehouseRes;
  const INVENTORY_COUNT = useSelector(selectAllInventory);
  const WAREHOUSE_COUNT = useSelector(selectAllWarehouse);
  const FILTERED_ITEMS = useSelector(selectAllFilteredItems);
  const FILTERED_STORES = useSelector(selectAllFilteredStores);
  const ALLITEMS = useSelector(selectAllItems);
  const { isGMVLoading } = usePrepareData();
  useEffect(() => {
    if (!isInventoryLoading && !isWarehouseLoading) {
      applyInventoryFilters(
        FILTERED_ITEMS,
        FILTERED_STORES,
        INVENTORY_LIST,
        WAREHOUSE_LIST,
        dispatch,
        setStocklist
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
  };

  const INVENTORY_FILTERS = (
    <Filter
      filter={FILTERS}
      showState={showState}
      setShowState={setShowState}
    />
  );

  const INVENTORY_OPTIONS = (
    <div className='flex h-fit w-fit flex-row items-center justify-between'>
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
          {isInventoryLoading && isWarehouseLoading ? (
            <Spinner loading={isInventoryLoading && isWarehouseLoading} />
          ) : stocklist[options]?.length > 0 ? (
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
                </TableRow>
              </TableHead>
              <TableBody>
                {stocklist[options]?.map(
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
                    </TableRow>
                  )
                )}
              </TableBody>
            </TableContainer>
          ) : (
            <div className='flex h-[30rem] w-full flex-col items-center justify-center font-semibold text-gray-400'>
              <p>No data found for the applied filters.</p>
              <p>Please reset and try again.</p>{' '}
            </div>
          )}
        </Card>
      </section>
    </main>
  );
};
