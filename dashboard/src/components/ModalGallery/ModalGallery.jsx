import React, { useEffect, useState } from 'react';
import { fetchStoreImages } from '../../services/apiCalls';
import { Spinner } from '../Loaders';

export const ModalGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let MAX_LENGTH = 5;
  const IMAGES_LOADED = 5;
  const BRAND = JSON.parse(localStorage.getItem('Name'));
  const { isLoading: ImageLoading, data: ImageData } = fetchStoreImages(BRAND);

  const IMG_DATA = !ImageLoading && ImageData?.data['message'];

  const handleClick = (type) => {
    if (type === 'NEXT') {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (currentIndex > MAX_LENGTH && currentIndex < IMG_DATA?.length - 1) {
      MAX_LENGTH += IMAGES_LOADED;
    } else if (
      currentIndex > MAX_LENGTH &&
      currentIndex === IMG_DATA?.length - 1
    ) {
      MAX_LENGTH = IMAGES_LOADED;
      setCurrentIndex(0);
    }
    if (currentIndex < 0) {
      setCurrentIndex(MAX_LENGTH);
    }
  }, [currentIndex]);

  return (
    <div className='relative z-10 flex h-full max-h-full w-full flex-col items-center justify-start overflow-hidden rounded-lg'>
      <div className='absolute top-1/2 z-40 mb-4 flex w-full -translate-y-1/2 items-center justify-between overflow-hidden lg:static lg:top-0 lg:order-2 lg:h-fit lg:translate-y-0'>
        {!ImageLoading && Object.keys(IMG_DATA)?.length > 1 ? (
          <div className='z-40 flex h-14 w-full items-center justify-between gap-4 px-6 lg:mt-6 lg:px-0'>
            <button
              className={`z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-400 disabled:bg-gray-100 disabled:text-gray-400 hover:border-gray-400 hover:bg-gray-100 hover:text-black`}
              onClick={() => handleClick('PREVIOUS')}
              disabled={currentIndex === 0 ? true : false}
            >
              <span className='material-icons m-0 p-0 '>chevron_left</span>
            </button>
            <button
              disabled={Object.keys(IMG_DATA)?.length - 1 === currentIndex}
              className={`z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-400 disabled:bg-gray-100 disabled:text-gray-400 hover:border-gray-400 hover:bg-gray-100 hover:text-black`}
              onClick={() => handleClick('NEXT')}
            >
              <span className='material-icons m-0 p-0 text-gray-400'>
                chevron_right
              </span>
            </button>
          </div>
        ) : null}
      </div>
      <div className='relative z-30 flex h-full w-full flex-grow overflow-hidden rounded-xl'>
        {ImageLoading ? (
          <Spinner
            color={'border-blue-200'}
            position={'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}
            loading={ImageLoading}
          />
        ) : (
          <div
            className={`flex h-full w-full flex-grow items-center justify-center gap-4 overflow-hidden lg:left-0 lg:top-0 lg:bottom-0`}
          >
            {!ImageLoading && Object.keys(IMG_DATA)?.length > 0 ? (
              <img
                className='z-10 h-full w-full rounded-xl object-cover'
                src={
                  !ImageLoading &&
                  IMG_DATA[currentIndex]['status'] &&
                  IMG_DATA[currentIndex]['image']
                }
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center'>
                <div className='flex flex-col items-center justify-center gap-4'>
                  <span className='material-icons flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-4xl text-gray-400'>
                    camera_enhance
                  </span>
                  <p className=' text-center text-xl'>Come back soon.</p>
                  <p className=' text-center font-semibold text-gray-500'>
                    We're currently curating pictures for your products.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
