'use client'
import React from 'react';
import { TextField } from '@mui/material';
import Tooldatepick from '../Tool/Tooldatepick';
import Toolselect2 from '../Tool/Toolselect2';
import ReactExport from "react-data-export";

function HeaderFromPrintReportAll({ setvalues, values, meta }) {

    const league = [
        { label: "TH", value: "th" },
        { label: "EN", value: "en" }
    ];
    const sizeReport = [
        { label: "รายงาน A4 หน้าหลัง", value: "a4" },
        { label: "รายงาน A5 หน้าหลัง", value: "a5" }
    ];
    const locationReport = [
        { label: "Mobile Checkup", value: "mobile" },
        { label: "Desktop", value: "desktop" }
    ];

    const handleChange = (update) => {
        console.log('update', update)
        setvalues({ ...values, ...update })
    }

    const isChecked = (item) => {
        return item === 'TRUE'
    }

    return (
        <div className='w-full flex flex-col rounded-2xl p-5 mt-4'>
            <div className='flex gap-4'>
                <TextField
                    className='text-white w-full bg-white'
                    id="outlined-basic"
                    value={values.search}
                    onChange={(e) => handleChange({ search: e?.target?.value })}
                    label="ค้นหา"
                    variant="outlined"
                />
            </div>
            <div className='flex gap-4 mt-4'>
                <div className='relative flex w-full'>
                    <Toolselect2 sm options={meta.Company || []} label={"Company"} value={values?.companyCode || ''}
                        onChange={(companyCode) => handleChange({ companyCode })} />
                </div>
            </div>
            <div className='flex gap-4 mt-4'>
                <div className='relative flex w-full '>
                    <Tooldatepick sm label={"วันที่"} value={values?.datastart || ''}
                        onChange={(datastart) => handleChange({ datastart })} />
                </div>
                <div className='relative flex w-full '>
                    <Tooldatepick sm label={"ถึงวันที่"} value={values?.datastop || ''}
                        onChange={(datastop) => handleChange({ datastop })} />
                </div>
                <div className='flex gap-2 whitespace-nowrap col-span-8 items-center'>
                    <input type="checkbox" className='w-5 h-5 accent-[#365382]' id='company-address1' name="company-address" checked={isChecked(values?.Prenacy)} onChange={(Prenacy) => handleChange({ Prenacy: String(Prenacy?.target?.checked) })} />
                    <label htmlFor='company-address1' className='font-medium'>ก่อนเข้างาน</label>
                </div>
            </div>

            <div className=' w-full mt-4 gap-4 flex flex-col md:flex-row'>
                <div className='relative flex w-full'>
                    <Toolselect2 sm options={league || []} label={"เลือกภาษา"} value={values?.value || ''}
                        onChange={(value) => handleChange({ value })} />
                </div>
                <div className='relative flex w-full'>
                    <Toolselect2 sm options={sizeReport || []} label={"เลือกรายงาน"} value={values?.value || ''}
                        onChange={(value) => handleChange({ value })} />
                </div>
                <div className='relative flex w-full'>
                    <Toolselect2 sm options={locationReport || []} label={"Location"} value={values?.value || ''}
                        onChange={(value) => handleChange({ value })} />
                </div>
                {/* onClick={() => setModelRegister(0)} */}
                <div className='relative flex w-40'>
                    <button onClick={() => window.open('/print-pdf', '_blank')} className='  min-w-[118px] px-4 rounded-lg  shadow-button bg-[#365382] text-[#FFFFFF] hover:bg-[#1f304a] hover:text-[#FFFFFF]' >
                        <div className='flex gap-4 justify-center items-center p-2'>
                            <img className=' cursor-pointer' width={24} height={24} src="/icon/print.svg" />
                            <span className='whitespace-nowrap'>Print</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HeaderFromPrintReportAll;
