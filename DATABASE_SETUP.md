# Database Setup Instructions

## Google Cloud MySQL Configuration

The application is configured to use Google Cloud MySQL with the following credentials:

### Database Connection
- **Host**: 34.55.213.131:3306
- **Database**: school-db
- **Username**: root
- **Password**: Sri@2004

### Super Admin Bootstrap
The application automatically creates a super admin user on startup with the following credentials:

- **Username**: superadmin
- **Password**: visithran@123
- **Email**: visithrand@gmail.com
- **Role**: SUPER_ADMIN

## Setup Steps

1. **Ensure Google Cloud MySQL is accessible** from your application
2. **The database will be created automatically** with the name `school-db`:
   ```sql
   CREATE DATABASE school-db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Run the application** - The BootstrapConfig will automatically:
   - Create the necessary tables
   - Create the super admin user
   - Set up the initial data

## Manual Database Setup (Optional)

If you prefer to set up the database manually, you can run the SQL scripts in this order:

1. `setup-database.sql` - Creates tables and initial data
2. `insert-superadmin.sql` - Inserts the super admin user
3. `data.sql` - Additional initial data

## Environment Variables

You can override the default credentials using environment variables:

```bash
# Database credentials
export DB_USERNAME=root
export DB_PASSWORD=Sri@2004

# Admin bootstrap credentials
export ADMIN_USERNAME=superadmin
export ADMIN_PASSWORD=visithran@123
export ADMIN_EMAIL=visithrand@gmail.com
```

## Accessing the Admin Portal

1. Start the application
2. Navigate to `/admin` in your browser
3. Login with:
   - Username: `superadmin`
   - Password: `visithran@123`

## Troubleshooting

- Ensure Google Cloud MySQL is accessible on 34.55.213.131:3306
- Check that the database `school-db` exists
- Verify the MySQL user has proper permissions
- Check application logs for any bootstrap errors
