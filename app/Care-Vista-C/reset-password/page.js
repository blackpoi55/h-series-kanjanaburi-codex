'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  useEffect(() => {
    try {
      const decoded = atob(token || '');
      setEmail(decoded);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'ลิงก์ไม่ถูกต้อง',
        text: 'กรุณาตรวจสอบลิงก์อีกครั้ง',
      });
    }
  }, [token]);

  const handleReset = async () => {
    if (!password || !confirm) {
      return Swal.fire('กรุณากรอกรหัสผ่านให้ครบ', '', 'warning');
    }
    if (password !== confirm) {
      return Swal.fire('รหัสผ่านไม่ตรงกัน', 'โปรดตรวจสอบอีกครั้ง', 'error');
    }

    // 🔒 TODO: เชื่อม backend จริง
    Swal.fire({
      icon: 'success',
      title: 'รีเซ็ตรหัสผ่านสำเร็จ!',
      text: 'คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้แล้ว',
      confirmButtonColor: '#365382',
    }).then(() => router.push('/Care-Vista-C/login'));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#dee8f1] via-[#f1f5f9] to-[#e0e7ff] flex justify-center items-center px-4">
      {/* ✅ Background Blob */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#365382] opacity-20 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#7ca9ce] opacity-20 rounded-full blur-[100px] z-0" />

      {/* ✅ Reset Card */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 max-w-md w-full border border-white/20">
        <h2 className="text-2xl font-extrabold text-[#365382] mb-2 text-center">🔐 รีเซ็ตรหัสผ่าน</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          สำหรับอีเมล: <span className="font-semibold">{email}</span>
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">รหัสผ่านใหม่</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365382]"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#365382]"
              placeholder="********"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full mt-6 py-2 rounded-lg bg-gradient-to-r from-[#365382] to-[#2d4a7a] text-white font-semibold hover:brightness-110 transition"
        >
          ยืนยันรีเซ็ตรหัสผ่าน
        </button>

        <div className="text-xs text-gray-400 text-center mt-6">
          © 2025 Care Vista-C
        </div>
      </div>
    </div>
  );
}
