const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function setupCompleteDatabase() {
  console.log('🚀 Starting Complete Database Setup...\n');
  
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try {
    // Read and execute SQL file
    console.log('📖 Reading SQL file...');
    const sqlFile = fs.readFileSync(
      path.join(__dirname, '../database/cafe_db_complete.sql'),
      'utf8'
    );
    
    console.log('⚙️  Executing SQL statements...');
    await connection.query(sqlFile);
    
    console.log('✅ Database structure created!\n');
    
    // Import menu data
    console.log('📝 Importing menu data...');
    await connection.query('USE cafe_db');
    
    const menuData = [
      // Makanan
      [1, 'Nasi Goreng Spesial', 'Nasi goreng dengan telur mata sapi, ayam suwir, dan kerupuk', 28000, 12000, 100, 10],
      [1, 'Nasi Goreng Seafood', 'Nasi goreng dengan udang, cumi, dan ikan segar', 35000, 15000, 50, 10],
      [1, 'Nasi Ayam Geprek', 'Nasi dengan ayam goreng geprek pedas level 1-5', 30000, 13000, 80, 10],
      [1, 'Nasi Ayam Bakar', 'Nasi dengan ayam bakar bumbu kecap manis', 32000, 14000, 70, 10],
      [1, 'Mie Goreng Spesial', 'Mie goreng dengan telur, sayuran, dan bakso', 22000, 8000, 100, 15],
      [1, 'Spaghetti Carbonara', 'Spaghetti dengan saus carbonara creamy dan beef bacon', 35000, 15000, 50, 10],
      [1, 'Beef Burger', 'Burger daging sapi dengan keju, lettuce, tomat, dan kentang goreng', 40000, 18000, 60, 10],
      
      // Minuman
      [2, 'Espresso', 'Kopi espresso single shot yang kuat dan pekat', 15000, 5000, 200, 20],
      [2, 'Americano', 'Espresso dengan air panas, rasa kopi yang smooth', 18000, 6000, 200, 20],
      [2, 'Cappuccino', 'Espresso dengan steamed milk dan foam yang lembut', 22000, 8000, 150, 15],
      [2, 'Caffe Latte', 'Espresso dengan susu steamed yang creamy', 24000, 9000, 150, 15],
      [2, 'Caramel Latte', 'Latte dengan saus caramel manis yang menggoda', 28000, 10000, 120, 15],
      [2, 'Iced Latte', 'Latte dingin yang creamy dan segar', 26000, 9000, 150, 15],
      [2, 'Es Teh Manis', 'Teh manis dingin yang menyegarkan', 8000, 2000, 300, 30],
      [2, 'Thai Tea', 'Teh Thailand yang manis dan creamy', 18000, 6000, 150, 15],
      [2, 'Matcha Latte', 'Matcha Jepang dengan susu yang creamy', 28000, 12000, 100, 10],
      [2, 'Jus Jeruk', 'Jus jeruk segar tanpa gula tambahan', 15000, 8000, 100, 10],
      [2, 'Jus Alpukat', 'Jus alpukat creamy dengan susu dan cokelat', 20000, 10000, 80, 10],
      
      // Snack
      [3, 'Kentang Goreng', 'Kentang goreng crispy dengan saus sambal dan mayo', 18000, 6000, 150, 20],
      [3, 'Chicken Wings', 'Sayap ayam goreng crispy dengan saus pilihan', 30000, 12000, 100, 10],
      [3, 'Pisang Goreng', 'Pisang goreng crispy dengan meses dan keju', 15000, 5000, 120, 15],
      [3, 'Roti Bakar Cokelat', 'Roti bakar dengan cokelat meses dan keju', 15000, 4000, 150, 20],
      [3, 'Croissant', 'Croissant butter yang flaky dan buttery', 20000, 8000, 80, 10],
      [3, 'Brownies Cokelat', 'Brownies cokelat yang fudgy dan rich', 20000, 7000, 100, 15],
      [3, 'Cheesecake', 'Cheesecake original yang creamy', 28000, 12000, 60, 10],
      [3, 'Tiramisu', 'Tiramisu Italia yang lembut dengan kopi', 32000, 15000, 50, 10]
    ];
    
    for (const menu of menuData) {
      await connection.query(
        'INSERT INTO menus (category_id, name, description, price, cost, stock_qty, min_stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
        menu
      );
    }
    
    console.log(`✅ Imported ${menuData.length} menu items!\n`);
    
    console.log('🎉 Complete Database Setup Finished!\n');
    console.log('📊 Summary:');
    console.log('   ✅ Database created');
    console.log('   ✅ All tables created');
    console.log('   ✅ Default users added (6 users)');
    console.log('   ✅ Categories added (3 categories)');
    console.log('   ✅ Menu items added (27 items)');
    console.log('   ✅ Tables added (10 tables)');
    console.log('   ✅ Permissions configured');
    console.log('   ✅ System settings configured\n');
    
    console.log('🔐 Login Credentials:');
    console.log('   Admin: admin / !@#$% / admin123');
    console.log('   Kasir: kasir / !@#$% / kasir123');
    console.log('   Dapur: dapur / !@#$% / kasir123');
    console.log('   Gudang: gudang / !@#$% / kasir123');
    console.log('   Keuangan: keuangan / !@#$% / kasir123');
    console.log('   Developer: developer / !@#$% / dev123\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

setupCompleteDatabase().catch(console.error);
