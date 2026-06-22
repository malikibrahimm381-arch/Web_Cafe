# User Guide - Cafe App

Panduan lengkap penggunaan aplikasi untuk setiap role pengguna.

---

## 👥 Role & Akses

### 1. Customer (Tanpa Login)
**Akses**: Homepage, Lihat Menu
**Tidak Bisa**: Order, Pembayaran, Dashboard

### 2. Kasir
**Akses**: POS System, Proses Order, Pembayaran
**Tidak Bisa**: Kelola Menu, Dashboard Admin

### 3. Admin
**Akses**: Dashboard, Statistik, Kelola Menu
**Tidak Bisa**: Proses Order (gunakan role Kasir)

### 4. Developer
**Akses**: Full Access (semua fitur)

---

## 🏠 Customer - Melihat Menu

### Langkah-langkah:

1. **Buka Homepage**
   - Akses: `http://localhost:3000`
   - Tidak perlu login

2. **Lihat Menu**
   - Scroll untuk melihat semua menu
   - Setiap card menampilkan:
     - Nama menu
     - Deskripsi
     - Harga
     - Kategori

3. **Filter Menu**
   - Klik tombol kategori di atas menu grid
   - Pilihan: Semua, Makanan, Minuman, Snack
   - Menu akan difilter otomatis

4. **Informasi Menu**
   - Harga dalam format Rupiah
   - Status ketersediaan (hanya menu available yang tampil)

### Tips:
- Menu diupdate real-time oleh admin
- Gunakan filter untuk cari menu lebih cepat
- Scan QR Code di meja untuk akses langsung (future feature)

---

## 💰 Kasir - Proses Order & Pembayaran

### Login Kasir

1. **Akses Login**
   - Klik tombol "Login" di homepage
   - Atau akses: `http://localhost:3000/login`

2. **Input Credentials**
   ```
   Username: kasir
   Special Chars: !@#$%
   Password: kasir123
   ```

3. **Submit**
   - Klik "Login"
   - Akan redirect ke `/kasir`

### Membuat Order Baru

#### A. Pilih Tipe Order

1. **Dine In**
   - Untuk customer makan di tempat
   - Wajib pilih nomor meja
   - Meja akan otomatis status "occupied"

2. **Take Away**
   - Untuk customer bawa pulang
   - Tidak perlu pilih meja

#### B. Input Data Customer (Opsional)

- Masukkan nama customer
- Berguna untuk panggil order
- Bisa dikosongkan

#### C. Tambah Menu ke Keranjang

1. **Pilih Kategori** (opsional)
   - Filter menu by kategori
   - Atau lihat semua menu

2. **Klik Menu**
   - Klik card menu untuk tambah ke keranjang
   - Otomatis quantity = 1

3. **Atur Quantity**
   - Tombol `-` untuk kurangi
   - Tombol `+` untuk tambah
   - Quantity 0 = hapus dari keranjang

4. **Lihat Total**
   - Total otomatis dihitung
   - Tampil di sidebar kanan

#### D. Pilih Metode Pembayaran

**1. Tunai**
- Pilih "Tunai"
- Input jumlah uang yang dibayar
- Sistem otomatis hitung kembalian
- Validasi: jumlah bayar harus >= total

**2. Non Tunai**
- Pilih "Non Tunai"
- Tidak perlu input jumlah
- Kembalian = 0

#### E. Proses Order

1. **Klik "Proses Order"**
   - Validasi otomatis:
     - Keranjang tidak boleh kosong
     - Meja harus dipilih (jika Dine In)
     - Jumlah bayar cukup (jika Tunai)

2. **Konfirmasi**
   - Popup menampilkan:
     - Nomor order
     - Total pembayaran
     - Kembalian
   - Klik OK

3. **Reset Form**
   - Keranjang dikosongkan
   - Form direset
   - Siap untuk order berikutnya

### Contoh Skenario

**Skenario 1: Dine In - Tunai**
```
1. Pilih "Dine In"
2. Pilih "Meja 01"
3. Input nama: "Budi"
4. Tambah: 2x Nasi Goreng (Rp 50,000)
5. Tambah: 1x Es Teh (Rp 5,000)
6. Total: Rp 55,000
7. Pilih "Tunai"
8. Input: Rp 100,000
9. Kembalian: Rp 45,000
10. Klik "Proses Order"
```

**Skenario 2: Take Away - Non Tunai**
```
1. Pilih "Take Away"
2. Input nama: "Ani"
3. Tambah: 1x Kopi Hitam (Rp 10,000)
4. Tambah: 2x Pisang Goreng (Rp 30,000)
5. Total: Rp 40,000
6. Pilih "Non Tunai"
7. Klik "Proses Order"
```

### Tips Kasir:
- Cek total sebelum proses order
- Pastikan jumlah bayar benar
- Konfirmasi kembalian dengan customer
- Logout setelah shift selesai

---

## 📊 Admin - Dashboard & Kelola Menu

### Login Admin

```
Username: admin
Special Chars: !@#$%
Password: admin123
```

### Dashboard Statistik

#### A. Lihat Statistik Hari Ini

1. **Akses Dashboard**
   - Login sebagai admin
   - Otomatis ke `/dashboard`

2. **Card Statistik**
   - **Total Order**: Jumlah order hari ini
   - **Total Pendapatan**: Revenue hari ini
   - **Rata-rata Order**: Average order value

3. **Grafik**
   - **Grafik Order Harian**: Bar chart jumlah order
   - **Grafik Pendapatan Harian**: Bar chart revenue

#### B. Filter Berdasarkan Tanggal

1. **Pilih Tanggal Mulai**
   - Klik input "Tanggal Mulai"
   - Pilih tanggal dari calendar

2. **Pilih Tanggal Akhir**
   - Klik input "Tanggal Akhir"
   - Pilih tanggal dari calendar

3. **Klik "Filter"**
   - Data akan diupdate
   - Grafik akan berubah sesuai range

4. **Lihat Hasil**
   - Statistik untuk periode yang dipilih
   - Grafik per hari dalam range tersebut

### Kelola Menu

#### A. Akses Menu Management

1. **Dari Dashboard**
   - Klik tombol "Kelola Menu"
   - Atau akses: `/dashboard/menus`

2. **Lihat Daftar Menu**
   - Tabel menampilkan semua menu
   - Kolom: Nama, Kategori, Harga, Status

#### B. Tambah Menu Baru

1. **Klik "Tambah Menu Baru"**
   - Form akan muncul

2. **Isi Form**
   - **Kategori**: Pilih dari dropdown
   - **Nama Menu**: Contoh: "Nasi Goreng Special"
   - **Deskripsi**: Contoh: "Nasi goreng dengan topping lengkap"
   - **Harga**: Contoh: 30000 (tanpa titik/koma)
   - **URL Gambar**: Opsional, contoh: "/images/menu.jpg"

3. **Klik "Simpan Menu"**
   - Menu akan ditambahkan
   - Muncul di daftar menu
   - Langsung tersedia untuk kasir

#### C. Edit Menu (Future)

Saat ini belum ada UI untuk edit, tapi API sudah tersedia:
```bash
PUT /api/menus/[id]
```

#### D. Hapus Menu (Future)

Saat ini belum ada UI untuk hapus, tapi API sudah tersedia:
```bash
DELETE /api/menus/[id]
```

### Contoh Workflow Admin

**Pagi Hari:**
```
1. Login sebagai admin
2. Cek statistik kemarin
3. Filter tanggal: kemarin - kemarin
4. Lihat total pendapatan
5. Analisis menu terlaris
```

**Tambah Menu Baru:**
```
1. Klik "Kelola Menu"
2. Klik "Tambah Menu Baru"
3. Pilih kategori: Makanan
4. Nama: "Mie Ayam Special"
5. Deskripsi: "Mie ayam dengan bakso"
6. Harga: 25000
7. Simpan
```

**Analisis Bulanan:**
```
1. Filter tanggal: 1 April - 30 April
2. Lihat total order bulan ini
3. Lihat total pendapatan
4. Lihat grafik trend harian
5. Export data (future feature)
```

### Tips Admin:
- Cek dashboard setiap hari
- Update menu sesuai ketersediaan bahan
- Analisis menu terlaris
- Set harga kompetitif
- Pastikan deskripsi menu jelas

---

## 🔐 Developer - Full Access

### Login Developer

```
Username: developer
Special Chars: !@#$%
Password: dev123
```

### Akses Developer

Developer memiliki akses ke:
- ✅ Dashboard Admin
- ✅ Kelola Menu
- ✅ POS Kasir (jika perlu)
- ✅ Database langsung
- ✅ API Endpoints
- ✅ Logs & Debugging

### Tools Developer

#### 1. Test Database Connection
```bash
npm run test:db
```

#### 2. Generate Password Hash
```bash
npm run generate:password
```

#### 3. Generate QR Codes
```bash
node scripts/generateQRCodes.js
```

#### 4. Access Database
```bash
mysql -u root -p cafe_db
```

#### 5. View Logs
```bash
# Check terminal where npm run dev is running
```

### API Testing

#### Test dengan cURL

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"developer","specialChars":"!@#$%","password":"dev123"}'
```

**Get Menus:**
```bash
curl http://localhost:3000/api/menus
```

**Create Order:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "table_id": 1,
    "order_type": "dine_in",
    "items": [{"menu_id":1,"quantity":2,"price":25000}],
    "payment_method": "tunai",
    "payment_amount": 100000,
    "cashier_id": 2
  }'
```

---

## 📱 QR Code System

### Generate QR Codes

1. **Via Script**
   ```bash
   node scripts/generateQRCodes.js
   ```

2. **Via API**
   - Akses: `http://localhost:3000/api/qr/tables`
   - Auto-generate jika belum ada

### Display & Print QR Codes

1. **Akses Halaman QR**
   - URL: `http://localhost:3000/qr-codes`
   - Tampil semua QR code untuk setiap meja

2. **Print QR Codes**
   - Klik tombol "Print"
   - Atau Ctrl+P / Cmd+P
   - Print layout sudah dioptimasi

3. **Pasang QR Code**
   - Print QR code
   - Laminating (opsional)
   - Tempel di setiap meja

### Cara Kerja QR Code

```
Customer scan QR → 
Link ke menu dengan table_id → 
Customer bisa lihat menu → 
Order langsung (future feature)
```

---

## ❓ FAQ

### Q: Lupa password?
**A:** Hubungi admin atau developer untuk reset password.

### Q: Meja tidak muncul di dropdown?
**A:** Pastikan status meja "available". Cek di database atau tunggu order selesai.

### Q: Menu tidak muncul?
**A:** Cek status `is_available` di database. Hanya menu available yang tampil.

### Q: Kembalian salah?
**A:** Cek input jumlah bayar. Sistem otomatis hitung: bayar - total.

### Q: Order tidak tersimpan?
**A:** Cek koneksi database. Lihat console untuk error message.

### Q: Grafik tidak muncul?
**A:** Pastikan ada data order di tanggal yang dipilih.

### Q: QR Code tidak bisa di-scan?
**A:** Generate ulang QR code. Pastikan print quality bagus.

---

## 🆘 Troubleshooting

### Error: "Keranjang masih kosong"
**Solusi:** Tambah minimal 1 menu ke keranjang.

### Error: "Pilih meja terlebih dahulu"
**Solusi:** Pilih meja dari dropdown (untuk Dine In).

### Error: "Jumlah pembayaran kurang"
**Solusi:** Input jumlah bayar >= total order.

### Error: "Login gagal"
**Solusi:** 
1. Cek format: username + special + password
2. Pastikan special chars = !@#$%
3. Cek caps lock

### Meja stuck "occupied"
**Solusi:**
```sql
UPDATE tables SET status = 'available' WHERE id = 1;
```

---

## 📞 Support

Jika mengalami masalah:
1. Cek console browser (F12)
2. Cek terminal server
3. Baca dokumentasi
4. Hubungi developer

---

## 🎓 Best Practices

### Untuk Kasir:
- ✅ Konfirmasi order dengan customer
- ✅ Cek kembalian sebelum serahkan
- ✅ Logout setelah shift
- ✅ Laporkan error ke admin

### Untuk Admin:
- ✅ Cek dashboard setiap hari
- ✅ Update menu berkala
- ✅ Analisis data penjualan
- ✅ Backup database rutin

### Untuk Developer:
- ✅ Monitor error logs
- ✅ Update dependencies
- ✅ Test sebelum deploy
- ✅ Dokumentasi perubahan

---

**Selamat menggunakan Cafe App! ☕**

Untuk pertanyaan lebih lanjut, baca dokumentasi lengkap di:
- README.md
- SETUP.md
- API_DOCUMENTATION.md
