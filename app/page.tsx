import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 scroll-smooth">
      {/* 1. STICKY NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-950 flex items-center justify-center text-white font-black text-lg border-2 border-sky-400">
              NS
            </div>
            <div>
              <h1 className="text-xl font-black text-blue-950 tracking-tight leading-none">
                NASRA SANTOS
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-sky-500 mt-0.5">
                Football Academy
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700">
            <a href="#about" className="hover:text-blue-950 transition">About</a>
            <a href="#teams" className="hover:text-blue-950 transition">Teams</a>
            <a href="#fixtures" className="hover:text-blue-950 transition">Fixtures & Results</a>
            <a href="#news" className="hover:text-blue-950 transition">News</a>
            <a href="#gallery" className="hover:text-blue-950 transition">Gallery</a>
            <a href="#trials" className="hover:text-blue-950 transition">Trials</a>
            <a href="#contact" className="hover:text-blue-950 transition">Contact</a>
          </div>

          <a
            href="#trials"
            className="rounded-full bg-blue-950 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-900 transition shadow-md hover:shadow-sky-200"
          >
            JOIN US
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white px-6 py-28 md:py-36 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative mx-auto max-w-5xl">
          <p className="mb-4 inline-block rounded-full bg-sky-500/10 px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-sky-300 border border-sky-400/20">
            📍 Nairobi, Kenya • Nasra Garden Estate
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-none">
            NASRA SANTOS <br />
            <span className="block text-sky-300 mt-2">FOOTBALL ACADEMY</span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl font-semibold italic text-sky-200">
            “Your chance to join the gardeners.”
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-200">
            Developing young talent. Building character. Creating opportunities through football.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#trials"
              className="rounded-full bg-sky-400 px-8 py-4 font-bold text-blue-950 hover:bg-sky-300 transition shadow-lg text-center"
            >
              JOIN THE ACADEMY
            </a>
            <a
              href="#teams"
              className="rounded-full border border-sky-300/40 px-8 py-4 font-bold text-white hover:bg-white/10 transition text-center"
            >
              VIEW OUR TEAMS
            </a>
          </div>
        </div>
      </section>

      {/* 3. ACADEMY INTRODUCTION */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">More Than Football</h2>
          <h3 className="text-3xl md:text-5xl font-black text-blue-950">Building Character On & Off The Pitch</h3>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Nasra Santos FA is a community-based football academy focused on nurturing grassroots talent in Nairobi, establishing core sporting values, and opening pathways for competitive development.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition bg-slate-50/50">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center font-black text-xl mb-6">
              ⚽
            </div>
            <h4 className="text-xl font-bold text-blue-950 mb-2">Player Development</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Structured technical training tailored specifically for youth age brackets.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition bg-slate-50/50">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              🛡️
            </div>
            <h4 className="text-xl font-bold text-blue-950 mb-2">Discipline & Character</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instilling respect, personal accountability, and work ethic in every athlete.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition bg-slate-50/50">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              🤝
            </div>
            <h4 className="text-xl font-bold text-blue-950 mb-2">Teamwork</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fostering camaraderie, communication, and mutual support across all squads.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition bg-slate-50/50">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              ⭐
            </div>
            <h4 className="text-xl font-bold text-blue-950 mb-2">Opportunities</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Exposing players to tournaments, county leagues, and scouted friendly matches.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TEAMS SECTION */}
      <section id="teams" className="bg-slate-50 border-y border-slate-200 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">Our Structure</h2>
            <h3 className="text-3xl md:text-5xl font-black text-blue-950">Academy Squads</h3>
            <p className="mt-4 text-slate-600">From grassroots discovery teams to competitive league squads.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["U7 Squad", "U9 Squad", "U11 Squad", "U13 Squad", "U15 Squad", "U17 Squad", "Senior Team"].map((team, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-full mb-4 border border-sky-100">
                    Category
                  </span>
                  <h4 className="text-2xl font-black text-blue-950 mb-2">{team}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Focusing on core motor skills, positional discipline, match tactical awareness, and match fitness.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="mt-6 inline-block text-center w-full py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-blue-950 hover:bg-blue-950 hover:text-white transition"
                >
                  View Team Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FIXTURES & RESULTS */}
      <section id="fixtures" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Latest Results */}
          <div>
            <h3 className="text-2xl font-black text-blue-950 mb-6 flex items-center gap-2">
              <span>🏆</span> Latest Match Results
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <span className="font-bold text-blue-950">Nasra Santos FA</span>
                <span className="bg-blue-950 text-white font-black px-4 py-1.5 rounded-md text-sm">3 – 2</span>
                <span className="font-bold text-slate-600">K South United</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <span className="font-bold text-blue-950">Nasra Santos FA</span>
                <span className="bg-blue-950 text-white font-black px-4 py-1.5 rounded-md text-sm">2 – 0</span>
                <span className="font-bold text-slate-600">Mlango Kubwa United</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <span className="font-bold text-slate-600">Dandora Fullnesco</span>
                <span className="bg-blue-950 text-white font-black px-4 py-1.5 rounded-md text-sm">0 – 2</span>
                <span className="font-bold text-blue-950">Nasra Santos FA</span>
              </div>
            </div>
          </div>

          {/* Upcoming Fixtures */}
          <div>
            <h3 className="text-2xl font-black text-blue-950 mb-6 flex items-center gap-2">
              <span>📅</span> Upcoming Fixtures
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-sky-600 uppercase">County League • Home</p>
                  <p className="font-bold text-blue-950 mt-1">Nasra Santos FA vs Opponent FC</p>
                  <p className="text-xs text-slate-500 mt-1">Nasra Garden Grounds • 10:00 AM</p>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
                  Upcoming
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRIALS / JOIN US SECTION */}
      <section id="trials" className="bg-blue-950 text-white px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Registration Open</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3">YOUR CHANCE TO JOIN THE GARDENERS</h2>
          <p className="mt-6 text-blue-100 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Think you have what it takes? Nasra Santos FA gives young footballers an opportunity to develop their talent, compete, learn and grow.
          </p>
          <div className="mt-10">
            <a
              href="#contact"
              className="inline-block rounded-full bg-sky-400 px-10 py-4 font-bold text-blue-950 hover:bg-sky-300 transition shadow-xl"
            >
              REGISTER FOR TRIALS
            </a>
          </div>
        </div>
      </section>

      {/* 7. ACADEMY JOURNEY */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">Pathway</h2>
          <h3 className="text-3xl md:text-5xl font-black text-blue-950">The Academy Journey</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-l-4 border-sky-400 pl-6 py-2">
            <span className="text-xs font-bold uppercase text-sky-500">Step 1</span>
            <h4 className="text-xl font-bold text-blue-950 mt-1">Grassroots Training</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">Developing fundamental ball mastery, coordination, and athletic foundation.</p>
          </div>
          <div className="border-l-4 border-blue-950 pl-6 py-2">
            <span className="text-xs font-bold uppercase text-sky-500">Step 2</span>
            <h4 className="text-xl font-bold text-blue-950 mt-1">Match Experience</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">Friendly games, local youth tournaments, and tactical integration.</p>
          </div>
          <div className="border-l-4 border-sky-400 pl-6 py-2">
            <span className="text-xs font-bold uppercase text-sky-500">Step 3</span>
            <h4 className="text-xl font-bold text-blue-950 mt-1">Competitive Pathway</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">County league progression, showcase trials, and player exposure.</p>
          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section id="gallery" className="bg-slate-50 border-t border-slate-200 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">Media</h2>
            <h3 className="text-3xl md:text-5xl font-black text-blue-950">Academy Gallery</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="h-64 bg-slate-200 rounded-2xl flex items-center justify-center font-bold text-slate-400 border border-slate-300">
              📸 Training Session
            </div>
            <div className="h-64 bg-slate-200 rounded-2xl flex items-center justify-center font-bold text-slate-400 border border-slate-300">
              📸 Match Day Action
            </div>
            <div className="h-64 bg-slate-200 rounded-2xl flex items-center justify-center font-bold text-slate-400 border border-slate-300">
              📸 Team Celebrations
            </div>
          </div>
        </div>
      </section>

      {/* 9. LATEST NEWS */}
      <section id="news" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">Updates</h2>
          <h3 className="text-3xl md:text-5xl font-black text-blue-950">Latest News</h3>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
            <span className="text-xs font-bold text-sky-600 uppercase">Match Report</span>
            <h4 className="text-xl font-bold text-blue-950 mt-2">Nasra Santos FA Secures Win in Local Derby</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">A impressive display of discipline and teamwork secured victory in this weekend's league action.</p>
            <span className="inline-block mt-4 text-xs font-bold text-blue-950">Read More →</span>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
            <span className="text-xs font-bold text-sky-600 uppercase">Announcement</span>
            <h4 className="text-xl font-bold text-blue-950 mt-2">Upcoming Youth Trial Dates Announced</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Registration is officially open for talented young players looking to join our competitive squads.</p>
            <span className="inline-block mt-4 text-xs font-bold text-blue-950">Read More →</span>
          </div>
        </div>
      </section>

      {/* 10. SPONSORS & PARTNERS */}
      <section className="bg-slate-100 border-y border-slate-200 px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Our Partners</h3>
          <p className="text-2xl font-black text-blue-950 mb-6">Partner With Nasra Santos FA</p>
          <a
            href="#contact"
            className="inline-block rounded-full bg-blue-950 px-8 py-3 text-xs font-bold text-white hover:bg-blue-900 transition"
          >
            BECOME A PARTNER
          </a>
        </div>
      </section>

      {/* 11. FINAL CTA & CONTACT FOOTER */}
      <section id="contact" className="bg-blue-950 text-white px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black">READY TO START YOUR JOURNEY?</h2>
          <p className="mt-4 text-blue-200">“Your opportunity could begin here.”</p>

          <div className="mt-8 space-y-3 font-semibold text-sm">
            <p className="text-sky-300">📍 Location: <span className="text-white">Nairobi, Kenya — Nasra Garden Estate</span></p>
            <p className="text-sky-300">📞 Call / WhatsApp: <span className="text-white">0746360438</span></p>
            <p className="text-sky-300">✉️ Email: <span className="text-white">nasrasantosfootballacademy@gmail.com</span></p>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-xs text-sky-300 font-bold">
            <a href="https://instagram.com/nasra_santos_fa" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 px-6 py-6 text-center text-xs text-slate-400">
        © 2026 Nasra Santos Football Academy. All rights reserved.
      </footer>
    </main>
  );
}