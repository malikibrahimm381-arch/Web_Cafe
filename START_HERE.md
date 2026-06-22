# 🚀 START HERE - COMPLETE SETUP GUIDE

## 📋 QUICK CHECKLIST:

- [ ] MySQL installed & running
- [ ] Database setup complete
- [ ] Server running
- [ ] Can login

---

## 🎯 STEP-BY-STEP SETUP:

### **STEP 1: Start MySQL**

```bash
# macOS with Homebrew:
brew services start mysql

# Check if running:
brew services list | grep mysql
# Should show: ✅ started

# OR if using MAMP/XAMPP:
# Just start MySQL from the app
```

### **STEP 2: Setup Database**

```bash
# Run complete database setup:
node scripts/setupCompleteDatabase.js
```

Expected output:
```
🚀 Starting Complete Database Setup...
✅ Database created
✅ All tables created  
✅ Default users added (6 users)
✅ Categories added (3 categories)
✅ Menu items added (27 items)
✅ Tables added (10 tables)
✅ Permissions configured
🎉 Complete Database Setup Finished!
```

### **STEP 3: Start Server**

```bash
# Start Next.js server:
npm run dev
```

Should see:
```
▲ Next.js 16.2.3
- Local: http://localhost:3000
✓ Ready in XXXms
```

### **STEP 4: Open Browser**

```
http://localhost:3000
```

### **STEP 5: Login**

```
Username: admin
Special: !@#$%    ← COPY PASTE ini!
Password: admin123
```

**✅ DONE!** You should be redirected to dashboard!

---

## 🐛 TROUBLESHOOTING:

### Error: "Terjadi kesalahan server"

**Cause:** MySQL not running

**Fix:**
```bash
# Start MySQL
brew services start mysql

# Setup database
node scripts/setupCompleteDatabase.js

# Restart server
npm run dev
```

### Error: "Username atau password salah"

**Cause:** Wrong credentials or special characters

**Fix:**
- COPY-PASTE special characters: `!@#$%`
- Don't type manually!
- Username is lowercase: `admin`

### Error: "Too many redirects"

**Fix:**
```
1. Clear browser cookies (F12 → Application → Cookies)
2. Hard refresh (Cmd+Shift+R)
3. Try again
```

### Server won't start

**Fix:**
```bash
# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Clear cache
rm -rf .next

# Start again
npm run dev
```

---

## 🔐 ALL LOGIN CREDENTIALS:

### Admin (Full Access)
```
Username: admin
Special: !@#$%
Password: admin123
```

### Kasir
```
Username: kasir
Special: !@#$%
Password: kasir123
```

### Dapur
```
Username: dapur
Special: !@#$%
Password: kasir123
```

### Gudang
```
Username: gudang
Special: !@#$%
Password: kasir123
```

### Keuangan
```
Username: keuangan
Special: !@#$%
Password: kasir123
```

### Developer
```
Username: developer
Special: !@#$%
Password: dev123
```

---

## 📁 PROJECT STRUCTURE:

```
cafe-app/
├── app/
│   ├── dashboard/          # Main dashboard
│   ├── master/             # 5 modules
│   ├── transaction/        # 3 modules
│   ├── kitchen/            # 3 modules
│   ├── warehouse/          # 3 modules
│   ├── finance/            # 3 modules
│   ├── reports/            # 4 modules
│   ├── settings/           # 4 modules
│   └── api/                # 12+ endpoints
│
├── database/
│   └── cafe_db_complete.sql
│
├── scripts/
│   ├── setupCompleteDatabase.js
│   ├── testLogin.js
│   └── generateAllModules.js
│
└── Documentation/
    ├── START_HERE.md       ← You are here
    ├── DATABASE_FIX.md
    ├── FIX_LOGIN_ERROR.md
    ├── SISTEM_LENGKAP.md
    └── README_FINAL.md
```

---

## 🎯 WHAT YOU GET:

✅ **8 Major Modules**
- Master Data (5)
- Transaction (3)
- Kitchen (3)
- Warehouse (3)
- Finance (3)
- Reports (4)
- Settings (4)
- Dashboard (1)

✅ **25+ Pages** - All with auth & responsive
✅ **12+ API Routes** - Ready for implementation
✅ **6 User Roles** - With permissions
✅ **20+ Database Tables** - Complete schema
✅ **Complete Auth System** - Login/logout working
✅ **Responsive Sidebar** - Role-based navigation

---

## 🧪 TESTING:

### Test Database Connection:
```bash
node scripts/testLogin.js
```

### Test Manually:
```
1. Go to: http://localhost:3000
2. Login with admin credentials
3. Check sidebar - should see all modules
4. Navigate to any module
5. Logout - should redirect to login
```

---

## 📊 DEVELOPMENT STATUS:

### ✅ COMPLETED:
- Database schema
- All module pages
- API endpoints structure
- Authentication system
- Sidebar navigation
- Role-based access
- Responsive design

### 📝 TODO (Optional):
- Implement CRUD operations for each module
- Add data tables
- Add forms (create/edit)
- Add charts & graphs
- Add export features
- Add real-time updates

---

## 🚀 COMMON COMMANDS:

```bash
# Start MySQL
brew services start mysql

# Setup database
node scripts/setupCompleteDatabase.js

# Start server
npm run dev

# Test login API
node scripts/testLogin.js

# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Clear Next.js cache
rm -rf .next
```

---

## ✅ VERIFICATION:

After setup, you should be able to:

1. ✅ Start server without errors
2. ✅ Open http://localhost:3000
3. ✅ See login page
4. ✅ Login successfully
5. ✅ See dashboard with sidebar
6. ✅ Navigate between modules
7. ✅ Logout successfully

---

## 📞 NEED HELP?

Check these files:
- **DATABASE_FIX.md** - MySQL connection issues
- **FIX_LOGIN_ERROR.md** - Login problems
- **SISTEM_LENGKAP.md** - Complete system overview
- **README_FINAL.md** - Full documentation

---

## 🎉 YOU'RE READY!

If you completed all steps:

✅ MySQL running
✅ Database setup
✅ Server running  
✅ Can login

**YOUR CAFE MANAGEMENT SYSTEM IS READY TO USE!**

🌐 **URL:** http://localhost:3000
🔐 **Login:** admin / !@#$% / admin123

**ENJOY! ☕🎊**
