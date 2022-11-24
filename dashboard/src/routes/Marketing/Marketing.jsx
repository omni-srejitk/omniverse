import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormPage1 } from '../../components/Form/FormPage1';
import { FormPage2 } from '../../components/Form/FormPage2';
import { FormPage3 } from '../../components/Form/FormPage3';
import { FormPage4 } from '../../components/Form/FormPage4';
import { FormPage5 } from '../../components/Form/FormPage5';


export const Marketing = () => {

  const {register, handleSubmit, formState: { errors }} = useForm();
  const [isClicked, setIsClicked] = useState(false)
  const [collectedData, setCollectedData] = useState({})

  const pages = ['FormPage1','FormPage2','FormPage3','Formpage4','Formpage5'];
  const [page, setPage] = useState(1)
  const [campaignArray, setCampaignArray] = useState([])

  const onSubmit = (data) => {    
    console.log(data)
    setCollectedData(data)

  };  
  
  const nextPageEvent = () => {
    if(isClicked){
      setPage((curr) => curr + 1)
      console.log('page',page);
    } 
    else{
      alert('field is empty')
    }
  }  
  const prevPageEvent = () => {
    if(isClicked){
      setPage(curr => curr - 1)
      console.log('page',page);
    }
  }  

  return (
    <main className='page__content'>

      <form onSubmit={handleSubmit(onSubmit)} className='ml-32'>

        {page == 1 ?
          <FormPage1 register={register} isClicked={isClicked} setIsClicked={setIsClicked} campaignArray={campaignArray} setCampaignArray={setCampaignArray}/> 
          :
          page == 2 ? 
            <FormPage2 register={register} isClicked={isClicked} setIsClicked={setIsClicked}/> 
          :   
          page == 3 ? 
            <FormPage3 register={register} isClicked={isClicked} setIsClicked={setIsClicked}/>            
          : 
          page == 4 ? 
            <FormPage4 register={register} isClicked={isClicked} setIsClicked={setIsClicked} collectedData={collectedData}/> 
          : 
          page == 5 ? 
           <FormPage5 register={register} collectedData={collectedData}/>           
          : ''}
      
        <button className='mt-5 p-2 rounded-lg font-semibold bg-[#151D3B] text-[white]' onClick={() => prevPageEvent()} disabled={page == 0}>Previous</button>
        <button className='mt-5 ml-20 p-2 text-[#151D3B] border-[0.125rem] border-[#151D3B] rounded-lg font-semibold'>Save as draft</button>
        <button type="submit" className='mt-5 ml-20 p-2 rounded-lg font-semibold bg-[#151D3B] text-[white]' onClick={() => nextPageEvent()} disabled={page == pages.length}>Next Page</button>
        <button type="submit" className='mt-5 ml-20 p-2 rounded-lg font-semibold bg-[#151D3B] text-[white]' >Proceed</button>
      </form>
    </main>
  )
};

            // (campaignArray.includes('Sampling') ? 
            //   <FormPage3 register={register} isClicked={isClicked} setIsClicked={setIsClicked}/>: ''
            // )
// {/* <div className="text-danger mt-3">
//   {errors.campaignObjective?.type === 'required' &&
//     'Tell us what is your favourite food.'}
// </div> */}

// {page == 0 ?
//   <FormPage1 register={register} isClicked={isClicked} setIsClicked={setIsClicked}/> 
//   :
//   page == 1 ? 
//     <FormPage2 register={register} isClicked={isClicked} setIsClicked={setIsClicked}/> 
//     : 
//   ''
// }

// onClick={() => nextPageEvent()} disabled={page == pages.length - 1}


// {page == 0 ?
//   <div>
//     <div className='text-[#151D3B] font-semibold'>Choose campaign objectives</div>
//       <div className='flex flex-row w-[40rem] justify-between'>
//         <div className=" mt-4 p-[5rem] bg-red-200"> 
//           <label htmlFor="Sampling" className=''>
//             <input 
//               type="radio"
//               // name="Sampling"
//               name="campaignObjective"
//               onClick={() => checkForInput()}                
//               // value="Sampling"
//               // {...register('Sampling', { required: true })}
//               className="cursor-pointer"
//               {...register('Sampling')}
//             />{' '}
//             Sampling
//           </label>
//         </div>

//         <div className=" mt-4 p-[5rem] bg-red-200">
//           <label htmlFor="Flyers">
//             <input 
//               type="radio"
//               name="campaignObjective"
//               onClick={() => checkForInput()}
//               className="cursor-pointer"
//               {...register('Flyers')}
//             />{' '}
//             Flyers
//           </label>
//         </div>

//         <div className=" mt-4 p-[5rem] bg-red-200">
//           <label htmlFor="Discount">
//             <input 
//               type="radio"
//               name="campaignObjective"
//               onClick={() => checkForInput()}
//               className="cursor-pointer"
//               {...register('Discount')}
//             />{' '}
//             Discount/Offers
//           </label>
//         </div>
//       </div>

//       <label className='block mt-[5rem] w-[40rem]'>
//         Name your campaign
//         <input type='text' name='campaignName' {...register('campaignName', { required : true})} className='block w-[40rem] p-[0.5rem] mt-[0.5rem]' placeholder='type your text here '/>
//       </label> 
//     </div> 
//     :
//     page == 1 ?
//     <div>
//       <p className='mb-[3rem]'>Select duration of the campaign</p>
//       <div className='flex flex-row mb-[4rem]'>
//         <label className=''>
//           <input 
//           type='date'
//           name="startDate"
//           {...register('startDate')}  
//           />
//         </label>
//         <label className='ml-[8rem]'>
//           <input 
//           type='date'
//           name="endDate"
//           {...register('endDate')}
//           />
//         </label>
//       </div>
//       <label className='mb-[5rem]'>
//         <span className='text-[#151D3B] font-semibold mr-[1rem] '>Budget</span>
//         <input 
//         type='text'
//         name="budget"
//         {...register('budget')}
//         className="p-[0.25rem]"
//         placeholder='Enter your amount'
//         />        
//       </label>
//     </div>
//     : ''
//     }
