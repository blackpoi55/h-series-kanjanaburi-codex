'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
//import { MetaInitialAll } from '../Tool/var'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addPhysicalexam, getCallmessage, getPhysicalexamById, updatePhysicalexam, AddCallmessage } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'
import Tooldatepick from '../Tool/Tooldatepick'
import dayjs from 'dayjs'

function Conclusion({ activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  const [formDG, setFormDG] = useState({})
  const [formRC, setFormRC] = useState({})
  const [formFL, setFormFL] = useState({})
  const [list, setList] = useState([])
  const [switchStaus, setSwitchStaus] = useState(null)
  const [itemlist, setItemList] = useState({ diagnosis: [], recommendation: [], followup: [] })

  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  const refresh = async () => {
    let dataDG = {
      "code": "11"
    }
    let dataRC = {
      "code": "12"
    }
    let dataFL = {
      "code": "14"
    }
    try {
      startLoading()
      const res = await getPhysicalexamById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || {})
        if (res?.data?.UID === null) {
          onActiveTap('conclusion', false)
        }
      } else {
        console.log('error', res?.error)
        onActiveTap('conclusion', false)
      }

      //DG
      const resC = await getCallmessage(dataDG)
      if (resC?.message === 'success') {
        setFormDG(resC?.data || {})
        if (resC?.data === null) {
          onActiveTap('conclusion', false)
        }
      } else {
        console.log('error', res?.error)
        onActiveTap('conclusion', false)
      }
      //RC
      const resRC = await getCallmessage(dataRC)
      if (resRC?.message === 'success') {
        setFormRC(resRC?.data || {})
        if (resRC?.data === null) {
          onActiveTap('conclusion', false)
        }
      } else {
        console.log('error', res?.error)
        onActiveTap('conclusion', false)
      }
      //FL
      const resFL = await getCallmessage(dataFL)
      if (resFL?.message === 'success') {
        setFormFL(resFL?.data || {})
        if (resFL?.data === null) {
          onActiveTap('conclusion', false)
        }
      } else {
        console.log('error', res?.error)
        onActiveTap('conclusion', false)
      }

    } catch (err) {
      console.error('An error occurred while refreshing data:', err)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    setSwitchStaus(activeTap?.conclusion)
  }, [activeTap?.conclusion])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('conclusion', update.target.checked)
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const onClear = (key) => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        if (key === 'diagnosis') {
          setForm((p) => ({
            ...p, ...{
              diagnosis: null,
            }
          }))
        } else if (key === 'followup') {
          setForm((p) => ({
            ...p, ...{
              followup: null,
              followup_date: null,
            }
          }))
        } else if (key === 'recommendation') {
          setForm((p) => ({
            ...p, ...{
              recommendation: null,
              recommendationEn: null,
            }
          }))
        }
      }
    })
  }

  const onSave = (key) => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {}
        if (key === 'diagnosis') {
          saveData.diagnosis = form?.diagnosis || null
          saveData.trPatientUID = form?.trPatientUID || null
        } else if (key === 'followup') {
          saveData.followup = form?.followup || null
          saveData.trPatientUID = form?.trPatientUID || null
          saveData.followup_date = form?.followup_date || null
        } else if (key === 'recommendation') {
          saveData.recommendation = form?.recommendation || null
          saveData.trPatientUID = form?.trPatientUID || null
          saveData.recommendationEn = form?.recommendationEn || null
        }

        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const res = await updatePhysicalexam(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addPhysicalexam({ ...saveData, trPatientUID: UID })
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

  const onSelectItem = (key, item) => {
    setItemList((prevState) => {
      const currentItems = prevState[key] || []
      // ถ้า item มีอยู่แล้วใน currentItems ให้เอาออก
      if (currentItems.some((d) => d === item)) {
        const updatedItems = currentItems.filter((d) => d !== item)
        return { ...prevState, [key]: updatedItems }
      }
      // ถ้า item ยังไม่มีใน currentItems ให้เพิ่มเข้าไป
      else {
        const updatedItems = [...currentItems, item]
        return { ...prevState, [key]: updatedItems }
      }
    })
  }

  const ischeck = (key, item) => {
    return itemlist[key]?.some((d) => d === item) || false
  }

  const onAddItem = (name) => {
    if (itemlist[name].length > 0) {
      const update = itemlist[name].map((d) => { return `${d}` })
      handleChange({ [name]: update.toString()?.replace(/,/g, '\n') })
    } else {
      handleChange({ [name]: null })
    }

  }

  const onSavefaveriteDG = (name, Language) => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {}
        saveData.code = "11",
          saveData.Desc = name || null,
          saveData.msUserUID = 1613,
          saveData.Language = "TH"

        console.log('saveData', saveData)
        try {
          startLoading()
          const res = await AddCallmessage({ ...saveData })
          if (!res?.error) {
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
  const onSavefaveriteRC = (name, Language) => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {}
        saveData.code = "12",
          saveData.Desc = name || null,
          saveData.msUserUID = 1613,
          saveData.Language = "TH"

        console.log('saveData', saveData)
        try {
          startLoading()
          const res = await AddCallmessage({ ...saveData })
          if (!res?.error) {
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
  const onSavefaveriteFL = (name, Language) => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {}
        saveData.code = "14",
          saveData.Desc = name || null,
          saveData.msUserUID = 1613,
          saveData.Language = "TH"

        console.log('saveData', saveData)
        try {
          startLoading()
          const res = await AddCallmessage({ ...saveData })
          if (!res?.error) {
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

  return (
    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='conclusion' className='font-semibold text-[#365382]'>Conclusion</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className=' w-full  grid grid-cols-12 gap-4   p-4'>
          <Diagnosis onChange={(e) => handleChange(e)} form={form} formDG={formDG} ischeck={ischeck} onSelectItem={onSelectItem} onAddItem={onAddItem} onSavefaveriteDG={onSavefaveriteDG} onSave={onSave} onClear={onClear} />
          <Recommendation onChange={(e) => handleChange(e)} form={form} formRC={formRC} ischeck={ischeck} onSelectItem={onSelectItem} onAddItem={onAddItem} onSavefaveriteRC={onSavefaveriteRC} onSave={onSave} onClear={onClear} />
          <FollowUp onChange={(e) => handleChange(e)} form={form} formFL={formFL} ischeck={ischeck} onSelectItem={onSelectItem} onAddItem={onAddItem} onSavefaveriteFL={onSavefaveriteFL} onSave={onSave} onClear={onClear} />
        </div>
      </Collapse>
    </div>
  )
}

const Diagnosis = (props) => {
  const { form, formDG, onChange, ischeck, onSelectItem, onAddItem, onSavefaveriteDG, onSave, onClear } = props
  return (
    <div className='col-span-12 m-4 grid grid-cols-12 gap-4 bg-[#EDF4FC] shadow-box p-4 rounded-lg'>
      <div className='col-span-12  flex justify-between '>
        <label className='text-[#365382] font-semibold text-base' >Diagnosis</label>
        <div className=' flex gap-4 '>
          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart bg-white  w-[40px] h-[40px]   rounded-full flex justify-center items-center shadow-lg'>
            <img width={26} height={26} src="/icon/heart.svg" />
          </div>
          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart  w-[40px] h-[40px] bg-[#E54545]  rounded-full flex justify-center items-center shadow-lg'>
            <img width={26} height={26} src="/icon/trashcan.svg" />
          </div>
        </div>
      </div>
      {/* body */}
      <div className='col-span-12 lg:col-span-6 flex flex-col justify-start gap-4'>
        <div className='flex gap-4 w-full'>
          <TextareaAutosize value={form?.diagnosis || ''}
            onChange={(e) => onChange({ diagnosis: e?.target.value })}
            minRows={5} maxRows={5} className="w-full rounded-lg  p-2"
            aria-label=" " placeholder="" />
          <button onClick={() => onAddItem('diagnosis')}
            className='hidden lg:block  border max-h-10 min-h-10 min-w-[118px] px-4 rounded-lg  shadow-button-cardInformation bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]' >ADD</button>
        </div>
        <div className='flex gap-4 w-full'>
          <button className='whitespace-nowrap h-10 min-w-[90px] w-[142px] border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >บันทึก</button>
          <div className='w-full lg:w-[40%] flex '>
            <Toolselect2 sm options={[]} label={""} value={''} change={''} name={" "}></Toolselect2>
          </div>
          <button className='whitespace-nowrap h-10 min-w-[142px]  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >โหลดข้อมูลใหม่</button>
        </div>
      </div>

      <div className='col-span-12 lg:col-span-6 flex flex-col justify-start gap-4'>
        <div className='flex gap-4 w-full items-center'>
          <div className='flex gap-2 items-center '>
            <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Diagnosis1" name="Diagnosis" value="" />
            <label htmlFor='Diagnosis1' className=''>TH</label>
          </div>
          <div className='flex gap-2 items-center '>
            <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Diagnosis2" name="Diagnosis" value="" />
            <label htmlFor='Diagnosis2' className=''>ENG</label>
          </div>
          <div className='flex gap-4'>
            <TextareaAutosize value={form?.DG || ''}
              onChange={(e) => onChange({ DG: e?.target.value })}
              minRows={5} maxRows={5} className="w-full rounded-lg p-2" aria-label=" "
              placeholder="" />
            <button onClick={() => onSavefaveriteDG(form?.DG, 'TH')} className='hidden lg:block  border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg  shadow-button-cardInformation bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]' >Save faverite</button>
          </div>

        </div>

        <div className="flex flex-col w-full justify-start items-start gap-4">
          <button
            onClick={() => onAddItem('diagnosis')}
            className="lg:hidden block border max-h-10 min-h-10 min-w-[118px] px-4 rounded-lg shadow-box bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]"
          >
            ADD
          </button>
          {formDG.length > 0 && formDG?.map((d, index) => (
            <div key={index} className="flex gap-4 items-center justify-start w-full">
              <input
                checked={ischeck('diagnosis', d?.Desc)}
                onClick={() => onSelectItem('diagnosis', d?.Desc)}
                type="checkbox"
                className="w-5 h-5 min-w-5 min-h-5 accent-[#365382]"
                id={`checkingDiagnosis${index + 1}`}
                name="checkingDiagnosis"
              />
              <label
                htmlFor={`checkingDiagnosis${index + 1}`} className="font-medium">
                {d?.Desc}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
        <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
      </div>

      <div className='flex gap-4 col-span-12 justify-center items-center'>
        <button onClick={() => onClear('diagnosis')} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
          <div className='cursor-pointer flex gap-2 justify-center items-center'>
            <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
            <label className='cursor-pointer'>ล้าง</label>
          </div>
        </button>
        <button onClick={() => onSave('diagnosis')} className='cursor-pointer w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
          <div className='cursor-pointer flex gap-2 justify-center items-center'>
            <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
            <label className='cursor-pointer'>บันทึก</label>
          </div>
        </button>
      </div>
    </div>
  )
}

const Recommendation = (props) => {
  const { form, formRC, onChange, ischeck, onSelectItem, onAddItem, onSavefaveriteRC, onSave, onClear } = props

  return (
    <div className='col-span-12 m-4 grid grid-cols-12 gap-4 bg-[#EDF4FC] shadow-box p-4 rounded-lg'>
      <div className='col-span-12  flex justify-between '>
        <label className='text-[#365382] font-semibold text-base' >Recommendation</label>
        <div className=' flex gap-4 '>
          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart bg-white  w-[40px] h-[40px]   rounded-full flex justify-center items-center shadow-lg'>
            <img width={26} height={26} src="/icon/heart.svg" />
          </div>
          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart  w-[40px] h-[40px] bg-[#E54545]  rounded-full flex justify-center items-center shadow-lg'>
            <img width={26} height={26} src="/icon/trashcan.svg" />
          </div>
        </div>
      </div>
      {/* body */}
      <div className='col-span-12 lg:col-span-6 flex flex-col justify-start gap-4'>
        <div className='flex gap-4 w-full'>
          <TextareaAutosize value={form?.recommendation || ''} onChange={(e) => onChange({ recommendation: e?.target.value })} minRows={6} maxRows={6} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
          <button onClick={() => onAddItem('recommendation')} className='hidden lg:block border max-h-10 min-h-10 min-w-[118px] px-4 rounded-lg  shadow-button-cardInformation bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]' >ADD</button>
        </div>
        <div className='flex gap-4 w-full'>
          <button className='whitespace-nowrap h-10 min-w-[90px] w-[142px]  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >บันทึก</button>
          <div className='w-full flex '>
            <Toolselect2 sm options={[]} label={""} value={''} change={''} name={" "}></Toolselect2>
          </div>
          <button className='whitespace-nowrap h-10 min-w-[142px]  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >โหลดข้อมูลใหม่</button>
        </div>
      </div>

      <div className='col-span-12 lg:col-span-6 flex flex-col justify-start gap-4'>
        <div className='flex gap-4 w-full items-center'>
          <div className='flex gap-2 items-center '>
            <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Recommendation1" name="Recommendation" value="" />
            <label htmlFor='Recommendation1' className=''>TH</label>
          </div>
          <div className='flex gap-2 items-center '>
            <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Recommendation2" name="Recommendation" value="" />
            <label htmlFor='Recommendation2' className=''>ENG</label>
          </div>
          {/* <div className='flex gap-2 items-center '>
            <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Recommendation3" name="Recommendation" value="" />
            <label htmlFor='Recommendation3' className=''>JP</label>
          </div> */}
          <div className='flex gap-4'>
            <TextareaAutosize value={form?.RC || ''}
              onChange={(e) => onChange({ RC: e?.target.value })}
              minRows={5} maxRows={5} className="w-full rounded-lg p-2" aria-label=" "
              placeholder="" />
            <button onClick={() => onSavefaveriteRC(form?.RC, 'TH')} className='hidden lg:block  border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg  shadow-button-cardInformation bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]' >Save faverite</button>
          </div>
        </div>

        <div className="flex flex-col w-full justify-start items-start gap-4">
          <button
            onClick={() => onAddItem('recommendation')}
            className="lg:hidden block border max-h-10 min-h-10 min-w-[118px] px-4 rounded-lg shadow-box bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]"
          >
            ADD
          </button>
          {formRC.length > 0 && formRC?.map((d, index) => (
            <div key={index} className="flex gap-4 items-center justify-start w-full">
              <input
                checked={ischeck('recommendation', d?.Desc)}
                onClick={() => onSelectItem('recommendation', d?.Desc)}
                type="checkbox"
                className="w-5 h-5 min-w-5 min-h-5 accent-[#365382]"
                id={`checkingRecommendation${index + 1}`}
                name="checkingRecommendation"
              />
              <label
                htmlFor={`checkingRecommendation${index + 1}`} className="font-medium">
                {d?.Desc}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
        <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
      </div>

      <div className='flex gap-4 col-span-12 justify-center items-center'>
        <button onClick={() => onClear('recommendation')} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
          <div className='cursor-pointer flex gap-2 justify-center items-center'>
            <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
            <label className='cursor-pointer'>ล้าง</label>
          </div>
        </button>
        <button onClick={() => onSave('recommendation')} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
          <div className='cursor-pointer flex gap-2 justify-center items-center'>
            <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
            <label className='cursor-pointer'>บันทึก</label>
          </div>
        </button>
      </div>
    </div>
  )
}

const FollowUp = (props) => {
  const { form, formFL, onChange, ischeck, onSelectItem, onAddItem, onSavefaveriteFL, onSave, onClear } = props
  console.log('formFL', formFL)

  const onDateFollowup = (event) => {
    let datte_f = dayjs().format()

    const periodMapping = {
      '1 month': { unit: 'month', value: 1 },
      '3 month': { unit: 'month', value: 3 },
      '6 month': { unit: 'month', value: 6 },
      '1 year': { unit: 'year', value: 1 }
    }

    const period = periodMapping[event]
    if (period) {
      datte_f = dayjs(datte_f).add(period.value, period.unit).format('YYYY/MM/DD')
      onChange({ followup_date: datte_f })
    }
  }


  return (
    <div className='col-span-12 m-4 grid grid-cols-12 gap-4 bg-[#EDF4FC] shadow-box p-4 rounded-lg'>
      <div className='col-span-12  flex justify-between '>
        <label className='text-[#365382] font-semibold text-base' >Follow Up</label>
        <div className=' flex gap-4 '>
          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart bg-white  w-[40px] h-[40px]   rounded-full flex justify-center items-center shadow-lg'>
            <img width={26} height={26} src="/icon/heart.svg" />
          </div>
          <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart  w-[40px] h-[40px] bg-[#E54545]  rounded-full flex justify-center items-center shadow-lg'>
            <img width={26} height={26} src="/icon/trashcan.svg" />
          </div>
        </div>
      </div>
      {/* body */}
      <div className='col-span-12 lg:col-span-6 flex flex-col justify-start gap-4'>
        <div className='flex gap-4 w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <TextareaAutosize value={form?.followup || ''} onChange={(e) => onChange({ followup: e?.target.value })} minRows={5} maxRows={5} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
            <div className='w-full flex  justify-center'>
              <div className=' grid  grid-cols-2 gap-4 whitespace-nowrap'>
                <div className='flex gap-4 items-center justify-start col-span-1'>
                  <input onChange={(e) => onDateFollowup('1 month')} type="radio" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='checkingFollowUp1' name="checkingFollowUp" value="" />
                  <label htmlFor='checkingFollowUp1' className='font-medium'>นัด 1 เดือน</label>
                </div>
                <div className='flex gap-4 items-center justify-start  col-span-1'>
                  <input onChange={(e) => onDateFollowup('3 month')} type="radio" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='checkingFollowUp2' name="checkingFollowUp" value="" />
                  <label htmlFor='checkingFollowUp2' className='font-medium'>นัด 3 เดือน</label>
                </div>
                <div className='flex gap-4 items-center justify-start col-span-1'>
                  <input onChange={(e) => onDateFollowup('6 month')} type="radio" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='checkingFollowUp3' name="checkingFollowUp" value="" />
                  <label htmlFor='checkingFollowUp3' className='font-medium'>นัด 6 เดือน</label>
                </div>
                <div className='flex gap-4 items-center justify-start  col-span-1'>
                  <input onChange={(e) => onDateFollowup('1 year')} type="radio" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='checkingFollowUp4' name="checkingFollowUp" value="" />
                  <label htmlFor='checkingFollowUp4' className='font-medium'>อีก 1 ปี</label>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => onAddItem('followup')} className=' hidden lg:block  border max-h-10 min-h-10 min-w-[118px] px-4 rounded-lg  shadow-button-cardInformation bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]' >ADD</button>
        </div>
        <div className='flex gap-4 w-[100%] justify-center'>

        </div>
        <div className='flex gap-4 w-full items-center'>
          <label className='whitespace-nowrap' >วันที่นัด</label>
          <div className='w-full lg:w-[40%] flex relative'>
            <Tooldatepick format={'dddd MMMM DD/MM/YYYY'} sm value={form?.followup_date || null} onChange={(followup_date) => onChange({ followup_date })} ></Tooldatepick>
            {/* <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="" variant="outlined" /> */}
          </div>
          <button className='h-10 w-[142px] border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >ยกเลิก</button>
        </div>
      </div>

      <div className='col-span-12 lg:col-span-6 flex flex-col justify-start gap-4'>
        <div className='flex gap-4 w-full items-center'>
          <div className='flex gap-2 items-center '>
            <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="FollowUp1" name="FollowUp" value="" />
            <label htmlFor='FollowUp1' className=''>TH</label>
          </div>
          <div className='flex gap-2 items-center '>
            <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="FollowUp2" name="FollowUp" value="" />
            <label htmlFor='FollowUp2' className=''>ENG</label>
          </div>
          {/* <div className='flex gap-2 items-center '>
            <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="FollowUp3" name="FollowUp" value="" />
            <label htmlFor='FollowUp3' className=''>JP</label>
          </div> */}
          <div className='flex gap-4'>
            <TextareaAutosize value={form?.FL || ''}
              onChange={(e) => onChange({ FL: e?.target.value })}
              minRows={5} maxRows={5} className="w-full rounded-lg p-2" aria-label=" "
              placeholder="" />
            <button onClick={() => onSavefaveriteFL(form?.FL, 'TH')} className='hidden lg:block  border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg  shadow-button-cardInformation bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]' >Save faverite</button>
          </div>
        </div>

        <div className="flex flex-col w-full justify-start items-start gap-4">
          <button
            onClick={() => onAddItem('followup')}
            className="lg:hidden block border max-h-10 min-h-10 min-w-[118px] px-4 rounded-lg shadow-box bg-[#FFFFFF] text-[#365382] hover:bg-[#e4e4e4] hover:text-[#365382]"
          >
            ADD
          </button>
          {formFL.length > 0 && formFL?.map((d, index) => (
            <div key={index} className="flex gap-4 items-center justify-start w-full">
              <input
                checked={ischeck('followup', d?.Desc)}
                onClick={() => onSelectItem('followup', d?.Desc)}
                type="checkbox"
                className="w-5 h-5 min-w-5 min-h-5 accent-[#365382]"
                id={`checkingFollowup${index + 1}`}
                name="checkingFollowup"
              />
              <label
                htmlFor={`checkingFollowup${index + 1}`} className="font-medium">
                {d?.Desc}
              </label>
            </div>
          ))}
        </div>
      </div >

      <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
        <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
      </div>

      <div className='flex gap-4 col-span-12 justify-center items-center'>
        <button onClick={() => onClear('followup')} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
          <div className='flex gap-2 justify-center items-center'>
            <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
            <label>ล้าง</label>
          </div>
        </button>
        <button onClick={() => onSave('followup')} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
          <div className='cursor-pointer flex gap-2 justify-center items-center'>
            <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
            <label className='cursor-pointer'>บันทึก</label>
          </div>
        </button>
      </div>
    </div >
  )
}

export default Conclusion