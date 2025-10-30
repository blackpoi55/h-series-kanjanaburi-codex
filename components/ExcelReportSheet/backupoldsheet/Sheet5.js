export const Sheet5 = async (workbook) => {
    const worksheet = workbook.addWorksheet('BMI_BP_PE_normal');

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
        { header: ' ', key: 'col19' },
        { header: ' ', key: 'col20' },
        { header: ' ', key: 'col21' },
        { header: ' ', key: 'col22' },
        { header: ' ', key: 'col23' },
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
    Headontable.value = 'รายงานผลการตรวจร่างกาย (Physical Examination)';
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
    worksheet.mergeCells('J3:K3');
    // เพิ่มข้อมูลลงใน Sheet1
    const rows = [
        { col1: "ลำดับ", col2: "NO", col3: "HN", col4: "ชื่อ - นามสกุล", col5: "รหัสพนักงาน", col6: "แผนก", col7: "ส่วนสูง", col8: "น้ำหนัก", col9: "BMI", col10: "BP", col12: "PulseRate", col13: "waist", col14: "ผลการตรวจ", col15: "Eye Ear Throat Nose", col16: "Nervous System", col17: "Lymph node", col18: "General Appearance", col19: "Lungs", col20: "Heart", col21: "Abdomen", col22: "Limbs", col23: "Skin" },
        { col10: "Systolic",col11: "Diastolic" },
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
        row.getCell('col19').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }, // เพิ่มตัวหนาที่นี่
        };
        row.getCell('col20').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }, // เพิ่มตัวหนาที่นี่
        };
        row.getCell('col21').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }, // เพิ่มตัวหนาที่นี่
        };
        row.getCell('col22').style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
            font: { bold: true }, // เพิ่มตัวหนาที่นี่
        };
        row.getCell('col23').style = {
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
            col19: "100" || '-',
            col20: "100" || '-',
            col21: "100" || '-',
            col22: "100" || '-',
            col23: "100" || '-',
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