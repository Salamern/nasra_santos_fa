"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const scrollToContact = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    setMenuOpen(false);

    if (window.location.pathname === "/") {
      e.preventDefault();

      const contactSection = document.getElementById("contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">

      {/* MAIN NAVBAR */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO + ACADEMY NAME */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="relative h-14 w-14 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Nasra Santos Football Academy Logo"
              fill
              sizes="56px"
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-black leading-none tracking-tight text-blue-950">
              NASRA SANTOS
            </span>

            <span className="mt-1 text-[10px] font-bold leading-none tracking-wider text-blue-600 sm:text-xs">
              FOOTBALL ACADEMY
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-700 lg:flex">
          <Link
            href="/"
            className="transition-colors hover:text-sky-500"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-sky-500"
          >
            About
          </Link>

          <Link
            href="/teams"
            className="transition-colors hover:text-sky-500"
          >
            Teams
          </Link>

          <Link
            href="/fixtures"
            className="transition-colors hover:text-sky-500"
          >
            Fixtures & Results
          </Link>

          <Link
            href="/registration"
            className="transition-colors hover:text-sky-500"
          >
            Register
          </Link>

          <Link
            href="/#contact"
            onClick={scrollToContact}
            className="transition-colors hover:text-sky-500"
          >
            Contact
          </Link>
        </nav>

        {/* DESKTOP REGISTER BUTTON */}
        <div className="hidden lg:block">
          <Link
            href="/registration"
            className="rounded-full bg-blue-950 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
          >
            Register Now
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 text-blue-950 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="text-3xl font-light leading-none">
              ×
            </span>
          ) : (
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-blue-950"></span>
              <span className="block h-0.5 w-6 bg-blue-950"></span>
              <span className="block h-0.5 w-6 bg-blue-950"></span>
            </div>
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 pb-6 pt-2">

            <Link
              href="/"
              onClick={closeMenu}
              className="border-b border-slate-100 py-4 font-bold text-slate-700 transition hover:text-sky-500"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="border-b border-slate-100 py-4 font-bold text-slate-700 transition hover:text-sky-500"
            >
              About
            </Link>

            <Link
              href="/teams"
              onClick={closeMenu}
              className="border-b border-slate-100 py-4 font-bold text-slate-700 transition hover:text-sky-500"
            >
              Teams
            </Link>

            <Link
              href="/fixtures"
              onClick={closeMenu}
              className="border-b border-slate-100 py-4 font-bold text-slate-700 transition hover:text-sky-500"
            >
              Fixtures & Results
            </Link>

            <Link
              href="/registration"
              onClick={closeMenu}
              className="border-b border-slate-100 py-4 font-bold text-slate-700 transition hover:text-sky-500"
            >
              Registration
            </Link>

            <Link
              href="/#contact"
              onClick={scrollToContact}
              className="py-4 font-bold text-slate-700 transition hover:text-sky-500"
            >
              Contact
            </Link>

            <Link
              href="/registration"
              onClick={closeMenu}
              className="mt-3 rounded-xl bg-blue-950 px-6 py-4 text-center text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
            >
              Register Now
            </Link>

          </nav>
        </div>
      )}

    </header>
  );
}