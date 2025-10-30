'use client'
import { postHealthUsers, putHealthUsers } from '@/action/api'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import SignatureBox from '../Tool/SignatureBox'
// import { updateUserData } from '@/action/api' // ← เพิ่มถ้ามี API

const UserTable = ({ data, refresh }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState(null)
    const [headerModal, setheaderModal] = useState("")
    const sigRef = useRef(null);
    const rolemap = [
        // {
        //     description: "Administrator with full access",
        //     id: "ad70eeee-8a52-4850-b6b4-ccef6507cc80",
        //     role_name: "admin"
        // },
        {
            description: "Administrator with full access",
            id: "76dda334-320e-4041-ac27-a2fa8c40a684",
            role_name: "admin-care"
        },
        {
            description: "Doctor with medical permissions",
            id: "ba6e57cb-bd6c-435e-a35e-98c97dabbeee",
            role_name: "doctor"
        },
        {
            description: "Nurse with limited access",
            id: "11a12a4d-1ff7-47c1-92ae-44cb3bdb8a51",
            role_name: "nurse"
        }
    ]
    const addClick = () => {
        setheaderModal("เพิ่มข้อมูลผู้ใช้")
        const defaultRole = rolemap[0]; // เลือก role เริ่มต้นเป็น admin (หรือจะ set เป็น "" ก็ได้)
        setEditData({
            username: '',
            full_name: '',
            full_name_en: '',
            email: '',
            phone: '',
            license: '',
            signature: '',
            role_id: defaultRole.id,
            tr_health_role: defaultRole
        });
        setIsModalOpen(true);
    };

    const editClick = (user) => {
        setheaderModal("แก้ไขข้อมูลผู้ใช้")
        setEditData(user)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditData(null)
    }

    const handleChange = (key, value) => {
        setEditData((prev) => ({ ...prev, [key]: value }))
    }

    const handleSave = async () => {
        console.log(editData);
        if (sigRef.current) {
            const signatureData = sigRef.current.getSignature();
            editData.signature = signatureData;
        }

        let res;
        if (editData?.id) {
            let val = structuredClone(editData); // clone ลึก ไม่กระทบต้นฉบับ
            delete val.password; // ลบ password ออกแน่ๆ 
            console.log(val);
            res = await putHealthUsers(val.id, val); // ✅ แก้ไข
        } else {
            let val = { ...editData, password: editData.license };
            res = await postHealthUsers(val); // ✅ เพิ่มใหม่
        }

        if (!res.error) {
            Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                text: 'ข้อมูลผู้ใช้ได้รับการบันทึกแล้ว',
                timer: 1500,
                showConfirmButton: false,
            });
            closeModal();
            refresh();
        } else {
            let errorText = '';
            console.log("errorText", res);
            if (typeof res?.message === 'string') {
                errorText = res?.message.replace('Duplicate fields found:', '').trim();
            } else {
                errorText = JSON.stringify(res?.message);
            }
            console.log("errorText", errorText)
            const errorFields = errorText.split(',').map(field => field.trim()).filter(f => f);
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถบันทึกข้อมูลได้',
                html: `
        <div style="text-align: left; font-size: 14px;">
            <p style="margin: 0 0 8px 0;">🚫 <b>เกิดข้อผิดพลาด</b> เนื่องจากข้อมูลซ้ำในฟิลด์ต่อไปนี้:</p>
            <ul style="list-style: none; padding-left: 0; margin: 0;">
                ${errorFields.map(field => `
                    <li style="margin-bottom: 4px;">
                        <span style="color: #e74c3c; font-weight: 500;">• ${field}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `,
                confirmButtonText: 'ปิด',
            });

        }
    };


    return (
        <div className="w-full h-[55vh] p-4 mr-2 bg-[#F3F3F3] rounded-2xl mt-2">
            {/* ✅ Modal แก้ไข */}
            {isModalOpen && editData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[50] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h3 className="text-lg font-bold mb-4">📝 {headerModal}</h3>

                        <label className="block mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-2"
                            value={editData.username || ''}
                            onChange={(e) => handleChange('username', e.target.value)}
                        />

                        <label className="block mb-1">ชื่อ (TH)</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-2"
                            value={editData.full_name || ''}
                            onChange={(e) => handleChange('full_name', e.target.value)}
                        />

                        <label className="block mb-1">ชื่อ (EN)</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-2"
                            value={editData.full_name_en || ''}
                            onChange={(e) => handleChange('full_name_en', e.target.value)}
                        />

                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border p-2 rounded-lg mb-2"
                            value={editData.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />

                        <label className="block mb-1">เบอร์โทร</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-2"
                            value={editData.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />

                        <label className="block mb-1">License</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-2"
                            value={editData.license || ''}
                            onChange={(e) => handleChange('license', e.target.value)}
                        />
                        <label className="block mb-1">Role</label>
                        <select
                            className="w-full border p-2 rounded-lg mb-2"
                            value={editData.role_id || ''}
                            onChange={(e) => {
                                const selectedId = e.target.value
                                const selectedRole = rolemap.find(r => r.id === selectedId)
                                setEditData((prev) => ({
                                    ...prev,
                                    role_id: selectedId,
                                    tr_health_role: selectedRole || {}
                                }))
                            }}
                        >
                            <option value="">-- เลือกบทบาท --</option>
                            {rolemap.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.role_name} - {role.description}
                                </option>
                            ))}
                        </select>

                        <label className="block mb-1">Signature</label>
                        <SignatureBox
                            ref={sigRef}
                            initialValue={editData?.signature || ''}
                        />
                        <div className="flex justify-between mb-3">
                            <button
                                onClick={() => sigRef.current && sigRef.current.clear()}
                                className="text-sm px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                ล้างลายเซ็น
                            </button>

                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border rounded-lg text-gray-600"
                            >
                                ❌ ยกเลิก
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                ✅ บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ ตารางข้อมูล */}
            <div className='flex flex-col'>
                <label className='text-[#014F7D] font-bold text-xl w-full text-center  mb-2' >Employee</label>
                <label className='w-full text-center' >ข้อมูลทั้งหมดพนักงาน</label>
                <div className="w-full flex justify-end">
                    <button onClick={() => addClick()} className={`border border-[#458236] rounded-lg p-2 text-center mr-2  bg-[#52b462] text-white flex justify-center items-center `}>
                        <label className='cursor-pointer w-full'>เพิ่มข้อมูลผู้ใช้</label>
                    </button>
                </div>
            </div>
            <div className="w-full h-[85%] overflow-auto">
                <div className="min-w-[800px]"> {/* กำหนด min-width ให้แน่ใจว่า table scroll ได้ */}
                    <table className="mt-4 w-full border-collapse rounded-lg shadow-lg">
                        <thead className="">
                            <tr className='sticky top-0 text-white text-sm bg-[#014F7D]'>
                                <th className="text-center px-4 py-3">No.</th>
                                {/* <th className="text-center px-4 py-3">Role ID</th> */}
                                <th className="text-left px-4 py-3">Username</th>
                                <th className="text-left px-4 py-3">Name TH</th>
                                <th className="text-left px-4 py-3">Name EN</th>
                                <th className="text-left px-4 py-3">Email</th>
                                <th className="text-center px-4 py-3">Phone</th>
                                <th className="text-center px-4 py-3">License</th>
                                <th className="text-center px-4 py-3">Signature</th>
                                <th className="text-center px-4 py-3">Role Name</th>
                                <th className="text-center px-4 py-3">Edit</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">

                            {data.map((row, index) => (
                                <tr key={index} className={`hover:bg-gray-100 ${index % 2 ? 'bg-gray-200' : 'bg-white'}`}>
                                    <td className="text-center border-b px-4 py-3">{index + 1}</td>
                                    {/* <td className="text-center border-b">{row.role_id || '-'}</td> */}
                                    <td className="text-left border-b  px-4 py-3">{row.username || '-'}</td>
                                    <td className="text-left border-b  px-4 py-3">{row.full_name || '-'}</td>
                                    <td className="text-left border-b  px-4 py-3">{row.full_name_en || '-'}</td>
                                    <td className="text-left border-b  px-4 py-3">{row.email || '-'}</td>
                                    <td className="text-center border-b  px-4 py-3">{row.phone || '-'}</td>
                                    <td className="text-center border-b  px-4 py-3">{row.license || '-'}</td>
                                    <td className="text-center border-b  px-4 py-3">
                                        {row.signature ? (
                                            <img src={row.signature} className="w-[80px] h-[50px] object-contain mx-auto" />
                                        ) : (
                                            '-'
                                        )}
                                    </td>

                                    <td className="text-center border-b  px-4 py-3">{row.tr_health_role?.role_name || '-'}</td>
                                    <td className="text-center border-b  px-4 py-3">
                                        <button
                                            onClick={() => editClick(row)}
                                            className="w-10 p-2 bg-[#b452ac] text-white rounded-full"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
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

export default UserTable
