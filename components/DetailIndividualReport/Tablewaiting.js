'use client'

import { ListHealthRecords, ListHealthRecordsbyDoctorList } from '@/action/api'
import { Pagination } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import NoteModal from '../UploadModal/NoteModal'

function Tablewaiting(props) {
    const { role, form, setWait, searchQuery, userData, doctorId } = props
    const router = useRouter();
    const [list, setList] = useState([]); // เก็บข้อมูลทั้งหมด
    const [filteredList, setFilteredList] = useState([]); // เก็บข้อมูลที่ถูกกรอง
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1, limit: 10 });
    const [URL, setURL] = useState("");
    const headerSelectRef = useRef();
    const [noteOpen, setNoteOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
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
    const handleOpenNote = (note) => {
        setNoteText(note);
        setNoteOpen(true);
    };

    const handleCloseNote = () => {
        setNoteOpen(false);
        setNoteText("");
    };
    const refresh = async () => {
        const headerSelect = headerSelectRef.current;
        console.log("userData", userData)
        if (!headerSelect && userData !== "doctor") return;

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
                let filteredData = [];

                if (userData === "nurse") {
                    filteredData = res?.data?.filter(x => x.nurse_approve !== "Y" && x.send_startus !== "Y" && x.reject_status !== "Y") || [];
                } else if (userData === "doctor") {
                    filteredData = res?.data?.filter(x => x.doctor_approve !== "Y" && x.send_startus !== "Y" && x.reject_status !== "Y") || [];
                } else {
                    filteredData = res?.data?.filter(x => (x.nurse_approve !== "Y" || x.doctor_approve !== "Y") && x.send_startus !== "Y" && x.reject_status !== "Y") || [];
                }

                setList(filteredData);
                setFilteredList(filteredData);
                setPaging(prev => ({
                    ...prev,
                    totalItems: filteredData.length,
                    totalPages: Math.ceil(filteredData.length / prev.limit),
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

    useEffect(() => {
        if (!searchQuery) {
            setFilteredList(list);
            setPaging(prev => ({
                ...prev,
                totalItems: list.length,
                totalPages: Math.ceil(list.length / prev.limit),
                currentPage: 1
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
                currentPage: 1
            }));
        }
    }, [searchQuery, list]);

    const handlePageChange = (event, value) => {
        setPaging(prev => ({ ...prev, currentPage: value }));
    };

    const startIndex = (paging.currentPage - 1) * paging.limit;
    const endIndex = startIndex + paging.limit;
    const displayedData = filteredList.slice(startIndex, endIndex);

    return (
        <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF]'>
            <NoteModal name={"หมายเหตุจากพยาบาล"} open={noteOpen} onClose={handleCloseNote} noteText={noteText} />
            <div className='flex flex-col justify-start h-[55vh] overflow-y-auto px-2 pb-2'>
                <table className="tablePatientInformation w-full">
                    <thead className='text-[#4E4E4E]  text-sm z-10'>
                        <tr className="text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">วันที่ตรวจ</th>
                            <th className="font-light  text-center">HN</th>
                            <th className="font-light min-w-[200px]">ชื่อ-นามสกุล</th>
                            <th className="font-light">อายุ</th>
                            <th className="font-light">เพศ</th>
                            <th className="font-light">Package</th>
                            <th className="font-light">Status</th>
                            <th className="font-light text-center">Nurse Note</th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {displayedData.length > 0 ? (
                            displayedData.map((item, index) => (
                                <tr key={`trPatientLab${index}`} className="hover">
                                    <td className="text-center">{startIndex + index + 1}</td>
                                    <td className={`text-left`}>{moment(item?.exam_date).add(543, 'year').locale('th').format('DD/MM/YYYY') || ''}</td>
                                    <td
                                        className=" text-center text-[#365382]"
                                        onClick={() =>
                                            openNewWindow(`/Care-Vista-C/individualreport?hn=${item?.hn}&en=${item?.en}`)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {item?.hn || "-"}
                                    </td>
                                    <td className="text-left whitespace-nowrap">{`${item?.prefix || ''} ${item?.first_name || ''} ${item?.last_name || ''}`}</td>
                                    <td className="text-left">{item?.age || '-'}</td>
                                    <td className="text-left">{item?.gender || '-'}</td>
                                    <td className="text-left">{item?.package || '-'}</td>
                                    <td className={`text-left`}>
                                        <div className="flex">
                                            <label className=' text-orange-500'>รอยืนยันผล</label>
                                            {userData === "doctor" ?
                                                <label className=' text-red-500 ml-1'>{item?.nurse_approve !== "Y" ? "(รอพยาบาล)" : ""}</label>
                                                : ""}
                                        </div>

                                    </td>
                                    <td className=" text-center">
                                        <button disabled={!item?.nurse_note} onClick={() => handleOpenNote(item.nurse_note)} className="w-8 h-8 border rounded-full text-white bg-[#6B84B7] hover:bg-[#5c75a0] disabled:bg-gray-300">
                                            📝
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center text-2xl font-semibold py-4">
                                    ไม่มีข้อมูลที่ตรงกับการค้นหา
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='w-full mt-4 flex justify-center'>
                <Pagination
                    count={paging?.totalPages || 1}
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
                            opacity: 1,
                            color: '#365382',
                            '&:hover': {
                                backgroundColor: '#365382',
                                color: '#FFFFFF',
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#365382',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#2e4a6f',
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default Tablewaiting;