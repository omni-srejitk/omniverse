import React from 'react';
import { useState } from 'react';
import { StoreCard } from '../../components/Cards/StoreCard/StoreCard';
import { LABELS } from '../../components/Labels';

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

  const [wishlist, setWishlist] = useState([]);

  console.log(wishlist);
  return (
    <main className='page__content'>
      <h1 className='page__title'>Stores</h1>
      <section className='relative flex h-[30rem] w-full flex-col items-start justify-between gap-8 lg:flex-row'>
        <div className='z-10 flex h-full max-h-screen  flex-col items-start justify-start gap-4 overflow-y-auto pt-[26rem] scrollbar-thin scrollbar-thumb-blue-200 lg:w-[28rem] lg:pr-4 lg:pt-0'>
          <StoreCard
            id='001'
            title={'Spencers Retail'}
            location={'HSR Layout'}
            type={'HyperMarket'}
            icon='store'
            tags={TAGS}
            label={LABELS.FLAGSHIP}
            showLabel
          />
          <StoreCard
            id='002'
            title={'Spencers Retail'}
            location={'HSR Layout'}
            type={'HyperMarket'}
            icon='store'
            tags={TAGS}
            label={LABELS.PLATINUM}
            showLabel
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
          <StoreCard
            id='003'
            title={'Spencers Retail'}
            location={'HSR Layout'}
            type={'HyperMarket'}
            icon='store'
            tags={TAGS}
            label={LABELS.GOLD}
            showLabel
          />
          <StoreCard
            title={'Spencers Retail'}
            location={'HSR Layout'}
            type={'HyperMarket'}
            icon='store'
            tags={TAGS}
            label={LABELS.DIAMOND}
            showLabel
          />
        </div>
        <div className=' h-full flex-grow rounded-lg bg-white lg:right-0 lg:w-1/2'>
          Hello
        </div>
      </section>
    </main>
  );
};
