'use client'
import Formregister from '@/components/Register/Formregister'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
function page() {
  const [Step, setStep] = useState(1)
  const searchParams = useSearchParams();
  const [values, setValues] = useState({
    "Name": "",
    "Username": "",
    "Password": "",
    "StatusFlag": "A",
    "email": "",
    "role_id": "3f3e9efb-053a-4640-89ed-a83ebe61502f"
  })
  const [loginData, setloginData] = useState({})
  const router = useRouter()
  useEffect(() => {
    const bms = searchParams.get("bms");
    const decoded = atob(bms);
    const [email, expiryISO] = decoded.split('|');
    if (!email || !expiryISO) {
      Swal.fire({
        icon: "error",
        title: "❌ ลิงก์ไม่ถูกต้อง",
        text: "กรุณาขอรหัสใหม่อีกครั้ง",
        showConfirmButton: false,
        timer: 3000,
      });
      router.push("/login");
      return;
    }
    const expiryTime = new Date(expiryISO);
    const currentTime = new Date();
    if (currentTime > expiryTime) {
      Swal.fire({
        icon: "error",
        title: "❌ ลิงก์หมดอายุ",
        text: "กรุณาขอรหัสใหม่อีกครั้ง",
        showConfirmButton: false,
        timer: 3000,
      });
      router.push("/login");
    } else {
      setValues({ ...values, email: email });
    }
  }, [])

  return (
    <div className="w-screen h-screen max-w-screen overflow-hidden  bg-login text-black">
      <Formregister loginData={loginData} setloginData={setloginData} values={values} setValues={setValues} setStep={setStep}>

      </Formregister>
    </div>
  )
}

export default page