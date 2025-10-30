'use client'
import { deleteCompanyByid, deleteDoctorByid, deleteLabcodeByid, deleteStationByid, deleteTranslateByid, deleteUsersByid, deleteXrayByid, getCompany, getDoctor, getLabcode, getStation, getTranslate, getTranslateResult, getUsers, getXray } from '@/action/api'
import { Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useLoading } from '../Tool/LoadingContext '

export const TableSetupUser = ({ refresh, onEdit }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])

    const { startLoading, stopLoading } = useLoading()

    useEffect(() => {
        onLoad()
        return () => {
            // Cleanup function
            console.log("Cleanup function called!")
        }
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getUsers()
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
            let response = await deleteUsersByid(item?.UID)
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
                            <th className="font-light">Username</th>
                            <th className="font-light">msUserGroupUID</th>
                            <th className="font-light ">PrenameTH</th>
                            <th className="font-light ">ForenameTH</th>
                            <th className="font-light">SurnameTH</th>
                            <th className="font-light">StatusFlag</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {list?.length > 0 && list?.map((item, index) => {
                            return <tr key={`TableSetupUser${index}`} className="hover">
                                <td className="text-left ">{index + 1}</td>
                                <td className="text-left whitespace-nowrap">{item?.Name || ''}</td>
                                <td className="text-left ">{item?.Username || ''}</td>
                                <td className="text-left whitespace-nowrap ">{item?.msUserGroupUID || ''}</td>
                                <td className="text-left break-words ">{item?.PrenameTH || ''}</td>
                                <td className="text-left break-words">{item?.ForenameTH || ''}</td>
                                <td className="text-left ">{item?.SurnameTH || ''}</td>
                                <td className="text-left ">
                                    <div className='flex gap-4 items-center pt-2'>
                                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                                        <input checked={isChecked(item?.StatusFlag)} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='StatusFlag1' name="StatusFlag" value="" />
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
                {/* {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
          </div>} */}
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

export const TableSetupCompany = ({ onEdit, setExcelExportCompany, refresh }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])

    const { startLoading, stopLoading } = useLoading()

    useEffect(() => {
        onLoad()
        return () => {
            // Cleanup function
            console.log("Cleanup function called!")
        }
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getCompany()
            if (res?.message === 'success') {
                setList(res?.data || [])
                handleExport(res?.data)
            } else {
                console.log('error', res?.error)
            }
        } catch (err) {
            console.error('An error occurred while refreshing data:', err)
        } finally {
            stopLoading()
        }
    }

    const handleExport = async (res) => {
        console.log("handleExportLab", res)
        let sum = []
        for (const i of res) {
            let arr = [
                { value: i.UID || '' },
                { value: i.SSB_ARCode || '' },
                { value: i.Name || '' },
                { value: i.NameEN || '' },
                { value: i.Tel || '' },
                { value: i.Address || '' }
            ];
            sum.push(arr)
        }
        const multiDataset = [
            {
                columns: [
                    { title: "No." },
                    { title: "ARCode" },
                    { title: "Name" },
                    { title: "NameEN" },
                    { title: "Tel" },
                    { title: "Address" }
                ],
                data: sum
            }
        ]
        setExcelExportCompany(multiDataset)
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
            let response = await deleteCompanyByid(item?.UID)
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

    return (
        <div className='flex flex-col col-span-12 justify-start gap-2  '>
            <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">ARCode</th>
                            <th className="font-light">Name</th>
                            <th className="font-light">NameEN</th>
                            <th className="font-light ">Tel</th>
                            <th className="font-light ">Address</th>
                            <th className="font-light"></th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {list?.length > 0 && list?.map((item, index) => {
                            return <tr key={`TableSetupCompany${index}`} className="hover">
                                <td className="text-left">{index + 1}</td>
                                <td className="text-left whitespace-nowrap">{item?.SSB_ARCode || '-'}</td>
                                <td className="text-left">{item?.Name || '-'}</td>
                                <td className="text-left whitespace-nowrap">{item?.NameEN || '-'}</td>
                                <td className="text-left break-words ">{item?.Tel || '-'}</td>
                                <td className="text-left break-words">{item?.Address || '-'}</td>
                                <td className="text-left">
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

export const TableSetupStation = ({ refresh, onEdit }) => {
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
            let res = await getStation()
            if (res?.message === 'success') {
                setList(res?.data || [])
                handleExport(res?.data)
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
            let response = await deleteStationByid(item?.UID)
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
                            <th className="font-light">Description</th>
                            <th className="font-light">Sort</th>
                            <th className="font-light">StatusFlag</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {list?.length > 0 && list?.map((item, index) => {
                            return <tr key={`TableSetupStation${index}`} className="hover">
                                <td className="text-left">{index + 1}</td>
                                <td className="text-left whitespace-nowrap">{item?.Name || ''}</td>
                                <td className="text-left">{item?.Description || ''}</td>
                                <td className="text-left whitespace-nowrap">{item?.Sort || ''}</td>
                                <td className="text-left">
                                    <div className='flex gap-4 items-center pt-2'>
                                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                                        <input checked={isChecked(item?.StatusFlag)} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='StatusFlag1' name="StatusFlag" value="" />
                                    </div>
                                </td>
                                <td className="text-left">
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
                {/* {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
          </div>} */}
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

export const TableSetupMapStation = ({ data }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    return (
        <div className='flex flex-col col-span-12 justify-start gap-2  '>
            <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">Name</th>
                            <th className="font-light">Description</th>
                            <th className="font-light">Sort</th>
                            <th className="font-light ">FormName</th>
                            <th className="font-light ">ICon</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        < tr key={`trPatientLab`} className="  hover">
                            <td className="text-left ">{'5'}</td>
                            <td className="text-left whitespace-nowrap">{'Audiogram'}</td>
                            <td className="text-left ">{'จุดตรวจสมรรถภาพการได้ยิน(ตู้ตรวจการได้ยิน)	'}</td>
                            <td className="text-left whitespace-nowrap ">{'7'}</td>
                            <td className="text-left break-words ">{'frmAudiogram'}</td>
                            <td className="text-left break-words">{'icAudio.png	'}</td>
                            <td className="text-left ">
                                <div className='flex gap-2'>
                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                        <img width={20} height={20} src="/icon/edit.svg" />
                                    </button>

                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                        <img width={20} height={20} src="/icon/trashcan.svg" />
                                    </button>
                                </div>
                            </td>
                        </tr>

                        < tr key={`trPatientLab`} className="  hover">
                            <td className="text-left ">{'5'}</td>
                            <td className="text-left whitespace-nowrap">{'Audiogram'}</td>
                            <td className="text-left ">{'จุดตรวจสมรรถภาพการได้ยิน(ตู้ตรวจการได้ยิน)	'}</td>
                            <td className="text-left whitespace-nowrap ">{'7'}</td>
                            <td className="text-left break-words ">{'frmAudiogram'}</td>
                            <td className="text-left break-words">{'icAudio.png	'}</td>
                            <td className="text-left ">
                                <div className='flex gap-2'>
                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                        <img width={20} height={20} src="/icon/edit.svg" />
                                    </button>

                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                        <img width={20} height={20} src="/icon/trashcan.svg" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        < tr key={`trPatientLab`} className="  hover">
                            <td className="text-left ">{'5'}</td>
                            <td className="text-left whitespace-nowrap">{'Audiogram'}</td>
                            <td className="text-left ">{'จุดตรวจสมรรถภาพการได้ยิน(ตู้ตรวจการได้ยิน)	'}</td>
                            <td className="text-left whitespace-nowrap ">{'7'}</td>
                            <td className="text-left break-words ">{'frmAudiogram'}</td>
                            <td className="text-left break-words">{'icAudio.png	'}</td>
                            <td className="text-left ">
                                <div className='flex gap-2'>
                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                        <img width={20} height={20} src="/icon/edit.svg" />
                                    </button>

                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                        <img width={20} height={20} src="/icon/trashcan.svg" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        < tr key={`trPatientLab`} className="  hover">
                            <td className="text-left ">{'5'}</td>
                            <td className="text-left whitespace-nowrap">{'Audiogram'}</td>
                            <td className="text-left ">{'จุดตรวจสมรรถภาพการได้ยิน(ตู้ตรวจการได้ยิน)	'}</td>
                            <td className="text-left whitespace-nowrap ">{'7'}</td>
                            <td className="text-left break-words ">{'frmAudiogram'}</td>
                            <td className="text-left break-words">{'icAudio.png	'}</td>
                            <td className="text-left ">
                                <div className='flex gap-2'>
                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                        <img width={20} height={20} src="/icon/edit.svg" />
                                    </button>

                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                        <img width={20} height={20} src="/icon/trashcan.svg" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        < tr key={`trPatientLab`} className="  hover">
                            <td className="text-left ">{'5'}</td>
                            <td className="text-left whitespace-nowrap">{'Audiogram'}</td>
                            <td className="text-left ">{'จุดตรวจสมรรถภาพการได้ยิน(ตู้ตรวจการได้ยิน)	'}</td>
                            <td className="text-left whitespace-nowrap ">{'7'}</td>
                            <td className="text-left break-words ">{'frmAudiogram'}</td>
                            <td className="text-left break-words">{'icAudio.png	'}</td>
                            <td className="text-left ">
                                <div className='flex gap-2'>
                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                        <img width={20} height={20} src="/icon/edit.svg" />
                                    </button>

                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                        <img width={20} height={20} src="/icon/trashcan.svg" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        < tr key={`trPatientLab`} className="  hover">
                            <td className="text-left ">{'5'}</td>
                            <td className="text-left whitespace-nowrap">{'Audiogram'}</td>
                            <td className="text-left ">{'จุดตรวจสมรรถภาพการได้ยิน(ตู้ตรวจการได้ยิน)	'}</td>
                            <td className="text-left whitespace-nowrap ">{'7'}</td>
                            <td className="text-left break-words ">{'frmAudiogram'}</td>
                            <td className="text-left break-words">{'icAudio.png	'}</td>
                            <td className="text-left ">
                                <div className='flex gap-2'>
                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                        <img width={20} height={20} src="/icon/edit.svg" />
                                    </button>

                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                        <img width={20} height={20} src="/icon/trashcan.svg" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        < tr key={`trPatientLab`} className="  hover">
                            <td className="text-left ">{'5'}</td>
                            <td className="text-left whitespace-nowrap">{'Audiogram'}</td>
                            <td className="text-left ">{'จุดตรวจสมรรถภาพการได้ยิน(ตู้ตรวจการได้ยิน)	'}</td>
                            <td className="text-left whitespace-nowrap ">{'7'}</td>
                            <td className="text-left break-words ">{'frmAudiogram'}</td>
                            <td className="text-left break-words">{'icAudio.png	'}</td>
                            <td className="text-left ">
                                <div className='flex gap-2'>
                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                        <img width={20} height={20} src="/icon/edit.svg" />
                                    </button>

                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                        <img width={20} height={20} src="/icon/trashcan.svg" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        < tr key={`trPatientLab`} className="  hover">
                            <td className="text-left ">{'5'}</td>
                            <td className="text-left whitespace-nowrap">{'Audiogram'}</td>
                            <td className="text-left ">{'จุดตรวจสมรรถภาพการได้ยิน(ตู้ตรวจการได้ยิน)	'}</td>
                            <td className="text-left whitespace-nowrap ">{'7'}</td>
                            <td className="text-left break-words ">{'frmAudiogram'}</td>
                            <td className="text-left break-words">{'icAudio.png	'}</td>
                            <td className="text-left ">
                                <div className='flex gap-2'>
                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                        <img width={20} height={20} src="/icon/edit.svg" />
                                    </button>

                                    <button className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                        <img width={20} height={20} src="/icon/trashcan.svg" />
                                    </button>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
                {/* {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
          </div>} */}
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

export const TableSetupMapXRayCode = ({ refresh, onEdit }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])

    const { startLoading, stopLoading } = useLoading()

    useEffect(() => {
        onLoad()
        return () => {
            // Cleanup function
            console.log("Cleanup function called!")
        }
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getXray()
            if (res?.message === 'success') {
                setList(res?.data || [])
                handleExport(res?.data)
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
            let response = await deleteXrayByid(item?.uid)
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
        return item === 'Y'
    }

    console.log("list", list)

    return (
        <div className='flex flex-col col-span-12 justify-start gap-2  '>
            <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">Code</th>
                            <th className="font-light">Name</th>
                            <th className="font-light">Status</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {list?.length > 0 && list?.map((item, index) => {
                            return <tr key={`TableSetupXray${index}`} className="hover">
                                <td className="text-left ">{index + 1}</td>
                                <td className="text-left whitespace-nowrap">{item?.Code || ''}</td>
                                <td className="text-left ">{item?.Name || ''}</td>
                                <td className="text-left ">
                                    <div className='flex gap-4 items-center pt-2'>
                                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                                        <input checked={isChecked(item?.Activity)} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Activity1' name="Activity" value="" />
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
                {/* {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
          </div>} */}
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

export const TableSetupLabCode = ({ refresh, onEdit, onTranslet, searchText }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])

    const { startLoading, stopLoading } = useLoading()

    useEffect(() => {
        onLoad()
        return () => {
            // Cleanup function
            console.log("Cleanup function called!")
        }
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getLabcode()
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
    const filteredData = list.filter(item =>
        [item.Code, item.Desc,item.sq, item.mapExtCode,item.Rpt_NormalRang, item.Unit,item.Category].some(val =>
            val?.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    ); 
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
            let response = await deleteLabcodeByid(item?.UID)
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

    return (
        <div className='flex flex-col col-span-12 justify-start gap-2  '>
            <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">Lab Code</th>
                            <th className="font-light">DESC</th>
                            <th className="font-light">SQ</th>
                            <th className="font-light">ExCode</th>
                            <th className="font-light">NormalRang</th>
                            <th className="font-light">Unit</th>
                            <th className="font-light">Category</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    {/* whitespace-nowrap */}
                    <tbody className='text-base font-light'>
                        {filteredData?.length > 0 && filteredData?.map((item, index) => {
                            return <tr key={`TableSetupLabcode${index}`} className="hover">
                                <td className="text-left">{index + 1}</td>
                                <td className="text-left">{item?.Code || ''}</td>
                                <td className="text-left whitespace-nowrap">{item?.Desc || ''}</td>
                                <td className="text-left">{item?.sq || ''}</td>
                                <td className="text-left">{item?.mapExtCode || ''}</td>
                                <td className="text-left whitespace-nowrap">{item?.Rpt_NormalRang || ''}</td>
                                <td className="text-left">{item?.Unit || ''}</td>
                                <td className="text-left whitespace-nowrap">{item?.Category || ''}</td>
                                <td className="text-left">
                                    <div className='flex gap-2'>
                                        <button onClick={() => onEdit(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                            <img width={20} height={20} src="/icon/edit.svg" />
                                        </button>

                                        <button onClick={() => onTranslet(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                            <img width={20} height={20} src="/icon/translate.svg" />
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
                {/* {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
          </div>} */}
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

export const TableSetupTranslate = ({ refresh, onEdit, searchText }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])

    const { startLoading, stopLoading } = useLoading()

    useEffect(() => {
        onLoad()
        return () => {
            // Cleanup function
            console.log("Cleanup function called!")
        }
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getTranslate()
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
    const filteredData = list.filter(item =>
        [item.slocal, item.Mess].some(val =>
            val?.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );
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
            let response = await deleteTranslateByid(item?.UID)
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
        return item === 'Y'
    }

    return (
        <div className='flex flex-col col-span-12 justify-start gap-2  '>
            <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">Slocal</th>
                            <th className="font-light">Mess</th>
                            <th className="font-light w-[100px]">Flag Active</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {filteredData?.length > 0 && filteredData?.map((item, index) => {
                            return <tr key={`TableSetupTranslate${index}`} className="hover">
                                <td className="text-left">{index + 1}</td>
                                <td className="text-left">{item?.slocal || ''}</td>
                                <td className="text-left">{item?.Mess || ''}</td>
                                <td className="text-left">
                                    <div className='flex gap-4 items-center pt-2'>
                                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                                        <input checked={isChecked(item?.Flag_Active)} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Flag_Active1' name="Flag_Active" value="" />
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
                {/* {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
          </div>} */}
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

export const TableSetupTranslateResult = ({ refresh, onEdit, searchText }) => {
    const [list, setList] = useState([])
    const { startLoading, stopLoading } = useLoading()

    useEffect(() => {
        onLoad()
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            const res = await getTranslateResult()
            if (res?.message === 'success') {
                setList(res?.data || [])
            } else {
                console.log('error', res?.error)
            }
        } catch (err) {
            console.error('Error:', err)
        } finally {
            stopLoading()
        }
    }
    // ทุกฟิล
    // const filteredData = list.filter(item =>
    //     Object.values(item).some(val =>
    //         val?.toString().toLowerCase().includes(searchText.toLowerCase())
    //     )
    // );
    const filteredData = list.filter(item =>
        [item.title, item.descriptionsy].some(val =>
            val?.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const onDrop = async (item) => {
        const confirm = await Swal.fire({
            icon: 'question',
            title: 'ต้องการลบหรือไม่?',
            showConfirmButton: true,
            showCancelButton: true,
        }).then(res => res.isConfirmed)

        if (confirm) {
            const response = await deleteTranslateByid(item?.id)
            if (!response.error) {
                Swal.fire("ลบสำเร็จ!", "", "success")
                onLoad()
            } else {
                Swal.fire("ลบไม่สำเร็จ!", "", "error")
            }
        }
    }

    const renderConditions = (conditions) => {
        if (!conditions || conditions.length === 0) return '-'
        return conditions.map((cond, i) => {
            const op = cond.operator === 'between'
                ? `${cond.value_min} - ${cond.value_max} ${cond.unit}`
                : `${cond.operator} ${cond.value_min} ${cond.unit}`
            return (
                <div key={i} className="text-xs text-gray-600">
                    {cond.lab_type}: {op}
                </div>
            )
        })
    }

    return (
        <div className="flex flex-col gap-4 col-span-12">
            <div className="overflow-y-auto max-h-[65vh] border rounded relative">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-sm text-left sticky top-0 z-10 shadow">
                        <tr>
                            <th className="px-3 py-2 w-[50px]">No.</th>
                            <th className="px-3 py-2 w-[30%]">หัวข้อ</th>
                            <th className="px-3 py-2 w-[30%]">คำอธิบาย</th>
                            <th className="px-3 py-2 w-[25%]">เงื่อนไข</th>
                            <th className="px-3 py-2 w-[80px]">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredData?.map((item, index) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50 align-top">
                                <td className="px-3 py-2">{index + 1}</td>
                                <td className="px-3 py-2 whitespace-pre-wrap">{item.title}</td>
                                <td className="px-3 py-2 whitespace-pre-wrap">{item.description || '-'}</td>
                                <td className="px-3 py-2">{renderConditions(item.conditions)}</td>
                                <td className="px-3 py-2">
                                    <div className="flex gap-2">
                                        <button onClick={() => onEdit(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                            <img width={20} height={20} src="/icon/edit.svg" />
                                        </button>

                                        <button onClick={() => onDrop(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                            <img width={20} height={20} src="/icon/trashcan.svg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">ไม่มีข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const TableSetupDoctor = ({ refresh, onEdit }) => {
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])
    const { startLoading, stopLoading } = useLoading()

    useEffect(() => {
        onLoad()
        return () => {
            // Cleanup function
            console.log("Cleanup function called!")
        }
    }, [refresh])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getDoctor()
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
            let response = await deleteDoctorByid(item?.uid)
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


    return (
        <div className='flex flex-col col-span-12 justify-start gap-2  '>
            <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">Name TH</th>
                            <th className="font-light">Name EN</th>
                            <th className="font-light">Doctor Code</th>
                            <th className="font-light">Type</th>
                            <th className="font-light"> </th>
                        </tr>
                    </thead>
                    {/* whitespace-nowrap */}
                    <tbody className='text-base font-light'>
                        {list?.length > 0 && list?.map((item, index) => {
                            return <tr key={`TableSetupDoctor${index}`} className="hover">
                                <td className="text-left">{index + 1}</td>
                                <td className="text-left">{item?.name_th || ''}</td>
                                <td className="text-left whitespace-nowrap">{item?.name_en || ''}</td>
                                <td className="text-left">{item?.doctor_code || ''}</td>
                                <td className="text-left">{item?.type || ''}</td>
                                <td className="text-left">
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
                {/* {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
          </div>} */}
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