'use client'
import React, { useEffect } from 'react'
//import Carddetail from '../Carddetail/Carddetail'
//import Toolselect2 from '../Tool/Toolselect2'
import { Collapse, TextField } from '@mui/material'
//import Tooldatepick from '../Tool/Tooldatepick'
import { toBuddhistDate } from '../Tool/tools'
import dayjs from 'dayjs'
import { InputSwitch } from '../Tool/input'
import { useState } from 'react'

function EpisodeNumber({ formPatientInformation, activeTap, onActiveTap }) {
  const [switchStaus, setSwitchStaus] = useState(null)

  useEffect(() => {
    setSwitchStaus(activeTap?.episode_number)
  }, [activeTap?.episode_number])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('episode_number', update.target.checked)
  }

  const handleChange = (name, e) => {
    values[name] = e.target.value
    setV
    alues({ ...values })
  }


  return (
    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
      <div className='flex text-[#365382] justify-between w-full'>
        <label id='episode_number' className='font-semibold'>Episode Number รายละเอียดการเข้ารับการตรวจทั้งหมดของระบบ H-Series</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className='grid grid-cols-12 w-full   '>
          <div className='col-span-12 overflow-x-auto px-1 pb-1'>
            <table className=" tablePatientInformation  mt-4 w-full ">
              <thead className='text-[#4E4E4E]  text-sm truncate'>
                <tr className=" text-left bg-[#E2E2E2]">
                  <th className="font-light">เลข EN</th>
                  <th className="font-light">วัน-เวลาที่อัพเดทข้อมูล</th>
                  <th className="font-light">ผู้อัพเดทข้อมูลล่าสุด</th>
                  <th className="font-light"></th>
                </tr>
              </thead>
              <tbody className='text-base font-light truncate'>
                {formPatientInformation?.trPatients?.length > 0 && formPatientInformation?.trPatients.map((item, index) => {
                  return <tr key={`trPatients${index}`} className=" text-center hover">
                    <td className=" text-left ">{item?.EN || '-'}</td>
                    <td className=" text-left ">{item?.CheckupDate ? toBuddhistDate(item?.CheckupDate) + ' ' + dayjs(item?.CheckupDate).format('HH:mm:ss') : '-'}</td>
                    <td className=" text-left ">{item?.UID || '-'}</td>
                    <td className=" text-left flex gap-2">
                      <button className=' border max-h-10 min-h-10 px-4 rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แสดงข้อมูลการรักษา</button>
                      <button className=' border max-h-10 min-h-10 px-4 rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >ปรับปรุงข้อมูลการรักษาล่าสุด กรุณารอสักครู่</button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default EpisodeNumber