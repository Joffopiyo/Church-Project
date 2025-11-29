# Muhoroni Altar Church Monitoring System - Technical Blueprint

## 1. Executive Summary
The Muhoroni Altar Church Monitoring System is a robust, full-stack web application designed to digitize and streamline the administrative, spiritual, and operational workflows of the church. Built on the MERN stack (MongoDB, Express.js, React, Node.js), the system empowers various church roles—from the Bishop to Departmental Leaders—to effectively manage duties, submit upward reports, track attendance, and oversee development projects. Key capabilities include role-based dashboards, secure media uploads (images/videos) with server-side validation, and automated generation of comprehensive PDF/DOCX progress reports. This solution aims to enhance transparency, accountability, and data-driven decision-making within the church leadership structure.

## 2. System Architecture
The system follows a layered, service-oriented architecture to ensure scalability and maintainability.

### Components
1.  **Client Layer (Frontend)**:
    *   **React (Vite)**: SPA for dynamic user interfaces.
    *   **Redux Toolkit**: Global state management (auth, user profile, UI state).
    *   **React Query**: Server state management, caching, and background updates.
    *   **Material-UI (MUI)**: Component library for a polished, responsive design.
    *   **FullCalendar**: For event and programme scheduling.
2.  **API Layer (Backend)**:
    *   **Node.js & Express**: RESTful API server.
    *   **Middleware**: `helmet` (security), `cors`, `morgan` (logging), `multer` (file handling), `express-validator`.
    *   **Auth Service**: JWT-based authentication with Refresh Tokens.
    *   **RBAC Middleware**: Enforces permissions based on user roles.
3.  **Service Layer**:
    *   **Media Service**: Handles S3 uploads and FFmpeg processing (thumbnails, duration checks).
    *   **Report Service**: Aggregates data and generates PDF/DOCX files.
    *   **Notification Service**: Manages email/SMS alerts.
4.  **Data Layer**:
    *   **MongoDB**: Primary database for application data.
    *   **Mongoose**: ODM for schema validation and modeling.
    *   **AWS S3**: Object storage for images, documents, and videos.
    *   **Redis**: (Optional) For caching frequently accessed data and managing background job queues (BullMQ).

### Diagram Description
`[Client (React)] <-> [Load Balancer/Nginx] <-> [Express API] <-> [Service Layer] <-> [MongoDB]`
`                                                         |-> [AWS S3]`
`                                                         |-> [FFmpeg Worker]`

## 3. Mongoose Data Models

```javascript
// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['BISHOP', 'REVEREND', 'OVERSEER', 'SENIOR_PASTOR', 'DEPT_LEADER', 'CDC_MEMBER', 'STAFF'], 
    default: 'STAFF',
    index: true 
  },
  department: { type: Schema.Types.ObjectId, ref: 'Department' }, // Nullable for high-level roles
  phoneNumber: { type: String },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

// models/Department.js
const DepartmentSchema = new Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Home Base Fellowship", "Choir"
  head: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  parentDepartment: { type: Schema.Types.ObjectId, ref: 'Department' } // For hierarchy
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);

// models/Report.js
const ReportSchema = new Schema({
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true, index: true },
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date, required: true },
  type: { type: String, enum: ['WEEKLY', 'MONTHLY', 'EVENT'], required: true },
  attendanceCount: { type: Number, default: 0 },
  attendanceList: [{ type: String }], // Names of attendees
  summary: { type: String },
  media: [{ type: Schema.Types.ObjectId, ref: 'FileUpload' }], // Photos/Docs
  status: { type: String, enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'], default: 'DRAFT' },
  feedback: String
}, { timestamps: true });

ReportSchema.index({ department: 1, periodStart: -1 });
module.exports = mongoose.model('Report', ReportSchema);

// models/FileUpload.js
const FileUploadSchema = new Schema({
  uploader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  key: { type: String, required: true }, // S3 Key
  url: { type: String, required: true },
  fileType: { type: String, enum: ['IMAGE', 'DOCUMENT', 'VIDEO'], required: true },
  durationSeconds: { type: Number }, // For videos
  thumbnailUrl: { type: String }, // For videos
  relatedEntity: { type: Schema.Types.ObjectId, refPath: 'onModel' },
  onModel: { type: String, enum: ['Report', 'Event', 'SickRecord', 'Sermon'] }
}, { timestamps: true });

module.exports = mongoose.model('FileUpload', FileUploadSchema);

// models/Event.js
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true },
  location: String,
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['SERVICE', 'MEETING', 'OUTREACH', 'FELLOWSHIP'] },
  attachments: [{ type: Schema.Types.ObjectId, ref: 'FileUpload' }]
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);

// models/Attendance.js
const AttendanceSchema = new Schema({
  date: { type: Date, required: true, index: true },
  type: { type: String, enum: ['SUNDAY_SERVICE', 'MIDWEEK', 'SPECIAL'], required: true },
  totalMen: { type: Number, default: 0 },
  totalWomen: { type: Number, default: 0 },
  totalChildren: { type: Number, default: 0 },
  totalCount: { type: Number, required: true },
  recordedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);

// models/Sermon.js
const SermonSchema = new Schema({
  date: { type: Date, required: true, index: true },
  preacher: { type: String, required: true }, // Or ref to User if preacher is internal
  theme: { type: String, required: true },
  scriptures: [{ type: String }], // e.g., ["John 3:16", "Genesis 1:1"]
  recording: { type: Schema.Types.ObjectId, ref: 'FileUpload' }, // Audio/Video
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Sermon', SermonSchema);

// models/DevelopmentProject.js
const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  startDate: Date,
  targetDate: Date,
  status: { type: String, enum: ['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'PAUSED'], default: 'PLANNING' },
  completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
  budget: Number,
  manager: { type: Schema.Types.ObjectId, ref: 'User' },
  updates: [{
    date: { type: Date, default: Date.now },
    note: String,
    percentage: Number,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('DevelopmentProject', ProjectSchema);

// models/SickRecord.js
const SickRecordSchema = new Schema({
  patientName: { type: String, required: true },
  condition: String,
  hospital: String,
  admissionDate: Date,
  dischargeDate: Date,
  status: { type: String, enum: ['ADMITTED', 'DISCHARGED', 'RECOVERING', 'CRITICAL'] },
  documents: [{ type: Schema.Types.ObjectId, ref: 'FileUpload' }],
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('SickRecord', SickRecordSchema);

// models/Duty.js
const DutySchema = new Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dueDate: Date,
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
  priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' }
}, { timestamps: true });

module.exports = mongoose.model('Duty', DutySchema);
```

## 4. RESTful API Specification

### Authentication
- `POST /api/auth/register` - Register new user (Admin only or public with approval).
- `POST /api/auth/login` - Body: `{ email, password }`. Response: `{ token, refreshToken, user }`.
- `POST /api/auth/refresh` - Refresh access token.
- `POST /api/auth/logout` - Invalidate tokens.

### Reports
- `POST /api/reports` - Create report. Body: Multipart/form-data (JSON data + files).
    - **Header**: `Authorization: Bearer <token>`
    - **Validation**: Images allowed, Docs allowed.
- `GET /api/reports` - List reports (filtered by role/dept).
- `GET /api/reports/:id` - Get details.
- `PUT /api/reports/:id` - Update report.

### Media (Files)
- `POST /api/upload/video` - Upload video.
    - **Validation**: Min duration 120s.
    - **Process**: Async upload to S3, FFmpeg check.
- `POST /api/upload/image` - Upload image.

### Dashboard & Analytics
- `GET /api/dashboard/stats` - Returns aggregated stats for the user's role.
- `GET /api/dashboard/projects` - CDC specific project stats.

### Exports
- `GET /api/exports/church-report?format=pdf` - Download full PDF.
- `GET /api/exports/church-report?format=docx` - Download full DOCX.

## 5. Frontend Architecture

### Component Map
- **AppRouter**: Handles protected routes based on roles.
    - `/login`: **LoginPage**
    - `/dashboard`: **DashboardLayout**
        - `index`: **RoleBasedDashboard** (switches based on user role)
        - `/reports/new`: **ReportSubmissionForm** (Multi-step form: Details -> Attendance -> Uploads)
        - `/reports`: **ReportsList**
        - `/calendar`: **EventCalendar** (FullCalendar integration)
        - `/projects`: **ProjectTracker** (Progress bars, Gantt chart optional)
        - `/sermons`: **SermonManager**
        - `/sick-records`: **SickRecordsManager**
        - `/admin/users`: **UserManagement**
        - `/exports`: **ExportsPage**

### State Management
- **Redux Toolkit**:
    - `authSlice`: user, token, isAuthenticated.
    - `uiSlice`: sidebar open/close, theme mode.
- **React Query**:
    - Fetching reports, projects, events. Handles caching and re-fetching on focus.

### UI Behaviors
- **Video Upload**:
    - Client-side check: `<video>` element loads file, `onLoadedMetadata` checks `duration`. If < 120s, alert user and clear input.
    - Progress Bar: Axios `onUploadProgress`.

## 6. File Upload & Media Processing

**Storage**: AWS S3.
**Structure**: `bucket-name/{environment}/{entityType}/{year}/{month}/{filename}`

**Server-Side Flow (Video)**:
1.  Receive stream via `multer`.
2.  Save to temp disk or stream to S3.
3.  **FFmpeg Check**:
    ```javascript
    const ffmpeg = require('fluent-ffmpeg');
    
    const checkVideoDuration = (filePath) => {
      return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
          if (err) return reject(err);
          const duration = metadata.format.duration;
          if (duration < 120) {
            reject(new Error('Video must be at least 2 minutes long.'));
          } else {
            resolve(duration);
          }
        });
      });
    };
    ```
4.  If valid, upload to S3 (if not already piped) and save metadata to DB.

## 7. Reporting & Export

**Tools**: `puppeteer` for PDF, `docx` for Word.

**PDF Generation Snippet**:
```javascript
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');

async function generatePDF(data) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlTemplate = await fs.readFile('./templates/report.hbs', 'utf-8');
  const template = hbs.compile(htmlTemplate);
  const html = template(data);
  
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdfBuffer;
}
```

## 8. Dashboard Queries (Aggregation)

**Project Completion %**:
```javascript
db.developmentprojects.aggregate([
  {
    $group: {
      _id: null,
      avgCompletion: { $avg: "$completionPercentage" },
      totalProjects: { $sum: 1 },
      completedProjects: { 
        $sum: { $cond: [{ $eq: ["$status", "COMPLETED"] }, 1, 0] } 
      }
    }
  }
])
```

## 9. Authorization Matrix

| Role | View Dashboard | Submit Report | Upload Video | Manage Users | View Sick Records | Manage Projects |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Bishop | ALL | View | View | View | View | View |
| Reverend | ALL | View | View | View | View | View |
| Overseer | Region | View | View | No | View | View |
| Dept Leader | Own | Create/Edit | Image Only | No | No | No |
| CDC Member | Projects | No | No | No | No | Edit |
| Admin | ALL | ALL | ALL | Edit | ALL | Edit |

## 10. Validation & Error Handling

**Standard Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Video duration too short",
    "details": ["Duration is 45s, minimum is 120s"]
  }
}
```

**Notifications**:
- Use `nodemailer` for emails (e.g., "New Report Submitted").
- In-app notifications stored in `Notification` collection, polled by frontend or pushed via Socket.io.

## 11. Testing Strategy
- **Unit**: Jest for utility functions (e.g., duration formatter).
- **Integration**: Supertest for API endpoints (Auth, Report submission).
- **E2E**: Cypress for critical flows:
    1.  Login as Dept Leader.
    2.  Navigate to Report Submission.
    3.  Fill form, upload valid image.
    4.  Submit -> Verify success message.
    5.  Login as Bishop -> Verify report appears in dashboard.

## 12. DevOps & Deployment

**Dockerfile (Backend)**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
# Install ffmpeg
RUN apk add --no-cache ffmpeg
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/church_db
    depends_on:
      - mongo
  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
```

## 13. Performance & Scalability
- **CDN**: Serve S3 content via CloudFront.
- **Pagination**: Implement cursor-based pagination for Report lists.
- **Background Jobs**: Use BullMQ + Redis for video processing and PDF generation to avoid blocking the main thread.

## 14. Privacy & Security
- **Sick Records**: Encrypt sensitive fields (patient name, condition) at application level before saving if highly sensitive, or rely on strict RBAC.
- **Audit Logs**: Middleware to log every `POST`/`PUT`/`DELETE` action with `userId`, `timestamp`, `ip`, and `resourceId`.

## 15. Deliverables & Timeline
- **Sprint 1 (Wk 1-2)**: Setup, Auth, User Mgmt, DB Schemas.
- **Sprint 2 (Wk 3-4)**: Dashboards, Dept & Duty Delegation.
- **Sprint 3 (Wk 5-6)**: Report Submission, File Uploads (Images).
- **Sprint 4 (Wk 7-8)**: Video Processing, Events, Sermons.
- **Sprint 5 (Wk 9)**: CDC Projects, Sick Records.
- **Sprint 6 (Wk 10)**: Reporting Exports, Admin Polish.
- **Sprint 7 (Wk 11)**: Testing, Deployment, Handover.

## 16. Postman/OpenAPI
*A separate `openapi.yaml` file should be generated using `swagger-jsdoc` to document the API interactively.*
