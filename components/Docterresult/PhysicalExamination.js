'use client'
import { Collapse, InputAdornment, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { MetaInitialAll, MetaPhysicalBlood } from '../Tool/var'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addPhysicalexam, getPhysicalexamById, updatePhysicalexam } from '@/action/api'
import { saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function PhysicalExamination({ activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  const [list, setList] = useState([])
  const [switchStaus, setSwitchStaus] = useState(null)
  const [additionalresults, setAdditionaResults] = useState(false)

  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  const refresh = async () => {
    try {
      startLoading()
      const res = await getPhysicalexamById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || {})
        if (res?.data === null) {
          onActiveTap('physical_examination', false)
        }
      } else {
        console.log('error', res?.error)
        onActiveTap('physical_examination', false)
      }

    } catch (err) {
      console.error('An error occurred while refreshing data:', err)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    setSwitchStaus(activeTap?.physical_examination)
  }, [activeTap?.physical_examination])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('physical_examination', update.target.checked)
  }

  const handleChange = (update) => {
    if (update?.hasOwnProperty('input1')) {
      update.Textarea1 = update?.input1
    } else if (update?.hasOwnProperty('skin')) {
      update.Textarea2 = update?.skin
    } else if (update?.hasOwnProperty('eyes')) {
      update.Textarea3 = update?.eyes
    } else if (update?.hasOwnProperty('ears')) {
      update.Textarea4 = update?.ears
    } else if (update?.hasOwnProperty('neck')) {
      update.Textarea5 = update?.neck
    } else if (update?.hasOwnProperty('nose')) {
      update.Textarea6 = update?.nose
    } else if (update?.hasOwnProperty('heart')) {
      update.Textarea7 = update?.heart
    } else if (update?.hasOwnProperty('lung')) {
      update.Textarea8 = update?.lung
    } else if (update?.hasOwnProperty('abdomen')) {
      update.Textarea9 = update?.abdomen
    } else if (update?.hasOwnProperty('extremities')) {
      update.Textarea10 = update?.extremities
    } else if (update?.hasOwnProperty('lymph')) {
      update.Textarea11 = update?.lymph
    } else if (update?.hasOwnProperty('neuro')) {
      update.Textarea12 = update?.neuro
    } else if (update?.hasOwnProperty('breasts')) {
      update.Textarea13 = update?.breasts
    } else if (update?.hasOwnProperty('Other')) {
      update.Textarea14 = update?.Other
    } else if (update?.hasOwnProperty('OtoscopicExam')) {
      update.TextareaAdditional1 = update?.OtoscopicExam
    } else if (update?.hasOwnProperty('Thyroidgland')) {
      update.TextareaAdditional2 = update?.Thyroidgland
    } else if (update?.hasOwnProperty('hernia')) {
      update.TextareaAdditional3 = update?.hernia
    } else if (update?.hasOwnProperty('Externalgenitalia')) {
      update.TextareaAdditional4 = update?.Externalgenitalia
    } else if (update?.hasOwnProperty('Rectalexamination')) {
      update.TextareaAdditional5 = update?.Rectalexamination
    } else if (update?.hasOwnProperty('Locomotor')) {
      update.TextareaAdditional6 = update?.Locomotor
    } else if (update?.hasOwnProperty('Reflexes')) {
      update.TextareaAdditional7 = update?.Reflexes
    } else if (update?.hasOwnProperty('Lymph_node')) {
      update.TextareaAdditional8 = update?.Lymph_node
    } else if (update?.hasOwnProperty('OtherTest')) {
      update.TextareaAdditional9 = update?.OtherTest
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
            chife_complain: null,
            head: null,
            eyes: null,
            ears: null,
            nose: null,
            oralcav: null,
            neck: null,
            chest: null,
            breasts: null,
            lung: null,
            heart: null,
            rhythm: null,
            sound: null,
            abdomen: null,
            gastrointestinal: null,
            liver: null,
            spleen: null,
            hernia: null,
            anus: null,
            spine: null,
            extremities: null,
            skin: null,
            lymph: null,
            neuro: null,
            conclusion: null,
            recommendation: null,
            medication: null,
            followup: null,
            Other: null,
            NoPE: null,
            PEResult: null,
            conclusionEN: null,
            Editconclusion: null,
            OtherTest: null,
            OtherTestEn: null,
            recommendationEn: null,
            medicationEn: null,
            DoctorComplete: null,
            Respiratory: null,
            UrinReproductive: null,
            Mental: null,
            LockConclusion: null,
            OtoscopicExam: null,
            Thyroidgland: null,
            Externalgenitalia: null,
            Rectalexamination: null,
            Locomotor: null,
            Reflexes: null,
            Vertebrae: null,
            Additional: null,
            OtherExam: null,
            Fit_Not: null,
            HIV: null,
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
          trPatientUID: form?.trPatientUID || null,
          chife_complain: form?.chife_complain || null,
          head: form?.head || null,
          eyes: form?.eyes || null,
          ears: form?.ears || null,
          nose: form?.nose || null,
          oralcav: form?.oralcav || null,
          neck: form?.neck || null,
          chest: form?.chest || null,
          breasts: form?.breasts || null,
          lung: form?.lung || null,
          heart: form?.heart || null,
          rhythm: form?.rhythm || null,
          sound: form?.sound || null,
          abdomen: form?.abdomen || null,
          gastrointestinal: form?.gastrointestinal || null,
          liver: form?.liver || null,
          spleen: form?.spleen || null,
          hernia: form?.hernia || null,
          anus: form?.anus || null,
          spine: form?.spine || null,
          extremities: form?.extremities || null,
          skin: form?.skin || null,
          lymph: form?.lymph || null,
          neuro: form?.neuro || null,
          conclusion: form?.conclusion || null,
          recommendation: form?.recommendation || null,
          medication: form?.medication || null,
          followup: form?.followup || null,
          userid: form?.userid || null,
          followup_date: form?.followup_date || null,
          cwhen: form?.cwhen || null,
          mwhen: form?.mwhen || null,
          Other: form?.Other || null,
          NoPE: form?.NoPE || null,
          PEResult: form?.PEResult || null,
          conclusionEN: form?.conclusionEN || null,
          Editconclusion: form?.Editconclusion || null,
          OtherTest: form?.OtherTest || null,
          OtherTestEn: form?.OtherTestEn || null,
          recommendationEn: form?.recommendationEn || null,
          medicationEn: form?.medicationEn || null,
          DoctorComplete: form?.DoctorComplete || null,
          Respiratory: form?.Respiratory || null,
          UrinReproductive: form?.UrinReproductive || null,
          Mental: form?.Mental || null,
          LockConclusion: form?.LockConclusion || null,
          OtoscopicExam: form?.OtoscopicExam || null,
          Thyroidgland: form?.Thyroidgland || null,
          Externalgenitalia: form?.Externalgenitalia || null,
          Rectalexamination: form?.Rectalexamination || null,
          Locomotor: form?.Locomotor || null,
          Reflexes: form?.Reflexes || null,
          Vertebrae: form?.Vertebrae || null,
          Additional: form?.Additional || null,
          OtherExam: form?.OtherExam || null,
          Fit_Not: form?.Fit_Not || null,
          HIV: form?.HIV || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const res = await updatePhysicalexam(UID, saveData)
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
  const chackAllClick = () => {
    const updatedForm = { ...form };
  
    // อัปเดตฟิลด์ Textarea1 ถึง Textarea14
    for (let i = 1; i <= 14; i++) {
      updatedForm[`Textarea${i}`] = 'ปกติ';
    }
  
    // อัปเดตฟิลด์ input1 และอื่นๆ ที่กำหนดชื่อเฉพาะ
    const specificFields = [
      'input1', 'skin', 'eyes', 'ears', 'neck', 'nose', 'heart',
      'lung', 'abdomen', 'extremities', 'lymph', 'neuro', 'breasts', 'Other',
    ];
    specificFields.forEach(field => {
      updatedForm[field] = 'ปกติ';
    });
  
    setForm(updatedForm);
  };
  

  return (
    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='physical_examination' className='font-semibold text-[#365382]'>Physical Examination</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className=' w-full  grid grid-cols-12 gap-4   p-4'>
          <div className='flex gap-2 items-center col-span-12 ml-0 lg:ml-4' >
            <input className='w-4 h-4 accent-[#365382]' type="checkbox" id="patients-not-wait-doctor1" name="patients-not-wait-doctor" value="" />
            <label htmlFor='patients-not-wait-doctor1' className=''>คนไข้ไม่รอพบแพทย์ /แพทย์โทรแจ้งผล</label>
            <button onClick={() => chackAllClick()} className="p-2 rounded-lg bg-[#365382] text-white shadow-2xl">ปกติทั้งหมด</button>
          </div>

          <div className='col-span-12 ml-0 lg:ml-20 grid grid-cols-12 gap-2  '>
            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>1. ลักษณะทั่วไป</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.input1 === 'ปกติ' ? true : false} onChange={(e) => handleChange({ input1: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="general-characteristics1" name="general-characteristics" value="" />
                      <label htmlFor='general-characteristics1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.input1 === 'ผิดปกติ'} onChange={(e) => handleChange({ input1: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="general-characteristics2" name="general-characteristics" value="" />
                      <label htmlFor='general-characteristics2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.input1 === 'ปกติ'} value={form?.Textarea1 || ''} onChange={(e) => handleChange({ Textarea1: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>


            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>2. ผิวหนัง (Skin)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.skin === 'ปกติ'} onChange={(e) => handleChange({ skin: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Skin1" name="Skin" value="" />
                      <label htmlFor='Skin1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.skin === 'ผิดปกติ'} onChange={(e) => handleChange({ skin: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Skin2" name="Skin" value="" />
                      <label htmlFor='Skin2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.skin === 'ปกติ'} value={form?.Textarea2 || ''} onChange={(e) => handleChange({ Textarea2: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            {/* <div className='grid grid-cols-12 gap-4 col-span-12 items-end'>
              <div className='flex flex-col gap-4  col-span-2'>
                <label className=''>3. ตา หู คอ จมูก (Eyes Ears Neck Nose)</label>
                <div className='flex gap-4 w-full whitespace-nowrap pl-8'>
                  <div className='flex gap-2 items-center'>
                    <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Eyes-Ears-Neck-Nose1" name="Eyes-Ears-Neck-Nose" value="" />
                    <label htmlFor='Eyes-Ears-Neck-Nose1' className=''>ปกติ</label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Eyes-Ears-Neck-Nos2e" name="Eyes-Ears-Neck-Nose" value="" />
                    <label htmlFor='Eyes-Ears-Neck-Nose2' className=''>ผิดปกติ</label>
                  </div>
                </div>
              </div>
              <div className='col-span-10 flex gap-2 ml-4'>
                <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" />
                <TextareaAutosize minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
              </div>
            </div> */}

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>3. ตา  (Eyes )</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.eyes === 'ปกติ'} onChange={(e) => handleChange({ eyes: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Eyes1" name="Eyes" value="" />
                      <label htmlFor='Eyes1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.eyes === 'ผิดปกติ'} onChange={(e) => handleChange({ eyes: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Eyes2" name="Eyes" value="" />
                      <label htmlFor='Eyes2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.eyes === 'ปกติ'} value={form?.Textarea3 || ''} onChange={(e) => handleChange({ Textarea3: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>4.หู (Ears)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.ears === 'ปกติ'} onChange={(e) => handleChange({ ears: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Ears1" name="Ears" value="" />
                      <label htmlFor='Ears1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.ears === 'ผิดปกติ'} onChange={(e) => handleChange({ ears: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Ears2" name="Ears" value="" />
                      <label htmlFor='Ears2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.ears === 'ปกติ'} value={form?.Textarea4 || ''} onChange={(e) => handleChange({ Textarea4: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>5.คอ (Neck)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.neck === 'ปกติ'} onChange={(e) => handleChange({ neck: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Neck1" name="Neck" value="" />
                      <label htmlFor='Neck1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.neck === 'ผิดปกติ'} onChange={(e) => handleChange({ neck: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Neck2" name="Neck" value="" />
                      <label htmlFor='Neck2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.neck === 'ปกติ'} value={form?.Textarea5 || ''} onChange={(e) => handleChange({ Textarea5: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>6.จมูก (Nose)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.nose === 'ปกติ'} onChange={(e) => handleChange({ nose: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Nose1" name="Nose" value="" />
                      <label htmlFor='Nose1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.nose === 'ผิดปกติ'} onChange={(e) => handleChange({ nose: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Nose2" name="Nose" value="" />
                      <label htmlFor='Nose2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.nose === 'ปกติ'} value={form?.Textarea6 || ''} onChange={(e) => handleChange({ Textarea6: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>7. หัวใจ (Heart)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.heart === 'ปกติ'} onChange={(e) => handleChange({ heart: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="heart1" name="heart" value="" />
                      <label htmlFor='heart1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.heart === 'ผิดปกติ'} onChange={(e) => handleChange({ heart: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="heart2" name="heart" value="" />
                      <label htmlFor='heart2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.heart === 'ปกติ'} value={form?.Textarea7 || ''} onChange={(e) => handleChange({ Textarea7: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>8. ทรวงอก และปอด (Lung)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.lung === 'ปกติ'} onChange={(e) => handleChange({ lung: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="lung1" name="lung" value="" />
                      <label htmlFor='lung1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.lung === 'ผิดปกติ'} onChange={(e) => handleChange({ lung: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="lung2" name="lung" value="" />
                      <label htmlFor='lung2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.lung === 'ปกติ'} value={form?.Textarea8 || ''} onChange={(e) => handleChange({ Textarea8: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>9. ช่องท้อง (Abdomen)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.abdomen === 'ปกติ'} onChange={(e) => handleChange({ abdomen: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="abdomen1" name="abdomen" value="" />
                      <label htmlFor='abdomen1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.abdomen === 'ผิดปกติ'} onChange={(e) => handleChange({ abdomen: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="abdomen2" name="abdomen" value="" />
                      <label htmlFor='abdomen2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.abdomen === 'ปกติ'} value={form?.Textarea9 || ''} onChange={(e) => handleChange({ Textarea9: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>10. แขน-ขา (Limbs)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.extremities === 'ปกติ'} onChange={(e) => handleChange({ extremities: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="limbs1" name="limbs" value="" />
                      <label htmlFor='limbs1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.extremities === 'ผิดปกติ'} onChange={(e) => handleChange({ extremities: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="limbs2" name="limbs" value="" />
                      <label htmlFor='limbs2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.extremities === 'ปกติ'} value={form?.Textarea10 || ''} onChange={(e) => handleChange({ Textarea10: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>11. ต่อมน้ำเหลือง</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.lymph === 'ปกติ'} onChange={(e) => handleChange({ lymph: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="lymph-nodes1" name="lymph-nodes" value="" />
                      <label htmlFor='lymph-nodes1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.lymph === 'ผิดปกติ'} onChange={(e) => handleChange({ lymph: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="lymph-nodes2" name="lymph-nodes" value="" />
                      <label htmlFor='lymph-nodes2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.lymph === 'ปกติ'} value={form?.Textarea11 || ''} onChange={(e) => handleChange({ Textarea11: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>12. ระบบประสาท</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.neuro === 'ปกติ'} onChange={(e) => handleChange({ neuro: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="nervous-system1" name="nervous-system" value="" />
                      <label htmlFor='nervous-system1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.neuro === 'ผิดปกติ'} onChange={(e) => handleChange({ neuro: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="nervous-system2" name="nervous-system" value="" />
                      <label htmlFor='nervous-system2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.neuro === 'ปกติ'} value={form?.Textarea12 || ''} onChange={(e) => handleChange({ Textarea12: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>13. เต้านม (Breast)</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.breasts === 'ปกติ'} onChange={(e) => handleChange({ breasts: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="breast1" name="breast" value="" />
                      <label htmlFor='breast1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.breasts === 'ผิดปกติ'} onChange={(e) => handleChange({ breasts: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="breast2" name="breast" value="" />
                      <label htmlFor='breast2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.breasts === 'ปกติ'} value={form?.Textarea13 || ''} onChange={(e) => handleChange({ Textarea13: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
              <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                  <label className='whitespace-nowrap'>14. ผลการตรวจอื่นๆ</label>
                  <div className='flex gap-4 ml-0 lg:ml-8'>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.Other === 'ปกติ'} onChange={(e) => handleChange({ Other: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Other-results1" name="Other-results" value="" />
                      <label htmlFor='Other-results1' className=''>ปกติ</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <input checked={form?.Other === 'ผิดปกติ'} onChange={(e) => handleChange({ Other: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="Other-results2" name="Other-results" value="" />
                      <label htmlFor='Other-results2' className=''>ผิดปกติ</label>
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                  {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                  <TextareaAutosize disabled={form?.Other === 'ปกติ'} value={form?.Textarea14 || ''} onChange={(e) => handleChange({ Textarea14: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                </div>
              </div>
            </div>
          </div>

          <div className='border-b-2 border-[#E2E2E2] col-span-12 my-4'></div>

          <div className='col-span-12 flex justify-center items-start'>
            <div className='w-full lg:w-[80%] grid grid-cols-12 gap-4 '>
              <label className='col-span-3  text-base font-semibold'>สรุปผลการตรวจร่างกายโดยแพทย์</label>
              <div className='col-span-9 flex flex-col gap-4 '>
                <div className='relative flex w-fullml-1 bg-[#FFFFFF]'>
                  <Toolselect2 sm options={MetaPhysicalBlood || []} label={" "}  name={" "} value={form?.PEResult || ''} onChange={(PEResult) => handleChange({ PEResult })}></Toolselect2>
                </div>
                < div className='w-full flex   gap-2'>
                  <TextareaAutosize value={form?.PEResult || ''} onChange={(e) => handleChange({ PEResult: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2 " aria-label="" placeholder="" />
                </div>
              </div>
            </div>
          </div>


          <div className='col-span-12 ml-0 lg:ml-20 grid grid-cols-12 gap-4  '>
            <div className='col-span-12 flex justify-start whitespace-nowrap'>
              <button onClick={() => setAdditionaResults(!additionalresults)} className='h-10  w-64    border rounded-lg bg-[#FFFFFF] hover:bg-[#e4e4e4] text-[#365382]' >คลิกเพื่อลงผลการตรวจเพิ่ม</button>
            </div>
            <Collapse timeout={300} className="transition-all duration-500 col-span-12" in={additionalresults}>
              <div className='flex flex-col gap-4 '>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>1. Otoscopic</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.OtoscopicExam === 'ปกติ'} onChange={(e) => handleChange({ OtoscopicExam: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="otoscopic1" name="otoscopic" value="" />
                          <label htmlFor='otoscopic1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.OtoscopicExam === 'ผิดปกติ'} onChange={(e) => handleChange({ OtoscopicExam: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="otoscopic2" name="otoscopic" value="" />
                          <label htmlFor='otoscopic2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.OtoscopicExam === 'ปกติ'} value={form?.TextareaAdditional1 || ''} onChange={(e) => handleChange({ TextareaAdditional1: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>2. Thyroid gland</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Thyroidgland === 'ปกติ'} onChange={(e) => handleChange({ Thyroidgland: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="thyroid-gland1" name="thyroid-gland" value="" />
                          <label htmlFor='thyroid-gland1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Thyroidgland === 'ผิดปกติ'} onChange={(e) => handleChange({ Thyroidgland: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="thyroid-gland2" name="thyroid-gland" value="" />
                          <label htmlFor='thyroid-gland2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.Thyroidgland === 'ปกติ'} value={form?.TextareaAdditional2 || ''} onChange={(e) => handleChange({ TextareaAdditional2: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>3. Hernia</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.hernia === 'ปกติ'} onChange={(e) => handleChange({ hernia: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="hernia1" name="hernia" value="" />
                          <label htmlFor='hernia1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.hernia === 'ผิดปกติ'} onChange={(e) => handleChange({ hernia: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="hernia2" name="hernia" value="" />
                          <label htmlFor='hernia2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.hernia === 'ปกติ'} value={form?.TextareaAdditional3 || ''} onChange={(e) => handleChange({ TextareaAdditional3: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>4. External genitalia</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Externalgenitalia === 'ปกติ'} onChange={(e) => handleChange({ Externalgenitalia: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="external-genitalia1" name="external-genitalia" value="" />
                          <label htmlFor='external-genitalia1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Externalgenitalia === 'ผิดปกติ'} onChange={(e) => handleChange({ Externalgenitalia: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="external-genitalia2" name="external-genitalia" value="" />
                          <label htmlFor='external-genitalia2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.Externalgenitalia === 'ปกติ'} value={form?.TextareaAdditional4 || ''} onChange={(e) => handleChange({ TextareaAdditional4: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>5. Rectal examination</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Rectalexamination === 'ปกติ'} onChange={(e) => handleChange({ Rectalexamination: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="rectal-examination1" name="rectal-examination" value="" />
                          <label htmlFor='rectal-examination1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Rectalexamination === 'ผิดปกติ'} onChange={(e) => handleChange({ Rectalexamination: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="rectal-examination2" name="rectal-examination" value="" />
                          <label htmlFor='rectal-examination2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.Rectalexamination === 'ปกติ'} value={form?.TextareaAdditional5 || ''} onChange={(e) => handleChange({ TextareaAdditional5: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>6. Locomotor</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Locomotor === 'ปกติ'} onChange={(e) => handleChange({ Locomotor: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="locomotor1" name="locomotor" value="" />
                          <label htmlFor='locomotor1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Locomotor === 'ผิดปกติ'} onChange={(e) => handleChange({ Locomotor: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="locomotor2" name="locomotor" value="" />
                          <label htmlFor='locomotor2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.Locomotor === 'ปกติ'} value={form?.TextareaAdditional6 || ''} onChange={(e) => handleChange({ TextareaAdditional6: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>7. Reflexes</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Reflexes === 'ปกติ'} onChange={(e) => handleChange({ Reflexes: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="reflexes1" name="reflexes" value="" />
                          <label htmlFor='reflexes1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Reflexes === 'ผิดปกติ'} onChange={(e) => handleChange({ Reflexes: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="reflexes2" name="reflexes" value="" />
                          <label htmlFor='reflexes2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.Reflexes === 'ปกติ'} value={form?.TextareaAdditional7 || ''} onChange={(e) => handleChange({ TextareaAdditional7: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>8. Lymph node</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Lymph_node === 'ปกติ'} onChange={(e) => handleChange({ Lymph_node: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="lymph-nodes2_1" name="lymph-nodes2" value="" />
                          <label htmlFor='lymph-nodes2_1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.Lymph_node === 'ผิดปกติ'} onChange={(e) => handleChange({ Lymph_node: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="lymph-nodes2_2" name="lymph-nodes2" value="" />
                          <label htmlFor='lymph-nodes2_2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.Lymph_node === 'ปกติ'} value={form?.TextareaAdditional8 || ''} onChange={(e) => handleChange({ TextareaAdditional8: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12  gap-4 col-span-12 items-start '>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex lg:flex-col flex-row gap-4  whitespace-nowrap items-start'>
                      <label className='whitespace-nowrap'>9. Other</label>
                      <div className='flex gap-4 ml-0 lg:ml-8'>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.OtherTest === 'ปกติ'} onChange={(e) => handleChange({ OtherTest: 'ปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="OtherTest1" name="OtherTest" value="" />
                          <label htmlFor='OtherTest1' className=''>ปกติ</label>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <input checked={form?.OtherTest === 'ผิดปกติ'} onChange={(e) => handleChange({ OtherTest: 'ผิดปกติ' })} className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' type="radio" id="OtherTest2" name="OtherTest" value="" />
                          <label htmlFor='OtherTest2' className=''>ผิดปกติ</label>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex gap-2 ml-0 lg:ml-4 '>
                      {/* <TextField size='small' className='text-white w-[35%] bg-[#FFFFFF]' label="" variant="outlined" /> */}
                      <TextareaAutosize disabled={form?.OtherTest === 'ปกติ'} value={form?.TextareaAdditional9 || ''} onChange={(e) => handleChange({ TextareaAdditional9: e?.target?.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-4 col-span-12 items-start'>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex min-w-[190px] flex-col gap-4  col-span-2'>
                      <label className=' '>10. Additional Comments</label>
                    </div>
                    <div className='w-full flex flex-col gap-2 '>
                      <TextareaAutosize value={form?.Additional || ''} onChange={(e) => handleChange({ Additional: e?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-4 col-span-12 items-start'>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex min-w-[190px]  flex-col gap-4  col-span-2'>
                      <label className=''>11. Other Examination</label>
                    </div>
                    <div className='w-full flex flex-col gap-2 '>
                      <TextareaAutosize value={form?.OtherExam || ''} onChange={(e) => handleChange({ OtherExam: e?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-4 col-span-12 items-start'>
                  <div className='flex lg:flex-row flex-col col-span-12 gap-2'>
                    <div className='flex min-w-[190px]  flex-col gap-4  col-span-2'>
                      <label className=''>12. Fit/not fit for emplopyment</label>
                    </div>
                    <div className='w-full flex flex-col gap-2 '>
                      <TextareaAutosize value={form?.Fit_Not || ''} onChange={(e) => handleChange({ Fit_Not: e?.target.value })} minRows={2} maxRows={2} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>

          </div>
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
          </div>

          <div className='flex gap-4 col-span-12 justify-center items-center'>
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
          </div>
        </div>
      </Collapse >
    </div >
  )
}

export default PhysicalExamination