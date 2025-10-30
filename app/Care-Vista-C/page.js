'use client';

import { login_sendotp, postCompanybyEmail } from '@/action/api';
import Baselayout from '@/components/Baselayout/Baselayout_Care';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';

// ✅ แก้ตรงนี้: dynamic import
const VisitorInfoButton = dynamic(() => import('@/components/Checkip/VisitorInfoButton'), {
  ssr: false, // ปิดการ prerender ฝั่ง server
});


export default function Page() {
    const router = useRouter()
    const [email, setemail] = useState("")
    const [isLoading, setIsLoading] = useState(false); // ✅ สถานะโหลด

    useEffect(() => {
        localStorage.removeItem('345dp0asks9adls99235k33m12k5993klfp95')
        localStorage.removeItem('encryptionKey')
        localStorage.removeItem('iv')
        localStorage.removeItem('cto')
        localStorage.removeItem('user')
    }, [])

    const submitClick = async () => {
        setIsLoading(true); // ✅ เริ่มโหลด
        let data = await postCompanybyEmail({ email });

        if (!data.error) {
            let randomsixnum = Math.floor(100000 + Math.random() * 900000);
            let encodedOtp = btoa(randomsixnum.toString());

            localStorage.setItem('logpre', JSON.stringify({ data, rdsixnum: encodedOtp }));

            // const res = await fetch('/api/sendOtp', {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, otp: randomsixnum }),
            // });

            // const result = await res.json();
             let res = await login_sendotp({ email, otp: randomsixnum })
            if (res?.message=="OTP Sent Successfully") {
                Swal.fire({
                    icon: "success",
                    title: "📩 OTP ถูกส่งไปยังอีเมลของคุณ",
                    text: "กรุณาตรวจสอบอีเมลของคุณ",
                    showConfirmButton: false,
                    timer: 3000, // ✅ ปิดอัตโนมัติใน 3 วิ
                });

                router.push('/Care-Vista-C/loginemailconfirm');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "❌ ส่ง OTP ไม่สำเร็จ",
                    text: "กรุณาลองใหม่อีกครั้ง",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Email นี้ยังไม่ได้ลงทะเบียน",
                showConfirmButton: false,
                timer: 3000,
            });
        }

        setIsLoading(false); // ✅ หยุดโหลด
    };


    return (
        <Baselayout>
            <div className="w-full h-full bg-gradient-to-b from-[#ffff] to-[#d8e6ee] flex justify-center items-center">
                <div className="flex w-[90%] h-[90%] bg-care rounded-3xl">
                    <div className="w-[65%]"></div>
                    <div className="w-[35%] flex flex-col justify-start items-start mt-36">
                        {/* <label className='text-6xl font-bold text-[#0A2D4D]'>
                            The Bangkok
                        </label>
                        <label className='text-6xl font-bold text-[#0A2D4D] mt-4'>
                            Christian Hospital
                        </label> */}
                          {/* <VisitorInfoButton /> */}
                        <label className='text-6xl font-bold text-[#0A2D4D] mt-4 ml-6'>
                            Care Vista-C
                        </label>
                        <input type='text'
                            onKeyPress={e => { if (e.key === 'Enter') submitClick(); }}
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="bg-gray-100 mt-8 w-4/6 p-2 rounded-2xl text-center"
                            placeholder='example.checkup@org.com'
                            disabled={isLoading} // ปิดช่อง input ขณะโหลด
                        />
                        <div className="text-[#014F7D] mt-4 w-4/6 p-2 rounded-2xl text-center">
                            กรุณายืนยันผ่านทาง Email ที่ลงทะเบียน
                        </div>
                        <div className="mt-8 flex w-4/6 justify-center ">
                            {/* <button className="bg-white w-1/2 p-2 rounded-2xl text-[#E5686A] mx-3 flex justify-center items-center border border-[#E5686A]">
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5957 15.8457L2.25005 9.50005L8.5957 3.1544" stroke="#E5686A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.25007 9.5L15.75 9.5" stroke="#E5686A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <label className='ml-2'>Back</label>
                            </button> */}
                            <button
                                onClick={() => submitClick()}
                                className="bg-[#014F7D] w-1/2 p-2 rounded-2xl text-white mx-3 flex justify-center items-center"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        กำลังส่ง...
                                    </span>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Baselayout>
    )
}
