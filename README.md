# Cafe App - Web Aplikasi Manajemen Cafe

Aplikasi manajemen cafe modern menggunakan Next.js dengan fitur lengkap untuk customer, kasir, dan admin.

## 🎉 Version 2.0 - What's New!

- ✨ **Drizzle ORM** - Type-safe database queries
- 📊 **TanStack Table** - Advanced table dengan sorting & pagination
- 💀 **Loading Skeletons** - Better UX dengan skeleton screens
- 🎯 **Sidebar Navigation** - Modern sidebar dengan Metis Menu style
- 🍪 **Cookie Auth** - Secure authentication dengan auto-expire
- 🛡️ **Middleware Protection** - Server-side route protection

[See full changelog →](CHANGELOG.md) | [Enhancement guide →](ENHANCEMENT_GUIDE.md)

---

## 🚀 Teknologi

- **Next.js 16** (App Router)
- **Tailwind CSS** (UI modern & soft color)
- **Animate.css** (Animasi interaktif)
- **MariaDB/MySQL** (Database)
- **Drizzle ORM** (Type-safe ORM) ⭐ NEW
- **TanStack Table** (Advanced tables) ⭐ NEW
- **bcryptjs** (Enkripsi password)
- **JavaScript**

## 📋 Fitur Utama

### 1. Role Pengguna
- **Customer**: Akses tanpa login, lihat menu
- **Kasir**: Login untuk proses order & pembayaran
- **Admin**: Kelola menu, lihat dashboard
- **Developer**: Full access

### 2. Pemesanan
- Dine In & Take Away
- Proses order via kasir
- Support QR Code (struktur sudah disiapkan)

### 3. Menu Makanan & Minuman
- Tampilan dengan thumbnail
- Input oleh admin
- Kategori menu (Makanan, Minuman, Snack)

### 4. Pembayaran
- Tunai & Non Tunai
- Otomatis hitung kembalian
- Data tersimpan ke database

### 5. Dashboard
- Grafik order harian
- Grafik pendapatan
- Filter tanggal
- Statistik lengkap

## 🔐 Keamanan

- Login menggunakan bcrypt
- Format login: `username + special_chars + password`
- Contoh: `admin!@#$%admin123`

## 🛠️ Instalasi

### 1. Install Dependencies
```bash
cd cafe-app
npm install
```

### 2. Setup Database
1. Import file SQL ke MariaDB/MySQL:
```bash
mysql -u root -p < database/cafe_db.sql
```

2. Konfigurasi `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cafe_db
DB_PORT=3306
```

### 3. Generate Password untuk User
Jalankan script berikut untuk generate password:

```javascript
// generatePassword.js
const bcrypt = require('bcryptjs');

async function generatePassword(username, specialChars, password) {
  const combined = `${username}${specialChars}${password}`;
  const hashed = await bcrypt.hash(combined, 10);
  console.log(`Password hash untuk ${username}: ${hashed}`);
}

// Contoh:
generatePassword('admin', '!@#$%', 'admin123');
generatePassword('kasir', '!@#$%', 'kasir123');
generatePassword('developer', '!@#$%', 'dev123');
```

Update hash password di file `database/cafe_db.sql` pada bagian INSERT users.

### 4. Jalankan Aplikasi
```bash
npm run dev
```

Buka browser: `http://localhost:3000`

## 📱 Halaman & Route

- `/` - Homepage (Customer view)
- `/login` - Halaman login
- `/kasir` - Dashboard kasir (proses order)
- `/dashboard` - Dashboard admin (statistik)
- `/dashboard/menus` - Kelola menu (admin)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user

### Menus
- `GET /api/menus` - Get all menus
- `GET /api/menus?category_id=1` - Get menus by category
- `POST /api/menus` - Create new menu (admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders?start_date=2026-01-01&end_date=2026-01-31` - Get orders by date range
- `POST /api/orders` - Create new order

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/stats?start_date=2026-01-01&end_date=2026-01-31` - Get stats by date range

### Categories
- `GET /api/categories` - Get all categories

### Tables
- `GET /api/tables` - Get all tables

## 🎨 Design

- Soft color palette (purple, pink, blue gradients)
- Modern & user-friendly interface
- Responsive design
- Smooth animations dengan Animate.css

## 📝 Default Login

Setelah setup database dan generate password:

```
Admin:
Username: admin
Special Chars: !@#$%
Password: admin123

Kasir:
Username: kasir
Special Chars: !@#$%
Password: kasir123

Developer:
Username: developer
Special Chars: !@#$%
Password: dev123
```

## 🔄 REST API Methods

Aplikasi menggunakan REST API dengan method:
- `GET` - Mengambil data
- `POST` - Membuat data baru
- `PUT` - Update data (dapat ditambahkan)
- `DELETE` - Hapus data (dapat ditambahkan)

## 📦 Struktur Project

```
cafe-app/
├── app/
│   ├── api/              # REST API routes
│   ├── dashboard/        # Admin dashboard
│   ├── kasir/           # Kasir page
│   ├── login/           # Login page
│   ├── layout.js        # Root layout
│   ├── page.js          # Homepage
│   └── globals.css      # Global styles
├── database/
│   └── cafe_db.sql      # Database schema
├── lib/
│   ├── auth.js          # Authentication utilities
│   └── db.js            # Database connection
└── .env.local           # Environment variables
```

## 🚧 Pengembangan Selanjutnya

- Implementasi QR Code untuk meja
- Cetak katalog menu (PDF)
- Upload gambar menu
- Edit & delete menu
- Laporan penjualan detail
- Export data ke Excel/PDF
- Notifikasi real-time
- Multi-language support

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 Developer

Dibuat dengan ❤️ menggunakan Next.js dan Tailwind CSS
