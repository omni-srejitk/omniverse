import React from 'react';
import { useState } from 'react';
import { StoreCard } from '../../components/Cards/StoreCard/StoreCard';
import { LABELS } from '../../components/Labels';
import { fetchAllStoresData } from '../../services/apiCalls';

export const Stores = () => {
  const [storeDetail, setStoreDetail] = useState({});
  const BRAND = localStorage.getItem('Name');

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
    if (locality_area === 'Posh') {
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

  return (
    <main className='page__content'>
      <h1 className='page__title'>Stores</h1>
      <section className='relative mx-auto mb-36 flex h-fit w-full flex-col items-center justify-between'>
        <div className='grid-rows-auto z-10 order-2 mx-auto grid h-full w-full grid-cols-1 flex-wrap items-start justify-start gap-4 lg:grid-cols-2'>
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
    </main>
  );
};
