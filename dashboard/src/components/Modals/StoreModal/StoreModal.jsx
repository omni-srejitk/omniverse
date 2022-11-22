import React from 'react';
import { ModalGallery } from '../../ModalGallery/ModalGallery';

export const StoreModal = ({ store }) => {
  return (
    <div className='z-10 flex h-full w-full flex-col items-center justify-start lg:flex-row lg:items-start lg:justify-between'>
      <div className='flex h-[15rem] w-full justify-center rounded-xl lg:my-10 lg:mx-10 lg:h-[440px] lg:w-[225px]'>
        <ModalGallery />
      </div>
      <div className='flex flex-col'>
        <h1 className='mt-[30px] text-[30px] font-bold text-[#0D0D0D]'>
          Loyal World
        </h1>
        <div className='flex flex-row text-[20px] font-medium text-[#404040]'>
          <div className='mr-8'>Hypermarket</div>
          <div className=''>HSR Layout</div>
        </div>
        <div className='flex flex-row justify-evenly'>
          <div className='mr-8 mt-4 flex h-[74px] w-[175px] flex-col items-center justify-center rounded border-2 '>
            <div className='text-[24px] font-semibold leading-8 text-[#404040]'>
              24
            </div>
            <div className='text-base font-medium text-[#404040]'>
              Total Units Sold
            </div>
          </div>
          <div className='mr-8 mt-4 flex h-[74px] w-[175px] flex-col items-center justify-center rounded border-2'>
            <div className='text-[24px] font-semibold leading-8 text-[#404040]'>
              16
            </div>
            <div className='text-base font-medium text-[#404040]'>
              Currently in store
            </div>
          </div>
        </div>
        <div className='mt-2 flex flex-col border-b-4 pb-3 text-[14px]'>
          <div className='flex flex-row'>
            <h4 className='mr-[100px] text-[#737373]'>Aisles:</h4>
            <span className='#0D0D0D'>6</span>
          </div>
          <div className='flex flex-row'>
            <div className='mr-[30px] text-[#737373]'>Monthly Footfall:</div>
            <span className='#0D0D0D'>1540+</span>
          </div>
          <div className='flex flex-row'>
            <div className='mr-[50px] text-[#737373]'>Store Timings:</div>
            <span className='#0D0D0D'>6am - 9pm</span>
          </div>
        </div>
        <div className='mt-2 flex flex-col border-b-4 pb-4 text-[#404040]'>
          <div className='text-[16px] font-medium leading-6'>
            Few other Brands present in the store:
          </div>
          <div className='mt-2 flex flex-row text-[12px] font-medium leading-4'>
            <span className='mr-2 rounded bg-orange-200 p-1'>Hello</span>
            <span className='mr-2 rounded bg-sky-200 p-1'>Another Brand</span>
            <span className='mr-2 rounded bg-green-200 p-1'>
              Jimmy Cocktail
            </span>
            <span className='rounded bg-yellow-200 p-1'>Browny Bear</span>
          </div>
        </div>
        <h3 className='mt-4 text-base text-[#404040]'>Amenities</h3>
      </div>
    </div>
  );
};
