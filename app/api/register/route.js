export async function POST(req) {
  try {
    const { line_displayName, line_uid, citizen_id } = await req.json();

    if (!line_uid || !citizen_id) {
      console.error("❌ ข้อมูลไม่ครบถ้วน", { line_uid, citizen_id });
      return Response.json({ message: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    console.log("✅ ได้รับข้อมูลจากผู้ใช้:", { line_uid, citizen_id });

    // 🔹 ส่งข้อมูลไปที่ API
    const sendApi = await fetch("https://api-h-series.telecorp.co.th/api/healthPatients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: line_displayName || "ไม่ระบุชื่อ", // ถ้าไม่มีชื่อให้ใส่ค่าเริ่มต้น
        line_uid: line_uid,
        id_card: citizen_id,
      }),
    });

    // 🔹 แปลง Response เป็น JSON
    const sendApiResponse = await sendApi.json();
    console.log("📩 API Response:", sendApiResponse);

    // 🔹 ตรวจสอบว่าส่งข้อมูลสำเร็จหรือไม่
    if (sendApi.ok && sendApiResponse.message === "success") {
      const CHANNEL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN // ใช้ Token ที่ถูกต้อง

      // 🔹 ส่งข้อความกลับไปที่ LINE OA
      const sendMessage = await fetch("https://api.line.me/v2/bot/message/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          to: line_uid,
          messages: [
            {
              type: "text",
              text: `✅ คุณ ${line_displayName || "ไม่ระบุชื่อ"} ลงทะเบียนสำเร็จ!\n📌 เลขบัตรประชาชนของคุณ: ${citizen_id}`,
            },
          ],
        }),
      });

      const response = await sendMessage.json();
      console.log("📩 LINE Response:", response);

      if (response.message) {
        console.error("❌ LINE API Error:", response);
        return Response.json({ message: "เกิดข้อผิดพลาดในการส่งข้อความไปที่ LINE OA" }, { status: 500 });
      }

      return Response.json({ message: "ลงทะเบียนสำเร็จ และส่งข้อความกลับ LINE OA แล้ว!" });
    } else {
      console.error("❌ API ส่งข้อมูลไม่สำเร็จ:", sendApiResponse);
      return Response.json({ message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return Response.json({ message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
