import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test database connection first
    console.log('Testing database connection...');
    await db.execute('SELECT 1');
    console.log('Database connected successfully');
    
    // Simple query to get all schools
    console.log('Fetching schools...');
    const [rows] = await db.execute('SELECT id, name, address, city, image FROM schools ORDER BY id DESC');
    console.log('Found schools:', rows.length);
    
    res.status(200).json({
      schools: rows,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalSchools: rows.length,
        hasNext: false,
        hasPrev: false
      }
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      message: 'Error fetching schools',
      error: error.message,
      code: error.code
    });
  }
}
