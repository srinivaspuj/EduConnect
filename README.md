# 🎓 EduConnect

A modern, full-stack educational platform built with **Next.js** and **MySQL** that connects students and parents with their ideal schools. Features a professional UI with advanced search capabilities, real-time filtering, and seamless school management operations.

![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Features

### 📋 **Core Functionality**
- **School Registration**: Complete form with validation using React Hook Form
- **School Directory**: Professional grid display with ecommerce-style layout
- **Image Management**: Secure file upload with visual feedback
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Data Validation**: Comprehensive form validation with error handling

### 🎨 **User Experience**
- **Modern UI Design**: Professional interface with gradient effects and animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth hover effects and transitions
- **Visual Feedback**: Real-time form validation and upload confirmation

### 🔍 **Advanced Search & Filtering**
- **Multi-Select Filters**: City, Board, Type, and Hostel facility filters
- **Smart Search**: Real-time search with city name filtering
- **Dropdown Controls**: Exclusive dropdown behavior with click-outside-to-close
- **Filter Indicators**: Visual checkboxes (☐/☑) for selected options

### 🛠 **Technical Excellence**
- **Modern Architecture**: Built with Next.js 14 and React 18+
- **Database Integration**: MySQL with optimized queries
- **File Handling**: Secure image upload to `public/schoolImages/`
- **Performance Optimized**: Efficient state management and event handling
- **Clean Code**: Well-documented, maintainable codebase

## 🏗 **Tech Stack**

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | Full-stack React framework | 14.2.32 |
| **React** | Frontend library | 18+ |
| **MySQL** | Database | 8.0+ |
| **React Hook Form** | Form validation | Latest |
| **Formidable** | File upload handling | Latest |
| **MySQL2** | Database connector | Latest |

## 📁 **Project Structure**

```
EduConnect/
├── pages/
│   ├── index.js              # Landing page with navigation
│   ├── addSchool.jsx         # School registration form
│   ├── showSchools.jsx       # School directory with filters
│   └── api/
│       ├── addSchool.js      # POST - Add new school
│       ├── getSchools.js     # GET - Fetch schools
│       ├── updateSchool.js   # PUT - Update school
│       └── deleteSchool.js   # DELETE - Remove school
├── lib/
│   └── db.js                 # MySQL database configuration
├── public/
│   └── schoolImages/         # Uploaded school images
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 🚀 **Quick Start**

### Prerequisites
- **Node.js** (v16 or higher)
- **TiDB Cloud Account** (for production)
- **Vercel Account** (for deployment)
- **npm** or **yarn**

### 1. Clone Repository
```bash
git clone <repository-url>
cd EduConnect
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
Create MySQL database and table:

```sql
CREATE DATABASE school_db;

USE school_db;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT,
  email_id TEXT NOT NULL
);
```

### 4. Configure Database
Update `lib/db.js` with your MySQL credentials:

```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'school_db'
});
```

### 5. Run Application
```bash
npm run dev
```

Visit **http://localhost:3000** to access the application.

## 📱 **Pages Overview**

### 🏠 **Home Page** (`/`)
- **Professional landing page** with modern design
- **Navigation cards** for easy access to features
- **Feature highlights** showcasing platform capabilities
- **Responsive layout** with smooth animations

### ➕ **Add School** (`/addSchool`)
- **Comprehensive form** with validation
- **File upload** with visual feedback
- **Professional styling** with focus states
- **Error handling** with user-friendly messages

### 📚 **School Directory** (`/showSchools`)
- **Grid layout** displaying schools like an ecommerce site
- **Advanced filtering** with multi-select dropdowns
- **Search functionality** with real-time results
- **CRUD operations** with inline editing
- **Professional animations** and hover effects

## 🔧 **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/getSchools` | Fetch all schools with pagination |
| `POST` | `/api/addSchool` | Add new school with image upload |
| `PUT` | `/api/updateSchool` | Update existing school data |
| `DELETE` | `/api/deleteSchool?id={id}` | Delete school by ID |

## 🎨 **Design System**

### **Color Palette**
- **Primary**: `#5f42a0` (Purple)
- **Secondary**: `#5ca223` (Green)
- **Background**: `#f8f9fa` (Light Gray)
- **Text**: `#333` (Dark Gray)

### **Typography**
- **Font Family**: Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Headings**: 700-800 font weight with gradient effects
- **Body**: 400-600 font weight for optimal readability

### **Components**
- **Cards**: Glass morphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Clean inputs with focus states and validation
- **Dropdowns**: Professional styling with smooth animations

## 🔒 **Security Features**

- **Input Validation**: Server-side and client-side validation
- **File Upload Security**: Restricted file types and size limits
- **SQL Injection Prevention**: Parameterized queries
- **Error Handling**: Graceful error management with user feedback

## 📱 **Responsive Design**

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layouts for medium screens
- **Desktop Enhanced**: Full feature set on large screens
- **Cross-Browser**: Compatible with modern browsers

## 🚀 **Performance Optimizations**

- **Efficient State Management**: Optimized React state updates
- **Event Handling**: Proper event delegation and cleanup
- **Image Optimization**: Compressed uploads and responsive images
- **Database Queries**: Optimized MySQL queries with indexing

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Developer**

**Pujala Srinivas**
- 📧 Email: srinivas.pujala1121@gmail.com
- 💼 LinkedIn: https://www.linkedin.com/in/pujala-srinivas
- 🐱 GitHub: https://github.com/srinivaspuj

---

<div align="center">

**EduConnect - Built with ❤️ using Next.js and MySQL**

*Connecting education through modern web development and professional design*

</div>
