'use client'
import React from 'react'
import Modal from '../Modal/Modal'

export const ModalRecordingHistory = ({ open, onClose }) => {

    return <Modal setIsModal={onClose} x={false} isModal={open} modalsize={'w-[50%] h-[50%] min-w-[50%] min-h-[50%]   '}>
        <div className='w-full h-full px-4 overflow-auto'>
            <div className='w-full absolute top-0 right-4  justify-end flex items-center  '>
                <img onClick={() => onClose()} className=' cursor-pointer z-50' width={24} height={24} src="/icon/x.svg" />
            </div>
            <div className='flex col-span-12 justify-center items-start mt-8 '>
                <label className='text-[#365382] text-xl font-medium'>ประวัติการบันทึกข้อมูล</label>
            </div>

            <div className='flex col-span-12 justify-center items-start '>
                <table className="tablePatientInformation mt-4 w-full ">
                    <thead className='text-[#4E4E4E]  text-sm'>
                        <tr className="  text-left bg-[#E2E2E2]">
                            <th className=" font-light text-center">ผู้อัพเดทข้อมูลล่าสุด</th>
                            <th className=" font-light text-center">วัน-เวลาที่บันทึกข้อมูล</th>
                        </tr>
                    </thead>
                    <tbody className='text-base font-light'>
                        <tr key={`trPatientsd`} className=" text-center hover">
                            <td className=" text-center ">{'สาธิต ปุติตาเชะ' || '-'}</td>
                            <td className=" text-center ">{'13/12/2565 0:00:00' || '-'}</td>
                        </tr>
                        <tr key={`trPatientsd`} className=" text-center hover">
                            <td className=" text-center ">{'สมจง จิตรหอจอ' || '-'}</td>
                            <td className=" text-center ">{'7/12/2563 0:00:00' || '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Modal>
}
