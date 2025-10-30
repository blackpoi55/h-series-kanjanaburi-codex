
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const aleartHn = (hn) => {

    return (
        Swal.fire({
            icon: 'error',
            title: 'กรอกเลข HN:' + hn + "\nไม่ถูกต้อง กรุณาตรวจสอบหมายเลข HN อีกครั้ง",
            showConfirmButton: false,
            timer: 3000
        })
    );
};

export const toBuddhistDate = (date, format) => {
    if (!date || !dayjs(date).isValid()) return '';
    const buddhistYear = dayjs(date).year() + 543; // เพิ่ม 543 ปี เพื่อแปลงเป็น พ.ศ.
    return dayjs(date).format(`DD/MM/${buddhistYear}`);
}

export function formatMoney(amount) {
    if (isNaN(amount)) return '-'
    return parseFloat(amount)
        .toFixed(2)                // ทศนิยม 2 ตำแหน่ง
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')  // ใส่ลูกน้ำ
}
