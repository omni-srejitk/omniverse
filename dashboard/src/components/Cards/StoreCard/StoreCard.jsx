import React from 'react';
import { Button } from '../../Buttons';
import { TierLabel } from '../../Labels/TierLabels/TierLabels';

export const StoreCard = ({
  store,
  tags,
  label = 'FLAGSHIP',
  setShowModal,
  setStoreDetail,
  showLabel = true,
}) => {
  const { customer_name, sub_type, locality } = store;
  return (
    <div
      onClick={() => {
        setShowModal(true);
        setStoreDetail(store);
      }}
      className='relative w-full rounded-lg bg-white px-6 py-5'
    >
      <div className='flex items-center justify-start gap-6'>
        <div className='flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-100 '>
          <span className='material-icons  text-gray-600'>store</span>
        </div>
        <div>
          <h1
            title={customer_name}
            className='h-8 text-ellipsis text-lg font-semibold'
          >
            {customer_name}
          </h1>
          <p className='my-1 font-medium text-gray-400'>
            {`${sub_type} | ${locality}`}
          </p>
        </div>
      </div>
      <div className='my-4 flex h-fit w-full items-center justify-end gap-8'>
        <div className='flex flex-col items-center justify-between'>
          <Button type={'LOGO_BUTTON'} color='text-blue-400'>
            map
          </Button>
          <p>Navigate</p>
        </div>
        <div className='flex flex-col items-center justify-between'>
          <Button type={'LOGO_BUTTON'} color='text-blue-400'>
            bookmark
          </Button>
          <p>Save</p>
        </div>
      </div>
      <div className='mt-6 flex items-center gap-4'>
        <div className='flex w-1/2 flex-col gap-6  rounded-xl border-2 border-gray-200 bg-green-50 p-4 shadow-sm'>
          <div>
            <div className='flex w-fit items-center justify-between gap-2 whitespace-pre break-words'>
              <p className='text-sm font-semibold'>Total units sold</p>
              <span
                title={'Total units sold'}
                className='material-icons text-base'
              >
                info
              </span>
            </div>
            <h3 className='text-4xl font-semibold'>24</h3>
          </div>
        </div>
        <div className=' flex w-1/2 flex-col gap-6 rounded-xl border-2 border-gray-200 bg-blue-50 p-4 shadow-sm'>
          <div>
            <div className='flex w-fit items-center justify-between gap-2 whitespace-pre break-words'>
              <p className='text-sm font-semibold'>Currently in store</p>
              <span title={'Meh'} className='material-icons text-base'>
                info
              </span>
            </div>
            <h3 className='text-4xl font-semibold'>8</h3>
          </div>
        </div>
      </div>
      <div className='my-6 flex max-h-[8rem] flex-wrap items-center justify-start gap-2 overflow-hidden overflow-x-scroll scrollbar'>
        {tags?.slice(0, 3).map(({ id, name, icon, color }) => (
          <div
            className={`flex items-center justify-between gap-2 whitespace-pre break-words rounded-md bg-blue-100 px-1 py-1`}
            key={id}
          >
            <div className='flex h-4 w-4 items-center justify-center rounded-full'>
              {' '}
              <span className='material-icons text-sm text-blue-300'>
                {icon}
              </span>
            </div>
            <p className=' font-medium'>{name}</p>
          </div>
        ))}
        {tags?.slice(3)?.length > 0 ? `+${tags?.slice(3)?.length}` : ''}
      </div>
      {!showLabel && <TierLabel type={label} />}
      {/* //TODO FIX THIS LATER ON : The select stores and mail to Team feature  */}
      {/* {wishlist?.includes((store) => store?.id === id) ? (
        <div
          onClick={() =>
            setWishlist(wishlist?.filter((store) => store.id !== id))
          }
          className='absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500'
        >
          <span className='material-icons flex h-3 w-3 items-center justify-center rounded-full text-sm text-white'>
            check
          </span>
        </div>
      ) : (
        <div
          onClick={() => setWishlist([...wishlist, { id: id, title: title }])}
          className='absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-200 bg-white'
        ></div>
      )} */}
    </div>
  );
};
