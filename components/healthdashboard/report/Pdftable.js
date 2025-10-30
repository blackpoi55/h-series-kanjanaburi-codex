import React from 'react'

function Pdftable(props) {
    const { data, index } = props

    const interpret = (text) => {
        if (!text || text === '-' || text.toLowerCase().includes('ไม่พบ')) return ''
        if (text.includes('ปกติ')) return 'ปกติ'
        return 'ผิดปกติ'
    }

    let val1 = [
        { title: 'ตรวจร่างกายโดยแพทย์', key: 'physical_exam_summary' },
        { title: 'ปัสสาวะ', key: 'ua_summary' },
        { title: 'อุจจาระ', key: 'stool_exam_detail' },
        { title: 'การหาเลือดในอุจจาระ', key: 'occult_blood_detail' },
        { title: 'อุจจาระเพาะเชื้อ', key: 'stool_culture_detail' },
        { title: 'ความสมบูรณ์ของเลือด', key: 'cbc_hb_summary' },
        { title: 'น้ำตาลในเลือด', key: 'fbs_detail' },
        { title: 'น้ำตาลเฉลี่ยย้อนหลัง 3 เดือน', key: 'hba1c_detail' },
        { title: 'ไขมันในเลือด', key: 'lipid' },
        { title: 'การทำงานของใต', key: 'kidney_summary' },
        { title: 'การทำงานของตับ', key: 'liver1' },
        { title: 'กรดยูริก', key: 'uric_detail' },
        { title: 'สารบ่งชี้มะเร็ง', key: 'cea_detail' },
        { title: 'ไวรัสตับอักเสบ', key: 'anti_hbs_detail' },
    ].map(item => ({ ...item, value: interpret(data[item.key]) }))

    let val2 = [
        { title: 'ไทรอยด์', key: 'thyroid_detection_detail' },
        { title: 'ฮอร์โมนเทสโทสเตอโรน', key: 'testosterone_detail' },
        { title: 'คัดกรองซิฟิลิส', key: 'vdrl_detail' },
        { title: 'เอ็กซเรย์ปอด', key: 'chest_xray_summary' },
        { title: 'อัลตร้าซาวด์', key: 'ultrasound' },
        { title: 'แมมโมแกรม', key: 'mammogram_detail' },
        { title: 'มวลกระดูก', key: 'bone_density_summary' },
        { title: 'คลื่นไฟฟ้าหัวใจ', key: 'ekg_summary' },
        { title: 'คลื่นไฟฟ้าหัวใจขณะออกกำลังกาย', key: 'est_summary' },
        { title: 'คลื่นเสียงสะท้อนหัวใจ', key: 'echo_summary' },
        { title: 'สมรรถภาพหลอดเลือดแดง', key: 'abi_summary' },
        { title: 'สมรรถภาพปอด', key: 'spiro_summary' },
        { title: 'สมรรถภาพการได้ยิน', key: '' },
        { title: 'ตรวจมะเร็งปากมดลูก', key: 'pap_smear_detail' },
    ].map(item => ({ ...item, value: item.key ? interpret(data[item.key]) : '' }))

    return (
        <div className="w-full h-[400px] flex flex-col justify-center items-center text-xs text-center">
            <div className="flex h-1/2 w-full">
                <div className=" flex h-full w-[25%]">
                    <div className="flex flex-col w-[13%]">
                        <div className="flex justify-center items-center h-2/5 w-full border-2 border-black"><label>ที่</label></div>
                        <div className="flex justify-center items-center h-3/5 w-full border-2 border-t-0 border-black">{index + 1}</div>
                    </div>
                    <div className="flex flex-col w-[87%]">
                        <div className="flex justify-center items-center h-2/5 w-full border-2 border-l-0 border-black"><label>ชื่อ - นามสกุล</label></div>
                        <div className="flex flex-col justify-center items-center h-3/5 w-full border-2 border-t-0 border-l-0 border-black p-2">
                            <label className='w-full text-left'>{(data?.prefix || '') + ' ' + (data?.first_name || '') + ' ' + (data?.last_name || '')}</label>
                            <div className="flex w-full">
                                <label className='w-3/5  text-left'>HN: {data?.hn || '-'}</label>
                                <label className='w-2/5  text-left'>อายุ: {data?.age || '-'} ปี</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex h-full w-[75%]">
                    {val1.map((item, i) => (
                        <div key={i} className={`flex flex-col w-[7.142857143%]`}>
                            <div className="flex justify-center items-center h-2/5 w-full border-2  border-l-0 border-black"><label>{item.title}</label></div>
                            <div className="flex justify-center items-center h-3/5 w-full border-2 border-t-0  border-l-0 border-black">{item.value || "-"}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex h-1/2 w-full">
                <div className=" flex h-full w-[25%]">
                    <div className="flex flex-col w-[13%]">
                    </div>
                    <div className="flex flex-col w-[87%] border-r-2 border-black">
                    </div>
                </div>
                <div className=" flex h-full w-[75%]">
                    {val2.map((item, i) => (
                        <div key={i} className={`flex flex-col w-[7.142857143%]`}>
                            <div className={`flex justify-center items-center h-2/5 w-full border-2 border-t-0  border-l-0 border-black `}><label>{item.title}</label></div>
                            <div className={`flex justify-center items-center h-3/5 w-full border-2 border-t-0  border-l-0 border-black `}>{item.value || "-"}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pdftable
