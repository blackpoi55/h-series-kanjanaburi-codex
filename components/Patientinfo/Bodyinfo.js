'use client'
import React from 'react'
import Carddetail from '../Carddetail/Carddetail'

function Bodyinfo({ patientlist }) {

  return (
    <div className='w-full flex flex-col rounded-2xl p-5 mt-4'>
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-2 gap-4 h-full bg-white  overflow-x-auto">
        {patientlist?.length > 0 && patientlist.map((p, index) => (
          <Carddetail key={`patientlist${index}`} data={p}></Carddetail>
        ))}
      </div>
    </div>
  )
}

export default Bodyinfo