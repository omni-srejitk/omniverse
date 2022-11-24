import React from 'react';
import { ModalGallery } from '../../ModalGallery/ModalGallery';

export const StoreModal = ({ store = {} }) => {
  const {
    customer_name,
    asile,
    daily_footfall,
    store_timings,
    sub_type,
    locality,
    brand_present,
    rating,
    review_count,
    STORE_INV,
    STORE_DEP,
  } = store;

  const BRAND_COLORS = [
    'bg-orange-200',
    'bg-blue-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
  ];

  return (
    <div className='z-10 flex h-full w-full flex-col items-center justify-start rounded-xl border-2 lg:flex-row lg:items-start lg:justify-between'>
      <div className='flex h-[15rem] w-full justify-center rounded-xl lg:my-10 lg:mx-10 lg:h-[440px] lg:w-[225px]'>
        <ModalGallery />
      </div>
      <div className='flex flex-grow flex-col'>
        <h1 className='mt-[30px] text-[30px] font-bold text-[#0D0D0D]'>
          {customer_name}
        </h1>
        <div className='flex flex-row text-[20px] font-medium text-[#404040]'>
          <div className='mr-2 text-base'>{sub_type} |</div>
          <div className='text-base'>{locality}</div>
          <div className='mx-4 ml-auto flex h-fit w-fit items-center justify-between gap-1 rounded-full bg-yellow-400 px-2 py-1 text-sm font-semibold'>
            <span className='material-icons text-sm text-yellow-600'>star</span>
            <span>{rating}</span> |
            <span className='material-icons text-sm text-yellow-600'>edit</span>
            <span>{review_count}</span>
          </div>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='mr-4 mt-4 flex h-[74px] w-full flex-col items-center justify-center rounded border-2 '>
            <div className='text-[24px] font-semibold leading-8 text-[#404040]'>
              {STORE_INV}
            </div>
            <div className='text-base font-medium text-[#404040]'>
              Total Units Sold
            </div>
          </div>
          <div className='mt-4 flex h-[74px] w-full flex-col items-center justify-center rounded border-2'>
            <div className='text-[24px] font-semibold leading-8 text-[#404040]'>
              {STORE_DEP}
            </div>
            <div className='text-base font-medium text-[#404040]'>
              Currently in store
            </div>
          </div>
        </div>
        <div className='mt-2 flex flex-col border-b-4 pb-3 text-[14px]'>
          <div className='flex w-80 flex-row justify-start'>
            <h4 className='w-full'>Aisles:</h4>
            <span className='w-full'>{asile}</span>
          </div>
          <div className='flex w-80 flex-row justify-start'>
            <div className='w-full text-[#737373]'>Monthly Footfall:</div>
            <span className='w-full'>{daily_footfall}</span>
          </div>
          <div className='flex w-80 flex-row justify-start'>
            <div className='w-full text-[#737373]'>Store Timings:</div>
            <span className='w-full'>
              {String(store_timings).trim() || '8am - 9pm'}
            </span>
          </div>
        </div>
        {/* //TODO TO be added in the next PR */}
        {/* <div className='mt-2 flex flex-col border-b-4 pb-4 text-[#404040]'>
          <div className='text-[16px] font-medium leading-6'>
            Few other Brands present in the store
          </div>
          <div className='mt-2 flex flex-row text-[12px] font-medium leading-4'>
            {brand_present &&
              brand_present['Chocolates']?.map((brand, idx) => (
                <span className={`mr-2 rounded ${BRAND_COLORS[idx]} p-1`}>
                  {brand}
                </span>
              ))}
          </div>
        </div>
        <h3 className='mt-4 text-base text-[#404040]'>Amenities</h3> */}
      </div>
    </div>
  );
};
