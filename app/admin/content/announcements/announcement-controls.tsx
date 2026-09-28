"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AnnouncementControlsProps = {
  announcement: {
    id: string;
    title: string;
    message: string;
    type: string;
    status: string;
  };
};

export default function AnnouncementControls({
  announcement,
}: AnnouncementControlsProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [title, setTitle] = useState(announcement.title);
  const [message, setMessage] = useState(announcement.message);
  const [type, setType] = useState(announcement.type);
  const [status, setStatus] = useState(announcement.status);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function cancelEditing() {
    setTitle(announcement.title);
    setMessage(announcement.message);
    setType(announcement.type);
    setStatus(announcement.status);
    setSuccessMessage("");
    setErrorMessage("");
    setIsEditing(false);
  }

  async function handleSave() {
    setSuccessMessage("");
    setErrorMessage("");

    if (!title.trim() || !message.trim()) {
      setErrorMessage("Title and announcement message are required.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch(
        `/api/announcements/${announcement.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            message,
            type,
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not update announcement.");
      }

      setSuccessMessage("Announcement updated successfully.");
      setIsEditing(false);

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the announcement."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${announcement.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");

    try {
      setIsDeleting(true);

      const response = await fetch(
        `/api/announcements/${announcement.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not delete announcement.");
      }

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the announcement."
      );

      setIsDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <div className="mt-5 rounded-2xl border border-sky-200 bg-white p-5">
        <p className="text-xs font-black uppercase tracking-widest text-sky-600">
          Edit Announcement
        </p>

        {successMessage && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-black uppercase text-blue-950">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase text-blue-950">
              Message
            </label>

            <textarea
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black uppercase text-blue-950">
                Type
              </label>

              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
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
              <label className="mb-2 block text-xs font-black uppercase text-blue-950">
                Status
              </label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-xl bg-blue-950 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={cancelEditing}
            disabled={isSaving}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      {successMessage && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setErrorMessage("");
            setSuccessMessage("");
            setIsEditing(true);
          }}
          disabled={isDeleting}
          className="rounded-xl bg-blue-950 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="rounded-xl border border-red-300 bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}