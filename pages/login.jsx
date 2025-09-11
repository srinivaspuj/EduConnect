import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: otp
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const router = useRouter();

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/sendOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      
      if (res.ok) {
        setStep(2);
        setTimeLeft(600); // Reset to 10 minutes
        setMessage('OTP sent to your email');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to send OTP');
    }
    setLoading(false);
  };

  // Countdown timer effect
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setMessage('OTP expired. Please request a new one.');
            setStep(1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/verifyOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', data.email);
        router.push('/addSchool');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to verify OTP');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '28px', fontWeight: '700' }}>
          Login to EduConnect
        </h1>

        {step === 1 ? (
          <form onSubmit={sendOTP}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = '#5f42a0'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #5f42a0, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOTP}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Enter 6-digit OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
                style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '20px', textAlign: 'center', letterSpacing: '4px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#5f42a0'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
              <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                OTP sent to: {email}
              </p>
              <p style={{ fontSize: '14px', color: timeLeft < 60 ? '#dc3545' : '#5f42a0', marginTop: '8px', fontWeight: '600' }}>
                ⏰ Expires in: {formatTime(timeLeft)}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #5f42a0, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginBottom: '10px' }}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{ width: '100%', padding: '8px', background: 'transparent', color: '#5f42a0', border: '1px solid #5f42a0', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
            >
              Change Email
            </button>
          </form>
        )}

        {message && (
          <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', textAlign: 'center', background: message.includes('sent') ? '#d4edda' : '#f8d7da', color: message.includes('sent') ? '#155724' : '#721c24', border: `1px solid ${message.includes('sent') ? '#c3e6cb' : '#f5c6cb'}` }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}