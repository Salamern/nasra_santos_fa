import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "Nasra Santos Football Academy",
  description:
    "Official website of Nasra Santos Football Academy — Your chance to join the gardeners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}