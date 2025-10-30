'use client'
import Baselayout from '@/components/Baselayout/Baselayout'
import HeaderSearchCompanyo from '@/components/SearchCompany/HeaderSearchCompanyo'
import Loading from '@/components/Tool/Loading'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {
  const router = useRouter()
  const [search, setSearch] = useState(null)

  const [wait, setWait] = useState(null)

  const onSearch = (updata) => {
    setSearch({ ...search, ...updata })
  }

  return (
    <Baselayout>
      <div className='w-full h-full bg-[#FFFFFF] p-4 md:px-10 md:pb-10 lg:px-20  lg:pb-20  ' >
        <Loading wait={wait} />
        <div onClick={() => router.push('/patientinfo')} className='flex gap-4 mb-4 cursor-pointer'>
          <img className=' cursor-pointer' width={8} height={24} src="/icon/arrow_left.svg" />
          <label className='text-[#365382] font-medium text-xl  cursor-pointer' htmlFor="">ย้อนกลับ</label>
        </div>
        <div className='flex justify-start mb-4'>
          <label className='font-semibold text-[#2F2F2F] text-3xl ' htmlFor="">Search Company</label>
        </div>
        <div className='flex relative w-full'>
          <HeaderSearchCompanyo value={search} onSearch={onSearch}></HeaderSearchCompanyo>
        </div>
      </div >

    </Baselayout>
  )
}

export default page