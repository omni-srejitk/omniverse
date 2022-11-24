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
					<p className='m-12'>Offer:</p>
					<div className='flex flex-col m-[3rem]' {...register('offerType')}>
						<label>
							<input type='radio' name='offerType' value='percent' onChange={(e) => setDiscountMode(e.target.value)} className='mr-[5]'/>
							<span>Percentage</span>
						</label>
						<label>
							<input type='radio' name='offerType' value='Fixed Amount' onClick={(e) => setDiscountMode(e.target.value)} className='mr-[5]'/>
							<span className='ml-[5]'>Fixed Amount</span>
						</label>
						<label>
							<input type='radio' name='offerType' value='Buy X Get Y' onChange={(e) => setDiscountMode(e.target.value)} className='mr-[5]'/>
							<span className='ml-[5]'>Buy X Get Y</span>
						</label>
					</div>

					{discountMode == 'percent' ? 
						<div>
							<div className='m-[3rem]'>
								<span>Value</span>
								<label>
									<p>Discount Value</p>
									<input type='text' name='discountPercent' {...register('discountPercent')} className='border-[3px]'/>
								</label>
							</div>
							<div className='flex flex-col m-[3rem]'>
								<p>Applies to:</p>
								<label>                           
									<input type='radio' name='Applies to' {...register('Applies to')} value='All Products' className='mr-[5]'/>
									<span>All Products</span>
								</label>
								<label>                            
									<input type='radio' name='Applies to' {...register('Applies to')} value='Specific Products' className='mr-[5]'/>
									<span>Specific Products</span>
								</label>
							</div>
						</div>

						:	discountMode == 'Fixed Amount' ? 

						<div>
							<div className='m-[3rem]'>
								<span>Value</span>
								<label>
									<p>Discount Value</p>
									<input type='text' name='discountAmount' {...register('discountAmount')} className='border-[3px]'/>
								</label>
							</div>
							<div className='flex flex-col m-[3rem]'>
								<p>Applies to:</p>
								<label>                           
									<input type='radio' name='Applies to' {...register('Applies to')} value='All Products' className='mr-[5]'/>
									<span>All Products</span>
								</label>
								<label>                            
									<input type='radio' name='Applies to' {...register('Applies to')} value='' className='mr-[5]'/>
									<span>Specific Products</span>
								</label>
							</div>
						</div> 

						: discountMode == 'Buy X Get Y' ?

						<div>
							<div className='flex flex-col m-[3rem]'>
								<p>Customer Buys</p>
								<div className='flex flex-row'>
									<label>
										<p>Any Items from</p>
										<input type='text' name='customerBuysItem' className='border-[3px]' {...register('customerBuysItem')}/>
									</label>
									<label className='ml-[15rem]'>
										<p>Quantity</p>
										<input type='text' name='customerBuysItemQuantity' className='w-[5rem] border-[3px]' {...register('customerBuysItemQuantity')}/>
									</label>
								</div>
								<p className='mt-[3rem]'>Customer Gets</p>
								<div className='flex flex-row'>
									<label>
										<p>Any Items from</p>
										<input type='text' name='customerGetsItem' className='border-[3px]' {...register('customerGetsItem')}/>
									</label>
									<label className='ml-[15rem]'>
										<p>Quantity</p>
										<input type='text' name='customerGetsItemQuantity' className='w-[5rem] border-[3px]' {...register('customerGetsItemQuantity')}/>
									</label>
								</div>
							</div>
						</div> 
						: ''
					}				
					
					<div className='m-12'>
						<p>Tagline</p>
						<input type='text' name='Tagline' className='border-[3px]' {...register('Tagline')}/>    
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
