# Infant Jesus School Website

A modern, responsive school website built with React frontend and Spring Boot backend, featuring event management, live class notifications, facilities showcase, and admin dashboard.

## 🚀 Features

### Frontend (React)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Event Gallery**: Dynamic event display with image uploads
- **Live Notifications**: Real-time live class notifications with 10-second polling
- **Facilities Section**: Searchable facilities showcase
- **Admin Dashboard**: Secure admin panel for content management
- **Admission Forms**: Downloadable application forms

### Backend (Spring Boot)
- **RESTful APIs**: Complete CRUD operations for events, classes, and facilities
- **JWT Authentication**: Secure admin access with token-based authentication
- **File Upload**: Local image storage for events and facilities
- **MySQL Database**: Persistent data storage with JPA/Hibernate
- **Spring Security**: Protected admin endpoints

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **Shadcn/ui** components

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Security**
- **MySQL 8.0**
- **JWT Authentication**

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **MySQL 8.0** (or Docker)
- **Maven 3.6+**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vvinscbe-clone-showcase
```

### 2. Backend Setup

#### Option A: Using Docker (Recommended)
```bash
# Start MySQL container
docker-compose up -d mysql

# Wait for MySQL to start
docker-compose logs mysql
```

#### Option B: Local MySQL
1. Install MySQL 8.0
2. Create database: `CREATE DATABASE infant_jesus_school;`
3. Update `backend/src/main/resources/application.properties`

#### Start Spring Boot Backend
```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Admin Access
Navigate to `/admin` and use:
- **Username**: `admin`
- **Password**: `password`

## 🗄️ Database Schema

### Events Table
```sql
CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);
```

### Classes Table
```sql
CREATE TABLE classes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    teacher VARCHAR(255) NOT NULL,
    schedule_time TIMESTAMP NOT NULL,
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL
);
```

### Facilities Table
```sql
CREATE TABLE facilities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/events` - Get all events
- `GET /api/classes/live` - Get live classes
- `GET /api/facilities` - Get all facilities
- `POST /api/admin/login` - Admin login

### Admin Endpoints (Authentication Required)
- `POST /api/events/admin` - Create event
- `PUT /api/events/admin/{id}` - Update event
- `DELETE /api/events/admin/{id}` - Delete event
- `POST /api/classes/admin` - Create class
- `PUT /api/classes/admin/{id}` - Update class
- `PUT /api/classes/admin/{id}/toggle-live` - Toggle live status
- `POST /api/facilities/admin` - Create facility
- `PUT /api/facilities/admin/{id}` - Update facility
- `DELETE /api/facilities/admin/{id}` - Delete facility

## 🎯 Key Components

### Frontend Components
- **EventGallery**: Displays school events with images
- **LiveNotification**: Real-time live class notifications
- **FacilitiesSection**: Searchable facilities showcase
- **AdminDashboard**: Admin panel for content management
- **Admissions**: Application form downloads

### Backend Services
- **EventService**: Event CRUD operations with image upload
- **ClassScheduleService**: Class management and live status
- **FacilityService**: Facility CRUD operations
- **JWT Authentication**: Secure admin access

## 🔐 Security Features

- JWT-based authentication for admin endpoints
- BCrypt password hashing
- CORS configuration for frontend integration
- Stateless session management
- Protected admin routes

## 📁 Project Structure

```
project-root/
├── backend/                          # Spring Boot backend
│   ├── src/main/java/com/infantjesus/
│   ├── src/main/resources/
│   └── pom.xml
├── infant-jesus-dvk/
│   └── frontend/                     # React frontend (this folder)
│       ├── src/
│       ├── public/
│       ├── vite.config.ts
│       ├── package.json
│       └── docker-compose.yml        # Local MySQL helper (binds ../backend)
└── README.md
```

## 🚀 Deployment

### Backend Deployment
1. Build JAR: `mvn clean package`
2. Run: `java -jar target/school-website-backend-0.0.1-SNAPSHOT.jar`
3. Configure production database
4. Set up proper JWT secret
5. Configure file storage (consider cloud storage)

### Frontend Deployment
1. Build: `npm run build`
2. Deploy `dist/` folder to web server
3. Configure API base URL for production

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check credentials in `application.properties`
   - Verify database exists

2. **Port Already in Use**
   - Change port in `application.properties`
   - Kill process using port 8080

3. **File Upload Errors**
   - Ensure `uploads/` directory has write permissions
   - Check file size limits

4. **CORS Issues**
   - Verify backend CORS configuration
   - Check frontend API calls

### Development Tips

- Use browser dev tools to debug API calls
- Check Spring Boot logs for backend errors
- Verify JWT token in localStorage for admin access
- Test file uploads with smaller images first

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review logs and error messages
3. Check API documentation
4. Contact the development team

## 🔄 Updates and Maintenance

- Regularly update dependencies
- Monitor database performance
- Backup data regularly
- Test admin functionality
- Review security configurations

---

**Built with ❤️ for Infant Jesus School**
