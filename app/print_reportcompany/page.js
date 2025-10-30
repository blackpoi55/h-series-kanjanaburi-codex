'use client'

import { getCompany, postReportSum, summaryExcel, summaryExcelAll } from '@/action/api'
//import { getmockupexcel } from '@/action/mockupexcel'
import Baselayout from '@/components/Baselayout/Baselayout'
import Excel1 from '@/components/ExcelReport/Excel1'
import HeaderPrintReport from '@/components/Print_Report_Company/HeaderPrintReport'
import Print_Report from '@/components/Print_Report_Company/Print_Report'
import Loading from '@/components/Tool/Loading'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function page() {
  const router = useRouter()
  const [wait, setWait] = useState(null)
  const [newData, setnewData] = useState([])
  const [tabChoose, settabChoose] = useState(0)
  const [statuschangesearch, setstatuschangesearch] = useState(true)
  const [options, setOptions] = useState([])
  const [imageSrc, setImageSrc] = useState(null);
  const [companyName, setcompanyName] = useState("")
  const [values, setvalues] = useState({
    datastart: dayjs().startOf('month').add(-2, 'year').format('YYYY-MM-DD'),
    datastop: dayjs().endOf('month').add(-2, 'year').format('YYYY-MM-DD'),
    companyCode: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      await Loadoptions()
      // await refresh()
    }
    fetchData();
  }, [])

  const refresh = async () => {
    setWait(true)
    settabChoose(0)
    let newdata = []
    if (values.companyCode) {
      let company = options.find(x => x.value == values.companyCode) || [];
      console.log("company", company.label)
      setcompanyName(company.label)
    }
    else {
      setcompanyName("")

    }
    // let getdata = await getmockupexcel();
    let getdata = await summaryExcelAll(values)
    let data = getdata.data
    console.log(data);

    // ตรวจสอบว่าข้อมูลเป็น object หรือ array
    if (Array.isArray(data)) {
      // ถ้าเป็น array สามารถใช้ forEach ได้
      data.forEach(item => {
        console.log(item);
      });
    } else if (typeof data === 'object' && data !== null) {
      // ถ้าเป็น object ให้ใช้ Object.keys() หรือ Object.entries()
      Object.keys(data).forEach(key => {
        newdata.push({ name: key, data: data[key] })
        // console.log(key, data[key]);
      });
    } else {
      console.log("Data is neither an array nor an object");
    }
    if (!getdata.error) {
      Swal.fire({
        icon: 'success',
        title: 'ดึงข้อมูลสำเร็จ!',
        showConfirmButton: false,
        timer: 2000
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'ดึงข้อมูลไม่สำเร็จ!',
        showConfirmButton: false,
        timer: 2000
      });
    }
    console.log("newdata", newdata)
    setnewData(newdata)
    setstatuschangesearch(false)
    setWait(false)
  };

  const Loadoptions = async () => {
    let res = await getCompany()
    let _s = [];
    for (const iterator of res?.data) {
      _s.push({ label: iterator.Name, value: iterator.SSB_ARCode });
    }
    setOptions(_s)
  }
  const pdfClick = () => {
    localStorage.setItem('company', companyName)
    let data = JSON.stringify(newData?.[tabChoose])
    console.log(data)
    localStorage.setItem('reportcompany', data)
    localStorage.setItem('reportdate', JSON.stringify({datastart:values.datastart,datastop:values.datastop}));
    

    let data2 = newData.find(x => x.name === "Chart_Graph") || [];
    console.log("data2", data2)
    if (data2) {
      let nameToFind = newData[tabChoose]?.name?.startsWith("X-")
        ? newData[tabChoose].name.replace("X-", "")
        : newData[tabChoose]?.name;
      let data3 = data2?.data.find(x => x.Name === nameToFind) || [];
      console.log("data3", data3)
      if (data3 && data3.Name) {
        localStorage.setItem('reportgraph', JSON.stringify(data3 || ""));
        console.log(data3);
      }
      else {
        localStorage.setItem('reportgraph', JSON.stringify(""));
      }
    }
    else {
      localStorage.setItem('reportgraph', JSON.stringify(""));
    }


    window.open("/print_reportcompany/pdf", '_blank')
  }

  // console.log('options', options)

  return (
    <Baselayout>
      <div id='top' className='w-full h-full bg-[#FFFFFF] p-4 px-20  pb-20'>
        <Loading wait={wait} />
        <div onClick={() => router.back()} className='flex gap-4 mb-4 cursor-pointer'>
          <img className='cursor-pointer' width={8} height={24} src="/icon/arrow_left.svg" />
          <label className='text-[#365382] font-medium text-xl cursor-pointer' htmlFor="">ย้อนกลับ</label>
        </div>
        <div className='flex justify-start mb-4'>
          <label className='font-semibold text-[#2F2F2F] text-3xl' htmlFor="">Print Report Company</label>
        </div>
        <HeaderPrintReport setcompanyName={setcompanyName} refresh={refresh} setstatuschangesearch={setstatuschangesearch} options={options} setvalues={setvalues} values={values} />
        <Print_Report imageSrc={imageSrc} setImageSrc={setImageSrc} settabChoose={settabChoose} tabChoose={tabChoose} newData={newData} />
        <div className="w-full flex">

          <div className="w-1/2">
            <Excel1 imageSrc={imageSrc} setImageSrc={setImageSrc} companyName={companyName} statuschangesearch={statuschangesearch} refresh={refresh} newData={newData}></Excel1>
          </div>
          {(newData && newData.length > 0 && !statuschangesearch) ?

            <button className="border rounded-lg bg-red-500 text-white p-2 w-1/2 mt-2 flex justify-center" onClick={() => pdfClick()} >
              <span className='mr-1'>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1111 14.2857C13.6556 14.2857 13.2778 14.6743 13.2778 15.1429V16.8571C13.2778 17.6457 12.6556 18.2857 11.8889 18.2857H3.55556C2.78889 18.2857 2.16667 17.6457 2.16667 16.8571V3.14286C2.16667 2.35429 2.78889 1.71429 3.55556 1.71429H7.16667V7.14286C7.16667 7.61143 7.54444 8 8 8H13.2778V9.42857C13.2778 9.89714 13.6556 10.2857 14.1111 10.2857C14.5667 10.2857 14.9444 9.89714 14.9444 9.42857V7.14286C14.9444 6.91429 14.8556 6.69714 14.7 6.53714L8.58889 0.251429C8.43276 0.0906372 8.22094 0.000200059 8 0L3.55556 0C1.86667 0 0.5 1.40571 0.5 3.14286L0.5 16.8571C0.5 18.5943 1.86667 20 3.55556 20H11.8889C13.5778 20 14.9444 18.5943 14.9444 16.8571V15.1429C14.9444 14.6743 14.5667 14.2857 14.1111 14.2857ZM8.83333 2.92571L12.1 6.28571H8.83333V2.92571ZM20.4333 12.6171C20.3889 12.72 20.3333 12.8114 20.2556 12.8914L16.9222 16.32C16.7556 16.4914 16.5444 16.5714 16.3333 16.5714C16.1222 16.5714 15.9111 16.4914 15.7444 16.32C15.5895 16.1587 15.5026 15.9411 15.5026 15.7143C15.5026 15.4875 15.5895 15.2699 15.7444 15.1086L17.6556 13.1429H8C7.54444 13.1429 7.16667 12.7543 7.16667 12.2857C7.16667 11.8171 7.54444 11.4286 8 11.4286H17.6556L15.7444 9.46286C15.4222 9.13143 15.4222 8.58286 15.7444 8.25143C16.0667 7.92 16.6 7.92 16.9222 8.25143L20.2556 11.68C20.3333 11.76 20.3889 11.8514 20.4333 11.9543C20.5222 12.16 20.5222 12.4 20.4333 12.6057V12.6171Z" fill="white" />
                </svg>
              </span>
              PDF
            </button> :
            <button className="border rounded-lg bg-gray-500 text-white p-2 w-1/2 mt-2 flex justify-center"   >
              <span className='mr-1'>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1111 14.2857C13.6556 14.2857 13.2778 14.6743 13.2778 15.1429V16.8571C13.2778 17.6457 12.6556 18.2857 11.8889 18.2857H3.55556C2.78889 18.2857 2.16667 17.6457 2.16667 16.8571V3.14286C2.16667 2.35429 2.78889 1.71429 3.55556 1.71429H7.16667V7.14286C7.16667 7.61143 7.54444 8 8 8H13.2778V9.42857C13.2778 9.89714 13.6556 10.2857 14.1111 10.2857C14.5667 10.2857 14.9444 9.89714 14.9444 9.42857V7.14286C14.9444 6.91429 14.8556 6.69714 14.7 6.53714L8.58889 0.251429C8.43276 0.0906372 8.22094 0.000200059 8 0L3.55556 0C1.86667 0 0.5 1.40571 0.5 3.14286L0.5 16.8571C0.5 18.5943 1.86667 20 3.55556 20H11.8889C13.5778 20 14.9444 18.5943 14.9444 16.8571V15.1429C14.9444 14.6743 14.5667 14.2857 14.1111 14.2857ZM8.83333 2.92571L12.1 6.28571H8.83333V2.92571ZM20.4333 12.6171C20.3889 12.72 20.3333 12.8114 20.2556 12.8914L16.9222 16.32C16.7556 16.4914 16.5444 16.5714 16.3333 16.5714C16.1222 16.5714 15.9111 16.4914 15.7444 16.32C15.5895 16.1587 15.5026 15.9411 15.5026 15.7143C15.5026 15.4875 15.5895 15.2699 15.7444 15.1086L17.6556 13.1429H8C7.54444 13.1429 7.16667 12.7543 7.16667 12.2857C7.16667 11.8171 7.54444 11.4286 8 11.4286H17.6556L15.7444 9.46286C15.4222 9.13143 15.4222 8.58286 15.7444 8.25143C16.0667 7.92 16.6 7.92 16.9222 8.25143L20.2556 11.68C20.3333 11.76 20.3889 11.8514 20.4333 11.9543C20.5222 12.16 20.5222 12.4 20.4333 12.6057V12.6171Z" fill="white" />
                </svg>
              </span>
              PDF
            </button>
          }
        </div>
      </div>
    </Baselayout>
  )
}
