import React, { useState } from 'react'

export const FormPage4 = ({register,collectedData}) => {

	// console.log('collectedData',collectedData)
	const [discountMode , setDiscountMode] = useState('')
	// console.log('discountMode',discountMode);
  return (
	<div>
		<div className='mb-[1rem]'>
			<p className='font-bold text-[1.7rem] mb-[2rem]'>Upload Assets</p>
			<div className='w-[50rem] p-[2rem] bg-[white] rounded-xl'>
				<div>
					<p className='ml-12 m-4 font-bold text-[1.35rem]'>Offer:</p>
					<div className='flex flex-col m-[3rem] mt-4' {...register('offerType')}>
						<label className='m-2 ml-0 cursor-pointer'>
							<input type='radio' name='offerType' value='percent' onChange={(e) => setDiscountMode(e.target.value)} className='mr-4'/>
							<span className='font-semibold'>Percentage</span>
						</label>
						<label className='m-2 ml-0 cursor-pointer'>
							<input type='radio' name='offerType' value='Fixed Amount' onClick={(e) => setDiscountMode(e.target.value)} className='mr-4'/>
							<span className='font-semibold'>Fixed Amount</span>
						</label>
						<label className='m-2 ml-0 cursor-pointer'>
							<input type='radio' name='offerType' value='Buy X Get Y' onChange={(e) => setDiscountMode(e.target.value)} className='mr-4'/>
							<span className='font-semibold'>Buy X Get Y</span>
						</label>
					</div>

					<hr className="my-8 h-px bg-gray-200 border-2 dark:bg-gray-700"/>

					{discountMode == 'percent' ? 
						<div>
							<div className='m-[3rem]'>
								<p className='mb-2 font-bold text-[1.2rem]'>Value</p>
								<label>
									<p>Discount Value</p>
									<input type='text' name='discountPercent' {...register('discountPercent')} className='border-[3px]'/>
								</label>
							</div>
							<hr className="my-8 h-px bg-gray-200 border-2 dark:bg-gray-700"/>
							<div className='flex flex-col m-[3rem]'>
								<p className='font-bold text-[1.2rem]'>Applies to:</p>
								<label>                           
									<input type='radio' name='Applies to' {...register('Applies to')} value='All Products' className='mr-5 font-bold text-[1.2rem]'/>
									<span>All Products</span>
								</label>
								<label>                            
									<input type='radio' name='Applies to' {...register('Applies to')} value='Specific Products' className='mr-5 '/>
									<span className=''>Specific Products</span>
								</label>
							</div>
							<hr className="my-8 h-px bg-gray-200 border-2 dark:bg-gray-700"/>
						</div>

						:	discountMode == 'Fixed Amount' ? 

						<div>
							<div className='m-[3rem]'>
							<p className='mb-2 font-bold text-[1.2rem]'>Value</p>
								<label>
									<p>Discount Value</p>
									<input type='text' name='discountAmount' {...register('discountAmount')} className='border-[3px]'/>
								</label>
							</div>
							<hr className="my-8 h-px bg-gray-200 border-2 dark:bg-gray-700"/>
							<div className='flex flex-col m-[3rem]'>
								<p className='font-bold text-[1.2rem]'>Applies to:</p>
								<label>                           
									<input type='radio' name='Applies to' {...register('Applies to')} value='All Products' className='mr-[5]'/>
									<span>All Products</span>
								</label>
								<label>                            
									<input type='radio' name='Applies to' {...register('Applies to')} value='' className='mr-[5]'/>
									<span>Specific Products</span>
								</label>
							</div>
							<hr className="my-8 h-px bg-gray-200 border-2 dark:bg-gray-700"/>
						</div> 

						: discountMode == 'Buy X Get Y' ?

						<div>
							<div className='flex flex-col m-[3rem]'>
								<p className='mb-4 font-semibold text-[1.25rem]'>Customer Buys</p>
								<div className='flex flex-row'>
									<label>
										<p className='font-semibold mb-2'>Any Items from</p>
										<input type='text' name='customerBuysItem' className='border-[4px]' {...register('customerBuysItem')}/>
									</label>
									<label className='ml-[16rem]'>
										<p className='font-semibold mb-2'>Quantity</p>
										<input type='text' name='customerBuysItemQuantity' className='w-[5rem] border-[4px]' {...register('customerBuysItemQuantity')}/>
									</label>
								</div>
								<hr className="my-8 h-px bg-gray-200 border-2 dark:bg-gray-700"/>
								<p className='mt-[3rem] mb-4 font-semibold text-[1.25rem]'>Customer Gets</p>
								<div className='flex flex-row'>
									<label>
										<p className='font-semibold mb-2'>Any Items from</p>
										<input type='text' name='customerGetsItem' className='border-[4px]' {...register('customerGetsItem')}/>
									</label>
									<label className='ml-[16rem]'>
										<p className='font-semibold mb-2'>Quantity</p>
										<input type='text' name='customerGetsItemQuantity' className='w-[5rem] border-[4px]' {...register('customerGetsItemQuantity')}/>
									</label>
								</div>
								<hr className="my-8 h-px bg-gray-200 border-2 dark:bg-gray-700"/>
							</div>
						</div> 
						: ''
					}				
					
					<div className='m-12'>
						<p className='font-semibold text-[1.25rem] mb-4'>Tagline</p>
						<input type='text' name='Tagline' className='border-[4px] w-[35rem]' {...register('Tagline')}/>    
					</div>
				</div>             
			</div>
		</div>
	</div>
  )
}


//  <div className='flex flex-col m-[3rem]'>
// 						<p>Applies to:</p>
// 						<label>                           
// 							<input type='radio' name='Applies to' {...register('Applies to')} value='All Products' className='mr-[5]'/>
// 							<span>All Products</span>
// 						</label>
// 						<label>                            
// 							<input type='radio' name='Applies to' {...register('Applies to')} value='Specific Products' className='mr-[5]'/>
// 							<span>Specific Products</span>
// 						</label>
// 					</div> 
