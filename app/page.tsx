import Link from "next/link";

const teams = ["U7", "U9", "U11", "U13", "U15", "U17", "Senior Team"];

export default function Home() {
  return (
    <main className="bg-white text-slate-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-950">
        <div className="mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 lg:px-12">
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

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Developing young football talent through discipline, teamwork,
              hard work and opportunity in Nairobi, Kenya.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/registration"
                className="rounded-full bg-sky-400 px-8 py-4 font-black text-blue-950 transition hover:bg-sky-300"
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

      {/* INTRO */}
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
              Nasra Santos Football Academy is a grassroots football academy
              based in Nairobi, Kenya. We provide young players with an
              environment where they can develop their football abilities,
              character, discipline and teamwork.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              From our youngest players to our senior team, we believe every
              player deserves an opportunity to learn, compete and grow.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-block font-black text-blue-950 underline decoration-sky-400 decoration-4 underline-offset-4"
            >
              LEARN MORE ABOUT US →
            </Link>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-950 to-sky-600 p-10 text-white shadow-xl">
            <h3 className="text-3xl font-black uppercase">
              Our Philosophy
            </h3>

            <p className="mt-6 text-lg leading-8 text-sky-100">
              Discipline. Teamwork. Development. Opportunity.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 p-5">
                <p className="text-3xl font-black">7</p>
                <p className="mt-1 text-sm text-sky-100">Teams</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5">
                <p className="text-3xl font-black">1</p>
                <p className="mt-1 text-sm text-sky-100">Family</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TEAMS */}
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
              Our academy provides football development opportunities across
              different age groups.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {teams.map((team) => (
              <div
                key={team}
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-950 font-black text-sky-300">
                  {team === "Senior Team" ? "ST" : team}
                </div>

                <h3 className="mt-4 font-black text-blue-950">
                  {team}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-sky-400 px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">

          <h2 className="text-4xl font-black uppercase text-blue-950 md:text-5xl">
            Ready to Join Nasra Santos?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-950/80">
            Take the next step in your football journey and become part of
            the Nasra Santos family.
          </p>

          <Link
            href="/registration"
            className="mt-8 inline-block rounded-full bg-blue-950 px-9 py-4 font-black text-white transition hover:bg-blue-900"
          >
            REGISTER YOUR PLAYER
          </Link>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-blue-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <h3 className="text-2xl font-black">
                NASRA SANTOS FA
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                Your chance to join the gardeners.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-black">CONTACT</h3>

              <p className="mt-4 text-slate-300">
                Nairobi, Kenya
              </p>

              <p className="mt-2 text-slate-300">
                Nasra Garden Estate
              </p>

              <p className="mt-2 text-slate-300">
                0746360438
              </p>
            </div>

            <div>
              <h3 className="text-xl font-black">ONLINE</h3>

              <p className="mt-4 text-slate-300">
                Instagram: @nasra_santos_fa
              </p>

              <p className="mt-2 text-slate-300">
                TikTok: @nasra_santos_fa
              </p>

              <p className="mt-2 text-slate-300">
                Facebook: Nasra Santos FA
              </p>
            </div>

          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Nasra Santos Football Academy. All
            rights reserved.
          </div>

        </div>
      </section>

    </main>
  );
}