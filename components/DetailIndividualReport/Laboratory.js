'use client'

import { renderHealthSummary } from '@/utils/renderHealthSummary'
import React, { useEffect, useState } from 'react'

function Laboratory({ data }) {
    const [form, setForm] = useState([])


    useEffect(() => {
        if (data) {
            setForm(data || null)
        }
    }, [data])
    console.log("BBB", form)
    return (
        <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
            <div className='flex text-[#F8F8F8] bg-[#6B84B7] justify-center h-12 w-full rounded-lg'>
                <label className='font-semibold text-2xl p-1'>ผลการตรวจทางห้องปฎิบัติหารและอื่นๆ</label>
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
                </div>
                <div className='flex flex-col justify-start h-[45vh] overflow-y-auto px-2 pb-2'>
                    <table className="tablePatientInformation w-full">
                        <thead className='text-sm'>
                            <tr className="text-left bg-[#1A8BB7]">
                                <th className="font-light">รายการตรวจ</th>
                                <th className="font-light">Normal Value</th>
                                <th className="font-light">2025</th>
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
                                // { label: 'Platelet Smear', normal: 'Platelets adequate', value: form?.platelet_smear },
                                // { label: 'MPV', normal: '6 - 12 fL', value: form?.mpv },
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
                        </tbody>
                    </table>
                    <div className="tablePatientInformation p-2 ">
                        {renderHealthSummary(form, ["cbc"])}
                    </div>
                </div>
            </div>




            {/* ข้อมูล น้ำตาลในเลือด */}
            <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                <div className='w-full flex'>
                    <label id='blood-sugar' className='font-semibold text-[#365382] p-2'> ผลการตรวจระดับน้ำตาลในเลือด (Blood Sugar)</label>
                </div>
                {/* h-[30vh] */}
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
                    <label id='blood-sugar' className='font-semibold text-[#365382] p-2'> ผลการตรวจระดับไขมันในเลือด (Lipid Profile)</label>
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
                                { label: 'Cholesterol', normal: '< 200 mg/dL', value: form?.cholesterol },
                                { label: 'Triglyceride', normal: '< 150 mg/dL', value: form?.triglyceride },
                                { label: 'HDL cholesterol', normal: 'M: > 40 F: > 50 mg/dL', value: form?.hdl_cholesterol },
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
                    <label id='kidney-function' className='font-semibold text-[#365382] p-2'>ผลการตรวจระดับกรดยูริกในเลือด (Uric Acid Test)</label>
                </div>
                <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                    <table className="tablePatientInformation w-full">
                        <thead className='text-sm'>
                            <tr className="text-left bg-[#1A8BB7]">
                                <th className="font-light">รายการตรวจ</th>
                                <th className="font-light">Normal Value</th>
                                <th className="font-light" onClick={() => console.log(form)}>2025</th>
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
                </div>
            </div>
            {/* ข้อมูล การทำงานของไต */}
            <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                <div className='w-full flex'>
                    <label id='kidney-function' className='font-semibold text-[#365382] p-2'>ผลการตรวจการทำงานของไต (Kidney Function Tests)</label>
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
                                { label: 'BUN', normal: '6.0 - 20.0	mg/dL', value: form?.bun },
                                { label: 'Creatinine', normal: 'M : 0.67-1.17 F : 0.51-0.95 mg/dL', value: form?.creatinine },
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


            {/* ข้อมูล การทำงานของตับ */}
            <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                <div className='w-full flex'>
                    <label id='Uric-function' className='font-semibold text-[#365382] p-2'> ผลการตรวจการทำงานของตับ (Liver Function Tests)</label>
                </div>
                {/* [60vh] */}
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
                                { key: 'sgot', label: 'SGOT', normal: '5 - 34 U/L', value: form?.sgot },
                                { key: 'sgpt', label: 'SGPT', normal: 'M: 0 - 41 U/L F: 0 - 33 U/L', value: form?.sgpt },
                                { key: 'alkaline_phosphatase', label: 'Alkaline phosphatase', normal: '40 - 150U/L', value: form?.alkaline_phosphatase },
                                { key: 'albumin', label: 'Albumin', normal: '3.5 - 5.2g/dL', value: form?.albumin },
                                { key: 'globumin', label: 'Globumin', normal: '2.1 - 3.7 g/dL', value: form?.globumin },
                                { key: 'total_bilirubin', label: 'Bilirubin', normal: '0-1.2 mg/dL', value: form?.total_bilirubin },
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


            {/* ข้อมูล มะเร็ง */}
            <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                <div className='w-full flex'>
                    <label id='kidney-function' className='font-semibold text-[#365382] p-2'> ผลการตรวจสารบ่งชี้มะเร็ง (Tumor markers)</label>
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
                        </tbody>
                    </table>
                    <div className="tablePatientInformation p-2 ">
                        {renderHealthSummary(form, ["ua"])}
                    </div>
                    {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                        <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                    </div>}
                </div>
            </div>

            {/* ข้อมูล การตรวจปัสสาวะอื่น */}
            {/* <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                <div className='w-full flex'>
                    <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การตรวจปัสสาวะอื่น</label>
                </div>
                <div className='flex flex-col justify-start h-[40vh] overflow-y-auto px-2 pb-2'>
                    <table className="tablePatientInformation w-full">
                        <thead className='text-sm'>
                            <tr className="text-left bg-[#1A8BB7]">
                                <th className="font-light">การตรวจปัสสาวะ</th>
                                <th className="font-light">Normal Value</th>
                                <th className="font-light">2025</th>
                                <th className="font-light">2024</th>
                                <th className="font-light">2023</th>
                                <th className="font-light">Detail</th>
                            </tr>
                        </thead>
                        <tbody className='text-base font-light'>
                            <tr key={`trua_3`} className="hover">
                                <td className={`text-left`}>{'ตรวจการตั้งครรภ์'}</td>
                                <td className="text-left flex items-center gap-2">{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                            </tr>
                            <tr key={`trua_4`} className="hover">
                                <td className={`text-left`}>{'การตรวจหาอนุพันธ์มอร์ฟีน'}</td>
                                <td className="text-left flex items-center gap-2">{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                            </tr>
                            <tr key={`trua_5`} className="hover">
                                <td className={`text-left`}>{'การตรวจหาสารเสพติดในปัสสาวะ'}</td>
                                <td className="text-left flex items-center gap-2">{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                            </tr>
                            <tr key={`trua_6`} className="hover">
                                <td className={`text-left`}>{'การหาเลือดในปัสสาวะ'}</td>
                                <td className="text-left flex items-center gap-2">{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                                <td className={`text-left`}>{''}</td>
                            </tr>
                            <tr key={`trua_7`} className="hover">
                                <td className={`text-left`}>{'การตรวจหากัญชา'}</td>
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
            </div> */}



            {/* ข้อมูล การตรวจอุจจาระ */}
            {form?.stool_exam_color && form?.stool_exam_color != '-' && (
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
                                    {/* <th className="font-light">2024</th>
                                <th className="font-light">2023</th> */}
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
            )}



            {/* ข้อมูล X-ray */}
            {/* <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                <div className='w-full flex'>
                    <label id='kidney-function' className='font-semibold text-[#365382] p-2'>X-ray</label>
                </div>
                <div className='flex flex-col justify-start h-auto overflow-auto px-2 pb-2'>
                    <table className="tablePatientInformation w-full">
                        <thead className='text-sm'>
                            <tr className="text-left bg-[#1A8BB7]">
                                <th className="font-light w-[20%]">รายการตรวจ</th>
                                <th className="font-light w-[50%]">Test</th>
                                <th className="font-light w-[30%]">Result</th>
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
            {form?.ekg && form?.ekg != '-' && (
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>คลื่นไฟฟ้าหัวใจ (EKG)</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <div className='w-full flex'>
                            <label className='font-normal'>{form?.ekg}</label>
                        </div>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
            )}
            {/* ข้อมูล X-ray */}
            {form?.chest_xray_summary && form?.chest_xray_summary != '-' && (
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>การเอกซเรย์ปอด (Chest X-ray : CXR)</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <div className='w-full flex flex-col'>
                            <label className='font-normal'>{form?.chest_xray_summary}</label>
                            <label className='font-normal '>{form?.chest_xray}</label>
                        </div>
                        <div className='w-full flex pt-2'>
                            <label className='font-normal'>Physical examination:</label>
                            <label className='font-normal ml-2'>{form?.doctor_xray}</label>
                        </div>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
                    </div>
                </div>
            )}

            {/* ข้อมูล Ultrasound */}
            {form?.lower_ultrasound && form?.lower_ultrasound != '-' && (
                <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                    <div className='w-full flex'>
                        <label id='kidney-function' className='font-semibold text-[#365382] p-2'>อัลตราซาวด์ท้อง (Ultrasound Abdomen)</label>
                    </div>
                    <div className='flex flex-col justify-start h-auto overflow-y-auto px-2 pb-2'>
                        <div className='w-full flex'>
                            <label className='font-normal'>{form?.full_ultrasound}</label>
                            <label className='font-normal ml-2'>{form?.lower_ultrasound}</label>
                        </div>
                        <div className='w-full flex pt-2'>
                            <label className='font-normal'>Physical examination:</label>
                            <label className='font-normal ml-2'>-</label>
                        </div>
                        {form.length <= 0 && <div className='flex justify-center items-center mt-4'>
                            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
                        </div>}
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

        </div >
    )
}

export default Laboratory