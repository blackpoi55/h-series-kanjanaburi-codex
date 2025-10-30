export const Sheet4 = async (workbook) => {
    const worksheet = workbook.addWorksheet('Bloodnormal');

    // กำหนดคอลัมน์และสไตล์สำหรับ Sheet2
    // กำหนดคอลัมน์และสไตล์สำหรับ Sheet1
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
    ];
    // รวมเซลล์ B1 ถึง H1
    const headerCell = worksheet.getCell('B1');
    worksheet.mergeCells('B1:H1');
    headerCell.value = 'บจก. ฟอสเตอร์ วีลเลอร์ (ประเทศไทย)-C';
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
    Headontable.value = 'รายงานผลการตรวจภาพรวมของ  Blood Chemistry';
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
        { col1: "ลำดับ", col2: "NO", col3: "HN", col4: "ชื่อ - นามสกุล", col5: "รหัสพนักงาน", col6: "แผนก", col7: "FBS(Fasting Blood Sugar)", col8: "Cholesterol", col9: "Triglyceride", col10: "HDL Cholesterol", col11: "LDL Direct", col12: "Uric acid", col13: "BUN", col14: "Creatinine", col15: "eGFR", col16: "Calcium", col17: "LDH", col18: "Amylase" },
        {  col7: "70-99 mg/dL", col8: "< 200 mg/dL", col9: "< 150 mg/dL", col10: "F (01-99 Y) : > 50 mg/dL , M (01-99 Y) :  > 40 mg/dL",col11: "< 130 mg/dL",col12: "F (01-99 Y) : 2.6 - 6.0 mg/dL , M (01-99 Y) : 3.5 - 7.2 mg/dL",col13: "F (14-19 Y) : 8.4 - 21.0 mg/dL , M (14-19 Y) : 8.4 - 21.0 mg/dL , F (20-50 Y) : 7.0 - 18.7 mg/dL , M (20-50 Y) : 8.9 - 20.6 mg/dL , F (51-99 Y) : 9.8 - 20.1 mg/dL , M (51-99 Y) : 8.4 - 25.7 mg/dL" ,col14: "F (11-14 Y) : 0.50 - 0.80 mg/dL , M (11-14 Y) : 0.50 - 0.80 mg/dL , F (15-20 Y) : 0.60 - 0.90 mg/dL , M (15-20 Y) : 0.60 - 1.00 mg/dL , F (21-99 Y) : 0.55 - 1.02 mg/dL , M (21-99 Y) : 0.73 - 1.18 mg/dL",col15: ">= 90 ml/min/1.73m²",col16: "F (12-99 Y) : 8.4 - 10.2 mg/dL , M (12-60 Y) : 8.4 - 10.2 mg/dL , M (60-99 Y) :  8.8 - 10.0 mg/dL mg/dL",col17: "125-220 U/L",col18: "8 - 51 U/L"},
        {},
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
            font: { bold: true },
        };
        row.getCell('col11').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true },
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
        row.getCell('col15').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }, // เพิ่มตัวหนาที่นี่
        };
        row.getCell('col16').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }, // เพิ่มตัวหนาที่นี่
        };
        row.getCell('col17').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }, // เพิ่มตัวหนาที่นี่
        };
        row.getCell('col18').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }, // เพิ่มตัวหนาที่นี่
        };
    });

    // เพิ่มข้อมูลลงใน Sheet2
    for (let index = 0; index < 5; index++) {
        worksheet.addRow({
            col1: index + 1 || '-',
            col2: " - " || '-',
            col3: "18-07-008641" || '-',
            col4: "MR. DENPONG NUNTACHOMCHUEN" || '-',
            col5: " " || '-',
            col6: " " || '-',
            col7: "100" || '-',
            col8: "100" || '-',
            col9: "100" || '-',
            col10: "100" || '-',
            col11: "100" || '-',
            col12: "100" || '-',
            col13: "100" || '-',
            col14: "100" || '-',
            col15: "100" || '-',
            col16: "100" || '-',
            col17: "100" || '-',
            col18: "100" || '-',
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