'use client'
import { Collapse, InputAdornment, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useMemo, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { getXrayfromssbById, searcXraycodessb, updateXrayFromssb } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function XRay({ module = 'patient-information', activeTap, onActiveTap, UID }) {
  const { startLoading, stopLoading } = useLoading()

  const [switchStaus, setSwitchStaus] = useState(null)
  const [form, setForm] = useState({})
  const [list, setList] = useState([])
  const [pagetXRay, setPageXRat] = useState(1)
  const [listTranslate, setListTranslate] = useState([])
  const [pagetTranslate, setPageTranslate] = useState(1)
  const [listItem, setListItem] = useState([])


  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  useEffect(() => {
    setForm((p) => {
      return { ...p, ...{ HSeriesResultDetail: listItem?.map((d) => { return d?.Description })?.join('\n') } }
    })
  }, [listItem])

  const options = [
    { label: 'ปกติ', value: 'N' },
    { label: 'ผิดปกติ', value: 'A6' }
  ];

  const refresh = async () => {
    try {
      startLoading()
      const res = await getXrayfromssbById(UID)
      if (res?.message === 'success') {
        setList(res?.data || [])
        if (res?.data === null && module === 'patient-information') {
          onActiveTap('x_ray', false)
        }
      } else {
        console.log('error', res?.error)
        if (module === 'patient-information') {
          onActiveTap('x_ray', false)
        }
      }

    } catch (err) {
      console.error('An error occurred while refreshing data:', err)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    if (module === 'patient-information') {
      setSwitchStaus(activeTap?.x_ray)
    } else if (module === 'docter-result') {
      setSwitchStaus(activeTap?.lab_and_xray)
    }
  }, [activeTap?.x_ray, activeTap?.lab_and_xray, module])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('x_ray', update.target.checked)
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const { list_XRay = [] } = useMemo(() => {
    let XRay = []
    if (list?.length > 0) {
      for (const v of list || []) {
        XRay.push(v)
      }
    }

    let pageXRay = []

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
    addToPage(XRay, pageXRay)
    return { list_XRay: pageXRay }
  }, [list])

  const { list_Translate = [] } = useMemo(() => {
    let Translate = []
    if (listTranslate?.length > 0) {
      for (const v of listTranslate || []) {
        Translate.push(v)
      }
    }

    let pageTranslate = []

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
    addToPage(Translate, pageTranslate)
    return { list_Translate: pageTranslate }
  }, [listTranslate])

  const onBack = (key) => {
    if (key === 'XRay') {
      if (pagetXRay != 1) {
        setPageXRat(pagetXRay - 1)
      } else {
        setPageXRat(1)
      }
    } else if (key === 'TranslateData') {
      if (pagetTranslate != 1) {
        setPageTranslate(pagetTranslate - 1)
      } else {
        setPageTranslate(1)
      }
    }
  }
  const onNext = (key) => {
    if (key === 'XRay') {
      if (pagetXRay != list_XRay.reduce((max, current) => { return current.page > max ? current.page : max }, 0)) {
        setPageXRat(pagetXRay + 1)
      } else {
        setPageXRat(pagetXRay)
      }
    } else if (key === 'TranslateData') {
      if (pagetTranslate != list_Translate.reduce((max, current) => { return current.page > max ? current.page : max }, 0)) {
        setPageTranslate(pagetTranslate + 1)
      } else {
        setPageTranslate(pagetTranslate)
      }
    }
  }

  const onDetail = async (item) => {
    try {
      if (item?.Code) {
        startLoading()
        const _s = {
          "Code": item?.Code || null,
          "Language": "th"
        }
        const res = await searcXraycodessb(_s)
        if (res?.message === 'success') {
          setListTranslate(res?.data || [])

          const _listItem = item?.HSeriesResultDetail?.split("\n")?.map((d) => { return { Description: d } });
          setListItem(_listItem)
        } else {
          console.log('api error', res.error)
        }
        setForm((p) => ({ ...p, ...item }))
      }
    } catch (error) {
      console.error('An error occurred while onDetail data:', error)
    } finally {
      stopLoading()
    }
  }

  const onCheckbox = (item) => {
    if (listItem?.some((d) => d?.Description === item?.Description)) {
      const updatedList = listItem?.filter((d) => d?.Description !== item?.Description)
      setListItem(updatedList)
    } else {
      setListItem((prevList) => [...prevList, item])
    }
  }

  const isChecked = (item) => {
    return listItem?.some((d) => d?.Description === item?.Description)
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        setForm((p) => ({
          ...p, ...{
            Code: null,
            Description: null,
            ResultDate: null,
            NResultDetail: null,
            XrayStatus: null,
            statusflag: null,
            HSeriesResultDetail: null,
          }
        }))
        setListItem([])
      }
    })
  }
  const onSave = () => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {
          UID: form?.UID || null,
          trPatientUID: form?.trPatientUID || null,
          Code: form?.Code || null,
          Description: form?.Description || null,
          ResultDate: form?.ResultDate || null,
          cwhen: form?.cwhen || null,
          mwhen: form?.mwhen || null,
          userID: form?.userID || null,
          NResultDetail: form?.NResultDetail || null,
          HSeriesResultDetail: form?.HSeriesResultDetail || null,
          HN: form?.HN || null,
          XrayStatus: form?.XrayStatus || null,
          statusflag: form?.statusflag || null,
        }
        try {
          startLoading()
          if (form?.UID) {
            const res = await updateXrayFromssb(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addXrayFromssb({ ...saveData, trPatientUID: UID })
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
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

  return (
    <div className={`w-full flex flex-col rounded-2xl  ${module === 'docter-result' ? 'bg-[#EDF4FC]' : 'bg-[#F8F8F8]'}  shadow-box p-5 my-4`}>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='x_ray' className='font-semibold text-[#365382]'>X-Ray</label>
        <div>
          {module != 'docter-result' && <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />}
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={module === 'docter-result' ? true : switchStaus}>
        <div className='grid grid-cols-1 lg:grid-cols-2    items-stretch col-span-12 gap-4'>
          <div className='bg-[#FFFFFF] shadow-box rounded-lg col-span-1 h-auto min-h-[450px] self-start p-4 pb-10  mt-4 relative'>
            <label className='w-full text-[#365382] font-medium'>X-Ray</label>
            <div className='w-full overflow-x-auto px-1 py-1'>
              <table className=" tablePatientInformation    w-full ">
                <thead className='text-[#4E4E4E]  text-sm'>
                  <tr className=" text-left bg-[#E2E2E2]">
                    <th className=" text-left w-[80px] font-light">Code</th>
                    <th className=" text-left font-light">Description</th>
                    <th className=" text-left font-light">Detailed View</th>
                  </tr>
                </thead>
                <tbody className='text-base font-light truncate'>
                  {list_XRay?.length > 0 && list_XRay.filter(item => !["03UT107", "14305", "14162", "14509"].includes(item.Code)).map((item, index) => {
                    if (pagetXRay === item.page) {
                      return <tr key={`list_XRay${index}`} className=" text-center hover">
                        <td className=" text-left">{item?.Code || '-'}</td>
                        <td className=" text-left">{item?.Description || '-'}</td>
                        <td className='flex justify-start items-center'>
                          <button onClick={() => onDetail(item)} className='h-10  px-6  border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >Detail</button>
                        </td>
                      </tr>
                    }
                  })}
                </tbody>
              </table>
              <div className='flex justify-start items-center w-full gap-2 mt-4 absolute bottom-1'>
                <svg onClick={() => onBack('XRay')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.293382C8.09763 0.683906 8.09763 1.31707 7.70711 1.7076L2.41421 7.00049L7.70711 12.2934C8.09763 12.6839 8.09763 13.3171 7.70711 13.7076C7.31658 14.0981 6.68342 14.0981 6.29289 13.7076L0.292893 7.70759C-0.0976311 7.31707 -0.0976311 6.68391 0.292893 6.29338L6.29289 0.293382C6.68342 -0.0971428 7.31658 -0.0971428 7.70711 0.293382Z" fill="#365382" />
                </svg>
                <label className='text-[#365382]'>{pagetXRay}/{list_XRay.reduce((max, current) => { return current.page > max ? current.page : max }, 0)}</label>
                <svg onClick={() => onNext('XRay')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 13.7076C-0.0976314 13.3171 -0.0976313 12.6839 0.292894 12.2934L5.58579 7.00049L0.292894 1.70759C-0.0976303 1.31707 -0.0976303 0.683905 0.292895 0.293381C0.683419 -0.0971438 1.31658 -0.0971438 1.70711 0.293381L7.70711 6.29338C8.09763 6.68391 8.09763 7.31707 7.70711 7.70759L1.70711 13.7076C1.31658 14.0981 0.683417 14.0981 0.292893 13.7076Z" fill="#365382" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-[#FFFFFF] shadow-box rounded-lg col-span-1 h-auto  min-h-[450px] self-start pb-10  p-4 mt-4 relative'>
            <label className='w-full text-[#365382] font-medium'>TranslateData</label>
            <div className='w-full overflow-x-auto px-1 py-1'>
              <table className=" tablePatientInformation w-full ">
                <thead className='text-[#4E4E4E]  text-sm'>
                  <tr className=" text-left bg-[#E2E2E2]">
                    <th className=" text-left w-[60px] font-light"></th>
                    <th className=" text-left w-[80px] font-light">Code</th>
                    <th className=" text-left font-light">Description</th>
                    <th className=" text-left font-light">Language</th>
                    <th className=" text-left font-light"></th>
                  </tr>
                </thead>
                <tbody className='text-base font-light '>
                  {list_Translate?.length > 0 && list_Translate.map((item, index) => {
                    if (pagetTranslate === item.page) {
                      return <tr onClick={() => onCheckbox(item)} key={`list_Translate${index}`} className=" text-center hover">
                        <td className="   ">
                          <div className='flex items-center justify-center'>
                            <input type="checkbox" readOnly checked={isChecked(item)} className='w-5 h-5 accent-[#365382]' name="list_Translate" value="" />
                          </div>
                        </td>
                        <td className=" text-left">{item?.Code || '-'}</td>
                        <td className=" text-left">{item?.Description || '-'}</td>
                        <td className=" text-left">{item?.Language || '-'}</td>
                      </tr>
                    }
                  })}
                </tbody>
              </table>
              {list_Translate.length > 0 && <div className='flex justify-start items-center w-full gap-2 mt-4 absolute bottom-1'>
                <svg onClick={() => onBack('TranslateData')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.293382C8.09763 0.683906 8.09763 1.31707 7.70711 1.7076L2.41421 7.00049L7.70711 12.2934C8.09763 12.6839 8.09763 13.3171 7.70711 13.7076C7.31658 14.0981 6.68342 14.0981 6.29289 13.7076L0.292893 7.70759C-0.0976311 7.31707 -0.0976311 6.68391 0.292893 6.29338L6.29289 0.293382C6.68342 -0.0971428 7.31658 -0.0971428 7.70711 0.293382Z" fill="#365382" />
                </svg>
                <label className='text-[#365382]'>{pagetTranslate}/{list_Translate.reduce((max, current) => { return current.page > max ? current.page : max }, 0)}</label>
                <svg onClick={() => onNext('TranslateData')} className='cursor-pointer' width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 13.7076C-0.0976314 13.3171 -0.0976313 12.6839 0.292894 12.2934L5.58579 7.00049L0.292894 1.70759C-0.0976303 1.31707 -0.0976303 0.683905 0.292895 0.293381C0.683419 -0.0971438 1.31658 -0.0971438 1.70711 0.293381L7.70711 6.29338C8.09763 6.68391 8.09763 7.31707 7.70711 7.70759L1.70711 13.7076C1.31658 14.0981 0.683417 14.0981 0.292893 13.7076Z" fill="#365382" />
                </svg>
              </div>}
            </div>
          </div>
        </div>

        <div className='w-full flex mt-4 justify-center items-start'>
          <div className='w-[90%] lg:w-[80%] grid grid-cols-12 gap-4 justify-center items-start'>
            <label className='whitespace-nowrap col-span-2'>ผลการตรวจ</label>
            <TextareaAutosize value={form?.NResultDetail || ''} onChange={(e) => handleChange({ NResultDetail: e?.target?.value })} minRows={3} maxRows={6} className="col-span-10 rounded-lg  p-2" aria-label="" placeholder="" />
          </div>
        </div>

        <div className='w-full flex mt-4 justify-center items-start'>
          <div className='w-[90%] lg:w-[80%] grid grid-cols-12 gap-4 justify-center items-start'>
            <label className='whitespace-nowrap col-span-2'>ลงผลการตรวจ</label>
            <div className='flex flex-col lg:flex-row col-span-10 gap-4'>
              <div className='bg-[#FFFFFF] w-full lg:w-[60%] flex gap-4'>
                <TextareaAutosize value={form?.HSeriesResultDetail || ''} onChange={(e) => handleChange({ HSeriesResultDetail: e?.target.value })} minRows={3} maxRows={6} className=" w-full rounded-lg  p-2" aria-label="" placeholder="" />
              </div>
              <div className=' w-full lg:w-[40%] flex items-start gap-4'>
                <div className='w-full'>
                  <Toolselect2 sm options={options || []} label={""} value={form?.abnormal || ''} onChange={(abnormal) => handleChange({ abnormal })} />
                </div>
                <div className='flex gap-2 items-center whitespace-nowrap'>
                  <input className='w-4 h-4 accent-[#365382]' type="checkbox" id="disposal-results" name="disposal-results" value="" />
                  <label className=''>ออกรายงาน</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-12  items-start   w-full gap-2 mt-4 p-2'>
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 18-11-2565</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button onClick={() => onClear()} className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
              </div>
            </button>
            <button onClick={() => onSave()} className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <label className='cursor-pointer'>บันทึก</label>
              </div>
            </button>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>

          {/* <div className='w-full flex col-span-12 justify-end mt-4'>
            <div className='w-[50%] flex gap-2 items-center'>
              <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' value={''} onChange={(e) => handleChange("username", e)} label="ลงชื่อผู้คัดกรอง" variant="outlined" />
              <div className='bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
              </div>
              <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
              </div>
            </div>
          </div> */}
        </div>
      </Collapse>
    </div>
  )
}

export default XRay