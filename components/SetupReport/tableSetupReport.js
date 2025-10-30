'use client'

import { useEffect, useState } from "react"
import { useLoading } from "../Tool/LoadingContext "
import { Pagination } from "@mui/material"
import { deleteReportSumByid, deleteresultAllByid, getReportSum, getresultAll } from "@/action/api"
import Swal from "sweetalert2"



export const TableSetupReportUser = ({ refresh, onEdit }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])

    const { startLoading, stopLoading } = useLoading()


    useEffect(() => {
        onLoad()
        return () => {
            console.log("Cleanup function called!")
        }
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getReportSum()
            if (res?.message === 'success') {
                setList(res?.data || [])
            } else {
                console.log('error', res?.error)
            }
        } catch (err) {
            console.error('An error occurred while refreshing data:', err)
        } finally {
            stopLoading()
        }
    }

    const onDrop = async (item) => {
        let _s = await Swal.fire({
            icon: 'question',
            title: 'Want to delete?',
            showConfirmButton: true,
            showCancelButton: true,
        }).then((res) => {
            return res.isConfirmed
        })
        if (_s) {
            let response = await deleteReportSumByid(item?.UID)
            if (!response.error) {
                Swal.fire("ลบสำเร็จ!", "", "success");
                onLoad()
            } else {
                Swal.fire("ลบไม่สำเร็จ!", "", "error");
            }
        }
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const isChecked = (item) => {
        return item === 'A'
    }


    return (
        <div className='flex flex-col col-span-12 justify-start gap-2  '>
            <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">Report Name</th>
                            <th className="font-light">Report ShowName</th>
                            <th className="font-light">Path</th>
                            <th className="font-light ">Type</th>
                            <th className="font-light">Status</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {list?.length > 0 && list?.sort((a, b) => a.UID - b.UID)?.map((item, index) => {
                            return <tr key={`TableSetupUser${index}`} className="hover">
                                <td className="text-left ">{index + 1}</td>
                                <td className="text-left whitespace-nowrap">{item?.ReportName || ''}</td>
                                <td className="text-left ">{item?.ReportShowName || ''}</td>
                                <td className="text-left whitespace-nowrap ">{item?.path || ''}</td>
                                <td className="text-left ">{item?.Type || ''}</td>
                                <td className="text-left ">
                                    <div className='flex gap-4 items-center pt-2'>
                                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                                        <input checked={isChecked(item?.Status)} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Status1' name="Status" value="" />
                                    </div>
                                </td>
                                <td className="text-left ">
                                    <div className='flex gap-2'>
                                        <button onClick={() => onEdit(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                            <img width={20} height={20} src="/icon/edit.svg" />
                                        </button>

                                        <button onClick={() => onDrop(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                            <img width={20} height={20} src="/icon/trashcan.svg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div className='w-full mt-4'>
                <Pagination
                    count={paging?.totalPages || 1}
                    page={search?.page || 1}
                    onChange={(event, value) => onSearch({ page: value })}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            backgroundColor: '#FFFFFF',
                            boxShadow: '2px 2px 4px 0px #6B84B740',
                            width: '32px',
                            height: '32px',
                            padding: '4px 12px',
                            gap: '9px',
                            borderRadius: '8px 8px 8px 8px',
                            opacity: 1, // หรือ 0 ถ้าคุณต้องการโปร่งใส
                            color: '#365382', // สีของตัวอักษร
                            '&:hover': {
                                backgroundColor: '#365382', // สีพื้นหลังเมื่อ hover
                                color: '#FFFFFF', // สีตัวอักษรเมื่อถูกเลือก
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#365382', // สีพื้นหลังเมื่อถูกเลือก
                                color: '#FFFFFF', // สีตัวอักษรเมื่อถูกเลือก
                                '&:hover': {
                                    backgroundColor: '#2e4a6f', // สีพื้นหลังเมื่อถูกเลือกและ hover
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}

export const TableSetupReportCompany = ({ refresh, onEdit }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])

    const { startLoading, stopLoading } = useLoading()


    useEffect(() => {
        onLoad()
        return () => {
            console.log("Cleanup function called!")
        }
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getresultAll()
            if (res?.message === 'success') {
                setList(res?.data || [])
            } else {
                console.log('error', res?.error)
            }
        } catch (err) {
            console.error('An error occurred while refreshing data:', err)
        } finally {
            stopLoading()
        }
    }

    const onDrop = async (item) => {
        let _s = await Swal.fire({
            icon: 'question',
            title: 'Want to delete?',
            showConfirmButton: true,
            showCancelButton: true,
        }).then((res) => {
            return res.isConfirmed
        })
        if (_s) {
            let response = await deleteresultAllByid(item?.uid)
            if (!response.error) {
                Swal.fire("ลบสำเร็จ!", "", "success");
                onLoad()
            } else {
                Swal.fire("ลบไม่สำเร็จ!", "", "error");
            }
        }
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const isChecked = (item) => {
        return item === 'A'
    }


    return (
        <div className='flex flex-col col-span-12 justify-start gap-2  '>
            <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">Name</th>
                            <th className="font-light">Code</th>
                            <th className="font-light ">Type</th>
                            <th className="font-light">Status</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {list?.length > 0 && list?.sort((a, b) => a.uid - b.uid)?.map((item, index) => {
                            return <tr key={`TableSetupUser${index}`} className="hover">
                                <td className="text-left ">{index + 1}</td>
                                <td className="text-left whitespace-nowrap">{item?.name || ''}</td>
                                <td className="text-left ">{item?.code || ''}</td>
                                <td className="text-left whitespace-nowrap ">{item?.type || ''}</td>
                                <td className="text-left ">
                                    <div className='flex gap-4 items-center pt-2'>
                                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                                        <input checked={isChecked(item?.status)} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='status1' name="status" value="" />
                                    </div>
                                </td>
                                <td className="text-left ">
                                    <div className='flex gap-2'>
                                        <button onClick={() => onEdit(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                            <img width={20} height={20} src="/icon/edit.svg" />
                                        </button>

                                        <button onClick={() => onDrop(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                            <img width={20} height={20} src="/icon/trashcan.svg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div className='w-full mt-4'>
                <Pagination
                    count={paging?.totalPages || 1}
                    page={search?.page || 1}
                    onChange={(event, value) => onSearch({ page: value })}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            backgroundColor: '#FFFFFF',
                            boxShadow: '2px 2px 4px 0px #6B84B740',
                            width: '32px',
                            height: '32px',
                            padding: '4px 12px',
                            gap: '9px',
                            borderRadius: '8px 8px 8px 8px',
                            opacity: 1, // หรือ 0 ถ้าคุณต้องการโปร่งใส
                            color: '#365382', // สีของตัวอักษร
                            '&:hover': {
                                backgroundColor: '#365382', // สีพื้นหลังเมื่อ hover
                                color: '#FFFFFF', // สีตัวอักษรเมื่อถูกเลือก
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#365382', // สีพื้นหลังเมื่อถูกเลือก
                                color: '#FFFFFF', // สีตัวอักษรเมื่อถูกเลือก
                                '&:hover': {
                                    backgroundColor: '#2e4a6f', // สีพื้นหลังเมื่อถูกเลือกและ hover
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}