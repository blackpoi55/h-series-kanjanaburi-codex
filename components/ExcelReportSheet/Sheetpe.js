export const Sheetpe = async (companyName,name, data, workbook) => {
        // console.log(name,data)
        const worksheet = workbook.addWorksheet(name);
        worksheet.columns = [
            { header: ' ', key: 'col1', width: 20 },
            { header: ' ', key: 'col2' },
            { header: ' ', key: 'col3', width: 20 },
            { header: ' ', key: 'col4', width: 40 },
            { header: ' ', key: 'col5' },
            { header: ' ', key: 'col6' },
            { header: ' ', key: 'col7' },
            { header: ' ', key: 'col8', width: 20 },
            { header: ' ', key: 'col9' },
            { header: ' ', key: 'col10' },
            { header: ' ', key: 'col11' },
            { header: ' ', key: 'col12' },
            { header: ' ', key: 'col13' },
            { header: ' ', key: 'col14' },
            { header: ' ', key: 'col15' },
            { header: ' ', key: 'col16' },
            { header: ' ', key: 'col17' },
            { header: ' ', key: 'col18' },
            { header: ' ', key: 'col19' },
            { header: ' ', key: 'col20' },
        ];
        // รวมเซลล์ B1 ถึง H1
        const headerCell = worksheet.getCell('B1');
        worksheet.mergeCells('B1:H1');
        headerCell.value = companyName;
        headerCell.style = {
            font: {
                bold: true,
                size: 14,
            },
            alignment: {
                horizontal: 'center',
                vertical: 'middle',
            },
        };
        const Headontable = worksheet.getCell('A2');
        worksheet.mergeCells('A2:H2');
        Headontable.value = name;
        Headontable.style = {
            font: {
                bold: true,
                size: 14,
            },
            alignment: {
                horizontal: 'center',
                vertical: 'middle',
            },
        };
    
        // เพิ่มข้อมูลลงใน Sheet1
        const rows = [
            {
                col1: "ลำดับ",
                col2: "NO",
                col3: "HN",
                col4: "ชื่อ - นามสกุล",
                col5: "รหัสพนักงาน",
                col6: "แผนก",
                col7: "Height",
                col8: "Weight",
                col9: "BMI",
                col10: "BPSys",
                col11: "BPDias",
                col12: "PulseRate",
                col13: "Waist",
                col14: "PEResult",
            },
    
    
        ];
    
        rows.forEach((rowData) => {
            const row = worksheet.addRow(rowData);
            row.getCell('col1').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true },
            };
            row.getCell('col2').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col3').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col4').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col5').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col6').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col7').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col8').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col9').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col10').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col11').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col12').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col13').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
            row.getCell('col14').style = {
                alignment: { horizontal: 'center', vertical: 'middle' },
                font: { bold: true }, // เพิ่มตัวหนาที่นี่
            };
        });
    
        // เพิ่มข้อมูลลงใน Sheet2
        for (let index = 0; index < data.length; index++) {
            let getdata = data[index]
            worksheet.addRow({
                col1: index + 1 || '-',
                col2: getdata.NO ? getdata.NO : '-',
                col3: getdata.HN || '-',
                col4: getdata.Name || "-",
                col5: getdata.EmpID || "-",
                col6: getdata.Dept || "-",
                col7: getdata.Height || '-',
                col8: getdata.Weight || '-',
                col9: getdata?.BMI || '-',
                col10: getdata?.BPSys || '-',
                col11: getdata.BPDias || '-',
                col12: getdata.PulseRate || '-',
                col13: getdata.Waist || '-',
                col14: getdata.PEResult || '-',
            });
        }
    
        // แทรกรูปภาพลงใน Sheet1
        const imageUrl = '/images/logo.png';
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
    
        const imageId = workbook.addImage({
            buffer,
            extension: 'png',
        });
    
        // กำหนดขนาดเซลล์ A1 เพื่อให้รองรับรูปภาพ
        worksheet.getRow(1).height = 30;
    
        // กำหนดตำแหน่งการแทรกรูปภาพที่เซลล์ A1
        worksheet.addImage(imageId, {
            tl: { col: 0, row: 0 },
            br: { col: 1, row: 1 },
            editAs: 'absolute',
        });
        return worksheet;
    }