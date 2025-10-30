'use client'
import { getPatientReportA5, getPatientReportById } from '@/action/api';
import Baselayout from '@/components/Baselayout/Baselayout';
import { ModalReportEdit } from '@/components/Reporten/modalEdit';
import ReporComponentsA4 from '@/components/Reporten/reportA4';
import ReporComponentsA5 from '@/components/Reporten/reportA5';
import Loading from '@/components/Tool/Loading';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print'

export default function page() {
    const [search, setSearch] = useState({ search: '' })
    const router = useRouter()
     const searchParams = useSearchParams()
     const UID = searchParams.get('UID')
     const paper = searchParams.get('paper')
     const trPatientUID_year1 = searchParams.get('trPatientUID_year1')
     const trPatientUID_year2 = searchParams.get('trPatientUID_year2')
    const [wait, setWait] = useState(null)
    const [form, setForm] = useState(null)
    const [modalEdit, setModalEdit] = useState(null)

    const toPrintRef = useRef()

    useEffect(() => {
        if (UID) {
            refresh()
        }
    }, [UID])

    const refresh = async () => {
        setWait(true)

        if (paper === 'A4') {
            const res = await getPatientReportById(UID)
            if (res?.message === 'success') {
                setForm(res?.data || null)
            } else {
                console.log('error', res?.error)
            }
        } else if (paper === 'A5') {
            const res = await getPatientReportA5({
                trPatientUID: UID,
                trPatientUID_year1: trPatientUID_year1 || '0',
                trPatientUID_year2: trPatientUID_year2 || '0'
            })
            setForm({ data: res?.data || null, comparLab: res?.comparLab || null })
        }

        setWait(false)
    }
    const onChange = (update) => { setSearch({ ...search, ...update }) }

    const reactToPrintContent = useCallback(() => {
        return toPrintRef.current
    }, [toPrintRef.current])

    const reactToPrintTrigger = useCallback(() => {
        return (
            <button className='  min-w-[118px] px-4 rounded-lg  shadow-button bg-[#365382] text-[#FFFFFF] hover:bg-[#1f304a] hover:text-[#FFFFFF]' >
                <div className='flex gap-4 justify-center items-center p-2'>
                    <img className=' cursor-pointer' width={33} height={32} src="/icon/print_white.svg" />
                    <span>Print</span>
                </div>
            </button>
        )
    }, [])

    const onModalEdit = () => {
        if (paper === 'A4') {
            setModalEdit(form)
        } else if (paper === 'A5') {
            setModalEdit({ ...form?.data, ...{ trLabs: form?.comparLab } })
        }
    }

    return (
        <Baselayout>
            <div className='w-full h-full bg-[#FFFFFF] px-4 py-2' >
                <Loading wait={wait} />
                <div className='flex justify-between items-start my-2'>
                    <label className='font-semibold text-[#2F2F2F] text-3xl '>Report ({paper})</label>
                    <div className='gap-4 flex justify-end'>
                        <button onClick={() => onModalEdit()} className='  min-w-[118px] px-4 rounded-lg  shadow-button bg-[#365382] text-[#FFFFFF] hover:bg-[#1f304a] hover:text-[#FFFFFF]' >
                            <div className='flex gap-4 justify-center items-center p-2'>
                                <img width={33} height={33} src="/icon/edit.svg" />
                                <span>Edit</span>
                            </div>
                        </button>
                        <ReactToPrint
                            content={reactToPrintContent}
                            documentTitle={`H-Series Report ${paper} ${dayjs().add(543, 'year').format('DD-MM-YYYY HH:mm:ss')}`}
                            trigger={reactToPrintTrigger}
                        />
                    </div>

                </div>
                <div className='flex justify-center items-start '>
                    {form && <div className='h-[80vh] overflow-auto px-8 py-8   border border-black bg-gray-600'>
                        {paper === 'A4' && <ReporComponentsA4 ref={toPrintRef} data={form} refresh={() => refresh()} />}
                        {paper === 'A5' && <ReporComponentsA5 ref={toPrintRef} data={form} refresh={() => refresh()} />}
                    </div>}
                </div>
                {<ModalReportEdit data={modalEdit} onClose={() => setModalEdit(null)} refresh={() => refresh()} setWait={setWait} />}
            </div >

        </Baselayout>
    )
}
