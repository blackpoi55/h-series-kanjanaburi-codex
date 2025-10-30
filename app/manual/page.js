// ManualPage.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { bucode } from "@/config";
import moment from "moment";
import { usePathname, useSearchParams } from "next/navigation";

const TinyMCEWrite = dynamic(() => import("@/components/Tiny/TinyMCEWrite"), {
  ssr: false,
});

const projectOptions = [
  { label: "Cryoviva Form", value: "form01" },
  { label: "Cryoviva Equipment Form", value: "equipmentform" },
  { label: "Cryoviva Certificate", value: "cryovivacertificate" },
  { label: "Cryoviva Inventory", value: "cryovivainventory" },
  { label: "Cryoviva Equipment", value: "cryovivaequipment" },
  { label: "H-series New", value: "CarevitaAI" },
  { label: "SSH ระบบงานนัดหมายตรวจสุขภาพออนไลน์", value: "Appointment Health Check UP" },
];
// Cryoviva Form Zm9ybTAx
// Cryoviva Equipment Form ZXF1aXBtZW50Zm9ybQ==
// Cryoviva Certificate Y3J5b3ZpdmFjZXJ0aWZpY2F0ZQ==
// Cryoviva Inventory Y3J5b3ZpdmFpbnZlbnRvcnk=
// Cryoviva Equipment Y3J5b3ZpdmFlcXVpcG1lbnQ=
// H-series New Q2FyZXZpdGFBSQ==
// Test ZGV2dGVzdA==

export default function ManualPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("c");

  const [manuals, setManuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });
  const [formData, setFormData] = useState({ name: "", detail: "", bucode: "", createby: "" });
  const [query, setQuery] = useState("");
  const [projectFilter, setprojectFilter] = useState(bucode);

  const safeAtob = (s, fallback) => {
    try {
      return atob(s);
    } catch {
      return fallback;
    }
  };

  const fetchManuals = async (pf = projectFilter) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api-h-series.telecorp.co.th/api/manual/getbyCode/${pf}`);
      const data = await res.json();

      const sorted = (data.data || []).sort(
        (a, b) => (a.sort) - (b.sort)
      );



      setManuals(sorted);
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- ตัดสินใจจากการมี/ไม่มี code: ตั้งค่าเริ่มต้น + ดึงข้อมูลครั้งแรก ---
  useEffect(() => {
    const hasCode = !!code;
    if (hasCode) {
      const pf = safeAtob(code, bucode); // มี code → decode
      setprojectFilter(pf);
      fetchManuals(pf);
    } else {
      setprojectFilter(bucode); // ไม่มี code → bucode
      fetchManuals(bucode);
    }
  }, [code, bucode]);

  const handleProjectChange = (e) => {
    if (code) return; // กันเผื่อ
    const v = e.target.value;
    setprojectFilter(v);
    fetchManuals(v);
  };

  const openModal = (mode, data = null) => {
    setModal({ open: true, mode, data });
    if (data) {
      setFormData({
        name: data.name || "",
        detail: data.detail || "",
        group: data.group || "",
        bucode: data.bucode || projectFilter,
        createby: data.createby || "",
        sort: data.sort || 99,
        active: data.active || "N"
      });
    } else {
      setFormData({ name: "", detail: "", group: "", bucode: projectFilter, createby: "" });
    }
  };

  const openModalApproved = async (_mode, data = null) => {
    let hasDrawn = false; // มีการวาดแล้วหรือยัง

    const { value: formValues } = await Swal.fire({
      title: "ลงลายเซ็นเพื่อยืนยัน",
      html: `
      <div style="text-align:left"> 
        <div style="margin:8px 0 6px; font-size:0.95rem;">ลายเซ็น</div>
        <div style="border:1px dashed #9ca3af; border-radius:10px; background:#fff;">
          <canvas id="sigCanvas" width="560" height="220" style="width:100%;height:220px;border-radius:10px;display:block"></canvas>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
          <button type="button" id="clearSigBtn" class="swal2-styled" style="background:#e51c23;color: white">ล้างลายเซ็น</button>
        </div>
      </div>
    `,
      didOpen: () => {
        const canvas = document.getElementById("sigCanvas");
        const clearBtn = document.getElementById("clearSigBtn");
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
          const ratio = Math.max(window.devicePixelRatio || 1, 1);
          const displayWidth = canvas.clientWidth || 560;
          const displayHeight = 220;
          canvas.width = Math.floor(displayWidth * ratio);
          canvas.height = Math.floor(displayHeight * ratio);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(ratio, ratio);
          ctx.lineWidth = 2.5;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.strokeStyle = "#111827";
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, displayWidth, displayHeight);
          hasDrawn = false;
        };
        resizeCanvas();

        let drawing = false;
        let last = { x: 0, y: 0 };

        const getPos = (e) => {
          const r = canvas.getBoundingClientRect();
          const t = e.touches && e.touches[0];
          return t ? { x: t.clientX - r.left, y: t.clientY - r.top } : { x: e.clientX - r.left, y: e.clientY - r.top };
        };

        const start = (e) => {
          e.preventDefault();
          drawing = true;
          last = getPos(e);
        };
        const move = (e) => {
          if (!drawing) return;
          const pos = getPos(e);
          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
          last = pos;
          hasDrawn = true;
        };
        const end = () => {
          drawing = false;
        };

        canvas.addEventListener("mousedown", start);
        canvas.addEventListener("mousemove", move);
        window.addEventListener("mouseup", end);
        canvas.addEventListener("touchstart", start, { passive: false });
        canvas.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("touchend", end);

        clearBtn.addEventListener("click", () => {
          const displayWidth = canvas.clientWidth || 560;
          const displayHeight = 220;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, displayWidth, displayHeight);
          hasDrawn = false;
        });

        window.addEventListener("resize", resizeCanvas, { once: true });
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "ยืนยันอนุมัติ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      width: 640,
      preConfirm: () => {
        const nameEl = document.getElementById("signerName");
        const canvas = document.getElementById("sigCanvas");

        const name = (nameEl?.value || "").trim();

        if (!hasDrawn) {
          Swal.showValidationMessage("กรุณาลงลายเซ็น");
          return false;
        }
        const signature = canvas.toDataURL("image/png");
        return { name, signature };
      },
    });

    if (!formValues) return;

    try {
      const payload = {
        approvedat: moment(new Date().toISOString()).format("YYYY-MM-DD"),
        approvedby: formValues.signature,
      };
      console.log("APPROVE PAYLOAD =>", payload);
      const res = await fetch("https://api-h-series.telecorp.co.th/api/manual/" + (data?.uid ?? ""), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.error) {
        await Swal.fire("Approved!", "ทำการอนุมัติพร้อมลายเซ็นเรียบร้อย", "success");
        fetchManuals(); // ใช้ state ปัจจุบัน
      } else {
        console.error("Approve failed");
        Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถอนุมัติได้ กรุณาลองใหม่อีกครั้ง", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถอนุมัติได้ กรุณาลองใหม่อีกครั้ง", "error");
    }
  };

  const closeModal = () => {
    setModal({ open: false, mode: "add", data: null });
    setFormData({ name: "", detail: "", group: "", bucode: "", createby: "" });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Swal.fire({ icon: "warning", title: "กรุณากรอกชื่อคู่มือ", timer: 2000, showConfirmButton: false });
      return;
    }

    if (!formData.createby.trim()) {
      Swal.fire({ icon: "warning", title: "กรุณาระบุชื่อผู้สร้าง", timer: 2000, showConfirmButton: false });
      return;
    }

    const now = new Date().toISOString();
    const payload = {
      ...formData,
      ...(modal.mode === "add" ? { createat: now, updateat: null } : { updateat: now }),
    };

    const method = modal.mode === "edit" ? "PUT" : "POST";
    const url =
      modal.mode === "edit"
        ? `https://api-h-series.telecorp.co.th/api/manual/${modal.data.uid}`
        : "https://api-h-series.telecorp.co.th/api/manual";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${res.status} - ${errorText}`);
      }

      closeModal();
      fetchManuals(); // ใช้ค่า state ปัจจุบัน
      Swal.fire({ icon: "success", title: "บันทึกข้อมูลเรียบร้อยแล้ว!", timer: 2000, showConfirmButton: false });
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", err);
      Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาดในการบันทึกข้อมูล", timer: 2000, showConfirmButton: false });
    }
  };

  const handleDelete = async (manual) => {
    const confirm = await Swal.fire({
      title: `คุณแน่ใจหรือไม่?`,
      text: `ต้องการลบคู่มือ "${manual.name}" หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://api-h-series.telecorp.co.th/api/manual/${manual.uid}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Server Error: ${res.status} - ${errorText}`);
        }

        await fetchManuals();
        Swal.fire({ icon: "success", title: "ลบข้อมูลเรียบร้อยแล้ว", timer: 2000, showConfirmButton: false });
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", err);
        Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาดในการลบข้อมูล", timer: 2000, showConfirmButton: false });
      }
    }
  };

  const filteredManuals = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return manuals;
    return manuals.filter((m) =>
      [m?.name ?? "", m?.bucode ?? "", m?.createby ?? "", new Date(m?.createat).toLocaleString() ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [manuals, query]);

  return (
    <div className="p-10 max-w-full mx-auto bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-800 dark:text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 dark:text-white tracking-tight flex items-center gap-2">
          📚 <span>รายการคู่มือทั้งหมด ({filteredManuals.length || 0})</span>
        </h1>

        {/* Filter + Button */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
          {/* ช่องค้นหา */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาชื่อ / BU / ผู้สร้าง"
            className="p-3 border border-gray-300 rounded-lg shadow-sm w-full sm:w-72 focus:outline-none text-black"
          />
          <select
            value={projectFilter}
            disabled={!!code}
            onChange={handleProjectChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm w-full sm:w-60 focus:outline-none text-black"
          >
            {projectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => openModal("add")}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-xl transition-transform transform hover:scale-105 w-full sm:w-auto"
          >
            ➕ เพิ่มคู่มือ
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
          <span className="ml-4 text-lg font-medium text-purple-700 dark:text-purple-200">กำลังโหลดข้อมูล...</span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl shadow-2xl border border-purple-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-purple-100 dark:bg-gray-700 text-purple-800 dark:text-white rounded-t-3xl">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">ชื่อ</th>
                <th className="p-4 text-left">BU Code</th>
                <th className="p-4 text-left">ผู้สร้าง</th>
                <th className="p-4 text-left">วันที่สร้าง</th>
                <th className="p-4  text-center">Approve By</th>
                <th className="p-4  text-center">Approve Date</th>
                <th className="p-4  text-center">Active</th>
                <th className="p-4 text-left">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100 dark:divide-gray-700">
              {filteredManuals.map((m, index) => (
                <tr key={m.uid} className="hover:bg-purple-50 dark:hover:bg-gray-800 transition">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{m.name}</td>
                  <td className="p-4">{m.bucode}</td>
                  <td className="p-4">{m.createby}</td>
                  <td className="p-4">{new Date(m.createat).toLocaleString()}</td>
                  <td className="p-4 text-center flex justify-center">
                    {m.approvedby ? <img className="h-12 rounded-lg" src={m.approvedby} /> : "-"}
                  </td>
                  <td className="p-4 text-center">{m.approvedat ? moment(m.approvedat).format("DD/MM/YYYY") : "-"}</td>
                  <td className={m.active ? "p-4 text-green-600" : "p-4 text-red-700"}>{m.active ? "เปิดใช้งาน" : "ยังไม่เปิดใช้งาน"}</td>
                  <td className="p-4 space-x-2">
                    <a
                      href={`/manual/view?id=${m.uid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm shadow-md transition"
                    >
                      👁️ ดู
                    </a>
                    <button
                      onClick={() => openModal("edit", m)}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-1.5 rounded-full text-sm shadow-md transition"
                    >
                      ✏️ แก้ไข
                    </button>
                    <button
                      onClick={() => openModalApproved("Approved", m)}
                      className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-4 py-1.5 rounded-full text-sm shadow-md transition"
                    >
                      ✔️ Approved
                    </button>
                    <button
                      onClick={() => handleDelete(m)}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-1.5 rounded-full text-sm shadow-md transition"
                    >
                      🗑️ ลบ
                    </button>
                  </td>
                </tr>
              ))}
              {manuals.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-purple-500 dark:text-purple-200 font-medium">
                    ไม่มีข้อมูลคู่มือ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal.open && modal.mode !== "view" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl w-[80%] max-w-[1300px] shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 text-purple-800 dark:text-white">
              {modal.mode === "add" ? "➕ เพิ่มคู่มือ" : "✏️ แก้ไขคู่มือ"}
            </h2>

            <label className="block mb-2 text-gray-700 dark:text-gray-200">ชื่อคู่มือ</label>
            <input
              type="text"
              className="w-full mb-4 px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <label className="block mb-2 text-gray-700 dark:text-gray-200">Group</label>
            <input
              type="text"
              className="w-full mb-4 px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
            />
            <label className="block mb-2 text-gray-700 dark:text-gray-200">รายละเอียด</label>
            <div className="w-full mb-4">
              <TinyMCEWrite initialValue={formData.detail} onChange={(val) => setFormData({ ...formData, detail: val })} />
            </div>

            <label className="block mb-2 text-gray-700 dark:text-gray-200">BU Code</label>
            <input
              type="text"
              disabled
              className="w-full mb-4 px-4 py-2 border rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              value={formData.bucode}
            />
            <label className="block mb-2 text-gray-700 dark:text-gray-200">Active</label>
            <input
              type="checkbox"
              className="mb-4 h-6 w-6"
              checked={formData.active == "A"}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked ? "A" : "N" })}
            />
            <input
              type="number"
              className="w-full mb-4 px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.sort}
              onChange={(e) => setFormData({ ...formData, sort: e.target.value })}
            />

            <label className="block mb-2 text-gray-700 dark:text-gray-200">สร้างโดย</label>
            <input
              type="text"
              className="w-full mb-4 px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.createby}
              onChange={(e) => setFormData({ ...formData, createby: e.target.value })}
            />

            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={closeModal} className="px-5 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl">
                ❌ ปิด
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-md"
              >
                💾 บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
