import React from 'react'
import dayjs from "dayjs";
import "dayjs/locale/th"; // นำเข้า locale ภาษาไทย
import buddhistEra from "dayjs/plugin/buddhistEra"; // นำเข้า plugin สำหรับปีพุทธศักราช
import updateLocale from "dayjs/plugin/updateLocale"; // นำเข้า updateLocale เพื่อตั้งค่าการแสดงผล 
import { renderHealthSummary } from '@/utils/renderHealthSummary';

dayjs.extend(buddhistEra);
dayjs.extend(updateLocale);
dayjs.locale("th");
// ✅ ปรับการแสดงผลให้เป็น "13 มีนาคม 2566"
dayjs.updateLocale("th", {
    months: [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ]
});
function Pdfa4(props) {
    const { p, pdfRefs, index } = props
    const lohit = [
        {
            "name": "Hb",
            "paramresult": "cbc_hb",
            "normalvalue": "13.0 - 18.0 g/dL"
        },
        {
            "name": "Heamatocrit",
            "paramresult": "cbc_hct",
            "normalvalue": "40 - 54 %",
        },
        {
            "name": "White Cell Count",
            "paramresult": "cbc_wbc",
            "normalvalue": "4.00 - 10.00 /mm³",
        },
        {
            "name": "Neutrophil",
            "paramresult": "cbc_neutrophil",
            "normalvalue": "46.5 - 75.0 %",
        },
        {
            "name": "Lymphocyte",
            "paramresult": "cbc_lymphocyte",
            "normalvalue": "12.0 - 44.0 %",
        },
        {
            "name": "Monocyte",
            "paramresult": "cbc_monocyte",
            "normalvalue": "0.0 - 11.2 %",
        },
        {
            "name": "Eosinophil",
            "paramresult": "cbc_eosinophil",
            "normalvalue": "0.0 - 9.5 %",
        },
        {
            "name": "Basophil",
            "paramresult": "cbc_basophil",
            "normalvalue": "0.0 - 2.5 %",
        },
        {
            "name": "Platelets",
            "paramresult": "platelet_count",
            "normalvalue": "140 - 450 /mm³",
        },
        // {
        //     "name": "Platelet Comment",
        //     "paramresult": "aaa",
        //     "normalvalue": "-",
        // },
        {
            "name": "MPV",
            "paramresult": "mpv",
            "normalvalue": "6.0 - 12.0",
        },
        {
            "name": "Red Cell Count",
            "paramresult": "rbc",
            "normalvalue": "4.50 - 5.90 /mm³",
        },
        {
            "name": "Mean Cell Volume",
            "paramresult": "cbc_mvc",
            "normalvalue": "80.0 - 100.0",
        },
        {
            "name": "MCH",
            "paramresult": "mch",
            "normalvalue": "26.0 - 34.0 pg",
        },
        {
            "name": "MCHC",
            "paramresult": "mchc",
            "normalvalue": "31.0 - 37.0 g/dL",
        },
        {
            "name": "RDW",
            "paramresult": "rdw",
            "normalvalue": "9.0 - 15.0 %",
        },
        {
            "name": "RBC Morphology",
            "paramresult": "cbc_rbc_morphology",
            "normalvalue": "-",
        },
        {
            "name": "Anisocytosis",
            "paramresult": "aaa",
            "normalvalue": "-",
        },
        {
            "name": "Microcytosis",
            "paramresult": "aaa",
            "normalvalue": "-",
        },
    ]
    const Bloodsugar = [
        {
            "name": "Glucose (Fasting)",
            "paramresult": "fbs",
            "normalvalue": "70 - 99 mg/dL",
        },
        {
            "name": "Hb 1Ac",
            "paramresult": "hba1c",
            "normalvalue": "",
        },
    ]
    const Kidney = [
        {
            "name": "Creatinine",
            "paramresult": "creatinine",
            "normalvalue": "0.73 - 1.18 mg/dL",
        },
        {
            "name": "Blood Urea Nitrogen",
            "paramresult": "bun",
            "normalvalue": "8.4 - 25.7 mg/dL",
        },
        {
            "name": "eGFR (Non-African American)",
            "paramresult": "egfr",
            "normalvalue": "ml/min/1.73m²",
        },
    ]
    const Liver = [
        {
            "name": "AST",
            "paramresult": "sgot",
            "normalvalue": "5 - 34 U/L",
        },
        {
            "name": "ALT",
            "paramresult": "sgpt",
            "normalvalue": "0 - 55 U/L",
        },
        {
            "name": "Alkaline Phosphatase",
            "paramresult": "alkaline_phosphatase",
            "normalvalue": "40 - 150",
        },
    ]
    const Lipid = [
        {
            "name": "Cholesterol",
            "paramresult": "cholesterol",
            "normalvalue": "<200 mg/dL",
        },
        {
            "name": "Triglyceride",
            "paramresult": "triglyceride",
            "normalvalue": "<150 mg/dL",
        },
        {
            "name": "HDL Cholesterol",
            "paramresult": "hdl_cholesterol",
            "normalvalue": ">40 mg/dL",
        },
        {
            "name": "LDL Direct",
            "paramresult": "ldl_cholesterol",
            "normalvalue": "<130 mg/dL",
        },
    ]
    const Uric = [
        {
            "name": "Uric Acid",
            "paramresult": "uric_acid",
            "normalvalue": "3.5 - 7.2 mg/dL",
        },
    ]
    const Urine = [
        {
            "name": "Color",
            "paramresult": "ua_color",
            "normalvalue": "-",
        },
        {
            "name": "Transparency",
            "paramresult": "ua_appearance",
            "normalvalue": "-",
        },
        {
            "name": "Specific Gravity",
            "paramresult": "ua_sp_gr",
            "normalvalue": "1.003 - 1.030",
        },
        {
            "name": "pH",
            "paramresult": "ua_ph",
            "normalvalue": "4.5 - 8.0",
        },
        {
            "name": "Protein",
            "paramresult": "ua_protein",
            "normalvalue": "-",
        },
        {
            "name": "Glucose",
            "paramresult": "ua_glucose",
            "normalvalue": "-",
        },
        {
            "name": "Keytone",
            "paramresult": "ua_ketone",
            "normalvalue": "-",
        },
        {
            "name": "Erythrocytes",
            "paramresult": "ua_blood",
            "normalvalue": "-",
        },
        {
            "name": "Bilirubin",
            "paramresult": "ua_bilirubin",
            "normalvalue": "-",
        },
        {
            "name": "Urobilinogen BGH",
            "paramresult": "ua_urobilinogen",
            "normalvalue": "-",
        },
        {
            "name": "Nitrite",
            "paramresult": "ua_nitrite",
            "normalvalue": "-",
        },
        {
            "name": "WBC",
            "paramresult": "ua_wbc",
            "normalvalue": "-cells/HPF",
        },
        {
            "name": "RBC",
            "paramresult": "ua_rbc",
            "normalvalue": "-cells/HPF",
        },
        {
            "name": "Epithelial Cells",
            "paramresult": "ua_epithelial",
            "normalvalue": "-cells/HPF",
        },
        {
            "name": "Leucocytes",
            "paramresult": "ua_leukocytes",
            "normalvalue": "-",
        },
    ]
    const Stool = [
        {
            "name": "Color",
            "paramresult": "stool_exam_color",
            "normalvalue": "-",
        },
        {
            "name": "Appearance",
            "paramresult": "stool_exam_appearance",
            "normalvalue": "-",
        },
        {
            "name": "RBC",
            "paramresult": "stool_exam_rbc",
            "normalvalue": "-",
        },
        {
            "name": "WBC",
            "paramresult": "stool_exam_wbc",
            "normalvalue": "-",
        },
        {
            "name": "Mucous",
            "paramresult": "stool_exam_mucous",
            "normalvalue": "-",
        },
        {
            "name": "Parasite",
            "paramresult": "stool_exam_parasite",
            "normalvalue": "-",
        },
        {
            "name": "Stool Exam",
            "paramresult": "stool_exam_blood",
            "normalvalue": "-",
        },
        {
            "name": "Protozoa",
            "paramresult": "stool_exam_protozoa",
            "normalvalue": "-",
        },
    ]
    // ✅ ฟังก์ชันแปลงวันที่เป็น "13 มีนาคม 2566"
    const formatThaiDate = (date) => {
        return dayjs(date).format("D MMMM BBBB"); // ใช้ "BBBB" แทนปีพุทธศักราช
    };
    const headerReport = () => {
        return (
            <div className="flex  h-[10%] text-[10px]">
                <div className="flex flex-col justify-center items-start w-2/5   p-2">
                    <img src="/images/telecorp.png" alt="" />
                </div>
                <div className="flex flex-col justify-center items-end w-3/5">
                    <label className='font-light text-right'>บริษัทเทเลคอร์ป จำกัด</label>
                    <label className='font-light text-right'>216/51-52 ถนนกาญจนาภิเษก แขวงทับช้าง เขตสะพานสูง กรุงเทพมหานคร 10250</label>
                    <label className='font-light text-right'>216/51-52, Kanchanaphisek Road, Saphan Sung, Saphan Sung, Bangkok 10250</label>
                </div>

            </div>
        )
    }
    const footerReport = (page) => {
        return (
            <div className="flex h-[5%] px-4 text-[10px]">
                <div className="flex flex-col justify-center items-start w-full">
                    <label className='font-light text-left'>บริษัทเทเลคอร์ป จำกัด</label>
                    <label className='font-light text-left'>216/51-52 ถนนกาญจนาภิเษก แขวงทับช้าง เขตสะพานสูง กรุงเทพมหานคร 10250</label>
                    <label className='font-light text-left'>216/51-52, Kanchanaphisek Road, Saphan Sung, Saphan Sung, Bangkok 10250</label>
                </div>
            </div>
        )
    }
    function formatDecimal(value, decimalPlaces = 2) {
        if (value === null || value === undefined) return null;

        const str = String(value).trim();

        // ข้ามค่าที่ไม่ควรแปลง
        if (str === '' || str === '-') return null;

        const num = Number(str);

        if (isNaN(num)) return null;

        return num.toFixed(decimalPlaces);
    }
    return (
        <>
            {/* หน้า 1 */}
            <div ref={(el) => pdfRefs.current[index] = el} className="a4 section flex flex-col ">
                {headerReport()}
                <div className="flex h-[85%] text-[10px]">
                    <div className="flex flex-col w-1/2 mr-1">
                        <div className="w-full p-2 border border-gray-400 flex flex-col">
                            <label className='font-semibold'>ชื่อ-นามสกุล {(p?.prefix || '') + ' ' + (p?.first_name || '') + ' ' + (p?.last_name || '')}</label>
                            <label className='font-semibold'>HN {p?.hn || '-'}</label>
                            <label className='font-semibold'>{p?.company_name || '-'}</label>
                            <label className='font-semibold'>อายุ {p?.age || '-'} เพศ {p?.gender || '-'} วันที่ตรวจ {formatThaiDate(p?.exam_date) || '-'} </label>
                            <div className="flex w-full">
                                <label className='w-1/3'>น้ำหนัก (weight):</label>
                                <label className='w-1/3 text-center'>{p?.weight}</label>
                                <label className='w-1/3'>กก.(kg.)</label>
                            </div>
                            <div className="flex w-full">
                                <label className='w-1/3'>ส่วนสูง (Height):</label>
                                <label className='w-1/3 text-center'>{p?.height}</label>
                                <label className='w-1/3'>ซม.(cm.)</label>
                            </div>
                            <div className="flex w-full">
                                <label className='w-1/3'>ดัชนีมวลกาย (BMI):</label>
                                <label className='w-1/3 text-center'>{formatDecimal(p?.bmi)}</label>
                                <label className='w-1/3'>กก./ต.ร.ม (kg/m².)</label>
                            </div>
                            <label className=''>{p?.bmi_interpretation || '-'}</label>
                            <div className="flex w-full">
                                <label className='w-3/6'>ความดันโลหิต (Blood Pressure):</label>
                                <label className='w-1/6'>{p?.blood_pressure}</label>
                                <label className='w-2/6'>มม.ปรอท (mmHg)</label>
                            </div>
                            <label className=''>{p?.bp_interpretation || '-'}</label>
                            <div className="flex w-full">
                                <label className='w-1/3'>ชีพจร (Pulse rate):</label>
                                <label className='w-1/3 text-center'>{p?.pulse}</label>
                                <label className='w-1/3'>ครั้งต่อนาที (bpm)</label>
                            </div>
                            <label className=''>{p?.pulse_interpretation || '-'}</label>
                            <div className="flex w-full">
                                <label className='w-1/3'>รอบเอว:</label>
                                <label className='w-2/3 text-center'>{p?.aaa || '-'}</label>
                            </div>
                            <label className=''>{p?.aaa || '-'}</label>
                            <div className="flex w-full">
                                <label className='w-2/3'>ผลตรวจร่างกาย (Physical Examination):</label>
                                {/* <label className='w-1/3 text-center'>{p?.physical_exam_summary || '-'}</label> */}
                            </div>
                            <label className=''>{p?.physical_exam_summary || '-'}</label>
                        </div>
                        <div className="w-full p-2 border border-gray-400 flex flex-col shadow-2xl shadow-black mt-2">
                            <div className="w-full flex">
                                <div className="w-1/3 flex justify-start">
                                    <label>รายการตรวจ</label>
                                </div>
                                <div className="w-1/3 flex justify-start">
                                    <label>ผลการตรวจ(Result)</label>
                                </div>
                                <div className="w-1/3 flex justify-start">
                                    <label>ค่าปกติ(Nomal Value)</label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-[#566c88] text-white  mt-2  p-1">
                            <label className='font-semibold'>โลหิตวิทยา(Hematology)</label>
                        </div>
                        <div className="w-full border border-gray-400 flex flex-col ">
                            <div className="w-full p-2 bg-gray-200 flex flex-col ">

                                {lohit.map((item, index) => {
                                    return (
                                        <div key={index} className="w-full flex">
                                            <div className="w-1/3 flex justify-start">
                                                <label>{item.name}</label>
                                            </div>
                                            <div className="w-1/3 flex justify-center">
                                                <label>{p[item.paramresult] || "-"}</label>
                                            </div>
                                            <div className="w-1/3 flex justify-start">
                                                <label>{item.normalvalue}</label>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                            <div className="w-full p-2 flex flex-col ">
                                {renderHealthSummary(p, ["cbc"])}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 ml-1">
                        <div className="w-full p-2 border border-gray-400 flex flex-col shadow-2xl shadow-black">
                            <div className="w-full flex">
                                <div className="w-1/3 flex justify-start">
                                    <label>รายการตรวจ</label>
                                </div>
                                <div className="w-1/3 flex justify-start">
                                    <label>ผลการตรวจ(Result)</label>
                                </div>
                                <div className="w-1/3 flex justify-start">
                                    <label>ค่าปกติ(Nomal Value)</label>
                                </div>
                            </div>
                        </div>
                        {/* ระดับน้ำตาลในเลือด */}
                        <div className="w-full bg-[#566c88] text-white mt-2 p-1">
                            <label className="font-semibold">ระดับน้ำตาลในเลือด (Blood Sugar)</label>
                        </div>
                        <div className="w-full border border-gray-400 flex flex-col ">
                            <div className="w-full p-2 bg-gray-200 flex flex-col ">
                                {Bloodsugar.map((item, index) => (
                                    <div key={index} className="w-full flex">
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.name}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-center">
                                            <label>{p[item.paramresult] || "-"}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.normalvalue}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full p-2 flex flex-col ">
                                {renderHealthSummary(p, ["diabetes"])}
                            </div>
                        </div>
                        {/* การทำงานของไต */}
                        <div className="w-full bg-[#566c88] text-white  mt-2  p-1">
                            <label className='font-semibold'>การทำงานของไต (Kidney Function Test)</label>
                        </div>
                        <div className="w-full border border-gray-400 flex flex-col ">
                            <div className="w-full p-2 bg-gray-200 flex flex-col ">
                                {Kidney.map((item, index) => (
                                    <div key={index} className="w-full flex">
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.name}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-center">
                                            <label>{p[item.paramresult] || "-"}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.normalvalue}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full p-2 flex flex-col ">
                                {renderHealthSummary(p, ["kidney"])}
                            </div>
                        </div>
                        {/* การทำงานของตับ */}
                        <div className="w-full bg-[#566c88] text-white  mt-2  p-1">
                            <label className='font-semibold'>การทำงานของตับ (Liver Function Test)</label>
                        </div>
                        <div className="w-full border border-gray-400 flex flex-col ">
                            <div className="w-full p-2 bg-gray-200 flex flex-col ">
                                {Liver.map((item, index) => (
                                    <div key={index} className="w-full flex">
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.name}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-center">
                                            <label>{p[item.paramresult] || "-"}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.normalvalue}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full p-2 flex flex-col ">
                                {renderHealthSummary(p, ["liver"])}
                            </div>
                        </div>
                        {/* ผลการตรวจระดับไขมันในเลือด */}
                        <div className="w-full bg-[#566c88] text-white  mt-2  p-1">
                            <label className='font-semibold'>ผลการตรวจระดับไขมันในเลือด (Lipid Profile)</label>
                        </div>
                        <div className="w-full border border-gray-400 flex flex-col ">
                            <div className="w-full p-2 bg-gray-200 flex flex-col ">
                                {Lipid.map((item, index) => (
                                    <div key={index} className="w-full flex">
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.name}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-center">
                                            <label>{p[item.paramresult] || "-"}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.normalvalue}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full p-2 flex flex-col ">
                                {renderHealthSummary(p, ["lipid"])}
                            </div>
                        </div>
                        {/* ผลการตรวจระดับกรดยูริกในเลือด */}
                        <div className="w-full bg-[#566c88] text-white  mt-2  p-1">
                            <label className='font-semibold'>ผลการตรวจระดับกรดยูริกในเลือด (Uric Acid Test)</label>
                        </div>
                        <div className="w-full border border-gray-400 flex flex-col ">
                            <div className="w-full p-2 bg-gray-200 flex flex-col ">
                                {Uric.map((item, index) => (
                                    <div key={index} className="w-full flex">
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.name}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-center">
                                            <label>{p[item.paramresult] || "-"}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.normalvalue}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full p-2 flex flex-col ">
                                {renderHealthSummary(p, ["uric"])}
                            </div>
                        </div>
                    </div>
                </div>
                {footerReport(1)}
            </div>
            {/* หน้า 2 */}
            <div ref={(el) => pdfRefs.current[index + 1] = el} className="a4 section flex flex-col">
                <div className="flex flex-col w-full h-[95%] text-[10px]">
                    <div className="flex w-full bg-[#566c88] text-white  mt-2  p-1">
                        <div className="w-1/2 flex justify-start">
                            <label className='font-semibold '>{(p?.prefix || '') + ' ' + (p?.first_name || '') + ' ' + (p?.last_name || '')}</label>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <label className='font-semibold '>H.N. {p?.hn || '-'}</label>
                        </div>
                    </div>
                    <div className="flex w-full border border-gray-400 shadow-2xl  p-1">
                        <div className="w-1/6 flex justify-start">
                            <label className='font-semibold '>รายการตรวจ</label>
                        </div>
                        <div className="w-1/6 flex justify-center">
                            <label className='font-semibold '>ผลตรวจ(Result)</label>
                        </div>
                        <div className="w-1/6 flex justify-start">
                            <label className='font-semibold '>ค่าปกติ (Normal Value)</label>
                        </div>
                        <div className="w-1/6 flex justify-start">
                            <label className='font-semibold ml-3'>รายการตรวจ</label>
                        </div>
                        <div className="w-1/6 flex justify-center">
                            <label className='font-semibold '>ผลตรวจ(Result)</label>
                        </div>
                        <div className="w-1/6 flex justify-start">
                            <label className='font-semibold '>ค่าปกติ (Normal Value)</label>
                        </div>
                    </div>
                    <div className="flex mt-2">
                        <div className="flex flex-col w-1/2 mr-1">
                            <div className="w-full bg-[#566c88] text-white p-1">
                                <label className='font-semibold'>การวิเคราห์ปัสสาวะ(Urine Analysis)</label>
                            </div>
                            <div className="w-full border border-gray-400 flex flex-col ">
                                <div className="w-full p-2 bg-gray-200 flex flex-col ">

                                    {Urine.map((item, index) => (
                                        <div key={index} className="w-full flex">
                                            <div className="w-1/3 flex justify-start">
                                                <label>{item.name}</label>
                                            </div>
                                            <div className="w-1/3 flex justify-center">
                                                <label>{p[item.paramresult] || "-"}</label>
                                            </div>
                                            <div className="w-1/3 flex justify-start">
                                                <label>{item.normalvalue}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full p-2 flex flex-col ">
                                    <label className='font-semibold'>{p?.ua_color_detail && <>{p.ua_color_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_appearance_detail && <>{p.ua_appearance_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_sp_gr_detail && <>{p.ua_sp_gr_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_ph_detail && <>{p.ua_ph_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_protein_detail && <>{p.ua_protein_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_glucose_detail && <>{p.ua_glucose_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_ketone_detail && <>{p.ua_ketone_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_blood_detail && <>{p.ua_blood_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_bilirubin_detail && <>{p.ua_bilirubin_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_urobilinogen_detail && <>{p.ua_urobilinogen_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_nitrite_detail && <>{p.ua_nitrite_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_wbc_detail && <>{p.ua_wbc_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_rbc_detail && <>{p.ua_rbc_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_epithelial_detail && <>{p.ua_epithelial_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_leukocytes_detail && <>{p.ua_leukocytes_detail}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ua_summary || '-'}</label>
                                </div>
                            </div>
                            <div className="w-full bg-[#566c88] text-white p-1">
                                <label className='font-semibold'>การตรวจอุจจาระ (Stool Examination)</label>
                            </div>
                             <div className="w-full border border-gray-400 flex flex-col ">
                            <div className="w-full p-2 bg-gray-200 flex flex-col ">

                                {Stool.map((item, index) => (
                                    <div key={index} className="w-full flex">
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.name}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-center">
                                            <label>{p[item.paramresult] || "-"}</label>
                                        </div>
                                        <div className="w-1/3 flex justify-start">
                                            <label>{item.normalvalue}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full flex flex-col ">
                                <div className="w-full p-2 flex flex-col ">
                                    <label className='font-semibold'>{p?.stool_exam_detail && <>{p.stool_exam_detail}<br /></>}</label> 
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 ml-1">
                            {/* Electrocardiogram */}
                            <div className="w-full bg-[#566c88] text-white p-1">
                                <label className='font-semibold'>Electrocardiogram (EKG)</label>
                            </div>
                            <div className="w-full border border-gray-400 flex flex-col ">
                                <div className="w-full p-2 flex flex-col ">
                                    <label className='font-semibold'>{p?.ekg && <>{p.ekg}<br /></>}</label>
                                    <label className='font-semibold'>{p?.ekg_summary && <>{p.ekg_summary}<br /></>}</label>
                                </div>
                            </div>
                            {/* เอกซเรย์ทรวงอก */}
                            <div className="w-full bg-[#566c88] text-white p-1">
                                <label className='font-semibold'>เอกซเรย์ทรวงอก (Chest X-ray)</label>
                            </div>
                            <div className="w-full border border-gray-400 flex flex-col ">
                                <div className="w-full p-2 flex flex-col ">
                                    <label className='font-semibold'>{p?.chest_xray_summary && <>{p.chest_xray_summary}<br /></>}</label>
                                    <label className='font-semibold'>{p?.chest_xray && <>{p.chest_xray}<br /></>}</label>
                                </div>
                            </div>
                            {/* Ultrasound */}
                            {p.full_ultrasound ? <>
                                <div className="w-full bg-[#566c88] text-white p-1">
                                    <label className='font-semibold'>อัลตร้าซาวด์ (Ultrasound)</label>
                                </div>
                                <div className="w-full border border-gray-400 flex flex-col ">
                                    <div className="w-full p-2 flex flex-col ">
                                        <label className='font-semibold'>{p?.full_ultrasound && <>{p.full_ultrasound}<br /></>}</label>
                                    </div>
                                </div>
                            </> : ""}
                            {/* สรุปผลการตรวจ และคำแนะนำเพิ่มเติม */}
                            <div className="w-full bg-[#566c88] text-white p-1">
                                <label className='font-semibold'>สรุปผลการตรวจ และคำแนะนำเพิ่มเติม (Additional Conclusion and Recommendation)</label>
                            </div>
                            <div className="w-full border border-gray-400 flex flex-col ">
                                <div className="w-full p-2 flex flex-col ">
                                    {renderHealthSummary(p, ["all"])}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-[5%] px-4 text-[10px]">
                    <div className="flex flex-col justify-center items-start w-1/2">
                        <label className='font-light text-left'>บริษัทเทเลคอร์ป จำกัด</label>
                        <label className='font-light text-left'>216/51-52 ถนนกาญจนาภิเษก แขวงทับช้าง เขตสะพานสูง กรุงเทพมหานคร 10250</label>
                        <label className='font-light text-left'>216/51-52, Kanchanaphisek Road, Saphan Sung, Saphan Sung, Bangkok 10250</label>
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/2">
                        <div className="flex w-full justify-center">
                            <label className='font-light text-right w-2/5'>แพทย์ตรวจสุขภาพ (Doctor):</label>
                            <label className='font-light text-center w-3/5 border-b border-dotted border-black'>{p.aaa || ""}</label>
                        </div>
                        <label className='font-light text-center'>พญ. xxx xxx</label>
                        <label className='font-light text-center'>ว.23168</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pdfa4