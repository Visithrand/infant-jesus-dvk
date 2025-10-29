# Infant Jesus School Website - Backend

This is the Spring Boot backend for the Infant Jesus School website.

## Features

- **Events Management**: Upload event photos, create/edit/delete events
- **Class Schedules**: Manage live classes and schedules
- **Facilities Management**: Add/edit/delete school facilities with images
- **Admin Authentication**: JWT-based authentication for admin operations
- **File Upload**: Local file storage for images

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Security**
- **MySQL 8.0**
- **JWT Authentication**

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0 (or Docker)

## Setup Instructions

### 1. Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Start MySQL container
docker-compose up -d mysql

# Wait for MySQL to start (check logs)
docker-compose logs mysql
```

#### Option B: Local MySQL Installation
1. Install MySQL 8.0
2. Create database: `CREATE DATABASE infant_jesus_school;`
3. Update `application.properties` with your MySQL credentials

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Admin Login

Default admin credentials:
- **Username**: `admin`
- **Password**: `password`

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID

#### Classes
- `GET /api/classes/live` - Get live classes

#### Facilities
- `GET /api/facilities` - Get all facilities
- `GET /api/facilities/{id}` - Get facility by ID
- `GET /api/facilities/search?keyword={keyword}` - Search facilities

#### Admin Authentication
- `POST /api/admin/login` - Admin login

### Admin Endpoints (Authentication Required)

#### Events (Admin)
- `POST /api/events/admin` - Create new event
- `PUT /api/events/admin/{id}` - Update event
- `DELETE /api/events/admin/{id}` - Delete event

#### Classes (Admin)
- `GET /api/classes/admin` - Get all class schedules
- `POST /api/classes/admin` - Create new class schedule
- `PUT /api/classes/admin/{id}` - Update class schedule
- `DELETE /api/classes/admin/{id}` - Delete class schedule
- `PUT /api/classes/admin/{id}/toggle-live` - Toggle live status

#### Facilities (Admin)
- `POST /api/facilities/admin` - Create new facility
- `PUT /api/facilities/admin/{id}` - Update facility
- `DELETE /api/facilities/admin/{id}` - Delete facility

## File Upload

Images are stored locally in the `uploads/` directory:
- Event images: `uploads/events/`
- Facility images: `uploads/facilities/`

## Database Schema

### Events Table
- `id` (PK)
- `title` (VARCHAR)
- `description` (TEXT)
- `image_url` (VARCHAR)
- `created_at` (TIMESTAMP)

### Classes Table
- `id` (PK)
- `subject` (VARCHAR)
- `teacher` (VARCHAR)
- `schedule_time` (TIMESTAMP)
- `is_live` (BOOLEAN)
- `created_at` (TIMESTAMP)

### Facilities Table
- `id` (PK)
- `name` (VARCHAR)
- `description` (TEXT)
- `image_url` (VARCHAR)
- `created_at` (TIMESTAMP)

## Security

- JWT-based authentication for admin endpoints
- BCrypt password hashing
- CORS enabled for frontend integration
- Stateless session management

## Development

### Running Tests
```bash
mvn test
```

### Building JAR
```bash
mvn clean package
```

### Running JAR
```bash
java -jar target/school-website-backend-0.0.1-SNAPSHOT.jar
```

## Azure PostgreSQL (Production) Setup

This backend is configured to use Azure PostgreSQL via environment variables. Do not commit secrets.

Required environment variables:
- `DATABASE_URL` — JDBC URL, e.g. `jdbc:postgresql://<server>.postgres.database.azure.com:5432/<db>?sslmode=require`
- `DB_USERNAME` — Single Server: `user@server`; Flexible Server: `user`
- `DB_PASSWORD` — database password
- `MAIL_USERNAME`, `MAIL_PASSWORD` — SMTP credentials (e.g., Gmail app password)
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_EMAIL` — super admin bootstrap
- `MAIL_HOST` (default `smtp.gmail.com`), `MAIL_PORT` (default `587`), `MAIL_TO`, `MAIL_DEBUG`
- `PORT` (default `8080`)

A template is available at `backend/ENV.EXAMPLE` — copy it to `.env` (or apply values in your deploy environment) and fill in.

### Windows PowerShell (local/prod env test)
```powershell
# Set env vars for current session
$env:DATABASE_URL="jdbc:postgresql://<server>.postgres.database.azure.com:5432/<db>?sslmode=require"
$env:DB_USERNAME="<user>@<server>"   # Flexible Server: just <user>
$env:DB_PASSWORD="<password>"

$env:MAIL_USERNAME="<gmail>"
$env:MAIL_PASSWORD="<app-password>"
$env:MAIL_TO="<recipient>"

$env:ADMIN_USERNAME="<superadmin>"
$env:ADMIN_PASSWORD="<superadmin-password>"
$env:ADMIN_EMAIL="<email>"

# Run Spring Boot
mvn spring-boot:run
```

### Azure portal checklist
- Enable public network access or VNet integration as required
- Allow your app/server outbound IP in Azure PostgreSQL firewall
- Keep SSL required (`sslmode=require`)
- Use the correct username format (Single vs Flexible server)

## Production Deployment

1. Update environment variables on your hosting platform (do not use defaults)
2. Configure proper JWT secret and rotate credentials regularly
3. Set up file storage (consider cloud storage)
4. Configure CORS for production domain
5. Enable HTTPS
6. Configure logging

## Support

For issues or questions, please check the logs or contact the development team.
