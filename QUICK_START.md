# Quick Start Guide - Cafe App

## ⚡ 5 Menit Setup

### 1️⃣ Install Dependencies (1 menit)
```bash
cd cafe-app
npm install
```

### 2️⃣ Setup Database (2 menit)
```bash
# Login ke MySQL/MariaDB
mysql -u root -p

# Import database
mysql -u root -p < database/cafe_db.sql

# Atau dari dalam MySQL:
source database/cafe_db.sql
```

### 3️⃣ Configure Environment (30 detik)
Edit `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=cafe_db
DB_PORT=3306
```

### 4️⃣ Test Connection (30 detik)
```bash
npm run test:db
```

### 5️⃣ Run App (30 detik)
```bash
npm run dev
```

Buka: `http://localhost:3000`

---

## 🔑 Login Credentials

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

### Developer
```
Username: developer
Special: !@#$%
Password: dev123
```

---

## 🎯 Quick Test Scenarios

### Test 1: Customer View (No Login)
1. Buka `http://localhost:3000`
2. Lihat menu
3. Filter by kategori
✅ Success: Menu tampil dengan kategori

### Test 2: Kasir - Create Order
1. Login sebagai kasir
2. Pilih "Dine In"
3. Pilih meja
4. Tambah 2x Nasi Goreng
5. Tambah 1x Es Teh
6. Pilih "Tunai"
7. Input Rp 100,000
8. Klik "Proses Order"
✅ Success: Order berhasil, kembalian Rp 45,000

### Test 3: Admin - View Dashboard
1. Login sebagai admin
2. Lihat statistik
3. Ubah filter tanggal
4. Klik "Kelola Menu"
5. Tambah menu baru
✅ Success: Dashboard tampil, menu berhasil ditambah

---

## 📱 Pages Overview

| URL | Role | Description |
|-----|------|-------------|
| `/` | Public | Homepage - lihat menu |
| `/login` | Public | Login page |
| `/kasir` | Kasir | POS system |
| `/dashboard` | Admin | Dashboard & stats |
| `/dashboard/menus` | Admin | Kelola menu |
| `/qr-codes` | Public | QR codes display |

---

## 🔌 API Quick Reference

### Authentication
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","specialChars":"!@#$%","password":"admin123"}'
```

### Get Menus
```bash
curl http://localhost:3000/api/menus
```

### Create Order
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

### Get Stats
```bash
curl "http://localhost:3000/api/dashboard/stats?start_date=2026-04-01&end_date=2026-04-30"
```

---

## 🛠️ Common Commands

```bash
# Development
npm run dev                    # Start dev server

# Database
npm run test:db               # Test DB connection
mysql -u root -p cafe_db      # Access database

# Utilities
npm run generate:password     # Generate password hash
node scripts/generateQRCodes.js  # Generate QR codes

# Production
npm run build                 # Build for production
npm start                     # Start production server
```

---

## 🐛 Troubleshooting

### ❌ Cannot connect to database
```bash
# Check MySQL is running
brew services list  # macOS
sudo systemctl status mysql  # Linux

# Check credentials in .env.local
cat .env.local

# Test connection
npm run test:db
```

### ❌ Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### ❌ Login failed
```bash
# Regenerate password
npm run generate:password

# Update hash in database
mysql -u root -p cafe_db
UPDATE users SET password='new_hash' WHERE username='admin';
```

### ❌ Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `SETUP.md` | Detailed setup guide |
| `API_DOCUMENTATION.md` | API reference |
| `PROJECT_SUMMARY.md` | Project overview |
| `CHECKLIST.md` | Feature checklist |
| `STRUCTURE.md` | Project structure |
| `QUICK_START.md` | This file |

---

## 🎨 UI Components

### Colors
- Primary: Purple `#a855f7`
- Secondary: Pink `#ec4899`
- Success: Green `#10b981`
- Danger: Red `#ef4444`

### Animations
```javascript
// Fade in
className="animate__animated animate__fadeIn"

// Fade in up
className="animate__animated animate__fadeInUp"

// Shake (error)
className="animate__animated animate__shakeX"
```

---

## 🔐 Security Notes

1. **Password Format**: `username + special_chars + password`
2. **Hashing**: bcrypt with 10 rounds
3. **SQL**: Prepared statements (no injection)
4. **Env**: Sensitive data in `.env.local`
5. **Production**: Change JWT_SECRET!

---

## 📊 Database Quick Access

```sql
-- View all users
SELECT * FROM users;

-- View today's orders
SELECT * FROM orders WHERE DATE(created_at) = CURDATE();

-- View menu with categories
SELECT m.*, c.name as category 
FROM menus m 
JOIN categories c ON m.category_id = c.id;

-- View order details
SELECT o.*, u.name as cashier, t.table_number
FROM orders o
LEFT JOIN users u ON o.cashier_id = u.id
LEFT JOIN tables t ON o.table_id = t.id
WHERE o.id = 1;

-- Today's revenue
SELECT SUM(total_amount) as revenue 
FROM orders 
WHERE DATE(created_at) = CURDATE() 
AND status = 'completed';
```

---

## 🚀 Production Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Manual Server
```bash
# Build
npm run build

# Start
npm start

# Or with PM2
npm install -g pm2
pm2 start npm --name "cafe-app" -- start
```

### Environment Variables (Production)
```env
DB_HOST=your_production_host
DB_USER=your_production_user
DB_PASSWORD=strong_password_here
DB_NAME=cafe_db
JWT_SECRET=generate_random_secret_here
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 💡 Tips & Tricks

### 1. Generate Strong Password
```bash
npm run generate:password
```

### 2. Backup Database
```bash
mysqldump -u root -p cafe_db > backup_$(date +%Y%m%d).sql
```

### 3. Reset Database
```bash
mysql -u root -p cafe_db < database/cafe_db.sql
```

### 4. View Logs
```bash
# Development
# Check terminal where npm run dev is running

# Production
pm2 logs cafe-app
```

### 5. Update Dependencies
```bash
npm update
npm audit fix
```

---

## 🎯 Next Steps

1. ✅ Setup complete
2. ✅ Test all features
3. ✅ Customize design
4. ✅ Add your menus
5. ✅ Generate QR codes
6. ✅ Deploy to production
7. ✅ Monitor & maintain

---

## 📞 Support

- 📖 Read documentation files
- 🐛 Check console for errors
- 🔍 Search error messages
- 💬 Check API responses

---

**Happy Coding! ☕**

Made with ❤️ using Next.js & Tailwind CSS
