export const metadata = { title: "Q Panda", description: "Quantum-native AI hosting" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}