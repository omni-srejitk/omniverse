export const createStoreWiseInventory = (dailyGMVData, storeID) => {
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


  export const createStoreWiseSales = (dailyGMVData, storeID) => {
    const STORES = new Map();

    dailyGMVData?.map((sale) => {
      if (STORES.has(sale[1])) {
        return STORES.set(sale[1], STORES.get(sale[1]) + sale[7]);
      } else {
        return STORES.set(sale[1], sale[7]);
      }
    });

    const res = Object.fromEntries(STORES);

    return res[storeID];
  };

  export const createStoreWiseDeployed = (deployedQtyData, storeName) => {
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