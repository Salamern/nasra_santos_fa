import Link from "next/link";

const teams = ["U7", "U9", "U11", "U13", "U15", "U17", "Senior Team"];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-sky-500">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:flex lg:items-center lg:gap-12 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-sky-200">
              Nasra Santos Football Academy
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-6xl">
              Nurturing Future Champions
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              Developing young football talent, building character and creating
              opportunities for the next generation of footballers in Nairobi.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/registration"
                className="rounded-full bg-white px-7 py-3 font-bold text-blue-900 shadow-lg transition hover:bg-blue-50"
              >
                Join the Academy
              </Link>

              <Link
                href="/teams"
                className="rounded-full border-2 border-white px-7 py-3 font-bold text-white transition hover:bg-white hover:text-blue-900"
              >
                Our Teams
              </Link>
            </div>
          </div>

          <div className="mt-12 flex justify-center lg:mt-0 lg:flex-1">
            <div className="rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
              <img
                src="/logo.png"
                alt="Nasra Santos Football Academy"
                className="h-64 w-64 object-contain sm:h-80 sm:w-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-widest text-blue-600">
            Welcome to Nasra Santos FA
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            More Than Football
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Nasra Santos Football Academy is committed to developing football
            talent while teaching discipline, teamwork, confidence and
            responsibility both on and off the pitch.
          </p>
        </div>
      </section>

      {/* TEAMS */}
      <section className="bg-slate-50 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-widest text-blue-600">
              Our Teams
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Find Your Team
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {teams.map((team) => (
              <Link
                key={team}
                href="/teams"
                className="rounded-2xl bg-white p-6 text-center font-black text-blue-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {team}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FIXTURES */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-bold uppercase tracking-widest text-blue-600">
              Match Centre
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Fixtures & Results
            </h2>

            <p className="mt-3 text-slate-600">
              Follow our latest matches and academy football activities.
            </p>
          </div>

          <Link
            href="/fixtures"
            className="font-bold text-blue-700 hover:text-blue-900"
          >
            View all fixtures →
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 text-center sm:grid-cols-3 sm:text-left">
            <div>
              <p className="text-sm font-semibold text-slate-500">Academy</p>
              <p className="mt-1 text-xl font-black">Nasra Santos FA</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">Competition</p>
              <p className="mt-1 text-xl font-black">FKF County League</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">Home Ground</p>
              <p className="mt-1 text-xl font-black">Mwangaza Primary</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-blue-950 px-6 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-widest text-sky-300">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Building Players for Life
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-7">
              <h3 className="text-xl font-black">Discipline</h3>
              <p className="mt-3 text-blue-100">
                We encourage commitment, respect and discipline in every
                training session and match.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-7">
              <h3 className="text-xl font-black">Development</h3>
              <p className="mt-3 text-blue-100">
                We help players develop their football ability and confidence
                through regular training and competition.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-7">
              <h3 className="text-xl font-black">Teamwork</h3>
              <p className="mt-3 text-blue-100">
                We believe football teaches players how to work together,
                support one another and grow as a team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION CTA */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-700 to-sky-500 p-8 text-center text-white shadow-xl sm:p-12">
          <h2 className="text-3xl font-black sm:text-4xl">
            Ready to Join Nasra Santos FA?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-50">
            Give your child an opportunity to develop their football talent,
            make friends and become part of the Nasra Santos family.
          </p>

          <Link
            href="/registration"
            className="mt-7 inline-block rounded-full bg-white px-8 py-3 font-black text-blue-800 transition hover:bg-blue-50"
          >
            Registration
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t bg-slate-50 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-black">Nasra Santos Football Academy</h2>

          <p className="mt-3 text-slate-600">
            Nairobi, Kenya · Nasra Garden Estate
          </p>

          <p className="mt-2 font-semibold text-blue-700">
            0746360438
          </p>

          <p className="mt-2 text-slate-600">
            nasrasantosfootballacademy@gmail.com
          </p>
        </div>
      </section>
    </main>
  );
}