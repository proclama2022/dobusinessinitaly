import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable, { File as FormidableFile } from 'formidable';
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

// Disabilita il parser JSON integrato perché gestiamo noi il multipart
export const config = {
  api: {
    bodyParser: false,
  },
};

interface JsonRes {
  success: boolean;
  message: string;
  data?: any;
}

const send = (res: VercelResponse, status: number, payload: JsonRes) => {
  res.status(status).json(payload);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return send(res, 405, { success: false, message: 'Method not allowed' });
  }

  // Autenticazione semplice (Bearer <password>)
  const adminPassword = process.env.ADMIN_PASSWORD || 'supersegreta';
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return send(res, 401, { success: false, message: 'Non autorizzato' });
  }

  // Parsing multipart/form-data
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Errore parsificando il form:', err);
      return send(res, 500, { success: false, message: err.message });
    }

    const fileObj = files.image as FormidableFile | FormidableFile[] | undefined;
    const imageFile = Array.isArray(fileObj) ? fileObj[0] : fileObj;

    if (!imageFile) {
      return send(res, 400, { success: false, message: 'No file uploaded' });
    }

    try {
      const fileName = imageFile.originalFilename || path.basename(imageFile.filepath);

      // Produzione: salva su Vercel Blob
      if (process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV === 'production') {
        const fileBuffer = fs.readFileSync(imageFile.filepath);
        const { url } = await put(`uploads/${fileName}`, fileBuffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
          addRandomSuffix: false,
          allowOverwrite: true,
        });

        return send(res, 200, {
          success: true,
          message: 'File uploaded successfully to cloud storage',
          data: {
            filename: fileName,
            path: url,
          },
        });
      }

      // Sviluppo: copia il file in /public/uploads (non persiste su Vercel)
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const destPath = path.join(uploadsDir, fileName);
      fs.copyFileSync(imageFile.filepath, destPath);

      return send(res, 200, {
        success: true,
        message: 'File uploaded successfully',
        data: {
          filename: fileName,
          path: `/uploads/${fileName}`,
        },
      });
    } catch (uploadErr: any) {
      console.error('Errore upload:', uploadErr);
      return send(res, 500, { success: false, message: uploadErr.message || 'Internal server error' });
    }
  });
} 