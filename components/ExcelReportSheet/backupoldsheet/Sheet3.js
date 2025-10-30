export const Sheet3 = async (workbook) => {
    const worksheet = workbook.addWorksheet('BloodGlucoseABnormal');

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
    Headontable.value = 'รายชื่อผู้ที่มีระดับน้ำตาล (Fasting Blood Sugar) ในเลือดสูงกว่าปกติ';
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
        { col1: "ลำดับ", col2: "NO", col3: "HN", col4: "ชื่อ - นามสกุล", col5: "รหัสพนักงาน", col6: "แผนก", col7: "FBS(Fasting Blood Sugar)", col8: "ผลการตรวจ" },
        { col7: "70-99 mg/dL" },
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
            col8: "*ระดับน้ำตาลในเลือด(FBS)สูงเล็กน้อย" || '-'
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