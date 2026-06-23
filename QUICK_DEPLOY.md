# ⚡ QUICK DEPLOY - 5 MENIT KE ONLINE!

Panduan cepat deploy sistem cafe dalam 5 menit.

---

## 🎯 LANGKAH CEPAT

### 1️⃣ GENERATE SESSION SECRET (30 detik)

```bash
npm run secret
```

Copy output, simpan untuk nanti.

---

### 2️⃣ PUSH KE GITHUB (1 menit)

```bash
# Jalankan deployment script
npm run deploy
```

Script akan otomatis:
- ✅ Initialize git (jika belum)
- ✅ Add semua file
- ✅ Commit changes
- ✅ Push ke GitHub

Saat diminta URL repository, masukkan:
```
https://github.com/USERNAME/cafe-management-system
```

---

### 3️⃣ SETUP DATABASE di RAILWAY (2 menit)

1. Buka https://railway.app
2. Sign up dengan GitHub
3. Klik **"New Project"** → **"Provision MySQL"**
4. Tunggu 10 detik
5. Klik database → tab **"Connect"**
6. Copy semua credentials:
   ```
   Host: containers-us-west-xxx.railway.app
   Port: 6543
   User: root
   Password: xxxxxxxxxxxxx
   Database: railway
   ```
7. Klik tab **"Data"** → **"Query"**
8. Copy paste isi file `database/cafe_db_complete.sql`
9. Execute ✅

---

### 4️⃣ DEPLOY ke VERCEL (2 menit)

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik **"Add New"** → **"Project"**
4. Import `cafe-management-system`
5. **Environment Variables** - tambahkan:

```bash
DATABASE_URL=mysql://root:password@host:port/railway
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=6543
DB_USER=root
DB_PASSWORD=xxxxxxxxxxxxx
DB_NAME=railway
SESSION_SECRET=hasil-dari-npm-run-secret
```

6. Klik **"Deploy"** ✅
7. Tunggu 2-3 menit
8. Dapat URL: `https://cafe-xxx.vercel.app` ✅

---

### 5️⃣ UPDATE API URL & TEST (30 detik)

1. Di Vercel, Settings → Environment Variables
2. Tambahkan:
   ```
   NEXT_PUBLIC_API_URL=https://cafe-xxx.vercel.app
   ```
3. Deployments → Redeploy
4. Buka `https://cafe-xxx.vercel.app/login`
5. Login: `admin` / `Admin@123`
6. **DONE!** 🎉

---

## 📋 CHECKLIST

- [ ] Generate session secret
- [ ] Push ke GitHub
- [ ] Setup MySQL di Railway
- [ ] Import database schema
- [ ] Deploy ke Vercel
- [ ] Setup environment variables
- [ ] Update NEXT_PUBLIC_API_URL
- [ ] Test login berhasil

---

## 🔑 CREDENTIALS DEFAULT

**Admin:**
- Username: `admin`
- Password: `Admin@123`

**Kasir:**
- Username: `kasir`
- Password: `Kasir@123`

**Dapur:**
- Username: `dapur`
- Password: `Dapur@123`

---

## 📞 JIKA ADA MASALAH

### Database Connection Error?
- Cek environment variables di Vercel
- Pastikan Railway database masih aktif
- Cek credentials benar

### Build Error di Vercel?
- Cek logs di Vercel dashboard
- Pastikan semua dependencies ada
- Coba deploy ulang

### Login Tidak Bisa?
- Cek database sudah di-import
- Cek table `users` ada data
- Cek environment variables

---

## 🎉 SELESAI!

**URL Production:** https://your-app.vercel.app
**Vercel Dashboard:** https://vercel.com/dashboard
**Railway Dashboard:** https://railway.app/dashboard

---

## 🚀 UPDATE NANTI

Untuk update code:

```bash
git add .
git commit -m "Update fitur X"
git push
```

Vercel auto-deploy! ✅

---

**GRATIS 100%** dengan:
- ✅ Vercel Free (hosting)
- ✅ Railway Free ($5/month credit)
- ✅ GitHub Free

**Total waktu:** 5-10 menit
**Biaya:** $0

---

Baca `DEPLOYMENT_GUIDE.md` untuk panduan detail!
