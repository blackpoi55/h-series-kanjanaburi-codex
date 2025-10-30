'use client'

import {
  gettrhealthfiles,
  HealthRecordsbyHNEN,
  HealthRecordsbyHNEN_Online,
} from '@/action/api'
import CardReport from '@/components/CardIndividualReportpdf/CardReport'
import Laboratory from '@/components/DetailIndividualReportpdf/Laboratory'
import Resultsphysicaldoctor from '@/components/DetailIndividualReportpdf/Resultsphysicaldoctor'
import SummaryRecommen from '@/components/DetailIndividualReportpdf/SummaryRecommen'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
if (typeof window !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

import { Buffer } from "buffer"; // คุณใช้ Buffer ข้างล่างอยู่
import moment from 'moment'
import Swal from 'sweetalert2'

const { PDFDocument } = require('pdf-lib')

export default function Page() {
  const searchParams = useSearchParams()
  const HN = searchParams.get('hn')
  const EN = searchParams.get('en')
  const Security = searchParams.get('security')

  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const [additionalPDFs, setAdditionalPDFs] = useState([])
  const [additionalImages, setAdditionalImages] = useState([])
  const pdfRefs = useRef([])

  const refreshUploadPDF = async (id) => {
    const res = await gettrhealthfiles(id)
    if (!res.error) {
      const files = res.data.map((file) => ({
        original_filename: file.original_filename,
        server_filename: file.server_filename,
        type: file.type,
        status: file.status,
      }))
      setAdditionalPDFs(files)
    }
  }

  const convertPDFtoImages = async () => {
    const images = []
    for (const file of additionalPDFs) {
      try {
        const fullUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL + '/' + file.server_filename
        const loadingTask = pdfjsLib.getDocument(fullUrl)
        const pdf = await loadingTask.promise
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 1.5 })
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.width = viewport.width
          canvas.height = viewport.height
          await page.render({ canvasContext: context, viewport }).promise
          const dataUrl = canvas.toDataURL()
          images.push({ name: file.original_filename, url: dataUrl })
        }
      } catch (err) {
        console.warn(`❌ แปลง PDF ${file.original_filename} ไม่สำเร็จ:`, err)
      }
    }
    setAdditionalImages(images)
  }

  const verifyPhone = async (phoneFromSystem) => {
    const { isConfirmed, value } = await Swal.fire({
      title: '🔒 ยืนยันตัวตน',
      input: 'text',
      inputLabel: 'กรุณากรอกเบอร์มือถือเพื่อยืนยันตัวตน',
      inputPlaceholder: 'กรอกเบอร์มือถือ',
      inputAttributes: { maxlength: 10 },
      confirmButtonText: 'ยืนยัน',
      allowOutsideClick: false,
      backdrop: 'rgba(0, 0, 0, 0.95)',
      allowEscapeKey: false,
      preConfirm: (phone) => {
        const cleaned = phone.replace(/[^0-9]/g, '');
        if ((!phoneFromSystem || phoneFromSystem === '-' || phoneFromSystem.trim() === '') && cleaned === '') return true;
        if (!cleaned || cleaned.length < 9 || cleaned.length > 10) {
          Swal.showValidationMessage('📵 กรุณากรอกเบอร์มือถือให้ถูกต้อง');
          return false;
        }
        if (cleaned !== phoneFromSystem) {
          Swal.showValidationMessage('❌ เบอร์ไม่ตรงกับที่ระบบมีไว้');
          return false;
        }
        return true;
      },
    });
    return isConfirmed;
  };

  const refresh = async () => {
    const callAPI = async (apiFunc) => {
      const res = await apiFunc({ hn: HN, en: EN });
      if (res?.message !== 'success') return null;
      setForm(res.data || {});
      refreshUploadPDF(res?.data?.id);
      return res.data;
    };

    const data = await callAPI(HealthRecordsbyHNEN) || await callAPI(HealthRecordsbyHNEN_Online);
    if (!data) return;

    if (Security) {
      setTimeout(async () => {
        if (await verifyPhone(data.phone_number)) setTimeout(() => window.print(), 1000);
      }, 100);
    } else {
      setTimeout(() => window.print(), 2000);
    }
  };


  useEffect(() => {
    if (HN) {
      refresh()
    }
  }, [HN])

  useEffect(() => {
    if (additionalPDFs.length > 0) {
      convertPDFtoImages()
    }
  }, [additionalPDFs])

  const headerReport = () => (
    <div className="flex h-[10%]">
      <div className="flex flex-col justify-center items-start w-2/5 p-2">
        <img src="/images/telecorp.png" alt="logo" />
      </div>
      <div className="flex flex-col justify-center items-end w-3/5 text-xs">
        <label className="font-light text-right">บริษัทเทเลคอร์ป จำกัด</label>
        <label className="font-light text-right">216/51-52 ถนนกาญจนาภิเษก แขวงทับช้าง</label>
        <label className="font-light text-right">เขตสะพานสูง กรุงเทพมหานคร 10250</label>
        <label className="font-light text-right">216/51-52, Kanchanaphisek Road, Saphan Sung, Bangkok 10250</label>
      </div>
    </div>
  )

  const footerReport = (page) => (
    <div className="flex h-[5%] px-4">
      <label className="font-light text-left w-1/2">
        {form?.hn
          ? `HN ${form?.hn} ${(form?.prefix || '')} ${(form?.first_name || '')} ${(form?.last_name || '')} ${moment(form?.exam_date).add(0, 'year').locale('th').format('DD/MM/YYYY')}`
          : ''}
      </label>
      <label className="font-light text-right w-1/2">{page}</label>
    </div>
  )

  const downloadPDF = async () => {
    if (pdfRefs.current.length === 0) return
    setLoading(true)

    const pdfDoc = await PDFDocument.create()
    const a4Width = 595
    const a4Height = 842

    try {
      for (const ref of pdfRefs.current) {
        const canvas = await html2canvas(ref, { scale: 2 })
        const imgData = canvas.toDataURL('image/png')
        const page = pdfDoc.addPage([a4Width, a4Height])
        const image = await pdfDoc.embedPng(imgData)
        page.drawImage(image, { x: 0, y: 0, width: a4Width, height: a4Height })
      }

      for (const file of additionalPDFs) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_UPLOAD_BASE_URL}/${file.server_filename}`)
          const pdfBytes = await res.arrayBuffer()
          const doc = await PDFDocument.load(pdfBytes)
          const pages = await pdfDoc.copyPages(doc, doc.getPageIndices())
          pages.forEach((p) => pdfDoc.addPage(p))
        } catch (err) {
          console.warn(`❌ ข้ามไฟล์ ${file.original_filename}:`, err.message)
        }
      }

      const pdfBytes = await pdfDoc.save()
      const base64 = Buffer.from(pdfBytes).toString('base64')

      const res = await fetch('/api/encrypt-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfData: base64, password: '1234' }),
      })

      const { pdf } = await res.json()
      const blob = new Blob([Buffer.from(pdf, 'base64')], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `Health_Report_${HN || 'All'}.pdf`
      link.click()
    } catch (err) {
      console.error('PDF Download Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white text-black md:w-full lg:w-full w-fit">
      <div className="flex justify-end print-none">
        <button onClick={() => window.print()} className="bg-[#264D70] text-white px-4 py-2 rounded-lg m-4">
          พิมพ์
        </button>
        <button
          onClick={downloadPDF}
          className="bg-[#D9534F] disabled:bg-gray-300 text-white px-4 py-2 rounded-lg m-4 flex items-center"
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0a12 12 0 00-12 12h4z"></path>
            </svg>
          )}
          ดาวน์โหลด PDF
        </button>
      </div>

      <div ref={(el) => (pdfRefs.current[0] = el)} className="a4 section flex flex-col">
        {headerReport()}
        <div className="flex flex-col h-[85%]">
          <div className="flex justify-start mb-4">
            <label className="font-semibold text-[#264D70] text-3xl">สมุดตรวจสุขภาพรายบุคคล</label>
          </div>
          <div className="w-full flex border border-[#A9A9A9]" />
          <div className="flex w-full bg-[#F8F8F8] p-4 rounded-lg border gap-4">
            <div className="w-[50%] flex justify-start">
              <span className="whitespace-nowrap font-semibold text-[#264D70] text-2xl">
                {form?.hn} {(form?.prefix || '') + ' ' + (form?.first_name || '') + ' ' + (form?.last_name || '')}
              </span>
            </div>
          </div>
          <CardReport data={form} />
        </div>
        {footerReport(1)}
      </div>

      <Resultsphysicaldoctor pdfRefs={pdfRefs} data={form} headerReport={headerReport} footerReport={footerReport} />
      <Laboratory pdfRefs={pdfRefs} data={form} headerReport={headerReport} footerReport={footerReport} />
      <SummaryRecommen pdfRefs={pdfRefs} data={form} headerReport={headerReport} footerReport={footerReport} />

      {additionalImages.map((img, idx) => (
        <div
          key={idx}
          className="a4 section flex flex-col"
          style={{ width: '210mm', height: '297mm', overflow: 'hidden', margin: '0 auto' }}
        >
          <img src={img.url} alt={`pdf-image-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  )
}
