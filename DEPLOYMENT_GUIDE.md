# 🚀 PANDUAN DEPLOYMENT: GitHub + Vercel + Supabase

Panduan lengkap untuk deploy sistem cafe ke production.

---

## 📋 PERSIAPAN

### Yang Anda Butuhkan:
1. ✅ Akun GitHub (gratis) - https://github.com
2. ✅ Akun Vercel (gratis) - https://vercel.com
3. ✅ Akun Supabase (gratis) - https://supabase.com
4. ✅ Git terinstall di komputer

---

## LANGKAH 1: SETUP GITHUB

### 1.1 Cek Git Version
```bash
git --version
```

Jika belum ada, install:
```bash
brew install git
```

### 1.2 Inisialisasi Git Repository

Di terminal, jalankan di folder project:

```bash
# Inisialisasi git
git init

# Tambah semua file
git add .

# Commit pertama
git commit -m "Initial commit - Sistem Cafe Management"
```

### 1.3 Buat Repository di GitHub

1. Buka https://github.com
2. Klik tombol **"New"** atau **"+"** → **"New repository"**
3. Isi informasi:
   - **Repository name:** `cafe-management-system`
   - **Description:** `Sistem manajemen cafe dengan POS, Kitchen Display, dan inventory`
   - **Visibility:** Private (recommended) atau Public
   - **JANGAN** centang "Initialize with README" (sudah ada)
4. Klik **"Create repository"**

### 1.4 Push ke GitHub

Setelah repository dibuat, GitHub akan tampilkan command. Jalankan:

```bash
# Tambah remote origin (ganti USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/USERNAME/cafe-management-system.git

# Rename branch ke main
git branch -M main

# Push ke GitHub
git push -u origin main
```

**✅ SELESAI!** Repository sudah di GitHub.

---

## LANGKAH 2: SETUP SUPABASE (DATABASE)

### 2.1 Buat Project di Supabase

1. Buka https://supabase.com
2. Klik **"Start your project"** atau **"New project"**
3. Pilih atau buat Organization
4. Isi informasi project:
   - **Name:** `cafe-management`
   - **Database Password:** `BuatPasswordKuat123!` (SIMPAN INI!)
   - **Region:** Southeast Asia (Singapore) - terdekat dengan Indonesia
   - **Pricing Plan:** Free
5. Klik **"Create new project"**
6. Tunggu 2-3 menit (setup database)

### 2.2 Dapatkan Database Connection String

Setelah project ready:

1. Di dashboard Supabase, klik **"Project Settings"** (icon gear)
2. Klik **"Database"** di sidebar
3. Scroll ke bawah ke **"Connection string"**
4. Pilih **"URI"** atau **"Connection pooling"** (recommended)
5. Copy connection string, contoh:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
   ```
6. Ganti `[YOUR-PASSWORD]` dengan password yang Anda buat tadi

### 2.3 Run Database Schema di Supabase

1. Di dashboard Supabase, klik **"SQL Editor"** di sidebar
2. Klik **"New query"**
3. Buka file `database/cafe_db_complete.sql` di project Anda
4. Copy semua isinya
5. Paste ke SQL Editor Supabase
6. Klik **"Run"**
7. Tunggu sampai selesai (akan create semua table)

**✅ Database Ready!**

### 2.4 Verifikasi Table Sudah Dibuat

1. Klik **"Table Editor"** di sidebar Supabase
2. Anda harus lihat semua table:
   - users
   - customers
   - suppliers
   - categories
   - menus
   - tables
   - orders
   - order_items
   - income
   - expenses
   - Dan lainnya...

---

## LANGKAH 3: SETUP ENVIRONMENT VARIABLES

### 3.1 Buat File .env.production

Di project folder, buat file `.env.production`:

```bash
# SUPABASE DATABASE
# Format untuk Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres"
DB_HOST="db.xxxxxxxxxxxx.supabase.co"
DB_PORT="5432"
DB_USER="postgres"
DB_PASSWORD="[YOUR-PASSWORD]"
DB_NAME="postgres"

# SESSION SECRET (generate random string)
SESSION_SECRET="generate-random-string-here-min-32-characters"

# NEXT.js
NEXT_PUBLIC_API_URL="https://your-app-name.vercel.app"
```

**PENTING:** Ganti dengan data Supabase Anda!

### 3.2 Generate Session Secret

Jalankan di terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy hasilnya dan paste ke `SESSION_SECRET`.

---

## LANGKAH 4: UPDATE KONFIGURASI DATABASE

### 4.1 Update lib/db.js untuk Supabase

Buat file baru atau update `lib/db.js`:

```javascript
import mysql from 'mysql2/promise';

// Untuk development (local MySQL)
const localConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cafe_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Untuk production (Supabase PostgreSQL)
// Supabase menggunakan PostgreSQL, bukan MySQL
// Kita perlu update ini ke pg (PostgreSQL client)

const pool = mysql.createPool(localConfig);

export default pool;
```

**CATATAN PENTING:** 
Supabase menggunakan **PostgreSQL**, sedangkan project ini menggunakan **MySQL**. 

Ada 2 opsi:
1. **Migrate ke PostgreSQL** (recommended untuk Supabase)
2. **Deploy MySQL ke Railway/PlanetScale** (lebih mudah, tidak perlu ubah code)

Saya sarankan **Opsi 2** untuk lebih mudah!

---

## ALTERNATIF: GUNAKAN RAILWAY UNTUK MYSQL

### Kenapa Railway?
- ✅ Support MySQL langsung (tidak perlu migrasi)
- ✅ Free tier tersedia
- ✅ Setup sangat mudah
- ✅ Compatible dengan code yang sudah ada

### Setup Railway MySQL:

1. Buka https://railway.app
2. Sign up dengan GitHub
3. Klik **"New Project"**
4. Pilih **"Provision MySQL"**
5. Tunggu beberapa detik
6. Klik database yang baru dibuat
7. Klik tab **"Connect"**
8. Copy **"MySQL Connection URL"**
9. Copy **individual credentials** (Host, Port, User, Password, Database)

### Environment Variables untuk Railway:

```bash
# RAILWAY MYSQL
DATABASE_URL="mysql://root:password@containers-us-west-xxx.railway.app:6379/railway"
DB_HOST="containers-us-west-xxx.railway.app"
DB_PORT="6379"
DB_USER="root"
DB_PASSWORD="xxxxxxxxxxxxx"
DB_NAME="railway"

# SESSION SECRET
SESSION_SECRET="your-random-secret-here"

# NEXT.js
NEXT_PUBLIC_API_URL="https://your-app.vercel.app"
```

### Import Database ke Railway:

1. Di Railway dashboard, klik database Anda
2. Klik tab **"Data"**
3. Klik **"Query"**
4. Copy paste isi file `database/cafe_db_complete.sql`
5. Execute

**✅ Database MySQL Ready di Cloud!**

---

## LANGKAH 5: DEPLOY KE VERCEL

### 5.1 Push Code Terbaru ke GitHub

```bash
git add .
git commit -m "Add production config"
git push
```

### 5.2 Deploy di Vercel

1. Buka https://vercel.com
2. Sign up/Login dengan GitHub
3. Klik **"Add New"** → **"Project"**
4. Import repository `cafe-management-system`
5. Vercel akan auto-detect Next.js
6. **JANGAN** klik Deploy dulu!

### 5.3 Setup Environment Variables di Vercel

Di halaman project setup:

1. Expand **"Environment Variables"**
2. Tambahkan satu per satu:

```
DATABASE_URL = mysql://root:password@host:port/database
DB_HOST = your-railway-host
DB_PORT = 6379
DB_USER = root
DB_PASSWORD = your-password
DB_NAME = railway
SESSION_SECRET = your-random-secret
NEXT_PUBLIC_API_URL = https://your-app.vercel.app
```

3. Pastikan semua variable ditambahkan
4. Klik **"Deploy"**

### 5.4 Tunggu Deployment

- Vercel akan build project (2-3 menit)
- Jika sukses, Anda akan dapat URL: `https://cafe-management-xxx.vercel.app`
- Buka URL tersebut dan test!

---

## LANGKAH 6: UPDATE NEXT_PUBLIC_API_URL

Setelah dapat URL dari Vercel:

1. Copy URL Vercel Anda (contoh: `https://cafe-management-abc123.vercel.app`)
2. Di Vercel dashboard, buka project Anda
3. Klik **"Settings"**
4. Klik **"Environment Variables"**
5. Edit `NEXT_PUBLIC_API_URL` dengan URL Vercel Anda
6. Save
7. Klik **"Deployments"**
8. Klik titik tiga di deployment terakhir → **"Redeploy"**

---

## LANGKAH 7: TESTING

### Test Login:
1. Buka `https://your-app.vercel.app/login`
2. Login dengan:
   - Username: `admin`
   - Password: `Admin@123`
3. Jika berhasil login → **SUCCESS!** ✅

### Test Fitur:
1. Buka Master Data → Produk
2. Coba tambah produk baru
3. Test POS Kasir
4. Test Kitchen Display

---

## 📊 MONITORING & MAINTENANCE

### Vercel Dashboard:
- Lihat deployment logs
- Monitor traffic
- Check errors

### Railway/Supabase:
- Monitor database usage
- Check connection limits
- Backup database

### GitHub:
- Push updates dengan `git push`
- Vercel akan auto-deploy setiap push ke main branch

---

## 🔄 UPDATE CODE (FUTURE)

Setiap kali ada perubahan:

```bash
# Tambah perubahan
git add .

# Commit dengan pesan jelas
git commit -m "Add new feature: X"

# Push ke GitHub
git push

# Vercel akan otomatis deploy!
```

---

## 🆘 TROUBLESHOOTING

### Error: Database Connection Failed
- Cek environment variables di Vercel
- Pastikan DB_HOST, DB_PORT, DB_USER, DB_PASSWORD benar
- Cek database masih aktif di Railway/Supabase

### Error: Module Not Found
- Pastikan semua dependencies di `package.json`
- Re-deploy di Vercel

### Error: API Routes Not Working
- Cek environment variables
- Cek logs di Vercel dashboard

### Database Tables Empty
- Import ulang `cafe_db_complete.sql`
- Cek apakah query berhasil dijalankan

---

## 💰 BIAYA

### Free Tier Limits:

**Vercel Free:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions

**Railway Free:**
- ✅ $5 credit/month
- ✅ MySQL database
- ✅ Cukup untuk cafe kecil

**Supabase Free:**
- ✅ 500MB database
- ✅ 2GB bandwidth
- ✅ 50,000 monthly active users

**Total: GRATIS** untuk start! 🎉

---

## 📝 CHECKLIST DEPLOYMENT

- [ ] Repository di GitHub
- [ ] Database di Railway/Supabase
- [ ] Schema database di-import
- [ ] Environment variables di Vercel
- [ ] Deploy ke Vercel
- [ ] Test login berhasil
- [ ] Test semua fitur utama
- [ ] Domain custom (opsional)

---

## 🎯 NEXT STEPS (OPSIONAL)

### 1. Custom Domain
- Beli domain (Namecheap, GoDaddy, dll)
- Add domain di Vercel
- Update DNS records

### 2. SSL Certificate
- Otomatis dari Vercel (HTTPS)

### 3. Backup Database
- Setup automatic backup di Railway/Supabase
- Download backup manual secara berkala

### 4. Monitoring
- Setup Vercel Analytics
- Add error tracking (Sentry)

---

## 📞 SUPPORT

Jika ada masalah:
1. Check Vercel deployment logs
2. Check Railway/Supabase dashboard
3. Check browser console (F12)
4. Google error message

---

**SELAMAT! Sistem cafe Anda sekarang sudah online!** 🎉🚀

**URL Production:** https://your-app.vercel.app
**Dashboard:** https://vercel.com/dashboard
**Database:** https://railway.app/dashboard

---

**Tips:**
- Bookmark URL production
- Save credentials di password manager
- Regular backup database
- Monitor usage untuk tidak exceed free tier

**Developed with ❤️ by Kiro AI**
