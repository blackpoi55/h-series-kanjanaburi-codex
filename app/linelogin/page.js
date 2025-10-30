"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import { getbylineid } from "@/action/api";

export default function LineLogin() {
  const [profile, setProfile] = useState(null);
  const [citizenId, setCitizenId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // ตรวจสอบว่าผู้ใช้ลงทะเบียนแล้วหรือไม่ 

  useEffect(() => {
    const initLiff = async () => {
      try {
        console.log("🔍 กำลังเริ่มต้น LIFF...");
        await liff.init({ liffId: process.env.NEXT_PUBLIC_CHANNEL_liffId });

        await liff.ready;

        if (!liff.isLoggedIn()) {
          console.log("🔑 ผู้ใช้ยังไม่ได้ล็อกอิน → กำลัง Redirect...");
          liff.login({ redirectUri: window.location.href });
          return;
        }

        // ✅ ดึงข้อมูลโปรไฟล์ LINE
        const profileData = await liff.getProfile();
        console.log("✅ ได้รับข้อมูลโปรไฟล์:", profileData);
        setProfile(profileData);

        // 🔹 ลบค่า `code` จาก URL เพื่อป้องกัน Redirect Loop
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("code")) {
          console.log("🔄 ล้างค่า `code` ออกจาก URL...");
          window.history.replaceState(null, "", window.location.pathname);
        }

        // 🔹 ใช้ Fetch เพื่อเรียก API เช็คว่าผู้ใช้ลงทะเบียนแล้วหรือยัง
        try {
          console.log("🔎 กำลังเรียก API เพื่อตรวจสอบบัญชี LINE ID:", profileData.userId);
          const response = await fetch(`https://api-h-series.telecorp.co.th/api/healthPatients/bylineid/${profileData.userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.error) {
            throw new Error(`❌ API ตอบกลับสถานะผิดพลาด: ${response.status}`);
          }

          const checklineID = await response.json();
          console.log("📌 ผลลัพธ์จาก API:", checklineID);

          if (checklineID?.data) {
            setIsRegistered(true);
            console.log("✅ บัญชีนี้ลงทะเบียนแล้ว!");
          } else {
            console.log("✅ บัญชียังไม่ลงทะเบียน สามารถดำเนินการได้");
          }
        } catch (apiError) {
          console.error("❌ เกิดข้อผิดพลาดในการเรียก API:", apiError);
          setError("API ตรวจสอบบัญชีมีปัญหา");
        }
      } catch (err) {
        console.error("❌ LIFF Init Error:", err);
        setError("ไม่สามารถโหลดข้อมูล LINE ได้");
      } finally {
        setLoading(false);
      }
    };

    initLiff();
  }, []);




  const handleSubmit = async () => {
    if (!citizenId.match(/^\d{13}$/)) {
      alert("กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง (13 หลัก)");
      return;
    }

    try {
      console.log("📤 กำลังส่งข้อมูลไปที่ API:", {
        line_displayName: profile?.displayName,
        line_uid: profile?.userId,
        citizen_id: citizenId,
      });

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_displayName: profile.displayName,
          line_uid: profile?.userId,
          citizen_id: citizenId,
        }),
      });

      const result = await response.json();
      console.log("✅ ผลลัพธ์จาก API:", result);
      alert(result.message || "ลงทะเบียนสำเร็จ!");
    } catch (error) {
      console.error("❌ Error submitting data:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  const handleLogout = () => {
    console.log("🚪 กำลังออกจากระบบ...");
    liff.logout();
    window.location.reload(); // รีโหลดหน้าใหม่หลังจากออกจากระบบ
  };

  if (loading) return <h1>กำลังโหลด...</h1>;
  if (error) return <h1>เกิดข้อผิดพลาด: {error}</h1>;

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>ลงทะเบียนผ่าน LINE</h1>

      {profile ? (
        <div className="flex flex-col items-center">
          <img
            src={profile.pictureUrl}
            alt="Profile"
            style={{ borderRadius: "50%", width: 100, height: 100, marginBottom: 10 }}
          />
          <p><strong>ชื่อ:</strong> {profile.displayName}</p>
          <p><strong>สถานะ:</strong> {profile.statusMessage || "ไม่มีข้อความสเตตัส"}</p>
          <p><strong>LINE UID:</strong> {profile.userId}</p>

          {isRegistered ? (
            <p style={{ color: "red", fontWeight: "bold" }}>
              ⚠️ LINE {profile.displayName} ได้ลงทะเบียนแล้ว!
            </p>
          ) : (
            <>
              <input
                type="text"
                placeholder="กรอกเลขบัตรประชาชน"
                value={citizenId}
                onChange={(e) => setCitizenId(e.target.value)}
                style={{ padding: 10, marginTop: 10 }}
              />
              <button onClick={handleSubmit} style={{ marginTop: 10, padding: 10 }}>
                ส่งข้อมูล
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: 5,
            }}
          >
            ออกจากระบบ
          </button>
        </div>
      ) : (
        <p>ไม่พบข้อมูลผู้ใช้</p>
      )}
    </div>
  );
}
