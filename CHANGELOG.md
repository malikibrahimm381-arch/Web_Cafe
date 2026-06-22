# Changelog - Cafe App

All notable changes to this project will be documented in this file.

---

## [2.0.0] - 2026-04-20

### 🎉 Major Updates

#### Added
- **Drizzle ORM Integration**
  - Type-safe database queries
  - Schema definitions in `lib/db/schema.js`
  - Migration support dengan drizzle-kit
  - Drizzle Studio untuk database GUI
  - Better performance dan developer experience

- **TanStack Table (React Table v8)**
  - Server-side table dengan sorting
  - Pagination support (10, 20, 30, 50 per page)
  - Global search/filtering
  - Custom cell rendering
  - New Orders Management page (`/dashboard/orders`)

- **Loading Skeletons**
  - `CardSkeleton` - untuk menu cards
  - `TableSkeleton` - untuk tables
  - `StatCardSkeleton` - untuk dashboard stats
  - `ChartSkeleton` - untuk charts
  - `FormSkeleton` - untuk forms
  - `MenuGridSkeleton` - untuk menu grid
  - Better perceived performance

- **Sidebar Navigation**
  - Modern sidebar dengan Metis Menu style
  - Role-based menu filtering
  - Mobile responsive dengan toggle
  - Active route highlighting
  - User info display
  - Smooth transitions

- **Cookie-based Authentication**
  - HttpOnly cookies untuk security
  - Auto-expire di jam 12 malam (00:00:00)
  - Server-side validation
  - Middleware protection
  - New API endpoints: `/api/auth/logout`, `/api/auth/me`
  - No more localStorage

- **Middleware Protection**
  - Route protection di `middleware.js`
  - Role-based access control
  - Auto-redirect untuk unauthorized access
  - Public routes: `/`, `/login`, `/qr-codes`, `/api/*`
  - Protected routes: `/dashboard/*`, `/kasir`

#### Changed
- **Homepage (`/`)**
  - Added loading skeleton
  - Better loading states
  - Disabled buttons saat loading

- **Login Page (`/login`)**
  - Cookie-based authentication
  - Better loading indicator
  - Session info display
  - Disabled states saat loading

- **Dashboard (`/dashboard`)**
  - Added Sidebar navigation
  - Loading skeletons untuk stats dan charts
  - Better error handling
  - Smooth transitions
  - Cookie-based auth check

- **Database Connection (`lib/db.js`)**
  - Integrated Drizzle ORM
  - Backward compatible dengan raw queries
  - Export both `db` (Drizzle) dan `pool` (mysql2)

- **API Login (`/api/auth/login`)**
  - Now uses Drizzle ORM
  - Sets HttpOnly cookie
  - Returns expiration time
  - Better error handling

#### Fixed
- Error handling di semua pages
- Loading states consistency
- Mobile responsiveness
- Cookie security issues
- Session management
- Route protection

### 📦 Dependencies

#### Added
```json
{
  "@tanstack/react-table": "^8.x",
  "drizzle-orm": "latest",
  "drizzle-kit": "latest",
  "js-cookie": "^3.x"
}
```

### 🗂️ New Files

```
cafe-app/
├── components/
│   ├── LoadingSkeleton.js      # Skeleton components
│   └── Sidebar.js              # Sidebar navigation
├── lib/
│   ├── cookies.js              # Cookie utilities
│   └── db/
│       └── schema.js           # Drizzle schema
├── app/
│   ├── api/auth/
│   │   ├── logout/route.js     # Logout endpoint
│   │   └── me/route.js         # Get current user
│   └── dashboard/
│       └── orders/page.js      # Orders management
├── middleware.js               # Route protection
├── drizzle.config.js          # Drizzle configuration
├── ENHANCEMENT_GUIDE.md       # Enhancement documentation
└── CHANGELOG.md               # This file
```

### 🔄 Migration Guide

#### From v1.0 to v2.0

1. **Authentication**
   ```javascript
   // Old (v1.0)
   localStorage.setItem('user', JSON.stringify(user));
   
   // New (v2.0)
   // Server handles cookies automatically
   const res = await fetch('/api/auth/me');
   ```

2. **Add Loading States**
   ```javascript
   const [loading, setLoading] = useState(true);
   
   {loading ? <Skeleton /> : <Content />}
   ```

3. **Add Sidebar**
   ```javascript
   import Sidebar from '@/components/Sidebar';
   
   <Sidebar user={user} onLogout={handleLogout} />
   ```

### 📝 NPM Scripts

#### New Scripts
```bash
npm run db:generate    # Generate Drizzle migrations
npm run db:push        # Push schema to database
npm run db:studio      # Open Drizzle Studio
```

### 🔐 Security Improvements

- HttpOnly cookies (XSS protection)
- Server-side route protection
- Middleware validation
- Auto-expire sessions
- Secure cookie flags in production

### 🎨 UI/UX Improvements

- Loading skeletons untuk better perceived performance
- Disabled states saat loading
- Better error messages
- Smooth transitions
- Mobile-responsive sidebar
- Active route indicators

### 📊 Performance

- Drizzle ORM untuk faster queries
- Connection pooling
- Optimized database queries
- Better caching strategy
- Reduced client-side JavaScript

---

## [1.0.0] - 2026-04-14

### Initial Release

#### Features
- ✅ Next.js 16 dengan App Router
- ✅ Tailwind CSS styling
- ✅ Animate.css animations
- ✅ MySQL/MariaDB database
- ✅ bcryptjs authentication
- ✅ 4 Role pengguna (Customer, Kasir, Admin, Developer)
- ✅ Menu management (CRUD)
- ✅ Order management (Dine In & Take Away)
- ✅ Payment system (Tunai & Non Tunai)
- ✅ Dashboard dengan statistik
- ✅ QR Code generation
- ✅ REST API (GET, POST, PUT, DELETE)
- ✅ Responsive design
- ✅ 10+ dokumentasi lengkap

#### Pages
- `/` - Homepage (customer view)
- `/login` - Login page
- `/kasir` - POS system
- `/dashboard` - Admin dashboard
- `/dashboard/menus` - Menu management
- `/qr-codes` - QR codes display

#### API Endpoints
- `POST /api/auth/login` - Login
- `GET /api/categories` - Get categories
- `GET /api/menus` - Get menus
- `POST /api/menus` - Create menu
- `PUT /api/menus/[id]` - Update menu
- `DELETE /api/menus/[id]` - Delete menu
- `GET /api/tables` - Get tables
- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order detail
- `PUT /api/orders/[id]` - Update order
- `DELETE /api/orders/[id]` - Delete order
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/qr/tables` - Get QR codes

---

## Upgrade Instructions

### From v1.0 to v2.0

1. **Install New Dependencies**
   ```bash
   npm install @tanstack/react-table drizzle-orm drizzle-kit js-cookie
   ```

2. **Setup Drizzle**
   ```bash
   npm run db:generate
   npm run db:push
   ```

3. **Clear Browser Data**
   - Clear localStorage
   - Clear cookies
   - Hard refresh (Ctrl+Shift+R)

4. **Test Authentication**
   - Login dengan credentials
   - Check cookie di DevTools
   - Test auto-expire (wait until midnight)

5. **Test New Features**
   - Visit `/dashboard/orders`
   - Test table sorting
   - Test pagination
   - Test search/filter

---

## Breaking Changes

### v2.0

- **Authentication**: localStorage → HttpOnly cookies
  - Need to re-login after upgrade
  - Old sessions will be invalid
  
- **Database**: Raw queries → Drizzle ORM
  - Backward compatible
  - Can still use raw queries via `pool`
  
- **Routes**: Added middleware protection
  - Some routes now require authentication
  - Auto-redirect if not authenticated

---

## Deprecations

### v2.0

- `localStorage` for authentication (use cookies instead)
- Direct `pool.query()` in API routes (use Drizzle ORM)

---

## Known Issues

### v2.0

- None reported yet

---

## Roadmap

### v2.1 (Planned)
- [ ] Real-time updates dengan WebSocket
- [ ] Export to Excel/PDF
- [ ] Advanced filters
- [ ] Charts library integration
- [ ] Notifications system

### v2.2 (Planned)
- [ ] User management page
- [ ] Settings page
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Multi-language support

### v3.0 (Future)
- [ ] Mobile app (React Native)
- [ ] Kitchen display system
- [ ] Inventory management
- [ ] Employee management
- [ ] Customer loyalty program

---

## Contributors

- Initial development: Kiro AI Assistant
- Enhancements v2.0: Kiro AI Assistant

---

## License

MIT License - Free to use and modify

---

**For detailed documentation, see:**
- `README.md` - Main documentation
- `ENHANCEMENT_GUIDE.md` - v2.0 enhancements
- `SETUP.md` - Setup guide
- `API_DOCUMENTATION.md` - API reference
