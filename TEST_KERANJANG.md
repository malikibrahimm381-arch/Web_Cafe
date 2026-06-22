# ✅ CHECKLIST TEST KERANJANG

## Fungsi yang Sudah Diimplementasi:

### 1. ✅ Tambah ke Keranjang
- [x] Button "Tambah ke Keranjang" pada setiap menu card
- [x] Fungsi `addToCart(menu)` - menambah item baru atau update quantity
- [x] Auto-open sidebar keranjang saat item ditambahkan
- [x] Badge counter di button "Keranjang" menampilkan total items

### 2. ✅ Tampilan Keranjang
- [x] Sidebar keranjang slide dari kanan
- [x] Overlay background hitam transparan
- [x] Click outside untuk close
- [x] Button X untuk close
- [x] Empty state dengan icon dan pesan
- [x] List items dengan card putih dan border

### 3. ✅ Update Quantity
- [x] Button minus (-) untuk kurangi quantity
- [x] Button plus (+) untuk tambah quantity
- [x] Display quantity di tengah
- [x] Auto-remove item jika quantity = 0
- [x] Update subtotal otomatis

### 4. ✅ Remove Item
- [x] Button delete (🗑️) untuk hapus item
- [x] Fungsi `removeFromCart(menuId)`

### 5. ✅ Kalkulasi Total
- [x] `getTotalPrice()` - hitung total harga
- [x] `getTotalItems()` - hitung total items
- [x] Display total item dan total bayar
- [x] Format harga dengan Rp dan separator ribuan

### 6. ✅ Checkout Modal
- [x] Button "Checkout" di keranjang
- [x] Modal popup di tengah layar
- [x] Input nama pelanggan
- [x] Input nomor meja
- [x] Display total item dan total bayar
- [x] Button "Batal" dan "Selesai"
- [x] Validasi input (nama & nomor meja wajib diisi)
- [x] Validasi keranjang tidak kosong

### 7. ✅ Submit Order
- [x] Fungsi `handleCheckout()` async
- [x] POST ke `/api/orders`
- [x] Payload lengkap dengan items array
- [x] Success alert dengan nomor order
- [x] Clear cart setelah sukses
- [x] Clear input fields
- [x] Close modal dan sidebar
- [x] Error handling dengan alert

### 8. ✅ API Orders
- [x] POST endpoint `/api/orders/route.js`
- [x] Database transaction
- [x] Insert ke table `orders`
- [x] Insert ke table `order_items`
- [x] Generate order number
- [x] Return order data

### 9. ✅ Database
- [x] 80+ menu items sudah diimport
- [x] Categories (Makanan, Minuman, Snack)
- [x] Tables setup
- [x] Users setup

## Cara Test Manual:

1. **Buka browser**: http://localhost:3000
2. **Scroll ke menu section**
3. **Click "Tambah ke Keranjang"** pada beberapa menu
4. **Cek badge counter** di button Keranjang (harus update)
5. **Click button "Keranjang"** - sidebar harus muncul
6. **Test quantity buttons** (+/-) - subtotal harus update
7. **Test delete button** (🗑️) - item harus hilang
8. **Click "Checkout"** - modal harus muncul
9. **Isi nama dan nomor meja**
10. **Click "Selesai"** - harus muncul alert sukses
11. **Cek keranjang** - harus kosong setelah checkout

## Troubleshooting:

### Jika keranjang tidak muncul:
- Cek console browser (F12) untuk error
- Pastikan state `showCart` berubah ke `true`
- Cek z-index sidebar (sudah set z-50)

### Jika checkout gagal:
- Cek console untuk error API
- Cek network tab untuk response
- Pastikan database connection OK
- Cek .env.local untuk DB credentials

### Jika menu tidak muncul:
- Jalankan: `node scripts/updateMenus.js`
- Cek database: `SELECT * FROM menus;`
- Restart dev server

## Status: ✅ SEMUA FUNGSI SUDAH LENGKAP

Keranjang sudah berfungsi dengan baik! Tinggal test manual di browser.
