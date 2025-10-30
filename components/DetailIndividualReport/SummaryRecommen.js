import { renderHealthSummary } from '@/utils/renderHealthSummary'
import React, { useEffect, useState } from 'react'

function SummaryRecommen(props) {
    const { data, labResult } = props
    const checkvalue = (val) => {
        if (val && val != "-") {
            return val
        }
        else {
            return ""
        }
    }
    return (
        <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4  text-base'>
            <div className='flex text-[#F8F8F8] bg-[#6B84B7] justify-center h-12 w-full rounded-lg'>
                <label className='font-semibold text-2xl p-1'>Summary & Recommendations</label>
            </div>

            <div className='grid gap-4 mt-2'>
                <label id='blindness' className='font-semibold text-[#365382]'>สรุปผลการตรวจสุขภาพและคำแนะนำจากแพทย์</label>
            </div>
            {/* <div className='w-full text-[12px] grid grid-cols-1 col-span-12 gap-1 p-2 mt-3'>
                {data.conclusion_detail ?
                    <label className='font-light text-left'>
                        {data.conclusion_detail?.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </label>

                    :
                    labResult && labResult.map((item, index) => (
                        checkvalue(item.Translate) || checkvalue(item.Recommend) ?
                            <div key={index} className='w-full flex text-text-left col-span-2'>
                                <label className='font-light'>-{checkvalue(item.Translate + " ") + checkvalue(item.Recommend)}</label>
                            </div>
                            : ""))}

            </div> */}

            <div className='w-full text-[12px] grid grid-cols-1 col-span-12 gap-1 p-2 mt-3'>
                <div className='w-full flex flex-col text-start col-span-2'>
                    {renderHealthSummary(data, ["all"])}
                    <label className='flex w-full border border-[#26A1DC] my-2' />
                </div>
            </div>
            <div className='w-full text-center grid grid-cols-6 col-span-2 gap-1 p-2 mt-3 text-[12px]'>
                <div className='w-full flex text-center col-span-1'></div>

                <div className='w-full flex pl-16'>
                    <label className='font-semibold text-[#365382]'>เจ้าหน้าที่ยืนยัน</label>
                </div>

                <div className='w-full flex text-center col-span-2'></div>

                <div className='w-full flex pl-16'>
                    <label className='font-semibold text-[#365382]'>แพทย์ยืนยัน</label>
                </div>
            </div>

            <div className='w-full justify-center text-[12px] grid grid-cols-6 col-span-4 gap-1 p-1'>
                <div className='w-full flex flex-col text-center col-span-1'></div>

                <div className='w-full flex flex-col text-center col-span-2'>
                    <label className='font-light text-left'></label>
                    <div className="flex justify-center w-48  h-10 border-b border-[#26A1DC]">
                        {/* <img src={data.tr_health_user.signature} alt="Signature" className="w-full h-full" /> */}
                    </div>
                </div>

                <div className='w-full flex flex-col text-center col-span-1'></div>

                <div className='w-full flex flex-col text-center col-span-2'>
                    <label className='font-light text-left'></label>
                    <div className="flex justify-center w-48  h-10 border-b border-[#26A1DC]">
                        {/* <img src={data.tr_health_user.signature} alt="Signature" className="w-full h-full" /> */}
                    </div>
                </div>
            </div>
            <div className='w-full text-[12px] grid grid-cols-6 col-span-4 gap-1 p-1'>
                <div className='w-full flex flex-col text-center col-span-1'></div>

                <div className='w-full flex flex-col text-center col-span-2'>
                    <label className='font-light text-left'></label>
                    <div className="flex justify-center w-48  h-10 border-b border-[#26A1DC]">
                        {data?.nurse_user?.signature ?
                            <img src={data.nurse_user.signature} alt="Signature" className="w-full h-full" />
                            : ""}
                    </div>
                </div>

                <div className='w-full flex flex-col text-center col-span-1'></div>

                <div className='w-full flex flex-col text-center col-span-2'>
                    <label className='font-light text-left'></label>
                    <div className="flex justify-center w-48  h-10 border-b border-[#26A1DC]">
                        {data?.doctor_user?.signature ?
                            <img src={data.doctor_user.signature} alt="Signature" className="w-full h-full" />
                            : ""}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SummaryRecommen