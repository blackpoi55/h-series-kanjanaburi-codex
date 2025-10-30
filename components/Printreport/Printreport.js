'use client'
import { InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { MetaInitialAll } from '../Tool/var'
import Tooldatepick from '../Tool/Tooldatepick'
import { toBuddhistDate } from '../Tool/tools'
import { updatePhysicalexam } from '@/action/api'
import { succeedAlert } from '../SweetAlert/sweetAlert'

function Printreport({ data, data_result, refresh }) {
  const [form, setForm] = useState({})
  const [itemlist, setItemList] = useState([])
  const [UID, setUID] = useState("")

  const ReportPaper = [
    { value: 'A4', label: 'A4' },
    { value: 'A5', label: 'A5' },
  ]
  const Language = [
    { value: 'th', label: 'TH' },
    { value: 'en', label: 'EN' },
  ]

  useEffect(() => {
    if (data !== null || data_result != null) {
      let Results = []
      let SummaryResults = []
      console.log("data", data)
      console.log("data_result", data_result)
      // if (data?.trAudio != null) {
      //   Results.push(`Audio : ${data?.trAudio?.Audio_Detail || '-'}`)
      //   SummaryResults.push(`Audio : ${data?.trAudio?.RightEarDetail || '-'}`)
      // }

      // if (data?.trEKG != null) {
      //   Results.push(`คลื่นไฟฟ้าหัวใจ : ${data?.trEKG?.EKGDetail || '-'}`)
      //   SummaryResults.push(`คลื่นไฟฟ้าหัวใจ : ${data?.trEKG?.EKGID || '-'}`)
      // }
      if (data?.trVitalSign != null) {
        // Results.push(`Vital Sign : ${data?.trVitalSign?.BPDetail || '-'}`)
        // SummaryResults.push(`VitalSign : ${data?.trVitalSign?.BMIDetail || '-'}`)
      }
      if (data?.trPhysicalExamination != null) {
        //Results.push(`Physical : ${data?.trPhysicalExamination?.PEResult || '-'}`)
        SummaryResults.push(data_result || '')
        SummaryResults.push(data?.trPhysicalExamination?.diagnosis || '')
        SummaryResults.push(data?.trPhysicalExamination?.recommendation || '')
        SummaryResults.push(data?.trPhysicalExamination?.followup || '')
        console.log("uid",data)
        setUID(data?.trPhysicalExamination?.UID)
      }


      if (data?.trDental != null) {
        // Results.push(data?.Audio_Detail)
        // SummaryResults.push(data?.RightEarDetail)
      }
      if (data?.trEST != null) {
        // Results.push(data?.Audio_Detail)
        // SummaryResults.push(data?.RightEarDetail)
      }
      if (data?.trOBG_PAP != null) {
        // Results.push(data?.Audio_Detail)
        // SummaryResults.push(data?.RightEarDetail)
      }
      if (data?.trPatients != null) {
        let element = []
        for (let index = 0; index <= 1; index++) {
          if (data?.trPatients[index]) {
            element.push(data?.trPatients[index])
          }
        }
        setItemList(element)
      }

      data.report = data?.report ? data?.report : 'A4'
      const Results_s = Results.join('\n');
      const SummaryResults_s = SummaryResults.join('\n');

      data.language = data?.language ? data?.language : 'th'


      setForm((p) => ({
        ...p,
        ...data,
        Examination_results: Results_s,
        Summary_examination: SummaryResults_s,
        Summary_examination_edit: SummaryResults_s
      }))
    }
  }, [data])

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const onSelectItem = (item) => {
    setItemList((prevState) => {
      const currentItems = prevState || []
      if (currentItems.length > 0 && currentItems.some((d) => d?.EN === item?.EN)) {
        const updatedItems = currentItems.filter((d) => d?.EN !== item?.EN)
        return updatedItems
      }
      else {
        const updatedItems = [...currentItems, item]
        return updatedItems
      }
    })
  }

  const onSelectItemAll = () => {
    if (itemlist.length === form?.trPatients?.length) {
      setItemList([])
    } else {
      setItemList(form?.trPatients)
    }
  }

  const ischeck = (item) => {
    return itemlist?.some((d) => d === item) || false
  }

  const onOpenPath = () => {
    if (form?.language === 'th') {
      if (form?.report === 'A4') {
        window.open(`/report?UID=${form?.UID}&paper=${form?.report || ''}&Language=${form?.language || ''}`, '_blank')
      } else {
        const datasort = itemlist?.sort((a, b) => new Date(b?.CheckupDate) - new Date(a?.CheckupDate))
        window.open(`/report?UID=${form?.UID}&paper=${form?.report || ''}&trPatientUID_year1=${datasort[0]?.UID || '0'}&trPatientUID_year2=${datasort[1]?.UID || '0'}`, '_blank')
      }
    } else {
      if (form?.report === 'A4') {
        window.open(`/reporten?UID=${form?.UID}&paper=${form?.report || ''}&Language=${form?.language || ''}`, '_blank')
      } else {
        const datasort = itemlist?.sort((a, b) => new Date(b?.CheckupDate) - new Date(a?.CheckupDate))
        window.open(`/reporten?UID=${form?.UID}&paper=${form?.report || ''}&trPatientUID_year1=${datasort[0]?.UID || '0'}&trPatientUID_year2=${datasort[1]?.UID || '0'}`, '_blank')
      }
    }
  }
  const saveClick = async () => {
    console.log(form?.Summary_examination_edit)
    let data = await updatePhysicalexam(UID, {UID:UID,conclusion:form?.Summary_examination_edit})
    if (!data?.error) {
      succeedAlert()
      refresh()
    } else {
      console.log('res error', data?.error)
    }
  }
  return (
    <div className='w-full flex gap-4 items-stretch  '>
      <div className='w-[40%] bg-[#E2F0FF] flex flex-col gap-4 p-4 rounded-lg shadow-box'>
        <div className='relative flex flex-col col-span-4 items-start ga  gap-2 whitespace-nowrap'>
          <TextField disabled value={form?.HN || ''} onChange={(e) => handleChange({ HN: e?.target.value })} size='small' className='text-white w-full bg-[#FFFFFF]' label="HN:" variant="outlined" />
        </div>
        <div className='relative flex flex-col col-span-4 items-start ga  gap-2 whitespace-nowrap'>
          <TextField disabled value={form?.EN || ''} onChange={(e) => handleChange({ EN: e?.target.value })} size='small' className='text-white w-full bg-[#FFFFFF]' label="EN:" variant="outlined" />
        </div>
        <div className='relative flex flex-col col-span-4 items-start ga  gap-2 whitespace-nowrap'>
          <TextField disabled value={(form?.Prename || '') + (form?.Forename || '') + ' ' + (form?.Surname || '')} onChange={(e) => handleChange({ EN: e?.target.value })} size='small' className='text-white w-full bg-[#FFFFFF]' label="Name:" variant="outlined" />
        </div>
        <div className='relative flex flex-col col-span-4 items-start ga  gap-2 whitespace-nowrap'>
          <Tooldatepick sm label={"Checkup Date:"} value={form?.CheckupDate || ''} onChange={(CheckupDate) => handleChange({ CheckupDate })}   ></Tooldatepick>
        </div>
        <div className='relative flex flex-col col-span-4 items-start ga  gap-2 whitespace-nowrap'>
          <TextField value={form?.Sex || ''} onChange={(e) => handleChange({ Sex: e?.target.value })} size='small' className='text-white w-full bg-[#FFFFFF]' label="เพศ:" variant="outlined" />
        </div>
        <div className='relative flex flex-col col-span-4 items-start ga  gap-2 whitespace-nowrap'>
          {/* <label>แสดง:</label> */}
          <div className='flex gap-4 justify-center items-center w-full'>
            <div className='flex gap-2 items-center'>
              <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="show1" name="show" value="" />
              <label htmlFor='show1' className=''>Anti Hiv</label>
            </div>
            <div className='flex gap-2 items-center'>
              <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="show2" name="show" value="" />
              <label htmlFor='show2' className=''>Amphetamine</label>
            </div>
            <div className='flex gap-2 items-center'>
              <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="show3" name="show" value="" />
              <label htmlFor='show3' className=''>Pregnancy</label>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-start '>
          <Toolselect2 sm options={ReportPaper || []} label={"Report:"} value={form?.report || ''} onChange={(report) => handleChange({ report })} />
        </div>
        <div className='w-full flex justify-start '>
          <Toolselect2 sm options={Language || []} label={"Language:"} value={form?.language || ''} onChange={(language) => handleChange({ language })} />
        </div>
        <div className='w-full flex justify-start '>
          <Toolselect2 sm options={[]} label={"Location:"} value={''} change={''} name={" "}></Toolselect2>
        </div>
        <div className='relative flex flex-col col-span-4 items-start ga  gap-2 whitespace-nowrap'>
          <TextField size='small' className='text-white w-full bg-[#FFFFFF]' label="ชื่อผู้ตรวจสอบ" variant="outlined" />
        </div>
        <div className='relative flex w-full'>
          <Tooldatepick sm label={"วันที่"} value={''} change={' '} name={"วันที่ตรวจสอบ"} ></Tooldatepick>
        </div>

        <div className='w-full border-gray-300 bg-white'>
          <div className='grid grid-cols-1 w-full relative'>
            <label htmlFor='labcompare' className='w-full grid grid-cols-1 font-bold ml-2 mt-2'>Lab Compare</label>
          </div>
          <div className='grid grid-cols-12 w-full relative'>
            <div className='col-span-12 overflow-x-auto px-1 pb-1'>
              <table className=" tablePatientInformation  mt-4 w-full ">
                <thead className='text-[#4E4E4E]  text-sm truncate'>
                  <tr className=" text-left bg-[#E2E2E2]">
                    <th className="">
                      <div className='flex justify-center items-center'>
                        <input checked={itemlist?.length === form?.trPatients?.length} onClick={() => onSelectItemAll()} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' name="trPatient" value="" />
                      </div>
                    </th>
                    <th className="font-light">เลข EN</th>
                    <th className="font-light">วันอัพเดทข้อมูล</th>
                    <th className="font-light">ผู้อัพเดทข้อมูลล่าสุด</th>
                  </tr>
                </thead>
                <tbody className='text-base font-light truncate'>
                  {form?.trPatients?.length > 0 && form?.trPatients.map((item, index) => {
                    return <tr onClick={() => onSelectItem(item)} key={`trPatients${index}`} className=" text-center hover">
                      <td className="  ">
                        <div className='flex justify-center items-center'>
                          <input checked={ischeck(item)} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' name="trPatient_sub" value="" />
                        </div>
                      </td>
                      <td className=" text-left ">{item?.EN || '-'}</td>
                      <td className=" text-left ">{item?.CheckupDate ? toBuddhistDate(item?.CheckupDate) : '-'}</td>
                      <td className=" text-left ">{item?.UID || '-'}</td>

                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='relative flex  items-start gap-4 whitespace-nowrap'>
          <button className='h-10 w-full border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >Prepare Data</button>
          <button onClick={() => onOpenPath()} className='h-10 w-full border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >Show Data</button>
        </div>
      </div>

      <div className=' w-[60%] bg-[#F3F3F3] flex flex-col gap-4 p-4 rounded-lg  shadow-box '>
        <div className='flex w-full gap-4 flex-col justify-start'>
          <label className='font-semibold text-base'>ผลการตรวจอื่นๆ และรายการค้างตรวจ</label>
          <TextareaAutosize disabled value={form?.Examination_results || ''} minRows={10} maxRows={12} className="w-full rounded-lg  p-2 bg-gray-50" aria-label="" placeholder="" />
        </div>
        <div className='flex w-full gap-4 flex-col justify-start'>
          <label className='font-semibold text-base'>สรุปผลการตรวจ และคำแนะนำเพิ่มเติม</label>
          <TextareaAutosize disabled value={form?.Summary_examination || ''} minRows={10} maxRows={10} className="w-full rounded-lg  p-2 bg-gray-50" aria-label="" placeholder="" />
        </div>
        <div className='flex w-full gap-4 flex-col justify-start'>
          <label className='font-semibold text-base'>สรุปผลการตรวจ และคำแนะนำเพิ่มเติม แก้ไข</label>
          <TextareaAutosize value={form?.Summary_examination_edit || ''} onChange={(e) => handleChange({ Summary_examination_edit: e?.target.value })} minRows={8} maxRows={10} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
        </div>

        <div className='relative flex justify-center  items-start gap-4 whitespace-nowrap'>
          <button className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              <label>ล้าง</label>
            </div>
          </button>
          <button className='h-10  w-56 border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
              <img className=' cursor-pointer' width={24} height={24} src="/icon/plus.svg" />
              <label>บันทึกการตรวจอื่นๆ</label>
            </div>
          </button>
          <button onClick={() => saveClick()} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              <label>บันทึก</label>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Printreport