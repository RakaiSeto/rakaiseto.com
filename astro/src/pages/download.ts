import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { type APIRoute } from 'astro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const GET: APIRoute = async () => {
  // In production, the public directory is served directly
  // Use the correct path based on the environment
  const filePath = path.join(process.env.NODE_ENV === 'production' 
    ? process.cwd() 
    : __dirname, 
    'public/CV_RAKAI.pdf'
  );
  
  try {
    if (!fs.existsSync(filePath)) {
      return new Response('File not found', { status: 404 });
    }
    
    const file = fs.readFileSync(filePath);
    return new Response(file, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CV_RAKAI.pdf"; filename*=UTF-8''CV_RAKAI.pdf`
      }
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};