# Struktur Project - Cafe App

## 📂 File Tree

```
cafe-app/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # REST API Routes
│   │   ├── 📁 auth/
│   │   │   └── 📁 login/
│   │   │       └── route.js         # POST /api/auth/login
│   │   ├── 📁 categories/
│   │   │   └── route.js             # GET /api/categories
│   │   ├── 📁 menus/
│   │   │   ├── route.js             # GET, POST /api/menus
│   │   │   └── 📁 [id]/
│   │   │       └── route.js         # PUT, DELETE /api/menus/:id
│   │   ├── 📁 orders/
│   │   │   ├── route.js             # GET, POST /api/orders
│   │   │   └── 📁 [id]/
│   │   │       └── route.js         # GET, PUT, DELETE /api/orders/:id
│   │   ├── 📁 tables/
│   │   │   └── route.js             # GET /api/tables
│   │   ├── 📁 dashboard/
│   │   │   └── 📁 stats/
│   │   │       └── route.js         # GET /api/dashboard/stats
│   │   └── 📁 qr/
│   │       └── 📁 tables/
│   │           └── route.js         # GET /api/qr/tables
│   │
│   ├── 📁 dashboard/                # Admin Pages
│   │   ├── page.js                  # Dashboard utama
│   │   └── 📁 menus/
│   │       └── page.js              # Kelola menu
│   │
│   ├── 📁 kasir/                    # Kasir Pages
│   │   └── page.js                  # POS System
│   │
│   ├── 📁 login/                    # Auth Pages
│   │   └── page.js                  # Login form
│   │
│   ├── 📁 qr-codes/                 # QR Code Pages
│   │   └── page.js                  # Display & print QR
│   │
│   ├── layout.js                    # Root layout
│   ├── page.js                      # Homepage (customer)
│   └── globals.css                  # Global styles
│
├── 📁 database/                     # Database Files
│   └── cafe_db.sql                  # Schema + seed data
│
├── 📁 lib/                          # Utilities
│   ├── auth.js                      # Auth helpers
│   └── db.js                        # Database connection
│
├── 📁 scripts/                      # Helper Scripts
│   ├── generatePassword.js          # Password hash generator
│   └── generateQRCodes.js           # QR code generator
│
├── 📁 public/                       # Static Files
│   └── (images, icons, etc.)
│
├── 📄 .env.local                    # Environment variables
├── 📄 .gitignore                    # Git ignore rules
├── 📄 test-db.js                    # DB connection test
├── 📄 package.json                  # Dependencies
├── 📄 tailwind.config.js            # Tailwind config
├── 📄 next.config.js                # Next.js config
│
└── 📁 Documentation/
    ├── 📄 README.md                 # Main documentation
    ├── 📄 SETUP.md                  # Setup guide
    ├── 📄 API_DOCUMENTATION.md      # API reference
    ├── 📄 PROJECT_SUMMARY.md        # Project overview
    ├── 📄 CHECKLIST.md              # Feature checklist
    └── 📄 STRUCTURE.md              # This file
```

## 🗺️ Route Map

### Public Routes (No Auth Required)
```
/                    → Homepage (Customer view)
/login               → Login page
/qr-codes            → QR codes display
```

### Protected Routes (Auth Required)
```
/kasir               → Kasir POS (role: kasir)
/dashboard           → Admin dashboard (role: admin, developer)
/dashboard/menus     → Menu management (role: admin, developer)
```

### API Routes
```
Authentication:
POST   /api/auth/login              → Login user

Categories:
GET    /api/categories              → Get all categories

Menus:
GET    /api/menus                   → Get all menus
GET    /api/menus?category_id=1    → Filter by category
POST   /api/menus                   → Create menu
PUT    /api/menus/[id]              → Update menu
DELETE /api/menus/[id]              → Delete menu

Tables:
GET    /api/tables                  → Get all tables

Orders:
GET    /api/orders                  → Get all orders
GET    /api/orders?start_date=...  → Filter by date
POST   /api/orders                  → Create order
GET    /api/orders/[id]             → Get order detail
PUT    /api/orders/[id]             → Update order status
DELETE /api/orders/[id]             → Delete order

Dashboard:
GET    /api/dashboard/stats         → Get statistics
GET    /api/dashboard/stats?start_date=...&end_date=...

QR Codes:
GET    /api/qr/tables               → Get tables with QR codes
```

## 🗄️ Database Schema

```
┌─────────────┐
│   users     │
├─────────────┤
│ id          │ PK
│ username    │
│ password    │
│ role        │
│ name        │
└─────────────┘
       │
       │ (cashier_id)
       │
       ▼
┌─────────────┐      ┌──────────────┐
│  categories │      │    tables    │
├─────────────┤      ├──────────────┤
│ id          │ PK   │ id           │ PK
│ name        │      │ table_number │
│ description │      │ qr_code      │
└─────────────┘      │ status       │
       │             └──────────────┘
       │ (category_id)      │
       │                    │ (table_id)
       ▼                    │
┌─────────────┐            │
│    menus    │            │
├─────────────┤            │
│ id          │ PK         │
│ category_id │ FK         │
│ name        │            │
│ description │            │
│ price       │            │
│ image       │            │
│ is_available│            │
└─────────────┘            │
       │                   │
       │ (menu_id)         │
       │                   │
       ▼                   ▼
┌──────────────┐    ┌─────────────┐
│ order_items  │◄───│   orders    │
├──────────────┤    ├─────────────┤
│ id           │ PK │ id          │ PK
│ order_id     │ FK │ order_number│
│ menu_id      │ FK │ table_id    │ FK
│ quantity     │    │ order_type  │
│ price        │    │ customer_name│
│ subtotal     │    │ total_amount│
│ notes        │    │ payment_*   │
└──────────────┘    │ status      │
                    │ cashier_id  │ FK
                    └─────────────┘
```

## 🔄 Data Flow

### 1. Customer View (Homepage)
```
User → Homepage
  ↓
Fetch /api/categories
Fetch /api/menus
  ↓
Display menu grid
Filter by category
```

### 2. Login Flow
```
User → Login Page
  ↓
Input credentials
  ↓
POST /api/auth/login
  ↓
Verify password (bcrypt)
  ↓
Store user in localStorage
  ↓
Redirect based on role:
  - kasir → /kasir
  - admin/developer → /dashboard
```

### 3. Order Flow (Kasir)
```
Kasir → Login → /kasir
  ↓
Select order type (Dine In/Take Away)
  ↓
Select table (if Dine In)
  ↓
Add items to cart
  ↓
Select payment method
  ↓
Input payment amount (if cash)
  ↓
POST /api/orders
  ↓
Database Transaction:
  - Insert order
  - Insert order_items
  - Update table status
  ↓
Return order number & change
```

### 4. Dashboard Flow (Admin)
```
Admin → Login → /dashboard
  ↓
Select date range
  ↓
GET /api/dashboard/stats?start_date=...&end_date=...
  ↓
Display:
  - Total orders
  - Total revenue
  - Average order value
  - Daily orders chart
  - Daily revenue chart
```

### 5. Menu Management Flow
```
Admin → /dashboard/menus
  ↓
GET /api/menus
GET /api/categories
  ↓
Display menu list
  ↓
Add new menu:
  POST /api/menus
  ↓
Update menu:
  PUT /api/menus/[id]
  ↓
Delete menu:
  DELETE /api/menus/[id]
```

## 🎨 Component Hierarchy

```
RootLayout (layout.js)
│
├── Homepage (page.js)
│   ├── Navbar
│   ├── Hero Section
│   ├── Category Filter
│   └── Menu Grid
│       └── Menu Card (x N)
│
├── LoginPage (login/page.js)
│   └── Login Form
│
├── KasirPage (kasir/page.js)
│   ├── Navbar
│   ├── Order Type Selector
│   ├── Table Selector
│   ├── Menu Grid
│   └── Cart Sidebar
│       ├── Cart Items
│       ├── Payment Form
│       └── Submit Button
│
├── DashboardPage (dashboard/page.js)
│   ├── Navbar
│   ├── Date Filter
│   ├── Stats Cards (x3)
│   └── Charts
│       ├── Daily Orders Chart
│       └── Daily Revenue Chart
│
├── MenusManagementPage (dashboard/menus/page.js)
│   ├── Navbar
│   ├── Add Menu Button
│   ├── Menu Form (conditional)
│   └── Menu Table
│
└── QRCodesPage (qr-codes/page.js)
    ├── Navbar
    └── QR Grid
        └── QR Card (x N)
```

## 🔐 Security Layers

```
1. Environment Variables (.env.local)
   ↓
2. Database Connection (lib/db.js)
   ↓
3. Password Hashing (bcryptjs)
   ↓
4. SQL Injection Prevention (prepared statements)
   ↓
5. Client-side Auth Check (localStorage)
   ↓
6. Role-based Access Control
```

## 📦 Dependencies Tree

```
Production:
├── next (16.2.3)
├── react (19.2.4)
├── react-dom (19.2.4)
├── mysql2 (3.22.0)
├── bcryptjs (3.0.3)
├── animate.css (4.1.1)
├── qrcode (1.5.4)
└── flatpickr (4.6.13)

Development:
├── tailwindcss (4)
├── @tailwindcss/postcss (4)
├── typescript (5)
├── eslint (9)
└── eslint-config-next (16.2.3)
```

## 🚀 Build Process

```
Development:
npm run dev
  ↓
Next.js Dev Server (Port 3000)
  ↓
Hot Module Replacement
  ↓
Fast Refresh

Production:
npm run build
  ↓
Next.js Build
  ↓
Optimize & Bundle
  ↓
Generate Static Pages
  ↓
npm start
  ↓
Production Server
```

## 📊 Performance Optimization

```
1. Server Components (default in App Router)
2. Database Connection Pooling
3. Lazy Loading Images
4. CSS Optimization (Tailwind)
5. Code Splitting (automatic)
6. Caching Strategy
7. Minimal JavaScript Bundle
```

## 🎯 Key Files Explained

| File | Purpose |
|------|---------|
| `app/layout.js` | Root layout, global styles |
| `app/page.js` | Homepage (customer view) |
| `lib/db.js` | Database connection pool |
| `lib/auth.js` | Auth utilities (hash, verify) |
| `database/cafe_db.sql` | Database schema + seed |
| `.env.local` | Environment configuration |
| `test-db.js` | Database connection test |
| `scripts/generatePassword.js` | Password hash generator |
| `scripts/generateQRCodes.js` | QR code generator |

---

**Struktur ini dirancang untuk**:
- ✅ Mudah dipahami
- ✅ Mudah di-maintain
- ✅ Scalable
- ✅ Best practices Next.js
- ✅ Clean code architecture
