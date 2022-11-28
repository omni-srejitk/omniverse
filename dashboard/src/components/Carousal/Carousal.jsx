import React, { useEffect, useState } from 'react';
import { reduceImages } from '../../utils/helperFunctions';
import { Spinner } from '../Loaders';
import { encode } from 'blurhash';

export const Carousal = ({ src, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  let MAX_LENGTH = 5;
  const IMAGES_LOADED = 5;

  const handleClick = (type) => {
    if (type === 'NEXT') {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!loading) {
      reduceImages(src, setImages);
    }
  }, [src, loading]);

  useEffect(() => {
    if (!loading && currentIndex > MAX_LENGTH) {
      MAX_LENGTH += IMAGES_LOADED;
    }
    if (
      currentIndex > MAX_LENGTH &&
      !loading &&
      currentIndex === Object.keys(src)?.length - 1
    ) {
      MAX_LENGTH = IMAGES_LOADED;
      setCurrentIndex(0);
    }
    if (!loading && currentIndex > Object.keys(src)?.length - 1) {
      setCurrentIndex(0);
    }
    if (!loading && currentIndex < 0) {
      const PICS_LENGTH = Object.keys(src)?.length - 1;
      setCurrentIndex(PICS_LENGTH);
    }
  }, [currentIndex]);

  const loadImage = async (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (...args) => reject(args);
    });

  const getImageData = (image) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  };

  const encodeImageToBlurhash = async (imageUrl) => {
    const image = await loadImage(imageUrl);
    const imageData = getImageData(image);
    return encode(imageData.data, imageData.width, imageData.height, 4, 4);
  };

  // !Fix : Getting CORS Error
  // useEffect(() => {
  //   if (images?.length > 0) {
  //     let temp = images.map((item) => loadImage(item.image));
  //     console.log(temp);
  //   }
  // }, [images]);

  return (
    <div className='flex h-full max-h-full flex-col items-center justify-start overflow-hidden rounded-lg pb-20'>
      <div className='mb-4 flex w-full items-center justify-between overflow-hidden'>
        <div>
          {!loading && Object.keys(images)?.length > 0 ? (
            <h2 className='text-xl font-medium capitalize'>
              {loading ? 'Loading...' : images[currentIndex]['customer']}
            </h2>
          ) : null}
        </div>
        {!loading && Object.keys(images)?.length > 1 ? (
          <div className='flex h-14 w-fit items-center justify-between gap-4'>
            <button
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 disabled:bg-gray-100 disabled:text-gray-300 hover:bg-gray-300`}
              onClick={() => handleClick('PREVIOUS')}
              disabled={currentIndex === 0 ? true : false}
            >
              <span className='material-icons m-0 p-0 '>chevron_left</span>
            </button>
            <button
              disabled={Object.keys(images)?.length - 1 === currentIndex}
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
      <div className='relative flex h-full  w-full flex-grow overflow-hidden rounded-xl'>
        {loading ? (
          <Spinner
            color={'border-blue-200'}
            position={'top-1/2 left-1/2'}
            loading={loading}
          />
        ) : (
          <div
            className={` flex h-full w-full flex-grow justify-center gap-4 overflow-hidden `}
          >
            {!loading && Object.keys(images)?.length > 0 ? (
              <img
                className='z-10  h-full w-full rounded-xl object-cover'
                src={
                  !loading &&
                  images[currentIndex]['status'] &&
                  images[currentIndex]['image']
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
