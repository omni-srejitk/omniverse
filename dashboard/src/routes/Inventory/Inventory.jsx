import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useId } from 'react';
import { useState } from 'react';
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
import { useFilter } from '../../context/FilterContext/FilterContext';
import {
  fetchDeployedQuantity,
  fetchSalesData,
  fetchWarehouseQuantity,
} from '../../services/apiCalls';
import { prepareData } from '../../utils/helperFunctions';

export const Inventory = () => {
  const BRAND = JSON.parse(localStorage.getItem('Name'));
  const [showState, setShowState] = useState({
    productFilter: false,
  });
  const [stock, setStock] = useState({
    TOTAL_INVENTORY_STOCK: 0,
    TOTAL_WAREHOUSE_STOCK: 0,
  });

  const [options, setOptions] = useState('ALL');

  const [stocklist, setStockList] = useState({
    ALL: [],
    WAREHOUSE: [],
    INVENTORY: [],
  });

  const { isLoading: isInventoryLoading, data: inventoryRes } =
    fetchDeployedQuantity(BRAND);

  const { filterState, filterDispatch } = useFilter();
  const { isLoading: isWarehouseLoading, data: warehouseRes } =
    fetchWarehouseQuantity(BRAND);

  const INVENTORY_LIST = !isInventoryLoading && inventoryRes?.data?.message;

  const WAREHOUSE_LIST = !isWarehouseLoading && warehouseRes?.data?.message;

  const fetchTotalStock = (state, arr) => {
    if (state.FILTERED_STORES?.length > 0) {
      arr = arr.filter((item) =>
        state.FILTERED_STORES?.includes(item.customer_name)
      );
    }

    if (state.FILTERED_ITEMS?.length > 0) {
      arr = arr.filter((item) =>
        state.FILTERED_ITEMS?.includes(item.item_name)
      );
    }

    let res = arr.reduce((acc, curr) => (acc += curr.qty), 0);

    return res;
  };

  const updateList = (state, arr) => {
    if (state.FILTERED_STORES?.length > 0) {
      arr = arr.filter((item) =>
        state.FILTERED_STORES?.includes(item.customer_name)
      );
    }

    if (state.FILTERED_ITEMS?.length > 0) {
      arr = arr.filter((item) =>
        state.FILTERED_ITEMS?.includes(item.item_name)
      );
    }

    return arr;
  };

  useEffect(() => {
    let INVENTORY_STOCK =
      !isInventoryLoading && fetchTotalStock(filterState, INVENTORY_LIST);
    let WAREHOUSE_STOCK =
      !isWarehouseLoading && fetchTotalStock(filterState, WAREHOUSE_LIST);
    let INVENTORY_DATA =
      !isInventoryLoading && updateList(filterState, INVENTORY_LIST);
    let WAREHOUSE_DATA =
      !isWarehouseLoading && updateList(filterState, WAREHOUSE_LIST);

    if (!isInventoryLoading && !isWarehouseLoading) {
      setStockList({
        ...stocklist,
        ALL: [...INVENTORY_DATA, ...WAREHOUSE_DATA],
        WAREHOUSE: WAREHOUSE_DATA,
        INVENTORY: INVENTORY_DATA,
      });
      setStock({
        ...stock,
        TOTAL_INVENTORY_STOCK: INVENTORY_STOCK,
        TOTAL_WAREHOUSE_STOCK: WAREHOUSE_STOCK,
      });
    }
  }, [
    isInventoryLoading,
    isWarehouseLoading,
    INVENTORY_LIST,
    WAREHOUSE_LIST,
    filterState,
  ]);

  //   * Table Logics

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

  const { isLoading: isGMVDataLoading, data: gmvSaleRes } =
    fetchSalesData(BRAND);

  const GMV_SALES_DATA = !isGMVDataLoading && gmvSaleRes?.data['message'];

  var { items, stores } = useMemo(
    () => prepareData(GMV_SALES_DATA, filterDispatch),
    [GMV_SALES_DATA]
  );
  const FILTERS = {
    'By Product': items,
    'By Store': stores,
  };

  const INVENTORY_FILTERS = (
    <Filter
      filter={FILTERS}
      showState={showState}
      setShowState={setShowState}
    />
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
              metric={stock.TOTAL_INVENTORY_STOCK || 0}
              loading={isInventoryLoading}
              background='bg-green-100'
              spinner={'border-green-200'}
              tooltip={'Total count of items in store.'}
            />
            <StatCard
              icon='warehouse'
              title='In Warehouse'
              metric={stock.TOTAL_WAREHOUSE_STOCK || 0}
              loading={isWarehouseLoading}
              tooltip={'Total count of items in warehouse.'}
              background='bg-blue-100'
              spinner={'border-blue-200'}
            />
            {/* //TODO Add this metric later on */}
            <StatCard
              icon='local_shipping'
              title='Total Shipped'
              metric={'0'}
              background='bg-purple-100'
              spinner={'border-purple-200'}
              showLabel
              tooltip={'Total count of items shipped.'}
            />
          </div>
        </Card>
      </section>
      <section className='my-8 h-fit w-full'>
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
                )}
            </TableBody>
          </TableContainer>
        </Card>
      </section>
    </main>
  );
};
