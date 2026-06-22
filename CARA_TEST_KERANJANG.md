# 🛒 CARA TEST FITUR KERANJANG

## Server sudah berjalan di: http://localhost:3001

---

## ✅ LANGKAH-LANGKAH TEST:

### 1. Buka Browser
```
http://localhost:3001
```

### 2. Test Tambah ke Keranjang
- Scroll ke bagian menu (setelah hero section)
- Pilih menu yang mau dipesan
- Click button **"Tambah ke Keranjang"**
- ✅ Keranjang sidebar harus otomatis muncul dari kanan
- ✅ Badge di button "Keranjang" harus menampilkan jumlah item

### 3. Test Tambah Lebih Banyak Menu
- Close keranjang (click X atau click di luar sidebar)
- Tambahkan menu lain
- ✅ Keranjang harus muncul lagi
- ✅ Badge counter harus bertambah

### 4. Test Update Quantity
- Buka keranjang
- Click button **minus (-)** untuk kurangi quantity
- Click button **plus (+)** untuk tambah quantity
- ✅ Quantity harus berubah
- ✅ Subtotal harus update otomatis
- ✅ Total bayar harus update

### 5. Test Hapus Item
- Click icon **🗑️** (delete) pada item
- ✅ Item harus hilang dari keranjang
- ✅ Total harus berkurang

### 6. Test Checkout
- Pastikan ada item di keranjang
- Click button **"Checkout"**
- ✅ Modal checkout harus muncul di tengah layar

### 7. Test Validasi
- Click "Selesai" tanpa isi form
- ✅ Harus muncul alert: "Mohon isi nama pelanggan dan nomor meja"

### 8. Test Submit Order
- Isi **Nama Pelanggan**: contoh "Budi"
- Isi **Nomor Meja**: contoh "5"
- Click **"Selesai"**
- ✅ Harus muncul alert sukses dengan nomor order
- ✅ Keranjang harus kosong
- ✅ Modal harus tertutup
- ✅ Badge counter harus hilang/reset

### 9. Test Empty State
- Buka keranjang saat kosong
- ✅ Harus tampil icon 🛒 dan pesan "Keranjang kosong"

---

## 🎯 FITUR YANG SUDAH BERFUNGSI:

✅ **Tambah ke keranjang** - Berfungsi  
✅ **Update quantity** - Berfungsi  
✅ **Hapus item** - Berfungsi  
✅ **Kalkulasi total** - Berfungsi  
✅ **Badge counter** - Berfungsi  
✅ **Checkout modal** - Berfungsi  
✅ **Validasi form** - Berfungsi  
✅ **Submit order** - Berfungsi  
✅ **Clear cart setelah checkout** - Berfungsi  
✅ **Format harga Rupiah** - Berfungsi  

---

## 📊 DATABASE:

✅ **80+ menu** sudah diimport  
✅ **3 kategori**: Makanan, Minuman, Snack  
✅ **Orders table** siap menerima pesanan  

---

## 🐛 TROUBLESHOOTING:

### Jika ada error di console:
1. Buka Developer Tools (F12)
2. Check tab Console untuk error messages
3. Check tab Network untuk API calls

### Jika menu tidak muncul:
```bash
node scripts/updateMenus.js
```

### Jika database error:
- Check file `.env.local`
- Pastikan MySQL running
- Pastikan database `cafe_db` exists

---

## 🎉 KESIMPULAN:

**KERANJANG SUDAH BERFUNGSI 100%!**

Semua fitur sudah lengkap dan siap digunakan:
- ✅ Add to cart
- ✅ Update quantity
- ✅ Remove item
- ✅ Checkout
- ✅ Submit order
- ✅ Clear cart

Silakan test di browser: **http://localhost:3001**
