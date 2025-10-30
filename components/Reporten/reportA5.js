'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { metaMonth } from '../Tool/var'
import moment from 'moment'
import 'moment/locale/th'
function formatDateToThai(dateString) {
  const date = new Date(dateString);

  // แปลงวัน เดือน และปี
  const day = date.getDate();
  const month = metaMonth[date.getMonth()]?.labelEn;
  const year = date.getFullYear() ; //+543 แปลงปีเป็นพุทธศักราช

  // คืนค่ารูปแบบวันที่

  return <div className='flex gap-2'>
    <label>{day}</label>
    <label>{month}</label>
    <label>{year}</label>
  </div>
}

const ReporComponentsA5 = React.forwardRef((props, ref) => {
  const { data } = props
  const [form, setForm] = useState({})
  const [details, setDetails] = useState({})

  const [itemlist, setItemList] = useState([])

  useEffect(() => {
    if (data !== null) {
      setForm(data?.data || null)
      setDetails({
        HN: data?.data?.HN || null,
        Prename: data?.data?.Prename || null,
        Forename: data?.data?.Forename || null,
        Surname: data?.data?.Surname || null,
        CheckupDate: data?.data?.CheckupDate || null,
      })
    }
  }, [data])

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const _smok = [
    'SmokingNone',
    'SmokingVolumes',
    'SmokingYears',
    'SmokingQuitDetail2',
    'SmokingQuitOther',
    'SmokingYear',
    'SmokingMonth',
    'SmokingRemark'
  ]
  function mapSmoking(data) {
    console.log('data', data)
    let datavar = ''
    if (data) {
      for (const e of _smok || []) {
        if (data[e]) {
          if (e === 'SmokingVolumes') {
            datavar = datavar + " " + data[e] + ' มวน/วัน'
          } else if (e === 'SmokingYears') {
            datavar = datavar + " " + data[e] + ' ปี'
          } else if (e === 'SmokingQuitDetail2') {
            datavar = datavar + " " + data[e] + ' เดือน'
          } else if (e === 'SmokingQuitOther') {
            datavar = datavar + " " + 'ปริมาณก่อนเลิก ' + data[e] + ' มวน/วัน'
          } else if (e === 'SmokingYear') {
            datavar = datavar + " " + data[e] + ' ปี'
          } else if (e === 'SmokingMonth') {
            datavar = datavar + " " + data[e] + ' เดือน'
          } else {
            datavar = datavar + " " + data[e]
          }
          console.log('datavar', e, datavar)
        }
      }
    }
    return datavar
  }

  const _Alcohol = [
    'Alcohol',
    'AlcoholYears',
    'AlcoholVolume',
    'AlcoholicDrinkYear',
    'AlcoholicDrinkMonth'
  ]
  function mapAlcohol(data) {
    console.log('data', data)
    let datavar = ''
    if (data) {
      for (const e of _Alcohol || []) {
        if (data[e]) {
          if (e === 'AlcoholYears') {
            datavar = datavar + " " + data[e] + ' ปี'
          } else if (e === 'AlcoholVolume') {
            datavar = datavar + " " + data[e] + ' เดือน'
          } else if (e === 'AlcoholicDrinkYear') {
            datavar = datavar + " " + data[e] + ' ปี'
          } else if (e === 'AlcoholicDrinkMonth') {
            datavar = datavar + " " + data[e] + ' เดือน'
          } else {
            datavar = datavar + " " + data[e]
          }
          console.log('datavar', e, datavar)
        }
      }
    }
    return datavar
  }

  const _Exercise = [
    'Exercise',
    'ExerciseType'
  ]
  function mapExercise(data) {
    console.log('data', data)
    let datavar = ''
    if (data) {
      for (const e of _Exercise || []) {
        if (data[e]) {
          if (e === 'ExerciseType') {
            datavar = datavar + " " + 'ชนิดกีฬา: ' + data[e]
          } else {
            datavar = datavar + " " + data[e]
          }
          console.log('datavar', e, datavar)
        }
      }
    }
    return datavar
  }

  const { list_Lab = {}, Group = [] } = useMemo(() => {

    // "Rpt_Group": "51" =="CBC"
    // "Rpt_Group": "52" =="FBS"
    // "Rpt_Group": "53"=="Lipid"
    // "Rpt_Group": "54"=="Kidney"
    // "Rpt_Group": "56"=="Liver"
    // "Rpt_Group": "59"=="Urine"
    // "Rpt_Group": "99"=="อื่นๆ"


    // แบ่ง page 1-3 ฟิก 
    // page 4 = โลหิตวิทยา (Hematology)  51
    // page 5 = ผลการตรวจระดับน้ำตาลในเลือด (Blood Sugar) 52 ,ผลการตรวจระดับไขมันในเลือด (Lipid Profile) 53 ,ผลการตรวจระดับกรดยูริกในเลือด (Uric acid Test) 55
    // page 6 = ผลการตรวจการทำงานของตับ (Liver Function Tests) 56,ผลการตรวจการทำงานของไต (Kidney Function Tests) 54
    // page 7 = ผลการตรวจวิเคราะห์ปัสสาวะ (Urine Analysis) 59
    // page 8 = ผลการตรวจอุจจาระ (Stool Examination) 60 , Faecal Occult Blood & Inflammation Screening
    // page 9 = ผลการตรวจทางพิษวิทยา (Toxicology) 99
    // page 10 = ผลการตรวจสายตาและตาบอดสี (Visual Acuity and Color Vision Test) , ผลการตรวจสมรรถภาพการมองเห็นในงานอาชีวอนามัย (Occupational Vision Test) , คลื่นไฟฟ้าหัวใจ (EKG)
    // page 11 = เอกซเรย์ทรวงอก (Chest X-ray)
    // page 12 = ผลการตรวจแมมโมแกรมและอัลตร้าซาวด์เต้านม (Bilateral Mammography & Breast Sonogram)
    // page 13 = ผลการตรวจภายใน (ThinPrep Pap Test)
    // page 14 = ผลการตรวจสมรรถภาพการได้ยินในงานอาชีวอนามัย (Occupational Health Audiometry) , การตรวจสมรรถภาพปอด(Pulmonary Function Test : Spirometry)
    // page 15 = สรุปผลการตรวจ และคำแนะนำเพิ่มเติม (Additional Conclusions and Recommendations)
    // page 16 = End

    const title = {
      '51': 'Hematology',
      '52': "Blood Chemistry",
      '53': "Blood Chemistry",
      '55': "Blood Chemistry",
      '56': null,
      '54': null,
      '59': "Urine Analysis",
      '60': null,
      '99': "Toxicology",

    }

    const header = {
      '51': "Hematology",
      '52': "Blood Sugar",
      '53': "Lipid Profile",
      '55': "Uric acid Test",
      '56': "Liver Function Tests",
      '54': "Kidney Function Tests",
      '59': "Urine Analysis",
      '60': "Stool Examination",
      '99': "Toxicology",

      '901': "Visual Acuity and Color Vision Test",
      '902': "Occupational Vision Test",
      '903': "Electrocardiogram (EKG)",
      '904': "Chest X-ray",
      '905': "Ultrasound Whole Abdomen",
      '800': 'Digital Mammograms',
      '801': 'Ultrasound Transvaginal',
      '906': "ThinPrep Pap Test",
      '907': "Occupational Health Audiometry",
      '908': "Pulmonary Function Test : Spirometry",
      '909': "Additional Conclusions and Recommendations",
    }

    let PageGroup = [
      ['001'],
      ['002'],
      ['003'],
      ['51'],
      ['52', '53', '55'],
      ['56', '54'],
      ['59'],
      ['60'],
      ['99'],
      ['901', '902', '903'],
      ['907', '908'],
      ['904'],
      ['905'],
      ['800'],
      ['801'],
      ['906'],
      ['909'],
      ['999'], //end
    ]

    console.log('PageGroup', PageGroup)

    const _Group = new Set()
    for (const e of data?.comparLab || []) {
      if (!_Group.has(e?.msLabCode?.Rpt__Group)) {
        _Group.add(e?.msLabCode?.Rpt_Group)
      }
    }

    let datafilter = {}
    for (const e of _Group || []) {
      const filteredData = data?.comparLab.sort((a, b) => Number(a?.msLabCode?.sq) - Number(b?.msLabCode?.sq)).filter((item, index) => {
        return item?.msLabCode?.Rpt_Group === e
      })
      const cleanCategory = e?.replace(/ /g, '_').replace(/\(/g, '').replace(/\)/g, '')
      datafilter[cleanCategory] = filteredData

    }

    //ปั้นนข้อมูล แยกตามกลุ่ม ตามโครงสร้างของ PageGroup
    const mapGroup = PageGroup.map((item, index) => {
      const matchedFilter = Object.keys(datafilter).find(field => item.includes(field))
      // เงื่อนไขที่ตรงกับ "001"
      if (item?.includes('001')) {
        return {
          Address: form?.Address || '-',
          Mobile: form?.Mobile || '-',
          Prename: form?.Prename || '-',
          Forename: form?.Forename || '-',
          Surname: form?.Surname || '-',
          Sex: form?.Sex || '-',
          HN: form?.HN || '-',
          HisVisitCareProvider: form?.HisVisitCareProvider || '-',
          CheckupDate: form?.CheckupDate || '-',
        }
      }

      // เงื่อนไขที่ตรงกับ "002"
      if (item?.includes('002')) {
        return {
          //Smoking
          SmokingNone: form?.trPatientHistory?.SmokingNone || '-',
          SmokingVolumes: form?.trPatientHistory?.SmokingVolumes || '-',
          SmokingYears: form?.trPatientHistory?.SmokingYears || '-',
          SmokingQuitDetail2: form?.trPatientHistory?.SmokingQuitDetail2 || '-',
          SmokingQuitOther: form?.trPatientHistory?.SmokingQuitOther || '-',
          SmokingYear: form?.trPatientHistory?.SmokingYear || '-',
          SmokingMonth: form?.trPatientHistory?.SmokingMonth || '-',
          SmokingRemark: form?.trPatientHistory?.SmokingRemark || '-',
          detailsSmoking: mapSmoking(form?.trPatientHistory || null),

          //Alcohol
          Alcohol: form?.trPatientHistory?.Alcohol || '-',
          AlcoholYears: form?.trPatientHistory?.AlcoholYears || '-',
          AlcoholVolume: form?.trPatientHistory?.AlcoholVolume || '-',
          AlcoholicDrinkYear: form?.trPatientHistory?.AlcoholicDrinkYear || '-',
          AlcoholicDrinkMonth: form?.trPatientHistory?.AlcoholicDrinkMonth || '-',
          detailsAlcohol: mapAlcohol(form?.trPatientHistory || null),

          //Exercise
          Exercise: form?.trPatientHistory?.Exercise || '-',
          ExerciseType: form?.trPatientHistory?.ExerciseType || '-',
          detailsExercise: mapExercise(form?.trPatientHistory || null),

          PersonalHistoryAdmission_detail: form?.trPatientHistory?.PersonalHistoryAdmission_detail || '-',
          PresentDisease: form?.trPatientHistory?.PresentDisease || '-',
          PassDisease: form?.trPatientHistory?.PassDisease || '-',
          PHComment: form?.trPatientHistory?.PHComment || '-',
          PersonalHistoryChange: form?.trPatientHistory?.PersonalHistoryChange || '-',
          PersonalHistoryCurrentMedication: form?.trPatientHistory?.PersonalHistoryCurrentMedication || '-',
          PersonalHistoryAllergy: form?.trPatientHistory?.PersonalHistoryAllergy || '-',
          PersonalHistoryAccident: form?.trPatientHistory?.PersonalHistoryAccident || '-',
          PersonalHistorySurgery: form?.trPatientHistory?.PersonalHistorySurgery || '-',
          PersonalHistoryAdmission: form?.trPatientHistory?.PersonalHistoryAdmission || '-',
          PersonalHistoryPresentIllness: form?.trPatientHistory?.PersonalHistoryPresentIllness || '-',

          //ประวัติครอบครัว
          FamilyHistoryOtherDetail: form?.trPatientHistory?.FamilyHistoryOtherDetail || '-'

        }  // กรณีที่ยังไม่มีข้อมูล กำหนดค่า object ว่าง
      }

      // เงื่อนไขที่ตรงกับ "003"
      if (item?.includes('003')) {
        return {
          Height: form?.trVitalSign?.Height || '-',
          Weight: form?.trVitalSign?.Weight || '-',
          BMI: form?.trVitalSign?.BMI || '-',
          BMIDetail: form?.trVitalSign?.BMIDetail || '-',
          BPSys: form?.trVitalSign?.BPSys || '-',
          BPDias: form?.trVitalSign?.BPDias || '-',
          BPDetail: form?.trVitalSign?.BPDetail || '-',
          PulseRate: form?.trVitalSign?.PulseRate || '-',
          PulseDetail: form?.trVitalSign?.PulseDetail || '-',
          Waist: form?.trVitalSign?.Waist || '-',
          WaistDetail: form?.trVitalSign?.WaistDetail || '-',
          PEResult: form?.trPhysicalExamination?.PEResult || '-',
        }
      }

      if (item?.includes('901')) {
        const filteredData = item.reduce((acc, field) => {
          const fieldname = { '901': 'trTitmu', '902': 'trVisualPerformance', '903': 'trEKG' }
          if (form[fieldname[field]]) {
            // รวมค่าจาก datafilter[field] กับ heading และ push เป็น array
            if (fieldname[field] === 'trEKG') {
              //if (form[fieldname[field]]?.some((d) => d.Code === '14305')) {
              // หาค่าใน form[fieldname[field]] ที่ตรงกับ Code '14305'
              const matchedData = form[fieldname[field]];//.find((d) => d.Code === '14305'
              // ถ้าพบ ให้ push ลงใน acc
              if (matchedData) {
                acc.push({ ...matchedData, header: header[field] });
              }
              // }
            } else {
              acc.push({ ...form[fieldname[field]], header: header[field] });
            }
          }
          return acc;
        }, []);
        return filteredData;
      }

      if (item?.includes('904')) {
        const filteredData = item.reduce((acc, field) => {
          const fieldname = { '904': 'trXrayFromSSBs' }
          let dataO = {}
          if (form[fieldname[field]]) {
            // รวมค่าจาก datafilter[field] กับ heading และ push เป็น array
            if (fieldname[field] === 'trXrayFromSSBs') {
              if (form[fieldname[field]]?.some((d) => d.Code === '03GX01')) {
                // หาค่าใน form[fieldname[field]] ที่ตรงกับ Code '03GX01'
                const matchedData = form[fieldname[field]].find((d) => d.Code === '03GX01');
                // ถ้าพบ ให้ push ลงใน acc
                // code เดิม acc.push({ ...matchedData, header: header[field] });
                if (matchedData) {
                  dataO.ID03GX01 = { ...matchedData }
                  dataO.header = header[field]
                }
              }
              // if (form[fieldname[field]]?.some((d) => d.Code === '03GXX80')) {
              //   // หาค่าใน form[fieldname[field]] ที่ตรงกับ Code '03GXX80'
              //   const matchedData = form[fieldname[field]].find((d) => d.Code === '03GXX80');
              //   // ถ้าพบ ให้ push ลงใน acc
              //   if (matchedData) {
              //     dataO.ID03GXX80 = { ...matchedData }
              //     dataO.header = header[field]
              //   }
              // }
            } else {
              acc.push({ ...form[fieldname[field]], header: header[field] });
            }
          }
          if (Object.keys(dataO).length !== 0) {
            acc.push(dataO)
          }
          console.log('acc', acc)
          return acc;
        }, []);
        return filteredData;
      }

      if (item?.includes('905')) {
        const filteredData = item.reduce((acc, field) => {
          const fieldname = { '905': 'trXrayFromSSBs' }
          let dataO = {}
          if (form[fieldname[field]]) {
            // รวมค่าจาก datafilter[field] กับ heading และ push เป็น array
            if (fieldname[field] === 'trXrayFromSSBs') {

              if (form[fieldname[field]]?.some((d) => d.Code === '03UT22')) {
                // หาค่าใน form[fieldname[field]] ที่ตรงกับ Code '03UT22'
                const matchedData = form[fieldname[field]].find((d) => d.Code === '03UT22')
                // ถ้าพบ ให้ push ลงใน acc
                if (matchedData) {
                  dataO.ID03UT22 = { ...matchedData }
                  dataO.header = header[field]
                }
              }
              // if (form[fieldname[field]]?.some((d) => d.Code === '03UT19')) {
              //   // หาค่าใน form[fieldname[field]] ที่ตรงกับ Code '03UT19'
              //   const matchedData = form[fieldname[field]].find((d) => d.Code === '03UT19')
              //   // ถ้าพบ ให้ push ลงใน acc
              //   if (matchedData) {
              //     dataO.ID03UT19 = { ...matchedData }
              //     dataO.header = header[field]
              //   }
              // }
            } else {
              acc.push({ ...form[fieldname[field]], header: header[field] })
            }
          }
          if (Object.keys(dataO).length !== 0) {
            acc.push(dataO)
          }
          return acc
        }, []);
        return filteredData;
      }
      if (item?.includes('800')) {
        const filteredData = item.reduce((acc, field) => {
          const fieldname = { '800': 'trXrayFromSSBs' }
          let dataO = {}
          if (form[fieldname[field]]) {
            // รวมค่าจาก datafilter[field] กับ heading และ push เป็น array
            if (fieldname[field] === 'trXrayFromSSBs') {

              if (form[fieldname[field]]?.some((d) => d.Code === '03GXX80')) {
                // หาค่าใน form[fieldname[field]] ที่ตรงกับ Code '03UT22'
                const matchedData = form[fieldname[field]].find((d) => d.Code === '03GXX80')
                // ถ้าพบ ให้ push ลงใน acc
                if (matchedData) {
                  dataO.ID03GXX80 = { ...matchedData }
                  dataO.header = header[field]
                }
              }
            } else {
              acc.push({ ...form[fieldname[field]], header: header[field] })
            }
          }
          if (Object.keys(dataO).length !== 0) {
            acc.push(dataO)
          }
          return acc
        }, []);
        return filteredData;
      }
      if (item?.includes('801')) {
        const filteredData = item.reduce((acc, field) => {
          const fieldname = { '801': 'trXrayFromSSBs' }
          let dataO = {}
          if (form[fieldname[field]]) {
            // รวมค่าจาก datafilter[field] กับ heading และ push เป็น array
            if (fieldname[field] === 'trXrayFromSSBs') {

              if (form[fieldname[field]]?.some((d) => d.Code === '03UT19')) {
                // หาค่าใน form[fieldname[field]] ที่ตรงกับ Code '03UT22'
                const matchedData = form[fieldname[field]].find((d) => d.Code === '03UT19')
                // ถ้าพบ ให้ push ลงใน acc
                if (matchedData) {
                  dataO.ID03UT19 = { ...matchedData }
                  dataO.header = header[field]
                }
              }
            } else {
              acc.push({ ...form[fieldname[field]], header: header[field] })
            }
          }
          if (Object.keys(dataO).length !== 0) {
            acc.push(dataO)
          }
          return acc
        }, []);
        return filteredData;
      }

      if (item?.includes('906')) {
        const filteredData = item.reduce((acc, field) => {
          const fieldname = { '906': 'trOBG_PAP' }
          if (form[fieldname[field]]) {
            acc.push({ ...form[fieldname[field]], header: header[field] });
          }
          return acc;
        }, []);
        return filteredData;
      }

      if (item?.includes('907')) {
        const filteredData = item.reduce((acc, field) => {
          const fieldname = { '907': 'trAudio', '908': 'trSpiro' }
          if (form[fieldname[field]]) {
            acc.push({ ...form[fieldname[field]], header: header[field] });
          }
          return acc;
        }, []);
        return filteredData;
      }

      if (item?.includes('909')) {
        const filteredData = item.reduce((acc, field) => {
          const fieldname = { '909': 'trPhysicalExamination' }
          if (form[fieldname[field]]) {
            acc.push({ ...form[fieldname[field]], header: header[field] });
          }
          return acc;
        }, []);
        return filteredData;
      }

      //หน้าสุดท้าย
      if (item?.includes('999')) {
        return {

        }
      }
      // เงื่อนไขที่ตรงกับ matchedFilter
      if (matchedFilter) {
        const filteredData = item.reduce((acc, field) => {
          if (datafilter[field]) {
            // รวมค่าจาก datafilter[field] กับ heading และ push เป็น array
            acc.push([...Object.values(datafilter[field]), title[field], header[field]]);
          }
          return acc;
        }, []);

        return filteredData; // return array ไม่ต้องมีชื่อฟิลด์ระบุ
      }


      return null // กรณีที่ไม่เข้าเงื่อนไขใดๆ
    }).filter(item => item !== null && !(Array.isArray(item) && item.length === 0));

    return { list_Lab: mapGroup, Group: Array.from(_Group) }
  }, [form])

  console.log('list_Lab ข้อมูลที่จัดสำหรับทำรีพอร์ต', list_Lab)
  console.log('Group ที่เจอใน api', Group)
  console.log('form ข้อมูลทั้งหมด', form)

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
    `}</style>
    <div ref={ref} className='flex flex-col text-xs '>


      {list_Lab?.length > 0 && list_Lab?.map((_page, index) => {
        if (index + 1 != list_Lab.length) {
          // วันที่ในตาราง ถ้าข้อมูลชุดแรกไม่มีให้มีดูตัวอื่นในกลุ่มเดียวกัน
          let ResultDate = _page.length > 0 && _page.find((in_page) =>
            Array.isArray(in_page) && in_page.find((d) => d?.ResultDate)
          )?.find((d) => d?.ResultDate)?.ResultDate || null;

          let ResultDate2 = _page.length > 0 && _page.find((in_page) =>
            Array.isArray(in_page) && in_page.find((d) => d?.ResultDate2)
          )?.find((d) => d?.ResultDate2)?.ResultDate2 || null;

          let ResultDate3 = _page.length > 0 && _page.find((in_page) =>
            Array.isArray(in_page) && in_page.find((d) => d?.ResultDate3)
          )?.find((d) => d?.ResultDate3)?.ResultDate3 || null;

          return <React.Fragment key={`list_Lab${index}`} >
            <BodyComponentsA5 details={details} page={index + 1} someKey={`ComponentsA5list_Lab${index}`} >
              {/* page 1 fix */}
              {index === 0 &&
                <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                  <div className='w-full h-full flex flex-col gap-1'>
                    <div className='border-2 border-[#c7ac82] flex flex-col w-full break-inside-avoid '>
                      <div className='justify-center items-center px-20 py-10 mt-24 mx-16 mb-4 border-2 border-[#c7ac82] flex flex-col gap-6 text-[#186145] text-xl font-semibold'>
                        <p className=''>Health Check Up</p>
                        <p className=''>Medical Check - up Report</p>
                      </div>
                      <div className='w-full flex justify-center'>
                        <div className=' border-b-2 border-[#c7ac82] w-[95%] flex'></div>
                      </div>

                      <div className='px-16 text-lg w-full mt-6 flex flex-col items-start gap-6'>
                        <label className=''>Patient</label>
                        <p className='w-[40%]'>{_page?.Address || ''}</p>
                        <p className=''>Phone Number : {_page?.Mobile || '-'}</p>

                        <div className='w-full justify-center items-start flex flex-col gap-4 font-semibold pb-10'>
                          <div className='grid grid-cols-12 gap-4 w-full'>
                            <label className='text-right col-span-4'>Name : </label>
                            <label className='text-left col-span-8'>{_page?.Prename || ''} {_page?.Forename || ''} {_page?.Surname || ''}</label>
                          </div>
                          <div className='grid grid-cols-12 gap-4 w-full '>
                            <label className='text-right col-span-4'>Gender : </label>
                            <label className='text-left col-span-8'>{_page?.Sex || '-'}</label>
                          </div>
                          <div className='grid grid-cols-12 gap-4 w-full '>
                            <label className='text-right col-span-4'>HN : </label>
                            <label className='text-left col-span-8'>{_page?.HN || '-'}</label>
                          </div>
                          <div className='grid grid-cols-12 gap-4 w-full '>
                            <label className='text-right col-span-4'>Date : </label>
                            <label className='text-left col-span-8'>{_page?.CheckupDate ? formatDateToThai(_page?.CheckupDate) : '-'}</label>
                          </div>
                        </div>

                        <label className='text-center w-full pb-24'>{_page?.HisVisitCareProvider?.split(',')[1] || ''} {'xxx xxx'}</label>
                      </div>

                    </div>
                  </div>
                </div>
              }
              {/* page 2 fix */}
              {index === 1 &&
                <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                  <div className='border-2 border-[#c7ac82] mb-2 flex flex-col'>
                    <div className='flex flex-col text-base'>
                      <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>Personal History</div>
                      <div className='flex gap-4 p-2'>
                        <label>Smoking :</label>
                        <label>{_page?.detailsSmoking || '-'}</label>
                      </div>

                      <div className='flex gap-4 p-2'>
                        <label>Alcohol Consumption :</label>
                        <label>{_page?.detailsAlcohol || '-'}</label>
                      </div>

                      <div className='flex gap-4 p-2'>
                        <label>Exercise :</label>
                        <label>{_page?.detailsExercise || ''}</label>
                      </div>
                    </div>

                    <div className='flex flex-col text-base h-[200px]'>
                      <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>Family History</div>
                      <div className='grid grid-cols-12 gap-4 w-full'>
                        {/* <label className='text-right col-span-4'>ประวัติการเจ็บป่วยในครอบครัว : </label> */}
                        <label className='text-left col-span-8 pl-2'>{_page?.FamilyHistoryOtherDetail || ''}</label>
                      </div>
                    </div>

                    <div className='flex flex-col text-base'>
                      <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>General History</div>
                      <div className='flex gap-4 p-2'>
                        <label>Congenital Disease :</label>
                        <label>{_page?.PHComment || '-'}</label>
                      </div>

                      <div className='flex gap-4 p-2'>
                        <label>Symptoms :</label>
                        <label>{_page?.PersonalHistoryPresentIllness || '-'}</label>
                      </div>

                      <div className='flex gap-4 p-2'>
                        <label>Regular medication :</label>
                        <label>{_page?.PersonalHistoryCurrentMedication || '-'}</label>
                      </div>

                      <div className='flex gap-4 p-2'>
                        <label>Allergy :</label>
                        <label>{_page?.PersonalHistoryAllergy || '-'}</label>
                      </div>
                    </div>

                    <div className='flex flex-col text-base '>
                      <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>Past History</div>
                      <div className='flex gap-4 p-2'>
                        <label>Accident :</label>
                        <label>{_page?.PersonalHistoryAccident || '-'}</label>
                      </div>

                      <div className='flex gap-4 p-2'>
                        <label>Operation :</label>
                        <label>{_page?.PersonalHistorySurgery || '-'}</label>
                      </div>

                      <div className='flex gap-4 p-2'>
                        <label>Hospital Admission :</label>
                        <label>{_page?.PersonalHistoryAdmission_detail || '-'}</label>
                      </div>

                      <div className='flex gap-4 p-2'>
                        <label>Past Illness :</label>
                        <label>{_page?.PresentDisease || '-'}</label>
                      </div>
                    </div>
                  </div>
                </div>
              }

              {/* page 3 fix */}
              {index === 2 &&
                <div className='w-full h-full content-start grid grid-cols-1   text-[10px] leading-4 pl-2'>
                  <div>
                    <div className='border-2 border-[#c7ac82] mb-2 flex flex-col'>
                      <div className='flex flex-col text-base '>
                        <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>Physical Examination</div>

                        <div className='flex flex-col '>
                          <div className='grid grid-cols-12 gap-4 px-1 pt-2'>
                            <label className='col-span-3 text-left'>Height :</label>
                            <label className='col-span-4 text-center'>{_page?.Height || '-'}</label>
                            <label className='col-span-5 text-left'>cm.</label>
                          </div>
                          <div className='grid grid-cols-12 gap-4 px-1 pt-2'>
                            <label className='col-span-3 text-left'>Weight :</label>
                            <label className='col-span-4 text-center'>{_page?.Weight || '-'}</label>
                            <label className='col-span-5 text-left'>kg.</label>
                          </div>
                          <div className='grid grid-cols-12 gap-4 px-1 py-2'>
                            <label className='col-span-3 text-left'>BMI :</label>
                            <label className='col-span-4 text-center'>{_page?.BMI || '-'}</label>
                            <label className='col-span-5 text-left'>kg/m².</label>
                          </div>
                          <div className='bg-[#e1e1e1] flex p-3 col-span-12'>{_page?.BMIDetail || '-'}</div>

                          <div className='grid grid-cols-12 gap-4 px-1 py-2'>
                            <label className='col-span-3 text-left whitespace-nowrap'>Blood Pressure :</label>
                            <label className='col-span-4 text-center'>{_page?.BPSys || '-'}/{_page?.BPDias || '-'}</label>
                            <label className='col-span-5 text-left'>mmHg</label>
                          </div>
                          <div className='bg-[#e1e1e1] flex p-3 col-span-12'>{_page?.BPDetail || '-'}</div>

                          <div className='grid grid-cols-12 gap-4 px-1 py-2'>
                            <label className='col-span-3 text-left whitespace-nowrap'>Pulse rate :</label>
                            <label className='col-span-4 text-center'>{_page?.PulseRate || '-'}</label>
                            <label className='col-span-5 text-left'>beat per minute</label>
                          </div>
                          <div className='bg-[#e1e1e1] flex p-3 col-span-12'>{_page?.PulseDetail || '-'}</div>

                          <div className='grid grid-cols-12 gap-4 px-1 py-2'>
                            <label className='col-span-3 text-left whitespace-nowrap'>Waist :</label>
                            <label className='col-span-4 text-center'>{_page?.Waist || '-'}</label>
                            <label className='col-span-5 text-left'>in</label>
                          </div>
                          <div className='bg-[#e1e1e1] flex p-3 col-span-12'>
                            <p>{_page?.WaistDetail || '-'}</p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='h-[200px]'>
                    <div className='border-2 h-full border-[#c7ac82] mb-2 flex flex-col'>
                      <div className='flex flex-col text-base '>
                        <div className='flex flex-col '>
                          <div className='flex gap-4 px-1 pt-2'>
                            <label className='col-span-3 text-left whitespace-nowrap'>Physical examination :</label>
                            <label className='col-span-4 text-center'>{_page?.PEResult || '-'}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* page 4...5...6...100 map */}

              {_page?.length > 0 && _page?.map((item_page, sub_index) => {
                //พวกที่มีฟิว header จะเป็นหน้าหลังๆ ที่มีการจัดข้อมูลไม่เหมือนกัน
                if (item_page?.header) {
                  // ผลการตรวจสายตาและตาบอดสี (Visual Acuity and Color Vision Test)
                  if (item_page?.header === "ผลการตรวจสายตาและตาบอดสี (Visual Acuity and Color Vision Test)")
                    return <div>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>
                            <div className='flex gap-4 p-2'>
                              <label className='font-semibold'> Snellen Chart :</label>
                              <label>{item_page?.VADetail || '-'}</label>
                            </div>

                            <div className='flex gap-4 p-2'>
                              <label className='font-semibold'>Visual Acuity :</label>
                              <label>Right {item_page?.VARt || '-'} Left {item_page?.VALt || '-'}</label>
                            </div>

                            <div className='flex gap-4 p-2'>
                              <label className='font-semibold'>AutoRefract :</label>
                              <label>{item_page?.AutoRefractDetail || '-'}</label>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>

                  // ผลการตรวจสมรรถภาพการมองเห็นในงานอาชีวอนามัย (Occupational Vision Test)
                  if (item_page?.header === "ผลการตรวจสมรรถภาพการมองเห็นในงานอาชีวอนามัย (Occupational Vision Test)")
                    return <div>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>
                            <div className='flex flex-col gap-2 p-2'>
                              <div className='flex gap-2  '>
                                <label className=''>glasses or contact lenses :</label>
                                <label>{item_page?.wearing_eyeglasses_or_contact_lenses || '-'}</label>
                              </div>

                              <div className='flex gap-2 '>
                                <label className=''>Far Test :</label>
                                <label>{item_page?.far_test || '-'}</label>
                              </div>

                              <div className='flex gap-2  '>
                                <label className=''>Near Test :</label>
                                <label>{item_page?.near_test || '-'}</label>
                              </div>

                              <div className='flex gap-2  '>
                                <label className=''>Job Group :</label>
                                <label>{item_page?.job_group || '-'}</label>
                              </div>

                              <div className='flex gap-2 '>
                                <label className=''>Vision Screener :</label>
                                <label>{item_page?.eye_examination || '-'}</label>
                              </div>
                            </div>
                            <div className="grid grid-cols-7 text-center text-xs   content-stretch">
                              <label className="px-2 py-2 w-full border-t-2 border-r-2 border-[#c7ac82]"> Binocular vision</label>
                              <label className="px-2 py-2 w-full border-t-2 border-r-2 border-[#c7ac82]"> Far Vision</label>
                              <label className="px-2 py-2 w-full border-t-2 border-r-2 border-[#c7ac82]"> Near Vision</label>
                              <label className="px-2 py-2 w-full border-t-2 border-r-2 border-[#c7ac82]">Stereo depth</label>
                              <label className="px-2 py-2 w-full border-t-2 border-r-2 border-[#c7ac82]"> Eye Alignment</label>
                              <label className="px-2 py-2 w-full border-t-2 border-r-2 border-[#c7ac82]"> Color Vision</label>
                              <label className="px-2 py-2 w-full border-t-2 border-[#c7ac82]"> Visual Field</label>

                              <label className="p-2 w-full border-y-2 border-r-2 border-[#c7ac82]">{item_page?.RBinocular || '-'}</label>
                              <label className="p-2 w-full border-y-2 border-r-2 border-[#c7ac82]">{item_page?.RFar || '-'}</label>
                              <label className="p-2 w-full border-y-2 border-r-2 border-[#c7ac82]">{item_page?.RNea || '-'}</label>
                              <label className="p-2 w-full border-y-2 border-r-2 border-[#c7ac82]">{item_page?.RBinocular || '-'}</label>
                              <label className="p-2 w-full border-y-2 border-r-2 border-[#c7ac82]">{item_page?.RCockeyed || '-'}</label>
                              <label className="p-2 w-full border-y-2 border-r-2 border-[#c7ac82]">{item_page?.RBinocular || '-'}</label>
                              <label className="p-2 w-full border-y-2 border-[#c7ac82]">{item_page?.RPhase || '-'}</label>
                            </div>

                            <div className='flex gap-4 p-2'>
                              <label className='whitespace-nowrap'>Result :</label>
                              <label>{item_page?.VPDetail || '-'}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  // คลื่นไฟฟ้าหัวใจ (EKG)
                  if (item_page?.header === "Electrocardiogram (EKG)")
                    return <div className='h-[200px]'>
                      <div className='w-full h-full  flex grow gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82] w-full  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>
                            <div className='flex gap-4 p-2'>
                              <label>{item_page?.EKGDetail || '-'}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  // เอกซเรย์ทรวงอก (Chest X-ray)
                  if (item_page?.header === "Chest X-ray")
                    return <div className='h-[95%]'>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>
                            {/* <div className='flex flex-col gap-2 p-2'>
                            <div className='flex gap-2 '>
                              <label>{item_page?.NResultDetail || '-'}</label>
                            </div>
                            <div className='flex gap-2 '>
                              <label>{item_page?.Description || '-'}</label>
                            </div>
                            <div className='flex gap-2 '>
                              <label>{item_page?.HSeriesResultDetail || '-'}</label>
                            </div>
                          </div> */}
                            {item_page.ID03GX01 &&
                              <div className='flex flex-col gap-2 p-2'>
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03GX01?.NResultDetail || ''}</label>
                                </div>
                                {/* <div className='flex gap-2 '>
                                <label>{item_page?.ID03GX01?.Description || ''}</label>
                              </div> */}
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03GX01?.HSeriesResultDetail || ''}</label>
                                </div>
                              </div>
                            }

                            {item_page.ID03GXX80 &&
                              <div className='flex flex-col gap-2 p-2'>
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03GXX80?.NResultDetail || ''}</label>
                                </div>
                                {/* <div className='flex gap-2 '>
                                <label>{item_page?.ID03GXX80?.Description || ''}</label>
                              </div> */}
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03GXX80?.HSeriesResultDetail || ''}</label>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                  // ผลการตรวจแมมโมแกรมและอัลตร้าซาวด์เต้านม (Bilateral Mammography & Breast Sonogram)
                  if (item_page?.header === "Ultrasound Whole Abdomen")
                    return <div className='h-[95%]'>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>
                            {item_page.ID03UT19 &&
                              <div className='flex flex-col gap-2 p-2'>
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT19?.NResultDetail || ''}</label>
                                </div>
                                {/* <div className='flex gap-2 '>
                                <label>{item_page?.ID03UT19?.Description || ''}</label>
                              </div> */}
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT19?.HSeriesResultDetail || ''}</label>
                                </div>
                              </div>
                            }

                            {item_page.ID03UT22 &&
                              <div className='flex flex-col gap-2 p-2'>
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT22?.NResultDetail || ''}</label>
                                </div>
                                {/* <div className='flex gap-2 '>
                                <label>{item_page?.ID03UT22?.Description || ''}</label>
                              </div> */}
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT22?.HSeriesResultDetail || ''}</label>
                                </div>
                              </div>
                            }

                          </div>
                        </div>
                      </div>
                    </div>

                  if (item_page?.header === "Digital Mammograms")
                    return <div className='h-[95%]'>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>
                            {item_page.ID03UT19 &&
                              <div className='flex flex-col gap-2 p-2'>
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT19?.NResultDetail || ''}</label>
                                </div>
                                {/* <div className='flex gap-2 '>
                                <label>{item_page?.ID03UT19?.Description || ''}</label>
                              </div> */}
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT19?.HSeriesResultDetail || ''}</label>
                                </div>
                              </div>
                            }

                            {item_page.ID03GXX80 &&
                              <div className='flex flex-col gap-2 p-2'>
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03GXX80?.NResultDetail || ''}</label>
                                </div>
                                {/* <div className='flex gap-2 '>
                                <label>{item_page?.ID03GXX80?.Description || ''}</label>
                              </div> */}
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03GXX80?.HSeriesResultDetail || ''}</label>
                                </div>
                              </div>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  if (item_page?.header === "Ultrasound Transvaginal")
                    return <div className='h-[95%]'>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>
                            {item_page.ID03UT19 &&
                              <div className='flex flex-col gap-2 p-2'>
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT19?.NResultDetail || ''}</label>
                                </div>
                                {/* <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT19?.Description || ''}</label>
                                </div> */}
                                <div className='flex gap-2 '>
                                  <label>{item_page?.ID03UT19?.HSeriesResultDetail || ''}</label>
                                </div>
                              </div>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  // ผลการตรวจภายใน (ThinPrep Pap Test)
                  if (item_page?.header === "ThinPrep Pap Test")
                    return <div className='h-[95%]'>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>

                            <div className='flex gap-4 p-2'>
                              <p>{item_page?.TranslateEN || '-'}</p>
                            </div>
                            <div className='flex gap-4 p-2'>
                              <p>{item_page?.TranslateTH || '-'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  // ผลการตรวจสมรรถภาพการได้ยินในงานอาชีวอนามัย (Occupational Health Audiometry)
                  if (item_page?.header === "Occupational Health Audiometry")
                    return <div>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>

                            <div className='flex gap-4 p-2'>
                              <label className=''>Type of examination :</label>
                              <label>{item_page?.Audio_Detail || '-'}</label>
                            </div>

                            <table className='text-sm text-center '>
                              <thead>
                                <tr >
                                  <th className='p-1 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'></th>
                                  <th className='font-normal p-1 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'>(500Hz)</th>
                                  <th className='font-normal p-1 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'>(1KHz)</th>
                                  <th className='font-normal p-1 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'>(2KHz)</th>
                                  <th className='font-normal p-1 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'>(3KHz)</th>
                                  <th className='font-normal p-1 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'>(4KHz)</th>
                                  <th className='font-normal p-1 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'>(6KHz)</th>
                                  <th className='font-normal p-1 border-y  border-[#bc9b6a] bg-[#c7ac82]'>(8KHz)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'>right ear(dB)</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.R500 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.R1000 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.R2000 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.R3000 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'> {item_page?.R4000 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.R6000 || '-'}</td>
                                  <td className='p-2 border-y  border-[#bc9b6a]'>{item_page?.R8000 || '-'}</td>
                                </tr>
                                <tr>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a] bg-[#c7ac82]'>left ear(dB)</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.L500 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.L1000 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.L2000 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.L3000 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.L4000 || '-'}</td>
                                  <td className='p-2 border-y border-r  border-[#bc9b6a]'>{item_page?.L6000 || '-'}</td>
                                  <td className='p-2 border-y   border-[#bc9b6a]'>{item_page?.L8000 || '-'}</td>
                                </tr>
                              </tbody>
                            </table>

                            <div className='flex gap-4 p-2 border-b border-[#bc9b6a]'>
                              <label className='whitespace-nowrap'>Result :</label>
                              <label>{item_page?.RightEarDetail || '-'}</label>
                            </div>

                            <div className='flex gap-4 p-2  '>
                              <label className='whitespace-nowrap'>Recommend :</label>
                              <label>{item_page?.RecomEarDetail || '-'}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  // การตรวจสมรรถภาพปอด(Pulmonary Function Test : Spirometry)
                  if (item_page?.header === "Pulmonary Function Test : Spirometry")
                    return <div>
                      <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2 mt-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>

                            <div className='flex flex-col gap-2 p-2'>
                              <div className='flex gap-2 '>
                                <label className='whitespace-nowrap'>Reference :</label>
                                <label>{item_page?.SpiroRef || '-'}</label>
                              </div>
                              <div className='flex gap-2 '>
                                <label className='whitespace-nowrap'>Result :</label>
                                <label>{item_page?.SpiroDetail || '-'}</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  // สรุปผลการตรวจ และคำแนะนำเพิ่มเติม (Additional Conclusions and Recommendations)
                  if (item_page?.header === "Additional Conclusions and Recommendations")
                    return <div>
                      <div className='w-full h-full min-h-[70vh] grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                        <div className='border-2 border-[#c7ac82]  flex flex-col justify-between'>
                          <div className='flex flex-col text-base '>
                            <div className='bg-[#c7ac82] flex px-1 py-2 font-semibold'>{item_page?.header}</div>
                            <div className='flex flex-col gap-2 p-2 font-semibold'>
                              {item_page?.conclusion && <div className='flex gap-2 '>
                                <p>{item_page?.conclusion || ''}</p>
                              </div>
                              }

                              {item_page?.medication && <div className='flex gap-2 '>
                                <p>{item_page?.medication || ''}</p>
                              </div>
                              }

                              {item_page?.recommendation && <div className='flex gap-2 '>
                                <p>{item_page?.recommendation || ''}</p>
                              </div>}

                              {item_page?.followup && <div className='flex gap-2 '>
                                <p>{item_page?.followup || ''}</p>
                              </div>
                              }
                            </div>
                          </div>

                          <div className='w-full flex flex-col items-center'>
                            <div className='border-b border-[#c7ac82] w-[90%]'></div>

                            <div className=' gap-4  text-lg w-full leading-4 p-8 flex flex-col items-start whitespace-nowrap'>
                              <p className=' mb-1 text-center w-full'> Doctor : .............................................................................</p>
                              <p className=' text-center w-full'>{form?.HisVisitCareProvider?.split(',')[1] || ''} {'xxx xxx'}</p>
                              <p className=' w-full text-center'>{form?.HisVisitCareProviderLicenseID || '-'}</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                } else {
                  return <div>
                    <table className='table-reportA5'>
                      <thead>
                        {sub_index === 0 && <>
                          {item_page[item_page?.length - 2] && <tr><th colSpan={5} className='p-2 bg-[#c7ac82] text-base'>{item_page[item_page?.length - 2]}</th></tr>}

                          <tr className='text-sm '>
                            <th rowSpan={2} className='bg-[#f1f1f1] w-2/6  '>Test</th>
                            <th rowSpan={2} className='bg-[#f1f1f1] w-1/6 '>Normal range</th>
                            <th rowSpan={1} className='bg-[#f1f1f1] py-1 w-3/6 ' colSpan={3}>Result</th>

                          </tr>
                          <tr className='text-xs '>
                            <th className='font-normal w-1/6 py-2'>{ResultDate ? moment(ResultDate).add(0, 'year').locale('en').format('DD MMM YYYY') : '-'}</th>
                            <th className='font-normal bg-[#f1f1f1] w-1/6 py-2' >{ResultDate2 ? moment(ResultDate2).add(0, 'year').locale('en').format('DD MMM YYYY') : '-'}</th>
                            <th className='font-normal w-1/6 py-2'>{ResultDate3 ? moment(ResultDate3).add(0, 'year').locale('en').format('DD MMM YYYY') : '-'}</th>
                          </tr>
                        </>}
                        {(item_page[item_page?.length - 1] && (item_page[item_page?.length - 1] != "Urine Analysis" && item_page[item_page?.length - 1] != "Toxicology" && item_page[item_page?.length - 1] != "Hematology")) && <tr>
                          <th colSpan={5} className='p-2 bg-[#c7ac82] text-base text-left'>{item_page[item_page?.length - 1] || '-'}</th>
                        </tr>
                        }
                      </thead>
                      <tbody>
                        {item_page?.length > 0 && item_page.map((item, i) => {
                          //ไม่เอา สองตัวสุดท้ายของอาเรย์
                          if ((item_page?.length - 1) != i && (item_page?.length - 2) != i) {
                            return <tr key={`${item?.Rpt_Group?.Rpt_Group}${i}`} className='text-xs '>
                              <td  className='pl-2 bg-[#f1f1f1]'>{item?.ItemDesc || '-'}</td>
                              <td className='w-1/6 text-center bg-[#f1f1f1]'>{item?.LabRange || '-'} {item?.msLabCode?.Unit}</td>
                              <td className='w-1/6 text-center'>{item?.TestData || '-'}</td>
                              <td className='w-1/6 bg-[#f1f1f1] text-center'>{item?.year2 || '-'}</td>
                              <td className='w-1/6 text-center'>{item?.year3 || '-'}</td>
                            </tr>
                          }
                        })}
                      </tbody>
                      <tfoot>
                        <tr className='text-xs font-semibold'>
                          <td colSpan={5} className=' p-2'> {item_page?.length > 0 && item_page.filter((f) => (f?.TranslateResult != null && f?.TranslateResult != '' && f?.TranslateResult != '-')).map((item, i) => { return <span key={`${i}`}>{item?.TranslateResult}<br /></span> }
                          )}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                }
              })}

              {index === (list_Lab?.length - 1) &&
                <div className='w-full h-full grid grid-cols-1 gap-4 text-[10px] leading-4 pl-2'>
                  <div className='flex flex-col items-center justify-start gap-4 mt-16 text-base'>
                    <label className=''>“ เราไม่อยากให้ใครป่วย “</label>
                    <div className='flex w-full flex-col items-center'>
                      <div className='w-[70%] border-b-2 border-[#c7ac82]'></div>
                    </div>
                    <label className=''>โรงพยาบาลสมิติเวช ชลบุรี ขอขอบคุณท่านที่ไว้วางใจให้ โรงพยาบาล</label>
                    <label className=''>เป็นผู้ดูแลและตรวจสุขภาพประจำปีนี้ให้แก่ท่าน</label>
                    <label className=''>เพื่อให้การดูแลสุขภาพของท่านมีประสิทธิภาพสูงสุด โรงพยาบาลสมิติเวช ชลบุรี</label>
                    <label className=''>ใคร่ขอแนะนำให้ท่าน ตรวจสุขภาพประจำปีอย่างสม่ำเสมอ</label>
                    <label className=''>โรงพยาบาลยินดีที่ได้ให้บริการแก่ท่านและขอให้ท่านมีสุขภาพที่ดีตลอดไป</label>

                    <div className='flex flex-col gap-4 items-center ml-60 my-4'>
                      <label className=''>ด้วยความปรารถนาดี</label>
                      <label className=''>โรงพยาบาลสมิติเวช ชลบุรี</label>
                    </div>

                    <label className=''>ตรวจเช็คร่างกายทุกปี เพื่อพลานามัยที่ดีตลอดไป</label>
                    <label className=''>Check up annually for eternal healthy life</label>

                    <div className='flex w-full flex-col items-center'>
                      <div className='w-[90%] border-b-2 border-[#c7ac82]'></div>
                    </div>

                    <label className=''>เรียน ผู้รับบริการทุกท่าน</label>
                    <label className=''>ห้องปฏิบัติการโรงพยาบาลสมิติเวชศรีราชา ได้มีการปรับเปลี่ยนระบบสารสนเทศตั้งแต่ 16 พ.ย. 2566</label>
                    <label className=''>ส่งผลให้มีการเปลี่ยนแปลงค่าปกติ บางรายการ</label>
                    <label className=''>เพื่อให้เป็นไปตามมาตรฐานเดียวกันของโรงพยาบาลในกลุ่มบริษัทกรุงเทพดุสิตเวชการ(BDMS)</label>
                    <label className=''>หากท่านต้องการทราบค่าอ้างอิงเดิม สามารถสแกน QR Code ด้านล่าง</label>

                    <img className='' src="/images/qr_report.jpg" />
                    <label className=''>รายการตรวจที่มีการแก้ไขค่าอ้างอิงทางห้องปฏิบัติการ (Reference Range Change)</label>

                  </div>
                </div>
              }
            </BodyComponentsA5>
            <div className='mt-[20px] no-print'></div>
          </React.Fragment>
        }
      })}


    </div>
  </div >

})

const BodyComponentsA5 = (props) => {
  const { details, page, someKey } = props
  return <React.Fragment >
    <div className='report-pageA5 flex flex-col h-full '>
      {/* Header */}
      <div className='flex w-full h-[92px] min-h-[92px] max-h-[92px]'>
        <div className='w-1/2'>
          <img src="/images/telecorp.png" alt="" />
        </div>

        <div className='w-1/2 text-[12px] leading-4 flex flex-col items-end whitespace-nowrap mb-4 mt-4 gap-1'>
          {/* <p className='font-semibold '>โรงพยาบาลสมิติเวชชลบุรี (Samitivej Chonburi Hospital)</p> */}
          <p className='font-semibold mb-1'>Telecorp</p>
          {/* <p className=''>888/88 หมู่ 3 ถนนสุขุมวิท ต.บ้านสวน</p> */}
          {/* <p className=''>216 /51-52 ถนนกาญจนาภิเษก แขวงทับช้าง เขตสะพานสูง กรุงเทพฯ 10250</p> */}
          <p className=''>216 /51-52 Kanchanaphisek Road, Thap Chang Subdistrict, Saphan Sung District, Bangkok 10250</p>
          {/* <p className=''>อ.เมืองชลบุรี จใชลบุรี 2000 โทรศัพท์</p> */}
          {/* <p className=''>Moo 3 888 88 Sukhumvit Rd, Ban Suan, Chon Buri District, Chon Buri 20000 Tel</p> */}
        </div>
      </div>
      <div key={someKey} className="flex-grow relative h-full">
        {props?.children}
      </div>
      {/* Footer */}
      <div className='flex w-full h-[16px] min-h-[16px] max-h-[16px]'>
        <div className='w-full text-[12px] leading-4 flex items-start justify-between whitespace-nowrap gap-1 mb-1'>
          <p className=''>HN {details?.HN} {details?.Prename || ''} {details?.Forename || ''} {details?.Surname || ''} {details?.CheckupDate ? moment(details?.CheckupDate).format('DD/MM/YYYY') : '-'}</p>
          <p className=''>{page}</p>
        </div>
      </div>
    </div>
  </React.Fragment>
}


export default ReporComponentsA5