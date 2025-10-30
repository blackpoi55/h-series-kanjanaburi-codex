'use client'
import Baselayout from '@/components/Baselayout/Baselayout'
import Loading from '@/components/Tool/Loading'
import Result from '@/components/importoutlabtohserie/Result'
import Header from '@/components/importoutlabtohserie/Header'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {
  const router = useRouter()
  const [search, setSearch] = useState(null)
  const [fileName, setFileName] = useState("");
  const [headerChoose, setheaderChoose] = useState(0);
  const [headerdata, setheaderdata] = useState([]);
  const [dataMap, setdataMap] = useState([]);

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
        <div className='flex relative w-full'>
          <Header headerdata={headerdata} setheaderdata={setheaderdata} dataMap={dataMap} setdataMap={setdataMap} fileName={fileName} setFileName={setFileName} headerChoose={headerChoose} setheaderChoose={setheaderChoose}></Header>
        </div>
        <div className='flex relative w-full'>
          <Result headerdata={headerdata} setheaderdata={setheaderdata} dataMap={dataMap} setdataMap={setdataMap} headerChoose={headerChoose}></Result>
        </div>
      </div >

    </Baselayout>
  )
}

export default page