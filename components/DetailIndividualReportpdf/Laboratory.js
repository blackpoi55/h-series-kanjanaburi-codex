'use client'

import { renderHealthSummary } from '@/utils/renderHealthSummary'
import React, { useEffect, useState } from 'react'

function Laboratory(props) {
    const { data, pdfRefs, headerReport, footerReport } = props
    const [form, setForm] = useState([])


    useEffect(() => {
        if (data) {
            setForm(data || null)
        }
    }, [data])

    return (
        <>
            {/* <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'> */}
            <div ref={(el) => pdfRefs.current[3] = el} className="a4 section flex flex-col ">
                {headerReport()}
                <div className="flex flex-col h-[85%]">
                    <div className='flex text-[#F8F8F8] bg-[#6B84B7] justify-center h-12 w-full rounded-lg'>
                        <label className='font-semibold text-2xl p-1'>ผลการตรวจทางห้องปฎิบัติการ </label>
                    </div>
                    {/* <div className="w-full flex">
                <div className='w-7/12 flex-col'>
                    <div className='grid gap-4 mt-2'>
                        <label id='results_physical_doctor' className='font-semibold text-[#365382]'>หมู่เลือด</label>
                    </div>
                    <div className='w-full grid grid-cols-8 col-span-12 gap-4 p-2'>
                        <div className='flex flex-col col-span-2'>
                            <label className='font-light text-base text-[#8F8F8F]'>Blood Group</label>
                            <label className='font-light text-base'>A</label>
                            <label className='flex w-36 border border-[#26A1DC] my-2'></label>
                        </div>
                        <div className='flex flex-col col-span-2'>
                            <label className='font-light text-base text-[#8F8F8F]'>RH Type</label>
                            <label className='font-light text-base'>Negative</label>
                            <label className='flex w-36 border border-[#26A1DC] my-2'></label>
                        </div>
                    </div>
                </div>
            </div> */}


                    {/* เส้นขั้น */}
                    {/* <div className='flex col-span-12 border border-[#E2E2E2] my-2'></div> */}

                    <div className='grid gap-4 mt-2'>
                        <label id='blindness' className='font-semibold text-[#365382]'>การตรวจเลือดทั่วไปสมบูรณ์แบบ</label>
                    </div>
                    {/* ข้อมูล ความเข้มข้นของเลือด */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='blood-concentration' className='font-semibold text-[#365382] p-2'>โลหิตวิทยา(Hematology)</label>
                            {/* <button className={'w-28 h-10 cursor-pointer rounded-full bg-[#4CCAF2] text-white shadow-2xl ml-3'}>
                        <div className='font-semibold w-full justify-center flex items-center'>
                            <span className='text-center ml-3'>History</span>
                            <svg className='ml-2' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.11413 4.85688C0.758943 5.06999 0.643769 5.53069 0.85688 5.88587C1.06999 6.24106 1.53069 6.35623 1.88587 6.14312L1.11413 4.85688ZM6.5 2.5L6.95 1.9C6.70605 1.71704 6.37561 1.69999 6.11413 1.85688L6.5 2.5ZM10.5 5.5L10.05 6.1C10.3236 6.30522 10.7014 6.29932 10.9685 6.08565L10.5 5.5ZM15.9685 2.08565C16.292 1.82689 16.3444 1.35493 16.0857 1.03148C15.8269 0.708032 15.3549 0.655591 15.0315 0.914348L15.9685 2.08565ZM13.7504 15.5002C13.7504 15.9144 14.0862 16.2502 14.5004 16.2502C14.9146 16.2502 15.2504 15.9144 15.2504 15.5002H13.7504ZM15.2504 7.50015C15.2504 7.08594 14.9146 6.75015 14.5004 6.75015C14.0862 6.75015 13.7504 7.08594 13.7504 7.50015H15.2504ZM5.75021 15.5002C5.75021 15.9144 6.08599 16.2502 6.50021 16.2502C6.91442 16.2502 7.25021 15.9144 7.25021 15.5002H5.75021ZM7.25021 7.50015C7.25021 7.08594 6.91442 6.75015 6.50021 6.75015C6.08599 6.75015 5.75021 7.08594 5.75021 7.50015H7.25021ZM9.74959 15.5001C9.74959 15.9143 10.0854 16.2501 10.4996 16.2501C10.9138 16.2501 11.2496 15.9143 11.2496 15.5001H9.74959ZM11.2496 10.5001C11.2496 10.0858 10.9138 9.75005 10.4996 9.75005C10.0854 9.75005 9.74959 10.0858 9.74959 10.5001H11.2496ZM1.74938 15.5001C1.74938 15.9143 2.08517 16.2501 2.49938 16.2501C2.9136 16.2501 3.24938 15.9143 3.24938 15.5001H1.74938ZM3.24938 10.5001C3.24938 10.0858 2.9136 9.75005 2.49938 9.75005C2.08517 9.75005 1.74938 10.0858 1.74938 10.5001H3.24938ZM1.88587 6.14312L6.88587 3.14312L6.11413 1.85688L1.11413 4.85688L1.88587 6.14312ZM6.05 3.1L10.05 6.1L10.95 4.9L6.95 1.9L6.05 3.1ZM10.9685 6.08565L15.9685 2.08565L15.0315 0.914348L10.0315 4.91435L10.9685 6.08565ZM15.2504 15.5002V7.50015H13.7504V15.5002H15.2504ZM7.25021 15.5002V7.50015H5.75021V15.5002H7.25021ZM11.2496 15.5001V10.5001H9.74959V15.5001H11.2496ZM3.24938 15.5001V10.5001H1.74938V15.5001H3.24938Z" fill="white" />
                            </svg>
                        </div>
                    </button> */}
                        </div>
                        <div className='flex flex-col justify-start  overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                        {/* <th className="font-light">2024</th>
                                        <th className="font-light">2023</th> */}
                                    </tr>
                                </thead>
                                <tbody className='text-base font-light'>
                                    {[
                                        { label: 'Hb', normal: 'F:12.0 - 16.0 g/dL', value: form?.cbc_hb },
                                        { label: 'HCT', normal: 'F:36-48%', value: form?.cbc_hct },
                                        { label: 'WBC', normal: '4-10 x 10³ /mm³', value: form?.cbc_wbc },
                                        { label: 'Neutrophil', normal: '46.5 - 75 %', value: form?.cbc_neutrophil },
                                        { label: 'Lymphocyte', normal: '12.0 - 44.0 %', value: form?.cbc_lymphocyte },
                                        { label: 'Monocyte', normal: '0 - 11.2 %', value: form?.cbc_monocyte },
                                        { label: 'Eosinophil', normal: '0 - 9.5 %', value: form?.cbc_eosinophil },
                                        { label: 'Basophil', normal: '0 - 2.5 %', value: form?.cbc_basophil },
                                        { label: 'Platelet Count', normal: '150-450 x 10³/mm³', value: form?.platelet_count },
                                        //{ label: 'Platelet Smear', normal: 'Platelets adequate', value: form?.platelet_smear },
                                        //{ label: 'MPV', normal: '6 - 12 fL', value: form?.mpv },
                                        { label: 'RBC', normal: 'F :4.0 - 5.2 x10⁶ /mm³', value: form?.rbc },
                                        { label: 'MCH', normal: '26 - 34 pg', value: form?.mch },
                                        { label: 'MCHC', normal: '31.0-37.0 g/dL', value: form?.mchc },
                                        { label: 'RDW', normal: '9-15 %', value: form?.rdw },
                                        { label: 'RBC Morphology', normal: 'Normochromic and normocytic RBC', value: form?.cbc_rbc_morphology },
                                    ].map((item, index) => (
                                        <tr key={index} className="hover">
                                            <td className="text-left">{item.label}</td>
                                            <td className="text-left">
                                                <div className="flex items-center gap-2">{item.normal}</div>
                                            </td>
                                            <td className="text-left">{item.value || ''}</td>
                                        </tr>
                                    ))}

                                    {/* สรุปผล */}
                                    {/* {((form?.cbc_hb_summary && form?.cbc_hb_summary != '-') ||
                                        (form?.cbc_hct_summary && form?.cbc_hct_summary != '-') ||
                                        (form?.cbc_wbc_summary && form?.cbc_wbc_summary != '-') ||
                                        (form?.cbc_eosinophil_summary && form?.cbc_eosinophil_summary != '-') ||
                                        (form?.cbc_platelet_count_summary && form?.cbc_platelet_count_summary != '-')) && (
                                            <tr className="hover">
                                                <td className="text-left" colSpan={5}>
                                                    {form?.cbc_hb_summary && <>{form.cbc_hb_summary}<br /></>}
                                                    {form?.cbc_hct_summary && <>{form.cbc_hct_summary}<br /></>}
                                                    {form?.cbc_wbc_summary && <>{form.cbc_wbc_summary}<br /></>}
                                                    {form?.cbc_eosinophil_summary && <>{form.cbc_eosinophil_summary}<br /></>}
                                                    {form?.cbc_platelet_count_summary && <>{form.cbc_platelet_count_summary}</>}
                                                </td>
                                            </tr>
                                        )} */}
                                </tbody>
                            </table>
                            <div className="tablePatientInformation p-2 ">
                                {renderHealthSummary(form, ["cbc"])}
                            </div>
                        </div>
                    </div>
                </div>
                {footerReport(4)}
            </div>
            <div ref={(el) => pdfRefs.current[4] = el} className="a4 section flex flex-col ">
                {headerReport()}
                <div className="flex flex-col h-[85%]">
                    {/* ข้อมูล น้ำตาลในเลือด */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='blood-sugar' className='font-semibold text-[#365382] p-2'>น้ำตาลในเลือด</label>
                        </div>
                        {/* h-[30vh] */}
                        <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                        {/* <th className="font-light">2024</th>
                                        <th className="font-light">2023</th> */}
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { label: 'Glucose (FBS)', normal: '70-99 mg/dL', value: form?.fbs },
                                        { label: 'Hb 1Ac', normal: '< 5.7 %', value: form?.hba1c },
                                    ].map((item, index) => (
                                        <tr key={index} className="hover">
                                            <td className="text-left">{item.label}</td>
                                            <td className="text-left">
                                                <div className="flex items-center gap-2">{item.normal}</div>
                                            </td>
                                            <td className="text-left">{item.value || ''}</td>
                                        </tr>
                                    ))}

                                    {((form?.fbs_detail && form?.fbs_detail !== '-') || (form?.hba1c_detail && form?.hba1c_detail !== '-')) && (
                                        <tr className="hover">
                                            <td className="text-left" colSpan={5}>
                                                {form?.fbs_detail && <>{form.fbs_detail}<br /></>}
                                                {form?.hba1c_detail && <>{form.hba1c_detail}</>}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div>


                    {/* ข้อมูล ไขมัน */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='blood-sugar' className='font-semibold text-[#365382] p-2'>ผลการตรวจระดับไขมันในเลือด (Lipid Profile)</label>
                        </div>
                        {/* [40vh] */}
                        <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                        {/* <th className="font-light">2024</th>
                                        <th className="font-light">2023</th> */}
                                        {/* <th className="font-light">Detail</th> */}
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { label: 'Cholesterol', normal: '< 200 mg/dL', value: form?.cholesterol },
                                        { label: 'Triglyceride', normal: '< 150 mg/dL', value: form?.triglyceride },
                                        { label: 'HDL cholesterol', normal: 'M: > 40 mg/dL F: > 50 mg/dL', value: form?.hdl_cholesterol },
                                        { label: 'LDL cholesterol', normal: '< 130 mg/dL', value: form?.ldl_cholesterol },
                                    ].map((item, index) => (
                                        <tr key={index} className="hover">
                                            <td className="text-left">{item.label}</td>
                                            <td className="text-left">
                                                <div className="flex items-center gap-2">{item.normal}</div>
                                            </td>
                                            <td className="text-left">{item.value || ''}</td>
                                        </tr>
                                    ))}

                                    {((form?.chol_detail && form?.chol_detail != '-')
                                        || (form?.trig_detail && form?.trig_detail != '-')
                                        || (form?.hdl_detail && form?.hdl_detail != '-')
                                        || (form?.ldl_detail && form?.ldl_detail !== '-')) && (
                                            <tr className="hover">
                                                <td className="text-left" colSpan={5}>
                                                    {form?.chol_detail && <>{form.chol_detail}<br /></>}
                                                    {form?.trig_detail && <>{form.trig_detail}<br /></>}
                                                    {form?.hdl_detail && <>{form.hdl_detail}<br /></>}
                                                    {form?.ldl_detail && <>{form.ldl_detail}</>}
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                            <div className="tablePatientInformation p-2 ">
                                {renderHealthSummary(form, ["lipid"])}
                            </div>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div>
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='Uric-function' className='font-semibold text-[#365382] p-2'>ผลการตรวจระดับกรดยูริกในเลือด (Uric Acid Test)</label>
                        </div>
                        <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { label: 'Uric Acid', normal: '6.0 - 20.0	mg/dL', value: form?.uric_acid },
                                    ].map((item, index) => (
                                        <tr key={index} className="hover">
                                            <td className="text-left">{item.label}</td>
                                            <td className="text-left">
                                                <div className="flex items-center gap-2">{item.normal}</div>
                                            </td>
                                            <td className="text-left">{item.value || ''}</td>
                                        </tr>
                                    ))}

                                    {(form?.uric_detail && form?.uric_detail != '-') && (
                                        <tr className="hover">
                                            <td className="text-left" colSpan={5}>
                                                {form?.uric_detail && <>{form.uric_detail}<br /></>}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div>
                </div>
                {footerReport(5)}
            </div>
            <div ref={(el) => pdfRefs.current[5] = el} className="a4 section flex flex-col ">
                {headerReport()}
                <div className="flex flex-col h-[85%]">
                    {/* ข้อมูล การทำงานของตับ */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='kidney-function' className='font-semibold text-[#365382] p-2'>ผลการตรวจการทำงานของตับ (Liver Function Tests)</label>
                        </div>
                        {/* [60vh] */}
                        <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                        {/* <th className="font-light">2024</th>
                                        <th className="font-light">2023</th> */}
                                        {/* <th className="font-light">Detail</th> */}
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { key: 'sgot', label: 'SGOT', normal: '5 - 34 U/L', value: form?.sgot },
                                        { key: 'sgpt', label: 'SGPT', normal: 'M: 0 - 41 U/L F: 0 - 33 U/L', value: form?.sgpt },
                                        { key: 'alkaline_phosphatase', label: 'Alkaline phosphatase', normal: '40 - 150U/L', value: form?.alkaline_phosphatase },
                                        { key: 'albumin', label: 'Albumin', normal: '3.5 - 5.2g/dL', value: form?.albumin },
                                        { key: 'globumin', label: 'Globumin', normal: '2.1 - 3.7 g/dL', value: form?.globumin },
                                        { key: 'total_bilirubin', label: 'Bilirubin', normal: '0-1.2 mg/dL', value: form?.total_bilirubin },
                                        // { key: 'direct_bilirubin', label: 'Direct bilirubin', normal: '', value: form?.direct_bilirubin },
                                        { key: 'indirect_bilirubin', label: 'Indirect bilirubin', normal: '0 - 0.31	mg/dL', value: form?.indirect_bilirubin },
                                        { key: 'total_protein', label: 'Total protein', normal: '6.4 - 8.3g/dL', value: form?.total_protein },
                                        { key: 'ggt', label: 'GGT', normal: 'M : 10 - 71 U/L F : 6 - 42	U/L', value: form?.ggt },
                                    ]
                                        .filter(item => item.value !== undefined && item.value !== '' && item.value !== '-')
                                        .map(item => (
                                            <tr key={item.key} className="hover">
                                                <td className="text-left">{item.label}</td>
                                                <td className="text-left">
                                                    <div className="flex items-center gap-2">{item.normal}</div>
                                                </td>
                                                <td className="text-left">{item.value}</td>
                                            </tr>
                                        ))}

                                    {((form?.sgot_detail && form?.sgot_detail != '-') || (form?.sgpt_detail && form?.sgpt_detail != '-')
                                        || (form?.alkaline_phosphatase_detail && form?.alkaline_phosphatase_detail != '-')) && (
                                            <tr className="hover">
                                                <td className="text-left" colSpan={5}>
                                                    {form?.sgot_detail && <>{form.sgot_detail}<br /></>}
                                                    {form?.sgpt_detail && <>{form.sgpt_detail}<br /></>}
                                                    {form?.alkaline_phosphatase_detail && <>{form.alkaline_phosphatase_detail}</>}
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                            <div className="tablePatientInformation p-2 ">
                                {renderHealthSummary(form, ["liver"])}
                            </div>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div>
                </div>
                {footerReport(6)}
            </div>
            <div ref={(el) => pdfRefs.current[6] = el} className="a4 section flex flex-col ">
                {headerReport()}
                <div className="flex flex-col h-[85%]">
                    {/* ข้อมูล การทำงานของไต */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='kidney-function' className='font-semibold text-[#365382] p-2'>ผลการตรวจการทำงานของไต (Kidney Function Tests)</label>
                        </div>
                        {/* [40vh] */}
                        <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { label: 'BUN', normal: '6.0 - 20.0	mg/dL', value: form?.bun },
                                        { label: 'Creatinine', normal: 'M : 0.67-1.17 mg/dL F : 0.51-0.95 mg/dL', value: form?.creatinine },
                                        { label: 'eGFR (CKD-EPI)', normal: '>= 90 ml/min/1.73m²', value: form?.egfr },
                                    ].map((item, index) => (
                                        <tr key={index} className="hover">
                                            <td className="text-left">{item.label}</td>
                                            <td className="text-left">
                                                <div className="flex items-center gap-2">{item.normal}</div>
                                            </td>
                                            <td className="text-left">{item.value || ''}</td>
                                        </tr>
                                    ))}

                                    {((form?.bun_detail && form?.bun_detail != '-')
                                        || (form?.creatinine_detail && form?.creatinine_detail != '-')
                                        || (form?.egfr_detail && form?.egfr_detail != '-')) && (
                                            <tr className="hover">
                                                <td className="text-left" colSpan={5}>
                                                    {form?.bun_detail && <>{form.bun_detail}<br /></>}
                                                    {form?.creatinine_detail && <>{form.creatinine_detail}<br /></>}
                                                    {form?.egfr_detail && <>{form.egfr_detail}</>}
                                                </td>
                                            </tr>
                                        )}
                                </tbody>

                            </table>
                            <div className="tablePatientInformation p-2 ">
                                {renderHealthSummary(form, ["kidney"])}
                            </div>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div>

                    {/* ข้อมูล มะเร็ง */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='kidney-function' className='font-semibold text-[#365382] p-2'>ผลการตรวจสารบ่งชี้มะเร็ง (Tumor markers)</label>
                        </div>
                        {/* [40vh] */}
                        <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { key: 'cea', label: 'CEA', normal: '0.0 - 5.0 ng/ml', value: form?.cea },
                                        { key: 'afp', label: 'AFP', normal: '0.89 - 8.78 ng/mL', value: form?.afp },
                                        { key: 'psa', label: 'PSA', normal: '0.000 - 4.000 ng/ml', value: form?.psa },
                                        { key: 'ca_125', label: 'CA 125', normal: '0-35	U/ml', value: form?.ca_125 },
                                        { key: 'ca_19_9', label: 'CA 19', normal: '0-39.0 U/ml', value: form?.ca_19_9 },
                                        { key: 'ca_153', label: 'CA 153', normal: '<= 25 mg/dL', value: form?.ca_153 },
                                    ]
                                        .filter(item => item.value !== undefined && item.value !== '' && item.value !== '-')
                                        .map(item => (
                                            <tr key={item.key} className="hover">
                                                <td className="text-left">{item.label}</td>
                                                <td className="text-left">
                                                    <div className="flex items-center gap-2">{item.normal}</div>
                                                </td>
                                                <td className="text-left">{item.value}</td>
                                            </tr>
                                        ))}

                                    {(form?.cea_detail || form?.afp_detail || form?.psa_detail || form?.ca_125_detail) && (
                                        <tr className="hover">
                                            <td className="text-left" colSpan={5}>
                                                {form?.cea_detail && <>{form.cea_detail}<br /></>}
                                                {form?.afp_detail && <>{form.afp_detail}<br /></>}
                                                {form?.psa_detail && <>{form.psa_detail}<br /></>}
                                                {form?.ca_125_detail && <>{form.ca_125_detail}</>}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div>

                </div>
                {footerReport(7)}
            </div>
            <div ref={(el) => pdfRefs.current[7] = el} className="a4 section flex flex-col ">
                {headerReport()}
                <div className="flex flex-col h-[85%]">
                    {/* ข้อมูล การตรวจปัสสาวะสมบูรณ์แบบ */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='kidney-function' className='font-semibold text-[#365382] p-2'>ผลการตรวจวิเคราะห์ปัสสาวะ (Urine Analysis)</label>
                        </div>
                        {/* [60vh] */}
                        <div className='flex flex-col justify-start h-[65vh] overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                        {/* <th className="font-light">2024</th>
                                        <th className="font-light">2023</th> */}
                                        {/* <th className="font-light">Detail</th> */}
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { key: 'ua_color', label: 'Color', normal: 'Yellow', value: form?.ua_color },
                                        { key: 'ua_appearance', label: 'Transparency', normal: 'Clear', value: form?.ua_appearance },
                                        { key: 'ua_sp_gr', label: 'Sp.gr', normal: '1.003-1.030', value: form?.ua_sp_gr },
                                        { key: 'ua_ph', label: 'Ph', normal: '4.5-8.0', value: form?.ua_ph },
                                        { key: 'ua_protein', label: 'Protein', normal: 'Negative', value: form?.ua_protein },
                                        { key: 'ua_glucose', label: 'Glucose', normal: 'Negative', value: form?.ua_glucose },
                                        { key: 'ua_ketone', label: 'Ketone', normal: 'Negative', value: form?.ua_ketone },
                                        { key: 'ua_blood', label: 'Blood', normal: 'Negative', value: form?.ua_blood },
                                        { key: 'ua_rbc', label: 'RBC', normal: '0-2 cells/HPF', value: form?.ua_rbc?.replace("'", "") },
                                        { key: 'ua_wbc', label: 'WBC', normal: '0 - 5 cells/HPF', value: form?.ua_wbc?.replace("'", "") },
                                        { key: 'ua_urobilinogen', label: 'Urobilinogen', normal: 'Negative', value: form?.ua_urobilinogen },
                                        { key: 'ua_bilirubin', label: 'Bilirubin', normal: 'Negative', value: form?.ua_bilirubin },
                                        { key: 'ua_epithelial', label: 'Epithelial', normal: 'Negative', value: form?.ua_epithelial?.replace("'", "") },
                                        { key: 'ua_leukocytes', label: 'Leukocytes', normal: 'Negative', value: form?.ua_leukocytes },
                                        { key: 'ua_nitrite', label: 'Nitrite', normal: 'Negative', value: form?.ua_nitrite },
                                    ].map((item) => (
                                        <tr key={`tr_${item.key}`} className="hover">
                                            <td className="text-left">{item.label}</td>
                                            <td className="text-left flex items-center gap-2">{item.normal}</td>
                                            <td className="text-left">{item.value || '-'}</td>
                                        </tr>
                                    ))}

                                    {form?.ua_detail && (
                                        <tr className="hover">
                                            <td className="text-left" colSpan={5}>
                                                {form?.ua_summary || '-'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                            <div className="tablePatientInformation p-2 ">
                                {renderHealthSummary(form, ["ua"])}
                            </div>
                        </div>

                    </div>
                </div>
                {footerReport(8)}
            </div>
            {/* {form?.stool_exam_color && form?.stool_exam_color !== '-' && ( */}
            <div ref={(el) => pdfRefs.current[8] = el} className="a4 section flex flex-col ">
                {headerReport()}
                <div className="flex flex-col h-[85%]">
                    {/* ข้อมูล การตรวจอุจจาระ */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การตรวจอุจจาระ</label>
                        </div>
                        {/* [55vh] */}
                        <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light">รายการตรวจ</th>
                                        <th className="font-light">Normal Value</th>
                                        <th className="font-light">2025</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { key: 'stool_exam_color', label: 'Color', value: form?.stool_exam_color },
                                        { key: 'stool_exam_appearance', label: 'Appearance', value: form?.stool_exam_appearance },
                                        { key: 'stool_exam_rbc', label: 'RBC', value: form?.stool_exam_rbc },
                                        { key: 'stool_exam_wbc', label: 'WBC', value: form?.stool_exam_wbc },
                                        { key: 'stool_exam_mucous', label: 'Mucous', value: form?.stool_exam_mucous },
                                        { key: 'stool_exam_parasite', label: 'Parasite', value: form?.stool_exam_parasite },
                                        { key: 'stool_exam_blood', label: 'Stool Exam', value: form?.stool_exam_blood },
                                        { key: 'stool_exam_protozoa', label: 'Protozoa', value: form?.stool_exam_protozoa },
                                    ].map(item => (
                                        <tr key={`tr_${item.key}`} className="hover">
                                            <td className="text-left">{item.label}</td>
                                            <td className="text-left flex items-center gap-2">{'-'}</td>
                                            <td className="text-left">{item.value || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div>
                </div>
                {footerReport(9)}
            </div>
            {/* )} */}
            {/* {(form?.ekg && form?.ekg !== '-')||(form?.chest_xray && form?.chest_xray !== '-')||(form?.full_ultrasound && form?.full_ultrasound !== '-') && ( */}
            <div ref={(el) => pdfRefs.current[9] = el} className="a4 section flex flex-col ">
                {headerReport()}
                <div className="flex flex-col h-[90%]">
                    {/* ข้อมูล X-ray */}
                    {/* <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='kidney-function' className='font-semibold text-[#365382] p-2'>X-ray</label>
                        </div>
                        <div className='flex flex-col justify-start h-auto overflow-auto px-2 pb-2'>
                            <table className="tablePatientInformation w-full">
                                <thead className='text-sm'>
                                    <tr className="text-left bg-[#1A8BB7]">
                                        <th className="font-light min-w-[200px]">X-ray</th>
                                        <th className="font-light w-[200px]">Test</th>
                                        <th className="font-light w-[200px]">Result</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base font-light">
                                    {[
                                        { key: 'chest_xray', label: 'Chest xray', summary: form?.chest_xray_summary, result: form?.chest_xray },
                                        { key: 'mammogram', label: 'Mammogram', summary: form?.mammogram_detail, result: form?.mammogram },
                                        { key: 'upper_ultrasound', label: 'Upper ultrasound', summary: form?.upper_ultrasound_detail, result: form?.upper_ultrasound },
                                        { key: 'lower_ultrasound', label: 'Lower ultrasound', summary: form?.lower_ultrasound_detail, result: form?.lower_ultrasound },
                                        { key: 'bone_density_test', label: 'Bone density', summary: form?.bone_density_test_summary, result: form?.bone_density_test },
                                        { key: 'breast_ultrasound', label: 'Breast ultrasound', summary: form?.breast_ultrasound_detail, result: form?.breast_ultrasound },
                                        { key: 'pelvis_ultrasound', label: 'Pelvis ultrasound', summary: form?.pelvis_ultrasound_detail, result: form?.pelvis_ultrasound },
                                        { key: 'transvaginal_ultrasound', label: 'Transvaginal ultrasound', summary: form?.transvaginal_ultrasound_detail, result: form?.transvaginal_ultrasound },
                                        { key: 'ekg', label: 'EKG', summary: form?.ekg_summary, result: form?.ekg },
                                        { key: 'est', label: 'EST', summary: form?.est_summary, result: form?.est },
                                        { key: 'echo', label: 'Echo', summary: form?.echo_summary, result: form?.echo },
                                        { key: 'ct_scan', label: 'CT scan', summary: form?.ct_scan_summary, result: form?.ct_scan },
                                        { key: 'ct_calcium', label: 'CT calcium', summary: form?.ct_calcium_summary, result: form?.ct_calcium },
                                        { key: 'mri', label: 'MRI', summary: form?.mri_summary, result: form?.mri },
                                        { key: 'alpha_thalassemia', label: 'Alpha thalassemia', summary: form?.alpha_thalassemia_summary, result: form?.alpha_thalassemia },
                                        { key: 'us_doppler', label: 'US doppler', summary: form?.us_doppler_summary, result: form?.us_doppler },
                                        { key: 'cimt', label: 'CIMT', summary: form?.cimt_summary, result: form?.cimt },
                                    ].map(item => (
                                        item.result && item.result !== '-' && (
                                            <tr key={`tr${item.key}`} className="hover">
                                                <td className="text-left">{item.label}</td>
                                                <td className="text-left">{item.summary || ''}</td>
                                                <td className="text-left">{item.result}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>

                            </table>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div> */}

                    {/* ข้อมูล EKG */}
                    {/* {form?.ekg && form?.ekg != '-' && ( */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='kidney-function' className='font-semibold text-[#365382] p-2'>คลื่นไฟฟ้าหัวใจ (EKG)</label>
                        </div>
                        <div onClick={() => console.log(form)} className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <div className='w-full flex'>
                                <label className='font-normal'>{form?.ekg}</label>
                            </div>
                            {form.ekg && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>}
                        </div>
                    </div>
                    {/* )} */}
                    {/* ข้อมูล X-ray */}
                    {/* {form?.chest_xray && form?.chest_xray != '-' && ( */}
                    <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                        <div className='w-full flex'>
                            <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การเอกซเรย์ปอด (Chest X-ray : CXR)</label>
                        </div>
                        <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                            <div className='w-full flex flex-col'>
                                <label
                                    className="font-normal whitespace-pre-line"
                                    style={{ lineHeight: "0.7" }} // ปรับตรงนี้ได้ตามต้องการ เช่น 1.2, 1.3, 1.4
                                >
                                    {
                                        form.chest_xray_summary && form?.chest_xray_summary != '-' ? form.chest_xray_summary.replace(/IMPRESSION:/g, '\nIMPRESSION:') : ""
                                    }
                                </label>
                                <label
                                    className="font-normal whitespace-pre-line"
                                    style={{ lineHeight: "0.7" }} // ปรับตรงนี้ได้ตามต้องการ เช่น 1.2, 1.3, 1.4
                                >
                                    {
                                        form.chest_xray && form?.chest_xray != '-' ? form.chest_xray.replace(/IMPRESSION:/g, '\nIMPRESSION:') : ""
                                    }
                                </label>
                                {/* <label className='font-normal'>{form?.chest_xray_summary}</label>
                                    <label className='font-normal'>{form?.chest_xray}</label> */}
                            </div>
                            {/* <div className='w-full flex pt-2'>
                                <label className='font-normal'>Physical examination:</label>
                                <label className='font-normal ml-2'>{form?.doctor_xray}</label>
                            </div>
                            {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                            </div>} */}
                        </div>
                    </div>
                    {/* )} */}

                    {/* ข้อมูล Ultrasound */}
                    {form?.full_ultrasound && form?.full_ultrasound !== '-' && (
                        <div className="flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3">
                            <div className="w-full flex">
                                <label id="kidney-function" className="font-semibold text-[#365382] p-2">
                                    อัลตราซาวด์ท้อง (Ultrasound Abdomen)
                                </label>
                            </div>
                            <div className="flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2">
                                <div className="w-full flex flex-col">
                                    <label
                                        className="font-normal whitespace-pre-line"
                                        style={{ lineHeight: "0.7" }} // ปรับตรงนี้ได้ตามต้องการ เช่น 1.2, 1.3, 1.4
                                    >
                                        {
                                            form.full_ultrasound.replace(/IMPRESSION:/g, '\nIMPRESSION:')
                                        }
                                    </label>
                                </div>
                                <div className="w-full flex pt-2">
                                    <label className="font-normal">Physical examination:</label>
                                    <label className="font-normal ml-2">-</label>
                                </div>
                                {form.length <= 0 && (
                                    <div className="flex justify-center items-center mt-4">
                                        <label className="text-3xl font-semibold">ไม่มีข้อมูล</label>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                    {/* ข้อมูล Mammography */}
                    {form?.mammogram && form?.mammogram != '-' && (
                        <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                            <div className='w-full flex'>
                                <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การตรวจแมมโมแกรม (Mammogram)</label>
                            </div>
                            <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                                <div className='w-full flex'>
                                    <label className='font-normal'>{form?.mammogram}</label>
                                    <label className='font-normal ml-2'>{form?.mammogram_detail}</label>
                                </div>
                                {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                    <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                                </div>}
                            </div>
                        </div>
                    )}

                    {/* ข้อมูล ผลการตรวจภายใน */}
                    {form?.pap_smear_detail && form?.pap_smear_detail != '-' && (
                        <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                            <div className='w-full flex'>
                                <label id='kidney-function' className='font-semibold text-[#365382] p-2'>ผลการตรวจภายใน (ThinPrep Pap Test)</label>
                            </div>
                            <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                                <div className='w-full flex'>
                                    <label className='font-normal'>{form?.pap_smear_detail}</label>
                                </div>
                                {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                                    <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                                </div>}
                            </div>
                        </div>)}

                </div>
                {footerReport(10)}
            </div>
            {/* )} */}



        </>
    )
}

export default Laboratory