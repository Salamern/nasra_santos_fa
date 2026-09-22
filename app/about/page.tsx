import Link from "next/link";

const values = [
  {
    number: "01",
    title: "Discipline",
    description:
      "We teach players the importance of commitment, responsibility, respect and consistency both on and off the pitch.",
  },
  {
    number: "02",
    title: "Teamwork",
    description:
      "Football is a team game. We encourage our players to support one another and grow together as one academy family.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Our focus is long-term player development, helping young footballers improve technically, tactically and personally.",
  },
  {
    number: "04",
    title: "Opportunity",
    description:
      "We aim to create opportunities for talented young players to train, compete, progress and pursue their football ambitions.",
  },
];

const teams = ["U7", "U9", "U11", "U13", "U15", "U17", "Senior"];

export default function AboutPage() {
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
            About The Gardeners
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">
            Nasra Santos
            <span className="block text-sky-400">
              Football Academy
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Developing young footballers, building character and creating
            opportunities through the beautiful game.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* WHO WE ARE */}
      {/* ================================================= */}

      <section className="px-6 py-20">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="font-black uppercase tracking-widest text-sky-500">
              Who We Are
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase leading-tight text-blue-950 md:text-5xl">
              Developing Players.
              <span className="block text-sky-500">
                Building Character.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Nasra Santos Football Academy is a grassroots football academy
              based in Nairobi, Kenya, committed to helping young footballers
              develop their talent in a structured and positive environment.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Our academy provides a pathway for players across different age
              groups, beginning with our youngest Gardeners and progressing
              through to our senior team.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We believe football development goes beyond what happens during
              a match. Discipline, teamwork, respect, confidence and
              responsibility are important parts of the player we aim to
              develop.
            </p>

          </div>


          {/* ACADEMY CARD */}

          <div className="rounded-3xl bg-gradient-to-br from-blue-950 to-sky-600 p-10 text-white shadow-xl md:p-12">

            <p className="text-sm font-black uppercase tracking-widest text-sky-200">
              Nasra Santos FA
            </p>

            <h3 className="mt-3 text-3xl font-black uppercase">
              Your Chance To Join
              <span className="block text-sky-300">
                The Gardeners
              </span>
            </h3>

            <p className="mt-6 leading-8 text-sky-100">
              We want every player who joins Nasra Santos to have an
              opportunity to learn, compete, improve and become part of a
              football family.
            </p>


            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-6">

                <p className="text-4xl font-black">
                  7
                </p>

                <p className="mt-2 text-sm text-sky-100">
                  Teams
                </p>

              </div>


              <div className="rounded-2xl bg-white/10 p-6">

                <p className="text-4xl font-black">
                  1
                </p>

                <p className="mt-2 text-sm text-sky-100">
                  Academy Family
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* MISSION AND VISION */}
      {/* ================================================= */}

      <section className="bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 md:grid-cols-2">

            {/* MISSION */}

            <div className="rounded-3xl bg-white p-9 shadow-sm md:p-12">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-950 text-xl font-black text-sky-300">
                M
              </div>

              <p className="mt-7 text-sm font-black uppercase tracking-widest text-sky-500">
                Our Mission
              </p>

              <h2 className="mt-2 text-3xl font-black uppercase text-blue-950">
                Develop The Player
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                To provide young footballers with quality development,
                competitive opportunities and positive guidance that helps
                them improve as players and as individuals.
              </p>

            </div>


            {/* VISION */}

            <div className="rounded-3xl bg-blue-950 p-9 text-white shadow-sm md:p-12">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-400 text-xl font-black text-blue-950">
                V
              </div>

              <p className="mt-7 text-sm font-black uppercase tracking-widest text-sky-300">
                Our Vision
              </p>

              <h2 className="mt-2 text-3xl font-black uppercase">
                Create Opportunity
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                To continue building a respected football development
                environment that gives talented young players opportunities
                to progress toward higher levels of the game.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* OUR VALUES */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-sky-500">
              What Guides Us
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
              Our Values
            </h2>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((value) => (

              <div
                key={value.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >

                <p className="text-3xl font-black text-sky-400">
                  {value.number}
                </p>

                <h3 className="mt-5 text-xl font-black uppercase text-blue-950">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {value.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* PLAYER PATHWAY */}
      {/* ================================================= */}

      <section className="bg-blue-950 px-6 py-20 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-sky-400">
              Player Development
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
              The Nasra Pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              Our academy structure gives young players a pathway to
              progress through different stages of their football
              development.
            </p>

          </div>


          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">

            {teams.map((team, index) => (

              <div
                key={team}
                className="flex items-center gap-3"
              >

                <div className="flex h-16 min-w-16 items-center justify-center rounded-full bg-white/10 px-5 font-black text-sky-300">
                  {team}
                </div>

                {index < teams.length - 1 && (

                  <span className="text-2xl font-black text-sky-400">
                    →
                  </span>

                )}

              </div>

            ))}

          </div>


          <div className="mt-10 text-center">

            <Link
              href="/teams"
              className="inline-block rounded-full border-2 border-sky-400 px-7 py-3 font-black uppercase text-sky-300 transition hover:bg-sky-400 hover:text-blue-950"
            >
              Explore Our Teams
            </Link>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* LOCATION */}
      {/* ================================================= */}

      <section className="bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl bg-white p-10 shadow-sm md:p-14">

            <div className="grid gap-10 md:grid-cols-2 md:items-center">

              <div>

                <p className="font-black uppercase tracking-widest text-sky-500">
                  Our Home
                </p>

                <h2 className="mt-3 text-4xl font-black uppercase text-blue-950">
                  Nairobi, Kenya
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  Nasra Santos Football Academy is based at Nasra Garden
                  Estate in Nairobi, Kenya.
                </p>

                <p className="mt-4 leading-8 text-slate-600">
                  Our academy continues to serve young footballers from
                  our community while creating an environment where talent
                  can be discovered and developed.
                </p>

              </div>


              <div className="rounded-3xl bg-slate-50 p-8">

                <p className="text-sm font-black uppercase tracking-widest text-sky-500">
                  Academy Information
                </p>

                <div className="mt-6 space-y-5">

                  <div className="border-b border-slate-200 pb-4">

                    <p className="text-sm font-bold text-slate-500">
                      Academy
                    </p>

                    <p className="mt-1 font-black text-blue-950">
                      Nasra Santos Football Academy
                    </p>

                  </div>


                  <div className="border-b border-slate-200 pb-4">

                    <p className="text-sm font-bold text-slate-500">
                      Location
                    </p>

                    <p className="mt-1 font-black text-blue-950">
                      Nasra Garden Estate, Nairobi
                    </p>

                  </div>


                  <div>

                    <p className="text-sm font-bold text-slate-500">
                      Contact
                    </p>

                    <p className="mt-1 font-black text-blue-950">
                      0746360438
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* FUTURE */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-4xl text-center">

          <p className="font-black uppercase tracking-widest text-sky-500">
            Looking Forward
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
            Building For The Future
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-slate-600">
            Nasra Santos Football Academy aims to continue improving its
            player development programme, creating more opportunities for
            young footballers and strengthening the pathway from grassroots
            football to senior competition.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* JOIN CTA */}
      {/* ================================================= */}

      <section className="bg-sky-400 px-6 py-20 text-center">

        <div className="mx-auto max-w-4xl">

          <p className="font-black uppercase tracking-widest text-blue-800">
            Join Our Family
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
            Your Chance To Join The Gardeners
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-950/80">
            Start your football journey with Nasra Santos Football Academy.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/registration"
              className="rounded-full bg-blue-950 px-9 py-4 font-black uppercase text-white transition hover:bg-white hover:text-blue-950"
            >
              Register Now
            </Link>

            <Link
              href="/teams"
              className="rounded-full border-2 border-blue-950 px-9 py-4 font-black uppercase text-blue-950 transition hover:bg-blue-950 hover:text-white"
            >
              View Our Teams
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}