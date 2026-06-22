const QRCode = require('qrcode');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function generateQRCodes() {
  console.log('🔍 Generating QR Codes for tables...\n');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('✅ Connected to database\n');

    const [tables] = await connection.query('SELECT * FROM tables');

    for (const table of tables) {
      const qrData = {
        table_id: table.id,
        table_number: table.table_number,
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/order?table=${table.id}`
      };

      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData));

      await connection.query(
        'UPDATE tables SET qr_code = ? WHERE id = ?',
        [qrCodeDataURL, table.id]
      );

      console.log(`✅ Generated QR Code for Table ${table.table_number}`);
      console.log(`   URL: ${qrData.url}`);
    }

    console.log(`\n🎉 Successfully generated ${tables.length} QR Codes!`);
    console.log('\nQR Codes are stored in database as Data URLs.');
    console.log('You can display them in your app or export as images.');

    await connection.end();
  } catch (error) {
    console.error('❌ Error generating QR Codes:', error.message);
    process.exit(1);
  }
}

generateQRCodes();
