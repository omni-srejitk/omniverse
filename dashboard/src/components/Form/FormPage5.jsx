import React, { useState } from 'react'

export const FormPage5 = ({register, campaignArray}) => {
  return (
    <div>
     
      <p className='font-bold text-[1.7rem] mb-[2rem]'>Upload Assets</p>
      <div className='bg-white pt-[2rem] pb-7 px-[5rem] rounded-2xl mb-8'>
        <p className=' font-bold text-[1.5rem]'>Flyers</p>
        <input name='flyerImage' type='file' {...register('flyerImage')}/>
        <button className='m-8'>Upload</button>
      </div>      
    </div>
  )
}
