"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type TrainingInformation = {
  id: number;
  training_days: string;
  training_time: string;
  venue: string;
  age_groups: string;
  additional_information: string | null;
};

export default function TrainingForm({
  training,
}: {
  training: TrainingInformation;
}) {
  const router = useRouter();

  const [trainingDays, setTrainingDays] = useState(training.training_days);
  const [trainingTime, setTrainingTime] = useState(training.training_time);
  const [venue, setVenue] = useState(training.venue);
  const [ageGroups, setAgeGroups] = useState(training.age_groups);
  const [additionalInformation, setAdditionalInformation] = useState(
    training.additional_information ?? ""
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/training-information", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: training.id,
          training_days: trainingDays,
          training_time: trainingTime,
          venue,
          age_groups: ageGroups,
          additional_information: additionalInformation,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to update training information."
        );
      }

      setMessage("Training information updated successfully.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update training information."
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
          htmlFor="trainingDays"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Training Days
        </label>

        <input
          id="trainingDays"
          type="text"
          value={trainingDays}
          onChange={(event) => setTrainingDays(event.target.value)}
          required
          placeholder="Example: Monday - Saturday"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label
          htmlFor="trainingTime"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Training Time
        </label>

        <input
          id="trainingTime"
          type="text"
          value={trainingTime}
          onChange={(event) => setTrainingTime(event.target.value)}
          required
          placeholder="Example: 4:00 PM - 6:00 PM"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label
          htmlFor="venue"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Training Venue
        </label>

        <input
          id="venue"
          type="text"
          value={venue}
          onChange={(event) => setVenue(event.target.value)}
          required
          placeholder="Example: Mwangaza Primary"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label
          htmlFor="ageGroups"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Age Groups
        </label>

        <input
          id="ageGroups"
          type="text"
          value={ageGroups}
          onChange={(event) => setAgeGroups(event.target.value)}
          required
          placeholder="Example: U7, U9, U11, U13, U15, U17 & Senior Team"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label
          htmlFor="additionalInformation"
          className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950"
        >
          Additional Information
        </label>

        <textarea
          id="additionalInformation"
          value={additionalInformation}
          onChange={(event) => setAdditionalInformation(event.target.value)}
          rows={5}
          placeholder="Add any additional information about training..."
          className="w-full resize-y rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-2xl bg-blue-950 px-7 py-4 font-black uppercase tracking-wider text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Training Information"}
      </button>
    </form>
  );
}