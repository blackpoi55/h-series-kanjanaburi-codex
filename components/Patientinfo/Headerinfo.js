'use client'
import React from 'react';
import { TextField } from '@mui/material';
import Tooldatepick from '../Tool/Tooldatepick';
import Toolselect2 from '../Tool/Toolselect2';

function Headerinfo({ setPatientList, setModelRegister, setvalues, values, setnodate ,setisModal }) {

  const options = [
    { label: 'Check Up', value: 'Check Up' },
    { label: 'Mobile', value: 'Mobile' },
  ];

  const handleChange = (update) => {
    if (update?.search) {
      setnodate(true)
    }
    else {
      setnodate(false)
    }
    update.page = 1
    setvalues({ ...values, ...update })
  }

  return (
    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] p-5 mt-4'>
      <div className='flex gap-4'>
        <TextField
          className='text-white w-full bg-white'
          id="outlined-basic"
          value={values.search}
          onChange={(e) => handleChange({ search: e?.target?.value })}
          label="ค้นหาผู้ป่วย"
          variant="outlined"
        />
        <button onClick={() => {setModelRegister(0) ; setisModal(true)}} className='  min-w-[118px] px-4 rounded-lg  shadow-button bg-[#365382] text-[#FFFFFF] hover:bg-[#1f304a] hover:text-[#FFFFFF]' >
          <div className='flex gap-4 justify-center items-center p-2'>
            <img className=' cursor-pointer' width={24} height={24} src="/icon/register.svg" />
            <span className='whitespace-nowrap'>ลงทะเบียน</span>
          </div>
        </button>
      </div>

      <div className=' w-full mt-4 gap-4 flex flex-col md:flex-row'>
        <div className='relative flex w-full '>
          <Tooldatepick label={"วันที่"} value={values?.datefrom || null} onChange={(datefrom) => handleChange({ datefrom })}   ></Tooldatepick>
        </div>
        <div className='relative flex w-full '>
          <Tooldatepick label={"ถึงวันที่"} value={values?.dateto || null} onChange={(dateto) => handleChange({ dateto })}  ></Tooldatepick>

        </div>
        <div className='relative flex w-full'>
          <Toolselect2 options={options} label={"Location"} value={values?.department || null} onChange={(department) => handleChange({ department })} ></Toolselect2>
        </div>
      </div>
    </div>
  );
}

export default Headerinfo;
