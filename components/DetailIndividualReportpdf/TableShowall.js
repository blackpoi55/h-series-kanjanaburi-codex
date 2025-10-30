'use client'

import { ListHealthRecords } from '@/action/api'
import { Pagination } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function TableShowall() {
    const router = useRouter()
    const [wait, setWait] = useState(null)
    const [list, setList] = useState({})
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [checkedItems, setCheckedItems] = useState([]);
    const [CheckAllArr, setCheckAllArr] = useState(false);


    useEffect(() => {
        refresh()
    }, [])

    const refresh = async () => {
        setWait(true)
        let data = {
            "company_code": "1295"
        }
        const res = await ListHealthRecords(data)
        if (res?.message === 'success') {
            setList(res?.data || null)
            setPaging({ currentPage: res?.currentPage, totalItems: res?.totalItems, totalPages: res?.totalPages })
        } else {
            console.log('error', res?.error)
        }
        setWait(false)

        if (res?.data?.length > 0 && checkedItems?.length > 0) {
            ck_id = res.data.every((e) =>
                checkedItems.some(
                    (item) => item.id === e.id
                )
            );
        }
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onCheckAll = (item) => {
        if (CheckAllArr) {
            const lists_clear = list.map(d => d.id);
            const updatedCheckedItems = checkedItems.filter(item => !lists_clear.includes(item.id));
            setCheckedItems(updatedCheckedItems);
        } else {
            const updatedCheckedItems = new Set(checkedItems);
            for (const e of list) {
                updatedCheckedItems.add(e);
            }
            setCheckedItems([...updatedCheckedItems]);
        }
        setCheckAllArr(!CheckAllArr);
    };

    const onCheck = (item) => {
        const index = checkedItems.findIndex((checkedItem) => checkedItem.id === item.id)
        if (index === -1) {
            setCheckedItems([...checkedItems, item])
        } else {
            const updatedItems = [...checkedItems]
            updatedItems.splice(index, 1)
            setCheckedItems(updatedItems)
        }
        setCheckAllArr(false)
    }

    const isChecked = (item) => {
        return checkedItems.some((checkedItem) => checkedItem.id === item.id)
    }


    return (
        <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF]'>
            <div className='flex flex-col justify-start h-[55vh] overflow-y-auto  px-2 pb-2'>
                <table className="tablePatientInformation  w-full  ">
                    <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">
                                <input checked={CheckAllArr} onChange={() => onCheckAll()} type="checkbox" className='w-5 h-5 accent-[#365382]' id='normal-selection1' name="normal-selection" value="" />
                            </th>
                            <th className="font-light">วันที่ตรวจ</th>
                            <th className="font-light">View</th>
                            <th className="font-light">HN</th>
                            <th className="font-light min-w-[200px]">ชื่อ-นามสกุล</th>
                            <th className="font-light">อายุ</th>
                            <th className="font-light">เพศ</th>
                            <th className="font-light">Package</th>
                            <th className="font-light">Send</th>
                            <th className="font-light">Cancel</th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {list.length > 0 && list.map((item, index) => (
                            <tr key={`trPatientLab${index}`} className="hover">
                                <td className={`text-left`}>{index + 1}</td>
                                <td className={`text-left`}>
                                    <input checked={isChecked(item)} onChange={() => onCheck(item)} type="checkbox" className='w-5 h-5 accent-[#365382]' id='normal-selection1' name="normal-selection" value="" />
                                </td>
                                <td className={`text-left`}>{moment(item?.exam_date).add(543, 'year').locale('th').format('DD MMM YYYY') || ''}</td>
                                <td className={`text-left whitespace-nowrap`}>
                                    <button onClick={() => router.push('/')} className='w-12 h-10 border rounded-full bg-[#4CCAF2] hover:bg-[#4CCAF2] text-[#FFFFFF]' >
                                        <div className='flex gap-2 justify-center items-center cursor-pointer'>
                                            <img className=' cursor-pointer' width={20} height={24} src="/icon/paper.svg" />
                                        </div>
                                    </button>
                                </td>
                                <td className="text-left text-[#365382]" onClick={() => router.push(`/Care-Vista-C/individualreport?hn=${item?.hn}&en=${item?.en}`)}>
                                    {item?.hn || '-'}
                                </td>
                                <td className={`text-left whitespace-nowrap`}>{(item?.prefix || '') + ' ' + (item?.first_name || '') + ' ' + (item?.last_name || '')}</td>
                                <td className={`text-left break-words`}>{item?.age || '-'}</td>
                                <td className={`text-left break-words`}>{item?.gender || '-'}</td>
                                <td className={`text-left`}>{item?.package || ''}</td>
                                <td className={`text-left`}>
                                    <button onClick={() => router.push('/')} className='w-12 h-10 border rounded-full bg-[#26A1DC] hover:bg-[#26A1DC] text-[#FFFFFF]' >
                                        <div className='flex gap-2 justify-center items-center cursor-pointer'>
                                            <img className=' cursor-pointer' width={20} height={24} src="/icon/message.svg" />
                                        </div>
                                    </button>
                                </td>
                                <td className="text-left flex items-center gap-2">
                                    <button onClick={() => router.push('/')} className='w-12 h-10 border rounded-full bg-[#FF6161] hover:bg-[#FF6161] text-[#FFFFFF]' >
                                        <div className='flex gap-2 justify-center items-center cursor-pointer'>
                                            <img className=' cursor-pointer' width={20} height={24} src="/icon/x_red_white.svg" />
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
                    <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                </div>}
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

export default TableShowall