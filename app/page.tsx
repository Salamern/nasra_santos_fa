import Link from "next/link";

const teams = [
  "U7",
  "U9",
  "U11",
  "U13",
  "U15",
  "U17",
  "Senior Team",
];

export default function Home() {
  return (
    <main className="bg-white text-slate-900">

      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <section className="relative min-h-[650px] overflow-hidden">

        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.jpg')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-blue-950/70" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/75 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 lg:px-12">

          <div className="max-w-3xl text-white">

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-sky-300">
              Nasra Santos Football Academy
            </p>

            <h1 className="text-5xl font-black uppercase leading-tight md:text-7xl">
              Your Chance

              <span className="block text-sky-400">
                To Join The Gardeners
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Developing young football talent through discipline,
              teamwork, hard work and opportunity in Nairobi, Kenya.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/registration"
                className="rounded-full bg-sky-400 px-8 py-4 font-black text-blue-950 transition hover:bg-white"
              >
                JOIN THE ACADEMY
              </Link>

              <Link
                href="/about"
                className="rounded-full border-2 border-white px-8 py-4 font-black text-white transition hover:bg-white hover:text-blue-950"
              >
                DISCOVER NASRA
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* MATCH CENTRE */}
      {/* ================================================= */}

      <section className="relative z-20 mx-auto -mt-10 max-w-6xl px-6">

        <div className="grid overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

          {/* LATEST RESULT */}

          <div className="p-8 md:p-10">

            <div className="flex items-center justify-between gap-4">

              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
                Latest Result
              </p>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                20 SEP 2026
              </span>

            </div>

            <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">

              <div className="text-center">
                <p className="font-black text-blue-950 sm:text-lg">
                  Nasra Santos FA
                </p>
              </div>

              <div className="rounded-xl bg-blue-950 px-5 py-3 text-2xl font-black text-white">
                1 - 1
              </div>

              <div className="text-center">
                <p className="font-black text-blue-950 sm:text-lg">
                  Braga
                </p>
              </div>

            </div>

            <p className="mt-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              Full Time
            </p>

          </div>


          {/* NEXT MATCH */}

          <div className="bg-blue-950 p-8 text-white md:p-10">

            <div className="flex items-center justify-between gap-4">

              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
                Next Match
              </p>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-sky-200">
                20 OCT 2026
              </span>

            </div>

            <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">

              <div className="text-center">
                <p className="font-black sm:text-lg">
                  Nasra Santos FA
                </p>
              </div>

              <div className="rounded-xl bg-sky-400 px-4 py-3 text-sm font-black text-blue-950">
                VS
              </div>

              <div className="text-center">
                <p className="font-black sm:text-lg">
                  Micharazo
                </p>
              </div>

            </div>

            <p className="mt-6 text-center text-sm text-blue-200">
              Kick Off & Venue: TBA
            </p>

          </div>

        </div>


        {/* Fixtures Link */}

        <div className="mt-7 text-center">

          <Link
            href="/fixtures"
            className="inline-block text-sm font-black uppercase tracking-wider text-blue-950 transition hover:text-sky-600"
          >
            View All Fixtures & Results →
          </Link>

        </div>

      </section>


      {/* ================================================= */}
      {/* ABOUT / INTRODUCTION */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">

        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <div>

            <p className="font-bold uppercase tracking-widest text-sky-500">
              Welcome to Nasra Santos FA
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
              More Than Football
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Nasra Santos Football Academy is a grassroots football
              academy based in Nairobi, Kenya.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We provide young players with an environment where they
              can develop their football abilities, character,
              discipline and teamwork.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              From our youngest players to our senior team, we believe
              every player deserves an opportunity to learn, compete
              and grow.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-block font-black text-blue-950 underline decoration-sky-400 decoration-4 underline-offset-4"
            >
              LEARN MORE ABOUT US →
            </Link>

          </div>


          {/* Philosophy Card */}

          <div className="rounded-3xl bg-gradient-to-br from-blue-950 to-sky-600 p-10 text-white shadow-xl">

            <p className="text-sm font-bold uppercase tracking-widest text-sky-200">
              What We Believe
            </p>

            <h3 className="mt-2 text-3xl font-black uppercase">
              Our Philosophy
            </h3>

            <p className="mt-6 text-lg leading-8 text-sky-100">
              Discipline. Teamwork. Development. Opportunity.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-5">

                <p className="text-3xl font-black">
                  7
                </p>

                <p className="mt-1 text-sm text-sky-100">
                  Teams
                </p>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <p className="text-3xl font-black">
                  1
                </p>

                <p className="mt-1 text-sm text-sky-100">
                  Family
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* OUR TEAMS */}
      {/* ================================================= */}

      <section className="bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-bold uppercase tracking-widest text-sky-500">
              Our Teams
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
              Find Your Team
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Nasra Santos Football Academy provides football
              development opportunities across different age groups.
            </p>

          </div>


          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">

            {teams.map((team) => (

              <Link
                href="/teams"
                key={team}
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-950 font-black text-sky-300">

                  {team === "Senior Team" ? "ST" : team}

                </div>

                <h3 className="mt-4 font-black text-blue-950">
                  {team}
                </h3>

              </Link>

            ))}

          </div>


          <div className="mt-10 text-center">

            <Link
              href="/teams"
              className="inline-block rounded-full border-2 border-blue-950 px-7 py-3 font-black uppercase text-blue-950 transition hover:bg-blue-950 hover:text-white"
            >
              View All Teams
            </Link>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* ACADEMY PATHWAY */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="font-bold uppercase tracking-widest text-sky-500">
              Player Development
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
              The Nasra Pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              Players have the opportunity to develop through our
              academy age groups and progress toward senior football.
            </p>

          </div>


          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">

            {[
              "U7",
              "U9",
              "U11",
              "U13",
              "U15",
              "U17",
              "Senior",
            ].map((team, index, array) => (

              <div
                key={team}
                className="flex items-center gap-3"
              >

                <div className="rounded-full bg-blue-950 px-5 py-3 font-black text-white">
                  {team}
                </div>

                {index < array.length - 1 && (

                  <span className="text-xl font-black text-sky-500">
                    →
                  </span>

                )}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* REGISTRATION CTA */}
      {/* ================================================= */}

      <section className="bg-sky-400 px-6 py-20 text-center">

        <div className="mx-auto max-w-4xl">

          <p className="font-bold uppercase tracking-widest text-blue-800">
            Become A Gardener
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
            Ready to Join Nasra Santos?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-950/80">
            Take the next step in your football journey and become
            part of the Nasra Santos Football Academy family.
          </p>

          <Link
            href="/registration"
            className="mt-8 inline-block rounded-full bg-blue-950 px-9 py-4 font-black uppercase text-white transition hover:bg-white hover:text-blue-950"
          >
            Register Your Player
          </Link>

        </div>

      </section>


      {/* ================================================= */}
      {/* CONTACT / FOOTER */}
      {/* ================================================= */}

      <section
        id="contact"
        className="bg-blue-950 px-6 py-16 text-white"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-3">

            {/* Academy Information */}

            <div>

              <h3 className="text-2xl font-black">
                NASRA SANTOS FA
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                Your chance to join the gardeners.
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Developing players. Building character.
                Creating opportunities.
              </p>

            </div>


            {/* Contact */}

            <div>

              <h3 className="text-xl font-black">
                CONTACT
              </h3>

              <p className="mt-4 text-slate-300">
                Nasra Garden Estate
              </p>

              <p className="mt-2 text-slate-300">
                Nairobi, Kenya
              </p>

              <p className="mt-2 text-slate-300">
                0746360438
              </p>

              <p className="mt-2 break-all text-slate-300">
                nasrasantosfootballacademy@gmail.com
              </p>

            </div>


            {/* Social Media */}

            <div>

              <h3 className="text-xl font-black">
                FOLLOW THE GARDENERS
              </h3>

              <p className="mt-4 text-slate-300">
                Instagram: @nasra_santos_fa
              </p>

              <p className="mt-2 text-slate-300">
                TikTok: @nasra_santos_fa
              </p>

              <p className="mt-2 text-slate-300">
                Facebook: Nasra Santos FA
              </p>

              <p className="mt-2 text-slate-300">
                YouTube: Nasra Santos
              </p>

            </div>

          </div>


          {/* Footer Navigation */}

          <div className="mt-12 border-t border-white/10 pt-8">

            <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-300">

              <Link
                href="/"
                className="transition hover:text-sky-300"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="transition hover:text-sky-300"
              >
                About
              </Link>

              <Link
                href="/teams"
                className="transition hover:text-sky-300"
              >
                Teams
              </Link>

              <Link
                href="/fixtures"
                className="transition hover:text-sky-300"
              >
                Fixtures & Results
              </Link>

              <Link
                href="/registration"
                className="transition hover:text-sky-300"
              >
                Registration
              </Link>

            </div>

          </div>


          {/* Copyright */}

          <div className="mt-8 text-center text-sm text-slate-400">

            © {new Date().getFullYear()} Nasra Santos Football Academy.
            All rights reserved.

          </div>

        </div>

      </section>

    </main>
  );
}