# EduConnect - School Management Platform with OTP Authentication

## 🔐 New Authentication Features

### Email OTP Login System
- **6-digit OTP codes** sent via email
- **10-minute expiry** for security
- **Gmail integration** for email delivery
- **Protected routes** for school management

### Authentication Flow
1. User enters email on login page
2. System sends 6-digit OTP to email
3. User enters OTP to authenticate
4. Access granted to add/edit schools

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
Run the SQL script to create the OTP table:
```sql
-- Execute this in your MySQL database
CREATE TABLE IF NOT EXISTS otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  otp VARCHAR(6) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_expires (expires_at)
);
```

### 3. Environment Configuration
Update `.env` file with your credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=test
DB_PORT=3306

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Environment
NODE_ENV=development
```

### 4. Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

### 5. Run Application
```bash
npm run dev
```

## 🔒 Authentication Features

### Public Access
- ✅ View all schools
- ✅ Search and filter schools
- ✅ Browse school details

### Authenticated Access (Login Required)
- 🔐 Add new schools
- 🔐 Edit school information
- 🔐 Delete schools

### Login Process
1. Visit `/login` page
2. Enter your email address
3. Check email for 6-digit OTP
4. Enter OTP to authenticate
5. Access school management features

## 📱 Updated Pages

### `/login` - New OTP Authentication
- Email input with validation
- OTP verification (6-digit code)
- 10-minute expiry timer
- Professional UI design

### `/addSchool` - Protected Route
- Requires authentication
- Shows user email in header
- Logout functionality
- Redirects to login if not authenticated

### `/showSchools` - Mixed Access
- Public viewing of schools
- Edit/Delete buttons only for authenticated users
- Login prompt for unauthenticated actions

### `/` - Updated Home Page
- New "Admin Login" card
- Clear distinction between public and admin features

## 🛠 Technical Implementation

### Backend APIs
- `POST /api/sendOTP` - Send OTP to email
- `POST /api/verifyOTP` - Verify OTP and create session
- Email service using Nodemailer + Gmail

### Frontend Features
- Client-side authentication state management
- Protected route components
- Session persistence with localStorage
- Responsive OTP input interface

### Security Features
- OTP expiry (10 minutes)
- Email validation
- Session token system
- Automatic cleanup of expired OTPs

## 📧 Email Template
Professional OTP email with:
- EduConnect branding
- Large, clear OTP display
- Expiry information
- Clean HTML formatting

## 🎯 Usage Flow

1. **Public User**: Browse schools freely
2. **Admin User**: 
   - Login with email OTP
   - Add/edit/delete schools
   - Manage school database
   - Logout when done

## 🔧 Troubleshooting

### Email Issues
- Verify Gmail App Password is correct
- Check spam folder for OTP emails
- Ensure 2FA is enabled on Gmail account

### Database Issues
- Confirm OTP table exists
- Check database connection credentials
- Verify MySQL service is running

### Authentication Issues
- Clear browser localStorage if needed
- Check browser console for errors
- Verify OTP hasn't expired (10 min limit)

## 🚀 Deployment Notes

### Environment Variables
Set these in your production environment:
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Gmail App Password
- `DB_*` - Database credentials
- `NODE_ENV=production`

### Security Considerations
- Use strong database passwords
- Keep email credentials secure
- Consider rate limiting for OTP requests
- Monitor for suspicious login attempts

---

**EduConnect** - Now with secure email OTP authentication! 🎓🔐