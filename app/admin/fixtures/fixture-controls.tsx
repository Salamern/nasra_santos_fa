"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Fixture = {
  id: string;
  match_date: string;
  kickoff_time: string | null;
  competition: string;
  venue: string | null;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  match_status: string;
  notes: string | null;
};

export default function FixtureControls({
  fixture,
}: {
  fixture: Fixture;
}) {
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    match_date: fixture.match_date,
    kickoff_time: fixture.kickoff_time ?? "",
    home_team: fixture.home_team,
    away_team: fixture.away_team,
    competition: fixture.competition ?? "",
    venue: fixture.venue ?? "",
    match_status: fixture.match_status,
    home_score:
      fixture.home_score === null ? "" : String(fixture.home_score),
    away_score:
      fixture.away_score === null ? "" : String(fixture.away_score),
    notes: fixture.notes ?? "",
  });

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveFixture() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/fixtures/${fixture.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            match_date: form.match_date,
            kickoff_time: form.kickoff_time,
            home_team: form.home_team,
            away_team: form.away_team,
            competition: form.competition,
            venue: form.venue,
            match_status: form.match_status,
            home_score:
              form.home_score === ""
                ? null
                : Number(form.home_score),
            away_score:
              form.away_score === ""
                ? null
                : Number(form.away_score),
            notes: form.notes,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Could not update fixture."
        );
      }

      setMessage("Fixture updated successfully.");
      setEditing(false);

      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not update fixture."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteFixture() {
    const confirmed = window.confirm(
      `Delete ${fixture.home_team} vs ${fixture.away_team}? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/fixtures/${fixture.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Could not delete fixture."
        );
      }

      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not delete fixture."
      );

      setDeleting(false);
    }
  }

  function cancelEditing() {
    setForm({
      match_date: fixture.match_date,
      kickoff_time: fixture.kickoff_time ?? "",
      home_team: fixture.home_team,
      away_team: fixture.away_team,
      competition: fixture.competition ?? "",
      venue: fixture.venue ?? "",
      match_status: fixture.match_status,
      home_score:
        fixture.home_score === null
          ? ""
          : String(fixture.home_score),
      away_score:
        fixture.away_score === null
          ? ""
          : String(fixture.away_score),
      notes: fixture.notes ?? "",
    });

    setMessage("");
    setEditing(false);
  }

  if (!editing) {
    return (
      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-full bg-blue-950 px-5 py-2.5 text-xs font-black uppercase text-white transition hover:bg-sky-500 hover:text-blue-950"
          >
            Edit Match
          </button>

          <button
            type="button"
            onClick={deleteFixture}
            disabled={deleting}
            className="rounded-full border border-red-300 bg-red-50 px-5 py-2.5 text-xs font-black uppercase text-red-700 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        {message && (
          <p className="mt-3 text-sm font-bold text-slate-600">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-slate-200 pt-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600">
        Edit Match
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Match Date">
          <input
            type="date"
            value={form.match_date}
            onChange={(event) =>
              updateField("match_date", event.target.value)
            }
            className={inputClasses}
          />
        </Field>

        <Field label="Kickoff Time">
          <input
            type="time"
            value={form.kickoff_time}
            onChange={(event) =>
              updateField("kickoff_time", event.target.value)
            }
            className={inputClasses}
          />
        </Field>

        <Field label="Home Team">
          <input
            type="text"
            value={form.home_team}
            onChange={(event) =>
              updateField("home_team", event.target.value)
            }
            className={inputClasses}
          />
        </Field>

        <Field label="Away Team">
          <input
            type="text"
            value={form.away_team}
            onChange={(event) =>
              updateField("away_team", event.target.value)
            }
            className={inputClasses}
          />
        </Field>

        <Field label="Competition">
          <input
            type="text"
            value={form.competition}
            onChange={(event) =>
              updateField("competition", event.target.value)
            }
            className={inputClasses}
          />
        </Field>

        <Field label="Venue">
          <input
            type="text"
            value={form.venue}
            onChange={(event) =>
              updateField("venue", event.target.value)
            }
            className={inputClasses}
          />
        </Field>

        <Field label="Match Status">
          <select
            value={form.match_status}
            onChange={(event) =>
              updateField("match_status", event.target.value)
            }
            className={inputClasses}
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Postponed">Postponed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </Field>

        <div />

        <Field label="Home Score">
          <input
            type="number"
            min="0"
            value={form.home_score}
            disabled={form.match_status !== "Completed"}
            onChange={(event) =>
              updateField("home_score", event.target.value)
            }
            placeholder="Required when completed"
            className={inputClasses}
          />
        </Field>

        <Field label="Away Score">
          <input
            type="number"
            min="0"
            value={form.away_score}
            disabled={form.match_status !== "Completed"}
            onChange={(event) =>
              updateField("away_score", event.target.value)
            }
            placeholder="Required when completed"
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Notes">
          <textarea
            value={form.notes}
            onChange={(event) =>
              updateField("notes", event.target.value)
            }
            rows={3}
            placeholder="Optional match notes"
            className={inputClasses}
          />
        </Field>
      </div>

      {form.match_status === "Completed" && (
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm font-bold text-emerald-800">
            Enter both final scores before saving a completed
            match.
          </p>
        </div>
      )}

      {message && (
        <div className="mt-4 rounded-2xl bg-amber-50 p-4">
          <p className="text-sm font-bold text-amber-800">
            {message}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={saveFixture}
          disabled={saving}
          className="rounded-full bg-emerald-600 px-6 py-3 text-xs font-black uppercase text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={cancelEditing}
          disabled={saving}
          className="rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-black uppercase text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600">
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";