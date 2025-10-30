'use client'

import React, { useEffect, useState } from 'react'



function Resultsphysicaldoctor(props) {
    const { data, pdfRefs, headerReport, footerReport } = props
    const [form, setForm] = useState(null)

    useEffect(() => {
        if (data) {


            setForm(data || null)
        }
    }, [data])

    const isCheckedCheckbox = (item) => {
        if (item) {
            return true;
        } else {
            return false;
        }
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
        <  >
            <div ref={(el) => pdfRefs.current[1] = el} className="a4 section flex flex-col">
                {headerReport()}
                <div className="flex flex-col h-[85%]  p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3">
                    <div className='flex text-[#F8F8F8] bg-[#6B84B7] justify-center h-12 w-full rounded-lg'>
                        <label className='font-semibold text-2xl p-1'>ผลการตรวจร่างกายโดยแพทย์</label>
                    </div>
                    <div className="w-full flex flex-col  ">
                        <div className='w-full flex-col'>
                            <div className='grid gap-4 mt-2'>
                                <label id='results_physical_doctor' className='font-semibold text-[#365382]'>การวัดสัญญานชีพ</label>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex w-full py-2">
                                    <label className='w-2/6'>ส่วนสูง (Height):</label>
                                    <label className='w-1/6 text-center'>{data?.height}</label>
                                    <label className='w-3/6'>ซม.(cm.)</label>
                                </div>
                                <div className="flex w-full">
                                    <label className='w-2/6'>น้ำหนัก (Weight):</label>
                                    <label className='w-1/6 text-center'>{data?.weight}</label>
                                    <label className='w-3/6'>กก.(kg.)</label>
                                </div>
                                <div className="flex w-full">
                                    <label className='w-2/6'>ดัชนีมวลกาย (BMI):</label>
                                    <label className='w-1/6 text-center'>{formatDecimal(data?.bmi)}</label>
                                    <label className='w-3/6'>กก./ต.ร.ม (kg/m².)</label>
                                </div>
                            </div>
                            {/* เส้นขั้น */}
                            <div className='flex col-span-12 border border-[#E2E2E2]  '></div>
                            <div className='w-full flex-col bg-gray-200 py-2'>
                                <div className="flex flex-col w-full">
                                    <div className="flex w-full">
                                        <label className='w-full'>{data?.bmi_interpretation}</label>
                                    </div>
                                </div>
                            </div>
                            {/* เส้นขั้น */}
                            <div className='flex col-span-12 border border-[#E2E2E2] '></div>
                            <div className="flex flex-col w-full py-2">
                                <div className="flex w-full">
                                    <label className='w-2/6'>ความดันโลหิต (Blood Pressure):</label>
                                    <label className='w-1/6 text-center'>{data?.blood_pressure}</label>
                                    <label className='w-3/6'>มม.ปรอท (mmHg)</label>
                                </div>
                            </div>
                            {/* เส้นขั้น */}
                            <div className='flex col-span-12 border border-[#E2E2E2]  '></div>
                            <div className='w-full flex-col bg-gray-200 py-2'>
                                <div className="flex flex-col w-full">
                                    <div className="flex w-full">
                                        <label className='w-full'>{data?.bp_interpretation}</label>
                                    </div>
                                </div>
                            </div>
                            {/* เส้นขั้น */}
                            <div className='flex col-span-12 border border-[#E2E2E2] '></div>
                            <div className="flex flex-col w-full py-2">
                                <div className="flex w-full">
                                    <label className='w-2/6'>ชีพจร (Pulse rate):</label>
                                    <label className='w-1/6 text-center'>{data?.pulse}</label>
                                    <label className='w-3/6'>ครั้งต่อนาที (beat per minute)</label>
                                </div>
                            </div>
                            {/* เส้นขั้น */}
                            <div className='flex col-span-12 border border-[#E2E2E2]  '></div>
                            <div className='w-full flex-col bg-gray-200 py-2'>
                                <div className="flex flex-col w-full">
                                    <div className="flex w-full">
                                        <label className='w-full'>{data?.pulse_interpretation}</label>
                                    </div>
                                </div>
                            </div>
                            {/* เส้นขั้น */}
                            <div className='flex col-span-12 border border-[#E2E2E2] '></div>
                            <div className="w-full flex  py-2">
                                <div className='w-full flex-col'>
                                    <div className="flex flex-col w-full">
                                        <div className="flex w-full">
                                            <label className='w-2/6'>Waist (รอบเอว) :</label>
                                            <label className='w-1/6 text-center'>{data?.waist}</label>
                                            <label className='w-3/6'>{data?.waist_type}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex col-span-12 border border-[#E2E2E2] '></div>
                            <div className="w-full flex bg-gray-200 py-2">
                                <div className='w-full flex-col'>
                                    <div className="flex flex-col w-full">
                                        <div className="flex w-full">
                                            <label className='w-full'>{data?.waist_interpretation || '-'}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex col-span-12 border border-[#E2E2E2] '></div>
                            <div className="w-full flex  py-2">
                                <div className='w-full flex-col'>
                                    <div className="flex flex-col w-full">
                                        <div className="flex w-full">
                                            <label className='w-1/6'>อัตราการหายใจ :</label>
                                            <label className='w-1/6 text-center'>{data?.respiration_rate}</label>
                                            <label className='w-1/6'>{'ครั้ง/นาที'}</label>

                                            <label className='w-1/6'>อุณหภูมิร่างกาย :</label>
                                            <label className='w-1/6 text-center'>{data?.temperature}</label>
                                            <label className='w-1/6'>{'C'}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="">
                        <div className='grid gap-4 mt-2'>
                            <label id='check-your-vision' className='font-semibold text-[#365382]'>ตรวจการมองเห็น</label>
                        </div>

                        <div className='w-full grid grid-cols-5 col-span-12 gap-4 p-2'>
                            <div className='flex gap-2 items-center justify-start'>
                                <input checked={form?.wears_glasses == "ผ่าตัดตาแล้ว"} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382] ' type="checkbox" id="surgery1" name="surgery" />
                                <label htmlFor='surgery1' className=''>ผ่าตัดตาแล้ว</label>
                            </div>
                            <div className='flex gap-2 items-center justify-center'>
                                <input checked={form?.wears_glasses == "สวมแว่น"} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="glasses1" name="glasses" />
                                <label htmlFor='glasses1' className=''>สวมแว่น</label>
                            </div>
                            <div className='flex gap-2 items-center justify-center'>
                                <input checked={form?.wears_glasses == "ใส่คอนแทคเลนส์"} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="contact-lenses1" name="contact-lenses" />
                                <label htmlFor='contact-lenses1' className=''>ใส่คอนแทคเลนส์</label>
                            </div>
                            <div className='flex gap-2 items-center justify-center'>
                                <input checked={form?.wears_glasses == "ทำเลสิก"} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="lasik1" name="lasik" />
                                <label htmlFor='lasik1' className=''>ทำเลสิก</label>
                            </div>
                            <div className='flex gap-2 items-center justify-center'>
                                <input checked={form?.wears_glasses == "ไม่สวมแว่นตา"} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="dont-glasses1" name="dont-glasses" />
                                <label htmlFor='dont-glasses1' className=''>ไม่สวมแว่นตา</label>
                            </div>
                        </div>
                        <div className='w-full grid grid-cols-4 col-span-12 gap-4 p-2'>
                            <div className='flex items-center'>
                                <label className=''>ตาซ้าย (Right eye) : {data?.right_eye_exam || ''}</label>

                            </div>
                            <div className='flex items-center'>
                                <label className='ml-2'>ตาซ้าย (Reft eye) : {data?.left_eye_exam || ''}</label>
                            </div>
                        </div>

                        {/* เส้นขั้น */}
                        <div className='flex col-span-12 border border-[#E2E2E2] my-2'></div>

                        <div className='grid gap-4 mt-2'>
                            <label id='blindness' className='font-semibold text-[#365382]'>ตาบอดสี</label>
                        </div>
                        <div className='w-full grid grid-cols-3 col-span-12 gap-4 p-2'>
                            <div className='flex gap-2 items-center'>
                                <input checked={form?.color_blindness == "ปกติ"} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="normal1" name="normal" value={form?.color_blindness || ''} />
                                <label htmlFor='normal1' className=''>ปกติ</label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input checked={form?.color_blindness == "ผิดปกติ"} className='w-4 h-4 min-w-4 min-h-4  accent-[#365382]' type="checkbox" id="color-blindness1" name="color-blindness" value={form?.color_blindness || ''} />
                                <label htmlFor='color-blindness1' className=''>ตาบอดสี</label>
                            </div>
                        </div>


                        {/* เส้นขั้น */}
                        <div className='flex col-span-12 border border-[#E2E2E2] my-2'></div>
                    </div>
                </div>
                {footerReport(2)}
            </div>
            <div className="mt-1"></div>
            {/* เส้นขั้น */}
            <div ref={(el) => pdfRefs.current[2] = el} className="a4 section flex flex-col">
                {headerReport()}
                <div className="flex flex-col h-[85%]">
                    <div className="w-full flex h-full">
                        <div className='w-full flex-col'>
                            <div className='grid gap-4 mt-2'>
                                <label id='blindness' className='font-semibold text-[#365382]'>การตรวจร่างกายทั่วไป</label>
                            </div>
                            <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF] mt-3'>
                                <div className='flex flex-col justify-start h-full overflow-y-auto '>
                                    <table className="tablePatientInformation w-full">
                                        <thead className='text-sm'>
                                            <tr className="text-left bg-[#1A8BB7]">
                                                <th className="font-light">การตรวจร่างกาย</th>
                                                <th className="font-light text-center">ไม่ตรวจ</th>
                                                <th className="font-light text-center">ปกติ</th>
                                                <th className="font-light text-center">ผิดปกติ</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-base font-light">
                                            {[
                                                { label: 'ดวงตา', key: 'pe_eyes' },//✔️
                                                { label: 'ศรีษะ', key: 'pe_head' },//✔️
                                               // { label: 'คอ', key: 'pe_throat' },// ได้ data "pe_throat" และของอดิศรไม่มี
                                                { label: 'หู', key: 'pe_ears' },//✔️
                                               // { label: 'จมูก', key: 'pe_nose' },// ได้ data "pe_nose" และของอดิศรไม่มี
                                                { label: 'ช่องปาก', key: 'pe_oral_cavity' },// ได้ data "pe_oral_cavity"  ของอดิศรตรง
                                                { label: 'ปอด', key: 'pe_lung' },//✔️
                                                { label: 'หัวใจ', key: 'pe_heart' },//✔️
                                              //  { label: 'ช่องท้อง', key: 'pe_abdominal' },// ได้ data "-"  ของอดิศรไม่มี
                                                { label: 'ผิวหนัง', key: 'pe_skin' }, //✔️
                                                { label: 'ระบบประสาททั่วไป', key: 'pe_nervous_system' },// pe_cerebro_neurological/ไม่มี
                                                { label: 'ภาวะจิตใจทั่วไป', key: 'pe_emotion' }, //pe_mental ไม่มี
                                                //เพิ่มใหม่ 
                                                { label: 'ไหล่', key: 'pe_shoulder' },
                                                { label: 'ขา', key: 'pe_leg' },
                                                { label: 'หน้าอก', key: 'pe_breasts' },
                                                { label: 'หลอดเลือด', key: 'pe_vascular' },
                                                { label: 'กล้าม', key: 'pe_musculo' },
                                                { label: 'ต่อมไร้ท่อ', key: 'pe_endocine' }, 
                                                // { label: 'ระบบประสาทและสมอง', key: 'pe_cerebro_neurological' },
                                               // { label: 'จิต', key: 'pe_mental' }, 
                                            ].map((item, index) => {
                                                const value = data?.[item.key];
                                                return (
                                                    <tr key={index} className="hover">
                                                        <td className="text-left">{item.label}</td>
                                                        <td className="text-center">{value === "ไม่ตรวจ" ? "ไม่ตรวจ" : ""}</td>
                                                        <td className="text-center">{value === "ปกติ" || value === "Normal" ? "✔️" : ""}</td>
                                                        <td className="text-center">{value === "ผิดปกติ" || value === "Abnormal" ? "✔️" : ""}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {footerReport(3)}
            </div>

        </>
    )
}

export default Resultsphysicaldoctor