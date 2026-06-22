# Fitur Pesanan - Cafe App

## ✅ Fitur yang Sudah Ditambahkan

### 1. Keranjang Belanja (Shopping Cart)
- **Tombol Keranjang** di navbar dengan badge jumlah item
- **Sidebar Keranjang** yang dapat dibuka/tutup
- Menampilkan semua item yang ditambahkan

### 2. Manajemen Pesanan
- **Tambah ke Keranjang**: Tombol di setiap card menu
- **Update Jumlah**: Tombol + dan - untuk mengatur quantity
- **Hapus Item**: Tombol delete untuk menghapus item dari keranjang
- **Total Item**: Menghitung total jumlah item
- **Total Harga**: Menghitung total harga otomatis

### 3. Checkout & Pembayaran
- **Form Checkout** dengan:
  - Input Nama Pelanggan
  - Input Nomor Meja
  - Ringkasan Total Item
  - Ringkasan Total Bayar
- **Tombol Selesai Pesan**: Memproses pesanan ke database
- **Konfirmasi Pesanan**: Alert dengan nomor order setelah berhasil

### 4. Integrasi API
- POST ke `/api/orders` dengan data lengkap:
  - customer_name
  - table_id
  - order_type (dine_in)
  - items (menu_id, quantity, price)
  - payment_method (tunai)
  - payment_amount
- Response dengan order_number dan total_amount

### 5. Login System
- **Halaman Login** yang sudah diperbaiki
- **Informasi Kredensial Default**:
  - Admin: admin / !@#$% / admin123
  - Kasir: kasir / !@#$% / kasir123
- **Format Login**: username + special chars + password
- **Redirect** sesuai role setelah login berhasil

## 🎨 UI/UX Features

### Keranjang Belanja
- Sidebar slide dari kanan
- Background overlay semi-transparent
- Animasi smooth
- Responsive design

### Card Menu
- Tombol "Tambah ke Keranjang" di setiap menu
- Hover effect
- Badge kategori
- Format harga Indonesia (Rp)

### Checkout Modal
- Modal centered
- Form validation
- Tombol Batal dan Selesai Pesan
- Ringkasan pesanan

## 📱 Cara Menggunakan

### Untuk Customer (Halaman Utama)

1. **Browse Menu**
   - Lihat semua menu yang tersedia
   - Filter berdasarkan kategori (Semua, Makanan, Minuman, Snack)

2. **Tambah ke Keranjang**
   - Klik tombol "+ Tambah ke Keranjang" pada menu yang diinginkan
   - Keranjang akan otomatis terbuka

3. **Atur Pesanan**
   - Klik tombol + untuk menambah jumlah
   - Klik tombol - untuk mengurangi jumlah
   - Klik 🗑️ untuk menghapus item
   - Lihat total item dan total harga

4. **Checkout**
   - Klik "Lanjut ke Checkout"
   - Isi Nama Pelanggan
   - Isi Nomor Meja
   - Klik "Selesai Pesan"
   - Pesanan akan diproses dan mendapat nomor order

### Untuk Admin/Kasir (Login)

1. **Login**
   - Buka halaman /login
   - Masukkan username: admin
   - Masukkan special chars: !@#$%
   - Masukkan password: admin123
   - Klik Login

2. **Dashboard**
   - Redirect ke /dashboard untuk admin
   - Redirect ke /kasir untuk kasir
   - Akses fitur manajemen menu, order, dll

## 🔧 Technical Details

### State Management
```javascript
const [cart, setCart] = useState([]);
const [showCart, setShowCart] = useState(false);
const [customerName, setCustomerName] = useState('');
const [tableNumber, setTableNumber] = useState('');
const [showCheckout, setShowCheckout] = useState(false);
```

### Cart Functions
- `addToCart(menu)` - Tambah item atau update quantity
- `updateQuantity(menuId, newQuantity)` - Update jumlah item
- `removeFromCart(menuId)` - Hapus item dari cart
- `getTotalPrice()` - Hitung total harga
- `getTotalItems()` - Hitung total item
- `handleCheckout()` - Proses checkout ke API

### API Endpoint
```
POST /api/orders
Body: {
  table_id: null,
  order_type: 'dine_in',
  customer_name: string,
  items: [{
    menu_id: number,
    quantity: number,
    price: number,
    notes: null
  }],
  payment_method: 'tunai',
  payment_amount: number,
  cashier_id: null
}
```

## 🎯 Next Steps (Optional Enhancements)

1. **Payment Options**
   - Tambah pilihan metode pembayaran (Tunai/Non-Tunai)
   - Input jumlah uang yang dibayar
   - Hitung kembalian

2. **Order History**
   - Halaman riwayat pesanan customer
   - Track status pesanan

3. **Table Selection**
   - Pilih meja dari daftar meja tersedia
   - Update status meja (available/occupied)

4. **Notes/Special Requests**
   - Tambah catatan khusus per item
   - Contoh: "Tidak pakai cabe", "Extra pedas"

5. **Print Receipt**
   - Generate struk pembayaran
   - Print atau download PDF

## ✅ Testing Checklist

- [x] Database connection berhasil
- [x] User default tersedia (admin, kasir, developer)
- [x] Menu dan kategori tersedia
- [x] Tambah item ke keranjang
- [x] Update quantity item
- [x] Hapus item dari keranjang
- [x] Hitung total harga dan item
- [x] Form checkout validation
- [x] Submit order ke API
- [x] Login dengan kredensial default
- [x] Redirect sesuai role

## 🚀 Deployment Notes

Pastikan:
1. Database MySQL sudah running
2. File `.env.local` sudah dikonfigurasi
3. Database `cafe_db` sudah dibuat dan diisi dengan data dari `database/cafe_db.sql`
4. Dependencies sudah terinstall (`npm install`)
5. Development server running (`npm run dev`)

Akses aplikasi di: http://localhost:3000
