'use client';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

function Carddetail({ data }) {
    const [openMenu, setOpenMenu] = useState(null);
    const router = useRouter();

    const onOpenMenu = (v) => setOpenMenu(prev => (prev === v ? null : v));

    const hasStation = useCallback(
        (name) => Array.isArray(data?.trLogons) && data.trLogons.some(l => l?.msStation?.Name === name),
        [data?.trLogons]
    );

    return (
        <div className="w-full flex justify-center">
            <div className="flex lg:flex-row md:flex-col flex-col items-center justify-center w-full p-3 rounded-lg text-start leading-tight transition-all outline-none bg-[#EDF4FC] hover:bg-blue-200 hover:bg-opacity-80 hover:text-blue-900 border shadow-lg shadow-gray-400">
                {/* ซ้าย: รูป/เพศ/อายุ */}
                <div className="w-1/6 min-w-[160px] flex flex-col items-center">
                    <div className="w-full">
                        <div className="w-[120px] h-[150px] mx-auto overflow-hidden rounded-md">
                            <img
                                src={data?.Sex === 'ชาย' ? '/images/man.jpg' : '/images/Woman.jpg'}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center mt-2">
                        <label className="mr-1">เพศ</label>
                        <label>{data?.Sex || '-'}</label>
                    </div>
                    <div className="w-full flex justify-center">
                        <label className="mr-1">อายุ</label>
                        <label className="mr-1">{data?.Age || '-'}</label>
                        <label>ปี</label>
                    </div>
                </div>

                {/* ขวา: รายละเอียด */}
                <div className="w-5/6 flex flex-col items-center text-sm pl-2">
                    <div className="w-full flex relative">
                        <div className="lg:flex lg:flex-col w-11/12 py-2">
                            <div
                                className="w-full flex flex-wrap items-end cursor-pointer"
                                onClick={() => router.push(`/patientinformation?UID=${data?.UID}`)}
                            >
                                <label className="text-[#365382] lg:font-bold lg:text-lg font-normal text-sm cursor-pointer mr-2">
                                    {(data?.Forename || '') + ' ' + (data?.Surname || '')}
                                </label>
                                <label className="text-[#696969] lg:font-bold lg:text-lg font-normal text-sm cursor-pointer mr-2">
                                    HN: <span className="font-normal text-black">{data?.HN || '-'}</span>
                                </label>
                                <label className="text-[#696969] lg:font-bold lg:text-lg font-normal text-sm cursor-pointer">
                                    EN:&nbsp;<span className="font-normal text-black">{data?.EN || '-'}</span>
                                </label>
                            </div>

                            <div className="w-full flex flex-wrap mt-2 items-center">
                                <div className="flex mr-2 items-center">
                                    <svg className='mr-1 text-[#017605]' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.312 8.64611C16.312 9.40854 16.6149 10.1397 17.154 10.6789C17.6931 11.218 18.4243 11.5209 19.1868 11.5209C19.9492 11.5209 20.6804 11.218 21.2195 10.6789C21.7586 10.1397 22.0615 9.40854 22.0615 8.64611C22.0615 7.88368 21.7586 7.15248 21.2195 6.61336C20.6804 6.07424 19.9492 5.77136 19.1868 5.77136C18.4243 5.77136 17.6931 6.07424 17.154 6.61336C16.6149 7.15248 16.312 7.88368 16.312 8.64611Z" stroke="#017605" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.81323 1.93839C4.0508 1.93839 3.31959 2.24126 2.78047 2.78038C2.24135 3.3195 1.93848 4.0507 1.93848 4.81313V8.64614C1.93848 9.91685 2.44327 11.1355 3.3418 12.0341C4.24033 12.9326 5.45901 13.4374 6.72973 13.4374C8.00045 13.4374 9.21912 12.9326 10.1177 12.0341C11.0162 11.1355 11.521 9.91685 11.521 8.64614V4.81313C11.521 4.0507 11.2181 3.3195 10.679 2.78038C10.1399 2.24126 9.40866 1.93839 8.64623 1.93839" stroke="#017605" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.72949 13.437V21.103C6.72949 21.6113 6.93141 22.0988 7.29082 22.4582C7.65024 22.8176 8.1377 23.0195 8.64599 23.0195C9.15428 23.0195 9.64175 22.8176 10.0012 22.4582C10.3606 22.0988 10.5625 21.6113 10.5625 21.103V15.5758C10.5625 14.9405 10.8149 14.3311 11.2642 13.8819C11.7134 13.4326 12.3228 13.1802 12.9581 13.1802C13.5935 13.1802 14.2028 13.4326 14.6521 13.8819C15.1013 14.3311 15.3537 14.9405 15.3537 15.5758V19.1865C15.3537 19.6948 15.5557 20.1823 15.9151 20.5417C16.2745 20.9011 16.762 21.103 17.2702 21.103C17.7785 21.103 18.266 20.9011 18.6254 20.5417C18.9848 20.1823 19.1867 19.6948 19.1867 19.1865V11.5205" stroke="#017605" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.81299 0.980469V3.37609" stroke="#017605" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8.646 0.980469V3.37609" stroke="#017605" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <label className={`${hasStation('Vital Sign') ? 'text-[#017605]' : ''} mr-1 whitespace-nowrap`}>Vital Sign:</label>
                                    {hasStation('Vital Sign') ? (
                                        <img width={18} height={15} src="/icon/correct_arrow.svg" />
                                    ) : (
                                        <img width={24} height={24} src="/icon/clock_black.svg" />
                                    )}
                                </div>

                                <div className="flex mr-2 items-center">
                                    <label className="mr-1 whitespace-nowrap">ส่วนสูง</label>
                                    <label className="mr-1 text-red-500">{data?.trVitalSign?.Height || '-'}</label>
                                    <label>ซม.</label>
                                </div>
                                <div className="flex mr-2 items-center">
                                    <label className="mr-1 whitespace-nowrap">น้ำหนัก</label>
                                    <label className="mr-1 text-red-500">{data?.trVitalSign?.Weight || '-'}</label>
                                    <label>กก.</label>
                                </div>
                                <div className="flex">
                                    <label className="mr-1 whitespace-nowrap">ดัชนีมวลกาย</label>
                                    <label className="mr-1 text-red-500">{data?.trVitalSign?.BMI || '-'}</label>
                                </div>
                            </div>

                            <div className="w-full flex flex-wrap mt-2">
                                <div className="flex mr-2 items-center">
                                    <label className={`mr-1 ${data?.trVitalSign?.Remarks ? 'text-[#017605]' : ''}`}>Nurse Approve:</label>
                                    {data?.trVitalSign?.Remarks ? (
                                        <img width={18} height={15} src="/icon/correct_arrow.svg" />
                                    ) : (
                                        <img width={24} height={24} src="/icon/clock_black.svg" />
                                    )}
                                </div>
                                <div className="flex mr-2 items-center">
                                    <label className={`mr-1 ${data?.trPhysicalExamination ? 'text-[#017605]' : ''}`}>Doctor Approved:</label>
                                    {data?.trPhysicalExamination ? (
                                        <img width={18} height={15} src="/icon/correct_arrow.svg" />
                                    ) : (
                                        <img width={24} height={24} src="/icon/clock_black.svg" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ปุ่มเมนู */}
                        <div className="flex w-1/12 justify-center md:absolute md:-top-24 md:-right-6 absolute -top-20 -right-6 lg:relative lg:top-auto lg:right-auto">
                            <div className="relative w-[160px] justify-end flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => onOpenMenu(1)}
                                    className="w-7 h-7 rounded-full bg-white hover:bg-[#365382] flex justify-center items-center shadow-lg shadow-gray-300"
                                >
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="5" cy="18" r="1.5" /><path d="M8.54 18h12.5" stroke="currentColor" /><circle cx="5" cy="13" r="1.5" /><path d="M8.54 13h12.5" stroke="currentColor" /><circle cx="5" cy="8" r="1.5" /><path d="M8.54 8h12.5" stroke="currentColor" /></svg>
                                </button>

                                {openMenu === 1 && (
                                    <div className="absolute top-[15px] right-0 md:right-[22px] z-[90] w-64 rounded-xl border bg-white shadow-2xl">
                                        <ul className="py-1 h-full w-full">
                                            <li
                                                onClick={() => router.push(`/docterresult?UID=${data?.UID}`)}
                                                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-100"
                                            >
                                                <span className="inline-flex h-5 w-5 items-center justify-center shrink-0">
                                                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.4961 3.51768C14.4961 2.98821 14.2858 2.48043 13.9114 2.10604C13.537 1.73165 13.0292 1.52132 12.4998 1.52132C11.9703 1.52132 11.4625 1.73165 11.0881 2.10604C10.7137 2.48043 10.5034 2.98821 10.5034 3.51768H4.01527C3.75053 3.51768 3.49664 3.62284 3.30945 3.81003C3.12225 3.99723 3.01709 4.25112 3.01709 4.51585V23.4812C3.01709 23.7459 3.12225 23.9998 3.30945 24.187C3.49664 24.3742 3.75053 24.4794 4.01527 24.4794H20.9843C21.249 24.4794 21.5029 24.3742 21.6901 24.187C21.8773 23.9998 21.9825 23.7459 21.9825 23.4812V4.51585C21.9825 4.25112 21.8773 3.99723 21.6901 3.81003C21.5029 3.62284 21.249 3.51768 20.9843 3.51768H14.4961Z" fill="white" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M5.51276 5.51404H19.4872C19.4872 5.51404 19.9863 5.51404 19.9863 6.01313V21.984C19.9863 21.984 19.9863 22.483 19.4872 22.483H5.51276C5.51276 22.483 5.01367 22.483 5.01367 21.984V6.01313C5.01367 6.01313 5.01367 5.51404 5.51276 5.51404Z" fill="white" />
                                                        <path d="M15.9937 10.0055H13.9973V8.00911C13.9973 7.87675 13.9447 7.7498 13.8511 7.65621C13.7575 7.56261 13.6306 7.51003 13.4982 7.51003H11.5019C11.3695 7.51003 11.2425 7.56261 11.1489 7.65621C11.0553 7.7498 11.0028 7.87675 11.0028 8.00911V10.0055H9.00641C8.87405 10.0055 8.7471 10.0581 8.6535 10.1516C8.55991 10.2452 8.50732 10.3722 8.50732 10.5046V12.5009C8.50732 12.6333 8.55991 12.7602 8.6535 12.8538C8.7471 12.9474 8.87405 13 9.00641 13H11.0028V14.9964C11.0028 15.1287 11.0553 15.2557 11.1489 15.3493C11.2425 15.4429 11.3695 15.4954 11.5019 15.4954H13.4982C13.6306 15.4954 13.7575 15.4429 13.8511 15.3493C13.9447 15.2557 13.9973 15.1287 13.9973 14.9964V13H15.9937C16.126 13 16.253 12.9474 16.3466 12.8538C16.4402 12.7602 16.4927 12.6333 16.4927 12.5009V10.5046C16.4927 10.3722 16.4402 10.2452 16.3466 10.1516C16.253 10.0581 16.126 10.0055 15.9937 10.0055Z" fill="white" />
                                                        <path d="M18.5529 5.51404H5.51276C5.38039 5.51404 5.25345 5.56662 5.15985 5.66022C5.06625 5.75382 5.01367 5.88076 5.01367 6.01313V19.0533L18.5529 5.51404Z" fill="white" />
                                                        <path d="M14.0612 10.0055H13.9973V8.00911C13.9973 7.87675 13.9447 7.7498 13.8511 7.65621C13.7575 7.56261 13.6306 7.51003 13.4982 7.51003H11.5019C11.3695 7.51003 11.2425 7.56261 11.1489 7.65621C11.0553 7.7498 11.0028 7.87675 11.0028 8.00911V10.0055H9.00641C8.87405 10.0055 8.7471 10.0581 8.6535 10.1516C8.55991 10.2452 8.50732 10.3722 8.50732 10.5046V12.5009C8.50732 12.6333 8.55991 12.7602 8.6535 12.8538C8.7471 12.9474 8.87405 13 9.00641 13H11.0028V13.0639L14.0612 10.0055Z" fill="white" />
                                                        <path d="M5.51276 5.51404H19.4872C19.4872 5.51404 19.9863 5.51404 19.9863 6.01313V21.984C19.9863 21.984 19.9863 22.483 19.4872 22.483H5.51276C5.51276 22.483 5.01367 22.483 5.01367 21.984V6.01313C5.01367 6.01313 5.01367 5.51404 5.51276 5.51404Z" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M15.9937 10.0055H13.9973V8.00911C13.9973 7.87675 13.9447 7.7498 13.8511 7.65621C13.7575 7.56261 13.6306 7.51003 13.4982 7.51003H11.5019C11.3695 7.51003 11.2425 7.56261 11.1489 7.65621C11.0553 7.7498 11.0028 7.87675 11.0028 8.00911V10.0055H9.00641C8.87405 10.0055 8.7471 10.0581 8.6535 10.1516C8.55991 10.2452 8.50732 10.3722 8.50732 10.5046V12.5009C8.50732 12.6333 8.55991 12.7602 8.6535 12.8538C8.7471 12.9474 8.87405 13 9.00641 13H11.0028V14.9964C11.0028 15.1287 11.0553 15.2557 11.1489 15.3493C11.2425 15.4429 11.3695 15.4954 11.5019 15.4954H13.4982C13.6306 15.4954 13.7575 15.4429 13.8511 15.3493C13.9447 15.2557 13.9973 15.1287 13.9973 14.9964V13H15.9937C16.126 13 16.253 12.9474 16.3466 12.8538C16.4402 12.7602 16.4927 12.6333 16.4927 12.5009V10.5046C16.4927 10.3722 16.4402 10.2452 16.3466 10.1516C16.253 10.0581 16.126 10.0055 15.9937 10.0055Z" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.0083 17.4922H16.9919" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.0083 19.4881H16.9919" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                                <span className="text-[#365382] text-sm font-medium leading-none whitespace-nowrap">
                                                    Docter Result
                                                </span>
                                            </li>

                                            <li
                                                onClick={() => router.push(`/patientinformation?UID=${data?.UID}`)}
                                                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-100"
                                            >
                                                <span className="inline-flex h-5 w-5 items-center justify-center shrink-0">
                                                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.625 23.6979C3.625 21.2115 4.61272 18.8269 6.37087 17.0688C8.12903 15.3106 10.5136 14.3229 13 14.3229C15.4864 14.3229 17.871 15.3106 19.6291 17.0688C21.3873 18.8269 22.375 21.2115 22.375 23.6979H3.625Z" fill="white" />
                                                        <path d="M18.7294 7.03125C18.7294 8.55072 18.1257 10.008 17.0513 11.0824C15.9769 12.1568 14.5197 12.7604 13.0002 12.7604C11.4807 12.7604 10.0235 12.1568 8.94905 11.0824C7.87463 10.008 7.27102 8.55072 7.27102 7.03125C7.26809 6.01073 7.54554 5.00901 8.0731 4.13542C8.96043 5.05074 10.0224 5.77866 11.1962 6.27608C12.37 6.7735 13.6316 7.0303 14.9064 7.03125C16.199 7.03037 17.4781 6.76817 18.6669 6.26042C18.7088 6.51521 18.7297 6.77303 18.7294 7.03125Z" fill="white" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M18.6769 6.26042H18.6665" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.07292 4.13542L8.0625 4.125L8.07292 4.13542Z" fill="white" />
                                                        <path d="M8.07292 4.13542L8.0625 4.125" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M13 16.8552C15.0438 16.8567 17.0312 17.526 18.6594 18.7613C20.2877 19.9965 21.4677 21.7301 22.0198 23.6979H22.375C22.375 21.2115 21.3873 18.8269 19.6291 17.0688C17.871 15.3106 15.4864 14.3229 13 14.3229C10.5136 14.3229 8.12903 15.3106 6.37087 17.0688C4.61272 18.8269 3.625 21.2115 3.625 23.6979H3.98021C4.53227 21.7301 5.71227 19.9965 7.34055 18.7613C8.96883 17.526 10.9562 16.8567 13 16.8552Z" fill="white" />
                                                        <path d="M12.9998 3.83438C13.9749 3.83485 14.9336 4.08602 15.7836 4.56377C16.6337 5.04151 17.3466 5.72979 17.854 6.5625C18.13 6.47292 18.4019 6.37396 18.6665 6.2625C18.5102 5.08218 17.9888 3.98025 17.1753 3.11084C16.3619 2.24143 15.297 1.64803 14.1297 1.41365C12.9623 1.17926 11.7509 1.31562 10.6649 1.80363C9.57891 2.29165 8.67259 3.10693 8.07275 4.13542C8.45546 4.52337 8.87011 4.87844 9.31234 5.19688C10.3396 4.3174 11.6475 3.83416 12.9998 3.83438Z" fill="white" />
                                                        <path d="M3.625 23.6979C3.625 21.2115 4.61272 18.8269 6.37087 17.0688C8.12903 15.3106 10.5136 14.3229 13 14.3229C15.4864 14.3229 17.871 15.3106 19.6291 17.0688C21.3873 18.8269 22.375 21.2115 22.375 23.6979H3.625Z" fill="white" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M18.6665 6.26042C17.4778 6.76817 16.1987 7.03037 14.9061 7.03125C13.6313 7.0303 12.3696 6.7735 11.1958 6.27608C10.0221 5.77866 8.96008 5.05073 8.07275 4.13542C8.67246 3.10697 9.5786 2.29168 10.6645 1.80356C11.7503 1.31544 12.9616 1.1789 14.1288 1.41305C15.2961 1.64719 16.361 2.2403 17.1746 3.10943C17.9882 3.97856 18.5098 5.08025 18.6665 6.26042Z" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </span>
                                                <span className="text-[#365382] text-sm font-medium leading-none whitespace-nowrap">
                                                    Patient Info
                                                </span>
                                            </li>

                                            <li
                                                onClick={() => router.push(`/printreport?UID=${data?.UID}`)}
                                                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-100"
                                            >
                                                <span className="inline-flex h-5 w-5 items-center justify-center shrink-0">
                                                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.01172 7.51003V1.52097H15.5802C15.845 1.52102 16.0988 1.62622 16.286 1.81343L18.6956 4.22303C18.8828 4.41018 18.988 4.66403 18.988 4.92874V7.51003H6.01172Z" fill="white" />
                                                        <path d="M6.01172 5.51367H18.988V7.51003H6.01172V5.51367Z" fill="white" />
                                                        <path d="M3.01735 17.4918C2.48837 17.4902 1.98151 17.2794 1.60746 16.9053C1.23341 16.5313 1.02258 16.0244 1.021 15.4954V9.50638C1.02258 8.9774 1.23341 8.47054 1.60746 8.09649C1.98151 7.72244 2.48837 7.5116 3.01735 7.51003H21.9827C22.5117 7.5116 23.0186 7.72244 23.3926 8.09649C23.7667 8.47054 23.9775 8.9774 23.9791 9.50638V15.4954C23.9775 16.0244 23.7667 16.5313 23.3926 16.9053C23.0186 17.2794 22.5117 17.4902 21.9827 17.4918H3.01735Z" fill="white" />
                                                        <path d="M18.988 23.4809C18.988 23.7456 18.8829 23.9995 18.6957 24.1867C18.5085 24.3739 18.2546 24.479 17.9898 24.479H7.0099C6.74516 24.479 6.49127 24.3739 6.30408 24.1867C6.11688 23.9995 6.01172 23.7456 6.01172 23.4809V14.4973H18.988V23.4809Z" fill="white" />
                                                        <path d="M6.01172 14.4973H18.988V16.4936H6.01172V14.4973Z" fill="white" />
                                                        <path d="M21.9827 7.51003H3.01735C2.48837 7.5116 1.98151 7.72244 1.60746 8.09649C1.23341 8.47054 1.02258 8.9774 1.021 9.50638V11.5027C1.02258 10.9738 1.23341 10.4669 1.60746 10.0928C1.98151 9.7188 2.48837 9.50796 3.01735 9.50638H21.9827C22.5117 9.50796 23.0186 9.7188 23.3926 10.0928C23.7667 10.4669 23.9775 10.9738 23.9791 11.5027V9.50638C23.9775 8.9774 23.7667 8.47054 23.3926 8.09649C23.0186 7.72244 22.5117 7.5116 21.9827 7.51003Z" fill="white" />
                                                        <path d="M18.9883 4.92874C18.9883 4.66403 18.8831 4.41018 18.6958 4.22303L16.2862 1.81343C16.0991 1.62622 15.8452 1.52102 15.5805 1.52097H14.9956V5.51367H18.9883V4.92874Z" fill="white" />
                                                        <path d="M6.01188 17.4918H3.01735C2.48837 17.4902 1.98151 17.2794 1.60746 16.9053C1.23341 16.5313 1.02258 16.0244 1.021 15.4954V9.50638C1.02258 8.9774 1.23341 8.47054 1.60746 8.09649C1.98151 7.72244 2.48837 7.5116 3.01735 7.51003H21.9827C22.5117 7.5116 23.0186 7.72244 23.3926 8.09649C23.7667 8.47054 23.9775 8.9774 23.9791 9.50638V15.4954C23.9775 16.0244 23.7667 16.5313 23.3926 16.9053C23.0186 17.2794 22.5117 17.4902 21.9827 17.4918H18.9882" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M18.988 23.4809C18.988 23.7456 18.8829 23.9995 18.6957 24.1867C18.5085 24.3739 18.2546 24.479 17.9898 24.479H7.0099C6.74516 24.479 6.49127 24.3739 6.30408 24.1867C6.11688 23.9995 6.01172 23.7456 6.01172 23.4809V14.4973H18.988V23.4809Z" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.0083 20.4863H16.9919" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.0083 17.4918H16.9919" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6.01172 5.51367V1.52097H15.5802C15.845 1.52102 16.0988 1.62622 16.286 1.81343L18.6956 4.22303C18.8828 4.41018 18.988 4.66403 18.988 4.92874V5.51367" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4.01527 11.5027C4.21269 11.5027 4.40567 11.4442 4.56982 11.3345C4.73397 11.2248 4.86191 11.0689 4.93746 10.8865C5.01301 10.7041 5.03278 10.5034 4.99426 10.3098C4.95575 10.1162 4.86068 9.93834 4.72108 9.79874C4.58149 9.65914 4.40363 9.56407 4.21 9.52556C4.01637 9.48704 3.81567 9.50681 3.63328 9.58236C3.45089 9.65791 3.29499 9.78585 3.18531 9.95C3.07563 10.1141 3.01709 10.3071 3.01709 10.5046C3.01709 10.7693 3.12225 11.0232 3.30945 11.2104C3.49664 11.3976 3.75053 11.5027 4.01527 11.5027Z" fill="white" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.9956 1.52097V5.51367H18.9883" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                                <span className="text-[#365382] text-sm font-medium leading-none whitespace-nowrap">
                                                    Print
                                                </span>
                                            </li>

                                            <li
                                                onClick={() => router.push(`/labchart?UID=${data?.UID}`)}
                                                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-100"
                                            >
                                                <span className="inline-flex h-5 w-5 items-center justify-center shrink-0">
                                                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_3548_5657)">
                                                            <path d="M0.520996 12.7083V1.28125" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M24.4793 2.32291V10.6458L17.5522 13.5C16.2683 13.9849 14.9135 14.2559 13.5418 14.3021H10.9377C9.57987 14.3523 8.24978 14.7008 7.04183 15.3229L0.520996 18.9896V12.7083L8.07308 8.54166C9.25633 7.96923 10.6065 7.84346 11.8752 8.1875L15.7397 9.47916C16.3281 9.63948 16.9488 9.639 17.5369 9.47777C18.125 9.31654 18.6591 9.00046 19.0835 8.5625L24.4793 2.32291Z" fill="white" />
                                                            <path d="M24.4793 10.6458V16.9063L17.6668 18.5104C16.3145 18.7914 14.9315 18.8964 13.5522 18.8229L10.9377 18.625C9.6003 18.592 8.28242 18.9504 7.146 19.6563L0.520996 24.2292V18.9896L7.04183 15.3229C8.24978 14.7008 9.57987 14.3523 10.9377 14.3021H13.5418C14.9135 14.2559 16.2683 13.9849 17.5522 13.5L24.4793 10.6458Z" fill="white" />
                                                            <path d="M24.4793 16.9062V24.1979C24.4793 24.3361 24.4245 24.4685 24.3268 24.5662C24.2291 24.6639 24.0966 24.7187 23.9585 24.7187H1.04183C0.909667 24.7166 0.783067 24.6652 0.686757 24.5747C0.590447 24.4841 0.531345 24.3609 0.520996 24.2292L7.146 19.6562C8.28242 18.9504 9.6003 18.592 10.9377 18.625L13.5522 18.8229C14.9315 18.8964 16.3145 18.7914 17.6668 18.5104L24.4793 16.9062Z" fill="white" />
                                                            <path d="M19.0835 8.5625C18.6591 9.00046 18.125 9.31654 17.5369 9.47777C16.9488 9.639 16.3281 9.63948 15.7397 9.47916L11.8752 8.1875C10.6065 7.84346 9.25633 7.96923 8.07308 8.54166L0.520996 12.7083V14.7917L8.07308 10.625C9.25633 10.0526 10.6065 9.92679 11.8752 10.2708L15.7397 11.5615C16.3281 11.7223 16.9489 11.7221 17.5371 11.5609C18.1254 11.3996 18.6594 11.0832 19.0835 10.6448L24.4793 4.40625V2.32291L19.0835 8.5625Z" fill="white" />
                                                            <path d="M17.5522 13.5003C16.2683 13.9852 14.9135 14.2561 13.5418 14.3023H10.9377C9.57987 14.3526 8.24978 14.7011 7.04183 15.3232L0.520996 18.9898V21.0732L7.04183 17.4055C8.25003 16.7842 9.58002 16.4361 10.9377 16.3857H13.5418C14.9135 16.3386 16.2682 16.0673 17.5522 15.5826L24.4793 12.7284V10.6451L17.5522 13.5003Z" fill="white" />
                                                            <path d="M17.6668 18.5104C16.3145 18.7914 14.9315 18.8964 13.5522 18.8229L10.9377 18.625C9.6003 18.592 8.28242 18.9504 7.146 19.6562L0.520996 24.2292C0.531345 24.3609 0.590447 24.4841 0.686757 24.5747C0.783067 24.6652 0.909667 24.7166 1.04183 24.7187H2.82933L7.146 21.7396C8.28245 21.0338 9.6003 20.6754 10.9377 20.7083L13.5522 20.9073C14.9315 20.9808 16.3145 20.8758 17.6668 20.5948L24.4793 18.9896V16.9062L17.6668 18.5104Z" fill="white" />
                                                            <path d="M24.4793 2.32291V10.6458L17.5522 13.5C16.2683 13.9849 14.9135 14.2559 13.5418 14.3021H10.9377C9.57987 14.3523 8.24978 14.7008 7.04183 15.3229L0.520996 18.9896V12.7083L8.07308 8.54166C9.25633 7.96923 10.6065 7.84346 11.8752 8.1875L15.7397 9.47916C16.3281 9.63948 16.9488 9.639 17.5369 9.47777C18.125 9.31654 18.6591 9.00046 19.0835 8.5625L24.4793 2.32291Z" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M24.4793 10.6458V16.9063L17.6668 18.5104C16.3145 18.7914 14.9315 18.8964 13.5522 18.8229L10.9377 18.625C9.6003 18.592 8.28242 18.9504 7.146 19.6563L0.520996 24.2292V18.9896L7.04183 15.3229C8.24978 14.7008 9.57987 14.3523 10.9377 14.3021H13.5418C14.9135 14.2559 16.2683 13.9849 17.5522 13.5L24.4793 10.6458Z" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M24.4793 16.9062V24.1979C24.4793 24.336 24.4245 24.4685 24.3268 24.5662C24.2291 24.6639 24.0966 24.7187 23.9585 24.7187H1.04183C0.909667 24.7166 0.783067 24.6652 0.686757 24.5747C0.590447 24.4841 0.531345 24.3609 0.520996 24.2292L7.146 19.6562C8.28242 18.9504 9.6003 18.592 10.9377 18.625L13.5522 18.8229C14.9315 18.8964 16.3145 18.7914 17.6668 18.5104L24.4793 16.9062Z" stroke="#365382" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3548_5657">
                                                                <rect width="25" height="25" fill="white" transform="translate(0 0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </span>
                                                <span className="text-[#365382] text-sm font-medium leading-none whitespace-nowrap">
                                                    Lab Chart
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex border-b-2 border-gray-300" />

                    {/* สถานีต่าง ๆ */}
                    <div className="w-full flex flex-col">
                        <div className="w-full flex flex-wrap mt-2 gap-2 whitespace-nowrap">
                            {['Package Blood', 'Audiogram', 'Urine', 'Spiro', 'Titmus', 'Dental', 'OBG', 'PE', 'XRay', 'EKG'].map((label) => (
                                <div key={label} className="flex mr-2 items-center">
                                    <label className={`mr-1 ${hasStation(label) ? 'text-[#017605]' : ''}`}>{label}:</label>
                                    {hasStation(label) ? (
                                        <img width={18} height={15} src="/icon/correct_arrow.svg" />
                                    ) : (
                                        <img width={24} height={24} src="/icon/clock_black.svg" />
                                    )}
                                </div>
                            ))}

                            <div className="flex mr-2 items-center">
                                <label className="mr-1 text-[#017605]">Location:</label>
                                <label className="mr-1 text-[#017605]">Mobile Checkup</label>
                            </div>
                        </div>

                        {/* วันที่ */}
                        <div className="w-full flex flex-wrap mt-2 gap-2 whitespace-nowrap">
                            <div className="flex mr-2 items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 2v4M18 2v4M3 8h18v13H3z" stroke="#017605" /></svg>
                                <div className="flex">
                                    <label className="mr-1 text-[#017605]">Checkup Date:</label>
                                    <label className="mr-1 text-[#017605]">
                                        {data?.CheckupDate ? dayjs(data.CheckupDate).add(543, 'year').format('DD/MM/YYYY HH:mm') : '-'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carddetail;
