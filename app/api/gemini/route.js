import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { hn, fullname, gender, age, bp, bmi, disease, smoking, alcohol, labTests } = await req.json();
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "Google Gemini API Key is missing" }, { status: 500 });
        }

        // ✅ โมเดลที่ใช้ (เลือก "gemini-1.5-pro" หรือ "gemini-1.5-flash")
        const model = "models/gemini-1.5-pro";

        // ✅ เพิ่ม `Prompt` ที่เป็น Role และ Instructions แบบละเอียด
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

        // ✅ ส่ง `Prompt` ไปยัง Google Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        console.log("🔍 Gemini API Response:", JSON.stringify(data, null, 2));

        // ✅ ตรวจสอบผลลัพธ์จาก API
        if (data.candidates && data.candidates.length > 0) {
            return NextResponse.json({ result: data.candidates[0].content.parts[0].text });
        }

        return NextResponse.json({ error: "No valid response from Gemini API" }, { status: 500 });

    } catch (error) {
        console.error("❌ Gemini API Error:", error);
        return NextResponse.json({ error: "เกิดข้อผิดพลาดในการเรียก API" }, { status: 500 });
    }
}
