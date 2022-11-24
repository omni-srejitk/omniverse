import React from 'react'

export const FormPage2 = ({register}) => {
  return (
    <div>
      <p className='mb-[3rem]'>Select duration of the campaign</p>
      <div className='flex flex-row mb-[4rem]'>
        <label className=''>
          <input 
          type='date'
          name="startDate"
          {...register('startDate')}  
          />
        </label>
        <label className='ml-[8rem]'>
          <input 
          type='date'
          name="endDate"
          {...register('endDate')}
          />
        </label>
      </div>
      <label className='mb-[5rem]'>
        <span className='text-[#151D3B] font-semibold mr-[1rem] '>Budget</span>
        <input 
        type='text'
        name="budget"
        {...register('budget')}
        className="p-[0.25rem]"
        placeholder='Enter your amount'
        />        
      </label>
    </div>
  )
}
