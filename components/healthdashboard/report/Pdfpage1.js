import dayjs from 'dayjs'
import React from 'react'

function Pdfpage1(props) {
    const { companyname, pdfRefs } = props
    return (
        <div
            ref={(el) => (pdfRefs.current[0] = el)}
            className="a4landscape sectionlandscape flex flex-col ">
            <div className="w-full h-full bg-white px-10 py-12 flex flex-col justify-between">
                {/* ส่วนหัว */}
                <div className="flex justify-between items-start">
                    <div>
                        <img
                            src="/images/logo.png"
                            alt="Bangkok Christian Hospital Logo"
                            className="w-[280px] h-auto"
                        />
                        <p className="text-[28px] font-semibold text-[#1F365B] mt-4">โรงพยาบาลกรุงเทพคริสเตียน</p>
                        <p className="text-[22px] text-[#428CC6]">Bangkok Christian Hospital</p>
                    </div>
                    <div className="text-right">
                        <h1 className="text-[32px] text-[#428CC6] font-bold mb-2">Annual Check-up Report</h1>
                        <p className="text-[20px] text-black">รายงานผลตรวจสุขภาพบริษัท</p>
                    </div>
                </div>

                {/* เนื้อหา */}
                <div className="mt-12 space-y-4 text-[20px] text-black w-full">
                    {[
                        { label: "สรุปผลตรวจสุขภาพประจำปี", value: dayjs().format("BBBB") },
                        { label: "Annual Check-up Report Year", value: dayjs().format("BBBB") },
                        { label: "ชื่อบริษัท", value: companyname },
                        { label: "Company’s name", value: companyname },
                    ].map(({ label, value }, index) => (
                        <div key={index} className="w-full max-w-[80%]">
                            <p>{label}</p>
                            <div className="relative w-full">
                                <div className="w-full border-b border-dotted border-black h-[28px]"></div>
                                <span className="absolute left-0 top-0 text-black">{value}</span>
                            </div>
                        </div>
                    ))}
                </div>



                {/* ส่วนล่าง (footer) */}
                <div className="flex justify-between items-end mt-auto pt-10">
                    <div className="text-[16px] text-gray-700">
                        <p>แผนกตรวจสุขภาพ Health Check-up Department 026259000 ext. 30210-11</p>
                        <p>124 ถนนสีลม แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500</p>
                        <p>124 Silom Road Suriyawong Bangrak, Bangkok 10500</p>
                        <p className="mt-1 text-sm text-gray-600">www.bch.in.th | Facebook: BangkokChristianHospital | Line: @bchconnect</p>
                    </div>
                    <div>
                        <img
                            src="/images/logo.png"
                            alt="Decorative medical icon"
                            className="w-[160px] h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pdfpage1