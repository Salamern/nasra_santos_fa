const results = [
  {
    date: "25 April 2026",
    home: "Outering FC",
    away: "Nasra Santos FA",
    score: "1 - 3",
    venue: "Buruburu Mesora",
  },
  {
    date: "2026",
    home: "Dandora Fullnesco",
    away: "Nasra Santos FA",
    score: "0 - 2",
    venue: "Dandora Stadium",
  },
  {
    date: "2026",
    home: "Nasra Santos FA",
    away: "Mlango Kubwa United",
    score: "2 - 0",
    venue: "Mwangaza Primary",
  },
  {
    date: "2026",
    home: "K South United",
    away: "Nasra Santos FA",
    score: "2 - 3",
    venue: "Mwangaza Primary",
  },
  {
    date: "13 June 2026",
    home: "Kayole United",
    away: "Nasra Santos FA",
    score: "0 - 1",
    venue: "Mwangaza Primary",
  },
  {
    date: "20 June 2026",
    home: "Tena Flames",
    away: "Nasra Santos FA",
    score: "1 - 0",
    venue: "Tena Grounds",
  },
];

const fixtures = [
  {
    date: "28 June 2026",
    home: "Dandora Hotspurs",
    away: "Nasra Santos FA",
    time: "11:00 AM",
    venue: "Tom Mboya Primary",
  },
  {
    date: "5 July 2026",
    home: "Nasra Santos FA",
    away: "Dandora Rangers",
    time: "12:00 PM",
    venue: "Mwangaza Primary",
  },
  {
    date: "12 July 2026",
    home: "Kariobangi All Stars",
    away: "Nasra Santos FA",
    time: "12:00 PM",
    venue: "Kariobangi North Primary",
  },
];

export default function FixturesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO */}
      <section className="bg-blue-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">

          <p className="font-bold uppercase tracking-[0.25em] text-sky-400">
            Match Centre
          </p>

          <h1 className="mt-3 text-5xl font-black uppercase md:text-6xl">
            Fixtures & Results
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-blue-100">
            Follow Nasra Santos FA match results, upcoming fixtures
            and competition information.
          </p>

          <div className="mt-8 inline-block rounded-full bg-sky-400 px-5 py-2 text-sm font-black uppercase text-blue-950">
            Nasra Santos Senior Team
          </div>

        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10">
          <p className="font-bold uppercase tracking-widest text-sky-500">
            Match Results
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase text-blue-950">
            Recent Results
          </h2>
        </div>

        <div className="space-y-5">
          {results.map((match, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-5 py-3 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  FKF County League
                </p>
              </div>

              <div className="grid items-center gap-5 px-5 py-7 md:grid-cols-[1fr_auto_1fr]">

                {/* HOME */}
                <div className="text-center md:text-right">
                  <p className="text-lg font-black text-blue-950">
                    {match.home}
                  </p>
                </div>

                {/* SCORE */}
                <div className="text-center">
                  <div className="inline-block rounded-xl bg-blue-950 px-6 py-3 text-2xl font-black text-white">
                    {match.score}
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    {match.date}
                  </p>
                </div>

                {/* AWAY */}
                <div className="text-center md:text-left">
                  <p className="text-lg font-black text-blue-950">
                    {match.away}
                  </p>
                </div>

              </div>

              <div className="border-t border-slate-100 px-5 py-3 text-center">
                <p className="text-sm text-slate-500">
                  📍 {match.venue}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* FIXTURES */}
      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <p className="font-bold uppercase tracking-widest text-sky-500">
              Match Schedule
            </p>

            <h2 className="mt-2 text-4xl font-black uppercase text-blue-950">
              Fixtures
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {fixtures.map((match, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="bg-blue-950 px-6 py-5 text-center text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                    FKF County League
                  </p>

                  <p className="mt-2 text-lg font-black">
                    {match.date}
                  </p>

                  <p className="mt-1 text-sm text-blue-200">
                    Kick Off: {match.time}
                  </p>
                </div>

                <div className="px-6 py-8 text-center">

                  <p className="text-lg font-black text-blue-950">
                    {match.home}
                  </p>

                  <div className="my-4">
                    <span className="inline-block rounded-full bg-sky-400 px-4 py-2 text-xs font-black text-blue-950">
                      VS
                    </span>
                  </div>

                  <p className="text-lg font-black text-blue-950">
                    {match.away}
                  </p>

                </div>

                <div className="border-t border-slate-200 bg-white px-5 py-4 text-center">
                  <p className="text-sm text-slate-500">
                    📍 {match.venue}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* HOME GROUND */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-blue-950 p-10 text-center text-white md:p-14">

          <p className="font-bold uppercase tracking-widest text-sky-400">
            Match Day
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase md:text-4xl">
            Come Support The Gardeners 🌱
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Follow Nasra Santos FA and support our players as they
            represent the academy on the pitch.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white/10 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
              Home Ground
            </p>

            <p className="mt-2 text-xl font-black">
              Mwangaza Primary
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}