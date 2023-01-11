import React from "react";
import { useState } from "react";
import { StoreCard } from "../../components/Cards/StoreCard/StoreCard";
import { LABELS } from "../../components/Labels";
import MapComponent from "../../components/Map/MapComponent";
import { Modal, StoreModal } from "../../components/Modals";
import {
  fetchAllStoresData,
  fetchDailyGMV,
  fetchDeployedQuantity,
} from "../../services/apiCalls";
import {
  createStoreWiseDeployed,
  createStoreWiseInventory,
  createStoreWiseSales,
} from "../../utils/storeFunctions";

export const Stores = () => {
  const [storeDetail, setStoreDetail] = useState({});
  const BRAND = localStorage.getItem("Name");

  const { data, isLoading: isAllStoresDataLoading } = fetchAllStoresData(BRAND);

  const ALL_STORES_DATA = !isAllStoresDataLoading && data;

  const [showModal, setShowModal] = useState(false);

  const checkPopularity = (rating, review_count) => {
    if (rating > 4 && review_count > 50) {
      return true;
    }

    return false;
  };

  const checkFootfall = (daily_footfall) => {
    if (daily_footfall > 250) {
      return true;
    }
    return false;
  };

  const checkIfPosh = (locality_area) => {
    if (locality_area === "Posh") {
      return true;
    }
    return false;
  };

  const checkForStoreTags = (store) => {
    const IFPOSH = checkIfPosh(store.locality_area);
    const HIGH_FOOTFALL = checkFootfall(store.daily_footfall);
    const SUPER_POPULAR = checkPopularity(store.rating, store.review_count);

    return {
      IFPOSH,
      HIGH_FOOTFALL,
      SUPER_POPULAR,
    };
  };

  const { isLoading: isCalculateGMVLoading, data: dailyGMVData } =
    fetchDailyGMV(BRAND);
  const { isLoading: isDeployedQtyLoading, data: deployedQtyData } =
    fetchDeployedQuantity(BRAND);

  const STORE_DEP = createStoreWiseDeployed(
    deployedQtyData,
    storeDetail.customer_name
  );

  const STORE_INV = createStoreWiseInventory(
    dailyGMVData,
    storeDetail.customer
  );

  const STORE_SALE = createStoreWiseSales(dailyGMVData, storeDetail.customer);

  return (
    <main className="page__content grid grid-cols-1 lg:grid-cols-2">
      <div className="mt-60 flex h-full w-full flex-col items-start justify-start gap-4 border-2 lg:mt-0 lg:justify-between">
        <h1 className="page__title">
          You're live in {ALL_STORES_DATA?.length} Stores!
        </h1>
        <section className="relative mx-auto mb-36 flex h-fit w-full flex-col items-center justify-between lg:mt-0">
          <div className="grid-rows-auto z-10 order-2 mx-auto grid h-full w-full grid-cols-1 flex-wrap items-start justify-start gap-4 ">
            {!isAllStoresDataLoading &&
              ALL_STORES_DATA?.map((store) => (
                <StoreCard
                  key={store.customer}
                  store={store}
                  tags={checkForStoreTags(store)}
                  label={LABELS.FLAGSHIP}
                  setShowModal={setShowModal}
                  showModal={showModal}
                  setStoreDetail={setStoreDetail}
                  showLabel
                />
              ))}
          </div>
        </section>
      </div>
      <div className="fixed z-30  h-[30vh] w-[90vw] overflow-hidden lg:right-0 lg:top-20 lg:h-[calc(100vh-5rem)] lg:w-[38vw]">
        <MapComponent
          storesData={ALL_STORES_DATA}
          showModal={showModal}
          setShowModal={setShowModal}
          setStoreDetail={setStoreDetail}
        />
      </div>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <StoreModal
            store={{
              ...storeDetail,
              STORE_INV,
              STORE_DEP,
              STORE_SALE,
            }}
          />
        </Modal>
      )}
    </main>
  );
};
