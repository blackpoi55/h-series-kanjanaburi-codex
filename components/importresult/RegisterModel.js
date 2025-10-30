'use client'
import { TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { saveAlert, succeedAlert, warningAlert } from '../SweetAlert/sweetAlert'
import Tooldatepick from '../Tool/Tooldatepick'
import Toolselect2 from '../Tool/Toolselect2'
import { MetaGenderThais, MetaInitialAll, MetaMarital } from '../Tool/var'
import moment from 'moment'
import Modalbulk from '../Modal/Modalbulk'
import { generateCode } from '@/action/api'

export const RegisterModel = (props) => {
    const { data, setWait, refresh } = props
    const [form, setForm] = useState({})
    const [tabledata, settabledata] = useState({})

    useEffect(() => {
        console.log("data", data)
        let val = {
            "bucode": "99",
            "genname": "HN",
            "CARDID": data?.["NATIONALID"] || null,
            "dob": excelSerialToDate(data?.["DATEOFBIRTH(DD/MM/YYYY)"]) || null,
            "Forename": data?.["FIRSTNAME"] || null,
            "Surname": data?.["LASTNAME"] || null,
            "Prename": data?.["TITLE"] || null,
            "Gender": data?.["GENDER"] || null,
            "MaritalStatus": data?.["MaritalStatus"] || null,
            "Hn": data?.["HN"] || null,
            "En": data?.["EN"] || null,
        }
        console.log(val)
        setForm(val)
    }, [data])


    const onSave = async () => {
        let val = {
            "bucode": form?.bucode || "99",
            "genname": form?.genname || "EN",
            "CARDID": form?.CARDID.toString() || null,
            "dob": form?.dob || null,
            "Forename": form?.Forename || null,
            "Surname": form?.Surname || null,
        }
        console.log(val)

        try {
            setWait(true)
            let data = await generateCode(val)
            console.log("data", data)
            if (data?.data) {
                succeedAlert()
                refresh()
                props.onClose()
            }
            else {
                console.log('res error', res?.error)
            }
        } catch (error) {
            console.error('An error occurred while onSave:', error)
        } finally {
            setWait(false)
        }


    }
    const enGenerateClick = async () => {
        let val = {
            "bucode": form?.bucode || "99",
            "genname": "EN",
            "CARDID": form?.CARDID.toString() || null,
            "dob": form?.dob || null,
            "Forename": form?.Forename || null,
            "Surname": form?.Surname || null,
        }
        console.log(val)

        let data = await generateCode(val)
        console.log("data", data)
        if (data?.data) {
            settabledata(data?.data||{})
        }
    }
    const hnGenerateClick = async () => {
        let val = {
            "bucode": form?.bucode || "99",
            "genname": form?.genname || "HN",
            "CARDID": form?.CARDID.toString() || null,
            "dob": form?.dob || null,
            "Forename": form?.Forename || null,
            "Surname": form?.Surname || null,
        }
        console.log(val)
        let data = await generateCode(val)
        console.log("data", data)
        if (data?.data) {
            setForm({ ...form, Hn: data?.data?.HN })
        }
    };
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

    const excelSerialToDate = (serial) => {
        // วันที่เริ่มต้นของ Excel คือ 1 มกราคม 1900
        const startDate = new Date(1900, 0, 1);
        // ลบ 1 วัน เพราะ Excel เริ่มนับที่ 1 แต่ JavaScript เริ่มที่ 0
        const date = new Date(startDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
        return moment(date).format("YYYY-MM-DD");
    };
    const calculateAge = (birthDateString) => {
        // แปลงวันเกิดเป็น Date object
        const birthDate = new Date(birthDateString);
        const today = new Date();

        // คำนวณปี
        let age = today.getFullYear() - birthDate.getFullYear();

        // ตรวจสอบว่าถึงวันเกิดในปีนี้หรือยัง
        const hasHadBirthdayThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        // ถ้ายังไม่ถึงวันเกิดปีนี้ ให้ลบอายุออก 1 ปี
        if (!hasHadBirthdayThisYear) {
            age--;
        }

        return age;
    }

    return (
        <Modalbulk savedisabled={!(form.Surname && form.Forename && form.dob && form.CARDID && form.Hn)} onCancel={() => props.onClose()} onSave={() => onSave()} headname={`ลงทะเบียน`} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[90%]  h-[80%] '}>
            <div className='p-4 overflow-auto h-full '>
                <div className='p-4 flex rounded-2xl bg-[#F8F8F8] shadow-box'>
                    <div className='w-full h-full flex flex-col  '>
                        <label id='patient_information' className='font-semibold text-[#365382]'>Patient Information</label>
                        <div className='grid grid-cols-8 lg:grid-cols-12 gap-4 w-full  h-full'>
                            <label className='lg:col-span-12 col-span-8 ' >ข้อมูลทั่วไป</label>
                            {/* แุถว 1 */}
                            <div className='relative flex col-span-4  '>
                                <TextField disabled size='small' value={form?.Hn || ''} className='text-white w-full bg-[#FFFFFF]' label="หมายเลข HN" variant="outlined" inputProps={{ maxLength: 12 }} />

                            </div>
                            {/* <div className='relative flex col-span-4  '>
                                <TextField disabled size='small' className='text-white w-full bg-[#FFFFFF]' label="หมายเลข EN" variant="outlined" inputProps={{ maxLength: 13 }} />
                            </div> */}
                            <div className='relative flex col-span-4  '>
                                <Tooldatepick disabled sm label={"วันที่ลงบันทึก"} value={new Date()} ></Tooldatepick>
                            </div>
                            <div className='relative flex col-span-4  '>
                                <button disabled={(form.Surname && form.Forename && form.dob && form.CARDID && !form.Hn) ? false : true} onClick={() => hnGenerateClick()} className="border rounded-lg bg-[#365382] disabled:bg-gray-500 p-2 text-center"> Generate HN</button>
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
                                <Toolselect2 sm options={MetaGenderThais || []} label={"เพศ"} value={form?.Gender || ''} onChange={(Gender) => handleChange({ Gender })} ></Toolselect2>
                            </div>
                            <div className='relative flex col-span-4  '>
                                <TextField disabled size='small' className='text-white w-full bg-[#FFFFFF]' value={calculateAge(form?.dob) || ''} label="อายุ" variant="outlined" />
                            </div>
                            <div className='relative flex col-span-4  '>
                                <Toolselect2 sm options={MetaMarital || []} value={form?.MaritalStatus || ''} onChange={(MaritalStatus) => handleChange({ MaritalStatus })} label="สถานะ" variant="outlined" />
                            </div>
                            {/* แุถว 3 */}
                            <div className='relative flex col-span-4  '>
                                <Tooldatepick sm label={"วันเดือนปีเกิด"} value={form?.dob || ''} onChange={(dob) => handleChange({ dob })} name={"dob"} ></Tooldatepick>
                            </div>
                            <div className='relative flex col-span-4  '>
                                <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.CARDID || ''} onChange={(CARDID) => handleChange({ CARDID: CARDID?.target?.value })} label="เลขบัตรประชาชน" variant="outlined" />
                            </div>
                            <div className='relative flex col-span-4  '>
                                <button disabled={!(form.Surname && form.Forename && form.dob && form.CARDID && form.Hn)} onClick={() => enGenerateClick()} className="border rounded-lg bg-[#365382] disabled:bg-gray-500 p-2 text-center"> Generate EN</button>
                            </div>
                            <div className='border-b-2 lg:col-span-12 col-span-4 border-[#E2E2E2] my-4'></div>
                            <div className='col-span-12 overflow-x-auto px-1 pb-1'>
                                <table className=" tablePatientInformation  mt-4 w-full ">
                                    <thead className='text-[#4E4E4E]  text-sm truncate'>
                                        <tr className=" text-left bg-[#E2E2E2]">
                                            <th className="font-light">No.</th>
                                            <th className="font-light">HN</th>
                                            <th className="font-light">EN</th>
                                            <th className="font-light">ชื่อ-นามสกุล</th>
                                            <th className="font-light">เพศ</th>
                                            <th className="font-light">อายุ</th>
                                            <th className="font-light">CID</th>
                                            <th className="font-light">วันเดือนปีเกิด</th>
                                            <th className="font-light">Checkup Date</th> 
                                            <th className="font-light"></th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-base font-light truncate'>
                                        {[0, 0, 0].map((item, index) => {
                                            return <tr key={`trPatients${index}`} className=" text-center hover">
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td onClick={() => editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                                <td className=" text-left flex gap-2">
                                                    <button onClick={() => viewpackageClick(item)} className=' border max-h-10 min-h-10 px-4 rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >Detail</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modalbulk >
    )
}


