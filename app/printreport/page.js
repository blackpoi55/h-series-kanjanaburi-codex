'use client'
import Baselayout from '@/components/Baselayout/Baselayout'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Loading from '@/components/Tool/Loading'
import Printreport from '@/components/Printreport/Printreport'
import { getPatientReportById, getPatientTranslateResult, getPhysicalexamById } from '@/action/api'

export default function page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const UID = searchParams.get('UID')
  const [form, setForm] = useState(null)
  const [form_result, setForm_result] = useState(null)
  const [wait, setWait] = useState(true) // เริ่มต้นเป็น true เนื่องจากจะโหลดข้อมูล
  const [showAIResult, setShowAIResult] = useState(false);
  const [aiData, setaiData] = useState("");

  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  const refresh = async () => {
    setWait(true)
    try {
      const res = await getPatientReportById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || null)
      } else {
        console.error('Error fetching patient report:', res?.error)
      }

      const res_result = await getPatientTranslateResult(UID)
      if (res_result?.message === 'success') {
        setForm_result(res_result?.data || null)
      } else {
        console.error('Error fetching patient translate result:', res_result?.error)
      }
      const oldResult = await getPhysicalexamById(UID);
      const existingText = oldResult?.data?.conclusion_ai;
      if (existingText) {
        setaiData(existingText || null)
      } else {
        console.error('Error fetching physical exam result:', oldResult?.error)
      }
    } catch (error) {
      console.error('Error during data fetch:', error)
    }
    setWait(false)
  }

  const scrollToSection = (v) => {
    document.getElementById(v).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <Baselayout>
      <div id="top" className="w-full h-full bg-[#FFFFFF] p-4 px-20 pb-20">
        {showAIResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-fade-in-up">

              {/* ⬆ Header แบบใหม่ */}
              <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl bg-gradient-to-r from-[#0F2027] via-[#2C5364] to-[#014F7D] shadow-md">
                <h2 className="text-white text-lg sm:text-xl font-bold flex items-center gap-2">
                  <img src="/images/careai.png" className="w-6 h-6 animate-pulse" alt="AI" />
                  ผลวิเคราะห์จาก AI
                </h2>
                <button
                  onClick={() => setShowAIResult(false)}
                  className="text-white text-xl font-bold hover:text-red-400 transition"
                >
                  ×
                </button>
              </div>

              {/* เนื้อหา */}
              <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4 text-sm text-gray-800 leading-relaxed">
                {aiData ? (
                  <>
                    <div className="border-l-4 border-[#26A1DC] pl-4">
                      <h3 className="text-md font-bold text-[#014F7D]">📋 สรุปผลตรวจสุขภาพ</h3>
                      <p className="text-gray-700 italic mt-1">
                        {aiData.match(/## (.*?)\n/)?.[1]}
                      </p>
                    </div>

                    {aiData.split('\n').map((line, i) => {
                      const clean = line.trim();
                      if (!clean || clean === '•') return null;

                      if (clean.startsWith('**')) {
                        return (
                          <h4
                            key={i}
                            className="text-sm font-semibold text-[#365382] bg-[#ecf5ff] px-3 py-2 rounded-md shadow-sm"
                          >
                            {clean.replace(/\*\*/g, '')}
                          </h4>
                        );
                      }

                      if (clean.startsWith('-')) {
                        return (
                          <div key={i} className="flex items-start gap-2 pl-2">
                            <div className="mt-1 w-2 h-2 rounded-full bg-[#26A1DC] flex-shrink-0" />
                            <p>{clean.replace(/^- /, '')}</p>
                          </div>
                        );
                      }

                      return <p key={i}>{clean}</p>;
                    })}
                  </>
                ) : (
                  <p className="text-center text-gray-500">ไม่พบผลวิเคราะห์จาก AI</p>
                )}
              </div>
            </div>
          </div>
        )}

        <Loading wait={wait} />
        <div onClick={() => router.back()} className="flex gap-4 mb-4 cursor-pointer">
          <img
            className="cursor-pointer"
            width={8}
            height={24}
            src="/icon/arrow_left.svg"
          />
          <label
            className="text-[#365382] font-medium text-xl cursor-pointer"
            htmlFor=""
          >
            ย้อนกลับ
          </label>
        </div>
        <div className="flex justify-start mb-4">
          <label className="font-semibold text-[#2F2F2F] text-3xl w-1/2" htmlFor="">
            Print Report
          </label>
          <div className="w-1/2 flex justify-end">
            <button
              disabled={!aiData}
              onClick={() => setShowAIResult(true)}
              className="bg-[#365382] text-white rounded-lg px-4 py-2 ml-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2F2F2F] transition duration-300 ease-in-out"
            >
              ผลวิเคราะห์จาก AI
            </button>
          </div>
        </div>
        {!wait && form && form_result ? (
          <Printreport data={form} data_result={form_result} refresh={refresh} />
        ) : (
          <div className="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
        )}
      </div>
    </Baselayout>
  )
}

