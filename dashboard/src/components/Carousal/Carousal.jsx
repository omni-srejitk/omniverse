import React, { useEffect, useState } from 'react';
import { Card } from '../Cards/Card/Card';

export const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageList = ['bg-red-300', 'bg-blue-400', 'bg-yellow-300'];

  const handleClick = (type) => {
    if (type === 'NEXT') {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (currentIndex > imageList.length - 1) {
      setCurrentIndex(0);
    }
    if (currentIndex < 0) {
      setCurrentIndex(imageList.length - 1);
    }
  }, [currentIndex]);

  return (
    <Card title='Showcase'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-medium'>Store Title</h2>
        </div>
        <div className='flex w-fit items-center justify-between gap-4'>
          <button
            className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 hover:bg-gray-300'
            onClick={() => handleClick('PREVIOUS')}
          >
            <span className='material-icons m-0 p-0 text-gray-400'>
              chevron_left
            </span>
          </button>
          <button
            className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 hover:bg-gray-300'
            onClick={() => handleClick('NEXT')}
          >
            <span className='material-icons m-0 p-0 text-gray-400'>
              chevron_right
            </span>
          </button>
        </div>
      </div>

      <div className='relative h-80 w-full overflow-hidden rounded-xl bg-red-500'>
        <div
          className={`absolute inset-0 flex items-center justify-center ${imageList[currentIndex]} `}
        >
          Image {currentIndex}
        </div>
      </div>
    </Card>
  );
};
