# API Documentation - Cafe App

Base URL: `http://localhost:3000/api`

## Authentication

### Login
**POST** `/auth/login`

Login user dengan format khusus: username + special_chars + password

**Request Body:**
```json
{
  "username": "admin",
  "specialChars": "!@#$%",
  "password": "admin123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Administrator",
    "role": "admin"
  }
}
```

**Response Error (401):**
```json
{
  "error": "Username atau password salah"
}
```

---

## Categories

### Get All Categories
**GET** `/categories`

Mengambil semua kategori menu.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Makanan",
      "description": "Menu makanan",
      "created_at": "2026-04-14T10:00:00.000Z"
    }
  ]
}
```

---

## Menus

### Get All Menus
**GET** `/menus`

Mengambil semua menu yang tersedia.

**Query Parameters:**
- `category_id` (optional): Filter by category ID

**Example:**
```
GET /menus
GET /menus?category_id=1
```

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category_id": 1,
      "name": "Nasi Goreng",
      "description": "Nasi goreng spesial dengan telur",
      "price": 25000,
      "image": "/images/nasi-goreng.jpg",
      "is_available": true,
      "category_name": "Makanan",
      "created_at": "2026-04-14T10:00:00.000Z",
      "updated_at": "2026-04-14T10:00:00.000Z"
    }
  ]
}
```

### Create Menu
**POST** `/menus`

Membuat menu baru (Admin only).

**Request Body:**
```json
{
  "category_id": 1,
  "name": "Nasi Goreng Special",
  "description": "Nasi goreng dengan topping lengkap",
  "price": 30000,
  "image": "/images/nasi-goreng-special.jpg"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": 6
  }
}
```

### Update Menu
**PUT** `/menus/[id]`

Update menu berdasarkan ID (Admin only).

**Request Body:**
```json
{
  "category_id": 1,
  "name": "Nasi Goreng Special Updated",
  "description": "Deskripsi baru",
  "price": 35000,
  "image": "/images/new-image.jpg",
  "is_available": true
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Menu berhasil diupdate"
}
```

### Delete Menu
**DELETE** `/menus/[id]`

Hapus menu berdasarkan ID (Admin only).

**Response Success (200):**
```json
{
  "success": true,
  "message": "Menu berhasil dihapus"
}
```

---

## Tables

### Get All Tables
**GET** `/tables`

Mengambil semua data meja.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "table_number": "01",
      "qr_code": null,
      "status": "available",
      "created_at": "2026-04-14T10:00:00.000Z"
    }
  ]
}
```

---

## Orders

### Get All Orders
**GET** `/orders`

Mengambil semua order.

**Query Parameters:**
- `start_date` (optional): Filter start date (YYYY-MM-DD)
- `end_date` (optional): Filter end date (YYYY-MM-DD)

**Example:**
```
GET /orders
GET /orders?start_date=2026-04-01&end_date=2026-04-30
```

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "order_number": "ORD-20260414-0001",
      "table_id": 1,
      "order_type": "dine_in",
      "customer_name": "John Doe",
      "total_amount": 50000,
      "payment_method": "tunai",
      "payment_amount": 100000,
      "change_amount": 50000,
      "status": "completed",
      "cashier_id": 2,
      "cashier_name": "Kasir 1",
      "table_number": "01",
      "created_at": "2026-04-14T10:00:00.000Z",
      "updated_at": "2026-04-14T10:00:00.000Z"
    }
  ]
}
```

### Create Order
**POST** `/orders`

Membuat order baru (Kasir).

**Request Body:**
```json
{
  "table_id": 1,
  "order_type": "dine_in",
  "customer_name": "John Doe",
  "items": [
    {
      "menu_id": 1,
      "quantity": 2,
      "price": 25000,
      "notes": "Pedas"
    },
    {
      "menu_id": 3,
      "quantity": 1,
      "price": 5000
    }
  ],
  "payment_method": "tunai",
  "payment_amount": 100000,
  "cashier_id": 2
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "order_id": 1,
    "order_number": "ORD-20260414-0001",
    "total_amount": 55000,
    "change_amount": 45000
  }
}
```

### Get Order Detail
**GET** `/orders/[id]`

Mengambil detail order beserta items.

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "order_number": "ORD-20260414-0001",
    "table_id": 1,
    "order_type": "dine_in",
    "customer_name": "John Doe",
    "total_amount": 55000,
    "payment_method": "tunai",
    "payment_amount": 100000,
    "change_amount": 45000,
    "status": "completed",
    "cashier_id": 2,
    "cashier_name": "Kasir 1",
    "table_number": "01",
    "created_at": "2026-04-14T10:00:00.000Z",
    "items": [
      {
        "id": 1,
        "order_id": 1,
        "menu_id": 1,
        "menu_name": "Nasi Goreng",
        "quantity": 2,
        "price": 25000,
        "subtotal": 50000,
        "notes": "Pedas"
      }
    ]
  }
}
```

### Update Order Status
**PUT** `/orders/[id]`

Update status order.

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Status order berhasil diupdate"
}
```

### Delete Order
**DELETE** `/orders/[id]`

Hapus order (Admin only).

**Response Success (200):**
```json
{
  "success": true,
  "message": "Order berhasil dihapus"
}
```

---

## Dashboard

### Get Dashboard Statistics
**GET** `/dashboard/stats`

Mengambil statistik untuk dashboard (Admin).

**Query Parameters:**
- `start_date` (optional): Filter start date (YYYY-MM-DD)
- `end_date` (optional): Filter end date (YYYY-MM-DD)

**Example:**
```
GET /dashboard/stats
GET /dashboard/stats?start_date=2026-04-01&end_date=2026-04-30
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "daily_orders": [
      {
        "date": "2026-04-14",
        "count": 15
      }
    ],
    "daily_revenue": [
      {
        "date": "2026-04-14",
        "revenue": 750000
      }
    ],
    "total_stats": {
      "total_orders": 15,
      "total_revenue": 750000,
      "avg_order_value": 50000
    }
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Data tidak lengkap"
}
```

### 401 Unauthorized
```json
{
  "error": "Username atau password salah"
}
```

### 404 Not Found
```json
{
  "error": "Data tidak ditemukan"
}
```

### 500 Internal Server Error
```json
{
  "error": "Terjadi kesalahan server"
}
```

---

## Testing dengan cURL

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "specialChars": "!@#$%",
    "password": "admin123"
  }'
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
    "customer_name": "Test Customer",
    "items": [
      {
        "menu_id": 1,
        "quantity": 2,
        "price": 25000
      }
    ],
    "payment_method": "tunai",
    "payment_amount": 100000,
    "cashier_id": 2
  }'
```

### Get Dashboard Stats
```bash
curl "http://localhost:3000/api/dashboard/stats?start_date=2026-04-01&end_date=2026-04-30"
```

---

## Notes

- Semua endpoint menggunakan JSON format
- Tanggal menggunakan format ISO 8601 (YYYY-MM-DD)
- Currency dalam Rupiah (IDR) tanpa desimal untuk tampilan
- Status order: `pending`, `completed`, `cancelled`
- Order type: `dine_in`, `take_away`
- Payment method: `tunai`, `non_tunai`
- User roles: `customer`, `kasir`, `admin`, `developer`

## Rate Limiting

Saat ini tidak ada rate limiting. Untuk production, disarankan menambahkan:
- Rate limiting per IP
- Authentication token (JWT)
- API key untuk external access
