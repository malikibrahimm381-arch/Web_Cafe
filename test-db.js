const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  console.log('Configuration:');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`User: ${process.env.DB_USER}`);
  console.log(`Database: ${process.env.DB_NAME}`);
  console.log(`Port: ${process.env.DB_PORT}\n`);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    
    console.log('✅ Database connected successfully!\n');
    
    // Test queries
    const [users] = await connection.query('SELECT id, username, role, name FROM users');
    console.log(`✅ Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.role})`);
    });
    
    const [categories] = await connection.query('SELECT COUNT(*) as count FROM categories');
    console.log(`\n✅ Found ${categories[0].count} categories`);
    
    const [menus] = await connection.query('SELECT COUNT(*) as count FROM menus');
    console.log(`✅ Found ${menus[0].count} menus`);
    
    const [tables] = await connection.query('SELECT COUNT(*) as count FROM tables');
    console.log(`✅ Found ${tables[0].count} tables`);
    
    console.log('\n🎉 All tests passed! Database is ready.');
    
    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(`   Error: ${error.message}`);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MySQL/MariaDB is running');
    console.error('   2. Check your .env.local configuration');
    console.error('   3. Verify database "cafe_db" exists');
    console.error('   4. Run: mysql -u root -p < database/cafe_db.sql');
    process.exit(1);
  }
}

testConnection();
