'use client'

import { addNurseApprove, gettrhealthfiles, HealthRecordsbyHNEN, HealthRecordsbyHNEN_Online, HealthRecordsCompanyall, HealthRecordsCompanyall_Online } from '@/action/api'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import Pdfa4 from '@/components/individualreport/Pdfa4'
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
if (typeof window !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

import { Buffer } from "buffer"; // คุณใช้ Buffer ข้างล่างอยู่

const { PDFDocument } = require('pdf-lib');

export default function page() {
    const searchParams = useSearchParams()
    const companycode = searchParams.get('companycode')
    const HN = searchParams.get('hn')
    const EN = searchParams.get('en')
    const Autoprint = searchParams.get('autoprint')
    const [form, setForm] = useState([])
    const [mode, setmode] = useState("hnen")
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
        if ((companycode || (HN && EN)) && Autoprint !== "preview") {
            if (additionalPDFs.length > 0) convertPDFtoImages();
        }
    }, [companycode, HN, EN, additionalPDFs]); // เพิ่ม additionalPDFs


    useEffect(() => {
        if (companycode || (HN && EN)) {
            refresh()
            if (Autoprint !== "preview") {
                setTimeout(() => {
                    window.print()
                }, 3000)
            }
        }
    }, [companycode, HN, EN])

    const refresh = async () => {
        const callApiWithFallback = async (mainApi, fallbackApi, param, isCompany) => {
            const res = await mainApi(param);
            if (res?.message === 'success') {
                refreshUploadPDF(res?.data?.id);
                setForm(isCompany ? res?.data || [] : [res?.data] || []);
                return true;
            }

            const resFallback = await fallbackApi(param);
            if (resFallback?.message === 'success') {
                refreshUploadPDF(resFallback?.data?.id);
                setForm(isCompany ? resFallback?.data || [] : [resFallback?.data] || []);
                return true;
            }
            return false;
        };

        if (companycode) {
            setmode("company");
            await callApiWithFallback(
                HealthRecordsCompanyall,
                HealthRecordsCompanyall_Online,
                { company_code: companycode },
                true
            );
        } else if (HN && EN) {
            setmode("hnen");
            await callApiWithFallback(
                HealthRecordsbyHNEN,
                HealthRecordsbyHNEN_Online,
                { hn: HN, en: EN },
                false
            );
        }
    };


    const downloadPDF = async () => {
        if (pdfRefs.current.length === 0) return;
        setLoading(true);

        const pdfDoc = await PDFDocument.create();
        const a4Width = 595;
        const a4Height = 842;

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

            {form && form.length > 0 && form.map((p, index) => (
                <Pdfa4 p={p} pdfRefs={pdfRefs} index={index} key={index} />
            ))}

            {additionalImages.map((img, idx) => (
                // <div key={idx} className="print:block hidden mt-4">
                <div key={idx} className="a4 section flex flex-col">
                    <img src={img.url} alt={`pdf-image-${idx}`} style={{ width: '100%' }} />
                </div>
            ))}
        </div>
    )
}
