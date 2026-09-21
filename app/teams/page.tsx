import Link from "next/link";

const teams = [
  {
    name: "Under 7",
    short: "U7",
    description:
      "Introducing our youngest Gardeners to football through fun, movement, teamwork and basic skills.",
  },
  {
    name: "Under 9",
    short: "U9",
    description:
      "Building confidence, ball control and an early understanding of the game.",
  },
  {
    name: "Under 11",
    short: "U11",
    description:
      "Developing technical ability, teamwork and stronger football fundamentals.",
  },
  {
    name: "Under 13",
    short: "U13",
    description:
      "Helping young players improve their technique, decision-making and competitive experience.",
  },
  {
    name: "Under 15",
    short: "U15",
    description:
      "Preparing developing players for more competitive football through structured training.",
  },
  {
    name: "Under 17",
    short: "U17",
    description:
      "Advanced youth development focused on performance, discipline and preparing players for the next level.",
  },
  {
    name: "Senior Team",
    short: "ST",
    description:
      "Representing Nasra Santos FA at senior level and providing a pathway for our developing players.",
  },
];

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-blue-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">

          <p className="font-bold uppercase tracking-[0.25em] text-sky-400">
            Player Development
          </p>

          <h1 className="mt-3 text-5xl font-black uppercase md:text-6xl">
            Our Teams
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            From our youngest Gardeners to our senior team, Nasra Santos
            provides a pathway for players to learn, develop and compete.
          </p>

        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="max-w-3xl">

          <p className="font-bold uppercase tracking-widest text-sky-500">
            One Academy
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase text-blue-950">
            Seven Teams. One Family.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Our age-group structure allows players to develop progressively
            as they grow. Training focuses on football ability, discipline,
            teamwork, confidence and respect.
          </p>

        </div>

        {/* TEAM CARDS */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {teams.map((team) => (
            <div
              key={team.short}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex h-44 items-center justify-center bg-blue-950">

                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-sky-400 text-3xl font-black text-white">
                  {team.short}
                </div>

              </div>

              <div className="p-7">

                <h3 className="text-2xl font-black uppercase text-blue-950">
                  {team.name}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {team.description}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <span className="text-sm font-black uppercase tracking-wider text-sky-600">
                    Nasra Santos FA
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* DEVELOPMENT PATHWAY */}
      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl bg-slate-100 p-8 md:p-12">

            <p className="font-bold uppercase tracking-widest text-sky-600">
              Academy Pathway
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase text-blue-950 md:text-4xl">
              From Grassroots to Senior Football
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-3">

              {["U7", "U9", "U11", "U13", "U15", "U17", "Senior"].map(
                (team, index, array) => (
                  <div
                    key={team}
                    className="flex items-center gap-3"
                  >

                    <div className="rounded-full bg-blue-950 px-5 py-3 font-black text-white">
                      {team}
                    </div>

                    {index < array.length - 1 && (
                      <span className="font-black text-sky-500">
                        →
                      </span>
                    )}

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* JOIN CTA */}
      <section className="bg-sky-400 px-6 py-16">

        <div className="mx-auto max-w-4xl text-center">

          <p className="font-black uppercase tracking-widest text-blue-800">
            Become a Gardener
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
            Find Your Place at Nasra Santos
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-950/80">
            Interested in joining one of our academy teams? Start your
            registration and become part of the Nasra Santos family.
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