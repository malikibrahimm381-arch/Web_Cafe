# 🐛 DEBUG KERANJANG

## Server: http://localhost:3000

---

## ✅ PERBAIKAN YANG SUDAH DILAKUKAN:

### 1. **Functional State Updates**
Menggunakan `setCart(prevCart => ...)` untuk memastikan state update dengan benar, bukan `setCart(cart => ...)` yang bisa menyebabkan stale state.

### 2. **Console Logging**
Menambahkan console.log di setiap fungsi untuk tracking:
- `addToCart()` - Log menu yang ditambahkan dan cart sebelum/sesudah
- `updateQuantity()` - Log perubahan quantity
- `removeFromCart()` - Log item yang dihapus
- Render - Log cart state setiap render

---

## 🔍 CARA DEBUG:

### 1. Buka Browser
```
http://localhost:3000
```

### 2. Buka Developer Tools
- Tekan **F12** atau **Cmd+Option+I** (Mac)
- Pilih tab **Console**

### 3. Test Tambah ke Keranjang
- Scroll ke menu section
- Click "Tambah ke Keranjang" pada menu apapun
- **Lihat di Console:**
  ```
  🛒 Adding to cart: {id: 1, name: "...", price: ...}
  📦 Previous cart: []
  ✅ Updated cart (new item): [{id: 1, ...}]
  🔍 Current cart state: [{id: 1, ...}]
  🔍 Cart length: 1
  ```

### 4. Cek Keranjang Sidebar
- Sidebar harus muncul otomatis
- Item harus tampil di dalam keranjang
- **Jika masih kosong**, lihat console untuk error

---

## 🚨 KEMUNGKINAN MASALAH:

### Masalah 1: Menu tidak punya `id`
**Solusi:** Cek di console apakah menu object punya property `id`
```javascript
console.log('Menu object:', menu);
```

### Masalah 2: State tidak update
**Solusi:** Sudah diperbaiki dengan functional update `setCart(prevCart => ...)`

### Masalah 3: Re-render tidak terjadi
**Solusi:** Cek apakah ada error di console yang block rendering

### Masalah 4: Cart items tidak ter-render
**Solusi:** Cek apakah `cart.map()` berjalan dengan benar

---

## 📝 CHECKLIST DEBUG:

1. [ ] Buka http://localhost:3000
2. [ ] Buka Console (F12)
3. [ ] Click "Tambah ke Keranjang"
4. [ ] Lihat log "🛒 Adding to cart"
5. [ ] Lihat log "✅ Updated cart"
6. [ ] Lihat log "🔍 Current cart state"
7. [ ] Cek apakah sidebar muncul
8. [ ] Cek apakah item tampil di sidebar
9. [ ] Test button +/- quantity
10. [ ] Test button delete
11. [ ] Test checkout

---

## 💡 JIKA MASIH BERMASALAH:

Kirim screenshot dari:
1. **Console tab** - untuk lihat log dan error
2. **Network tab** - untuk lihat API calls
3. **Keranjang sidebar** - untuk lihat tampilan

---

## 🎯 EXPECTED BEHAVIOR:

1. Click "Tambah ke Keranjang" → Sidebar muncul
2. Item tampil di sidebar dengan nama, harga, quantity
3. Button +/- berfungsi update quantity
4. Button delete berfungsi hapus item
5. Total harga ter-kalkulasi dengan benar
6. Button "Checkout" muncul jika ada item
7. Modal checkout muncul saat click "Checkout"
8. Order berhasil dibuat setelah isi form dan click "Selesai"
