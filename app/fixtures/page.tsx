import Link from "next/link";

const results = [
  {
    date: "20 September 2026",
    home: "Nasra Santos FA",
    away: "Braga",
    homeScore: 1,
    awayScore: 1,
    venue: "TBA",
    competition: "Match",
  },
  {
    date: "12 July 2026",
    home: "Kariobangi All Stars",
    away: "Nasra Santos FA",
    homeScore: 1,
    awayScore: 3,
    venue: "Kariobangi North Primary",
    competition: "FKF County League",
  },
  {
    date: "5 July 2026",
    home: "Nasra Santos FA",
    away: "Dandora Rangers",
    homeScore: 1,
    awayScore: 2,
    venue: "Mwangaza Primary",
    competition: "FKF County League",
  },
  {
    date: "28 June 2026",
    home: "Dandora Hotspurs",
    away: "Nasra Santos FA",
    homeScore: 1,
    awayScore: 3,
    venue: "Tom Mboya Primary",
    competition: "FKF County League",
  },
  {
    date: "20 June 2026",
    home: "Tena Flames",
    away: "Nasra Santos FA",
    homeScore: 1,
    awayScore: 0,
    venue: "Tena Grounds",
    competition: "FKF County League",
  },
  {
    date: "13 June 2026",
    home: "Kayole United",
    away: "Nasra Santos FA",
    homeScore: 0,
    awayScore: 1,
    venue: "Mwangaza Primary",
    competition: "FKF County League",
  },
  {
    date: "25 May 2026",
    home: "K South United",
    away: "Nasra Santos FA",
    homeScore: 2,
    awayScore: 3,
    venue: "Mwangaza Primary",
    competition: "FKF County League",
  },
  {
    date: "15 May 2026",
    home: "Nasra Santos FA",
    away: "Mlango Kubwa United",
    homeScore: 2,
    awayScore: 0,
    venue: "Mwangaza Primary",
    competition: "FKF County League",
  },
  {
    date: "10 May 2026",
    home: "Dandora Fullnesco",
    away: "Nasra Santos FA",
    homeScore: 0,
    awayScore: 2,
    venue: "Dandora Stadium",
    competition: "FKF County League",
  },
  {
    date: "25 April 2026",
    home: "Outering FC",
    away: "Nasra Santos FA",
    homeScore: 1,
    awayScore: 3,
    venue: "Buruburu Mesora",
    competition: "FKF County League",
  },
];

const fixtures = [
  {
    date: "20 October 2026",
    home: "Nasra Santos FA",
    away: "Micharazo",
    time: "TBA",
    venue: "TBA",
    competition: "Upcoming Match",
  },
];

export default function FixturesPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="bg-blue-950 px-6 py-20 text-center text-white">

        <div className="mx-auto max-w-4xl">

          <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-400">
            Match Centre
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase md:text-6xl">
            Fixtures & Results
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Follow Nasra Santos Football Academy matches, results
            and upcoming fixtures.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* NEXT MATCH */}
      {/* ================================================= */}

      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="text-center">

          <p className="font-black uppercase tracking-widest text-sky-500">
            Coming Up
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase text-blue-950 md:text-4xl">
            Next Match
          </h2>

        </div>


        {fixtures.map((fixture) => (

          <div
            key={`${fixture.date}-${fixture.home}-${fixture.away}`}
            className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl bg-blue-950 text-white shadow-xl"
          >

            {/* Date */}

            <div className="bg-sky-400 px-6 py-4 text-center">

              <p className="text-sm font-black uppercase tracking-widest text-blue-950">
                {fixture.date}
              </p>

            </div>


            {/* Match */}

            <div className="p-8 md:p-12">

              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                {fixture.competition}
              </p>


              <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">

                <div className="text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-xl font-black text-sky-300">
                    NS
                  </div>

                  <p className="mt-4 text-lg font-black md:text-2xl">
                    {fixture.home}
                  </p>

                </div>


                <div className="text-center">

                  <div className="rounded-xl bg-sky-400 px-5 py-3 font-black text-blue-950">
                    VS
                  </div>

                </div>


                <div className="text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-xl font-black text-sky-300">
                    M
                  </div>

                  <p className="mt-4 text-lg font-black md:text-2xl">
                    {fixture.away}
                  </p>

                </div>

              </div>


              <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 text-center sm:grid-cols-2">

                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                    Kick Off
                  </p>

                  <p className="mt-2 font-black">
                    {fixture.time}
                  </p>

                </div>


                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                    Venue
                  </p>

                  <p className="mt-2 font-black">
                    {fixture.venue}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </section>


      {/* ================================================= */}
      {/* RESULTS */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div>

            <p className="font-black uppercase tracking-widest text-sky-500">
              Match History
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase text-blue-950 md:text-4xl">
              Recent Results
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Recent matches involving Nasra Santos Football Academy.
            </p>

          </div>


          <div className="mt-10 space-y-5">

            {results.map((result) => {

              const nasraIsHome =
                result.home === "Nasra Santos FA";

              const nasraScore = nasraIsHome
                ? result.homeScore
                : result.awayScore;

              const opponentScore = nasraIsHome
                ? result.awayScore
                : result.homeScore;

              let status = "DRAW";

              if (nasraScore > opponentScore) {
                status = "WIN";
              }

              if (nasraScore < opponentScore) {
                status = "LOSS";
              }

              return (

                <div
                  key={`${result.date}-${result.home}-${result.away}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >

                  <div className="grid items-center gap-6 p-6 md:grid-cols-[180px_1fr_110px] md:p-8">

                    {/* DATE */}

                    <div>

                      <p className="text-xs font-black uppercase tracking-wider text-sky-500">
                        {result.competition}
                      </p>

                      <p className="mt-2 font-black text-blue-950">
                        {result.date}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {result.venue}
                      </p>

                    </div>


                    {/* SCORE */}

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">

                      <p className="text-right font-black text-blue-950 md:text-lg">
                        {result.home}
                      </p>

                      <div className="rounded-xl bg-blue-950 px-4 py-3 text-center text-xl font-black text-white">
                        {result.homeScore} - {result.awayScore}
                      </div>

                      <p className="font-black text-blue-950 md:text-lg">
                        {result.away}
                      </p>

                    </div>


                    {/* RESULT STATUS */}

                    <div className="text-center md:text-right">

                      <span
                        className={`inline-block rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${
                          status === "WIN"
                            ? "bg-emerald-100 text-emerald-700"
                            : status === "LOSS"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {status}
                      </span>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* HOME GROUND */}
      {/* ================================================= */}

      <section className="bg-slate-100 px-6 py-20">

        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 text-center shadow-sm md:p-14">

          <p className="font-black uppercase tracking-widest text-sky-500">
            Home Of The Gardeners
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase text-blue-950 md:text-4xl">
            Mwangaza Primary
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Follow Nasra Santos Football Academy for match announcements,
            kickoff times, venues and the latest academy updates.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* JOIN CTA */}
      {/* ================================================= */}

      <section className="bg-sky-400 px-6 py-20 text-center">

        <div className="mx-auto max-w-4xl">

          <p className="font-black uppercase tracking-widest text-blue-800">
            Join The Gardeners
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950">
            Want To Play For Nasra Santos?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-blue-950/80">
            Join our academy and begin your football development journey
            with Nasra Santos Football Academy.
          </p>

          <Link
            href="/registration"
            className="mt-8 inline-block rounded-full bg-blue-950 px-9 py-4 font-black uppercase text-white transition hover:bg-white hover:text-blue-950"
          >
            Register Now
          </Link>

        </div>

      </section>

    </main>
  );
}