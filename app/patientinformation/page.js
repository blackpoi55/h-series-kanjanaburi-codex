'use client'
import Baselayout from '@/components/Baselayout/Baselayout'
import CardInformation from '@/components/Carddetail/CardInformation'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PatientInformation from '@/components/PatientInformation/PatientInformation'
import EpisodeNumber from '@/components/PatientInformation/EpisodeNumber'
import { GetPatientInfomation, searchCategory } from '@/action/api'
import VitalSign from '@/components/PatientInformation/VitalSign'
import XRay from '@/components/PatientInformation/XRay'
import Titmus from '@/components/PatientInformation/Titmus'
import Audiogram from '@/components/PatientInformation/Audiogram'
import Heartwaveexamination from '@/components/PatientInformation/Heartwaveexamination'
import Patientlab from '@/components/PatientInformation/Patientlab'
import FixedBottomMenu from '@/components/PatientInformation/FixedBottomMenu'
import FlexibilityMuscularStrength from '@/components/PatientInformation/FlexibilityMuscularStrength'
import PapSmear from '@/components/PatientInformation/PapSmear'
import Spirometry from '@/components/PatientInformation/Spirometry'
import Dental from '@/components/PatientInformation/Dental'
import VisionTestResults from '@/components/PatientInformation/VisionTestResults'
import Loading from '@/components/Tool/Loading'
import { LoadingProvider, useLoading } from '@/components/Tool/LoadingContext '


export default function page() {
  const router = useRouter()
   const searchParams = useSearchParams()
   const UID = searchParams.get('UID')
  const [formPatientInformation, setFormPatientInformation] = useState({})
  const [wait, setWait] = useState(null)
  const [activeTap, setActiveTap] = useState(
    {
      episode_number: true,
      patient_information: true,
      vital_sign: true,
      x_ray: true,
      titmus: true,
      audiogram: true,
      ekg: true,
      lab: true,
      flexibility_muscular_strength: true,
      pap_smear: true,
      spirometry: true,
      dental: true,
      vision_test_results: true,
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
      setFormPatientInformation(res?.data || null)
      if (res?.data === null) {
        onActiveTap('episode_number', false)
        onActiveTap('patient_information', false)
      }
    } else {
      console.log('error', res?.error)
      onActiveTap('episode_number', false)
      onActiveTap('patient_information', false)
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
        <div id='top' className='w-full h-full flex flex-col bg-[#FFFFFF] p-4 md:px-10 md:pb-10 lg:px-20  lg:pb-20  ' >
          <Loading wait={wait} />
          <div onClick={() => router.push('/patientinfo')} className='flex gap-4 mb-4 cursor-pointer'>
            <img className=' cursor-pointer' width={8} height={24} src="/icon/arrow_left.svg" />
            <label className='text-[#365382] font-medium text-xl  cursor-pointer' htmlFor="">ย้อนกลับ</label>
          </div>
          <div className='flex justify-start mb-4'>
            <label className='font-semibold text-[#2F2F2F] text-3xl ' htmlFor="">Patient Information</label>
          </div>
          <CardInformation data={formPatientInformation} />
          <EpisodeNumber activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} formPatientInformation={formPatientInformation} />
          <PatientInformation UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} formPatientInformation={formPatientInformation} setFormPatientInformation={(v) => setFormPatientInformation(v)} refresh={() => refresh()} />
          <VitalSign UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <XRay UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <Titmus UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <Audiogram UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <Heartwaveexamination UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <Patientlab UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <FlexibilityMuscularStrength data={formPatientInformation} UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          {formPatientInformation?.Sex != 'ชาย' && <PapSmear UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />}
          <Spirometry UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <Dental UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <VisionTestResults UID={UID} activeTap={activeTap} onActiveTap={(v, on_off) => onActiveTap(v, on_off)} />
          <FixedBottomMenu data={formPatientInformation} scrollToSection={(v) => scrollToSection(v)} UID={UID} />
        </div >
      </LoadingProvider>
    </Baselayout>
  )
}
