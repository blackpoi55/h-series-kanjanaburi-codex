'use client'
import React from 'react';
import { TextField } from '@mui/material';
import Tooldatepick from '../Tool/Tooldatepick';
import Toolselect2 from '../Tool/Toolselect2';

function HeaderPrintReport(props) {
  const { options, setvalues, values, refresh ,setstatuschangesearch,setcompanyName } = props

  // const options = [
  //   { label: 'Ten', value: 10 },
  //   { label: 'Twenty', value: 20 },
  //   { label: 'Thirty', value: 309 }
  // ];

  const handleChange = (update) => {
    
    console.log('update', update)
    setvalues({ ...values, ...update })
    setstatuschangesearch(true)
  }

  return (
    <div className=' w-full mt-4 gap-4 flex flex-col md:flex-row'>
      <div className='relative flex w-full'>
        <Toolselect2 sm options={options || []} label={"Company"} value={values?.companyCode || null} onChange={(companyCode) => handleChange({ companyCode })} ></Toolselect2>
      </div>
      <div className='relative flex w-full '>
        <Tooldatepick sm label={"วันที่"} value={values?.datastart || null} onChange={(datastart) => handleChange({ datastart })}   ></Tooldatepick>
      </div>
      <div className='relative flex w-full '>
        <Tooldatepick sm label={"ถึงวันที่"} value={values?.datastop || null} onChange={(datastop) => handleChange({ datastop })}  ></Tooldatepick>
      </div>
      <button className="border rounded-lg bg-[#365382] text-white p-2 relative flex w-full text-center justify-center" onClick={() => refresh()} >
        ดึงข้อมูล
      </button>
    </div>
  );
}

export default HeaderPrintReport;
 