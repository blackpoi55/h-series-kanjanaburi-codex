'use client'
import { InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import Modal from './Modal'


export const ModalCancel = ({ open, onCancel, onSave }) => {

    return <Modal setIsModal={onCancel} x={false} isModal={open} modalsize={'w-[30%] h-[30%] min-w-[30%] min-h-[30%]   '}>
        <div className='flex flex-col gap-8 justify-center items-center  h-full  '>
            <div className='w-full absolute top-0 right-4  justify-end flex items-center  '>
                <img onClick={() => onClose()} className=' cursor-pointer' width={24} height={24} src="/icon/x.svg" />
            </div>
            <label className='text-xl font-medium text-[#365382]'>บันทึกการเปลี่ยนแปลงหรือไม่?</label>
            <div className='flex gap-4 justify-center items-center rounded-lg'>
                <button onClick={() => onCancel()} className={`z-auto h-10 w-40 shadow-md py-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382] `}>
                    <div className='flex gap-2 justify-center items-center' >
                        <img className=' cursor-pointer' width={24} height={24} src="/icon/x_red.svg" />
                        <label className='font-medium'>ยกเลิก</label>
                    </div></button>
                <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382]">
                    <div className='flex gap-2 justify-center items-center' >
                        <img className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                        <label className='font-medium'>บันทึก</label>
                    </div>
                </button>
            </div>
        </div>
    </Modal>
}

export const ModalSave = ({ open, onCancel, onSave }) => {

    return <Modal setIsModal={onCancel} x={false} isModal={open} modalsize={'w-[30%] h-[30%] min-w-[30%] min-h-[30%]   '}>
        <div className='flex flex-col gap-8 justify-center items-center  h-full  '>
            <div className='w-full absolute top-0 right-4  justify-end flex items-center  '>
                <img onClick={() => onClose()} className=' cursor-pointer' width={24} height={24} src="/icon/x.svg" />
            </div>
            {/* <label className='text-xl font-medium text-[#365382]'>มีข้อมูลบางส่วนยังไม่ได้กรอก?</label>
            <label className='text-base  '>บันทึกการเปลี่ยนแปลงหรือไม่?</label> */}
            <label className='text-xl font-medium text-[#365382]'>บันทึกการเปลี่ยนแปลงหรือไม่?</label>
            <div className='flex gap-4 justify-center items-center rounded-lg'>
                <button onClick={() => onCancel()} className={`z-auto h-10 w-40 shadow-md py-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382] `}>
                    <div className='flex gap-2 justify-center items-center' >
                        <img className=' cursor-pointer' width={24} height={24} src="/icon/x_red.svg" />
                        <label className='font-medium'>ยกเลิก</label>
                    </div></button>
                <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382]">
                    <div className='flex gap-2 justify-center items-center' >
                        <img className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                        <label className='font-medium'>บันทึก</label>
                    </div>
                </button>
            </div>
        </div>
    </Modal>
}

export const ModalSucceed = ({ open, onClose }) => {

    return <Modal setIsModal={onClose} x={false} isModal={open} modalsize={'w-[25%] h-[20%] min-w-[25%] min-h-[20%]   '}>
        <div className='flex flex-col gap-8 justify-center items-center  h-full  '>
            <label className='text-xl font-medium text-[#365382]'>บันทึกข้อมูลสำเร็จ</label>
            <div className='flex gap-4 justify-center items-center rounded-lg'>
                <button onClick={() => onClose()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382]">
                    <div className='flex gap-2 justify-center items-center' >
                        <img className=' cursor-pointer' width={24} height={24} src="/icon/check_mark.svg" />
                        <label className='font-medium'>ตกลง</label>
                    </div>
                </button>
            </div>
        </div>
    </Modal>
}

export const ModalClearData = ({ open, onClose, onClear }) => {
    const onCancel = () => {
        onClose()
    }

    return <Modal setIsModal={onClose} x={false} isModal={open} modalsize={'w-[30%] h-[30%] min-w-[30%] min-h-[30%]  relative '}>

        <div className='flex flex-col gap-8 justify-center items-center  h-full relative '>
            <div className='w-full absolute top-0 right-4  justify-end flex items-center  '>
                <img onClick={() => onClose()} className=' cursor-pointer' width={24} height={24} src="/icon/x.svg" />
            </div>
            <label className='text-xl font-medium text-[#365382]'>ล้างข้อมูลหรือไม่?</label>
            <label className='text-base text-[#E54545] '>ข้อมูลบางส่วนอาจสูญหาย?</label>

            <div className='flex gap-4 justify-center items-center rounded-lg'>
                <button onClick={() => onCancel()} className={`z-auto h-10 w-40 shadow-md py-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382] `}>
                    <div className='flex gap-2 justify-center items-center' >
                        <img className=' cursor-pointer' width={24} height={24} src="/icon/x_red.svg" />
                        <label className='font-medium'>ยกเลิก</label>
                    </div></button>
                <button onClick={() => onClear(true)} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#E54545]">
                    <div className='flex gap-2 justify-center items-center' >
                        <img className=' cursor-pointer' width={24} height={24} src="/icon/clear.svg" />
                        <label className='font-medium cursor-pointer'>ล้างข้อมูล</label>
                    </div>
                </button>
            </div>
        </div>
    </Modal>
}