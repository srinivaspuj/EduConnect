import connection from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    // Verify OTP
    const [rows] = await connection.execute(
      'SELECT * FROM otps WHERE email = ? AND otp = ? AND expires_at > NOW()',
      [email, otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Delete used OTP
    await connection.execute('DELETE FROM otps WHERE email = ?', [email]);

    // Create session token (simple approach)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    res.status(200).json({ 
      message: 'Login successful',
      token,
      email
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
}