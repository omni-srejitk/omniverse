import React from 'react';
import { useState } from 'react';
import { Modal, StoreModal } from '../../components';
import { StoreCard } from '../../components/Cards/StoreCard/StoreCard';
import { LABELS } from '../../components/Labels';
import MapComponent from '../../components/Map/MapComponent';
import { fetchAllStoresData } from '../../services/apiCalls';

export const Stores = () => {
  const [storeDetail, setStoreDetail] = useState({});
  const BRAND = localStorage.getItem('Name');

  const { data, isLoading: isAllStoresDataLoading } = fetchAllStoresData(BRAND);

  const ALL_STORES_DATA = !isAllStoresDataLoading && data;

  const [showModal, setShowModal] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [labels, setLabels] = useState({});

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
      <section className='relative mx-auto mb-36 flex h-[40rem] w-full flex-col items-center justify-between gap-8 lg:mb-0 lg:w-full lg:flex-row lg:items-start'>
        <div className='z-10 order-2 mx-auto flex h-full  max-h-screen flex-col items-start justify-start gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 lg:order-1 lg:w-[28rem] lg:pr-4 lg:pt-0'>
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
        <div className=' order-1 h-full w-full flex-grow overflow-hidden rounded-lg bg-white p-6 lg:right-0 lg:order-2 lg:w-1/2'>
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
            <StoreModal store={storeDetail} />
          </Modal>
        )}
      </section>
    </main>
  );
};
