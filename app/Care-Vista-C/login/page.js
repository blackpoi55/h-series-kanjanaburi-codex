'use client'
import { encryptData, login_care_api } from '@/action/api'
import ForgotModal from '@/components/ForgotPassword/ForgotModal'
import Formlogin from '@/components/Login/Formlogin'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Checkbox, IconButton, InputAdornment, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
function page() {
  const [Step, setStep] = useState(1)
  // const [departmentMap, setdepartmentMap] = useState([])
  const [values, setValues] = useState(
    {
      username: "",//Admin //moss
      password: "" //Telecorp#2024 //12345678
    }
  )
  const [forgotOpen, setForgotOpen] = useState(false);
  const [loginData, setloginData] = useState({})

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  useEffect(() => {
    localStorage.removeItem('345dp0asks9adls99235k33m12k5993klfp95')
    localStorage.removeItem('encryptionKey')
    localStorage.removeItem('iv')
    localStorage.removeItem('cto')
    localStorage.removeItem('user')
  }, [])

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginClick = async () => {
    let data = await login_care_api(values)
    console.log(data)
    if (!data.error) {
      setloginData(data)
      localStorage.setItem('role', "am")
      localStorage.setItem('user', JSON.stringify({ user: data.user }))
      localStorage.setItem('cto', data.accessToken)
      if (data?.user?.role === "doctor" || data?.user?.role === "nurse") {
        router.push("/Care-Vista-C/individualtable")
      }
      else {
        router.push("/Care-Vista-C/healthcompany")
      }

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Username หรือ Password ไม่ถูกต้อง',
        showConfirmButton: false,
        timer: 1000
      })
    }

  }

  const handleChange = (update) => {
    console.log('update', update)
    setValues({ ...values, ...update })
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginClick();
    }
  };
  return (
    <div className="w-screen h-screen max-w-screen overflow-hidden  bg-care text-black">
      <ForgotModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
      <div className="w-full min-h-screen flex justify-end items-start sm:items-start md:items-start lg:items-center pr-36 ">

        <div className="border-2 bg-gray-200 w-full md:w-[35%] h-[90%] md:h-[550px] rounded-2xl shadow-2xl flex flex-col justify-center items-center p-4 ">
          <div className='w-full h-full md:px-10 mb-1 flex flex-col justify-center items-center'>
            <div className="flex justify-center items-center">
              <img src={"/images/icon.png"} alt="" className="sm:h-10 md:h-10 mr-2 mt-1" />
              <label className='text-[#214177] font-bold text-5xl'>Care Vista-C</label>
            </div>

            <div className='flex flex-col w-full'>
              <div className='flex flex-col items-center mt-6'>
                <label className="text-[#214177] font-bold text-2xl" htmlFor="">Please Login</label>

              </div>

              <div className='w-full flex flex-col mt-6'>
                <TextField autoFocus type="text" size='small' className=' bg-white' value={values.username || ''} onChange={(e) => handleChange({ username: e?.target?.value })} label="Username" variant="outlined" />
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
                <div className='w-1/2 flex justify-end items-center'>
                 <label className='text-red-500 cursor-pointer' onClick={() => setForgotOpen(true)}>Forget Password?</label>
                </div>
              </div>
              <button className="w-full p-4 bg-[#365382] text-white rounded-lg flex justify-center items-center mt-10" onClick={() => loginClick()}>
                <label htmlFor="">Log in</label>
              </button>
            </div>
          </div>
          <div className='flex w-full text-xs'>
            <div className='w-1/3 flex justify-start'>
              <label>Version 1.0.2</label>
            </div>
            <div className='w-2/3 flex justify-end'>
              <label>Copyright ©2025 Telecorp. All Rights Reserved.</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page