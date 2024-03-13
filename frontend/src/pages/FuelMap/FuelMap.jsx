import React from 'react'
import Maps from '../../components/Maps/Maps'
import MapFuels from '../../components/MapFuels/MapFuels'

const FuelMap = () => {
  return (
    <div>
        <MapFuels/>
        

<div class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
    <div class="flex justify-center  items-center space-x-6 pt-1">
       <div className='flex justify-start items-center space-x-3'>
        <p>From</p>
        <input type="text" placeholder="Type here" className="input input-bordered input-primary w-40" />
       </div>
       <div className='flex justify-start items-center space-x-3'>
        <p>To</p>
        <input type="text" placeholder="Type here" className="input input-bordered input-primary w-40" />
       </div>
       

    </div>
</div>

    </div>
  )
}

export default FuelMap