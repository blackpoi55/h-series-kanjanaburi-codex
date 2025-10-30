export const Sheet1 = async (companyName,workbook) => {
    const worksheet = workbook.addWorksheet('0_จำนวน');

    // กำหนดคอลัมน์และสไตล์สำหรับ Sheet1
    worksheet.columns = [
        { header: ' ', key: 'col1', width: 20 },
        { header: ' ', key: 'col2', width: 20 },
        { header: ' ', key: 'col3', width: 20 },
        { header: ' ', key: 'col4', width: 20 },
        { header: ' ', key: 'col5' },
    ];

    // รวมเซลล์ B1 ถึง D1
    const headerCell = worksheet.getCell('B1');
    worksheet.mergeCells('B1:D1');
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

    // รวมเซลล์ B2 ถึง C2
    const mergedCell = worksheet.getCell('B2');
    worksheet.mergeCells('B2:C2');
    mergedCell.value = companyName;
    mergedCell.style = {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'C8AC82' },
        },
        alignment: {
            horizontal: 'center',
            vertical: 'middle',
        },
    };

    // กำหนดความสูงของแถวที่ 2
    worksheet.getRow(2).height = 20;

    // เพิ่มข้อมูลลงใน Sheet1
    const rows = [
        { col2: "ทั้งหมด", col3: "156" },
        { col2: "หญิง", col3: "68" },
        { col2: "ชาย", col3: "88" },
    ];

    rows.forEach((rowData) => {
        const row = worksheet.addRow(rowData);
        row.getCell('col2').style.alignment = { horizontal: 'center', vertical: 'middle' };
        row.getCell('col3').style.alignment = { horizontal: 'center', vertical: 'middle' };
    });

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
        editAs: 'oneCell',
    });

    return worksheet;
}