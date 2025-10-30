"use client"
import React from "react"

const data = [
  { title: "ผลตรวจกรดยูริคในเลือด (Uric Acid)", normal: 11, abnormal: 3, notTested: 0, total: 14 },
  { title: "ผลตรวจไขมันในเลือด (Lipid Profile)", normal: 6, abnormal: 8, notTested: 0, total: 14 },
  { title: "ผลตรวจการทำงานของตับ (SGOT, SGPT, ALP)", normal: 10, abnormal: 4, notTested: 0, total: 14 },
  { title: "ผลตรวจคลื่นหัวใจ (E.K.G.)", normal: 13, abnormal: 1, notTested: 0, total: 14 },
  { title: "ผลเอ็กซเรย์ (X-Ray)", normal: 14, abnormal: 0, notTested: 0, total: 14 },
];

const EmployeeHealthSummaryPage2 = (props) => {
  const { pdfRefs, index } = props
  return (
    <div 
    ref={(el) => (pdfRefs.current[index+1] = el)}
    className="a4landscape sectionlandscape">
      <div className="p-10 h-[210mm] bg-white text-[14px] leading-6 text-[#111] flex flex-col justify-between">
        <div>
          <div className="grid grid-cols-2 gap-y-8 gap-x-6">
            {data.map((item, idx) => (
              <div key={idx}>
                <p className="font-semibold">{idx + 7}. {item.title}</p>
                <div className="pl-6">
                  <p>- ปกติ : {item.normal}</p>
                  <p>- ผิดปกติ : {item.abnormal}</p>
                  <p>- ไม่ตรวจ : {item.notTested}</p>
                  <p className="font-semibold">รวม : {item.total}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-[14px] leading-[1.8rem]">
            <p>ขอขอบพระคุณที่ท่านให้ความไว้วางใจในการใช้บริการตรวจสุขภาพของโรงพยาบาลกรุงเทพคริสเตียน</p>
            <p>และหวังเป็นอย่างยิ่งว่าจะได้รับใช้บริการในโอกาสต่อไป</p>
            <p>หากมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อที่อยู่ตามที่ระบุ</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <div className="w-full flex justify-end">
            <div className="w-[20%] flex flex-col items-center">
            <p className="font-semibold">ขอแสดงความนับถือ</p>
              <div className="w-full flex mt-8"> 
                <label className="w-full border-b border-dotted border-black "></label>
              </div>
               
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default EmployeeHealthSummaryPage2;
