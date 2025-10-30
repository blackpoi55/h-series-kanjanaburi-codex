'use client'
import { addNurseApprove, getHealthRecords } from '@/action/api'
import Baselayout from '@/components/Baselayout/Baselayout_Care'
import Tableconfirm from '@/components/DetailIndividualReport/Tableconfirm'
import Tablereject from '@/components/DetailIndividualReport/Tablereject'
import Tablesend from '@/components/DetailIndividualReport/Tablesend'
import TableShowall from '@/components/DetailIndividualReport/TableShowall'
import Tablewaiting from '@/components/DetailIndividualReport/Tablewaiting'
import Loading from '@/components/Tool/Loading'
import { LoadingProvider } from '@/components/Tool/LoadingContext '
import Toolselect2 from '@/components/Tool/Toolselect2'
import { Collapse, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const [wait, setWait] = useState(null)
    const [tap, setTap] = useState('show-all')
    const [form, setForm] = useState({ headerSelect: "" })
    const [headerOption, setheaderOption] = useState([])
    const [role, setrole] = useState("")
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setuserData] = useState('');
    const [doctorId, setdoctorId] = useState('');

    useEffect(() => {
        headerload();
        let data = localStorage.getItem('role')
        setrole(data)
        let val1 = localStorage.getItem('cpc')
        let user = JSON.parse(localStorage.getItem('user'))
        console.log("userData", user)
        setuserData(user?.user?.role || "")
        setdoctorId(user?.user?.license || "")
        console.log("role", data)
        if (data === "g") {
            setForm(prevForm => ({
                ...prevForm,
                headerSelect: val1
            }));
        }
        else if (form) { // Check if form is not null
            setForm((prevForm) => ({
                ...prevForm,
                headerSelect: code || "",
            }));
        }
    }, [code]);

    const handleChange = (update) => {
        setForm({ ...form, ...update });
    };

    const headerload = async () => {
        let data = await getHealthRecords()
        console.log("data", data)
        let sum = [{ value: "", label: "โปรดเลือกบริษัท", disabled: true }]
        if (!data.error) {
            let newdata = data?.data
            for (const element of newdata) {
                sum.push({ value: element?.code, label: element?.name })
            }
        }
        setheaderOption(sum)
    }
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    };



    return (
        <Baselayout>
            <LoadingProvider>
                <div id='top' className='w-full h-full bg-[#FFFFFF] p-4 md:px-10 md:pb-10 lg:px-20 lg:pb-20'>
                    <Loading wait={wait} />
                    <div className='flex justify-start mb-4'>
                        <label className='font-semibold text-[#264D70] text-3xl w-[350px]' htmlFor="">Individual Checkup</label>
                        {userData !== "doctor" ?
                            <Toolselect2 disabled={role == "g"} sm options={headerOption || []} label={"บริษัท"} value={form?.headerSelect || ''} onChange={(headerSelect) => handleChange({ headerSelect })} ></Toolselect2>
                            : ""}
                    </div>

                    <div className='flex w-full bg-[#F8F8F8] p-4 rounded-lg border-[#F8F8F8] border gap-4'>
                        <TextField
                            className='text-white w-full bg-white'
                            id="outlined-basic"
                            value={searchQuery}
                            onChange={handleSearch}
                            label="กรอกชื่อ หรือ หมายเลข HN ที่ต้องการค้นหา"
                            variant="outlined"
                        />

                        {/* <button  className='min-w-[118px] px-4 rounded-lg  shadow-button bg-[#365382] text-[#FFFFFF] hover:bg-[#1f304a] hover:text-[#FFFFFF]' >
                            <div className='flex gap-4 justify-center items-center p-2'>
                                <img className=' cursor-pointer' width={24} height={24} src="/icon/search.svg" />
                                <span className='whitespace-nowrap'>Search</span>
                            </div>
                        </button> */}
                    </div>
                    <div className='w-full flex pt-5'>
                        <label className='w-full flex border border-[#A9A9A9]'></label>
                    </div>

                    <Collapse timeout={300} className="transition-all duration-500" in={true}>
                        <div className='w-full grid grid-cols-12 gap-4   p-4'>
                            <div className='col-span-12 flex flex-wrap justify-start gap-2 items-center'>
                                <button onClick={() => setTap('show-all')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'show-all' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>แสดงทั้งหมด</button>
                                <button onClick={() => setTap('waiting')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'waiting' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >รอยืนยันผล</button>
                                <button onClick={() => setTap('confirm')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'confirm' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>ยืนยันผลแล้ว</button>
                                <button onClick={() => setTap('send')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'send' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>ส่งผลตรวจแล้ว</button>
                                <button onClick={() => setTap('reject')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'reject' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>ปฏิเสธการอนุมัติ</button>
                            </div>
                        </div>

                        {tap === 'show-all' && <TableShowall role={role} form={form} searchQuery={searchQuery} setWait={setWait} userData={userData} doctorId={doctorId} />}
                        {tap === 'waiting' && <Tablewaiting role={role} form={form} searchQuery={searchQuery} setWait={setWait} userData={userData} doctorId={doctorId} />}
                        {tap === 'confirm' && <Tableconfirm role={role} form={form} searchQuery={searchQuery} setWait={setWait} userData={userData} doctorId={doctorId} />}
                        {tap === 'send' && <Tablesend role={role} form={form} searchQuery={searchQuery} setWait={setWait} userData={userData} doctorId={doctorId} />}
                        {tap === 'reject' && <Tablereject role={role} form={form} searchQuery={searchQuery} setWait={setWait} userData={userData} doctorId={doctorId} />}

                    </Collapse>
                </div>
            </LoadingProvider>
        </Baselayout>
    )
}

export default Page;