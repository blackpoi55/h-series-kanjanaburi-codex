'use client'

import Baselayout from '@/components/Baselayout/Baselayout'
import { ModalSetupReportCompany, ModalSetupReportUser } from '@/components/SetupReport/modalSetupReport'
import { TableSetupReportCompany, TableSetupReportUser, TableSetupUser } from '@/components/SetupReport/tableSetupReport'
import Loading from '@/components/Tool/Loading'
import { LoadingProvider } from '@/components/Tool/LoadingContext '
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {
    const [wait, setWait] = useState(null)
    const [tap, setTap] = useState('User')
    const router = useRouter()
    const [refresh, setRefresh] = useState(true)
    const [addmodal, setAddModal] = useState(null)

    const onRefresh = () => {
        setRefresh(!refresh)
    }

    const onEdit = (e) => {
        setAddModal(e)
    }

    return (
        <Baselayout>
            <LoadingProvider>
                <div className='w-full h-full bg-[#FFFFFF] p-4 px-20  pb-20  ' >
                    <Loading wait={wait} />
                    <div onClick={() => router.back()} className='flex gap-4 mb-4 cursor-pointer'>
                        <img className=' cursor-pointer' width={8} height={24} src="/icon/arrow_left.svg" />
                        <label className='text-[#365382] font-medium text-xl  cursor-pointer' htmlFor="">ย้อนกลับ</label>
                    </div>

                    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
                        <label className='text-xl font-semibold text-[#365382]'>Setup Report</label>
                        <div className='w-full col-span-12 grid grid-cols-12 gap-4 p-4'>
                            <div className='col-span-12 flex flex-wrap justify-start gap-2 items-center'>
                                <button onClick={() => setTap('User')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'User' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>User</button>
                                <button onClick={() => setTap('Company')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'Company' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Company</button>
                            </div>

                            <div className='col-span-12 grid grid-cols-12 gap-4 bg-[#FFFFFF] shadow-box rounded-lg p-4'>
                                <div className='flex gap-4 col-span-12 '>
                                    <div className='flex justify-start items-center '>
                                        <label className='text-lg font-semibold text-[#232323] whitespace-nowrap'>{tap}</label>
                                    </div>
                                    <div className='flex justify-end gap-4 w-full'>
                                        {tap === 'User' &&
                                            <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                                                <div className='flex gap-4 justify-center items-center'>
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                                                    </svg>
                                                    <label className='cursor-pointer'>ADD</label>
                                                </div>
                                            </button>
                                        }
                                        {tap === 'Company' &&
                                            <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                                                <div className='flex gap-4 justify-center items-center'>
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                                                    </svg>
                                                    <label className='cursor-pointer'>ADD</label>
                                                </div>
                                            </button>
                                        }
                                    </div>
                                </div>
                                {tap === 'User' && <TableSetupReportUser refresh={refresh} onEdit={(e) => onEdit(e)} />}
                                {tap === 'Company' && <TableSetupReportCompany refresh={refresh} onEdit={(e) => onEdit(e)} />}
                            </div>
                        </div>
                        {tap === 'User' && <ModalSetupReportUser data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
                        {tap === 'Company' && <ModalSetupReportCompany data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}

                    </div>
                </div>
            </LoadingProvider>
        </Baselayout>
    )
}

export default page