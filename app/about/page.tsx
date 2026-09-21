import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-blue-950 px-6 py-20 text-center text-white">
        <p className="font-bold uppercase tracking-widest text-sky-400">
          About Us
        </p>

        <h1 className="mt-3 text-5xl font-black uppercase">
          Nasra Santos FA
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-slate-300">
          Your chance to join the gardeners.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-black uppercase text-blue-950">
          Who We Are
        </h2>

        <p className="mt-5 leading-8 text-slate-600">
          Nasra Santos Football Academy is a grassroots football academy
          based in Nairobi, Kenya. We are committed to creating opportunities
          for young footballers to develop their talent in a structured and
          positive environment.
        </p>

        <p className="mt-5 leading-8 text-slate-600">
          Through football, we encourage discipline, teamwork, respect,
          commitment and personal development both on and off the pitch.
        </p>

        <h2 className="mt-12 text-3xl font-black uppercase text-blue-950">
          Our Teams
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {["U7", "U9", "U11", "U13", "U15", "U17", "Senior Team"].map(
            (team) => (
              <div
                key={team}
                className="rounded-2xl bg-slate-50 p-6 text-center font-black text-blue-950 shadow-sm"
              >
                {team}
              </div>
            )
          )}
        </div>

        <Link
          href="/registration"
          className="mt-10 inline-block rounded-full bg-blue-950 px-8 py-4 font-black text-white"
        >
          JOIN NASRA SANTOS
        </Link>
      </section>
    </main>
  );
}