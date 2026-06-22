const fs = require('fs');
const path = require('path');

console.log('🚀 Generating All Modules...\n');

// Template untuk halaman dengan layout standar
const pageTemplate = (title, icon, description) => `'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function ${title.replace(/\s+/g, '')}Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.success) {
        router.push('/login');
        return;
      }
      
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">${icon}</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">${icon}</span>
              <h1 className="text-3xl font-bold text-gray-800">${title}</h1>
            </div>
            <p className="text-gray-600">${description}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">${icon}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">${title}</h2>
              <p className="text-gray-600 mb-6">${description}</p>
              <p className="text-sm text-gray-500">Module dalam tahap pengembangan</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
`;

// API Route template
const apiTemplate = () => `import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    // TODO: Implement GET logic
    return NextResponse.json({ 
      success: true, 
      message: 'API endpoint ready',
      data: [] 
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    // TODO: Implement POST logic
    return NextResponse.json({ 
      success: true,
      message: 'Created successfully',
      data: body
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
`;

// Modules configuration
const modules = [
  // Master Data
  { path: 'app/master/products/page.js', title: 'Produk', icon: '🍽️', desc: 'Kelola produk dan menu' },
  { path: 'app/master/categories/page.js', title: 'Kategori', icon: '📂', desc: 'Kelola kategori produk' },
  { path: 'app/master/customers/page.js', title: 'Pelanggan', icon: '👥', desc: 'Kelola data pelanggan' },
  { path: 'app/master/suppliers/page.js', title: 'Supplier', icon: '🚚', desc: 'Kelola data supplier' },
  { path: 'app/master/employees/page.js', title: 'Karyawan', icon: '👤', desc: 'Kelola data karyawan' },
  
  // Transaction
  { path: 'app/transaction/pos/page.js', title: 'POS Kasir', icon: '🏪', desc: 'Point of Sale - Kasir' },
  { path: 'app/transaction/online-orders/page.js', title: 'Order Online', icon: '📱', desc: 'Kelola pesanan online' },
  { path: 'app/transaction/reservations/page.js', title: 'Reservasi', icon: '📅', desc: 'Kelola reservasi meja' },
  
  // Kitchen
  { path: 'app/kitchen/incoming/page.js', title: 'Pesanan Masuk', icon: '📥', desc: 'Pesanan yang baru masuk' },
  { path: 'app/kitchen/processing/page.js', title: 'Proses Masak', icon: '🔥', desc: 'Pesanan dalam proses' },
  { path: 'app/kitchen/ready/page.js', title: 'Pesanan Selesai', icon: '✅', desc: 'Pesanan siap diantar' },
  
  // Warehouse
  { path: 'app/warehouse/stock/page.js', title: 'Stok Barang', icon: '📊', desc: 'Kelola stok barang' },
  { path: 'app/warehouse/stock-in/page.js', title: 'Barang Masuk', icon: '📥', desc: 'Input barang masuk' },
  { path: 'app/warehouse/stock-out/page.js', title: 'Barang Keluar', icon: '📤', desc: 'Input barang keluar' },
  
  // Finance
  { path: 'app/finance/income/page.js', title: 'Pendapatan', icon: '💰', desc: 'Kelola pendapatan' },
  { path: 'app/finance/expense/page.js', title: 'Pengeluaran', icon: '💸', desc: 'Kelola pengeluaran' },
  { path: 'app/finance/profit-loss/page.js', title: 'Laba Rugi', icon: '📈', desc: 'Laporan laba rugi' },
  
  // Reports
  { path: 'app/reports/sales/page.js', title: 'Laporan Penjualan', icon: '💰', desc: 'Laporan penjualan' },
  { path: 'app/reports/inventory/page.js', title: 'Laporan Stok', icon: '📦', desc: 'Laporan stok barang' },
  { path: 'app/reports/purchase/page.js', title: 'Laporan Pembelian', icon: '🛒', desc: 'Laporan pembelian' },
  { path: 'app/reports/financial/page.js', title: 'Laporan Keuangan', icon: '💵', desc: 'Laporan keuangan' },
  
  // Settings
  { path: 'app/settings/users/page.js', title: 'User Management', icon: '👤', desc: 'Kelola user dan akun' },
  { path: 'app/settings/permissions/page.js', title: 'Hak Akses', icon: '🔒', desc: 'Kelola hak akses' },
  { path: 'app/settings/system/page.js', title: 'Pengaturan Sistem', icon: '⚙️', desc: 'Pengaturan sistem' },
  { path: 'app/settings/backup/page.js', title: 'Backup Data', icon: '💾', desc: 'Backup dan restore data' },
];

// API Routes
const apiRoutes = [
  'app/api/master/products/route.js',
  'app/api/master/categories/route.js',
  'app/api/master/customers/route.js',
  'app/api/master/suppliers/route.js',
  'app/api/master/employees/route.js',
  'app/api/transaction/pos/route.js',
  'app/api/transaction/online-orders/route.js',
  'app/api/transaction/reservations/route.js',
  'app/api/kitchen/route.js',
  'app/api/warehouse/route.js',
  'app/api/finance/route.js',
  'app/api/reports/route.js',
];

// Generate pages
let created = 0;
modules.forEach(module => {
  const fullPath = path.join(process.cwd(), module.path);
  const content = pageTemplate(module.title, module.icon, module.desc);
  fs.writeFileSync(fullPath, content);
  created++;
  console.log(`✅ Created: ${module.path}`);
});

// Generate API routes
apiRoutes.forEach(route => {
  const fullPath = path.join(process.cwd(), route);
  const content = apiTemplate();
  fs.writeFileSync(fullPath, content);
  created++;
  console.log(`✅ Created: ${route}`);
});

console.log(`\n🎉 Successfully created ${created} files!`);
console.log('\n📁 Modules created:');
console.log('   ✅ Master Data (5 modules)');
console.log('   ✅ Transaction (3 modules)');
console.log('   ✅ Kitchen (3 modules)');
console.log('   ✅ Warehouse (3 modules)');
console.log('   ✅ Finance (3 modules)');
console.log('   ✅ Reports (4 modules)');
console.log('   ✅ Settings (4 modules)');
console.log('   ✅ API Routes (12 endpoints)');
console.log('\n✅ Total: 37 files created!\n');
