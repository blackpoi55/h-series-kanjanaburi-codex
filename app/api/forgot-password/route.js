import nodemailer from 'nodemailer';

export async function POST(req) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return Response.json({ error: 'Email is required' }, { status: 400 });
  }

  const token = Buffer.from(email).toString('base64');

  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const fullURL = `${protocol}://${host}/Care-Vista-C/reset-password?token=${token}`;

  const html = `
  <div style="background-color: #f4f6f8; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); overflow: hidden;">
      <tr>
        <td style="padding: 30px; text-align: center; background: linear-gradient(135deg, #365382, #2d4a7a); color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px;">🔐 รีเซ็ตรหัสผ่านของคุณ</h1>
          <p style="margin-top: 8px; font-size: 14px; opacity: 0.85;">คำขอรีเซ็ตรหัสผ่านของคุณได้รับการส่งเรียบร้อยแล้ว</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px; color: #333333;">
          <p style="font-size: 16px; margin-bottom: 24px;">
            คุณได้รับคำขอรีเซ็ตรหัสผ่าน หากคุณเป็นผู้ร้องขอ คลิกปุ่มด้านล่างเพื่อสร้างรหัสผ่านใหม่
          </p>
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${fullURL}" target="_blank"
              style="background: linear-gradient(135deg, #365382, #2d4a7a); color: #ffffff; text-decoration: none; padding: 14px 30px; font-size: 16px; border-radius: 8px; font-weight: bold; display: inline-block;">
              รีเซ็ตรหัสผ่าน
            </a>
          </div>
          <p style="font-size: 14px; color: #888;">
            หากคุณไม่ได้ร้องขอการรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยอีเมลฉบับนี้
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; text-align: center; background-color: #f0f2f5; font-size: 12px; color: #888;">
          © 2025 Care Vista-C. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Care Vista-C" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 ลิงก์รีเซ็ตรหัสผ่าน',
      html,
    });

    return Response.json({ message: 'Email sent' }, { status: 200 });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
