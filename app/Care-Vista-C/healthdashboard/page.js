'use client'
import { getDashboard, getHealthRecords, ListHealthRecords, summaryList } from '@/action/api'
import Baselayout from '@/components/Baselayout/Baselayout_Care'
import Loading from '@/components/Tool/Loading'
import Informationbottom from '@/components/healthdashboard/Informationbottom'
import Informationtop from '@/components/healthdashboard/Informationtop'
import Package from '@/components/healthdashboard/Package'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import Toolselect2 from '@/components/Tool/Toolselect2'
import * as XLSX from "xlsx";
import SlideAll from '@/components/healthdashboard/SlideAll'
import SlideFBS from '@/components/healthdashboard/SlideFBS'
import Swal from 'sweetalert2'
import Employee from '@/components/healthdashboard/Employee'

function page() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [dataMap, setdataMap] = useState([]);
  const [employeeMap, setemployeeMap] = useState([]);
  const [form, setForm] = useState({ headerSelect: "" })
  const [wait, setWait] = useState(null)
  const [sliceName, setsliceName] = useState(
    [
      {
        "name": "approve",
        "key": "nurse_approve",
        "head": "ชุดตรวจสุขภาพ B+ Basic Check up (BHQ-AIA)",
        "nomalvalue": "Y",
        "excelkey": "",
        "opencard": false,
        "active": true
      },
      {
        "name": "cbc",
        "key": "cbc",
        "head": "ค่าผลตรวจสุขภาพความสมบูรณ์ของเม็ดเลือด (Complete Blood Count : CBC)",
        "nomalvalue": "ปกติ",
        "excelkey": "CBC",
        "opencard": false,
        "active": true
      },
      {
        "name": "fbs",
        "key": "fbs_detail",
        "head": "ผลตรวจสุขภาพระดับน้ำตาลในเลือด (Fasting Blood Sugar)",
        "nomalvalue": "",
        "excelkey": "FBS",
        "opencard": false,
        "active": true
      },
      {
        "name": "lipid",
        "key": "lipid",
        "head": "ผลตรวจสุขภาพระดับไขมัน",
        "nomalvalue": "ปกติ",
        "excelkey": "LIPID",
        "opencard": false,
        "active": true
      },
      {
        "name": "liver",
        "key": "liver1",
        "head": "ผลตรวจสุขภาพการทำงานของตับ (Liver Function Test : LFT)",
        "nomalvalue": "ปกติ",
        "excelkey": "LIVER",
        "opencard": false,
        "active": true
      },
      {
        "name": "kidney",
        "key": "kidney",
        "head": "ผลตรวจสุขภาพการทำงานของไต (Blood Urea Nitrogen : BUN)",
        "nomalvalue": "-",
        "excelkey": "KIDNEY",
        "opencard": false,
        "active": true
      },
      {
        "name": "ua",
        "key": "ua_summary",
        "head": "ผลตรวจสุขภาพกรดยูริก (Uric Acid)",
        "nomalvalue": "ผลการตรวจปัสสาวะปกติ",
        "excelkey": "UA",
        "opencard": false,
        "active": true
      },
      {
        "name": "uric",
        "key": "uric_detail",
        "head": "ผลตรวจสุขภาพกรดยูริก (Uric Acid Detail)",
        "nomalvalue": "",
        "excelkey": "URIC",
        "opencard": false,
        "active": true
      },
      {
        "name": "bmi",
        "key": "bmi_interpretation",
        "head": "ผลตรวจสุขภาพค่าดัชนีมวลกาย (BMI)",
        "nomalvalue": "น้ำหนักตัวอยู่ในเกณฑ์มาตรฐาน (BMI 18.50-23.00)",
        "excelkey": "BMI",
        "opencard": false,
        "active": true
      },
      {
        "name": "bp",
        "key": "bp_interpretation",
        "head": "ผลตรวจสุขภาพความดันโลหิต (Blood Pressure)",
        "nomalvalue": "ความดันโลหิตปกติ",
        "excelkey": "BP",
        "opencard": false,
        "active": true
      },
      {
        "name": "pulse",
        "key": "pulse_interpretation",
        "head": "ผลตรวจสุขภาพอัตราการเต้นของหัวใจ (Pulse Rate)",
        "nomalvalue": "ชีพจรปกติ",
        "excelkey": "PULSE",
        "opencard": false,
        "active": true
      },
      {
        "name": "titmus",
        "key": "titmus_sum",
        "head": "ผลตรวจสุขภาพการมองเห็น (Titmus Vision Test)",
        "nomalvalue": "ปกติ",
        "excelkey": "TITMUS",
        "opencard": false,
        "active": true
      },
      {
        "name": "visionTest",
        "key": "vision_test_detail",
        "head": "ผลตรวจสุขภาพสายตา (Vision Test)",
        "nomalvalue": "สายตาทั้งสองข้างปกติ",
        "excelkey": "VISIONTEST",
        "opencard": false,
        "active": true
      },
      {
        "name": "physicalExam",
        "key": "physical_exam_summary",
        "head": "ผลตรวจสุขภาพร่างกาย (Physical Examination)",
        "nomalvalue": "อยู่ในเกณฑ์ปกติ",
        "excelkey": "PE",
        "opencard": false,
        "active": true
      },
      {
        "name": "spiro",
        "key": "spiro_summary",
        "head": "ผลตรวจสุขภาพสมรรถภาพปอด (Spirometry)",
        "nomalvalue": "สมรรถภาพปอดปกติ",
        "excelkey": "SPIRO",
        "opencard": false,
        "active": true
      },
      {
        "name": "chestXray",
        "key": "chest_xray",
        "head": "ผลตรวจสุขภาพเอกซเรย์ทรวงอก (Chest X-ray)",
        "nomalvalue": "ผลการตรวจเอ็กซเรย์ทรวงอกปกติ",
        "excelkey": "XRAY",
        "opencard": false,
        "active": true
      }
    ]
  )
  const [role, setrole] = useState("")
  const [cpc, setcpc] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [modalType, setmodalType] = useState("");
  const [headerOption, setheaderOption] = useState([])

  useEffect(() => {
    headerload();
    let val = localStorage.getItem('role')
    let val1 = localStorage.getItem('cpc')
    setrole(val)
    setcpc(val1)
    console.log("role", val)
    if (val == "g") {
      console.log("val1", val1)
      refresh(val1);
      form.headerSelect = val1
      setForm({ ...form })
    }
    else if (form.headerSelect) {
      console.log("val2", val1)
      refresh(form.headerSelect);
    }
    else {
      if (form) { // Check if form is not null
        console.log("val3", val1)
        setForm((prevForm) => ({
          ...prevForm,
          headerSelect: code || "",
        }));
        refresh(code);
      }
    }
  }, [code, form.headerSelect]);
  const changeOpenCard = (index) => {
    setsliceName((prevSlice) =>
      prevSlice.map((item, i) =>
        i === index ? { ...item, opencard: !item.opencard } : item
      )
    );
  };

  const handleChange = (changed) => {
    setForm((prev) => ({
      ...prev,
      ...changed
    }));
  };

  const headerload = async () => {
    let data = await getHealthRecords()
    console.log("data", data)
    let sum = [{ value: "", label: "โปรดเลือกบริษัท" }]
    if (!data.error) {
      let newdata = data?.data
      for (const element of newdata) {
        sum.push({ value: element?.code, label: element?.name })
      }
    }
    setheaderOption(sum)
  }
  const refresh = useCallback(async (coderefresh) => {
    if (!coderefresh) return;
    setWait(true);

    let [data, data1] = await Promise.all([
      getDashboard({ "company_code": coderefresh }),
      ListHealthRecords({ "company_code": coderefresh })
    ]);

    if (!data.error) {
      setdataMap(data?.data?.[0] || []);
      refreshcaldatagraph(data?.data?.[0]);
    }

    if (!data1.error) {
      setemployeeMap(data1?.data || []);
    }

    setWait(false);
  }, []);

  useEffect(() => {
    if (form.headerSelect) {
      refresh(form.headerSelect);
    }
  }, [form.headerSelect, refresh]);
  const refreshcaldatagraph = (newdata) => {
    let cal = sliceName
    console.log(newdata)
    for (let index = 0; index < cal.length; index++) {
      if (sliceName[index].key == "fbs_detail") {
        cal[index].data = caldataFBS(newdata, cal[index].name, cal[index].key)
      }
      else {
        cal[index].data = caldataSumOther(newdata, cal[index].name, cal[index].key, cal[index].nomalvalue)//เสร็จ
      }
    }
    setsliceName(cal)
  }
  const caldataSumOther = (newdata, name, key, approve) => {
    let val = {
      all: (parseInt(newdata?.gender?.[0]?.count) || 0) + (parseInt(newdata?.gender?.[1]?.count) || 0),
      maleall: newdata?.gender?.find((item) => item.gender === "ชาย")?.count || 0,
      femaleall: newdata?.gender?.find((item) => item.gender === "หญิง")?.count || 0,
      maleapprove: newdata?.[name]?.find((item) => item.gender === "ชาย" && item?.[key] === approve)?.count || 0,
      femaleapprove: newdata?.[name]?.find((item) => item.gender === "หญิง" && item?.[key] === approve)?.count || 0,
      maleunapprove: newdata?.[name]?.reduce((sum, item) => (item.gender === "ชาย" && item?.[key] !== approve ? sum + (parseInt(item.count) || 0) : sum), 0),
      femaleunapprove: newdata?.[name]?.reduce((sum, item) => (item.gender === "หญิง" && item?.[key] !== approve ? sum + (parseInt(item.count) || 0) : sum), 0),
    };
    return val;
  };

  const caldataFBS = (newdata, name, key) => {
    let val = {
      all: (parseInt(newdata?.gender?.[0]?.count) || 0) + (parseInt(newdata?.gender?.[1]?.count) || 0),
      maleall: newdata?.gender?.filter((item) => item.gender === "ชาย")[0]?.count || 0,
      femaleall: newdata?.gender?.filter((item) => item.gender === "หญิง")[0]?.count || 0,
      malehigh: newdata?.[name]?.filter((item) => item.gender === "ชาย" && item?.[key] === "*ผลการตรวจเลือดพบน้ำตาลในเลือดสูงกว่าเกณฑ์ปกติเล็กน้อย(มีความเสี่ยงต่อการเกิดโรคเบาหวาน)ควรหลีกเลี่ยงอาหารที่มีรสหวาน อาหารจำพวกที่มีแป้ง เช่น น้ำหวาน น้ำอัดลม ขนมหวาน ผลไม้ที่มีรสหวานจัด เช่น ทุเรียน ลำไย เงาะ ละมุด องุ่น เป็นต้น ร่วมกับควรออกกำลังกายอย่างสม่ำเสมอ และติดตามระดับน้ำตาลในเลือดทุกปี หากมีอาการกระหายน้ำบ่อย น้ำหนักลด โดยกินอาหารมากขึ้น ร่วมกับปัสสาวะบ่อย ควรปรึกษาแพทย์")[0]?.count || 0,
      femalehigh: newdata?.[name]?.filter((item) => item.gender === "หญิง" && item?.[key] === "*ผลการตรวจเลือดพบน้ำตาลในเลือดสูงกว่าเกณฑ์ปกติเล็กน้อย(มีความเสี่ยงต่อการเกิดโรคเบาหวาน)ควรหลีกเลี่ยงอาหารที่มีรสหวาน อาหารจำพวกที่มีแป้ง เช่น น้ำหวาน น้ำอัดลม ขนมหวาน ผลไม้ที่มีรสหวานจัด เช่น ทุเรียน ลำไย เงาะ ละมุด องุ่น เป็นต้น ร่วมกับควรออกกำลังกายอย่างสม่ำเสมอ และติดตามระดับน้ำตาลในเลือดทุกปี หากมีอาการกระหายน้ำบ่อย น้ำหนักลด โดยกินอาหารมากขึ้น ร่วมกับปัสสาวะบ่อย ควรปรึกษาแพทย์")[0]?.count || 0,
      malenomal: newdata?.[name]?.filter((item) => item.gender === "ชาย" && item?.[key] === "ผลการตรวจเลือดดูระดับน้ำตาลอยู่ในเกณฑ์ปกติ")[0]?.count || 0,
      femalenomal: newdata?.[name]?.filter((item) => item.gender === "หญิง" && item?.[key] === "ผลการตรวจเลือดดูระดับน้ำตาลอยู่ในเกณฑ์ปกติ")[0]?.count || 0,
      malelow: newdata?.[name]?.filter((item) => item.gender === "ชาย" && item?.[key] === "*ระดับน้ำตาลในเลือด(Glucose) ต่ำกว่าปกติ น่าจะเป็นผลมาจากการ อดอาหารมานาน(เพื่อมาเจาะเลือด)ควรตรวจเลือดซ้ำและปรึกษาแพทย์")[0]?.count || 0,
      femalelow: newdata?.[name]?.filter((item) => item.gender === "หญิง" && item?.[key] === "*ระดับน้ำตาลในเลือด(Glucose) ต่ำกว่าปกติ น่าจะเป็นผลมาจากการ อดอาหารมานาน(เพื่อมาเจาะเลือด)ควรตรวจเลือดซ้ำและปรึกษาแพทย์")[0]?.count || 0,
    }
    return val
  }
  // ✅ ปิด Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setmodalData([]);
    setmodalType("")
  };
  const moreDetailClick = async (name) => {
    console.log("Fetching details for:", name);
    let data = await summaryList({ "company_code": form.headerSelect, "type": name });
    console.log("Fetched data:", data);

    if (!data.error && data?.data?.length > 0) {
      setIsModalOpen(true);
      setmodalType("slice")
      setmodalData(data.data);
    } else {
      console.warn("No data found!");
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูล",
        text: "Data not found!",
        timer: 1500, // 3 วินาที
        timerProgressBar: true,
        showConfirmButton: false
      });
      setmodalData([]);
    }
  };
  const downloadExcelAllClick = async () => {
    let workbook = XLSX.utils.book_new(); // ✅ สร้างไฟล์ Excel ใหม่

    try {
      let results = await Promise.all(sliceName.map(async (element) => {
        let response = await summaryList({ "company_code": form.headerSelect, "type": element.excelkey });
        return { name: element.excelkey || element.name, data: response?.data || [] };
      }));

      // ✅ วนลูปเพิ่มแต่ละชุดข้อมูลลงในชีท
      results.forEach(({ name, data }) => {
        if (data.length > 0) {
          let worksheet = XLSX.utils.json_to_sheet(data);
          XLSX.utils.book_append_sheet(workbook, worksheet, name);
        }
      });

      // ✅ ดาวน์โหลดไฟล์ Excel
      XLSX.writeFile(workbook, `HealthData_${form.headerSelect}.xlsx`);
      console.log("✅ ดาวน์โหลดไฟล์ Excel สำเร็จ");
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการสร้างไฟล์ Excel", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดาวน์โหลดไฟล์ Excel ได้",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  };

  const exportToExcel = () => {
    if (!modalData || modalData.length === 0) {
      console.warn("No data to export");
      return;
    }

    // แปลงข้อมูลเป็น Sheet
    const ws = XLSX.utils.json_to_sheet(modalData);

    // สร้าง Workbook และเพิ่ม Sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Summary Data");

    // บันทึกไฟล์
    XLSX.writeFile(wb, `HealthData_${form.headerSelect}.xlsx`);
  };
  const modalEmployeeClick = (data) => {
    console.log(data);
    setmodalType("employeePDF");  // ตั้งค่า modalType เป็น "employeePDF"
    setmodalData(`/Care-Vista-C/individualreport/pdfa4?hn=${data.hn}&en=${data.en}&&autoprint=preview`); // URL ที่ต้องการแสดง
    setIsModalOpen(true);
  }
  const modalEmployeeAllClick = () => {
    setmodalType("employeePDF");  // ตั้งค่า modalType เป็น "employeePDF"
    setmodalData(`/Care-Vista-C/individualreport/pdfa4?companycode=${form?.headerSelect}&&autoprint=preview`); // URL ที่ต้องการแสดง
    setIsModalOpen(true);
  }
  console.log(form?.headerSelect)
  return (
    <Baselayout>
      <div className='w-full h-full bg-[#FFFFFF] p-4 md:px-10 md:pb-10 lg:px-10  lg:pb-20  ' >
        {/* Modal แก้ไขข้อมูล */}
        {isModalOpen && modalData && (
          modalType == "slice" ?
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
              <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-7xl max-h-[85vh] overflow-hidden">

                {/* ✅ หัว Modal (ล็อกไว้ด้านบน) */}
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-4 py-3 border-b border-gray-300">
                  <h3 className="text-xl font-bold text-gray-800">📊 รายละเอียดข้อมูล</h3>
                  <button onClick={closeModal} className="text-gray-500 hover:text-red-500 transition">
                    ❌
                  </button>
                </div>

                {/* ✅ Scrollable Table Section */}
                <div className="overflow-x-auto max-h-[70vh] overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
                  <table className="table-auto w-full border-collapse bg-gradient-to-b from-gray-50 to-white">

                    {/* ✅ หัวตาราง (ล็อกไว้ด้านบน) */}
                    <thead className="bg-gray-200 text-gray-800 sticky -top-0.5 shadow-md">
                      <tr>
                        <th className="border border-gray-300 px-6 py-3 text-left">No.</th>
                        {modalData.length > 0 &&
                          Object.keys(modalData[0]).map((key, index) => (
                            <th key={index} className="border border-gray-300 px-6 py-3 text-left capitalize">
                              {key}
                            </th>
                          ))}
                      </tr>
                    </thead>

                    {/* ✅ ข้อมูลในตาราง */}
                    <tbody className="divide-y divide-gray-200 text-gray-900">
                      {modalData && modalData.length > 0 ? (
                        modalData.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-100 transition">
                            <td className="border border-gray-300 px-6 py-3">{index + 1}</td>
                            {Object.values(item || {}).map((value, subIndex) => (
                              <td key={subIndex} className="border border-gray-300 px-6 py-3">
                                {value !== null && value !== undefined ? value : "-"}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="100%" className="text-center border border-gray-300 px-6 py-4">
                            ❌ ไม่มีข้อมูล
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  {modalData && modalData.length > 0 ?
                    <button
                      onClick={exportToExcel}
                      className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
                    >
                      📥 Export to Excel
                    </button>
                    : ""}
                  <button onClick={closeModal} className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition">
                    ❌ ปิด
                  </button>
                </div>
              </div>
            </div>
            : modalType == "employeePDF" ?
              // ✅ Modal แบบเต็มจอสำหรับ PDF/หน้าเว็บ
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
                <div className="bg-white w-full h-full p-4 flex flex-col">

                  {/* ✅ หัว Modal */}
                  <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                    <h3 className="text-lg font-semibold">📄 รายงานสุขภาพ</h3>
                    <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition">
                      ❌ ปิด
                    </button>
                  </div>

                  {/* ✅ ส่วนแสดง PDF/หน้าเว็บ */}
                  <div className="flex-1 overflow-hidden">
                    <iframe src={modalData} className="w-full h-full border-none"></iframe>
                  </div>
                </div>
              </div>
              : ""
        )}

        <Loading wait={wait} />
        <Toolselect2 disabled={role == "g"} sm options={headerOption || []} label={"บริษัท"} value={form?.headerSelect || ''} onChange={(headerSelect) => {
          const selectedOption = headerOption.find(opt => opt.value === headerSelect);
          handleChange({
            headerSelect,
            headerName: selectedOption?.label || '',
          });
        }} ></Toolselect2>
        <div className='flex relative w-full h-full mt-4'>
          <div className="w-2/5 h-full p-4 mr-2 bg-[#F3F3F3] rounded-2xl">
            <Package dataMap={dataMap?.packageName || []}></Package>
            <Employee company={form?.headerSelect} modalEmployeeAllClick={modalEmployeeAllClick} modalEmployeeClick={modalEmployeeClick} dataMap={employeeMap || []} Companyname={form.headerName}></Employee>
          </div>
          <div className="w-3/5 h-full flex flex-col">
            <div className="w-full p-4 ml-2 mb-2 bg-[#F3F3F3] rounded-2xl">
              <Informationtop key={form.headerSelect} dataMap={sliceName[0].data || {}} Companyname={form.headerName}></Informationtop>
            </div>
            <div className="w-full p-4 ml-2 mt-2 bg-[#F3F3F3] rounded-2xl">
              {sliceName[0].data && (
                <>
                  {console.log("✅ ส่งค่าไป Informationbottom:", sliceName[0].data)}
                  <Informationbottom key={form.headerSelect} dataMap={sliceName[0].data} Companyname={form.headerName} />
                </>
              )}
            </div>
            <div className="w-full  flex flex-col  justify-center items-start py-1 ml-2 mt-1">
              {form?.headerSelect ?
                <div className="w-full flex justify-end items-center">
                  <button onClick={() => downloadExcelAllClick()} className=" p-2 rounded-lg bg-green-500 text-white">Download All</button>
                </div>
                : ""}
              {/* AllmapSlice เสร็จ*/}
              {sliceName.map((items, index) => (
                items.name != "approve" && items.data ?
                  <div className={`w-full bg-[#E6E6E6] rounded-2xl flex flex-colflex flex-col my-3 overflow-hidden transition-all duration-500 ease-in-out ${items.opencard ? 'max-h-[200vh]' : 'max-h-32'}`} >
                    <div className='w-full flex flex-col text-black'>
                      <div className="w-full flex bg-[#7498C6] p-4">
                        <div className="w-11/12 flex justify-start ">
                          <label className='mr-5 text-white  font-bold  text-2xl'>{items.head}</label>
                        </div>
                        <div className="w-1/12 flex justify-end items-center">
                          {items.opencard ?
                            <button onClick={() => changeOpenCard(index)} className="bg-white p-2 h-7 w-7 flex justify-center items-center rounded-md ">
                              <label className='text-[#007AFF] cursor-pointer  text-center'>^</label>
                            </button>
                            :
                            <button onClick={() => changeOpenCard(index)} className="bg-white p-2 h-7 w-7 flex justify-center items-center rounded-md ">
                              <label className='text-[#007AFF] cursor-pointer  text-center'>v</label>
                            </button>
                          }
                        </div>
                      </div>
                    </div>
                    {/* ส่วนที่ต้องการให้ยืดและย่อ */}
                    <div className={`transition-opacity duration-500 ease-in-out text-black  ${items.opencard ? 'opacity-100  p-4 ' : 'opacity-0 h-0'}`}>
                      {/* ใส่เนื้อหาที่ต้องการแสดงเมื่อการ์ดถูกยืด */}
                      {/* <label className='mr-5  font-bold'>bbb</label> */}
                      <div className="w-full p-4 mt-2 bg-[#F3F3F3] rounded-2xl">
                        {items.name == "fbs" ?
                          <SlideFBS key={JSON.stringify(items)} moreDetailClick={moreDetailClick} dataMap={items} />
                          :
                          <SlideAll key={JSON.stringify(items)} moreDetailClick={moreDetailClick} dataMap={items} />
                        }
                      </div>

                    </div>
                  </div>
                  : ""
              ))}

            </div>
          </div>
        </div>
      </div >

    </Baselayout >
  )
}

export default page