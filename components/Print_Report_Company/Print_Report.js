'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Tooldatepick from '../Tool/Tooldatepick'
import Toolselect2 from '../Tool/Toolselect2'
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
import 'chart.js/auto'; // ต้องมีการนำเข้า Chart.js
import '../Tool/chart-plugins';
import { createCanvas } from 'canvas'; // นำเข้า createCanvas จาก canvas
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'; // นำเข้า ChartJSNodeCanvas
import fs from 'fs'; // นำเข้า fs เพื่อบันทึกไฟล์
const options = {
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

// การใช้ข้อมูลกับ Chart.js

function Print_Report(props) {
    const { newData, tabChoose, settabChoose, imageSrc, setImageSrc } = props
    const chartRef = useRef(null);

    useLayoutEffect(() => {
        if (chartRef.current && chartRef.current.canvas) {
            handlePreview();
        }
    }, [newData]);
    const handlePreview = () => {
        if (chartRef.current) {
            const canvas = chartRef.current.canvas;  // เข้าถึง canvas โดยตรงจาก chartRef.current
            const image = canvas.toDataURL('image/png'); // สร้าง Base64 จาก Canvas
            console.log("image", image)
            setImageSrc(image);
        }
    };
    console.log("newDataaa", newData)
    const checkTable = (name) => {
        if (name == "CBC") {
            return CBCTable()
        }
        else if (name == "PE") {
            return PETable()
        }
        else if (name == "UA") {
            return UATable()
        }
        else if (name == "Stool") {
            return StoolTable()
        }
        else if (name == "Occ") {
            return OccTable()
        }
        else if (name == "Chart_All") {
            return Chart_AllTable()
        }
        else if (name?.substring(0, 2) == "X-") {
            return XTable()
        }
        else if (name == "Chart_Graph") {
            return chartnotTable()
        }
        else {
            return otherTable()
        }
    }
    const CBCTable = () => {
        return (
            <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                    <tr className="  text-left bg-[#E2E2E2]">
                        <th className="font-light">ลำดับ</th>
                        <th className="font-light">NO</th>
                        <th className="font-light">HN</th>
                        <th className="font-light">ชื่อ - นามสกุล</th>
                        <th className="font-light ">รหัสพนักงาน</th>
                        <th className="font-light">แผนก</th>
                        <th className="font-light">Hb</th>
                        <th className="font-light">HCT</th>
                        <th className="font-light">WBC</th>
                        <th className="font-light">MCV</th>
                        <th className="font-light">Neutro</th>
                        <th className="font-light">Lympho</th>
                        <th className="font-light">Eos</th>
                        <th className="font-light">Mono</th>
                        <th className="font-light">Baso</th>
                        <th className="font-light">PltCount</th>
                        <th className="font-light">PltSmear</th>
                        <th className="font-light">RBC</th>
                        <th className="font-light">MPV</th>
                        <th className="font-light">RDW</th>

                    </tr>
                </thead>
                <tbody className='text-base font-light'>
                    {newData?.[tabChoose]?.data && newData?.[tabChoose]?.data?.length > 0 && newData?.[tabChoose]?.data.map((p, index) => (
                        <tr className={`  text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left ">{p.NO ? p.NO : '-'}</td>
                            <td className="text-left ">{p.HN || '-'}</td>
                            <td className="text-left ">{p.Name || '-'}</td>
                            <td className="text-left ">{p.EmpID || '-'}</td>
                            <td className="text-left ">{p.Dept || '-'}</td>
                            <td className="text-left ">{p.Hb || '-'}</td>
                            <td className="text-left ">{p.HCT || '-'}</td>
                            <td className="text-left ">{p.WBC || '-'}</td>
                            <td className="text-left ">{p.MCV || '-'}</td>
                            <td className="text-left ">{p.Neutro || '-'}</td>
                            <td className="text-left ">{p.Lympho || '-'}</td>
                            <td className="text-left ">{p.Eos || '-'}</td>
                            <td className="text-left ">{p.Mono || '-'}</td>
                            <td className="text-left ">{p.Baso || '-'}</td>
                            <td className="text-left ">{p.PltCount || '-'}</td>
                            <td className="text-left ">{p.PltSmear || '-'}</td>
                            <td className="text-left ">{p.RBC || '-'}</td>
                            <td className="text-left ">{p.MPV || '-'}</td>
                            <td className="text-left ">{p.RDW || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    const PETable = () => {
        return (
            <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                    <tr className="  text-left bg-[#E2E2E2]">
                        <th className="font-light">ลำดับ</th>
                        <th className="font-light">NO</th>
                        <th className="font-light">HN</th>
                        <th className="font-light">ชื่อ - นามสกุล</th>
                        <th className="font-light ">รหัสพนักงาน</th>
                        <th className="font-light">แผนก</th>
                        <th className="font-light">Height</th>
                        <th className="font-light">Weight</th>
                        <th className="font-light">BMI</th>
                        <th className="font-light">BPSys</th>
                        <th className="font-light">BPDias</th>
                        <th className="font-light">PulseRate</th>
                        <th className="font-light">Waist</th>
                        <th className="font-light">PEResult</th>
                    </tr>
                </thead>
                <tbody className='text-base font-light'>
                    {newData?.[tabChoose]?.data && newData?.[tabChoose]?.data?.length > 0 && newData?.[tabChoose]?.data.map((p, index) => (
                        <tr className={`  text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left ">{p.NO ? p.NO : '-'}</td>
                            <td className="text-left ">{p.HN || '-'}</td>
                            <td className="text-left ">{p.Name || '-'}</td>
                            <td className="text-left ">{p.EmpID || '-'}</td>
                            <td className="text-left ">{p.Dept || '-'}</td>
                            <td className="text-left ">{p.Height || '-'}</td>
                            <td className="text-left ">{p.Weight || '-'}</td>
                            <td className="text-left ">{p.BMI || '-'}</td>
                            <td className="text-left ">{p.BPSys || '-'}</td>
                            <td className="text-left ">{p.BPDias || '-'}</td>
                            <td className="text-left ">{p.PulseRate || '-'}</td>
                            <td className="text-left ">{p.Waist || '-'}</td>
                            <td className="text-left ">{p.PEResult || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    const UATable = () => {
        return (
            <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                    <tr className="  text-left bg-[#E2E2E2]">
                        <th className="font-light">ลำดับ</th>
                        <th className="font-light">NO</th>
                        <th className="font-light">HN</th>
                        <th className="font-light">ชื่อ - นามสกุล</th>
                        <th className="font-light ">รหัสพนักงาน</th>
                        <th className="font-light">แผนก</th>
                        <th className="font-light">U_Color</th>
                        <th className="font-light">U_SpGr</th>
                        <th className="font-light">U_PH</th>
                        <th className="font-light">U_WBC</th>
                        <th className="font-light">U_RBC</th>
                        <th className="font-light">U_Ery</th>
                        <th className="font-light">U_Glucose</th>
                        <th className="font-light">U_Protein</th>
                        <th className="font-light">U_Ketone</th>
                        <th className="font-light">U_Bilirubin</th>
                        <th className="font-light">U_Urobilinogen</th>
                        <th className="font-light">U_Nitrite</th>
                        <th className="font-light">U_Leukocytes</th>
                        <th className="font-light">U_Transparency</th>
                        <th className="font-light">U_SquamousCells</th>

                    </tr>
                </thead>
                <tbody className='text-base font-light'>
                    {newData?.[tabChoose]?.data && newData?.[tabChoose]?.data?.length > 0 && newData?.[tabChoose]?.data.map((p, index) => (
                        <tr className={`  text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left ">{p.NO ? p.NO : '-'}</td>
                            <td className="text-left ">{p.HN || '-'}</td>
                            <td className="text-left ">{p.Name || '-'}</td>
                            <td className="text-left ">{p.EmpID || '-'}</td>
                            <td className="text-left ">{p.Dept || '-'}</td>
                            <td className="text-left ">{p.U_Color || '-'}</td>
                            <td className="text-left ">{p.U_SpGr || '-'}</td>
                            <td className="text-left ">{p.U_PH || '-'}</td>
                            <td className="text-left ">{p.U_WBC || '-'}</td>
                            <td className="text-left ">{p.U_RBC || '-'}</td>
                            <td className="text-left ">{p.U_Ery || '-'}</td>
                            <td className="text-left ">{p.U_Glucose || '-'}</td>
                            <td className="text-left ">{p.U_Protein || '-'}</td>
                            <td className="text-left ">{p.U_Ketone || '-'}</td>
                            <td className="text-left ">{p.U_Bilirubin || '-'}</td>
                            <td className="text-left ">{p.U_Urobilinogen || '-'}</td>
                            <td className="text-left ">{p.U_Nitrite || '-'}</td>
                            <td className="text-left ">{p.U_Leukocytes || '-'}</td>
                            <td className="text-left ">{p.U_Transparency || '-'}</td>
                            <td className="text-left ">{p.U_SquamousCells || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    const StoolTable = () => {
        return (
            <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                    <tr className="  text-left bg-[#E2E2E2]">
                        <th className="font-light">ลำดับ</th>
                        <th className="font-light">NO</th>
                        <th className="font-light">HN</th>
                        <th className="font-light">ชื่อ - นามสกุล</th>
                        <th className="font-light ">รหัสพนักงาน</th>
                        <th className="font-light">แผนก</th>
                        <th className="font-light">OccultBlood</th>
                        <th className="font-light">StoolCulture</th>
                        <th className="font-light">stool_color</th>
                        <th className="font-light">stool_appearance</th>
                        <th className="font-light">stool_wbc</th>
                        <th className="font-light">stool_rbc</th>
                        <th className="font-light">stool_parasite</th>
                        <th className="font-light">stool_protozoa</th>
                    </tr>
                </thead>
                <tbody className='text-base font-light'>
                    {newData?.[tabChoose]?.data && newData?.[tabChoose]?.data?.length > 0 && newData?.[tabChoose]?.data.map((p, index) => (
                        <tr className={`  text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left ">{p.NO ? p.NO : '-'}</td>
                            <td className="text-left ">{p.HN || '-'}</td>
                            <td className="text-left ">{p.Name || '-'}</td>
                            <td className="text-left ">{p.EmpID || '-'}</td>
                            <td className="text-left ">{p.Dept || '-'}</td>
                            <td className="text-left ">{p.OccultBlood || '-'}</td>
                            <td className="text-left ">{p.StoolCulture || '-'}</td>
                            <td className="text-left ">{p.stool_color || '-'}</td>
                            <td className="text-left ">{p.stool_appearance || '-'}</td>
                            <td className="text-left ">{p.stool_wbc || '-'}</td>
                            <td className="text-left ">{p.stool_rbc || '-'}</td>
                            <td className="text-left ">{p.stool_parasite || '-'}</td>
                            <td className="text-left ">{p.stool_protozoa || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    const OccTable = () => {
        return (
            <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                    <tr className="  text-left bg-[#E2E2E2]">
                        <th className="font-light">ลำดับ</th>
                        <th className="font-light">NO</th>
                        <th className="font-light">HN</th>
                        <th className="font-light">ชื่อ - นามสกุล</th>
                        <th className="font-light ">รหัสพนักงาน</th>
                        <th className="font-light">แผนก</th>
                        <th className="font-light">SpiroDetail</th>
                        <th className="font-light">titmusdetail</th>
                        <th className="font-light">LeftEarDetail</th>
                        <th className="font-light">RightEarDetail</th>
                        <th className="font-light">AudioDetail</th>
                        <th className="font-light">VPDetail</th>
                    </tr>
                </thead>
                <tbody className='text-base font-light'>
                    {newData?.[tabChoose]?.data && newData?.[tabChoose]?.data?.length > 0 && newData?.[tabChoose]?.data.map((p, index) => (
                        <tr className={`  text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left ">{p.NO ? p.NO : '-'}</td>
                            <td className="text-left ">{p.HN || '-'}</td>
                            <td className="text-left ">{p.Name || '-'}</td>
                            <td className="text-left ">{p.EmpID || '-'}</td>
                            <td className="text-left ">{p.Dept || '-'}</td>
                            <td className="text-left ">{p.SpiroDetail || '-'}</td>
                            <td className="text-left ">{p.titmusdetail || '-'}</td>
                            <td className="text-left ">{p.LeftEarDetail || '-'}</td>
                            <td className="text-left ">{p.RightEarDetail || '-'}</td>
                            <td className="text-left ">{p.AudioDetail || '-'}</td>
                            <td className="text-left ">{p.VPDetail || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    const Chart_AllTable = () => {
        return (
            <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                    <tr className="  text-left bg-[#E2E2E2]">
                        <th className="font-light">ลำดับ</th>
                        <th className="font-light">ชื่อ</th>
                        <th className="font-light">Normal</th>
                        <th className="font-light">Abnormal</th>
                        <th className="font-light ">ผลรวม</th>
                    </tr>
                </thead>
                <tbody className='text-base font-light'>
                    {newData?.[tabChoose]?.data && newData?.[tabChoose]?.data?.length > 0 && newData?.[tabChoose]?.data.map((p, index) => (
                        <tr className={`  text-left bg-[#E2E2E2] ${p?.trXrayFromSSBs?.[0]?.XrayStatus == "A6" ? " text-red-500 " : ""}`}>
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left ">{p.Name || '-'}</td>
                            <td className="text-left ">{p.Normal || '-'}</td>
                            <td className="text-left ">{p.Abnormal || '-'}</td>
                            <td className="text-left ">{p.Total || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    const XTable = () => {
        return (
            <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                    <tr className="  text-left bg-[#E2E2E2]">
                        <th className="font-light">ลำดับ</th>
                        <th className="font-light">NO</th>
                        <th className="font-light">HN</th>
                        <th className="font-light">ชื่อ - นามสกุล</th>
                        <th className="font-light ">รหัสพนักงาน</th>
                        <th className="font-light">แผนก</th>
                        <th className="font-light">Description</th>
                        <th className="font-light">HSeriesResultDetail</th>
                        <th className="font-light">XrayStatus</th>
                    </tr>
                </thead>
                <tbody className='text-base font-light'>
                    {newData?.[tabChoose]?.data && newData?.[tabChoose]?.data?.length > 0 && newData?.[tabChoose]?.data.map((p, index) => (
                        <tr className={`  text-left bg-[#E2E2E2] ${p?.trXrayFromSSBs?.[0]?.XrayStatus == "A6" ? " text-red-500 " : ""}`}>
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left ">{p.NO ? p.NO : '-'}</td>
                            <td className="text-left ">{p.HN || '-'}</td>
                            <td className="text-left ">{(p.Prename || "") + " " + (p.Forename || "") + " " + (p.Surname || "")}</td>
                            <td className="text-left ">{p.EmpID || '-'}</td>
                            <td className="text-left ">{p.Dept || '-'}</td>
                            <td className="text-left ">{p?.trXrayFromSSBs?.[0]?.Description || '-'}</td>
                            <td className="text-left ">{p?.trXrayFromSSBs?.[0]?.HSeriesResultDetail || '-'}</td>
                            <td className="text-left ">{p?.trXrayFromSSBs?.[0]?.XrayStatus || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    const chartnotTablepreview = () => {
        const optionsbar = {
            scales: {
                // Options ของกราฟ
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
            animation: {
                onComplete: () => {
                    if (chartRef.current && chartRef.current.canvas) {
                        handlePreview();
                    }
                },
            },
        };
        const optionsbary = {
            indexAxis: 'y',
            scales: {
                // Options ของกราฟ
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
            animation: {
                onComplete: () => {
                    if (chartRef.current && chartRef.current.canvas) {
                        handlePreview();
                    }
                },
            },
        };


        let fil = newData.filter((p) => p.name === 'Chart_Graph');
        let val = fil[0]?.data || [];
        let label = [];
        let normal = [];
        let abnormal = [];

        for (const element of val) {
            label.push(element.Name);
            normal.push(element.Normal);
            abnormal.push(element.Abnormal);
        }

        let data = {
            labels: label,
            datasets: [
                {
                    label: 'Normal',
                    data: normal, // ค่า Normal ของแต่ละรายการ
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Abnormal',
                    data: abnormal, // ค่า Abnormal ของแต่ละรายการ
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        // Return chart component
        return (
            <div className="w-full  flex justify-center items-center" style={{ position: 'absolute', visibility: 'hidden' }}>
                <div className="w-[70%]" >
                    <Bar
                        ref={chartRef}
                        data={data}
                        options={optionsbar}
                        onElementsClick={() => handlePreview()}
                    />
                </div>
                {imageSrc && (
                    <div>
                        <h2>พรีวิวกราฟ</h2>
                        <img
                            key={imageSrc} // ใช้ key เพื่อบังคับให้ React render ใหม่
                            src={imageSrc}
                            alt="Bar Chart Preview"
                            style={{ width: '700px' }}
                        />
                    </div>
                )}
            </div>

        );
    };
    const chartnotTable = () => {
        const optionsbar = {
            scales: {
                // Options ของกราฟ
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
            animation: {
                onComplete: () => {
                    if (chartRef.current && chartRef.current.canvas) {
                        handlePreview();
                    }
                },
            },
        };
        const optionsbary = {
            indexAxis: 'y',
            scales: {
                // Options ของกราฟ
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
            animation: {
                onComplete: () => {
                    if (chartRef.current && chartRef.current.canvas) {
                        handlePreview();
                    }
                },
            },
        };

        let fil = newData.filter((p) => p.name === 'Chart_Graph');
        let val = fil[0]?.data || [];
        let label = [];
        let normal = [];
        let abnormal = [];

        for (const element of val) {
            label.push(element.Name);
            normal.push(element.Normal);
            abnormal.push(element.Abnormal);
        }

        let data = {
            labels: label,
            datasets: [
                {
                    label: 'Normal',
                    data: normal, // ค่า Normal ของแต่ละรายการ
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Abnormal',
                    data: abnormal, // ค่า Abnormal ของแต่ละรายการ
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        // Return chart component
        return (
            <div className="w-full h-full flex flex-col justify-center items-center" >
                <div className=" w-[50%] h-[80%]  flex justify-center" >
                    <Bar
                        ref={chartRef}
                        data={data}
                        options={optionsbar}
                        onElementsClick={() => handlePreview()}
                    />
                </div>
                <div className=" w-[50%] h-[80%] flex justify-center" >
                    <Bar
                        ref={chartRef}
                        data={data}
                        options={optionsbary}
                        onElementsClick={() => handlePreview()}
                    />
                </div>
              
            </div>


        );
    }; 
    const otherTable = () => {
        return (
            <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                    <tr className="  text-left bg-[#E2E2E2]">
                        <th className="font-light">ลำดับ</th>
                        <th className="font-light">NO</th>
                        <th className="font-light">HN</th>
                        <th className="font-light">ชื่อ - นามสกุล</th>
                        <th className="font-light ">รหัสพนักงาน</th>
                        <th className="font-light">แผนก</th>
                        <th className="font-light">{((newData?.[tabChoose]?.data?.[0]?.trLabs?.[0]?.ItemDesc || "") + " ( " + (newData?.[tabChoose]?.data?.[0]?.trLabs?.[0]?.LabRange || "-") + " ) ")}</th>
                        <th className="font-light">ผลการตรวจ</th>
                    </tr>
                </thead>
                <tbody className='text-base font-light'>
                    {newData?.[tabChoose]?.data && newData?.[tabChoose]?.data?.length > 0 && newData?.[tabChoose]?.data.map((p, index) => (
                        <tr className={`  text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left ">{p.NO ? p.NO : '-'}</td>
                            <td className="text-left ">{p.HN || '-'}</td>
                            <td className="text-left ">{(p.Prename || "") + " " + (p.Forename || "") + " " + (p.Surname || "")}</td>
                            <td className="text-left ">{p.EmpID || '-'}</td>
                            <td className="text-left ">{p.Dept || '-'}</td>
                            <td className="text-left ">{p?.trLabs?.[0]?.TestData || '-'}</td>
                            <td className="text-left ">{p?.trLabs?.[0]?.TranslateResult || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    return (
        <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] p-5 mt-4'>
            <div className="w-full flex overflow-x-auto">
                {newData && newData.length > 0 && newData.map((p, index) => (
                    <button onClick={() => settabChoose(index)} className={`${tabChoose == index ? " bg-green-500 " : " bg-gray-500 "} p-2 border rounded-lg text-white`}>{p.name}</button>
                ))}
            </div>

            <div className='flex flex-col col-span-12 justify-start gap-2 pt-2'>
                <div className='flex flex-col justify-start h-[60vh] overflow-y-auto  pb-2'>
                    {/* สร้างกราฟแต่ซ่อนไว้เพื่อให้ใส่กราฟใน excel ได้ */}
                    {chartnotTablepreview()}
                    {checkTable(newData?.[tabChoose]?.name)}
                </div>
            </div>
        </div>
    )
}

export default Print_Report