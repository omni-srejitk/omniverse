import React, { useEffect, useState } from 'react';
import { Spinner } from '../Loaders';

export const Carousal = ({ imagelist, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  let MAX_LENGTH = 4;
  let IMAGES_LOADED = 10;
  let INITIAL_SET = 0;
  const IMAGE_CACHE =
    !loading &&
    Object.values(imagelist)
      .slice(INITIAL_SET, IMAGES_LOADED)
      .map((img) => img.image);

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = img.onabort = function () {
        reject(src);
      };
      img.src = src;
    });
  };

  const handleClick = (type) => {
    if (type === 'NEXT') {
      setCurrentIndex((prev) => prev + 1);
      INITIAL_SET = IMAGES_LOADED;
      IMAGES_LOADED += MAX_LENGTH;
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!loading && currentIndex > MAX_LENGTH) {
      MAX_LENGTH += IMAGES_LOADED;
    }
    if (
      currentIndex > MAX_LENGTH &&
      !loading &&
      currentIndex === Object.keys(imagelist)?.length - 1
    ) {
      MAX_LENGTH = IMAGES_LOADED;
      setCurrentIndex(0);
    }
    if (!loading && currentIndex > Object.keys(imagelist)?.length - 1) {
      setCurrentIndex(0);
    }
    if (!loading && currentIndex < 0) {
      const PICS_LENGTH = Object.keys(imagelist)?.length - 1;
      setCurrentIndex(PICS_LENGTH);
    }
  }, [currentIndex]);

  useEffect(() => {
    let isCancelled = false;
    let imagesPromiseList = [];
    async function effect() {
      if (isCancelled) {
        return;
      }

      IMAGE_CACHE &&
        IMAGE_CACHE?.map((imageSrc) =>
          imagesPromiseList?.push(preloadImage(imageSrc))
        );

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, [IMAGE_CACHE, loading]);

  return (
    <div className='flex h-full max-h-full flex-col items-center justify-start overflow-hidden rounded-lg pb-20'>
      <div className='mb-4 flex w-full items-center justify-between overflow-hidden'>
        <div>
          {!loading && imagelist && Object.keys(imagelist)?.length > 0 ? (
            <h2 className='text-xl font-medium capitalize'>
              {loading ? 'Loading...' : imagelist[currentIndex]['customer']}
            </h2>
          ) : null}
        </div>
        {!loading && imagelist && Object.keys(imagelist)?.length > 1 ? (
          <div className='flex h-14 w-fit items-center justify-between gap-4'>
            <button
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 disabled:bg-gray-100 disabled:text-gray-300 hover:bg-gray-300`}
              onClick={() => handleClick('PREVIOUS')}
              disabled={currentIndex === 0 ? true : false}
            >
              <span className='material-icons m-0 p-0 '>chevron_left</span>
            </button>
            <button
              disabled={
                imagelist && Object.keys(imagelist)?.length - 1 === currentIndex
              }
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 disabled:bg-gray-100 disabled:text-gray-300 hover:bg-gray-300`}
              onClick={() => handleClick('NEXT')}
            >
              <span className='material-icons m-0 p-0 text-gray-400'>
                chevron_right
              </span>
            </button>
          </div>
        ) : null}
      </div>
      <div className='relative flex h-full min-h-[20rem]  w-full flex-grow overflow-hidden rounded-xl'>
        {!imagesPreloaded ? (
          <Spinner
            color={'border-blue-200'}
            position={'top-1/2 left-1/2'}
            loading={loading}
          />
        ) : (
          <div
            className={` flex h-full w-full flex-grow justify-center gap-4 overflow-hidden `}
          >
            {!loading &&
            imagesPreloaded &&
            Object.values(imagelist)?.length > 0 ? (
              <img
                className='z-10  h-full w-full rounded-xl object-cover'
                src={
                  !loading &&
                  imagesPreloaded &&
                  imagelist[currentIndex]['image']
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
