import { QueryClient, useQueries, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { queryClient } from '../../main';
import { Card } from '../Cards/Card/Card';
import { encode } from 'blurhash';
import { Spinner } from '../Loaders/Spinner/Spinner';
import { fetchStoreImages } from '../../services/apiCalls';
import { useFilter } from '../../context/FilterContext/FilterContext';

export const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let MAX_LENGTH = 5;
  const IMAGES_LOADED = 5;
  const { filterState } = useFilter();

  const { isLoading: ImageLoading, data: ImageData } = fetchStoreImages(
    filterState.BRAND
  );

  const loadImage = async (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = (...args) => reject(args);
      img.src = src;
    });

  const getImageData = (image) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  };

  const encodeImage = async (url) => {
    const image = await loadImage(url);
    const imageData = getImageData(image);
    return encode(imageData.data, imageData.width, imageData.height, 4, 4);
  };
  // TODO Add Blurhash Support

  const IMG_DATA = !ImageLoading && ImageData?.data['message'];

  const handleClick = (type) => {
    if (type === 'NEXT') {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // const checkThis =
  //   !ImageLoading && encodeImage(IMG_DATA[currentIndex]['image']);

  // console.log(checkThis);

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
    <Card
      title='Showcase'
      classes={'row-span-4 flex-grow h-full col-span-1 order-3 lg:order-2'}
    >
      <div className='h-fit overflow-hidden rounded-lg'>
        <div className='items-center mb-4 flex justify-between'>
          <div>
            <h2 className='text-xl font-medium capitalize'>
              {!ImageLoading && IMG_DATA[currentIndex]['customer']}
            </h2>
          </div>
          <div className='items-center flex w-fit justify-between gap-4'>
            <button
              className={`items-center flex h-12 w-12 justify-center rounded-full border-2 border-gray-200 text-gray-400 disabled:bg-gray-100 disabled:text-gray-300 hover:bg-gray-300`}
              onClick={() => handleClick('PREVIOUS')}
              disabled={currentIndex === 0 ? true : false}
            >
              <span className='material-icons m-0 p-0 '>chevron_left</span>
            </button>
            <button
              className={`items-center flex h-12 w-12 justify-center rounded-full border-2 border-gray-200 hover:bg-gray-300`}
              onClick={() => handleClick('NEXT')}
            >
              <span className='material-icons m-0 p-0 text-gray-400'>
                chevron_right
              </span>
            </button>
          </div>
        </div>
        <div className='relative h-[30rem] w-full overflow-hidden rounded-xl bg-gray-50'>
          {ImageLoading ? (
            <Spinner
              color={'border-blue-200'}
              position={'top-1/2 left-1/2'}
              loading={ImageLoading}
            />
          ) : (
            <div
              className={`flex  w-full items-start justify-center  ${IMG_DATA[currentIndex]} `}
            >
              <img
                className='aspect-auto h-[30rem] w-full object-cover  '
                src={
                  !ImageLoading &&
                  IMG_DATA[currentIndex]['status'] &&
                  IMG_DATA[currentIndex]['image']
                }
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
