'use client'
import { Pagination } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { approveAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert';
import { useLoading } from '../Tool/LoadingContext ';

function BodyinfoManagement(props) {
    const { data, setExcelExport } = props
    // const { startLoading, stopLoading } = useLoading()

    const [list, setList] = useState([])
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })

    const router = useRouter()

    useEffect(() => {
        if (data) {
            setList(data)
        }
    }, [data]);

    useEffect(() => {
        if (list.length > 0) {
            handleExport(list);
        }
    }, [list]);

    const handleExport = async (res) => {
        console.log("handleExportLab", res)
        // let sum = []
        // for (const i of res) {
        //     let arr = [
        //         { value: i.Name || '' },
        //         { value: i.Normal || '' },
        //         { value: i.Abnormal || '' },
        //         { value: i.Total || '' }
        //     ];
        //     sum.push(arr)
        // }
        // const multiDataset = [
        //     {
        //         columns: [
        //             { title: "HN" },
        //             { title: "ชื่อ - นามสกุล" },
        //             { title: "วันที่ตรวจ" },
        //             { title: "อายุ" },
        //             { title: "เพศ" },
        //             { title: "VS" },
        //             { title: "PH" },
        //             { title: "PE" },
        //             { title: "Lab" },
        //             { title: "Xray" },
        //             { title: "EKG" },
        //             { title: "เป่าปอด" },
        //             { title: "ตา" },
        //             { title: "หู" },
        //             { title: "ฟัน" },
        //             { title: "OBG" },
        //             { title: "ตรวจผล" },
        //             { title: "ตรวจผล" },
        //         ],
        //         data: sum
        //     }
        // ]
        // setExcelExport(multiDataset)
    }

    const onApprove = () => {
        approveAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: async () => {
                const saveData = {

                }
                try {
                    // startLoading()
                    succeedAlert()
                } catch (error) {
                    console.error('An error occurred while onSave:', error)
                } finally {
                    // stopLoading()
                }
            }
        })
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    console.log('list', list)

    return (
        <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] p-5 mt-4'>
            <div className='flex flex-col col-span-12 justify-start gap-2 pt-2'>
                <div className='flex flex-col justify-start h-[60vh] overflow-auto pb-2'>
                    <table className="tablePatientInformation w-full">
                        <thead className='text-[#4E4E4E] text-sm'>
                            <tr className="text-left bg-[#E2E2E2]">
                                <th className="font-light">No.</th>
                                <th className="font-light whitespace-nowrap">HN</th>
                                <th className="font-light whitespace-nowrap">ชื่อ - นามสกุล</th>
                                <th className="font-light whitespace-nowrap">วันที่ตรวจ</th>
                                <th className="font-light whitespace-nowrap">อายุ</th>
                                <th className="font-light whitespace-nowrap">เพศ</th>
                                <th className="font-light whitespace-nowrap">VS</th>
                                <th className="font-light whitespace-nowrap">PH</th>
                                <th className="font-light whitespace-nowrap">PE</th>
                                <th className="font-light whitespace-nowrap">Lab</th>
                                <th className="font-light whitespace-nowrap">Xray</th>
                                <th className="font-light whitespace-nowrap">EKG</th>
                                <th className="font-light whitespace-nowrap">เป่าปอด</th>
                                <th className="font-light whitespace-nowrap">ตา</th>
                                <th className="font-light whitespace-nowrap">หู</th>
                                <th className="font-light whitespace-nowrap">ฟัน</th>
                                <th className="font-light whitespace-nowrap">OBG</th>
                                <th className="font-light whitespace-nowrap">ตรวจผล</th>
                                <th className="font-light whitespace-nowrap">Print</th>
                                <th className="font-light whitespace-nowrap">Approve</th>
                                <th className="font-light whitespace-nowrap">Print</th>
                            </tr>
                        </thead>
                        <tbody className='text-base font-light'>
                            {list?.length > 0 && list?.map((item, index) => {
                                return <tr key={`TableManagement${index}`} className="hover">
                                    <td className="text-left">{index + 1}</td>
                                    <td className="text-left whitespace-nowrap">{item?.HN || ''}</td>
                                    <td className="text-left">{item?.Prename + ' ' + item?.Forename + ' ' + item?.Surname || ''}</td>
                                    <td className="text-left whitespace-nowrap ">{dayjs(item?.CheckupDate).format('DD/MM/YYYY') || ''}</td>
                                    <td className="text-left">{item?.Age || ''}</td>
                                    <td className="text-left">{item?.Sex || ''}</td>
                                    <td className="text-left">
                                        {item?.trVitalSign && item.trVitalSign !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trPatientHistory && item.trPatientHistory !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trPhysicalExamination && item.trPhysicalExamination !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trLabs && item.trLabs !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trXrayFromSSBs && item.trXrayFromSSBs !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trEKG && item.trEKG !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trSpiro && item.trSpiro !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trTitmu && item.trTitmu !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trAudio && item.trAudio !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trDental && item.trDental !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {item?.trOBG_PAP && item.trOBG_PAP !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        {/* {item?.trAudio && item.trAudio !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" />)} */}
                                    </td>
                                    <td className="text-left">
                                        {item?.trPatientHistory && item.trPatientHistory !== '' ? (<img src="/icon/check_mark_green.svg" alt="Check Mark" className="w-5 h-5 mr-2" />) : (<img src="/icon/x_red.svg" alt="Cancel Icon" className="w-5 h-5 mr-2" />)}
                                    </td>
                                    <td className="text-left">
                                        <button onClick={() => onApprove()} className="z-auto h-10 w-10 py-1 shadow-md text-base text-white rounded-full bg-[#289A2C] hover:bg-[#a8e7aa] ">
                                            <div className='flex gap-2 justify-center items-center' >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.6667 8.33333H15.6367C15.9207 8.33334 16.2001 8.40595 16.4482 8.54427C16.6963 8.68259 16.9049 8.88202 17.0543 9.12364C17.2036 9.36525 17.2888 9.64104 17.3016 9.9248C17.3144 10.2086 17.2545 10.4909 17.1275 10.745L14.2108 16.5783C14.0724 16.8554 13.8595 17.0884 13.596 17.2512C13.3325 17.414 13.0289 17.5001 12.7192 17.5H9.37167C9.23583 17.5 9.1 17.4833 8.9675 17.45L5.83333 16.6667M11.6667 8.33333V4.16667C11.6667 3.72464 11.4911 3.30072 11.1785 2.98816C10.866 2.67559 10.442 2.5 10 2.5H9.92083C9.50417 2.5 9.16667 2.8375 9.16667 3.25417C9.16683 3.84924 8.99051 4.43099 8.66 4.92583L5.83333 9.16667V16.6667M11.6667 8.33333H10M5.83333 16.6667H4.16667C3.72464 16.6667 3.30072 16.4911 2.98816 16.1785C2.67559 15.866 2.5 15.442 2.5 15V10C2.5 9.55797 2.67559 9.13405 2.98816 8.82149C3.30072 8.50893 3.72464 8.33333 4.16667 8.33333H6.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </button>
                                    </td>
                                    <td className="text-left">
                                        <button onClick={() => window.open(`/printreport?UID=${item?.UID}`, '_blank')} className="z-auto h-10 w-10 py-1 shadow-md text-base text-white rounded-full bg-[#6B84B7] hover:bg-[#9cb7ed] ">
                                            <div className='flex gap-2 justify-center items-center' >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.33398 1.66667C3.33398 1.20643 3.70708 0.833336 4.16732 0.833336H15.834C16.2942 0.833336 16.6673 1.20643 16.6673 1.66667V7.5H18.334C18.7942 7.5 19.1673 7.8731 19.1673 8.33333V15.8333C19.1673 16.2936 18.7942 16.6667 18.334 16.6667H16.2506V18.3333C16.2506 18.7936 15.8776 19.1667 15.4173 19.1667H4.58398C4.12375 19.1667 3.75065 18.7936 3.75065 18.3333V16.6667H1.66732C1.20708 16.6667 0.833984 16.2936 0.833984 15.8333V8.33333C0.833984 7.8731 1.20708 7.5 1.66732 7.5H3.33398V1.66667ZM5.00065 7.5H15.0006V2.5H5.00065V7.5ZM2.50065 9.16667V15H3.74253V13.3333C3.74253 12.8731 4.11562 12.5 4.57586 12.5H15.4245C15.8848 12.5 16.2579 12.8731 16.2579 13.3333V15H17.5006V9.16667H2.50065ZM5.41732 14.1667V17.5H14.584V14.1667H5.41732Z" fill="white" />
                                                </svg>
                                            </div>
                                        </button>
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
        </div>
    )
}

export default BodyinfoManagement