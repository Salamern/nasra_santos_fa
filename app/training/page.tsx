import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type TrainingInformation = {
  id: number;
  training_days: string;
  training_time: string;
  venue: string;
  age_groups: string;
  additional_information: string | null;
};

export default async function TrainingPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("training_information")
    .select(
      "id, training_days, training_time, venue, age_groups, additional_information"
    )
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  const training = data as TrainingInformation | null;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-blue-950 px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-400">
            Nasra Santos Football Academy
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase leading-tight md:text-6xl">
            Training
            <span className="block text-sky-400">Information</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Find the latest academy training schedule, venue and age-group
            information.
          </p>
        </div>
      </section>

      {/* Training Details */}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">
              Training information is currently unavailable.
            </div>
          ) : training ? (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600">
                    Schedule
                  </p>
                  <h2 className="mt-3 text-xl font-black uppercase text-blue-950">
                    Training Days
                  </h2>
                  <p className="mt-3 text-lg text-slate-700">
                    {training.training_days}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600">
                    Time
                  </p>
                  <h2 className="mt-3 text-xl font-black uppercase text-blue-950">
                    Training Time
                  </h2>
                  <p className="mt-3 text-lg text-slate-700">
                    {training.training_time}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600">
                    Location
                  </p>
                  <h2 className="mt-3 text-xl font-black uppercase text-blue-950">
                    Training Venue
                  </h2>
                  <p className="mt-3 text-lg text-slate-700">
                    {training.venue}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600">
                    Academy Teams
                  </p>
                  <h2 className="mt-3 text-xl font-black uppercase text-blue-950">
                    Age Groups
                  </h2>
                  <p className="mt-3 text-lg leading-8 text-slate-700">
                    {training.age_groups}
                  </p>
                </div>
              </div>

              {training.additional_information && (
                <div className="mt-8 rounded-3xl bg-blue-950 p-8 text-white shadow-lg md:p-10">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                    Important Information
                  </p>

                  <h2 className="mt-3 text-2xl font-black uppercase">
                    Training Notice
                  </h2>

                  <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                    {training.additional_information}
                  </p>
                </div>
              )}

              <div className="mt-10 rounded-3xl border border-sky-200 bg-sky-50 p-8 md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase text-blue-950">
                    Want to Join Nasra Santos?
                  </h2>

                  <p className="mt-3 text-slate-600">
                    Register with the academy and become part of the Gardeners.
                  </p>
                </div>

                <Link
                  href="/registration"
                  className="mt-6 inline-block rounded-2xl bg-blue-950 px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-500 md:mt-0"
                >
                  Register Now
                </Link>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-800">
              Training information has not been published yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}