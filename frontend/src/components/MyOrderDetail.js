import React from 'react'
import { Link } from 'react-router-dom'

const MyOrderDetail = ({ details }) => {

  console.log(details) ;
  return (
    <div className='flex flex-col w-72 justify-evenly m-2'>
    <div className='bg-white mb-3 rounded-md p-3 flex flex-col shadow-md'>
      <div className='font-bold text-lg'>Order ID -{details.id}</div>
      <div className='text-sm text-gray-500'>Order On - {new Date(details.date).toLocaleDateString('en-US')}</div>
        <div className='text-lg'>Total cost - ₹{details.price}</div>
        <div className={`${details.status ? 'text-green-500' : 'text-red-500'} text-lg`}>
          {details.status ? '✔️ Not delivered' : '❌ Delivered'}
      </div>
    </div>
  </div>
  
  )
}

export default MyOrderDetail