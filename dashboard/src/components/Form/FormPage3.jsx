import React from 'react'
import { useRef } from 'react'
import { FormPage4 } from './FormPage4'

export const FormPage3 = ({register, campaignArray}) => {

    let productOptionsref = useRef()
    let showProducts = () => {
        productOptionsref.current.style.display = 'block'
    }
    let DisardFunc = () => {
        productOptionsref.current.style.display = 'none'
    }
    let SelectFunc = () => {
        productOptionsref.current.style.display = 'none'
        console.log('register',register);
    }
  return (
    <div>
        <div className='mb-[1rem]'>
            <p className='font-bold text-[1.7rem] mb-[2rem]'>Upload Assets</p>
            <div className='w-[40rem] p-[2rem] bg-[white] h-[13rem] rounded-xl'>
            
                <p className='font-bold mb-3 text-[1.3rem]'>Sampling:</p> 
                <span className=''>Select Products: </span>
                <button className='px-[0.45rem] py-[0.25rem] rounded-lg ml-[2rem] bg-[#151D3B] text-[white]' onClick={() => showProducts()}>Products</button>
                <div ref={productOptionsref} className='hidden absolute bg-[white] ml-[15.5rem] border-[0.25rem] p-4'>
                    <label className='block'>
                        <input 
                        type='checkbox'
                        className='mr-2'
                        name='Product1'
                        {...register('Product1')}
                        />
                        Oreo Twist
                    </label>
                    <label>
                        <input 
                        type='checkbox'
                        className='mr-2'
                        name='Product2'
                        {...register('Product2')}
                        />
                        Cold Brew
                    </label>
                    <div className='flex flex-row'>
                        <button className='mr-[2rem] text-[#151D3B]' onClick={() => DisardFunc()}>Discard</button>
                        <button className='bg-[#151D3B] text-[white]' onClick={() => SelectFunc()}>Select</button>
                    </div>
                </div>
                <div className='mt-4'>
                    <label>
                        <span>Sales pitch:</span>
                        <input 
                        className='ml-[2rem] p-1' 
                        type='text' 
                        placeholder='Type here' 
                        name='salesPitch'
                        {...register('salesPitch')}
                        />
                    </label>
                </div>
                <p className='mt-3'>Hint: We'll share the Address to send the shipment after finalizing.</p>                
            </div>
        </div>
    </div>
  )
}
