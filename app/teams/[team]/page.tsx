import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Team = {
  name: string;
  shortName: string;
  image: string;
  category: string;
  description: string;
  focus: string[];
};

const teams: Record<string, Team> = {
  u7: {
    name: "Under 7",
    shortName: "U7",
    image: "/u7.jpg",
    category: "Foundation Phase",
    description:
      "Our Under 7 team introduces young players to football in a fun, safe and positive environment. The focus is on enjoying the game while learning basic football skills, teamwork and discipline.",
    focus: [
      "Ball control",
      "Basic passing",
      "Coordination",
      "Teamwork",
    ],
  },

  u9: {
    name: "Under 9",
    shortName: "U9",
    image: "/u9.jpg",
    category: "Foundation Phase",
    description:
      "Our Under 9 team continues building the football foundations of our young Gardeners while developing confidence, technical ability and understanding of the game.",
    focus: [
      "First touch",
      "Passing",
      "Dribbling",
      "Game awareness",
    ],
  },

  u11: {
    name: "Under 11",
    shortName: "U11",
    image: "/u11.jpg",
    category: "Development Phase",
    description:
      "The Under 11 team focuses on developing technical ability, decision-making and teamwork while giving players more experience in competitive football.",
    focus: [
      "Technical development",
      "Positioning",
      "Passing combinations",
      "Decision-making",
    ],
  },

  u13: {
    name: "Under 13",
    shortName: "U13",
    image: "/u13.jpg",
    category: "Development Phase",
    description:
      "Our Under 13 players continue their development through structured training, competitive matches and greater tactical understanding of football.",
    focus: [
      "Tactical awareness",
      "Technical ability",
      "Team structure",
      "Match experience",
    ],
  },

  u15: {
    name: "Under 15",
    shortName: "U15",
    image: "/u15.jpg",
    category: "Youth Development",
    description:
      "The Under 15 team prepares talented young players for higher levels of competitive football through advanced technical, tactical and physical development.",
    focus: [
      "Advanced technique",
      "Tactical development",
      "Physical preparation",
      "Competitive football",
    ],
  },

  u17: {
    name: "Under 17",
    shortName: "U17",
    image: "/u17.jpg",
    category: "Performance Phase",
    description:
      "Our Under 17 team represents an important stage in the Nasra Santos development pathway, preparing players for the transition into senior and competitive football.",
    focus: [
      "Match performance",
      "Tactical understanding",
      "Physical development",
      "Senior preparation",
    ],
  },

  senior: {
    name: "Senior Team",
    shortName: "Senior",
    image: "/senior.jpg",
    category: "Senior Football",
    description:
      "The Nasra Santos Senior Team represents the academy at competitive level while providing our developing players with a pathway into senior football.",
    focus: [
      "Competitive football",
      "Team performance",
      "Player progression",
      "Leadership",
    ],
  },
};

export default async function TeamPage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team: teamSlug } = await params;

  const team = teams[teamSlug.toLowerCase()];

  if (!team) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ================================================= */}
      {/* TEAM HERO */}
      {/* ================================================= */}

      <section className="bg-blue-950 px-6 py-16 text-white">

        <div className="mx-auto max-w-7xl">

          {/* Back Button */}

          <Link
            href="/teams"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-sky-300 transition hover:text-white"
          >
            ← All Teams
          </Link>


          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Team Information */}

            <div>

              <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-400">
                {team.category}
              </p>

              <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">
                {team.name}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                {team.description}
              </p>

              <div className="mt-8">

                <Link
                  href="/registration"
                  className="inline-block rounded-full bg-sky-400 px-8 py-4 font-black uppercase text-blue-950 transition hover:bg-white"
                >
                  Join {team.shortName}
                </Link>

              </div>

            </div>


            {/* Team Photo */}

            <div className="overflow-hidden rounded-3xl bg-white/10 p-3 shadow-2xl">

              <Image
                src={team.image}
                alt={`${team.name} Nasra Santos Football Academy`}
                width={1000}
                height={1200}
                priority
                className="h-auto max-h-[600px] w-full rounded-2xl object-contain"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* TEAM OVERVIEW */}
      {/* ================================================= */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-2">

            {/* About Team */}

            <div>

              <p className="font-black uppercase tracking-widest text-sky-500">
                The Gardeners
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase text-blue-950">
                About The {team.name}
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                Every player at Nasra Santos Football Academy is given
                the opportunity to learn, develop and compete in an
                environment built around discipline, teamwork and
                continuous improvement.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                The {team.name} forms part of our academy development
                pathway, helping players progress toward the next stage
                of their football journey.
              </p>

            </div>


            {/* Team Information Card */}

            <div className="rounded-3xl bg-slate-50 p-8 md:p-10">

              <p className="text-sm font-black uppercase tracking-widest text-sky-500">
                Team Information
              </p>

              <div className="mt-7 space-y-6">

                <div className="border-b border-slate-200 pb-5">

                  <p className="text-sm font-bold text-slate-500">
                    Team
                  </p>

                  <p className="mt-1 text-xl font-black text-blue-950">
                    Nasra Santos {team.name}
                  </p>

                </div>


                <div className="border-b border-slate-200 pb-5">

                  <p className="text-sm font-bold text-slate-500">
                    Development Stage
                  </p>

                  <p className="mt-1 text-xl font-black text-blue-950">
                    {team.category}
                  </p>

                </div>


                <div>

                  <p className="text-sm font-bold text-slate-500">
                    Academy
                  </p>

                  <p className="mt-1 text-xl font-black text-blue-950">
                    Nasra Santos Football Academy
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* DEVELOPMENT FOCUS */}
      {/* ================================================= */}

      <section className="bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-sky-500">
              Player Development
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
              Development Focus
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              Our training programme focuses on helping players
              improve important areas of their football development.
            </p>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {team.focus.map((item, index) => (

              <div
                key={item}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-950 font-black text-sky-300">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-5 text-xl font-black uppercase text-blue-950">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* SQUAD SECTION */}
      {/* ================================================= */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-sky-500">
              Meet The Gardeners
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
              {team.name} Squad
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              Player profiles for the {team.name} squad will be
              available here as we continue building the official
              Nasra Santos Football Academy website.
            </p>

          </div>


          {/* Temporary Squad Area */}

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-950 text-2xl font-black text-sky-300">
              {team.shortName === "Senior"
                ? "ST"
                : team.shortName}
            </div>

            <h3 className="mt-6 text-2xl font-black uppercase text-blue-950">
              Squad Profiles Coming Soon
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              Player names, positions, jersey numbers and individual
              profiles will be added to this section.
            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* ACADEMY VALUES */}
      {/* ================================================= */}

      <section className="bg-blue-950 px-6 py-20 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-black uppercase tracking-widest text-sky-400">
              Nasra Santos FA
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
              What We Stand For
            </h2>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "Discipline",
              "Teamwork",
              "Development",
              "Opportunity",
            ].map((value, index) => (

              <div
                key={value}
                className="rounded-2xl bg-white/10 p-7"
              >

                <p className="text-3xl font-black text-sky-400">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-4 text-xl font-black uppercase">
                  {value}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* JOIN CTA */}
      {/* ================================================= */}

      <section className="bg-sky-400 px-6 py-20 text-center">

        <div className="mx-auto max-w-4xl">

          <p className="font-black uppercase tracking-widest text-blue-800">
            Become A Gardener
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
            Join {team.name}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-950/80">
            Start your football development journey with Nasra Santos
            Football Academy.
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