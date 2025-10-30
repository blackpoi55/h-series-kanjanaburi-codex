import { GoogleGenerativeAI } from '@google/generative-ai';
// https://aistudio.google.com/u/5/apikey
// https://console.cloud.google.com/apis/credentials?project=gen-lang-client-0260498652&authuser=5&inv=1&invt=AbzBvw
// blackpoi55tcg@gmail.com
export async function POST(req) {
  try {
    const { hn, fullname, gender, age, bp, bmi, disease, smoking, alcohol, labTests } = await req.json();

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) return new Response('Missing API Key', { status: 500 });

    const genAI = new GoogleGenerativeAI(apiKey);
    // const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

    const prompt = `
      คุณเป็นแพทย์ที่มีความเชี่ยวชาญในการตรวจสุขภาพและให้คำแนะนำด้านเวชศาสตร์ป้องกัน

      📌 **คำสั่ง:**
      - วิเคราะห์ผลตรวจสุขภาพของผู้ป่วยโดยพิจารณาจากข้อมูลที่ได้รับ
      - ระบุค่าที่อยู่ในเกณฑ์ปกติ ค่าที่ต้องเฝ้าระวัง และค่าที่ผิดปกติ
      - วิเคราะห์ความเสี่ยงที่เกี่ยวข้อง เช่น เบาหวาน ความดันสูง ไขมันในเลือด โรคไต โรคตับ
      - ให้คำแนะนำที่เหมาะสมในการควบคุมสุขภาพ อาหาร ออกกำลังกาย และติดตามผล
      - แนะนำว่าควรพบแพทย์เฉพาะทางหรือไม่

      **📊 ข้อมูลผู้ป่วย:**
      - **HN:** ${hn}
      - **ชื่อ-นามสกุล:** ${fullname}
      - **เพศ:** ${gender}
      - **อายุ:** ${age} ปี
      - **ความดันโลหิต (BP):** ${bp} mmHg
      - **ดัชนีมวลกาย (BMI):** ${bmi}
      - **โรคประจำตัว:** ${disease || "ไม่มี"}
      - **ประวัติการสูบบุหรี่:** ${smoking ? "สูบบุหรี่" : "ไม่สูบบุหรี่"}
      - **ประวัติการดื่มแอลกอฮอล์:** ${alcohol ? "ดื่ม" : "ไม่ดื่ม"}

      **🧪 ผลตรวจทางห้องปฏิบัติการ (Lab Tests):**
      - **FBS (น้ำตาลในเลือด):** ${labTests.fbs} mg/dL
      - **Cholesterol:** ${labTests.cholesterol} mg/dL
      - **HDL (คอเลสเตอรอลชนิดดี):** ${labTests.hdl} mg/dL
      - **Triglyceride:** ${labTests.triglyceride} mg/dL
      - **LDL (ไขมันไม่ดี):** ${labTests.ldl} mg/dL
      - **Uric Acid:** ${labTests.uric} mg/dL
      - **BUN (ไต):** ${labTests.bun} mg/dL
      - **SGPT (ตับ):** ${labTests.sgpt} U/L
      - **SGOT (ตับ):** ${labTests.sglt} U/L
      - **ALK (ตับ):** ${labTests.alk} U/L
      - **Hb (ฮีโมโกลบินในเลือด):** ${labTests.hb} g/dL
      - **Hematocrit:** ${labTests.hematocrit} %
      - **White Cell Count:** ${labTests.whiteCellCount} cells/µL
      - **Red Cell Count:** ${labTests.redCellCount} cells/µL
      - **สีปัสสาวะ:** ${labTests.color}
      - **โปรตีนในปัสสาวะ:** ${labTests.protein} mg/dL

      **🩺 วิธีการวิเคราะห์:**
      1️⃣ **สรุปผลตรวจสุขภาพ** (ปกติ/เฝ้าระวัง/ผิดปกติ)
      2️⃣ **วิเคราะห์ความเสี่ยง** (โรคเบาหวาน, ความดันโลหิตสูง, ไขมันในเลือด, โรคไต ฯลฯ)
      3️⃣ **ให้คำแนะนำด้านสุขภาพ** (การออกกำลังกาย, ควบคุมอาหาร, ลดความเสี่ยง)
      4️⃣ **แนะนำการติดตามผล** (ต้องตรวจซ้ำหรือพบแพทย์เฉพาะทางหรือไม่)

      🏥 **กรุณาวิเคราะห์ข้อมูล และสรุปเป็นภาษาไทย**
    `;

    const result = await model.generateContentStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
