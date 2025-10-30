'use client'
import { InputAdornment, Pagination, TablePagination, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useRef, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import Tooldatepick from '../Tool/Tooldatepick'
import { useRouter } from 'next/navigation'

function FixedBottomMenuDocter({ scrollToSection, UID }) {
  const [OpenMenu, setOpenMenu] = useState(null)
  const menuRef = useRef(null);
  const router = useRouter()

  useEffect(() => {
    if (OpenMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [OpenMenu])

  const onOpenMenu = (v) => {
    if (v === null) {
      setOpenMenu(v)
    } else {
      setOpenMenu(OpenMenu === v ? null : v)
    }
  }

  const handleClickOutside = (event) => {
    if (event.target.id === 'onOpenMenu') {
      return
    }
    if (event.target.id === 'onimgOpenMenu') {
      return
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(null) // ปิดเมนูเมื่อคลิกนอกเมนู
    }
  }

  const handleChange = (name, e) => {
    values[name] = e.target.value
    setValues({ ...values })
  }
  return <React.Fragment key={'submenu'}>
    <div className='w-full z-50 fixed bottom-0 left-0 flex  bg-[#3e1010] ' >
      <div className='flex  justify-end  w-[360px] bg-[#365382]'>
        <div className=' text-white flex flex-col gap-2 p-2 justify-center items-center whitespace-nowrap'>
          <label>HN: 18-03-007034</label>
          <label>นางสาว ปิยฉัตร ปิยะมงคลไทย</label>
        </div>
      </div>
      <div className='bg-[#F8F8F8] w-full flex justify-around '>


        <div className='lg:flex hidden gap-4 items-center justify-center'>
          <img onClick={() => scrollToSection('vital_sign')} className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_stethoscope.svg" />
          <img onClick={() => scrollToSection('lab_and_xray')} className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_lab.svg" />
          <img onClick={() => scrollToSection('patient_history')} className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_history.svg" />
          <img onClick={() => scrollToSection('physical_examination')} className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_bodyexam.svg" />
          <img className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_like.svg" />
          <img className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_woman.svg" />
        </div>

        <div className='flex gap-4 items-center justify-center'>
          <img onClick={() => router.push('/patientinfo')} className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_people.svg" />
          <img onClick={() => router.push(`/patientinformation?UID=${UID}`)} className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_information.svg" />
          <img onClick={() => router.push(`/printreport?UID=${UID}`)} className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_print.svg" />
          <img className='cursor-pointer' width={33} height={32} src="/icon/submenu_docter_confirm.svg" />
        </div>


        <div className='flex cursor-pointer relative'>
          <button id='onOpenMenu' onClick={() => {
            onOpenMenu(1)
          }} className=' flex justify-center items-center gap-4 whitespace-nowrap mr-2'>
            <img id='onimgOpenMenu' width={33} height={32} src="/icon/menu.svg" />เมนูหลัก
          </button>

          {OpenMenu === 1 &&
            <div ref={menuRef} className="absolute -top-30 -left-20 -right-20 bottom-20 z-[90]  shadow-2xl   bg-[#FFFFFF] rounded-lg border-[#A2B6E0] border">
              <ul className=" w-full h-full">
                <li onClick={() => scrollToSection('vital_sign')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center cursor-pointer justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_docter_stethoscope.svg" />
                  </div>
                  <span className="cursor-pointer">Vital Sign</span>
                </li>
                <li onClick={() => scrollToSection('lab_and_xray')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_docter_lab.svg" />
                  </div>
                  <span className="cursor-pointer">Lab And Xray</span>
                </li>
                <li onClick={() => scrollToSection('patient_history')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_docter_history.svg" />
                  </div>
                  <span className="cursor-pointer">Patient History</span>
                </li>
                <li onClick={() => scrollToSection('physical_examination')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_docter_bodyexam.svg" />
                  </div>
                  <span className="cursor-pointer">Physical Examination</span>
                </li>
                <li onClick={() => scrollToSection('titmus')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_docter_like.svg" />
                  </div>
                  <span className="cursor-pointer">Like</span>
                </li>
                <li onClick={() => scrollToSection('audiogram')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_docter_woman.svg" />
                  </div>
                  <span className="cursor-pointer">Audiogram</span>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
      <div onClick={() => scrollToSection('top')} className='flex  justify-start cursor-pointer  w-[260px] bg-[#365382]'>
        <div className=' text-white flex  gap-2 p-2 justify-center items-center'>
          <div className='flex justify-center items-center '>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 9.70706C4.90237 9.31654 4.90237 8.68337 5.2929 8.29285L11.2929 2.2929C11.6834 1.90238 12.3166 1.90238 12.7071 2.2929L18.7071 8.29285C19.0976 8.68337 19.0976 9.31654 18.7071 9.70706C18.3166 10.0976 17.6834 10.0976 17.2929 9.70707L13 5.41421L13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L11 5.41421L6.7071 9.70707C6.31658 10.0976 5.68341 10.0976 5.29289 9.70706Z" fill="white" />
            </svg>
          </div>
          <label className='cursor-pointer'>กลับขึ้นข้างบน</label>
        </div>
      </div>
    </div>
  </React.Fragment>

}

export default FixedBottomMenuDocter