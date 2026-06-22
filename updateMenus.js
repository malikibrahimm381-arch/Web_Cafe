const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function updateMenus() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cafe_db'
  });

  try {
    console.log('🔄 Menghapus menu lama...');
    await connection.query('DELETE FROM menus');
    
    console.log('📝 Menambahkan menu baru...');
    
    const menus = [
      // MAKANAN BERAT (Category 1)
      [1, 'Nasi Goreng Spesial', 'Nasi goreng dengan telur mata sapi, ayam suwir, dan kerupuk', 28000],
      [1, 'Nasi Goreng Seafood', 'Nasi goreng dengan udang, cumi, dan ikan segar', 35000],
      [1, 'Nasi Ayam Geprek', 'Nasi dengan ayam goreng geprek pedas level 1-5', 30000],
      [1, 'Nasi Ayam Bakar', 'Nasi dengan ayam bakar bumbu kecap manis', 32000],
      [1, 'Nasi Rendang', 'Nasi dengan rendang daging sapi empuk', 38000],
      [1, 'Mie Goreng Spesial', 'Mie goreng dengan telur, sayuran, dan bakso', 22000],
      [1, 'Mie Goreng Seafood', 'Mie goreng dengan udang, cumi, dan sayuran', 30000],
      [1, 'Mie Ayam Bakso', 'Mie ayam dengan bakso, pangsit, dan sayuran', 25000],
      [1, 'Kwetiau Goreng', 'Kwetiau goreng dengan daging sapi dan sayuran', 28000],
      [1, 'Spaghetti Carbonara', 'Spaghetti dengan saus carbonara creamy dan beef bacon', 35000],
      [1, 'Spaghetti Bolognese', 'Spaghetti dengan saus bolognese daging sapi cincang', 35000],
      [1, 'Chicken Katsu Curry', 'Ayam katsu crispy dengan saus kari Jepang dan nasi', 38000],
      [1, 'Beef Burger', 'Burger daging sapi dengan keju, lettuce, tomat, dan kentang goreng', 40000],
      [1, 'Chicken Burger', 'Burger ayam crispy dengan keju dan kentang goreng', 35000],
      [1, 'Nasi Capcay', 'Nasi dengan capcay sayuran dan seafood', 30000],

      // MINUMAN KOPI (Category 2)
      [2, 'Espresso', 'Kopi espresso single shot yang kuat dan pekat', 15000],
      [2, 'Double Espresso', 'Kopi espresso double shot untuk pecinta kopi sejati', 20000],
      [2, 'Americano', 'Espresso dengan air panas, rasa kopi yang smooth', 18000],
      [2, 'Kopi Hitam', 'Kopi hitam original tanpa gula', 12000],
      [2, 'Kopi Susu', 'Kopi dengan susu segar, manis dan creamy', 18000],
      [2, 'Cappuccino', 'Espresso dengan steamed milk dan foam yang lembut', 22000],
      [2, 'Caffe Latte', 'Espresso dengan susu steamed yang creamy', 24000],
      [2, 'Caramel Latte', 'Latte dengan saus caramel manis yang menggoda', 28000],
      [2, 'Vanilla Latte', 'Latte dengan vanilla yang harum dan manis', 28000],
      [2, 'Hazelnut Latte', 'Latte dengan hazelnut yang nutty dan creamy', 28000],
      [2, 'Mocha', 'Espresso dengan cokelat dan susu steamed', 26000],
      [2, 'Caramel Macchiato', 'Espresso dengan vanilla, susu, dan caramel drizzle', 30000],
      [2, 'Affogato', 'Espresso shot dituang di atas vanilla ice cream', 32000],
      [2, 'Vietnamese Coffee', 'Kopi Vietnam dengan susu kental manis', 20000],
      [2, 'Kopi Gula Aren', 'Kopi dengan gula aren asli yang manis alami', 22000],

      // MINUMAN DINGIN (Category 2)
      [2, 'Es Kopi Susu', 'Kopi susu dingin dengan es batu', 20000],
      [2, 'Iced Americano', 'Americano dingin dengan es batu', 20000],
      [2, 'Iced Latte', 'Latte dingin yang creamy dan segar', 26000],
      [2, 'Iced Caramel Latte', 'Iced latte dengan caramel yang manis', 30000],
      [2, 'Iced Mocha', 'Mocha dingin dengan cokelat yang rich', 28000],
      [2, 'Es Teh Manis', 'Teh manis dingin yang menyegarkan', 8000],
      [2, 'Es Teh Lemon', 'Teh dengan lemon segar yang asam manis', 12000],
      [2, 'Es Lemon Tea', 'Lemon tea dingin yang segar', 12000],
      [2, 'Thai Tea', 'Teh Thailand yang manis dan creamy', 18000],
      [2, 'Matcha Latte', 'Matcha Jepang dengan susu yang creamy', 28000],
      [2, 'Iced Matcha Latte', 'Matcha latte dingin yang segar', 30000],
      [2, 'Taro Latte', 'Taro dengan susu yang creamy dan manis', 26000],
      [2, 'Red Velvet Latte', 'Red velvet dengan susu yang creamy', 28000],

      // MINUMAN JUICE & SMOOTHIE (Category 2)
      [2, 'Jus Jeruk', 'Jus jeruk segar tanpa gula tambahan', 15000],
      [2, 'Jus Alpukat', 'Jus alpukat creamy dengan susu dan cokelat', 20000],
      [2, 'Jus Mangga', 'Jus mangga manis dan segar', 18000],
      [2, 'Jus Strawberry', 'Jus strawberry segar dan manis', 20000],
      [2, 'Jus Melon', 'Jus melon segar yang manis', 15000],
      [2, 'Smoothie Strawberry', 'Smoothie strawberry dengan yogurt', 25000],
      [2, 'Smoothie Mango', 'Smoothie mangga dengan yogurt', 25000],
      [2, 'Smoothie Mix Berry', 'Smoothie campuran berry dengan yogurt', 28000],
      [2, 'Milkshake Vanilla', 'Milkshake vanilla yang creamy', 25000],
      [2, 'Milkshake Chocolate', 'Milkshake cokelat yang rich', 25000],
      [2, 'Milkshake Strawberry', 'Milkshake strawberry yang manis', 25000],

      // SNACK & DESSERT (Category 3)
      [3, 'Kentang Goreng', 'Kentang goreng crispy dengan saus sambal dan mayo', 18000],
      [3, 'Kentang Wedges', 'Kentang wedges dengan saus BBQ', 20000],
      [3, 'Onion Rings', 'Onion rings crispy dengan saus tartar', 22000],
      [3, 'Chicken Wings', 'Sayap ayam goreng crispy dengan saus pilihan', 30000],
      [3, 'Chicken Nuggets', 'Nugget ayam crispy dengan saus', 25000],
      [3, 'Pisang Goreng', 'Pisang goreng crispy dengan meses dan keju', 15000],
      [3, 'Pisang Bakar', 'Pisang bakar dengan cokelat dan keju', 18000],
      [3, 'Roti Bakar Cokelat', 'Roti bakar dengan cokelat meses dan keju', 15000],
      [3, 'Roti Bakar Keju', 'Roti bakar dengan keju leleh', 15000],
      [3, 'Roti Bakar Selai', 'Roti bakar dengan selai strawberry atau blueberry', 12000],
      [3, 'Croissant', 'Croissant butter yang flaky dan buttery', 20000],
      [3, 'Croissant Cokelat', 'Croissant dengan cokelat di dalamnya', 25000],
      [3, 'Donut Cokelat', 'Donut dengan topping cokelat', 15000],
      [3, 'Donut Strawberry', 'Donut dengan topping strawberry', 15000],
      [3, 'Donut Vanilla', 'Donut dengan topping vanilla', 15000],
      [3, 'Brownies Cokelat', 'Brownies cokelat yang fudgy dan rich', 20000],
      [3, 'Cheesecake', 'Cheesecake original yang creamy', 28000],
      [3, 'Cheesecake Strawberry', 'Cheesecake dengan topping strawberry', 30000],
      [3, 'Tiramisu', 'Tiramisu Italia yang lembut dengan kopi', 32000],
      [3, 'Waffle', 'Waffle dengan maple syrup dan butter', 25000],
      [3, 'Waffle Cokelat', 'Waffle dengan saus cokelat dan ice cream', 30000],
      [3, 'Pancake', 'Pancake dengan maple syrup dan butter', 25000],
      [3, 'Pancake Cokelat', 'Pancake dengan saus cokelat dan ice cream', 30000],
      [3, 'Ice Cream Vanilla', 'Ice cream vanilla 2 scoop', 18000],
      [3, 'Ice Cream Cokelat', 'Ice cream cokelat 2 scoop', 18000],
      [3, 'Ice Cream Strawberry', 'Ice cream strawberry 2 scoop', 18000]
    ];

    for (const menu of menus) {
      await connection.query(
        'INSERT INTO menus (category_id, name, description, price) VALUES (?, ?, ?, ?)',
        menu
      );
    }

    console.log(`✅ Berhasil menambahkan ${menus.length} menu!`);
    console.log('🎉 Update menu selesai!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

updateMenus();
