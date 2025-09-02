import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id, name, address, city, state, contact, email_id } = req.body;
    
    const [result] = await db.execute(
      'UPDATE schools SET name = ?, address = ?, city = ?, state = ?, contact = ?, email_id = ? WHERE id = ?',
      [name, address, city, state, String(contact), email_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.status(200).json({ message: 'School updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Error updating school: ' + error.message });
  }
}