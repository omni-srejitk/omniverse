import React from 'react';
import { useState } from 'react';
import { Modal, StoreModal } from '../../components';
import { StoreCard } from '../../components/Cards/StoreCard/StoreCard';
import { LABELS } from '../../components/Labels';
import MapComponent from '../../components/Map/MapComponent';
import { fetchAllStoresData } from '../../services/apiCalls';

export const Stores = () => {
  const TAGS = [
    {
      id: 1,
      name: 'High Footfall',
      color: 'purple',
      icon: 'groups',
    },
    {
      id: 2,
      name: 'Super Popular',
      color: 'yellow',
      icon: 'favorite',
    },
    {
      id: 3,
      name: 'Organic',
      color: 'green',
      icon: 'spa',
    },
    {
      id: 4,
      name: 'In Society',
      color: 'teal',
      icon: 'other_houses',
    },
    {
      id: 5,
      name: 'Posh Locality',
      color: 'pink',
      icon: 'villa',
    },
  ];
  const [storeDetail, setStoreDetail] = useState({});
  const BRAND = localStorage.getItem('Name');

  const { data, isLoading: isAllStoresDataLoading } = fetchAllStoresData(BRAND);

  const ALL_STORES_DATA = !isAllStoresDataLoading && data;

  const [showModal, setShowModal] = useState(false);

  const [wishlist, setWishlist] = useState([]);

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
                tags={TAGS}
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
