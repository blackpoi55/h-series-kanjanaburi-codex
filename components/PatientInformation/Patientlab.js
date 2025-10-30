'use client'
import { Collapse, InputAdornment, Pagination, TablePagination, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useRef, useState } from 'react'
import Toolselect2 from '../Tool/Toolselect2'
import Tooldatepick from '../Tool/Tooldatepick'
import { AddCallmessage, GetPatientInfomation, searchLabbyPatientId, updateLab, getCallmessage } from '@/action/api'
import { useLoading } from '../Tool/LoadingContext '
import Modal from '../Modal/Modal'
import ModalComponent from '../Modal/Modal'
import { InputSwitch } from '../Tool/input'
import { saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function Patientlab({ module = 'patient-information', UID, onActiveTap, activeTap }) {
  const { startLoading, stopLoading } = useLoading()
  const [list, setList] = useState([])
  const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, totalPages: 1 })
  const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
  const [datamodel, setDataModel] = useState(null)
  const [switchStaus, setSwitchStaus] = useState(null)
  const [tap, setTap] = useState('')

  const handleChange = (name, e) => {
    values[name] = e.target.value
    setValues({ ...values })
  }

  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID, search])

  useEffect(() => {
    if (module === 'patient-information') {
      setSwitchStaus(activeTap?.lab)
    } else if (module === 'docter-result') {
      setSwitchStaus(activeTap?.lab_and_xray)
    }
  }, [module, activeTap?.lab, activeTap?.lab_and_xray])

  const refresh = async () => {
    startLoading()
    const s =
    {
      "page": search?.page || 1,
      "limit": search?.limit || 20,
      "Category": search?.Category || '',
      "trPatientUID": UID || null
    }
    const res = await searchLabbyPatientId(s)
    if (res?.message === 'success') {
      setList(res?.data || [])
      setPaging({ currentPage: res?.currentPage, totalItems: res?.totalItems, totalPages: res?.totalPages })
    } else {
      console.log('error', res?.error)
      if (module === 'patient-information') {
        onActiveTap('lab', false)
      }
    }
    stopLoading()
  }

  const onSearch = (update) => {
    setSearch({ ...search, ...update })
    if (!update.hasOwnProperty('page')) {
      setTap(Object.values(update).join(''))
    }
  }
  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('lab', update.target.checked)
  }
  return (
    <div className={`w-full flex flex-col rounded-2xl ${module === 'docter-result' ? 'bg-[#EDF4FC]' : 'bg-[#F8F8F8]'}  shadow-box p-5 my-4`}>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='lab' className='font-semibold text-[#365382]'>Lab</label>
        <div className='flex gap-2 justify-center items-center'>
          {module != 'docter-result' && <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />}
        </div>

      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={module === 'docter-result' ? true : switchStaus}>
        <div className='grid grid-cols-12   items-start justify-center   w-[100%] gap-4 mt-4 p-2'>
          <div className='flex flex-wrap lg:flex-col col-span-12 lg:col-span-2 justify-start  gap-2 whitespace-pre-wrap'>
            <button onClick={() => onSearch({ Category: '' })} className={`min-h-10 ${tap === '' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >LabAll</button>
            <button onClick={() => onSearch({ Category: 'Clinical Microbiology' })} className={`min-h-10 ${tap === 'Clinical Microbiology' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >Clinical Microbiology</button>
            <button onClick={() => onSearch({ Category: 'Blood General' })} className={`min-h-10 ${tap === 'Blood General' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >Blood General</button>
            <button onClick={() => onSearch({ Category: 'Clinical Chemistry' })} className={`min-h-10 ${tap === 'Clinical Chemistry' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >Clinical Chemistry</button>
            <button onClick={() => onSearch({ Category: 'External' })} className={`min-h-10 ${tap === 'External' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >External</button>
            <button onClick={() => onSearch({ Category: 'Hematology' })} className={`min-h-10 ${tap === 'Hematology' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >Hematology</button>
            <button onClick={() => onSearch({ Category: 'Pathology' })} className={`min-h-10 ${tap === 'Pathology' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >Pathology</button>
            <button onClick={() => onSearch({ Category: 'Serology (IVF)' })} className={`min-h-10 ${tap === 'Serology (IVF)' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >Serology (IVF)</button>
            <button onClick={() => onSearch({ Category: 'Clinical Microscopy' })} className={`min-h-10 ${tap === 'Clinical Microscopy' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >Clinical Microscopy</button>
            <button onClick={() => onSearch({ Category: 'Clinical Immunology' })} className={`min-h-10 ${tap === 'Clinical Immunology' ? 'bg-[#365382] text-white' : 'bg-[#FFFFFF] text-[#365382]'} px-2  border rounded-lg border-[#365382] hover:bg-[#365382] hover:text-white `} >Clinical Immunology</button>
            <button onClick={() => onSearch({ Category: 'Other' })} className='min-h-10  px-2  border rounded-lg bg-[#FFFFFF] border-[#365382] hover:bg-[#365382] hover:text-white text-[#365382]' >Other</button>
          </div>

          <div className='flex flex-col col-span-12 lg:col-span-10 justify-start gap-2 p-4 rounded-lg shadow-box bg-[#FFFFFF]'>
            <div className='flex flex-col justify-start h-[88vh] overflow-y-auto  px-2 pb-2'>
              <table className="tablePatientInformation  w-full  ">
                <thead className='text-[#4E4E4E]  text-sm '>
                  <tr className="  text-left bg-[#E2E2E2]">
                    <th className="font-light">Code</th>
                    <th className="font-light">Name</th>
                    <th className="font-light">ตรวจ</th>
                    <th className="font-light">ปกติ</th>
                    <th className="font-light min-w-[200px]">Translate</th>
                    <th className="font-light min-w-[300px]">Recommend</th>
                    <th className="font-light">Status</th>
                    <th className="font-light">Edit</th>
                    <th className="font-light">หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody className='text-base font-light'>
                  {list.length > 0 && list.map((item, index) => (
                    <tr key={`trPatientLab${index}`} className="hover">
                      <td className={`text-left`}>{index + 1}</td>
                      <td className={`text-left ${item?.NormalStatus == "FALSE" ? 'text-red-600' : ''}`}>{item?.ExtCode || '-'}</td>
                      <td className={`text-left whitespace-nowrap ${item?.NormalStatus == "FALSE" ? 'text-red-600' : ''}`}>{item?.ItemDesc || '-'}</td>
                      <td className={`text-left ${item?.NormalStatus == "FALSE" ? 'text-red-600' : ''}`}>{item?.TestData || '-'}</td>
                      <td className={`text-left whitespace-nowrap ${item?.NormalStatus == "FALSE" ? 'text-red-600' : ''}`}>{item?.LabRange || '-'}</td>
                      <td className={`text-left break-words ${item?.NormalStatus == "FALSE" ? 'text-red-600' : ''}`}>{item?.TranslateResult || '-'}</td>
                      <td className={`text-left break-words ${item?.NormalStatus == "FALSE" ? 'text-red-600' : ''}`}>{item?.Recommend || '-'}</td>
                      <td className={`text-left ${item?.NormalStatus == "FALSE" ? 'text-red-600' : ''}`}>{item?.NormalStatus || '-'}</td>
                      <td className={`text-left`}></td>
                      <td className="text-left flex items-center gap-2">
                        <button onClick={() => setDataModel(item)} className=' border max-h-10 min-h-10 px-4 rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
                <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
              </div>}
            </div>
            <div className='w-full mt-4'>
              <Pagination
                count={paging?.totalPages || 1}
                page={search?.page || 1}
                onChange={(event, value) => onSearch({ page: value })}
                sx={{
                  '& .MuiPaginationItem-root': {
                    backgroundColor: '#FFFFFF',
                    boxShadow: '2px 2px 4px 0px #6B84B740',
                    width: '32px',
                    height: '32px',
                    padding: '4px 12px',
                    gap: '9px',
                    borderRadius: '8px 8px 8px 8px',
                    opacity: 1, // หรือ 0 ถ้าคุณต้องการโปร่งใส
                    color: '#365382', // สีของตัวอักษร
                    '&:hover': {
                      backgroundColor: '#365382', // สีพื้นหลังเมื่อ hover
                      color: '#FFFFFF', // สีตัวอักษรเมื่อถูกเลือก
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#365382', // สีพื้นหลังเมื่อถูกเลือก
                      color: '#FFFFFF', // สีตัวอักษรเมื่อถูกเลือก
                      '&:hover': {
                        backgroundColor: '#2e4a6f', // สีพื้นหลังเมื่อถูกเลือกและ hover
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>


        {/* <div className='w-full flex justify-end mt-4'>
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
      </Collapse>



      <ModelDerail data={datamodel || null} onClose={() => setDataModel(null)} module={module} refresh={() => refresh()} />
    </div>
  )
}

const ModelDerail = (props) => {
  const { data, module, refresh } = props
  const [form, setForm] = useState(null)
  const [list, setList] = useState({})
  const { startLoading, stopLoading } = useLoading()
  useEffect(() => {
    if (data != null) {
      let d = data
      d.NormalStatus = d?.NormalStatus === "TRUE" ? 'TRUE' : "FALSE"
      setForm(d)
      onEditLab(d.ItemCode)
    }
    console.log("data", data)
  }, [data])

  const onChange = (update) => {
    setForm({ ...form, ...update })
  }

  const onEditLab = async (code) => {
    let dataDG = {
      "code": code
    }
    const resC = await getCallmessage(dataDG)
    setList(resC?.data || {})
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        setForm((p) => ({
          ...p, ...{
            ItemCode: null,
            ItemDesc: null,
            TestData: null,
            TranslateResult: null,
            LabRange: null,
            NormalStatus: null,
            ResultDate: null,
            StatusFlag: null,
            Recommend: null,
            LabCommentCode: null,
            LabCommentName: null,
            ConclusionResultHIS: null,
            ResultType: null,
            ResultClassifiedName: null,
            LABResultClassifiedType: null,
            Category: null,
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
          UID: form?.UID || null,
          trPatientUID: form?.trPatientUID || null,
          HN: form?.HN || null,
          EN: form?.EN || null,
          ItemCode: form?.ItemCode || null,
          ItemDesc: form?.ItemDesc || null,
          TestData: form?.TestData || null,
          TranslateResult: form?.TranslateResult || null,
          LabRange: form?.LabRange || null,
          NormalStatus: form?.NormalStatus || null,
          ResultDate: form?.ResultDate || null,
          StatusFlag: form?.StatusFlag || null,
          Recommend: form?.Recommend || null,
          LabCommentCode: form?.LabCommentCode || null,
          LabCommentName: form?.LabCommentName || null,
          ConclusionResultHIS: form?.ConclusionResultHIS || null,
          ResultType: form?.ResultType || null,
          ResultClassifiedName: form?.ResultClassifiedName || null,
          LABResultClassifiedType: form?.LABResultClassifiedType || null,
          ExtCode: form?.ExtCode || null,
          LabEditer: form?.LabEditer || null,
          CheckupNo: form?.CheckupNo || null,
          Category: form?.Category || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          const res = await updateLab(form?.UID, saveData)
          if (res) {
            succeedAlert()
            refresh()
          } else {
            console.log('res error', res?.error)
          }
        } catch (error) {
          console.error('An error occurred while onSave:', error)
        } finally {
          stopLoading()
        }
      }
    })

  }
  const onSavefaveriteLab = (Language) => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')

        const saveData = {}
        saveData.code = form?.ItemCode || null,
          saveData.Desc = form?.rec_th || null,
          saveData.msUserUID = 1613,
          saveData.Language = "TH"
        saveData.desc_en = form?.rec_en || null,

          console.log('saveData', saveData)
        try {
          startLoading()
          const res = await AddCallmessage({ ...saveData })
          if (!res?.error) {
            onEditLab(data.ItemCode)
            succeedAlert()
            refresh()
          } else {
            console.log('res error', res?.error)
          }
        } catch (error) {
          console.error('An error occurred while onSave:', error)
        } finally {
          stopLoading()
        }
      }
    })
  }
  const onClose = () => {
    setForm({})
    refresh()
    props.onClose()
  }

  let button = <div className='flex gap-4'>
    <button onClick={() => onClose()} className={`z-auto h-10 w-40 shadow-md py-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382] `}>
      <div className='flex gap-2 justify-center items-center' >
        <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/x_red.svg" />
        <label className='font-semibold cursor-pointer'>ยกเลิก</label>
      </div></button>
    <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
      <div className='flex gap-2 justify-center items-center' >
        <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
        <label className='font-semibold cursor-pointer'>บันทึก</label>
      </div>
    </button>
    <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
      <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
    </div>
  </div>


  return (
    <ModalComponent button={button} headname={`Detail ${data?.ExtCode || '-'}`} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[80%] h-[80%] min-w-[80%] min-h-[80%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
      <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
        <div className='rounded-lg w-full  bg-[#F3F3F3] shadow-box flex flex-col lg:grid lg:grid-cols-12 gap-4 p-4 '>
          <label className='text-[#4E4E4E] col-span-12 mb-4'>Result</label>
          <div className='flex gap-4 items-center col-span-6'>
            <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ExtCode || ''} onChange={(v) => onChange({ ExtCode: v.target.value })} label="Code:" variant="outlined" />
          </div>
          <div className='flex gap-4 items-center col-span-6 '>
            <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.TestData || ''} onChange={(v) => onChange({ TestData: v.target.value })} label="Test Data:" variant="outlined" />
          </div>

          <div className='flex gap-4 items-center col-span-6'>
            <Toolselect2 sm options={[]} label={"Description:"} value={''} change={''} name={" "}></Toolselect2>
          </div>
          <div className='flex gap-4 items-center col-span-6 '>
            <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Conclusion:" variant="outlined" />
          </div>

          <div className='flex flex-col gap-4 col-span-6'>
            <label className='w-full'> Status:</label>
            <div className='w-full gap-4 flex justify-center items-start'>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="normal" name="Status" value={'TRUE'} checked={form?.NormalStatus === 'TRUE'} onChange={(v) => onChange({ NormalStatus: v.target?.value?.toLocaleUpperCase() })} />
                <label htmlFor="normal" className=''>Normal</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="abnormal" name="Status" value={'FALSE'} checked={form?.NormalStatus === 'FALSE'} onChange={(v) => onChange({ NormalStatus: v.target?.value?.toLocaleUpperCase() })} />
                <label htmlFor="abnormal" className=''>Abnormal</label>
              </div>
            </div>
          </div>
          <div className='flex gap-4 items-center col-span-6 '>
            <div className='relative flex w-full  bg-[#FFFFFF]'>
              <Tooldatepick sm label={"Date Of Autho:"} value={form?.ResultDate || ''} onChange={(ResultDate) => onChange({ ResultDate })}  ></Tooldatepick>
            </div>
          </div>
          <div className='flex gap-4 items-center col-span-6'>
            <TextField size='small' className='text-white w-full bg-[#FFFFFF]' value={form?.Recommend || ''} onChange={(v) => onChange({ Recommend: v.target.value })} label="Recomment" name='Recommend' variant="outlined" />
          </div>
          <div className='flex gap-4 items-center col-span-6 '>
            <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.LabRange || ''} onChange={(v) => onChange({ LabRange: v.target.value })} label="LabRange:" variant="outlined" />
          </div>
          <div className='flex flex-col gap-4 col-span-6'>
            <label className='w-full'> Translate</label>
            <div className='w-full gap-4 flex justify-center items-start'>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="Translate1" name="Translate" value="" onChange={(v) => onChange({ Translate: v.target?.value })} />
                <label htmlFor='Translate1' className=''>ภาษาไทย</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="Translate2" name="Translate" value="" onChange={(v) => onChange({ Translate: v.target?.value })} />
                <label htmlFor='Translate2' className=''>English</label>
              </div>
              <div className='flex gap-2 items-center col-span-12'>
                <input className='w-4 h-4 accent-[#365382]' type="radio" id="Translate3" name="Translate" value="" onChange={(v) => onChange({ Translate: v.target?.value })} />
                <label htmlFor='Translate3' className=''>Japan</label>
              </div>
            </div>
          </div>
          <div className='flex gap-4 items-center col-span-6 '>
            <div className='relative flex w-full  bg-[#FFFFFF]'>
              <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.LabCommentCode || ''} onChange={(v) => onChange({ LabCommentCode: v.target.value })} label="LabCommentCode:" variant="outlined" />
            </div>
          </div>
          <div className='flex gap-4 items-center col-span-6'>
            <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="ConclusionResultHIS:" variant="outlined" />
          </div>
          <div className='flex gap-4 items-center col-span-6 '>
            <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.LabCommentName || ''} onChange={(v) => onChange({ LabCommentName: v.target.value })} label="LabCommentName:" variant="outlined" />
          </div>
          <div className='flex gap-4 items-center col-span-6'>
            <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ResultClassifiedName || ''} onChange={(v) => onChange({ ResultClassifiedName: v.target.value })} label="ResultClassifiedName:" variant="outlined" />
          </div>
          <div className='flex gap-4 items-center col-span-6 '>
            <div className='flex gap-4 items-center justify-start w-full'>
              <input type="checkbox" className='w-5 h-5 accent-[#365382]' id='checkingEKG' name="checkingEKG" checked={form?.Report} onChange={(v) => onChange({ Report: v.target.checked })} />
              <label htmlFor='checkingEKG' className='font-medium'>ออกรายงาน</label>
            </div>
          </div>
        </div>

        <div className={`rounded-lg w-full  ${module === 'docter-result' ? 'bg-[#F3F3F3]' : 'bg-[#EDF4FC]'} shadow-box grid grid-cols-12 gap-4 p-4`}>
          {/* <label className='text-[#365382] col-span-12 mb-4'>Lab Summary</label> */}

          <div className='col-span-12 flex gap-2'>
            <div className='w-full relative col-span-12 grid grid-cols-12 gap-4 justify-center'>
              <div className='flex flex-col gap-2 justify-start col-span-2 mt-2'>
                <button className='h-10 border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]'>
                  Conclusion
                </button>
                <button className='h-10 border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]'>
                  Recomment
                </button>
              </div>
              <div className='flex flex-col gap-4 col-span-10'>
                <div className='w-full flex flex-row gap-4 items-start'>
                  <label className='w-full'>คำแปลผลแลปไทย</label>
                  <TextareaAutosize value={form?.rec_th} onChange={(v) => onChange({ rec_th: v.target.value })} minRows={4} maxRows={12} className="w-full rounded-lg p-2" aria-label="" placeholder="" />
                  <label className='w-full'>คำแปลผลแลปอังกฤษ</label>
                  <TextareaAutosize value={form?.rec_en} onChange={(v) => onChange({ rec_en: v.target.value })} minRows={4} maxRows={12} className="w-full rounded-lg p-2" aria-label="" placeholder="" />
                  <div className='w-40 flex flex-col gap-2 justify-start col-span-2 mt-2'>
                    <button onClick={() => onSavefaveriteLab('TH')} className='w-32 h-10 border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]'>
                      บันทึก
                    </button>
                  </div>
                </div>

                <div className='flex gap-4 col-span-12 justify-start'>
                  <div className='flex flex-col gap-4 items-start w-full'>
                    <table className="tablePatientInformation  w-full  ">
                      <thead className='text-[#4E4E4E]  text-sm '>
                        <tr className="  text-left bg-[#E2E2E2]">
                          <th className="font-light">No.</th>
                          <th className="font-light">Lab Code</th>
                          <th className="font-light">คำแปลผลแลปไทย</th>
                          <th className="font-light ">คำแปลผลแลปอังกฤษ</th>
                          <th className="font-light"> </th>
                        </tr>
                      </thead>
                      <tbody className='text-base font-light'>
                        {list?.length > 0 && list?.map((item, index) => {
                          return <tr key={`TableSetupUser${index}`} className="hover">
                            <td className="text-left ">{index + 1}</td>
                            <td className="text-left whitespace-nowrap">{item?.code || ''}</td>
                            <td className="text-left ">{item?.Desc || ''}</td>
                            <td className="text-left whitespace-nowrap ">{item?.desc_en || ''}</td>
                            <td className="text-left ">
                              <div className='flex gap-2'>
                                <button onClick={() => onEdit(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                  <img width={20} height={20} src="/icon/edit.svg" />
                                </button>

                                <button onClick={() => onDrop(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                  <img width={20} height={20} src="/icon/trashcan.svg" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* <div className='flex   gap-4   col-span-12 justify-start  '>
                  <div className='flex flex-col gap-4 items-start w-full'>
                    <label>คำแปลผลแลปภาษาญี่ปุ่น</label>
                    <TextareaAutosize minRows={3} maxRows={3} className="w-full rounded-lg p-2" aria-label="" placeholder="" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button className='w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label>ล้าง</label>
              </div>
            </button>
            <button className='w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <label>บันทึก</label>
              </div>
            </button>
          </div> */}
        </div>

      </div>
    </ModalComponent>
  )
}

export default Patientlab