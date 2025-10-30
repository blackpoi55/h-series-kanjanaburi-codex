'use client'

import React, { useEffect, useState } from 'react'

function Laboratory(props) {
    const { data, pdfRefs } = props
    const [form, setForm] = useState([])


    useEffect(() => {
        if (data) {
            setForm(data || null)
        }
    }, [data])

    return (
        <>
            {/*  <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'> */}

            <div ref={(el) => pdfRefs.current[3] = el} className="a4 section flex flex-col ">
                <div className='flex text-[#F8F8F8] bg-[#6B84B7] justify-center h-12 w-full rounded-lg'>
                    <label className='font-semibold text-2xl p-1'>ผลการตรวจทางห้องปฎิบัติหารและอื่นๆ</label>
                </div>
                <div className='grid gap-4 mt-2'>
                    <label id='blindness' className='font-semibold text-[#365382]'>การตรวจเลือดทั่วไปสมบูรณ์แบบ</label>
                </div>
                {/* ข้อมูล ความเข้มข้นของเลือด */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='blood-concentration' className='font-semibold text-[#365382] p-2'>ความเข้มข้นของเลือด</label>
                    </div>
                    <div className='flex flex-col justify-start h-full overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจเลือดทั่วไปสมบูรณ์แบบ</th>
                                    <th className="font-light">2024</th>
                                    <th className="font-light">2023</th>
                                    <th className="font-light">2022</th>
                                    <th className="font-light">Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trConcentration`} className="hover">
                                    <td className={`text-left`}>{'ความเข้มข้น'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trCompaction`} className="hover">
                                    <td className={`text-left`}>{'การอัดแน่น'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trWhite-blood`} className="hover">
                                    <td className={`text-left`}>{'จำนวนเม็ดเลือดขาว'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.cbc_platelet_count || '-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trBlood-type`} className="hover">
                                    <td className={`text-left`}>{'ชนิดของเม็ดเลือด'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trSegmented-Neutrophil`} className="hover">
                                    <td className={`text-left`}>{'Segmented Neutrophil'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trLymphocyte`} className="hover">
                                    <td className={`text-left`}>{'Lymphocyte'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.cbc_lymphocyte || '-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{form?.cbc_lymphocyte_summary || '-'}</td>
                                </tr>
                                <tr key={`trMonocyte`} className="hover">
                                    <td className={`text-left`}>{'Monocyte'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trEosinophil`} className="hover">
                                    <td className={`text-left`}>{'Eosinophil'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.cbc_eosinophil || '-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{form?.cbc_eosinophil_summary || '-'}</td>
                                </tr>
                                <tr key={`trBasophil`} className="hover">
                                    <td className={`text-left`}>{'Basophil'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.cbc_basophil || '-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trAtypical-Lymphocyte`} className="hover">
                                    <td className={`text-left`}>{'Atypical Lymphocyte'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div ref={(el) => pdfRefs.current[4] = el} className="a4 section flex flex-col ">
                {/* ข้อมูล Other */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <label id='other' className='font-semibold text-[#365382]'>Other 1</label>
                    <div className='flex flex-col justify-start h-full overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจเลือดทั่วไปสมบูรณ์แบบ</th>
                                    <th className="font-light">2024</th>
                                    <th className="font-light">2023</th>
                                    <th className="font-light">2022</th>
                                    <th className="font-light">Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trCharacteristics`} className="hover">
                                    <td className={`text-left`}>{'ลักษณะเม็ดเลือดแดง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trAverage`} className="hover">
                                    <td className={`text-left`}>{'ขนาดเฉลี่ยเม็ดเลือดแดง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trAverage-amount`} className="hover">
                                    <td className={`text-left`}>{'ปริมาณฮีโมโกบิลเฉลี่ยในเซลล์เม็ดเลือดแดง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trAverage-hemoglobin`} className="hover">
                                    <td className={`text-left`}>{'ความเข้มข้นฮีโมโกบิลเฉลี่ยในเซลล์เม็ดเลือดแดง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trRed-blood`} className="hover">
                                    <td className={`text-left`}>{'การกระจายของขนาดเม็ดเลือดแดง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trCheck-red-blood-cells`} className="hover">
                                    <td className={`text-left`}>{'ตรวจหาจำนวนเซลล์เม็ดเลือดแดง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trPlatelet-count`} className="hover">
                                    <td className={`text-left`}>{'จำนวนเกล็ดเลือด'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trOther2`} className="hover">
                                    <td className={`text-left`}>{'Other 2'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ข้อมูล น้ำตาลในเลือด */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='blood-sugar' className='font-semibold text-[#365382] p-2'>น้ำตาลในเลือด</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจเลือดทั่วไปสมบูรณ์แบบ</th>
                                    <th className="font-light">2024</th>
                                    <th className="font-light">2023</th>
                                    <th className="font-light">2022</th>
                                    <th className="font-light">Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trGlucose`} className="hover">
                                    <td className={`text-left`}>{'Glucose (FBS)'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.fbs || '-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                                <tr key={`trHb`} className="hover">
                                    <td className={`text-left`}>{'Hb 1Ac'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.hba1c || '-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                    <td className="text-left flex items-center gap-2">{'-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>


            </div>
            <div ref={(el) => pdfRefs.current[5] = el} className="a4 section flex flex-col ">
                {/* ข้อมูล ไขมัน */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='blood-sugar' className='font-semibold text-[#365382] p-2'>ไขมัน</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจเลือดทั่วไปสมบูรณ์แบบ</th>
                                    <th className="font-light">Normal Value</th>
                                    <th className="font-light">Detail</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trChol`} className="hover">
                                    <td className={`text-left`}>{'Cholesterol'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.cholesterol || '-'}</td>
                                    <td className={`text-left`}>{form?.chol_detail || '-'}</td>
                                </tr>
                                <tr key={`trTrig`} className="hover">
                                    <td className={`text-left`}>{'Triglyceride'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.triglyceride || '-'}</td>
                                    <td className={`text-left`}>{form?.trig_detail || '-'}</td>
                                </tr>
                                <tr key={`trHDL`} className="hover">
                                    <td className={`text-left`}>{'HDL cholesterol'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.hdl_cholesterol || '-'}</td>
                                    <td className={`text-left`}>{form?.hdl_detail || '-'}</td>
                                </tr>
                                <tr key={`trLDL`} className="hover">
                                    <td className={`text-left`}>{'LDL cholesterol'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ldl_cholesterol || '-'}</td>
                                    <td className={`text-left`}>{form?.ldl_detail || '-'}</td>
                                </tr>
                                <tr key={`trLipid`} className="hover">
                                    <td className={`text-left`}>{'Lipid'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.lipid || '-'}</td>
                                    <td className={`text-left`}>{'-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
                {/* ข้อมูล การทำงานของไต */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การทำงานของไต</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจเลือดทั่วไปสมบูรณ์แบบ</th>
                                    <th className="font-light">Normal Value</th>
                                    <th className="font-light">Detail</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trbun`} className="hover">
                                    <td className={`text-left`}>{'B.U.N'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.bun || '-'}</td>
                                    <td className={`text-left`}>{form?.bun_detail || '-'}</td>
                                </tr>
                                <tr key={`trcre`} className="hover">
                                    <td className={`text-left`}>{'Creatinine'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.creatinine || '-'}</td>
                                    <td className={`text-left`}>{form?.creatinine_detail || '-'}</td>
                                </tr>
                                <tr key={`treGFR`} className="hover">
                                    <td className={`text-left`}>{'eGFR (CKD-EPI)'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.egfr || '-'}</td>
                                    <td className={`text-left`}>{form?.egfr_detail || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
            </div>
            <div ref={(el) => pdfRefs.current[6] = el} className="a4 section flex flex-col ">
                {/* ข้อมูล การทำงานของตับ */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การทำงานของตับ</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจเลือดทั่วไปสมบูรณ์แบบ</th>
                                    <th className="font-light">Normal Value</th>
                                    <th className="font-light">Detail</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trSGOT`} className="hover">
                                    <td className={`text-left`}>{'SGOT'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.sgot || '-'}</td>
                                    <td className={`text-left`}>{form?.sgot_detail || '-'}</td>
                                </tr>
                                <tr key={`trSGPT`} className="hover">
                                    <td className={`text-left`}>{'SGPT'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.sgpt || '-'}</td>
                                    <td className={`text-left`}>{form?.sgpt_detail || '-'}</td>
                                </tr>
                                <tr key={`trAlkaline`} className="hover">
                                    <td className={`text-left`}>{'Alkaline phosphatase'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.alkaline_phosphatase || '-'}</td>
                                    <td className={`text-left`}>{form?.alkaline_phosphatase_detail || '-'}</td>
                                </tr>
                                <tr key={`trAlbumin`} className="hover">
                                    <td className={`text-left`}>{'Albumin'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.albumin || '-'}</td>
                                    <td className={`text-left`}>{form?.albumin_detail || '-'}</td>
                                </tr>
                                <tr key={`trGlobumin`} className="hover">
                                    <td className={`text-left`}>{'Globumin'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.globumin || '-'}</td>
                                    <td className={`text-left`}>{form?.globumin_detail || '-'}</td>
                                </tr>
                                <tr key={`trBilirubin`} className="hover">
                                    <td className={`text-left`}>{'Bilirubin'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.total_bilirubin || '-'}</td>
                                    <td className={`text-left`}>{form?.total_bilirubin_detail || '-'}</td>
                                </tr>
                                <tr key={`trDirect`} className="hover">
                                    <td className={`text-left`}>{'Direct bilirubin'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.direct_bilirubin || '-'}</td>
                                    <td className={`text-left`}>{form?.direct_bilirubin_detail || '-'}</td>
                                </tr>
                                <tr key={`trIndirect`} className="hover">
                                    <td className={`text-left`}>{'Indirect bilirubin'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.indirect_bilirubin || '-'}</td>
                                    <td className={`text-left`}>{form?.indirect_bilirubin_detail || '-'}</td>
                                </tr>
                                <tr key={`trTotal`} className="hover">
                                    <td className={`text-left`}>{'Total protein'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.total_protein || '-'}</td>
                                    <td className={`text-left`}>{form?.total_protein_detail || '-'}</td>
                                </tr>
                                <tr key={`trGGT`} className="hover">
                                    <td className={`text-left`}>{'GGT'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ggt || '-'}</td>
                                    <td className={`text-left`}>{form?.ggt_detail || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
                {/* ข้อมูล มะเร็ง */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>มะเร็ง</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจเลือดทั่วไปสมบูรณ์แบบ</th>
                                    <th className="font-light">Normal Value</th>
                                    <th className="font-light">Detail</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trCEA`} className="hover">
                                    <td className={`text-left`}>{'CEA'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.cea || '-'}</td>
                                    <td className={`text-left`}>{form?.cea_detail || '-'}</td>
                                </tr>
                                <tr key={`trAFP`} className="hover">
                                    <td className={`text-left`}>{'AFP'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.afp || '-'}</td>
                                    <td className={`text-left`}>{form?.afp_detail || '-'}</td>
                                </tr>
                                <tr key={`trPSA`} className="hover">
                                    <td className={`text-left`}>{'PSA'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.psa || '-'}</td>
                                    <td className={`text-left`}>{form?.psa_detail || '-'}</td>
                                </tr>
                                <tr key={`trca_125`} className="hover">
                                    <td className={`text-left`}>{'CA 125'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ca_125 || '-'}</td>
                                    <td className={`text-left`}>{form?.ca_125_detail || '-'}</td>
                                </tr>
                                <tr key={`trca_19_9`} className="hover">
                                    <td className={`text-left`}>{'CA 19'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ca_19_9 || '-'}</td>
                                    <td className={`text-left`}>{form?.ca_19_9_detail || '-'}</td>
                                </tr>
                                <tr key={`trca_153`} className="hover">
                                    <td className={`text-left`}>{'CA 153'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ca_153 || '-'}</td>
                                    <td className={`text-left`}>{form?.ca_153_detail || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
            </div>
            <div ref={(el) => pdfRefs.current[7] = el} className="a4 section flex flex-col ">
                {/* ข้อมูล การตรวจอื่นๆ */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <label id='other-examinations' className='font-semibold text-[#365382]'>การตรวจอื่นๆ</label>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจอื่นๆ</th>
                                    <th className="font-light">Normal Value</th>
                                    <th className="font-light">2025</th>
                                    <th className="font-light">2024</th>
                                    <th className="font-light">2023</th>
                                    <th className="font-light">Detail</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trGlucose1`} className="hover">
                                    <td className={`text-left`}>{''}</td>
                                    <td className="text-left flex items-center gap-2">{''}</td>
                                    <td className={`text-left`}>{''}</td>
                                    <td className={`text-left`}>{''}</td>
                                    <td className={`text-left`}>{''}</td>
                                    <td className={`text-left`}>{''}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
                {/* ข้อมูล การตรวจปัสสาวะสมบูรณ์แบบ */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การตรวจปัสสาวะสมบูรณ์แบบ</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจปัสสาวะ</th>
                                    <th className="font-light">Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trua_color`} className="hover">
                                    <td className={`text-left`}>{'สี'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_color || '-'}</td>
                                </tr>
                                <tr key={`trappearance`} className="hover">
                                    <td className={`text-left`}>{'ความขุ่น'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_appearance || '-'}</td>
                                </tr>
                                <tr key={`trua_sp_gr`} className="hover">
                                    <td className={`text-left`}>{'Specific Gravity'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_sp_gr || '-'}</td>
                                </tr>
                                <tr key={`trua_ph`} className="hover">
                                    <td className={`text-left`}>{'Ph กรดด่าง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_ph || '-'}</td>
                                </tr>
                                <tr key={`trua_protein`} className="hover">
                                    <td className={`text-left`}>{'โปรตีน'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_protein || '-'}</td>
                                </tr>
                                <tr key={`trua_glucose`} className="hover">
                                    <td className={`text-left`}>{'น้ำตาล'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_glucose || '-'}</td>
                                </tr>
                                <tr key={`trua_blood`} className="hover">
                                    <td className={`text-left`}>{'การหาเลือดในปัสสาวะ'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_blood || '-'}</td>
                                </tr>
                                <tr key={`trua_rbc`} className="hover">
                                    <td className={`text-left`}>{'เม็ดเลือดแดง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_rbc || '-'}</td>
                                </tr>
                                <tr key={`trua_wbc`} className="hover">
                                    <td className={`text-left`}>{'เม็ดเลือดขาว'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_wbc || '-'}</td>
                                </tr>
                                <tr key={`trua_1`} className="hover">
                                    <td className={`text-left`}>{'เซลล์ผิว'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                                <tr key={`trua_2`} className="hover">
                                    <td className={`text-left`}>{'Amorphous'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                                <tr key={`trua_3`} className="hover">
                                    <td className={`text-left`}>{'เซลล์อัดแน่น'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                                <tr key={`trua_4`} className="hover">
                                    <td className={`text-left`}>{'ผลึก'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                                <tr key={`trua_leukocytes`} className="hover">
                                    <td className={`text-left`}>{'Leukocyte'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_leukocytes || '-'}</td>
                                </tr>
                                <tr key={`trua_ketone`} className="hover">
                                    <td className={`text-left`}>{'Ketone'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_ketone || '-'}</td>
                                </tr>
                                <tr key={`trua_nitrite`} className="hover">
                                    <td className={`text-left`}>{'Nitrite'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ua_nitrite || '-'}</td>
                                </tr>
                                <tr key={`trua_5`} className="hover">
                                    <td className={`text-left`}>{'Other'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>

            </div>
            <div ref={(el) => pdfRefs.current[8] = el} className="a4 section flex flex-col ">
                {/* ข้อมูล การตรวจปัสสาวะอื่น */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การตรวจปัสสาวะอื่น</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจปัสสาวะ</th>
                                    <th className="font-light">Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trua_6`} className="hover">
                                    <td className={`text-left`}>{'ตรวจการตั้งครรภ์'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                                <tr key={`trua_7`} className="hover">
                                    <td className={`text-left`}>{'การตรวจหาอนุพันธ์มอร์ฟีน'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                                <tr key={`trua_8`} className="hover">
                                    <td className={`text-left`}>{'การตรวจหาสารเสพติดในปัสสาวะ'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                                <tr key={`trua_9`} className="hover">
                                    <td className={`text-left`}>{'การหาเลือดในปัสสาวะ'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                                <tr key={`trua_10`} className="hover">
                                    <td className={`text-left`}>{'การตรวจหากัญชา'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>

                {/* ข้อมูล การตรวจอุจจาระ */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การตรวจอุจจาระ</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">การตรวจอุจจาระ</th>
                                    <th className="font-light">Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trstool_exam_color`} className="hover">
                                    <td className={`text-left`}>{'สี'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_color || '-'}</td>
                                </tr>
                                <tr key={`trstool_exam_appearance`} className="hover">
                                    <td className={`text-left`}>{'ลักษณะ'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_appearance || '-'}</td>
                                </tr>
                                <tr key={`trstool_exam_rbc`} className="hover">
                                    <td className={`text-left`}>{'ปริมาณเม็ดเลือดแดง'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_rbc || '-'}</td>
                                </tr>
                                <tr key={`trstool_exam_wbc`} className="hover">
                                    <td className={`text-left`}>{'ปริมาณเม็ดเลือดขาว'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_wbc || '-'}</td>
                                </tr>
                                <tr key={`trstool_exam_mucous`} className="hover">
                                    <td className={`text-left`}>{'เซลล์ผิว'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_mucous || '-'}</td>
                                </tr>
                                <tr key={`trstool_exam_parasite`} className="hover">
                                    <td className={`text-left`}>{'พยาธิและไข่พยาธิ'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_parasite || '-'}</td>
                                </tr>
                                <tr key={`trstool_exam_blood`} className="hover">
                                    <td className={`text-left`}>{'การหาเลือดในอุจจาระ'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_blood || '-'}</td>
                                </tr>
                                <tr key={`trstool_exam_protozoa`} className="hover">
                                    <td className={`text-left`}>{'โปรโตซัว'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_protozoa || '-'}</td>
                                </tr>
                                <tr key={`trstool_exam_detail`} className="hover">
                                    <td className={`text-left`}>{'Other'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.stool_exam_detail || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
            </div>
            <div ref={(el) => pdfRefs.current[9] = el} className="a4 section flex flex-col ">
                {/* ข้อมูล X-ray */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>X-ray</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light min-w-[200px]">X-ray</th>
                                    <th className="font-light w-[200px]">Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trchest_xray`} className="hover">
                                    <td className={`text-left`}>{'Chest xray'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.chest_xray || '-'}</td>
                                </tr>
                                <tr key={`trmammogram`} className="hover">
                                    <td className={`text-left`}>{'mammogram'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.mammogram || '-'}</td>
                                </tr>
                                <tr key={`trupper_ultrasound`} className="hover">
                                    <td className={`text-left`}>{'Upper ultrasound'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.upper_ultrasound || '-'}</td>
                                </tr>
                                <tr key={`trlower_ultrasound`} className="hover">
                                    <td className={`text-left`}>{'Lower ultrasound'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.lower_ultrasound || '-'}</td>
                                </tr>
                                <tr key={`trfull_ultrasound`} className="hover">
                                    <td className={`text-left`}>{'Full ultrasound'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.full_ultrasound || '-'}</td>
                                </tr>
                                <tr key={`trultrasound`} className="hover">
                                    <td className={`text-left`}>{'Ultrasound'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ultrasound || '-'}</td>
                                </tr>
                                <tr key={`trbone_density_test`} className="hover">
                                    <td className={`text-left`}>{'Bone density'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.bone_density_test || '-'}</td>
                                </tr>
                                <tr key={`trpap_smear_detail`} className="hover">
                                    <td className={`text-left`}>{'Pap smear'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.pap_smear_detail || '-'}</td>
                                </tr>
                                <tr key={`trarms_hands_detail`} className="hover">
                                    <td className={`text-left`}>{'Arms Hands'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.arms_hands_detail || '-'}</td>
                                </tr>
                                <tr key={`trback_legs_detail`} className="hover">
                                    <td className={`text-left`}>{'Back Legs'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.back_legs_detail || '-'}</td>
                                </tr>
                                <tr key={`trbreast_ultrasound`} className="hover">
                                    <td className={`text-left`}>{'Breast ultrasound'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.breast_ultrasound || '-'}</td>
                                </tr>
                                <tr key={`trpelvis_ultrasound`} className="hover">
                                    <td className={`text-left`}>{'Pelvis ultrasound'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.pelvis_ultrasound || '-'}</td>
                                </tr>
                                <tr key={`trtransvaginal_ultrasound`} className="hover">
                                    <td className={`text-left`}>{'Transvaginal ultrasound'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.transvaginal_ultrasound || '-'}</td>
                                </tr>
                                <tr key={`trlumbar_spine_xray`} className="hover">
                                    <td className={`text-left`}>{'Lumbar spine xray'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.lumbar_spine_xray || '-'}</td>
                                </tr>
                                <tr key={`trpanoramic_dental`} className="hover">
                                    <td className={`text-left`}>{'Panoramic'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.panoramic_dental || '-'}</td>
                                </tr>
                                <tr key={`trOther`} className="hover">
                                    <td className={`text-left`}>{'Other'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>

            </div>
            <div ref={(el) => pdfRefs.current[10] = el} className="a4 section flex flex-col ">
                {/* ข้อมูล EKG */}
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>EKG</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <table className="tablePatientInformation w-full">
                            <thead className='text-sm'>
                                <tr className="text-left bg-[#1A8BB7]">
                                    <th className="font-light">EKG</th>
                                    <th className="font-light">Normal Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light'>
                                <tr key={`trEKG`} className="hover">
                                    <td className={`text-left`}>{'EKG'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ekg || '-'}</td>
                                </tr>
                                <tr key={`trEST`} className="hover">
                                    <td className={`text-left`}>{'EST'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.est || '-'}</td>
                                </tr>
                                <tr key={`trEcho`} className="hover">
                                    <td className={`text-left`}>{'Echo'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.echo || '-'}</td>
                                </tr>
                                <tr key={`trct_scan`} className="hover">
                                    <td className={`text-left`}>{'CT scan'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ct_scan || '-'}</td>
                                </tr>
                                <tr key={`trct_calcium`} className="hover">
                                    <td className={`text-left`}>{'CT calcium'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.ct_calcium || '-'}</td>
                                </tr>
                                <tr key={`trmri`} className="hover">
                                    <td className={`text-left`}>{'MRI'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.mri || '-'}</td>
                                </tr>
                                <tr key={`tralpha_thalassemia`} className="hover">
                                    <td className={`text-left`}>{'Alpha thalassemia'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.alpha_thalassemia || '-'}</td>
                                </tr>
                                <tr key={`trus_doppler`} className="hover">
                                    <td className={`text-left`}>{'US doppler'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.us_doppler || '-'}</td>
                                </tr>
                                <tr key={`trcimt`} className="hover">
                                    <td className={`text-left`}>{'CIMT'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{form?.cimt || '-'}</td>
                                </tr>
                                <tr key={`trOther1`} className="hover">
                                    <td className={`text-left`}>{'Other'}</td>
                                    <td className={`text-left whitespace-nowrap`}>{'-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default Laboratory