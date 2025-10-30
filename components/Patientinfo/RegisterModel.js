'use client'
import { TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import ModalComponent from '../Modal/Modal'
import { addPatient } from '@/action/api'
import { saveAlert, succeedAlert, warningAlert } from '../SweetAlert/sweetAlert'
import Tooldatepick from '../Tool/Tooldatepick'
import Toolselect2 from '../Tool/Toolselect2'
import { MetaGenderThais, MetaInitialAll, MetaMarital } from '../Tool/var'
import moment from 'moment'

export const RegisterModel = (props) => {
    const { data, setWait, refresh } = props
    const [form, setForm] = useState({})

    const christian_year = moment().utc().format('YYYY').substring(2)
    useEffect(() => {
        if (data === 0) {
            const d = {}
            const ds = []
            ds.length
            d.HN = christian_year
            d.EN = `H${christian_year}`
            setForm(d)
        }

    }, [data])


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

    const handleChange = (update) => {
        if (update.hasOwnProperty('HN')) {
            let hn = update.HN.replace(/[^0-9]/g, ''); // เอาเฉพาะตัวเลข
            if (hn.length > 2) hn = hn.slice(0, 2) + '-' + hn.slice(2);
            if (hn.length > 5) hn = hn.slice(0, 5) + '-' + hn.slice(5);
            update.HN = hn; // ตั้งค่า HN ใหม่พร้อมขีด
        }

        if (update.hasOwnProperty('EN')) {
            let en = update.EN.replace(/[^0-9]/g, ''); // เอาเฉพาะตัวเลข
            en = 'H' + en; // ใส่ตัว H ที่จุดเริ่มต้น
            if (en.length > 3) en = en.slice(0, 3) + '-' + en.slice(3);
            if (en.length > 6) en = en.slice(0, 6) + '-' + en.slice(6);
            update.EN = en; // ตั้งค่า EN ใหม่พร้อมขีด
        }

        setForm({ ...form, ...update });
    };


    return (
        <ModalComponent onCancel={() => props.onClose()} onSave={() => onSave()} headname={`ลงทะเบียน`} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[90%]  h-[80%] '}>
            <div className='p-4 overflow-auto h-full '>
                <div className='p-4 flex rounded-2xl bg-[#F8F8F8] shadow-box'>
                    <div className='w-full h-full flex flex-col  '>
                        <label id='patient_information' className='font-semibold text-[#365382]'>Patient Information</label>
                        <div className='grid grid-cols-8 lg:grid-cols-12 gap-4 w-full  h-full'>
                            <label className='lg:col-span-12 col-span-8 ' >ข้อมูลทั่วไป</label>
                            {/* แุถว 1 */}
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.HN || ''} onChange={(HN) => handleChange({ HN: HN?.target.value })} label="หมายเลข HN" variant="outlined" inputProps={{ maxLength: 12 }} />
                                {/* <Toolselect2 options={[]} label={"หมายเลขผู้ป่วย HN"} value={''} change={''} name={""}></Toolselect2> */}
                            </div>
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.EN || ''} onChange={(EN) => handleChange({ EN: EN?.target.value })} label="หมายเลข EN" variant="outlined" inputProps={{ maxLength: 13 }} />
                            </div>
                            <div className='relative flex col-span-4  '>
                                <Tooldatepick sm label={"วันที่ลงบันทึก"} value={form?.DateRegisByLoad || ''} onChange={(DateRegisByLoad) => handleChange({ DateRegisByLoad })} ></Tooldatepick>
                            </div>
                            {/* แุถว 2 */}
                            <div className='relative flex col-span-4  '>
                                <Toolselect2 sm options={MetaInitialAll || []} label={"คำนำหน้า"} value={form?.Prename || ''} onChange={(Prename) => handleChange({ Prename })} ></Toolselect2>
                            </div>
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Forename || ''} onChange={(Forename) => handleChange({ Forename: Forename?.target?.value })} label="ชื่อ" variant="outlined" />
                            </div>
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Surname || ''} onChange={(Surname) => handleChange({ Surname: Surname?.target?.value })} label="นามสกุล" variant="outlined" />
                            </div>
                            {/* แุถว 3 */}
                            <div className='relative flex col-span-4  '>
                                <Toolselect2 sm options={MetaGenderThais || []} label={"เพศ"} value={form?.Sex || ''} onChange={(Sex) => handleChange({ Sex })} ></Toolselect2>
                            </div>
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Age || ''} onChange={(Age) => handleChange({ Age: Age?.target?.value.replace(/[^0-9]/g, '') })} label="อายุ" variant="outlined" />
                            </div>
                            <div className='relative flex col-span-4  '>
                                <Toolselect2 sm options={MetaMarital || []} value={form?.MaritalStatus || ''} onChange={(MaritalStatus) => handleChange({ MaritalStatus })} label="สถานะ" variant="outlined" />
                            </div>
                            {/* แุถว 3 */}
                            <div className='relative flex col-span-4  '>
                                <Tooldatepick sm label={"วันเดือนปีเกิด"} value={form?.DOB || ''} onChange={(DOB) => handleChange({ DOB })} name={"DOB"} ></Tooldatepick>
                            </div>

                            <div className='border-b-2 lg:col-span-12 col-span-8 border-[#E2E2E2] my-4'></div>

                            <label className='lg:col-span-12 col-span-8 ' >ข้อมูลที่อยู่และการติดต่อ</label>
                            <div className='flex gap-4 lg:col-span-12 col-span-8'>
                                <TextareaAutosize minRows={5} maxRows={5} value={form?.Address || ''} onChange={(Address) => handleChange({ Address: Address?.target.value })} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
                            </div>
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Telephone || ''} onChange={(Telephone) => handleChange({ Telephone: Telephone?.target?.value.replace(/[^0-9]/g, '') })} label="เบอร์โทรศัพท์" variant="outlined" />
                            </div>
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Mobile || ''} onChange={(Mobile) => handleChange({ Mobile: Mobile?.target?.value.replace(/[^0-9]/g, '') })} inputProps={{ maxLength: 10 }} label="เบอร์มือถือ" variant="outlined" />
                            </div>
                            {/* แุถว 5 */}
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Email || ''} onChange={(Email) => handleChange({ Email: Email?.target?.value })} label="อีเมลล์" variant="outlined" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalComponent >
    )
}


