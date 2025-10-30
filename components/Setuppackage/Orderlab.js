'use client'
import React, { useState } from 'react'
import { formatMoney } from '../Tool/tools'
import { packagedetailsbypackagecode, servicesandpricesadd, servicesandpricesdelete, servicesandpricesedit } from '@/action/api'
import Swal from 'sweetalert2'

function Orderlab(props) {
    const { allorder, setWait, refresh } = props
    const [showModal, setShowModal] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [form, setForm] = useState({
        Code: "",
        Desc: "",
        Category: "",
        Rpt_NormalRang: "",
        Unit: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }




    const handleSubmit = async () => {
        setWait(true)
        try {
            // ✅ ตรวจสอบ item_code ซ้ำ (เฉพาะตอนเพิ่มใหม่)
            if (!form?.id) {
                const exists = allorder.find(
                    (pkg) => pkg.item_code.trim().toLowerCase() === form.item_code.trim().toLowerCase()
                )
                if (exists) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'รหัสซ้ำ',
                        text: `รหัส "${form.item_code}" มีอยู่ในระบบแล้ว`,
                        confirmButtonText: 'ตกลง',
                    })
                    setWait(false)
                    return
                }
            }

            let data
            if (form?.id) {
                const { id, ...updateData } = form
                data = await servicesandpricesedit(id, updateData)
            } else {
                data = await servicesandpricesadd(form)
            }

            if (!data.error) {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    text: 'แพ็กเกจถูกบันทึกเรียบร้อยแล้ว',
                    timer: 2000,
                    showConfirmButton: false,
                })
                setShowModal(false)
                refresh()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'ไม่สามารถบันทึกแพ็กเกจได้',
                    timer: 2000,
                    showConfirmButton: false,
                })
            }
        } catch (err) {
            console.error(err)
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถบันทึกแพ็กเกจได้',
                timer: 2000,
                showConfirmButton: false,
            })
        }
        setWait(false)
    }


    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณต้องการลบแพ็กเกจนี้ใช่หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก',
        })

        if (!result.isConfirmed) return

        setWait(true)
        try {
            let data = servicesandpricesdelete(id)
            if (!data.error) {
                refresh()
                Swal.fire({
                    icon: 'success',
                    title: 'ลบสำเร็จ',
                    text: 'แพ็กเกจถูกลบเรียบร้อยแล้ว',
                    timer: 2000,
                    showConfirmButton: false,
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'ไม่สามารถลบแพ็กเกจได้',
                    timer: 2000,
                    showConfirmButton: false,
                })
            }
        } catch (err) {
            console.error(err)
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถลบแพ็กเกจได้',
                timer: 2000,
                showConfirmButton: false,
            })
        }
        setWait(false)
    }
    return (
        <div className="w-full bg-white shadow-box rounded-lg p-4 mt-4">
            {/* Modal Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white w-[150vh] rounded-xl shadow-lg flex flex-col relative">
                        {/* Header */}
                        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center rounded-xl">
                            <h2 className="text-xl font-bold text-[#365382]">
                                {form?.id ? 'Edit Package' : 'Add Package'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-red-500 text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body (scrollable) */}
                        <div className="overflow-y-auto px-6 py-4 flex-1 space-y-4 rounded-xl">
                            {[
                                { label: 'Code', name: 'Code' },
                                { label: 'Description', name: 'Desc' },
                                { label: 'Category', name: 'Category' },
                                { label: 'Normal Range', name: 'Rpt_NormalRang' },
                                { label: 'Unit', name: 'Unit' },
                            ].map(({ label, name }) => (
                                <div key={name}>
                                    <label className="text-sm text-gray-600">{label}</label>
                                    <input
                                        name={name}
                                        type="text"
                                        value={form[name] || ''}
                                        onChange={handleChange}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365382]"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t flex justify-end gap-2 sticky bottom-0 bg-white z-10 rounded-xl">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                {form?.id ? 'Save Changes' : 'Add Package'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-semibold text-[#365382]">All Package List</label>
                <div className="flex justify-center items-center w-2/3">
                    <input
                        type="text"
                        placeholder="ค้นหา Item Code / Name / Type..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <button
                    className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow"
                    onClick={() => {
                        setForm({
                            item_code: "",
                            item_name: "",
                            price: "0",
                            item_type: "",
                        })
                        setShowModal(true)
                    }}
                >
                    + Add Package
                </button>
            </div>

            <div className="overflow-auto rounded-lg border border-gray-200 h-[70vh]">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#46c02e] text-white sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Code</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Normal Range</th>
                            <th className="px-4 py-3">Unit</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {allorder
                            .filter(pkg =>
                                pkg.Code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                                pkg.Desc.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                                pkg.Category.toLowerCase().includes(searchKeyword.toLowerCase())
                            )
                            .map((pkg, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{pkg.Code}</td>
                                    <td className="px-4 py-2">{pkg.Desc}</td>
                                    <td className="px-4 py-2">{pkg.Category}</td>
                                    <td className="px-4 py-2">{pkg.Rpt_NormalRang}</td>
                                    <td className="px-4 py-2">{pkg.Unit}</td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="px-3 py-1 rounded-md bg-yellow-400 text-white hover:bg-yellow-500 text-xs"
                                                onClick={() => {
                                                    setForm(pkg)
                                                    setShowModal(true)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs"
                                                onClick={() => handleDelete(pkg.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orderlab