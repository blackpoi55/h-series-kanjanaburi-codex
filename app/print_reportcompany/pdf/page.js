'use client'
import React, { useEffect, useState } from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // นำเข้า plugin
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import 'chart.js/auto'; // ต้องมีการนำเข้า Chart.js
import '@/components/Tool/chart-plugins';
import { TextField } from '@mui/material';
import moment from 'moment';
import 'moment/locale/th'; // import ภาษาไทย
function page() {
  const [Contracofmonth, setContracofmonth] = useState([])
  const [headName, setheadName] = useState("")
  const [slicepage, setslicepage] = useState([])
  const [chartdata, setchartdata] = useState([])
  const [graphShow, setgraphShow] = useState({})
  const [reportDate, setreportDate] = useState({})
  const [companyName, setcompanyName] = useState("")
  const [totalresult, settotalresult] = useState(20)
  const [toggle, settoggle] = useState(0)
  moment.locale('th');
  useEffect(() => {
    if (totalresult && totalresult > 0) {
      let data = JSON.parse(localStorage.getItem("reportcompany"))
      let graph = JSON.parse(localStorage.getItem("reportgraph"))
      let reportday = JSON.parse(localStorage.getItem("reportdate"))
      let company = localStorage.getItem("company")
      setcompanyName(company)
      console.log(data)
      console.log("graph", graph || "")
      setreportDate(reportday)
      setgraphShow(graph || "")
      setheadName(data.name || "")
      setchartdata(data.data)
      slicedata(data.data || [])
      setTimeout(() => {
        printClick()
      }, 2000);
    }
  }, [toggle])
  const slicedata = (res) => {
    // console.log(res)
    let page = [];
    let index = 0
    let six = []
    let mod = Math.ceil(res.length / totalresult)
    for (let x = 0; x < mod; x++) {
      for (let i = 0; i < totalresult; i++) {
        if (res[index]) {
          six.push(res[index])
        }
        index++
      }
      page.push(six)
      six = []
    }
    setslicepage(page)
  }
  const checkTable = (name, data, index1) => {
    if (name == "CBC") {
      return CBCTable(data, index1)
    }
    else if (name == "PE") {
      return PETable(data, index1)
    }
    else if (name == "UA") {
      return UATable(data, index1)
    }
    else if (name == "Stool") {
      return StoolTable(data, index1)
    }
    else if (name == "Occ") {
      return OccTable(data, index1)
    }
    else if (name == "Chart_All") {
      return Chart_AllTable(data, index1)
    }
    else if (name?.substring(0, 2) == "X-") {
      return XTable(data, index1)
    }
    else {
      return otherTable(data, index1)
    }
  }
  const CBCTable = (data, i) => {
    return (
      <table className="w-full mx-2 overflow-x-auto text-xs">
        <thead>
          <tr className=' p-2'>
            <th className="font-light border border-black">ลำดับ</th>
            <th className="font-light border border-black">NO</th>
            <th className="font-light border border-black">HN</th>
            <th className="font-light border border-black">ชื่อ - นามสกุล</th>
            <th className="font-light border border-black ">รหัสพนักงาน</th>
            <th className="font-light border border-black">แผนก</th>
            <th className="font-light border border-black">Hb</th>
            <th className="font-light border border-black">HCT</th>
            <th className="font-light border border-black">WBC</th>
            <th className="font-light border border-black">MCV</th>
            <th className="font-light border border-black">Neutro</th>
            <th className="font-light border border-black">Lympho</th>
            <th className="font-light border border-black">Eos</th>
            <th className="font-light border border-black">Mono</th>
            <th className="font-light border border-black">Baso</th>
            <th className="font-light border border-black">PltCount</th>
            <th className="font-light border border-black">PltSmear</th>
            <th className="font-light border border-black">RBC</th>
            <th className="font-light border border-black">MPV</th>
            <th className="font-light border border-black">RDW</th>

          </tr>
        </thead>
        <tbody className='text-base font-light border border-black'>
          {data && data?.length > 0 && data.map((p, index) => (
            <tr className={` text-sm text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
              <td className="font-light border border-black">{(totalresult * i) + index + 1}</td>
              <td className="font-light border border-black">{p.NO ? p.NO : '-'}</td>
              <td className="font-light border border-black">{p.HN || '-'}</td>
              <td className="font-light border border-black">{p.Name || '-'}</td>
              <td className="font-light border border-black">{p.EmpID || '-'}</td>
              <td className="font-light border border-black">{p.Dept || '-'}</td>
              <td className="font-light border border-black">{p.Hb || '-'}</td>
              <td className="font-light border border-black">{p.HCT || '-'}</td>
              <td className="font-light border border-black">{p.WBC || '-'}</td>
              <td className="font-light border border-black">{p.MCV || '-'}</td>
              <td className="font-light border border-black">{p.Neutro || '-'}</td>
              <td className="font-light border border-black">{p.Lympho || '-'}</td>
              <td className="font-light border border-black">{p.Eos || '-'}</td>
              <td className="font-light border border-black">{p.Mono || '-'}</td>
              <td className="font-light border border-black">{p.Baso || '-'}</td>
              <td className="font-light border border-black">{p.PltCount || '-'}</td>
              <td className="font-light border border-black">{p.PltSmear || '-'}</td>
              <td className="font-light border border-black">{p.RBC || '-'}</td>
              <td className="font-light border border-black">{p.MPV || '-'}</td>
              <td className="font-light border border-black">{p.RDW || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const PETable = (data, i) => {
    return (
      <table className="w-full mx-2 overflow-x-auto text-xs">
        <thead>
          <tr className=' p-2'>
            <th className="font-light border border-black">ลำดับ</th>
            <th className="font-light border border-black">NO</th>
            <th className="font-light border border-black">HN</th>
            <th className="font-light border border-black">ชื่อ - นามสกุล</th>
            <th className="font-light border border-black ">รหัสพนักงาน</th>
            <th className="font-light border border-black">แผนก</th>
            <th className="font-light border border-black">Height</th>
            <th className="font-light border border-black">Weight</th>
            <th className="font-light border border-black">BMI</th>
            <th className="font-light border border-black">BPSys</th>
            <th className="font-light border border-black">BPDias</th>
            <th className="font-light border border-black">PulseRate</th>
            <th className="font-light border border-black">Waist</th>
            <th className="font-light border border-black">PEResult</th>
          </tr>
        </thead>
        <tbody className='text-base font-light border border-black'>
          {data && data?.length > 0 && data.map((p, index) => (
            <tr className={` text-sm text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
              <td className="font-light border border-black">{(totalresult * i) + index + 1}</td>
              <td className="font-light border border-black">{p.NO ? p.NO : '-'}</td>
              <td className="font-light border border-black">{p.HN || '-'}</td>
              <td className="font-light border border-black">{p.Name || '-'}</td>
              <td className="font-light border border-black">{p.EmpID || '-'}</td>
              <td className="font-light border border-black">{p.Dept || '-'}</td>
              <td className="font-light border border-black">{p.Height || '-'}</td>
              <td className="font-light border border-black">{p.Weight || '-'}</td>
              <td className="font-light border border-black">{p.BMI || '-'}</td>
              <td className="font-light border border-black">{p.BPSys || '-'}</td>
              <td className="font-light border border-black">{p.BPDias || '-'}</td>
              <td className="font-light border border-black">{p.PulseRate || '-'}</td>
              <td className="font-light border border-black">{p.Waist || '-'}</td>
              <td className="font-light border border-black">{p.PEResult || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const UATable = (data, i) => {
    return (
      <table className="w-full mx-2 overflow-x-auto text-xs">
        <thead>
          <tr className=' p-2'>
            <th className="font-light border border-black">ลำดับ</th>
            <th className="font-light border border-black">NO</th>
            <th className="font-light border border-black">HN</th>
            <th className="font-light border border-black">ชื่อ - นามสกุล</th>
            <th className="font-light border border-black ">รหัสพนักงาน</th>
            <th className="font-light border border-black">แผนก</th>
            <th className="font-light border border-black">U_Color</th>
            <th className="font-light border border-black">U_SpGr</th>
            <th className="font-light border border-black">U_PH</th>
            <th className="font-light border border-black">U_WBC</th>
            <th className="font-light border border-black">U_RBC</th>
            <th className="font-light border border-black">U_Ery</th>
            <th className="font-light border border-black">U_Glucose</th>
            <th className="font-light border border-black">U_Protein</th>
            <th className="font-light border border-black">U_Ketone</th>
            <th className="font-light border border-black">U_Bilirubin</th>
            <th className="font-light border border-black">U_Urobilinogen</th>
            <th className="font-light border border-black">U_Nitrite</th>
            <th className="font-light border border-black">U_Leukocytes</th>
            <th className="font-light border border-black">U_Transparency</th>
            <th className="font-light border border-black">U_SquamousCells</th>

          </tr>
        </thead>
        <tbody className='text-base font-light border border-black'>
          {data && data?.length > 0 && data.map((p, index) => (
            <tr className={` text-sm text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
              <td className="font-light border border-black">{(totalresult * i) + index + 1}</td>
              <td className="font-light border border-black">{p.NO ? p.NO : '-'}</td>
              <td className="font-light border border-black">{p.HN || '-'}</td>
              <td className="font-light border border-black">{p.Name || '-'}</td>
              <td className="font-light border border-black">{p.EmpID || '-'}</td>
              <td className="font-light border border-black">{p.Dept || '-'}</td>
              <td className="font-light border border-black">{p.U_Color || '-'}</td>
              <td className="font-light border border-black">{p.U_SpGr || '-'}</td>
              <td className="font-light border border-black">{p.U_PH || '-'}</td>
              <td className="font-light border border-black">{p.U_WBC || '-'}</td>
              <td className="font-light border border-black">{p.U_RBC || '-'}</td>
              <td className="font-light border border-black">{p.U_Ery || '-'}</td>
              <td className="font-light border border-black">{p.U_Glucose || '-'}</td>
              <td className="font-light border border-black">{p.U_Protein || '-'}</td>
              <td className="font-light border border-black">{p.U_Ketone || '-'}</td>
              <td className="font-light border border-black">{p.U_Bilirubin || '-'}</td>
              <td className="font-light border border-black">{p.U_Urobilinogen || '-'}</td>
              <td className="font-light border border-black">{p.U_Nitrite || '-'}</td>
              <td className="font-light border border-black">{p.U_Leukocytes || '-'}</td>
              <td className="font-light border border-black">{p.U_Transparency || '-'}</td>
              <td className="font-light border border-black">{p.U_SquamousCells || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const StoolTable = (data, i) => {
    return (
      <table className="w-full mx-2 overflow-x-auto text-xs">
        <thead>
          <tr className=' p-2'>
            <th className="font-light border border-black">ลำดับ</th>
            <th className="font-light border border-black">NO</th>
            <th className="font-light border border-black">HN</th>
            <th className="font-light border border-black">ชื่อ - นามสกุล</th>
            <th className="font-light border border-black ">รหัสพนักงาน</th>
            <th className="font-light border border-black">แผนก</th>
            <th className="font-light border border-black">OccultBlood</th>
            <th className="font-light border border-black">StoolCulture</th>
            <th className="font-light border border-black">stool_color</th>
            <th className="font-light border border-black">stool_appearance</th>
            <th className="font-light border border-black">stool_wbc</th>
            <th className="font-light border border-black">stool_rbc</th>
            <th className="font-light border border-black">stool_parasite</th>
            <th className="font-light border border-black">stool_protozoa</th>
          </tr>
        </thead>
        <tbody className='text-base font-light border border-black'>
          {data && data?.length > 0 && data.map((p, index) => (
            <tr className={` text-sm text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
              <td className="font-light border border-black">{(totalresult * i) + index + 1}</td>
              <td className="font-light border border-black">{p.NO ? p.NO : '-'}</td>
              <td className="font-light border border-black">{p.HN || '-'}</td>
              <td className="font-light border border-black">{p.Name || '-'}</td>
              <td className="font-light border border-black">{p.EmpID || '-'}</td>
              <td className="font-light border border-black">{p.Dept || '-'}</td>
              <td className="font-light border border-black">{p.OccultBlood || '-'}</td>
              <td className="font-light border border-black">{p.StoolCulture || '-'}</td>
              <td className="font-light border border-black">{p.stool_color || '-'}</td>
              <td className="font-light border border-black">{p.stool_appearance || '-'}</td>
              <td className="font-light border border-black">{p.stool_wbc || '-'}</td>
              <td className="font-light border border-black">{p.stool_rbc || '-'}</td>
              <td className="font-light border border-black">{p.stool_parasite || '-'}</td>
              <td className="font-light border border-black">{p.stool_protozoa || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const OccTable = (data, i) => {
    return (
      <table className="w-full mx-2 overflow-x-auto text-xs">
        <thead>
          <tr className=' p-2'>
            <th className="font-light border border-black">ลำดับ</th>
            <th className="font-light border border-black">NO</th>
            <th className="font-light border border-black">HN</th>
            <th className="font-light border border-black">ชื่อ - นามสกุล</th>
            <th className="font-light border border-black ">รหัสพนักงาน</th>
            <th className="font-light border border-black">แผนก</th>
            <th className="font-light border border-black">SpiroDetail</th>
            <th className="font-light border border-black">titmusdetail</th>
            <th className="font-light border border-black">LeftEarDetail</th>
            <th className="font-light border border-black">RightEarDetail</th>
            <th className="font-light border border-black">AudioDetail</th>
            <th className="font-light border border-black">VPDetail</th>
          </tr>
        </thead>
        <tbody className='text-base font-light border border-black'>
          {data && data?.length > 0 && data.map((p, index) => (
            <tr className={` text-sm text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
              <td className="font-light border border-black">{(totalresult * i) + index + 1}</td>
              <td className="font-light border border-black">{p.NO ? p.NO : '-'}</td>
              <td className="font-light border border-black">{p.HN || '-'}</td>
              <td className="font-light border border-black">{p.Name || '-'}</td>
              <td className="font-light border border-black">{p.EmpID || '-'}</td>
              <td className="font-light border border-black">{p.Dept || '-'}</td>
              <td className="font-light border border-black">{p.SpiroDetail || '-'}</td>
              <td className="font-light border border-black">{p.titmusdetail || '-'}</td>
              <td className="font-light border border-black">{p.LeftEarDetail || '-'}</td>
              <td className="font-light border border-black">{p.RightEarDetail || '-'}</td>
              <td className="font-light border border-black">{p.AudioDetail || '-'}</td>
              <td className="font-light border border-black">{p.VPDetail || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const Chart_AllTable = (data, i) => {
    return (
      <table className="w-full mx-2 overflow-x-auto text-xs">
        <thead>
          <tr className=' p-2'>
            <th className="font-light border border-black">ลำดับ</th>
            <th className="font-light border border-black">ชื่อ</th>
            <th className="font-light border border-black">Normal</th>
            <th className="font-light border border-black">Abnormal</th>
            <th className="font-light border border-black ">ผลรวม</th>
          </tr>
        </thead>
        <tbody className='text-base font-light border border-black'>
          {data && data?.length > 0 && data.map((p, index) => (
            <tr className={` text-sm text-left bg-[#E2E2E2] ${p?.trXrayFromSSBs?.[0]?.XrayStatus == "A6" ? " text-red-500 " : ""}`}>
              <td className="font-light border border-black">{(totalresult * i) + index + 1}</td>
              <td className="font-light border border-black">{p.Name || '-'}</td>
              <td className="font-light border border-black text-center">{p.Normal || '-'}</td>
              <td className="font-light border border-black text-center">{p.Abnormal || '-'}</td>
              <td className="font-light border border-black text-center">{p.Total || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const XTable = (data, i) => {
    return (
      <table className="w-full mx-2 overflow-x-auto text-xs">
        <thead>
          <tr className=' p-2'>
            <th className="font-light border border-black">ลำดับ</th>
            <th className="font-light border border-black">NO</th>
            <th className="font-light border border-black">HN</th>
            <th className="font-light border border-black">ชื่อ - นามสกุล</th>
            <th className="font-light border border-black ">รหัสพนักงาน</th>
            <th className="font-light border border-black">แผนก</th>
            <th className="font-light border border-black">Description</th>
            <th className="font-light border border-black">HSeriesResultDetail</th>
            <th className="font-light border border-black">XrayStatus</th>
          </tr>
        </thead>
        <tbody className='text-base font-light border border-black'>
          {data && data?.length > 0 && data.map((p, index) => (
            <tr className={` text-sm text-left bg-[#E2E2E2] ${p?.trXrayFromSSBs?.[0]?.XrayStatus == "A6" ? " text-red-500 " : ""}`}>
              <td className="font-light border border-black">{(totalresult * i) + index + 1}</td>
              <td className="font-light border border-black">{p.NO ? p.NO : '-'}</td>
              <td className="font-light border border-black">{p.HN || '-'}</td>
              <td className="font-light border border-black">{(p.Prename || "") + " " + (p.Forename || "") + " " + (p.Surname || "")}</td>
              <td className="font-light border border-black">{p.EmpID || '-'}</td>
              <td className="font-light border border-black">{p.Dept || '-'}</td>
              <td className="font-light border border-black">{p?.trXrayFromSSBs?.[0]?.Description || '-'}</td>
              <td className="font-light border border-black">{p?.trXrayFromSSBs?.[0]?.HSeriesResultDetail || '-'}</td>
              <td className="font-light border border-black">{p?.trXrayFromSSBs?.[0]?.XrayStatus || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const otherTable = (data, i) => {
    return (
      <table className="w-full mx-2 overflow-x-auto text-xs">
        <thead>
          <tr className='p-2'>
            <th className="w-[30px] font-light border border-black">ลำดับ</th>
            {/* <th className="w-[50px] font-light border border-black">NO</th> */}
            <th className="w-[100px] font-light border border-black">HN</th>
            <th className="w-[185px] font-light border border-black">ชื่อ - นามสกุล</th>
            {/* <th className="w-[50px] font-light border border-black ">รหัสพนักงาน</th> */}
            {/* <th className="w-[50px] font-light border border-black">แผนก</th> */}
            <th className="w-[165px] font-light border border-black">{((data?.[0]?.trLabs?.[0]?.ItemDesc || "") + " ( " + (data?.[0]?.trLabs?.[0]?.LabRange || "-") + " ) ")}</th>
            <th className="font-light border border-black">ผลการตรวจ</th>
          </tr>
        </thead>
        <tbody className='text-base font-light border border-black'>
          {data && data?.length > 0 && data.map((p, index) => (
            <tr className={` text-sm text-left bg-[#E2E2E2] ${p?.trLabs?.[0]?.NormalStatus == "FALSE" ? " text-red-500 " : ""}`}>
              <td className="font-light border border-black">{(totalresult * i) + index + 1}</td>
              {/* <td className="font-light border border-black">{p.NO ? p.NO : '-'}</td> */}
              <td className="font-light border border-black">{p.HN || '-'}</td>
              <td className="font-light border border-black">{(p.Prename || "") + " " + (p.Forename || "") + " " + (p.Surname || "")}</td>
              {/* <td className="font-light border border-black">{p.EmpID || '-'}</td> */}
              {/* <td className="font-light border border-black">{p.Dept || '-'}</td> */}
              <td className="font-light text-center border border-black">{p?.trLabs?.[0]?.TestData || '-'}</td>
              <td className="font-light border border-black">{p?.trLabs?.[0]?.TranslateResult || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const chartnotTable = () => {
    const optionsbar = {
      scales: {
        // x: {
        //     stacked: true // ซ้อนข้อมูลในแกน X
        // },
        // y: {
        //     beginAtZero: true,
        //     stacked: true // ซ้อนข้อมูลในแกน Y
        // }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }

    };

    let val = chartdata || [];
    let label = [];
    let normal = [];
    let abnormal = [];

    for (const element of val) {
      label.push(element.Name);
      normal.push(element.Normal);
      abnormal.push(element.Abnormal);
    }

    let data = {
      labels: label,
      datasets: [
        {
          label: 'Normal',
          data: normal, // ค่า Normal ของแต่ละรายการ
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Abnormal',
          data: abnormal, // ค่า Abnormal ของแต่ละรายการ
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };


    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[90%]">
          <Bar className='' data={data} options={optionsbar} />
        </div>
      </div>
    );
  };
  const firstPageGraph = () => {
    const data = {
      labels: ['Normal', 'Abnormal'],
      datasets: [
        {
          label: graphShow.Name || '', // แสดงชื่อหรือใช้ค่าเริ่มต้น
          data: [graphShow.Normal || 0, graphShow.Abnormal || 0], // ค่า Normal และ Abnormal
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)', // สีสำหรับ Normal
            'rgba(255, 99, 132, 0.6)' // สีสำหรับ Abnormal
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          // เพิ่ม offset ให้ slice ของ Abnormal เพื่อยกให้ลอยขึ้น
          offset: (context) => {
            const label = context.chart.data.labels[context.dataIndex];
            return label === 'Abnormal' ? 50 : 0; // ยก Abnormal ขึ้น 20px
          }
        }
      ]
    };

    const options = {
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        datalabels: {
          display: true,
          color: 'white', // สีของข้อความ
          formatter: (value) => value == 0 ? "" : value, // แสดงค่า
          font: {
            size: 46, // กำหนดขนาดตัวหนังสือ
            weight: 'bold' // เพิ่มความหนาของตัวหนังสือถ้าต้องการ
          }
        }
      },
      hover: {
        mode: null // ปิดการแสดงผล Hover
      },
      responsive: true,
      maintainAspectRatio: false // เพื่อให้กราฟสามารถปรับขนาดได้ตาม container
    };

    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[90%] h-[400px]"> {/* กำหนดความสูงให้กราฟ */}
          <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
      </div>
    );
  };

  const showdtcheck = () => {
    let data = slicepage
    let res = []
    if (headName != "Chart_Graph" && graphShow) {
      res.push(
        <div>
          <div className="a4 section flex flex-col">
            <div className="h-3/12">
              <div className="flex justify-start mt-5 mr-5">
                <img className="h-12" src="/images/logo.png" />
              </div>
              <div className="justify-center mt-2 flex flex-row">
                <label className=' text-2xl font-bold'>{companyName}</label>
              </div>
              <div className="text-center mt-2">
                <label className='text-2xl'> สรุปผลการตรวจสุขภาพ ประจำปี พ.ศ.{moment(reportDate.datastart).year(moment().year() + 543).format("YYYY")}</label>

              </div>
              <div className="text-center mt-2">
                <label className=''> รายชื่อผลการตรวจ {headName}</label>
              </div>
              <div className="text-center mt-2">
                <label className=''>ช่วงวันที่ {moment(reportDate.datastart).format("DD MMM")} {moment().year(moment().year() + 543).format("YYYY")} - {moment(reportDate.datastop).format("DD MMM")} {moment().year(moment().year() + 543).format("YYYY")}</label>
              </div>

            </div>
            <div className="h-9/12 pt-5">
              <div className="flex flex-col justify-center items-center">
                <table className="w-[50%] mx-2 overflow-x-auto text-xs mb-5">
                  <thead>
                    <tr className=' p-2'>
                      <th className="font-light border border-black p-1">ผลการตรวจ</th>
                      <th className="font-light border border-black p-1">จำนวนคน</th>
                      <th className="font-light border border-black p-1">เปอร์เซ็นต์</th>
                    </tr>
                  </thead>
                  <tbody className='text-base font-light border border-black'>
                    <tr className={` text-sm text-left bg-[#E2E2E2]  `}>
                      <td className="font-light border border-black p-1 text-start">ผู้มีผลปกติ</td>
                      <td className="font-light border border-black p-1 text-center">{graphShow.Normal || '-'}</td>
                      <td className="font-light border border-black p-1 text-center">{((graphShow.Normal / graphShow.Total) * 100).toFixed(2) || '-'}</td>
                    </tr>
                    <tr className={` text-sm text-left bg-[#E2E2E2]  `}>
                      <td className="font-light border border-black p-1 text-start">ผู้มีผลปกติ</td>
                      <td className="font-light border border-black p-1 text-center">{graphShow.Abnormal || '-'}</td>
                      <td className="font-light border border-black p-1 text-center">{((graphShow.Abnormal / graphShow.Total) * 100).toFixed(2) || '-'}</td>
                    </tr>
                    <tr className={` text-sm text-left bg-[#E2E2E2]  `}>
                      <td className="font-light border border-black p-1 text-center">รวม</td>
                      <td className="font-light border border-black p-1 text-center">{graphShow.Total || '-'}</td>
                      <td className="font-light border border-black p-1 text-center">100 %</td>
                    </tr>
                  </tbody>
                </table>
                {
                  firstPageGraph()
                }
              </div>
            </div>
          </div>
          <div className="mt-1"></div>
        </div >
      )
    }
    for (let index1 = 0; index1 < data.length; index1++) {
      res.push(
        <div>
          <div className="a4 section flex flex-col">
            <div className="h-1/6">
              <div className="flex justify-start mt-5 mr-5">
                <img className="h-12" src="/images/logo.png" />
              </div>
              <div className="justify-center mt-2 flex flex-row">
                <label>{companyName}</label>
              </div>
              <div className="text-center mt-2">
                รายงาน {headName}
              </div>
            </div>
            <div className="h-5/6">
              <div className="flex justify-center">
                {headName == "Chart_Graph" ?
                  chartnotTable() :
                  checkTable(headName, data[index1], index1)
                }
              </div>
            </div>
          </div>
          <div className="mt-1"></div>
        </div >
      )
    }
    return (res)
  }
  const printClick = () => {
    window.print()
  }
  return (
    <div className='bg-white h-full w-full text-black'>
      <div>
        <div className=" flex flex-row justify-end my-5 p-5 print:hidden" >
          <TextField autoFocus type="text" size='small' className=' bg-white' value={totalresult || null} onChange={(e) => settotalresult(e.target.value.replace(/[^0-9]/g, ''))} onBlur={() => settoggle(prevToggle => prevToggle + 1)} label="จำนวนข้อมูลต่อหน้า" variant="outlined" />

          <button onClick={() => printClick()} className=" px-3 mx-5 py-1 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-400 "><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          </button>
        </div>
        {showdtcheck()}
      </div>
      <style jsx>{`
@media print {
@page {
  /* size: A4 landscape; */
  size: A4;
}

.section {
  height: 100%;
  margin: 0px;
}

.print-none,
.m_none {
  display: none !important;
}

#main {
  margin-left: unset !important;
  width: 100%;

}

.nav-print {
  position: absolute !important;
  left: -1000px;

}
}
`}</style>
    </div>
  )
}

export default page;
