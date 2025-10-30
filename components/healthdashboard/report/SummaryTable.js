// SummaryTable.tsx
import React from "react";

const mockData = [
  { label: "ตรวจร่างกายโดยแพทย์ (Physical Examination)", percent: 35.71, count: 5, total: 14 },
  { label: "เอ็กเรย์ปอด (X-RAY)", percent: 0, count: 0, total: 14 },
  { label: "เลือด (C.B.C)", percent: 85.71, count: 12, total: 14 },
  { label: "ตรวจปัสสาวะ (Urine exam)", percent: 50, count: 7, total: 14 },
  { label: "ระดับน้ำตาลในเลือด (FBS)", percent: 21.43, count: 3, total: 14 },
  { label: "ผลตรวจระดับน้ำตาลเฉลี่ยย้อนหลัง 3 เดือนในเลือด (HBA1C)", percent: 21.43, count: 3, total: 14 },
  { label: "ระดับไขมันในเลือด (Lipid Profile)", percent: 57.14, count: 8, total: 14 },
  { label: "ผลตรวจการทำงานของไต (BUN,Creatinine)", percent: 0, count: 0, total: 14 },
  { label: "การทำงานของตับ (SGPT, SGOT, ALP)", percent: 28.57, count: 4, total: 14 },
  { label: "ระดับกรดยูริคในเลือด (URIC ACID)", percent: 21.43, count: 3, total: 14 },
  { label: "คลื่นหัวใจ (EKG)", percent: 7.14, count: 1, total: 14 },
];

const SummaryTable = (props) => {
  const { pdfRefs, index } = props;
  return (
    <div 
    ref={(el) => (pdfRefs.current[index+1] = el)}
    className="a4landscape sectionlandscape">
    <div className="bg-white p-6 min-h-[210mm] flex flex-col ">
  
        <h2 className="text-lg font-semibold mb-4 text-center">
          เปอร์เซ็นต์ความผิดปกติเปรียบเทียบจากผู้ที่ได้รับการตรวจ
        </h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="border px-2 py-1 text-left">หัวข้อ</th>
              <th className="border px-2 py-1 text-center">%</th>
              <th className="border px-2 py-1 text-center">คน</th>
              <th className="border px-2 py-1 text-center">ตรวจทั้งหมด</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="border px-2 py-1 whitespace-nowrap">{item.label}</td>
                <td className="border px-2 py-1 text-center">{item.percent.toFixed(2)}%</td>
                <td className="border px-2 py-1 text-center">{item.count} คน</td>
                <td className="border px-2 py-1 text-center">{item.total} คน</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryTable;
