import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';


export const FormPage1 = ({register, isClicked, setIsClicked,campaignArray,setCampaignArray}) => {
  // const {register, handleSubmit, formState: { errors }} = useForm();
  const checkForInput = (val) => {
    if(!isClicked){
      setIsClicked(true)
      console.log('clicked');
    } 
  }  
  // const [campaignArray, setCampaignArray] = useState([])
  // const setCampaign = () => {

  // }
  // console.log('campaignArray',campaignArray);

  return (
    <>
      <div className='text-[#151D3B] font-semibold'>Choose campaign objectives</div>
        <div className='flex flex-row w-[40rem] justify-between'>
          <div className=" mt-4 p-[5rem] bg-red-200"> 
            <label htmlFor="Sampling" className=''>
              <input 
                type="radio"
                name="Sampling"
                value='Sampling'
                // name="campaignObjective"
                onClick={(e) => {
                  checkForInput();
                  if( !campaignArray.includes(e.target.value)){
                    setCampaignArray([...campaignArray,e.target.value])
                  }
                }}                
                // value="Sampling"
                // {...register('Sampling', { required: true })}
                className="cursor-pointer"
                {...register('Sampling')}
              />{' '}
              Sampling
            </label>
          </div>

          <div className=" mt-4 p-[5rem] bg-red-200">
            <label htmlFor="Flyers">
              <input 
                type="radio"
                name="Flyers"
                value='Flyers'
                onClick={(e) => {
                  checkForInput();
                  if( !campaignArray.includes(e.target.value)){
                    setCampaignArray([...campaignArray,e.target.value])
                  }
                }}
                className="cursor-pointer"
                {...register('Flyers')}
              />{' '}
              Flyers
            </label>
          </div>

          <div className=" mt-4 p-[5rem] bg-red-200">
            <label htmlFor="Discount">
              <input 
                type="radio"
                name="Discount"
                value='Discount'
                onClick={(e) => {
                  checkForInput();
                  if( !campaignArray.includes(e.target.value)){
                    setCampaignArray([...campaignArray,e.target.value])
                  }
                }}
                className="cursor-pointer"
                {...register('Discount')}
              />{' '}
              Discount/Offers
            </label>
          </div>
        </div>

        <label className='block mt-[5rem] w-[40rem]'>
          Name your campaign
          <input type='text' name='campaignName' {...register('campaignName', { required : true})} className='block w-[40rem] p-[0.5rem] mt-[0.5rem]' placeholder='type your text here '/>
        </label>        
    </>
  )
}

