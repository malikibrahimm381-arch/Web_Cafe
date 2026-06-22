# Enhancement Guide - Cafe App v2.0

## 🎉 What's New

### 1. ✅ Drizzle ORM Integration
- Modern type-safe ORM untuk MySQL
- Schema definitions dengan TypeScript support
- Better query builder dan relations
- Migration support

### 2. ✅ TanStack Table (React Table v8)
- Server-side table dengan sorting
- Pagination support
- Global filtering/search
- Responsive table design
- Halaman Orders Management baru

### 3. ✅ Loading Skeletons
- CardSkeleton untuk menu cards
- TableSkeleton untuk tables
- StatCardSkeleton untuk dashboard stats
- ChartSkeleton untuk charts
- FormSkeleton untuk forms
- MenuGridSkeleton untuk menu grid

### 4. ✅ Sidebar Navigation
- Modern sidebar dengan Metis Menu style
- Role-based menu items
- Mobile responsive dengan toggle
- Active state indicators
- Smooth transitions

### 5. ✅ Cookie-based Authentication
- HttpOnly cookies untuk security
- Auto-expire di jam 12 malam
- Server-side validation
- Middleware protection
- No more localStorage

### 6. ✅ Error Handling & Polish
- Better error messages
- Loading states di semua pages
- Disabled states saat loading
- Smooth transitions
- Better UX overall

---

## 📦 New Dependencies

```json
{
  "@tanstack/react-table": "^8.x",
  "drizzle-orm": "^0.x",
  "drizzle-kit": "^0.x",
  "js-cookie": "^3.x"
}
```

---

## 🗄️ Drizzle ORM Setup

### Schema Location
```
lib/db/schema.js
```

### Configuration
```
drizzle.config.js
```

### Commands

```bash
# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# Open Drizzle Studio (GUI)
npm run db:studio
```

### Usage Example

```javascript
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Select
const userList = await db.select().from(users).where(eq(users.username, 'admin'));

// Insert
await db.insert(users).values({
  username: 'newuser',
  password: 'hashed',
  role: 'kasir',
  name: 'New User'
});

// Update
await db.update(users)
  .set({ name: 'Updated Name' })
  .where(eq(users.id, 1));

// Delete
await db.delete(users).where(eq(users.id, 1));
```

---

## 📊 TanStack Table

### Location
```
app/dashboard/orders/page.js
```

### Features
- ✅ Sorting (click column headers)
- ✅ Pagination (10, 20, 30, 50 per page)
- ✅ Global search/filter
- ✅ Responsive design
- ✅ Custom cell rendering

### Usage Example

```javascript
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

const columns = [
  {
    accessorKey: 'order_number',
    header: 'Order Number',
    cell: info => <span>{info.getValue()}</span>,
  },
  // ... more columns
];

const table = useReactTable({
  data: orders,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
```

---

## 🎨 Loading Skeletons

### Location
```
components/LoadingSkeleton.js
```

### Available Components

#### 1. CardSkeleton
```javascript
import { CardSkeleton } from '@/components/LoadingSkeleton';

<CardSkeleton />
```

#### 2. TableSkeleton
```javascript
import { TableSkeleton } from '@/components/LoadingSkeleton';

<TableSkeleton rows={10} columns={5} />
```

#### 3. StatCardSkeleton
```javascript
import { StatCardSkeleton } from '@/components/LoadingSkeleton';

<StatCardSkeleton />
```

#### 4. ChartSkeleton
```javascript
import { ChartSkeleton } from '@/components/LoadingSkeleton';

<ChartSkeleton />
```

#### 5. MenuGridSkeleton
```javascript
import { MenuGridSkeleton } from '@/components/LoadingSkeleton';

<MenuGridSkeleton count={8} />
```

---

## 🎯 Sidebar Navigation

### Location
```
components/Sidebar.js
```

### Features
- Role-based menu filtering
- Active route highlighting
- Mobile responsive
- Logout button
- User info display

### Usage

```javascript
import Sidebar from '@/components/Sidebar';

<Sidebar user={user} onLogout={handleLogout} />
```

### Menu Configuration

Edit `components/Sidebar.js`:

```javascript
const menuItems = [
  {
    title: 'Dashboard',
    icon: '📊',
    path: '/dashboard',
    roles: ['admin', 'developer'],
  },
  // Add more items...
];
```

---

## 🍪 Cookie Authentication

### How It Works

1. **Login** → Server sets HttpOnly cookie
2. **Cookie expires** at midnight (00:00:00)
3. **Middleware** checks cookie on every request
4. **Auto-redirect** if not authenticated

### API Endpoints

#### Login
```javascript
POST /api/auth/login
// Sets cookie, returns user data
```

#### Logout
```javascript
POST /api/auth/logout
// Clears cookie
```

#### Get Current User
```javascript
GET /api/auth/me
// Returns user from cookie
```

### Server-side Usage

```javascript
import { getAuthCookie, setAuthCookie, clearAuthCookie } from '@/lib/cookies';

// Get user
const user = getAuthCookie();

// Set cookie (expires at midnight)
setAuthCookie(userData);

// Clear cookie
clearAuthCookie();
```

### Middleware Protection

File: `middleware.js`

```javascript
// Protects routes automatically
// Public: /, /login, /qr-codes, /api/*
// Protected: /dashboard/*, /kasir
```

---

## 🔄 Migration from v1.0

### 1. Update Authentication

**Old (localStorage):**
```javascript
localStorage.setItem('user', JSON.stringify(user));
const user = JSON.parse(localStorage.getItem('user'));
```

**New (cookies):**
```javascript
// Server-side only
setAuthCookie(user);
const user = getAuthCookie();

// Client-side
const res = await fetch('/api/auth/me');
const { user } = await res.json();
```

### 2. Add Loading States

**Before:**
```javascript
const [data, setData] = useState([]);
```

**After:**
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

// In fetch
setLoading(true);
// ... fetch data
setLoading(false);

// In render
{loading ? <Skeleton /> : <Data />}
```

### 3. Add Sidebar

**Before:**
```javascript
<nav>...</nav>
<main>...</main>
```

**After:**
```javascript
<div className="flex">
  <Sidebar user={user} onLogout={handleLogout} />
  <main className="flex-1 lg:ml-64">...</main>
</div>
```

---

## 🎨 UI Improvements

### 1. Better Loading States
- Skeleton screens instead of "Loading..."
- Smooth transitions
- Better UX

### 2. Disabled States
- Buttons disabled saat loading
- Visual feedback
- Prevent double-submit

### 3. Error Handling
- Better error messages
- Animated error alerts
- User-friendly messages

### 4. Responsive Design
- Mobile-first approach
- Sidebar toggle untuk mobile
- Responsive tables

---

## 📱 New Pages

### 1. Orders Management
**URL:** `/dashboard/orders`

**Features:**
- TanStack Table dengan sorting
- Pagination
- Search/filter
- Status badges
- Responsive design

**Access:** Admin, Developer only

---

## 🔐 Security Improvements

### 1. HttpOnly Cookies
- Cannot be accessed via JavaScript
- XSS protection
- Secure flag in production

### 2. Middleware Protection
- Server-side route protection
- Role-based access control
- Auto-redirect

### 3. Cookie Expiration
- Auto-expire at midnight
- No manual logout needed
- Better session management

---

## 🚀 Performance Improvements

### 1. Drizzle ORM
- Type-safe queries
- Better performance
- Connection pooling

### 2. Loading Skeletons
- Perceived performance
- Better UX
- No layout shift

### 3. Optimized Queries
- Select only needed fields
- Better indexing
- Efficient joins

---

## 📝 Code Quality

### 1. Better Error Handling
```javascript
try {
  // ... code
} catch (error) {
  console.error('Error:', error);
  setError('User-friendly message');
}
```

### 2. Loading States
```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    // ... code
  } finally {
    setLoading(false);
  }
};
```

### 3. Disabled States
```javascript
<button disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</button>
```

---

## 🧪 Testing

### Test Cookie Authentication
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","specialChars":"!@#$%","password":"admin123"}' \
  -c cookies.txt

# Get user (with cookie)
curl http://localhost:3000/api/auth/me -b cookies.txt

# Logout
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```

### Test Drizzle ORM
```bash
# Open Drizzle Studio
npm run db:studio

# Access: http://localhost:4983
```

---

## 📚 Documentation Updates

### New Files
- `ENHANCEMENT_GUIDE.md` - This file
- `components/LoadingSkeleton.js` - Skeleton components
- `components/Sidebar.js` - Sidebar component
- `lib/cookies.js` - Cookie utilities
- `lib/db/schema.js` - Drizzle schema
- `middleware.js` - Route protection
- `drizzle.config.js` - Drizzle config

### Updated Files
- `app/page.js` - Added loading skeleton
- `app/login/page.js` - Cookie auth
- `app/dashboard/page.js` - Sidebar + skeleton
- `app/api/auth/login/route.js` - Cookie auth
- `lib/db.js` - Drizzle integration
- `package.json` - New scripts

---

## 🎯 Next Steps

### Recommended Enhancements
1. ✅ Add more pages with TanStack Table
2. ✅ Implement real-time updates (WebSocket)
3. ✅ Add export to Excel/PDF
4. ✅ Add advanced filters
5. ✅ Add charts library (Chart.js/Recharts)
6. ✅ Add notifications system
7. ✅ Add user management page
8. ✅ Add settings page

---

## 🐛 Troubleshooting

### Cookie Not Working
```javascript
// Check middleware.js
// Check cookie settings in lib/cookies.js
// Check browser dev tools → Application → Cookies
```

### Drizzle Errors
```bash
# Regenerate schema
npm run db:generate

# Push to database
npm run db:push
```

### Table Not Sorting
```javascript
// Check sorting state
const [sorting, setSorting] = useState([]);

// Check table config
onSortingChange: setSorting,
getSortedRowModel: getSortedRowModel(),
```

---

## 📞 Support

Jika ada masalah:
1. Check console untuk errors
2. Check network tab untuk API calls
3. Check middleware logs
4. Baca dokumentasi ini
5. Check Drizzle Studio untuk database

---

**Version:** 2.0.0
**Last Updated:** April 20, 2026
**Status:** ✅ Production Ready

Selamat menggunakan Cafe App v2.0! 🎉☕
