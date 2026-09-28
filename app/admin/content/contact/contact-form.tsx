"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ContactInformation = {
  id: number;
  phone: string;
  email: string;
  location: string;
  city_country: string;
};

export default function ContactForm({
  contact,
}: {
  contact: ContactInformation;
}) {
  const router = useRouter();

  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [location, setLocation] = useState(contact.location);
  const [cityCountry, setCityCountry] = useState(contact.city_country);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/contact-information", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: contact.id,
          phone,
          email,
          location,
          city_country: cityCountry,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to update contact information."
        );
      }

      setMessage("Contact information updated successfully.");

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update contact information."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-black uppercase tracking-wide text-blue-950"
          >
            Phone Number
          </label>

          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-400"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-black uppercase tracking-wide text-blue-950"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-400"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-black uppercase tracking-wide text-blue-950"
          >
            Location
          </label>

          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-400"
          />
        </div>

        <div>
          <label
            htmlFor="cityCountry"
            className="mb-2 block text-sm font-black uppercase tracking-wide text-blue-950"
          >
            City / Country
          </label>

          <input
            id="cityCountry"
            type="text"
            value={cityCountry}
            onChange={(event) => setCityCountry(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-400"
          />
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-bold text-emerald-700">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-7 rounded-2xl bg-blue-950 px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving Changes..." : "Save Contact Information"}
      </button>
    </form>
  );
}