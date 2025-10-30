'use client'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { checkmail, createKeyToken, encryptData, loginapi } from '../../action/api'
import { Checkbox, IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
function Formlogin(props) {
    const { loginData, setloginData, setStep, values, setValues } = props
    const [emailValues, setemailValues] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginClick = async () => {
        let data = await loginapi(values)

        if (!data.error) {
            setloginData(data)

            localStorage.setItem('user', JSON.stringify({ user: data.user }))
            const key = await createKeyToken()
            const encrypted = await encryptData(data.accessToken);

            router.push("/patientinfo")
            // router.push('/nurse/register')
            // setStep(2)
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Username หรือ Password ไม่ถูกต้อง',
                showConfirmButton: false,
                timer: 1000
            })
        }

        // router.push("/patientinfo")
    }

    const handleChange = (update) => {
        console.log('update', update)
        setValues({ ...values, ...update })
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            isRegister ? registerClick() : loginClick()
        }
    };
    console.log('values', values)
    const registerClick = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValues) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกอีเมล',
                showConfirmButton: false,
                timer: 1000
            });
            return;
        }

        if (!emailRegex.test(emailValues)) {
            Swal.fire({
                icon: 'warning',
                title: 'รูปแบบอีเมลไม่ถูกต้อง',
                text: 'กรุณากรอกอีเมลให้ถูกต้อง เช่น example@email.com',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        try {
            setIsLoading(true); // 🟢 เริ่มโหลด

            let data = await checkmail({ email: emailValues });

            if (!data.error) {
                const res = await fetch('/api/sendmailregister', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: emailValues }),
                });

                const result = await res.json();
                Swal.fire({
                    icon: 'success',
                    title: 'อีเมลนี้สามารถใช้ลงทะเบียนได้',
                    text: 'กรุณาตรวจสอบอีเมลของคุณเพื่อดำเนินการต่อ',
                    showConfirmButton: false,
                    timer: 2000
                });
                setIsRegister(false);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'อีเมลนี้ไม่สามารถใช้ลงทะเบียนได้',
                    text: 'เนื่องจากอีเมลนี้ถูกใช้ไปแล้ว',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
                text: 'โปรดลองอีกครั้งภายหลัง',
                showConfirmButton: false,
                timer: 2000
            });
        } finally {
            setIsLoading(false); // 🔴 หยุดโหลด
        }
    };


    return (
        <div className="w-full min-h-screen flex justify-end items-start sm:items-start md:items-start lg:items-center pr-36 ">

            <div className="border-2 bg-gray-200 w-full md:w-[35%] h-[90%] md:h-[550px] rounded-2xl shadow-2xl flex flex-col justify-center items-center p-4 ">
                <div className='w-full h-full md:px-10 mb-1 flex flex-col justify-center items-center'>
                    <img src={"/images/care_vista_c.png"} alt="" className="sm:h-10 md:h-14" />
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col items-center mt-6'>
                            <label className="text-[#214177] font-bold text-2xl" htmlFor="">{isRegister ? 'Register' : 'Please Login'}</label>

                        </div>
                        {isRegister ?
                            <div className='w-full flex flex-col mt-6'>
                                <TextField
                                    size='small'
                                    className='bg-white'
                                    value={emailValues || ''}
                                    onChange={(e) => setemailValues(e?.target?.value)}
                                    label="Email"
                                    variant="outlined"
                                />
                            </div>
                            : <>
                                <div className='w-full flex flex-col mt-6'>
                                    <TextField autoFocus type="text" size='small' className=' bg-white' value={values.username || ""} onChange={(e) => handleChange({ username: e?.target?.value })} label="Username" variant="outlined" />
                                </div>
                                <div className='w-full flex flex-col mt-6'>
                                    <TextField
                                        autoComplete='new-password'
                                        size='small'
                                        className='bg-white'
                                        value={values.password || ''}
                                        onChange={(e) => handleChange({ password: e?.target?.value })}
                                        label="Password"
                                        variant="outlined"
                                        onKeyPress={handleKeyPress}
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            // autoComplete: 'new-password',
                                        }}
                                    />
                                </div>
                                <div className='w-full flex mt-6'>
                                    <div className='w-1/2 flex justify-start items-center '>
                                        <Checkbox
                                            className="text-[#214177] w-5 h-5"
                                            color="primary"
                                            disabled={false}
                                            id="remember"
                                        />
                                        <label htmlFor='remember' className='text-[#214177]'>Remember Me</label>
                                    </div>
                                    <div className='w-1/2 flex justify-end items-center '>
                                        <label className='text-red-500 cursor-pointer'>Forget Password?</label>
                                    </div>
                                </div>
                            </>}
                        <button
                            disabled={isLoading}
                            className={`w-full p-4 rounded-lg flex justify-center items-center mt-10 transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#365382] text-white hover:bg-[#2b4469]'
                                }`}
                            onClick={() => isRegister ? registerClick() : loginClick()}
                        >
                            {isLoading ? (
                                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                            ) : (
                                <label>{isRegister ? 'Register' : 'Log in'}</label>
                            )}
                        </button>
                        <button
                            onClick={() => window.location.href = "https://api-h-series.telecorp.co.th/auth/auth/google"}
                            className={`w-full p-2 rounded-lg flex justify-center items-center mt-2 transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
                                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <span className="text-sm">Login with Google</span>
                        </button>

                        <div className="w-full p-4 text-[#214177] rounded-lg flex justify-end items-center">
                            <button
                                className="text-sm underline"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {isRegister ? 'Back to Login' : 'Register'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex w-full text-xs'>
                    <div className='w-1/3 flex justify-start'>
                        <label>Version 1.0.2</label>
                    </div>
                    <div className='w-2/3 flex justify-end'>
                        <label>Copyright ©2024 Telecorp. All Rights Reserved.</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Formlogin