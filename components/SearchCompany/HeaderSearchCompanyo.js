'use client'
import React from 'react';
import { TextField } from '@mui/material';
import Tooldatepick from '../Tool/Tooldatepick';
import Toolselect2 from '../Tool/Toolselect2';
import { InputSearch } from '../Tool/input';

function HeaderSearchCompanyo({ onSearch, value }) {

  const options = [
    { label: 'Ten', value: 10 },
    { label: 'Twenty', value: 20 },
    { label: 'Thirty', value: 309 }
  ];

  return (
    <div className='w-full grid lg:grid-cols-12 grid-cols-6  rounded-2xl bg-[#F8F8F8] p-5 mt-4 items-center gap-2 '>
      <InputSearch
        sm
        className=' col-span-3 '
        value={value?.search || ''}
        onChange={(e) => onSearch({ search: e?.target?.value })}
        label="เพิ่มเลข HN"
      />
      <div className='relative flex col-span-3 '>
        <Toolselect2 sm options={options} label={"ค้นหาจากสินค้า/โปรโมชั่น"} value={value?.department || null} onChange={(department) => handleChange({ department })} ></Toolselect2>
      </div>
      <div className='col-span-3 gap-2 flex '>
        <div className='relative flex w-full '>
          <Tooldatepick sm label={"จากวันที่"} value={value?.datefrom || null} onChange={(datefrom) => onSearch({ datefrom })}   ></Tooldatepick>
        </div>
        <div className='relative flex w-full '>
          <Tooldatepick sm label={"ถึงวันที่"} value={value?.dateto || null} onChange={(dateto) => onSearch({ dateto })}  ></Tooldatepick>
        </div>
      </div>
      <div className=' col-span-3 gap-2 flex '>
        <button className='w-full  max-h-10 min-h-10  px-4 rounded-lg  shadow-box bg-[#365382] text-[#FFFFFF] hover:bg-[#263b5c] hover:text-[#FFFFFF] ' >
          <div className='flex gap-4 justify-center items-center'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.0002 21L16.6572 16.657M16.6572 16.657C17.4001 15.9141 17.9894 15.0322 18.3914 14.0615C18.7935 13.0909 19.0004 12.0506 19.0004 11C19.0004 9.94939 18.7935 8.90908 18.3914 7.93845C17.9894 6.96782 17.4001 6.08588 16.6572 5.34299C15.9143 4.6001 15.0324 4.01081 14.0618 3.60877C13.0911 3.20672 12.0508 2.99979 11.0002 2.99979C9.9496 2.99979 8.90929 3.20672 7.93866 3.60877C6.96803 4.01081 6.08609 4.6001 5.34321 5.34299C3.84288 6.84332 3 8.87821 3 11C3 13.1218 3.84288 15.1567 5.34321 16.657C6.84354 18.1573 8.87842 19.0002 11.0002 19.0002C13.122 19.0002 15.1569 18.1573 16.6572 16.657Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <label className='text-white'>Search</label>
          </div>
        </button>
        <button className=' w-full   max-h-10 min-h-10  px-4 rounded-lg  shadow-box bg-[#365382] text-[#FFFFFF] hover:bg-[#263b5c] hover:text-[#FFFFFF]' >
          <div className='flex gap-4 justify-center items-center'>
            <img className=' cursor-pointer' width={24} height={24} src="/icon/plus.svg" />
            <label className='text-white'>AddPayor</label>
          </div>
        </button>
      </div>

    </div>
  );
}

export default HeaderSearchCompanyo;
