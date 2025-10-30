'use client'
import { Collapse, InputAdornment, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addEkg, addEst, addhAbi, addhEcho, getAbiById, getEchoId, getEkgById, getEstById, searchAbi, searchCategory, updateAbi, updateEcho, updateEkg, updateEst } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'
//import { name } from 'dayjs/locale/th'

function Heartwaveexamination({ module = 'patient-information', activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  const [options, setOptions] = useState({})
  const [switchStaus, setSwitchStaus] = useState(null)

  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  useEffect(() => {
    if (module === 'patient-information') {
      setSwitchStaus(activeTap?.ekg)
    } else if (module === 'docter-result') {
      setSwitchStaus(activeTap?.lab_and_xray)
    }
  }, [activeTap?.ekg, activeTap?.lab_and_xray, module])

  useEffect(() => {
    Loadoptions()
  }, [])

  const refresh = async () => {
    try {
      let _d = {}
      startLoading()
      const resEkg = await getEkgById(UID)
      if (resEkg?.message === 'success') {
        _d.Ekg = resEkg?.data || null
      } else {
        console.log('error', resEkg?.error)
      }

      const resEcho = await getEchoId(UID)
      if (resEcho?.message === 'success') {
        _d.Echo = resEcho?.data || null
      } else {
        console.log('error', resEcho?.error)
      }

      const resEst = await getEstById(UID)
      if (resEst?.message === 'success') {
        _d.Est = resEst?.data || null
      } else {
        console.log('error', resEst?.error)
      }
      const resAbi = await getAbiById(UID)
      if (resAbi?.message === 'success') {
        _d.Abi = resAbi?.data || null
      } else {
        console.log('error', resAbi?.error)
      }

      if (JSON.stringify(_d) === '{}' && module === 'patient-information') {
        setForm({})
        onActiveTap('ekg', false)
      } else {
        setForm(_d || {})
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
      const type = ['EKG', 'EST', 'ABI', 'Echo']

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
    onActiveTap('ekg', update.target.checked)
  }

  const handleChange = (name, update) => {
    if (update?.hasOwnProperty('Description')) {
      if (update?.Description) {
        if (name === 'Ekg') {
          update.EKGDetail = (form[name]?.EKGDetail || '') + (form[name]?.EKGDetail ? '\n' : '') + update.Description
        } else if (name === 'Est') {
          update.ESTDetail = (form[name]?.ESTDetail || '') + (form[name]?.ESTDetail ? '\n' : '') + update.Description
        } else if (name === 'Echo') {
          update.EchoDetail = (form[name]?.EchoDetail || '') + (form[name]?.EchoDetail ? '\n' : '') + update.Description
        } else if (name === 'Abi') {
          update.ABIDetail = (form[name]?.ABIDetail || '') + (form[name]?.ABIDetail ? '\n' : '') + update.Description
        }
      }
    }
    let newData = { ...form[name] }
    newData = { ...newData, ...update }
    setForm((p) => ({ ...p, ...{ [name]: newData } }))
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');

        setForm((p) => {
          return {
            ...p,
            Ekg: {
              ...p.Ekg,
              EKGID: null,
              EKGDetail: null,
              Image: null,
              Description: null
            },
            Est: {
              ...p.Est,
              ESTID: null,
              ESTDetail: null,
              Description: null,
            },
            Abi: {
              ...p.Abi,
              "ABIID": null,
              "ABIDetail": null,
              "Image": null,
              "Description": null,
            },
            Echo: {
              ...p.Echo,
              "EchoID": null,
              "EchoDetail": null,
              "Description": null,
            }
          }
        })
      }
    })
  }

  const onSave = () => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveDataEkg = {
          trPatientUID: form?.Ekg?.trPatientUID || null,
          EKGID: form?.Ekg?.EKGID || null,
          EKGDetail: form?.Ekg?.EKGDetail || null,
          Language: form?.Ekg?.Language || null,
          StatusFlag: form?.Ekg?.StatusFlag || null,
          CUser: form?.Ekg?.CUser || null,
          CWhen: form?.Ekg?.CWhen || null,
          MUser: form?.Ekg?.MUser || null,
          MWhen: form?.Ekg?.MWhen || null,
          Image: form?.Ekg?.Image || null,
          Code: form?.Ekg?.Code || null,
          Description: form?.Ekg?.Description || null,
        }

        const saveDataEst = {
          trPatientUID: form?.Est?.trPatientUID || null,
          ESTID: form?.Est?.ESTID || null,
          ESTDetail: form?.Est?.ESTDetail || null,
          Language: form?.Est?.Language || null,
          StatusFlag: form?.Est?.StatusFlag || null,
          CUser: form?.Est?.CUser || null,
          CWhen: form?.Est?.CWhen || null,
          MUser: form?.Est?.MUser || null,
          MWhen: form?.Est?.MWhen || null,
          Code: form?.Est?.Code || null,
          Description: form?.Est?.Description || null,
        }

        const saveDataAbi = {
          "UID": form?.Abi?.UID || null,
          "trPatientUID": form?.Abi?.trPatientUID || null,
          "ABIID": form?.Abi?.ABIID || null,
          "ABIDetail": form?.Abi?.ABIDetail || null,
          "Language": form?.Abi?.Language || null,
          "StatusFlag": form?.Abi?.StatusFlag || null,
          "CUser": form?.Abi?.CUser || null,
          "CWhen": form?.Abi?.CWhen || null,
          "MUser": form?.Abi?.MUser || null,
          "MWhen": form?.Abi?.MWhen || null,
          "Image": form?.Abi?.Image || null,
          "Code": form?.Abi?.Code || null,
          "Description": form?.Abi?.Description || null,
        }

        const saveDataEcho = {
          "UID": form?.Echo?.UID || null,
          "trPatientUID": form?.Echo?.trPatientUID || null,
          "EchoID": form?.Echo?.EchoID || null,
          "EchoDetail": form?.Echo?.EchoDetail || null,
          "Language": form?.Echo?.Language || null,
          "StatusFlag": form?.Echo?.StatusFlag || null,
          "CUser": form?.Echo?.CUser || null,
          "CWhen": form?.Echo?.CWhen || null,
          "MUser": form?.Echo?.MUser || null,
          "MWhen": form?.Echo?.MWhen || null,
          "Code": form?.Echo?.Code || null,
          "Description": form?.Echo?.Description || null,
        }

        console.log('saveDataEkg', saveDataEkg)
        console.log('saveDataEst', saveDataEst)

        try {
          startLoading()
          if (form?.Ekg) {
            if (form?.Ekg?.UID) {
              const resEkg = await updateEkg(UID, saveDataEkg)
              if (resEkg?.error) {
                console.log('updateEkg resEkg error', resEkg?.error)
              }
            } else if (form?.Ekg?.Code) {
              const resEkg = await addEkg({ ...saveDataEkg, trPatientUID: UID })
              if (resEkg?.error) {
                console.log('addEkg resEkg error', resEkg?.error)
              }
            }
          }
          if (form?.Est) {
            if (form?.Est?.UID) {
              const resEst = await updateEst(UID, saveDataEst)
              if (resEst?.error) {
                console.log('updateEst resEst error', resEst?.error)
              }
            } else if (form?.Est?.Code) {
              const resEst = await addEst({ ...saveDataEst, trPatientUID: UID })
              if (resEst?.error) {
                console.log('addEst resEst error', resEst?.error)
              }
            }
          }

          if (form?.Abi) {
            if (form?.Abi?.UID) {
              const resAbi = await updateAbi(UID, saveDataAbi)
              if (resAbi?.error) {
                console.log('updateAbi resAbi error', resAbi?.error)
              }
            } else if (form?.Abi?.Code) {
              const resAbi = await addhAbi({ ...saveDataAbi, trPatientUID: UID })
              if (resAbi?.error) {
                console.log('addAbi resAbi error', resAbi?.error)
              }
            }
          }

          if (form?.Echo) {
            if (form?.Echo?.UID) {
              const resEcho = await updateEcho(UID, saveDataEcho)
              if (resEcho?.error) {
                console.log('updateEcho resEcho error', resEcho?.error)
              }
            } else if (form?.Echo?.Code) {
              const resEcho = await addhEcho({ ...saveDataEcho, trPatientUID: UID })
              if (resEcho?.error) {
                console.log('addhEcho resEcho error', resEcho?.error)
              }
            }
          }
          succeedAlert()
          refresh()

        } catch (error) {
          console.error('An error occurred while onSave:', error)
        } finally {
          stopLoading()
        }
      }
    })

  }
  return (
    <div className={`w-full flex flex-col rounded-2xl   ${module === 'docter-result' ? 'bg-[#F3F3F3]' : 'bg-[#F8F8F8]'}  shadow-box p-5 my-4`}>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='ekg' className='font-semibold text-[#365382]'>การตรวจคลื่นไฟฟ้าหัวใจ (EKG)</label>
        <div>
          {module != 'docter-result' && <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />}
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={module === 'docter-result' ? true : switchStaus}>
        <div className='grid grid-cols-12  items-start   w-full gap-4 mt-4 p-2'>
          {/* EKG */}
          <div className='col-span-6 bg-[#EDF4FC] rounded-lg shadow-box flex flex-col gap-4 p-4'>
            <label className='font-light text-base col-span-12 text-[#365382]' >EKG</label>
            <div className=' grid grid-cols-12 lg:flex gap-4 items-center w-full '>
              <label className='col-span-4 whitespace-nowrap'>รหัส CodeEKG</label>
              <TextField size='small' className='text-white col-span-8  w-full   bg-[#FFFFFF]' value={form?.Ekg?.Code || ''} onChange={(e) => handleChange("Ekg", { Code: e.target.value })} label="" variant="outlined" />
              <button className='h-10 col-span-6  px-6  border rounded-lg bg-[#FFFFFF] hover:bg-[#e4e4e4] text-[#365382]' >DocView</button>
              <button className='h-10 col-span-6  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เลือก</button>
            </div>
            <div className='flex gap-4 flex-wrap items-center w-full'>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="EKG1" name="EKG" value="" />
                <label htmlFor='EKG1' className=''>Normal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="EKG2" name="EKG" value="" />
                <label htmlFor='EKG2' className=''>Abnormal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="EKG3" name="EKG" value="" />
                <label htmlFor='EKG3' className=''>Borderline</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="EKG4" name="EKG" value="" />
                <label htmlFor='EKG4' className=''>ไม่ระบุ</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="EKG5" name="EKG" value="" />
                <label htmlFor='EKG5' className=''>Not Exam</label>
              </div>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <Toolselect2 sm options={options?.EKG || []} value={form?.Ekg?.Description} onChange={(Description) => handleChange('Ekg', { Description })}></Toolselect2>
              {/* <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button> */}
            </div>
            <div className='flex gap-4 items-center w-full'>
              <TextareaAutosize value={form?.Ekg?.EKGDetail || ''} onChange={(e) => handleChange('Ekg', { EKGDetail: e?.target?.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
            </div>
            <div className='flex gap-4 items-center justify-center w-full'>
              <input type="checkbox" className='w-5 h-5 accent-[#365382]' name="checkingEKG" value="" />
              <label className='font-medium'>ออกรายงาน</label>
            </div>
          </div>

          {/* Vascular Screening (ABI) */}
          <div className='col-span-6 bg-[#EDF4FC] rounded-lg shadow-box flex flex-col gap-4 p-4'>
            <label className='font-light text-base col-span-12 text-[#365382]' >Vascular Screening (ABI)</label>
            <div className=' grid grid-cols-12 lg:flex gap-4 items-center w-full '>
              <label className='col-span-4 whitespace-nowrap'>รหัส CodeABI</label>
              <TextField value={form?.Abi?.Code || ''} onChange={(e) => handleChange("Abi", { Code: e.target.value })} size='small' className='text-white col-span-8  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
              <button className='h-10  col-span-12 px-6  border rounded-lg bg-[#FFFFFF] hover:bg-[#e4e4e4] text-[#365382]' >DocView</button>
            </div>
            <div className='flex gap-4 flex-wrap items-center w-full'>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ABI1" name="ABI" value="" />
                <label htmlFor='ABI1' className=''>Normal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ABI2" name="ABI" value="" />
                <label htmlFor='ABI2' className=''>Abnormal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ABI3" name="ABI" value="" />
                <label htmlFor='ABI3' className=''>ฟังผลกับแพทย์</label>
              </div>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <Toolselect2 sm options={options?.ABI || []} value={form?.Abi?.Description} onChange={(Description) => handleChange('Abi', { Description })}></Toolselect2>
              {/* <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button> */}
            </div>
            <div className='flex gap-4 items-center w-full'>
              <TextareaAutosize value={form?.Abi?.ABIDetail || ''} onChange={(e) => handleChange('Abi', { ABIDetail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
            </div>
            <div className='flex gap-4 items-center justify-center w-full'>
              <input type="checkbox" className='w-5 h-5 accent-[#365382]' name="checkingEKG" value="" />
              <label className='font-medium'>ออกรายงาน</label>
            </div>
          </div>

          {/* Exercise Stress Test */}
          <div className='col-span-6 bg-[#EDF4FC] rounded-lg shadow-box flex flex-col gap-4 p-4'>
            <label className='font-light text-base col-span-12 text-[#365382]' >Exercise Stress Test</label>
            <div className=' grid grid-cols-12 lg:flex gap-4 items-center w-full '>
              <label className='col-span-4 whitespace-nowrap'>รหัส CodeEST</label>
              <TextField value={form?.Est?.Code || ''} onChange={(e) => handleChange('Est', { Code: e?.target.value })} size='small' className='text-white  w-full col-span-8  bg-[#FFFFFF]' label="" variant="outlined" />
              <button className='h-10 col-span-12 px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เลือก</button>
            </div>
            <div className='flex gap-4 flex-wrap items-center w-full'>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ExerciseStressTest1" name="ExerciseStressTest" value="" />
                <label htmlFor='ExerciseStressTest1' className=''>Normal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ExerciseStressTest2" name="ExerciseStressTest" value="" />
                <label htmlFor='ExerciseStressTest2' className=''>Abnormal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ExerciseStressTest3" name="ExerciseStressTest" value="" />
                <label htmlFor='ExerciseStressTest3' className=''>Borderline</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ExerciseStressTest4" name="ExerciseStressTest" value="" />
                <label htmlFor='ExerciseStressTest4' className=''>ไม่ระบุ</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ExerciseStressTest5" name="ExerciseStressTest" value="" />
                <label htmlFor='ExerciseStressTest5' className=''>Not Exam</label>
              </div>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <Toolselect2 sm options={options?.EST || []} value={form?.Est?.Description} onChange={(Description) => handleChange('Est', { Description })}></Toolselect2>
              {/* <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button> */}
            </div>
            <div className='flex gap-4 items-center w-full'>
              <TextareaAutosize value={form?.Est?.ESTDetail || ''} onChange={(e) => handleChange('Est', { ESTDetail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
            </div>
            <div className='flex gap-4 items-center justify-center w-full'>
              <input type="checkbox" className='w-5 h-5 accent-[#365382]' name="checkingEKG" value="" />
              <label className='font-medium'>ออกรายงาน</label>
            </div>
          </div>

          {/* ECHOCARDIOGRAPHY */}
          <div className='col-span-6 bg-[#EDF4FC] rounded-lg shadow-box flex flex-col gap-4 p-4'>
            <label className='font-light text-base col-span-12 text-[#365382]' >ECHOCARDIOGRAPHY</label>
            <div className=' grid grid-cols-12 lg:flex gap-4 items-center w-full '>
              <label className='col-span-4 whitespace-nowrap'>รหัส CodeECHO</label>
              <TextField value={form?.Echo?.Code || ''} onChange={(e) => handleChange('Echo', { Code: e?.target?.value })} size='small' className='text-white col-span-8  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
              <button className='h-10 col-span-12 px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เลือก</button>
            </div>
            <div className='flex gap-4 flex-wrap items-center w-full'>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ECHOCARDIOGRAPHY1" name="ECHOCARDIOGRAPHY" value="" />
                <label htmlFor='ECHOCARDIOGRAPHY1' className=''>Normal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ECHOCARDIOGRAPHY2" name="ECHOCARDIOGRAPHY" value="" />
                <label htmlFor='ECHOCARDIOGRAPHY2' className=''>Abnormal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ECHOCARDIOGRAPHY3" name="ECHOCARDIOGRAPHY" value="" />
                <label htmlFor='ECHOCARDIOGRAPHY3' className=''>Borderline</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ECHOCARDIOGRAPHY4" name="ECHOCARDIOGRAPHY" value="" />
                <label htmlFor='ECHOCARDIOGRAPHY4' className=''>ไม่ระบุ</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="ECHOCARDIOGRAPHY5" name="ECHOCARDIOGRAPHY" value="" />
                <label htmlFor='ECHOCARDIOGRAPHY5' className=''>Not Exam</label>
              </div>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <Toolselect2 sm options={options?.Echo || []} value={form?.Echo?.Description} onChange={(Description) => handleChange('Echo', { Description })}></Toolselect2>
              {/* <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button> */}
            </div>
            <div className='flex gap-4 items-center w-full'>
              <TextareaAutosize value={form?.Echo?.EchoDetail || ''} onChange={(e) => handleChange('Echo', { EchoDetail: e?.target?.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
            </div>
            <div className='flex gap-4 items-center justify-center w-full'>
              <input type="checkbox" className='w-5 h-5 accent-[#365382]' name="checkingEKG" value="" />
              <label className='font-medium'>ออกรายงาน</label>
            </div>
          </div>

        </div>
        <div className='grid grid-cols-12  items-start   w-full gap-2 mt-4 p-2'>
          {/* foot */}
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 22/11/2565 6:43:28</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button onClick={() => onClear()} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
              </div>
            </button>
            <button onClick={() => onSave()} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
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

export default Heartwaveexamination