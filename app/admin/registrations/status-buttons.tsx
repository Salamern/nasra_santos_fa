"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  registrationId: string;
  currentStatus: string;
};

export default function StatusButtons({
  registrationId,
  currentStatus,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function updateStatus(status: "Pending" | "Approved" | "Rejected") {
    const confirmed = window.confirm(
      `Change this registration to ${status}?`
    );

    if (!confirmed) {
      return;
    }

    setLoading(status);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/registrations/${registrationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Could not update registration."
        );
      }

      setMessage(`Registration changed to ${status}.`);

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating the registration."
      );
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500">
        Manage Application
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => updateStatus("Approved")}
          disabled={loading !== null || currentStatus === "Approved"}
          className="rounded-xl bg-emerald-600 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading === "Approved" ? "Updating..." : "Approve"}
        </button>

        <button
          type="button"
          onClick={() => updateStatus("Rejected")}
          disabled={loading !== null || currentStatus === "Rejected"}
          className="rounded-xl bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading === "Rejected" ? "Updating..." : "Reject"}
        </button>

        <button
          type="button"
          onClick={() => updateStatus("Pending")}
          disabled={loading !== null || currentStatus === "Pending"}
          className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading === "Pending" ? "Updating..." : "Set Pending"}
        </button>
      </div>

      {message && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-3">
          <p className="text-sm font-bold text-emerald-700">
            ✓ {message}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-3">
          <p className="text-sm font-bold text-red-700">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}