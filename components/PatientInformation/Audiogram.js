'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addAudio, getAudioById, searchCategory, updateAudio } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function Audiogram({ module = 'patient-information', activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
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
      setSwitchStaus(activeTap?.audiogram)
    } else if (module === 'docter-result') {
      setSwitchStaus(activeTap?.lab_and_xray)
    }
  }, [activeTap?.audiogram, activeTap?.lab_and_xray, module])

  const refresh = async () => {
    try {
      startLoading()
      const res = await getAudioById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || {})
        if (res?.data === null && module === 'patient-information') {
          onActiveTap('audiogram', false)
        }
      } else {
        console.log('error', res?.error)
        if (module === 'patient-information') {
          onActiveTap('audiogram', false)
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
      const type = ['Audiogram', 'AudiogramRecommend']
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
    onActiveTap('audiogram', update.target.checked)
  }

  const handleChange = (update) => {
    if (update.hasOwnProperty('_RightEarDetail')) {
      if (update?._RightEarDetail) {
        update.RightEarDetail = (form?.RightEarDetail || '') + (form?.RightEarDetail ? '\n' : '') + update?._RightEarDetail
      }
    } else if (update.hasOwnProperty('_RecomEarDetail')) {
      if (update?._RecomEarDetail) {
        update.RecomEarDetail = (form?.RecomEarDetail || '') + (form?.RecomEarDetail ? '\n' : '') + update?._RecomEarDetail
      }
    }
    setForm({ ...form, ...update })
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved')
        setForm((p) => ({
          ...p, ...{
            R250: null,
            R500: null,
            R750: null,
            R1000: null,
            R2000: null,
            R3000: null,
            R4000: null,
            R6000: null,
            R8000: null,
            L250: null,
            L500: null,
            L750: null,
            L1000: null,
            L2000: null,
            L3000: null,
            L4000: null,
            L6000: null,
            L8000: null,
            ResultStatus: null,
            RightEarDetail: null,
            LeftEarDetail: null,
            RecomEarDetail: null,
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
          R250: form?.R250 || null,
          R500: form?.R500 || null,
          R750: form?.R750 || null,
          R1000: form?.R1000 || null,
          R2000: form?.R2000 || null,
          R3000: form?.R3000 || null,
          R4000: form?.R4000 || null,
          R6000: form?.R6000 || null,
          R8000: form?.R8000 || null,
          L250: form?.L250 || null,
          L500: form?.L500 || null,
          L750: form?.L750 || null,
          L1000: form?.L1000 || null,
          L2000: form?.L2000 || null,
          L3000: form?.L3000 || null,
          L4000: form?.L4000 || null,
          L6000: form?.L6000 || null,
          L8000: form?.L8000 || null,
          ResultStatus: form?.ResultStatus || null,
          RightEarDetail: form?.RightEarDetail || null,
          LeftEarDetail: form?.LeftEarDetail || null,
          RecomEarDetail: form?.RecomEarDetail || null,
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
            const res = await updateAudio(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addAudio({ ...saveData, trPatientUID: UID })
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
        <label id='audiogram' className='font-semibold text-[#365382]'>Audiogram</label>
        <div>
          {module != 'docter-result' && <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />}
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={module === 'docter-result' ? true : switchStaus}>
        <div className='grid grid-cols-12  items-start   w-full gap-2 mt-4 p-2'>
          <label className='font-light text-base col-span-12 text-[#4E4E4E]' >Visual Acuity</label>
          <div className='grid grid-cols-12  col-span-12 gap-4'>
            <div className='col-span-12 flex justify-center items-start'>
              <div className='w-[90%] grid grid-cols-12 gap-4 '>
                <label className='text-[#4E4E4E] font-semibold col-span-12'>วัตถุประสงค์ของการตรวจ</label>
                <div className='flex gap-2 items-center col-span-12'>
                  <input checked={form.ResultStatus === 'ประเมินความสมบูรณ์พร้อมในการทำงาน (Fitness for Work)'} onChange={() => handleChange({ ResultStatus: "ประเมินความสมบูรณ์พร้อมในการทำงาน (Fitness for Work)" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="objectives-xamination1" name="objectives-xamination" value="" />
                  <label htmlFor='objectives-xamination1' className=''>ประเมินความสมบูรณ์พร้อมในการทำงาน (Fitness for Work)</label>
                </div>
                <div className='flex gap-2 items-center col-span-12'>
                  <input checked={form.ResultStatus === 'เฝ้าระวังภาวะสุขภาพตามมาตรการอนุรักษ์การได้ยิน (Health Surveillance in Hearing Conservation Program.)'} onChange={() => handleChange({ ResultStatus: "เฝ้าระวังภาวะสุขภาพตามมาตรการอนุรักษ์การได้ยิน (Health Surveillance in Hearing Conservation Program.)" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="objectives-xamination2" name="objectives-xamination" value="" />
                  <label htmlFor='objectives-xamination2' className=''>เฝ้าระวังภาวะสุขภาพตามมาตรการอนุรักษ์การได้ยิน (Health Surveillance in Hearing Conservation Program.)</label>
                </div>
                <div className='flex gap-2 items-center col-span-12'>
                  <input checked={form.ResultStatus === 'ประเมินระดับการได้ยินทั่วไป (Hearing Evaluation)'} onChange={() => handleChange({ ResultStatus: "ประเมินระดับการได้ยินทั่วไป (Hearing Evaluation)" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="objectives-xamination3" name="objectives-xamination" value="" />
                  <label htmlFor='objectives-xamination3' className=''>ประเมินระดับการได้ยินทั่วไป (Hearing Evaluation)</label>
                </div>

                {/* Right Ear (หูขวา) */}
                <div className='flex justify-center  items-start col-span-12'>
                  <div className='col-span-12 flex flex-col  w-[90%] lg:w-[80%] gap-4'>
                    <div className='flex w-full justify-between items-start gap-2'>
                      <div className='flex flex-col gap-2 items-start whitespace-nowrap  '>
                        <label className='text-left'>Right Ear (หูขวา)</label>
                        {/* <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full '>
                          <label className='col-span-1 '>125 Hz. :</label>
                          <TextField value={form?.R125 || ''} onChange={(e) => handleChange({ R125: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div> */}
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>250 Hz. :</label>
                          <TextField value={form?.R250 || ''} onChange={(e) => handleChange({ R250: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>500 Hz. :</label>
                          <TextField value={form?.R500 || ''} onChange={(e) => handleChange({ R500: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>1000 Hz. :</label>
                          <TextField value={form?.R1000 || ''} onChange={(e) => handleChange({ R1000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>2000 Hz. :</label>
                          <TextField value={form?.R2000 || ''} onChange={(e) => handleChange({ R2000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>3000 Hz. :</label>
                          <TextField value={form?.R3000 || ''} onChange={(e) => handleChange({ R3000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>4000 Hz. :</label>
                          <TextField value={form?.R4000 || ''} onChange={(e) => handleChange({ R4000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        {/* <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>5000 Hz. :</label>
                          <TextField value={form?.R5000 || ''} onChange={(e) => handleChange({ R5000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div> */}
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>6000 Hz. :</label>
                          <TextField value={form?.R6000 || ''} onChange={(e) => handleChange({ R6000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1 '>8000 Hz. :</label>
                          <TextField value={form?.R8000 || ''} onChange={(e) => handleChange({ R8000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                      </div>

                      {/* Left Ear (หูซ้าย) */}
                      <div className='flex flex-col gap-2 items-start whitespace-nowrap  '>
                        <label className='text-left'>Left Ear (หูซ้าย)</label>
                        {/* <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full '>
                          <label className='col-span-1'>125 Hz. :</label>
                          <TextField value={form?.L125 || ''} onChange={(e) => handleChange({ L125: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div> */}
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>250 Hz. :</label>
                          <TextField value={form?.L250 || ''} onChange={(e) => handleChange({ L250: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>500 Hz. :</label>
                          <TextField value={form?.L500 || ''} onChange={(e) => handleChange({ L500: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>1000 Hz. :</label>
                          <TextField value={form?.L1000 || ''} onChange={(e) => handleChange({ L1000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>2000 Hz. :</label>
                          <TextField value={form?.L2000 || ''} onChange={(e) => handleChange({ L2000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>3000 Hz. :</label>
                          <TextField value={form?.L3000 || ''} onChange={(e) => handleChange({ L3000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>4000 Hz. :</label>
                          <TextField value={form?.L4000 || ''} onChange={(e) => handleChange({ L4000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        {/* <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>5000 Hz. :</label>
                          <TextField value={form?.L5000 || ''} onChange={(e) => handleChange({ L5000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div> */}
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>6000 Hz. :</label>
                          <TextField value={form?.L6000 || ''} onChange={(e) => handleChange({ L6000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                        <div className='grid grid-cols-4 lg:gap-2 gap-8 items-center  w-full   '>
                          <label className='col-span-1'>8000 Hz. :</label>
                          <TextField value={form?.L8000 || ''} onChange={(e) => handleChange({ L8000: e?.target.value })} size='small' className='text-white col-span-3 bg-[#FFFFFF]' label="" variant="outlined" />
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-12   gap-4 w-full mt-4'>
                      <div className=' col-span-12 flex gap-2'>
                        <Toolselect2 sm options={options?.Audiogram || []} value={form?._RightEarDetail || ''} onChange={(_RightEarDetail) => handleChange({ _RightEarDetail })}></Toolselect2>
                        {/* <div className='flex gap-2 items-center justify-end'>
                          <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เลือก</button>
                        </div> */}
                      </div>
                      <div className='col-span-12 flex gap-2 items-start'>
                        <label className=' whitespace-nowrap'>สรุปผล</label>
                        <div className='flex gap-2 w-full items-center justify-end'>
                          <TextareaAutosize value={form?.RightEarDetail || ''} onChange={(e) => handleChange({ RightEarDetail: e?.target.value })} minRows={3} maxRows={6} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                        </div>
                      </div>

                      <div className=' col-span-12 flex gap-2'>
                        <Toolselect2 sm options={options?.AudiogramRecommend || []} value={form?._RecomEarDetail || ''} onChange={(_RecomEarDetail) => handleChange({ _RecomEarDetail })}></Toolselect2>
                        {/* <div className='flex gap-2 items-center justify-end'>
                          <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#486f9e] text-[#FFFFFF]' >เลือก</button>
                        </div> */}
                      </div>
                      <div className='col-span-12 flex gap-2 items-start'>
                        <label className=' whitespace-nowrap'>คำแนะนำ</label>
                        <div className='flex gap-2 w-full items-center justify-end'>
                          <TextareaAutosize value={form?.RecomEarDetail || ''} onChange={(e) => handleChange({ RecomEarDetail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* foot */}
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center mt-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
          </div>

          <div className='flex col-span-12   gap-4 justify-center items-center my-4'>
            <div className='flex gap-2 items-center justify-between'>
              <input type="checkbox" className='w-5 h-5 accent-[#365382]' name="checking-entering" value="" />
              <label className='font-medium'>Baseline</label>
            </div><div className='flex gap-2 items-center justify-between'>
              <input type="checkbox" className='w-5 h-5 accent-[#365382]' name="checking-entering" value="" />
              <label className='font-medium'>ส่งไป CoreSeries</label>
            </div>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center cursor-pointer'>
            <button onClick={() => onClear()} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF] cursor-pointer' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
              </div>
            </button>
            <button onClick={() => onSave()} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF] cursor-pointer' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
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
    </div>
  )
}

export default Audiogram