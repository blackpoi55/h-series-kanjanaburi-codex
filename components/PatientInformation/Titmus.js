'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addTitmus, getTitmusById, searchCategory, updateTitmus } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function Titmus({ module = 'patient-information', activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [switchStaus, setSwitchStaus] = useState(null)
  const [form, setForm] = useState({})
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
      setSwitchStaus(activeTap?.titmus)
    } else if (module === 'docter-result') {
      setSwitchStaus(activeTap?.lab_and_xray)
    }
  }, [activeTap?.titmus, activeTap?.lab_and_xray, module])

  const refresh = async () => {
    try {
      startLoading()
      const res = await getTitmusById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || {})
        if (res?.data === null && module === 'patient-information') {
          onActiveTap('titmus', false)
        }
      } else {
        console.log('error', res?.error)
        if (module === 'patient-information') {
          onActiveTap('titmus', false)
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

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('titmus', update.target.checked)
  }

  const handleChange = (update) => {
    if (update.hasOwnProperty('_VADetail')) {
      if (update?._VADetail) {
        update.VADetail = (form?.VADetail || '') + (form?.VADetail ? '\n' : '') + update?._VADetail
      }
    } else if (update.hasOwnProperty('_TitmusJaeger')) {
      if (update?._TitmusJaeger) {
        update.jaeger_detail = (form?.jaeger_detail || '') + (form?.jaeger_detail ? '\n' : '') + update?._TitmusJaeger
      }
    } else if (update.hasOwnProperty('_ColorAbDetail')) {
      if (update?._ColorAbDetail) {
        update.ColorAbDetail = (form?.ColorAbDetail || '') + (form?.ColorAbDetail ? '\n' : '') + update?._ColorAbDetail
      }
    }


    //ตรวจตาบอดสี (Ishihara Test)
    if (update.Color) {
      form.ColorBlindDetail = ''
    }
    setForm({ ...form, ...update })
  }

  const onClear = (key) => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        const dataClear = {}
        if (key === 'Visual Acuity') {
          dataClear.VADetail = null
          dataClear.VARt = null
          dataClear.VALt = null
          dataClear.VANLDetail = null
          dataClear.VANRDetail = null
        } else if (key === 'Pinhole') {
          dataClear.pinhole_r = null
          dataClear.pinhole_l = null
          dataClear.pinhole_all = null
        } else if (key === 'Near Chart') {
          dataClear.all_jaeger = null
          dataClear.gc_jaeger = null
          dataClear.jaeger_detail = null
          dataClear.left_jaeger = null
          dataClear.right_jaeger = null
        } else if (key === 'Auto refract') {
          dataClear.AR_RightEye_SPH = null
          dataClear.AR_RightEye_CYL = null
          dataClear.AR_RightEye_Axis = null
          dataClear.AR_LeftEye_SPH = null
          dataClear.AR_LeftEye_CYL = null
          dataClear.AR_LeftEye_Axis = null
          dataClear.AutoRefractDetail = null
        } else if (key === 'Tonometry') {
          dataClear.IOP_Detail = null
          dataClear.IOP_Left_Eye = null
          dataClear.IOP_Right_Eye = null
        } else if (key === 'Ishihara Test') {
          dataClear.ColorBlindDetail = null
          dataClear.Color = null
          dataClear.ColorAbDetail = null
        }
        setForm((p) => ({ ...p, ...dataClear }))

      }
    })
  }

  const onSave = (key) => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')
        let saveData = null
        if (key === 'All') {
          saveData = {
            UID: form?.UID || null,
            trPatientUID: form?.trPatientUID || null,
            Cubic: form?.Cubic || null,
            GC: form?.GC || null,
            VARt: form?.VARt || null,
            VALt: form?.VALt || null,
            Color: form?.Color || null,
            StereoDepth: form?.StereoDepth || null,
            Vertical: form?.Vertical || null,
            Horizontal: form?.Horizontal || null,
            VFRt: form?.VFRt || null,
            VFLt: form?.VFLt || null,
            VANRt: form?.VANRt || null,
            VANLt: form?.VANLt || null,
            CubicNear: form?.CubicNear || null,
            EyeProb: form?.EyeProb || null,
            EyeProbDetail: form?.EyeProbDetail || null,
            VisionWOGDetail: form?.VisionWOGDetail || null,
            GCDetail: form?.GCDetail || null,
            ColorBlindDetail: form?.ColorBlindDetail || null,
            StereoDepthDetail: form?.StereoDepthDetail || null,
            VerticalDetail: form?.VerticalDetail || null,
            HorizontalDetail: form?.HorizontalDetail || null,
            RHVFDetail: form?.RHVFDetail || null,
            LHVFDetail: form?.LHVFDetail || null,
            VADetail: form?.VADetail || null,
            VANRDetail: form?.VANRDetail || null,
            VANLDetail: form?.VANLDetail || null,
            Language: form?.Language || null,
            StatusFlag: form?.StatusFlag || null,
            CUser: form?.CUser || null,
            CWhen: form?.CWhen || null,
            MUser: form?.MUser || null,
            MWhen: form?.MWhen || null,
            IOP_Right_Eye: form?.IOP_Right_Eye || null,
            IOP_Left_Eye: form?.IOP_Left_Eye || null,
            IOP_Detail: form?.IOP_Detail || null,
            AR_RightEye_SPH: form?.AR_RightEye_SPH || null,
            AR_RightEye_CYL: form?.AR_RightEye_CYL || null,
            AR_LeftEye_SPH: form?.AR_LeftEye_SPH || null,
            AR_LeftEye_CYL: form?.AR_LeftEye_CYL || null,
            AutoRefractDetail: form?.AutoRefractDetail || null,
            TitmusDetail: form?.TitmusDetail || null,
            AR_RightEye_Axis: form?.AR_RightEye_Axis || null,
            AR_LeftEye_Axis: form?.AR_LeftEye_Axis || null,
            CHKTitmus: form?.CHKTitmus || null,
            SLRnormal: form?.SLRnormal || null,
            SLLnormal: form?.SLLnormal || null,
            SLnormalDetail: form?.SLnormalDetail || null,
            Rcataract: form?.Rcataract || null,
            Lcataract: form?.Lcataract || null,
            Rpterygium: form?.Rpterygium || null,
            Lpterygium: form?.Lpterygium || null,
            Rwindposthumously: form?.Rwindposthumously || null,
            Lwindposthumously: form?.Lwindposthumously || null,
            RLimestoneeyelids: form?.RLimestoneeyelids || null,
            LLimestoneeyelids: form?.LLimestoneeyelids || null,
            RDryeye: form?.RDryeye || null,
            LDryeye: form?.LDryeye || null,
            RConjunctivitis: form?.RConjunctivitis || null,
            LConjunctivitis: form?.LConjunctivitis || null,
            SLDetail: form?.SLDetail || null,
            RVisuallyimpaired: form?.RVisuallyimpaired || null,
            LVisuallyimpaired: form?.LVisuallyimpaired || null,
            VisuallyimpairedDetail: form?.VisuallyimpairedDetail || null,
            SLRother: form?.SLRother || null,
            SLLother: form?.SLLother || null,
            SLotherDetail: form?.SLotherDetail || null,
            ColorAbDetail: form?.ColorAbDetail || null,
            pinhole_r: form?.pinhole_r || null,
            pinhole_l: form?.pinhole_l || null,
            pinhole_all: form?.pinhole_all || null,
            all_jaeger: form?.all_jaeger || null,
            gc_jaeger: form?.gc_jaeger || null,
            jaeger_detail: form?.jaeger_detail || null,
            left_jaeger: form?.left_jaeger || null,
            right_jaeger: form?.right_jaeger || null,
          }
        } else if (key === 'Visual Acuity') {
          saveData = {
            VADetail: form?.VADetail || null,
            VARt: form?.VARt || null,
            VALt: form?.VALt || null,
            VANLDetail: form?.VANLDetail || null,
            VANRDetail: form?.VANRDetail || null,
          }
        } else if (key === 'Pinhole') {
          saveData = {
            pinhole_r: form?.pinhole_r || null,
            pinhole_l: form?.pinhole_l || null,
            pinhole_all: form?.pinhole_all || null,
          }
        } else if (key === 'Near Chart') {
          saveData = {
            all_jaeger: form?.all_jaeger || null,
            gc_jaeger: form?.gc_jaeger || null,
            jaeger_detail: form?.jaeger_detail || null,
            left_jaeger: form?.left_jaeger || null,
            right_jaeger: form?.right_jaeger || null,
          }
        } else if (key === 'Auto refract') {
          saveData = {
            AR_RightEye_SPH: form?.AR_RightEye_SPH || null,
            AR_RightEye_CYL: form?.AR_RightEye_CYL || null,
            AR_RightEye_Axis: form?.AR_RightEye_Axis || null,
            AR_LeftEye_SPH: form?.AR_LeftEye_SPH || null,
            AR_LeftEye_CYL: form?.AR_LeftEye_CYL || null,
            AR_LeftEye_Axis: form?.AR_LeftEye_Axis || null,
            AutoRefractDetail: form?.AutoRefractDetail || null,
            CHKTitmus: form?.CHKTitmus || null,
          }
        } else if (key === 'Tonometry') {
          saveData = {
            IOP_Detail: form?.IOP_Detail || null,
            IOP_Left_Eye: form?.IOP_Left_Eye || null,
            IOP_Right_Eye: form?.IOP_Right_Eye || null,
          }
        } else if (key === 'Ishihara Test') {
          saveData = {
            Color: form?.Color || null,
            ColorBlindDetail: form?.ColorBlindDetail || null,
            ColorAbDetail: form?.ColorAbDetail || null,
          }
        }
        try {
          startLoading()

          if (form?.UID) {
            const res = await updateTitmus(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addTitmus({ ...saveData, trPatientUID: UID })
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

  const onChangeCheckbox = (name, update) => {
    update[name] = update[name] ? 'Yes' : 'No'
    setForm({ ...form, ...update })
  }
  const isChecked = (item) => {
    return item === 'Yes'
  }

  const onChangeCheckboxAutorefract = (name, update) => {
    update[name] = update[name] ? 'ฟังผลกับจักษุแพทย์ที่ห้องตรวจ' : ''
    setForm({ ...form, ...update })
  }
  const isCheckedAutorefract = (item) => {
    return item === 'ฟังผลกับจักษุแพทย์ที่ห้องตรวจ'
  }



  console.log('form', form)

  return (
    <div className={`w-full flex flex-col rounded-2xl  ${module === 'docter-result' ? 'bg-[#EDF4FC]' : 'bg-[#F8F8F8]'}  shadow-box p-5 my-4`}>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='titmus' className='font-semibold text-[#365382]'>Titmus</label>
        <div>
          {module != 'docter-result' && <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />}
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={module === 'docter-result' ? true : switchStaus}>
        {/* Visual Acuity */}
        <div className='grid grid-cols-12  items-start bg-[#F3F3F3] rounded-lg shadow-box w-full py-4 gap-2 mt-4 p-2'>
          <div className='flex justify-between col-span-12'>
            <label className='text-[#4E4E4E]'>Visual Acuity</label>
            <div className='flex gap-2 '>
              <div onClick={() => onClear('Visual Acuity')} className='bg-[#E54545] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              </div>
              <div onClick={() => onSave('Visual Acuity')} className='bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              </div>
            </div>
          </div>

          <div className='col-span-12 flex justify-center items-start m-4'>
            <div className='w-[90%] grid grid-cols-12 gap-4 '>
              <div className='flex flex-col gap-4 col-span-6 lg:col-span-2'>
                <div className='flex gap-2 items-center'>
                  <input checked={form.VANLDetail === 'ไม่ได้ตรวจ'} onChange={() => handleChange({ VANLDetail: "ไม่ได้ตรวจ" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visualacuity1" name="visualacuity" value="" />
                  <label htmlFor='visualacuity1' className=''>ไม่ได้ตรวจ</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.VANLDetail === 'ตาเปล่า'} onChange={() => handleChange({ VANLDetail: "ตาเปล่า" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visualacuity2" name="visualacuity" value="" />
                  <label htmlFor='visualacuity2' className=''>ตาเปล่า</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.VANLDetail === 'ใส่แว่น'} onChange={() => handleChange({ VANLDetail: "ใส่แว่น" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visualacuity3" name="visualacuity" value="" />
                  <label htmlFor='visualacuity3' className=''>ใส่แว่น</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.VANLDetail === 'ใส่คอนแทคเลนส์'} onChange={() => handleChange({ VANLDetail: "ใส่คอนแทคเลนส์" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visualacuity4" name="visualacuity" value="" />
                  <label htmlFor='visualacuity4' className=''>ใส่คอนแทคเลนส์</label>
                </div>
              </div>

              <div className='flex flex-col gap-4 col-span-6 lg:col-span-4 whitespace-nowrap'>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาขวา 20/</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.VARt || ''} onChange={(VARt) => handleChange({ VARt: VARt.target.value })} label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาซ้าย 20/</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.VALt || ''} onChange={(VALt) => handleChange({ VALt: VALt.target.value })} label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาทั้งสองข้าง 20/</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.VANRDetail || ''} onChange={(VANRDetail) => handleChange({ VANRDetail: VANRDetail.target.value })} label="" variant="outlined" />
                </div>
              </div>

              <div className='flex flex-col gap-4 col-span-6 lg:col-span-3 whitespace-nowrap'>
                <div className='flex gap-2 items-center'>
                  <div className='w-full'>
                    <Toolselect2 sm label={'คำแนะนำ'} options={options?.Titmus || []} value={form?._VADetail || ''} onChange={(_VADetail) => handleChange({ _VADetail })} />
                  </div>
                </div>
                <div className='flex gap-2 items-center justify-end'>
                  <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปลผล</button>
                  <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >ADD</button>
                </div>
              </div>
              <div className='flex flex-col gap-4 col-span-6 lg:col-span-3 whitespace-nowrap'>
                <TextareaAutosize value={form?.VADetail || ''} onChange={(e) => handleChange({ VADetail: e?.target.value })} minRows={4} maxRows={4} className="w-full rounded-lg h-f p-2" aria-label="" placeholder="" />
              </div>
            </div>
          </div>
        </div>

        {/* มองลอดรูเข็ม (Pinhole) */}
        <div className='grid grid-cols-12  items-start bg-[#F3F3F3] rounded-lg shadow-box w-full py-4 gap-2 mt-4 p-2'>
          <div className='flex justify-between col-span-12'>
            <label className='text-[#4E4E4E]'>มองลอดรูเข็ม (Pinhole)</label>
            <div className='flex gap-2 '>
              <div onClick={() => onClear('Pinhole')} className='cursor-pointer bg-[#E54545] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className='cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              </div>
              <div onClick={() => onSave('Pinhole')} className='cursor-pointer bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className='cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              </div>
            </div>
          </div>

          <div className='col-span-12 flex justify-center items-start m-4'>
            <div className='w-[90%] grid grid-cols-12 gap-4 '>
              <div className='flex   gap-4 col-span-12 justify-center whitespace-nowrap'>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาขวา 20/</label>
                  <TextField size='small' value={form?.pinhole_r || ''} onChange={(pinhole_r) => handleChange({ pinhole_r: pinhole_r.target.value })} className='text-white w-[100%] bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาซ้าย 20/</label>
                  <TextField size='small' value={form?.pinhole_l || ''} onChange={(pinhole_l) => handleChange({ pinhole_l: pinhole_l.target.value })} className='text-white w-[100%] bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาทั้งสองข้าง 20/</label>
                  <TextField size='small' value={form?.pinhole_all || ''} onChange={(pinhole_all) => handleChange({ pinhole_all: pinhole_all.target.value })} className='text-white w-[100%] bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ตรวจตา (Near Chart) */}
        <div className='grid grid-cols-12  items-start bg-[#F3F3F3] rounded-lg shadow-box w-full py-4 gap-2 mt-4 p-2'>
          <div className='flex justify-between col-span-12'>
            <label className='text-[#4E4E4E]'>ตรวจตา (Near Chart)</label>
            <div className='flex gap-2 '>
              <div onClick={() => onClear('Near Chart')} className='cursor-pointer bg-[#E54545] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              </div>
              <div onClick={() => onSave('Near Chart')} className='cursor-pointer bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              </div>
            </div>
          </div>

          <div className='col-span-12 flex justify-center items-start m-4'>
            <div className='w-[90%] grid grid-cols-12 gap-4 '>
              <div className='flex flex-col gap-4 col-span-6 lg:col-span-2'>
                <div className='flex gap-2 items-center'>
                  <input checked={form.gc_jaeger === 'ไม่ได้ตรวจ'} onChange={() => handleChange({ gc_jaeger: "ไม่ได้ตรวจ" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visualacuity1" name="visualacuity1" value="" />
                  <label className=''>ไม่ได้ตรวจ</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.gc_jaeger === 'ตาเปล่า'} onChange={() => handleChange({ gc_jaeger: "ตาเปล่า" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visualacuity1" name="visualacuity1" value="" />
                  <label className=''>ตาเปล่า</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.gc_jaeger === 'ใส่แว่น'} onChange={() => handleChange({ gc_jaeger: "ใส่แว่น" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visualacuity1" name="visualacuity1" value="" />
                  <label className=''>ใส่แว่น</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.gc_jaeger === 'ใส่คอนแทคเลนส์'} onChange={() => handleChange({ gc_jaeger: "ใส่คอนแทคเลนส์" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="visualacuity1" name="visualacuity1" value="" />
                  <label className=''>ใส่คอนแทคเลนส์</label>
                </div>
              </div>

              <div className='flex flex-col gap-4 col-span-6 lg:col-span-4 whitespace-nowrap'>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาขวา 20/</label>
                  <TextField size='small' value={form?.right_jaeger || ''} onChange={(right_jaeger) => handleChange({ right_jaeger: right_jaeger.target.value })} className='text-white w-[100%] bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาซ้าย 20/</label>
                  <TextField size='small' value={form?.left_jaeger || ''} onChange={(left_jaeger) => handleChange({ left_jaeger: left_jaeger.target.value })} className='text-white w-[100%] bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>ตาทั้งสองข้าง 20/</label>
                  <TextField size='small' value={form?.all_jaeger || ''} onChange={(all_jaeger) => handleChange({ all_jaeger: all_jaeger.target.value })} className='text-white w-[100%] bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>

              <div className='flex flex-col gap-4 col-span-6 lg:col-span-3 whitespace-nowrap'>
                <div className='flex gap-2 items-center'>
                  <div className='w-full'>
                    <Toolselect2 sm label={''} options={options?.TitmusJaeger || []} value={form?._TitmusJaeger} onChange={(_TitmusJaeger) => handleChange({ _TitmusJaeger })} />
                  </div>
                </div>
                {/* <div className='flex gap-2 items-center justify-end'>
                  <button className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >ADD</button>
                </div> */}
              </div>

              <div className='flex flex-col gap-4 col-span-6 lg:col-span-3 whitespace-nowrap'>
                <TextareaAutosize value={form?.jaeger_detail || ''} onChange={(e) => handleChange({ jaeger_detail: e?.target.value })} minRows={4} maxRows={4} className="w-full rounded-lg h-f p-2" aria-label="" placeholder="" />
              </div>
            </div>
          </div>
        </div>

        {/* Auto refract */}
        <div className='grid grid-cols-12  items-start bg-[#F3F3F3] rounded-lg shadow-box w-full py-4 gap-2 mt-4 p-2'>
          <div className='flex justify-between col-span-12'>
            <label className='text-[#4E4E4E]'>Auto refract</label>
            <div className='flex gap-2 '>
              <div onClick={() => onClear('Auto refract')} className='cursor-pointer bg-[#E54545] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              </div>
              <div onClick={() => onSave('Auto refract')} className='cursor-pointer bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              </div>
            </div>
          </div>

          <div className='col-span-12 flex justify-center items-start m-4'>
            <div className='w-[90%] grid grid-cols-12 gap-4 '>
              <div className='flex flex-col items-start  gap-4 col-span-3 justify-around whitespace-nowrap'>
                <div className='flex gap-2 items-center justify-start'>
                  <label className=''>ตาขวา (Right Eye):</label>
                </div>
                <div className='flex gap-2 items-center justify-start'>
                  <label className=''>ตาซ้าย (Left Eye):</label>
                </div>
              </div>

              <div className='flex flex-col   gap-4 col-span-3 justify-center whitespace-nowrap'>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>SPH:</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.AR_RightEye_SPH || ''} onChange={(e) => handleChange({ AR_RightEye_SPH: e?.target.value })} label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>SPH:</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.AR_RightEye_CYL || ''} onChange={(e) => handleChange({ AR_RightEye_CYL: e?.target.value })} label="" variant="outlined" />
                </div>
              </div>

              <div className='flex  flex-col  gap-4 col-span-3 justify-center whitespace-nowrap'>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>CYL:</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.AR_RightEye_Axis || ''} onChange={(e) => handleChange({ AR_RightEye_Axis: e?.target.value })} label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>CYL:</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.AR_LeftEye_SPH || ''} onChange={(e) => handleChange({ AR_LeftEye_SPH: e?.target.value })} label="" variant="outlined" />
                </div>
              </div>

              <div className='flex flex-col   gap-4 col-span-3 justify-center whitespace-nowrap'>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>Axis:</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.AR_LeftEye_CYL || ''} onChange={(e) => handleChange({ AR_LeftEye_CYL: e?.target.value })} label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                  <label className=''>Axis:</label>
                  <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.AR_LeftEye_Axis || ''} onChange={(e) => handleChange({ AR_LeftEye_Axis: e?.target.value })} label="" variant="outlined" />
                </div>
              </div>

              <div className='grid grid-cols-2 lg:flex gap-4 col-span-12 justify-center whitespace-nowrap'>
                <div className='col-span-1 flex gap-2 items-center justify-start lg:justify-between'>
                  <input type="checkbox" checked={isCheckedAutorefract(form?.AutoRefractDetail)} onChange={(e) => (onChangeCheckboxAutorefract('AutoRefractDetail', { AutoRefractDetail: e?.target.checked }))} className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='checkingautorefract1' name="checkingautorefract" value="" />
                  <label htmlFor='checkingautorefract1' className='font-medium'>ฟังผลกับจักษุแพทย์ที่ห้องตรวจ</label>
                </div>
                {/* <div className='col-span-1 flex gap-2 items-center justify-start lg:justify-between'>
                  <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='checking-entering2' name="checking-entering" value="" />
                  <label htmlFor='checking-entering2' className='font-medium'>ไม่ได้ตรวจ</label>
                </div> */}
                <div className='col-span-2 flex gap-2 items-center justify-between w-full'>
                  <TextareaAutosize disabled value={form?.AutoRefractDetail || ''} onChange={(e) => handleChange({ AutoRefractDetail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ความดันตา (Tonometry) */}
        <div className='grid grid-cols-12  items-start bg-[#F3F3F3] rounded-lg shadow-box w-full py-4 gap-2 mt-4 p-2'>
          <div className='flex justify-between col-span-12'>
            <label className='text-[#4E4E4E]'>ความดันตา (Tonometry)</label>
            <div className='flex gap-2 '>
              <div onClick={() => onClear('Tonometry')} className='cursor-pointer bg-[#E54545] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              </div>
              <div onClick={() => onSave('Tonometry')} className='cursor-pointer bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              </div>
            </div>
          </div>

          <div className='col-span-12 flex justify-center items-start m-4'>
            <div className='w-[90%] grid grid-cols-12 gap-4 '>

              <div className='flex gap-4 col-span-12 justify-start whitespace-nowrap'>
                <div className='flex gap-2 items-center justify-between'>
                  <input type="checkbox" checked={isChecked(form?.IOP_Detail)} onChange={(e) => (onChangeCheckbox('IOP_Detail', { IOP_Detail: e?.target.checked }))} className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' name="listen-room." value="" />
                  <label className='font-medium'>ฟังผลกับจักษุแพทย์ที่ห้องตรวจ</label>
                </div>
              </div>

              <div className='flex  flex-col  gap-4 col-span-12 col-start-2 justify-center whitespace-nowrap'>
                <div className='grid grid-cols-12 gap-2 items-center justify-between'>
                  <label className='col-span-12 lg:col-span-2'>ตาขวา (Right Eye): </label>
                  <TextField size='small' value={form?.IOP_Right_Eye || ''} onChange={(IOP_Right_Eye) => handleChange({ IOP_Right_Eye: IOP_Right_Eye?.target.value })} className='text-white col-span-10 bg-[#FFFFFF]' label="" variant="outlined" />

                </div>
                <div className='grid grid-cols-12  gap-2 items-center justify-between'>
                  <label className='col-span-12 lg:col-span-2'>ตาซ้าย (Left Eye): </label>
                  <TextField size='small' value={form?.IOP_Left_Eye || ''} onChange={(IOP_Left_Eye) => handleChange({ IOP_Left_Eye: IOP_Left_Eye?.target.value })} className='text-white col-span-10 bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ตรวจตาบอดสี (Ishihara Test) */}
        <div className='grid grid-cols-12  items-start bg-[#F3F3F3] rounded-lg shadow-box w-full py-4 gap-2 mt-4 p-2'>
          <div className='flex justify-between col-span-12'>
            <label className='text-[#4E4E4E]'>ตรวจตาบอดสี (Ishihara Test)</label>
            <div className='flex gap-2 '>
              <div onClick={() => onClear('Ishihara Test')} className='cursor-pointer bg-[#E54545] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              </div>
              <div onClick={() => onSave('Ishihara Test')} className='cursor-pointer bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              </div>
            </div>
          </div>

          <div className='col-span-12 flex justify-center items-start m-4'>
            <div className='w-[90%] grid grid-cols-12 gap-4 '>
              < div className='flex lg:flex-row flex-col col-span-12 gap-4 lg:gap-6 justify-start  '>
                <div className='flex gap-2 items-center'>
                  <input checked={form.Color === 'ไม่ได้ตรวจ'} onChange={() => handleChange({ Color: "ไม่ได้ตรวจ" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="IshiharaTest1" name="IshiharaTest" value="" />
                  <label htmlFor='IshiharaTest1' className=''>ไม่ได้ตรวจ</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.Color === 'ปกติ (Normal)'} onChange={() => handleChange({ Color: "ปกติ (Normal)" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="IshiharaTest2" name="IshiharaTest" value="" />
                  <label htmlFor='IshiharaTest2' className=''>ปกติ (Normal)</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.Color === 'ผิดปกติ (Color Blindness)'} onChange={() => handleChange({ Color: "ผิดปกติ (Color Blindness)" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="IshiharaTest3" name="IshiharaTest" value="" />
                  <label htmlFor='IshiharaTest3' className=''>ผิดปกติ (Color Blindness)</label>
                  <TextField size='small' disabled={form.Color !== 'ผิดปกติ (Color Blindness)'} value={form?.ColorBlindDetail || ''} onChange={(ColorBlindDetail) => handleChange({ ColorBlindDetail: ColorBlindDetail?.target.value })} className='text-white col-span-8 bg-[#FFFFFF]' label="" variant="outlined" />
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={form.Color === 'ผิดปกติทุกสี'} onChange={() => handleChange({ Color: "ผิดปกติทุกสี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="IshiharaTest4" name="IshiharaTest" value="" />
                  <label htmlFor='IshiharaTest4' className=''>ผิดปกติทุกสี</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 items-start bg-[#F3F3F3] rounded-lg shadow-box w-full gap-1 mt-4 p-2'>
          <div className='col-span-12 flex justify-center items-start m-4'>
            <div className='w-[90%] grid grid-cols-12 gap-4 '>
              <div className='flex gap-2 col-span-12 justify-center'>
                <label className='w-[10%]'>คำแนะนำ : </label>
                <Toolselect2 sm options={options?.Titmus || []} value={form?._ColorAbDetail} onChange={(_ColorAbDetail) => handleChange({ _ColorAbDetail })} />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 col-span-12 justify-center whitespace-nowrap'>
            <div className='grid grid-cols-12 gap-2 items-center justify-start'>
              <TextareaAutosize value={form?.ColorAbDetail || ''} onChange={(e) => handleChange({ ColorAbDetail: e?.target.value })} minRows={4} maxRows={4} className="col-span-12 lg:col-start-3 rounded-lg p-2" aria-label="" placeholder="" />
            </div>
          </div>
        </div>


        {/* Foot */}
        <div className='grid grid-cols-12  items-start   w-full gap-2 mt-4 p-2'>
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            {/* <button className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              <label>ล้าง</label>
            </div>
          </button> */}
            <button onClick={() => onSave('All')} className='w-56 h-10 cursor-pointer border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <label className='cursor-pointer'>บันทึก</label>
              </div>
            </button>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>

          {/* <div className='w-full flex col-span-12 justify-end mt-4'>
            <div className='w-[50%] flex gap-2 items-center'>
              <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' label="ลงชื่อผู้คัดกรอง" variant="outlined" />
              <div className='bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              </div>
              <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
              </div>
            </div>
          </div> */}
        </div>
      </Collapse>
    </div>
  )
}

export default Titmus