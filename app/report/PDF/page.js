'use client'
// import { LayoutList } from '@/components/Layout'
import { Autocomplete, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';


const Index = () => {
    const [search, setSearch] = useState({ search: '' })
    const router = useRouter()


    const onChange = (update) => { setSearch({ ...search, ...update }) }


    return (
        <div className='w-full h-full'>
            <div className='flex justify-between'>
                <div className="lg:flex-col justify-center">
                    <p className='text-[#0074BC] b text-[20px]'>H-Series Booking</p>
                    <p className='text-black b text-[16px] '>Management</p>
                </div>
            </div>
            <div className="w-full flex mt-4 justify-center items-center gap-2">
                <TextField value={search?.search} boxclassName={'w-[30%]'} placeholder='กรุณากรอกเลข HN'
                    onchange={(search) => onChange({ search })} />
                {/* ?search=${search?.search} */}
                <Button onClick={() => router.push(`/report/PDF/report2?search=${search?.search}`)} width={'w-[10%]'}>ค้นหา</Button>
            </div>
        </div>
    )
}

export default Index