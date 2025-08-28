import './globals.css';
import DarkHeader from './components/dark/DarkHeader';

export const metadata = { 
  title: "QuantumPanda - Premium Web Hosting", 
  description: "Lightning-fast, secure, and reliable web hosting solutions for businesses worldwide" 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DarkHeader />
        {children}
      </body>
    </html>
  );
}
