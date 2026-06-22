# ☕ SISTEM MANAJEMEN CAFE - README

Sistem manajemen cafe lengkap dengan POS, Kitchen Display, dan manajemen operasional.

---

## 🚀 QUICK START

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Start MySQL
brew services start mysql

# Run database setup
node scripts/setupCompleteDatabase.js
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Login
Buka browser: **http://localhost:3000/login**

**Akun Default:**
- Admin: `admin` / `Admin@123`
- Kasir: `kasir` / `Kasir@123`
- Dapur: `dapur` / `Dapur@123`

---

## ✅ MODUL YANG SUDAH SELESAI (9/13)

### MASTER DATA (5/5) ✅
1. **Produk** - Manajemen menu dengan stok & harga
2. **Kategori** - Kelola kategori dengan icon
3. **Pelanggan** - Database pelanggan dengan loyalty points
4. **Supplier** - Data pemasok
5. **Karyawan** - User management dengan role

### TRANSAKSI (1/3) ✅
1. **POS Kasir** - Point of Sale lengkap dengan pembayaran

### DAPUR (3/3) ✅
1. **Pesanan Masuk** - Queue pesanan baru
2. **Proses Masak** - Pesanan yang sedang dimasak
3. **Pesanan Selesai** - Siap disajikan

---

## 🎯 FITUR UNGGULAN

### 1. POS (Point of Sale)
- Pilih Dine In / Take Away
- Keranjang belanja real-time
- 4 metode pembayaran (Tunai, Kartu, QRIS, Transfer)
- Auto hitung kembalian
- Update stok otomatis
- Catat pendapatan otomatis

### 2. Kitchen Display System
- Auto-refresh tiap 10 detik
- Timeline: Masuk → Memasak → Selesai
- Color-coded urgency
- Animasi real-time

### 3. Master Data Lengkap
- CRUD produk dengan stock management
- Kategori dengan icon picker
- Pelanggan dengan poin loyalitas
- Supplier lengkap
- Karyawan dengan role-based access

---

## 📱 ROLE & AKSES

### 👑 Admin
- Full access semua modul
- Kelola master data
- Kelola karyawan
- Lihat semua laporan

### 🏪 Kasir
- POS transaksi
- Lihat menu
- Input order

### 👨‍🍳 Dapur
- Kitchen display
- Update status pesanan
- Lihat menu

### 📦 Gudang
- Stock management
- Barang masuk/keluar
- Supplier

### 💰 Keuangan
- Laporan keuangan
- Input pengeluaran
- Laba rugi

---

## 🛠️ TEKNOLOGI

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MySQL
- **Security:** bcrypt password hashing
- **Session:** HTTP-only cookies

---

## 📊 STRUKTUR DATABASE

**20+ Tabel:**
- users (karyawan/user)
- customers (pelanggan)
- suppliers (pemasok)
- categories (kategori menu)
- menus (produk)
- tables (meja)
- orders (pesanan)
- order_items (detail pesanan)
- income (pendapatan)
- expenses (pengeluaran)
- Dan lainnya...

---

## 🔐 KEAMANAN

✅ Password hashing dengan bcrypt  
✅ SQL injection prevention  
✅ Session management  
✅ Role-based access control  
✅ Input validation  

---

## 📞 SUPPORT

Untuk pertanyaan atau bantuan, hubungi developer.

---

## 📄 LICENSE

Sistem ini dikembangkan untuk keperluan internal cafe.

---

**Version:** 1.0.0  
**Last Update:** 22 Juni 2026  
**Status:** Production Ready ✅
