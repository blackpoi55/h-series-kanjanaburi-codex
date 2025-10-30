import moment from 'moment'
import React from 'react'

function CardReport({ data }) {

    return (
        <div className='w-full flex justify-center'>
            <div className='flex flex-col w-full gap-2 bg-[#F3F3F3] p-4 rounded-lg border-[#F3F3F3] border'>
                <div className="flex w-full">
                    <div className='w-1/6'>
                        <img src={'/images/manreport.jpg'} alt="" />
                    </div>
                    <div className='w-5/6 flex flex-col items-start text-base h-full p-2'>
                        <div className='flex col-span-12'>
                            <div className='flex flex-col col-span-6'>
                                <div className='flex gap-2 flex-grow mr-2'>
                                    <label className='text-[#000000] font-semibold'>ชื่อ-นามสกุล :</label>
                                    <label className='text-gray-500 ml-10'>{(data?.prefix || '') + ' ' + (data?.first_name || '') + ' ' + (data?.last_name || '')}</label>
                                </div>

                                <div className='flex gap-2 flex-grow mr-2 mt-2'>
                                    <label className='text-[#000000] font-semibold'>หมายเลขบัตรประชาชน : -</label>
                                    {/* <label className='text-gray-500'>{data?.card_code || ''}</label> */}
                                </div>
                                <div className='flex gap-2 flex-grow mr-2 mt-2'>
                                    <label className='text-[#000000] font-semibold'>วัน/เดือน/ปีเกิด :</label>
                                    <label className='text-gray-500 ml-10'>{moment(data?.birth_date).add(543, 'year').locale('th').format('DD MMM YYYY') || ''}</label>
                                </div>
                            </div>
                            <div className='flex flex-col col-span-6 pl-2'>
                                <div className='flex gap-2 flex-grow'>
                                    <label className='text-[#000000] font-semibold'>HN :</label>
                                    <label className='text-gray-500'>{data?.hn || ''}</label>
                                </div>
                                <div className='flex gap-2 flex-grow'>
                                    <label className='text-[#000000] font-semibold'>เพศ :</label>
                                    <label className='text-gray-500'>{data?.gender || ''}</label>
                                </div>
                                <div className='flex gap-2 flex-grow'>
                                    <label className='text-[#000000] font-semibold'>อายุ :</label>
                                    <label className='text-gray-500'>{data?.age || ''} ปี</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap'>
                            <div className='flex gap-2 mt-2'>
                                <label className='w-60 text-[#000000] font-semibold'>ที่อยู่ที่สามารถติดต่อได้ :</label>
                                <label className='text-gray-500'>
                                    {data?.address ? data.address.replace(/[/|]/g, '') : ''}
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-wrap'>
                            <div className='flex gap-2 mt-2'>
                                <label className='text-[#000000] font-semibold'>เบอร์ติดต่อ :</label>
                                <label className='text-gray-500'>{data?.phone_number || '-'}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full min-w-[300px] flex flex-col gap-4'>
                    <div className='cursor-pointer relative p-4 flex h-20 items-center shadow-button-cardInformation bg-[#FFFFFF] rounded-lg border-[#F8F8F8] border gb-[#FFFFFF]'>
                        <label className='w-1/6 font-semibold whitespace-nowrap cursor-pointer text-[#FF1921]'>การแพ้ยา</label>
                        <label className='whitespace-nowrap cursor-pointer text-[#FF1921]'>{data?.allergies || '-'}</label>
                    </div>
                    <div className='cursor-pointer relative p-4 flex h-20 items-center shadow-button-cardInformation bg-[#FFFFFF] rounded-lg border-[#F8F8F8] border gb-[#FFFFFF]'>
                        <label className='w-1/6 font-semibold whitespace-nowrap cursor-pointer text-[#FF1921]'>โรคประจำตัว</label>
                        <label className='whitespace-nowrap cursor-pointer text-[#FF1921]'>ไม่มี</label>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardReport