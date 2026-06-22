# Setup Guide - Cafe App

## Langkah-langkah Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database MariaDB/MySQL

#### A. Buat Database
```bash
# Login ke MySQL/MariaDB
mysql -u root -p

# Atau jika tidak ada password
mysql -u root
```

#### B. Import Database
```bash
# Keluar dari MySQL terlebih dahulu, lalu:
mysql -u root -p < database/cafe_db.sql

# Atau dari dalam MySQL:
source /path/to/cafe-app/database/cafe_db.sql
```

#### C. Verifikasi Database
```sql
USE cafe_db;
SHOW TABLES;
SELECT * FROM users;
```

### 3. Konfigurasi Environment Variables

Edit file `.env.local`:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=cafe_db
DB_PORT=3306

# JWT Secret (ganti dengan random string)
JWT_SECRET=your-secret-key-here-change-in-production

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**PENTING**: Ganti `DB_PASSWORD` dengan password MySQL Anda!

### 4. Test Koneksi Database

Buat file test sederhana:

```javascript
// test-db.js
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    
    console.log('✅ Database connected successfully!');
    
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM users');
    console.log(`✅ Found ${rows[0].count} users in database`);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

testConnection();
```

Jalankan:
```bash
node test-db.js
```

### 5. Jalankan Aplikasi

```bash
npm run dev
```

Buka browser: `http://localhost:3000`

## Default Login Credentials

### Admin
- **Username**: `admin`
- **Special Chars**: `!@#$%`
- **Password**: `admin123`
- **Access**: Dashboard, Kelola Menu, Statistik

### Kasir
- **Username**: `kasir`
- **Special Chars**: `!@#$%`
- **Password**: `kasir123`
- **Access**: Proses Order, Pembayaran

### Developer
- **Username**: `developer`
- **Special Chars**: `!@#$%`
- **Password**: `dev123`
- **Access**: Full Access

## Troubleshooting

### Error: Cannot connect to database

**Solusi**:
1. Pastikan MySQL/MariaDB sudah running
2. Cek username dan password di `.env.local`
3. Pastikan database `cafe_db` sudah dibuat
4. Cek port MySQL (default: 3306)

```bash
# Cek status MySQL
# macOS (Homebrew)
brew services list

# Linux
sudo systemctl status mysql

# Windows
# Cek di Services
```

### Error: Table doesn't exist

**Solusi**:
Import ulang database:
```bash
mysql -u root -p cafe_db < database/cafe_db.sql
```

### Error: Login failed

**Solusi**:
1. Pastikan format login benar: `username + special_chars + password`
2. Regenerate password hash:
```bash
node scripts/generatePassword.js
```
3. Update hash di database

### Port 3000 already in use

**Solusi**:
```bash
# Jalankan di port lain
PORT=3001 npm run dev

# Atau kill process di port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Generate Password Baru

Jika ingin membuat user baru atau ganti password:

```bash
node scripts/generatePassword.js
```

Atau manual:

```javascript
const bcrypt = require('bcryptjs');

async function generate() {
  const username = 'newuser';
  const specialChars = '!@#$%';
  const password = 'newpass123';
  
  const combined = `${username}${specialChars}${password}`;
  const hash = await bcrypt.hash(combined, 10);
  
  console.log('Hash:', hash);
}

generate();
```

## Production Deployment

### 1. Update Environment Variables
```env
DB_HOST=your_production_host
DB_USER=your_production_user
DB_PASSWORD=your_production_password
DB_NAME=cafe_db
JWT_SECRET=generate-strong-random-secret
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. Build Application
```bash
npm run build
```

### 3. Start Production Server
```bash
npm start
```

### 4. Atau Deploy ke Vercel
```bash
npm install -g vercel
vercel
```

**Note**: Untuk Vercel, gunakan PlanetScale atau MySQL hosting lain karena Vercel tidak support MySQL langsung.

## Fitur Tambahan (Opsional)

### QR Code untuk Meja

Install library tambahan:
```bash
npm install qrcode
```

Generate QR Code untuk setiap meja dan simpan di database.

### Upload Gambar Menu

Install library:
```bash
npm install multer
```

Implementasi upload file untuk gambar menu.

### Export PDF

Install library:
```bash
npm install jspdf jspdf-autotable
```

Untuk cetak katalog menu dan laporan.

## Support

Jika ada masalah, cek:
1. Console browser (F12) untuk error frontend
2. Terminal untuk error backend
3. MySQL logs untuk error database

Happy coding! ☕
