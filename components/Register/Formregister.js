'use client'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { checkmail, createKeyToken, createUser, encryptData, loginapi } from '../../action/api'
import { Checkbox, IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
function Formregister(props) {
    const { loginData, setloginData, setStep, values, setValues } = props
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginClick = async () => {
        let data = await loginapi({username: values.Username, password: values.Password})

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
            registerClick()
        }
    };
    console.log('values', values)
    const registerClick = async () => {
        console.log(values)
        let data = await createUser({...values,CWhen: new Date(),MWhen: new Date()})
        if (!data.error) {
            loginClick()
            Swal.fire({
                icon: 'success',
                title: 'ลงทะเบียนสำเร็จ',
                showConfirmButton: false,
                timer: 5000
            }) 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาดในการลงทะเบียน',
                text: data.message || 'กรุณาลองใหม่อีกครั้ง',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }
    return (
        <div className="w-full min-h-screen flex justify-end items-start sm:items-start md:items-start lg:items-center pr-36 ">

            <div className="border-2 bg-gray-200 w-full md:w-[35%] h-[90%] md:h-[550px] rounded-2xl shadow-2xl flex flex-col justify-center items-center p-4 ">
                <div className='w-full h-full md:px-10 mb-1 flex flex-col justify-center items-center'>
                    <img src={"/images/care_vista_c.png"} alt="" className="sm:h-10 md:h-14" />
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col items-center mt-6'>
                            <label className="text-[#214177] font-bold text-2xl" htmlFor="">Please Register</label>

                        </div>

                        <div className='w-full flex flex-col mt-6'>
                            <input disabled type="email" size='small' className=' bg-white border border-gray-300 p-2 rounded-md' value={values.email || null} />
                        </div>
                        <div className='w-full flex flex-col mt-6'>
                            <TextField autoFocus type="text" size='small' className=' bg-white' value={values.Name || null} onChange={(e) => handleChange({ Name: e?.target?.value })} label="Name" variant="outlined" />
                        </div>
                        <div className='w-full flex flex-col mt-6'>
                            <TextField autoFocus type="text" size='small' className=' bg-white' value={values.Username || null} onChange={(e) => handleChange({ Username: e?.target?.value })} label="Username" variant="outlined" />
                        </div>
                        <div className='w-full flex flex-col mt-6'>
                            <TextField autoFocus type="text" size='small' className=' bg-white' value={values.Password || null} onChange={(e) => handleChange({ Password: e?.target?.value })} label="Password" variant="outlined" />
                        </div>


                        <button
                            className="w-full p-4 bg-[#365382] text-white rounded-lg flex justify-center items-center mt-10"
                            onClick={() => registerClick()}
                        >
                            <label>Register</label>
                        </button>


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

export default Formregister