"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SocialMedia = {
  id: number;
  instagram: string;
  tiktok: string;
  facebook: string;
  youtube: string;
};

export default function SocialMediaForm({
  socialMedia,
}: {
  socialMedia: SocialMedia;
}) {
  const router = useRouter();

  const [instagram, setInstagram] = useState(socialMedia.instagram);
  const [tiktok, setTiktok] = useState(socialMedia.tiktok);
  const [facebook, setFacebook] = useState(socialMedia.facebook);
  const [youtube, setYoutube] = useState(socialMedia.youtube);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/social-media", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: socialMedia.id,
          instagram,
          tiktok,
          facebook,
          youtube,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to update social media information."
        );
      }

      setMessage("Social media information updated successfully.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update social media information."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {message && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-700">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="instagram"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Instagram
        </label>

        <input
          id="instagram"
          type="text"
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
          placeholder="nasra_santos_fa"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label
          htmlFor="tiktok"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          TikTok
        </label>

        <input
          id="tiktok"
          type="text"
          value={tiktok}
          onChange={(event) => setTiktok(event.target.value)}
          placeholder="nasra_santos_fa"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label
          htmlFor="facebook"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Facebook
        </label>

        <input
          id="facebook"
          type="text"
          value={facebook}
          onChange={(event) => setFacebook(event.target.value)}
          placeholder="Nasra Santos FA"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label
          htmlFor="youtube"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          YouTube
        </label>

        <input
          id="youtube"
          type="text"
          value={youtube}
          onChange={(event) => setYoutube(event.target.value)}
          placeholder="Nasra Santos"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-2xl bg-blue-950 px-7 py-4 font-black uppercase tracking-wider text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Social Media"}
      </button>
    </form>
  );
}