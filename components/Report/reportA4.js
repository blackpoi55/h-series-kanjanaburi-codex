'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { metaMonth } from '../Tool/var'

const ReporComponentsA4 = React.forwardRef((props, ref) => {
  const { data } = props
  const [form, setForm] = useState({})
  const [itemlist, setItemList] = useState([])

  useEffect(() => {
    if (data !== null) {
      setForm(data)
    }
  }, [data])

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const { list_Lab = {} } = useMemo(() => {

    // "Rpt_Group": "51" =="CBC"
    // "Rpt_Group": "52" =="FBS"
    // "Rpt_Group": "53"=="Lipid"
    // "Rpt_Group": "54"=="Kidney"
    // "Rpt_Group": "56"=="Liver"
    // "Rpt_Group": "59"=="Urine"
    // "Rpt_Group": "99"=="อื่นๆ"

    const Group = new Set()
    for (const e of data?.trLabs || []) {
      if (!Group.has(e?.msLabCode?.Rpt_Group)) {
        Group.add(e?.msLabCode?.Rpt_Group)
      }
    }
    let datafilter = {}
    for (const e of Group || []) {
      const filteredData = data?.trLabs.sort((a, b) => Number(a?.msLabCode?.sq) - Number(b?.msLabCode?.sq)).filter((item, index) => {
        return item?.msLabCode?.Rpt_Group === e
      })
      const cleanCategory = e.replace(/ /g, '_').replace(/\(/g, '').replace(/\)/g, '')
      datafilter[cleanCategory] = filteredData

    }

    return { list_Lab: datafilter }
  }, [data])

  return <div>
    <style>{`
      @media print {
          @page {
              size: A4;
          }
          .no-print {
              display: none;
          }
      }
  `}</style><div ref={ref} className='flex flex-col text-xs '>
      <div className='report-page flex flex-col'>
        <Header data={form} />
        <Body data={form} list_Lab={list_Lab} />
        <Footer data={form} />
      </div>

      <div className='mt-[20px] no-print'></div>

      <div className='report-page flex flex-col'>
        <Header_Page2 data={form} />
        <Body_Page2 data={form} list_Lab={list_Lab} />
        <Footer_Page2 data={form} />
      </div>
    </div>
  </div>
})


function formatDateToThai(dateString) {
  const date = new Date(dateString);

  // แปลงวัน เดือน และปี
  const day = date.getDate();
  const month = metaMonth[date.getMonth()]?.label;
  const year = date.getFullYear() + 543; // แปลงปีเป็นพุทธศักราช

  // คืนค่ารูปแบบวันที่

  return <div className='flex gap-2'>
    <label>{day}</label>
    <label>{month}</label>
    <label>{year}</label>
  </div>
}
function formatDecimal(value, decimalPlaces = 2) {
  if (value === null || value === undefined) return null;

  const str = String(value).trim();

  // ข้ามค่าที่ไม่ควรแปลง
  if (str === '' || str === '-') return null;

  const num = Number(str);

  if (isNaN(num)) return null;

  return num.toFixed(decimalPlaces);
}
const Header = ({ data }) => {
  return <div className='flex w-full '>
    <div className='w-1/2'>
      <img src="/images/telecorp.png" alt="" />
    </div>

    <div className='w-1/2 text-[10px] leading-4 flex flex-col items-end whitespace-nowrap gap-1'>
      {/* <p className='font-semibold mb-1'>โรงพยาบาลสมิติเวชชลบุรี (Samitivej Chonburi Hospital)</p> */}
      <p className='font-semibold mb-1'>บริษัท เทเลคอร์ป จำกัด</p>
      {/* <p className=''>888/88 หมู่ 3 ถนนสุขุมวิท ต.บ้านสวน อ.เมืองชลบุรี จใชลบุรี 2000 โทรศัพท์</p> */}
      <p className=''>216 /51-52 ถนนกาญจนาภิเษก แขวงทับช้าง เขตสะพานสูง กรุงเทพฯ 10250</p>
      {/* <p className=''>Moo 3 888 88 Sukhumvit Rd, Ban Suan, Chon Buri District, Chon Buri 20000 Tel</p> */}
      <p className=''>216 /51-52 Kanchanaphisek Road, Thap Chang Subdistrict, Saphan Sung District, Bangkok 10250</p>
    </div>
  </div>
}

const Body = ({ data, list_Lab }) => {

  return <div className='w-full h-full grid grid-cols-2 gap-4 text-[10px] leading-4 '>
    <div className='w-full h-full flex flex-col gap-1'>
      <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
        <div className='font-semibold p-1 bg-[#ededed] gap-1 flex flex-col w-full'>
          <p>ชื่อนามสกุล {data?.Prename || ''} {data?.Forename || ''} {data?.Surname || ''}</p>
          <p>HN {data?.HN || '-'}</p>
          <p>{data?.ARName || '-'}</p>
          {/* <p>อายุ {data?.Age || '-'} ปี เพศ {data?.Sex || '-'} วันที่ตรวจ {data?.CheckupDate ? formatDateToThai(data?.CheckupDate) : '-'}</p> */}
          <div className='flex gap-4'>
            <div className='flex gap-2'>
              <label>อายุ</label>
              <label>{data?.Age || '-'}</label>
              <label>ปี</label>
            </div>
            <div className='flex gap-4'>
              <div className='flex gap-2'>
                <label>เพศ</label>
                <label>{data?.Sex || '-'}</label>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex gap-2'>
                <label>วันที่ตรวจ</label>
                <label>{data?.CheckupDate ? formatDateToThai(data?.CheckupDate) : '-'}</label>
              </div>
            </div>
          </div>

        </div>

        <div className='font-normal px-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full'>
          <label className='col-span-4'>น้ำหนัก (Weight) :</label>
          <label className='col-span-3 col-start-5  '>{data?.trVitalSign?.Weight || '-'}</label>
          <label className='col-span-5  col-start-9'>กก.(kg.)</label>

          <label className='col-span-4'>ส่วนสูง (Height) :</label>
          <label className='col-span-3 col-start-5  '>{data?.trVitalSign?.Height || '-'}</label>
          <label className='col-span-5  col-start-9'>ซม.(cm.)</label>

          <label className='col-span-4'>ดัชนีมวลกาย (BMI) :</label>
          <label className='col-span-3 col-start-5  '>{formatDecimal(data?.trVitalSign?.BMI) || '-'}</label>
          <label className='col-span-5  col-start-9'>กก./ตร.ม (kg/m².)</label>
        </div>
        <div className='font-normal p-1 bg-[#ffffff] gap-1 flex flex-col w-full '>
          <p>{data?.trVitalSign?.BMIDetail || '-'}</p>
        </div>

        <div className='font-normal px-2 bg-[#ededed] gap-1 grid grid-cols-12'>
          <label className='col-span-6'>ความดันโลหิต (Blood Pressure) :</label>
          <label className='col-span-2 text-center'>{data?.trVitalSign?.BPDias || '-'}</label>
          <label className='col-span-4'>มม.ปรอท (mmHg)</label>
        </div>
        <div className='font-normal p-1 bg-[#ffffff] gap-1 flex flex-col w-full '>
          <p>{data?.trVitalSign?.BPDetail || '-'}</p>
        </div>

        <div className='font-normal px-2 bg-[#ededed] gap-1 grid grid-cols-12'>
          <label className='col-span-4'>ชีพจร (Pulse rate) :</label>
          <label className='col-span-2 text-center'>{data?.trVitalSign?.PulseRate || '-'}</label>
          <label className='col-span-6'>ครั้งต่อนาที (bpm)</label>
        </div>
        <div className='font-normal p-1 bg-[#ffffff] gap-1 flex flex-col w-full '>
          <p>{data?.trVitalSign?.PulseDetail || '-'}</p>
        </div>

        <div className='font-normal px-2 bg-[#ededed] gap-1 grid grid-cols-12'>
          <label className='col-span-6'>รอบเอว :</label>
          <label className='col-span-6 text-left'>{data?.trVitalSign?.Waist || '-'}</label>
        </div>
        <div className='font-normal p-1 bg-[#ffffff] gap-1 flex flex-col w-full '>
          <p>{data?.trVitalSign?.WaistDetail || '-'}</p>
        </div>

        <div className='font-normal px-2 bg-[#ededed] gap-1 grid grid-cols-12'>
          <label className='col-span-12'>ผลตรวจร่างกาย (Physical Examination) :</label>
          {/* <label className='col-span-6 text-left'>{data?.trVitalSign?.Waist || '-'}</label> */}
        </div>
        <div className='font-normal p-1 bg-[#ffffff] gap-1 flex flex-col w-full '>
          <p>{data?.trPhysicalExamination?.PEResult || '-'}</p>
        </div>
      </div>

      <div className='relative border z-20 border-[#c7ac82] w-full break-inside-avoid my-1 bg-white'>
        {/* กล่องเงา */}
        <div className='absolute top-1 left-1 w-full h-full bg-[#c7ac82] z-10'></div>
        {/* กล่องหลัก */}
        <div className='relative font-semibold z-20 grid grid-cols-12 py-1 px-1 bg-white '>
          <label className='col-span-4 bg-white'>รายการตรวจ</label>
          <label className='col-span-4 bg-white'>ผลตรวจ(Result)</label>
          <label className='col-span-4 bg-white'>ค่าปกติ (Normal Value)</label>
        </div>
      </div>
      {list_Lab['51']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            โลหิตวิทยา(Hematology)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['51']?.length > 0 && list_Lab['51'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 whitespace-nowrap'>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center'>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['51']?.length > 0 && list_Lab['51'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>

        </div>
      }
    </div>

    <div className='w-full h-full flex flex-col gap-1'>
      <div className='relative border z-20 border-[#c7ac82] w-full break-inside-avoid mb-1 bg-white'>
        {/* กล่องเงา */}
        <div className='absolute top-1 left-1 w-full h-full bg-[#c7ac82] z-10'></div>
        {/* กล่องหลัก */}
        <div className='relative font-semibold z-20 grid grid-cols-12 py-1 px-1 bg-white '>
          <label className='col-span-4 bg-white'>รายการตรวจ</label>
          <label className='col-span-4 bg-white'>ผลตรวจ(Result)</label>
          <label className='col-span-4 bg-white'>ค่าปกติ (Normal Value)</label>
        </div>
      </div>

      {list_Lab['52']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            ระดับน้ำตาลในเลือด (Blood Sugar)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['52']?.length > 0 && list_Lab['52'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 whitespace-nowrap'>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center  '>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['52']?.length > 0 && list_Lab['52'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>
        </div>
      }

      {list_Lab['54']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            การทำงานของไต (Kidney Function Test)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['54']?.length > 0 && list_Lab['54'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 whitespace-nowrap'>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center  '>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['54']?.length > 0 && list_Lab['54'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>
        </div>
      }

      {list_Lab['56']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            การทำงานของตับ (Liver Function Test)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['56']?.length > 0 && list_Lab['56'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 whitespace-nowrap'>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center  '>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['56']?.length > 0 && list_Lab['56'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>
        </div>
      }

      {list_Lab['53']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            ผลการตรวจระดับไขมันในเลือด (Lipid Profile)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['53']?.length > 0 && list_Lab['53'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 whitespace-nowrap'>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center  '>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['53']?.length > 0 && list_Lab['53'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>
        </div>
      }

      {list_Lab['55']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            ผลการตรวจระดับกรดยูริกในเลือด (Uric acid Test)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['55']?.length > 0 && list_Lab['55'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 whitespace-nowrap'>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center  '>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['55']?.length > 0 && list_Lab['55'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>

        </div>
      }
    </div>

  </div>
}

const Footer = ({ data }) => {
  return <div className='flex w-full '>

    <div className='w-2/2 text-[10px] leading-4 flex flex-col items-start whitespace-nowrap gap-1'>
      {/* <p className='font-semibold mb-1'>โรงพยาบาลสมิติเวชชลบุรี (Samitivej Chonburi Hospital)</p> */}
      <p className='font-semibold mb-1'>บริษัท เทเลคอร์ป จำกัด</p>
      {/* <p className=''>888/88 หมู่ 3 ถนนสุขุมวิท ต.บ้านสวน อ.เมืองชลบุรี จใชลบุรี 2000 โทรศัพท์</p> */}
      <p className=''>216 /51-52 ถนนกาญจนาภิเษก แขวงทับช้าง เขตสะพานสูง กรุงเทพฯ 10250</p>
      {/* <p className=''>Moo 3 888 88 Sukhumvit Rd, Ban Suan, Chon Buri District, Chon Buri 20000 Tel</p> */}
      <p className=''>216 /51-52 Kanchanaphisek Road, Thap Chang Subdistrict, Saphan Sung District, Bangkok 10250</p>
    </div>
  </div>
}

const Header_Page2 = ({ data }) => {
  return <div className='flex w-full flex-col'>


    <div className='w-full p-1 bg-[#c7ac82]  font-semibold flex justify-between whitespace-nowrap gap-1'>
      <label className=''>{data?.Prename || ''} {data?.Forename || ''} {data?.Surname || ''}</label>
      <label className=''>H.N. {data?.HN}</label>
    </div>

    <div className='relative border z-20 border-[#c7ac82] w-full break-inside-avoid my-1 bg-white'>
      {/* กล่องเงา */}
      <div className='absolute top-1 left-1 w-full h-full bg-[#c7ac82] z-10'></div>
      {/* กล่องหลัก */}
      <div className='relative font-semibold z-20 grid w-full grid-cols-12 gap-4 py-1 px-1 bg-white '>
        <div className='grid grid-cols-12 col-span-6'>
          <label className='col-span-4 bg-white'>รายการตรวจ</label>
          <label className='col-span-4 bg-white'>ผลตรวจ(Result)</label>
          <label className='col-span-4 bg-white'>ค่าปกติ (Normal Value)</label>
        </div>
        <div className='grid grid-cols-12 col-span-6'>
          <label className='col-span-4 bg-white'>รายการตรวจ</label>
          <label className='col-span-4 bg-white'>ผลตรวจ(Result)</label>
          <label className='col-span-4 bg-white'>ค่าปกติ (Normal Value)</label>
        </div>
      </div>
    </div>
  </div>
}

const Body_Page2 = ({ data, list_Lab }) => {

  return <div className='w-full h-full grid grid-cols-2 mt-1 gap-4 text-[10px] leading-4'>
    <div className='w-full h-full flex flex-col gap-1'>

      {list_Lab['59']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            การวิเคราะห์ปัสสาวะ (Urine Analysis)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['59']?.length > 0 && list_Lab['59'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 whitespace-nowrap'>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center  '>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['59']?.length > 0 && list_Lab['59'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>

        </div>
      }
    </div>

    <div className='w-full h-full flex flex-col gap-1'>

      {list_Lab['99']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            ผลการตรวจทางพิษวิทยา (Toxicology)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['99']?.length > 0 && list_Lab['99'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 '>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center  '>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['99']?.length > 0 && list_Lab['99'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>
        </div>
      }

      {list_Lab['57']?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            ผลการตรวจสารบ่งชี้มะเร็ง (Tumor marker)
          </div>

          <div className='font-normal p-2 bg-[#ededed] gap-1 grid grid-cols-12 w-full '>
            {list_Lab['57']?.length > 0 && list_Lab['57'].map((item, i) => {
              if (item?.TestData) {
                return <React.Fragment key={i}>
                  <label className='col-span-4 '>{item?.ItemDesc || '-'}</label>
                  <label className='col-span-3 col-start-5 font-semibold text-center  '>{item?.TestData || '-'}</label>
                  <label className='col-span-5  col-start-9'>{item?.LabRange || '-'} {item?.msLabCode?.Unit || ''}</label>
                </React.Fragment>
              }
            })}
          </div>
          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {list_Lab['57']?.length > 0 && list_Lab['57'].map((item, i) => {
              if (item?.TranslateResult != null && item?.TranslateResult != '' && item?.TranslateResult != '-') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.TranslateResult || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>
        </div>
      }
      {data?.trEKG != null &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            Electrocardiogram (EKG)
          </div>

          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            <label className=' '>{data?.trEKG?.EKGDetail || '-'}</label>
          </div>
        </div>
      }
      {data?.trXrayFromSSBs?.length > 0 &&
        <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
          <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
            เอกซเรย์ทรวงอก (Chest X-ray)
          </div>

          <div className='font-semibold p-1 bg-[#ffffff]  flex flex-col w-full '>
            {data?.trXrayFromSSBs?.length > 0 && data?.trXrayFromSSBs.map((item, i) => {
              if (item?.HSeriesResultDetail != null && item?.HSeriesResultDetail != '' && item?.HSeriesResultDetail != '-' && item?.Code != '14305') {
                return <React.Fragment key={i}>
                  <label className=' '>{item?.NResultDetail || '-'}</label>
                  <label className=' '>{item?.HSeriesResultDetail || '-'}</label>
                </React.Fragment>
              }
            })}
          </div>
        </div>
      }

      <div className='border border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
        <div className='font-semibold p-1 bg-[#c7ac82] gap-1 flex flex-col w-full'>
          สรุปผลการตรวจ และคำแนะนำเพิ่มเติม (Additional Conclusion and Recommendation)
        </div>
        {/* <div className='font-semibold p-2 bg-[#ffffff] gap-1 grid grid-cols-12 w-full '> */}
        <div className='flex flex-col gap-2 p-2 font-semibold'>
          {data?.trPhysicalExamination?.conclusion && <div className='col-span-4  '>
            <p>{data?.trPhysicalExamination?.conclusion || ''}</p>
          </div>
          }

          {data?.trPhysicalExamination?.medication && <div className='col-span-4  '>
            <p>{data?.trPhysicalExamination?.medication || ''}</p>
          </div>
          }

          {data?.trPhysicalExamination?.recommendation && <div className='col-span-4  '>
            <p>{data?.trPhysicalExamination?.recommendation || ''}</p>
          </div>}

          {data?.trPhysicalExamination?.followup && <div className='col-span-4  '>
            <p>{data?.trPhysicalExamination?.followup || ''}</p>
          </div>
          }
          {/* <label className='col-span-4 '>{data?.trPhysicalExamination?.recommendation || '-'}</label> */}
        </div>
      </div>
    </div>

  </div>
}

const Footer_Page2 = ({ data }) => {
  return <div className='flex w-full '>

    <div className='w-1/2 text-[10px] leading-4 flex flex-col items-start whitespace-nowrap gap-1'>
      {/* <p className='font-semibold mb-1'>โรงพยาบาลสมิติเวชชลบุรี (Samitivej Chonburi Hospital)</p> */}
      <p className='font-semibold mb-1'>บริษัท เทเลคอร์ป จำกัด</p>
      {/* <p className=''>888/88 หมู่ 3 ถนนสุขุมวิท ต.บ้านสวน อ.เมืองชลบุรี จใชลบุรี 2000 โทรศัพท์</p> */}
      <p className=''>216 /51-52 ถนนกาญจนาภิเษก แขวงทับช้าง เขตสะพานสูง กรุงเทพฯ 10250</p>
      {/* <p className=''>Moo 3 888 88 Sukhumvit Rd, Ban Suan, Chon Buri District, Chon Buri 20000 Tel</p> */}
      <p className=''>216 /51-52 Kanchanaphisek Road, Thap Chang Subdistrict, Saphan Sung District, Bangkok 10250</p>
    </div>

    <div className='w-1/2 text-[10px] leading-4 flex flex-col items-start whitespace-nowrap gap-1'>
      <p className='font-semibold mb-1 text-center w-full'>แพทย์ตรวจสุขภาพ (Doctor) : .............................................................................</p>
      <p className='font-semibold text-center w-full'>{data?.HisVisitCareProvider?.split(',')[1] || ''} {'xxx xxx'}</p>
      <p className='font-semibold w-full text-center'>{data?.HisVisitCareProviderLicenseID || '-'}</p>
    </div>
  </div>
}


export default ReporComponentsA4