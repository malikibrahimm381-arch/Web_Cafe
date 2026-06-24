'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuGridSkeleton } from '@/components/LoadingSkeleton';

export default function Home() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMenus = async (categoryId = null) => {
    try {
      setLoading(true);
      const url = categoryId 
        ? `/api/menus?category_id=${categoryId}`
        : '/api/menus';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setMenus(data.data);
      }
    } catch (error) {
      console.error('Error fetching menus:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchMenus(categoryId);
  };

  const addToCart = (menu) => {
    console.log('🛒 Adding to cart:', menu);
    
    setCart(prevCart => {
      console.log('📦 Previous cart:', prevCart);
      
      const existingItem = prevCart.find(item => item.id === menu.id);
      
      if (existingItem) {
        const updatedCart = prevCart.map(item => 
          item.id === menu.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('✅ Updated cart (existing item):', updatedCart);
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...menu, quantity: 1 }];
        console.log('✅ Updated cart (new item):', newCart);
        return newCart;
      }
    });
    
    setShowCart(true);
  };

  const updateQuantity = (menuId, newQuantity) => {
    console.log('🔄 Updating quantity:', menuId, newQuantity);
    
    if (newQuantity <= 0) {
      removeFromCart(menuId);
    } else {
      setCart(prevCart => {
        const updatedCart = prevCart.map(item => 
          item.id === menuId 
            ? { ...item, quantity: newQuantity }
            : item
        );
        console.log('✅ Cart after quantity update:', updatedCart);
        return updatedCart;
      });
    }
  };

  const removeFromCart = (menuId) => {
    console.log('🗑️ Removing from cart:', menuId);
    
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== menuId);
      console.log('✅ Cart after removal:', updatedCart);
      return updatedCart;
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!customerName.trim() || !tableNumber.trim()) {
      alert('Mohon isi nama pelanggan dan nomor meja');
      return;
    }

    if (cart.length === 0) {
      alert('Keranjang belanja kosong');
      return;
    }

    try {
      const orderData = {
        table_id: null,
        order_type: 'dine_in',
        customer_name: customerName,
        items: cart.map(item => ({
          menu_id: item.id,
          quantity: item.quantity,
          price: item.price,
          notes: null
        })),
        payment_method: 'tunai',
        payment_amount: getTotalPrice(),
        cashier_id: null
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Pesanan berhasil dibuat!\nNomor Order: ${data.data.order_number}\nTotal: Rp ${formatPrice(data.data.total_amount)}`);
        setCart([]);
        setCustomerName('');
        setTableNumber('');
        setShowCart(false);
        setShowCheckout(false);
      } else {
        alert('Gagal membuat pesanan: ' + (data.error || data.message));
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Terjadi kesalahan saat membuat pesanan');
    }
  };

  const getFilteredAndSortedMenus = () => {
    let filtered = menus.filter(menu => 
      menu.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const getMenuImage = (menuName, categoryName) => {
    const name = menuName.toLowerCase();
    const category = categoryName?.toLowerCase() || '';
    
    // Minuman - Coffee (optimized size)
    if (name.includes('kopi hitam') || name.includes('black coffee')) 
      return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&q=75';
    if (name.includes('kopi susu') || name.includes('latte')) 
      return 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&q=75';
    if (name.includes('cappuccino')) 
      return 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&q=75';
    if (name.includes('espresso')) 
      return 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300&h=200&q=75';
    if (name.includes('americano')) 
      return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=200&q=75';
    if (name.includes('caramel')) 
      return 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=300&h=200&q=75';
    
    // Minuman - Tea
    if (name.includes('es teh') || name.includes('iced tea')) 
      return 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&q=75';
    if (name.includes('teh') || name.includes('tea')) 
      return 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=200&q=75';
    if (name.includes('matcha')) 
      return 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300&h=200&q=75';
    if (name.includes('milk tea') || name.includes('taro')) 
      return 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&h=200&q=75';
    
    // Minuman - Others
    if (name.includes('jus') || name.includes('juice')) 
      return 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&q=75';
    if (name.includes('smoothie')) 
      return 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300&h=200&q=75';
    
    // Makanan - Nasi
    if (name.includes('nasi goreng')) 
      return 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&q=75';
    if (name.includes('nasi ayam') || name.includes('ayam geprek')) 
      return 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&h=200&q=75';
    if (name.includes('nasi')) 
      return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&q=75';
    
    // Makanan - Mie
    if (name.includes('mie goreng') || name.includes('mi goreng')) 
      return 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&q=75';
    if (name.includes('spaghetti') || name.includes('pasta')) 
      return 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&q=75';
    if (name.includes('mie') || name.includes('noodle')) 
      return 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&q=75';
    
    // Makanan - Chicken
    if (name.includes('chicken wings') || name.includes('sayap ayam')) 
      return 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=300&h=200&q=75';
    if (name.includes('ayam') || name.includes('chicken')) 
      return 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&q=75';
    
    // Makanan - Others
    if (name.includes('burger')) 
      return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&q=75';
    if (name.includes('pizza')) 
      return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&q=75';
    if (name.includes('sandwich')) 
      return 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&h=200&q=75';
    
    // Snack & Dessert
    if (name.includes('pisang goreng')) 
      return 'https://images.unsplash.com/photo-1587132117816-5c3e8dd2c47a?w=300&h=200&q=75';
    if (name.includes('kentang') || name.includes('french fries')) 
      return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&q=75';
    if (name.includes('brownie') || name.includes('chocolate')) 
      return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&q=75';
    if (name.includes('croissant')) 
      return 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&q=75';
    if (name.includes('donut')) 
      return 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&q=75';
    if (name.includes('cake') || name.includes('kue')) 
      return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&q=75';
    if (name.includes('waffle')) 
      return 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=300&h=200&q=75';
    if (name.includes('pancake')) 
      return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&q=75';
    
    // Default by category
    if (category.includes('minuman')) 
      return 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&q=75';
    if (category.includes('makanan')) 
      return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&q=75';
    if (category.includes('snack')) 
      return 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&q=75';
    
    // Ultimate fallback
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&q=75';
  };

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Makanan': '🍽️',
      'Minuman': '☕',
      'Snack': '🍰'
    };
    return icons[categoryName] || '🍴';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const displayedMenus = getFilteredAndSortedMenus();

  // Debug: Log cart state
  console.log('🔍 Current cart state:', cart);
  console.log('🔍 Cart length:', cart.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Kedai Kopi Santai
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
              >
                <span className="hidden sm:inline">Keranjang</span>
                <span className="sm:hidden">🛒</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <Link 
                href="/login" 
                className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden bg-neutral-50">
        {/* Elegant Background */}
        <div className="absolute inset-0">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30" />
          
          {/* Decorative circles */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-100/20 rounded-full blur-3xl" />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Small badge */}
              <div className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                <span className="text-amber-900 text-sm font-medium">Premium Coffee</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-gray-900">Kedai Kopi</span>
                <br />
                <span className="text-amber-700">Santai</span>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-600 mb-3 font-light">
                Ngopi santai, kerja nyaman, rasa juara.
              </p>
              <p className="text-base text-gray-500 mb-8">
                Nikmati pengalaman kopi terbaik dengan suasana yang nyaman dan pelayanan yang ramah.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-lg font-medium transition-colors shadow-lg shadow-gray-900/20"
                >
                  Lihat Menu
                </button>
                <button
                  onClick={() => document.getElementById('order-via').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-3.5 rounded-lg font-medium transition-colors"
                >
                  Order Sekarang
                </button>
              </div>
              
              {/* Stats - Horizontal */}
              <div className="flex items-center gap-8 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">100+</div>
                  <div className="text-sm text-gray-500">Menu Pilihan</div>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-1">4.9★</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">1K+</div>
                  <div className="text-sm text-gray-500">Pelanggan</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Image Placeholder */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/10">
                  <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=700&q=80&fit=crop"
                    alt="Coffee Shop"
                    className="w-full h-[500px] object-cover"
                    loading="eager"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                </div>
                
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                      ☕
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Spesial Hari Ini</div>
                      <div className="font-bold text-gray-900">Caramel Latte</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex overflow-x-auto gap-3 pb-2">
            <button
              onClick={() => handleCategoryFilter(null)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg whitespace-nowrap transition-colors flex-shrink-0 text-sm font-medium ${
                selectedCategory === null
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🍴</span>
              <span>Semua</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg whitespace-nowrap transition-colors flex-shrink-0 text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{getCategoryIcon(category.name)}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium bg-white placeholder-gray-400"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
          >
            <option value="default">Urutkan: Default</option>
            <option value="asc">Harga: Termurah</option>
            <option value="desc">Harga: Termahal</option>
          </select>
        </div>

        {/* Menu Grid */}
        <section id="menu-section">
          {loading ? (
            <MenuGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedMenus.map((menu) => (
                <div
                  key={menu.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={getMenuImage(menu.name, menu.category_name)}
                      alt={menu.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{menu.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{menu.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        Rp{formatPrice(menu.price)}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                        {menu.category_name}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(menu)}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors"
                    >
                      Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && displayedMenus.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Tidak ada menu ditemukan</p>
            </div>
          )}
        </section>

        {/* Order Via Section */}
        <section id="order-via" className="mt-16 mb-12 bg-gray-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Pesan Via
          </h2>
          <p className="text-gray-300 mb-6 text-sm">Pilih platform favorit Anda</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
            <a
              href="https://gofood.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span className="text-xl">🛵</span>
              GoFood
            </a>
            <a
              href="https://shopee.co.id/food"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span className="text-xl">🛒</span>
              ShopeeFood
            </a>
            <a
              href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20memesan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span className="text-xl">💬</span>
              WhatsApp
            </a>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl flex-shrink-0">
                👤
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2 italic">
                  "Tempatnya cozy, makanannya enak banget! Rekomen banget!!"
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">Rina S.</span>
                  <span className="text-amber-500 text-sm">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Keranjang</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">Keranjang kosong</p>
                  <p className="text-gray-400 text-sm mt-2">Tambahkan menu untuk mulai berbelanja</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-white border-2 border-gray-200 p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Rp {formatPrice(item.price)} / item
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-xl ml-2"
                          >
                            🗑️
                          </button>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-800 w-9 h-9 rounded-lg font-bold text-lg"
                            >
                              -
                            </button>
                            <span className="font-bold text-lg w-10 text-center text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-900 hover:bg-gray-800 text-white w-9 h-9 rounded-lg font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500 mb-1">Subtotal</div>
                            <span className="font-bold text-lg text-gray-900">
                              Rp {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Total Item:</span>
                      <span className="font-bold text-gray-900">{getTotalItems()} item</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total Bayar:</span>
                      <span className="text-2xl font-bold text-gray-900">
                        Rp {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Checkout Pesanan</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Nama Pelanggan</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium bg-white placeholder-gray-400"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Nomor Meja</label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium bg-white placeholder-gray-400"
                placeholder="Contoh: 5"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Total Item:</span>
                <span className="font-semibold">{getTotalItems()} item</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-gray-900">
                  Rp {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2.5 rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2026 Kedai Kopi Santai. All rights reserved.</p>
          <p className="text-gray-400 mt-1 text-sm">Ngopi santai, kerja nyaman, rasa juara</p>
        </div>
      </footer>
    </div>
  );
}
