import Link from "next/link";
import LogoutButton from "./logout-button";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Admin Header */}
        <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-lg md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
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

        {/* Admin Cards */}
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
              View new player applications, check payment information and
              manage registration status.
            </p>

            <div className="mt-6 rounded-2xl bg-amber-50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-amber-700">
                Coming Next
              </p>

              <p className="mt-1 text-sm text-amber-900">
                Registration management
              </p>
            </div>
          </div>

          {/* Fixtures */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
              ⚽
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-blue-950">
              Fixtures & Results
            </h2>

            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
              Add upcoming matches and update results that will later appear
              automatically on the public website.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-100 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                Planned
              </p>

              <p className="mt-1 text-sm text-slate-700">
                Match management
              </p>
            </div>
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
              Later we can manage selected academy information and website
              content without editing source code.
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

        {/* Development Roadmap */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
          <p className="text-xs font-black uppercase tracking-widest text-sky-500">
            Admin Development
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            What We&apos;re Building
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-green-50 p-5">
              <p className="font-black text-green-600">01</p>
              <p className="mt-2 text-sm font-black text-blue-950">
                Secure Admin Login
              </p>
              <p className="mt-2 text-xs font-bold uppercase text-green-600">
                Active
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="font-black text-sky-500">02</p>
              <p className="mt-2 text-sm font-black text-blue-950">
                Registration Database
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="font-black text-sky-500">03</p>
              <p className="mt-2 text-sm font-black text-blue-950">
                Registration Management
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="font-black text-sky-500">04</p>
              <p className="mt-2 text-sm font-black text-blue-950">
                Fixtures & Content
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}