import React from 'react'

const mockData = [
  { title: '1 ผลตรวจร่างกายโดยแพทย์ (PE)', normal: 9, abnormal: 5, notChecked: 0, total: 14 },
  { title: '2 ผลตรวจปัสสาวะ (Urinalysis)', normal: 7, abnormal: 7, notChecked: 0, total: 14 },
  { title: '3 ผลตรวจเลือด (CBC)', normal: 2, abnormal: 12, notChecked: 0, total: 14 },
  { title: '4 ผลตรวจน้ำตาลในเลือด (FBS)', normal: 11, abnormal: 3, notChecked: 0, total: 14 },
  { title: '5 ผลตรวจระดับน้ำตาลเฉลี่ยย้อนหลัง 3 เดือนในเลือด (HBA1C)', normal: 11, abnormal: 3, notChecked: 0, total: 14 },
  { title: '6 ผลตรวจการทำงานของไต (BUN,Creatinine)', normal: 14, abnormal: 0, notChecked: 0, total: 14 },
]

const HealthCheckSummary = (props) => {
  const { pdfRefs, index } = props
  return (
    <div 
    ref={(el) => (pdfRefs.current[index+1] = el)}
    className="a4landscape sectionlandscape">
      <div className="p-6 bg-white text-sm text-black h-[210mm] flex flex-col ">
        <div>
          <div className="text-center mb-4">
            <h1 className="text-lg font-bold">โรงพยาบาลกรุงเทพคริสเตียน</h1>
            <p>BANGKOK CHRISTIAN HOSPITAL</p>
          </div>

          <div className="mb-4">
            <p><strong>เรื่อง</strong> ผลตรวจสุขภาพประจำปี</p>
            <p><strong>เรียน</strong> ผู้จัดการฝ่ายบุคคล</p>
            <p><strong>สิ่งที่ส่งมาด้วย</strong>: ผลสรุปการตรวจสุขภาพ</p>
            <p>ให้กับการตรวจสุขภาพประจำปีให้กับพนักงาน</p>
            <p>ทั้งหมด <strong>จำนวน 14 คน</strong> ได้สรุปผลการตรวจดังนี้</p>
            <p>ในวันที่ <strong>4 มีนาคม 2567</strong> ถึง <strong>31 พฤษภาคม 2567</strong></p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {mockData.map((section, idx) => (
              <div key={idx}>
                <p className="font-semibold mb-1">{section.title}</p>
                <ul className="list-disc pl-5">
                  <li>ปกติ {section.normal}</li>
                  <li>ผิดปกติ {section.abnormal}</li>
                  <li>ไม่ตรวจ {section.notChecked}</li>
                </ul>
                <p className="mt-1">รวม {section.total}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 flex flex-col justify-end">
          <div className="text-end">
            <p className="mt-6">ขอขอบพระคุณที่ท่านให้ความไว้วางใจในการใช้บริการตรวจสุขภาพของโรงพยาบาลกรุงเทพคริสเตียน</p>
          </div>
          <div className="w-full flex justify-end">
            <div className="w-2/6 flex flex-col items-center">
              <div className="w-full flex mt-4">
                <p className="w-12">ลงชื่อ</p>
                <label className="w-full border-b border-dotted border-black "></label>
              </div>
              <div className="w-full flex mt-2">
                <p className="w-12"></p>
                <label className="w-full ">รอตรวจความเรียบร้อย</label>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthCheckSummary
