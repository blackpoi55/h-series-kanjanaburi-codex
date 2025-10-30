'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addSpiro, getSpiroById, searchCategory, updateSpiro } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function Spirometry({ module = 'patient-information', activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  const [list, setList] = useState([])
  const [switchStaus, setSwitchStaus] = useState(null)
  const [options, setOptions] = useState({})

  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  useEffect(() => {
    Loadoptions()
  }, [])

  useEffect(() => {
    if (module === 'patient-information') {
      setSwitchStaus(activeTap?.spirometry)
    } else if (module === 'docter-result') {
      setSwitchStaus(activeTap?.lab_and_xray)
    }
  }, [activeTap?.spirometry, activeTap?.lab_and_xray, module])

  const refresh = async () => {
    try {
      startLoading()
      const res = await getSpiroById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || {})
        if (res?.data === null && module === 'patient-information') {
          onActiveTap('spirometry', false)
        }
      } else {
        console.log('error', res?.error)
        if (module === 'patient-information') {
          onActiveTap('spirometry', false)
        }
      }

    } catch (err) {
      console.error('An error occurred while refreshing data:', err)
    } finally {
      stopLoading()
    }
  }

  const Loadoptions = async () => {
    try {
      startLoading()
      const type = ['Spiro']

      let _options = {}
      for await (const e of type) {
        const res = await searchCategory({ Category: e, Language: 'th' })
        if (res?.message === 'success') {
          if (res?.data?.length > 0) {
            let _o = []
            for await (const dd of res?.data || []) {
              _o.push({ value: dd?.Description, label: dd?.Description })
            }
            _options[e] = _o
          }
        }
      }
      setOptions(_options)
    } catch (err) {
      console.error('An error occurred while Loadoptions data:', err)
    } finally {
      stopLoading()
    }
  }

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('spirometry', update.target.checked)
  }

  const handleChange = (update) => {
    if (update.hasOwnProperty('_SpiroDetail')) {
      if (update?._SpiroDetail) {
        update.SpiroDetail = (form?.SpiroDetail || '') + (form?.SpiroDetail ? '\n' : '') + update?._SpiroDetail
      }
    }

    setForm({ ...form, ...update })
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        setForm((p) => ({
          ...p, ...{
            FVC: null,
            FVCPred: null,
            FVCPer: null,
            FEV1: null,
            FEV1Pred: null,
            FEV1Per: null,
            FEV1VFC: null,
            FEV1VFCPred: null,
            FEV1VFCPer: null,
            FEF2575: null,
            FEF2575Pred: null,
            FEF2575Per: null,
            FEF: null,
            FEFPred: null,
            FEFPer: null,
            ResultStatus: null,
            SpiroCriteria: null,
            TranslateStatus: null,
            SpiroDetail: null,
          }
        }))
      }
    })
  }
  const onSave = () => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {
          UID: form?.UID || null,
          trPatientUID: form?.trPatientUID || null,
          FVC: form?.FVC || null,
          FVCPred: form?.FVCPred || null,
          FVCPer: form?.FVCPer || null,
          FEV1: form?.FEV1 || null,
          FEV1Pred: form?.FEV1Pred || null,
          FEV1Per: form?.FEV1Per || null,
          FEV1VFC: form?.FEV1VFC || null,
          FEV1VFCPred: form?.FEV1VFCPred || null,
          FEV1VFCPer: form?.FEV1VFCPer || null,
          FEF2575: form?.FEF2575 || null,
          FEF2575Pred: form?.FEF2575Pred || null,
          FEF2575Per: form?.FEF2575Per || null,
          FEF: form?.FEF || null,
          FEFPred: form?.FEFPred || null,
          FEFPer: form?.FEFPer || null,
          ResultStatus: form?.ResultStatus || null,
          SpiroCriteria: form?.SpiroCriteria || null,
          TranslateStatus: form?.TranslateStatus || null,
          SpiroDetail: form?.SpiroDetail || null,
          Language: form?.Language || null,
          StatusFlag: form?.StatusFlag || null,
          CUser: form?.CUser || null,
          CWhen: form?.CWhen || null,
          MUser: form?.MUser || null,
          MWhen: form?.MWhen || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const res = await updateSpiro(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addSpiro({ ...saveData, trPatientUID: UID })
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          }
        } catch (error) {
          console.error('An error occurred while onSave:', error)
        } finally {
          stopLoading()
        }
      }
    })

  }

  return (
    <div className={`w-full flex flex-col rounded-2xl ${module === 'docter-result' ? 'bg-[#F3F3F3]' : 'bg-[#F8F8F8]'}  shadow-box p-5 my-4`}>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='spirometry' className='font-semibold text-[#365382]'>Spirometry</label>
        <div>
          {module != 'docter-result' && <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />}
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={module === 'docter-result' ? true : switchStaus}>
        <div className='grid grid-cols-12  items-start   w-full gap-4 mt-4 p-2'>
          <div className='flex col-span-12 gap-4'>
            <label className='font-light text-[#4E4E4E] mr-8'>แปลผลด้วยวิธี</label>
            <div className='flex gap-2 items-center col-span-12'>
              <input checked={form.TranslateStatus === '0'} onChange={() => handleChange({ TranslateStatus: "0" })} className='w-4 h-4 accent-[#365382]' type="radio" id="translate-results-by-method1" name="translate-results-by-method" value="" />
              <label htmlFor='translate-results-by-method1' className=''>Specified Ratio</label>
            </div>
            <div className='flex gap-2 items-center col-span-12'>
              <input checked={form.TranslateStatus === '1'} onChange={() => handleChange({ TranslateStatus: "1" })} className='w-4 h-4 accent-[#365382]' type="radio" id="translate-results-by-method2" name="translate-results-by-method" value="" />
              <label htmlFor='translate-results-by-method2' className=''>LLN</label>
            </div>
            <div className='flex gap-2 items-center col-span-12'>
              <input checked={form.TranslateStatus === '2'} onChange={() => handleChange({ TranslateStatus: "2" })} className='w-4 h-4 accent-[#365382]' type="radio" id="translate-results-by-method3" name="translate-results-by-method" value="" />
              <label htmlFor='translate-results-by-method3' className=''>อื่นๆ</label>
            </div>
          </div>

          <div className='grid grid-cols-12 col-span-12 gap-4 px-0 lg:px-16 justify-center whitespace-nowrap'>
            <div className='grid grid-cols-12 gap-4 text-[#4E4E4E] font-light col-span-12'>
              <label className='col-span-3'>Result</label>
              <label className='col-span-3'>Measured Value</label>
              <label className='col-span-3'>Predicted Value</label>
              <label className='col-span-3'>% Predicted</label>
            </div>
            <div className='grid grid-cols-12 gap-4   col-span-12'>
              <label className='col-span-3'>FVC (L) :</label>
              <TextField value={form?.FVC || ''} onChange={(e) => handleChange({ FVC: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FVCPred || ''} onChange={(e) => handleChange({ FVCPred: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FVCPer || ''} onChange={(e) => handleChange({ FVCPer: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
            </div>
            <div className='grid grid-cols-12 gap-4   col-span-12'>
              <label className='col-span-3'>FEV1 (L) :</label>
              <TextField value={form?.FEV1 || ''} onChange={(e) => handleChange({ FEV1: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FEV1Pred || ''} onChange={(e) => handleChange({ FEV1Pred: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FEV1Per || ''} onChange={(e) => handleChange({ FEV1Per: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
            </div>
            <div className='grid grid-cols-12 gap-4   col-span-12'>
              <label className='col-span-3'>FEV1 / FVC (%) :</label>
              <TextField value={form?.FEV1VFC || ''} onChange={(e) => handleChange({ FEV1VFC: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FEV1VFCPred || ''} onChange={(e) => handleChange({ FEV1VFCPred: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FEV1VFCPer || ''} onChange={(e) => handleChange({ FEV1VFCPer: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
            </div>
            <div className='grid grid-cols-12 gap-4   col-span-12'>
              <label className='col-span-3'>PEF (L/s) :</label>
              <TextField value={form?.FEF || ''} onChange={(e) => handleChange({ FEF: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FEFPred || ''} onChange={(e) => handleChange({ FEFPred: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FEFPer || ''} onChange={(e) => handleChange({ FEFPer: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
            </div>
            <div className='grid grid-cols-12 gap-4   col-span-12'>
              <label className='col-span-3'>FEF 25 - 75% (L/S) :</label>
              <TextField value={form?.FEF2575 || ''} onChange={(e) => handleChange({ FEF2575: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FEF2575Pred || ''} onChange={(e) => handleChange({ FEF2575Pred: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
              <TextField value={form?.FEF2575Per || ''} onChange={(e) => handleChange({ FEF2575Per: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' placeholder='กรอกตัวเลข' className='text-white  w-full col-span-3  bg-[#FFFFFF]' label="" variant="outlined" />
            </div>
          </div>

          <div className='flex col-span-12 gap-4'>
            <label className='font-light text-[#4E4E4E] mr-8'>สมการอ้างอิง</label>
            <div className='flex gap-2 items-center col-span-12'>
              <input checked={form?.SpiroCriteria === 'T'} onChange={(e) => handleChange({ SpiroCriteria: 'T' })} className='w-4 h-4 accent-[#365382]' type="radio" id="reference-equation1" name="reference-equation" value="" />
              <label htmlFor='reference-equation1' className=''>Thai</label>
            </div>
            <div className='flex gap-2 items-center col-span-12'>
              <input checked={form?.SpiroCriteria === 'ERS'} onChange={(e) => handleChange({ SpiroCriteria: 'ERS' })} className='w-4 h-4 accent-[#365382]' type="radio" id="reference-equation2" name="reference-equation" value="" />
              <label htmlFor='reference-equation2' className=''>ERS</label>
            </div>
            <div className='flex gap-2 items-center col-span-12'>
              <input checked={form?.SpiroCriteria === 'อื่นๆ'} onChange={(e) => handleChange({ SpiroCriteria: 'อื่นๆ' })} className='w-4 h-4 accent-[#365382]' type="radio" id="reference-equation3" name="reference-equation" value="" />
              <label htmlFor='reference-equation3' className=''>อื่นๆ</label>
            </div>
            <div className='flex gap-2 items-center col-span-12'>
              <input checked={form?.SpiroCriteria === 'ไม่แสดง'} onChange={(e) => handleChange({ SpiroCriteria: 'ไม่แสดง' })} className='w-4 h-4 accent-[#365382]' type="radio" id="reference-equation4" name="reference-equation" value="" />
              <label htmlFor='reference-equation4' className=''>ไม่แสดง</label>
            </div>
          </div>

          <div className='grid grid-cols-12 col-span-12 gap-4'>
            <div className='flex gap-4 items-center justify-start col-span-12'>
              <input checked={form?.SpiroDetail === 'ปกติ (Normal)'} onChange={(e) => handleChange({ SpiroDetail: 'ปกติ (Normal)' })} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation1' name="ck_reference-equation" value="" />
              <label htmlFor='ck_reference-equation1' className='font-medium'>ปกติ (Normal)</label>
            </div>
            <div className='flex gap-4 items-center justify-start col-span-12 lg:col-span-5'>
              <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation2' name="ck_reference-equation" value="" />
              <label htmlFor='ck_reference-equation2' className='font-medium'>สมรรถภาพปอดผิดปกติแบบจำกัดการขยายตัว (Restrictive abnormality)</label>
            </div>
            <div className='flex gap-4 col-span-12 col-start-2 lg:col-start-6 lg:col-span-7'>
              <div className='flex gap-4 items-center justify-start '>
                <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation3' name="ck_reference-equation" value="" />
                <label htmlFor='ck_reference-equation3' className='font-medium'>เล็กน้อย(Mild)</label>
              </div>
              <div className='flex gap-4 items-center justify-start '>
                <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation4' name="ck_reference-equation" value="" />
                <label htmlFor='ck_reference-equation4' className='font-medium'>ปานกลาง(Moderate)</label>
              </div>
              <div className='flex gap-4 items-center justify-start '>
                <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation5' name="ck_reference-equation" value="" />
                <label htmlFor='ck_reference-equation5' className='font-medium'>รุนแรง(Severe)</label>
              </div>
            </div>

            <div className='flex gap-4 items-center justify-start col-span-12 lg:col-span-5'>
              <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation6' name="ck_reference-equation" value="" />
              <label htmlFor='ck_reference-equation6' className='font-medium'>สมรรถภาพปอดผิดปกติแบบปอดอุดกั้น (Obstructive abnormality)</label>
            </div>
            <div className='flex gap-4 col-span-12 col-start-2 lg:col-start-6 lg:col-span-7'>
              <div className='flex gap-4 items-center justify-start '>
                <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation7' name="ck_reference-equation" value="" />
                <label htmlFor='ck_reference-equation7' className='font-medium'>เล็กน้อย(Mild)</label>
              </div>
              <div className='flex gap-4 items-center justify-start '>
                <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation8' name="ck_reference-equation" value="" />
                <label htmlFor='ck_reference-equation8' className='font-medium'>ปานกลาง(Moderate)</label>
              </div>
              <div className='flex gap-4 items-center justify-start '>
                <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation9' name="ck_reference-equation" value="" />
                <label htmlFor='ck_reference-equation9' className='font-medium'>รุนแรง(Severe)</label>
              </div>
            </div>

            <div className='flex gap-4 items-center justify-start col-span-12'>
              <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation10' name="ck_reference-equation" value="" />
              <label htmlFor='ck_reference-equation10' className='font-medium'>สมรรถภาพปอดผิดปกติแบบผสม (Mixed abnormality)</label>
            </div>
            <div className='flex gap-4 items-center justify-start col-span-12'>
              <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='ck_reference-equation11' name="ck_reference-equation" value="" />
              <label htmlFor='ck_reference-equation11' className='font-medium'>อื่นๆ (Other)</label>
            </div>

            <div className='col-span-12 flex flex-col justify-start items-center gap-4'>
              <div className='grid grid-cols-12 gap-4 w-full lg:w-[80%] mt-4'>
                <label className='text-[#4E4E4E] font-light whitespace-nowrap col-span-2'>สรุปผล</label>
                <div className='flex flex-col gap-4 items-center w-full col-span-10'>
                  <TextareaAutosize value={form?.ResultStatus || ''} onChange={(e) => handleChange({ ResultStatus: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                  <div className='flex gap-4 items-center w-full'>
                    <Toolselect2 sm options={options?.Spiro || []} value={form?._SpiroDetail || ''} onChange={(_SpiroDetail) => handleChange({ _SpiroDetail })} />
                    {/* <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button> */}
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-12 gap-4 w-full lg:w-[80%] mt-4'>
                <label className='text-[#4E4E4E] font-light whitespace-nowrap col-span-2'>คำแนะนำ</label>
                <div className='flex flex-col gap-4 items-center w-full col-span-10'>
                  <div className='flex gap-4 items-center w-full'>
                    <TextareaAutosize value={form?.SpiroDetail || ''} onChange={(e) => handleChange({ SpiroDetail: e?.target?.value })} minRows={3} maxRows={6} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-12 border-[#E2E2E2] border mt-4'></div>
        <div className='grid grid-cols-12 items-start w-full gap-2 mt-4 p-2'>
          {/* foot */}
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 22/11/2565 6:43:28</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button className='w-56  h-10 border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center'>
                {/* <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" /> */}
                <label>แปลผล</label>
              </div>
            </button>
            <button onClick={() => onSave()} className='cursor-pointer w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='cursor-pointer flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <label className='cursor-pointer'>บันทึก</label>
              </div>
            </button>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div>
        {/* <div className='w-full flex justify-end mt-4'>
          <div className='w-[50%] flex gap-2 items-center'>
            <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="ลงชื่อผู้คัดกรอง" variant="outlined" />
            <div className='bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
            </div>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div> */}
      </Collapse>
    </div >
  )
}

export default Spirometry