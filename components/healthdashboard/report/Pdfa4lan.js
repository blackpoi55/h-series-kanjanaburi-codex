import React from 'react'
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import updateLocale from "dayjs/plugin/updateLocale";
import Pdftable from './Pdftable';

// ใช้งาน Plugin
dayjs.extend(buddhistEra);
dayjs.extend(updateLocale);
dayjs.locale("th");

// ปรับชื่อเดือนให้ถูกต้อง
dayjs.updateLocale("th", {
    months: [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ]
});

function Pdfa4lan(props) {
    const { data, pdfRefs, index, total, companyname } = props

    // แปลงวันที่ให้อยู่ในรูปแบบภาษาไทยและพุทธศักราช
    const formatThaiDate = (date) => {
        return dayjs(date).format("D MMMM BBBB");
    };

    // แมพจาก field ที่ได้มาเป็นข้อแนะนำ
    const mappedRecommendations = [
        data?.anti_hbs_detail,
        data?.chest_xray_summary,
        data?.spiro_summary
    ].filter(item => item && item !== '-' && item !== null && item !== '');

    const recommendations = mappedRecommendations.length > 0
        ? mappedRecommendations
        : [];

    return (
        <>
            {/* หน้าแต่ละคน */}
            <div
                ref={(el) => (pdfRefs.current[index + 1] = el)}
                className="a4landscape sectionlandscape flex flex-col break-after-page"
            >
                <div className="w-full h-full p-6 bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <p className="text-sm font-semibold">โรงพยาบาลกรุงเทพคริสเตียน</p>
                            <p className="text-sm">BANGKOK CHRISTIAN HOSPITAL</p>
                        </div>
                        <div className="text-center flex-1">
                            <p className="text-sm font-semibold">สรุปรายงานผลการตรวจสุขภาพประจำปี 2024</p>
                            <div className="flex justify-center">
                                <p className="text-sm">Company (บริษัท): </p>
                                <p className="text-sm w-64 border-b border-black border-dotted"> {companyname}</p>
                            </div>
                        </div>
                        <div className="text-sm">{index + 1} / {total}</div>
                    </div>

                    {/* ตารางข้อมูลสุขภาพ */}
                    <Pdftable data={data} index={index} />

                    {/* ข้อแนะนำ */}
                    <div className="flex w-full">
                        <div className="text-black font-extrabold w-36 mt-4">
                            <label>ข้อแนะนำ :</label>
                        </div>
                        <div className="mt-4 text-[#2345a3] leading-5 text-xs">
                            {recommendations.map((item, idx) => (
                                <p key={idx}>- {item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pdfa4lan;
