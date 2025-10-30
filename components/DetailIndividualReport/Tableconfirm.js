'use client'

import { addApproveLine, addNurseApprove, ListHealthRecords, ListHealthRecordsbyDoctorList, sendLineMessage } from '@/action/api'
import { Pagination } from '@mui/material'
import dayjs from 'dayjs'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import NoteModal from '../UploadModal/NoteModal'
import { sendClick } from '@/utils/sendClick'

function Tableconfirm(props) {
    const { role, form, setWait, searchQuery, userData, doctorId } = props
    const [list, setList] = useState([]); // เก็บข้อมูลทั้งหมด
    const [filteredList, setFilteredList] = useState([]); // เก็บข้อมูลที่ถูกกรอง
    const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1, limit: 10 });
    const [URL, setURL] = useState("");
    const headerSelectRef = useRef();
    const [noteOpen, setNoteOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    useEffect(() => {
        if (form?.headerSelect) {
            headerSelectRef.current = form.headerSelect;
            refresh();
        }
    }, [form?.headerSelect]);
    const toggleSelect = (id) => {
        setSelectedIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };
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
    useEffect(() => {
        const allSelected = filteredList.every(item => selectedIds.includes(item.id));
        setIsAllSelected(allSelected);
    }, [filteredList, selectedIds]);

    const handleCloseNote = () => {
        setNoteOpen(false);
        setNoteText("");
    };
    const refresh = async () => {
        const headerSelect = headerSelectRef.current;
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
                    filteredData = res?.data?.filter(x => x.nurse_approve == "Y" && x.send_startus !== "Y" && x.reject_status !== "Y") || [];
                } else if (userData === "doctor") {
                    filteredData = res?.data?.filter(x => x.doctor_approve == "Y" && x.send_startus !== "Y" && x.reject_status !== "Y") || [];
                } else {
                    filteredData = res?.data?.filter(x => (x.nurse_approve == "Y" && x.doctor_approve == "Y") && x.send_startus !== "Y" && x.reject_status !== "Y") || [];
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
    const handleUnapprove = async (id) => {
        const confirm = await Swal.fire({
            title: "ยืนยันยกเลิกการอนุมัติ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ใช่, ยกเลิกเลย",
            cancelButtonText: "ยกเลิก"
        });

        if (!confirm.isConfirmed) return;

        try {
            await addNurseApprove(id, { doctor_approve: "N" });
            Swal.fire({ icon: "success", title: "ยกเลิกสำเร็จ", timer: 2000, showConfirmButton: false });
            refresh();
        } catch (err) {
            Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาด", text: "ไม่สามารถยกเลิกได้ กรุณาลองใหม่" });
        }
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
    const handleSendSelected = async () => {
        const selectedRecords = filteredList.filter((item) => selectedIds.includes(item.id));

        if (selectedRecords.length === 0 || !URL) {
            Swal.fire({
                icon: "warning",
                title: "ยังไม่ได้เลือกผู้รับ",
                text: "กรุณาเลือกข้อมูลที่ต้องการส่งก่อน",
            });
            return;
        }

        const confirm = await Swal.fire({
            icon: "question",
            title: "ยืนยันการส่ง?",
            text: `คุณต้องการส่งผลตรวจ ${selectedRecords.length} รายการใช่หรือไม่?`,
            showCancelButton: true,
            confirmButtonText: "ส่งเลย",
            cancelButtonText: "ยกเลิก",
        });

        if (!confirm.isConfirmed) return;

        for (const record of selectedRecords) {
            if (record.send_startus === "Y") continue;

            const profileImage = `${URL}/images/doctor.png`;
            const flexMessage = {
                type: "bubble",
                hero: {
                    type: "image",
                    // url: profileImage,
                    url: "https://uat-h-series.telecorp.co.th/images/icon.png",
                    size: "full",
                    aspectRatio: "20:13",
                    aspectMode: "cover",
                },
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        { type: "text", text: "📋 ประวัติการรักษา", weight: "bold", size: "xl", align: "center", color: "#1DB446" },
                        { type: "text", text: `👤 ${record.prefix} ${record.first_name} ${record.last_name}`, weight: "bold", size: "md", margin: "md" },
                        { type: "text", text: `🏥 HN: ${record.hn} | อายุ: ${record.age} ปี`, size: "sm", color: "#555555" },
                        { type: "text", text: `📅 วันที่ตรวจ: ${new Date(record.exam_date).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" })}`, size: "sm", color: "#555555" },
                        { type: "separator", margin: "lg" },
                    ],
                },
                footer: {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                        {
                            type: "button",
                            style: "primary",
                            action: {
                                type: "uri",
                                label: "📄 ดูรายงานฉบับเต็ม",
                                uri: `${URL}/Care-Vista-C/individualreport/pdf?hn=${record.hn}&en=${record.en}&security=1`,
                            },
                        },
                    ],
                },
            };

            const payload = {
                sendType: "single",
                userId: record?.tr_health_patient?.line_uid,
                messageType: "flex",
                flexMessage: JSON.stringify(flexMessage),
            };
            if (!payload.userId) {
                Swal.fire({
                    icon: "warning",
                    title: "⚠️ ไม่พบ LINE ID",
                    text: "ผู้ใช้ยังไม่ได้เชื่อมต่อ LINE กรุณาลงทะเบียนข้อมูลผู้ใช้",
                    showConfirmButton: true,
                });
                return;
            }
            try {
                // const res = await fetch("/api/sendLineMessage", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(payload),
                // });
                // const result = await res.json();
                const result = await sendLineMessage(payload);

                // if (res.ok) {
                if (!result.error) {
                    await addApproveLine(record.id, {
                        send_startus: "Y",
                        send_time: dayjs().format("YYYY-MM-DD"),
                    });
                }
            } catch (err) {
                console.error("❌ ส่งไม่สำเร็จ", err);
            }
        }

        Swal.fire({
            icon: "success",
            title: "ส่งเรียบร้อย",
            text: "ส่งข้อความไปยังรายการที่เลือกแล้ว",
            timer: 3000,
            showConfirmButton: false,
        });

        setSelectedIds([]);
        refresh();
    };

    const handleSendAll = async () => {
        if (!URL) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ไม่สามารถโหลด URL ได้ กรุณาลองใหม่",
            });
            return;
        }

        const confirm = await Swal.fire({
            icon: "warning",
            title: "ยืนยันการส่งทั้งหมด?",
            text: `คุณต้องการส่งผลตรวจทั้งหมด ${filteredList.length} รายการใช่หรือไม่?`,
            showCancelButton: true,
            confirmButtonText: "ส่งเลย",
            cancelButtonText: "ยกเลิก",
        });

        if (!confirm.isConfirmed) return;

        for (const record of filteredList) {
            // ✅ ส่งเฉพาะที่ยังไม่ถูกส่ง
            if (record.send_startus === "Y") continue;

            const profileImage = `${URL}/images/doctor.png`;
            const flexMessage = {
                type: "bubble",
                hero: {
                    type: "image",
                    // url: profileImage,
                    url: "https://uat-h-series.telecorp.co.th/images/icon.png",
                    size: "full",
                    aspectRatio: "20:13",
                    aspectMode: "cover",
                },
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "📋 ประวัติการรักษา",
                            weight: "bold",
                            size: "xl",
                            align: "center",
                            color: "#1DB446",
                        },
                        {
                            type: "text",
                            text: `👤 ${record.prefix} ${record.first_name} ${record.last_name}`,
                            weight: "bold",
                            size: "md",
                            margin: "md",
                        },
                        {
                            type: "text",
                            text: `🏥 HN: ${record.hn} | อายุ: ${record.age} ปี`,
                            size: "sm",
                            color: "#555555",
                        },
                        {
                            type: "text",
                            text: `📅 วันที่ตรวจ: ${new Date(record.exam_date).toLocaleDateString("th-TH", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}`,
                            size: "sm",
                            color: "#555555",
                        },
                        {
                            type: "separator",
                            margin: "lg",
                        },
                    ],
                },
                footer: {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                        {
                            type: "button",
                            style: "primary",
                            action: {
                                type: "uri",
                                label: "📄 ดูรายงานฉบับเต็ม",
                                uri: `${URL}/Care-Vista-C/individualreport/pdf?hn=${record.hn}&en=${record.en}&security=1`,
                            },
                        },
                    ],
                },
            };

            const payload = {
                sendType: "single",
                userId: record?.tr_health_patient?.line_uid,
                messageType: "flex",
                flexMessage: JSON.stringify(flexMessage),
            };
            if (!payload.userId) {
                Swal.fire({
                    icon: "warning",
                    title: "⚠️ ไม่พบ LINE ID",
                    text: "ผู้ใช้ยังไม่ได้เชื่อมต่อ LINE กรุณาลงทะเบียนข้อมูลผู้ใช้",
                    showConfirmButton: true,
                });
                return;
            }
            try {
                // const res = await fetch("/api/sendLineMessage", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(payload),
                // });
                // const result = await res.json();
                const result = await sendLineMessage(payload);

                // if (res.ok) {
                if (!result.error) {
                    // ✅ stamp send status
                    const saveData = {
                        send_startus: "Y",
                        send_time: dayjs().format("YYYY-MM-DD"),
                    };

                    if (record?.id) {
                        await addApproveLine(record.id, saveData);
                    }
                }
            } catch (err) {
                console.error("❌ ส่งไม่สำเร็จ", err);
            }
        }

        Swal.fire({
            icon: "success",
            title: "ส่งเรียบร้อย",
            text: "ส่งข้อความไปยังทุกคนเรียบร้อยแล้ว",
            timer: 3000,
            showConfirmButton: false,
        });

        refresh();
    };
    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            const allIds = filteredList.map(item => item.id);
            setSelectedIds(allIds);
        }
        setIsAllSelected(!isAllSelected);
    };


    // 🔹 แสดงเฉพาะข้อมูลในหน้าปัจจุบัน
    const startIndex = (paging.currentPage - 1) * paging.limit;
    const endIndex = startIndex + paging.limit;
    const displayedData = filteredList.slice(startIndex, endIndex);

    return (
        <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF]'>
            <NoteModal name={"หมายเหตุจากพยาบาล"} open={noteOpen} onClose={handleCloseNote} noteText={noteText} />
            {userData !== "doctor" && userData !== "nurse" && (
                <div className="flex justify-end mb-2 gap-2">
                    <button
                        onClick={handleSendAll}
                        className="bg-[#26A1DC] hover:bg-[#1c7fb0] text-white px-4 py-2 rounded shadow-md disabled:bg-gray-300"
                        disabled={filteredList.length === 0}
                    >
                        📤 Send All
                    </button>
                    <button
                        onClick={handleSendSelected}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md disabled:bg-gray-300"
                        disabled={selectedIds.length === 0}
                    >
                        📤 Send Selected ({selectedIds.length})
                    </button>
                </div>
            )}

            <div className='flex flex-col justify-start h-[55vh] overflow-y-auto px-2 pb-2'>
                <table className="tablePatientInformation w-full">
                    <thead className='text-[#4E4E4E]  text-sm z-10'>
                        <tr className="text-left bg-[#E2E2E2]">
                            {userData != "doctor" && userData != "nurse" && (
                                <th className="font-light text-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        title="Select All"
                                    />
                                </th>
                            )}
                            <th className="font-light">No.</th>
                            <th className="font-light">วันที่ตรวจ</th>
                            <th className="font-light  text-center">HN</th>
                            <th className="font-light min-w-[200px]">ชื่อ-นามสกุล</th>
                            <th className="font-light">อายุ</th>
                            <th className="font-light">เพศ</th>
                            <th className="font-light">Package</th>
                            <th className="font-light">Status</th>
                            {userData === "doctor" && <th className="font-light text-center">Unapprove</th>}
                            <th className="font-light text-center">Nurse Note</th>
                            {userData != "doctor" && userData != "nurse" ?
                                <>
                                    <th className="font-light">Send</th>
                                </>
                                : ""
                            }
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        {displayedData.length > 0 ? (
                            displayedData.map((item, index) => (
                                <tr key={`trPatientLab${index}`} className="hover">
                                    {userData != "doctor" && userData != "nurse" && (
                                        <td className="text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                            />
                                        </td>
                                    )}
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
                                    <td className={`text-left text-green-500`}>
                                        ยืนยันผลแล้ว
                                    </td>
                                    {userData === "doctor" && (
                                        <td className="text-center flex justify-center">
                                            <button
                                                onClick={() => handleUnapprove(item.id)}
                                                className="text-white hover:text-gray-800 bg-red-500 w-8 h-8 font-bold rounded-full flex justify-center items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </td>
                                    )}
                                    <td className=" text-center">
                                        <button disabled={!item?.nurse_note} onClick={() => handleOpenNote(item.nurse_note)} className="w-8 h-8 border rounded-full text-white bg-[#6B84B7] hover:bg-[#5c75a0] disabled:bg-gray-300">
                                            📝
                                        </button>
                                    </td>
                                    {userData != "doctor" && userData != "nurse" ?
                                        <>
                                            <td className={`text-left`}>
                                                <button
                                                    disabled={
                                                        role !== "am" ||
                                                        item?.nurse_approve !== "Y" ||
                                                        item?.doctor_approve !== "Y"
                                                    }
                                                    onClick={() => sendClick(item, URL, refresh, setSelectedIds)}
                                                    className={`w-8 h-8 border rounded-full text-white ${item?.send_startus === "Y" ? "bg-green-500 hover:bg-green-600" : "bg-[#26A1DC] hover:bg-[#26A1DC]"} ${role !== "am" || item?.nurse_approve !== "Y" || item?.doctor_approve !== "Y" ? "cursor-not-allowed bg-gray-300" : ""}`}
                                                >
                                                    <div className="flex gap-2 justify-center items-center cursor-pointer">
                                                        <img className="cursor-pointer" width={15} src="/icon/message.svg" />
                                                    </div>
                                                </button>
                                            </td>
                                        </>
                                        : ""
                                    }
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
    );
}

export default Tableconfirm;
