'use client'
import { InputAdornment, Pagination, TablePagination, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import Tooldatepick from '../Tool/Tooldatepick'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import HealthModal from '../HealthModal/HealthModal'
import { getPatientReportById, getPhysicalexamById, updatePhysicalexam } from '@/action/api'

function FixedBottomMenu({ scrollToSection, UID, data }) {
  const [aiLoading, setAiLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [OpenMenu, setOpenMenu] = useState(null)
  const menuRef = useRef(null)
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

  // ✅ ฟังก์ชันเรียก AI แบบ Streaming
  const aicalculateClick = async () => {
      if (aiLoading) return;            // ✅ ป้องกันการเรียกซ้ำจาก source อื่น
      setAiLoading(true);               // ✅ ตั้ง flag ตั้งแต่ต้น
      setModalOpen(true);
      setAiResult('');                  // ✅ เคลียร์ผลลัพธ์เก่าทันที
  
      let dataxam = await getPatientReportById(data.UID);
      if (!dataxam || !dataxam.data) {
        Swal.fire({
          icon: "error",
          title: "❌ ไม่พบข้อมูลผู้ป่วย",
          text: "กรุณาตรวจสอบรหัสผู้ป่วยและลองใหม่อีกครั้ง",
          confirmButtonColor: "#3085d6"
        });
        return setAiLoading(false);
      }
  
      const vitalSign = dataxam?.data?.trVitalSign || {};
      const patientHistory = dataxam?.data?.trPatientHistory || {};
      const labTests = dataxam?.data?.trLabs || [];
  
      const getLabValue = (code) => {
        const labItem = labTests.find(item => item.ItemCode === code);
        return labItem ? labItem.TestData : "";
      };
  
      let val = {
        gender: dataxam?.data?.Sex || '',
        age: dataxam?.data?.Age || '',
        hn: dataxam?.data?.HN || '',
        fullname: `${dataxam?.data?.Prename || ''}${dataxam?.data?.Forename || ''} ${dataxam?.data?.Surname || ''}`,
        bp: `${vitalSign?.BPSys || ''}/${vitalSign?.BPDias || ''}`,
        bmi: vitalSign?.BMI || '',
        disease: patientHistory?.PersonalHistoryChange || 'ไม่มี',
        smoking: patientHistory?.Smoking === "สูบ",
        alcohol: patientHistory?.Alcohol === "ดื่ม",
        labTests: {
          fbs: getLabValue("C001"),
          cholesterol: getLabValue("C002"),
          hdl: getLabValue("C034"),
          triglyceride: getLabValue("C004"),
          ldl: getLabValue("C085"),
          uric: getLabValue("H002035"),
          bun: getLabValue("H002018"),
          sgpt: getLabValue("H002020"),
          sglt: getLabValue("H002019"),
          alk: getLabValue("H002015"),
          hb: getLabValue("H002001"),
          hematocrit: getLabValue("H017009"),
          whiteCellCount: getLabValue("H005"),
          redCellCount: getLabValue("H002035"),
          color: getLabValue("U001001"),
          protein: getLabValue("U040004")
        }
      };
  
      try {
        const res = await fetch('/api/geministeamming', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(val)
        });
  
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let displayText = '';
        let fast = 1
        const streamCharacters = () => {
          if (buffer.length === 0) {
            setTimeout(streamCharacters, fast);
            return;
          }
          displayText += buffer[0];
          buffer = buffer.slice(1);
          setAiResult(displayText);
          setTimeout(streamCharacters, fast);
        };
  
        streamCharacters();
  
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value);
        }
  
      } catch (error) {
        console.error("❌ AI Error:", error);
        setAiResult("เกิดข้อผิดพลาดในการเชื่อมต่อ AI");
      }
      setTimeout(() => {
        setAiLoading(false);
      }, 1400);
    };


  const aiSaveClick = async () => {
    if (!aiResult || aiResult.trim() === "") {
      return Swal.fire({
        icon: "warning",
        title: "⛔ ไม่พบผลวิเคราะห์",
        text: "กรุณากดปุ่ม 'คำนวณใหม่' เพื่อให้ AI วิเคราะห์ก่อนบันทึก",
        confirmButtonColor: "#3085d6",
      });
    }

    try {

      const resData = await updatePhysicalexam(UID, { conclusion_ai: aiResult });

      if (!resData.error) {
        Swal.fire({
          icon: "success",
          title: "✅ บันทึกผลสำเร็จ",
          text: "ผลวิเคราะห์จาก AI ถูกบันทึกแล้ว",
          timer: 2000,
          showConfirmButton: false,
        });
        setModalOpen(false);
      } else {
        throw new Error(resData.message || "เกิดข้อผิดพลาดระหว่างบันทึก");
      }
    } catch (err) {
      console.error("❌ Save Error:", err);
      Swal.fire({
        icon: "error",
        title: "❌ บันทึกล้มเหลว",
        text: err.message || "ไม่สามารถบันทึกผลได้ โปรดลองใหม่",
      });
    }
  };

  const handleChange = (name, e) => {
    values[name] = e.target.value
    setValues({ ...values })
  }
  return <React.Fragment key={'submenu'}>
    <div className='w-full z-50 fixed bottom-0 left-0 flex  bg-[#3e1010] ' >
      {/* <HealthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} result={aiResult} /> */}
      {/* ✅ AI Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[100] shadow-2xl transition-transform duration-500 ease-in-out transform ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#0F2027] via-[#2C5364] to-[#014F7D] text-white shadow-lg">
          <h2 className="text-lg font-bold flex items-center gap-2 animate-fade-in">
            <div className="relative w-7 h-7">
              <img src="/images/careai.png" className="w-7 h-7 animate-pulse" />
              <span className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-white animate-ping opacity-30"></span>
            </div>
            วิเคราะห์ผลโดย CareAI
          </h2>
          <button
            onClick={() => setModalOpen(false)}
            className="text-white text-2xl font-bold hover:text-red-400 transition-all"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px-58px)] text-sm text-gray-800 leading-relaxed bg-gradient-to-b from-[#f9f9f9] to-white">

          <div className="space-y-6 animate-fade-in">
            {/* หัวข้อ */}
            <div className="border-l-4 border-[#26A1DC] pl-4">
              <h3 className="text-lg font-bold text-[#014F7D]">📋 สรุปผลตรวจสุขภาพ</h3>
              <p className="mt-1 text-gray-700 italic">{aiResult.match(/## (.*?)\n/)?.[1]}</p>
            </div>

            {/* รายละเอียด */}
            <div className="space-y-3">
              {aiResult &&
                aiResult.split('\n').map((line, i) => {
                  const clean = line.trim()

                  if (clean === '' || clean === '•') return null

                  // หัวข้อย่อย
                  if (clean.startsWith('**')) {
                    return (
                      <h4 key={i} className="text-md font-semibold text-[#365382] bg-[#eaf4ff] px-3 py-2 rounded-md shadow-sm">
                        {clean.replace(/\*\*/g, '')}
                      </h4>
                    )
                  }

                  // Bullet point
                  if (clean.startsWith('-')) {
                    return (
                      <div key={i} className="flex items-start gap-2 pl-2">
                        <div className="mt-1 w-2 h-2 rounded-full bg-[#26A1DC] flex-shrink-0" />
                        <p>{clean.replace(/^- /, '')}</p>
                      </div>
                    )
                  }

                  // ข้อความทั่วไป
                  return <p key={i}>{clean}</p>
                })}
            </div>
          </div>
          {/* )} */}
        </div>
        {/* Footer Buttons */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-2 flex justify-end gap-2 shadow-inner">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (aiLoading) return;         // ❌ ถ้ากำลังโหลดอยู่ ห้ามกด
              setAiLoading(true);            // ✅ ตั้ง flag ทันที
              setAiResult('');               // ✅ ล้างข้อความทันที
              aicalculateClick(true);            // ✅ แล้วค่อยคำนวณ
            }}
            disabled={aiLoading}             // ✅ ป้องกันจาก UI
            className={`w-1/2 px-4 py-2 rounded-lg font-semibold transition flex justify-center items-center gap-2
    ${aiLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90'
              }`}
          >
            {aiLoading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                กำลังคำนวณ...
              </>
            ) : (
              'คำนวณใหม่'
            )}
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (aiLoading) return;         // ❌ ถ้ากำลังโหลดอยู่ ห้ามกด 
              aiSaveClick();            // ✅ แล้วค่อยคำนวณ
            }}
            disabled={aiLoading}             // ✅ ป้องกันจาก UI
            className={`w-1/2 px-4 py-2 rounded-lg font-semibold transition flex justify-center items-center gap-2
    ${aiLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-700 text-white hover:opacity-90'
              }`}
          >
            บันทึก
          </button>
        </div>

      </div>

      <div className='flex  justify-end  w-[360px] bg-[#365382]'>
        <div className=' text-white flex flex-col gap-2 p-2 justify-center items-center whitespace-nowrap'>
          <label>HN: {data?.HN}</label>
          <label>{(data?.Prename || '') + (data?.Forename || '') + ' ' + (data?.Surname || '') + " " + '(' + (data?.Age || '') + ')'}</label>
        </div>
      </div>
      <div className='bg-[#F8F8F8] w-full flex justify-around '>
        <div className='lg:flex md:hidden gap-4 items-center'>
          <img className='cursor-pointer' onClick={() => scrollToSection('vital_sign')} width={33} height={32} src="/icon/stethoscope.svg" />
          <img className='cursor-pointer' onClick={() => scrollToSection('lab')} width={33} height={32} src="/icon/lab.svg" />
          <img className='cursor-pointer' onClick={() => scrollToSection('titmus')} width={33} height={32} src="/icon/ophthalmology.svg" />
          <img className='cursor-pointer' onClick={() => scrollToSection('audiogram')} width={33} height={32} src="/icon/oto-rhino-laryngologist.svg" />
          <img className='cursor-pointer' onClick={() => scrollToSection('x_ray')} width={33} height={32} src="/icon/xray.svg" />
          <img className='cursor-pointer' onClick={() => scrollToSection('ekg')} width={33} height={32} src="/icon/vitalsign.svg" />
        </div>

        <div className='flex gap-4 items-center'>
          <img onClick={() => router.push('/patientinfo')} className='cursor-pointer' width={33} height={32} src="/icon/people.svg" />
          <img onClick={() => router.push(`/docterresult?UID=${UID}`)} className='cursor-pointer' width={33} height={32} src="/icon/medicalrecord.svg" />
          <img onClick={() => router.push(`/printreport?UID=${UID}`)} className='cursor-pointer' width={33} height={32} src="/icon/print.svg" />
          <img className='cursor-pointer' width={33} height={32} src="/icon/confirm.svg" />
        </div>
        <div className='flex cursor-pointer relative'>
          {aiLoading ? (
            <button className="flex justify-center items-center gap-4 whitespace-nowrap mr-2">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
            </button>
          ) : (
            <button onClick={() => aicalculateClick(false)} className="flex justify-center items-center gap-4 whitespace-nowrap mr-2">
              <img width={33} height={32} src="/images/careai.png" />
            </button>
          )}

          <button id='onOpenMenu' onClick={() => {
            onOpenMenu(1)
          }} className=' flex justify-center items-center gap-4 whitespace-nowrap mr-2'>
            <img id='onimgOpenMenu' width={33} height={32} src="/icon/menu.svg" />เมนูหลัก
          </button>

          {OpenMenu === 1 &&
            <div ref={menuRef} className="absolute -top-30 -left-20 -right-20 bottom-20 z-[90]  shadow-2xl   bg-[#FFFFFF] rounded-lg border-[#A2B6E0] border">
              <ul className=" w-full h-full">
                <li onClick={() => scrollToSection('patient_information')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center cursor-pointer justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_patient_Info.svg" />
                  </div>
                  <span className="cursor-pointer">Patient Info</span>
                </li>
                <li onClick={() => scrollToSection('lab')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_lab.svg" />
                  </div>
                  <span className="cursor-pointer">Lab</span>
                </li>
                <li onClick={() => scrollToSection('x_ray')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_xray.svg" />
                  </div>
                  <span className="cursor-pointer">Xray</span>
                </li>
                <li onClick={() => scrollToSection('spirometry')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_spiro.svg" />
                  </div>
                  <span className="cursor-pointer">Spiro</span>
                </li>
                <li onClick={() => scrollToSection('titmus')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_titmus.svg" />
                  </div>
                  <span className="cursor-pointer">Titmus</span>
                </li>
                <li onClick={() => scrollToSection('audiogram')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_audiogram.svg" />
                  </div>
                  <span className="cursor-pointer">Audiogram</span>
                </li>
                <li onClick={() => scrollToSection('ekg')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_ekg.svg" />
                  </div>
                  <span className="cursor-pointer">EKG</span>
                </li>
                <li onClick={() => scrollToSection('dental')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_dental.svg" />
                  </div>
                  <span className="cursor-pointer">Dental</span>
                </li>
                <li onClick={() => scrollToSection('flexibility_muscular_strength')} className="flex w-full h-12 items-center cursor-pointer border-b hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_flexibility_muscular.svg" />
                  </div>
                  <span className="cursor-pointer truncate">Flexibility & Muscular Strength</span>
                </li>
                <li className="flex w-full h-12 items-center cursor-pointer hover:bg-slate-200">
                  <div className="flex items-center justify-center w-1/4">
                    <img width={33} height={32} src="/icon/submenu_obg.svg" />
                  </div>
                  <span className="cursor-pointer text-[#A9A9A9]">OBG</span>
                </li>
              </ul>
            </div>
          }
        </div>

      </div>
      <div onClick={() => scrollToSection('top')} className={`  flex  justify-start cursor-pointer  w-[260px] bg-[#365382] whitespace-nowrap`}>
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

export default FixedBottomMenu