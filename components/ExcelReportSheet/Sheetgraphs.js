export const Sheetgraphs = async (companyName, name, data, workbook, imageSrc) => {
    // สร้างแผ่นงาน
    const worksheet = workbook.addWorksheet(name);
    worksheet.columns = [
        { header: ' ', key: 'col1', width: 20 },
        { header: ' ', key: 'col2', width: 120 }, 
        { header: ' ', key: 'col1', width: 20 },
    ];

    // รวมเซลล์ B1 ถึง C1
    const headerCell = worksheet.getCell('B1');
    worksheet.mergeCells('B1:C1');
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
    worksheet.mergeCells('A2:C2');
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

    // การเพิ่มรูปภาพ (Logo)
    const logoImageUrl = '/images/logo.png';  // เส้นทางรูปภาพสำหรับ logo
    let logoImageBuffer;

    try {
        // ลองโหลดภาพ logo จาก path หรือ URL ที่กำหนด
        const logoResponse = await fetch(logoImageUrl);
        if (!logoResponse.ok) {
            console.error('Failed to fetch logo image:', logoResponse.statusText);
            return;  // หยุดการทำงานถ้าภาพไม่สามารถโหลดได้
        }

        const logoArrayBuffer = await logoResponse.arrayBuffer();
        logoImageBuffer = Buffer.from(logoArrayBuffer);

        const logoImageId = workbook.addImage({
            buffer: logoImageBuffer,
            extension: 'png',
        });

        // กำหนดตำแหน่งการแทรกรูปภาพที่เซลล์ A1
        worksheet.getRow(1).height = 30;
        worksheet.addImage(logoImageId, {
            tl: { col: 0, row: 0 },
            br: { col: 1, row: 1 },
            editAs: 'absolute',
        });

    } catch (error) {
        console.error('Error loading logo image:', error);
    }

    // การเพิ่มรูปภาพจาก imageSrc (จะเป็น Base64 หรือ URL)
    let imageBuffer;
    try {
        if (imageSrc.startsWith('data:image')) {
            // ถ้า imageSrc เป็น Base64
            const base64Data = imageSrc.split(',')[1];
            imageBuffer = Buffer.from(base64Data, 'base64');
        } else {
            // ถ้าเป็น URL (เช่น จากการโหลดภาพ)
            const imageResponse = await fetch(imageSrc);
            if (!imageResponse.ok) {
                console.error('Failed to fetch imageSrc:', imageResponse.statusText);
                return;  // หยุดการทำงานถ้าภาพไม่สามารถโหลดได้
            }

            const imageArrayBuffer = await imageResponse.arrayBuffer();
            imageBuffer = Buffer.from(imageArrayBuffer);
        }

        const imageId = workbook.addImage({
            buffer: imageBuffer,
            extension: 'png',
        });

        // กำหนดตำแหน่งการแทรกรูปภาพที่เซลล์ B3
        worksheet.getRow(3).height = 300;  // กำหนดความสูงให้เหมาะสม
        worksheet.addImage(imageId, {
            tl: { col: 1, row: 2 },
            br: { col: 2, row: 3 },
            editAs: 'absolute',
        });

    } catch (error) {
        console.error('Error loading imageSrc:', error);
    }

    return worksheet;
};
