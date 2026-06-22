const bcrypt = require('bcryptjs');

async function generatePassword(username, specialChars, password) {
  const combined = `${username}${specialChars}${password}`;
  const hashed = await bcrypt.hash(combined, 10);
  console.log(`\nUser: ${username}`);
  console.log(`Combined: ${combined}`);
  console.log(`Hash: ${hashed}`);
  console.log('---');
}

async function main() {
  console.log('=== Generate Password Hash untuk Cafe App ===\n');
  
  await generatePassword('admin', '!@#$%', 'admin123');
  await generatePassword('kasir', '!@#$%', 'kasir123');
  await generatePassword('developer', '!@#$%', 'dev123');
  
  console.log('\nCopy hash di atas dan update di file database/cafe_db.sql');
  console.log('pada bagian INSERT INTO users');
}

main();
