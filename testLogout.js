#!/usr/bin/env node

/**
 * Script untuk test logout functionality
 * Usage: node scripts/testLogout.js
 */

const BASE_URL = 'http://localhost:3000';

async function testLogout() {
  console.log('🧪 Testing Logout Functionality\n');
  
  try {
    // Test 1: Login
    console.log('1️⃣ Testing Login...');
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        specialChars: '!@#$%',
        password: 'admin123'
      })
    });
    
    const loginData = await loginRes.json();
    
    if (loginData.success) {
      console.log('   ✅ Login successful');
      console.log('   User:', loginData.user.name, '-', loginData.user.role);
    } else {
      console.log('   ❌ Login failed:', loginData.error);
      return;
    }
    
    // Get cookie from response
    const cookies = loginRes.headers.get('set-cookie');
    console.log('   Cookie set:', cookies ? '✅' : '❌');
    
    // Test 2: Check Auth
    console.log('\n2️⃣ Testing Auth Check...');
    const authRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        'Cookie': cookies || ''
      }
    });
    
    const authData = await authRes.json();
    
    if (authData.success) {
      console.log('   ✅ Auth check successful');
      console.log('   Authenticated as:', authData.user.name);
    } else {
      console.log('   ❌ Auth check failed');
    }
    
    // Test 3: Logout
    console.log('\n3️⃣ Testing Logout...');
    const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Cookie': cookies || '',
        'Content-Type': 'application/json'
      }
    });
    
    const logoutData = await logoutRes.json();
    
    if (logoutData.success) {
      console.log('   ✅ Logout successful');
      console.log('   Message:', logoutData.message);
    } else {
      console.log('   ❌ Logout failed:', logoutData.error);
    }
    
    // Check if cookie is deleted
    const logoutCookies = logoutRes.headers.get('set-cookie');
    console.log('   Cookie deleted:', logoutCookies?.includes('maxAge=0') ? '✅' : '❌');
    
    // Test 4: Check Auth After Logout
    console.log('\n4️⃣ Testing Auth After Logout...');
    const authAfterRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        'Cookie': logoutCookies || ''
      }
    });
    
    const authAfterData = await authAfterRes.json();
    
    if (!authAfterData.success) {
      console.log('   ✅ Auth check failed (as expected)');
      console.log('   User is logged out');
    } else {
      console.log('   ❌ User still authenticated (logout failed!)');
    }
    
    console.log('\n✅ All tests completed!\n');
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

// Run tests
testLogout();
