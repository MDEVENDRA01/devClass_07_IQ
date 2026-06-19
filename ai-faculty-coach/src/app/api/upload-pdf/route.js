import { NextResponse } from 'next/server';
import pdf from 'pdf-parse/lib/pdf-parse.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Uploaded file is not a PDF' }, { status: 400 });
    }

    // 10MB size limit
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size exceeds the 10MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse the PDF using standard pdf-parse v1.1.1 (bypassing index.js debug code)
    const data = await pdf(buffer);

    return NextResponse.json({
      text: data.text || '',
      numPages: data.numpages || 1,
      info: {
        title: data.info?.Title || file.name.replace(/\.[^/.]+$/, ""),
        author: data.info?.Author || 'Unknown',
        creator: data.info?.Creator || 'Unknown',
        producer: data.info?.Producer || 'Unknown',
      },
      fileSize: file.size,
      fileName: file.name
    });
  } catch (error) {
    console.error('PDF Parse Error:', error);
    return NextResponse.json({ 
      error: 'Failed to process PDF file. Ensure the PDF is not encrypted or corrupted.' 
    }, { status: 500 });
  }
}
