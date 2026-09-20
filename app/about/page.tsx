"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function AboutPage() {
  const values = [
    { title: "Discipline", desc: "Building strong work ethic and focus both on and off the pitch." },
    { title: "Respect", desc: "Fostering mutual respect among teammates, opponents, coaches, and referees." },
    { title: "Teamwork", desc: "Encouraging unity, clear communication, and shared success." },
    { title: "Hard Work", desc: "Commitment to constant improvement through structured, high-tempo training." },
    { title: "Integrity", desc: "Upholding sportsmanship, fair play, and personal accountability." },
    { title: "Development", desc: "Prioritizing individual technical growth and long-term player pathways over short-term results." },
  ];

  const milestones = [
    { year: "Academy Foundation", title: "Grassroots Beginnings", desc: "Established in Nasra Garden Estate, Nairobi to provide structured football training for local youth." },
    { year: "Youth Categories", title: "Age Bracket Expansion", desc: "Introduced dedicated sub-teams ranging from U7 to U17 to support progressive player development." },
    { year: "League Entry", title: "Competitive League Play", desc: "Entered local Nairobi county youth leagues and friendlies to expose players to real match scenarios." },
    { year: "Digital Platform", title: "Modern Academy Infrastructure", desc: "Launched digital registration systems and online player portals to streamline academy operations." },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-sky-900 text-white py-16 px-6 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <span className="inline-block rounded-full bg-sky-400/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 border border-sky-400/30">
            About Nasra Santos FA
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            More Than Football
          </h1>
          <p className="text-sky-100 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Your chance to join the gardeners. Nurturing football talent, developing character, and building opportunities for youth across Nairobi.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 mx-auto max-w-7xl grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 font-black text-xl">
            🎯
          </div>
          <h2 className="text-2xl font-black text-blue-950 uppercase">Our Mission</h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            To discover, train, and mentor aspiring young footballers in a disciplined and empowering environment, giving them technical skills, tactical understanding, and resilience required for professional and personal success.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 font-black text-xl">
            👁️
          </div>
          <h2 className="text-2xl font-black text-blue-950 uppercase">Our Vision</h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            To become a leading grassroots football academy in East Africa, recognized for producing elite, well-rounded athletes and creating tangible career pathways in competitive football.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 px-6 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-600">Core Principles</p>
            <h2 className="text-3xl font-black text-blue-950 uppercase">Our Academy Values</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="text-base font-bold text-blue-950 uppercase tracking-wide">{val.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-6 mx-auto max-w-5xl space-y-12">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600">Growth & Development</p>
          <h2 className="text-3xl font-black text-blue-950 uppercase">Our Journey</h2>
        </div>

        <div className="space-y-6">
          {milestones.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-black text-sky-600 bg-sky-50 border border-sky-200 px-4 py-2 rounded-xl uppercase tracking-wider whitespace-nowrap">
                {item.year}
              </span>
              <div>
                <h3 className="text-base font-bold text-blue-950">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-950 text-white py-16 px-6 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">Ready to join the gardeners?</h2>
          <p className="text-sky-200 text-xs sm:text-sm">
            Whether you are a young player looking to develop or a parent seeking a structured sports program, Nasra Santos FA welcomes you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/registration"
              className="rounded-full bg-sky-400 px-8 py-3.5 text-xs font-bold text-blue-950 hover:bg-sky-300 transition shadow"
            >
              REGISTER PLAYER
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-500 px-8 py-3.5 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-6 text-center text-xs border-t border-slate-800">
        <p className="text-white font-bold">Nasra Santos Football Academy</p>
        <p className="mt-1">Nasra Garden Estate, Gate D, Checkmate Plaza, 1st Floor (Opp. Aster Point Hospital)</p>
        <p className="mt-2 text-slate-500">© 2026 All rights reserved.</p>
      </footer>
    </main>
  );
}