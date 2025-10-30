'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addPapSmear, getPapSmearById, updateSmear } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function PapSmear({ activeTap, onActiveTap, UID }) {
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
      const res = await getPapSmearById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || {})
        if (res?.data === null) {
          onActiveTap('pap_smear', false)
        }
      } else {
        console.log('error', res?.error)
        onActiveTap('pap_smear', false)
      }

    } catch (err) {
      console.error('An error occurred while refreshing data:', err)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    setSwitchStaus(activeTap?.pap_smear)
  }, [activeTap?.pap_smear])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('pap_smear', update.target.checked)
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const handleChangeRadio = (update, result) => {
    if (update.hasOwnProperty('Normal_CellsWere')) {
      update.Abnormal_Cervical = ''
      update.Normal_Inflammation = ''
      update.Abnormal_Malignant = ''
      update.Cervical_Detail = result
      update.Inflammation_Detail = ''
    } else if (update.hasOwnProperty('Abnormal_Cervical')) {
      update.Normal_CellsWere = ''
      update.Normal_Inflammation = ''
      update.Abnormal_Malignant = ''
      update.Inflammation_Detail = result
      update.Cervical_Detail = ''
    } else if (update.hasOwnProperty('Normal_Inflammation')) {
      update.Normal_CellsWere = ''
      update.Abnormal_Cervical = ''
      update.Abnormal_Malignant = ''
      update.Cervical_Detail = result
      update.Inflammation_Detail = ''
    } else if (update.hasOwnProperty('Abnormal_Malignant')) {
      update.Normal_CellsWere = ''
      update.Abnormal_Cervical = ''
      update.Normal_Inflammation = ''
      update.Inflammation_Detail = result
      update.Cervical_Detail = ''
    }
    setForm({ ...form, ...update })
  }

  const onChangeCheckbox = (name, update) => {
    update[name] = update[name] ? 'A' : 'N'
    setForm({ ...form, ...update })
  }

  const isChecked = (item) => {
    return item === 'A'
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        setForm((p) => ({
          ...p, ...{
            "Normal_CellsWere": null,
            "Normal_Inflammation": null,
            "Abnormal_Cervical": null,
            "Abnormal_Malignant": null,
            "Inflammation_Detail": null,
            "Cervical_Detail": null,
            "Rec_Annual": null,
            "Rec_PleaseVisit": null,
            "Rec_PleaseConsult": null,
            "PleaseVisit_Months": null,
            "Rec_Other": null,
            "Other_Detail": null,
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
          "Normal_CellsWere": form?.Normal_CellsWere || null,
          "Normal_Inflammation": form?.Normal_Inflammation || null,
          "Abnormal_Cervical": form?.Abnormal_Cervical || null,
          "Abnormal_Malignant": form?.Abnormal_Malignant || null,
          "Inflammation_Detail": form?.Inflammation_Detail || null,
          "Cervical_Detail": form?.Cervical_Detail || null,
          "Rec_Annual": form?.Rec_Annual || null,
          "Rec_PleaseVisit": form?.Rec_PleaseVisit || null,
          "Rec_PleaseConsult": form?.Rec_PleaseConsult || null,
          "PleaseVisit_Months": form?.PleaseVisit_Months || null,
          "Rec_Other": form?.Rec_Other || null,
          "Other_Detail": form?.Other_Detail || null,
          "CUser": form?.CUser || null,
          "CWhen": form?.NormalCWhen_CellsWere || null,
          "MUser": form?.MUser || null,
          "MWhen": form?.MWhen || null,
          "trPatientUID": form?.trPatientUID || null,
          "TranslateTH": form?.TranslateTH || null,
          "TranslateEN": form?.TranslateEN || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const res = await updateSmear(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addPapSmear({ ...saveData, trPatientUID: UID })
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
        <label id='pap_smear' className='font-semibold text-[#365382]'>Pap Smear</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>

      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className='grid grid-cols-12  items-start   w-full gap-4 mt-4 p-2'>
          {/* ผลการตรวจมะเร็งปากมดลูก */}
          <div className='flex flex-col w-full gap-4 col-span-12 items-center'>
            <label className='w-full ml-28 text-[#4E4E4E] font-light'>ผลการตรวจมะเร็งปากมดลูก</label>
            <div className='w-[70%] flex flex-col lg:grid lg:grid-cols-12 gap-4'>
              <div className='col-span-6 flex-col flex gap-2'>
                <div className='flex items-center '>
                  <input value={'T'} checked={form?.Normal_CellsWere === 'T'} onChange={(e) => handleChangeRadio({ Normal_CellsWere: e?.target?.value }, 'ผลปกติ: ไม่พบเซลล์ปากมดลูกที่มีลักษณะผิดปกติ')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="cervical-cancer-examination-results1" name="cervical-cancer" />
                  <label htmlFor="cervical-cancer-examination-results1" className='ml-2'>ผลปกติ: ไม่พบเซลล์ปากมดลูกที่มีลักษณะผิดปกติ</label>
                </div>
                <div className='flex items-center '>
                  <input value={'T'} checked={form?.Normal_Inflammation === 'T'} onChange={(e) => handleChangeRadio({ Normal_Inflammation: e?.target?.value }, 'ผลปกติ: ไม่พบเซลล์มะเร็งที่ปากมดลูกแต่มีการอักเสบจาก')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="cervical-cancer-examination-results3" name="cervical-cancer" />
                  <label htmlFor="cervical-cancer-examination-results3" className='ml-2'>ผลปกติ: ไม่พบเซลล์มะเร็งที่ปากมดลูกแต่มีการอักเสบจาก</label>
                </div>
                <div className='flex items-center '>
                  <TextareaAutosize value={form?.Cervical_Detail || ''} onChange={(e) => handleChange({ Cervical_Detail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
              <div className='col-span-6 flex-col flex gap-2'>
                <div className='flex items-center '>
                  <input value={'T'} checked={form?.Abnormal_Cervical === 'T'} onChange={(e) => handleChangeRadio({ Abnormal_Cervical: e?.target?.value }, 'ผิดปกติ : พบเซลล์ปากมดลูกที่ผิดปกติอาจพัฒนาเป็นมะเร็งได้')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="cervical-cancer-examination-results2" name="cervical-cancer" />
                  <label htmlFor="cervical-cancer-examination-results2" className='ml-2'>ผิดปกติ : พบเซลล์ปากมดลูกที่ผิดปกติอาจพัฒนาเป็นมะเร็งได้</label>
                </div>

                <div className='flex items-center '>
                  <input value={'T'} checked={form?.Abnormal_Malignant === 'T'} onChange={(e) => handleChangeRadio({ Abnormal_Malignant: e?.target?.value }, 'ผิดปกติ : พบเซลล์ปากมดลูกที่เริ่มมีลักษณะผิดปกติ แต่ยังไม่มีลักษณะของเซลล์มะเร็ง')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="cervical-cancer-examination-results4" name="cervical-cancer" />
                  <label htmlFor="cervical-cancer-examination-results4" className='ml-2'>ผิดปกติ : พบเซลล์ปากมดลูกที่เริ่มมีลักษณะผิดปกติ แต่ยังไม่มีลักษณะของเซลล์มะเร็ง</label>
                </div>
                <div className='flex items-center '>
                  <TextareaAutosize value={form?.Inflammation_Detail || ''} onChange={(e) => handleChange({ Inflammation_Detail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>


          </div>
        </div>

        <div className='col-span-12 border-[#E2E2E2] border my-4'></div>

        {/* ผลการตรวจมะเร็งปากมดลูก */}
        <div className='grid grid-cols-12 gap-4 col-span-12 whitespace-nowrap'>
          <label className='col-start-2 col-span-12 text-[#4E4E4E] font-light'>คำแนะนำ</label>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice1' name="advice" value="" />
            <label htmlFor='advice1' className='font-medium'>ผลการตรวจมะเร็งปากมดลูก( Pap Smear ) อยู่ในเกณฑ์ปกติ ไม่พบเซลล์มะเร็งควรตรวจซ้ำในอีก 6-12 เดือน</label>
          </div>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" checked={isChecked(form?.Rec_PleaseConsult)} onChange={(e) => (onChangeCheckbox('Rec_PleaseConsult', { Rec_PleaseConsult: e?.target.checked }))} className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice2' name="advice" value="" />
            <label htmlFor='advice2' className='font-medium'>ควรไปพบแพทย์เพื่อตรวจภายใน</label>
            <TextField size='small' className='text-white w-full pl-2' value={form?.PleaseVisit_Months || ''} onChange={(PleaseVisit_Months) => handleChange({ PleaseVisit_Months: PleaseVisit_Months?.target?.value })} label="" variant="outlined" />
            <label>เดือน</label>
          </div>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice3' name="advice" value="" />
            <label htmlFor='advice3' className='font-medium'>ผลการตรวจมะเร็งปากมดลูก( Pap Smear ) อยู่ในเกณฑ์ปกติ ไม่พบเซลล์มะเร็งควรตรวจซ้ำในอีก 6 เดือน</label>
          </div>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice4' name="advice" value="" />
            <label htmlFor='advice4' className='font-medium'>ผลการตรวจมะเร็งปากมดลูก( Pap Smear ) อยู่ในเกณฑ์ปกติ ไม่พบเซลล์มะเร็งควรตรวจซ้ำในอีก 1 ปี</label>
          </div>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice5' name="advice" value="" />
            <label htmlFor='advice5' className='font-medium'>ผลการตรวจมะเร็งปากมดลูก( Thin prep ) อยู่ในเกณฑ์ปกติ ไม่พบเซลล์มะเร็งควรตรวจซ้ำในอีก 1 ปี</label>
          </div>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice6' name="advice" value="" />
            <label htmlFor='advice6' className='font-medium'>ผลการตรวจมะเร็งปากมดลูก( Thin prep ) อยู่ในเกณฑ์ปกติ ไม่พบเซลล์มะเร็งควรตรวจซ้ำในอีก 6 ปี</label>
          </div>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice7' name="advice" value="" />
            <label htmlFor='advice7' className='font-medium'>ผลการตรวจมะเร็งปากมดลูก( Thin prep ) อยู่ในเกณฑ์ปกติ ไม่พบเซลล์มะเร็งควรตรวจซ้ำในอีก 6-12 เดือน</label>
          </div>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" checked={isChecked(form?.Rec_Other)} onChange={(e) => (onChangeCheckbox('Rec_Other', { Rec_Other: e?.target.checked }))} className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice8' name="advice" value="" />
            <label htmlFor='advice8' className='font-medium'>อื่นๆ</label>
            <div className='flex items-center w-[50%] '>
              <TextareaAutosize value={form?.Other_Detail || ''} onChange={(e) => handleChange({ Other_Detail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
            </div>
            <div className='flex flex-col gap-4 '>
              <div className='flex items-center col-start-3 col-span-12 gap-4'>
                <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice9' name="advice" value="" />
                <label htmlFor='advice9' className='font-medium'>รอผลการตรวจมะเร็งปากมดลูก 4 สัปดาห์</label>
              </div>
              <div className='flex items-center col-start-3 col-span-12 gap-4'>
                <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice10' name="advice" value="" />
                <label htmlFor='advice10' className='font-medium'>ปฏิเสธการตรวจ</label>
              </div>
            </div>
          </div>
          <div className='flex items-center col-start-3 col-span-12 gap-4'>
            <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='advice11' name="advice" value="" />
            <label htmlFor='advice11' className='font-medium'>ผลการตรวจภายในแผนกสูติ-นรีเวชจะทำการแจ้งผลกับท่านโดยตรงภายใน 2 สัปดาห์ หลังการตรวจหรือท่านสามารถติดต่อได้ที่ โทร 038-320300 ต่อ 1298,1299</label>
          </div>
        </div>

        <div className='col-span-12 border-[#E2E2E2] border mt-4'></div>

        <div className='grid grid-cols-12  items-start   w-full gap-2 mt-4 p-2'>
          {/* foot */}
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 22/11/2565 6:43:28</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button onClick={() => onClear()} className='cursor-pointer w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='cursor-pointer flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
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
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div> */}
      </Collapse>
    </div>
  )
}

export default PapSmear