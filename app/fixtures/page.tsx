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
    <main className="min-h-screen bg-slate-50">
      <section className="bg-blue-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-widest text-sky-300">
            Match Centre
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Fixtures & Results
          </h1>

          <p className="mt-4 text-blue-100">
            Follow Nasra Santos FA matches, results and fixtures.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-3xl font-black">
          Recent Results
        </h2>

        <div className="space-y-4">
          {results.map((match, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="grid items-center gap-4 md:grid-cols-3">
                <div className="text-center md:text-right">
                  <p className="font-black">{match.home}</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-black text-blue-800">
                    {match.score}
                  </p>

                  <p className="text-sm text-slate-500">
                    {match.date}
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <p className="font-black">{match.away}</p>
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-slate-500">
                {match.venue}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-3xl font-black">
            Fixtures
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {fixtures.map((match, index) => (
              <div
                key={index}
                className="rounded-3xl bg-slate-50 p-6 shadow-sm"
              >
                <p className="font-bold text-blue-700">
                  {match.date}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {match.time}
                </p>

                <div className="my-6 text-center">
                  <p className="font-black">{match.home}</p>

                  <p className="my-3 font-bold text-slate-400">
                    VS
                  </p>

                  <p className="font-black">{match.away}</p>
                </div>

                <p className="border-t pt-4 text-center text-sm text-slate-500">
                  {match.venue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-950 p-10 text-center text-white">
          <h2 className="text-3xl font-black">
            Come Support the Gardeners 🌱
          </h2>

          <p className="mt-4 text-blue-100">
            Follow Nasra Santos FA and support our players on the pitch.

          </p>
          <p className="mt-4 font-bold text-blue-300">
                          Home Ground : Mwangaza Primary
            </p>
        </div>
        </section>
    </main>
    );
}