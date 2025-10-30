'use client'
import { Collapse, InputAdornment, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import Modal from '../Modal/Modal'
import { ModalCancel, ModalClearData, ModalSave, ModalSucceed } from '../Modal/ModalUnit'
import { ModalRecordingHistory } from './ModalRecordingHistory'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addVisualPerformance, getVisualPerformanceById, searchCategory, updateVisualPerformance } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function VisionTestResults({ activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  const [list, setList] = useState([])
  const [modalHistory, setmodalHistory] = useState(null)
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

  const refresh = async () => {
    try {
      startLoading()
      const res = await getVisualPerformanceById(UID)
      if (res?.message === 'success') {
        if (res?.data?.length > 0) {
          setForm(res?.data[0] || {})
        } else {
          onActiveTap('vision_test_results', false)
        }
      } else {
        console.log('error', res?.error)
        onActiveTap('vision_test_results', false)
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
      const type = ['TitmusDetail', 'Titmus', 'TitmusVA', 'TitmusJaeger']

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
  useEffect(() => {
    setSwitchStaus(activeTap?.vision_test_results)
  }, [activeTap?.vision_test_results])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('vision_test_results', update.target.checked)
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const test = () => {
    console.log('ModalSave')
  }

  const onChangecheckbox = (update) => {
    console.log(' onChangecheckboxe', update)
    if (update?.all) {
      update.aa1 = "ปกติ"
      update.LFar = "ชัดเจน"
      update.LNea = "ชัดเจน"
      update.LSight = "เหมาะสม"
      update.LCockeyed = "เหมาะสม"
      update.LColor = "ปกติ"
      update.LPhase = "ปกติ"
    } else {
      update.aa1 = "ผิดปกติ"
      update.LFar = "ไม่ชัดเจน"
      update.LNea = "ไม่ชัดเจน"
      update.LSight = "ไม่เหมาะสม"
      update.LCockeyed = "ไม่เหมาะสม"
      update.LColor = "ผิดปกติ"
      update.LPhase = "ผิดปกติ"
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
            RFar: null,
            RNea: null,
            RCockeyed: null,
            RSight: null,
            RPhase: null,
            RColor: null,
            LFar: null,
            LNea: null,
            LCockeyed: null,
            LSight: null,
            LPhase: null,
            LColor: null,
            VPDetail: null,
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
          RFar: form?.RFar || null,
          RNea: form?.RNea || null,
          RCockeyed: form?.RCockeyed || null,
          RSight: form?.RSight || null,
          RPhase: form?.RPhase || null,
          RColor: form?.RColor || null,
          LFar: form?.LFar || null,
          LNea: form?.LNea || null,
          LCockeyed: form?.LCockeyed || null,
          LSight: form?.LSight || null,
          LPhase: form?.LPhase || null,
          Cuser: form?.Cuser || null,
          Muser: form?.Muser || null,
          Cwhen: form?.Cwhen || null,
          Mwhen: form?.Mwhen || null,
          LColor: form?.LColor || null,
          VPDetail: form?.VPDetail || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const res = await updateVisualPerformance(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addVisualPerformance({ ...saveData, trPatientUID: UID })
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
    <div className={`w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4 ${switchStaus ? 'pb-20' : ''}   `}>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='vision_test_results' className='font-semibold text-[#365382]'>ผลการตรวจสมรรถภาพสายตาทางอาชีวอนามัย</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className='flex   items-start   w-full gap-4 mt-4 p-2 justify-center'>
          <div className='w-[90%] grid grid-cols-12 gap-4 '>
            <div className='col-span-12 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>ผลการตรวจ (Result)</label>
              {/* <div className='grid grid-cols-12 gap-4 justify-start ml-4'>
              <div className='flex gap-4 justify-start col-span-12 items-center'>
                <label className='col-span-4 whitespace-nowrap'>
                  มีประวัติเคยใส่แว่นสายตาหรือคอนแทคเลนส์หรือไม่ <br />(History of wearing eyeglasses or contact lenses)
                </label>
                <div className='flex gap-2 items-center col-span-1'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="history-of-wearing" name="history-of-wearing" value="" />
                  <label className=''>ใช่</label>
                </div>
                <div className='flex gap-2 items-center col-span-5'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="history-of-wearing" name="history-of-wearing" value="" />
                  <label className=''>ไม่ใช่</label>
                </div>
              </div>

              <div className='flex gap-4 justify-start col-span-12 items-center'>
                <label className='col-span-3 whitespace-nowrap'>ตรวจมองไกล(Far test)</label>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="far-test" name="far-test" value="" />
                  <label className=''>ตาเปล่า</label>
                </div>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="far-test" name="far-test" value="" />
                  <label className=''>ใส่แว่นตา</label>
                </div>

                <div className='flex gap-4 justify-start col-span-12 items-center'>
                  <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                    <input className='w-4 h-4   min-w-4 min-h-4 accent-[#365382]' type="radio" id="far-test" name="far-test" value="" />
                    <label className=''>ใส่คอนแทคเลนส์</label>
                  </div>
                </div>
                <label className='col-span-3 whitespace-nowrap'>ตรวจมองใกล้(Near test)</label>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="near-test" name="near-test" value="" />
                  <label className=''>ตาเปล่า</label>
                </div>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="near-test" name="near-test" value="" />
                  <label className=''>ใส่แว่นตา</label>
                </div>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4   min-w-4 min-h-4 accent-[#365382]' type="radio" id="near-test" name="near-test" value="" />
                  <label className=''>ใส่คอนแทคเลนส์</label>
                </div>
              </div>

              <div className='flex gap-4 justify-start col-span-12 items-center'>
                <label className='col-span-3 whitespace-nowrap'>กลุ่มอาชีพ (Job Group)</label>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group" name="job-group" value="" />
                  <label className=''>สำนักงาน</label>
                </div>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group" name="job-group" value="" />
                  <label className=''>ตรวจสอบ</label>
                </div>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group" name="job-group" value="" />
                  <label className=''>คุมเครื่องจักร</label>
                </div>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group" name="job-group" value="" />
                  <label className=''>ขับรถหรือควบคุมอุปกรณ์เคลื่อนที่</label>
                </div>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4  min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group" name="job-group" value="" />
                  <label className=''>ช่างเทคนิคหรืองานที่ใช้ทักษะสูง</label>
                </div>
                <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                  <input className='w-4 h-4  min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group" name="job-group" value="" />
                  <label className=''>แรงงานทั่วไป</label>
                </div>
              </div>

              <div className='flex gap-4 justify-start col-span-12 items-center'>
                <label className='col-span-3 whitespace-nowrap'>เครื่องตรวจสายตา</label>
                <div className='flex gap-2 items-center whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="eye-detector" name="eye-detector" value="" />
                  <label className=''>Titmus</label>
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="eye-detector" name="eye-detector" value="" />
                  <label className=''>Optec</label>
                </div>
                <div className='flex gap-2 items-center w-[50%] whitespace-nowrap'>
                  <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="eye-detector" name="eye-detector" value="" />
                  <label className=''>อื่นๆ ระบุ</label>
                  <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="" variant="outlined" />
                </div>
              </div>
            </div> */}

              <div className='grid grid-cols-12 gap-4 justify-start ml-4'>
                <div className='flex gap-4 justify-start col-span-12 items-start'>
                  <label className='  whitespace-nowrap col-span-4'>
                    มีประวัติเคยใส่แว่นสายตาหรือคอนแทคเลนส์หรือไม่ <br />(History of wearing eyeglasses or contact lenses)
                  </label>
                  <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-2 items-center col-span-2'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="history-of-wearing1" name="history-of-wearing" value="" />
                      <label htmlFor='history-of-wearing1' className=''>ใช่</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-6'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="history-of-wearing2" name="history-of-wearing" value="" />
                      <label htmlFor='history-of-wearing2' className=''>ไม่ใช่</label>
                    </div>
                  </div>

                </div>

                <div className='flex gap-4 justify-start col-span-12 items-start'>
                  <label className='col-span-2 whitespace-nowrap'>ตรวจมองไกล(Far test)</label>
                  <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="far-test1" name="far-test" value="" />
                      <label htmlFor='far-test1' className=''>ตาเปล่า</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="far-test2" name="far-test" value="" />
                      <label htmlFor='far-test2' className=''>ใส่แว่นตา</label>
                    </div>

                    <div className='flex gap-2 items-center col-span-5 whitespace-nowrap'>
                      <input className='w-4 h-4   min-w-4 min-h-4 accent-[#365382]' type="radio" id="far-test3" name="far-test" value="" />
                      <label htmlFor='far-test3' className=''>ใส่คอนแทคเลนส์</label>
                    </div>
                  </div>
                </div>

                <div className='flex gap-4 justify-start col-span-12 items-start'>
                  <label className='col-span-2 whitespace-nowrap'>ตรวจมองใกล้(Near test)</label>
                  <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="near-test1" name="near-test" value="" />
                      <label htmlFor='near-test1' className=''>ตาเปล่า</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="near-test2" name="near-test" value="" />
                      <label htmlFor='near-test2' className=''>ใส่แว่นตา</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-5 whitespace-nowrap'>
                      <input className='w-4 h-4   min-w-4 min-h-4 accent-[#365382]' type="radio" id="near-test3" name="near-test" value="" />
                      <label htmlFor='near-test3' className=''>ใส่คอนแทคเลนส์</label>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 justify-start col-span-12 items-start'>
                  <label className='col-span-2 whitespace-nowrap'>กลุ่มอาชีพ (Job Group)</label>
                  <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group1" name="job-group" value="" />
                      <label htmlFor='job-group1' className=''>สำนักงาน</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group2" name="job-group" value="" />
                      <label htmlFor='job-group2' className=''>ตรวจสอบ</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-1 whitespace-nowrap'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group3" name="job-group" value="" />
                      <label htmlFor='job-group3' className=''>คุมเครื่องจักร</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-2 whitespace-nowrap'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group4" name="job-group" value="" />
                      <label htmlFor='job-group4' className=''>ขับรถหรือควบคุมอุปกรณ์เคลื่อนที่</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-2  whitespace-nowrap'>
                      <input className='w-4 h-4  min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group5" name="job-group" value="" />
                      <label htmlFor='job-group5' className=''>ช่างเทคนิคหรืองานที่ใช้ทักษะสูง</label>
                    </div>
                    <div className='flex gap-2 items-center col-span-1 col-start-3  whitespace-nowrap'>
                      <input className='w-4 h-4  min-w-4 min-h-4 accent-[#365382]' type="radio" id="job-group6" name="job-group" value="" />
                      <label htmlFor='job-group6' className=''>แรงงานทั่วไป</label>
                    </div>
                  </div>
                </div>

                <div className='flex gap-4 justify-start col-span-12  items-start'>
                  <label className='col-span-2 whitespace-nowrap'>เครื่องตรวจสายตา</label>
                  <div className='flex gap-4 flex-wrap '>
                    <div className='flex gap-2 items-center whitespace-nowrap  col-span-1'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="eye-detector1" name="eye-detector" value="" />
                      <label htmlFor='eye-detector1' className=''>Titmus</label>
                    </div>
                    <div className='flex gap-2 items-center whitespace-nowrap  col-span-1'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="eye-detector2" name="eye-detector" value="" />
                      <label htmlFor='eye-detector2' className=''>Optec</label>
                    </div>
                    <div className='flex gap-2  whitespace-nowrap col-span-5 items-center'>
                      <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="eye-detector3" name="eye-detector" value="" />
                      <label htmlFor='eye-detector3' className=''>อื่นๆ ระบุ</label>
                      <TextField size='small' className='text-white bg-[#FFFFFF]' value={form?.orther || ''} onChange={(orther) => handleChange({ orther: orther?.target.value })} label="" variant="outlined" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-12 border-[#E2E2E2] border my-4'></div>

        <div className='flex   items-start   w-full gap-4 mt-4 p-2 justify-center'>
          <div className='w-[90%] lg:w-[80%] grid grid-cols-12 gap-4 '>
            <div className='col-span-12 flex gap-4 items-center justify-start  '>
              <input checked={form.all} onChange={(e) => onChangecheckbox({ all: e.target.checked })} type="checkbox" className='w-5 h-5 accent-[#365382]' id='normal-selection1' name="normal-selection" value="" />
              <label htmlFor='normal-selection1' className='font-medium'>เลือกปกติทั้งหมด</label>
            </div>
            <div className='flex gap-4 flex-col col-span-12  justify-center items-start'>
              <div className='w-full lg:w-[80%] grid grid-cols-12 gap-4   '>
                <label className='col-span-6'>1.การมองด้วยสองตา (Binocular vision)</label>
                <div className='flex gap-2 items-center whitespace-nowrap col-span-2'>
                  <input checked={form.aa1 === 'ปกติ'} onChange={(e) => handleChange({ aa1: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="binocular-vision1" name="binocular-vision" value="" />
                  <label htmlFor='binocular-vision1' className=''>ปกติ</label>
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-4'>
                  <input checked={form.aa1 === 'ผิดปกติ'} onChange={(e) => handleChange({ aa1: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="binocular-vision2" name="binocular-vision" value="" />
                  <label htmlFor='binocular-vision2' className=''>ผิดปกติ</label>
                </div>

                <label className='col-span-6'>2.การมองภาพระยะไกล(Far vision)</label>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-2'>
                  <input checked={form.LFar === 'ชัดเจน'} onChange={(e) => handleChange({ LFar: 'ชัดเจน' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="far-vision1" name="far-vision" value="" />
                  <label htmlFor='far-vision1' className=''>ชัดเจน</label>
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-4'>
                  <input checked={form.LFar === 'ไม่ชัดเจน'} onChange={(e) => handleChange({ LFar: 'ไม่ชัดเจน' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="far-vision2" name="far-vision" value="" />
                  <label htmlFor='far-vision2' className=''>ไม่ชัดเจน</label>
                </div>

                <label className='col-span-6'>3.การมองภาพระยะใกล้(Near vision)</label>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-2'>
                  <input checked={form.LNea === 'ชัดเจน'} onChange={(e) => handleChange({ LNea: 'ชัดเจน' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="near-vision1" name="near-vision" value="" />
                  <label htmlFor='near-vision1' className=''>ชัดเจน</label>
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-4'>
                  <input checked={form.LNea === 'ไม่ชัดเจน'} onChange={(e) => handleChange({ LNea: 'ไม่ชัดเจน' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="near-vision2" name="near-vision" value="" />
                  <label htmlFor='near-vision2' className=''>ไม่ชัดเจน</label>
                </div>

                <label className='col-span-6'>4.การมองภาพ 3 มิติ (Stereo depth)</label>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-2'>
                  <input checked={form.LSight === 'เหมาะสม'} onChange={(e) => handleChange({ LSight: 'เหมาะสม' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="stereo-depth1" name="stereo-depth" value="" />
                  <label htmlFor='stereo-depth1' className=''>เหมาะสม</label>
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-4'>
                  <input checked={form.LSight === 'ไม่เหมาะสม'} onChange={(e) => handleChange({ LSight: 'ไม่เหมาะสม' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="stereo-depth2" name="stereo-depth" value="" />
                  <label htmlFor='stereo-depth2' className=''>ไม่เหมาะสม</label>
                </div>

                <label className='col-span-6'>5.สมดุลกล้ามเนื้อตา (Eye Alignment)</label>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-2'>
                  <input checked={form.LCockeyed === 'เหมาะสม'} onChange={(e) => handleChange({ LCockeyed: 'เหมาะสม' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="eye-alignment1" name="eye-alignment" value="" />
                  <label htmlFor='eye-alignment1' className=''>เหมาะสม</label>
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-4'>
                  <input checked={form.LCockeyed === 'ไม่เหมาะสม'} onChange={(e) => handleChange({ LCockeyed: 'ไม่เหมาะสม' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="eye-alignment2" name="eye-alignment" value="" />
                  <label htmlFor='eye-alignment2' className=''>ไม่เหมาะสม</label>
                </div>

                <label className='col-span-6'>6.การจำแนกสี (Color vision)</label>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-2'>
                  <input checked={form.LColor === 'ปกติ'} onChange={(e) => handleChange({ LColor: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="color-vision1" name="color-vision" value="" />
                  <label htmlFor='color-vision1' className=''>ปกติ</label>
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-4'>
                  <input checked={form.LColor === 'ผิดปกติ'} onChange={(e) => handleChange({ LColor: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="color-vision2" name="color-vision" value="" />
                  <label htmlFor='color-vision2' className=''>ผิดปกติ</label>
                </div>

                <label className='col-span-6'>7.ลานสายตา (Visual field)</label>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-2'>
                  <input checked={form.LPhase === 'ปกติ'} onChange={(e) => handleChange({ LPhase: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visual-field1" name="visual-field" value="" />
                  <label htmlFor='visual-field1' className=''>ปกติ</label>
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap  col-span-4'>
                  <input checked={form.LPhase === 'ผิดปกติ'} onChange={(e) => handleChange({ LPhase: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visual-field2" name="visual-field" value="" />
                  <label htmlFor='visual-field2' className=''>ผิดปกติ</label>
                </div>
              </div>

              <div className='grid grid-cols-12 gap-4   w-full col-span-12  mt-4'>
                <label className='text-[#4E4E4E] font-light whitespace-nowrap col-span-2'>สรุปผล</label>
                <div className='flex flex-col gap-4 items-start w-full col-span-10 justify-start'>
                  <div className='flex gap-4 items-center w-full'>
                    <Toolselect2 sm options={options?.Titmus || []} label={""} value={form?.VPDetail || ''} onChange={(VPDetail) => handleChange({ VPDetail })}></Toolselect2>
                    {/* <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button> */}
                  </div>
                  <TextareaAutosize value={form?.VPDetail || ''} onChange={(e) => handleChange({ VPDetail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                  <div className='flex justify-start gap-4'>
                    <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปลผล</button>
                    {/* <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปลผล Eng</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='grid grid-cols-12 items-start w-full gap-2 mt-4 p-2'>
          {/* foot */}
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 22/11/2565 6:43:28</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button onClick={() => onClear()} className='cursor-pointer w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <label className='cursor-pointer'>ยกเลิกการลงผล</label>
              </div>
            </button>
            <button onClick={() => onSave()} className='cursor-pointer w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
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
            <div onClick={() => setmodalHistory(1)} className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div> */}
        <ModalCancel open={false} />
        <ModalSave open={false} />
        <ModalSucceed open={false} />
        <ModalClearData open={false} />
        <ModalRecordingHistory open={modalHistory} onClose={(v) => setmodalHistory(null)} />
      </Collapse>
    </div >
  )
}



export default VisionTestResults