import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (email, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'EduConnect <onboarding@resend.dev>',
      to: [email],
      subject: 'EduConnect - Login OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #5f42a0; text-align: center;">EduConnect Login</h2>
          <p>Your OTP code is:</p>
          <div style="background: #f8f9fa; padding: 30px; text-align: center; margin: 20px 0; border-radius: 10px;">
            <h1 style="color: #5f42a0; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
          </div>
          <p style="color: #666;">This code will expire in 10 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};