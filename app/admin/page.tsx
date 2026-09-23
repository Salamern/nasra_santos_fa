import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import LogoutButton from "./logout-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("registrations")
    .select("status");

  const registrations = data ?? [];

  const total = registrations.length;

  const pending = registrations.filter(
    (registration) =>
      !registration.status ||
      registration.status.toLowerCase() === "pending"
  ).length;

  const approved = registrations.filter(
    (registration) =>
      registration.status?.toLowerCase() === "approved"
  ).length;

  const rejected = registrations.filter(
    (registration) =>
      registration.status?.toLowerCase() === "rejected"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-lg md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-400">
                Nasra Santos FA
              </p>

              <h1 className="mt-3 text-3xl font-black uppercase md:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Manage academy registrations, fixtures, results and website
                information from one place.
              </p>
            </div>

            <LogoutButton />
          </div>

          <Link
            href="/"
            className="mt-7 inline-block rounded-full border border-sky-400 px-6 py-3 text-sm font-black uppercase text-sky-300 transition hover:bg-sky-400 hover:text-blue-950"
          >
            ← Back To Website
          </Link>
        </div>

        {/* Database Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700">
            Could not load registration statistics.
          </div>
        )}

        {/* Registration Statistics */}
        <section className="mt-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
            Registration Overview
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            Applications
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total" value={total} />
            <StatCard title="Pending" value={pending} />
            <StatCard title="Approved" value={approved} />
            <StatCard title="Rejected" value={rejected} />
          </div>
        </section>

        {/* Management Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Registrations */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
              📝
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-blue-950">
              Registrations
            </h2>

            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
              Review player applications, check payment information and manage
              registration status.
            </p>

            <div className="mt-6 rounded-2xl bg-sky-50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-sky-700">
                {pending} Pending
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {total} total application{total === 1 ? "" : "s"}
              </p>
            </div>

            <Link
              href="/admin/registrations"
              className="mt-5 block rounded-xl bg-blue-950 px-5 py-3 text-center text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
            >
              Manage Registrations
            </Link>
          </div>

          {/* Fixtures & Results */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
              ⚽
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-blue-950">
              Fixtures & Results
            </h2>

            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
              Add upcoming matches, update results, edit match information and
              manage fixtures shown on the public website.
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                System Active
              </p>

              <p className="mt-1 text-sm text-emerald-900">
                Fixture management connected to the public website
              </p>
            </div>

            <Link
              href="/admin/fixtures"
              className="mt-5 block rounded-xl bg-blue-950 px-5 py-3 text-center text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
            >
              Manage Fixtures & Results
            </Link>
          </div>

          {/* Website Content */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
              🌐
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-blue-950">
              Website Content
            </h2>

            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
              Manage selected academy information and website content without
              editing source code.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-100 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                Planned
              </p>

              <p className="mt-1 text-sm text-slate-700">
                Content management
              </p>
            </div>
          </div>
        </div>

        {/* Development Progress */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
          <p className="text-xs font-black uppercase tracking-widest text-sky-500">
            Admin Development
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            Development Progress
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ProgressCard
              number="01"
              title="Secure Admin Login"
              complete
            />

            <ProgressCard
              number="02"
              title="Registration Database"
              complete
            />

            <ProgressCard
              number="03"
              title="Registration Management"
              complete
            />

            <ProgressCard
              number="04"
              title="Fixtures & Results Management"
              complete
            />
          </div>
        </div>
      </div>
    </main>
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

      <p className="mt-2 text-4xl font-black text-blue-950">
        {value}
      </p>
    </div>
  );
}

function ProgressCard({
  number,
  title,
  complete = false,
}: {
  number: string;
  title: string;
  complete?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        complete
          ? "border border-emerald-200 bg-emerald-50"
          : "bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`font-black ${
            complete ? "text-emerald-600" : "text-sky-500"
          }`}
        >
          {number}
        </p>

        {complete && (
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-black uppercase text-emerald-700">
            ✓ Done
          </span>
        )}
      </div>

      <p className="mt-2 text-sm font-black text-blue-950">
        {title}
      </p>
    </div>
  );
}