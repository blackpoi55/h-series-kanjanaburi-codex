'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ForgotModal({ open, onClose }) {
  const [email, setEmail] = useState('');

  // 🔐 ฟังก์ชันส่งคำขอรีเซ็ตรหัสผ่านไปยัง API
  const handleSend = async () => {
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'ส่งอีเมลสำเร็จ!',
        text: 'กรุณาตรวจสอบกล่องจดหมายของคุณเพื่อรีเซ็ตรหัสผ่าน',
        confirmButtonColor: '#365382',
      });
      onClose();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถส่งอีเมลได้ กรุณาลองใหม่',
      });
    }
  };

  // 🔒 ปิด Modal ถ้าไม่เปิด
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* กล่อง Modal */}
      <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white/90 backdrop-blur-xl border border-white/20 p-6 animate-fadeIn relative">
        
        {/* ส่วนหัว */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-extrabold text-[#365382]">🔐 ลืมรหัสผ่าน</h2>
          <p className="text-sm text-gray-600 mt-1">
            กรุณากรอกอีเมลของคุณ ระบบจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านให้
          </p>
        </div>

        {/* ฟอร์มอีเมล */}
        <div className="mt-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            อีเมลของคุณ
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/60 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-[#365382] transition"
          />
        </div>

        {/* ปุ่มคำสั่ง */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#365382] to-[#2d4a7a] 
                       text-white font-semibold hover:brightness-110 transition"
          >
            ส่งลิงก์รีเซ็ต
          </button>
        </div>

        {/* ลิขสิทธิ์ */}
        <div className="absolute bottom-2 w-full text-center text-xs text-gray-500">
          © 2025 Care Vista-C
        </div>
      </div>
    </div>
  );
}
