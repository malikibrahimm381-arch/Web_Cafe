# 🔧 FIX LOGIN ERROR

## ❌ ERROR:
"Terjadi kesalahan server" saat login

## ✅ SOLUSI:

### 1. **Refresh Browser**
```
Hard Refresh:
- Chrome/Firefox: Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac)
- Safari: Cmd+Option+R
```

### 2. **Clear Browser Cache & Cookies**
```
Chrome/Edge:
1. F12 (Developer Tools)
2. Application tab
3. Clear storage
4. Refresh

Safari:
1. Cmd+Option+E
2. Refresh page
```

### 3. **Check Server**
Server harus running di: **http://localhost:3000**

Jika tidak, jalankan:
```bash
npm run dev
```

### 4. **Correct Login Credentials**

**PENTING: Special Characters harus EXACT!**

```
Username: admin
Special: !@#$%    ← COPY INI PERSIS!
Password: admin123
```

**Jangan ketik manual!** Copy-paste special characters dari sini: `!@#$%`

---

## 🔐 SEMUA LOGIN CREDENTIALS:

### Admin
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

## 🐛 TROUBLESHOOTING:

### Error: "Terjadi kesalahan server"
**Penyebab:**
1. Server mati
2. Database tidak connect
3. Special characters salah
4. Browser cache

**Solusi:**
1. Restart server: `npm run dev`
2. Clear browser cache
3. Copy-paste special characters (jangan ketik)
4. Hard refresh browser

### Error: "Username atau password salah"
**Solusi:**
- Pastikan username lowercase
- Special characters harus EXACT: `!@#$%`
- Copy-paste, jangan ketik manual

### Error: "Too many redirects"
**Solusi:**
1. Clear cookies: F12 → Application → Cookies → Delete all
2. Hard refresh: Cmd+Shift+R
3. Try login again

---

## ✅ CARA LOGIN YANG BENAR:

1. **Buka:** http://localhost:3000
2. **Clear browser cache** (Cmd+Shift+R)
3. **Isi form:**
   - Username: `admin` (ketik)
   - Special: `!@#$%` (COPY PASTE dari sini!)
   - Password: `admin123` (ketik)
4. **Click Login**
5. **Tunggu redirect** ke dashboard

---

## 🚀 SERVER STATUS:

✅ **Running:** http://localhost:3000
✅ **Port:** 3000
✅ **Status:** Ready

---

## 💡 TIPS:

1. **Selalu clear cache** setelah update code
2. **Copy-paste special characters** untuk akurasi
3. **Check console** (F12) untuk error detail
4. **Check server logs** di terminal untuk error

---

## 📞 JIKA MASIH ERROR:

1. **Restart server:**
```bash
# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Start server
npm run dev
```

2. **Clear everything:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

3. **Check database:**
```bash
# Run database setup
node scripts/setupCompleteDatabase.js
```

---

## ✅ SELESAI!

**Server:** http://localhost:3000 ✅
**Login:** admin / !@#$% / admin123 ✅

**COPY-PASTE SPECIAL CHARACTERS, JANGAN KETIK MANUAL!**
