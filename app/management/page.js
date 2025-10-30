'use client'

import { getCompany, PatientManagementReport, summaryExcel } from '@/action/api'
import Baselayout from '@/components/Baselayout/Baselayout'
import BodyinfoManagement from '@/components/Management/BodyinfoManagement'
import HeaderinfoManagement from '@/components/Management/HeaderinfoManagement'
import Loading from '@/components/Tool/Loading'
import { Pagination } from '@/components/Tool/Pagination'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const router = useRouter()
    // const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 })
    const [options, setOptions] = useState({})
    const [wait, setWait] = useState(null)
    const [form, setForm] = useState({})
    const [excelexport, setExcelExport] = useState([])
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
        setWait(true)
        values.datastart = values?.datastart || firstDayOfMonth
        values.datastop = values?.datastop || lastDayOfMonth

        let res = await PatientManagementReport(values)
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

    console.log('values', values)


    return (
        <Baselayout>
            <div div className='w-full h-full bg-[#FFFFFF] p-4 pb-10 px-10 font-sarabun>' >
                <Loading wait={wait} />
                <div onClick={() => router.back()} className='flex gap-4 mb-4 cursor-pointer'>
                    <img className=' cursor-pointer' width={8} height={24} src="/icon/arrow_left.svg" />
                    <label className='text-[#365382] font-medium text-xl  cursor-pointer' htmlFor="">ย้อนกลับ</label>
                </div>
                <div className='w-full flex'>
                    <label className='text-3xl font-bold'>Management</label>
                </div>

                <HeaderinfoManagement setvalues={(v) => setvalues(v)} values={values} meta={options} excelexport={excelexport} />
                <div className='w-full my-5 border-b-2 border-gray-200'></div>
                <BodyinfoManagement data={form} refresh={refresh} values={values} setExcelExport={setExcelExport} />
                {/* <div className='flex fixed bottom-0 left-0 w-full'>
                    <Pagination setvalues={(v) => setvalues(v)} paging={paging} />
                </div> */}
            </div>
        </Baselayout>
    )
}

export default page