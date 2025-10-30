'use client'
import React, { useState } from 'react'
import AddPackageModal from './AddPackageModal'
import { packagedetailsbypackagecode } from '@/action/api'
import { formatMoney } from '@/components/Tool/tools'

function Step2({ mainPackage, subPackage, form, setForm }) {
    // const [selectedPackage, setSelectedPackage] = useState(null)
    const selectedPackage = form?.selectedPackageCode || null

    const [showAddModal, setShowAddModal] = useState(false)

    // โหลด package detail และเก็บลง form
    const selectMainPackageClick = async (select) => {
        const data = await packagedetailsbypackagecode(select.packagecode)
        setForm({
            ...form,
            selectedPackageCode: select.packagecode,
            selectedPackageName: select.packagenameth,
            selectedPackagePrice: select.price,
            packageDetail: data?.data || [],
        })
    }


    // เพิ่ม adon-package แล้ว update ลง form
    const handleAddPackage = (items) => {
        console.log('เพิ่ม:', items) // ตรวจสอบว่าได้ object เต็ม
        const current = form?.SelectedSubPackages || []
        const updated = [...current, ...items]
        setForm({ ...form, SelectedSubPackages: updated })
    }

    const sumarytotalservicecost = () => {
        const main = mainPackage.find(pkg => pkg.packagecode === selectedPackage)
        const mainPrice = parseFloat(main?.price || 0)
        const subTotal = (form?.packageDetail || []).reduce(
            (sum, item) => sum + (parseFloat(item.totalservicecost) || 0),
            0
        )
        const discount = Math.max(0, subTotal - mainPrice) // ถ้า main มากกว่า subTotal → ส่วนลด = 0
        return "( ส่วนลด " + formatMoney(discount) + " บาท )"
    }

    const selectedSubs = form?.SelectedSubPackages || []
    const packageDetail = form?.packageDetail || []

    return (
        <div className="flex flex-col gap-4 w-full h-full px-6 text-black">
            <div className="flex gap-4 w-full h-[300px]">
                {/* ตาราง 1: Main Package */}
                <div className="flex flex-col border rounded-xl shadow w-full overflow-hidden">
                    <div className="bg-blue-100 text-blue-800 font-semibold text-center py-2 sticky top-0 z-10 rounded-t-xl">
                        Main Package
                    </div>
                    <div className="overflow-y-auto">
                        <table className="w-full text-sm">
                            <tbody>
                                {mainPackage.map((pkg) => (
                                    <tr
                                        key={pkg.id}
                                        onClick={() => selectMainPackageClick(pkg)}
                                        className={`cursor-pointer hover:bg-blue-50 ${selectedPackage === pkg.packagecode ? 'bg-blue-100 font-semibold text-blue-700' : ' bg-white'
                                            }`}
                                    >
                                        <td className="px-4 py-2 border-b">{pkg.packagecode}</td>
                                        <td className="px-4 py-2 border-b">{pkg.packagenameth}</td>
                                        <td className="px-4 py-2 border-b">{pkg.packagenameen}</td>
                                        <td className="px-4 py-2 border-b">{pkg.description}</td>
                                        <td className="px-4 py-2 border-b text-right">{formatMoney(pkg.price || 0)} บาท</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
            {/* ปุ่ม Add */}
            <div className="flex justify-end">
                <button
                    className="bg-green-500 px-4 py-2 rounded-lg text-white"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Package
                </button>
            </div>
            <div className="flex ">
                {/* ตาราง 2: Sub Package */}
                <div className="flex flex-col border rounded-xl shadow w-1/2 overflow-hidden mr-1">
                    <div className="bg-green-100 text-green-800 font-semibold text-center py-2 sticky top-0 z-10 rounded-t-xl">
                        Sub Package {sumarytotalservicecost()}
                    </div>
                    <div className="overflow-y-auto h-[300px]">
                        <table className="w-full text-sm">
                            <tbody>
                                {packageDetail.length > 0 ? (
                                    packageDetail.map((pkg) => (
                                        <tr
                                            key={pkg.id}
                                        >
                                            <td className="px-4 py-2 border-b bg-white">{pkg.item_code}</td>
                                            <td className="px-4 py-2 border-b bg-white">{pkg.item_name}</td>
                                            <td className="px-4 py-2 border-b bg-white text-right">
                                                {formatMoney(pkg.totalservicecost || 0)} บาท
                                            </td>
                                        </tr>

                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-4 py-2 text-center italic text-gray-500">ไม่มีข้อมูล</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* ตาราง 3: Add-on Package */}

                <div className="flex flex-col border rounded-xl shadow w-1/2  overflow-hidden">
                    <div className="bg-yellow-100 text-yellow-800 font-semibold text-center py-2 sticky top-0 z-10 rounded-t-xl">
                        Add-on Package
                    </div>
                    <div
                        className="overflow-y-auto h-[300px]"
                    >
                        <table className="w-full text-sm">
                            <tbody>
                                {selectedSubs.length > 0 ? (
                                    selectedSubs.map((sub, index) => (
                                        <tr key={sub.id} className="group hover:bg-yellow-50 transition-all duration-200">
                                            <td className="px-4 py-2 border-b bg-white text-center group-hover:bg-yellow-50">
                                                <button
                                                    onClick={() => {
                                                        const updated = selectedSubs.filter((_, i) => i !== index)
                                                        setForm({ ...form, SelectedSubPackages: updated })
                                                    }}
                                                    className="bg-red-100 text-red-600 px-2 py-1 rounded-md hover:bg-red-200 hover:text-red-800 transition duration-150 flex items-center gap-1 text-xs font-medium shadow-sm"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>

                                                </button>
                                            </td>
                                            <td className="px-4 py-2 border-b bg-white group-hover:bg-yellow-50">{sub.item_code}</td>
                                            <td className="px-4 py-2 border-b bg-white group-hover:bg-yellow-50">{sub.item_name}</td>
                                            <td className="px-4 py-2 border-b bg-white text-right group-hover:bg-yellow-50">{formatMoney(sub.price || 0)} บาท</td>

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


            {/* Modal */}
            <AddPackageModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddPackage}
                subPackage={subPackage}
            />
        </div>
    )
}

export default Step2
