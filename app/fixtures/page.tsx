import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type Fixture = {
  id: string;
  match_date: string;
  kickoff_time: string | null;
  competition: string;
  venue: string | null;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  match_status: string;
  notes: string | null;
  created_at: string;
};

export default async function FixturesPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("fixtures")
    .select("*")
    .order("match_date", { ascending: false });

  const matches = (data ?? []) as Fixture[];

  const upcoming = matches
    .filter((match) => match.match_status === "Upcoming")
    .sort(
      (a, b) =>
        new Date(a.match_date).getTime() -
        new Date(b.match_date).getTime()
    );

  const completed = matches
    .filter((match) => match.match_status === "Completed")
    .sort(
      (a, b) =>
        new Date(b.match_date).getTime() -
        new Date(a.match_date).getTime()
    );

  const nextMatch = upcoming[0];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
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

      {/* DATABASE ERROR */}
      {error && (
        <section className="mx-auto max-w-6xl px-6 pt-10">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-black text-red-700">
              Fixtures could not be loaded.
            </p>

            <p className="mt-1 text-sm text-red-600">
              Please try again later.
            </p>
          </div>
        </section>
      )}

      {/* NEXT MATCH */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <p className="font-black uppercase tracking-widest text-sky-500">
            Coming Up
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase text-blue-950 md:text-4xl">
            Next Match
          </h2>
        </div>

        {!nextMatch ? (
          <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-black uppercase text-blue-950">
              No Upcoming Fixture
            </p>

            <p className="mt-2 text-sm text-slate-500">
              The next match will appear here once it is announced.
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl bg-blue-950 text-white shadow-xl">
            {/* Date */}
            <div className="bg-sky-400 px-6 py-4 text-center">
              <p className="text-sm font-black uppercase tracking-widest text-blue-950">
                {formatDate(nextMatch.match_date)}
              </p>
            </div>

            {/* Match */}
            <div className="p-8 md:p-12">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                {nextMatch.competition || "Upcoming Match"}
              </p>

              <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-xl font-black text-sky-300">
                    {getInitials(nextMatch.home_team)}
                  </div>

                  <p className="mt-4 text-lg font-black md:text-2xl">
                    {nextMatch.home_team}
                  </p>
                </div>

                <div className="text-center">
                  <div className="rounded-xl bg-sky-400 px-5 py-3 font-black text-blue-950">
                    VS
                  </div>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-xl font-black text-sky-300">
                    {getInitials(nextMatch.away_team)}
                  </div>

                  <p className="mt-4 text-lg font-black md:text-2xl">
                    {nextMatch.away_team}
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 text-center sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                    Kick Off
                  </p>

                  <p className="mt-2 font-black">
                    {formatTime(nextMatch.kickoff_time)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                    Venue
                  </p>

                  <p className="mt-2 font-black">
                    {nextMatch.venue || "TBA"}
                  </p>
                </div>
              </div>

              {nextMatch.notes && (
                <div className="mt-6 rounded-2xl bg-white/10 p-4 text-center">
                  <p className="text-sm text-slate-200">
                    {nextMatch.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* OTHER UPCOMING MATCHES */}
        {upcoming.length > 1 && (
          <div className="mx-auto mt-10 max-w-4xl">
            <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              More Upcoming Fixtures
            </p>

            <div className="mt-5 space-y-4">
              {upcoming.slice(1).map((fixture) => (
                <div
                  key={fixture.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-sky-500">
                        {fixture.competition || "Match"}
                      </p>

                      <p className="mt-2 font-black text-blue-950">
                        {formatDate(fixture.match_date)}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {formatTime(fixture.kickoff_time)} •{" "}
                        {fixture.venue || "TBA"}
                      </p>
                    </div>

                    <div className="font-black text-blue-950 md:text-lg">
                      {fixture.home_team}
                      <span className="mx-3 text-sky-500">VS</span>
                      {fixture.away_team}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* RESULTS */}
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

          {completed.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="font-black uppercase text-blue-950">
                No Results Yet
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Completed matches will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-10 space-y-5">
              {completed.map((result) => {
                const nasraIsHome =
                  result.home_team === "Nasra Santos FA";

                const nasraIsAway =
                  result.away_team === "Nasra Santos FA";

                const nasraScore = nasraIsHome
                  ? result.home_score
                  : result.away_score;

                const opponentScore = nasraIsHome
                  ? result.away_score
                  : result.home_score;

                let resultStatus = "RESULT";

                if (
                  nasraIsHome ||
                  nasraIsAway
                ) {
                  if (
                    nasraScore !== null &&
                    opponentScore !== null
                  ) {
                    if (nasraScore > opponentScore) {
                      resultStatus = "WIN";
                    } else if (nasraScore < opponentScore) {
                      resultStatus = "LOSS";
                    } else {
                      resultStatus = "DRAW";
                    }
                  }
                }

                return (
                  <div
                    key={result.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="grid items-center gap-6 p-6 md:grid-cols-[180px_1fr_110px] md:p-8">
                      {/* DATE */}
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-sky-500">
                          {result.competition || "Match"}
                        </p>

                        <p className="mt-2 font-black text-blue-950">
                          {formatDate(result.match_date)}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {result.venue || "TBA"}
                        </p>
                      </div>

                      {/* SCORE */}
                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                        <p className="text-right font-black text-blue-950 md:text-lg">
                          {result.home_team}
                        </p>

                        <div className="rounded-xl bg-blue-950 px-4 py-3 text-center text-xl font-black text-white">
                          {result.home_score ?? 0} -{" "}
                          {result.away_score ?? 0}
                        </div>

                        <p className="font-black text-blue-950 md:text-lg">
                          {result.away_team}
                        </p>
                      </div>

                      {/* RESULT STATUS */}
                      <div className="text-center md:text-right">
                        <span
                          className={`inline-block rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${
                            resultStatus === "WIN"
                              ? "bg-emerald-100 text-emerald-700"
                              : resultStatus === "LOSS"
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {resultStatus}
                        </span>
                      </div>
                    </div>

                    {result.notes && (
                      <div className="border-t border-slate-100 px-6 py-4 md:px-8">
                        <p className="text-sm text-slate-500">
                          {result.notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* HOME GROUND */}
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

      {/* JOIN CTA */}
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatTime(time: string | null) {
  if (!time) {
    return "TBA";
  }

  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return new Intl.DateTimeFormat("en-KE", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getInitials(team: string) {
  return team
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}