import db from '../../lib/db';
import formidable from 'formidable';
import { put } from '@vercel/blob';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  });

  try {
    const [fields, files] = await form.parse(req);
    
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
    const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
    const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
    const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
    const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;
    
    let imagePath = '';
    if (files.image) {
      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      const fileName = `${Date.now()}-${file.originalFilename}`;
      
      // Read file buffer from temporary path
      const fileBuffer = fs.readFileSync(file.filepath);
      
      // Upload to Vercel Blob
      const blob = await put(fileName, fileBuffer, {
        access: 'public',
      });
      
      imagePath = blob.url;
    }

    const [result] = await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, String(contact), imagePath, email_id]
    );

    res.status(200).json({ message: 'School added successfully', id: result.insertId });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Error adding school: ' + error.message });
  }
}
