import { QueryClient, useQueries, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { queryClient } from '../../main';
import { Card } from '../Cards/Card/Card';
import { encode } from 'blurhash';

export const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let MAX_LENGTH = 5;
  const IMAGES_LOADED = 5;

  const { isLoading: ImageLoading, data: ImageData } = useQuery(
    ['carousal_images'],
    () => {
      return axios.get(
        'https://engine.omniflo.in/api/method/omniflo_lead.omniflo_lead.api.frappe_api.image_api?brand=mezmo%20candy'
      );
    }
  );

  const loadImage = async (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (...args) => reject(args);
      img.src = axios.get(src);
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
  // useEffect(() => {
  //   console.log(encodeImage(IMG_DATA[currentIndex]?.image));
  // }, [IMG_DATA, currentIndex]);

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
    <Card title='Showcase' classes={'row-span-2 flex-grow order-2 lg:order-3'}>
      <div className='row-span-2 h-[50rem] overflow-hidden rounded-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-medium capitalize'>
              {!ImageLoading && IMG_DATA[currentIndex]['customer']}
            </h2>
          </div>
          <div className='flex w-fit items-center justify-between gap-4'>
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
        </div>
        {!ImageLoading && (
          <div className='relative h-full w-full overflow-hidden rounded-xl'>
            <div
              className={`flex h-full w-full items-start justify-center  ${IMG_DATA[currentIndex]} `}
            >
              <img
                className='aspect-auto w-full object-cover  '
                src={
                  !ImageLoading &&
                  IMG_DATA[currentIndex]['status'] &&
                  IMG_DATA[currentIndex]['image']
                }
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
