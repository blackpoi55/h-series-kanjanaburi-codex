'use client'
import Formlogin from '@/components/Login/Formlogin'
import React, { useEffect, useState } from 'react'
function page() {
  const [Step, setStep] = useState(1)
 // const [departmentMap, setdepartmentMap] = useState([])
  const [values, setValues] = useState(
    {
     // username: " ",//Admin //moss
    //  password: " " //Telecorp#2024 //12345678
    }
  )
  const [loginData, setloginData] = useState({})
  useEffect(() => {
    localStorage.removeItem('345dp0asks9adls99235k33m12k5993klfp95')
    localStorage.removeItem('encryptionKey')
    localStorage.removeItem('iv')
    //refresh()
  }, [])
  // const refresh = async () => {
  //   // let data = await getStation()
  //   // console.log(data)
  //   // setdepartmentMap(data.data)
  // }

  return (
    <div className="w-screen h-screen max-w-screen overflow-hidden  bg-login text-black">
      <Formlogin loginData={loginData} setloginData={setloginData} values={values} setValues={setValues} setStep={setStep}>

      </Formlogin>
    </div>
  )
}

export default page