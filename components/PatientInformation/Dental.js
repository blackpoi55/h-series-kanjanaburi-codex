'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addDental, getDentalById, updateDental } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function Dental({ activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  const [list, setList] = useState([])
  const [switchStaus, setSwitchStaus] = useState(null)

  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  const refresh = async () => {
    try {
      startLoading()
      const res = await getDentalById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || {})
        if (res?.data === null) {
          onActiveTap('dental', false)
        }
      } else {
        console.log('error', res?.error)
        onActiveTap('dental', false)
      }

    } catch (err) {
      console.error('An error occurred while refreshing data:', err)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    setSwitchStaus(activeTap?.dental)
  }, [activeTap?.dental])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('dental', update.target.checked)
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const onChangeCheckbox = (name, update) => {
    update[name] = update[name] ? 'Yes' : 'No'
    setForm({ ...form, ...update })
  }

  const isChecked = (item) => {
    return item === 'Yes'
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        setForm((p) => ({
          ...p, ...{
            "DentalDetail": null,
            "DentalHealthStatus": null,
            "NeedFill": null,
            "NeedGetRootCanal": null,
            "NeedRefill": null,
            "NeedExtraction": null,
            "NeedGingival": null,
            "MissingTooth": null,
            "Filling": null,
            "FillingNo": null,
            "RootCanal": null,
            "RootCanalNo": null,
            "Extraction": null,
            "ExtractionNo": null,
            "Gingival": null,
            "Denture": null,
            "Implant": null,
            "SeenDoctor": null,
            "Other": null,
            "OtherDetail": null,
            "Dentist": null,
            "CHKDental": null,
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
          "trPatientUID": form?.trPatientUID || null,
          "DentalID": form?.DentalID || null,
          "DentalDetail": form?.DentalDetail || null,
          "Language": form?.Language || null,
          "StatusFlag": form?.StatusFlag || null,
          "CUser": form?.CUser || null,
          "CWhen": form?.CWhen || null,
          "MUser": form?.MUser || null,
          "MWhen": form?.MWhen || null,
          "DentalHealthStatus": form?.DentalHealthStatus || null,
          "NeedFill": form?.NeedFill || null,
          "NeedGetRootCanal": form?.NeedGetRootCanal || null,
          "NeedRefill": form?.NeedRefill || null,
          "NeedExtraction": form?.NeedExtraction || null,
          "NeedGingival": form?.NeedGingival || null,
          "MissingTooth": form?.MissingTooth || null,
          "Filling": form?.Filling || null,
          "FillingNo": form?.FillingNo || null,
          "RootCanal": form?.RootCanal || null,
          "RootCanalNo": form?.RootCanalNo || null,
          "Extraction": form?.Extraction || null,
          "ExtractionNo": form?.ExtractionNo || null,
          "Gingival": form?.Gingival || null,
          "Denture": form?.Denture || null,
          "Implant": form?.Implant || null,
          "SeenDoctor": form?.SeenDoctor || null,
          "Other": form?.Other || null,
          "OtherDetail": form?.OtherDetail || null,
          "Dentist": form?.Dentist || null,
          "CHKDental": form?.CHKDental || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const res = await updateDental(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addDental({ ...saveData, trPatientUID: UID })
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
    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='dental' className='font-semibold text-[#365382]'>Dental</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className='flex   items-start   w-full gap-4 mt-4 p-2 justify-center'>
          <div className='w-[90%] grid grid-cols-12 gap-4 '>
            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>1. ระดับทันตสุขภาพ: Dental health status</label>
              <div className='flex flex-wrap gap-4 justify-start ml-4'>
                <div className='flex gap-2 items-center col-span-12'>
                  <input checked={form?.DentalHealthStatus === 'ดีมาก(Excellent)'} onChange={(e) => handleChange({ DentalHealthStatus: 'ดีมาก(Excellent)' })} className='w-4 h-4 accent-[#365382]' type="radio" id="dental-health-status1" name="dental-health-status" value="" />
                  <label htmlFor='dental-health-status1' className=''>ดีมาก(Excellent)</label>
                </div>
                <div className='flex gap-2 items-center col-span-12'>
                  <input checked={form?.DentalHealthStatus === 'ดี(Good)'} onChange={(e) => handleChange({ DentalHealthStatus: 'ดี(Good)' })} className='w-4 h-4 accent-[#365382]' type="radio" id="dental-health-status2" name="dental-health-status" value="" />
                  <label htmlFor='dental-health-status2' className=''>ดี(Good)</label>
                </div>
                <div className='flex gap-2 items-center col-span-12'>
                  <input checked={form?.DentalHealthStatus === 'พอใช้(Fair)'} onChange={(e) => handleChange({ DentalHealthStatus: 'พอใช้(Fair)' })} className='w-4 h-4 accent-[#365382]' type="radio" id="dental-health-status3" name="dental-health-status" value="" />
                  <label htmlFor='dental-health-status3' className=''>พอใช้(Fair)</label>
                </div>
                <div className='flex gap-2 items-center col-span-12'>
                  <input checked={form?.DentalHealthStatus === 'ไม่ดี(Poor)'} onChange={(e) => handleChange({ DentalHealthStatus: 'ไม่ดี(Poor)' })} className='w-4 h-4 accent-[#365382]' type="radio" id="dental-health-status4" name="dental-health-status" value="" />
                  <label htmlFor='dental-health-status4' className=''>ไม่ดี(Poor)</label>
                </div>
              </div>
            </div>

            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>2. ฟันผุที่ควรอุด: Cavity needs to be filled</label>
              <div className='flex gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center w-full '>
                  <label className='whitespace-nowrap'>ชื่อ/ตำแหน่ง:</label>
                  <TextField value={form?.NeedFill || ''} onChange={(e) => handleChange({ NeedFill: e?.target.value })} size='small' className='text-white  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>
            </div>

            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>3. ฟันผุที่ควรรื้ออุดใหม่: Poor filling with caries needs to be refilled</label>
              <div className='flex gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center w-full '>
                  <label className='whitespace-nowrap'>ชื่อ/ตำแหน่ง:</label>
                  <TextField value={form?.NeedRefill || ''} onChange={(e) => handleChange({ NeedRefill: e?.target.value })} size='small' className='text-white  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>
            </div>

            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>4. ฟันผุที่ควรรักษาคลองรากฟัน: Cavity which has pulp tissue exposed needs to get root canal treatment</label>
              <div className='flex gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center w-full '>
                  <label className='whitespace-nowrap'>ชื่อ/ตำแหน่ง:</label>
                  <TextField value={form?.NeedGetRootCanal || ''} onChange={(e) => handleChange({ NeedGetRootCanal: e?.target.value })} size='small' className='text-white  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>
            </div>

            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>5. ฟันที่ควรถอน: Unrestorable tooth needs extraction</label>
              <div className='flex gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center w-full '>
                  <label className='whitespace-nowrap'>ชื่อ/ตำแหน่ง:</label>
                  <TextField value={form?.NeedExtraction || ''} onChange={(e) => handleChange({ NeedExtraction: e?.target.value })} size='small' className='text-white  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>
            </div>

            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>6. ฟันที่ควรรักษาโรคเหงือก: Inflammed gum needs gingival treatment</label>
              <div className='flex gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center w-full '>
                  <label className='whitespace-nowrap'>ชื่อ/ตำแหน่ง:</label>
                  <TextField value={form?.NeedGingival || ''} onChange={(e) => handleChange({ NeedGingival: e?.target.value })} size='small' className='text-white  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>
            </div>

            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>7. ฟันธรรมชาติที่หายไป: Missing tooth</label>
              <div className='flex gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center w-full '>
                  <label className='whitespace-nowrap'>ชื่อ/ตำแหน่ง:</label>
                  <TextField value={form?.MissingTooth || ''} onChange={(e) => handleChange({ MissingTooth: e?.target.value })} size='small' className='text-white  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-12 border-[#E2E2E2] border my-4'></div>

        <div className='flex   items-start   w-full gap-4 mt-4 p-2 justify-center'>
          <div className='w-[90%] grid grid-cols-12 gap-4 '>
            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>แนะนำ : Recommendation</label>
              <div className='grid grid-cols-12 gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center justify-start col-span-8'>
                  <input checked={isChecked(form?.Filling)} onChange={(e) => (onChangeCheckbox('Filling', { Filling: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Filling1' name="Filling" value="" />
                  <label htmlFor='Filling1' className='font-medium'>อุดฟัน (Filling)</label>
                </div>
                <div className='flex gap-4 items-center col-span-4 '>
                  <TextField value={form?.FillingNo || ''} onChange={(e) => handleChange({ FillingNo: e?.target.value.replace(/[^0-9]/g, '') })} size='small' className='text-white  w-20   bg-[#FFFFFF]' label="" variant="outlined" />
                  <label className='whitespace-nowrap'>ซี่</label>
                </div>
              </div>
              <div className='grid grid-cols-12 gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center justify-start col-span-8'>
                  <input checked={isChecked(form?.RootCanal)} onChange={(e) => (onChangeCheckbox('RootCanal', { RootCanal: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Root-canal-treatment1' name="Root-canal-treatment" value="" />
                  <label htmlFor='Root-canal-treatment1' className='font-medium'>รักษาคลองรากฟัน (Root canal treatment)</label>
                </div>
                <div className='flex gap-4 items-center col-span-4 '>
                  <TextField value={form?.RootCanalNo || ''} onChange={(e) => handleChange({ RootCanalNo: e?.target.value.replace(/[^0-9]/g, '') })} size='small' className='text-white  w-20   bg-[#FFFFFF]' label="" variant="outlined" />
                  <label className='whitespace-nowrap'>ซี่</label>
                </div>
              </div>
              <div className='grid grid-cols-12 gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center justify-start col-span-8'>
                  <input checked={isChecked(form?.Extraction)} onChange={(e) => (onChangeCheckbox('Extraction', { Extraction: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Extraction1' name="Extraction" value="" />
                  <label htmlFor='Extraction1' className='font-medium'>ถอนฟัน (Extraction)</label>
                </div>
                <div className='flex gap-4 items-center col-span-4 '>
                  <TextField value={form?.ExtractionNo || ''} onChange={(e) => handleChange({ ExtractionNo: e?.target.value.replace(/[^0-9]/g, '') })} size='small' className='text-white  w-20   bg-[#FFFFFF]' label="" variant="outlined" />
                  <label className='whitespace-nowrap'>ซี่</label>
                </div>
              </div>
              <div className='grid grid-cols-12 gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center justify-start col-span-12'>
                  <input checked={isChecked(form?.Gingival)} onChange={(e) => (onChangeCheckbox('Gingival', { Gingival: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Gingival1' name="Gingival" value="" />
                  <label htmlFor='Gingival1' className='font-medium'>รักษาโรคเหงือกอักเสบ/ขูดหินปูน (Gingival treatment)</label>
                </div>
              </div>
            </div>

            <div className='col-span-12 lg:col-span-6 flex flex-col gap-4'>
              <label className='text-[#4E4E4E]'>(Scalling Fullmount)</label>
              <div className='grid grid-cols-12 gap-4 justify-start ml-4'>
                <div className='flex gap-4 items-center justify-start col-span-12'>
                  <input checked={isChecked(form?.Denture)} onChange={(e) => (onChangeCheckbox('Denture', { Denture: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Denture1' name="Denture" value="" />
                  <label htmlFor='Denture1' className='font-medium'>ใส่ฟันปลอม (Denture)</label>
                </div>
                <div className='flex gap-4 items-center justify-start col-span-12'>
                  <input checked={isChecked(form?.Implant)} onChange={(e) => (onChangeCheckbox('Implant', { Implant: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Implant1' name="Implant" value="" />
                  <label htmlFor='Implant1' className='font-medium'>รากฟันเทียม (Implant)</label>
                </div>
                <div className='flex gap-4 items-center justify-start col-span-12'>
                  <input checked={isChecked(form?.SeenDoctor)} onChange={(e) => (onChangeCheckbox('SeenDoctor', { SeenDoctor: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='SeenDoctor1' name="SeenDoctor" value="" />
                  <label htmlFor='SeenDoctor1' className='font-medium'>พบทันตแพทย์ทุก 6 เดือน</label>
                </div>
                <div className='flex  gap-4 justify-start col-span-12'>
                  <div className='flex gap-4 items-center justify-start whitespace-nowrap'>
                    <input checked={isChecked(form?.Other)} onChange={(e) => (onChangeCheckbox('Other', { Other: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Other1' name="Other" value="" />
                    <label htmlFor='Other1' className='font-medium'>อื่น ๆ (Other)</label>
                  </div>
                  <div className='flex gap-4 items-center w-full '>
                    <TextField value={form?.OtherDetail || ''} onChange={(e) => handleChange({ OtherDetail: e?.target.value })} size='small' className='text-white  w-full  bg-[#FFFFFF]' label="" variant="outlined" />
                  </div>
                </div>
              </div>
            </div>

            <div className='col-span-12 flex gap-4 justify-center items-center mt-4'>
              <div className='w-[100%] lg:w-[90%] grid grid-cols-12 flex-col gap-4 '>
                <div className='col-span-3'>
                  <label className='text-[#4E4E4E]'>แพทย์ผู้ตรวจ (Attending Dentist)</label>
                </div>
                <div className='col-span-9 flex flex-col gap-4 items-start'>
                  <div className='flex gap-4 items-center w-full '>
                    <TextField size='small' className='text-white  w-full  bg-[#FFFFFF]' label="" variant="outlined" />
                  </div>
                  <div className='flex gap-4 items-center justify-center  '>
                    <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' name="checkingEKG" value="" />
                    <label className='font-medium'>ควรปฏิบัติตามคำแนะนำของทันตแพทย์</label>
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

export default Dental