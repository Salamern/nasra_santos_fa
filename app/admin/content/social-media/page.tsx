import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import SocialMediaForm from "./social-media-form";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SocialMedia = {
  id: number;
  instagram: string;
  tiktok: string;
  facebook: string;
  youtube: string;
};

export default async function SocialMediaPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("social_media")
    .select("id, instagram, tiktok, facebook, youtube")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/content"
          className="text-sm font-black uppercase tracking-wider text-blue-950 hover:text-sky-500"
        >
          ← Back to Website Content
        </Link>

        <div className="mt-6 rounded-3xl bg-blue-950 p-8 text-white shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-400">
            Website Content
          </p>

          <h1 className="mt-3 text-3xl font-black uppercase md:text-5xl">
            Social Media
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Manage the official Nasra Santos Football Academy social media
            accounts displayed on the public website.
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <div className="border-b border-slate-200 pb-6">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-sky-600">
              Social Accounts
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
              Edit Social Media Information
            </h2>

            <p className="mt-3 text-slate-600">
              Update the academy&apos;s Instagram, TikTok, Facebook and YouTube
              information from one place.
            </p>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              Unable to load the academy social media information.
            </div>
          ) : data ? (
            <SocialMediaForm socialMedia={data as SocialMedia} />
          ) : (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
              No social media information was found in the database.
            </div>
          )}
        </section>

        <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-black uppercase tracking-wider text-emerald-800">
            Database Connected
          </p>

          <p className="mt-2 text-sm leading-6 text-emerald-700">
            Social media information is stored in Supabase. Changes made here
            can be displayed automatically on the public website.
          </p>
        </div>
      </div>
    </main>
  );
}