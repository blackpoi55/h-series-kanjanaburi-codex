'use client'


import { getCompany, postReportSum } from '@/action/api'
import Baselayout from '@/components/Baselayout/Baselayout'
import HeaderPrintReport from '@/components/Print_Report/HeaderPrintReport'
import Print_Report from '@/components/Print_Report/Print_Report'
import Loading from '@/components/Tool/Loading'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
  const [wait, setWait] = useState(null)
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 })
  const [form, setForm] = useState({})
  const [options, setOptions] = useState({})
  const [excelexport, setExcelExport] = useState([])
  const router = useRouter()

  const [values, setvalues] = useState(
    {
      datastart: '',
      datastop: '',
      companyCode: ''
    }
  )

  const firstDayOfMonth = dayjs().startOf('month').add(-2, 'year').format('YYYY-MM-DD'); // วันที่ 1 ของเดือน
  const lastDayOfMonth = dayjs().endOf('month').add(-2, 'year').format('YYYY-MM-DD') // วันสุดท้ายของเดือน

  useEffect(() => {
    refresh()
  }, [values])

  useEffect(() => {
    Loadoptions()
  }, [])

  const refresh = async () => {
    console.log('values', values)
    setWait(true)
    values.datastart = values?.datastart || firstDayOfMonth
    values.datastop = values?.datastop || lastDayOfMonth

    let res = await postReportSum(values)
    if (res?.message === 'success') {
      setForm(res?.data || [])
    } else {
      console.log('error', res?.error)
    }
    setWait(false)
  }

  const Loadoptions = async () => {
    setWait(true)
    let res = await getCompany(values)
    let Company = [];
    for (const iterator of res?.data) {
      Company.push({ label: iterator.Name, value: iterator.SSB_ARCode });
    }
    setOptions({ Company })

    setWait(false)
  }

  return (
    <Baselayout>
      <div id='top' className='w-full h-full bg-[#FFFFFF] p-4 px-20  pb-20  ' >
        <Loading wait={wait} />
        <div onClick={() => router.back()} className='flex gap-4 mb-4 cursor-pointer'>
          <img className=' cursor-pointer' width={8} height={24} src="/icon/arrow_left.svg" />
          <label className='text-[#365382] font-medium text-xl  cursor-pointer' htmlFor="">ย้อนกลับ</label>
        </div>
        <div className='flex justify-start mb-4'>
          <label className='font-semibold text-[#2F2F2F] text-3xl' htmlFor="">Print Report</label>
        </div>

        <HeaderPrintReport setvalues={(v) => setvalues(v)} values={values} meta={options} excelexport={excelexport} />

        <Print_Report data={form} refresh={refresh} values={values} setExcelExport={setExcelExport} />
      </div >
    </Baselayout>
  )
}

export default page