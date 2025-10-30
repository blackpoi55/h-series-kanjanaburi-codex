'use client'
import { Collapse, InputAdornment, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { MetaInitialAll } from '../Tool/var'
import Patientlab from '../PatientInformation/Patientlab'
import XRay from '../PatientInformation/XRay'
import Heartwaveexamination from '../PatientInformation/Heartwaveexamination'
import Titmus from '../PatientInformation/Titmus'
import Audiogram from '../PatientInformation/Audiogram'
import { InputSwitch } from '../Tool/input'
import Spirometry from '../PatientInformation/Spirometry'
import FlexibilityMuscularStrength from '../PatientInformation/FlexibilityMuscularStrength'

function LabAndXray({ activeTap, onActiveTap, UID }) {
  const [switchStaus, setSwitchStaus] = useState(null)
  const [tap, setTap] = useState('lab')

  useEffect(() => {
    setSwitchStaus(activeTap?.lab_and_xray)
  }, [activeTap?.lab_and_xray])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('lab_and_xray', update.target.checked)
  }

  const handleChange = (name, e) => {
    values[name] = e.target.value
    setValues({ ...values })
  }
  return (
    <div className='w-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4'>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='lab_and_xray' className='font-semibold text-[#365382]'>Lab & X-ray</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className=' w-full  grid grid-cols-12 gap-4   p-4'>
          <div className='col-span-12 flex flex-wrap justify-start gap-2 items-center'>
            <button onClick={() => setTap('lab')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'lab' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>Lab</button>
            <button onClick={() => setTap('x-ray')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'x-ray' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >X-Ray</button>
            <button onClick={() => setTap('ekg')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'ekg' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`}>EKG</button>
            <button onClick={() => setTap('titmus')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'titmus' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Titmus</button>
            <button onClick={() => setTap('audiogram')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'audiogram' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Audiogram</button>
            <button onClick={() => setTap('spiro')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'spiro' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Spiro</button>
            <button onClick={() => setTap('flexibility&muscularstrength')} className={` border max-h-10 min-h-10 min-w-[150px] px-4 rounded-lg border-[#365382] ${tap === 'flexibility&muscularstrength' ? 'bg-[#365382] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#365382]'}   hover:bg-[#365382] hover:text-[#FFFFFF]`} >Flexibility & Muscular Strength</button>
          </div>
        </div>

        {tap === 'lab' && <Patientlab module={'docter-result'} UID={UID} activeTap={activeTap} />}
        {tap === 'x-ray' && <XRay module={'docter-result'} UID={UID} activeTap={activeTap} />}
        {tap === 'ekg' && <Heartwaveexamination module={'docter-result'} UID={UID} activeTap={activeTap} />}
        {tap === 'titmus' && <Titmus module={'docter-result'} UID={UID} activeTap={activeTap} />}
        {tap === 'audiogram' && <Audiogram module={'docter-result'} UID={UID} activeTap={activeTap} />}
        {tap === 'spiro' && <Spirometry module={'docter-result'} UID={UID} activeTap={activeTap} />}
        {tap === 'flexibility&muscularstrength' && <FlexibilityMuscularStrength module={'docter-result'} UID={UID} activeTap={activeTap} />}
      </Collapse>
    </div>
  )
}

export default LabAndXray