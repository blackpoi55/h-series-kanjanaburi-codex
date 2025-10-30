'use client'
import moment from 'moment'
import React from 'react'

function Informationtop(props) {
    const { dataMap, Companyname } = props

    return (
        <div className='flex flex-col'>
            <label className='text-[#014F7D] font-bold text-xl w-full text-center' >Information</label>
            <label className='  w-full text-center  mb-5' >ตรวจสุขภาพ {Companyname}</label>
            <div className="flex w-full h-full">
                <div className="w-2/5 mr-2">
                    <div className="w-full h-full bg-[#7498C6] flex flex-col  text-white p-4 rounded-2xl">
                        <div className="h-2/5 flex flex-col">
                            {/* <label className='  w-full text-start' >แพ็คเกจ</label> */}
                            <label className='  w-full text-start' >ตรวจสุขภาพประจำปี </label>
                        </div>
                        <div className="h-4/6 flex flex-col">
                            <svg width="99" height="104" viewBox="0 0 99 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.3125 90.2344C43.3125 90.2344 37.125 90.2344 37.125 83.7891C37.125 77.3438 43.3125 58.0078 68.0625 58.0078C92.8125 58.0078 99 77.3438 99 83.7891C99 90.2344 92.8125 90.2344 92.8125 90.2344H43.3125ZM68.0625 51.5625C72.9856 51.5625 77.707 49.5253 81.1882 45.8991C84.6693 42.2729 86.625 37.3548 86.625 32.2266C86.625 27.0984 84.6693 22.1802 81.1882 18.554C77.707 14.9278 72.9856 12.8906 68.0625 12.8906C63.1394 12.8906 58.418 14.9278 54.9368 18.554C51.4557 22.1802 49.5 27.0984 49.5 32.2266C49.5 37.3548 51.4557 42.2729 54.9368 45.8991C58.418 49.5253 63.1394 51.5625 68.0625 51.5625Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M32.274 90.2344C31.3567 88.2223 30.8993 86.0162 30.9375 83.7891C30.9375 75.0557 35.145 66.0645 42.9165 59.8125C39.0375 58.5675 34.9962 57.9587 30.9375 58.0078C6.1875 58.0078 0 77.3438 0 83.7891C0 90.2344 6.1875 90.2344 6.1875 90.2344H32.274Z" fill="white" />
                                <path d="M27.8438 51.5625C31.9463 51.5625 35.8809 49.8649 38.7818 46.843C41.6828 43.8212 43.3125 39.7227 43.3125 35.4492C43.3125 31.1757 41.6828 27.0772 38.7818 24.0554C35.8809 21.0336 31.9463 19.3359 27.8438 19.3359C23.7412 19.3359 19.8066 21.0336 16.9057 24.0554C14.0047 27.0772 12.375 31.1757 12.375 35.4492C12.375 39.7227 14.0047 43.8212 16.9057 46.843C19.8066 49.8649 23.7412 51.5625 27.8438 51.5625Z" fill="white" />
                            </svg>
                            <label className='  w-full text-start font-bold' >จำนวนผู้ตรวจสุขภาพ</label>
                            <div className="flex items-end">
                                <label className='  w-full text-start font-bold text-6xl' >{dataMap.all}</label>
                                <label className='  w-full text-start font-bold' >ราย</label>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col w-3/5">
                    <div className="w-full flex h-1/2 mb-1 ">
                        <div className="w-1/3 h-full mr-2  bg-[#64C1D6] flex flex-col items-start  text-white p-4 rounded-2xl">
                            <div className="h-3/6 w-full flex flex-col items-end justify-center">


                            </div>
                            <div className="h-3/6 flex flex-col justify-end">
                                <label className='  w-full text-start font-bold' >ผลตรวจออกครบแล้ว</label>
                                <div className="flex items-end">
                                    <label className='  w-full text-start font-bold text-3xl' >{dataMap.maleapprove}</label>
                                    <label className='  w-full text-start font-bold' >ราย</label>

                                </div>
                            </div>

                        </div>
                        <div className="w-1/3 h-full mr-2  bg-[#64C1D6] flex flex-col items-start  text-white p-4 rounded-2xl">
                            <div className="h-3/6 w-full flex flex-col items-end justify-center">

                            </div>
                            <div className="h-3/6 flex flex-col justify-end">
                                <label className='  w-full text-start font-bold' >ผลตรวจยังไม่ออก</label>
                                <div className="flex items-end">
                                    <label className='  w-full text-start font-bold text-3xl' >{dataMap.maleunapprove}</label>
                                    <label className='  w-full text-start font-bold' >ราย</label>

                                </div>
                            </div>

                        </div>
                        <div className="w-1/3 h-full   bg-[#64C1D6] flex flex-col items-start  text-white p-4 rounded-2xl">
                            <div className="h-3/6 w-full flex flex-col items-end justify-center">
                                <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M60.9556 63.1366C58.2452 65.8394 54.7885 67.67 51.0297 68.3931C47.2418 69.1264 43.3216 68.7217 39.7634 67.23C32.474 64.1778 27.7048 57.0752 27.6385 49.1728C27.6004 43.3637 30.1908 37.8489 34.686 34.1691C39.1811 30.4893 45.0989 29.0392 50.786 30.2239C54.5349 31.0743 57.9487 33.0139 60.5984 35.7989C64.3144 39.3638 66.4648 44.2571 66.5777 49.4054C66.6151 54.5501 64.5903 59.4954 60.9556 63.1366Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M58.8303 34.0309C57.854 35.0073 57.854 36.5902 58.8303 37.5665C59.8066 38.5428 61.3895 38.5428 62.3659 37.5665L58.8303 34.0309ZM73.9645 25.9678C74.9408 24.9915 74.9408 23.4086 73.9645 22.4323C72.9882 21.456 71.4053 21.456 70.429 22.4323L73.9645 25.9678ZM63.0337 21.6447C61.653 21.6364 60.527 22.7489 60.5187 24.1296C60.5103 25.5102 61.6229 26.6363 63.0035 26.6446L63.0337 21.6447ZM72.1817 26.7C73.5624 26.7083 74.6884 25.5958 74.6967 24.2151C74.705 22.8344 73.5925 21.7084 72.2118 21.7001L72.1817 26.7ZM74.6967 24.1849C74.6884 22.8043 73.5624 21.6917 72.1817 21.7001C70.801 21.7084 69.6885 22.8344 69.6968 24.2151L74.6967 24.1849ZM69.7522 33.3933C69.7605 34.7739 70.8865 35.8865 72.2672 35.8781C73.6479 35.8698 74.7604 34.7438 74.7521 33.3631L69.7522 33.3933ZM62.3659 37.5665L73.9645 25.9678L70.429 22.4323L58.8303 34.0309L62.3659 37.5665ZM63.0035 26.6446L72.1817 26.7L72.2118 21.7001L63.0337 21.6447L63.0035 26.6446ZM69.6968 24.2151L69.7522 33.3933L74.7521 33.3631L74.6967 24.1849L69.6968 24.2151Z" fill="white" />
                                </svg>

                            </div>
                            <div className="h-3/6 flex flex-col justify-end">
                                <label className='  w-full text-start font-bold' >จำนวนรวมผู้ตรวจ</label>
                                <div className="flex items-end">
                                    <label className='  w-full text-start font-bold text-3xl' >{dataMap.maleall}</label>
                                    <label className='  w-full text-start font-bold' >ราย</label>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="w-full flex h-1/2 mt-1">
                        <div className="w-1/3 h-full mr-2  bg-[#FFC2D2] flex flex-col items-start  text-white p-4 rounded-2xl">
                            <div className="h-3/6 w-full flex flex-col items-end justify-center">

                            </div>
                            <div className="h-3/6 flex flex-col justify-end">
                                <label className='  w-full text-start font-bold' >ผลตรวจออกครบแล้ว</label>
                                <div className="flex items-end">
                                    <label className='  w-full text-start font-bold text-3xl' >{dataMap.femaleapprove}</label>
                                    <label className='  w-full text-start font-bold' >ราย</label>

                                </div>
                            </div>

                        </div>
                        <div className="w-1/3 h-full mr-2  bg-[#FFC2D2] flex flex-col items-start  text-white p-4 rounded-2xl">
                            <div className="h-3/6 w-full flex flex-col items-end justify-center">

                            </div>
                            <div className="h-3/6 flex flex-col justify-end">
                                <label className='  w-full text-start font-bold' >ผลตรวจยังไม่ออก</label>
                                <div className="flex items-end">
                                    <label className='  w-full text-start font-bold text-3xl' >{dataMap.femaleunapprove}</label>
                                    <label className='  w-full text-start font-bold' >ราย</label>

                                </div>
                            </div>

                        </div>
                        <div className="w-1/3 h-full   bg-[#FFC2D2] flex flex-col items-start  text-white p-4 rounded-2xl">
                            <div className="h-3/6 w-full flex flex-col items-end justify-center">
                                <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M27.416 38.9384C27.4214 35.1107 28.5712 31.372 30.7178 28.2028C32.8777 25.0059 35.9359 22.5201 39.5068 21.0588C46.8194 18.0626 55.214 19.7126 60.8487 25.2536C64.9833 29.3343 67.0512 35.0656 66.4746 40.8461C65.8981 46.6266 62.7389 51.8366 57.8798 55.0203C54.6277 57.0698 50.8422 58.1122 46.9993 58.0165C41.8509 58.1234 36.8703 56.1838 33.15 52.6232C29.4858 49.0118 27.4207 44.0832 27.416 38.9384Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M49.4993 58.0166C49.4993 56.6359 48.3801 55.5166 46.9993 55.5166C45.6186 55.5166 44.4993 56.6359 44.4993 58.0166H49.4993ZM44.4993 66.5862C44.4993 67.967 45.6186 69.0862 46.9993 69.0862C48.3801 69.0862 49.4993 67.967 49.4993 66.5862H44.4993ZM54.8327 69.0862C56.2134 69.0862 57.3327 67.967 57.3327 66.5862C57.3327 65.2055 56.2134 64.0862 54.8327 64.0862V69.0862ZM46.9993 64.0862C45.6186 64.0862 44.4993 65.2055 44.4993 66.5862C44.4993 67.967 45.6186 69.0862 46.9993 69.0862V64.0862ZM44.4993 74.4196C44.4993 75.8003 45.6186 76.9196 46.9993 76.9196C48.3801 76.9196 49.4993 75.8003 49.4993 74.4196H44.4993ZM49.4993 66.5862C49.4993 65.2055 48.3801 64.0862 46.9993 64.0862C45.6186 64.0862 44.4993 65.2055 44.4993 66.5862H49.4993ZM46.9993 69.0862C48.3801 69.0862 49.4993 67.967 49.4993 66.5862C49.4993 65.2055 48.3801 64.0862 46.9993 64.0862V69.0862ZM39.166 64.0862C37.7853 64.0862 36.666 65.2055 36.666 66.5862C36.666 67.967 37.7853 69.0862 39.166 69.0862V64.0862ZM44.4993 58.0166V66.5862H49.4993V58.0166H44.4993ZM54.8327 64.0862H46.9993V69.0862H54.8327V64.0862ZM49.4993 74.4196V66.5862H44.4993V74.4196H49.4993ZM46.9993 64.0862H39.166V69.0862H46.9993V64.0862Z" fill="white" />
                                </svg>
                            </div>
                            <div className="h-3/6 flex flex-col justify-end">
                                <label className='  w-full text-start font-bold' >จำนวนรวมผู้ตรวจ</label>
                                <div className="flex items-end">
                                    <label className='  w-full text-start font-bold text-3xl' >{dataMap.femaleall}</label>
                                    <label className='  w-full text-start font-bold' >ราย</label>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Informationtop;
