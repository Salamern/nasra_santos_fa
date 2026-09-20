'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        
        {/* Logo and Academy Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Nasra Santos Football Academy Logo"
            width={48}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-blue-900 leading-none">
              NASRA SANTOS
            </span>
            <span className="text-xs font-bold tracking-wider text-blue-600 leading-tight">
              FOOTBALL ACADEMY
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/teams" className="hover:text-blue-600 transition-colors">
            Teams
          </Link>
          <Link href="/fixtures" className="hover:text-blue-600 transition-colors">
            Fixtures & Results
          </Link>
          <Link href="/registration" className="hover:text-blue-600 transition-colors">
            Register
          </Link>
          <Link href="/#contact" onClick={scrollToContact} className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <div>
          <Link 
            href="/registration" 
            className="rounded-md bg-blue-700 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            REGISTER NOW
          </Link>
        </div>

      </div>
    </header>
  );
}