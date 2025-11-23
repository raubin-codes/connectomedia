# Connectomedia Backend API

Backend server for Connectomedia website with MySQL database integration.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **MySQL** (v5.7 or higher)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Verify: `mysql --version`

3. **npm** (comes with Node.js)
   - Verify: `npm --version`

## 🚀 Quick Start

### Step 1: Install MySQL (if not already installed)

**Windows:**
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run the installer and choose "Developer Default"
3. Set a root password during installation (remember this!)
4. Complete the installation

**Verify MySQL is running:**
```powershell
mysql -u root -p
```
Enter your password when prompted.

### Step 2: Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE connectomedia_db;
```

To verify:
```sql
SHOW DATABASES;
```

### Step 3: Install Dependencies

Navigate to the backend folder:
```powershell
cd "d:\c programming\connectomedia-website\backend"
npm install
```

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```powershell
copy .env.example .env
```

2. Edit `.env` file and update your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=connectomedia_db
DB_PORT=3306

PORT=3000
NODE_ENV=development
FRONTEND_URL=http://127.0.0.1:5500
```

### Step 5: Start the Server

**Development mode (with auto-restart):**
```powershell
npm run dev
```

**Production mode:**
```powershell
npm start
```

You should see:
```
✅ Database connected successfully!
✅ Database tables initialized successfully!
🚀 Server is running!
📡 API Server: http://localhost:3000
```

### Step 6: Test the API

Open your browser or use a tool like Postman:

**Test endpoint:**
```
GET http://localhost:3000/
```

**Submit contact form:**
```
POST http://localhost:3000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Test Company",
  "message": "This is a test message"
}
```

## 📡 API Endpoints

### 1. Health Check
```
GET /
```
Response:
```json
{
  "message": "Connectomedia API Server",
  "version": "1.0.0",
  "status": "running"
}
```

### 2. Submit Contact Form
```
POST /api/contact
```
Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Optional Company Name",
  "message": "Your message here"
}
```
Response (Success):
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 3. Get All Messages (Admin)
```
GET /api/contact
```
Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Test Company",
      "message": "Test message",
      "created_at": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

### 4. Get Single Message by ID
```
GET /api/contact/:id
```
Example: `GET /api/contact/1`

## 🗄️ Database Schema

### Table: contact_messages

| Column | Type | Description |
|--------|------|-------------|
| id | INT (Primary Key) | Auto-incrementing ID |
| name | VARCHAR(255) | Contact name |
| email | VARCHAR(255) | Contact email |
| company | VARCHAR(255) | Company name (optional) |
| message | TEXT | Message content |
| created_at | TIMESTAMP | Submission timestamp |

## 🔧 Troubleshooting

### Error: "Database connection failed"

**Solution 1:** Check MySQL is running
```powershell
# Check MySQL service status
Get-Service MySQL*
```

**Solution 2:** Verify credentials in `.env` file
- Make sure DB_USER and DB_PASSWORD are correct
- Try connecting manually: `mysql -u root -p`

**Solution 3:** Check if database exists
```sql
SHOW DATABASES;
```

### Error: "Cannot find module"

**Solution:** Reinstall dependencies
```powershell
rm -r node_modules
npm install
```

### Error: "Port 3000 already in use"

**Solution:** Change port in `.env` file or kill the process
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Error: "CORS policy"

**Solution:** Update `FRONTEND_URL` in `.env` to match your frontend URL

## 📝 Testing with Frontend

1. Make sure backend is running on `http://localhost:3000`
2. Open your frontend HTML file (index.html)
3. Fill out the contact form
4. Submit and check:
   - Browser console for any errors
   - Backend terminal for request logs
   - MySQL database for saved data

**Check database:**
```sql
USE connectomedia_db;
SELECT * FROM contact_messages;
```

## 🔐 Security Notes

- Never commit `.env` file to version control
- Use strong database passwords
- In production, use environment variables
- Enable HTTPS in production
- Add rate limiting for API endpoints
- Implement authentication for admin routes

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🆘 Need Help?

If you encounter issues:
1. Check the error message in the terminal
2. Verify all prerequisites are installed
3. Ensure MySQL is running
4. Check `.env` configuration
5. Review the troubleshooting section above
