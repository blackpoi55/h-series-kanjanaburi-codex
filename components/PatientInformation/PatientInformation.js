'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Carddetail from '../Carddetail/Carddetail'
import Toolselect2 from '../Tool/Toolselect2'
import { Autocomplete, Collapse, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Tooldatepick from '../Tool/Tooldatepick'
import { MetaGenderThais, MetaInitialAll, MetaInitialEngs, MetaLocation, MetaMarital, MetaTypepatient, Typepatient } from '../Tool/var'
import { InputSwitch } from '../Tool/input'
import { ModalClearData, ModalSave } from '../Modal/ModalUnit'
import Swal from 'sweetalert2'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'
import { addPatient, getDoctor, updatePatient } from '@/action/api'
import { useLoading } from '../Tool/LoadingContext '

function PatientInformation({ formPatientInformation, setFormPatientInformation, activeTap, onActiveTap, refresh, UID }) {
  const { startLoading, stopLoading } = useLoading()
  const [pageTreatment, setPageTreatment] = useState(1)
  const [pageXRay, setPageXRay] = useState(1)
  const [pageLab, setPageLab] = useState(1)
  const [switchStaus, setSwitchStaus] = useState(null)
  const [form, setForm] = useState({})
  const [options, setOptions] = useState({})
  const [formedit, setFormEdit] = useState({})

  const [modalClearStatus, setModalClearStatus] = useState(null)


  useEffect(() => {
    if (formPatientInformation != null) {
      setForm(formPatientInformation)
      setFormEdit({
        Prename: formPatientInformation?.Prename || null,
        Forename: formPatientInformation?.Forename || null,
        Surname: formPatientInformation?.Surname || null,
        Mobile: formPatientInformation?.Mobile || null,
        Company: formPatientInformation?.Company || null,
        Address: formPatientInformation?.Address || null,
        Location: formPatientInformation?.Location || null,
        HispatientUID: formPatientInformation?.HispatientUID || null,
        HispatientvisitUID: formPatientInformation?.HispatientvisitUID || null,
        HisVisitCareProvider: formPatientInformation?.HisVisitCareProvider || null,
        HisVisitCareProviderEnglishName: formPatientInformation?.HisVisitCareProviderEnglishName || null,
        HisVisitCareProviderLicenseID: formPatientInformation?.HisVisitCareProviderLicenseID || null,
      })
    }
  }, [formPatientInformation])

  useEffect(() => {
    setSwitchStaus(activeTap?.patient_information)
  }, [activeTap?.patient_information])

  useEffect(() => {
    Loadoptions()
  }, [])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('patient_information', update.target.checked)
  }

  const { list_Treatment = [], list_XRay = [], list_Lab = [] } = useMemo(() => {
    let Treatment = []
    let XRay = []
    let Lab = []
    if (formPatientInformation?.trHNCHKUP_DETAILs?.length > 0) {
      for (const v of formPatientInformation?.trHNCHKUP_DETAILs) {
        if (v?.typechkup === "Lab") {
          Lab.push(v)
        } else if (v?.typechkup === "Xray") {
          XRay.push(v)
        } else if (v?.typechkup === "Treatment") {
          Treatment.push(v)
        }
      }
    }

    let pageTreatment = []
    let pageXRay = []
    let pageLab = []

    const addToPage = (list, output) => {
      let page = 1
      let counter = 0
      for (const e of list) {
        output.push({ ...e, page: page })
        counter++
        if (counter === 5) {
          page++
          counter = 0
        }
      }
    }

    addToPage(Treatment, pageTreatment)
    addToPage(XRay, pageXRay)
    addToPage(Lab, pageLab)

    return { list_Treatment: pageTreatment, list_XRay: pageXRay, list_Lab: pageLab }
  }, [formPatientInformation?.trHNCHKUP_DETAILs])

  const onBack = (key) => {
    if (key === 'Treatment') {
      if (pageTreatment != 1) {
        setPageTreatment(pageTreatment - 1)
      } else {
        setPageTreatment(1)
      }
    } else if (key === 'XRay') {
      if (pageXRay != 1) {
        setPageXRay(pageXRay - 1)
      } else {
        setPageXRay(1)
      }
    } else if (key === 'Lab') {
      if (pageLab != 1) {
        setPageLab(pageLab - 1)
      } else {
        setPageLab(1)
      }
    }
  }
  const onNext = (key) => {
    if (key === 'Treatment') {
      if (pageTreatment != list_Treatment.reduce((max, current) => { return current.page > max ? current.page : max }, 0)) {
        setPageTreatment(pageTreatment + 1)
      } else {
        setPageTreatment(pageTreatment)
      }
    } else if (key === 'XRay') {
      if (pageXRay != list_XRay.reduce((max, current) => { return current.page > max ? current.page : max }, 0)) {
        setPageXRay(pageXRay + 1)
      } else {
        setPageXRay(pageXRay)
      }
    } else if (key === 'Lab') {
      if (pageLab != list_Lab.reduce((max, current) => { return current.page > max ? current.page : max }, 0)) {
        setPageLab(pageLab + 1)
      } else {
        setPageLab(pageLab)
      }
    }
  }

  const Loadoptions = async () => {
    try {
      startLoading()
      const res = await getDoctor()
      let Doctor = []
      if (res?.message === 'success') {
        if (res?.data?.length > 0) {
          for await (const _s of res?.data || []) {
            Doctor.push({ value: _s?.uid, label: _s?.name_th, name_en: _s?.name_en, doctor_code: _s?.doctor_code })
          }
        }
        setOptions({ Doctor })
      } else {
        console.log('error', res?.error)
      }
    } catch (err) {
      console.error('An error occurred while refreshing data:', err)
    } finally {
      stopLoading()
    }
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const handleChangeEdit = (update) => {
    console.log('update', update)
    setFormEdit({ ...formedit, ...update })
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved')
        setForm((p) => ({
          ...p, ...{
            Prename: null,
            Forename: null,
            Surname: null,
            Age: null,
            Sex: null,
            MaritalStatus: null,
            DOB: null,
            Email: null,
            Telephone: null,
            Mobile: null,
            NO: null,
            Company: null,
            Position: null,
            Shift: null,
            Job: null,
            Dept: null,
            Section: null,
            Line: null,
            Division: null,
            Location: null,
            Address: null,
            NationalityCode: null,
            Nationality: null,
            CountCheckList: null,
            Prename_Eng: null,
            Forename_Eng: null,
            Surname_Eng: null,
            PassportID: null,
            AddressEN: null,
            AddressNumber: null,
            AgeDetail: null,
            AddressOther: null,
          }
        }))
      }
    })
  }

  const onSave = () => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {
          HN: form?.HN || null,
          EN: form?.EN || null,
          Prename: form?.Prename || null,
          Forename: form?.Forename || null,
          Surname: form?.Surname || null,
          Age: form?.Age || null,
          Sex: form?.Sex || null,
          MaritalStatus: form?.MaritalStatus || null,
          DOB: form?.DOB || null,
          Email: form?.Email || null,
          Telephone: form?.Telephone || null,
          Mobile: form?.Mobile || null,
          CheckupDate: form?.CheckupDate || null,
          NO: form?.NO || null,
          RegisType: form?.RegisType || null,
          Company: form?.Company || null,
          EmpID: form?.EmpID || null,
          Position: form?.Position || null,
          Shift: form?.Shift || null,
          Job: form?.Job || null,
          Dept: form?.Dept || null,
          Section: form?.Section || null,
          Line: form?.Line || null,
          Division: form?.Division || null,
          Location: form?.Location || null,
          Language: form?.Language || null,
          StatusFlag: form?.StatusFlag || null,
          CUser: form?.CUser || null,
          CWhen: form?.CWhen || null,
          MUser: form?.MUser || null,
          MWhen: form?.MWhen || null,
          Address: form?.Address || null,
          CARDID: form?.CARDID || null,
          ARCode: form?.ARCode || null,
          RefNo: form?.RefNo || null,
          RequestNo: form?.RequestNo || null,
          ResultStatus: form?.ResultStatus || null,
          ProgramDesc: form?.ProgramDesc || null,
          ARName: form?.ARName || null,
          NationalityCode: form?.NationalityCode || null,
          Nationality: form?.Nationality || null,
          CountCheckList: form?.CountCheckList || null,
          Prename_Eng: form?.Prename_Eng || null,
          Forename_Eng: form?.Forename_Eng || null,
          Surname_Eng: form?.Surname_Eng || null,
          DateRegisByLoad: form?.DateRegisByLoad || null,
          HispatientUID: form?.HispatientUID || null,
          HispatientvisitUID: form?.HispatientvisitUID || null,
          HisVisitCareProvider: form?.HisVisitCareProvider || null,
          HisVisitCareProviderEnglishName: form?.HisVisitCareProviderEnglishName || null,
          PassportID: form?.PassportID || null,
          AddressEN: form?.AddressEN || null,
          AddressNumber: form?.AddressNumber || null,
          HisVisitCareProviderLicenseID: form?.HisVisitCareProviderLicenseID || null,
          MergeToPatientUID: form?.MergeToPatientUID || null,
          AgeDetail: form?.AgeDetail || null,
          AddressOther: form?.AddressOther || null,
          CheckupNo: form?.CheckupNo || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const resupdate = await updatePatient(form?.UID, saveData)
            if (!resupdate?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', resupdate?.error)
            }
          } else {
            const resadd = await addPatient({ ...saveData, trPatientUID: UID })
            if (resadd?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', resadd?.error)
            }
          }

        } catch (error) {
          console.error('An error occurred while onSave:', error)
        } finally {
          stopLoading()
        }
      }
    })

  }

  const onSaveEdit = () => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {

        const saveData = {
          Prename: formedit?.Prename || null,
          Forename: formedit?.Forename || null,
          Surname: formedit?.Surname || null,
          Mobile: formedit?.Mobile || null,
          Company: formedit?.Company || null,
          Address: formedit?.Address || null,
          Location: formedit?.Location || null,
          HispatientUID: formedit?.HispatientUID || null,
          HispatientvisitUID: formedit?.HispatientvisitUID || null,
          HisVisitCareProvider: formedit?.HisVisitCareProvider || null,
          HisVisitCareProviderEnglishName: formedit?.HisVisitCareProviderEnglishName || null,
          HisVisitCareProviderLicenseID: formedit?.HisVisitCareProviderLicenseID || null,
        }
        try {
          startLoading()
          if (form?.UID) {
            const resupdate = await updatePatient(form?.UID, saveData)
            if (!resupdate?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', resupdate?.error)
            }
          }
        } catch (error) {
          console.error('An error occurred while onSave:', error)
        } finally {
          stopLoading()
        }
      }
    })

  }

  const onClearEdit = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved')
        const saveData = {
          Prename: null,
          Forename: null,
          Surname: null,
          Mobile: null,
          Company: null,
          Address: null,
          // HispatientUID: form?.HispatientUID || null,
          // HispatientvisitUID: form?.HispatientvisitUID || null,
          // HisVisitCareProvider: form?.HisVisitCareProvider || null,
          // HisVisitCareProviderEnglishName: form?.HisVisitCareProviderEnglishName || null,
          // HisVisitCareProviderLicenseID: form?.HisVisitCareProviderLicenseID || null,
        }
        setFormEdit((p) => ({ ...p, ...saveData }))
      }
    })
  }

  // console.log('_options', options)
  // console.log('formedit', formedit)


  return (
    <div className='w-full h-full flex flex-col rounded-2xl bg-[#F8F8F8] shadow-box p-5 my-4 '>
      <div className='flex text-[#365382] justify-between w-full'>
        <label id='patient_information' className='font-semibold'>Patient Information</label>
        <div>
          <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={switchStaus}>
        <div className='grid grid-cols-12 gap-4 w-full'>
          <label className='col-span-12' >ข้อมูลทั่วไป</label>
          {/* แุถว 1 */}
          <div className='relative flex col-span-4  '>
            <TextField disabled size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.HN || ''} onChange={(HN) => handleChange({ HN: HN?.target.value })} label="หมายเลข HN" variant="outlined" />
            {/* <Toolselect2 options={[]} label={"หมายเลขผู้ป่วย HN"} value={''} change={''} name={""}></Toolselect2> */}
          </div>
          <div className='relative flex col-span-4  '>
            <TextField disabled size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.EN || ''} onChange={(EN) => handleChange({ EN: EN?.target.value })} label="หมายเลข EN" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <Tooldatepick sm label={"วันที่ลงบันทึก"} value={form?.DateRegisByLoad || ''} onChange={(DateRegisByLoad) => handleChange({ DateRegisByLoad })} ></Tooldatepick>
          </div>
          {/* แุถว 2 */}
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={MetaInitialAll || []} label={"คำนำหน้า"} value={form?.Prename || ''} onChange={(Prename) => handleChange({ Prename })} ></Toolselect2>
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Forename || ''} onChange={(Forename) => handleChange({ Forename: Forename?.target?.value })} label="ชื่อ" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Surname || ''} onChange={(Surname) => handleChange({ Surname: Surname?.target?.value })} label="นามสกุล" variant="outlined" />
          </div>
          {/* แุถว 3 */}
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={MetaGenderThais || []} label={"เพศ"} value={form?.Sex || ''} onChange={(Sex) => handleChange({ Sex })} ></Toolselect2>
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Age || ''} onChange={(Age) => handleChange({ Age: Age?.target?.value.replace(/[^0-9]/g, '') })} label="อายุ" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={MetaMarital || []} value={form?.MaritalStatus || ''} onChange={(MaritalStatus) => handleChange({ MaritalStatus })} label="สถานะ" variant="outlined" />
          </div>
          {/* แุถว 3 */}
          <div className='relative flex col-span-4  '>
            <Tooldatepick sm label={"วันเดือนปีเกิด"} value={form?.DOB || ''} onChange={(DOB) => handleChange({ DOB })} name={"DOB"} ></Tooldatepick>
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={MetaTypepatient || []} label={"ประเภทของผู้ป่วย"} value={form?.RegisType || ''} onChange={(RegisType) => handleChange({ RegisType })} />
          </div>
          {/* <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.LabNo || ''} onChange={(LabNo) => handleChange({ LabNo: LabNo?.target?.value })} label="หมายเลขแล็ป" variant="outlined" />
          </div> */}

        </div>
        <div className='border-b-2 border-[#E2E2E2] w-full my-4'></div>

        <div className='grid grid-cols-12 gap-4 w-full'>
          <label className='col-span-12' >ข้อมูลที่อยู่และการติดต่อ</label>
          {/* แุถว 1 */}
          {/* <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.AddressNumber || ''} onChange={(e) => handleChange("AddressNumber", e)} label="บ้านเลขที่" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="ชื่อหมู่บ้าน/อาคาร" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={[]} label={"ประเภทที่พักอาศัย"} value={''} change={''} name={""}></Toolselect2>
          </div> */}
          {/* แุถว 2 */}
          {/* <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="หมู่ที่" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="ซอย" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("", e)} label="ถนน" variant="outlined" />
          </div> */}
          {/* แุถว 3 */}
          {/* <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={[]} label={"ตำบล/แขวง"} value={''} change={''} name={""}></Toolselect2>
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={[]} label={"อำเภอ/เขต"} value={''} change={''} name={""}></Toolselect2>
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={[]} label={"จังหวัด"} value={''} change={''} name={""}></Toolselect2>
          </div> */}
          {/* แุถว 4 */}
          {/* <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="รหัสไปรษณีย์" variant="outlined" />
          </div> */}
          <div className='flex gap-4 col-span-12'>
            <TextareaAutosize minRows={5} maxRows={5} value={form?.Address || ''} onChange={(Address) => handleChange({ Address: Address?.target.value })} className="w-full rounded-lg  p-2" aria-label=" " placeholder="" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Telephone || ''} onChange={(Telephone) => handleChange({ Telephone: Telephone?.target?.value.replace(/[^0-9]/g, '') })} label="เบอร์โทรศัพท์" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Mobile || ''} onChange={(Mobile) => handleChange({ Mobile: Mobile?.target?.value.replace(/[^0-9]/g, '') })} inputProps={{ maxLength: 10 }} label="เบอร์มือถือ" variant="outlined" />
          </div>
          {/* แุถว 5 */}
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Email || ''} onChange={(Email) => handleChange({ Email: Email?.target?.value })} label="อีเมลล์" variant="outlined" />
          </div>
          {/* <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Telephone2 || ''} onChange={(Telephone2) => handleChange({ Telephone2: Telephone2?.target?.value })} label="เบอร์โทรฉุกเฉิน" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={[]} label={"ความสัมพันธ์"} value={form?.Relationship || ''} onChange={(Relationship) => handleChange({ Relationship })} name={""}></Toolselect2>
          </div> */}
        </div>

        <div className='border-b-2 border-[#E2E2E2] w-full my-4'></div>

        <div className='grid grid-cols-12 gap-4 w-full'>
          <label className='col-span-12' >ข้อมูลบริษัท</label>
          {/* แุถว 1 */}
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Company || ''} onChange={(Company) => handleChange({ Company: Company?.target?.value })} label="Company name" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Staff_ID || ''} onChange={(Staff_ID) => handleChange({ Staff_ID: Staff_ID?.target?.value })} label="Staff ID" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={[]} label={"Pos"} value={form?.Position || ''} onChange={(Position) => handleChange({ Position })}  ></Toolselect2>
          </div>
          {/* แุถว 2 */}
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Shift || ''} onChange={(Shift) => handleChange({ Shift: Shift?.target?.value })} label="Shift" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Job || ''} onChange={(Job) => handleChange({ Job: Job?.target?.value })} label="Job" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={[]} label={"Department"} value={form?.Dept || ''} onChange={(Dept) => handleChange({ Dept })} ></Toolselect2>
          </div>
          {/* แุถว 3 */}
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Section || ''} onChange={(Section) => handleChange({ Section: Section?.target?.value })} label="Section" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Line || ''} onChange={(Line) => handleChange({ Line: Line?.target?.value })} label="Line" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Division || ''} onChange={(Division) => handleChange({ Division: Division?.target?.value })} label="Division" variant="outlined" />
          </div>
          {/* แุถว 4 */}
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.BusUnit || ''} onChange={(BusUnit) => handleChange({ BusUnit: BusUnit?.target?.value })} label="Business Unit" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.BusDiv || ''} onChange={(BusDiv) => handleChange({ BusDiv: BusDiv?.target?.value })} label="Business Division" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            {/* <Toolselect2 options={[]} label={"Location"} value={''} change={''} name={""}></Toolselect2> */}
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Location || ''} onChange={(Location) => handleChange({ Location: Location?.target?.value })} label="Location" variant="outlined" />
          </div>
          {/* แุถว 5 */}
          <div className='relative flex gap-4 col-span-4  '>
            <TextField size='small' className='text-white w-[70%] bg-[#FFFFFF]' value={form?.Checklist || ''} onChange={(Checklist) => handleChange({ Checklist: Checklist?.target?.value })} label="Checklist" variant="outlined" />
            <button className='w-[30%] border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่ม</button>
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.NO || ''} onChange={(NO) => handleChange({ NO: NO?.target?.value })} label="No." variant="outlined" />
          </div>

          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.GroupBook || ''} onChange={(GroupBook) => handleChange({ GroupBook: GroupBook?.target?.value })} label="Group Book" variant="outlined" />
          </div>
          {/* แุถว 6 */}
          {/* <div className='relative flex flex-col gap-4 col-span-4  '>
            <div className='flex justify-start w-full'>
              <label className='text-sm'>Active</label>
            </div>
            <div className='flex justify-center items-center gap-4 w-full'>
              <div className='flex gap-2'>
                <input checked={form.StatusFlag === 'A'} onChange={() => handleChange({ StatusFlag: "A" })} className='w-6 h-6 accent-[#365382]' type="radio" id="active1" name="active" value="" />
                <label htmlFor='active1' className=''>Active</label>
              </div>
              <div className='flex gap-2'>
                <input checked={form.StatusFlag === 'I'} onChange={() => handleChange({ StatusFlag: "I" })} className='w-6 h-6 accent-[#365382]' type="radio" id="active2" name="active" value="" />
                <label htmlFor='active2' className=''>Inactive</label>
              </div>
            </div>
          </div> */}
        </div>

        <div className='flex gap-4 w-full justify-center items-center mt-4'>
          <button onClick={() => onClear()} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
              <label>ล้าง</label>
            </div>
          </button>
          <button onClick={() => onSave()} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              <label className='cursor-pointer'>บันทึก</label>
            </div>
          </button>
        </div>

        <div className='border-b-2 border-[#E2E2E2] w-full my-4'></div>

        <div className='grid grid-cols-12 gap-2 my-4 lg:h-[360px] md:h-auto relative'>
          <div className='bg-[#FFFFFF] shadow-box rounded-lg md:col-span-12 lg:col-span-4 p-4 relative'>
            <label className='w-full text-[#365382] font-medium'>Treatment</label>
            <div className='w-full overflow-x-auto px-1 lg:pb-1 md:pb-6'>
              <table className=" tablePatientInformation  mt-4 w-full ">
                <thead className='text-[#4E4E4E]  text-sm'>
                  <tr className=" text-left bg-[#E2E2E2]">
                    <th className="text-left w-[80px] font-light">CodeCHKUP</th>
                    <th className="text-left font-light">NameCHKUP</th>
                  </tr>
                </thead>
                <tbody className='text-base font-light truncate'>
                  {list_Treatment.length > 0 && list_Treatment.map((item, index) => {
                    if (pageTreatment === item.page) {
                      return <tr key={`list_Treatment${index}`} className=" text-center hover">
                        <td className=" text-left">{item?.codechkup || '-'}</td>
                        <td className=" text-left">{item?.namechkup || '-'}</td>
                      </tr>
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className='flex justify-start items-center w-full gap-2 mt-4 absolute bottom-1'>
              <svg onClick={() => onBack('Treatment')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.293382C8.09763 0.683906 8.09763 1.31707 7.70711 1.7076L2.41421 7.00049L7.70711 12.2934C8.09763 12.6839 8.09763 13.3171 7.70711 13.7076C7.31658 14.0981 6.68342 14.0981 6.29289 13.7076L0.292893 7.70759C-0.0976311 7.31707 -0.0976311 6.68391 0.292893 6.29338L6.29289 0.293382C6.68342 -0.0971428 7.31658 -0.0971428 7.70711 0.293382Z" fill="#365382" />
              </svg>
              <label className='text-[#365382]'>{pageTreatment}/{list_Treatment.reduce((max, current) => { return current.page > max ? current.page : max }, 0)}</label>
              <svg onClick={() => onNext('Treatment')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 13.7076C-0.0976314 13.3171 -0.0976313 12.6839 0.292894 12.2934L5.58579 7.00049L0.292894 1.70759C-0.0976303 1.31707 -0.0976303 0.683905 0.292895 0.293381C0.683419 -0.0971438 1.31658 -0.0971438 1.70711 0.293381L7.70711 6.29338C8.09763 6.68391 8.09763 7.31707 7.70711 7.70759L1.70711 13.7076C1.31658 14.0981 0.683417 14.0981 0.292893 13.7076Z" fill="#365382" />
              </svg>
            </div>
          </div>

          <div className='bg-[#FFFFFF] shadow-box rounded-lg md:col-span-12 lg:col-span-4 p-4 relative'>
            <label className='w-full text-[#365382] font-medium'>X-Ray</label>
            <div className='w-full overflow-x-auto  px-1 lg:pb-1 md:pb-6'>
              <table className=" tablePatientInformation  mt-4 w-full  ">
                <thead className='text-[#4E4E4E]  text-sm'>
                  <tr className=" text-left bg-[#E2E2E2]">
                    <th className=" w-[80px]  font-light">CodeCHKUP</th>
                    <th className=" font-light">NameCHKUP</th>
                  </tr>
                </thead>
                <tbody className='text-base font-light truncate'>
                  {list_XRay.length > 0 && list_XRay.map((item, index) => {
                    if (pageXRay === item.page) {
                      return <tr key={`list_XRay${index}`} className=" text-center hover">
                        <td className=" text-left">{item?.codechkup || '-'}</td>
                        <td className=" text-left">{item?.namechkup || '-'}</td>
                      </tr>
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className='flex justify-start items-center w-full gap-2 mt-4 absolute bottom-1'>
              <svg onClick={() => onBack('XRay')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.293382C8.09763 0.683906 8.09763 1.31707 7.70711 1.7076L2.41421 7.00049L7.70711 12.2934C8.09763 12.6839 8.09763 13.3171 7.70711 13.7076C7.31658 14.0981 6.68342 14.0981 6.29289 13.7076L0.292893 7.70759C-0.0976311 7.31707 -0.0976311 6.68391 0.292893 6.29338L6.29289 0.293382C6.68342 -0.0971428 7.31658 -0.0971428 7.70711 0.293382Z" fill="#365382" />
              </svg>
              <label className='text-[#365382]'>{pageXRay}/{list_XRay.reduce((max, current) => { return current.page > max ? current.page : max }, 0)}</label>
              <svg onClick={() => onNext('XRay')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 13.7076C-0.0976314 13.3171 -0.0976313 12.6839 0.292894 12.2934L5.58579 7.00049L0.292894 1.70759C-0.0976303 1.31707 -0.0976303 0.683905 0.292895 0.293381C0.683419 -0.0971438 1.31658 -0.0971438 1.70711 0.293381L7.70711 6.29338C8.09763 6.68391 8.09763 7.31707 7.70711 7.70759L1.70711 13.7076C1.31658 14.0981 0.683417 14.0981 0.292893 13.7076Z" fill="#365382" />
              </svg>
            </div>
          </div>

          <div className='bg-[#FFFFFF] shadow-box rounded-lg md:col-span-12 lg:col-span-4 p-4 relative'>
            <label className='w-full text-[#365382] font-medium'>Lab</label>
            <div className='w-full overflow-x-auto  px-1 lg:pb-1 md:pb-6'>
              <table className=" tablePatientInformation  mt-4 w-full ">
                <thead className='text-[#4E4E4E]  text-sm'>
                  <tr className=" text-left bg-[#E2E2E2]">
                    <th className=" w-[80px]  font-light">CodeCHKUP</th>
                    <th className=" font-light">NameCHKUP</th>
                  </tr>
                </thead>
                <tbody className='text-base font-light truncate'>
                  {list_Lab.length > 0 && list_Lab.map((item, index) => {
                    if (pageLab === item.page) {
                      return <tr key={`list_Lab${index}`} className=" text-center hover">
                        <td className=" text-left">{item?.codechkup || '-'}</td>
                        <td className=" text-left">{item?.namechkup || '-'}</td>
                      </tr>
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className='flex justify-start items-center w-full gap-2 mt-4 absolute bottom-1'>
              <svg onClick={() => onBack('Lab')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.293382C8.09763 0.683906 8.09763 1.31707 7.70711 1.7076L2.41421 7.00049L7.70711 12.2934C8.09763 12.6839 8.09763 13.3171 7.70711 13.7076C7.31658 14.0981 6.68342 14.0981 6.29289 13.7076L0.292893 7.70759C-0.0976311 7.31707 -0.0976311 6.68391 0.292893 6.29338L6.29289 0.293382C6.68342 -0.0971428 7.31658 -0.0971428 7.70711 0.293382Z" fill="#365382" />
              </svg>
              <label className='text-[#365382]'>{pageLab}/{list_Lab.reduce((max, current) => { return current.page > max ? current.page : max }, 0)}</label>
              <svg onClick={() => onNext('Lab')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 13.7076C-0.0976314 13.3171 -0.0976313 12.6839 0.292894 12.2934L5.58579 7.00049L0.292894 1.70759C-0.0976303 1.31707 -0.0976303 0.683905 0.292895 0.293381C0.683419 -0.0971438 1.31658 -0.0971438 1.70711 0.293381L7.70711 6.29338C8.09763 6.68391 8.09763 7.31707 7.70711 7.70759L1.70711 13.7076C1.31658 14.0981 0.683417 14.0981 0.292893 13.7076Z" fill="#365382" />
              </svg>
            </div>
          </div>
        </div>

        {form?.UID && <div className='bg-[#F3F3F3] w-full rounded-lg grid grid-cols-12 gap-4 shadow-box p-4'>
          <label className='col-span-12 text-[#365382]' >แก้ไขข้อมูล</label>
          {/* แุถว 1 */}
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={MetaInitialAll || []} label={"Title"} value={formedit?.Prename || ''} onChange={(Prename) => handleChangeEdit({ Prename })}  ></Toolselect2>
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={formedit?.Forename || ''} onChange={(Forename) => handleChangeEdit({ Forename: Forename?.target?.value })} label="Forename" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={formedit?.Surname || ''} onChange={(Surname) => handleChangeEdit({ Surname: Surname?.target?.value })} label="Surname" variant="outlined" />
          </div>
          {/* แุถว 2 */}
          <div className='relative flex col-span-4  '>
            {/* <Toolselect2 options={[]} label={"Company Name"} value={''} change={''} name={""}></Toolselect2> */}
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={formedit?.Company || ''} onChange={(Company) => handleChangeEdit({ Company: Company?.target?.value })} label="Company Name" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <Toolselect2 sm options={MetaLocation || []} label={"Location"} value={formedit?.Location || ''} onChange={(Location) => handleChangeEdit({ Location })} />
          </div>
          <div className='relative grid grid-cols-2 col-span-4  items-center   gap-4'>
            {/* <label className='font-medium col-span-1'>สำหรับตรวจก่อนเข้างาน</label> */}
            <div className='flex gap-2 col-span-1 items-cente whitespace-nowrap'>
              <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='checking-entering1' name="checking-entering" value="" />
              <label htmlFor='checking-entering1' className='font-medium'>ตรวจก่อนเข้างาน</label>
            </div>
          </div>
          {/* แุถว 3 */}
          <div className='relative flex col-span-4'>
            {/* <Toolselect2 options={[]} label={"เบอร์มือถือ"} value={''} change={''} name={""}></Toolselect2> */}
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={formedit?.Mobile || ''} onChange={(Mobile) => handleChangeEdit({ Mobile: Mobile?.target?.value.replace(/[^0-9]/g, '') })} inputProps={{ maxLength: 10 }} label="เบอร์มือถือ" variant="outlined" />
          </div>
          <div className='relative flex col-span-4  '>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF] ' value={formedit?.Address || ''} onChange={(Address) => handleChangeEdit({ Address: Address?.target?.value })} label="ที่อยู่ปัจจุบัน" variant="outlined" />
          </div>
          <div className='relative grid grid-cols-2 col-span-4  items-center   gap-4'>
            {/* <label className='font-medium col-span-1'>ที่อยู่บริษัท</label> */}
            <div className='flex gap-2 col-span-1 items-center whitespace-nowrap'>
              <input type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='company-address1' name="company-address" value="" />
              <label htmlFor='company-address1' className='font-medium'>เหมือนที่อยู่ปัจจุบัน</label>
            </div>
          </div>
          {/* แุถว 4 */}
          <div className='relative flex col-span-8  bg-[#FFFFFF]'>
            {/* <Toolselect2 sm options={options.Doctor || []} label={"ชื่อแพทย์"} value={formedit?.HisVisitCareProvider || ''} onChange={handleChangeEdit} /> */}
            <Autocomplete className='w-full' size='small'
              options={options.Doctor}
              getOptionLabel={(option) => option.label || ''}
              onChange={(e, v) => handleChangeEdit({ HisVisitCareProvider: v?.label, HisVisitCareProviderEnglishName: v?.name_en || '', HisVisitCareProviderLicenseID: v?.doctor_code||'' })}
              renderInput={(params) => <TextField {...params} label="ชื่อแพทย์" />}
              value={(Array.isArray(options.Doctor) ? options.Doctor.find(option => option.label === formedit?.HisVisitCareProvider) || null : null)}
            />
          </div>

          {/* <div className='relative flex col-span-4  '>
            <button className='w-[50%] border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >เพิ่มชื่อแพทย์</button>
          </div> */}

          <div className='flex gap-4 col-span-12 justify-center items-center'>
            <button onClick={() => onClearEdit()} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label>ล้าง</label>
              </div>
            </button>
            <button onClick={() => onSaveEdit()} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <label>บันทึก</label>
              </div>
            </button>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div>
        }
        {/* <div className='w-full flex justify-end mt-4'>
          <div className='w-[50%] flex gap-2 items-end'>
            <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={form?.Screener || ''} onChange={(Screener) => handleChange({ Screener: Screener?.target?.value })} label="ลงชื่อผู้คัดกรอง" variant="outlined" />
            <div onClick={() => onSave()} className='bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
            </div>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div> */}

      </Collapse>

    </div>
  )
}

export default PatientInformation