import Image from "next/image";
import Link from "next/link";

const teams = [
  {
    name: "Under 7",
    shortName: "U7",
    slug: "u7",
    image: "/u7.jpg",
    description:
      "Introducing our youngest Gardeners to football through fun, teamwork, coordination and basic football skills.",
  },
  {
    name: "Under 9",
    shortName: "U9",
    slug: "u9",
    image: "/u9.jpg",
    description:
      "Building confidence and developing fundamental football skills in a positive and enjoyable environment.",
  },
  {
    name: "Under 11",
    shortName: "U11",
    slug: "u11",
    image: "/u11.jpg",
    description:
      "Developing technical ability, game understanding, discipline and teamwork as our young players continue to grow.",
  },
  {
    name: "Under 13",
    shortName: "U13",
    slug: "u13",
    image: "/u13.jpg",
    description:
      "Helping players improve their technical skills, tactical awareness and confidence through structured football development.",
  },
  {
    name: "Under 15",
    shortName: "U15",
    slug: "u15",
    image: "/u15.jpg",
    description:
      "Preparing talented young footballers for more competitive football through advanced training and match experience.",
  },
  {
    name: "Under 17",
    shortName: "U17",
    slug: "u17",
    image: "/u17.jpg",
    description:
      "Developing players for the transition toward senior football with greater tactical, technical and physical preparation.",
  },
  {
    name: "Senior Team",
    shortName: "Senior",
    slug: "senior",
    image: "/senior.jpg",
    description:
      "The senior Gardeners represent the academy at competitive level while providing a pathway for our developing young players.",
  },
];

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-blue-950 px-6 py-24 text-white">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/10" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-sky-400/10" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">

          <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-400">
            Player Development
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">
            Our Teams
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Seven teams. One academy. One family. From our youngest
            Gardeners to our senior team, every player has a pathway
            to develop and grow.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* INTRODUCTION */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mx-auto max-w-3xl text-center">

          <p className="font-black uppercase tracking-widest text-sky-500">
            The Gardeners
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
            One Academy.

            <span className="block text-sky-500">
              Seven Teams.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            Nasra Santos Football Academy provides a structured
            development pathway where players can begin at a young age
            and progress through the academy toward senior football.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* TEAMS */}
      {/* ================================================= */}

      <section className="bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {teams.map((team) => (

              <article
                key={team.shortName}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* ========================================= */}
                {/* TEAM PHOTO */}
                {/* ========================================= */}

                <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-slate-100 p-2">

                  <Image
                    src={team.image}
                    alt={`${team.name} Nasra Santos Football Academy`}
                    width={900}
                    height={1100}
                    className="max-h-[440px] h-auto w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                  />

                  {/* TEAM BADGE */}

                  <div className="absolute bottom-5 left-5">

                    <span className="rounded-full bg-sky-400 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-950 shadow-lg">
                      {team.shortName}
                    </span>

                  </div>

                </div>


                {/* ========================================= */}
                {/* TEAM DETAILS */}
                {/* ========================================= */}

                <div className="p-7">

                  <h3 className="text-2xl font-black uppercase text-blue-950">
                    {team.name}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {team.description}
                  </p>

                  <Link
                    href={`/teams/${team.slug}`}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-950 px-5 py-3 text-sm font-black uppercase text-white transition hover:bg-sky-400 hover:text-blue-950"
                  >
                    View Team

                    <span>
                      →
                    </span>

                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* DEVELOPMENT PATHWAY */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-sky-500">
              Development Pathway
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
              From Grassroots

              <span className="block text-sky-500">
                To Senior Football
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              Our development structure gives players a clear pathway
              through the different age groups at Nasra Santos.
            </p>

          </div>


          {/* PATHWAY */}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">

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

                <div className="flex h-16 min-w-16 items-center justify-center rounded-full bg-blue-950 px-4 font-black text-white shadow-md">
                  {team}
                </div>

                {index < array.length - 1 && (

                  <span className="text-2xl font-black text-sky-400">
                    →
                  </span>

                )}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* VALUES */}
      {/* ================================================= */}

      <section className="bg-blue-950 px-6 py-20 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-sky-400">
              Our Foundation
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
              More Than Players
            </h2>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* DISCIPLINE */}

            <div className="rounded-2xl bg-white/10 p-7">

              <p className="text-3xl font-black text-sky-400">
                01
              </p>

              <h3 className="mt-4 text-xl font-black uppercase">
                Discipline
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Developing responsibility, commitment and respect
                both on and off the pitch.
              </p>

            </div>


            {/* TEAMWORK */}

            <div className="rounded-2xl bg-white/10 p-7">

              <p className="text-3xl font-black text-sky-400">
                02
              </p>

              <h3 className="mt-4 text-xl font-black uppercase">
                Teamwork
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Teaching players to work together and support their
                teammates as one family.
              </p>

            </div>


            {/* DEVELOPMENT */}

            <div className="rounded-2xl bg-white/10 p-7">

              <p className="text-3xl font-black text-sky-400">
                03
              </p>

              <h3 className="mt-4 text-xl font-black uppercase">
                Development
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Helping every player improve technically, tactically,
                physically and personally.
              </p>

            </div>


            {/* OPPORTUNITY */}

            <div className="rounded-2xl bg-white/10 p-7">

              <p className="text-3xl font-black text-sky-400">
                04
              </p>

              <h3 className="mt-4 text-xl font-black uppercase">
                Opportunity
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Creating opportunities for talented young footballers
                to compete, grow and progress.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* REGISTRATION CTA */}
      {/* ================================================= */}

      <section className="bg-sky-400 px-6 py-20 text-center">

        <div className="mx-auto max-w-4xl">

          <p className="font-black uppercase tracking-widest text-blue-800">
            Your Journey Starts Here
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
            Become A Gardener
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-950/80">
            Join Nasra Santos Football Academy and become part of
            our player development pathway.
          </p>

          <Link
            href="/registration"
            className="mt-8 inline-block rounded-full bg-blue-950 px-9 py-4 font-black uppercase text-white transition hover:bg-white hover:text-blue-950"
          >
            Register Your Player
          </Link>

        </div>

      </section>

    </main>
  );
}