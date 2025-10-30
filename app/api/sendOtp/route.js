import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Missing email or OTP" }, { status: 400 });
  }

  // ✅ ดึง Domain ปัจจุบันโดยใช้ req.headers.get('host')
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'http'; // เผื่อใช้ HTTPS
  // ✅ ตั้งวันหมดอายุของลิงก์ (ให้ OTP ใช้ได้ภายใน 10 นาที)
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 10);
  const expiryISO = expiryTime.toISOString(); // ✅ แปลงเป็น ISO 8601

  // ✅ รวม email และ expiry แล้วเข้ารหัส Base64
  const bms = btoa(`${email}|${expiryISO}`);
  const fullURL = `${protocol}://${host}/Care-Vista-C/loginemailconfirm?bms=${bms}`;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP Connection Successful");
    console.log("🔗 OTP URL:", fullURL);

    const mailOptions = {
      from: `"Bangkok Christian Hospital" <${process.env.EMAIL_USER}>`,
      to: email,
      // to: "blackpoi55@gmail.com",
      subject: "ยืนยันตัวตนเพื่อตรวจสอบผลสุขภาพ",
      html: `
     <div style="background-color:#f4f4f4; padding:40px 0; text-align:end; font-family:Arial, sans-serif;">
  <div style="max-width:500px; background:white; padding:30px; border-radius:15px; margin:auto; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
    
    <!-- ✅ Header Section -->
    <div style="display: flex; align-items: center; gap: 15px;">
 
      <div>
        <h1 style="color:#4C5079; font-weight:bold; font-size:12px; text-align:start; margin-bottom:2px;">
          โรงพยาบาลกรุงเทพคริสเตียน
        </h1>
        <h1 style="color:#0B4C72; font-weight:bold; font-size:18px; text-align:start; margin-top:0px;">
          Care Vista-C
        </h1>
      </div>
    </div>

    <!-- ✅ Welcome Text -->
    <h1 style="font-size:48px; font-weight:bold; color:#0A2D4D; margin-bottom:2px;">
      The Bangkok
    </h1>
    <h1 style="font-size:48px; font-weight:bold; color:#0A2D4D; margin-top:2px; margin-bottom:2px;">
      Christian Hospital
    </h1>

    <!-- ✅ OTP Box -->
    <div style="text-align: center;">
      <div style="font-size:24px; font-weight:bold; color:#E5686A; background:#FFF3F3; padding:10px 20px; 
                  display:inline-block; border-radius:5px; margin:20px 0;">
        ${otp}
      </div>
    </div>

    <!-- ✅ Welcome Message -->
    <p style="font-size:28px; color:#0B4C72; font-weight:bold; margin-bottom:2px; text-align:end; margin-top:2px;">
      ยินดีต้อนรับ
    </p>

    <!-- ✅ Description -->
    <p style="font-size:14px; color:#0F4B6D; line-height:1.6; padding: 0 10px; margin-top:2px; text-align:end;">
      เข้าสู่ระบบสมุดสุขภาพออนไลน์ โรงพยาบาลกรุงเทพคริสเตียน <br>
      ท่านสามารถติดตามผลตรวจสุขภาพของพนักงานในองค์กรได้สะดวกมากยิ่งขึ้น
    </p>

    <!-- ✅ Divider Line -->
    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">

    <!-- ✅ Confirmation Text -->
    <p style="font-size:14px; color:#0F4B6D; text-align:center;">
      กรุณาคลิกปุ่มด้านล่าง เพื่อยืนยันตัวตนและเข้าสู่ระบบค่ะ
    </p>

    <!-- ✅ Submit Button -->
    <div style="text-align:center;">
      <a href="${fullURL}" 
         style="display:inline-block; background:#0F4B6D; color:white; padding:12px 30px; 
                text-decoration:none; font-size:16px; font-weight:bold; border-radius:50px; margin-top:15px;">
        Submit
      </a>
    </div>

    <!-- ✅ Privacy Policy Links -->
    <p style="font-size:12px; color:#999; margin-top:20px; text-align:center;">
      ท่านสามารถอ่านนโยบายความเป็นส่วนตัวได้ที่นี่ 
    </p>
    
    <div style="text-align:center; font-size:12px;">
      <a href="http://www.bch.in.th/cookie" style="color:#014F7D; text-decoration:none; margin-right:10px;">
        นโยบายความเป็นส่วนตัว
      </a>
      <a href="http://www.bch.in.th/policy" style="color:#014F7D; text-decoration:none;">
        ข้อตกลงและเงื่อนไข
      </a>
    </div>
    
  </div>
</div>

      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully");
    return NextResponse.json({ message: "OTP Sent Successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Email Send Error:", error);
    return NextResponse.json({ error: "Failed to send email", details: error }, { status: 500 });
  }
}
