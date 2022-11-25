import React from 'react';

export const StoreLabels = ({ TAGS }) => {
  const SUPER_POPULAR = (
    <div
      className={`flex items-center justify-between gap-2 whitespace-pre break-words rounded-md bg-yellow-100 p-2`}
    >
      <span className='material-icons flex h-6 w-6 items-center justify-center rounded-full bg-white py-1 text-sm text-yellow-300'>
        favorite
      </span>
      <p className='font-medium'>Super Popular</p>
    </div>
  );

  const HIGH_FOOTFALL = (
    <div
      className={`flex items-center justify-between gap-2 whitespace-pre break-words rounded-md bg-purple-100 p-2`}
    >
      <span className='material-icons flex h-6 w-6 items-center justify-center rounded-full bg-white py-1 text-sm text-purple-300'>
        groups_2
      </span>
      <p className='font-medium'>High Footfall</p>
    </div>
  );

  const POSH_LOCALITY = (
    <div
      className={`flex items-center justify-between gap-2 whitespace-pre break-words rounded-md bg-pink-100 p-2`}
    >
      <span className='material-icons flex h-6 w-6 items-center justify-center rounded-full bg-white py-1 text-sm text-pink-300'>
        attach_money
      </span>
      <p className='font-medium'>Posh Locality</p>
    </div>
  );

  const IN_SOCIETY = (
    <div
      className={`flex items-center justify-between gap-2 whitespace-pre break-words rounded-md bg-pink-100 p-2`}
    >
      <span className='material-icons flex h-6 w-6 items-center justify-center rounded-full bg-white py-1 text-sm text-pink-300'>
        apartment
      </span>
      <p className='font-medium'>In Society</p>
    </div>
  );

  const HIGH_AOV = (
    <div
      className={`flex items-center justify-between gap-2 whitespace-pre break-words rounded-md bg-red-100 p-2`}
    >
      <span className='material-icons flex h-6 w-6 items-center justify-center rounded-full bg-white py-1 text-sm text-red-300'>
        home
      </span>
      <p className='font-medium'>In Society</p>
    </div>
  );

  return (
    <div className='flex items-center justify-start gap-4'>
      {TAGS.IFPOSH && POSH_LOCALITY}
      {TAGS.HIGH_FOOTFALL && HIGH_FOOTFALL}
      {TAGS.SUPER_POPULAR && SUPER_POPULAR}
    </div>
  );
};
