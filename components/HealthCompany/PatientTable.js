'use client'
import { puthealthPatients } from '@/action/api'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
// import { updatePatientData } from '@/action/api' // 👉 ถ้ามี API อัปเดตไว้แล้วให้ import

const PatientTable = ({ data, refresh }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState(null)

    const editClick = (row) => {
        setEditData(row)
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
        try {
            const res = await puthealthPatients(editData.uid, editData)

            if (!res.error) {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    text: 'ข้อมูลได้รับการอัปเดตแล้ว',
                    timer: 1500,
                    showConfirmButton: false,
                })
                refresh()
                closeModal()
            } else {
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error')
            }
        } catch (e) {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error')
        }
    }

    return (
        <div className="w-full h-[55vh] p-4 mr-2 bg-[#F3F3F3] rounded-2xl mt-2">
            {/* ✅ Modal */}
            {isModalOpen && editData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[50] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h3 className="text-lg font-bold mb-4">📝 แก้ไขข้อมูลผู้ป่วย</h3>

                        <label className="block mb-1">ชื่อ</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            disabled
                        />

                        <label className="block mb-1">เบอร์โทร</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.tel || ''}
                            onChange={(e) => handleChange('tel', e.target.value)}
                        />
                         <label className="block mb-1">Email</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                        <label className="block mb-1">เลขบัตรประชาชน</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.id_card || ''}
                            onChange={(e) => handleChange('id_card', e.target.value)}
                            maxLength={13}
                        />

                        <label className="block mb-1">สถานะ</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={editData.statusmessage || ''}
                            onChange={(e) => handleChange('statusmessage', e.target.value)}
                        />

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

            {/* ✅ Table */}
            <div className='flex flex-col'>
                <label className='text-[#014F7D] font-bold text-xl w-full text-center mb-2' >Patient</label>
                <label className='w-full text-center' >ข้อมูลทั้งหมดของผู้ป่วย</label>

            </div>
            <div className="w-full h-[85%] overflow-auto">
                <div className="min-w-[800px]"> {/* กำหนด min-width ให้แน่ใจว่า table scroll ได้ */}
                    <table className="mt-4 w-full border-collapse rounded-lg shadow-lg">
                        <thead className="">
                            <tr className='sticky top-0 text-white text-sm bg-[#014F7D]'>
                                <th className="text-center px-4 py-3 ">No.</th>
                                <th className="text-center px-4 py-3 w-96 ">ID Card</th>
                                {/* <th className="text-center px-4 py-3 ">Line UID</th> */}
                                <th className="text-left px-4 py-3 ">Name</th>
                                <th className="text-left px-4 py-3 ">Email</th>
                                <th className="text-center px-4 py-3 ">Status</th>
                                <th className="text-center px-4 py-3 ">Tel</th>
                                <th className="text-center px-4 py-3 ">Edit</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                            {data.map((row, index) => (
                                <tr key={index} className={`hover:bg-gray-100 ${index % 2 ? 'bg-gray-200' : 'bg-white'}`}>
                                    <td className="text-center border-b px-4 py-3">{index + 1}</td>
                                    <td className="text-center border-b px-4 py-3">
                                        {row.id_card
                                            ? row.id_card.slice(0, -4) + 'xxxx'
                                            : '-'}
                                    </td>

                                    {/* <td className="text-center border-b">{row.line_uid || '-'}</td> */}
                                    <td className="text-left border-b px-4 py-3">{row.name || '-'}</td>
                                    <td className="text-left border-b px-4 py-3">{row.email || '-'}</td>
                                    <td className="text-center border-b px-4 py-3">{row.statusmessage || '-'}</td>
                                    <td className="text-center border-b px-4 py-3">{row.tel || '-'}</td>
                                    <td className="text-center border-b px-4 py-3">
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

export default PatientTable
