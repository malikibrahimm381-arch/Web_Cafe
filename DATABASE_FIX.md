# 🗄️ DATABASE FIX - MYSQL NOT RUNNING

## ❌ ERROR:
```
Error: ECONNREFUSED
Login error: code: 'ECONNREFUSED'
```

## 🎯 ROOT CAUSE:
**MySQL server tidak running!**

---

## ✅ SOLUSI:

### **macOS - Start MySQL:**

#### Option 1: Homebrew
```bash
# Start MySQL
brew services start mysql

# Check status
brew services list
```

#### Option 2: MySQL.app
```bash
# If using MySQL.app
sudo /usr/local/mysql/support-files/mysql.server start
```

#### Option 3: MAMP/XAMPP
```
1. Buka MAMP atau XAMPP
2. Start MySQL server
3. Pastikan port 3306
```

---

### **Check MySQL Status:**

```bash
# Check if MySQL is running
ps aux | grep mysql

# Try to connect
mysql -u root -p

# If successful, you'll see:
# mysql>
```

---

### **Setup Database:**

Setelah MySQL running:

```bash
# Run setup script
node scripts/setupCompleteDatabase.js
```

Expected output:
```
🚀 Starting Complete Database Setup...
✅ Database created
✅ All tables created
✅ Default users added
✅ Menu items added
🎉 Complete Database Setup Finished!
```

---

## 🔧 ALTERNATIVE: SQLite (Easier)

Jika MySQL susah di-setup, kita bisa gunakan SQLite:

### Install SQLite:
```bash
npm install better-sqlite3
```

### Update `lib/db.js`:
```javascript
// Ganti MySQL dengan SQLite
const Database = require('better-sqlite3');
const db = new Database('cafe.db');
```

**Tapi untuk production, MySQL lebih direkomendasikan!**

---

## 📋 CHECKLIST:

- [ ] MySQL installed
- [ ] MySQL service running
- [ ] Can connect: `mysql -u root -p`
- [ ] Database created
- [ ] Tables created
- [ ] Default data inserted
- [ ] Server can connect to database

---

## 🧪 TEST CONNECTION:

### Test 1: Direct MySQL
```bash
mysql -u root -p
# Enter password
# Should see: mysql>

# Check databases
SHOW DATABASES;

# Check cafe_db
USE cafe_db;
SHOW TABLES;
```

### Test 2: Node.js Connection
```bash
node -e "
const mysql = require('mysql2/promise');
mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
}).then(() => {
  console.log('✅ MySQL Connected!');
  process.exit(0);
}).catch(err => {
  console.log('❌ Connection Failed:', err.message);
  process.exit(1);
});
"
```

### Test 3: Login API
```bash
node scripts/testLogin.js
```

---

## ⚙️ ENV FILE:

Check `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cafe_db
```

Update sesuai dengan MySQL setup Anda!

---

## 🚀 QUICK START:

### Jika MySQL sudah installed:

```bash
# 1. Start MySQL
brew services start mysql

# 2. Setup database
node scripts/setupCompleteDatabase.js

# 3. Start server
npm run dev

# 4. Test login
# Go to: http://localhost:3000
# Login: admin / !@#$% / admin123
```

---

## 💡 ALTERNATIVE - Use Existing Database:

Jika Anda sudah punya database cafe_db yang lama:

```bash
# Backup dulu (optional)
mysqldump -u root -p cafe_db > backup_old.sql

# Drop old database
mysql -u root -p -e "DROP DATABASE IF EXISTS cafe_db;"

# Setup new complete database
node scripts/setupCompleteDatabase.js
```

---

## ✅ VERIFICATION:

Setelah MySQL running dan database setup:

1. **Check server logs** - Tidak ada error ECONNREFUSED
2. **Test login** - Login berhasil
3. **Check response** - Dapat cookie dan redirect

---

## 📞 MASIH ERROR?

### Check these:

1. **MySQL running?**
   ```bash
   brew services list | grep mysql
   # Should show: started
   ```

2. **Port 3306 available?**
   ```bash
   lsof -i:3306
   # Should show mysql process
   ```

3. **Credentials correct?**
   Check `.env.local` matches your MySQL setup

4. **Database exists?**
   ```bash
   mysql -u root -p -e "SHOW DATABASES LIKE 'cafe_db';"
   ```

---

## 🎯 SUMMARY:

**Problem:** MySQL not running  
**Solution:** Start MySQL + Setup database  
**Commands:**  
```bash
brew services start mysql
node scripts/setupCompleteDatabase.js
npm run dev
```

**AFTER THIS, LOGIN SHOULD WORK!** ✅
