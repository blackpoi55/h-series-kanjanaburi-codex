'use client'
import moment from 'moment'
import React from 'react'
import { ModalViewPackage } from '../Setup/modalSetup';
import { useState } from 'react';
import { ImpoerReportResult } from '@/action/api';
import dayjs from 'dayjs';

function Result(props) {
    const { dataMap, setdataMap, headerChoose, headerdata, setheaderdata } = props
    console.log("headerdata", headerdata)
    const sendClick = async () => {
        let val = dataMap?.[0]?.data
        console.log("val", val)

        let data = await ImpoerReportResult(val)
        console.log(data)
    }
    return (
        <div className=' '>
            {/* <button onClick={()=>sendClick()} className="">ยิงแมร่ง</button> */}
            <div className='h-[40vw] w-[90vw] overflow-x-auto px-1 pb-1'>
                <table className="tablePatientInformation mt-4 w-full">
                    <thead className='text-[#4E4E4E] text-sm truncate'>
                        <tr className="bg-[#E2E2E2]">
                            {headerdata && headerdata.length > 0 && headerdata.map((header, index) => (
                                <th key={index} className="px-4 py-2">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='text-base font-light truncate'>
                        {dataMap?.[headerChoose]?.data && dataMap?.[headerChoose]?.data.length > 0 && dataMap?.[headerChoose]?.data.map((row, index) => (
                            <tr key={index}>
                                {headerdata && headerdata.length > 0 && headerdata.map((header, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2">{(header === "exam_date" || header === "birth_date" || header === "nurse_exam_date")?dayjs(row[header]).add(543, 'year').format('DD/MM/YYYY'):row[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Result;
