import { createAdminClient } from "@/lib/supabase/admin";
import { unstable_noStore as noStore } from "next/cache";

type Announcement = {
  id: string;
  created_at: string;
  title: string;
  message: string;
  type: string;
  status: string;
};

export default async function AnnouncementsSection() {
      noStore();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("announcements")
    .select("id, created_at, title, message, type, status")
    .eq("status", "Published")
    .order("created_at", { ascending: false })
    .limit(6);

  const announcements: Announcement[] = data ?? [];

  // If the database cannot be reached, or there are no published
  // announcements, we simply hide this section from the public website.
  if (error || announcements.length === 0) {
    return null;
  }

  function getTypeStyle(type: string) {
    switch (type) {
      case "Important Notice":
        return "bg-red-100 text-red-700";

      case "Match":
        return "bg-emerald-100 text-emerald-700";

      case "Training":
        return "bg-amber-100 text-amber-700";

      case "Parents":
        return "bg-purple-100 text-purple-700";

      case "Trials":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-sky-100 text-sky-700";
    }
  }

  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-bold uppercase tracking-widest text-sky-500">
            Academy Updates
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase text-blue-950 md:text-5xl">
            Latest Announcements
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Stay updated with the latest news, notices, training information
            and academy announcements from Nasra Santos Football Academy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <article
              key={announcement.id}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${getTypeStyle(
                    announcement.type
                  )}`}
                >
                  {announcement.type}
                </span>

                <span className="text-xs font-bold uppercase text-slate-400">
                  {new Date(announcement.created_at).toLocaleDateString(
                    "en-KE",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-black text-blue-950">
                {announcement.title}
              </h3>

              <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                {announcement.message}
              </p>

              <div className="mt-auto pt-6">
                <div className="h-1 w-14 rounded-full bg-sky-400" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}