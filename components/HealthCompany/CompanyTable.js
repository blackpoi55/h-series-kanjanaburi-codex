'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { updateCompanyHealthRecord } from '@/action/api'

const CompanyTable = ({ data, refresh }) => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null); // ข้อมูลที่ใช้แก้ไข
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    useEffect(() => {
        const handleFocus = () => {
            console.log("🔁 หน้ากลับมา focus เรียก refresh()");
            refresh();
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, []);
    // ✅ เปิด Modal และโหลดข้อมูลที่ต้องการแก้ไข
    const editClick = (item) => {
        setEditData(item);
        setIsModalOpen(true);
    };

    // ✅ ปิด Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setEditData(null);
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
    // ✅ บันทึกข้อมูลที่แก้ไข
    const handleSave = async () => {
        console.log(editData)
        try {
            const res = await updateCompanyHealthRecord(editData.uid, editData); // 🔹 ส่ง API ไปอัปเดตข้อมูล
            console.log("res", res)
            if (!res.error) {
                Swal.fire({
                    icon: "success",
                    title: "บันทึกสำเร็จ!",
                    text: "ข้อมูลบริษัทได้รับการอัปเดตแล้ว",
                    showConfirmButton: false,
                    timer: 2000 // ✅ ปิด Swal อัตโนมัติใน 2 วินาที
                }).then(() => {
                    refresh();  // ✅ โหลดข้อมูลใหม่
                    closeModal(); // ✅ ปิด Modal
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "ไม่สามารถอัปเดตข้อมูลได้",
                    showConfirmButton: false,
                    timer: 2000 // ❌ ปิด Swal อัตโนมัติใน 2 วินาที
                });
            }
        } catch (error) {
            console.error("Error updating company:", error);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ไม่สามารถอัปเดตข้อมูลได้",
                showConfirmButton: false,
                timer: 2000 // ❌ ปิด Swal อัตโนมัติใน 2 วินาที
            });
        }

    };
    const handleEditChange = (name, e) => {
        editData[name] = e.target.value
        setEditData({ ...editData })
    }
    return (
        <div className="w-full h-[65vh] p-4 mr-2 bg-[#F3F3F3] rounded-2xl mt-2">
            {/* Modal แก้ไขข้อมูล */}
            {isModalOpen && editData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[11]">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h3 className="text-lg font-bold mb-4">📝 แก้ไขข้อมูลบริษัท</h3>

                        <label className="block mb-2">ชื่อองค์กร</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.name}
                            onChange={(e) => handleEditChange("name", e)}
                        />

                        <label className="block mb-2">Contact</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.contact}
                            onChange={(e) => handleEditChange("contact", e)}
                        />

                        <label className="block mb-2">E-mail</label>
                        <input
                            type="email"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.email}
                            onChange={(e) => handleEditChange("email", e)}
                        />
                        <label className="block mb-2">เบอร์โทร</label>
                        <input
                            type="email"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.tel}
                            onChange={(e) => handleEditChange("tel", e)}
                        />
                        <label className="block mb-2">ที่อยู่</label>
                        <textarea
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.address}
                            onChange={(e) => handleEditChange("address", e)}
                        />

                        <div className="flex justify-end gap-2">
                            <button onClick={closeModal} className="px-4 py-2 border rounded-lg text-gray-700">
                                ❌ ยกเลิก
                            </button>
                            <button onClick={() => handleSave()} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                ✅ บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex flex-col'>
                <label className='text-[#014F7D] font-bold text-xl w-full text-center mb-2' >Management</label>
                <label className='w-full text-center' >ข้อมูลทั้งหมดขององค์กร</label>
                <div className="w-full flex justify-end">
                    <button onClick={() => openNewWindow('/Care-Vista-C/importresult')} className={`border border-[#458236] rounded-lg p-2 text-center mr-2  bg-[#52b462] text-white flex justify-center items-center `}>
                        <svg className='w-10' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <label className='cursor-pointer w-full'>Import Data</label>
                    </button>
                </div>
            </div>
            <div className="w-full h-[85%] overflow-auto flex flex-col">

                <div className="min-w-[800px]"> {/* กำหนด min-width ให้แน่ใจว่า table scroll ได้ */}
                    <table className="mt-4 w-full border-collapse rounded-lg shadow-lg">
                        <thead className="">
                            <tr className='sticky top-0 text-white text-sm bg-[#014F7D]'>
                                <th className="px-4 py-3 text-center">No.</th>
                                <th className="px-4 py-3 text-center">Company ID</th>
                                <th className="px-4 py-3 text-left">ชื่อองค์กร</th>
                                <th className="px-4 py-3 text-left">Contact</th>
                                <th className="px-4 py-3 text-left">E-mail</th>
                                <th className="px-4 py-3 text-center">จำนวนผู้ลงทะเบียน</th>
                                {/* <th className="px-4 py-3 text-center">แพ็คเกจตรวจสุขภาพ</th> */}
                                <th className="px-4 py-3 text-center">Checkup</th>
                                {/* <th className="px-4 py-3 text-center">Import Data</th> */}
                                <th className="px-4 py-3 text-center">Detail</th>
                                <th className="px-4 py-3 text-center">Edit</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                            {data.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-gray-100 transition-colors duration-200 ${index % 2 == 1 ? "bg-gray-200" : "bg-white"}`}
                                >
                                    <td className="px-4 py-3 border-b text-center">{index + 1}</td>
                                    <td className="px-4 py-3 border-b text-center">{row.code || "-"}</td>
                                    <td className="px-4 py-3 border-b text-left">{row.name || "-"}</td>
                                    <td className="px-4 py-3 border-b text-left">{row.contact || "-"}</td>
                                    <td className="px-4 py-3 border-b text-left">{row.email || "-"}</td>
                                    <td className="px-4 py-3 border-b text-center">{row.record_count || "0"}</td>
                                    {/* <td className="px-4 py-3 border-b text-center">
                                        <label className='cursor-pointer border-b-2 border-[[#365382]] text-[#365382]'>{row.aaa || "-"}</label>
                                    </td> */}
                                    <td className="px-4 py-3 border-b text-center">
                                        <div className="flex justify-center">
                                            <button onClick={() => router.push('/Care-Vista-C/individualtable?code=' + row.code)} className={`w-10 border border-[#826436] rounded-full p-2 text-center mr-2  bg-[#b48a52] text-white flex justify-center items-center `}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    {/* <td className="px-4 py-3 border-b text-center">
                                        <div className="flex justify-center">
                                            <button onClick={() => router.push('/Care-Vista-C/importresult?code=' + row.code)} className={`w-10 border border-[#458236] rounded-full p-2 text-center mr-2  bg-[#52b462] text-white flex justify-center items-center `}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td> */}
                                    <td className="px-4 py-3 border-b text-center">
                                        <div className="flex justify-center">
                                            <button onClick={() => router.push('/Care-Vista-C/healthdashboard?code=' + row.code)} className={`w-10 border border-[#365382] rounded-full p-2 text-center mr-2  bg-[#5278b4] text-white flex justify-center items-center `}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-b text-center">
                                        <div className="flex justify-center">
                                            <button onClick={() => editClick(row)} className={`w-10 border border-[#7c3682] rounded-full p-2 text-center mr-2  bg-[#b452ac] text-white flex justify-center items-center `}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompanyTable
