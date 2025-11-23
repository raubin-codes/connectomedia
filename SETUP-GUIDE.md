# 🚀 Connectomedia Website - Complete Setup Guide

## Backend + Database + Frontend Integration

This guide will help you set up the complete system with Node.js backend and MySQL database.

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites Check

Open PowerShell and verify:

```powershell
# Check Node.js
node --version
# Should show v14.x.x or higher

# Check npm
npm --version
# Should show 6.x.x or higher

# Check MySQL
mysql --version
# Should show MySQL version
```

If any are missing, install them first (see Detailed Setup below).

---

## 📦 Installation Steps

### Step 1: Install Backend Dependencies

```powershell
cd "d:\c programming\connectomedia-website\backend"
npm install
```

Wait for installation to complete (~1-2 minutes).

### Step 2: Setup MySQL Database

**Option A: Using MySQL Command Line**

```powershell
# Login to MySQL
mysql -u root -p
# Enter your MySQL password

# Create database
CREATE DATABASE connectomedia_db;

# Verify
SHOW DATABASES;

# Exit
exit;
```

**Option B: Using SQL File**

```powershell
# Navigate to backend folder
cd "d:\c programming\connectomedia-website\backend"

# Run setup script
mysql -u root -p < database-setup.sql
# Enter your MySQL password when prompted
```

### Step 3: Configure Environment

```powershell
# Copy example env file
cd "d:\c programming\connectomedia-website\backend"
copy .env.example .env

# Edit .env file with your MySQL password
notepad .env
```

Update this line in `.env`:
```
DB_PASSWORD=your_mysql_password_here
```

Save and close.

### Step 4: Start Backend Server

```powershell
cd "d:\c programming\connectomedia-website\backend"
npm start
```

You should see:
```
✅ Database connected successfully!
✅ Database tables initialized successfully!
🚀 Server is running!
📡 API Server: http://localhost:3000
```

**Keep this terminal window open!**

### Step 5: Open Frontend

Open a **NEW** PowerShell window:

```powershell
cd "d:\c programming\connectomedia-website"

# If you have Live Server extension in VS Code, just open index.html
# Or use Python's simple server:
python -m http.server 5500
```

Open browser: `http://localhost:5500`

---

## ✅ Testing the Connection

1. **Open your website** in browser
2. **Scroll to Contact Form**
3. **Fill in the form:**
   - Name: Test User
   - Email: test@example.com
   - Company: Test Company
   - Message: Testing backend connection

4. **Click "Send Message"**

5. **You should see:**
   - Success message on the website
   - Log in backend terminal showing the request
   - Data saved in MySQL database

6. **Verify in database:**

```powershell
# Open MySQL
mysql -u root -p

# Check data
USE connectomedia_db;
SELECT * FROM contact_messages;
```

You should see your test message!

---

## 🔧 Detailed Setup (If Prerequisites Missing)

### Install Node.js

1. Download from: https://nodejs.org/
2. Choose LTS version (recommended)
3. Run installer
4. Verify: `node --version`

### Install MySQL

**Windows:**

1. Download MySQL Installer: https://dev.mysql.com/downloads/installer/
2. Choose "mysql-installer-community"
3. Run installer
4. Select "Developer Default"
5. **Important:** Set a root password (remember this!)
6. Complete installation
7. MySQL will start automatically

**Verify MySQL is running:**

```powershell
# Check service
Get-Service MySQL*

# Should show "Running"
```

---

## 📁 Project Structure

```
connectomedia-website/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── routes/
│   │   └── contact.js           # API routes
│   ├── .env                     # Your config (DO NOT COMMIT)
│   ├── .env.example             # Example config
│   ├── server.js                # Main server file
│   ├── package.json             # Dependencies
│   └── README.md                # Backend docs
├── index.html                   # Frontend
├── script.js                    # Frontend JS (updated)
├── styles.css                   # Frontend CSS (updated)
└── SETUP-GUIDE.md              # This file
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to database"

**Check:**
```powershell
# Is MySQL running?
Get-Service MySQL*

# Start if stopped
Start-Service MySQL80  # or your MySQL service name
```

**Verify credentials:**
- Open `.env` file
- Check `DB_PASSWORD` matches your MySQL password
- Try logging in manually: `mysql -u root -p`

### Issue 2: "Port 3000 already in use"

**Solution:**
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace 1234 with actual PID)
taskkill /PID 1234 /F

# Or change port in .env file
PORT=3001
```

### Issue 3: "Module not found"

**Solution:**
```powershell
cd "d:\c programming\connectomedia-website\backend"
rm -r node_modules
npm install
```

### Issue 4: "CORS error in browser"

**Solution:**
- Make sure backend is running
- Check `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://127.0.0.1:5500`

### Issue 5: Form submits but no data in database

**Check:**
1. Backend terminal for errors
2. Browser console (F12) for errors
3. Database connection:
   ```sql
   USE connectomedia_db;
   SHOW TABLES;
   DESCRIBE contact_messages;
   ```

---

## 🎯 Next Steps

### For Development:

1. **Use nodemon for auto-restart:**
   ```powershell
   npm run dev
   ```

2. **View all messages:**
   ```
   GET http://localhost:3000/api/contact
   ```

3. **Test API with Postman:**
   - Download Postman: https://www.postman.com/downloads/
   - Import the API endpoints
   - Test each endpoint

### For Production:

1. Use environment variables (not .env file)
2. Enable HTTPS
3. Add authentication for admin routes
4. Set up proper error logging
5. Add rate limiting
6. Use a production database (not localhost)

---

## 📞 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages (admin) |
| GET | `/api/contact/:id` | Get single message |

---

## 🔐 Security Checklist

- ✅ `.env` file is in `.gitignore`
- ✅ Strong MySQL password used
- ✅ Input validation enabled
- ✅ SQL injection prevention (prepared statements)
- ⚠️ Add authentication for admin routes
- ⚠️ Add rate limiting in production
- ⚠️ Use HTTPS in production

---

## 📚 Learn More

- **Backend Documentation:** `backend/README.md`
- **Express.js:** https://expressjs.com/
- **MySQL:** https://dev.mysql.com/doc/
- **Node.js:** https://nodejs.org/docs/

---

## ✨ Success!

If you can:
1. ✅ Submit the contact form
2. ✅ See success message
3. ✅ Find data in MySQL database

**Congratulations! Your backend is fully connected!** 🎉

---

**Need help?** Check the troubleshooting section or review the backend README.md file.
