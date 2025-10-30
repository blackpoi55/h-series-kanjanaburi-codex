'use client';
import { importbulk } from '@/action/api';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as XLSX from "xlsx";
import { succeedAlert } from '../SweetAlert/sweetAlert';
import headerMapping from '@/utils/importresult';

function Header(props) {
  const { fileName, setFileName, headerChoose, setheaderChoose, dataMap, setdataMap, headerdata, setheaderdata } = props;



  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const allSheetsData = workbook.SheetNames.map(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const rawdataMap = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = rawdataMap[0];

        const fixeddataMap = rawdataMap.slice(1).map((row) => {
          while (row.length < headers.length) row.push("");

          const rowData = headers.reduce((acc, key, index) => {
            let value = row[index] || "-";
            const mappedKey = headerMapping[key?.trim()] || key?.trim();

            if (["birth_date", "exam_date", "nurse_exam_date"].includes(mappedKey)) {
              // แปลงวันที่เหมือนเดิม...
              if (typeof value === "number") {
                const excelDate = XLSX.SSF.parse_date_code(value);
                if (excelDate && excelDate.y && excelDate.m && excelDate.d) {
                  let year = excelDate.y;
                  let month = String(excelDate.m).padStart(2, "0");
                  let day = String(excelDate.d).padStart(2, "0");
                  if (year > 2500) year -= 543;
                  value = `${year}-${month}-${day}`;
                } else {
                  value = null;
                }
              } else if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                let [year, month, day] = value.split("-").map(Number);
                if (year > 2500) year -= 543;
                value = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              } else {
                value = null;
              }
            }

            if (mappedKey === 'hn') value = String(value).trim();

            acc[mappedKey] = value;
            return acc;
          }, {});

          // ✅ รวม blood_pressure1 กับ blood_pressure2 หลังจาก acc ครบแล้ว
          if (rowData["blood_pressure1"] && rowData["blood_pressure2"]) {
            rowData["blood_pressure"] = `${rowData["blood_pressure1"]}/${rowData["blood_pressure2"]}`;
          }

          return rowData;
        });


        return { sheetName, data: fixeddataMap };
      });

      const requiredFields = [
        'birth_date', 'card_code', 'company_code', 'company_name',
        'hn', 'en', 'first_name', 'last_name', 'age', 'gender', 'exam_date'
      ];

      let missingFields = {}, missingHNs = [];

      allSheetsData.forEach(sheet => {
        sheet.data.forEach((record, i) => {
          const hnValue = record["hn"] || "ไม่พบค่า HN";
          const missing = requiredFields.filter(f => !record[f] || record[f] === "-");

          if (missing.length > 0) {
            if (!missingFields[hnValue]) missingFields[hnValue] = [];
            missingFields[hnValue].push(`❌ แถวที่ ${i + 2} (Sheet: ${sheet.sheetName}) ขาด: ${missing.join(", ")}`);
          }

          if (!record["hn"] || record["hn"] === "-") {
            missingHNs.push(`❌ HN ว่างในแถวที่ ${i + 2} (Sheet: ${sheet.sheetName})`);
          }
        });
      });

      const missingDetails = Object.entries(missingFields).map(([hn, messages]) =>
        `<strong>🔹 HN: ${hn}</strong><br>${messages.join("<br>")}`
      );

      if (missingDetails.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'พบข้อผิดพลาดในการนำเข้า!',
          html: `<div style="text-align: left; max-height: 400px; overflow-y: auto;">${missingDetails.join("<br><br>")}</div>`,
          showConfirmButton: true,
          width: "800px"
        });
        setdataMap([]); setheaderdata([]);
      } else {
        setdataMap(allSheetsData);
        setheaderdata(Object.values(headerMapping));
      }

      if (missingHNs.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'พบ HN ที่ไม่ได้กรอกข้อมูล!',
          html: `<div style="text-align: left; max-height: 300px; overflow-y: auto;">${missingHNs.join("<br>")}</div>`,
          showConfirmButton: true,
          width: "600px"
        });
      }
    };

    reader.readAsBinaryString(file);
    e.target.value = "";
  }

  useEffect(() => {
    // try {
    //   console.log(dataMap?.[0]?.data?.[0])
    //   console.log("Total keys:", Object.keys(dataMap?.[0]?.data?.[0]).length);
    //   console.log("Keys:", Object.keys(dataMap?.[0]?.data?.[0])); 
    // }
    // catch (error) {
    //   console.error("Error:", error);
    // }
    setheaderChoose(0)
  }, [dataMap])

  const importDataClick = async () => {
    let val = dataMap?.[0]?.data
    console.log(val)
    if (val && val.length > 0) {
      let data = await importbulk(val)
      if (!data.error) {
        setdataMap([])
        setheaderdata([]);
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสำเร็จ!',
          showConfirmButton: false,
          timer: 2000
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'นำเข้าข้อมูลไม่สำเร็จ!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'นำเข้าข้อมูลไม่สำเร็จ!',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
  return (
    <div className='w-full flex flex-col mb-5'>
      <div className="flex w-full border-b-2 py-8">
        <div className="flex w-3/5">
          <div className="flex w-2/3 bg-[#F8F8F8] rounded-lg p-7 shadow-xl ml-2 justify-center items-center">
            {/* Textbox สำหรับแสดงชื่อไฟล์ */}
            <input
              type="text"
              value={fileName}
              className="w-full text-sm border border-gray-300 rounded px-3 py-2 disabled:bg-white mr-2"
              placeholder="เลือกไฟล์..."
              disabled
            />

            {/* ปุ่ม Choose File */}
            <label className="cursor-pointer w-56">
              <input
                type="file"
                accept=".xls,.xlsx" // อนุญาตเฉพาะไฟล์ .xls และ .xlsx
                className="hidden"
                onChange={handleFileUpload} // ใช้ Event Handler ใน React
              />
              <span className="flex justify-center items-center text-sm py-2 px-4 hover:bg-[#A2B6E0] text-white rounded bg-blue-600">
                <svg className='mr-2' width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9889 14.7778H3.33333C2.87778 14.7778 2.5 14.4 2.5 13.9444C2.5 13.4889 2.87778 13.1111 3.33333 13.1111H12.9889L11.0778 11.2C10.7556 10.8778 10.7556 10.3444 11.0778 10.0222C11.4 9.7 11.9333 9.7 12.2556 10.0222L15.5889 13.3556C15.6667 13.4333 15.7222 13.5222 15.7667 13.6222C15.8556 13.8222 15.8556 14.0556 15.7667 14.2556C15.7222 14.3556 15.6667 14.4444 15.5889 14.5222L12.2556 17.8556C12.0889 18.0222 11.8778 18.1 11.6667 18.1C11.4556 18.1 11.2444 18.0222 11.0778 17.8556C10.9228 17.6987 10.8359 17.4871 10.8359 17.2667C10.8359 17.0462 10.9228 16.8346 11.0778 16.6778L12.9889 14.7667V14.7778ZM22.5 8.94444V18.3889C22.5 20.0778 21.1333 21.4444 19.4444 21.4444H11.1111C9.42222 21.4444 8.05556 20.0778 8.05556 18.3889V17.2778C8.05556 16.8222 8.43333 16.4444 8.88889 16.4444C9.34444 16.4444 9.72222 16.8222 9.72222 17.2778V18.3889C9.72222 19.1556 10.3444 19.7778 11.1111 19.7778H19.4444C20.2111 19.7778 20.8333 19.1556 20.8333 18.3889V9.77778H15.5556C15.1 9.77778 14.7222 9.4 14.7222 8.94444V3.66667H11.1111C10.3444 3.66667 9.72222 4.28889 9.72222 5.05556V10.6111C9.72222 11.0667 9.34444 11.4444 8.88889 11.4444C8.43333 11.4444 8.05556 11.0667 8.05556 10.6111V5.05556C8.05556 3.36667 9.42222 2 11.1111 2H15.5556C15.7778 2 15.9889 2.08889 16.1444 2.24444L22.2556 8.35556C22.4111 8.51111 22.5 8.72222 22.5 8.94444ZM16.3889 8.11111H19.6556L16.3889 4.84444V8.11111Z" fill="white" />
                </svg>
                <a>Import</a>
              </span>
            </label>
            <button onClick={() => window.open('/file/exampleimportresult.xlsx')} className="flex w-48 h-10 ml-2 justify-center items-center text-sm py-2 px-4 hover:bg-[#a2e0af] text-white rounded bg-green-600">Example File</button>
          </div>
        </div>
        <div className="flex w-2/5 justify-end items-center">
          {dataMap.length > 0 && headerdata.length > 0 ?
            <button onClick={() => importDataClick()} className="flex w-48 h-10 ml-2 justify-center items-center text-sm py-2 px-4 hover:bg-[#e0bba2] text-white rounded bg-orange-600">Import Data</button>
            : ""
          }
        </div>
      </div>
      <div className="w-full flex mt-2">
        {dataMap && dataMap.length > 0 ? dataMap.map((item, index) => (
          // <button key={index} onClick={() => setheaderChoose(index)} className={`w-44 border border-[#365382] rounded-lg p-4 text-center mr-2 ${headerChoose == index ? " bg-[#365382] text-white " : " bg-white text-[#365382]  "}`}>
          //   {item.sheetName}
          // </button>
          ""
        )) : (
          <p className="text-center w-full">ยังไม่มีข้อมูล</p>
        )}
      </div>
    </div>
  );
}

export default Header;
