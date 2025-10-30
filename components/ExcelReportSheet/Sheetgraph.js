export const Sheetgraph = async (companyName,name, data, workbook) => {
    // สร้าง worksheet
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

    // แทรกรูปภาพแรก (samitivejA5.jpg)
    const imageUrl1 = '/images/logo.png';
    const response1 = await fetch(imageUrl1);
    const arrayBuffer1 = await response1.arrayBuffer();
    const buffer1 = Buffer.from(arrayBuffer1);

    const imageId1 = workbook.addImage({
        buffer: buffer1,
        extension: 'png',
    });

    worksheet.getRow(1).height = 30;
    worksheet.addImage(imageId1, {
        tl: { col: 0, row: 0 },
        br: { col: 1, row: 1 },
        editAs: 'absolute',
    });

    // แทรกรูปกราฟเพิ่ม (จาก Chart.js)
    // สร้างกราฟและบันทึกเป็นไฟล์ PNG (สมมุติว่าคุณใช้ฟังก์ชัน createBarChart)
    const imageUrl2 = './chart-image.png'; // ไฟล์รูปภาพที่สร้างจาก Chart.js
    const response2 = await fetch(imageUrl2);
    const arrayBuffer2 = await response2.arrayBuffer();
    const buffer2 = Buffer.from(arrayBuffer2);

    const imageId2 = workbook.addImage({
        buffer: buffer2,
        extension: 'png',
    });

    // กำหนดตำแหน่งที่จะแทรกรูปกราฟเพิ่ม
    worksheet.addImage(imageId2, {
        tl: { col: 3, row: 3 }, // ตำแหน่งเริ่มต้นของรูปกราฟ
        br: { col: 10, row: 20 }, // ขนาดรูปภาพกราฟ
        editAs: 'absolute',
    });

    return worksheet;
};
