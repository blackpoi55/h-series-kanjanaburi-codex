'use client'

import { gettrhealthfiles, HealthRecordsCompanyall_Online, postsummaryListbyHN } from '@/action/api'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
if (typeof window !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

import { Buffer } from "buffer"; // คุณใช้ Buffer ข้างล่างอยู่

import Pdfa4lan from '@/components/healthdashboard/report/Pdfa4lan'
import dayjs from 'dayjs'
import Pdfpage1 from '@/components/healthdashboard/report/Pdfpage1'
import PieReportPage from '@/components/healthdashboard/report/PieReportPage'
import SummaryTable from '@/components/healthdashboard/report/SummaryTable'
import HealthCheckSummary from '@/components/healthdashboard/report/HealthCheckSummary'
import EmployeeHealthSummaryPage2 from '@/components/healthdashboard/report/EmployeeHealthSummaryPage2'

const { PDFDocument } = require('pdf-lib');

export default function page() {
    const searchParams = useSearchParams()
    const companycode = searchParams.get('company')
    const companyname = searchParams.get('companyname')
    const HN = searchParams.get('hn')
    const EN = searchParams.get('en')
    const Autoprint = searchParams.get('autoprint')
    const [form, setForm] = useState([])
    const pdfRefs = useRef([])
    const [loading, setLoading] = useState(false)
    const [additionalImages, setAdditionalImages] = useState([])
    const [additionalPDFs, setadditionalPDFs] = useState([])

    const refreshUploadPDF = async (id) => {
        let data = await gettrhealthfiles(id)
        console.log(data)
        if (!data.error) {
            let files = data.data.map((file) => {
                return {
                    original_filename: file.original_filename,
                    server_filename: file.server_filename,
                    type: file.type,
                    status: file.status
                }
            })
            setadditionalPDFs(files)
        }
        else {
            setadditionalPDFs([]);
        }
    }
    const convertPDFtoImages = async () => {
        const images = []
        for (const file of additionalPDFs) {
            try {
                let fullUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL + "/" + file.server_filename
                const loadingTask = pdfjsLib.getDocument(fullUrl)
                const pdf = await loadingTask.promise
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i)
                    const viewport = page.getViewport({ scale: 2 })
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

    useEffect(() => {
        if ((companycode) && Autoprint !== "preview") {
            if (additionalPDFs.length > 0) convertPDFtoImages();
        }
    }, [companycode, additionalPDFs]); // เพิ่ม additionalPDFs


    useEffect(() => {
        if (companycode) {
            refresh()
            if (Autoprint !== "preview") {
                setTimeout(() => {
                    // window.print()
                }, 3000)
            }
        }
    }, [companycode])

    const refresh = async () => {
        const res = await postsummaryListbyHN({ company_code: companycode });
        if (res?.message === 'success') {
            // refreshUploadPDF(res?.data?.id)
            console.table(res?.data)
            setForm(res?.data || [])
        }
    }

    const downloadPDF = async () => {
        if (pdfRefs.current.length === 0) return;
        setLoading(true);

        const pdfDoc = await PDFDocument.create();
        const a4Width = 842;
        const a4Height = 595;

        try {
            for (let i = 0; i < pdfRefs.current.length; i++) {
                const canvas = await html2canvas(pdfRefs.current[i], { scale: 2 });
                const imgData = canvas.toDataURL('image/png');
                const page = pdfDoc.addPage([a4Width, a4Height]);
                const image = await pdfDoc.embedPng(imgData);
                page.drawImage(image, { x: 0, y: 0, width: a4Width, height: a4Height });
            }

            for (const file of additionalPDFs) {
                try {
                    let fullUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL + "/" + file.server_filename
                    const res = await fetch(fullUrl);
                    if (!res.ok) throw new Error(`โหลดไม่ได้: ${fullUrl}`);
                    const existingPdfBytes = await res.arrayBuffer();
                    const pdf = await PDFDocument.load(existingPdfBytes);
                    const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach((page) => pdfDoc.addPage(page));
                } catch (err) {
                    console.warn(`❌ ข้ามไฟล์ ${file.original_filename}:`, err.message);
                }
            }

            const pdfBytes = await pdfDoc.save();
            const base64Pdf = Buffer.from(pdfBytes).toString('base64');

            const res = await fetch('/api/encrypt-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pdfData: base64Pdf, password: '1234' }),
            });

            const { pdf } = await res.json();
            const blob = new Blob([Buffer.from(pdf, 'base64')], { type: 'application/pdf' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Health_Report_${HN || 'All'}.pdf`;
            link.click();
        } catch (error) {
            console.error("PDF Download Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-black md:w-full lg:w-full w-fit">
            <div className="flex justify-end print-none">
                <button onClick={() => window.print()} className="bg-[#264D70] text-white px-4 py-2 rounded-lg m-4">พิมพ์</button>
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
            {/* Page 1 */}
            <Pdfpage1 pdfRefs={pdfRefs} companyname={companyname}></Pdfpage1>
            {/* Page 2 - all */}
            {form && form.length > 0 && form.map((p, index) => (
                <Pdfa4lan data={p} pdfRefs={pdfRefs} index={index} key={index} total={form.length} companyname={companyname} />
            ))}
            {/* Last Page 1 */}
            <PieReportPage pdfRefs={pdfRefs} companyname={companyname} index={form.length}></PieReportPage>
            {/* Last Page 2 */}
            <SummaryTable pdfRefs={pdfRefs} companyname={companyname} index={form.length + 1}></SummaryTable>
            {/* Last Page 3 */}
            <HealthCheckSummary pdfRefs={pdfRefs} companyname={companyname} index={form.length + 2}></HealthCheckSummary>
            {/* Last Page 4 */}
            <EmployeeHealthSummaryPage2 pdfRefs={pdfRefs} companyname={companyname} index={form.length + 3}></EmployeeHealthSummaryPage2>
            <div
                ref={(el) => (pdfRefs.current[form.length + 5] = el)}
                className="a4landscape sectionlandscape">
                <div className="w-full h-[210mm] bg-white px-10 py-12 flex flex-col justify-between">

                    {/* แผนที่ Google Maps */}
                    <div className="w-full h-full">
                        {/* <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4609.180966656936!2d100.52845505841532!3d13.727907883218629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2c924f7fd9%3A0xcb18050a5f1db10d!2z4LmC4Lij4LiH4Lie4Lii4Liy4Lia4Liy4Lil4LiB4Lij4Li44LiH4LmA4LiX4Lie4LiE4Lij4Li04Liq4LmA4LiV4Li14Lii4LiZ!5e0!3m2!1sth!2sth!4v1744170288210!5m2!1sth!2sth"
                            className="w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe> */}
                        <img src="/images/bchmap.png" className="w-full h-full border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></img>
                    </div>

                </div>
            </div>


            {/* {additionalImages.map((img, idx) => ( 
                <div key={idx} className="a4landscape sectionlandscape flex flex-col">
                    <img src={img.url} alt={`pdf-image-${idx}`} style={{ width: '100%' }} />
                </div>
            ))} */}
            <style jsx>{`
  @media print {
    @page {
      size: A4 landscape;
      margin: 20mm;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html, body {
      width: 100%;
      height: 100%;
    }
  }
`}</style>

        </div>
    )
}
