'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addPatienthistory, addVitalsign, getPatientHistoryById, getVitalsignById, searchCategory, updatePatienthistory, updateVitalsign } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert, warningAlert } from '../SweetAlert/sweetAlert'

function VitalSignDocterresult({ activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  const [formPatientHistory, setFormPatientHistory] = useState({})
  const [switchStaus, setSwitchStaus] = useState(null)
  const [options, setOptions] = useState({})
  const [familyhistory, setFamilyHistory] = useState([]) // สมาชิกในครอบครัว
  const [familyIllness, setFamilyIllness] = useState([]) //โรคคนในครอบครัว

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
      const resVitalsign = await getVitalsignById(UID)
      if (resVitalsign?.message === 'success') {
        setForm(resVitalsign?.data || {})
        if (resVitalsign?.data === null) {
          onActiveTap('vital_sign', false)
        }
      } else {
        console.log('error', resVitalsign?.error)
        onActiveTap('vital_sign', false)
      }

      const resPatientHistory = await getPatientHistoryById(UID)
      if (resPatientHistory?.message === 'success') {
        setFormPatientHistory(resPatientHistory?.data || [])
      } else {
        console.log('error', resPatientHistory?.error)
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
      const type = ['Disease']

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
    setSwitchStaus(activeTap?.vital_sign)
  }, [activeTap?.vital_sign])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('vital_sign', update.target.checked)
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const handleChangePatientHistory = (update, name) => {
    if (update.hasOwnProperty('PresentIllness')) {
      update.PersonalHistoryPresentIllness = update?.PresentIllness
    } else if (update.hasOwnProperty('Allergy')) {
      update.PersonalHistoryAllergy = update?.Allergy
    } else if (update.hasOwnProperty('MHAccident')) {
      update.PersonalHistoryAccident = update?.MHAccident
    } else if (update.hasOwnProperty('PassSurgery')) {
      update.PersonalHistorySurgery = update?.PassSurgery
    } else if (update.hasOwnProperty('PassDisease')) {
      update.PresentDisease = update?.PassDisease
    }

    if (update?.hasOwnProperty('Description')) {
      if (name === 'Disease') {
        update.PHComment = (formPatientHistory?.PHComment || '') + (formPatientHistory?.PHComment ? '\n' : '') + update?.Description
      }
    }

    setFormPatientHistory({ ...formPatientHistory, ...update })
  }

  const onChangeCheckbox = (name, update) => {
    update[name] = update[name] ? 'TRUE' : 'FALSE'
    setFormPatientHistory({ ...formPatientHistory, ...update })
  }

  const isChecked = (item) => {
    return item === 'TRUE'
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        setForm((p) => ({
          ...p, ...{
            Height: null,
            Weight: null,
            BMI: null,
            BMIDetail: null,
            BPSys: null,
            BPDias: null,
            BPDetail: null,
            PulseRate: null,
            PulseDetail: null,
            Waist: null,
            WaistDetail: null,
            Prenacy: null,
            BodyTemperature: null,
            RespiratoryRate: null,
            Remarks: null,
            Remark_Name: null,
            Remark_Name_EN: null,
            Remark_Date: null,
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
          ptPatientUID: form?.ptPatientUID || null,
          Height: form?.Height || null,
          Weight: form?.Weight || null,
          BMI: form?.BMI || null,
          BMIDetail: form?.BMIDetail || null,
          BPSys: form?.BPSys || null,
          BPDias: form?.BPDias || null,
          BPDetail: form?.BPDetail || null,
          PulseRate: form?.PulseRate || null,
          PulseDetail: form?.PulseDetail || null,
          Waist: form?.Waist || null,
          WaistDetail: form?.WaistDetail || null,
          Prenacy: form?.Prenacy || null,
          Language: form?.Language || null,
          StatusFlag: form?.StatusFlag || null,
          CUser: form?.CUser || null,
          CWhen: form?.CWhen || null,
          MUser: form?.MUser || null,
          MWhen: form?.MWhen || null,
          BodyTemperature: form?.BodyTemperature || null,
          RespiratoryRate: form?.RespiratoryRate || null,
          Remarks: form?.Remarks || null,
          Remark_Name: form?.Remark_Name || null,
          Remark_Name_EN: form?.Remark_Name_EN || null,
          Remark_Date: form?.Remark_Date || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const resupdate = await updateVitalsign(form?.UID, saveData)
            if (!resupdate?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', resupdate?.error)
            }
          } else {
            const resadd = await addVitalsign({ ...saveData, trPatientUID: UID })
            if (!resadd?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', resadd?.error)
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

  const onClearPatientHistory = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        setFormPatientHistory((p) => ({
          ...p, ...{
            PersonalHistoryChange: null,
            PersonalHistoryPresentIllness: null,
            PersonalHistoryCurrentMedication: null,
            PersonalHistoryAllergy: null,
            PersonalHistoryAccident: null,
            PersonalHistorySurgery: null,
            PersonalHistoryAdmission: null,
            SmokingNone: null,
            SmokingQuit: null,
            SmokingYears: null,
            Smoking: null,
            SmokingVolumes: null,
            SmokingLong: null,
            AlcoholNone: null,
            AlcoholQuit: null,
            AlcoholYears: null,
            Alcohol: null,
            AlcoholVolume: null,
            Exercise: null,
            ExerciseType: null,
            FamilyHistoryInherite: null,
            FamilyHistoryChange: null,
            FamilyHistoryDiabetes: null,
            FamilyHistoryDiabetesDetail: null,
            FamilyHistoryHeartDiesase: null,
            FamilyHistoryHeartDiesaseDetail: null,
            FamilyHistoryDyslipidemia: null,
            FamilyHistoryDyslipidemiaDetail: null,
            FamilyHistoryAnemia: null,
            FamilyHistoryAnemiaDetail: null,
            FamilyHistoryHypertension: null,
            FamilyHistoryHypertensionDetail: null,
            FamilyHistoryCancer: null,
            FamilyHistoryCancerDetail: null,
            FamilyHistoryHepatitis: null,
            FamilyHistoryHepatitisDetail: null,
            FamilyHistoryOther: null,
            FamilyHistoryOtherDetail: null,
            FamilyHistoryTuberculosis: null,
            FamilyHistoryAllergy: null,
            SpecialCheckByJobDesc: null,
            FamilyHistoryTuberculosisDetail: null,
            FamilyHistoryAllergyDetail: null,
            SmokingQuitOther: null,
            AlcoholQuitOther: null,
            SmokingQuitDetail2: null,
          }
        }))
      }
    })
  }

  const onSavePatientHistory = () => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {
          trPatientUID: formPatientHistory?.trPatientUID || null,
          Language: formPatientHistory?.Language || null,
          StatusFlag: formPatientHistory?.StatusFlag || null,
          CUser: formPatientHistory?.CUser || null,
          CWhen: formPatientHistory?.CWhen || null,
          MUser: formPatientHistory?.MUser || null,
          MWhen: formPatientHistory?.MWhen || null,

          //ประวัติทั่วไป
          Allergy: formPatientHistory?.Allergy || null,
          PersonalHistoryAllergy: formPatientHistory?.PersonalHistoryAllergy || null,
          PersonalHistoryChange: formPatientHistory?.PersonalHistoryChange || null,
          PresentIllness: formPatientHistory?.PresentIllness || null,
          PersonalHistoryPresentIllness: formPatientHistory?.PersonalHistoryPresentIllness || null,
          PersonalHistoryCurrentMedication: formPatientHistory?.PersonalHistoryCurrentMedication || null,
          PersonalHistoryAdmission: formPatientHistory?.PersonalHistoryAdmission || null,

          //ประวัติการสูบบุหรี่
          SmokingNone: formPatientHistory?.SmokingNone || null,
          SmokingQuit: formPatientHistory?.SmokingQuit || null,
          SmokingNoneLongYear: formPatientHistory?.SmokingNoneLongYear || null,
          SmokingNoneLongDetail: formPatientHistory?.SmokingNoneLongDetail || null,
          SmokingYear: formPatientHistory?.SmokingYear || null,
          SmokingYears: formPatientHistory?.SmokingYears || null,
          SmokingMonth: formPatientHistory?.SmokingMonth || null,
          Smoking: formPatientHistory?.Smoking || null,
          SmokingVolumes: formPatientHistory?.SmokingVolumes || null,
          SmokingLong: formPatientHistory?.SmokingLong || null,
          SmokingQuitDetail2: formPatientHistory?.SmokingQuitDetail2 || null,
          SmokingQuitDetail: formPatientHistory?.SmokingQuitDetail || null,
          SmokingQuitOther: formPatientHistory?.SmokingQuitOther || null,
          SmokingOther: formPatientHistory?.SmokingOther || null,
          SmokingRemark: formPatientHistory?.SmokingRemark || null,

          //ประวัติการเจ็บป่วยในอดีต
          MHAccident: formPatientHistory?.MHAccident || null,
          PersonalHistoryAccident: formPatientHistory?.PersonalHistoryAccident || null,
          PassSurgery: formPatientHistory?.PassSurgery || null,
          PersonalHistorySurgery: formPatientHistory?.PersonalHistorySurgery || null,
          PassDisease: formPatientHistory?.PassDisease || null,
          PresentDisease: formPatientHistory?.PresentDisease || null,

          //ประวัติการดื่มแอลกอฮอล์
          AlcoholNone: formPatientHistory?.AlcoholNone || null,
          AlcoholQuit: formPatientHistory?.AlcoholQuit || null,
          AlcoholYears: formPatientHistory?.AlcoholYears || null,
          Alcohol: formPatientHistory?.Alcohol || null,
          AlcoholVolume: formPatientHistory?.AlcoholVolume || null,
          AlcoholQuitOther: formPatientHistory?.AlcoholQuitOther || null,
          AlcoholicDrinkYear: formPatientHistory?.AlcoholicDrinkYear || null,
          AlcoholicDrinkMonth: formPatientHistory?.AlcoholicDrinkMonth || null,

          //ประวัติการออกกำลังกาย
          Exercise: formPatientHistory?.Exercise || null,
          ExerciseType: formPatientHistory?.ExerciseType || null,

          //ประวัติการเจ็บป่วยในครอบครัว
          FamilyHistoryAllergy: formPatientHistory?.FamilyHistoryAllergy,
          FamilyHistoryAllergyDetail: formPatientHistory?.FamilyHistoryAllergyDetail || null,
          FamilyHistoryInherite: formPatientHistory?.FamilyHistoryInherite || null,
          FamilyHistoryChange: formPatientHistory?.FamilyHistoryChange || null,
          FamilyHistoryDiabetes: formPatientHistory?.FamilyHistoryDiabetes || null,
          FamilyHistoryDiabetesDetail: formPatientHistory?.FamilyHistoryDiabetesDetail || null,
          FamilyHistoryHeartDiesase: formPatientHistory?.FamilyHistoryHeartDiesase || null,
          FamilyHistoryHeartDiesaseDetail: formPatientHistory?.FamilyHistoryHeartDiesaseDetail || null,
          FamilyHistoryDyslipidemia: formPatientHistory?.FamilyHistoryDyslipidemia || null,
          FamilyHistoryDyslipidemiaDetail: formPatientHistory?.FamilyHistoryDyslipidemiaDetail || null,
          FamilyHistoryAnemia: formPatientHistory?.FamilyHistoryAnemia || null,
          FamilyHistoryAnemiaDetail: formPatientHistory?.FamilyHistoryAnemiaDetail || null,
          FamilyHistoryHypertension: formPatientHistory?.FamilyHistoryHypertension || null,
          FamilyHistoryHypertensionDetail: formPatientHistory?.FamilyHistoryHypertensionDetail || null,
          FamilyHistoryCancer: formPatientHistory?.FamilyHistoryCancer || null,
          FamilyHistoryCancerDetail: formPatientHistory?.FamilyHistoryCancerDetail || null,
          FamilyHistoryHepatitis: formPatientHistory?.FamilyHistoryHepatitis || null,
          FamilyHistoryHepatitisDetail: formPatientHistory?.FamilyHistoryHepatitisDetail || null,
          FamilyHistoryOther: formPatientHistory?.FamilyHistoryOther || null,
          FamilyHistoryOtherDetail: formPatientHistory?.FamilyHistoryOtherDetail || null,
          FamilyHistoryTuberculosis: formPatientHistory?.FamilyHistoryTuberculosis || null,
          FamilyHistoryTuberculosisDetail: formPatientHistory?.FamilyHistoryTuberculosisDetail || null,
          UserSign: formPatientHistory?.UserSign || null,

          //อาชีพ/ลักษณะงาน
          SpecialCheckByJobDesc: formPatientHistory?.SpecialCheckByJobDesc || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (formPatientHistory?.UID) {
            const res = await updatePatienthistory(formPatientHistory?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addPatienthistory({ ...saveData, trPatientUID: UID })
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

  const isCheckedFamilyHistoryCheckbox = (item) => {
    return Array.isArray(familyhistory) && familyhistory.includes(item);
  }

  const onChangeFamilyHistoryCheckbox = (update) => {
    const dataold = [...familyhistory]
    if (dataold.includes(update)) {
      const datafilter = dataold.filter((d) => d != update)
      setFamilyHistory(datafilter)
    } else {
      setFamilyHistory((p) => (
        [...p, update]
      ))
    }
  }

  const isCheckedFamilyIllnessCheckbox = (item) => {
    return Array.isArray(familyIllness) && familyIllness.includes(item);
  }

  const onChangeFamilyIllnessCheckbox = (update) => {
    const dataold = [...familyIllness]
    if (dataold.includes(update)) {
      const datafilter = dataold.filter((d) => d != update)
      setFamilyIllness(datafilter)
    } else {
      setFamilyIllness((p) => (
        [...p, update]
      ))
    }
  }

  const onSelect = () => {
    if (!familyhistory?.length > 0) {
      warningAlert('กรุณาเลือกสมาชิกในครอบครัว')
      return
    }
    if (!familyIllness?.length > 0) {
      warningAlert('กรุณาเลือกโรคที่เจ็บป่วย')
      return
    }

    if (familyhistory?.length > 0 && familyIllness?.length > 0) {
      let data_detail = formPatientHistory?.FamilyHistoryOtherDetail || ''
      data_detail = data_detail + familyhistory.toString(',') + ' : ' + familyIllness.toString(',') + '\n'

      setFormPatientHistory({ ...formPatientHistory, ...{ FamilyHistoryOtherDetail: data_detail } })
      setFamilyIllness([])
      setFamilyHistory([])
    }
  }

  return (
    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='vital_sign' className='font-semibold text-[#365382]'>Vital Sign</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className='grid grid-cols-12  items-start bg-[#F3F3F3] rounded-lg shadow-box w-full gap-2 mt-4 p-2'>
          {/* <label className='font-light text-base col-span-12' >Vital Sign</label> */}
          <div className='grid grid-cols-12  col-span-12 gap-4 mt-2'>
            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.Height || ''} onChange={(Height) => handleChange({ Height: Height?.target?.value })} label="ส่วนสูง (ซม.)" variant="outlined" />
            </div>
            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.Weight || ''} onChange={(Weight) => handleChange({ Weight: Weight?.target?.value })} label="น้ำหนัก (กก.)" variant="outlined" />
            </div>
            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.BMI || ''} onChange={(BMI) => handleChange({ BMI: BMI?.target?.value })} label="BMI" variant="outlined" />
            </div>

            <div className='flex gap-2 col-span-12'>
              <div className='flex gap-2 whitespace-nowrap'>
                <input type="checkbox" className='w-5 h-5 accent-[#365382]' name="company-address" value="" />
                <label className='font-medium'>สัญชาติอื่นๆ</label>
              </div>
              <TextareaAutosize value={form?.BMIDetail || ''} onChange={(BMIDetail) => handleChange({ BMIDetail: BMIDetail?.target?.value })} minRows={3} maxRows={5} className="w-full rounded-lg h-[80px] p-2" aria-label="Demo input" placeholder=""
              />
            </div>
          </div>
          {/* เส้นขั้น */}
          <div className='flex  col-span-12 border border-[#E2E2E2] my-2'></div>

          <label className='font-light text-base col-span-12' >Blood Pressure</label>
          <div className='grid grid-cols-12  col-span-12 gap-4'>
            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.BPSys || ''} onChange={(BPSys) => handleChange({ BPSys: BPSys?.target?.value })} label="Sys" variant="outlined" InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }} />
            </div>
            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.BPDias || ''} onChange={(BPDias) => handleChange({ BPDias: BPDias?.target?.value })} label="Dias" variant="outlined" InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }} />
            </div>
            <div className='relative flex col-span-4 ml-1 bg-[#FFFFFF]'>
              <Toolselect2 sm options={[]} label={" "} value={''} change={''} name={" "}></Toolselect2>
            </div>


            <TextareaAutosize value={form?.BPDetail || ''} onChange={(BPDetail) => handleChange({ BPDetail: BPDetail?.target?.value })} minRows={3} maxRows={5} className="col-span-8 rounded-lg h-[80px] p-2" aria-label="Demo input" placeholder="" />
            <div className='flex gap-2 col-span-4 items-end'>
              <button className='h-10 w-full  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >ADD</button>
              <button className='h-10 w-full  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปล</button>
              <button className='h-10 w-full  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปลผลใหม่ Test</button>
            </div>

            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.PulseRate || ''} onChange={(PulseRate) => handleChange({ PulseRate: PulseRate?.target?.value })} label="Pulse Rate (Bpm)" variant="outlined" />
            </div>
            <div className='relative flex col-span-8 ml-1 bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.PulseDetail || ''} onChange={(PulseDetail) => handleChange({ PulseDetail: PulseDetail?.target?.value })} label=" " variant="outlined" />
            </div>

            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.RespiratoryRate || ''} onChange={(RespiratoryRate) => handleChange({ RespiratoryRate: RespiratoryRate?.target?.value })} label="อัตราการหายใจ" variant="outlined" InputProps={{ endAdornment: <InputAdornment position="end">ครั้ง/นาที</InputAdornment> }} />
            </div>
            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.ChestInspiration || ''} onChange={(ChestInspiration) => handleChange({ ChestInspiration: ChestInspiration?.target?.value })} label="หายใจเข้า" variant="outlined" />
            </div>
            <div className='relative flex col-span-4 ml-1 bg-[#FFFFFF]'>
              <Toolselect2 sm options={[]} label={"หายใจออก"} value={''} change={''} name={" "}></Toolselect2>
            </div>

            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.BodyTemperature || ''} onChange={(BodyTemperature) => handleChange({ BodyTemperature: BodyTemperature?.target?.value })} label="อุณหภูมิร่างกาย" variant="outlined" InputProps={{ endAdornment: <InputAdornment position="end">°C</InputAdornment> }} />
            </div>
            <div className='relative flex col-span-4  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.Waist || ''} onChange={(Waist) => handleChange({ Waist: Waist?.target?.value })} label="รอบเอว" variant="outlined" InputProps={{ endAdornment: <InputAdornment position="end">CM.</InputAdornment> }} />
            </div>
            <div className='relative flex col-span-4 ml-1 bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.WaistDetail || ''} onChange={(WaistDetail) => handleChange({ WaistDetail: WaistDetail?.target?.value })} label="หมายเหตุ" variant="outlined" />
            </div>

            <div className='relative flex col-span-4 ml-1 bg-[#FFFFFF]'>
              <TextField size='small' className='text-white w-full' value={form?.Around || ''} onChange={(Around) => handleChange({ Around: Around?.target?.value })} label="รอบคอ" variant="outlined" InputProps={{ endAdornment: <InputAdornment position="end">CM.</InputAdornment> }} />
            </div>
            <div className='flex gap-2 whitespace-nowrap col-span-8 items-center'>
              <input type="checkbox" className='w-5 h-5 accent-[#365382]' id='company-address1' name="company-address" checked={isChecked(form?.Prenacy)} onChange={(Prenacy) => handleChange({ Prenacy: String(Prenacy?.target?.checked) })} />
              <label htmlFor='company-address1' className='font-medium'>การตั้งครรภ์</label>
            </div>
          </div>

          {/* เส้นขั้น */}
          {/* <div className='flex  col-span-12 border border-[#E2E2E2] my-2'></div>
          <div className='grid grid-cols-12 col-span-12 items-end gap-2'>
            <div className='relative flex col-span-4 ml-1 gap-2 items-end'>
              <div className='bg-[#FFFFFF] flex w-[100%]'>
                <Toolselect2 sm options={[]} label={"สรุปผลการตรวจร่างกายโดยแพทย์"} value={''} change={''} name={" "}></Toolselect2>
              </div>
            </div>
            <div className='relative flex col-span-8 ml-1 gap-2 items-end'>
              <div className='bg-[#FFFFFF] flex w-[80%]  rounded-lg'>
                <TextareaAutosize value={form?.Remarks || ''} onChange={(Remarks) => handleChange({ Remarks: Remarks?.target?.value })} minRows={3} maxRows={5} className=" w-full rounded-lg p-2" aria-label="Demo input" placeholder="" />
              </div>
              <button className='h-10 w-[20%]  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปลผล</button>
            </div>
          </div> */}

          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>***กรุณากรอกเฉพาะตัวเลขเท่านั้น</label>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button className='h-10 w-56    border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปลผล</button>
            <button onClick={() => onClear()} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label>ล้าง</label>
              </div>
            </button>
            <button onClick={() => onSave()} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <label>บันทึก</label>
              </div>
            </button>
          </div>
        </div>

        {/* Patient History */}
        <div className='grid grid-cols-12  items-start bg-[#F3F3F3] rounded-lg shadow-box w-full gap-2 mt-4 p-2'>
          <label id='patient_history' className='font-semibold text-[#365382] text-base col-span-12' >Patient History</label>
          {/*1. ประวัติทั่วไป (General history) */}
          <div className='grid grid-cols-12 col-span-12 items-end gap-2 text-base font-light'>
            <label className='col-span-12 '>1. ประวัติทั่วไป (General history)</label>
            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='lg:col-span-4 flex  col-span-12 lg:grid lg:grid-cols-12 gap-2'>
                <label className='text-sm ml-6  lg:ml-0 lg:col-span-12 lg:col-start-3 whitespace-nowrap'>1.1 อาการผิดปกติที่มี</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.PresentIllness === 'ไม่มี'} onChange={() => handleChangePatientHistory({ PresentIllness: "ไม่มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="PresentIllnessnot" name="PresentIllness" value="" />
                    <label htmlFor='PresentIllnessnot' className=''>ไม่มี</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.PresentIllness === 'มี'} onChange={() => handleChangePatientHistory({ PresentIllness: "มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="PresentIllnesshave" name="PresentIllness" value="" />
                    <label htmlFor='PresentIllnesshave' className=''>มี</label>
                  </div>
                </div>
              </div>
              <div className='ml-6 lg:ml-0 col-span-12 lg:col-span-8 flex gap-2 items-end'>
                <TextareaAutosize disabled={formPatientHistory.PresentIllness === 'ไม่มี'} value={formPatientHistory?.PersonalHistoryPresentIllness || ''} onChange={(PersonalHistoryPresentIllness) => handleChangePatientHistory({ PersonalHistoryPresentIllness: PersonalHistoryPresentIllness?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
              </div>
            </div>

            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='lg:col-span-4 flex  col-span-12 lg:grid lg:grid-cols-12 gap-2'>
                <label className='text-sm ml-6  lg:ml-0 lg:col-span-12 lg:col-start-3 whitespace-nowrap'>1.2 โรคประจำตัว</label>
                <div className='flex justify-start items-center gap-4 w-full col-span-12 lg:col-start-3'>
                  <div className='relative grid grid-cols-12 w-full   gap-2 items-end'>
                    <div className='bg-[#FFFFFF] flex col-span-12'>
                      <Toolselect2 sm options={options?.Disease || []} value={formPatientHistory?.Description} onChange={(Description) => handleChangePatientHistory({ Description }, 'Disease')} />
                    </div>
                    {/* <button className='h-10 col-span-4  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button> */}
                  </div>
                </div>
              </div>
              <div className='ml-6  lg:ml-0 col-span-12 lg:col-span-8 flex gap-2 items-end'>
                <TextareaAutosize value={formPatientHistory?.PHComment || ''} onChange={(e) => handleChangePatientHistory({ PHComment: e?.target.value }, 'Disease')} minRows={2} maxRows={2} className="w-full rounded-lg h-f p-2" aria-label="" placeholder="" />

                <TextareaAutosize value={formPatientHistory?.PersonalHistoryPresentIllness || ''} onChange={(PersonalHistoryPresentIllness) => handleChangePatientHistory({ PersonalHistoryPresentIllness: PersonalHistoryPresentIllness?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg h-f p-2" aria-label="" placeholder="" />
              </div>
            </div>

            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='lg:col-span-4 flex  col-span-12 lg:grid lg:grid-cols-12 gap-2'>
                <label className='text-sm ml-6  lg:ml-0 lg:col-span-12 lg:col-start-3 whitespace-nowrap'>1.3 ยาที่ใช้ประจำ</label>
                <div className='flex justify-start items-center gap-4 w-full col-span-12 col-start-3'>
                  <div className='relative grid grid-cols-12 w-full  gap-2 items-end'>
                    <div className='bg-[#FFFFFF] flex col-span-12'>
                      <Toolselect2 sm options={[]} label={""} value={''} change={''} name={" "}></Toolselect2>
                    </div>
                    {/* <button className='h-10 col-span-4  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button> */}
                  </div>
                </div>

              </div>
              <div className='ml-6  lg:ml-0 col-span-12 lg:col-span-8 flex gap-2 items-end'>
                <TextareaAutosize value={formPatientHistory?.PersonalHistoryCurrentMedication || ''} onChange={(PersonalHistoryCurrentMedication) => handleChangePatientHistory({ PersonalHistoryCurrentMedication: PersonalHistoryCurrentMedication?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg h-f p-2" aria-label="" placeholder="" />
              </div>
            </div>

            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='lg:col-span-4 flex  col-span-12 lg:grid lg:grid-cols-12 gap-2'>
                <label className='text-sm ml-6  lg:ml-0 lg:col-span-12 lg:col-start-3 whitespace-nowrap'>1.4 ประวัติการแพ้อาหาร ยา วัคซีน</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.Allergy === 'ไม่มี'} onChange={() => handleChangePatientHistory({ Allergy: "ไม่มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="allergichistorynot" name="allergichistory" value="" />
                    <label htmlFor='allergichistorynot' className=''>ไม่มี</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.Allergy === 'มี'} onChange={() => handleChangePatientHistory({ Allergy: "มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="allergichistoryhave" name="allergichistory" value="" />
                    <label htmlFor='allergichistoryhave' className=''>มี</label>
                  </div>
                </div>
              </div>
              <div className='ml-6  lg:ml-0 col-span-12 lg:col-span-8 flex gap-2 items-end'>
                <TextareaAutosize disabled={formPatientHistory.Allergy === 'ไม่มี'} value={formPatientHistory?.PersonalHistoryAllergy || ''} onChange={(PersonalHistoryAllergy) => handleChangePatientHistory({ PersonalHistoryAllergy: PersonalHistoryAllergy?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
              </div>
            </div>
          </div>

          <div className='border-b-2 border-[#E2E2E2] col-span-12 my-4'></div>
          {/*2. ประวัติการเจ็บป่วยในอดีต (Past Illness) */}
          <div className='grid grid-cols-12 col-span-12 items-end gap-2 text-base font-light'>
            <label className='col-span-12 '>2. ประวัติการเจ็บป่วยในอดีต (Past Illness)</label>
            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='lg:col-span-4 flex  col-span-12 lg:grid lg:grid-cols-12 gap-2'>
                <label className='text-sm ml-6  lg:ml-0 lg:col-span-12 lg:col-start-3 whitespace-nowrap'>2.1 อุบัติเหตุ</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.MHAccident === 'ไม่มี'} onChange={() => handleChangePatientHistory({ MHAccident: "ไม่มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" name="accident" id="accidentnot" value="" />
                    <label htmlFor='accidentnot' className=''>ไม่มี</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.MHAccident === 'มี'} onChange={() => handleChangePatientHistory({ MHAccident: "มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" name="accident" id="accidenthave" value="" />
                    <label htmlFor='accidenthave' className=''>มี</label>
                  </div>
                </div>
              </div>
              <div className='ml-6  lg:ml-0 col-span-12 lg:col-span-8 flex gap-2 items-end'>
                <TextareaAutosize disabled={formPatientHistory.MHAccident === 'ไม่มี'} value={formPatientHistory?.PersonalHistoryAccident || ''} onChange={(PersonalHistoryAccident) => handleChangePatientHistory({ PersonalHistoryAccident: PersonalHistoryAccident?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
              </div>
            </div>

            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='lg:col-span-4 flex  col-span-12 lg:grid lg:grid-cols-12 gap-2'>
                <label className='text-sm ml-6  lg:ml-0 lg:col-span-12 lg:col-start-3 whitespace-nowrap'>2.2  การผ่าตัด</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.PassSurgery === 'ไม่มี'} onChange={() => handleChangePatientHistory({ PassSurgery: "ไม่มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="surgerynot" name="surgery" value="" />
                    <label htmlFor='surgerynot' className=''>ไม่มี</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.PassSurgery === 'มี'} onChange={() => handleChangePatientHistory({ PassSurgery: "มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="surgeryhave" name="surgery" value="" />
                    <label htmlFor='surgeryhave' className=''>มี</label>
                  </div>
                </div>
              </div>
              <div className='ml-6  lg:ml-0 col-span-12 lg:col-span-8 flex gap-2 items-end'>
                <TextareaAutosize disabled={formPatientHistory.PassSurgery === 'ไม่มี'} value={formPatientHistory?.PersonalHistorySurgery || ''} onChange={(PersonalHistorySurgery) => handleChangePatientHistory({ PersonalHistorySurgery: PersonalHistorySurgery?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
              </div>
            </div>

            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='lg:col-span-4 flex  col-span-12 lg:grid lg:grid-cols-12 gap-2'>
                <label className='text-sm ml-6  lg:ml-0 lg:col-span-12 lg:col-start-3 whitespace-nowrap'>2.3  การนอนรับการรักษาในโรงพยาบาล</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.aa5 === 'ไม่มี'} onChange={() => handleChangePatientHistory({ aa5: "ไม่มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="hospitalizationnot" name="hospitalization" value="" />
                    <label htmlFor='hospitalizationnot' className=''>ไม่มี</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.aa5 === 'มี'} onChange={() => handleChangePatientHistory({ aa5: "มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="hospitalizationhave" name="hospitalization" value="" />
                    <label htmlFor='hospitalizationhave' className=''>มี</label>
                  </div>
                </div>
              </div>
              <div className='ml-6  lg:ml-0 col-span-12 lg:col-span-8 flex gap-2 items-end'>
                <TextareaAutosize disabled={formPatientHistory.aa5 === 'ไม่มี'} value={formPatientHistory?.aa6 || ''} onChange={(aa6) => handleChangePatientHistory({ aa6: aa6?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
              </div>
            </div>

            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='lg:col-span-4 flex  col-span-12 lg:grid lg:grid-cols-12 gap-2'>
                <label className='text-sm ml-6  lg:ml-0 lg:col-span-12 lg:col-start-3 whitespace-nowrap'>2.4  โรคที่เคยเป็น</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.PassDisease === 'ไม่มี'} onChange={() => handleChangePatientHistory({ PassDisease: "ไม่มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="reviously-existing-diseasesnot" name="reviously-existing-diseases" value="" />
                    <label htmlFor='reviously-existing-diseasesnot' className=''>ไม่มี</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={formPatientHistory.PassDisease === 'มี'} onChange={() => handleChangePatientHistory({ PassDisease: "มี" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="reviously-existing-diseaseshave" name="reviously-existing-diseases" value="" />
                    <label htmlFor='reviously-existing-diseaseshave' className=''>มี</label>
                  </div>
                </div>
              </div>
              <div className='ml-6  lg:ml-0 col-span-12 lg:col-span-8 flex gap-2 items-end'>
                <TextareaAutosize disabled={formPatientHistory.PassDisease === 'ไม่มี'} value={formPatientHistory?.PresentDisease || ''} onChange={(PresentDisease) => handleChangePatientHistory({ PresentDisease: PresentDisease?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
              </div>
            </div>

          </div>

          <div className='border-b-2 border-[#E2E2E2] col-span-12 my-4'></div>
          {/*3. ประวัติส่วนตัว (Personal History) */}
          <div className='grid grid-cols-12 col-span-12 items-end gap-2 text-base font-light'>
            <label className='col-span-12 '>3. ประวัติส่วนตัว (Personal History)</label>
            {/* 3.1 ประวัติการสูบบุหรี่ */}
            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='col-span-4 grid grid-cols-12 gap-4'>
                <label className='text-sm  col-span-12 col-start-3'>3.1 ประวัติการสูบบุหรี่</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'></div>
              </div>
              <div className='flex lg:flex-row flex-col col-start-3 items-start lg:items-center gap-4  col-span-12'>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.SmokingNone === "ไม่สูบ"} onChange={() => handleChangePatientHistory({ SmokingNone: "ไม่สูบ" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="SmokingNone1" name="SmokingNone" value="" />
                  <label htmlFor='SmokingNone1' className=''>ไม่สูบ</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.SmokingNone === "สูบ"} onChange={() => handleChangePatientHistory({ SmokingNone: "สูบ" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="SmokingNone2" name="SmokingNone" value="" />
                  <label htmlFor='SmokingNone2' className=''>สูบ</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.SmokingNone === "ไม่มีข้อมูล"} onChange={() => handleChangePatientHistory({ SmokingNone: "ไม่มีข้อมูล" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="SmokingNone3" name="SmokingNone" value="" />
                  <label htmlFor='SmokingNone3' className=''>ไม่มีข้อมูล</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.SmokingNone === "เคยและยังสูบอยู่ปริมาณ"} onChange={() => handleChangePatientHistory({ SmokingNone: "เคยและยังสูบอยู่ปริมาณ" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="SmokingNone4" name="SmokingNone" value="" />
                  <label htmlFor='SmokingNone4' className=''>เคยและยังสูบอยู่ปริมาณ</label>
                  <div className='relative flex col-span-4 items-center ga  gap-4 whitespace-nowrap'>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.SmokingVolumes || ''} onChange={(SmokingVolumes) => handleChangePatientHistory({ SmokingVolumes: SmokingVolumes?.target.value })} label="" variant="outlined" />
                    <label>มวน/วัน</label>
                  </div>
                </div>

              </div>

              <div className='flex lg:flex-row flex-col col-start-3 items-start lg:items-center gap-4  col-span-12'>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.SmokingLong === "เคยแต่เลิกสูบแล้ว ระยะที่เคยสูบนาน"} onChange={() => handleChangePatientHistory({ SmokingLong: "เคยแต่เลิกสูบแล้ว ระยะที่เคยสูบนาน" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="SmokingLong1" name="SmokingLong" value="" />
                  <label htmlFor='SmokingLong1' className=''>เคยแต่เลิกสูบแล้ว ระยะที่เคยสูบนาน</label>
                  <div className='relative flex col-span-4  items-center'>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.SmokingYears || ''} onChange={(SmokingYears) => handleChangePatientHistory({ SmokingYears: SmokingYears?.target.value })} label="" variant="outlined" />
                    <label className='ml-2'>ปี</label>
                  </div>
                  <div className='relative flex col-span-4  items-center'>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.SmokingQuitDetail2 || ''} onChange={(SmokingQuitDetail2) => handleChangePatientHistory({ SmokingQuitDetail2: SmokingQuitDetail2?.target.value })} label="" variant="outlined" />
                    <label className='ml-2'>เดือน</label>
                  </div>
                </div>

                <div className='relative flex col-span-4  items-center gap-2 whitespace-nowrap'>
                  <label className='whitespace-nowrap'>ปริมาณก่อนเลิก</label>
                  <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.SmokingQuitOther || ''} onChange={(SmokingQuitOther) => handleChangePatientHistory({ SmokingQuitOther: SmokingQuitOther?.target.value })} label="" variant="outlined" />
                  <label>มวน/วัน</label>
                </div>
              </div>

              <div className='flex col-start-3 items-center gap-4  col-span-12'>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.SmokingQuit === "เลิกสูบมานาน"} onChange={() => handleChangePatientHistory({ SmokingQuit: "เลิกสูบมานาน" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="smoke3_1" name="smoke3" value="" />
                  <label htmlFor='smoke3_1' className=''>เลิกสูบมานาน</label>
                  <div className='relative flex col-span-4  items-center'>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.SmokingYear || ''} onChange={(SmokingYear) => handleChangePatientHistory({ SmokingYear: SmokingYear?.target.value })} label="" variant="outlined" />
                    <label className='ml-2'>ปี</label>
                  </div>
                  <div className='relative flex col-span-4 items-center '>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.SmokingMonth || ''} onChange={(SmokingMonth) => handleChangePatientHistory({ SmokingMonth: SmokingMonth?.target.value })} label="" variant="outlined" />
                    <label className='ml-2'>เดือน</label>
                  </div>
                </div>
              </div>

              <div className='flex col-start-3 items-center gap-4  col-span-12'>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.SmokingOther === "อื่นๆ"} onChange={() => handleChangePatientHistory({ SmokingOther: "อื่นๆ" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="smoke-other1" name="smoke-other" value="" />
                  <label htmlFor='smoke-other1' className=''>อื่นๆ</label>
                  <div className='relative flex col-span-4  items-center'>
                    <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={formPatientHistory?.SmokingRemark || ''} onChange={(SmokingRemark) => handleChangePatientHistory({ SmokingRemark: SmokingRemark?.target.value })} label="" variant="outlined" />
                  </div>
                </div>

              </div>
            </div>
            {/* 3.2 ประวัติการดื่มแอลกอฮอล์ */}
            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='col-span-4 grid grid-cols-12 gap-4'>
                <label className='text-sm  col-span-12 col-start-3'>3.2 ประวัติการดื่มแอลกอฮอล์</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'></div>
              </div>
              <div className='flex lg:flex-row flex-col col-start-3 items-start lg:items-center gap-4 col-span-12'>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "ไม่ดื่ม"} onChange={() => handleChangePatientHistory({ Alcohol: "ไม่ดื่ม" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcohol1" name="alcohol" value="" />
                  <label htmlFor='alcohol1' className=''>ไม่ดื่ม</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "ดื่ม"} onChange={() => handleChangePatientHistory({ Alcohol: "ดื่ม" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcohol2" name="alcohol" value="" />
                  <label htmlFor='alcohol2' className=''>ดื่ม</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "ไม่มีข้อมูล"} onChange={() => handleChangePatientHistory({ Alcohol: "ไม่มีข้อมูล" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcohol3" name="alcohol" value="" />
                  <label htmlFor='alcohol3' className=''>ไม่มีข้อมูล</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "เลิกดื่ม"} onChange={() => handleChangePatientHistory({ Alcohol: "เลิกดื่ม" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcohol4" name="alcohol" value="" />
                  <label htmlFor='alcohol4' className=''>เลิกดื่ม</label>
                  <div className='relative flex col-span-4 items-center gap-2 whitespace-nowrap'>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.AlcoholYears || ''} onChange={(AlcoholYears) => handleChangePatientHistory({ AlcoholYears: AlcoholYears?.target.value })} label="" variant="outlined" />
                    <label className=''>ปี</label>
                  </div>
                  <div className='relative flex col-span-4 items-center gap-2 whitespace-nowrap'>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.AlcoholVolume || ''} onChange={(AlcoholVolume) => handleChangePatientHistory({ AlcoholVolume: AlcoholVolume?.target.value })} label="" variant="outlined" />
                    <label className=''>เดือน</label>
                  </div>
                </div>
              </div>

              <div className='flex lg:flex-row flex-col col-start-3 items-start lg:items-center gap-4 col-span-12'>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "เคยแต่เลิกดื่มแล้ว ระยะที่เคยดื่มนาน"} onChange={() => handleChangePatientHistory({ Alcohol: "เคยแต่เลิกดื่มแล้ว ระยะที่เคยดื่มนาน" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcoholv2_1" name="alcoholv2" value="" />
                  <label htmlFor='alcoholv2_1' className=''>เคยแต่เลิกดื่มแล้ว ระยะที่เคยดื่มนาน</label>
                  <div className='relative flex col-span-4 gap-2  items-center'>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.AlcoholicDrinkYear || ''} onChange={(AlcoholicDrinkYear) => handleChangePatientHistory({ AlcoholicDrinkYear: AlcoholicDrinkYear?.target.value })} label="" variant="outlined" />
                    <label>ปี</label>
                  </div>
                  <div className='relative flex col-span-4 gap-2 items-center'>
                    <TextField size='small' className='text-white w-20 bg-[#FFFFFF]' value={formPatientHistory?.AlcoholicDrinkMonth || ''} onChange={(AlcoholicDrinkMonth) => handleChangePatientHistory({ AlcoholicDrinkMonth: AlcoholicDrinkMonth?.target.value })} label="" variant="outlined" />
                    <label>เดือน</label>
                  </div>
                </div>

              </div>

              <div className='flex lg:flex-row flex-col col-start-3 items-start lg:items-center gap-4 col-span-12'>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "ดื่ม 1 ครั้ง/สัปดาห์"} onChange={() => handleChangePatientHistory({ Alcohol: "ดื่ม 1 ครั้ง/สัปดาห์" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcoholV3_1" name="alcoholV3" value="" />
                  <label htmlFor='alcoholV3_1' className=''>ดื่ม 1 ครั้ง/สัปดาห์</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "ดื่ม 2-3 ครั้ง/สัปดาห์"} onChange={() => handleChangePatientHistory({ Alcohol: "ดื่ม 2-3 ครั้ง/สัปดาห์" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcoholV3_2" name="alcoholV3" value="" />
                  <label htmlFor='alcoholV3_2' className=''>ดื่ม 2-3 ครั้ง/สัปดาห์</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "ดื่มมากกว่า 3 ครั้ง/สัปดาห์"} onChange={() => handleChangePatientHistory({ Alcohol: "ดื่มมากกว่า 3 ครั้ง/สัปดาห์" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcoholV3_3" name="alcoholV3" value="" />
                  <label htmlFor='alcoholV3_3' className=''>ดื่มมากกว่า 3 ครั้ง/สัปดาห์</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Alcohol === "บางครั้ง"} onChange={() => handleChangePatientHistory({ Alcohol: "บางครั้ง" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="alcoholV3_4" name="alcoholV3" value="" />
                  <label htmlFor='alcoholV3_4' className=''>บางครั้ง</label>
                </div>

              </div>


            </div>

            {/*3.3 ประวัติการออกกำลังกาย */}
            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='col-span-4 grid grid-cols-12 gap-4'>
                <label className='text-sm  col-span-12 col-start-3'>3.3 ประวัติการออกกำลังกาย</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'></div>
              </div>
              <div className='flex lg:flex-row flex-col col-start-3 items-start lg:items-center gap-4 col-span-12'>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Exercise === "ไม่เคย"} onChange={() => handleChangePatientHistory({ Exercise: "ไม่เคย" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="exercise1" name="exercise" value="" />
                  <label htmlFor='exercise1' className=''>ไม่เคย</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Exercise === "เป็นครั้งคราว"} onChange={() => handleChangePatientHistory({ Exercise: "เป็นครั้งคราว" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="exercise2" name="exercise" value="" />
                  <label htmlFor='exercise2' className=''>เป็นครั้งคราว</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input checked={formPatientHistory.Exercise === "สม่ำเสมอ"} onChange={() => handleChangePatientHistory({ Exercise: "สม่ำเสมอ" })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="exercise3" name="exercise" value="" />
                  <label htmlFor='exercise3' className=''>สม่ำเสมอ</label>
                  <div className='relative flex col-span-4 items-center ga  gap-4 whitespace-nowrap'>
                    <label>ระบุ</label>
                    <TextField size='small' className='text-white  bg-[#FFFFFF]' value={formPatientHistory?.ExerciseType || ''} onChange={(ExerciseType) => handleChangePatientHistory({ ExerciseType: ExerciseType?.target.value })} label="" variant="outlined" />
                  </div>
                </div>
              </div>
            </div>

            {/*3.4 อาชีพ/ลักษณะงาน */}
            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='col-span-4 grid grid-cols-12 gap-4'>
                <label className='text-sm  col-span-12 col-start-3'>3.4 อาชีพ/ลักษณะงาน</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'></div>
              </div>
              <div className='flex lg:flex-row flex-col col-start-3 items-start lg:items-center gap-4 col-span-12'>
                <div className='relative flex w-full items-center ga  gap-4 whitespace-nowrap'>
                  <label>ระบุ</label>
                  <TextField size='small' className='text-white w-3/5  bg-[#FFFFFF]' value={formPatientHistory?.SpecialCheckByJobDesc || ''} onChange={(SpecialCheckByJobDesc) => handleChangePatientHistory({ SpecialCheckByJobDesc: SpecialCheckByJobDesc?.target.value })} label="" variant="outlined" />
                </div>
              </div>
            </div>
          </div>

          <div className='border-b-2 border-[#E2E2E2] col-span-12 my-4'></div>
          {/*4. ประวัติครอบครัว (Family History) */}
          <div className='grid grid-cols-12 col-span-12 items-end gap-2 text-base font-light'>
            <label className='col-span-12 '>4. ประวัติครอบครัว (Family History)</label>
            {/* 4.1 ประวัติการเจ็บป่วยในครอบครัว */}
            <div className='col-span-12 gap-2 grid grid-cols-12 '>
              <div className='col-span-4 grid grid-cols-12 gap-4'>
                <label className='text-sm  col-span-12 col-start-3 whitespace-nowrap'>4.1 ประวัติการเจ็บป่วยในครอบครัว</label>
                <div className='flex justify-start items-center gap-4 col-span-12 col-start-6'></div>
              </div>
              <div className='grid grid-cols-12 col-start-2 lg:col-start-2 items-start gap-4  col-span-12'>
                <div className='col-span-6 lg:col-span-2 flex flex-col gap-2'>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyHistoryCheckbox('บิดา')} onChange={(e) => onChangeFamilyHistoryCheckbox('บิดา')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness1" name="family-history-of-illness" value={familyhistory || ''} />
                    <label htmlFor='family-history-of-illness1' className=''>บิดา</label>
                  </div>

                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyHistoryCheckbox('มารดา')} onChange={(e) => onChangeFamilyHistoryCheckbox('มารดา')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness2" name="family-history-of-illness" value={familyhistory || ''} />
                    <label htmlFor='family-history-of-illness2' className=''>มารดา</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyHistoryCheckbox('ปู่')} onChange={(e) => onChangeFamilyHistoryCheckbox('ปู่')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness3" name="family-history-of-illness" value={familyhistory || ''} />
                    <label htmlFor='family-history-of-illness3' className=''>ปู่</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyHistoryCheckbox('ย่า')} onChange={(e) => onChangeFamilyHistoryCheckbox('ย่า')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness4" name="family-history-of-illness" value={familyhistory || ''} />
                    <label htmlFor='family-history-of-illness4' className=''>ย่า</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyHistoryCheckbox('ตา')} onChange={(e) => onChangeFamilyHistoryCheckbox('ตา')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness5" name="family-history-of-illness" value={familyhistory || ''} />
                    <label htmlFor='family-history-of-illness5' className=''>ตา</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyHistoryCheckbox('ยาย')} onChange={(e) => onChangeFamilyHistoryCheckbox('ยาย')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness6" name="family-history-of-illness" value={familyhistory || ''} />
                    <label htmlFor='family-history-of-illness6' className=''>ยาย</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyHistoryCheckbox('พี่สาว, น้องสาว')} onChange={(e) => onChangeFamilyHistoryCheckbox('พี่สาว, น้องสาว')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness7" name="family-history-of-illness" value={familyhistory || ''} />
                    <label htmlFor='family-history-of-illness7' className=''>พี่สาว, น้องสาว</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyHistoryCheckbox('พี่ชาย, น้องชาย')} onChange={(e) => onChangeFamilyHistoryCheckbox('พี่ชาย, น้องชาย')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness8" name="family-history-of-illness" value={familyhistory || ''} />
                    <label htmlFor='family-history-of-illness8' className=''>พี่ชาย, น้องชาย</label>
                  </div>

                </div>

                <div className='col-span-6 lg:col-span-2 flex flex-col gap-2'>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('โรคเบาหวาน')} onChange={(e) => onChangeFamilyIllnessCheckbox('โรคเบาหวาน')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="family-history-of-illness-disease1" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease1' className=''>โรคเบาหวาน</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('โรคไขมันในเลือดสูง')} onChange={(e) => onChangeFamilyIllnessCheckbox('โรคไขมันในเลือดสูง')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="family-history-of-illness-disease2" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease2' className=''>โรคไขมันในเลือดสูง</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('โรคความดันโลหิตสูง')} onChange={(e) => onChangeFamilyIllnessCheckbox('โรคความดันโลหิตสูง')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="family-history-of-illness-disease3" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease3' className=''>โรคความดันโลหิตสูง</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('วัณโรค')} onChange={(e) => onChangeFamilyIllnessCheckbox('วัณโรค')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="family-history-of-illness-disease4" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease4' className=''>วัณโรค</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('โรคไวรัสตับอักเสบ')} onChange={(e) => onChangeFamilyIllnessCheckbox('โรคไวรัสตับอักเสบ')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="family-history-of-illness-disease5" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease5' className=''>โรคไวรัสตับอักเสบ</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('โรคหัวใจ')} onChange={(e) => onChangeFamilyIllnessCheckbox('โรคหัวใจ')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness-disease6" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease6' className=''>โรคหัวใจ</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('โรคโลหิตจาง')} onChange={(e) => onChangeFamilyIllnessCheckbox('โรคโลหิตจาง')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="family-history-of-illness-disease7" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease7' className=''>โรคโลหิตจาง</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('โรคมะเร็ง')} onChange={(e) => onChangeFamilyIllnessCheckbox('โรคมะเร็ง')} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="checkbox" id="family-history-of-illness-disease8" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease8' className=''>โรคมะเร็ง</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('โรคภูมิแพ้')} onChange={(e) => onChangeFamilyIllnessCheckbox('โรคภูมิแพ้')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness-disease9" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease9' className=''>โรคภูมิแพ้</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('ไม่มีโรคประจำตัว')} onChange={(e) => onChangeFamilyIllnessCheckbox('ไม่มีโรคประจำตัว')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness-disease10" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease10' className=''>ไม่มีโรคประจำตัว</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input checked={isCheckedFamilyIllnessCheckbox('ไม่มีข้อมูล')} onChange={(e) => onChangeFamilyIllnessCheckbox('ไม่มีข้อมูล')} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="family-history-of-illness-disease11" name="family-history-of-illness-disease" value="" />
                    <label htmlFor='family-history-of-illness-disease11' className=''>ไม่มีข้อมูล</label>
                  </div>

                </div>

                <div className='col-span-2 lg:col-span-1 flex flex-col gap-2'>
                  <div className='flex gap-2 items-center'>
                    <button onClick={() => onSelect()} className='h-10 w-full  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เลือก</button>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <button className='h-10 w-full  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >ENG</button>
                  </div>
                  {/* <div className='flex gap-2 items-center'>
                    <button className='h-10 w-full  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >JP</button>
                  </div> */}
                </div>

                <div className='col-span-9 lg:col-span-6 flex flex-col gap-2'>
                  <TextareaAutosize minRows={5} maxRows={6} value={formPatientHistory?.FamilyHistoryOtherDetail || ''} onChange={(FamilyHistoryOtherDetail) => handleChangeHistory({ FamilyHistoryOtherDetail: FamilyHistoryOtherDetail?.target?.value })} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

          </div>

          <div className='border-b-2 border-[#E2E2E2] col-span-12 my-4'></div>

          <div className='flex justify-center items-center gap-4 col-span-12 whitespace-nowrap'>
            <label>ลงชื่อผู้คัดกรอง</label>
            <TextField size='small' className='text-white w-[50%] bg-[#FFFFFF]' value={formPatientHistory?.UserSign || ''} onChange={(UserSign) => handleChangePatientHistory({ UserSign: UserSign?.target.value })} label="" variant="outlined" />
          </div>

          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button onClick={() => onClearPatientHistory()} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
              </div>
            </button>
            <button onClick={() => onSavePatientHistory()} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center cursor-pointer items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <labe className={'cursor-pointer'}>บันทึก</labe>
              </div>
            </button>
          </div>

        </div>
        <div className='w-full flex justify-end mt-4'>
          <div className='w-[50%] flex gap-2 items-center'>
            <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="ลงชื่อผู้คัดกรอง" variant="outlined" />
            <div className='bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
            </div>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default VitalSignDocterresult