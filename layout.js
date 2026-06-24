import './globals.css';
import 'animate.css';

export const metadata = {
  title: 'Kedai Kopi Santai - Ngopi Santai, Kerja Nyaman, Rasa Juara',
  description: 'Cafe dengan suasana cozy dan menu terbaik. Pesan sekarang via GoFood, ShopeeFood, atau WhatsApp!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
