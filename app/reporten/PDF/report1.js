import { report } from "@/api/api"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"


export default function Report() {
  const router = useRouter()
  const search_id = router.query.search
  const [list, setList] = useState([])
  const [listtable, setListTable] = useState([])


  useEffect(() => {
    if (search_id) {
      onload()
    }
  }, [search_id])

  const onload = async () => {
    let res = []//await report(search_id)
    const data = res?.filter((x) => [
      'Amphetamines ( Rapid screening )', 'Coccaine', 'Morphine (Heroine, Opiate)',
      'Marijuana (Cannabinoids)', 'Phencyclidine (PCP)', 'HBsAg', 'Hepatitis C Antibody',
      'Prostatic Specific Antigen (PSA)', 'Uric Acid', 'Serum T4','Triiodothyronine (T3)', 'Microscopy', 
      'Alpha Fetoprotein (AFP)', 'ALP (Alk Phos)', 'ALT (Alanine Transaminase)',
      'Triglyceride', 'HIV Antibody (Stat)', '2,5 Hexanedione in Urine', 'AST (Aspartate Transaminase)',
      'Blood Urea Nitrogen', 'Carcinoembryonic Antigen (CEA)', 'Hepatitis A Antibody ( IgG+ IgM )( Total )',
      'Hepatitis B surface Antibody', 'Urease test', 'Glycated Hb (HbA1c)', 'Cholesterol', 'HDL-Cholesterol',
      'LDL- Cholesterol (Direct)', 'Stool Examination', 'GGT (Gamma GT)', 'Triiodothyronine Free (Free T3)',
      'Thyroxine Free (Free T4)', 'Vitamin D ( 25-Hydroxy vitamin D total )( NHS)', 'Hematology',
      'Occult blood ( Fecal immunochemical test )', 'Clinical Chemistry', 'Electrolytes',
      'Thyroid Stimulating Hormone (TSH)', 'Lead in Blood (ICP-MS)'])
    setListTable(chunkAndAddRowNum(data, 8))
    setList(res)
  }

  function chunkAndAddRowNum(dataArray, chunkSize) {
    const result = [];
    let rownum = 1;
    for (let i = 0; i < dataArray.length; i += chunkSize) {
      const chunk = dataArray.slice(i, i + chunkSize).map(item => ({ ...item, rownum }));
      result.push(chunk);
      rownum += chunkSize;
    }
    return result;
  }


  return <>
    <link rel="stylesheet" href="style.css" />
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    {/* รายงานผลตรวจสุขภาพ */}
    <div className="A4">
      <div className="page pt-2 pl-12 pr-12">
        <div className="mt-1 w-full flex justify-between">
          <div className="flex">
            <img
              src="/Images/logo_1.png"
              style={{ width: 300, height: 70 }}
              alt=""
            />
          </div>
          <div className="w-[238px] text-[16px] flex flex-col">
            <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
            <div className="text-end">
              เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
            </div>
            <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
          </div>
        </div>
        <div className="mt-10 w-full flex justify-between">
          <div />
          <div className="font-bold text-[24px] underline">
            รายงานผลตรวจสุขภาพ
          </div>
          <div />
        </div>
        <div className="pt-20 w-full flex justify-between">
          <div />
          <div className="flex">
            <img
              src="/Images/background.png"
              style={{ width: "auto", height: 400 }}
              alt=""
            />
          </div>
          <div />
        </div>
        <div className="text-[18px] w-full flex pt-10 pl-10">
          <label className="font-bold">ชื่อ-สกุล :</label>
          <label className="pl-2">นางสาว ฐิติพร ประวัติชัยศรี</label>
        </div>
        <div className="text-[18px] w-full flex pt-0 pl-10">
          <label className="font-bold">เลขประจำตัวผู้ป่วย:</label>
          <label className="pl-2">{list[0]?.HN}</label>
        </div>
        <div className="text-[18px] w-full flex pt-0 pl-10">
          <label className="font-bold">
            ศูนย์ตรวจสุขภาพ โรงพยาบาลธนบุรีบำรุงเมือง
          </label>
        </div>
        <div className="text-[18px] w-full flex pt-0 pl-10">
          <label className="font-bold">611 ถนน บำรุงเมือง แขวง คลองมหานาค</label>
        </div>
        <div className="text-[18px] w-full flex pt-0 pl-10">
          <label className="font-bold">
            เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
          </label>
        </div>
      </div>
    </div>


    {/* หน้า2 */}
    <div className="A4">
      <div className="page pt-2 pl-2 pr-2">
        <div className="mt-1 w-full flex justify-between">
          <div className="flex">
            <img
              src="/Images/logo_1.png"
              style={{ width: 300, height: 70 }}
              alt=""
            />
          </div>
          <div className="w-[238px] text-[16px] flex flex-col">
            <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
            <div className="text-end">
              เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
            </div>
            <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
          </div>
        </div>
        <div className="text-[18px] pt-5 text-justify">
          <div className="flex text-center">
            <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
            <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
            <span className="ml-5" />
            <label className="w-32 h-[18px]" />
            <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
            <label className="w-36 h-[18px]">{list[0]?.HN}</label>
          </div>
          <div className="flex text-center">
            <span className="pl-8">วันเกิด :</span>
            <label className="w-40 h-[18px]">28 มกราคม 2533</label>
            <span className="ml-3" />
            <label className="w-44 h-[18px]" />
            <span className="ml-1">อายุ:</span>
            <label className="w-40 h-[18px]">33</label>
          </div>
        </div>
        <div className="text-[18px] pt-0 text-justify">
          <div className="flex text-center">
            <span className="pl-8 pr-2">เพศ:</span>
            <label className="w-28 h-[18px]">หญิง</label>
            <span className="ml-16" />
            <label className="w-44 h-[18px]" />
            <span className="ml-1">วันที่ตรวจ:</span>
            <label className="w-36 h-[18px]">20 พฤศจิกายน 2566</label>
          </div>
        </div>
        <p className="w-full flex border-b pt-3 border-black" />
        <div className="text-[18px] pt-2 text-justify">
          <div className="flex text-center">
            <span className="pl-8 pr-2">ส่วนสูง:</span>
            <label className="w-20 h-[18px]">163 ซม.</label>
            <span className="ml-1">น้ำหนัก:</span>
            <label className="w-20 h-[18px]">80 กก.</label>
            <span className="ml-10">ดัชนีมวลกาย:</span>
            <label className="w-16 h-[18px]"> 30.11</label>
            <span className="ml-5">ความดันโลหิต(มม.ปรอท):</span>
            <label className="w-20 h-[18px]">120/66</label>
          </div>
        </div>
        <div className="text-[18px] pt-0 text-justify">
          <div className="flex text-center">
            <span className="pl-8 pr-2">ชีพจร (ครั้ง/นาที):</span>
            <label className="w-28 h-[18px]">67</label>
            <span className="ml-16" />
            <label className="w-20 h-[18px]" />
            <span className="ml-20 pl-3">อัตราการหายใจ(ครั้ง/นาที):</span>
            <label className="w-10 h-[18px]">20</label>
          </div>
        </div>
        <div className="text-[18px] pt-0 pb-4 text-justify">
          <div className="flex text-center">
            <span className="pl-8 pr-2">การออกกจาลังกาย:</span>
            <label className="w-28 h-[18px]">ไม่เคย</label>
            <span className="ml-16" />
            <label className="w-40 h-[18px]" />
            <span className="">รอบเอว:</span>
            <label className="w-36 h-[18px]">-</label>
          </div>
        </div>
        <table className="table-report">
          <thead>
            <tr className="">
              <th className="w-[15px] bg-gray-100">
                <p className="text-[16px]">ประวัติการเจ็บป่วย</p>
              </th>
              <th className="w-10">
                <p className="text-[16px]">ไม่มี</p>
              </th>
              <th className="w-10 bg-gray-100">
                <p className="text-[16px]">มี</p>
              </th>
              <th className="w-10">
                <p className="text-[16px]">ไม่ทราบ</p>
              </th>
              <th className="w-40 bg-gray-100">
                <p className="text-[16px]">หมายเหตุ</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">การเจ็บป่วยปปัจจุบัน </label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ยาที่ใช้ประจำ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">โรคประจำตัว</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">การแพ้ยาหรือสารอื่นๆ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-spacing table-report">
          <thead>
            <tr className="">
              <th className="w-[15px] bg-gray-100">
                <p className="text-[18px]">ประวัติครอบครัว</p>
              </th>
              <th className="w-10">
                <p className="text-[16px]">ไม่มี</p>
              </th>
              <th className="w-10 bg-gray-100">
                <p className="text-[16px]">มี</p>
              </th>
              <th className="w-10">
                <p className="text-[16px]">ไม่ทราบ</p>
              </th>
              <th className="w-40 bg-gray-100">
                <p className="text-[16px]">หมายเหตุ</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">เบาหวาน </label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>ย่า</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">หัวใจ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ไขมันสูง</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">โลหิตจาง</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ความดันโลหิตสูง</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">มะเร็ง</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ไวรัสตับอักเสบ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">วัณโรค</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ภูมิแพ้</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">อื่นๆ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-spacing table-report">
          <thead>
            <tr className="">
              <th className="w-[15px] bg-gray-100">
                <p className="text-[16px]">ประวัติการเจ็บป่วยในอดีต</p>
              </th>
              <th className="w-10">
                <p className="text-[16px]">ไม่มี</p>
              </th>
              <th className="w-10 bg-gray-100">
                <p className="text-[16px]">มี</p>
              </th>
              <th className="w-10">
                <p className="text-[16px]">ไม่ทราบ</p>
              </th>
              <th className="w-40 bg-gray-100">
                <p className="text-[16px]">หมายเหตุ</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">อุบัติเหตุ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>9 ปีที่แล้ว อุบัติเหตุทางรถยนต์</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">การผ่าตัด</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>
                  9 ปีที่แล้วผ่าตัดขาข้างซ้ายและดามเหล็กแขนซ้ายและขาขวา
                  (ปัจจุบันเอาออกแล้ว), 12 ปีที่แล้ว ผ่าตัดใส้ติ่ง, 3
                  ปีที่แล้วผ่าตัดทอมซิล
                </label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">นอนโรงพยาบาล</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    {/* สรุปการตรวจร่างกาย */}
    <div className="A4">
      <div className="page pt-2 pl-12 pr-12">
        <div className="mt-1 w-full flex justify-between">
          <div className="flex">
            <img
              src="/Images/logo_1.png"
              style={{ width: 300, height: 70 }}
              alt=""
            />
          </div>
          <div className="w-[238px] text-[16px] flex flex-col">
            <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
            <div className="text-end">
              เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
            </div>
            <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
          </div>
        </div>
        <div className="text-[18px] pt-5 text-justify">
          <div className="flex text-center">
            <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
            <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
            <span className="ml-5" />
            <label className="w-32 h-[18px]" />
            <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
            <label className="w-36 h-[18px]">{list[0]?.HN}</label>
          </div>
        </div>
        <p className="w-full flex border-b pt-3 border-black" />
        <div className="text-center text-[20px] font-bold">
          สรุปการตรวจร่างกาย
        </div>
        <table className="table-auto table-spacing table-report">
          <thead>
            <tr className="">
              <th className="bg-gray-100">
                <p className="text-[18px]">การตรวจร่างกาย</p>
              </th>
              <th>
                <p className="text-[18px]">ปกติ</p>
              </th>
              <th className="bg-gray-100">
                <p className="text-[18px]">ผิดปกติ</p>
              </th>
              <th>
                <p className="text-[18px]">ไม่ตรวจ</p>
              </th>
              <th className="bg-gray-100">
                <p className="text-[18px]">หมายเหตุ</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ลักษณะทั่วไป </label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ศรีษะ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ตา</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">หู</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">จมูก</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ช่องปาก</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">คอ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ทรวงอก</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">เต้านม</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">หัวใจ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ช่องท้อง</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ตับ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ม้าม</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">กระดูกสันหลัง</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">แขน-ขา</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>ผ่าตัดขาข้างซ้าย</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ผิวหนัง</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ระบบทางเดินปัสสาวะ</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">อารมณ์</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
            <tr className="text-center">
              <td className="ml-1 text-[18px] bg-gray-100">
                <label className="ml-1">ระบบประสาท</label>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px]">
                <div className="flex justify-center items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="ml-1 text-[18px] bg-gray-100">
                <label>-</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    {/* ผลการตรวจความสมบูรณ์ของเม็ดเลือด */}
    {(list?.filter((x) => ['Complete Blood Count'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-1 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-2 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN || '-'}</label>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <table className="table-report">
              <thead>
                <tr className="">
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">
                      ผลการตรวจความสมบูรณ์ของเม็ดเลือด
                    </label>
                  </td>
                </tr>
                {list?.filter((x) => x.Category == 'Complete Blood Count').map((d, index2) => (
                  <tr key={index2} className="text-center">
                    <td className="bg-gray-100 w-36 ml-1 text-[16px]">
                      <label className="ml-1">{d?.Desc || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.NormalRange || '-'}</label>
                    </td>
                    <td className="w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY1 || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY2 || '-'}</label>
                    </td>
                    <td className="w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY3 || '-'}</label>
                    </td>
                  </tr>
                ))}
              </tbody >
            </table>
          </div>
        </div>
      </div> : ""
    }


    {/* ระดับน้ำตาล */}
    {(list?.filter((x) => ['Glucose (Fasting)'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-1 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-2 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN || '-'}</label>
            </div>
          </div>
          <div className="w-full pt-2 flex items-center justify-center">
            <table className="table-report">
              <thead>
                <tr>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">ระดับน้ำตาล</label>
                  </td>
                </tr>
                {list?.filter((x) => x.Category == 'Glucose (Fasting)').map((d, index2) => (
                  <tr key={index2} className="text-center">
                    <td className="bg-gray-100 w-36 ml-1 text-[16px]">
                      <label className="ml-1">{d?.Desc || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.NormalRange || '-'}</label>
                    </td>
                    <td className="w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY1 || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY2 || '-'}</label>
                    </td>
                    <td className="w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY3 || '-'}</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : ""
    }



    {/* ผลการตรวจการทำงานของไต */}
    {(list?.filter((x) => ['Creatinine'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-1 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-1 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN || '-'}</label>
            </div>
          </div>
          <div className="w-full pt-2 flex items-center justify-center">
            <table className="table-report">
              <thead>
                <tr>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">
                      ผลการตรวจการทำงานของไต
                    </label>
                  </td>
                </tr>
                {list?.filter((x) => x.Category == 'Creatinine').map((d, index2) => (
                  <tr key={index2} className="text-center">
                    <td className="bg-gray-100 w-36 ml-1 text-[16px]">
                      <label className="ml-1">{d?.Desc || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.NormalRange || '-'}</label>
                    </td>
                    <td className="w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY1 || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY2 || '-'}</label>
                    </td>
                    <td className="w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY3 || '-'}</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : ""
    }


    {/* ผลการตรวจการทจางานของตับ */}
    {(list?.filter((x) => ['Liver Function Test (8 Tests)'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-1 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-2 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN || '-'}</label>
            </div>
          </div>
          <div className="w-full pt-2 flex items-center justify-center">
            <table className="table-report">
              <thead>
                <tr>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">
                      ผลการตรวจการทจางานของตับ
                    </label>
                  </td>
                </tr>
                {list?.filter((x) => x.Category == 'Liver Function Test (8 Tests)').map((d, index2) => (
                  <tr key={index2} className="text-center">
                    <td className="bg-gray-100 w-36 ml-1 text-[16px]">
                      <label className="ml-1">{d?.Desc || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.NormalRange || '-'}</label>
                    </td>
                    <td className="w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY1 || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY2 || '-'}</label>
                    </td>
                    <td className="w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY3 || '-'}</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : ""
    }


    {/* ผลการตรวจระดับไขมันในเลือด */}
    {(list?.filter((x) => ['Lipid Profile'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-2 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-5 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN || '-'}</label>
            </div>
          </div>
          <div className="w-full pt-4 flex flex-col items-center justify-center">
            <table className="table-report">
              <thead>
                <tr>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">
                      ผลการตรวจระดับไขมันในเลือด
                    </label>
                  </td>
                </tr>
                {list.filter((x) => x.Category == 'Lipid Profile').map((d, index2) => (
                  <tr key={index2} className="text-center">
                    <td className="bg-gray-100 w-36 ml-1 text-[16px]">
                      <label className="ml-1">{d?.Desc || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.NormalRange || '-'}</label>
                    </td>
                    <td className="w-40 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY1 || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY2 || '-'}</label>
                    </td>
                    <td className="w-44 ml-1 text-[16px]">
                      <label className="ml-1">{d?.ResultY3 || '-'}</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : ""
    }

    {/* ผลการตรวจปัสสาวะสมบูรณ์แบบ */}
    {(list?.filter((x) => ['Urine Examination'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-2 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-5 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN}</label>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <table className="table-report">
              <thead>
                <tr>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">
                      ผลการตรวจปัสสาวะสมบูรณ์แบบ
                    </label>
                  </td>
                </tr>
                {list?.filter((x) => x.Category == 'Urine Examination').map((d, index2) => (
                  <tr key={index2} className="text-center">
                    <td className="bg-gray-100 w-36 ml-1 text-[18px]">
                      <label className="ml-1">{d?.Desc || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-40 ml-1 text-[18px]">
                      <label className="ml-1">{d?.NormalRange || '-'}</label>
                    </td>
                    <td className="w-40 ml-1 text-[18px]">
                      <label className="ml-1">{d?.ResultY1 || '-'}</label>
                    </td>
                    <td className="bg-gray-100 w-44 ml-1 text-[18px]">
                      <label className="ml-1">{d?.ResultY2 || '-'}</label>
                    </td>
                    <td className="w-44 ml-1 text-[18px]">
                      <label className="ml-1">{d?.ResultY3 || '-'}</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : ""
    }



    {listtable?.map(data => (
      <div key={data?.index} className="A4">
        <div className="A4">
          <div className="page pt-1 pl-12 pr-12">
            <div className="mt-1 w-full flex justify-between">
              <div className="flex">
                <img
                  src="/Images/logo_1.png"
                  style={{ width: 300, height: 70 }}
                  alt=""
                />
              </div>
              <div className="w-[238px] text-[16px] flex flex-col">
                <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
                <div className="text-end">
                  เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
                </div>
                <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
              </div>
            </div>
            <div className="text-[18px] pt-1 text-justify">
              <div className="flex text-center">
                <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
                <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
                <span className="ml-5" />
                <label className="w-32 h-[18px]" />
                <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
                <label className="w-36 h-[18px]">{list[0]?.HN}</label>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <table className="table-report">
                <thead>
                  <tr>
                    <th className="font-normal bg-gray-100" rowSpan={3}>
                      รายการตรวจ
                    </th>
                    <th className="font-normal bg-gray-100" rowSpan={3}>
                      ค่าปกติ
                    </th>
                    <th className="font-normal bg-gray-100" colSpan={3}>
                      วันที่ตรวจ
                    </th>
                  </tr>
                  <tr>
                    <th className="font-normal" rowSpan={3}>
                      20 พ.ย. 2566 <br />
                    </th>
                    <th className="font-normal bg-gray-100" rowSpan={3}>
                      20 พ.ย. 2565 <br />
                    </th>
                    <th className="font-normal" rowSpan={3}>
                      20 พ.ย. 2564
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={12} className="text-center bg-[#D0EFFF]">
                      <label className="font-bold text-[16px]">
                        ผลการตรวจอื่นๆ
                      </label>
                    </td>
                  </tr>

                  {data.map((d, index2) => (
                    <tr key={index2} className="text-center">
                      <td className="bg-gray-100 w-36 ml-1 text-[18px]">
                        <label className="ml-1">{d?.Desc || '-'}</label>
                      </td>
                      <td className="bg-gray-100 w-40 ml-1 text-[18px]">
                        <label className="ml-1">{d?.NormalRange || '-'}</label>
                      </td>
                      <td className="w-40 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY1 || '-'}</label>
                      </td>
                      <td className="bg-gray-100 w-44 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY2 || '-'}</label>
                      </td>
                      <td className="w-44 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY3 || '-'}</label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ))}

    {/* ผลการตรวจอื่นๆ1 */}
    {/* {(list?.filter((x) => [
      'Amphetamines ( Rapid screening )', 'Coccaine', 'Morphine (Heroine, Opiate)',
      'Marijuana (Cannabinoids)', 'Phencyclidine (PCP)', 'HBsAg', 'Hepatitis C Antibody', 'Prostatic Specific Antigen (PSA)',
      'Uric Acid', 'Serum T4', 'Thyroid Stimulating Hormone (TSH)', 'Triiodothyronine (T3)', 'Microscopy',
      'Alpha Fetoprotein (AFP)', 'ALP (Alk Phos)', 'ALT (Alanine Transaminase)', 'Triglyceride',
      'HIV Antibody (Stat)', '2,5 Hexanedione in Urine'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-1 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-1 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN}</label>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <table className="table-report">
              <thead>
                <tr>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">
                      ผลการตรวจอื่นๆ
                    </label>
                  </td>
                </tr>
                {list?.filter((x) => ['Amphetamines ( Rapid screening )', 'Coccaine', 'Morphine (Heroine, Opiate)',
                  'Marijuana (Cannabinoids)', 'Phencyclidine (PCP)', 'HBsAg', 'Hepatitis C Antibody', 'Prostatic Specific Antigen (PSA)',
                  'Uric Acid', 'Serum T4', 'Thyroid Stimulating Hormone (TSH)', 'Triiodothyronine (T3)', 'Microscopy',
                  'Alpha Fetoprotein (AFP)', 'ALP (Alk Phos)', 'ALT (Alanine Transaminase)', 'Triglyceride',
                  'HIV Antibody (Stat)', '2,5 Hexanedione in Urine'].includes(x.Category)).map((d, index2) => (
                    <tr key={index2} className="text-center">
                      <td className="bg-gray-100 w-36 ml-1 text-[18px]">
                        <label className="ml-1">{d?.Desc || '-'}</label>
                      </td>
                      <td className="bg-gray-100 w-40 ml-1 text-[18px]">
                        <label className="ml-1">{d?.NormalRange || '-'}</label>
                      </td>
                      <td className="w-40 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY1 || '-'}</label>
                      </td>
                      <td className="bg-gray-100 w-44 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY2 || '-'}</label>
                      </td>
                      <td className="w-44 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY3 || '-'}</label>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : ""
    } */}

    {/* อื่นๆ2 */}
    {/* {(list?.filter((x) => [
      'AST (Aspartate Transaminase)', 'Blood Urea Nitrogen', 'Carcinoembryonic Antigen (CEA)', 'Hepatitis A Antibody ( IgG+ IgM )( Total )',
      'Hepatitis B surface Antibody', 'Urease test', 'Glycated Hb (HbA1c)', 'Cholesterol', 'HDL-Cholesterol', 'LDL- Cholesterol (Direct)',
      'Stool Examination', 'GGT (Gamma GT)', 'Triiodothyronine Free (Free T3)', 'Thyroxine Free (Free T4)',
      'Vitamin D ( 25-Hydroxy vitamin D total )( NHS)', 'Hematology'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-1 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-1 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN}</label>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <table className="table-report">
              <thead>
                <tr>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">
                      ผลการตรวจอื่นๆ
                    </label>
                  </td>
                </tr>
                {list?.filter((x) => [
                  'AST (Aspartate Transaminase)', 'Blood Urea Nitrogen', 'Carcinoembryonic Antigen (CEA)', 'Hepatitis A Antibody ( IgG+ IgM )( Total )',
                  'Hepatitis B surface Antibody', 'Urease test', 'Glycated Hb (HbA1c)', 'Cholesterol', 'HDL-Cholesterol', 'LDL- Cholesterol (Direct)',
                  'Stool Examination', 'GGT (Gamma GT)', 'Triiodothyronine Free (Free T3)', 'Thyroxine Free (Free T4)',
                  'Vitamin D ( 25-Hydroxy vitamin D total )( NHS)', 'Hematology'].includes(x.Category)).map((d, index2) => (
                    <tr key={index2} className="text-center">
                      <td className="bg-gray-100 w-36 ml-1 text-[18px]">
                        <label className="ml-1">{d?.Desc || '-'}</label>
                      </td>
                      <td className="bg-gray-100 w-40 ml-1 text-[18px]">
                        <label className="ml-1">{d?.NormalRange || '-'}</label>
                      </td>
                      <td className="w-40 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY1 || '-'}</label>
                      </td>
                      <td className="bg-gray-100 w-44 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY2 || '-'}</label>
                      </td>
                      <td className="w-44 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY3 || '-'}</label>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : ""
    } */}


    {/* อื่นๆ3 */}
    {/* {(list?.filter((x) => ['Occult blood ( Fecal immunochemical test )', 'Clinical Chemistry', 'Electrolytes',
      'Thyroid Stimulating Hormone (TSH)', 'Lead in Blood (ICP-MS)'].includes(x.Category))).length > 0 ?
      <div className="A4">
        <div className="page pt-1 pl-12 pr-12">
          <div className="mt-1 w-full flex justify-between">
            <div className="flex">
              <img
                src="/Images/logo_1.png"
                style={{ width: 300, height: 70 }}
                alt=""
              />
            </div>
            <div className="w-[238px] text-[16px] flex flex-col">
              <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
              <div className="text-end">
                เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
              </div>
              <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
            </div>
          </div>
          <div className="text-[18px] pt-1 text-justify">
            <div className="flex text-center">
              <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
              <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
              <span className="ml-5" />
              <label className="w-32 h-[18px]" />
              <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
              <label className="w-36 h-[18px]">{list[0]?.HN}</label>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <table className="table-report">
              <thead>
                <tr>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    รายการตรวจ
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    ค่าปกติ
                  </th>
                  <th className="font-normal bg-gray-100" colSpan={3}>
                    วันที่ตรวจ
                  </th>
                </tr>
                <tr>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2566 <br />
                  </th>
                  <th className="font-normal bg-gray-100" rowSpan={3}>
                    20 พ.ย. 2565 <br />
                  </th>
                  <th className="font-normal" rowSpan={3}>
                    20 พ.ย. 2564
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center bg-[#D0EFFF]">
                    <label className="font-bold text-[16px]">
                      ผลการตรวจอื่นๆ
                    </label>
                  </td>
                </tr>
                {list?.filter((x) => ['Occult blood ( Fecal immunochemical test )', 'Clinical Chemistry', 'Electrolytes',
                  'Thyroid Stimulating Hormone (TSH)', 'Lead in Blood (ICP-MS)'].includes(x.Category)).map((d, index2) => (
                    <tr key={index2} className="text-center">
                      <td className="bg-gray-100 w-36 ml-1 text-[18px]">
                        <label className="ml-1">{d?.Desc || '-'}</label>
                      </td>
                      <td className="bg-gray-100 w-40 ml-1 text-[18px]">
                        <label className="ml-1">{d?.NormalRange || '-'}</label>
                      </td>
                      <td className="w-40 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY1 || '-'}</label>
                      </td>
                      <td className="bg-gray-100 w-44 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY2 || '-'}</label>
                      </td>
                      <td className="w-44 ml-1 text-[18px]">
                        <label className="ml-1">{d?.ResultY3 || '-'}</label>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> : ""
    } */}



    {/* เอกซเรย์ทรวงอก (Chest X-ray) */}
    <div className="A4">
      <div className="page pt-2 pl-12 pr-12">
        <div className="mt-1 w-full flex justify-between">
          <div className="flex">
            <img
              src="/Images/logo_1.png"
              style={{ width: 300, height: 70 }}
              alt=""
            />
          </div>
          <div className="w-[238px] text-[16px] flex flex-col">
            <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
            <div className="text-end">
              เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
            </div>
            <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
          </div>
        </div>
        <div className="text-[18px] pt-5 text-justify">
          <div className="flex text-center">
            <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
            <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
            <span className="ml-5" />
            <label className="w-32 h-[18px]" />
            <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
            <label className="w-36 h-[18px]">{list[0]?.HN}</label>
          </div>
        </div>
        <div className="">
          <table className="table-report">
            <thead>
              <tr>
                <td colSpan={12} className="text-center">
                  <label className="font-bold text-[16px]">
                    เอกซเรย์ทรวงอก (Chest X-ray)
                  </label>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="pt-4 w-full flex flex-col items-center justify-center">
          <table className="table-report">
            <tbody>
              <tr className="">
                <td colSpan={12} className="text-start">
                  <label className="font-bold text-[16px] ">
                    Chest film, PA upright
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">
                    Comparison: None.
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">Findings:</label>
                  <br />
                  <label className="font-bold text-[16px]">
                    - Trachea is in position.
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">
                    - No cardiomegaly is shown.
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">
                    - Mediastinum appears unremarkable.
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">
                    - No active pulmonary infiltration, mass or nodule is
                    detected.
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">
                    - Both costophrenic angles are sharp.
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">
                    - Bony thorax is intact.
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">Impression:</label>
                  <br />
                  <label className="font-bold text-[16px]">
                    - No active chest disease.
                  </label>
                  <br />
                  <label className="font-bold text-[16px]">
                    สรุปผล : <span>ผลการตรวจเอกซเรย์ทรวงอกปกติ</span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pt-4">
          <table className="table-report">
            <thead>
              <tr>
                <td colSpan={12} className="text-center">
                  <label className="font-bold text-[16px]">
                    การตรวจคลื่นไฟฟ้าหัวใจ (EKG)
                  </label>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="pt-4">
          <table className="table-report">
            <tbody>
              <tr>
                <td colSpan={12} className="text-start">
                  <label className="font-bold text-[16px]">
                    การตรวจคลื่นไฟฟ้าหัวใจ อยู่ในเกณฑ์ปกติ
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


    {/* สรุปผลการตรวจ และคำแนะนำเพิ่มเติม */}
    <div className="A4">
      <div className="page pt-2 pl-12 pr-12">
        <div className="mt-1 w-full flex justify-between">
          <div className="flex">
            <img
              src="/Images/logo_1.png"
              style={{ width: 300, height: 70 }}
              alt=""
            />
          </div>
          <div className="w-[238px] text-[16px] flex flex-col">
            <div className="text-end">611 ถนน บำรุงเมือง แขวง คลองมหานาค</div>
            <div className="text-end">
              เขต ป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100
            </div>
            <div className="text-end">โทรศัพท์ : 0-2220-7999</div>
          </div>
        </div>
        <div className="text-[18px] pt-5 text-justify">
          <div className="flex text-center">
            <span className="pl-8 pr-1">ชื่อ-สกุล:</span>
            <label className="w-48 h-[18px]">นางสาว ฐิติพร ประวัติชัยศรี</label>
            <span className="ml-5" />
            <label className="w-32 h-[18px]" />
            <span className="ml-1">เลขประจำตัวผู้ป่วย:</span>
            <label className="w-36 h-[18px]">{list[0]?.HN}</label>
          </div>
        </div>
        <div className="">
          <table className="table-report">
            <thead>
              <tr>
                <td colSpan={12} className="text-center">
                  <label className="font-bold text-[16px]">
                    สรุปผลการตรวจ และคำแนะนำเพิ่มเติม
                  </label>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="text-[16px] pt-4 w-full flex flex-col items-start justify-center">
          <label className="font-bold">การวินิจฉัยโรค : </label>
          <label>- มีภาวะเกล็ดเลือดสูงกว่าปกติเล็กน้อย</label>
          <label>- ระดับน้ำตาลในเลือดสูง (ภาวะก่อนเบาหวาน)</label>
          <label>- ไม่มีไขมันในเลือด</label>
        </div>
        <div className="text-[16px] pt-4 w-full flex flex-col items-start justify-center">
          <label className="font-bold">คำแนะนำ : </label>
          <label>
            -
            แนะนำปรึกษาอายุรแพทย์โรคเลือดเพื่อรักษามีภาวะเกล็ดเลือดสูงกว่าปกติเล็กน้อย
          </label>
          <label>
            -
            ผลการตรวจเลือดพบน้ำตาลในเลือดสูงกว่าเกณฑ์ปกติเล็กน้อย(มีความเสี่ยงต่อการเกิดโรคเบาหวาน)
            ควรหลีกเลี่ยงอาหารที่มีรสหวาน อาหารจำพวกที่มีแป้ง เช่น น้ำหวาน
            น้ำอัดลม ขนมหวาน ผลไม้ที่มีรสหวานจัด เช่น ทุเรียน ลำไย เงาะ ละมุด
            องุ่น เป็นต้น ร่วมกับควรออกกำลังกายอย่างสม่ำเสมอ
            และติดตามระดับน้ำตาลในเลือดทุกปี หากมีอาการกระหายน้ำบ่อย น้ำหนักลด
            โดยกินอาหารมากขึ้น ร่วมกับปัสสาวะบ่อย ควรปรึกษาแพทย์
          </label>
          <label>
            - ผลการตรวจเลือดดูระดับไขมันคอเรสเตอรอลสูงกว่าเกณฑ์ปกติเล็กน้อย
            ควรงดอาหารไขมัน เช่น กะทิ ไขมันสัตว์ เนย ไข่แดง เครื่องในสัตว์
            หนังสัตว์ น้ำมันมะพร้าว น้ำมันปาล์ม อาหารทะเล(เช่น ปลาหมึก หอยนางรม)
          </label>
          <label>
            - ไขมันโคเรสเตอรอลชนิดไม่ดี (LDL) ในเลือดสูง ควรลดอาหารทะเล
            เครื่องในสัตว์ หนังสัตว์ กะทิ ครีม เนย ไข่แดง
            ไขมันทรานส์และไขมันอิ่มตัว เช่น ครีมเทียม เบเกอรี่ น้ำมันหมู
            น้ำมันมะพร้าว ออกกำลังกายสม่ำเสมอ ควรลดหรือบุหรี่ (ถ้าสูบ)
          </label>
        </div>
        <div className="text-[16px] pt-4 w-full flex flex-col items-start justify-center">
          <label className="font-bold">ติดตาม : </label>
          <label>
            - ติดตามระดับไขมันในเลือดและระดับน้ำตาล (FBS, HbA1C) ในเลือด
            3เดือนข้างหน้า
          </label>
        </div>
        <div className="pt-6 w-full flex justify-between">
          <div />
          <div className="w-36 flex border-b border-black border-dotted" />
          <div />
        </div>
        <div className="pt-0 w-full flex justify-between">
          <div />
          <div className="text-[16px]">พญ.ธัญกมล ไอศูรย์พิศาลศิริ</div>
          <div />
        </div>
        <div className="pt-0 w-full flex justify-between">
          <div />
          <div className="text-[16px]">แพทย์ผู้ตรวจ</div>
          <div />
        </div>
        <div className="pt-0 w-full flex justify-between">
          <div />
          <div className="text-[16px]">
            วันที่ตรวจ: <span>20 พฤศจิกายน 2566</span>
          </div>
          <div />
        </div>
      </div>
    </div>


  </>
}