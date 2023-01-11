import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
export const Accordian = ({ store }) => {
  const [expand, setExpand] = useState(false);
  const AccordianItem = ({ src, title, value, valid }) => {
    return (
      valid && (
        <div
          className='flex h-10 w-full items-center justify-start gap-2 border-b-2
       py-2 last:border-0 '
        >
          {' '}
          <div className=' flex h-6 w-6 items-center justify-center rounded-full bg-gray-200'>
            <img src={src} alt='Category Icon' />
          </div>
          <p className=' text-xs font-semibold capitalize'>{title}</p>
          <p className='ml-auto text-xs font-medium text-gray-400'>{value}</p>
        </div>
      )
    );
  };

  const ACCORDIAN_DATA = [
    {
      id: '1',
      src: '/src/assets/category_filled.svg',
      title: 'Category',
      value: store.sub_type,
      valid: store.sub_type ? true : false,
    },
    {
      id: '2',
      src: '/src/assets/clock.svg',
      title: 'Timing',
      value: store.store_timings,
      valid: store.store_timings ? true : false,
    },
    {
      id: '3',
      src: '/src/assets/copy.svg',
      title: 'Type',
      value: store.type,
      valid: store.type ? true : false,
    },
    {
      id: '4',
      src: '/src/assets/activity.svg',
      title: 'Monthly Footfall',
      value: store.daily_footfall * 30 + '+',
      valid: store.daily_footfall ? true : false,
    },
    {
      id: '5',
      src: '/src/assets/truck.svg',
      title: 'Delivery',
      value: store.delivery,
      valid: store.delivery ? true : false,
    },
    {
      id: '6',
      src: '/src/assets/building.svg',
      title: 'Area',
      value: store.area + ' sqft',
      valid: store.area ? true : false,
    },
    {
      id: '7',
      src: '/src/assets/zap.svg',
      title: 'Aisle count',
      value: store.asile,
      valid: store.asile ? true : false,
    },
    {
      id: '8',
      src: '/src/assets/layers.svg',
      title: 'Floor Count',
      value: store.number_of_floors,
      valid: store.number_of_floors ? true : false,
    },
  ];

  const ACCORDIAN_LIST = expand ? ACCORDIAN_DATA : ACCORDIAN_DATA?.slice(0, 4);

  return (
    <motion.div
      layout
      className={`mt-4 flex ${
        expand ? 'h-[23rem]' : 'h-[13rem]'
      } w-[15rem] flex-col rounded-md border-2 px-4 `}
    >
      {ACCORDIAN_LIST?.filter((val) => val.valid)?.length > 0 ? (
        ACCORDIAN_LIST?.map(({ src, id, title, value, valid }) => (
          <AccordianItem
            src={src}
            key={id}
            title={title}
            value={value}
            valid={valid}
          />
        ))
      ) : (
        <div className='my-2 flex h-full max-h-[13.75rem] min-h-[5.5rem] w-full flex-col items-center justify-center gap-4 rounded-md p-4 text-center'>
          <img src='src/assets/empty_box.svg' alt='Empty box' />
          <p className=' text-xs font-normal'>
            Sorry! Data is not available at the moment.
          </p>
        </div>
      )}
      {ACCORDIAN_LIST?.filter((val) => val.valid)?.length >= 4 && (
        <div
          onClick={() => setExpand((prev) => !prev)}
          className='my-2 ml-auto flex h-10 w-full justify-end text-xs font-medium text-blue-500 '
        >
          {expand ? 'less -' : 'more +'}
        </div>
      )}
    </motion.div>
  );
};
