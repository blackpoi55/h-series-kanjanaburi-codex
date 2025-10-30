'use client'

import { addApproveLine, addNurseApprove, ListHealthRecords, ListHealthRecordsbyDoctorList, sendLineMessage } from '@/action/api'
import { Box, Pagination } from '@mui/material'
import dayjs from 'dayjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import UploadModal from '../UploadModal/UploadModal'
import NoteModal from '../UploadModal/NoteModal'
import ViewUploadModal from '../UploadModal/ViewUploadModal'
import { sendClick } from '@/utils/sendClick'

function TableShowall(props) {
    const { role, form, setWait, searchQuery, userData, doctorId } = props
    const router = useRouter()
    const [list, setList] = useState([])
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1, limit: 10 });
    const [filteredList, setFilteredList] = useState([]) // เก็บข้อมูลที่ถูกกรอง
    const [URL, setURL] = useState("");
    const [uploadOpen, setUploadOpen] = useState(false);
    const [noteOpen, setNoteOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const healthrecordsidRef = useRef();
    const headerSelectRef = useRef();

    useEffect(() => {
        if (form?.headerSelect) {
            headerSelectRef.current = form.headerSelect;
            refresh();
        }
    }, [form?.headerSelect]);


    useEffect(() => {
        const handleFocus = () => {
            console.log("🔁 หน้ากลับมา focus เรียก refresh()");
            if (headerSelectRef.current || userData === "doctor") {
                refresh();
            }
        };

        window.addEventListener("focus", handleFocus);
        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setURL(window.location.origin);
        }
    }, []);

    useEffect(() => {
        console.log(URL)
        refresh()
    }, [form])

    const uploadClick = (item) => {
        healthrecordsidRef.current = item?.id;
        setUploadOpen(true);
    };
    const handleOpenNote = (note) => {
        setNoteText(note);
        setNoteOpen(true);
    };

    const handleCloseNote = () => {
        setNoteOpen(false);
        setNoteText("");
    };

    const refresh = async () => {
        const headerSelect = headerSelectRef.current; // ใช้ค่าล่าสุดจาก ref
        if (!headerSelect && userData !== "doctor") return;
        console.log(doctorId)
        setWait(true);
        try {
            let res = {}
            if (userData === "doctor" && doctorId) {
                res = await ListHealthRecordsbyDoctorList({ doctor_license: doctorId });
            }
            else {
                res = await ListHealthRecords({ company_code: headerSelect });
            }
            if (res?.message === 'success') {
                setList(res?.data || []);
                setFilteredList(res?.data || []);
                setPaging(prev => ({
                    ...prev,
                    totalItems: res?.data.length,
                    totalPages: Math.ceil(res?.data.length / prev.limit),
                    currentPage: 1
                }));
            } else {
                console.log('error', res?.error);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setWait(false);
    };

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const openNewWindow = (url) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const width = screenWidth * 0.9;
        const height = screenHeight * 0.9;

        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        window.open(
            url,
            '_blank',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    };

    // 🔹 ค้นหาข้อมูลทุกหน้า
    useEffect(() => {
        if (!searchQuery) {
            setFilteredList(list);
            setPaging(prev => ({
                ...prev,
                totalItems: list.length,
                totalPages: Math.ceil(list.length / prev.limit),
                currentPage: 1 // รีเซ็ตไปหน้าแรกเมื่อเคลียร์การค้นหา
            }));
        } else {
            const query = searchQuery.toLowerCase();
            const newFilteredList = list.filter(item =>
                item.hn.toLowerCase().includes(query) ||
                item.first_name.toLowerCase().includes(query) ||
                item.last_name.toLowerCase().includes(query)
            );

            setFilteredList(newFilteredList);
            setPaging(prev => ({
                ...prev,
                totalItems: newFilteredList.length,
                totalPages: Math.ceil(newFilteredList.length / prev.limit),
                currentPage: 1 // รีเซ็ตไปหน้าแรกเมื่อมีการค้นหา
            }));
        }
    }, [searchQuery, list]);
    // 🔹 ฟังก์ชันเปลี่ยนหน้า Pagination
    const handlePageChange = (event, value) => {
        setPaging(prev => ({ ...prev, currentPage: value }));
    };

    // 🔹 แสดงเฉพาะข้อมูลในหน้าปัจจุบัน
    const startIndex = (paging.currentPage - 1) * paging.limit;
    const endIndex = startIndex + paging.limit;
    const displayedData = filteredList.slice(startIndex, endIndex);
    const cancelClick = (item) => {

    }
    const statusCheck = (item) => {
        if (item?.reject_status == "Y") {
            return (<td className={`text-left text-red-500`}>ปฏิเสธการอนุมัติ</td>)
        }
        else if (item?.send_startus == "Y") {
            return (<td className={`text-left text-blue-500`}>ส่งผลตรวจแล้ว</td>)
        }
        else if ((userData === "doctor" && item?.doctor_approve == "Y") ||
            (userData === "nurse" && item?.nurse_approve == "Y") ||
            (userData === "admin-care" && item?.doctor_approve == "Y" && item?.nurse_approve == "Y")) {
            return (<td className={`text-left text-green-500`}>ยืนยันผลแล้ว</td>)
        }
        else {
            return (<td className={`text-left`}>
                <div className="flex">
                    <label className=' text-orange-500'>รอยืนยันผล</label>
                    {userData === "doctor" ?
                        <label className=' text-red-500 ml-1'>{item?.nurse_approve !== "Y" ? "(รอพยาบาล)" : ""}</label>
                        : ""}
                </div>
            </td>)
        }
    }
    return (
        <>
            {userData === "doctor" ?
                <ViewUploadModal
                    open={uploadOpen}
                    onClose={() => setUploadOpen(false)}
                    healthrecordsidRef={healthrecordsidRef}
                    onSaved={refresh}
                />
                // <UploadModal
                //     open={uploadOpen}
                //     onClose={() => setUploadOpen(false)}
                //     healthrecordsidRef={healthrecordsidRef}
                //     onSaved={refresh} // ✅ เพิ่ม callback ไปเลย
                // />
                :
                <UploadModal
                    open={uploadOpen}
                    onClose={() => setUploadOpen(false)}
                    healthrecordsidRef={healthrecordsidRef}
                    onSaved={refresh} // ✅ เพิ่ม callback ไปเลย
                />
            }
            <NoteModal name={"หมายเหตุจากพยาบาล"} open={noteOpen} onClose={handleCloseNote} noteText={noteText} />


            <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF]'>
                <div className='flex flex-col justify-start h-[55vh] overflow-y-auto  px-2 pb-2'>
                    <table className="tablePatientInformation  w-full  ">
                        <thead className='text-[#4E4E4E]  text-sm z-10'>
                            <tr className="  text-left bg-[#E2E2E2]">
                                <th className="font-light">No.</th>
                                {/* <th className="font-light">
                                <input checked={CheckAllArr} onChange={() => onCheckAll()} type="checkbox" className='w-5 h-5 accent-[#365382]' id='normal-selection1' name="normal-selection" value="" />
                            </th> */}
                                <th className="font-light">วันที่ตรวจ</th>
                                <th className="font-light text-center">A5</th>
                                <th className="font-light text-center">A4</th>
                                <th className="font-light text-center">HN</th>
                                <th className="font-light min-w-[200px]">ชื่อ-นามสกุล</th>
                                <th className="font-light">อายุ</th>
                                <th className="font-light">เพศ</th>
                                <th className="font-light">Package</th>
                                <th className="font-light">Status</th>
                                <th className="font-light text-center">Upload</th>
                                <th className="font-light text-center">Nurse Note</th>
                                {userData != "doctor" && userData != "nurse" ?
                                    <>
                                        <th className="font-light text-center">Send</th>
                                        <th className="font-light text-center">Cancel</th>
                                    </>
                                    : ""
                                }
                            </tr>
                        </thead>
                        <tbody className='text-base font-light'>
                            {displayedData.length > 0 && displayedData.map((item, index) => (
                                <tr key={`trPatientLab${index}`} className="hover">
                                    <td className={`text-center`}>{startIndex + index + 1}</td>
                                    <td className={`text-left`}>{moment(item?.exam_date).add(543, 'year').locale('th').format('DD/MM/YYYY') || ''}</td>
                                    <td className={`text-left whitespace-nowrap`}>
                                        <div className="flex justify-center items-center">
                                            <button
                                                onClick={() =>
                                                    openNewWindow(`/Care-Vista-C/individualreport/pdf?hn=${item?.hn}&en=${item?.en}`)
                                                }
                                                className="w-8 h-8 border rounded-full bg-[#4CCAF2] hover:bg-[#4CCAF2] text-[#FFFFFF]"
                                            >
                                                <div className="flex gap-2 justify-center items-center cursor-pointer">
                                                    <img className="cursor-pointer" width={15} src="/icon/paper.svg" />
                                                </div>
                                            </button>
                                        </div>
                                    </td>

                                    <td className={`text-left whitespace-nowrap`}>
                                        <div className="flex justify-center items-center">
                                            <button
                                                onClick={() =>
                                                    openNewWindow(`/Care-Vista-C/individualreport/pdfa4?hn=${item?.hn}&en=${item?.en}`)
                                                }
                                                className="w-8 h-8 border rounded-full bg-[#4cf270] hover:bg-[#5af24c] text-[#FFFFFF]"
                                            >
                                                <div className="flex gap-2 justify-center items-center cursor-pointer">
                                                    <img className="cursor-pointer" width={15} src="/icon/paper.svg" />
                                                </div>
                                            </button>
                                        </div>
                                    </td>

                                    <td
                                        className=" text-center text-[#365382]"
                                        onClick={() =>
                                            openNewWindow(`/Care-Vista-C/individualreport?hn=${item?.hn}&en=${item?.en}`)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {item?.hn || "-"}
                                    </td>


                                    <td className={`text-left whitespace-nowrap`}>{(item?.prefix || '') + ' ' + (item?.first_name || '') + ' ' + (item?.last_name || '')}</td>
                                    <td className={`text-left break-words`}>{item?.age || '-'}</td>
                                    <td className={`text-left break-words`}>{item?.gender || '-'}</td>
                                    <td className={`text-left`}>{item?.package || ''}</td>
                                    {statusCheck(item)}
                                    <td className={` text-center`}>
                                        <button
                                            onClick={() => uploadClick(item)}
                                            className={`w-8 h-8 border rounded-full text-white ${(item?.tr_health_files?.length > 0) ? 'bg-green-500' : 'bg-orange-500'}`}
                                        >
                                            <div className="flex gap-2 justify-center items-center cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 p-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                                </svg>
                                            </div>
                                        </button>
                                    </td>
                                    <td className=" text-center">
                                        <button disabled={!item?.nurse_note} onClick={() => handleOpenNote(item.nurse_note)} className="w-8 h-8 border rounded-full text-white bg-[#6B84B7] hover:bg-[#5c75a0] disabled:bg-gray-300">
                                            📝
                                        </button>
                                    </td>
                                    {userData != "doctor" && userData != "nurse" ?
                                        <>

                                            <td className={` text-center`}>
                                                <button
                                                    disabled={
                                                        role !== "am" ||
                                                        item?.nurse_approve !== "Y" ||
                                                        item?.doctor_approve !== "Y" ||
                                                        item?.reject_status == "Y"
                                                    }
                                                    onClick={() => sendClick(item, URL, refresh, null)}
                                                    className={`w-8 h-8 border rounded-full text-white disabled:bg-gray-300  ${item?.send_startus === "Y" ? "bg-green-500 hover:bg-green-600" : "bg-[#26A1DC] hover:bg-[#26A1DC]"} ${role !== "am" || item?.nurse_approve !== "Y" || item?.doctor_approve !== "Y" ? "cursor-not-allowed bg-gray-300" : ""}`}
                                                >
                                                    <div className="flex gap-2 justify-center items-center cursor-pointer">
                                                        <img className="cursor-pointer" width={15} src="/icon/message.svg" />
                                                    </div>
                                                </button>

                                            </td>
                                            <td className=" text-center flex justify-center items-center gap-2">
                                                <button disabled={role != "am" || item?.nurse_approve != 'Y' || item?.doctor_approve != 'Y' || item?.reject_status == "Y"} onClick={() => cancelClick(item)} className='w-8 h-8 border rounded-full disabled:bg-gray-300 bg-[#FF6161] hover:bg-[#FF6161] text-[#FFFFFF]' >
                                                    <div className='flex gap-2 justify-center items-center cursor-pointer'>
                                                        <img className=' cursor-pointer' width={15} src="/icon/x_red_white.svg" />
                                                    </div>
                                                </button>
                                            </td>
                                        </>
                                        : ""
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredList.length <= 0 && <div className='flex justify-center items-center mt-4'>
                        <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                    </div>}
                </div>
                <div className='w-full mt-4 flex justify-center'>
                    <Pagination
                        count={Math.ceil(filteredList.length / paging.limit)}
                        page={paging?.currentPage || 1}
                        onChange={handlePageChange}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                backgroundColor: '#FFFFFF',
                                boxShadow: '2px 2px 4px 0px #6B84B740',
                                width: '32px',
                                height: '32px',
                                padding: '4px 12px',
                                gap: '9px',
                                borderRadius: '8px',
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
        </>
    )
}

export default TableShowall