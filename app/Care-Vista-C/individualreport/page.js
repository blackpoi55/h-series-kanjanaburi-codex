'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Baselayout from '@/components/Baselayout/Baselayout_Care';
import CardReport from '@/components/CardIndividualReport/CardReport';
import Laboratory from '@/components/DetailIndividualReport/Laboratory';
import Resultsphysicaldoctor from '@/components/DetailIndividualReport/Resultsphysicaldoctor';
import SummaryRecommen from '@/components/DetailIndividualReport/SummaryRecommen';
import { saveAlert, succeedAlert } from '@/components/SweetAlert/sweetAlert';
import Loading from '@/components/Tool/Loading';
import { LoadingProvider } from '@/components/Tool/LoadingContext ';
import { addNurseApprove, gettrhealthfiles, gettrhealthfiles_Online, HealthRecordsbyHNEN, HealthRecordsbyHNEN_Online, putHealthRecords, translateCareC } from '@/action/api';
import Swal from 'sweetalert2';
import ViewUploadModal from '@/components/UploadModal/ViewUploadModal';

export default function page() {
    const searchParams = useSearchParams();
    const HN = searchParams.get('hn');
    const EN = searchParams.get('en');
    const [uploadOpen, setUploadOpen] = useState(false);
    const healthrecordsidRef = useRef();
    const router = useRouter();
    const [wait, setWait] = useState(null);
    const [form, setForm] = useState({});
    const [role, setrole] = useState("");
    const [User, setUser] = useState("");
    const [haveFileUpload, sethaveFileUpload] = useState(false);
    const [labResult, setlabResult] = useState([])
    useEffect(() => {
        let val = localStorage.getItem('role');
        let user = localStorage.getItem('user');
        console.log(JSON.parse(user))
        setUser(JSON.parse(user));
        setrole(val);
        if (HN) {
            refresh();
        }
    }, [HN]);

    const refresh = async () => {
        const data = { hn: HN, en: EN };
        setWait(true);

        const callApiWithFiles = async (mainApi, fileApi) => {
            const res = await mainApi(data);
            if (res?.message === 'success') {
                setForm(res?.data || null);
                const files = await fileApi(res?.data?.id);
                sethaveFileUpload(files?.data?.length > 0);
                return true;
            }
            return false;
        };

        const success = await callApiWithFiles(HealthRecordsbyHNEN, gettrhealthfiles)
            || await callApiWithFiles(HealthRecordsbyHNEN_Online, gettrhealthfiles_Online);

        if (!success) console.log('error');

        setWait(false);
    };

    const onViewpdf = () => {
        healthrecordsidRef.current = form?.id
        setUploadOpen(true);
    }
    const onSaveNurse = () => {
        Swal.fire({
            title: 'บันทึก Nurse Approve',
            input: 'textarea',
            inputLabel: 'หมายเหตุถึงแพทย์',
            inputPlaceholder: 'กรุณากรอกหมายเหตุ (ถ้ามี)...',
            inputAttributes: { 'aria-label': 'Nurse Remark' },
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const saveData = {
                    nurse_approve: 'Y',
                    nurse_note: result.value || '',
                    nurse_approve_id: User?.user?.id,
                    nurse_approve_time: new Date().toISOString(),
                };
                if (form?.id) {
                    const res = await addNurseApprove(form?.id, saveData);
                    if (!res?.error) {
                        succeedAlert().then(() => {
                            refresh();
                            window.close();
                        });
                    }
                }
            }
        });
    };

    const onSaveDoctor = (status) => {
        saveAlert({
            onCancel: () => console.log('Cancelled'),
            onSave: async () => {
                const saveData = {
                    doctor_approve: status,
                    doctor_approve_id: User?.user?.id,
                    doctor_approve_time: new Date().toISOString(),
                };
                if (form?.id) {
                    const res = await addNurseApprove(form?.id, saveData);
                    if (!res?.error) {
                        succeedAlert().then(() => {
                            refresh();
                            window.close();
                        });
                    }
                }
            }
        });
    };

    const onRejectDoctor = () => {
        Swal.fire({
            title: 'ปฏิเสธการอนุมัติ',
            input: 'textarea',
            inputLabel: 'หมายเหตุจากแพทย์',
            inputPlaceholder: 'กรุณากรอกหมายเหตุ...',
            inputAttributes: { 'aria-label': 'Doctor Remark' },
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            preConfirm: (remark) => {
                if (!remark) {
                    Swal.showValidationMessage('กรุณาระบุหมายเหตุ');
                    return false;
                }
                return remark;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const saveData = {
                    reject_status: 'Y',
                    doctor_note: result.value,
                    doctor_approve_id: User?.user?.id,
                    doctor_approve_time: new Date().toISOString(),
                };
                if (form?.id) {
                    const res = await addNurseApprove(form?.id, saveData);
                    if (!res?.error) {
                        succeedAlert().then(() => {
                            refresh();
                            window.close();
                        });
                    }
                }
            }
        });
    };
    const checkvalue = (val) => {
        if (val && val != "-") {
            return val
        }
        else {
            return ""
        }
    }
    const calculateResult = async () => {
        let val = [
            { Name: "BMI", ResultValue: form.bmi, bmi: form.bmi || "", height: form.height, Code: "BMI" },
            { Name: "BP", ResultValue: form.blood_pressure.replace(' ', ''), bp: form.blood_pressure.replace(' ', '') || "", Code: "BP" },
            { Name: "P", ResultValue: form.pulse, pulse: form.pulse || "", Code: "P" },
            { Name: "Waist", ResultValue: form.pulse, waist: form.pulse, height: form.height || "", Code: "Waist" },

            { Name: "Glucose (FBS)", ResultValue: form.fbs || "", Code: "C001" },

            { Name: "Cholesterol", ResultValue: form.cholesterol || "", Code: "C002" },
            { Name: "Triglyceride", ResultValue: form.triglyceride || "", Code: "C003" },
            { Name: "HDL", ResultValue: form.hdl || "", Code: "C034" },
            { Name: "LDL", ResultValue: form.ldl || "", Code: "C032" },

            { Name: "Uric Acid", ResultValue: form.uric_acid || "", Code: "C006" },

            { Name: "ALT", ResultValue: form.alt || "", Code: "C016" },
            { Name: "AST", ResultValue: form.ast || "", Code: "C015" },
            { Name: "Alkaline Phosphatase", ResultValue: form.alkaline_phosphatase || "", Code: "C017" },
            { Name: "Bilirubin Total", ResultValue: form.bilirubin_total || "", Code: "C013" },
            { Name: "Bilirubin Direct", ResultValue: form.bilirubin_direct || "", Code: "C014" },
            { Name: "Bilirubin Indirect", ResultValue: form.bilirubin_indirect || "", Code: "C080" },
            { Name: "Gamma GT", ResultValue: form.ggt || "", Code: "C048" },
            { Name: "Total protein", ResultValue: form.total_protein || "", Code: "C010" },
            { Name: "Albumin", ResultValue: form.albumin || "", Code: "C011" },
            { Name: "Globulin", ResultValue: form.globulin || "", Code: "C012" },

            { Name: "BUN", ResultValue: form.bun || "", Code: "C005" },
            { Name: "Creatinine", ResultValue: form.creatinine || "", Code: "C087002" },
            { Name: "eGFR (CKD-EPI)", ResultValue: form.egfr || "", Code: "C087001" },

            { Name: "Color", ResultValue: form.ua_color || "", Code: "U001001" },
            { Name: "Appearance", ResultValue: form.stool_exam_appearance || "", Code: "U001002" },
            { Name: "Sp.gr", ResultValue: form.ua_sp_gr || "", Code: "U001003" },
            { Name: "Ph", ResultValue: form.ua_ph || "", Code: "U001004" },
            { Name: "Protein", ResultValue: form.ua_protein || "", Code: "U040004" },
            { Name: "Glucose", ResultValue: form.ua_glucose || "", Code: "U001006" },
            { Name: "Ketone", ResultValue: form.ua_ketone || "", Code: "U001007" },
            { Name: "WBC", ResultValue: form.ua_wbc || "", Code: "U001010" },
            { Name: "Epithelial", ResultValue: form.ua_epithelial || "", Code: "U001012" },
            { Name: "Leukocytes", ResultValue: form.ua_leukocytes || "", Code: "U001022" },
            { Name: "Nitrite", ResultValue: form.ua_nitrite || "", Code: "U0010081" },

            { Name: "Hb", ResultValue: form.cbc_hb, Code: "H002001" },
            { Name: "HCT", ResultValue: form.cbc_hct, Code: "H002002" },
            { Name: "WBC", ResultValue: form.cbc_wbc, Code: "H005" },
            { Name: "Neutrophil", ResultValue: form.cbc_neutrophil, Code: "H002004" },
            { Name: "Lymphocyte", ResultValue: form.cbc_lymphocyte, Code: "H002005" },
            { Name: "Monocyte", ResultValue: form.cbc_monocyte, Code: "H002007" },
            { Name: "Eosinophil", ResultValue: form.cbc_eosinophil, Code: "H002008" },
            { Name: "Basophil", ResultValue: form.cbc_basophil, Code: "H002009" },
            { Name: "RBC", ResultValue: form.rbc, Code: "H002035" },
            { Name: "MCH", ResultValue: form.mch, Code: "H002020" },
            { Name: "MCHC", ResultValue: form.mchc, Code: "H002019" },
            { Name: "RDW", ResultValue: form.rdw, Code: "H002034" },


        ];

        // กรองเฉพาะรายการที่ ResultValue มีค่าจริง (ไม่เป็น '-', '', null, undefined)
        let filteredVal = val.filter(item => {
            const value = item.ResultValue;
            return value !== null && value !== undefined && value !== "" && value !== "-";
        });

        // try {
        let result = await translateCareC(filteredVal);
        if (!result?.error) {
            let data = result?.data.filter(item => item.NormalStatus == "FALSE")
            console.log("data", data)
            setlabResult(data || []);
            let text = ""
            for (const item of data) {
                if (checkvalue(item.Translate) || checkvalue(item.Recommend)) {
                    text += "-" + checkvalue(item.Translate + " ") + checkvalue(item.Recommend) + "\n"
                }
            }

            let bmi_item = result?.data.find(item => item.Code == "BMI");
            let bmi_interpretation = checkvalue(bmi_item?.Translate) || "";

            let bp_item = result?.data.find(item => item.Code == "BP");
            let bp_interpretation = checkvalue(bp_item?.Translate) || "";

            let pulse_item = result?.data.find(item => item.Code == "P");
            let pulse_interpretation = checkvalue(pulse_item?.Translate) || "";

            let waist_item = result?.data.find(item => item.Code == "Waist");
            let waist_interpretation = checkvalue(waist_item?.Translate) || "";

            let fbs_item = result?.data.find(item => item.Code == "C001");
            let fbs_detail = checkvalue(fbs_item?.Translate) || "";

            // เตรียม object ที่มีเฉพาะ field ที่มีค่า
            let updateData = {
                conclusion_detail: text,
            };

            // if (bmi_interpretation) updateData.bmi_interpretation = bmi_interpretation;
            if (bp_interpretation) updateData.bp_interpretation = bp_interpretation;
            if (pulse_interpretation) updateData.pulse_interpretation = pulse_interpretation;
            if (waist_interpretation) updateData.waist_interpretation = waist_interpretation;
            // if (fbs_detail) updateData.fbs_detail = fbs_detail;

            // ยิง API
            let save = await putHealthRecords(form.id, updateData);

            refresh()
            console.log("datasave", save)
            console.log("text", text)
            Swal.fire({
                title: 'แปลผลสำเร็จ',
                text: 'ผลการแปลผลได้ถูกบันทึกเรียบร้อยแล้ว',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
        } else {
            Swal.fire({
                title: 'แปลผลไม่สำเร็จ',
                text: result?.message || 'กรุณาลองใหม่อีกครั้ง',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
            });
        }
        // } catch (error) {
        //     console.error("translateCareC error:", error);
        //     Swal.fire({
        //         title: 'เกิดข้อผิดพลาด',
        //         text: 'ไม่สามารถแปลผลได้: ' + error.message,
        //         icon: 'error',
        //         timer: 3000,
        //         showConfirmButton: false,
        //     });
        // }
    };


    return (
        <Baselayout>
            <LoadingProvider>
                <div className='w-full h-full bg-[#FFFFFF] p-4 md:px-10 md:pb-10 lg:px-20 lg:pb-20'>
                    <ViewUploadModal
                        open={uploadOpen}
                        onClose={() => setUploadOpen(false)}
                        healthrecordsidRef={healthrecordsidRef}
                    />
                    <Loading wait={wait} />
                    <div className='flex justify-start mb-4'>
                        <label className='font-semibold text-[#264D70] text-3xl'>สมุดตรวจสุขภาพรายบุคคล</label>
                    </div>
                    <div className='w-full flex'>
                        <label className='w-full flex border border-[#A9A9A9]'></label>
                    </div>
                    <div className='flex w-full bg-[#F8F8F8] p-4 rounded-lg border-[#F8F8F8] border gap-4'>
                        <div className='w-[50%] flex justify-start'>
                            <span className='whitespace-nowrap font-semibold text-[#264D70] text-2xl'>{form?.hn} {(form?.prefix || '') + ' ' + (form?.first_name || '') + ' ' + (form?.last_name || '')}</span>
                        </div>
                        <div className='w-[50%] flex justify-end gap-4'>
                            <button onClick={onViewpdf} disabled={!haveFileUpload} className={`min-w-[118px] px-4 rounded-full ml-2 shadow-button bg-green-500 disabled:bg-slate-400 text-[#FFFFFF]`}>
                                <div className='flex gap-4 justify-center items-center p-2'>
                                    <span className='whitespace-nowrap'>File Upload</span>
                                    <img className='cursor-pointer' width={12} height={16} src="/icon/download.svg" />
                                </div>
                            </button>
                            {role === "am" && User?.user?.role === "nurse" && (
                                <button onClick={onSaveNurse} className={`min-w-[118px] px-4 rounded-full ml-2 shadow-button ${form?.nurse_approve === 'Y' ? 'bg-[#00DA8B]' : 'bg-[#e9554d]'} text-[#FFFFFF]`}>
                                    <div className='flex gap-4 justify-center items-center p-2'>
                                        <span className='whitespace-nowrap'>Nurse Approve</span>
                                        <img className='cursor-pointer' width={16} height={20} src="/icon/submit.svg" />
                                    </div>
                                </button>
                            )}
                            {role === "am" && User?.user?.role === "doctor" && (
                                <>
                                    <button onClick={onRejectDoctor} disabled={form?.nurse_approve !== 'Y'} className={`min-w-[118px] px-4 rounded-full ml-2 shadow-button disabled:bg-gray-500 ${form?.reject_status === 'Y' ? 'bg-[#00DA8B]' : 'bg-[#e9554d]'} text-[#FFFFFF]`}>
                                        <div className='flex gap-4 justify-center items-center p-2'>
                                            <span className='whitespace-nowrap'>Doctor Reject</span>
                                            <img className='cursor-pointer' width={16} height={20} src="/icon/submit.svg" />
                                        </div>
                                    </button>
                                    <button onClick={() => onSaveDoctor('Y')} disabled={form?.nurse_approve !== 'Y'} className={`min-w-[118px] px-4 rounded-full ml-2 shadow-button disabled:bg-gray-500 ${form?.doctor_approve === 'Y' ? 'bg-[#00DA8B]' : 'bg-[#e9554d]'} text-[#FFFFFF]`}>
                                        <div className='flex gap-4 justify-center items-center p-2'>
                                            <span className='whitespace-nowrap'>Doctor Approve</span>
                                            <img className='cursor-pointer' width={16} height={20} src="/icon/submit.svg" />
                                        </div>
                                    </button>
                                </>
                            )}
                            <button onClick={() => calculateResult()} className='min-w-[118px] px-4 rounded-full shadow-button bg-[#7d015c] text-[#FFFFFF]'>
                                <div className='flex gap-4 justify-center items-center p-2'>
                                    <span className='whitespace-nowrap'>แปลผล</span>
                                    <img className='cursor-pointer' width={12} height={16} src="/icon/lab.svg" />
                                </div>
                            </button>
                            <button onClick={() => router.push(`/Care-Vista-C/individualreport/pdf?hn=${form.hn}&en=${form.en}`)} className='min-w-[118px] px-4 rounded-full shadow-button bg-[#014F7D] text-[#FFFFFF]'>
                                <div className='flex gap-4 justify-center items-center p-2'>
                                    <span className='whitespace-nowrap'>Download</span>
                                    <img className='cursor-pointer' width={12} height={16} src="/icon/download.svg" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <CardReport data={form} />
                    <Resultsphysicaldoctor data={form} />
                    <Laboratory data={form} />
                    <SummaryRecommen ref={labResult} data={form} labResult={labResult} />
                </div>
            </LoadingProvider>
        </Baselayout>
    );
}
