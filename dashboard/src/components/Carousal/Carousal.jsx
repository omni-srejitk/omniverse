import React, { useEffect, useState } from 'react';
import { Spinner } from '../Loaders/Spinner/Spinner';
import { fetchStoreImages } from '../../services/apiCalls';

export const Carousal = () => {
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
    <div className='flex h-full max-h-full flex-col items-center justify-start overflow-hidden rounded-lg pb-20'>
      <div className='mb-4 flex w-full items-center justify-between overflow-hidden'>
        <div>
          {!ImageLoading && Object.keys(IMG_DATA)?.length > 0 ? (
            <h2 className='text-xl font-medium capitalize'>
              {ImageLoading ? 'Loading...' : IMG_DATA[currentIndex]['customer']}
            </h2>
          ) : null}
        </div>
        {!ImageLoading && Object.keys(IMG_DATA)?.length > 0 ? (
          <div className='flex h-14 w-fit items-center justify-between gap-4'>
            <button
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 disabled:bg-gray-100 disabled:text-gray-300 hover:bg-gray-300`}
              onClick={() => handleClick('PREVIOUS')}
              disabled={currentIndex === 0 ? true : false}
            >
              <span className='material-icons m-0 p-0 '>chevron_left</span>
            </button>
            <button
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 hover:bg-gray-300`}
              onClick={() => handleClick('NEXT')}
            >
              <span className='material-icons m-0 p-0 text-gray-400'>
                chevron_right
              </span>
            </button>
          </div>
        ) : null}
      </div>
      <div className='relative flex h-full  w-full flex-grow overflow-hidden rounded-xl'>
        {ImageLoading ? (
          <Spinner
            color={'border-blue-200'}
            position={'top-1/2 left-1/2'}
            loading={ImageLoading}
          />
        ) : (
          <div
            className={`left-0 top-0 bottom-0 flex h-full w-full flex-grow justify-center gap-4 overflow-hidden `}
          >
            {!ImageLoading && Object.keys(IMG_DATA)?.length > 0 ? (
              <img
                className='z-10  h-full w-full rounded-xl object-cover'
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
