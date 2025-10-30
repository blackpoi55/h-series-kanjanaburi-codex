import { report } from "@/api/api"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"





export default function Report() {
    const router = useRouter()
    const search_id = router.query.search
    const [list, setList] = useState([])
    const [newdata, setNewdata] = useState([])
    const [datasecond, setDatasecond] = useState([])

    console.log(list)

    useEffect(() => {
        if (search_id) {
            onload()
        }
    }, [search_id])


    const onload = async () => {
        let res = []//await report(search_id)
        setNewdata(changedata(res))
        setDatasecond(changedatasecond(res))
        setList(res)
    }


    const changedata = (data) => {
        let newdata = []
        let AAA = data.filter((a) => a.Category == "Hematology" || a.Category == "Complete Blood Count")

        let Other = data.filter((a) => a.Category != "Hematology" && a.Category != "Complete Blood Count"
            && a.Category != "Urine Examination" && a.Category != "Tumor marker"
            && a.Category != "Alpha Fetoprotein (AFP)" && a.Category != "Carcinoembryonic Antigen (CEA)"
            && a.Category != "Prostatic Specific Antigen (PSA)" && a.Category != "Hepatitis A Antibody ( IgG+ IgM )( Total )"
            && a.Category != "Hepatitis B surface Antibod" && a.Category != "HBsAg" && a.Category != "Hepatitis C Antibody"
            && a.Category != "Amphetamines ( Rapid screening )" && a.Category != "Coccaine" && a.Category != "Morphine (Heroine, Opiate)"
            && a.Category != "Marijuana (Cannabinoids)" && a.Category != "Phencyclidine (PCP)")


        let dataA = chunkAndAddRowNum(AAA, 30)
        let dataB = chunkAndAddRowNum(Other, 50)
        const maxLength = Math.max(dataA.length, dataB.length);
        for (let index = 0; index < maxLength; index++) {
            let mergearr = [...(dataA[index] || []), ...(dataB[index] || [])]
            newdata.push(mergearr)
        }
        return newdata
    }

    const changedatasecond = (data) => {
        let datasecond = []
        let AAAsecond = data.filter((a) => a.Category == "Urine Examination")

        let Othersecond = data.filter((a) => a.Category != "Urine Examination" && a.Category != "Hematology"
            && a.Category != "Complete Blood Count" && a.Category != "Glucose (Fasting)" && a.Category != "Creatinine"
            && a.Category != "Blood Urea Nitrogen" && a.Category != "Liver Function Test (8 Tests)"
            && a.Category != "ALP (Alk Phos)" && a.Category != "ALT (Alanine Transaminase)"
            && a.Category != "AST (Aspartate Transaminase)" && a.Category != "Lipid Profile" && a.Category != "Uric Acid")


        let dataA = chunkAndAddRowNum(AAAsecond, 30)
        let dataB = chunkAndAddRowNum(Othersecond, 30)
        const maxLength = Math.max(dataA.length, dataB.length);
        for (let index = 0; index < maxLength; index++) {
            let mergearr = [...(dataA[index] || []), ...(dataB[index] || [])]
            datasecond.push(mergearr)
        }
        console.log("datasecond", datasecond)
        return datasecond
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


    return (
        <>
            {newdata.map((listdata, index) => (

                <div className="A4" key={index}>
                    <div className="page1 pt-1 pl-7 pr-7">
                        <div className="mt-1 w-full flex justify-between">
                            <div className="w-1/2 flex justify-start">
                                <img
                                    src="/Images/logo_samiti_1.png"
                                    style={{ width: 300, height: 70 }}
                                    alt=""
                                />
                            </div>
                            <div className="w-full text-[16px] flex flex-col justify-end">
                                <div className="text-end">NO.234</div>
                                <div className="text-end">
                                    โรงพยาบาลสมิติเวช ศรีราชา (Samitivej Sriracha Hospital)
                                </div>
                                <div className="text-end">
                                    8 ซอย แหลมเกตุ ถนน เจิมจอมพล ตำบล ศรีราชา อำเภอ ศรีราชา จังหวัด
                                    ชลบุรี 20110 โทรศัพท์ : 0-3832-0300
                                </div>
                                <div className="text-end">
                                    8 Soi Laemket, Jermjompol Road., Sriracha, Chonburi 20110 Tel :
                                    0-3832-0300
                                </div>
                            </div>
                        </div>
                        <div className="mt-1 w-full flex justify-between">
                            <div className="w-1/2 pr-1">
                                <div className="w-full flex flex-col justify-start border border-[#ce9142]">
                                    <div className="bg-gray-100">
                                        <div className="text-[16px] w-full flex pt-1 pl-1">
                                            <label className="font-bold">ชื่อ-สกุล :</label>
                                            <label className="pl-2 font-bold">นาย วิชัย ม่วงศักดิ์</label>
                                        </div>
                                        <div className="text-[16px] w-full flex pt-0 pl-1">
                                            <label className="font-bold">HN: {list[0]?.HN} ID: 20001</label>
                                            <label className="pl-2 font-bold">Dept: Manufacturing</label>
                                        </div>
                                        <div className="text-[16px] w-full flex pt-0 pl-1">
                                            <label className="font-bold">
                                                บจก. ดูคาติ พาวเวอร์เทรน(ประเทศไทย)
                                            </label>
                                        </div>
                                        <div className="text-[16px] w-full flex pt-0 pl-1">
                                            <label className="font-bold">อายุ 39 ปี</label>
                                            <label className="font-bold pl-3">เพศ ชาย</label>
                                            <label className="font-bold pl-3">
                                                วันที่ตรวจ 10 พฤศจิกายน 2566
                                            </label>
                                        </div>
                                        <div className="text-[16px] w-full flex pt-0 pl-1">
                                            <div className="w-full flex justify-between">
                                                <label className="text-center pl-2">น้ำหนัก (Weight) :</label>
                                                <label className="text-center">83</label>
                                                <label className="text-center pr-7">กก.</label>
                                            </div>
                                        </div>
                                        <div className="text-[16px] w-full flex pt-0 pl-1">
                                            <div className="w-full flex justify-between">
                                                <label className="text-center pl-2">ส่วนสูง (Height) :</label>
                                                <label className="text-center">185</label>
                                                <label className="text-center pr-7">ซม.(cm.)</label>
                                            </div>
                                        </div>
                                        <div className="text-[16px] w-full flex pt-0 pl-1">
                                            <div className="w-full flex justify-between">
                                                <label className="text-center pl-2">
                                                    ดัชนีมวลกาย (BMI) :
                                                </label>
                                                <label className="text-center">24.25</label>
                                                <label className="text-center pr-7">กก./ตร.ม (kg/m².)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[16px] w-full flex pt-0 pl-1">
                                        <div className="w-full flex">
                                            <label className="">
                                                น้ำหนักเกินเกณฑ์มาตรฐาน
                                                (ช่วงน้ำหนักที่เหมาะสมสำหรับส่วนสูงของคุณ: 63.32 - 78.68 กก.)
                                            </label>
                                        </div>
                                    </div>
                                    <div className="text-[16px] w-full flex pt-0 pl-1 bg-gray-100">
                                        <div className="w-full flex justify-between">
                                            <label className="text-center pl-2">
                                                ความดันโลหิต (Blood Pressure) :
                                            </label>
                                            <label className="text-center">142/91</label>
                                            <label className="text-center pr-2">มม.ปรอท (mmHg)</label>
                                        </div>
                                    </div>
                                    <div className="text-[16px] w-full flex pt-0 pl-1">
                                        <div className="w-full flex justify-between">
                                            <label className="text-center pl-2">
                                                ความดันโลหิตสูงกว่าปกติ
                                            </label>
                                        </div>
                                    </div>
                                    <div className="text-[16px] w-full flex pt-0 pl-1 bg-gray-100">
                                        <div className="w-full flex justify-between">
                                            <label className="text-center pl-2">ชีพจร (Pulse rate) :</label>
                                            <label className="text-center">86</label>
                                            <label className="text-center pr-2">ครั้งต่อนาที (bpm)</label>
                                        </div>
                                    </div>
                                    <div className="text-[16px] w-full flex pt-0 pl-1">
                                        <div className="w-full flex justify-between">
                                            <label className="text-center pl-2">ชีพจรปกติ</label>
                                        </div>
                                    </div>
                                    <div className="text-[16px] w-full flex pt-0 pl-1 bg-gray-100">
                                        <div className="w-full flex justify-between">
                                            <label className="text-center pl-2">
                                                ผลตรวจร่างกาย (Physical Examination) :{" "}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="text-[16px] w-full flex pt-0 pl-1">
                                        <div className="w-full flex justify-between">
                                            <label className="text-center pl-2">อยู่ในเกณฑ์ปกติ</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full text-[16px] flex flex-col pt-1">
                                    <div className="w-full border border-[#ce9142]">
                                        <div className="w-full flex justify-between">
                                            <div className="font-bold pl-1">รายการตรวจ</div>
                                            <div className="font-bold pl-4">ผลตรวจ(Result)</div>
                                            <div className="font-bold pr-1">ค่าปกติ (Normal Value)</div>
                                        </div>
                                    </div>
                                </div>

                                {(listdata?.filter((x) => ['Hematology', 'Complete Blood Count'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="w-full text-[16px] flex pt-1 bg-[#d2a145] font-bold pl-1">
                                                โลหิตวิทยา(Hematology)
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdata?.filter((x) => x.Category == 'Hematology' || x.Category == 'Complete Blood Count').map((d, index2) => {
                                                        if (d?.ResultY1 != '') {
                                                            return <tr key={index2} className="text-center">
                                                                <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.Desc || '-'}</label>
                                                                </td>
                                                                <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                </td>
                                                                <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                </td>
                                                            </tr>
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }
                            </div>
                            <div className="w-1/2 pl-1">
                                <div className="w-full text-[16px] flex flex-col">
                                    <div className="w-full border border-[#ce9142]">
                                        <div className="w-full flex justify-between">
                                            <div className="font-bold pl-1">รายการตรวจ</div>
                                            <div className="font-bold pl-4">ผลตรวจ(Result)</div>
                                            <div className="font-bold pr-1">ค่าปกติ (Normal Value)</div>
                                        </div>
                                    </div>
                                </div>

                                {/* น้ำตาล */}
                                {(listdata?.filter((x) => ['Glucose (Fasting)'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col pt-1">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="p-1 w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    ระดับน้ำตาลในเลือด (Blood Sugar)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdata?.filter((x) => x.Category == 'Glucose (Fasting)').map((d, index2) => {
                                                        if (d?.ResultY1 != '') {
                                                            return <tr key={index2} className="text-center">
                                                                <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.Desc || '-'}</label>
                                                                </td>
                                                                <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                </td>
                                                                <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                </td>
                                                            </tr>
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }

                                {/* ไต */}
                                {(listdata?.filter((x) => ['Creatinine', 'Blood Urea Nitrogen'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col pt-1">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="p-1 w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    การทำงานของไต (Kidney Function Test)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdata?.filter((x) => x.Category == 'Creatinine' || x.Category == 'Blood Urea Nitrogen').map((d, index2) => {
                                                        if (d?.ResultY1 != '') {
                                                            return <tr key={index2} className="text-center">
                                                                <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.Desc || '-'}</label>
                                                                </td>
                                                                <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                </td>
                                                                <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                </td>
                                                            </tr>
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }

                                {(listdata?.filter((x) => ['Liver Function Test (8 Tests)', 'ALP (Alk Phos)',
                                    'ALT (Alanine Transaminase)', 'AST (Aspartate Transaminase)'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col pt-1">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="p-1 w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    การทำงานของตับ (Liver Function Test)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdata?.filter((x) => x.Category == 'Liver Function Test (8 Tests)'
                                                        || x.Category == 'ALP (Alk Phos)' || x.Category == 'ALT (Alanine Transaminase)'
                                                        || x.Category == 'AST (Aspartate Transaminase)').map((d, index2) => {
                                                            if (d?.ResultY1 != '') {
                                                                return <tr key={index2} className="text-center">
                                                                    <td className="bg-gray-100 w-44 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.Desc || '-'}</label>
                                                                    </td>
                                                                    <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                    </td>
                                                                    <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }


                                {(listdata?.filter((x) => ['Lipid Profile'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col pt-1">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="p-1 w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    ผลการตรวจระดับไขมันในเลือด (Lipid Profile)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdata?.filter((x) => x.Category == 'Lipid Profile').map((d, index2) => {
                                                        if (d?.ResultY1 != '') {
                                                            return <tr key={index2} className="text-center">
                                                                <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.Desc || '-'}</label>
                                                                </td>
                                                                <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                </td>
                                                                <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                </td>
                                                            </tr>
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }


                                {(listdata?.filter((x) => ['Uric Acid'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col pt-1">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="p-1 w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    ผลการตรวจกรดยูริกในเลือด (Uric acid Test)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdata?.filter((x) => ['Uric Acid'].includes(x.Category)).map((d, index2) => {
                                                        if (d?.ResultY1 != '') {
                                                            return <tr key={index2} className="text-center">
                                                                <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.Desc || '-'}</label>
                                                                </td>
                                                                <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                </td>
                                                                <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                </td>
                                                            </tr>
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="mt-1 w-full flex justify-between">
                            <div>สอบถามรายละเอียดเพิ่มเติมได้ที่ ศูนย์อาชีวเวชศาสตร์ โรงพยาบาลสมิติเวช
                                ศรีราชา โทร-3832-0300 ต่อ 3016,3019</div>
                        </div>
                        <div className="mt-1 w-full flex justify-between">
                            <div>และ ศูนย์ส่งเสริมสุขภาพโรงพยาบาลสมิติเวช ศรีราชา โทร 0-3832-0300 ต่อ 3105-3107</div>
                        </div>
                        <div className="mt-1 w-full flex justify-between">
                            <div>For further information , please contact Occupational Medicine Center Tel. +66 3832 0300 Ext. 3016,3019
                                and Wellness Center Tel. +66 3832 0300 Ext. 3105-3107
                            </div>
                        </div>
                    </div>
                </div>

            ))}


            <br />
            {datasecond.map((listdatasecond, index) => (
                <div className="A4" key={index}>
                    <div className="page1 pt-1 pl-7 pr-7">
                        <div className="text-[16px] mt-1 w-full flex justify-between">
                            <div className="w-full flex justify-end">
                                <div className="text-end">NO.234</div>
                            </div>
                        </div>
                        <div className="text-[16px] bg-[#d2a145] w-full flex justify-between">
                            <div className="w-full flex justify-start">
                                <div className="text-end">นาย วิชัย ม่วงศักดิ์</div>
                            </div>
                            <div className="w-full flex flex-col justify-end">
                                <div className="text-end">HN: {list[0]?.HN}</div>
                            </div>
                        </div>
                        <div className="mt-1 text-[16px] w-full flex border border-[#ce9142]">
                            <div className="mr-2 w-1/2 flex justify-between">
                                <div className="font-bold pl-1">รายการตรวจ</div>
                                <div className="font-bold pl-4">ผลตรวจ(Result)</div>
                                <div className="font-bold pr-1">ค่าปกติ (Normal Value)</div>
                            </div>
                            <div className="ml-2 w-1/2 flex justify-between">
                                <div className="font-bold pl-1">รายการตรวจ</div>
                                <div className="font-bold pl-4">ผลตรวจ(Result)</div>
                                <div className="font-bold pr-1">ค่าปกติ (Normal Value)</div>
                            </div>
                        </div>
                        <div className="mt-1 w-full flex justify-between">
                            <div className="w-1/2 pr-2">

                                {(listdatasecond?.filter((x) => ['Urine Examination'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    การวิเคราะห์ปัสสาวะ (Urine Examination)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdatasecond?.filter((x) => x.Category == 'Urine Examination').map((d, index2) => {
                                                        if (d?.ResultY1 != '') {
                                                            return <tr key={index2} className="text-center">
                                                                <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.Desc || '-'}</label>
                                                                </td>
                                                                <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                </td>
                                                                <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                    <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                </td>
                                                            </tr>
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }


                                <div className="w-full text-[14px] flex flex-col">
                                    <div className="w-full border border-[#ce9142]">
                                        <div className="bg-gray-100">
                                            <div className="flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    ผลการตรวจสายตาและตาบอดสี (Visual Acuity and Color Vision
                                                    Test)
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label className="font-bold">
                                                    ตรวจการมองระยะไกล (Snellen Chart) :
                                                </label>
                                                <label>ตาเปล่า</label>
                                            </div>
                                            <div className="flex">
                                                <label className="font-bold">
                                                    ระดับสายตา (Visual Acuity):
                                                </label>
                                                <label>ขวา 20/50 ซ้าย 20/20 ทั้งสองข้าง 20/20</label>
                                            </div>
                                            <div className="flex">
                                                <label className="font-bold">สรุปผลตรวจการมองระยะไกล :</label>
                                                <label>ตาข้างขวามองภาพระยะไกลไม่ชัดเจน ควรตรวจ</label>
                                            </div>
                                            <div className="flex">
                                                <label>หาสาเหตุและแก้ไขการมองเห็นให้ชัดเจน</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full text-[14px] flex flex-col">
                                    <div className="w-full border border-[#ce9142]">
                                        <div className="flex bg-[#d2a145]">
                                            <label className="text-[13px] font-bold">
                                                ผลการตรวจสมรรถภาพการได้ยินในงานอาชีวอนามัย (Occupational
                                                Health Audiometry)
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <label className="font-bold">ประเภทของการตรวจ :</label>
                                            <label>ประเมินระดับการได้ยินทั่วไป (Hearing Evaluation)</label>
                                        </div>
                                        <table className="text-center table-report1">
                                            <thead>
                                                <tr>
                                                    <th />
                                                    <th>(500Hz)</th>
                                                    <th>(1KHz)</th>
                                                    <th>(2KHz)</th>
                                                    <th>(3KHz)</th>
                                                    <th>(4KHz)</th>
                                                    <th>(6KHz)</th>
                                                    <th>(8KHz)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>หูขวา(dB)</td>
                                                    <td>15</td>
                                                    <td>15</td>
                                                    <td>15</td>
                                                    <td>10</td>
                                                    <td>15</td>
                                                    <td>15</td>
                                                    <td>25</td>
                                                </tr>
                                                <tr>
                                                    <td>หูซ้าย(dB)</td>
                                                    <td>20</td>
                                                    <td>15</td>
                                                    <td>15</td>
                                                    <td>25</td>
                                                    <td>40</td>
                                                    <td>15</td>
                                                    <td>30</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="flex">
                                            <label className="">สรุปการได้ยิน :</label>
                                            <label>
                                                ค่าเฉลี่ยระดับการได้ยินในช่วงความถี่ 500, 1000 และ 2000
                                                เฮิรตซ์
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <label className="font-bold">
                                                (ความถี่ที่ใช้ในชีวิตประจำวัน) ของหูทั้งสองข้าง ปกติ
                                            </label>
                                        </div>
                                        <div className="flex border-t border-[#ce9142]">
                                            <label className="font-bold">คำแนะนำ :</label>
                                            <label>
                                                หลีกเลี่ยงการสัมผัสเสียงดังทั้งในและนอกงาน หากจำเป็นต้องสัมผัส
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <label>เสียงดัง ควรใช้อุปกรณ์ปกป้องการได้ยินทุกครั้ง</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-[14px] flex flex-col pt-10">
                                    <div className="flex justify-center">
                                        <div className="font-bold">แพทย์ตรวจสุขภาพ (Doctor)</div>
                                        <div
                                            className="text-center border-b border-black border-dotted ml-2"
                                            style={{ height: 18, width: 200 }}
                                        />
                                    </div>
                                    <div className="flex mt-0 justify-center">
                                        <div className="pl-28 font-bold">นพ. ศิพิระ เชิดสงวน</div>
                                    </div>
                                    <div className="flex mt-0 justify-center">
                                        <div className="pl-28 font-bold">ว. 45138</div>
                                    </div>
                                </div>
                            </div>



                            <div className="w-1/2 pl-2">
                                {(listdatasecond?.filter((x) => ['Tumor marker', 'Alpha Fetoprotein (AFP)',
                                    'Carcinoembryonic Antigen (CEA)', 'Prostatic Specific Antigen (PSA)'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    ผลการตรวจสารบ่งชี้มะเร็ง (Tumor marker)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdatasecond?.filter((x) => x.Category == 'Tumor marker' || x.Category == 'Alpha Fetoprotein (AFP)'
                                                        || x.Category == 'Carcinoembryonic Antigen (CEA)' || x.Category == 'Prostatic Specific Antigen (PSA)').map((d, index2) => {
                                                            if (d?.ResultY1 != '') {
                                                                return <tr key={index2} className="text-center">
                                                                    <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.Desc || '-'}</label>
                                                                    </td>
                                                                    <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                    </td>
                                                                    <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }


                                {(listdatasecond?.filter((x) => ['Screening For Viral Hepatitis', 'Hepatitis A Antibody ( IgG+ IgM )( Total )', 'HBsAg'
                                    , 'Hepatitis B surface Antibody', 'Hepatitis C Antibody'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    ผลการตรวจคัดกรองไวรัสตับอักเสบ (Screening For Viral Hepatitis)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdatasecond?.filter((x) => x.Category == 'Screening For Viral Hepatitis'
                                                        || x.Category == 'Hepatitis A Antibody ( IgG+ IgM )( Total )'
                                                        || x.Category == 'HBsAg' || x.Category == 'Hepatitis B surface Antibody'
                                                        || x.Category == 'Hepatitis C Antibody').map((d, index2) => {
                                                            if (d?.ResultY1 != '') {
                                                                return <tr key={index2} className="text-center">
                                                                    <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.Desc || '-'}</label>
                                                                    </td>
                                                                    <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                    </td>
                                                                    <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }


                                {(listdatasecond?.filter((x) => ['Toxicology', 'Amphetamines ( Rapid screening )',
                                    'Coccaine', 'Morphine (Heroine, Opiate)', 'Marijuana (Cannabinoids)', 'Phencyclidine (PCP)'].includes(x.Category))).length > 0 ?
                                    <div className="w-full text-[14px] flex flex-col">
                                        <div className="w-full border border-[#ce9142]">
                                            <div className="w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    ผลการตรวจทางพิษวิทยา (Toxicology)
                                                </label>
                                            </div>
                                            <table className="text-center bg-gray-100">
                                                <tbody>
                                                    {listdatasecond?.filter((x) => x.Category == 'Amphetamines ( Rapid screening )'
                                                        || x.Category == 'Toxicology' || x.Category == 'Coccaine'
                                                        || x.Category == 'Morphine (Heroine, Opiate)' || x.Category == 'Marijuana (Cannabinoids)'
                                                        || x.Category == 'Phencyclidine (PCP)').map((d, index2) => {
                                                            if (d?.ResultY1 != '') {
                                                                return <tr key={index2} className="text-center">
                                                                    <td className="bg-gray-100 w-36 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.Desc || '-'}</label>
                                                                    </td>
                                                                    <td className="bg-gray-100 w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.ResultY1 || '-'}</label>
                                                                    </td>
                                                                    <td className="w-40 ml-1 text-[14px]" style={{ lineHeight: '1' }}>
                                                                        <label className="ml-1">{d?.NormalRange || '-'}</label>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        })}
                                                </tbody>
                                            </table>
                                            <div className="w-full flex justify-between" style={{ lineHeight: '1' }}>
                                                <div className="font-bold pl-1">เพิ่มเติม</div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }


                                <div className="w-full text-[14px] flex flex-col" style={{ lineHeight: '1' }}>
                                    <div className="w-full border border-[#ce9142]">
                                        <div className="bg-gray-100">
                                            <div className="w-full flex bg-[#d2a145]">
                                                <label className="font-bold">คลื่นไฟฟ้าหัวใจ (EKG)</label>
                                            </div>
                                            <div className="w-full flex justify-between">
                                                <label>ผลการตรวจคลื่นไฟฟ้าหัวใจอยู่ในเกณฑ์ปกติ</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="w-full text-[14px] flex flex-col" style={{ lineHeight: '1' }}>
                                    <div className="w-full border border-[#ce9142]">
                                        <div className="bg-gray-100">
                                            <div className="w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    เอกซเรย์ทรวงอก (Chest X-ray)
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label className="font-bold">Impression:</label>
                                                <label>No active cardiopulmonary disease.</label>
                                            </div>
                                            <div className="flex">
                                                <label>ผลการตรวจเอกซเรย์ทรวงอกไม่พบความผิดปกติชัดเจน</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="w-full text-[14px] flex flex-col" style={{ lineHeight: '1' }}>
                                    <div className="w-full border border-[#ce9142]">
                                        <div className="bg-gray-100">
                                            <div className="w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    ผลการตรวจอื่นๆ (Other Test)
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ตรวจคัดกรองตาบอดสี 6 แผ่น:ปกติ (ไม่พบภาวะตาบอดสี)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="w-full text-[14px] flex flex-col" style={{ lineHeight: '1' }}>
                                    <div className="w-full border border-[#ce9142]">
                                        <div className="bg-gray-100">
                                            <div className="w-full flex bg-[#d2a145]">
                                                <label className="font-bold">
                                                    สรุปผลการตรวจ และคำแนะนำเพิ่มเติม (Additional Conclusion and
                                                    Recommendation)
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - น้ำหนักเกินเกณฑ์มาตรฐาน ควรลดน้ำหนัก ควบคุมอาหาร
                                                    ออกกำลังกายสม่ำเสมอ 3-5 ครั้ง
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    ต่อ สัปดาห์ ครั้งละ 30-60 นาที อย่างน้อย 150 นาทีต่อสัปดาห์
                                                    (ช่วงน้ำหนักที่เหมาะสมสำหรับส่วนสูงของคุณ: 63.32-78.68 กก.)
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ความดันโลหิตสูงกว่าปกติ ควรลดการรับประทานเค็ม
                                                    จำกัดปริมาณโซเดียม ไม่เกิน 2300
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    มิลลิกรัมต่อวัน พักผ่อนให้เพียงพอ หลีกเลี่ยงแอลกอฮอล์
                                                    และวัดความดันโลหิตสม่ำเสมอ ถ้ายังสูงเกิน 140/90 มม.ปรอท
                                                    ควรพบแพทย์เพื่อพิจารณาให้ยาลดความอ้วน
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ขนาดเม็ดเลือดแดงเล็กกว่าปกติ
                                                    อาจสัมพันธ์กับภาวะขาดธาตุเหล็ก โรคหรือพาหะธาลัสซีเมีย
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    หรือสาเหตุอื่น หากมีเลือดออกผิดปกติ หรือ วางแผนมีบุตร
                                                    ควรพบแพทย์เพื่อตรวจวินิจฉัยเพิ่มเติม
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ไขมันคอเรสเตอรอลรวมในเลือดสูง
                                                    ควรลดอาหารทะเล,เครื่องในสัตว์,หนังสัตว์,กะทิ,เนย
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    และไข่แดง, ออกกำลังกายสม่ำเสมอ และตรวจไขมันซ้ำ ภายใน 3 เดือน
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ไขมันไตรกลีเซอไรด์ในเลือดสูงเล็กน้อย
                                                    ควรลดอาหารคาร์โบไฮเดรต เช่น แป้ง น้ำตาล ลด
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    อาหารประเภทผัดทอด หลีกเลี่ยงเครื่องดื่มแอลกอฮอล์
                                                    ,ออกกำลังกายสม่ำเสมอ
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ไขมันชนิดเลว (LDL) ในเลือดสูง ควรลดอาหารทะเล,
                                                    เครื่องในสัตว์, หนังสัตว์, กะทิ, เนย,
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    ไข่แดง หลีกเลี่ยงอาหารที่มีไขมันทรานส์เช่น ครีมเทียม
                                                    เบเกอรรี่ ลดอาหารที่มีไขมันอิ่มตัว เช่น
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    น้ำมันหมู น้ำมันมะพร้าว เป็นต้น ออกกำลังกายสม่ำเสมอ และ
                                                    ตรวจไขมันในเลือดซ้ำ ใน 3-6 เดือน
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ระดับกรดยูริกในเลือดสูง ควรหลีกเลี่ยงเครื่องดื่มแอลกอฮอล์
                                                    จำกัดเครื่องดื่มหรือผลไม้ที่มีฟรุค
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    โตสสูง ออกกำลังกายสม่ำเสมอ
                                                    ควบคุมน้ำหนักตัวให้อยู่ในเกณฑ์ปกติ ดื่มนมไขมันต่ำ หลีกเลี่ยง
                                                    การรับประทานอาหารที่มีไขมันอิ่มตัวสูงและควรดื่มน้ำมากๆ
                                                    (หากมีอาการปวดข้อร่วมด้วยควรปรึกษาแพทย์)
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ค่าการทำงานของตับ (AST) สูงกว่าปกติ
                                                    อาจเกิดได้จากหลายสาเหตุเช่น ยาบางชนิด
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    แอลกอฮอล์ สารเคมี ไวรัสตับอักเสบ ไขมันพอกตับหรือสาเหตุอื่น
                                                    ควรตรวจการทำงานของตับซ้ำ และปรึกษาแพทย์
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    - ผลการตรวจสมรรถภาพการได้ยิน :
                                                    ค่าเฉลี่ยระดับการได้ยินในช่วงความถี่ 500, 1000 และ
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <label>
                                                    2000 เฮิรตซ์ (ความถี่ที่ใช้ในชีวิประจำวัน) ของหูทั้งสองข้าง
                                                    ปกติ หลีกเลี่ยงการสัมผัสเสียงดัง ทั้งในและนอกงาน
                                                    หากจำเป็นต้องสัมผัสเสียงดัง
                                                    ควรใชอุปกรณ์ปกป้องการได้ยินทุกครั้ง
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

}
