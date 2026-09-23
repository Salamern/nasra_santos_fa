"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function FixtureForm() {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setMessage("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      match_date: formData.get("match_date"),
      kickoff_time: formData.get("kickoff_time"),
      competition: formData.get("competition"),
      venue: formData.get("venue"),
      home_team: formData.get("home_team"),
      away_team: formData.get("away_team"),
      match_status: formData.get("match_status"),
      home_score: formData.get("home_score"),
      away_score: formData.get("away_score"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/fixtures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Could not create fixture.");
        return;
      }

      setMessage("Fixture added successfully.");
      form.reset();

      router.refresh();
    } catch (error) {
      console.error("Fixture form error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
          Match Management
        </p>

        <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
          Add New Fixture
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Add an upcoming match to the Nasra Santos FA fixtures database.
          Kickoff time and venue can be left empty if they have not yet been
          confirmed.
        </p>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-bold text-emerald-700">{message}</p>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-bold text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Match Date" required>
            <input
              type="date"
              name="match_date"
              required
              className={inputClasses}
            />
          </Field>

          <Field label="Kickoff Time">
            <input
              type="time"
              name="kickoff_time"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Home Team" required>
            <input
              type="text"
              name="home_team"
              required
              placeholder="Example: Nasra Santos FA"
              className={inputClasses}
            />
          </Field>

          <Field label="Away Team" required>
            <input
              type="text"
              name="away_team"
              required
              placeholder="Example: Dandora Rangers"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Competition">
            <input
              type="text"
              name="competition"
              defaultValue="Match"
              placeholder="Example: FKF County League"
              className={inputClasses}
            />
          </Field>

          <Field label="Venue">
            <input
              type="text"
              name="venue"
              placeholder="Leave empty if TBA"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Match Status">
            <select
              name="match_status"
              defaultValue="Upcoming"
              className={inputClasses}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Postponed">Postponed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Home Score">
            <input
              type="number"
              name="home_score"
              min="0"
              step="1"
              placeholder="Only needed for completed matches"
              className={inputClasses}
            />
          </Field>

          <Field label="Away Score">
            <input
              type="number"
              name="away_score"
              min="0"
              step="1"
              placeholder="Only needed for completed matches"
              className={inputClasses}
            />
          </Field>
        </div>

        <Field label="Notes">
          <textarea
            name="notes"
            rows={4}
            placeholder="Optional match notes"
            className={`${inputClasses} resize-none`}
          />
        </Field>

        <div className="rounded-2xl bg-sky-50 p-4">
          <p className="text-sm leading-6 text-sky-900">
            <span className="font-black">Tip:</span> For a normal future
            fixture, leave the status as{" "}
            <span className="font-black">Upcoming</span> and leave both score
            fields empty.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-blue-950 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950 disabled:cursor-not-allowed disabled:bg-slate-400 md:w-auto"
        >
          {submitting ? "Adding Fixture..." : "Add Fixture"}
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-blue-950">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100";