# Church Monitoring & Management System

A comprehensive MERN stack application for managing church operations, including departments, duties, reports, attendance tracking, and file uploads.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Roles: BISHOP, REVEREND, OVERSEER, SENIOR_PASTOR, DEPT_LEADER, MEMBER, ADMIN

### Department Management
- Create and manage church departments
- Assign department heads
- Hierarchical department structure

### Duty Delegation
- Assign duties to church members
- Track duty status (PENDING, IN_PROGRESS, COMPLETED)
- Priority levels (LOW, MEDIUM, HIGH)
- Email notifications for new assignments

### Report Submission
- Weekly, Monthly, and Event reports
- File attachments (images, documents)
- Attendance tracking within reports
- Email notifications to leadership

### Attendance Tracking
- Daily attendance roll call
- Breakdown by Men, Women, Children
- Service type categorization

### File Uploads
- AWS S3 integration for media storage
- Support for images, documents, and videos
- Organized file structure by date and type

## Tech Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- AWS S3 for file storage
- Nodemailer for email notifications

### Frontend
- React with Vite
- Redux Toolkit for state management
- Material-UI (MUI) for components
- Axios for API calls
- React Router for navigation

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- AWS Account (for S3)
- Gmail account (for SMTP) or other email service

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Configure environment variables in `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/church_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# AWS S3 Config
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=us-east-1

# Email Config
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@churchapp.com
FROM_NAME=ChurchAdmin
```

3. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the application at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department (Admin/Bishop)
- `PUT /api/departments/:id` - Update department (Admin)
- `DELETE /api/departments/:id` - Delete department (Admin)

### Duties
- `POST /api/duties` - Assign duty (Leaders)
- `GET /api/duties/my` - Get my assigned duties
- `GET /api/duties/assigned` - Get duties I assigned
- `PUT /api/duties/:id/status` - Update duty status

### Reports
- `POST /api/reports` - Submit report (Dept Leader)
- `GET /api/reports` - Get all reports (Admin/Bishop)
- `GET /api/reports/department/:deptId` - Get department reports

### Attendance
- `POST /api/attendance` - Record attendance
- `GET /api/attendance` - Get attendance history

### File Upload
- `POST /api/upload` - Upload file to S3

## Project Structure

```
Church Project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
└── README.md
```

## Email Configuration

For Gmail SMTP:
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the app password in `SMTP_PASSWORD`

## AWS S3 Configuration

1. Create an S3 bucket
2. Configure bucket permissions
3. Create IAM user with S3 access
4. Add credentials to `.env`

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 5173
- Vite proxy configured for `/api` routes
- MongoDB connection required before starting backend

## Future Enhancements

- Real-time notifications with WebSockets
- Advanced analytics dashboard
- Mobile app (React Native)
- SMS notifications
- Video sermon uploads with FFmpeg validation
- Sick member tracking
- Financial management module

## License

MIT

## Contributors

Developed for Muhoroni Altar Church
