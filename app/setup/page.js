'use client'
//import { getCompany } from '@/action/api'
import Baselayout from '@/components/Baselayout/Baselayout'
import { ModalSetupCompany, ModalSetupDoctor, ModalSetupLabCode, ModalSetupMapStation, ModalSetupStation, ModalSetupTranslate, ModalSetupTranslateResult, ModalSetupTransletLabCode, ModalSetupUser, ModalSetupXRayCode } from '@/components/Setup/modalSetup'
import { TableSetupCompany, TableSetupDoctor, TableSetupLabCode, TableSetupMapStation, TableSetupMapXRayCode, TableSetupStation, TableSetupTranslate, TableSetupTranslateResult, TableSetupUser } from '@/components/Setup/tableSetup'
import { InputSearch } from '@/components/Tool/input'
import Loading from '@/components/Tool/Loading'
import { LoadingProvider } from '@/components/Tool/LoadingContext '
import Toolselect2 from '@/components/Tool/Toolselect2'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactExport from "react-data-export";

function page() {
  const [wait, setWait] = useState(null)
  const [tap, setTap] = useState('User')
  const router = useRouter()
  const [addmodal, setAddModal] = useState(null)
  const [transletmodal, setTransletModal] = useState(null)
  const [excelexportCompany, setExcelExportCompany] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [searchText, setSearchText] = useState('');

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const onRefresh = () => {
    setRefresh(!refresh)
  }

  const handleChange = (e) => {
    console.log(e)
    setSearchText(e.e.target.value);
  }
  

  const onEdit = (e) => {
    setAddModal(e)
  }

  const onTranslet = (e) => {
    setTransletModal(e)
  }
  return (
    <Baselayout>
      <LoadingProvider>
        <div className='w-full h-full bg-[#FFFFFF] p-4 px-20  pb-20  ' >
          <Loading wait={wait} />
          <div onClick={() => router.back()} className='flex gap-4 mb-4 cursor-pointer'>
            <img className=' cursor-pointer' width={8} height={24} src="/icon/arrow_left.svg" />
            <label className='text-[#365382] font-medium text-xl  cursor-pointer' htmlFor="">ย้อนกลับ</label>
          </div>

          <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
            <label className='text-xl font-semibold text-[#365382]'>Setup</label>
            <div className=' w-full col-span-12 grid grid-cols-12 gap-4 p-4'>
              <div className='col-span-12 flex flex-wrap justify-start gap-2 items-center'>
                <button onClick={() => setTap('User')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'User' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>User</button>
                <button onClick={() => setTap('Company')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'Company' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Company</button>
                <button onClick={() => setTap('Station')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'Station' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>Station</button>
                <button onClick={() => setTap('Map Station')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'Map Station' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Map Station</button>
                <button onClick={() => setTap('X-Ray Code')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'X-Ray Code' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >X-Ray Code</button>
                <button onClick={() => setTap('Lab Code')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'Lab Code' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Lab Code</button>
                <button onClick={() => setTap('Translate')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'Translate' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Translate</button>
                <button onClick={() => setTap('Doctor')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'Doctor' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Doctor</button>
                <button onClick={() => setTap('Translate Result')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'Translate Result' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Translate Result</button>
              </div>

              <div className='col-span-12 grid grid-cols-12 gap-4 bg-[#FFFFFF] shadow-box rounded-lg p-4'>
                <div className='flex gap-4 col-span-12 '>
                  <div className='flex justify-start items-center '>
                    <label className='text-lg font-semibold text-[#232323] whitespace-nowrap'>{tap}</label>
                  </div>
                  <div className='flex justify-end gap-4 w-full'>
                    {(tap === 'Station' || tap === 'Map Station' || tap === 'X-Ray Code') &&
                      <div className='flex w-full  max-w-[375px]'>
                        <Toolselect2 sm options={[]} value={''} onChange={''}></Toolselect2>
                      </div>
                    }
                    {tap === 'User' &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className='cursor-pointer'>ADD</label>
                        </div>
                      </button>
                    }

                    {tap === 'Map Station' &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className='cursor-pointer'>ADD</label>
                        </div>
                      </button>
                    }

                    {tap === 'Station' &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className='cursor-pointer'>ADD</label>
                        </div>
                      </button>
                    }

                    {tap === 'X-Ray Code' &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className='cursor-pointer'>ADD</label>
                        </div>
                      </button>
                    }

                    {tap === 'Company' &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className='cursor-pointer'>ADD</label>
                        </div>
                      </button>
                    }

                    {tap === 'Doctor' &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className='cursor-pointer'>ADD</label>
                        </div>
                      </button>
                    }

                    {tap === 'Lab Code' &&
                      <div className='flex w-full  max-w-[375px]'>
                        <InputSearch sm value={searchText} onChange={(e) => handleChange({ e })}></InputSearch>
                      </div>
                    }

                    {tap === 'Translate' &&
                      <div className='flex w-full  max-w-[375px]'>
                        <InputSearch sm value={searchText} onChange={(e) => handleChange({ e })}></InputSearch>
                      </div>
                    }
                    {tap === 'Translate Result' &&
                      <div className='flex w-full  max-w-[375px]'>
                        <InputSearch sm value={searchText} onChange={(e) => handleChange({ e })}></InputSearch>
                      </div>
                    }
                    {(tap === 'Lab Code') &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className='cursor-pointer'>Lab Code</label>
                        </div>
                      </button>
                    }

                    {(tap === 'Translate') &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className=''>Translate</label>
                        </div>
                      </button>
                    }
                    {(tap === 'Translate Result') &&
                      <button onClick={() => setAddModal(1)} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                          </svg>
                          <label className=''>Translate Result</label>
                        </div>
                      </button>
                    }
                    {(tap === 'User' || tap === 'Company') &&
                      <button className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9958 5.41836V16C10.9958 16.5523 11.4436 17 11.9958 17C12.5481 17 12.9958 16.5523 12.9958 16V5.41006L15.7929 8.20711C16.1834 8.59763 16.8166 8.59763 17.2071 8.20711C17.5976 7.81658 17.5976 7.18342 17.2071 6.79289L12.7071 2.29289C12.5113 2.0971 12.2545 1.99947 11.9979 2C11.9972 2 11.9965 2 11.9958 2C11.6921 2 11.4199 2.13546 11.2365 2.34927L6.79289 6.79289C6.40237 7.18342 6.40237 7.81658 6.79289 8.20711C7.18342 8.59763 7.81658 8.59763 8.20711 8.20711L10.9958 5.41836ZM21 11C21.5523 11 22 11.4477 22 12V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V12.0042C2 11.4519 2.44772 11.0042 3 11.0042C3.55228 11.0042 4 11.4519 4 12.0042V20H20V12C20 11.4477 20.4477 11 21 11Z" fill="white" />
                          </svg>
                          <label>Load Data</label>
                        </div>
                      </button>
                    }
                    {(tap === 'Company') &&
                      <div className='w-32 bg-green-800 text-white rounded-xl b p-1 mr-1'>
                        <ExcelFile element={<button className='bg-green-800 flex text-center text-white rounded-xl b p-1 mr-0'>
                          <span className='mr-1'>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.1111 14.2857C13.6556 14.2857 13.2778 14.6743 13.2778 15.1429V16.8571C13.2778 17.6457 12.6556 18.2857 11.8889 18.2857H3.55556C2.78889 18.2857 2.16667 17.6457 2.16667 16.8571V3.14286C2.16667 2.35429 2.78889 1.71429 3.55556 1.71429H7.16667V7.14286C7.16667 7.61143 7.54444 8 8 8H13.2778V9.42857C13.2778 9.89714 13.6556 10.2857 14.1111 10.2857C14.5667 10.2857 14.9444 9.89714 14.9444 9.42857V7.14286C14.9444 6.91429 14.8556 6.69714 14.7 6.53714L8.58889 0.251429C8.43276 0.0906372 8.22094 0.000200059 8 0L3.55556 0C1.86667 0 0.5 1.40571 0.5 3.14286L0.5 16.8571C0.5 18.5943 1.86667 20 3.55556 20H11.8889C13.5778 20 14.9444 18.5943 14.9444 16.8571V15.1429C14.9444 14.6743 14.5667 14.2857 14.1111 14.2857ZM8.83333 2.92571L12.1 6.28571H8.83333V2.92571ZM20.4333 12.6171C20.3889 12.72 20.3333 12.8114 20.2556 12.8914L16.9222 16.32C16.7556 16.4914 16.5444 16.5714 16.3333 16.5714C16.1222 16.5714 15.9111 16.4914 15.7444 16.32C15.5895 16.1587 15.5026 15.9411 15.5026 15.7143C15.5026 15.4875 15.5895 15.2699 15.7444 15.1086L17.6556 13.1429H8C7.54444 13.1429 7.16667 12.7543 7.16667 12.2857C7.16667 11.8171 7.54444 11.4286 8 11.4286H17.6556L15.7444 9.46286C15.4222 9.13143 15.4222 8.58286 15.7444 8.25143C16.0667 7.92 16.6 7.92 16.9222 8.25143L20.2556 11.68C20.3333 11.76 20.3889 11.8514 20.4333 11.9543C20.5222 12.16 20.5222 12.4 20.4333 12.6057V12.6171Z" fill="white" />
                            </svg>
                          </span>
                          Export Excel
                        </button>}>
                          <ExcelSheet dataSet={excelexportCompany} name='Report' />
                        </ExcelFile>
                      </div>
                    }
                  </div>
                </div>
                {tap === 'User' && <TableSetupUser refresh={refresh} searchText={searchText} onEdit={(e) => onEdit(e)} />}
                {tap === 'Company' && <TableSetupCompany onEdit={(e) => onEdit(e)} setExcelExportCompany={setExcelExportCompany} refresh={refresh} searchText={searchText} />}
                {tap === 'Station' && <TableSetupStation refresh={refresh} searchText={searchText} onEdit={(e) => onEdit(e)} />}
                {tap === 'Map Station' && <TableSetupMapStation />}
                {tap === 'X-Ray Code' && <TableSetupMapXRayCode refresh={refresh} searchText={searchText} onEdit={(e) => onEdit(e)} />}
                {tap === 'Lab Code' && <TableSetupLabCode refresh={refresh} searchText={searchText} onEdit={(e) => onEdit(e)} onTranslet={(e) => onTranslet(e)} />}
                {tap === 'Translate' && <TableSetupTranslate refresh={refresh} searchText={searchText} onEdit={(e) => onEdit(e)} />}
                {tap === 'Translate Result' && <TableSetupTranslateResult refresh={refresh} searchText={searchText} onEdit={(e) => onEdit(e)} />}
                {tap === 'Doctor' && <TableSetupDoctor refresh={refresh} searchText={searchText} onEdit={(e) => onEdit(e)} />}
              </div>
            </div>
            {tap === 'User' && <ModalSetupUser data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
            {tap === 'Company' && <ModalSetupCompany data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
            {tap === 'Station' && <ModalSetupStation data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
            {tap == 'Map Station' && <ModalSetupMapStation data={addmodal} onClose={() => setAddModal(null)} />}
            {tap === 'X-Ray Code' && <ModalSetupXRayCode data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
            {tap === 'Lab Code' && <ModalSetupLabCode data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
            {tap === 'Lab Code' && <ModalSetupTransletLabCode data={transletmodal} onClose={() => setTransletModal(null)} onRefresh={() => onRefresh()} />}
            {tap === 'Translate' && <ModalSetupTranslate data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
            {tap === 'Translate Result' && <ModalSetupTranslateResult data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
            {tap === 'Doctor' && <ModalSetupDoctor data={addmodal} onClose={() => setAddModal(null)} onRefresh={() => onRefresh()} />}
          </div>
        </div >


      </LoadingProvider>
    </Baselayout>
  )
}

export default page