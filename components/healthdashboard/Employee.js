'use client'
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React from 'react';

function Employee(props) {
    const { company, dataMap, modalEmployeeClick, modalEmployeeAllClick,Companyname } = props;
    let router = useRouter()
    const statusCheck = (data) => {
        if (data?.nurse_approve == "Y" && data?.doctor_approve == "Y" && data?.reject_status != "Y") {
            return (
                <>
                    <td className="px-4 py-3 border-b text-center text-green-500 text-nowrap">ผลตรวจออกแล้ว</td>
                    <td td className="px-4 py-3 border-b" >
                        <div className="flex justify-center items-center">
                            <button onClick={() => modalEmployeeClick(data)} className=" w-10 h-10 rounded-full p-1 bg-[#4EC9F2] flex justify-center items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>

                            </button>
                        </div>
                    </td>
                </ >
            )
        }
        else {
            return (
                <>
                    <td className="px-4 py-3 border-b text-center text-red-500 text-nowrap">รอผลตรวจ</td>
                    <td td className="px-4 py-3 border-b" >
                        <div className="flex justify-center items-center">
                            <button disabled className=" w-10 h-10 rounded-full p-1 bg-gray-300 flex justify-center items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </ >
            )
        }
    }
    const openNewWindow = (url) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const width = screenWidth * 0.9;
        const height = screenHeight * 0.9;

        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        window.open(
            url,
            '_blank',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    };
    return (
        <div className='flex flex-col'>
            <div className="flex w-full mt-5">
                <div className="w-1/2 flex justify-start items-center ">
                    <label className='text-black font-bold text-xl w-full text-start '>
                        ข้อมูลพนักงาน
                    </label>
                </div>
                <div className="w-1/2 flex justify-end items-center">
                    <div className="w-1/3 flex justify-end items-center">
                        <button disabled={dataMap.length == 0} onClick={() => openNewWindow("/Care-Vista-C/healthdashboard/pdf?company=" + company+"&&companyname="+Companyname)} className=" w-24 h-10 rounded-full p-1 bg-[#6c4ef2] disabled:bg-gray-300 flex justify-center items-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            <label>All Final</label>
                        </button>
                    </div>
                    <div className="w-1/3 flex justify-end items-center">
                        <button disabled={dataMap.length == 0} onClick={() => modalEmployeeAllClick()} className=" w-24 h-10 rounded-full p-1 bg-[#4ef285] disabled:bg-gray-300 flex justify-center items-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            <label>All</label>
                        </button>
                    </div>
                </div>
            </div>

            {/* ✅ ทำให้ Table อยู่ใน Scrollable Container */}
            <div className="relative max-h-[50vh] overflow-y-auto border border-gray-300 rounded-lg shadow-lg mt-4">
                <table className="w-full border-collapse">

                    {/* ✅ Sticky Header */}
                    <thead className="bg-[#014F7D] text-white sticky top-0 shadow-md z-10">
                        <tr className='text-nowrap'>
                            <th className="px-4 py-3 font-semibold text-center">No.</th>
                            <th className="px-4 py-3 text-left font-semibold">วันที่ตรวจ</th>
                            <th className="px-4 py-3 text-center font-semibold">HN</th>
                            <th className="px-4 py-3 font-semibold text-center">ชื่อ นามสกุล</th>
                            <th className="px-4 py-3 text-left font-semibold">สถานะผลตรวจ</th>
                            <th className="px-4 py-3 text-left font-semibold">ดูผลตรวจ</th>
                        </tr>
                    </thead>

                    {/* ✅ ข้อมูลในตาราง (Scrollable) */}
                    <tbody className="bg-white text-gray-700">
                        {dataMap && dataMap.length > 0 ? (
                            dataMap.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition">
                                    <td className="px-4 py-3 border-b text-center">{index + 1}</td>
                                    <td className="px-4 py-3 border-b">
                                        {dayjs(row?.exam_date).add(543, 'year').locale('th').format("DD/MM/YYYY")}
                                    </td>
                                    <td className="px-4 py-3 border-b text-nowrap">{row?.hn || "-"}</td>
                                    <td className="px-4 py-3 border-b text-nowrap">{(row?.prefix || "") + " " + ((row?.first_name || "") + " " + (row?.last_name || ""))}</td>
                                    {statusCheck(row)}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-3 text-center text-gray-500 border-b">
                                    ไม่มีข้อมูล
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default Employee;
