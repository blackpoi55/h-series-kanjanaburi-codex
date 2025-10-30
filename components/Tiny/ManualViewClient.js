"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ManualViewClient() {
  const [value, setValue] = useState(null);
  const [manuals, setManuals] = useState([]);
  const [projectFilter, setProjectFilter] = useState();
  const [query, setQuery] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [openGroups, setOpenGroups] = useState({}); // {"groupName": true/false}

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // ถ้ามี ?id= ให้โหลดรายละเอียดนั้นก่อน แล้วตั้ง bucode -> ไปโหลดรายการ
  useEffect(() => {
    if (id) getData(id);
  }, [id]);

  // เมื่อมี bucode แล้ว ค่อยโหลดรายการ
  useEffect(() => {
    if (projectFilter) fetchManuals(projectFilter);
  }, [projectFilter]);

  const fetchManuals = async (bucode) => {
    try {
      setLoadingList(true);
      const res = await fetch(
        `https://api-h-series.telecorp.co.th/api/manual/getbyCode/${encodeURIComponent(bucode)}`
      );
      const json = await res.json();
      const rows = Array.isArray(json?.data) ? json.data : [];

      // คงเหลือเฉพาะ active = "A" และ sort asc (null/undefined → ท้าย)
      const active = rows
        .filter((m) => m?.active === "A")
        .sort((a, b) => {
          const sa = Number.isFinite(a?.sort) ? a.sort : Number.MAX_SAFE_INTEGER;
          const sb = Number.isFinite(b?.sort) ? b.sort : Number.MAX_SAFE_INTEGER;
          return sa - sb;
        });

      setManuals(active);
      setLoadingList(false);

      // เปิดกลุ่มทั้งหมดครั้งแรก
      setOpenGroups((prev) => {
        const next = { ...prev };
        active.forEach((m) => {
          if (m.group && !(m.group in next)) next[m.group] = true;
        });
        return next;
      });
    } catch (e) {
      console.error(e);
      setLoadingList(false);
    }
  };

  const getData = async (manualId) => {
    try {
      setLoadingDetail(true);
      const res = await fetch(
        `https://api-h-series.telecorp.co.th/api/manual/${encodeURIComponent(manualId)}`
      );
      const json = await res.json();
      const data = json?.data || null;
      setValue(data || null);
      if (data?.bucode) setProjectFilter(data.bucode);
      setLoadingDetail(false);
    } catch (e) {
      console.error(e);
      setLoadingDetail(false);
    }
  };

  // ฟิลเตอร์ด้วย query ที่ชื่อเอกสาร
  const filteredManuals = useMemo(() => {
    const q = (query || "").toLowerCase().trim();
    if (!q) return manuals;
    return manuals.filter((m) => (m?.name || "").toLowerCase().includes(q));
  }, [manuals, query]);

  /**
   * 🔥 "ลิสต์รวม" ตามกติกา:
   * - สร้าง group buckets -> คำนวณ minSort ของแต่ละกลุ่ม
   * - “รายการเดี่ยว” (group = null) สร้างเป็น entry เดี่ยว พร้อม key = sort
   * - “กลุ่ม” สร้างเป็น entry ชนิด group พร้อม key = minSort
   * - รวมทั้งหมดเข้าด้วยกันแล้ว sort ตาม key
   * - เวลา render: ถ้า type = 'single' ให้ render ปุ่มเดี่ยว, ถ้า type = 'group' ให้ render หัวกลุ่ม + รายการภายใน (ตาม sort)
   */
  const mergedList = useMemo(() => {
    const groupMap = new Map(); // groupName -> { name, items[], minSort }
    const singles = [];

    for (const m of filteredManuals) {
      const s = Number.isFinite(m?.sort) ? m.sort : Number.MAX_SAFE_INTEGER;
      if (m.group) {
        if (!groupMap.has(m.group)) {
          groupMap.set(m.group, { name: m.group, items: [], minSort: s });
        }
        const g = groupMap.get(m.group);
        g.items.push(m);
        if (s < g.minSort) g.minSort = s;
      } else {
        singles.push({ type: "single", item: m, key: s });
      }
    }

    // เรียงรายการภายในกลุ่มตาม sort
    const groups = Array.from(groupMap.values()).map((g) => {
      g.items.sort((a, b) => {
        const sa = Number.isFinite(a?.sort) ? a.sort : Number.MAX_SAFE_INTEGER;
        const sb = Number.isFinite(b?.sort) ? b.sort : Number.MAX_SAFE_INTEGER;
        return sa - sb;
      });
      return { type: "group", group: g, key: g.minSort };
    });

    // รวม “กลุ่ม” และ “เดี่ยว” แล้วเรียงตาม key (sort/minSort)
    const combined = [...singles, ...groups].sort((a, b) => a.key - b.key);
    return combined;
  }, [filteredManuals]);

  const totalCount = filteredManuals.length;

  const toggleGroup = (gname) => {
    setOpenGroups((p) => ({ ...p, [gname]: !p[gname] }));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#e0f7fa] via-[#fce4ec] to-[#ede7f6] dark:from-gray-900 dark:to-gray-800 text-black dark:text-white">
      {/* Sidebar */}
      <aside className="w-80 bg-white/40 dark:bg-white/10 backdrop-blur-xl p-6 border-r border-purple-200 dark:border-gray-700 shadow-2xl z-10 rounded-tr-3xl rounded-br-3xl">
        <h2 className="text-3xl font-extrabold mb-6 text-purple-700 dark:text-white flex items-center gap-2">
          📘 <span>คู่มือระบบ ({totalCount})</span>
        </h2>

        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาเอกสาร..."
            className="w-full rounded-xl px-4 py-2 bg-white/70 dark:bg-gray-800 border border-purple-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto max-h-[80vh] pr-1 custom-scroll">
          {mergedList.map((entry, idx) => {
            if (entry.type === "single") {
              const m = entry.item;
              const selected = value?.uid === m.uid;
              return (
                <button
                  key={`single-${m.uid}-${idx}`}
                  onClick={() => getData(m.uid)}
                  className={`text-left flex items-start px-5 py-3 pr-8 rounded-2xl font-semibold text-base transition-all border relative shadow-md
                    ${selected
                      ? "bg-gradient-to-r from-purple-500 to-indigo-400 text-white border-purple-500 shadow-lg"
                      : "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-purple-100 dark:hover:bg-gray-700 border-gray-300"}`}
                >
                  <span className="relative z-10 block text-sm">{m.name}</span>
                  {selected && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-bold">★</span>
                  )}
                </button>
              );
            }

            // type = 'group'
            const g = entry.group;
            const isOpen = openGroups[g.name] ?? true;
            return (
              <div
                key={`group-${g.name}-${idx}`}
                className="bg-white/60 dark:bg-gray-900/50 rounded-2xl border border-purple-200/70 dark:border-gray-700 shadow-md"
              >
                <button
                  onClick={() => toggleGroup(g.name)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-gray-900 dark:text-gray-100">{g.name}</span>
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-200">
                      {g.items.length}
                    </span>
                  </span>
                  <span className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
                </button>

                {isOpen && (
                  <div className="px-3 pb-3 flex flex-col gap-2">
                    {g.items.map((m) => {
                      const selected = value?.uid === m.uid;
                      return (
                        <button
                          key={m.uid}
                          onClick={() => getData(m.uid)}
                          className={`text-left flex items-start px-4 py-2 rounded-xl font-medium text-sm transition-all border relative
                            ${selected
                              ? "bg-gradient-to-r from-purple-500 to-indigo-400 text-white border-purple-500 shadow"
                              : "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-purple-100 dark:hover:bg-gray-700 border-gray-300"}`}
                        >
                          <span className="relative z-10">{m.name}</span>
                          {selected && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white font-bold">★</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 px-10 py-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto bg-white text-black p-10 rounded-3xl shadow-2xl border border-purple-200 dark:border-gray-600 backdrop-blur-xl">
          {loadingDetail ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
            </div>
          ) : value ? (
            <div className="manual-html" dangerouslySetInnerHTML={{ __html: value.detail }} />
          ) : loadingList ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
            </div>
          ) : (
            <div className="text-gray-500">เลือกเอกสารจากแถบซ้ายเพื่อแสดงรายละเอียด</div>
          )}
        </div>
      </main>

      {/* Scrollbar เล็ก ๆ */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(137,110,250,.5); border-radius: 8px; }
      `}</style>

      {/* สไตล์ของ HTML ภายในรายละเอียด */}
      <style jsx global>{`
        .manual-html table {
          border-collapse: collapse !important;
          width: 100% !important;
          border-spacing: 0 !important;
          display: table !important;
        }
        .manual-html th, .manual-html td {
          border-style: solid !important;
          border-width: 1px !important;
          padding: 6px 8px !important;
          text-align: left !important;
          vertical-align: top !important;
          border-color: #000;
        }
        .manual-html img { max-width: 100%; height: auto; }
        .manual-html h1, .manual-html h2, .manual-html h3 { margin-top: 1rem; margin-bottom: .5rem; }
      `}</style>
    </div>
  );
}
