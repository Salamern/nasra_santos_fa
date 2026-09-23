"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const TOTAL_FEE = 6500;
const PAYMENT_NUMBER = "0746360438";

type FormData = {
  fullName: string;
  dob: string;
  gender: string;
  nationality: string;
  category: string;
  position: string;
  address: string;
  phone: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  allergies: string;
  medicalConditions: string;
  mpesaCode: string;
};

const initialFormData: FormData = {
  fullName: "",
  dob: "",
  gender: "",
  nationality: "",
  category: "",
  position: "",
  address: "",
  phone: "",
  emergencyName: "",
  emergencyRelation: "",
  emergencyPhone: "",
  allergies: "",
  medicalConditions: "",
  mpesaCode: "",
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  function updateField(field: keyof FormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to submit registration. Please try again."
        );
      }

      setRegistrationId(result.registration?.id || "");
      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to submit registration. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function startNewRegistration() {
    setFormData(initialFormData);
    setRegistrationId("");
    setError("");
    setSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="bg-blue-950 px-5 py-16 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-4xl">
              ✓
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-sky-400">
              Nasra Santos Football Academy
            </p>

            <h1 className="mt-3 text-3xl font-black uppercase md:text-5xl">
              Registration Submitted
            </h1>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
              Your player registration has been received successfully and is
              awaiting review by the academy.
            </p>
          </div>
        </section>

        <section className="px-5 py-12">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-7 shadow-sm md:p-10">
            <div className="border-b border-slate-200 pb-6">
              <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                Registration Receipt
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
                {formData.fullName}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Keep this page for your records.
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <ReceiptItem label="Player" value={formData.fullName} />
              <ReceiptItem label="Category" value={formData.category} />
              <ReceiptItem label="Position" value={formData.position} />
              <ReceiptItem label="Phone" value={formData.phone} />
              <ReceiptItem
                label="M-Pesa Code"
                value={formData.mpesaCode || "Not provided"}
              />
              <ReceiptItem
                label="Payment Status"
                value="Pending Verification"
              />
            </div>

            {registrationId && (
              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Registration Reference
                </p>

                <p className="mt-2 break-all text-sm font-bold text-blue-950">
                  {registrationId}
                </p>
              </div>
            )}

            <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-black text-amber-900">
                Payment verification is pending.
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                Providing an M-Pesa transaction code does not automatically
                confirm payment. Nasra Santos Football Academy will verify the
                payment before updating the registration status.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl bg-blue-950 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
              >
                Print Receipt
              </button>

              <button
                type="button"
                onClick={startNewRegistration}
                className="rounded-xl border border-slate-300 px-6 py-4 text-sm font-black uppercase tracking-wider text-blue-950 transition hover:bg-slate-100"
              >
                New Registration
              </button>

              <Link
                href="/"
                className="rounded-xl border border-slate-300 px-6 py-4 text-center text-sm font-black uppercase tracking-wider text-blue-950 transition hover:bg-slate-100"
              >
                Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-blue-950 px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-400">
            Join The Gardeners
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase md:text-6xl">
            Player Registration
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            Register your player with Nasra Santos Football Academy and begin
            the journey of development, discipline and opportunity.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl bg-white p-6 shadow-sm md:p-9"
          >
            <FormSection
              number="01"
              title="Player Information"
              description="Enter the player's personal and football information."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  type="text"
                  value={formData.fullName}
                  onChange={(value) => updateField("fullName", value)}
                  required
                />

                <InputField
                  label="Date of Birth"
                  type="date"
                  value={formData.dob}
                  onChange={(value) => updateField("dob", value)}
                  required
                />

                <SelectField
                  label="Gender"
                  value={formData.gender}
                  onChange={(value) => updateField("gender", value)}
                  options={["Male", "Female"]}
                  required
                />

                <InputField
                  label="Nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={(value) => updateField("nationality", value)}
                  required
                />

                <SelectField
                  label="Team Category"
                  value={formData.category}
                  onChange={(value) => updateField("category", value)}
                  options={[
                    "U7",
                    "U9",
                    "U11",
                    "U13",
                    "U15",
                    "U17",
                    "Senior Team",
                  ]}
                  required
                />

                <SelectField
                  label="Preferred Position"
                  value={formData.position}
                  onChange={(value) => updateField("position", value)}
                  options={[
                    "Goalkeeper",
                    "Defender",
                    "Midfielder",
                    "Forward",
                    "Not Sure",
                  ]}
                  required
                />

                <InputField
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(value) => updateField("phone", value)}
                  required
                />

                <InputField
                  label="Home Address / Area"
                  type="text"
                  value={formData.address}
                  onChange={(value) => updateField("address", value)}
                  required
                />
              </div>
            </FormSection>

            <FormSection
              number="02"
              title="Emergency Contact"
              description="Provide the details of a parent, guardian or emergency contact."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Emergency Contact Name"
                  type="text"
                  value={formData.emergencyName}
                  onChange={(value) => updateField("emergencyName", value)}
                  required
                />

                <InputField
                  label="Relationship to Player"
                  type="text"
                  value={formData.emergencyRelation}
                  onChange={(value) => updateField("emergencyRelation", value)}
                  required
                />

                <div className="md:col-span-2">
                  <InputField
                    label="Emergency Phone Number"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(value) => updateField("emergencyPhone", value)}
                    required
                  />
                </div>
              </div>
            </FormSection>

            <FormSection
              number="03"
              title="Medical Information"
              description="Help the academy understand any important medical information."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextAreaField
                  label="Allergies"
                  value={formData.allergies}
                  onChange={(value) => updateField("allergies", value)}
                  placeholder="Write none if there are no known allergies."
                />

                <TextAreaField
                  label="Medical Conditions"
                  value={formData.medicalConditions}
                  onChange={(value) =>
                    updateField("medicalConditions", value)
                  }
                  placeholder="Write none if there are no known conditions."
                />
              </div>
            </FormSection>

            <FormSection
              number="04"
              title="Payment Information"
              description="Enter the M-Pesa transaction code if payment has already been made."
            >
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-600">
                  Paybill / M-Pesa Number
                </p>

                <p className="mt-1 text-2xl font-black text-blue-950">
                  {PAYMENT_NUMBER}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Total registration package: Ksh {TOTAL_FEE.toLocaleString()}
                </p>
              </div>

              <div className="mt-5">
                <InputField
                  label="M-Pesa Transaction Code"
                  type="text"
                  value={formData.mpesaCode}
                  onChange={(value) =>
                    updateField("mpesaCode", value.toUpperCase())
                  }
                  placeholder="Example: ABC123XYZ"
                />

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  The transaction code will be submitted for verification. It
                  does not automatically confirm payment.
                </p>
              </div>
            </FormSection>

            <FormSection
              number="05"
              title="Consent"
              description="Please review before submitting the application."
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                By submitting this registration, you confirm that the
                information provided is accurate and that Nasra Santos Football
                Academy may use it for player registration, communication,
                safety and academy administration.
              </div>
            </FormSection>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-blue-950 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting Registration..." : "Submit Registration"}
            </button>
          </form>

          {/* Registration Information */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-blue-950 p-7 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-sky-400">
                Registration Package
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Ksh {TOTAL_FEE.toLocaleString()}
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <FeeRow label="Registration Fee" amount="Ksh 500" />
                <FeeRow label="Two Academy Kits" amount="Ksh 3,000" />
                <FeeRow label="First Month Training" amount="Ksh 3,000" />
              </div>

              <div className="mt-6 border-t border-blue-800 pt-5">
                <p className="text-sm leading-6 text-slate-300">
                  The package also includes one football for the player.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                Payment
              </p>

              <h3 className="mt-2 text-xl font-black uppercase text-blue-950">
                M-Pesa
              </h3>

              <p className="mt-4 text-sm text-slate-500">
                Payment Number
              </p>

              <p className="mt-1 text-2xl font-black text-blue-950">
                {PAYMENT_NUMBER}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Keep your M-Pesa confirmation message. Academy management will
                verify payment before marking it as confirmed.
              </p>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-sky-50 p-7">
              <p className="text-xs font-black uppercase tracking-widest text-sky-600">
                Need Help?
              </p>

              <h3 className="mt-2 text-xl font-black text-blue-950">
                Contact Nasra Santos FA
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                For registration assistance, contact the academy on:
              </p>

              <p className="mt-3 font-black text-blue-950">0746360438</p>

              <p className="mt-1 break-all text-sm font-semibold text-blue-950">
                nasrasantosfootballacademy@gmail.com
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6 flex gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-black text-blue-950">
          {number}
        </div>

        <div>
          <h2 className="text-xl font-black uppercase text-blue-950">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}

function FeeRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-300">{label}</span>
      <span className="font-black">{amount}</span>
    </div>
  );
}

function ReceiptItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-bold text-blue-950">{value}</p>
    </div>
  );
}