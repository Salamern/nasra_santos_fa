import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import AnnouncementForm from "./announcement-form";
import AnnouncementControls from "./announcement-controls";

export const dynamic = "force-dynamic";

type Announcement = {
  id: string;
  created_at: string;
  title: string;
  message: string;
  type: string;
  status: string;
};

export default async function AdminAnnouncementsPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("announcements")
    .select("id, created_at, title, message, type, status")
    .order("created_at", { ascending: false });

  const announcements: Announcement[] = data ?? [];

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-lg md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-400">
            Nasra Santos FA
          </p>

          <h1 className="mt-3 text-3xl font-black uppercase md:text-5xl">
            Announcements
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Create and manage academy announcements that can be displayed on
            the public Nasra Santos Football Academy website.
          </p>

          <Link
            href="/admin/content"
            className="mt-6 inline-block rounded-full border border-sky-400 px-6 py-3 text-sm font-black uppercase text-sky-300 transition hover:bg-sky-400 hover:text-blue-950"
          >
            ← Back To Website Content
          </Link>
        </div>

        {/* Create Announcement */}
        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
            New Announcement
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            Create Announcement
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Create an academy announcement and choose whether it should be
            published immediately or saved as a draft.
          </p>

          <AnnouncementForm />
        </section>

        {/* Database Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700">
            Could not load announcements from the database.
          </div>
        )}

        {/* Announcement History */}
        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
            Announcement History
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
              Existing Announcements
            </h2>

            <p className="text-sm font-bold text-slate-500">
              {announcements.length} announcement
              {announcements.length === 1 ? "" : "s"}
            </p>
          </div>

          {announcements.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <div className="text-3xl">📢</div>

              <p className="mt-3 font-black uppercase text-blue-950">
                No Announcements Yet
              </p>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
                Your announcements will appear here after you create them using
                the form above.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {announcements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black uppercase text-sky-700">
                          {announcement.type}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
                            announcement.status === "Published"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {announcement.status}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-black text-blue-950">
                        {announcement.title}
                      </h3>
                    </div>

                    <p className="text-xs font-bold text-slate-500">
                      {new Date(announcement.created_at).toLocaleDateString(
                        "en-KE",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                    {announcement.message}
                  </p>

                  <AnnouncementControls announcement={announcement} />
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Status */}
        <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-700">
            Management Active
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            Announcements are stored in Supabase. You can create, edit, delete,
            publish and save announcements as drafts from this admin page.
          </p>
        </div>
      </div>
    </main>
  );
}