import { writeFileSync, unlinkSync, readFileSync } from 'fs';
import { exec } from 'child_process';
import path from 'path';

export async function POST(req) {
    try {
        const { pdfData, password } = await req.json();
        if (!pdfData || !password) {
            return new Response(JSON.stringify({ error: 'Invalid input data' }), { status: 400 });
        }

        const tempPath = path.join(process.cwd(), 'temp.pdf');
        const outputPath = path.join(process.cwd(), 'protected.pdf');

        console.log('📌 Saving temp PDF...');
        writeFileSync(tempPath, Buffer.from(pdfData, 'base64'));

        console.log('🔒 Encrypting PDF...');
        await new Promise((resolve, reject) => {
            exec(`qpdf --encrypt ${password} ${password} 256 -- ${tempPath} ${outputPath}`, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });

        console.log('✅ Encryption Done! Reading encrypted file...');
        const encryptedPdf = readFileSync(outputPath).toString('base64');

        unlinkSync(tempPath);
        unlinkSync(outputPath);

        console.log('🚀 Sending encrypted PDF...');
        return new Response(JSON.stringify({ pdf: encryptedPdf }), { status: 200 });
    } catch (error) {
        console.error('❌ Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

