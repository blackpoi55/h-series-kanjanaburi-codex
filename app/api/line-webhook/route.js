export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📩 ได้รับข้อมูลจาก LINE Webhook:", JSON.stringify(body, null, 2));

    const CHANNEL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN;
    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'http'; // เผื่อใช้ HTTPS
    const WEB_URL = `${protocol}://${host}`;
    const API_URL = process.env.NEXT_PUBLIC_API_URL + "/healthPatients";
    const LINE_API_URL = process.env.NEXT_PUBLIC_LINE_API_URL;

    if (!CHANNEL_ACCESS_TOKEN) {
      console.error("❌ ไม่มีค่า CHANNEL_ACCESS_TOKEN ใน ENV");
      return new Response(
        JSON.stringify({ message: "Missing Access Token" }),
        { status: 500 }
      );
    }

    if (!API_URL) {
      console.error("❌ ไม่มีค่า API_URL ใน ENV");
      return new Response(
        JSON.stringify({ message: "Missing API URL" }),
        { status: 500 }
      );
    }

    if (!LINE_API_URL) {
      console.error("❌ ไม่มีค่า LINE_API_URL ใน ENV");
      return new Response(
        JSON.stringify({ message: "Missing LINE API URL" }),
        { status: 500 }
      );
    }

    if (body.events && body.events.length > 0) {
      const event = body.events[0];

      if (event.type === "message" && event.message.type === "text") {
        const userId = event.source.userId;
        const messageText = event.message.text;

        // ✅ 1. กรณีผู้ใช้ต้องการดู "ประวัติการรักษา"
        if (messageText === "ประวัติการรักษา") {
          // ✅ เรียก API ดูประวัติการรักษา
          const apiUrl = `${API_URL}/history/${userId}`;
          console.log(`📡 กำลังดึงข้อมูลจาก: ${apiUrl}`);

          const response = await fetch(apiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          // ✅ เช็คกรณี API ตอบกลับ 404 (Not Found)
          if (response.status === 404) {
            console.warn("❌ ไม่พบข้อมูลในระบบ (ยังไม่ลงทะเบียน)");

            const notRegisteredMessage = {
              replyToken: event.replyToken,
              messages: [
                {
                  type: "text",
                  text: "⚠️ คุณยังไม่ได้ลงทะเบียน กรุณาพิมพ์ 'ลงทะเบียน' เพื่อลงทะเบียนก่อน",
                },
              ],
            };

            await fetch(`${LINE_API_URL}/message/reply`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` },
              body: JSON.stringify(notRegisteredMessage),
            });

            return new Response(JSON.stringify({ message: "ยังไม่ได้ลงทะเบียน" }), { status: 200 });
          }

          // ✅ เช็คกรณี API Error อื่นๆ (500, 403, 401)
          if (!response.ok) {
            console.error("❌ API Error:", response.statusText);
            return new Response(
              JSON.stringify({ message: `API Error: ${response.status} ${response.statusText}` }),
              { status: 500 }
            );
          }

          const apiResult = await response.json();
          console.log("✅ API Response:", apiResult);

          const healthRecords = apiResult.data?.healthRecords;
          console.log("✅ API healthRecords:", healthRecords);

          // ✅ กรณีไม่มีประวัติการรักษา
          if (!healthRecords || healthRecords.length === 0) {
            const noRecordMessage = {
              replyToken: event.replyToken,
              messages: [{ type: "text", text: "❌ ไม่พบประวัติการรักษา ขอบคุณค่ะ" }],
            };

            await fetch(`${LINE_API_URL}/message/reply`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` },
              body: JSON.stringify(noRecordMessage),
            });

            return new Response(JSON.stringify({ message: "ไม่พบประวัติการรักษา" }), { status: 200 });
          }

          // ✅ ดึงโปรไฟล์ของผู้ใช้จาก LINE
          const profileResponse = await fetch(`${LINE_API_URL}/profile/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`, "Content-Type": "application/json" },
          });

          let profileData = await profileResponse.json();
          const profileImage = profileData.pictureUrl || `${API_URL}/images/doctor.png`;

          // ✅ วนลูปสร้างกล่องแสดงผลสำหรับแต่ละ Health Record
          const healthRecordsBubbles = healthRecords.map(record => ({
            type: "bubble",
            hero: {
              type: "image",
              // url: profileImage,
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
                    uri: `${WEB_URL}/Care-Vista-C/individualreport/pdf?hn=${record.hn}&en=${record.en}&security=1`,
                  },
                },
              ],
            },
          }));

          // ✅ สร้าง Carousel แสดงข้อมูลหลายรายการ
          const flexMessage = {
            replyToken: event.replyToken,
            messages: [
              {
                type: "flex",
                altText: "📋 ประวัติการรักษาของคุณ",
                contents: {
                  type: "carousel",
                  contents: healthRecordsBubbles,
                },
              },
            ],
          };

          // ✅ ส่งข้อความกลับไปที่ LINE
          await fetch(`${LINE_API_URL}/message/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` },
            body: JSON.stringify(flexMessage),
          });

          return new Response(
            JSON.stringify({ message: "ส่ง Flex Message สำเร็จ!" }),
            { status: 200 }
          );
        }

        // ✅ 2. กรณี "ลงทะเบียน"
        else if (messageText === "ลงทะเบียน") {
          const checkUrl = `${API_URL}/bylineid/${userId}`;
          console.log(`📡 ตรวจสอบการลงทะเบียนจาก: ${checkUrl}`);

          const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });
          const checklineID = await checkResponse.json();

          const replyMessage = checklineID?.data
            ? "✅ คุณได้ลงทะเบียนแล้ว!"
            : "📝 โปรดพิมพ์เลขบัตรประชาชน 13 หลักของคุณ";

          const replyBody = {
            replyToken: event.replyToken,
            messages: [{ type: "text", text: replyMessage }],
          };

          await fetch(`${LINE_API_URL}/message/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` },
            body: JSON.stringify(replyBody),
          });

          return new Response(JSON.stringify({ message: "ข้อความแจ้งเตือนส่งสำเร็จ!" }), { status: 200 });
        }

        // ✅ 3. กรณีผู้ใช้พิมพ์บัตรประชาชน 13 หลัก
        else if (/^\d{13}$/.test(messageText)) {
          const citizen_id = messageText;
          const registerUrl = API_URL;

          // ✅ ดึงข้อมูลโปรไฟล์จาก LINE
          const profileResponse = await fetch(`${LINE_API_URL}/profile/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`, "Content-Type": "application/json" },
          });

          const profileData = await profileResponse.json();
          const line_displayName = profileData.displayName || "ไม่ระบุชื่อ";

          console.log(`📡 กำลังลงทะเบียนผู้ใช้: ${line_displayName} (UID: ${userId}) กับบัตรประชาชน: ${citizen_id}`);

          // ✅ ยิง API ลงทะเบียน
          const sendApi = await fetch(registerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: line_displayName, line_uid: userId, id_card: citizen_id }),
          });

          const replyMessage = sendApi.ok
            ? "✅ ลงทะเบียนสำเร็จ! คุณสามารถใช้บริการของเราได้แล้ว"
            : "❌ ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่";

          console.log(sendApi.ok ? "✅ ลงทะเบียนสำเร็จ!" : "❌ ลงทะเบียนล้มเหลว!");

          const replyBody = {
            replyToken: event.replyToken,
            messages: [{ type: "text", text: replyMessage }],
          };

          await fetch(`${LINE_API_URL}/message/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` },
            body: JSON.stringify(replyBody),
          });

          return new Response(JSON.stringify({ message: "ข้อความแจ้งเตือนส่งสำเร็จ!" }), { status: 200 });
        }
      }
    }

    return new Response(
      JSON.stringify({ message: "No action performed" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new Response(
      JSON.stringify({ message: "Error processing webhook" }),
      { status: 500 }
    );
  }
}
