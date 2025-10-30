'use client'

import { createKeyToken, encryptData, login_sendotp, postCompanybyEmail } from '@/action/api'
import Baselayout from '@/components/Baselayout/Baselayout_Care'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [email, setEmail] = useState("");
    const [countdown, setCountdown] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [isResending, setIsResending] = useState(false);
    const [datatoUse, setdatatoUse] = useState({});
    const inputRefs = useRef([]);

    useEffect(() => {
        const storedData = localStorage.getItem("logpre");
        if (storedData) {
            const { data } = JSON.parse(storedData);
            setdatatoUse(data);
            setEmail(data?.data?.[0]?.user?.email);
        }

        const bms = searchParams.get("bms");

        if (bms) {
            try {
                // console.log("bms",bms)
                const decoded = atob(bms); // ถอดรหัส Base64
                // console.log("decoded",decoded)
                const [email, expiryISO] = decoded.split('|'); // แยกค่า email กับ expiryTime
                const expiryTime = new Date(expiryISO);
                const currentTime = new Date();
                // console.log("email",email)
                // console.log("expiryTime",expiryTime)
                // console.log("currentTime",currentTime)
                // ✅ เช็คว่า email ถูกต้องตาม format และยังไม่หมดอายุ
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    if (currentTime <= expiryTime) {
                        loginWithEmail(email);
                    } else {
                        console.warn("⛔ ลิงก์หมดอายุแล้ว");
                        Swal.fire({
                            icon: "error",
                            title: "❌ ลิงก์หมดอายุ",
                            text: "กรุณาขอรหัสใหม่อีกครั้ง",
                            showConfirmButton: false,
                            timer: 3000,
                        });
                    }
                }
            } catch (error) {
                console.error("❌ Error decoding bms:", error);
            }
        }

        startCountdown();
    }, []);


    const startCountdown = () => {
        setResendDisabled(true);
        setCountdown(60);
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) {
                    clearInterval(interval);
                    setResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleVerify = (customOtp = null) => {
        const storedData = JSON.parse(localStorage.getItem("logpre"));
        const correctOtp = atob(storedData.rdsixnum);
        const otpToCheck = customOtp || otp.join("");

        if (otpToCheck === correctOtp) {
            Swal.fire({
                icon: "success",
                title: "✅ สำเร็จ!",
                text: "ยืนยันรหัสผ่านเรียบร้อย!",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                loginsetdata(datatoUse);
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "❌ รหัสผิด",
                text: "กรุณาตรวจสอบรหัสที่ได้รับทางอีเมล",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        setResendDisabled(true);

        let newOtp = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("logpre", JSON.stringify({ ...JSON.parse(localStorage.getItem("logpre")), rdsixnum: btoa(newOtp) }));
        try {
            // const res = await fetch('/api/sendOtp', {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, otp: newOtp }),
            // });

            // const result = await res.json();
         let res = await login_sendotp({ email, otp: newOtp })
            if (res?.message=="OTP Sent Successfully") {
                Swal.fire({
                    icon: "success",
                    title: "📩 รหัสใหม่ถูกส่งแล้ว!",
                    text: "กรุณาตรวจสอบอีเมลของคุณ",
                    showConfirmButton: false,
                    timer: 3000,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "❌ ส่ง OTP ไม่สำเร็จ",
                    text: "กรุณาลองใหม่อีกครั้ง",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "❌ เกิดข้อผิดพลาด",
                text: "ไม่สามารถส่ง OTP ได้",
                showConfirmButton: false,
                timer: 3000,
            });
        }

        setIsResending(false);
        startCountdown();
    };

    const loginsetdata = async (data) => {
        localStorage.setItem('role', "g")
        localStorage.setItem('cpc', data?.data?.[0]?.user?.code)
        localStorage.setItem('user', JSON.stringify({ user: data?.data?.[0]?.user }))
        localStorage.setItem('cto', data.accessToken)
        await createKeyToken();
        await encryptData(data.accessToken);
        router.push('/Care-Vista-C/healthdashboard')
    };

    const handleChange = (index, value, e) => {
        // ถ้าผู้ใช้วางข้อมูล (paste)
        if (e?.clipboardData) {
            const pasteData = e.clipboardData.getData('text').trim();
            if (/^\d{6}$/.test(pasteData)) { // เช็คว่าข้อมูลเป็นตัวเลข 6 ตัว
                setOtp(pasteData.split(""));
                setTimeout(() => handleVerify(pasteData), 200); // ✅ กดยืนยันอัตโนมัติ
                return;
            }
        }
    
        // ถ้าผู้ใช้พิมพ์เอง (ทีละตัว)
        if (!/^\d*$/.test(value)) return;
    
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        // ✅ ถ้ากรอกครบ 6 ตัว → กดยืนยันอัตโนมัติ
        if (newOtp.join("").length === 6) {
            setTimeout(() => handleVerify(newOtp.join("")), 200);
        }
    
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus(); // โฟกัสช่องถัดไป
        }
    };
    


    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    const loginWithEmail = async (email) => {
        // setIsLoading(true); // ✅ เริ่มโหลด
        let data = await postCompanybyEmail({ email });

        if (!data.error) {

            loginsetdata(data)

        } else {
            Swal.fire({
                icon: "error",
                title: "Email นี้ยังไม่ได้ลงทะเบียน",
                showConfirmButton: false,
                timer: 3000,
            });
        }

        // setIsLoading(false); // ✅ หยุดโหลด
    };
    return (
        <Baselayout>
            <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
                    <h2 className="text-2xl font-bold text-gray-700">🔐 ยืนยันรหัส OTP</h2>
                    <p className="text-gray-500 mt-2">กรุณากรอกรหัส 6 หลักที่ถูกส่งไปที่</p>
                    <p className="text-blue-500 font-semibold">{email}</p>

                    <div className="flex justify-center space-x-2 mt-4">
                        {otp.map((num, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={num}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onPaste={(e) => handleChange(0, "", e)} // รองรับการวางเลข 6 ตัว
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>


                    <button
                        onClick={() => handleVerify()}
                        className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        ✅ ยืนยันรหัส
                    </button>

                    <button
                        onClick={handleResend}
                        disabled={resendDisabled || isResending}
                        className={`w-full mt-3 p-3 rounded-lg transition ${resendDisabled || isResending ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                    >
                        {isResending ? (
                            <span className="flex justify-center items-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                กำลังส่ง...
                            </span>
                        ) : (
                            <>🔄 ขอรหัสใหม่ {countdown > 0 && `(${countdown}s)`}</>
                        )}
                    </button>
                </div>
            </div>
        </Baselayout>
    )
}
