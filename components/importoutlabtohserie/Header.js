'use client';
import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx"; // นำเข้าไลบรารี xlsx

function Header(props) {
  const { fileName, setFileName, headerChoose, setheaderChoose, dataMap, setdataMap, headerdata, setheaderdata } = props;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ตั้งค่า setFileName ให้เป็นชื่อไฟล์ที่ถูกอัปโหลด
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // กรองเฉพาะชีทที่ต้องการ
      const allowedSheetNames = ["ปอด", "การได้ยิน", "ตาอาชีวะ", "ผลกล้ามเนื้อ", "Toxico"];
      const filteredSheetNames = workbook.SheetNames.filter(sheetName => allowedSheetNames.includes(sheetName));

      // สร้าง array สำหรับข้อมูลทุกๆ sheet ที่ผ่านการกรอง
      const allSheetsData = filteredSheetNames.map(sheetName => {
        const worksheet = workbook.Sheets[sheetName];

        // แปลงข้อมูลใน Sheet เป็น JSON
        const rawdataMap = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // ใช้ header แถวแรก

        // แยก header ออกจากข้อมูล
        const headers = rawdataMap[0];
        setheaderdata(headers);

        // เติมช่องว่างในข้อมูลที่ขาดหายไปและสร้างอ็อบเจ็กต์จาก header
        const fixeddataMap = rawdataMap.slice(1).map(row => {
          // เติมคอลัมน์ที่ขาดหายไปให้ตรงกับจำนวนคอลัมน์ของ header
          while (row.length < headers.length) {
            row.push(""); // เติมช่องที่ขาดด้วยค่า "" หรือ null ก็ได้
          }

          // สร้างอ็อบเจ็กต์ที่ใช้ header เป็น key
          const rowdataMap = headers.reduce((acc, header, index) => {
            if ((header === "Checkup Date" ) && row[index]) {
              // แปลงวันที่ในรูปแบบ DD/MM/YYYY
              const dateSerial = row[index];
              if (typeof dateSerial === "number") {
                // คำนวณวันที่จาก Excel serial date
                const excelDate = new Date(Math.round((dateSerial - 25569) * 86400 * 1000));
                const day = excelDate.getUTCDate().toString().padStart(2, "0");
                const month = (excelDate.getUTCMonth() + 1).toString().padStart(2, "0");
                const year = excelDate.getUTCFullYear();
                acc[header] = `${day}/${month}/${year}`;
              } else if (typeof dateSerial === "string") {
                // ตรวจสอบรูปแบบวันที่และแปลงให้อยู่ในรูปแบบ DD/MM/YYYY
                const dateParts = dateSerial.split(" ")[0].split("/"); // แยกวันที่
                if (dateParts.length === 3) {
                  const day = dateParts[0].padStart(2, "0");
                  const month = dateParts[1].padStart(2, "0");
                  // const year = parseInt(dateParts[2]) > 2500 ? parseInt(dateParts[2]) - 543 : dateParts[2]; // ปรับปีพุทธศักราชเป็นคริสต์ศักราช
                  const year = dateParts[2]; // ปรับปีพุทธศักราชเป็นคริสต์ศักราช
                  acc[header] = `${day}/${month}/${year}`;
                } else {
                  acc[header] = "Invalid Date"; // กรณีที่รูปแบบไม่ตรง
                }
              } else {
                acc[header] = "-"; // กรณีที่ข้อมูลไม่เป็นตัวเลขหรือสตริง
              }
            } else {
              acc[header] = row[index] || "-"; // กรณีข้อมูลที่ขาดหายไปจะถูกเติมด้วย ""
            }

            return acc;
          }, {});

          return rowdataMap;
        });

        return {
          sheetName,
          data: fixeddataMap
        };
      });

      console.log("allSheetsData", allSheetsData);
      setdataMap(allSheetsData); // เก็บข้อมูลของทุกๆ sheet ใน state
    };

    reader.readAsBinaryString(file); // อ่านไฟล์เป็น binary string
  };

  useEffect(() => {
    setheaderChoose(0)
  }, [dataMap]);

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
              <span className="flex justify-center items-center text-sm py-2 px-4 bg-[#A2B6E0] text-white rounded hover:bg-blue-600">
                <svg className='mr-2' width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9889 14.7778H3.33333C2.87778 14.7778 2.5 14.4 2.5 13.9444C2.5 13.4889 2.87778 13.1111 3.33333 13.1111H12.9889L11.0778 11.2C10.7556 10.8778 10.7556 10.3444 11.0778 10.0222C11.4 9.7 11.9333 9.7 12.2556 10.0222L15.5889 13.3556C15.6667 13.4333 15.7222 13.5222 15.7667 13.6222C15.8556 13.8222 15.8556 14.0556 15.7667 14.2556C15.7222 14.3556 15.6667 14.4444 15.5889 14.5222L12.2556 17.8556C12.0889 18.0222 11.8778 18.1 11.6667 18.1C11.4556 18.1 11.2444 18.0222 11.0778 17.8556C10.9228 17.6987 10.8359 17.4871 10.8359 17.2667C10.8359 17.0462 10.9228 16.8346 11.0778 16.6778L12.9889 14.7667V14.7778ZM22.5 8.94444V18.3889C22.5 20.0778 21.1333 21.4444 19.4444 21.4444H11.1111C9.42222 21.4444 8.05556 20.0778 8.05556 18.3889V17.2778C8.05556 16.8222 8.43333 16.4444 8.88889 16.4444C9.34444 16.4444 9.72222 16.8222 9.72222 17.2778V18.3889C9.72222 19.1556 10.3444 19.7778 11.1111 19.7778H19.4444C20.2111 19.7778 20.8333 19.1556 20.8333 18.3889V9.77778H15.5556C15.1 9.77778 14.7222 9.4 14.7222 8.94444V3.66667H11.1111C10.3444 3.66667 9.72222 4.28889 9.72222 5.05556V10.6111C9.72222 11.0667 9.34444 11.4444 8.88889 11.4444C8.43333 11.4444 8.05556 11.0667 8.05556 10.6111V5.05556C8.05556 3.36667 9.42222 2 11.1111 2H15.5556C15.7778 2 15.9889 2.08889 16.1444 2.24444L22.2556 8.35556C22.4111 8.51111 22.5 8.72222 22.5 8.94444ZM16.3889 8.11111H19.6556L16.3889 4.84444V8.11111Z" fill="white" />
                </svg>
                <a>Import</a>
              </span>
            </label>
          </div>
        </div>
        <div className="flex w-2/5"></div>
      </div>
      <div className="w-full flex mt-2">
        {dataMap && dataMap.length > 0 ? dataMap.map((item, index) => (
          <button key={index} onClick={() => setheaderChoose(index)} className={`w-44 border border-[#365382] rounded-lg p-4 text-center mr-2 ${headerChoose == index ? " bg-[#365382] text-white " : " bg-white text-[#365382]  "}`}>
            {item.sheetName}
          </button>
        )) : (
          <p className="text-center w-full">ยังไม่มีข้อมูล</p>
        )}
      </div>
    </div>
  );
}

export default Header;
