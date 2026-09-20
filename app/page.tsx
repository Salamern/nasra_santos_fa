import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nasra Santos Football Academy',
  description: 'Official website of Nasra Santos Football Academy in Nairobi, Kenya',
  verification: {
    google: 'mcZb-JmDySPXeuRZJyZlwZ9YoQObUtY8FAd3E7dBuZU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}