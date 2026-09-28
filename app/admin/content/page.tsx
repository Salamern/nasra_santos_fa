import Link from "next/link";

export default function AdminContentPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-lg md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-400">
            Nasra Santos FA
          </p>

          <h1 className="mt-3 text-3xl font-black uppercase md:text-5xl">
            Website Content
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Manage selected information displayed on the Nasra Santos Football
            Academy website.
          </p>

          <Link
            href="/admin"
            className="mt-6 inline-block rounded-full border border-sky-400 px-6 py-3 text-sm font-black uppercase text-sky-300 transition hover:bg-sky-400 hover:text-blue-950"
          >
            ← Back To Dashboard
          </Link>
        </div>

        {/* Content Areas */}
        <section className="mt-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
            Content Management
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            Website Sections
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Manage selected sections of the Nasra Santos Football Academy
            website directly from the admin dashboard.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Announcements */}
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
                📢
              </div>

              <h3 className="mt-5 text-lg font-black uppercase text-blue-950">
                Announcements
              </h3>

              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                Publish important academy notices and announcements for players,
                parents and visitors.
              </p>

              <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                  System Active
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  Connected to Supabase
                </p>
              </div>

              <Link
                href="/admin/content/announcements"
                className="mt-5 block rounded-xl bg-blue-950 px-5 py-3 text-center text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
              >
                Manage Announcements
              </Link>
            </div>

            {/* Contact Information */}
            <ContentCard
              icon="📞"
              title="Contact Information"
              description="Manage the academy phone number, email address and location information."
            />

            {/* Homepage */}
            <ContentCard
              icon="🏠"
              title="Homepage"
              description="Manage selected text displayed on the public homepage."
            />

            {/* About */}
            <ContentCard
              icon="ℹ️"
              title="About Academy"
              description="Update selected information about Nasra Santos Football Academy."
            />

            {/* Training */}
            <ContentCard
              icon="⚽"
              title="Training Information"
              description="Manage training venue, schedules and other academy programme information."
            />

            {/* Social Media */}
            <ContentCard
              icon="🔗"
              title="Social Media"
              description="Manage the academy's Instagram, TikTok, Facebook and YouTube information."
            />
          </div>
        </section>

        {/* Development Status */}
        <div className="mt-8 rounded-3xl border border-sky-200 bg-sky-50 p-7 md:p-9">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600">
            Content Management System
          </p>

          <h2 className="mt-2 text-xl font-black uppercase text-blue-950">
            Development Progress
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                ✓ Active
              </p>

              <p className="mt-2 font-black text-blue-950">
                Announcements Management
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                Coming Next
              </p>

              <p className="mt-2 font-black text-blue-950">
                Contact & Website Information
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-700">
            Announcements are now stored in the academy database. We will
            continue activating the remaining website sections one at a time.
          </p>
        </div>
      </div>
    </main>
  );
}

function ContentCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-black uppercase text-blue-950">
        {title}
      </h3>

      <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-5 rounded-xl bg-slate-100 px-4 py-3">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500">
          Coming Next
        </p>
      </div>
    </div>
  );
}