'use client'
import { getDashboard, getHealthPatients, getHealthRecords, getHealthUsers, updateCompanyHealthRecord } from '@/action/api'
import Baselayout from '@/components/Baselayout/Baselayout_Care'
import Loading from '@/components/Tool/Loading'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Toolselect2 from '@/components/Tool/Toolselect2'
import Tooldatepick from '@/components/Tool/Tooldatepick'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import CompanyTable from '@/components/HealthCompany/CompanyTable'
import PatientTable from '@/components/HealthCompany/PatientTable'
import UserTable from '@/components/HealthCompany/UserTable'
function page({ code }) {
    const router = useRouter()
    const [dataMap, setdataMap] = useState([]);
    const [dataMapT2, setdataMapT2] = useState([]);
    const [dataMapT3, setdataMapT3] = useState([]);
    const [wait, setWait] = useState(null)
    const [headerOption, setheaderOption] = useState([])
    const [tableChoose, settableChoose] = useState("Company")
    const [userData, setuserData] = useState('');
    const [form, setForm] = useState({
        headerSelect: "",
        startdate: dayjs().format("YYYY-MM-DD"),
        enddate: dayjs().format("YYYY-MM-DD")
    })
    useEffect(() => {
        refresh()
        let user = JSON.parse(localStorage.getItem('user'))
        console.log("userData", user)
        setuserData(user?.user?.role || "")
        if (form) { // Check if form is not null
            setForm((prevForm) => ({
                ...prevForm,
                headerSelect: code || "",
            }));
        }
    }, [code]);
    const refresh = async () => {
        let data = await getHealthRecords()
        // console.log("data", data)
        let sum = [{ value: "", label: "โปรดเลือกบริษัท" }]
        if (!data.error) {
            let newdata = data?.data
            for (const element of newdata) {
                sum.push({ value: element?.code, label: element?.name })
            }
        }
        setdataMap(data?.data || [])
        setheaderOption(sum)


        let dataT2 = await getHealthPatients()
        console.log('dataT2', dataT2)
        setdataMapT2(dataT2?.data || [])

        let dataT3 = await getHealthUsers()
        console.log('dataT3', dataT3)
        setdataMapT3(dataT3?.data || [])

    }

    const handleChange = (update) => {
        setForm({ ...form, ...update });
    };


    return (
        <Baselayout>
            <div className='w-full h-full bg-[#FFFFFF] p-4 md:px-10 md:pb-10 lg:px-20  lg:pb-20  ' >

                <Loading wait={wait} />
                <label className='text-lg font-bold p-4'>ระบบตรวจสุขภาพองค์กร</label>
                <div className='flex flex-col w-full h-full'>
                    <div className="w-full flex h- p-4 mr-2 bg-[#F3F3F3] rounded-2xl my-3">
                        <div className="w-3/5 flex justify-center items-center z-10">
                            <Toolselect2 sm options={headerOption || []} label={"ชื่อบริษัทหรือชื่อแพ็คเกจการรักษา"} value={form?.headerSelect || ''} onChange={(headerSelect) => handleChange({ headerSelect })} ></Toolselect2>
                        </div>
                        <div className="w-2/5 flex justify-end items-center">
                            <div className="w-1/3 mx-2">
                                <Tooldatepick sm label={"วันที่เริ่ม"} value={form?.startdate || ''} onChange={(startdate) => handleChange({ startdate })} name={"startdate"} ></Tooldatepick>
                            </div>
                            <label className='text-[#014F7D] p-2 text-2xl font-bold'>-</label>
                            <div className="w-1/3 mx-2">
                                <Tooldatepick sm label={"วันสิ้นสุด"} value={form?.enddate || ''} onChange={(enddate) => handleChange({ enddate })} name={"enddate"} ></Tooldatepick>
                            </div>
                            <div className="w-1/3 mx-2">
                                <button className={`w-full border border-[#365382] rounded-lg p-2 text-center mr-2  bg-[#365382] text-white flex justify-center items-center `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                    <label>Search</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* dataMap */}
                    <div className="my-5 border-2 border-gray-300 rounded-2xl"></div>
                    <div className="flex border-b mb-4">
                        {["Company", "Patient", "Employee"].map((item) => {
                            if (item === "Employee" && (userData === "doctor" || userData === "nurse")) {
                                return null; // ❌ ซ่อน User สำหรับ doctor และ nurse
                            }

                            return (
                                <button
                                    key={item}
                                    onClick={() => settableChoose(item)}
                                    className={`px-4 py-2 -mb-[2px] font-semibold border-b-2 transition ${tableChoose === item
                                            ? "border-[#014F7D] text-[#014F7D]"
                                            : "border-transparent text-gray-500 hover:text-[#014F7D]"
                                        }`}
                                >
                                    {item}
                                </button>
                            );
                        })}

                    </div>

                    {tableChoose == "Company" ?
                        <CompanyTable data={dataMap} refresh={refresh} />
                        : tableChoose == "Patient" ?
                            <PatientTable data={dataMapT2} refresh={refresh} />
                            : tableChoose == "Employee" ?
                                <UserTable data={dataMapT3} refresh={refresh} />
                                : ""
                    }
                </div>
            </div >

        </Baselayout>
    )
}

export default page