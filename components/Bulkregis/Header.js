'use client'
import React, { useState } from 'react'
import * as XLSX from "xlsx"; // นำเข้าไลบรารี xlsx
function Header(props) {
  const { fileName, setFileName, headerChoose, setheaderChoose, dataMap, setdataMap } = props
  const handleFileChange = (e) => {
    try {
      const file = e.target.files[0]; // ดึงไฟล์แรกที่ผู้ใช้เลือก

      if (file) {
        setFileName(file ? file.name : ""); // อัปเดตชื่อไฟล์
        const reader = new FileReader();
        reader.onload = (event) => {
          const binaryStr = event.target.result; // อ่านข้อมูลเป็น binary string
          const workbook = XLSX.read(binaryStr, { type: "binary" }); // อ่านไฟล์ Excel
          console.log("workbook.SheetNames", workbook.SheetNames)
          // อ่านเฉพาะ sheet แรก
          const sheetName = workbook.SheetNames[0];
          const sheetNamesub = workbook.SheetNames[1];
          const sheetNamesub1 = workbook.SheetNames[2];
          const sheet = workbook.Sheets[sheetName];
          const sheetsub = workbook.Sheets[sheetNamesub];
          const sheetsub1 = workbook.Sheets[sheetNamesub1];
          // console.log("sheet",sheet)
          // console.log("sheetsub",sheetsub)
          // แปลงข้อมูลใน sheet เป็น JSON
          let data = XLSX.utils.sheet_to_json(sheet);
          let datasub = XLSX.utils.sheet_to_json(sheetsub);
          let datasub1 = XLSX.utils.sheet_to_json(sheetsub1);
          console.log("JSON Data:", data); // ตรวจสอบข้อมูล JSON ใน Console
          console.log("JSON Data Sub:", datasub); // ตรวจสอบข้อมูล JSON ใน Console
          console.log("JSON Data Sub1:", datasub1); // ตรวจสอบข้อมูล JSON ใน Console
          let sumdata = []
          for (const element of data) {
            let packagedata = datasub.filter((x) => x.package_code == element.ORDERSET)
            let packageall = datasub1.filter((x) => x.package_code == element.ORDERSET)
            sumdata.push({ ...element, package: packagedata[0], packageall: packageall })
          }
          console.log(sumdata)
          setdataMap(sumdata); // เก็บข้อมูล JSON ใน State

        };
        reader.readAsBinaryString(file); // อ่านไฟล์เป็น binary string
      }
    }
    catch{

    }
  };
  return (
    <div className='w-full flex flex-col mb-5'>
      <div className="flex w-full border-b-2 py-8">
        <div className="flex w-3/5">
          <div className="flex flex-col w-1/3 bg-[#EEF6FF] rounded-lg border-2 border-[#6B84B7] p-3 shadow-xl">
            <div className="flex">
              <label className='text-gray-500'>Company ID: A00410</label>
              <label className='ml-2 font-bold text-[#0B2756]'>ธนาคารกรุงเทพฯ</label>
            </div>
            <div className="flex">
              <label className='text-gray-500'>ที่อยู่: บางไผ่ ต.บางไผ่ อ.เมืองนนทบุรี จ.นนทบุรี 11000</label>
            </div>
            <div className="flex">
              <label className='text-gray-500'>เบอร์โทร: 02-345-6789</label>
            </div>
          </div>
          <div className="flex  w-2/3 bg-[#F8F8F8] rounded-lg p-7 shadow-xl ml-2 justify-center items-center">

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
                onChange={handleFileChange} // ใช้ Event Handler ใน React
              />
              <span className=" flex justify-center items-center text-sm py-2 px-4 bg-[#A2B6E0] text-white rounded hover:bg-blue-600">
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
      <div className="flex w-full py-8">
        <div className="flex w-full">
          <div className="w-3/4 flex">
            <button onClick={() => setheaderChoose(0)} className={`w-64 border border-[#365382] rounded-lg p-4 text-center mr-2 ${headerChoose == 0 ? " bg-[#365382] text-white " : " bg-white text-[#365382]  "}`}>รายชื่อทั้งหมด ({dataMap.length})</button>
            <button onClick={() => setheaderChoose(1)} className={`w-64 border border-[#365382] rounded-lg p-4 text-center mr-2 ${headerChoose == 1 ? " bg-[#365382] text-white " : " bg-white text-[#365382]  "}`}>Verify</button>
            <button onClick={() => setheaderChoose(2)} className={`w-64 border border-[#365382] rounded-lg p-4 text-center mr-2 ${headerChoose == 2 ? " bg-[#365382] text-white " : " bg-white text-[#365382]  "}`}>Complete</button>
          </div>
          <div className="w-1/4 flex justify-end">
            <button onClick={() => setheaderChoose(0)} className={`flex justify-center items-center w-64 border border-[#365382] rounded-lg p-4 text-center mr-2 bg-[#365382] text-white   `}>
              <svg className='mr-2' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.2929 5.29289C14.6835 4.90237 15.3166 4.90237 15.7071 5.2929L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L15.7071 18.7071C15.3166 19.0976 14.6835 19.0976 14.2929 18.7071C13.9024 18.3166 13.9024 17.6834 14.2929 17.2929L18.5858 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H18.5858L14.2929 6.7071C13.9024 6.31658 13.9024 5.68341 14.2929 5.29289Z" fill="white" />
              </svg>
              <label>Register</label>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header