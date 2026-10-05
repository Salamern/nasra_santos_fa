"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type RegistrationInformation = {
  id: number;
  registration_fee: number;
  yellow_kit_fee: number;
  luminous_kit_fee: number;
  monthly_training_fee: number;
  payment_method: string;
  till_number: string | null;
  equipment_requirement: string | null;
  payment_instructions: string | null;
};

export default function RegistrationInformationForm({
  registration,
}: {
  registration: RegistrationInformation;
}) {
  const router = useRouter();

  const [registrationFee, setRegistrationFee] = useState(
    registration.registration_fee.toString()
  );

  const [yellowKitFee, setYellowKitFee] = useState(
    registration.yellow_kit_fee.toString()
  );

  const [luminousKitFee, setLuminousKitFee] = useState(
    registration.luminous_kit_fee.toString()
  );

  const [monthlyTrainingFee, setMonthlyTrainingFee] = useState(
    registration.monthly_training_fee.toString()
  );

  const [paymentMethod, setPaymentMethod] = useState(
    registration.payment_method || "Buy Goods and Services"
  );

  const [tillNumber, setTillNumber] = useState(
    registration.till_number ?? ""
  );

  const [equipmentRequirement, setEquipmentRequirement] = useState(
    registration.equipment_requirement ?? ""
  );

  const [paymentInstructions, setPaymentInstructions] = useState(
    registration.payment_instructions ?? ""
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const totalAmount =
    Number(registrationFee || 0) +
    Number(yellowKitFee || 0) +
    Number(luminousKitFee || 0) +
    Number(monthlyTrainingFee || 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/registration-information", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: registration.id,
          registration_fee: Number(registrationFee),
          yellow_kit_fee: Number(yellowKitFee),
          luminous_kit_fee: Number(luminousKitFee),
          monthly_training_fee: Number(monthlyTrainingFee),
          payment_method: paymentMethod,
          till_number: tillNumber,
          equipment_requirement: equipmentRequirement,
          payment_instructions: paymentInstructions,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to update registration information."
        );
      }

      setMessage("Registration information updated successfully.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update registration information."
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

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950">
            Registration Fee — KSh
          </label>

          <input
            type="number"
            min="0"
            value={registrationFee}
            onChange={(event) => setRegistrationFee(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950">
            Yellow Kit — KSh
          </label>

          <input
            type="number"
            min="0"
            value={yellowKitFee}
            onChange={(event) => setYellowKitFee(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950">
            Luminous Kit — KSh
          </label>

          <input
            type="number"
            min="0"
            value={luminousKitFee}
            onChange={(event) => setLuminousKitFee(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950">
            First Month Training Fee — KSh
          </label>

          <input
            type="number"
            min="0"
            value={monthlyTrainingFee}
            onChange={(event) => setMonthlyTrainingFee(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
        <p className="text-sm font-black uppercase tracking-wider text-sky-700">
          Registration Total
        </p>

        <p className="mt-2 text-3xl font-black text-blue-950">
          KSh {totalAmount.toLocaleString()}
        </p>

        <p className="mt-2 text-sm text-slate-600">
          The total is calculated automatically from the four fees above.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950">
            Payment Method
          </label>

          <input
            type="text"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950">
            Buy Goods Till Number
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={tillNumber}
            onChange={(event) => setTillNumber(event.target.value)}
            required
            placeholder="Example: 1780718"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-black uppercase tracking-wider text-emerald-800">
          Current Payment Details
        </p>

        <p className="mt-3 text-sm text-emerald-800">
          Payment Method
        </p>

        <p className="font-black text-blue-950">
          {paymentMethod || "Buy Goods and Services"}
        </p>

        <p className="mt-3 text-sm text-emerald-800">
          Till Number
        </p>

        <p className="text-2xl font-black text-blue-950">
          {tillNumber || "Not set"}
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950">
          Equipment Requirement
        </label>

        <textarea
          value={equipmentRequirement}
          onChange={(event) => setEquipmentRequirement(event.target.value)}
          rows={3}
          placeholder="Example: One football to be submitted physically"
          className="w-full resize-y rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-black uppercase tracking-wider text-blue-950">
          Payment Instructions
        </label>

        <textarea
          value={paymentInstructions}
          onChange={(event) => setPaymentInstructions(event.target.value)}
          rows={6}
          placeholder="Enter the Buy Goods payment instructions shown to parents..."
          className="w-full resize-y rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-2xl bg-blue-950 px-7 py-4 font-black uppercase tracking-wider text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Registration Information"}
      </button>
    </form>
  );
}