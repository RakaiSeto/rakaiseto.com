import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { type APIRoute } from 'astro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const GET: APIRoute = async () => {
  const filePath = path.join(__dirname, '../../public/CV_RAKAI.pdf');
  
  try {
    const file = fs.readFileSync(filePath);
    return new Response(file, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CV_RAKAI.pdf"'
      }
    });
  } catch (error) {
    return new Response('File not found', { status: 404 });
  }
};