'use client'
import ScreenshotTool from '@/components/ScreenshotTool/ScreenshotTool'
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">📸 ตัวอย่างหน้าเว็บ</h1>

      <p className="mb-4">
        ลองกดปุ่ม “แคปหน้าจอ” ด้านล่างขวา แล้วลากเพื่อเลือกพื้นที่ที่ต้องการ จากนั้นใส่กล่องหรือข้อความลงไป
      </p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">กล่องข้อมูล A</h2>
          <p>รายละเอียดกล่องนี้อาจถูกแคปและอธิบายด้วย annotation</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">กล่องข้อมูล B</h2>
          <p>อีกกล่องสำหรับทดสอบลูกศร/กล่องใส่ข้อความ</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold">ฟอร์มจำลอง</h3>
        <form className="space-y-4 mt-2">
          <input type="text" placeholder="ชื่อ" className="border p-2 rounded w-full" />
          <input type="email" placeholder="อีเมล" className="border p-2 rounded w-full" />
          <textarea placeholder="ความคิดเห็น" className="border p-2 rounded w-full"></textarea>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            ส่งฟอร์ม
          </button>
        </form>
      </div>

      {/* Screenshot Tool ติดท้าย */}
      <ScreenshotTool />
    </div>
  )
}
