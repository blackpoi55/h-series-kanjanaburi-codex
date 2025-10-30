'use client'

import React from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import Tooldatepick from '../Tool/Tooldatepick'
import ReactExport from "react-data-export";

function HeaderinfoManagement({ setvalues, values, meta, excelexport }) {

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const handleChange = (update) => {
    console.log('update', update)
    setvalues({ ...values, ...update })
  }


  return (
    <div className=' w-full mt-4 gap-4 flex flex-col md:flex-row'>
      <div className='relative flex w-full'>
        <Toolselect2 sm options={meta.Company || []} label={"ชื่อบริษัท"} value={values?.companyCode || ''}
          onChange={(companyCode) => handleChange({ companyCode })} />
      </div>
      <div className='relative flex w-full'>
        <Tooldatepick sm label={"วันที่"} value={values?.datastart || ''}
          onChange={(datastart) => handleChange({ datastart })} />
      </div>
      <div className='relative flex w-full'>
        <Tooldatepick sm label={"ถึงวันที่"} value={values?.datastop || ''}
          onChange={(datastop) => handleChange({ datastop })} />
      </div>
      {/* <div className='relative flex w-full'>
        <Toolselect2 sm options={[]} label={""} value={''}
          onChange={() => handleChange({})} />
      </div> */}
      <div className='relative flex w-full'>
        <button className='w-full max-h-10 min-h-10  px-4 rounded-lg  shadow-box bg-[#365382] text-[#FFFFFF] hover:bg-[#263b5c] hover:text-[#FFFFFF] ' >
          <div className='flex gap-4 justify-center items-center'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.0002 21L16.6572 16.657M16.6572 16.657C17.4001 15.9141 17.9894 15.0322 18.3914 14.0615C18.7935 13.0909 19.0004 12.0506 19.0004 11C19.0004 9.94939 18.7935 8.90908 18.3914 7.93845C17.9894 6.96782 17.4001 6.08588 16.6572 5.34299C15.9143 4.6001 15.0324 4.01081 14.0618 3.60877C13.0911 3.20672 12.0508 2.99979 11.0002 2.99979C9.9496 2.99979 8.90929 3.20672 7.93866 3.60877C6.96803 4.01081 6.08609 4.6001 5.34321 5.34299C3.84288 6.84332 3 8.87821 3 11C3 13.1218 3.84288 15.1567 5.34321 16.657C6.84354 18.1573 8.87842 19.0002 11.0002 19.0002C13.122 19.0002 15.1569 18.1573 16.6572 16.657Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <label className='text-white'>Search</label>
          </div>
        </button>
      </div>
      <div className='relative flex w-full'>
        <div className='w-32 bg-green-800 text-white rounded-xl b p-1 mr-1'>
          <ExcelFile element={<button className='bg-green-800 flex text-center text-white rounded-xl b p-1 mr-0'>
            <span className='mr-1'>
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1111 14.2857C13.6556 14.2857 13.2778 14.6743 13.2778 15.1429V16.8571C13.2778 17.6457 12.6556 18.2857 11.8889 18.2857H3.55556C2.78889 18.2857 2.16667 17.6457 2.16667 16.8571V3.14286C2.16667 2.35429 2.78889 1.71429 3.55556 1.71429H7.16667V7.14286C7.16667 7.61143 7.54444 8 8 8H13.2778V9.42857C13.2778 9.89714 13.6556 10.2857 14.1111 10.2857C14.5667 10.2857 14.9444 9.89714 14.9444 9.42857V7.14286C14.9444 6.91429 14.8556 6.69714 14.7 6.53714L8.58889 0.251429C8.43276 0.0906372 8.22094 0.000200059 8 0L3.55556 0C1.86667 0 0.5 1.40571 0.5 3.14286L0.5 16.8571C0.5 18.5943 1.86667 20 3.55556 20H11.8889C13.5778 20 14.9444 18.5943 14.9444 16.8571V15.1429C14.9444 14.6743 14.5667 14.2857 14.1111 14.2857ZM8.83333 2.92571L12.1 6.28571H8.83333V2.92571ZM20.4333 12.6171C20.3889 12.72 20.3333 12.8114 20.2556 12.8914L16.9222 16.32C16.7556 16.4914 16.5444 16.5714 16.3333 16.5714C16.1222 16.5714 15.9111 16.4914 15.7444 16.32C15.5895 16.1587 15.5026 15.9411 15.5026 15.7143C15.5026 15.4875 15.5895 15.2699 15.7444 15.1086L17.6556 13.1429H8C7.54444 13.1429 7.16667 12.7543 7.16667 12.2857C7.16667 11.8171 7.54444 11.4286 8 11.4286H17.6556L15.7444 9.46286C15.4222 9.13143 15.4222 8.58286 15.7444 8.25143C16.0667 7.92 16.6 7.92 16.9222 8.25143L20.2556 11.68C20.3333 11.76 20.3889 11.8514 20.4333 11.9543C20.5222 12.16 20.5222 12.4 20.4333 12.6057V12.6171Z" fill="white" />
              </svg>
            </span>
            Export Excel
          </button>}>
            <ExcelSheet dataSet={excelexport} name='Report' />
          </ExcelFile>
        </div>
      </div>
    </div>
  )
}

export default HeaderinfoManagement