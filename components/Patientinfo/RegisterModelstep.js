'use client'
import { TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import ModalComponent from '../Modal/Modal'
import { addPatient, createPatientAndDetail, healthpackages, servicesandprices } from '@/action/api'
import { saveAlert, succeedAlert, warningAlert } from '../SweetAlert/sweetAlert'
import Tooldatepick from '../Tool/Tooldatepick'
import Toolselect2 from '../Tool/Toolselect2'
import { MetaGenderThais, MetaInitialAll, MetaMarital } from '../Tool/var'
import moment from 'moment'
import Step1 from './Stepregister/Step1'
import Step2 from './Stepregister/Step2'
import Step3 from './Stepregister/Step3'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

export const RegisterModelstep = (props) => {
    const { isModal, setWait, refresh } = props
    const [form, setForm] = useState({})
    const [formPackage, setFormPackage] = useState({})
    const [mainPackage, setmainPackage] = useState([])
    const [subPackage, setsubPackage] = useState([])
    const [formReport, setFormReport] = useState({})
    const [stepIndex, setStepIndex] = useState(0)
    const steps = ['ลงทะเบียน', 'เลือก Package', 'พิมพ์รายงาน']
    const currentStepLabel = steps[stepIndex]
    const christian_year = moment().utc().format('YYYY').substring(2)
    useEffect(() => {
        step1setdata()
        step2setdata()
        setStepIndex(0)
    }, [isModal])


    const onSave = () => {
        if (!(form?.HN.length === 12 && form?.EN.length === 13)) {
            warningAlert('กรุณากรอก HN และ EN ให้ครบถ้วน')
            return
        }
        saveAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: async () => {

                const saveData = {
                    HN: form?.HN || null,
                    EN: form?.EN || null,
                    DateRegisByLoad: form?.DateRegisByLoad || null,
                    Prename: form?.Prename || null,
                    Forename: form?.Forename || null,
                    Surname: form?.Surname || null,
                    Sex: form?.Sex || null,
                    Age: form?.Age || null,
                    MaritalStatus: form?.MaritalStatus || null,
                    DOB: form?.DOB || null,
                    Address: form?.Address || null,
                    Telephone: form?.Telephone || null,
                    Mobile: form?.Mobile || null,
                    Email: form?.Email || null,
                    CheckupDate: moment().utc().format()
                }
                try {
                    setWait(true)
                    console.log('saveData', saveData)
                    const res = await addPatient(saveData)
                    if (res) {
                        succeedAlert()
                        refresh()
                        props.onClose()
                    } else {
                        console.log('res error', res?.error)
                    }
                } catch (error) {
                    console.error('An error occurred while onSave:', error)
                } finally {
                    setWait(false)
                }
            }
        })

    }
    const step1setdata = () => {
        const d = {}
        d.HN = christian_year
        d.EN = `H${christian_year}`
        d.Address = ""
        d.Age = ""
        d.DOB = ""
        d.DateRegisByLoad = dayjs().format("YYYY-MM-DD")
        d.Email = ""
        d.Forename = ""
        d.MaritalStatus = ""
        d.Mobile = ""
        d.Prename = ""
        d.Sex = ""
        d.Surname = ""
        d.Telephone = ""
        setForm(d)
    }
    const step2setdata = async () => {
        let mainpackage = await healthpackages()
        setmainPackage(mainpackage?.data || [])
        let subpackage = await servicesandprices()
        setsubPackage(subpackage?.data || [])
        setFormPackage()
    }
    const nextStep = () => {
        if (stepIndex < steps.length - 1) setStepIndex(prev => prev + 1)
    }

    const backStep = () => {
        if (stepIndex > 0) setStepIndex(prev => prev - 1)
    }
    const SaveClick = async () => {
        console.log(form)
        console.log(formPackage)
        let packages = [...formPackage?.packageDetail]
        if (formPackage?.SelectedSubPackages && formPackage?.SelectedSubPackages.length > 0) {
            for (const element of formPackage?.SelectedSubPackages) {
                packages.push({
                    item_code: "",
                    item_name: "",
                    packagecode: element?.item_code || "",
                    packagenameth: element?.item_name || "",
                    quantity: 1,
                    serviceprice: element?.price || "0.00",
                    totalservicecost: element?.price || "0.00",
                    item_type: element?.item_type || ""
                })
            }

        }
        let val = {
            ...form,
            package: {
                mainpackagecode: formPackage.selectedPackageCode,
                mainpackagename: formPackage.selectedPackageName,
                mainpackageprice: formPackage.selectedPackagePrice,
                packageDetail: packages
            }
        }
        console.log("val", val)
        let data = await createPatientAndDetail(val)
        if (!data.error) {
            Swal.fire({
                icon: "success",
                title: "ลงทะเบียน",
                text: "สำเร็จ",
                showConfirmButton: false,
                timer: 3000, // ✅ ปิดอัตโนมัติใน 3 วิ
            });
            refresh()
            props.onClose()
        } else {
            Swal.fire({
                icon: "error",
                title: "❌ ลงทะเบียนไม่สำเร็จ",
                text: "กรุณาลองใหม่อีกครั้ง",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    }
    const currentStep = stepIndex // ใช้กับ stepper UI ได้เลย
    return (
        <ModalComponent onCancel={() => props.onClose()} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={isModal}
            headname={
                <div className="flex items-center justify-center gap-6 text-sm font-medium bg-white py-2 px-4 rounded-md w-full mt-4">
                    {steps.map((label, index, arr) => {
                        const isCompleted = index < currentStep
                        const isActive = index === currentStep

                        return (
                            <div key={index} className="flex items-center gap-2">
                                {/* วงกลมตัวเลข */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border
                                ${isCompleted ? 'bg-blue-100 text-blue-600 border-blue-400' :
                                            isActive ? 'bg-blue-600 text-white border-blue-600 shadow-md animate-pulse' :
                                                'bg-gray-200 text-gray-600 border-gray-300'}
                                `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </div>

                                {/* ชื่อขั้นตอน */}
                                <span className={`${isActive || isCompleted ? 'text-[#365382] font-semibold' : 'text-gray-400'}`}>
                                    {label}
                                </span>

                                {/* เส้นเชื่อม */}
                                {index < arr.length - 1 && (
                                    <div className="w-12 h-0.5 bg-gray-300 mx-2">
                                        <div className={`h-full ${isCompleted ? 'bg-blue-400 w-full' : isActive ? 'bg-blue-300 w-1/2' : ''}`} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            }
            modalsize={'w-[90%]  h-[90%] '}
            button={
                <>
                    {stepIndex > 0 && (
                        <button onClick={backStep} className='p-2 bg-gray-500 border rounded-lg'>Back</button>
                    )}

                    {stepIndex < steps.length - 1 ? (
                        <button onClick={nextStep} className='p-2 bg-blue-500 border rounded-lg'>Next</button>
                    ) : (
                        <button onClick={SaveClick} className='p-2 bg-green-500 border rounded-lg'>Save</button>
                    )}

                </>}
        >
            <div className='p-4 overflow-auto h-full '>
                <div className='p-4 flex rounded-2xl bg-[#F8F8F8] shadow-box h-full overflow-x-auto justify-center'>
                    {stepIndex === 0 && <Step1 form={form} setForm={setForm} />}
                    {stepIndex === 1 && <Step2 form={formPackage} setForm={setFormPackage} mainPackage={mainPackage} subPackage={subPackage} />}
                    {stepIndex === 2 && <Step3 step1data={form} step2data={formPackage} mainPackage={mainPackage} />}
                </div>
            </div>
        </ModalComponent >
    )
}


