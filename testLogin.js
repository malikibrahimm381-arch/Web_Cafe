#!/usr/bin/env node

const BASE_URL = 'http://localhost:3000';

async function testLogin() {
  console.log('🧪 Testing Login API\n');
  
  try {
    console.log('📤 Sending login request...');
    console.log('   Username: admin');
    console.log('   Special: !@#$%');
    console.log('   Password: admin123\n');
    
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        specialChars: '!@#$%',
        password: 'admin123'
      })
    });

    const data = await response.json();
    
    console.log('📥 Response Status:', response.status);
    console.log('📊 Response Data:', JSON.stringify(data, null, 2), '\n');
    
    if (data.success) {
      console.log('✅ LOGIN SUCCESSFUL!');
      console.log('   User:', data.user.name);
      console.log('   Role:', data.user.role);
      console.log('   Username:', data.user.username);
      
      const cookies = response.headers.get('set-cookie');
      console.log('   Cookie Set:', cookies ? 'YES ✅' : 'NO ❌');
      
      console.log('\n🎉 Login API is working correctly!\n');
    } else {
      console.log('❌ LOGIN FAILED!');
      console.log('   Error:', data.error);
      console.log('\n🔍 Troubleshooting:');
      console.log('   1. Check if database is running');
      console.log('   2. Check if users table has data');
      console.log('   3. Run: node scripts/setupCompleteDatabase.js\n');
    }
    
  } catch (error) {
    console.log('❌ REQUEST FAILED!');
    console.log('   Error:', error.message);
    console.log('\n🔍 Troubleshooting:');
    console.log('   1. Is server running? Check: http://localhost:3000');
    console.log('   2. Run: npm run dev');
    console.log('   3. Check if port 3000 is available\n');
  }
}

testLogin();
