'use client'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { toBuddhistDate } from '../Tool/tools'
function CardDocterResult({ data }) {
    return (
        <div className='w-full flex justify-center'>
            <div className='flex w-full gap-2 bg-[#EDF4FC] p-4 rounded-lg border-[#A2B6E0] border'>
                <div className='w-1/12'>
                    <img src={data?.Sex === 'ชาย' ? '/images/man.jpg' : '/images/Woman.jpg'} alt="" />
                </div>
                <div className='w-8/12 flex flex-col items-start text-base h-full'>
                    <label className='text-[#365382] font-semibold flex-grow'>{(data?.Prename || '') + (data?.Forename || '') + ' ' + (data?.Surname || '') + " " + '(' + (data?.Age || '') + ')'}</label>
                    <div className='flex flex-wrap'>
                        <div className='flex gap-2 flex-grow mr-2'>
                            <label className='text-[#696969]'>HN:</label>
                            <label className=''>{data?.HN || '-'}</label>
                        </div>
                        <div className='flex gap-2 flex-grow mr-2'>
                            <label className='text-[#696969]'>EN:</label>
                            <label> {data?.EN || '-'}</label>
                        </div>
                        <div className='flex gap-2 flex-grow mr-2'>
                            <label className='text-[#696969]'>DOB:</label>
                            <label> {data?.DOB ? dayjs(data?.DOB).add(543, 'year').format('DD/MM/YYYY') : '-'}</label>
                        </div>
                        <div className='flex gap-2 flex-grow mr-2'>
                            <label className='text-[#696969]'>เพศ:</label>
                            <label>{data?.Sex || '-'}</label>
                        </div>
                        <div className='flex gap-2 flex-grow'>
                            <label className='text-[#696969]'>อายุ:</label>
                            <label>{data?.AgeDetail || '-'}</label>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-grow'>
                        <label className='text-[#696969]'>วันที่ตรวจ:</label>
                        <label className=''>{data?.CheckupDate ? toBuddhistDate(data?.CheckupDate) : '-'}</label>
                    </div>
                </div>

                <div className='w-3/12 min-w-[300px] flex flex-col gap-4'>
                    <div className='cursor-pointer relative p-4 flex h-10 justify-center items-center shadow-button-cardInformation bg-[#FFFFFF] rounded-lg border-[#F8F8F8] border gb-[#FFFFFF]'>
                        <label className=' whitespace-nowrap cursor-pointer text-[#365382]'>รายละเอียดการมาใช้บริการทั้งหมด</label>
                    </div>
                    <div className='cursor-pointer relative p-4 flex h-10 justify-center items-center shadow-button-cardInformation bg-[#FFFFFF] rounded-lg border-[#F8F8F8] border gb-[#FFFFFF]'>
                        <label className=' whitespace-nowrap cursor-pointer text-[#365382]'>รวมผลการตรวจ Lab และ X-Ray ย้อนหลัง</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardDocterResult