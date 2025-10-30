'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { MetaInitialAll } from '../Tool/var'
import { InputSwitch } from '../Tool/input'
import { updatePatient } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'
import { useLoading } from '../Tool/LoadingContext '

function EditdataDocterresult({ activeTap, onActiveTap, data }) {
  const [switchStaus, setSwitchStaus] = useState(null)
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  useEffect(() => {
    if (data !== null) {
      setForm(data)
    }
  }, [data])

  useEffect(() => {
    setSwitchStaus(activeTap?.edit_data)
  }, [activeTap?.edit_data])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('edit_data', update.target.checked)
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const onSave = () => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {

        const saveData = {
          Prename: form?.Prename || null,
          Forename: form?.Forename || null,
          Surname: form?.Surname || null,
          Mobile: form?.Mobile || null,
          Company: form?.Company || null,
          Address: form?.Address || null,
          HispatientUID: form?.HispatientUID || null,
          HispatientvisitUID: form?.HispatientvisitUID || null,
          HisVisitCareProvider: form?.HisVisitCareProvider || null,
          HisVisitCareProviderEnglishName: form?.HisVisitCareProviderEnglishName || null,
          HisVisitCareProviderLicenseID: form?.HisVisitCareProviderLicenseID || null,
        }
        try {
          startLoading()
          const res = await updatePatient(form?.UID, saveData)
          if (res) {
            succeedAlert()
            refresh()
          } else {
            console.log('res error', res?.error)
          }
        } catch (error) {
          console.error('An error occurred while onSave:', error)
        } finally {
          stopLoading()
        }
      }
    })

  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved')
        const saveData = {
          Prename: null,
          Forename: null,
          Surname: null,
          Mobile: null,
          Company: null,
          Address: null,
          // HispatientUID: form?.HispatientUID || null,
          // HispatientvisitUID: form?.HispatientvisitUID || null,
          // HisVisitCareProvider: form?.HisVisitCareProvider || null,
          // HisVisitCareProviderEnglishName: form?.HisVisitCareProviderEnglishName || null,
          // HisVisitCareProviderLicenseID: form?.HisVisitCareProviderLicenseID || null,
        }
        setForm((p) => ({ ...p, ...saveData }))
      }
    })
  }
  return (
    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='edit_data' className='font-semibold text-[#365382]'>แก้ไขข้อมูล</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className=' w-full  grid grid-cols-12 gap-4   p-4'>
          {/* แุถว 1 */}
          <div className='relative flex col-span-4 ml-1 '>
            <Toolselect2 sm options={MetaInitialAll || []} label={"Title"} value={form?.Prename || ''} onChange={(Prename) => handleChange({ Prename })} ></Toolselect2>
          </div>
          <div className='relative flex col-span-4 ml-1 '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Forename || ''} onChange={(Forename) => handleChange({ Forename: Forename?.target?.value })} label="Forename" variant="outlined" />
          </div>
          <div className='relative flex col-span-4 ml-1 '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Surname || ''} onChange={(Surname) => handleChange({ Surname: Surname?.target?.value })} label="Surname" variant="outlined" />
          </div>
          {/* แุถว 2 */}
          <div className='relative flex col-span-4 ml-1 '>
            {/* <Toolselect2 options={[]} label={"Company Name"} value={''} change={''} name={""}></Toolselect2> */}
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Company || ''} onChange={(Company) => handleChange({ Company: Company?.target?.value })} label="Company Name" variant="outlined" />
          </div>
          <div className='relative flex col-span-4 ml-1 '>
            <Toolselect2 sm options={[]} label={"Location"} value={''} onChange={(Location) => handleChange({ Location })}></Toolselect2>
          </div>
          <div className='relative grid grid-cols-2 col-span-4 ml-1 items-center   gap-4'>
            {/* <label className='font-medium col-span-1'>สำหรับตรวจก่อนเข้างาน</label> */}
            <div className='flex gap-2 col-span-1'>
              <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' name="checking-entering" value="" />
              <label className='font-medium whitespace-nowrap'>ตรวจก่อนเข้างาน</label>
            </div>
          </div>
          {/* แุถว 3 */}
          <div className='relative flex col-span-4 ml-1 '>
            {/* <Toolselect2 options={[]} label={"เบอร์มือถือ"} value={''} change={''} name={""}></Toolselect2> */}
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Mobile || ''} onChange={(Mobile) => handleChange({ Mobile: Mobile?.target?.value })} label="เบอร์มือถือ" variant="outlined" />
          </div>
          <div className='relative flex col-span-4 ml-1 '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Address || ''} onChange={(Address) => handleChange({ Address: Address?.target?.value })} label="ที่อยู่ปัจจุบัน" variant="outlined" />
          </div>
          <div className='relative grid grid-cols-2 col-span-4 ml-1 items-center   gap-4'>
            {/* <label className='font-medium col-span-1'>ที่อยู่บริษัท</label> */}
            <div className='flex gap-2 col-span-1'>
              <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' name="company-address" value="" />
              <label className='font-medium whitespace-nowrap'>เหมือนที่อยู่ปัจจุบัน</label>
            </div>
          </div>
          {/* แุถว 4 */}
          <div className='relative flex col-span-8 ml-1 bg-[#FFFFFF]'>
            <Toolselect2 sm options={[]} label={"ชื่อแพทย์"} value={''} onChange={(Doctor_name) => handleChange({ Doctor_name })}></Toolselect2>
          </div>

          <div className='relative flex col-span-4 ml-1 '>
            <button className='w-[50%] border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่มชื่อแพทย์</button>
          </div>

          <div className='flex gap-4 col-span-12 justify-center items-center'>
            <button onClick={() => onClear()} className='cursor-pointer w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='cursor-pointer flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
              </div>
            </button>
            <button onClick={() => onSave()} className='cursor-pointer w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='cursor-pointer flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <label className='cursor-pointer'>บันทึก</label>
              </div>
            </button>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default EditdataDocterresult