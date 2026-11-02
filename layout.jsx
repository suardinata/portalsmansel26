import './globals.css';

export const metadata = {
  title: 'Portal Digital SMAN 1 Selat',
  description: 'Portal Web Resmi SMAN 1 Selat Terintegrasi Google Sites',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
