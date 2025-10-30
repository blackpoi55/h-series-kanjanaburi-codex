'use client'


import React, { useEffect, useState } from 'react'

function Print_Report(props) {
    const { data, setExcelExport } = props

    const [list, setList] = useState([])
    useEffect(() => {
        if (data) {
            setList([
                ...(Array.isArray(data?.lab) ? data.lab.filter(x => x.Total > 0) : []),
                ...(Array.isArray(data?.xray) ? data.xray.filter(x => x.Total > 0) : [])
            ]);
        }
        handleExport(list)
    }, [data]);

    useEffect(() => {
        if (list.length > 0) {
            handleExport(list);
        }
    }, [list]);

    const handleExport = async (res) => {
        console.log("handleExportLab", res)
        let sum = []
        for (const i of res) {
            let arr = [
                { value: i.Name || '' },
                { value: i.Normal || '' },
                { value: i.Abnormal || '' },
                { value: i.Total || '' }
            ];
            sum.push(arr)
        }
        const multiDataset = [
            {
                columns: [
                    { title: "Name." },
                    { title: "Normal" },
                    { title: "Abnormal" },
                    { title: "Total" }
                ],
                data: sum
            }
        ]
        setExcelExport(multiDataset)
    }

    return (
        <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] p-5 mt-4'>
            <div className='flex flex-col col-span-12 justify-start gap-2 pt-2'>
                <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                    <table className="tablePatientInformation w-full">
                        <thead className='text-[#4E4E4E] text-sm '>
                            <tr className="text-left bg-[#E2E2E2]">
                                <th className="font-light">No.</th>
                                <th className="font-light">Name</th>
                                <th className="font-light">Normal</th>
                                <th className="font-light">Abnormal</th>
                                <th className="font-light ">Total</th>
                            </tr>
                        </thead>
                        <tbody className='text-base font-light'>
                            {list?.length > 0 && list?.map((item, index) => {
                                return <tr key={`TablePrintReportLab${index}`} className="hover">
                                    <td className="text-left ">{index + 1}</td>
                                    <td className="text-left whitespace-nowrap">{item?.Name || ''}</td>
                                    <td className="text-left ">{item?.Normal || ''}</td>
                                    <td className="text-left whitespace-nowrap ">{item?.Abnormal || ''}</td>
                                    <td className="text-left ">{item?.Total || ''}</td>
                                </tr>
                            })}
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

export default Print_Report