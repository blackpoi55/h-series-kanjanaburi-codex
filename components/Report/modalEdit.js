'use client'
import { InputAdornment, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import ModalComponent from '../Modal/Modal'
import { updatePatientReport } from '@/action/api'
import { saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

export const ModalReportEdit = (props) => {
    const { data, setWait, refresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    const header = [{ value: '51', label: 'โลหิตวิทยา(Hematology)' },
    { value: '52', label: 'ระดับน้ำตาลในเลือด (Blood Sugar)' },
    { value: '54', label: 'การทำงานของไต (Kidney Function Test)' },
    { value: '56', label: 'การทำงานของตับ (Liver Function Test)' },
    { value: '53', label: 'ผลการตรวจระดับไขมันในเลือด (Lipid Profile)' },
    { value: '55"', label: 'ผลการตรวจระดับกรดยูริกในเลือด (Uric acid Test)' },
    { value: '59', label: 'การวิเคราะห์ปัสสาวะ (Urine Analysis)' },
    { value: '99', label: 'ผลการตรวจทางพิษวิทยา (Toxicology)' },
    { value: '57', label: 'ผลการตรวจสารบ่งชี้มะเร็ง (Tumor marker)' },
    ]

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onChange = (update, name, key) => {
        setForm((p) => {
            const dataupdata = { ...p[key] }
            dataupdata[name] = update[name]
            return { ...p, [key]: dataupdata }
        })
    }

    const onChangeArrlabs = (update, Rpt_Group, sq, name) => {
        const indexlab = form?.trLabs?.length > 0 && form?.trLabs.findIndex((item) => (item?.msLabCode?.Rpt_Group === Rpt_Group && item?.msLabCode?.sq === sq))
        if (indexlab !== -1) {
            const updatedLabs = [...form.trLabs];
            updatedLabs[indexlab] = {
                ...updatedLabs[indexlab], // คัดลอกรายการเดิม
                ...update                 // รวมกับค่าที่อัปเดต
            };
            setForm((p) => ({
                ...p, trLabs: updatedLabs
            }))
        }
    }

    const onChangeArrXray = (update, index) => {
        const updatedXray = [...form.trXrayFromSSBs];
        updatedXray[index] = { ...updatedXray[index], ...update }
        setForm((p) => ({
            ...p, trXrayFromSSBs: updatedXray
        }))
    }

    const onSave = () => {
        saveAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: async () => {
                try {
                    setWait(true)
                    if (form?.UID) {
                        const res = await updatePatientReport(form)
                        if (!res?.error) {
                            succeedAlert()
                            onClose()
                        } else {
                            console.log('res error', res?.error)
                        }
                    }
                } catch (error) {
                    console.error('An error occurred while onSave:', error)
                } finally {
                    setWait(false)
                }
            }
        })
    }
    const onClose = () => {
        refresh()
        props.onClose()
    }

    const isChecked = (item) => {
        return item === 'A'
    }

    const isCheckedAll = (Group) => {
        return form?.trLabs?.filter((fil) => fil.msLabCode?.Rpt_Group === Group)?.length > 0 && form?.trLabs?.filter((fil) => fil.msLabCode?.Rpt_Group === Group)?.every((item) => item?.StatusFlag === 'A')
    }

    const onCheckboxAll = (Group) => {
        const datafilter = form?.trLabs?.length > 0 ? form?.trLabs?.filter((fil) => fil.msLabCode?.Rpt_Group === Group) : []

        if (datafilter?.length > 0 && datafilter.every((item) => item?.StatusFlag === 'A')) {
            const dataLabs = [...form?.trLabs].map((d) => {
                if (d?.msLabCode?.Rpt_Group === Group) {
                    return { ...d, ...{ StatusFlag: 'N' } }
                } else {
                    return d
                }
            })
            setForm((p) => ({ ...p, trLabs: dataLabs }))
        } else {
            const dataLabs = [...form?.trLabs].map((d) => {
                if (d?.msLabCode?.Rpt_Group === Group) {
                    return { ...d, ...{ StatusFlag: 'A' } }
                } else {
                    return d
                }
            })

            setForm((p) => ({ ...p, trLabs: dataLabs }))
        }
    }

    return (
        <ModalComponent onCancel={() => props.onClose()} onSave={() => onSave()} headname={`แก้ไขข้อมูล Report`} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[90%]  h-[90%] '}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid grid-cols-12 w-full gap-4 justify-start items-start rounded-2xl bg-[#F8F8F8] shadow-box p-4 mt-2'>
                    <div className='flex text-[#365382] justify-between col-span-12 '>
                        <label className='font-semibold'>VitalSign</label>
                    </div>
                    <div className='flex flex-col gap-1 col-span-6'>
                        <p className='text-sm text-[#365382]'>BMI Detail </p>
                        <TextareaAutosize minRows={5} maxRows={5} value={form?.trVitalSign?.BMIDetail || ''} onChange={(BMIDetail) => onChange({ BMIDetail: BMIDetail?.target.value }, 'BMIDetail', 'trVitalSign')} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
                    </div>
                    <div className='flex flex-col gap-1 col-span-6'>
                        <p className='text-sm text-[#365382]'>Blood Pressure Detail</p>
                        <TextareaAutosize minRows={5} maxRows={5} value={form?.trVitalSign?.BPDetail || ''} onChange={(BPDetail) => onChange({ BPDetail: BPDetail?.target.value }, 'BPDetail', 'trVitalSign')} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
                    </div>
                    <div className='flex flex-col gap-1 col-span-6'>
                        <p className='text-sm text-[#365382]'>ชีพจร (Pulse rate) Detail</p>
                        <TextareaAutosize minRows={5} maxRows={5} value={form?.trVitalSign?.PulseDetail || ''} onChange={(PulseDetail) => onChange({ PulseDetail: PulseDetail?.target.value }, 'PulseDetail', 'trVitalSign')} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
                    </div>
                    <div className='flex flex-col gap-1 col-span-6'>
                        <p className='text-sm text-[#365382]'>รอบเอว</p>
                        <TextareaAutosize minRows={5} maxRows={5} value={form?.trVitalSign?.WaistDetail || ''} onChange={(WaistDetail) => onChange({ WaistDetail: WaistDetail?.target.value }, 'WaistDetail', 'trVitalSign')} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
                    </div>
                    <div className='flex flex-col gap-1 col-span-6'>
                        <p className='text-sm text-[#365382]'>ผลตรวจร่างกาย (Physical Examination)</p>
                        <TextareaAutosize minRows={5} maxRows={5} value={form?.trEKG?.EKGDetail || ''} onChange={(EKGDetail) => onChange({ EKGDetail: EKGDetail?.target.value }, 'EKGDetail', 'trEKG')} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
                    </div>
                </div>

                {header?.map((f, index) => {
                    if (form?.trLabs?.length > 0 && form?.trLabs?.find((d) => d.msLabCode?.Rpt_Group === f?.value))
                        return <div key={`${f?.value}${index}`} className='grid grid-cols-12 w-full gap-4 justify-start items-start rounded-2xl bg-[#F8F8F8] shadow-box p-4 mt-2'>
                            <div className='  grid grid-cols-12 col-span-12 '>
                                <label className='font-semibold text-[#365382] col-span-12 mb-4 w-full text-left'>{f?.label}</label>
                                <div className='flex col-span-3 gap-4 items-end  '>
                                    <input readOnly checked={isCheckedAll(f?.value)} onClick={() => onCheckboxAll(f?.value)} type="checkbox" className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' id={`${f?.label}${index}`} name={f?.label} />
                                    <label className='font-semibold w-full text-center'>รายการตรวจ</label>
                                </div>
                                <label className='font-semibold col-span-2 text-center'>ผลตรวจ(Result)</label>
                                <label className='font-semibold col-span-2 text-center'>ค่าปกติ (Normal Value)</label>
                                <label className='font-semibold col-span-5 text-center'>Translate Result</label>
                            </div>
                            {form?.trLabs?.length > 0 && form?.trLabs?.filter((fil) => fil.msLabCode?.Rpt_Group === f?.value).sort((a, b) => a?.msLabCode?.sq - b?.msLabCode?.sq)?.map((item, index2) => (
                                <div key={`${f?.value}${index}${index2}`} className='grid grid-cols-12 col-span-12 gap-2'>
                                    <div className='flex col-span-3 gap-4 items-center '>
                                        <input readOnly checked={isChecked(item?.StatusFlag)} onChange={(e) => onChangeArrlabs({ StatusFlag: e?.target.checked ? 'A' : 'N' }, f.value, item?.msLabCode?.sq, 'StatusFlag')} type="checkbox" className='w-4 h-4 min-w-4 min-h-4 accent-[#365382]' id={`${f}${index2}`} name={f} />
                                        <TextField disabled size='small' className='text-white w-full bg-[#FFFFFF]' value={item?.ItemDesc || ''} variant="outlined" />
                                    </div>
                                    <TextField disabled size='small' className='text-white col-span-2 bg-[#FFFFFF]' value={item?.TestData || ''} onChange={(TestData) => onChangeArrlabs({ TestData: TestData?.target.value }, f.value, item?.msLabCode?.sq, 'TestData')} variant="outlined" />
                                    <TextField size='small' className='text-white col-span-2 bg-[#FFFFFF]' value={item?.LabRange || ''} onChange={(LabRange) => onChangeArrlabs({ LabRange: LabRange?.target.value }, f.value, item?.msLabCode?.sq, 'LabRange')} variant="outlined" InputProps={{ endAdornment: <InputAdornment position="end">{item?.msLabCode?.Unit || ''}</InputAdornment> }} />
                                    <TextField size='small' className='text-white col-span-5 bg-[#FFFFFF]' value={item?.TranslateResult || ''} onChange={(TranslateResult) => onChangeArrlabs({ TranslateResult: TranslateResult?.target.value }, f.value, item?.msLabCode?.sq, 'TranslateResult')} variant="outlined" />
                                </div>
                            ))}

                        </div>
                })}

                <div className='grid grid-cols-12 w-full gap-4 justify-start items-start rounded-2xl bg-[#F8F8F8] shadow-box p-4 mt-2'>
                    <div className='flex text-[#365382] justify-between col-span-12 '>
                        <label className='font-semibold'>เอกซเรย์ทรวงอก (Chest X-ray)</label>
                    </div>
                    {form?.trXrayFromSSBs?.length > 0 && form?.trXrayFromSSBs.map((d, i) => (
                        <div key={`trXrayFromSSBs${i}`} className='flex flex-col gap-1 col-span-6'>
                            <p className='text-sm text-[#365382]'>{d?.Description || ''}</p>
                            <TextareaAutosize minRows={5} maxRows={5} value={d?.HSeriesResultDetail || ''} onChange={(HSeriesResultDetail) => onChangeArrXray({ HSeriesResultDetail: HSeriesResultDetail?.target.value }, i)} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-12 w-full gap-4 justify-start items-start rounded-2xl bg-[#F8F8F8] shadow-box p-4 mt-2'>
                    <div className='flex text-[#365382] justify-between col-span-12 '>
                        <label className='font-semibold'>สรุปผลการตรวจ และคำแนะนำเพิ่มเติม (Additional Conclusion and Recommendation)</label>
                    </div>
                    <div className='flex flex-col gap-1 col-span-12'>
                        <p className='text-sm text-[#365382]'>Recommendation</p>
                        <TextareaAutosize minRows={5} maxRows={5} value={form?.trPhysicalExamination?.recommendation || ''} onChange={(recommendation) => onChange({ recommendation: recommendation?.target.value }, 'recommendation', 'trPhysicalExamination')} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
                    </div>
                </div>
            </div>
        </ModalComponent >
    )
}


