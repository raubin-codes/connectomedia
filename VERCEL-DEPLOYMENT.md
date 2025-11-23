# 🚀 Deploy to Vercel (No Local MySQL Needed!)

## Complete Guide: GitHub → Vercel → Live Website

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Your code pushed to GitHub

---

## 🎯 Deployment Steps

### **Step 1: Push to GitHub**

```powershell
cd "d:\c programming\connectomedia-website"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (create repo on GitHub first)
git remote add origin https://github.com/YOUR_USERNAME/connectomedia-website.git

# Push
git branch -M main
git push -u origin main
```

---

### **Step 2: Deploy Frontend**

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import `connectomedia-website` repository
5. Configure:
   - Root Directory: `./`
   - Framework: Other
6. Click "Deploy"

**Frontend URL:** `https://your-project.vercel.app`

---

### **Step 3: Deploy Backend**

1. Click "Add New Project" again
2. Import SAME repository
3. Configure:
   - **Root Directory: `backend`** ← Important!
   - Framework: Other
4. Click "Deploy"

**Backend URL:** `https://your-backend.vercel.app`

---

### **Step 4: Add Database**

#### **Option A: Vercel Postgres (Recommended)**

1. In backend project → "Storage" tab
2. Click "Create Database"
3. Select "Postgres"
4. Click "Create"
5. **Done!** Environment variables auto-added

#### **Option B: Supabase (Alternative)**

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string
4. Add to Vercel environment variables

---

### **Step 5: Update Backend to Use Postgres**

**Rename files:**

```powershell
# In backend folder
mv server.js server-mysql.js
mv server-postgres.js server.js

mv config/database.js config/database-mysql.js
mv config/database-postgres.js config/database.js

mv routes/contact.js routes/contact-mysql.js
mv routes/contact-postgres.js routes/contact.js
```

**Push changes:**

```powershell
git add .
git commit -m "Switch to Postgres for Vercel"
git push
```

Vercel auto-deploys! ✅

---

### **Step 6: Update Frontend API URL**

In `script.js`, update:

```javascript
// Change from:
const API_URL = 'http://localhost:3000/api/contact';

// To:
const API_URL = 'https://your-backend.vercel.app/api/contact';
```

**Push changes:**

```powershell
git add .
git commit -m "Update API URL"
git push
```

---

### **Step 7: Configure Environment Variables**

In Vercel backend project:

1. Settings → Environment Variables
2. Add:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```

If using Vercel Postgres, these are auto-added:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

---

## ✅ Testing

1. Visit your frontend: `https://your-project.vercel.app`
2. Fill contact form
3. Submit
4. Check Vercel backend logs for confirmation
5. View data in Vercel Storage dashboard

---

## 🎯 Alternative: Use MySQL in Cloud

If you prefer MySQL over Postgres:

### **Option 1: PlanetScale**

1. Go to [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Add to Vercel environment variables:
   ```
   DB_HOST=aws.connect.psdb.cloud
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=connectomedia
   DB_PORT=3306
   ```
5. Use original `server.js` (MySQL version)

### **Option 2: Railway MySQL**

1. Go to [railway.app](https://railway.app)
2. Create MySQL database
3. Copy connection details
4. Add to Vercel environment variables

---

## 📁 File Structure for Vercel

```
connectomedia-website/
├── backend/
│   ├── config/
│   │   ├── database.js (Postgres)
│   │   └── database-mysql.js (backup)
│   ├── routes/
│   │   ├── contact.js (Postgres)
│   │   └── contact-mysql.js (backup)
│   ├── server.js (Postgres)
│   ├── server-mysql.js (backup)
│   ├── vercel.json
│   └── package.json
├── index.html
├── script.js (with Vercel API URL)
└── styles.css
```

---

## 🐛 Troubleshooting

### Issue: "Database connection failed"

**Solution:**
- Check environment variables in Vercel
- Verify database is created
- Check Vercel logs

### Issue: "CORS error"

**Solution:**
- Add `FRONTEND_URL` environment variable
- Or change CORS to `origin: '*'` for testing

### Issue: "Module not found"

**Solution:**
- Check `package.json` has all dependencies
- Redeploy backend

---

## 🎉 Success!

Your website is now:
- ✅ Hosted on Vercel (free)
- ✅ Backend running serverless
- ✅ Database in cloud (no local MySQL)
- ✅ Auto-deploys on git push
- ✅ HTTPS enabled
- ✅ Global CDN

**No local setup needed!** 🚀

---

## 📊 Comparison

| Setup | Local MySQL | Vercel Postgres |
|-------|-------------|-----------------|
| Setup Time | 30 min | 5 min |
| Cost | Free | Free tier |
| Maintenance | Manual | Automatic |
| Scalability | Limited | Auto-scales |
| Backups | Manual | Automatic |
| SSL | Manual | Built-in |

---

## 🔗 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [PlanetScale](https://planetscale.com)
- [Supabase](https://supabase.com)

---

**Need help?** Check Vercel deployment logs or contact support!
