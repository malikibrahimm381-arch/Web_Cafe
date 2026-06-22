# 🏗️ STRUKTUR SISTEM CAFE - LENGKAP

## 📁 STRUKTUR FOLDER:

```
cafe-app/
├── app/
│   ├── dashboard/                    # Dashboard Utama
│   │   └── page.js
│   │
│   ├── master/                       # MASTER DATA
│   │   ├── products/                 # Produk/Menu
│   │   │   ├── page.js
│   │   │   ├── [id]/
│   │   │   │   └── page.js
│   │   │   └── create/
│   │   │       └── page.js
│   │   ├── categories/               # Kategori
│   │   │   └── page.js
│   │   ├── customers/                # Pelanggan
│   │   │   └── page.js
│   │   ├── suppliers/                # Supplier
│   │   │   └── page.js
│   │   └── employees/                # Karyawan
│   │       └── page.js
│   │
│   ├── transaction/                  # TRANSAKSI
│   │   ├── pos/                      # POS Kasir
│   │   │   └── page.js
│   │   ├── online-orders/            # Order Online
│   │   │   └── page.js
│   │   └── reservations/             # Reservasi
│   │       └── page.js
│   │
│   ├── kitchen/                      # DAPUR
│   │   ├── incoming/                 # Pesanan Masuk
│   │   │   └── page.js
│   │   ├── processing/               # Proses Masak
│   │   │   └── page.js
│   │   └── ready/                    # Pesanan Selesai
│   │       └── page.js
│   │
│   ├── warehouse/                    # GUDANG
│   │   ├── stock/                    # Stok Barang
│   │   │   └── page.js
│   │   ├── stock-in/                 # Barang Masuk
│   │   │   └── page.js
│   │   └── stock-out/                # Barang Keluar
│   │       └── page.js
│   │
│   ├── finance/                      # KEUANGAN
│   │   ├── income/                   # Pendapatan
│   │   │   └── page.js
│   │   ├── expense/                  # Pengeluaran
│   │   │   └── page.js
│   │   └── profit-loss/              # Laba Rugi
│   │       └── page.js
│   │
│   ├── reports/                      # LAPORAN
│   │   ├── sales/                    # Penjualan
│   │   │   └── page.js
│   │   ├── inventory/                # Stok
│   │   │   └── page.js
│   │   ├── purchase/                 # Pembelian
│   │   │   └── page.js
│   │   └── financial/                # Keuangan
│   │       └── page.js
│   │
│   ├── settings/                     # PENGATURAN
│   │   ├── users/                    # User Management
│   │   │   └── page.js
│   │   ├── permissions/              # Hak Akses
│   │   │   └── page.js
│   │   ├── system/                   # System Settings
│   │   │   └── page.js
│   │   └── backup/                   # Backup Data
│   │       └── page.js
│   │
│   └── api/                          # API ROUTES
│       ├── auth/
│       ├── master/
│       │   ├── products/
│       │   ├── categories/
│       │   ├── customers/
│       │   ├── suppliers/
│       │   └── employees/
│       ├── transaction/
│       │   ├── pos/
│       │   ├── online-orders/
│       │   └── reservations/
│       ├── kitchen/
│       ├── warehouse/
│       ├── finance/
│       └── reports/
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.js
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── common/
│   │   ├── Table.js
│   │   ├── Modal.js
│   │   ├── Button.js
│   │   └── Card.js
│   └── modules/
│       ├── POSComponent.js
│       ├── KitchenDisplay.js
│       └── StockCard.js
│
└── lib/
    ├── auth.js
    ├── db.js
    ├── permissions.js
    └── utils.js
```

---

## 🎯 ROLE & PERMISSIONS:

### Admin (Administrator)
✅ Full access ke semua modul

### Kasir
- ✅ Dashboard (View)
- ✅ POS/Kasir (Full)
- ✅ Order Online (Full)
- ✅ Reservasi (Full)
- ✅ Produk (View only)
- ✅ Pelanggan (Full)

### Dapur
- ✅ Dashboard (View)
- ✅ Dapur - Pesanan Masuk (View)
- ✅ Dapur - Proses Masak (Update)
- ✅ Dapur - Pesanan Selesai (View)

### Gudang
- ✅ Dashboard (View)
- ✅ Stok Barang (Full)
- ✅ Barang Masuk (Full)
- ✅ Barang Keluar (Full)
- ✅ Supplier (View/Edit)
- ✅ Laporan Stok (View)

### Keuangan
- ✅ Dashboard (View)
- ✅ Pendapatan (Full)
- ✅ Pengeluaran (Full)
- ✅ Laba Rugi (View)
- ✅ Laporan Keuangan (View)

### Developer
✅ Full access (untuk development)

---

## 📊 MENU NAVIGASI:

```javascript
const menuStructure = {
  admin: [
    { title: 'Dashboard', icon: '📊', path: '/dashboard' },
    {
      title: 'Master Data',
      icon: '📁',
      children: [
        { title: 'Produk', icon: '🍽️', path: '/master/products' },
        { title: 'Kategori', icon: '📂', path: '/master/categories' },
        { title: 'Pelanggan', icon: '👥', path: '/master/customers' },
        { title: 'Supplier', icon: '🚚', path: '/master/suppliers' },
        { title: 'Karyawan', icon: '👤', path: '/master/employees' }
      ]
    },
    {
      title: 'Transaksi',
      icon: '💰',
      children: [
        { title: 'Kasir (POS)', icon: '🏪', path: '/transaction/pos' },
        { title: 'Order Online', icon: '📱', path: '/transaction/online-orders' },
        { title: 'Reservasi', icon: '📅', path: '/transaction/reservations' }
      ]
    },
    {
      title: 'Dapur',
      icon: '👨‍🍳',
      children: [
        { title: 'Pesanan Masuk', icon: '📥', path: '/kitchen/incoming' },
        { title: 'Proses Masak', icon: '🔥', path: '/kitchen/processing' },
        { title: 'Pesanan Selesai', icon: '✅', path: '/kitchen/ready' }
      ]
    },
    {
      title: 'Gudang',
      icon: '📦',
      children: [
        { title: 'Stok Barang', icon: '📊', path: '/warehouse/stock' },
        { title: 'Barang Masuk', icon: '📥', path: '/warehouse/stock-in' },
        { title: 'Barang Keluar', icon: '📤', path: '/warehouse/stock-out' }
      ]
    },
    {
      title: 'Keuangan',
      icon: '💵',
      children: [
        { title: 'Pendapatan', icon: '💰', path: '/finance/income' },
        { title: 'Pengeluaran', icon: '💸', path: '/finance/expense' },
        { title: 'Laba Rugi', icon: '📈', path: '/finance/profit-loss' }
      ]
    },
    {
      title: 'Laporan',
      icon: '📑',
      children: [
        { title: 'Penjualan', icon: '💰', path: '/reports/sales' },
        { title: 'Stok', icon: '📦', path: '/reports/inventory' },
        { title: 'Pembelian', icon: '🛒', path: '/reports/purchase' },
        { title: 'Keuangan', icon: '💵', path: '/reports/financial' }
      ]
    },
    {
      title: 'Pengaturan',
      icon: '⚙️',
      children: [
        { title: 'User', icon: '👤', path: '/settings/users' },
        { title: 'Hak Akses', icon: '🔒', path: '/settings/permissions' },
        { title: 'Sistem', icon: '⚙️', path: '/settings/system' },
        { title: 'Backup Data', icon: '💾', path: '/settings/backup' }
      ]
    }
  ]
};
```

---

## 🚀 TAHAPAN DEVELOPMENT:

### Phase 1: Database & Auth (✅ DONE)
- [x] Database schema lengkap
- [x] Auth system
- [x] Role-based permissions

### Phase 2: Master Data (Next)
- [ ] Products/Menu management
- [ ] Categories management
- [ ] Customers management
- [ ] Suppliers management
- [ ] Employees management

### Phase 3: Transaksi
- [ ] POS System
- [ ] Online Orders
- [ ] Reservations

### Phase 4: Kitchen
- [ ] Kitchen Display System
- [ ] Order tracking
- [ ] Status updates

### Phase 5: Warehouse
- [ ] Stock management
- [ ] Stock in/out
- [ ] Low stock alerts

### Phase 6: Finance
- [ ] Income tracking
- [ ] Expense tracking
- [ ] Profit/Loss reports

### Phase 7: Reports
- [ ] Sales reports
- [ ] Inventory reports
- [ ] Financial reports

### Phase 8: Settings
- [ ] User management
- [ ] Permission management
- [ ] System settings
- [ ] Backup/restore

---

## 📝 NOTES:

1. **Database sudah ready** - Tinggal run script SQL
2. **Struktur folder** - Akan dibuat bertahap
3. **Sidebar navigation** - Akan di-update dengan menu lengkap
4. **Permission system** - Sudah di-setup di database
5. **API routes** - Akan dibuat sesuai kebutuhan modul

---

## 🎯 PRIORITAS:

1. ✅ Database schema
2. ⏳ Update sidebar dengan menu lengkap
3. ⏳ Buat halaman Master Data (Products, Categories, dll)
4. ⏳ Buat POS system yang lengkap
5. ⏳ Kitchen Display System
6. ⏳ Warehouse management
7. ⏳ Finance & Reports

**APAKAH ANDA INGIN SAYA LANJUTKAN MEMBUAT SEMUA MODUL INI SEKARANG?**
