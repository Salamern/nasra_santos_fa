import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import FixtureForm from "./fixture-form";
import FixtureControls from "./fixture-controls";

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

export default async function AdminFixturesPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("fixtures")
    .select("*")
    .order("match_date", { ascending: false });

  const fixtures = (data ?? []) as Fixture[];

  const upcoming = fixtures.filter(
    (fixture) => fixture.match_status === "Upcoming"
  );

  const completed = fixtures.filter(
    (fixture) => fixture.match_status === "Completed"
  );

  const other = fixtures.filter(
    (fixture) =>
      fixture.match_status !== "Upcoming" &&
      fixture.match_status !== "Completed"
  );

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-lg md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-400">
            Nasra Santos FA
          </p>

          <h1 className="mt-3 text-3xl font-black uppercase md:text-5xl">
            Fixtures & Results
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Manage upcoming matches and completed results for Nasra Santos
            Football Academy.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-sky-400 px-6 py-3 text-sm font-black uppercase text-sky-300 transition hover:bg-sky-400 hover:text-blue-950"
            >
              ← Admin Dashboard
            </Link>

            <Link
              href="/fixtures"
              className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase text-blue-950 transition hover:bg-sky-400"
            >
              View Public Fixtures
            </Link>
          </div>
        </div>

        {/* Database Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-black text-red-700">
              Could not load fixtures from the database.
            </p>

            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          </div>
        )}
        <FixtureForm />

        {/* Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard title="Total Matches" value={fixtures.length} />
          <StatCard title="Upcoming" value={upcoming.length} />
          <StatCard title="Completed" value={completed.length} />
        </div>

        {/* Upcoming */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
                Match Management
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
                Upcoming Fixtures
              </h2>
            </div>

            <div className="rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-700">
              {upcoming.length}
            </div>
          </div>

          {upcoming.length === 0 ? (
            <EmptyState message="There are currently no upcoming fixtures." />
          ) : (
            <div className="mt-5 grid gap-5">
              {upcoming.map((fixture) => (
                <FixtureCard key={fixture.id} fixture={fixture} />
              ))}
            </div>
          )}
        </section>

        {/* Completed */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                Match History
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
                Completed Results
              </h2>
            </div>

            <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">
              {completed.length}
            </div>
          </div>

          {completed.length === 0 ? (
            <EmptyState message="There are currently no completed results." />
          ) : (
            <div className="mt-5 grid gap-5">
              {completed.map((fixture) => (
                <FixtureCard key={fixture.id} fixture={fixture} />
              ))}
            </div>
          )}
        </section>

        {/* Postponed / Cancelled */}
        {other.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">
                  Other Matches
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
                  Postponed / Cancelled
                </h2>
              </div>

              <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-700">
                {other.length}
              </div>
            </div>

            <div className="mt-5 grid gap-5">
              {other.map((fixture) => (
                <FixtureCard key={fixture.id} fixture={fixture} />
              ))}
            </div>
          </section>
        )}

        {/* Next Development Notice */}
        <div className="mt-12 rounded-3xl border border-sky-200 bg-sky-50 p-7">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600">
            Next Step
          </p>

          <h2 className="mt-2 text-xl font-black uppercase text-blue-950">
            Match Controls
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
            The database connection is now ready. Next we will add controls for
            creating fixtures, entering final scores, editing match information
            and deleting matches directly from this admin page.
          </p>
        </div>
      </div>
    </main>
  );
}

function FixtureCard({ fixture }: { fixture: Fixture }) {
  const completed = fixture.match_status === "Completed";

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={fixture.match_status} />

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-600">
                {fixture.competition}
              </span>
            </div>

            <p className="mt-4 text-sm font-bold text-slate-500">
              {formatDate(fixture.match_date)}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Kickoff: {formatTime(fixture.kickoff_time)}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Venue
            </p>

            <p className="mt-1 font-bold text-blue-950">
              {fixture.venue || "TBA"}
            </p>
          </div>
        </div>

        <div className="mt-7 grid items-center gap-4 rounded-2xl bg-slate-50 p-5 md:grid-cols-[1fr_auto_1fr] md:p-7">
          <div className="text-center md:text-right">
            <p className="text-lg font-black text-blue-950 md:text-xl">
              {fixture.home_team}
            </p>
          </div>

          <div className="text-center">
            {completed ? (
              <div className="rounded-xl bg-blue-950 px-5 py-3 text-2xl font-black text-white">
                {fixture.home_score ?? 0} - {fixture.away_score ?? 0}
              </div>
            ) : (
              <div className="rounded-xl bg-white px-5 py-3 text-sm font-black uppercase text-slate-500 shadow-sm">
                VS
              </div>
            )}
          </div>

          <div className="text-center md:text-left">
            <p className="text-lg font-black text-blue-950 md:text-xl">
              {fixture.away_team}
            </p>
          </div>
        </div>

        {fixture.notes && (
          <div className="mt-5 rounded-2xl bg-amber-50 p-4">
            <p className="text-xs font-black uppercase tracking-wider text-amber-700">
              Notes
            </p>

            <p className="mt-1 text-sm text-amber-900">{fixture.notes}</p>
          </div>
        )}
        <FixtureControls fixture={fixture} />
      </div>
    </article>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-4xl font-black text-blue-950">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let classes = "bg-slate-100 text-slate-700";

  if (status === "Upcoming") {
    classes = "bg-sky-100 text-sky-700";
  }

  if (status === "Completed") {
    classes = "bg-emerald-100 text-emerald-700";
  }

  if (status === "Postponed") {
    classes = "bg-amber-100 text-amber-700";
  }

  if (status === "Cancelled") {
    classes = "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-black uppercase ${classes}`}
    >
      {status}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-sm font-bold text-slate-500">{message}</p>
    </div>
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