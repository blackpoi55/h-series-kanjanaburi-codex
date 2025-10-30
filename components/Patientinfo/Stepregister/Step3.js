'use client'
import React, { useRef } from 'react'
import { formatMoney } from '@/components/Tool/tools'
import html2canvas from 'html2canvas'
function Step3({ step1data, step2data, mainPackage }) {
  const selectedCode = step2data?.selectedPackageCode
  const mainPackageInfo = mainPackage?.find(pkg => pkg.packagecode === selectedCode)
  const mainPackageName = mainPackageInfo?.packagenameth || '-'
  const totalServiceCost = parseFloat(mainPackageInfo?.price || 0)
  const captureRef = useRef(null)

  const mainPackagePrice = step2data?.packageDetail?.reduce(
    (sum, item) => sum + parseFloat(item.totalservicecost || 0),
    0
  ) || 0

  const totalAddon = (step2data?.SelectedSubPackages || []).reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  )

  const discount = Math.max(mainPackagePrice - totalServiceCost, 0)
  const grandTotal = totalServiceCost + totalAddon
  const handleDownloadImage = async () => {
    const element = captureRef.current

    const canvas = await html2canvas(element, {
      scale: 2, // เพิ่มความคมชัด
      useCORS: true,
    })

    const dataURL = canvas.toDataURL('image/png')

    // สร้าง timestamp
    const now = new Date()
    const date = now.toISOString().slice(0, 10) // YYYY-MM-DD
    const time = now
      .toTimeString()
      .slice(0, 8)
      .replace(/:/g, '-') // HH-MM-SS

    const filename = `receipt-${step1data?.EN || 'unknown'}-${date}_${time}.png`

    // สร้างลิงก์ดาวน์โหลด
    const link = document.createElement('a')
    link.href = dataURL
    link.download = filename
    link.click()
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen text-[#333] font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={handleDownloadImage}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Download
          </button>
        </div>
        <div ref={captureRef} id="capture" className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <div className="text-center border-b pb-4">
            <h1 className="text-3xl font-bold text-[#365382]">ใบเสร็จรับเงิน / Receipt</h1>
            <p className="text-sm text-gray-500 mt-1">วันที่: {step1data?.DateRegisByLoad}</p>
          </div>

          {/* Patient Info */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg text-[#365382] mb-2">ข้อมูลผู้ป่วย</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <p><strong>ชื่อ-นามสกุล:</strong> {step1data?.Prename} {step1data?.Forename} {step1data?.Surname}</p>
              <p><strong>HN:</strong> {step1data?.HN}</p>
              <p><strong>EN:</strong> {step1data?.EN}</p>
              <p><strong>เพศ:</strong> {step1data?.Sex}</p>
              <p><strong>อายุ:</strong> {step1data?.Age} ปี</p>
              <p><strong>เบอร์โทร:</strong> {step1data?.Mobile}</p>
              <p><strong>อีเมล:</strong> {step1data?.Email}</p>
              <p><strong>ที่อยู่:</strong> {step1data?.Address}</p>
            </div>
          </div>

          {/* Main Package */}
          <div className="mt-8">
            <h2 className="font-semibold text-lg text-[#365382] mb-2">แพ็กเกจหลัก: {mainPackageName}</h2>
            <table className="w-full text-sm border">
              <thead className="bg-blue-100 text-[#365382]">
                <tr>
                  <th className="p-2 text-left">รหัส</th>
                  <th className="p-2 text-left">รายการ</th>
                  <th className="p-2 text-right">ราคา (บาท)</th>
                </tr>
              </thead>
              <tbody>
                {step2data?.packageDetail?.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.item_code}</td>
                    <td className="p-2">{item.item_name}</td>
                    <td className="p-2 text-right">{formatMoney(item.totalservicecost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add-on Package */}
          {step2data?.SelectedSubPackages?.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold text-lg text-[#365382] mb-2">แพ็กเกจเสริม</h2>
              <table className="w-full text-sm border">
                <thead className="bg-yellow-100 text-yellow-800">
                  <tr>
                    <th className="p-2 text-left">รหัส</th>
                    <th className="p-2 text-left">รายการ</th>
                    <th className="p-2 text-right">ราคา (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {step2data?.SelectedSubPackages.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">{item.item_code}</td>
                      <td className="p-2">{item.item_name}</td>
                      <td className="p-2 text-right">{formatMoney(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Total Summary */}
          <div className="mt-10 border-t pt-6 text-sm md:text-base">
            <div className="flex justify-between mb-1">
              <span>ราคาจากแพ็กเกจหลัก</span>
              <span>{formatMoney(mainPackagePrice)} บาท</span>
            </div>
            <div className="flex justify-between mb-1 text-red-600">
              <span>ส่วนลด</span>
              <span>- {formatMoney(discount)} บาท</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>ราคาหลังหักส่วนลด</span>
              <span>{formatMoney(totalServiceCost)} บาท</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>แพ็กเกจเสริม</span>
              <span>{formatMoney(totalAddon)} บาท</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2 text-[#365382]">
              <span>ยอดสุทธิที่ต้องชำระ</span>
              <span>{formatMoney(grandTotal)} บาท</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3
