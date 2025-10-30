'use client'
import moment from 'moment'
import React from 'react'
import { ModalViewPackage } from '../Setup/modalSetup';
import { useState } from 'react';
import { RegisterModel } from './RegisterModel';

function Bulkbody(props) {
    const { dataMap, setdataMap } = props
    const [ismodal, setismodal] = useState(null)
    const [packagealldata, setpackagealldata] = useState(null)
    const [modelRegister, setModelRegister] = useState(null)
    const [wait, setWait] = useState(null)
    const excelSerialToDate = (serial) => {
        // วันที่เริ่มต้นของ Excel คือ 1 มกราคม 1900
        const startDate = new Date(1900, 0, 1);
        // ลบ 1 วัน เพราะ Excel เริ่มนับที่ 1 แต่ JavaScript เริ่มที่ 0
        const date = new Date(startDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
        return moment(date).format("DD/MM/YYYY");
    };
    const calculateAge = (serial) => {
        const startDate = new Date(1900, 0, 1); // วันที่เริ่มต้น Excel
        const birthDate = new Date(startDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
        const today = new Date(); // วันที่ปัจจุบัน
        let age = today.getFullYear() - birthDate.getFullYear();

        // ตรวจสอบเดือน/วัน หากยังไม่ถึงวันเกิดในปีนี้ ต้องลบอายุลง 1 ปี
        const isBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!isBirthdayPassed) {
            age--;
        }

        return age;
    };
    const viewpackageClick = (p) => {
        console.log(p.packageall)
        setpackagealldata(p.packageall)
        setismodal("Package All")
    }
    const refresh =()=>{

    }
    const editregisterClick =(item)=>{
        console.log(item)
        setModelRegister(item)
    }
    
    return (
        <div className='grid grid-cols-12 w-full   '>
            {<ModalViewPackage data={packagealldata} onClose={() => setpackagealldata(null)} />}
            <RegisterModel setWait={setWait} data={modelRegister} onClose={() => setModelRegister(null)} refresh={refresh} />
            <div className='col-span-12 overflow-x-auto px-1 pb-1'>
                <table className=" tablePatientInformation  mt-4 w-full ">
                    <thead className='text-[#4E4E4E]  text-sm truncate'>
                        <tr className=" text-left bg-[#E2E2E2]">
                            <th className="font-light">No.</th>
                            <th className="font-light">Employee No.</th>
                            <th className="font-light">ชื่อ-นามสกุล</th>
                            <th className="font-light">เพศ</th>
                            <th className="font-light">อายุ</th>
                            <th className="font-light">CID</th>
                            <th className="font-light">วันเดือนปีเกิด</th>
                            <th className="font-light">ตำแหน่ง</th>
                            <th className="font-light">Package Code</th>
                            <th className="font-light">Package Name</th>
                            <th className="font-light"></th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light truncate'>
                        {dataMap && dataMap.length > 0 && dataMap.map((item, index) => {
                            return <tr key={`trPatients${index}`} className=" text-center hover">
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{index + 1 || '-'}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{111 || '-'}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{(item.TITLE + " " + item.FIRSTNAME + " " + item.LASTNAME)}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{item.GENDER || '-'}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{calculateAge(item["DATEOFBIRTH(DD/MM/YYYY)"]) || '-'}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{111 || '-'}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{excelSerialToDate(item["DATEOFBIRTH(DD/MM/YYYY)"]) || '-'}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{111 || '-'}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{item?.ORDERSET || '-'}</td>
                                <td onClick={()=>editregisterClick(item)} className=" text-left cursor-pointer ">{item?.package?.package_name || '-'}</td>
                                <td className=" text-left flex gap-2">
                                    <button onClick={() => viewpackageClick(item)} className=' border max-h-10 min-h-10 px-4 rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >ข้อมูลแพ็คเกจ</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Bulkbody