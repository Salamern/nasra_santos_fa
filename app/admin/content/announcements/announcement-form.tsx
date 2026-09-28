"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AnnouncementForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("General");
  const [status, setStatus] = useState("Published");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!title.trim() || !message.trim()) {
      setErrorMessage("Please enter both a title and announcement message.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          message,
          type,
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not create announcement.");
      }

      setTitle("");
      setMessage("");
      setType("General");
      setStatus("Published");

      setSuccessMessage("Announcement created successfully.");

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the announcement."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      {/* Success Message */}
      {successMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Title */}
      <div>
        <label
          htmlFor="announcement-title"
          className="mb-2 block text-sm font-black uppercase text-blue-950"
        >
          Announcement Title
        </label>

        <input
          id="announcement-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Example: Training Programme Update"
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="announcement-message"
          className="mb-2 block text-sm font-black uppercase text-blue-950"
        >
          Announcement Message
        </label>

        <textarea
          id="announcement-message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write the announcement here..."
          required
          className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      {/* Type and Status */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="announcement-type"
            className="mb-2 block text-sm font-black uppercase text-blue-950"
          >
            Announcement Type
          </label>

          <select
            id="announcement-type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          >
            <option value="General">General</option>
            <option value="Training">Training</option>
            <option value="Match">Match</option>
            <option value="Parents">Parents</option>
            <option value="Trials">Trials</option>
            <option value="Important Notice">Important Notice</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="announcement-status"
            className="mb-2 block text-sm font-black uppercase text-blue-950"
          >
            Status
          </label>

          <select
            id="announcement-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-blue-950 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950 disabled:cursor-not-allowed disabled:bg-slate-400 md:w-auto"
      >
        {isSubmitting ? "Publishing..." : "Publish Announcement"}
      </button>
    </form>
  );
}