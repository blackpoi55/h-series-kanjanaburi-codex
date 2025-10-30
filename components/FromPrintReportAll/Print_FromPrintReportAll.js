'use client'

import React, { useEffect, useState } from 'react'

function Print_FromPrintReportAll(props) {
    // const { data, setExcelExport } = props

    // const [list, setList] = useState([])
    // useEffect(() => {
    //     if (data) {
    //         setList([
    //             ...(Array.isArray(data?.lab) ? data.lab.filter(x => x.Total > 0) : []),
    //             ...(Array.isArray(data?.xray) ? data.xray.filter(x => x.Total > 0) : [])
    //         ]);
    //     }
    //     handleExport(list)
    // }, [data]);

    // useEffect(() => {
    //     if (list.length > 0) {
    //         handleExport(list);
    //     }
    // }, [list]);

    // const handleExport = async (res) => {
    //     console.log("handleExportLab", res)
    //     let sum = []
    //     for (const i of res) {
    //         let arr = [
    //             { value: i.Name || '' },
    //             { value: i.Normal || '' },
    //             { value: i.Abnormal || '' },
    //             { value: i.Total || '' }
    //         ];
    //         sum.push(arr)
    //     }
    //     const multiDataset = [
    //         {
    //             columns: [
    //                 { title: "Name." },
    //                 { title: "Normal" },
    //                 { title: "Abnormal" },
    //                 { title: "Total" }
    //             ],
    //             data: sum
    //         }
    //     ]
    //     setExcelExport(multiDataset)
    // }

    return (
        <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] p-5 mt-4'>
            <div className='flex flex-col col-span-12 justify-start gap-2 pt-2'>
                <div className='flex flex-col justify-start h-[60vh] overflow-y-auto pb-2'>
                    <table className="tablePatientInformation w-full">
                        <thead className='text-[#4E4E4E] text-sm '>
                            <tr className="text-left bg-[#E2E2E2]">
                                <th className="font-light">No.</th>
                                <th className="font-light">HN</th>
                                <th className="font-light">คำนำหน้า</th>
                                <th className="font-light">ชื่อ</th>
                                <th className="font-light">สกุล</th>
                                <th className="font-light">วันที่ตรวจ</th>
                                <th className="font-light">ชื่อบริษัท</th>
                            </tr>
                        </thead>
                        <tbody className='text-base font-light'>
                            <tr>
                                <td className="text-left">{'1'}</td>
                                <td className="text-left whitespace-nowrap">{'18-05-010226'}</td>
                                <td className="text-left">{'นาย'}</td>
                                <td className="text-left whitespace-nowrap">{'อนันต์'}</td>
                                <td className="text-left">{'เพรชปฐมชล'}</td>
                                <td className="text-left">{'06-กุมภาพันธ์-2568'}</td>
                                <td className="text-left whitespace-nowrap">{'บมจ. บางจาก คอร์ปอเรชั่น-C'}</td>
                            </tr>
                            {/* {list?.length > 0 && list?.map((item, index) => {
                                return <tr key={`TablePrintReportLab${index}`} className="hover">
                                    <td className="text-left ">{index + 1}</td>
                                    <td className="text-left whitespace-nowrap">{item?.hn || ''}</td>
                                    <td className="text-left ">{item?.prefix || ''}</td>
                                    <td className="text-left whitespace-nowrap ">{item?.name || ''}</td>
                                    <td className="text-left ">{item?.surname || ''}</td>
                                    <td className="text-left ">{item?.dateaddon || ''}</td>
                                    <td className="text-left ">{item?.company || ''}</td>
                                </tr>
                            })} */}

                        </tbody>
                    </table>
                </div>
                {/* <div className='w-full mt-4'>
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
            </div> */}
            </div>
        </div>
    )
}

export default Print_FromPrintReportAll