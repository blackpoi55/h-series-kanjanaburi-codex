'use client'
import { formatMoney } from '@/components/Tool/tools'
import Toolselect2 from '@/components/Tool/Toolselect2'
import React, { useState } from 'react'

const AddPackageModal = ({ isOpen, onClose, onAdd, subPackage = [] }) => {
    const [selected, setSelected] = useState([])

    // สร้าง options สำหรับ Toolselect2
    const options = subPackage.map((item) => ({
        label: `${item.item_code} | ${item.item_name} - ${formatMoney(item.price||0)} บาท`, // 👈 แทรก item_code ใน label
        value: item.item_code,
    }))

    const handleSubmit = () => {
        if (selected.length > 0) {
            const selectedItems = subPackage.filter(pkg =>
                selected.find(sel => sel.value === pkg.item_code)
            )
            onAdd(selectedItems) // ✅ ส่งออกเป็น object[]
            setSelected([])
            onClose()
        }
    }


    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6">
                <h2 className="text-lg font-bold text-[#365382] mb-4">เพิ่ม Add-on Package</h2>

                <label className="block text-sm font-medium mb-2">เลือก Add-on Package</label>
                <Toolselect2
                    multiple
                    options={options}
                    value={selected}
                    onChange={(val) => setSelected(val)}
                    label="เลือก Add-on Package"
                />


                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={selected.length === 0}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        เพิ่ม
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPackageModal
