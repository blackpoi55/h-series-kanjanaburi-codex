'use client'
import dayjs from 'dayjs';
import React from 'react';

function Package(props) {
    const { dataMap } = props;

    return (
        <div className='flex flex-col'>
            <label className='text-[#014F7D] font-bold text-xl w-full text-center'>
                Package
            </label>
            <label className='w-full text-center'>
                ข้อมูลแพ็คเจกทั้งหมดขององค์กร
            </label>

            {/* ✅ ทำให้ Table อยู่ใน Scrollable Container */}
            <div className="relative max-h-[50vh] overflow-y-auto border border-gray-300 rounded-lg shadow-lg mt-4">
                <table className="w-full border-collapse">
                    
                    {/* ✅ Sticky Header */}
                    <thead className="bg-[#014F7D] text-white sticky top-0 shadow-md z-10">
                        <tr>
                            <th className="px-4 py-3 font-semibold text-center">No.</th>
                            <th className="px-4 py-3 text-left font-semibold">วันที่ตรวจ</th>
                            <th className="px-4 py-3 text-left font-semibold">ชื่อแพ็กเกจ</th>
                            <th className="px-4 py-3 font-semibold text-center">จำนวนผู้ตรวจ</th>
                        </tr>
                    </thead>

                    {/* ✅ ข้อมูลในตาราง (Scrollable) */}
                    <tbody className="bg-white text-gray-700">
                        {dataMap && dataMap.length > 0 ? (
                            dataMap.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition">
                                    <td className="px-4 py-3 border-b text-center">{index + 1}</td>
                                    <td className="px-4 py-3 border-b">
                                        {dayjs(row.exam_date).add(543, 'year').locale('th').format("DD/MM/YYYY")}
                                    </td>
                                    <td className="px-4 py-3 border-b">{row.package}</td>
                                    <td className="px-4 py-3 border-b text-center">{row.count}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-3 text-center text-gray-500 border-b">
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

export default Package;
