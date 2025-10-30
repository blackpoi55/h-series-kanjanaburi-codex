'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography } from '@mui/material';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import { PDFDocument } from 'pdf-lib';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { gettrhealthfiles, posttrhealthfiles, uploadPdfFile } from '@/action/api';

const { Dragger } = Upload;

export default function ViewUploadModal({ open, onClose, healthrecordsidRef }) {
    const [fileList, setFileList] = useState([]);
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
    const hasLoadedInitialFiles = useRef(false);
    const inputRef = useRef();

    useEffect(() => {
        if (open) {
            refresh()
        }
    }, [open]);

    const refresh = async () => {
        let data = await gettrhealthfiles(healthrecordsidRef.current)
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
            setFileList(files)
            hasLoadedInitialFiles.current = true;
        }
        else {
            setFileList([]);
            hasLoadedInitialFiles.current = false;
        }
    }

    const handleNativeUpload = async (e) => {
        const files = Array.from(e.target.files); // ได้เป็น File[]

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);

            try {
                const res = await uploadPdfFile(formData);

                if (res && res.file && res.file.path && res.file.originalName) {
                    const fileData = {
                        "health_records_id": healthrecordsidRef.current,
                        "original_filename": res.file.originalName,
                        "server_filename": res.file.fileName,
                        "type": "pdf",
                        "status": "A"
                    }
                    setFileList(prev => [...prev, fileData]);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'อัปโหลดไม่สำเร็จ',
                        text: `ไฟล์ "${file.name}" ไม่สามารถอัปโหลดได้`,
                        didOpen: () => {
                            const swalContainer = document.querySelector('.swal2-container');
                            if (swalContainer) swalContainer.style.zIndex = '20000';
                        }
                    });
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: `ไฟล์ "${file.name}" ไม่สำเร็จ: ${err.message}`,
                    didOpen: () => {
                        const swalContainer = document.querySelector('.swal2-container');
                        if (swalContainer) swalContainer.style.zIndex = '20000';
                    }
                });
            }
        }


        // 💡 เคลียร์ input เพื่อให้เลือกไฟล์เดิมได้อีกครั้ง
        e.target.value = '';
    };



    const removeFile = (index) => {
        const fileName = fileList[index].original_filename;
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: `คุณต้องการลบไฟล์ "${fileName}" ใช่หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก',
            didOpen: () => {
                const swalContainer = document.querySelector('.swal2-container');
                if (swalContainer) swalContainer.style.zIndex = '20000';
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updated = [...fileList];
                updated.splice(index, 1);
                setFileList(updated);
            }
        });
    };

    const moveFile = (fromIndex, toIndex) => {
        setFileList(prev => arrayMoveImmutable([...prev], fromIndex, toIndex));
    };

    const mergePDFs = async () => {
        const mergedPdf = await PDFDocument.create();

        for (const file of fileList) {
            let existingPdfBytes;
            console.log(process.env.NEXT_PUBLIC_UPLOAD_BASE_URL + "/" + file.server_filename)
            try {
                let fullUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL + "/" + file.server_filename


                console.log("fullUrl", fullUrl);

                const res = await fetch(fullUrl);
                if (!res.ok) throw new Error(`Failed to load ${fullUrl}`);
                existingPdfBytes = await res.arrayBuffer();

                const pdf = await PDFDocument.load(existingPdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach(page => mergedPdf.addPage(page));
            } catch (err) {
                console.warn(`❌ ข้ามไฟล์ ${file.originalName} เพราะ error:`, err.message);
            }
        }
        console.log("mergedPdf", mergedPdf)
        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setMergedPdfUrl(url);
    };


    useEffect(() => {
        console.log("fileList", fileList)
        if (fileList.length > 0) {
            mergePDFs();
        } else {
            setMergedPdfUrl(null);
        }
    }, [fileList]);
    const saveClick = async () => {
        let val = fileList.map((file,index) => {
            return {...file,sort:index+1,health_records_id: healthrecordsidRef.current}
        })
        let data = await posttrhealthfiles(val);

        if (!data?.error) {
            Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                text: 'ข้อมูลไฟล์ถูกบันทึกเรียบร้อยแล้ว',
                timer: 1500,
                showConfirmButton: false,
                didOpen: () => {
                    const swalContainer = document.querySelector('.swal2-container');
                    if (swalContainer) swalContainer.style.zIndex = '20000';
                }
            });

            // รอให้ Swal แสดงซักแป๊บก่อนปิด Dialog
            setTimeout(() => {
                onClose();
            }, 1600);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถบันทึกได้',
                didOpen: () => {
                    const swalContainer = document.querySelector('.swal2-container');
                    if (swalContainer) swalContainer.style.zIndex = '20000';
                }
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle onClick={() => console.log(fileList)}>ไฟล์ PDF</DialogTitle>
            <DialogContent>
               

                {mergedPdfUrl && (
                    <div className="mt-4 border p-2 max-h-[70vh] overflow-auto">
                        <iframe
                            src={mergedPdfUrl}
                            title="รวม PDF"
                            width="100%"
                            height="600px"
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                )}
            </DialogContent>
            <div className="flex justify-end items-center gap-3 p-2 bg-gray-100 rounded-b-lg">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                >
                    ❌ ปิด
                </button> 
            </div>

        </Dialog>
    );
}
