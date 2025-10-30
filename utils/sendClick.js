import Swal from "sweetalert2";
import dayjs from "dayjs";
import { sendLineMessage, addNurseApprove } from "@/action/api";

/**
 * sendClick Tool Function
 * @param {object} record - ข้อมูล record ที่จะส่ง
 * @param {string} URL - Base URL ของระบบ
 * @param {function} refresh - ฟังก์ชัน refresh หลังส่ง
 * @param {function} setSelectedIds - setState สำหรับ selectedIds
 */
export const sendClick = async (record, URL, refresh, setSelectedIds) => {
  console.log("record", record);

  if (!URL) {
    console.error("⚠️ URL ยังไม่ถูกโหลด");
    return;
  }

  const flexMessage = {
    type: "bubble",
    hero: {
      type: "image",
      url: "https://uat-h-series.telecorp.co.th/images/icon.png",
      size: "full",
      aspectRatio: "20:13",
      aspectMode: "cover",
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "📋 ประวัติการรักษา",
          weight: "bold",
          size: "xl",
          align: "center",
          color: "#1DB446",
        },
        {
          type: "text",
          text: `👤 ${record.prefix} ${record.first_name} ${record.last_name}`,
          weight: "bold",
          size: "md",
          margin: "md",
        },
        {
          type: "text",
          text: `🏥 HN: ${record.hn} | อายุ: ${record.age} ปี`,
          size: "sm",
          color: "#555555",
        },
        {
          type: "text",
          text: `📅 วันที่ตรวจ: ${new Date(record.exam_date).toLocaleDateString("th-TH", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}`,
          size: "sm",
          color: "#555555",
        },
        {
          type: "separator",
          margin: "lg",
        },
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: [
        {
          type: "button",
          style: "primary",
          action: {
            type: "uri",
            label: "📄 ดูรายงานฉบับเต็ม",
            uri: `${URL}/Care-Vista-C/individualreport/pdf?hn=${record.hn}&en=${record.en}&security=1`,
          },
        },
      ],
    },
  };

  const payload = {
    sendType: "single",
    userId: record?.tr_health_patient?.line_uid,
    messageType: "flex",
    flexMessage: JSON.stringify(flexMessage),
  };

  if (!payload.userId) {
    Swal.fire({
      icon: "warning",
      title: "⚠️ ไม่พบ LINE ID",
      text: "ผู้ใช้ยังไม่ได้เชื่อมต่อ LINE กรุณาลงทะเบียนข้อมูลผู้ใช้",
      showConfirmButton: true,
    });
    return;
  }

  try {
    const result = await sendLineMessage(payload);

    if (!result.error) {
      console.log("✅ ส่งข้อความสำเร็จ:", result);

      const saveData = {
        send_startus: "Y",
        send_time: dayjs().format("YYYY-MM-DD"),
      };

      console.log("📤 กำลัง stamp ข้อมูล:", saveData);

      if (setSelectedIds) {
        setSelectedIds(prev => prev.filter(id => id !== record.id));
      }


      try {
        if (record?.id) {
          const stampRes = await addNurseApprove(record.id, saveData);
          console.log("✅ Stamp สำเร็จ", stampRes);
        }
      } catch (stampErr) {
        console.error("❌ เกิดข้อผิดพลาดตอน stamp:", stampErr);
      }

      refresh();

      Swal.fire({
        icon: "success",
        title: "✅ ส่งข้อความเรียบร้อย",
        text: "Flex Message ถูกส่งไปยัง LINE ของผู้ใช้แล้ว",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      console.error("❌ ส่งข้อความไม่สำเร็จ:", result);
      Swal.fire({
        icon: "error",
        title: "❌ ส่งข้อความไม่สำเร็จ",
        text: "ไม่สามารถส่งข้อความไปยัง LINE ได้",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    Swal.fire({
      icon: "error",
      title: "❌ เกิดข้อผิดพลาด",
      text: "ไม่สามารถเชื่อมต่อ API ได้ กรุณาลองใหม่",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
