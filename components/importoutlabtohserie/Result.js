'use client'
import moment from 'moment'
import React, { useEffect } from 'react'
import { ModalViewPackage } from '../Setup/modalSetup';
import { useState } from 'react';

function Result(props) {
    const { dataMap, setdataMap, headerChoose, headerdata, setheaderdata } = props;
    const [keyHeader, setkeyHeader] = useState([])
    console.log("headerdata", headerdata);
    console.log(dataMap);
    useEffect(() => {
        if (dataMap?.[headerChoose]?.data[0]) {
            let keys = Object.keys(dataMap?.[headerChoose]?.data[0]);
            console.log(keys)
            setkeyHeader(keys)
        }
    }, [dataMap, headerChoose]);
    return (
        <div className=' '>
            <div className='h-[40vw] w-[90vw] overflow-x-auto px-1 pb-1'>
                <table className="tablePatientInformation mt-4 w-full">
                    <thead className='text-[#4E4E4E] text-sm truncate'>
                        <tr className="bg-[#E2E2E2]">
                            {keyHeader && keyHeader.length > 0 && keyHeader.map((header, index) => (
                                <th key={index} className="px-4 py-2">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='text-base font-light truncate'>
                        {dataMap?.[headerChoose]?.data && dataMap?.[headerChoose]?.data.length > 0 && dataMap?.[headerChoose]?.data.map((row, index) => (
                            <tr key={index}>
                                {keyHeader && keyHeader.length > 0 && keyHeader.map((header, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-center">{row[header]}</td>
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
