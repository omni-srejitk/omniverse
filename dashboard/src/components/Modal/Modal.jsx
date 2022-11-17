import React from 'react'
// import ReactDOM  from 'react'
import ReactDOM from 'react-dom'
import { Carousal } from '../Carousal/Carousal'
import { ModalGallery } from '../ModalGallery/ModalGallery' 

export const Modal = ({
  open,
  children,
  onClose,
  obj
}) => {

  const modal_style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#FFF',
    padding: 0,
    zIndex: 1000
  }
  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right : 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 999
  }

//   let obj = {
//     storeDetails : {
//       storeName: "Multiplex Hypermarket",
//       storeType: "Supermarket",
//       storeAddress: "HSR Layout Bengaluru",
//       aisles: 6,
//       monthlyFootfall: 1500,
//       storeTiming: "10:30 AM to 10:30 PM"
//     },
//     unitDetails : {
//       unitsSold: 24,
//       inStore: 8,
//     },
//     brandsInStore : {
//       brands : ["Windgreens","Yoga bear","Jimmy Cocktail","Browny Bear"]
//     },

//   }
  let brands = obj.brandsInStore.brands.map((el,index) => {
    return <span className='rounded bg-orange-200 mr-2 p-1' key={index}>{el}</span>
  })
  if(!open) return null
  
    return ReactDOM.createPortal(
      <>
        <div style={OVERLAY_STYLES} className="m-0 p-0" onClick={onClose}>
          <div style={modal_style} className="flex flex-row w-[750px] h-[520px] m-0 p-0 rounded-lg" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute right-[3%] top-[3%] w-4 h-2 p-2 pt-0">X</button>
            <div className="w-[225px] h-[440px] my-[40px] mx-[40px] bg-slate-500 rounded-xl">
              <ModalGallery/>
            </div>
            <div className='flex flex-col'>           
              {/* <div className='text-[#0D0D0D] text-[30px] font-bold mt-[30px]'>Store Name</div> */}
              <div className='text-[#0D0D0D] text-[30px] font-bold mt-[30px]'>{obj.storeDetails.storeName}</div>
              <div className='text-[#404040] font-medium text-[20px] flex flex-row'>
                <div className='mr-8'>{obj.storeDetails.storeType}</div>
                <div className=''>{obj.storeDetails.storeAddress}</div>
              </div>
              <div className='flex flex-row justify-evenly'>
                <div className='flex flex-col justify-center items-center border-2 rounded w-[175px] h-[74px] mr-8 mt-4 '>
                  <div className='text-[#404040] font-semibold leading-8 text-[24px]'>{obj.unitDetails.unitsSold}</div>
                  <div className='text-[#404040] font-medium text-base'>Total Units Sold</div>
                </div>
                <div className='flex flex-col justify-center items-center border-2 rounded w-[175px] h-[74px] mr-8 mt-4'>
                  <div className='text-[#404040] font-semibold leading-8 text-[24px]'>{obj.unitDetails.inStore}</div>
                  <div className='text-[#404040] font-medium text-base'>Currently in store</div>
                </div>
              </div>
              <div className='flex flex-col mt-2 text-[14px] border-b-4 pb-3'>
                <div className='flex flex-row'>
                  <div className='mr-[100px] text-[#737373]'>Aisles:</div>
                  <span className='#0D0D0D'>{obj.storeDetails.aisles}</span>
                </div>
                <div className='flex flex-row'>
                  <div className='mr-[30px] text-[#737373]'>Monthly Footfall:</div>
                  <span className='#0D0D0D'>{obj.storeDetails.monthlyFootfall}+</span>
                </div>
                <div className='flex flex-row'>
                  <div className='mr-[50px] text-[#737373]'>Store Timings:</div>
                  <span className='#0D0D0D'>{obj.storeDetails.storeTiming}</span>
                </div>
              </div>
              <div className='text-[#404040] mt-2 flex flex-col border-b-4 pb-4'>
                <div className='font-medium text-[16px] leading-6'>Few other Brands present in the store:</div>
                <div className='font-medium text-[12px] flex flex-row leading-4 mt-2'>
                  {/* <span className='rounded bg-orange-200 mr-2 p-1'>{obj.brandsInStore.brands[0]}</span>
                  <span className='rounded bg-sky-200 mr-2 p-1'>{obj.brandsInStore.brands[1]}</span>
                  <span className='rounded bg-green-200 mr-2 p-1'>Jimmy Cocktail</span>
                  <span className='rounded bg-yellow-200 p-1'>Browny Bear</span> */}
                  {brands}
                </div>
              </div>
              <div className='text-base text-[#404040] mt-4'>Amenities</div>
              
              {children}
            </div>            
          </div>
          {/* </div> */}
        </div>
      </>,
      document.getElementById('portal')
    )
  
}


