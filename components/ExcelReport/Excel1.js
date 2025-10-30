'use client';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Sheet1 } from '../ExcelReportSheet/backupoldsheet/Sheet1';
import { Sheet2 } from '../ExcelReportSheet/backupoldsheet/Sheet2';
import { Sheet3 } from '../ExcelReportSheet/backupoldsheet/Sheet3';
import { Sheet4 } from '../ExcelReportSheet/backupoldsheet/Sheet4';
import { Sheet5 } from '../ExcelReportSheet/backupoldsheet/Sheet5';
import { summaryExcel } from '@/action/api';
import { getmockupexcel } from '@/action/mockupexcel';
import { Sheetall } from '../ExcelReportSheet/Sheetall';
import { Sheetcbc } from '../ExcelReportSheet/Sheetcbc';
import { Sheetpe } from '../ExcelReportSheet/Sheetpe';
import { Sheetocc } from '../ExcelReportSheet/Sheetocc';
import { Sheetx } from '../ExcelReportSheet/Sheetx';
import { Sheetua } from '../ExcelReportSheet/Sheetua';
import { Sheetstool } from '../ExcelReportSheet/Sheetstool';
import { Sheetchart } from '../ExcelReportSheet/Sheetchart'; 
import { Sheetgraphs } from '../ExcelReportSheet/Sheetgraphs'; 

// ฟังก์ชันหลักสำหรับการส่งออก Excel
function Excel1(props) {
    const { newData, refresh, statuschangesearch, companyName ,imageSrc ,setImageSrc} = props

    const exportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        await Sheet1(companyName,workbook); //0_จำนวน
        if (newData && newData.length > 0) {
            for (const element of newData) {
                if (element.name == "CBC") {
                    await Sheetcbc(companyName, element.name, element.data, workbook);
                }
                else if (element.name == "PE") {
                    await Sheetpe(companyName, element.name, element.data, workbook);
                }
                else if (element.name == "UA") {
                    await Sheetua(companyName, element.name, element.data, workbook);
                }
                else if (element.name == "Stool") {
                    await Sheetstool(companyName, element.name, element.data, workbook);
                }
                else if (element.name == "Occ") {
                    await Sheetocc(companyName, element.name, element.data, workbook);
                }
                else if (element.name == "Chart_All") {
                    await Sheetchart(companyName, element.name, element.data, workbook);
                }
                else if (element.name.substring(0, 2) == "X-") {
                    await Sheetx(companyName, element.name, element.data, workbook);
                }
                else 
                if (element.name == "Chart_Graph") {
                    await Sheetgraphs(companyName, element.name, element.data, workbook,imageSrc);
                }
                else {
                    await Sheetall(companyName, element.name, element.data, workbook);
                }
            }
        }

        // บันทึกไฟล์ Excel
        const excelBuffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([excelBuffer]), `Report ${moment().format('DD-MM-YYYY HH:mm')}.xlsx`);
    };

    return (
        <div>
            {(newData && newData.length > 0 && !statuschangesearch) ?
                <button className="border rounded-lg bg-green-800 text-white p-2 w-full mt-2 flex justify-center" onClick={exportExcel}>
                    <span className='mr-1'>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1111 14.2857C13.6556 14.2857 13.2778 14.6743 13.2778 15.1429V16.8571C13.2778 17.6457 12.6556 18.2857 11.8889 18.2857H3.55556C2.78889 18.2857 2.16667 17.6457 2.16667 16.8571V3.14286C2.16667 2.35429 2.78889 1.71429 3.55556 1.71429H7.16667V7.14286C7.16667 7.61143 7.54444 8 8 8H13.2778V9.42857C13.2778 9.89714 13.6556 10.2857 14.1111 10.2857C14.5667 10.2857 14.9444 9.89714 14.9444 9.42857V7.14286C14.9444 6.91429 14.8556 6.69714 14.7 6.53714L8.58889 0.251429C8.43276 0.0906372 8.22094 0.000200059 8 0L3.55556 0C1.86667 0 0.5 1.40571 0.5 3.14286L0.5 16.8571C0.5 18.5943 1.86667 20 3.55556 20H11.8889C13.5778 20 14.9444 18.5943 14.9444 16.8571V15.1429C14.9444 14.6743 14.5667 14.2857 14.1111 14.2857ZM8.83333 2.92571L12.1 6.28571H8.83333V2.92571ZM20.4333 12.6171C20.3889 12.72 20.3333 12.8114 20.2556 12.8914L16.9222 16.32C16.7556 16.4914 16.5444 16.5714 16.3333 16.5714C16.1222 16.5714 15.9111 16.4914 15.7444 16.32C15.5895 16.1587 15.5026 15.9411 15.5026 15.7143C15.5026 15.4875 15.5895 15.2699 15.7444 15.1086L17.6556 13.1429H8C7.54444 13.1429 7.16667 12.7543 7.16667 12.2857C7.16667 11.8171 7.54444 11.4286 8 11.4286H17.6556L15.7444 9.46286C15.4222 9.13143 15.4222 8.58286 15.7444 8.25143C16.0667 7.92 16.6 7.92 16.9222 8.25143L20.2556 11.68C20.3333 11.76 20.3889 11.8514 20.4333 11.9543C20.5222 12.16 20.5222 12.4 20.4333 12.6057V12.6171Z" fill="white" />
                        </svg>
                    </span>
                    Export Excel
                </button>
                :
                <button className="border rounded-lg bg-gray-500 text-white p-2 w-full mt-2 flex justify-center"  >
                    <span className='mr-1'>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1111 14.2857C13.6556 14.2857 13.2778 14.6743 13.2778 15.1429V16.8571C13.2778 17.6457 12.6556 18.2857 11.8889 18.2857H3.55556C2.78889 18.2857 2.16667 17.6457 2.16667 16.8571V3.14286C2.16667 2.35429 2.78889 1.71429 3.55556 1.71429H7.16667V7.14286C7.16667 7.61143 7.54444 8 8 8H13.2778V9.42857C13.2778 9.89714 13.6556 10.2857 14.1111 10.2857C14.5667 10.2857 14.9444 9.89714 14.9444 9.42857V7.14286C14.9444 6.91429 14.8556 6.69714 14.7 6.53714L8.58889 0.251429C8.43276 0.0906372 8.22094 0.000200059 8 0L3.55556 0C1.86667 0 0.5 1.40571 0.5 3.14286L0.5 16.8571C0.5 18.5943 1.86667 20 3.55556 20H11.8889C13.5778 20 14.9444 18.5943 14.9444 16.8571V15.1429C14.9444 14.6743 14.5667 14.2857 14.1111 14.2857ZM8.83333 2.92571L12.1 6.28571H8.83333V2.92571ZM20.4333 12.6171C20.3889 12.72 20.3333 12.8114 20.2556 12.8914L16.9222 16.32C16.7556 16.4914 16.5444 16.5714 16.3333 16.5714C16.1222 16.5714 15.9111 16.4914 15.7444 16.32C15.5895 16.1587 15.5026 15.9411 15.5026 15.7143C15.5026 15.4875 15.5895 15.2699 15.7444 15.1086L17.6556 13.1429H8C7.54444 13.1429 7.16667 12.7543 7.16667 12.2857C7.16667 11.8171 7.54444 11.4286 8 11.4286H17.6556L15.7444 9.46286C15.4222 9.13143 15.4222 8.58286 15.7444 8.25143C16.0667 7.92 16.6 7.92 16.9222 8.25143L20.2556 11.68C20.3333 11.76 20.3889 11.8514 20.4333 11.9543C20.5222 12.16 20.5222 12.4 20.4333 12.6057V12.6171Z" fill="white" />
                        </svg>
                    </span>
                    Export Excel
                </button>
            }
        </div>
    );
}

export default Excel1;
