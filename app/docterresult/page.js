'use client'
import Baselayout from '@/components/Baselayout/Baselayout'
//import CardInformation from '@/components/Carddetail/CardInformation'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Loading from '@/components/Tool/Loading'
import CardDocterResult from '@/components/Carddetail/CardDocterResult'
import EpisodeNumberDocterResult from '@/components/Docterresult/EpisodeNumberDocterResult'
import VitalSignDocterresult from '@/components/Docterresult/VitalSignDocterresult'
import EditdataDocterresult from '@/components/Docterresult/EditdataDocterresult'
import PhysicalExamination from '@/components/Docterresult/PhysicalExamination'
import LabAndXray from '@/components/Docterresult/LabAndXray'
import Conclusion from '@/components/Docterresult/Conclusion'
import FixedBottomMenuDocter from '@/components/Docterresult/FixedBottomMenuDocter'
import { LoadingProvider } from '@/components/Tool/LoadingContext '
import { GetPatientInfomation } from '@/action/api'

export default function page() {
  const router = useRouter()
   const searchParams = useSearchParams()
   const UID = searchParams.get('UID')
  const [formDocterResult, setFormDocterResult] = useState({})
  const [wait, setWait] = useState(null)
  const [activeTap, setActiveTap] = useState(
    {
      episode_number: true,
      vital_sign: true,
      patient_history: true,
      edit_data: true,
      physical_examination: true,
      lab_and_xray: true,
      conclusion: true,
    }
  )
  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  const refresh = async () => {
    setWait(true)
    const res = await GetPatientInfomation(UID)
    if (res?.message === 'success') {
      setFormDocterResult(res?.data || null)
      if (res?.data === null) {
        onActiveTap('episode_number', false)
        onActiveTap('edit_data', false)

      }
    } else {
      console.log('error', res?.error)
      onActiveTap('episode_number', false)
    }
    setWait(false)
  }

  const scrollToSection = (v) => {
    document.getElementById(v).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    onActiveTap(v, true)
  }

  const onActiveTap = useCallback((v, on_off) => {
    setActiveTap((prevTap) => {
      const updatedTap = { ...prevTap, [v]: on_off }
      return updatedTap
    })
  }, [])
  return (
    <Baselayout>
      <LoadingProvider>
        <div id='top' className='w-full h-full bg-[#FFFFFF] p-4 md:px-10 md:pb-10 lg:px-20  lg:pb-20  ' >
          <Loading wait={wait} />
          <div onClick={() => router.push('/patientinfo')} className='flex gap-4 mb-4 cursor-pointer'>
            <img className=' cursor-pointer' width={8} height={24} src="/icon/arrow_left.svg" />
            <label className='text-[#365382] font-medium text-xl  cursor-pointer' htmlFor="">ย้อนกลับ</label>
          </div>
          <div className='flex justify-start mb-4'>
            <label className='font-semibold text-[#2F2F2F] text-3xl ' htmlFor="">Docter Result</label>
          </div>
          <CardDocterResult data={formDocterResult} />
          <EpisodeNumberDocterResult activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} formDocterResult={formDocterResult} />
          <VitalSignDocterresult UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          {formDocterResult?.UID && <EditdataDocterresult data={formDocterResult} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />}
          <PhysicalExamination UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <LabAndXray UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <Conclusion UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <FixedBottomMenuDocter UID={UID} scrollToSection={(v) => scrollToSection(v)} />
        </div >
      </LoadingProvider>

    </Baselayout >
  )
}
