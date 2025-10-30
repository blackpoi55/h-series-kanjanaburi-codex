'use client'
import {
  healthpackages,
  postLabCodeCategory,
  servicesandprices,
} from '@/action/api'
import Baselayout from '@/components/Baselayout/Baselayout'
import All from '@/components/Setuppackage/All'
import Main from '@/components/Setuppackage/Main'
import Orderlab from '@/components/Setuppackage/Orderlab'
import Loading from '@/components/Tool/Loading'
import { LoadingProvider } from '@/components/Tool/LoadingContext '
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
  const [wait, setWait] = useState(null)
  const router = useRouter()
  const [mainPackage, setmainPackage] = useState([])
  const [allpackage, setallpackage] = useState([])
  const [allorder, setallorder] = useState([])
  const [selectMenu, setselectMenu] = useState("main")


  useEffect(() => {
    refresh()
  }, [])

  const refresh = async () => {
    let mainpackage = await healthpackages()
    setmainPackage(mainpackage?.data || [])
    let subpackage = await servicesandprices()
    setallpackage(subpackage?.data || [])
    let order = await postLabCodeCategory({
      "Category": "L04 External." 
    })
    setallorder(order?.data || [])
  }




  return (
    <Baselayout>
      <LoadingProvider>
        <div className="w-full h-full bg-[#FFFFFF] p-4 px-20 pb-20">
          <Loading wait={wait} />


          <div className="flex items-center">
            <div className="flex justify-start items-center w-1/2">
              <div onClick={() => router.back()} className="flex gap-4 mb-4 cursor-pointer">
                <img className="cursor-pointer" width={8} height={24} src="/icon/arrow_left.svg" />
                <label className="text-[#365382] font-medium text-xl cursor-pointer">ย้อนกลับ</label>
              </div>
            </div>
            <div className="flex justify-end w-1/2">
              <button onClick={() => setselectMenu("main")} className={`px-2 py-1 shadow-xl rounded-l-2xl  ${selectMenu == "main" ? " bg-[#365382] text-white " : " bg-gray-200 text-black "}`}>Main Package</button>
              <button onClick={() => setselectMenu("all")} className={`px-2 py-1 shadow-xl border-x border-black ${selectMenu == "all" ? " bg-[#c02e2e] text-white " : " bg-gray-200 text-black "}`}>All Package</button>
              <button onClick={() => setselectMenu("orderlab")} className={`px-2 shadow-xl py-1 rounded-r-2xl  ${selectMenu == "orderlab" ? " bg-[#46c02e] text-white " : " bg-gray-200 text-black "}`}>Order Lab</button>
            </div>
          </div>

          {selectMenu == "main" && <Main refresh={refresh} mainPackage={mainPackage} allpackage={allpackage} setWait={setWait}></Main>}
          {selectMenu == "all" && <All refresh={refresh} allpackage={allpackage} setWait={setWait}></All>}
          {selectMenu == "orderlab" && <Orderlab refresh={refresh} allorder={allorder} setWait={setWait}></Orderlab>}
        </div>
      </LoadingProvider>
    </Baselayout >
  )
}

export default page
