import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const mockData = [
  { label: "ผลตรวจกรดยูริคในเลือด (Uric Acid)", value: 6.5 },
  { label: "ผลตรวจการทำงานของตับ (SGOT,SGPT,ALP)", value: 8.7 },
  { label: "ผลตรวจไขมันในเลือด (Lipid Profile)", value: 17.4 },
  { label: "ผลตรวจคลื่นหัวใจ (E.K.G.)", value: 2.2 },
  { label: "ผลตรวจน้ำตาลในเลือด (FBS)", value: 6.5 },
  { label: "ผลตรวจปัสสาวะ (Urinalysis)", value: 15.2 },
  { label: "ผลตรวจระดับน้ำตาลเฉลี่ยย้อนหลัง 3 เดือนในเลือด (HBA1C)", value: 6.5 },
  { label: "ผลตรวจร่างกายโดยแพทย์ (PE)", value: 10.9 },
  { label: "ผลตรวจเลือด (CBC)", value: 26.1 },
  { label: "ผลตรวจการทำงานของไต (BUN,Creatinine)", value: 0 },
  { label: "ผลเอ็กซเรย์ (X-Ray)", value: 0 },
];

const data = {
  labels: mockData.map((d) => d.label),
  datasets: [
    {
      label: "% อัตราผลผิดปกติ",
      data: mockData.map((d) => d.value),
      backgroundColor: [
        "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099",
        "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499"
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        boxWidth: 12,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}%`,
      },
    },
  },
};

const ChartPage = (props) => {
  const { pdfRefs, index } = props;
  return (
    <div  
    ref={(el) => (pdfRefs.current[index+1] = el)}
    className="bg-white a4landscape sectionlandscape">
      <div className="text-center mb-2">
        <p className="text-lg font-semibold">แผนภูมิแสดงอัตราผลตรวจผิดปกติของพนักงาน</p>
        <p className="text-sm">เทียบ 100 เปอร์เซ็นต์จากผลผิดปกติทั้งหมด</p>
        <h2 className="text-2xl font-bold mt-4">กราฟแสดงแผนภูมิ</h2>
      </div>
      <div className="flex justify-center items-center">
        <div className=" h-[700px] w-[600px]">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;