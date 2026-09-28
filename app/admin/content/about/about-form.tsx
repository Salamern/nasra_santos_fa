"use client";

import { FormEvent, useState } from "react";

type AboutAcademy = {
  id: number;
  title: string;
  description: string;
  mission: string;
  vision: string;
};

type AboutFormProps = {
  about: AboutAcademy;
};

export default function AboutForm({ about }: AboutFormProps) {
  const [title, setTitle] = useState(about.title);
  const [description, setDescription] = useState(about.description);
  const [mission, setMission] = useState(about.mission);
  const [vision, setVision] = useState(about.vision);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/about-academy", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: about.id,
          title: title.trim(),
          description: description.trim(),
          mission: mission.trim(),
          vision: vision.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update About Academy.");
      }

      setMessage("About Academy information updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-7">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Academy Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          placeholder="Nasra Santos Football Academy"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Academy Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          rows={6}
          className="w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 leading-7 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          placeholder="Write a short description about the academy..."
        />

        <p className="mt-2 text-sm text-slate-500">
          This introduces Nasra Santos Football Academy to website visitors.
        </p>
      </div>

      <div>
        <label
          htmlFor="mission"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Our Mission
        </label>

        <textarea
          id="mission"
          value={mission}
          onChange={(event) => setMission(event.target.value)}
          required
          rows={5}
          className="w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 leading-7 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          placeholder="Write the academy mission..."
        />
      </div>

      <div>
        <label
          htmlFor="vision"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Our Vision
        </label>

        <textarea
          id="vision"
          value={vision}
          onChange={(event) => setVision(event.target.value)}
          required
          rows={5}
          className="w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 leading-7 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          placeholder="Write the academy vision..."
        />
      </div>

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

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-2xl bg-blue-950 px-6 py-4 font-black uppercase tracking-wider text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {saving ? "Saving..." : "Save About Academy"}
      </button>
    </form>
  );
}