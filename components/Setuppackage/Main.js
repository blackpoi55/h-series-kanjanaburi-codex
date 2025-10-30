'use client'
import React, { useState } from 'react'
import { formatMoney } from '../Tool/tools'
import { createHealthpackagesAndDetail, deleteAndDetail, packagedetailsbypackagecode, updateAndDetail } from '@/action/api'
import Swal from 'sweetalert2'

function Main(props) {
    const { mainPackage, allpackage, setWait, refresh } = props
    const [showModal, setShowModal] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [form, setForm] = useState({
        packagecode: '',
        packagenameth: '',
        packagenameen: '',
        price: '0',
        description: '',
        SelectedSubPackages: [],
    })
    const handleChange = (e) => {
        const { name, value } = e.target

        // ✅ ฟิลด์ราคา: รับเฉพาะตัวเลขและจุดทศนิยม
        if (name === 'price') {
            // ไม่ให้ใส่อักษรอื่นนอกจากตัวเลขกับ .
            const cleaned = value.replace(/[^0-9.]/g, '')

            // ตรวจสอบไม่ให้มีจุดมากกว่า 1 จุด
            const dotCount = (cleaned.match(/\./g) || []).length
            if (dotCount > 1) return

            setForm((prev) => ({
                ...prev,
                [name]: cleaned,
            }))
            return
        }

        // ✅ packagenameth → sync ไปที่ subPackages
        if (name === 'packagenameth' && form.SelectedSubPackages?.length > 0) {
            const updated = form.SelectedSubPackages.map((item) => ({
                ...item,
                packagenameth: value,
            }))
            setForm((prev) => ({
                ...prev,
                SelectedSubPackages: updated,
                [name]: value,
            }))
            return
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const sumarytotalservicecost = () => {
        const mainPrice = parseFloat(form.price || 0)

        const subTotal = (form?.SelectedSubPackages || []).reduce((sum, item) => {
            const cost = parseFloat(item.totalservicecost || item.price || 0)
            return sum + cost
        }, 0)

        const discount = Math.max(0, subTotal - mainPrice)

        return '( ส่วนลด ' + formatMoney(discount) + ' บาท )'
    }
    const handleSubmit = async () => {
        setWait(true)
        try {
            let data
            if (form?.id) {
                const { id, ...updateData } = form
                data = await updateAndDetail(id, updateData)
            } else {
                data = await createHealthpackagesAndDetail(form)
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
            let data = deleteAndDetail(id)
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
    const generateNextPackageCode = () => {
        if (mainPackage.length === 0) return 'PC0001'

        const codes = mainPackage
            .map(pkg => pkg.packagecode)
            .filter(code => /^PC\d+$/.test(code)) // เฉพาะรหัสที่ตรงรูปแบบ PCxxxx
            .map(code => parseInt(code.replace('PC', ''), 10))

        const maxCode = Math.max(...codes, 0)
        const nextCode = (maxCode + 1).toString().padStart(4, '0')
        return `PC${nextCode}`
    }
    return (
        <div className="w-full bg-white shadow-box rounded-lg p-4 mt-4">
            {/* Modal Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white w-[150vh] h-[80vh] rounded-xl shadow-lg flex flex-col relative">
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
                            {[{ label: 'Package Code', name: 'packagecode' }, { label: 'Package Name (TH)', name: 'packagenameth' }, { label: 'Package Name (EN)', name: 'packagenameen' }]
                                .map(({ label, name }) => (
                                    <div key={name}>
                                        <label className="text-sm text-gray-600">{label}</label>
                                        <input
                                            name={name}
                                            type="text"
                                            disabled={name === 'packagecode'}
                                            value={form[name] || ''}
                                            onChange={handleChange}
                                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365382]"
                                        />
                                    </div>
                                ))}
                            <div>
                                <label className="text-sm text-gray-600">Price</label>
                                <input
                                    name="price"
                                    type="text"
                                    value={form.price}
                                    onChange={handleChange}
                                    onBlur={() => {
                                        // ถ้าไม่มีจุด → ใส่ .00
                                        if (form.price && !form.price.includes('.')) {
                                            setForm((prev) => ({
                                                ...prev,
                                                price: prev.price + '.00',
                                            }))
                                        }
                                        // ถ้าเป็น 0. → เปลี่ยนเป็น 0.00
                                        if (form.price === '0.') {
                                            setForm((prev) => ({
                                                ...prev,
                                                price: '0.00',
                                            }))
                                        }
                                    }}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365382]"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365382]"
                                />
                            </div>

                            <div className="flex gap-2">
                                {/* All Package */}
                                <div className="flex flex-col border rounded-xl shadow w-1/2">
                                    <div className="bg-yellow-100 text-yellow-800 font-semibold text-center py-2 sticky top-0 z-10 rounded-t-xl">
                                        All Package
                                    </div>

                                    <div className="p-2 border-b bg-white sticky top-[38px] z-10">
                                        <input
                                            type="text"
                                            placeholder="ค้นหาโดยรหัสหรือชื่อ..."
                                            value={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        />
                                    </div>

                                    <div className="overflow-y-auto h-[300px]">
                                        <table className="w-full text-sm">
                                            <tbody>
                                                {allpackage.length > 0 ? (
                                                    allpackage
                                                        .filter(
                                                            (sub) =>
                                                                !form.SelectedSubPackages.some(
                                                                    (selected) => selected.item_code === sub.item_code
                                                                ) &&
                                                                (
                                                                    sub.item_code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                                                                    sub.item_name.toLowerCase().includes(searchKeyword.toLowerCase())
                                                                )
                                                        )
                                                        .map((sub) => (
                                                            <tr
                                                                key={sub.id}
                                                                draggable
                                                                onDragStart={(e) => {
                                                                    e.dataTransfer.setData('subItem', JSON.stringify(sub))
                                                                }}
                                                                className="cursor-move group hover:bg-yellow-50 transition-all duration-200"
                                                            >
                                                                <td className="px-4 py-2 border-b bg-white">{sub.item_code}</td>
                                                                <td className="px-4 py-2 border-b bg-white">{sub.item_name}</td>
                                                                <td className="px-4 py-2 border-b bg-white text-right">
                                                                    {formatMoney(sub.price || 0)} บาท
                                                                </td>
                                                            </tr>
                                                        ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3} className="px-4 py-2 text-center italic text-gray-500">
                                                            ไม่มีข้อมูล
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Sub Package */}
                                <div
                                    className="flex flex-col border rounded-xl shadow w-1/2"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        const subItemRaw = JSON.parse(e.dataTransfer.getData('subItem'))

                                        // จัดรูปแบบข้อมูลให้เหมือนกัน
                                        const normalized = {
                                            item_code: subItemRaw.item_code,
                                            item_name: subItemRaw.item_name,
                                            item_type: subItemRaw.item_type,
                                            packagecode: form.packagecode,
                                            packagenameth: form.packagenameth,
                                            quantity: 1,
                                            serviceprice: subItemRaw.price,
                                            totalservicecost: subItemRaw.price,
                                        }

                                        const isExist = form.SelectedSubPackages.some(
                                            (item) => item.item_code === normalized.item_code
                                        )
                                        if (!isExist) {
                                            setForm((prev) => ({
                                                ...prev,
                                                SelectedSubPackages: [...prev.SelectedSubPackages, normalized],
                                            }))
                                        }
                                    }}

                                >
                                    <div className="bg-green-100 text-green-800 font-semibold text-center py-2 sticky top-0 z-10 rounded-t-xl">
                                        Sub Package {sumarytotalservicecost()}
                                    </div>
                                    <div className="overflow-y-auto h-[300px]">
                                        <table className="w-full text-sm">
                                            <tbody>
                                                {form.SelectedSubPackages.length > 0 ? (
                                                    form.SelectedSubPackages.map((pkg, index) => (
                                                        <tr key={pkg.id}>
                                                            <td className="px-4 py-2 border-b bg-white text-center">
                                                                <button
                                                                    onClick={() => {
                                                                        const updated = [...form.SelectedSubPackages]
                                                                        updated.splice(index, 1)
                                                                        setForm((prev) => ({
                                                                            ...prev,
                                                                            SelectedSubPackages: updated,
                                                                        }))
                                                                    }}
                                                                    className="bg-red-100 text-red-600 px-2 py-1 rounded-md hover:bg-red-200 transition duration-150 text-xs"
                                                                >
                                                                    ลบ
                                                                </button>
                                                            </td>
                                                            <td className="px-4 py-2 border-b bg-white">{pkg.item_code}</td>
                                                            <td className="px-4 py-2 border-b bg-white">{pkg.item_name}</td>
                                                            <td className="px-4 py-2 border-b bg-white text-right">
                                                                {formatMoney(pkg.totalservicecost || pkg.price || 0)} บาท
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className="px-4 py-2 text-center italic text-gray-500">
                                                            ไม่มีข้อมูล
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
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
                <label className="text-lg font-semibold text-[#365382]">Main Package List</label>
                <button
                    className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow"
                    onClick={() => {
                        setForm({
                            packagecode: generateNextPackageCode(),
                            packagenameth: '',
                            packagenameen: '',
                            price: '0',
                            description: '',
                            SelectedSubPackages: [],
                            packageDetail: [],
                        })
                        setShowModal(true)
                    }}
                >
                    + Add Package
                </button>
            </div>

            <div className="overflow-auto rounded-lg border border-gray-200 h-[70vh]">
                <table className="min-w-full text-sm text-left ">
                    <thead className="bg-[#365382] text-white sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Package Code</th>
                            <th className="px-4 py-3">Name TH</th>
                            <th className="px-4 py-3">Name EN</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3  text-right">Price</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mainPackage.map((pkg, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{pkg.packagecode}</td>
                                <td className="px-4 py-2">{pkg.packagenameth}</td>
                                <td className="px-4 py-2">{pkg.packagenameen}</td>
                                <td className="px-4 py-2">{pkg.description}</td>
                                <td className="px-4 py-2  text-right">{formatMoney(pkg.price || 0)} บาท</td>
                                <td className="px-4 py-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="px-3 py-1 rounded-md bg-yellow-400 text-white hover:bg-yellow-500 text-xs"
                                            onClick={async () => {
                                                const data = await packagedetailsbypackagecode(pkg.packagecode)
                                                setForm({
                                                    id: pkg.id,
                                                    packagecode: pkg.packagecode,
                                                    packagenameth: pkg.packagenameth,
                                                    packagenameen: pkg.packagenameen,
                                                    price: pkg.price,
                                                    description: pkg.description,
                                                    SelectedSubPackages: data?.data || [],
                                                })
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
        </div >
    )
}

export default Main