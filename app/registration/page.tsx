"use client";

import { useState } from "react";
import Link from "next/link";

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
};

export default function RegistrationPage() {
  const [agreed, setAgreed] = useState(false);
  const [mpesaCode, setMpesaCode] = useState("");
  const [codeAttached, setCodeAttached] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dob: "",
    gender: "",
    nationality: "Kenyan",
    category: "",
    position: "",
    address: "",
    phone: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    allergies: "",
    medicalConditions: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttachCode = () => {
    const cleanedCode = mpesaCode.trim().toUpperCase();

    if (cleanedCode.length < 8) {
      alert("Please enter a valid M-Pesa transaction code.");
      return;
    }

    setMpesaCode(cleanedCode);
    setCodeAttached(true);

    alert(
      "M-Pesa transaction code attached. The academy will verify the payment after registration."
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!codeAttached) {
      alert(
        "Please enter and attach your M-Pesa transaction code before submitting."
      );
      return;
    }

    if (!agreed) {
      alert(
        "Please agree to the Parental Consent & Terms before submitting."
      );
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetRegistration = () => {
    setSubmitted(false);
    setAgreed(false);
    setMpesaCode("");
    setCodeAttached(false);

    setFormData({
      fullName: "",
      dob: "",
      gender: "",
      nationality: "Kenyan",
      category: "",
      position: "",
      address: "",
      phone: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
      allergies: "",
      medicalConditions: "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 print:bg-white">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-blue-950 px-6 py-20 text-white print:hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/10" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-sky-400/10" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-400">
            Player Registration
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase md:text-6xl">
            Join The
            <span className="block text-sky-400">Gardeners</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Complete the official Nasra Santos Football Academy registration
            form to begin your football journey with us.
          </p>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3 text-xs font-bold">
            <span className="rounded-full bg-white/10 px-5 py-3">
              Nairobi, Kenya
            </span>

            <span className="rounded-full bg-white/10 px-5 py-3">
              U7 – Senior
            </span>

            <span className="rounded-full bg-white/10 px-5 py-3">
              Official Academy Registration
            </span>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <section className="mx-auto max-w-5xl px-5 py-14 md:px-6 md:py-20">

        {submitted ? (

          /* ================================================= */
          /* RECEIPT */
          /* ================================================= */

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-12 print:border-none print:p-0 print:shadow-none">

            <div className="border-b border-slate-200 pb-8 text-center">
              <div className="mb-5 inline-flex rounded-full bg-amber-100 px-5 py-2 text-xs font-black uppercase tracking-wider text-amber-800">
                Pending Academy Verification
              </div>

              <h1 className="text-3xl font-black uppercase text-blue-950 md:text-4xl">
                Registration Received
              </h1>

              <p className="mt-3 text-slate-600">
                Nasra Santos Football Academy
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-6">
              <p className="font-black text-blue-950">
                Thank you, {formData.fullName}.
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Your registration form has been completed on this device.
                Your M-Pesa transaction reference is awaiting verification by
                Nasra Santos Football Academy.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              {/* PLAYER */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                  Player Information
                </p>

                <div className="mt-5 space-y-3 text-sm">
                  <p>
                    <strong>Name:</strong>{" "}
                    {formData.fullName || "N/A"}
                  </p>

                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {formData.dob || "N/A"}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {formData.category || "N/A"}
                  </p>

                  <p>
                    <strong>Position:</strong>{" "}
                    {formData.position || "N/A"}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {formData.phone || "N/A"}
                  </p>
                </div>
              </div>

              {/* PAYMENT */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                  Payment Information
                </p>

                <div className="mt-5 space-y-3 text-sm">
                  <p>
                    <strong>Expected Amount:</strong>{" "}
                    <span className="font-black text-emerald-700">
                      Ksh {TOTAL_FEE.toLocaleString()}
                    </span>
                  </p>

                  <p>
                    <strong>M-Pesa Reference:</strong>{" "}
                    <span className="font-mono font-black text-blue-950">
                      {mpesaCode}
                    </span>
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="font-black text-amber-600">
                      Pending Verification
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* NEXT STEPS */}

            <div className="mt-8 rounded-2xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-black uppercase text-blue-950">
                What Happens Next?
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-blue-950">1.</strong> Academy
                  management will check the submitted M-Pesa transaction
                  reference.
                </p>

                <p>
                  <strong className="text-blue-950">2.</strong> The payment
                  will be confirmed against the academy payment records.
                </p>

                <p>
                  <strong className="text-blue-950">3.</strong> After
                  approval, the academy will contact the player or
                  parent/guardian with further instructions.
                </p>

                <p>
                  <strong className="text-blue-950">4.</strong> Any required
                  physical registration items can then be submitted to the
                  academy.
                </p>
              </div>
            </div>

            {/* IMPORTANT CURRENT LIMITATION */}

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900 print:hidden">
              <strong>Important:</strong> Online database submission is not
              active yet. For now, please print or save this receipt and
              contact the academy to complete verification.
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-blue-950 px-8 py-4 text-sm font-black uppercase text-white transition hover:bg-sky-400 hover:text-blue-950"
              >
                Print / Save Receipt
              </button>

              <Link
                href="/"
                className="rounded-full border-2 border-blue-950 px-8 py-4 text-sm font-black uppercase text-blue-950 transition hover:bg-blue-950 hover:text-white"
              >
                Return Home
              </Link>

              <button
                type="button"
                onClick={resetRegistration}
                className="rounded-full border-2 border-slate-300 px-8 py-4 text-sm font-black uppercase text-slate-600 transition hover:bg-slate-100"
              >
                New Registration
              </button>
            </div>
          </div>

        ) : (

          /* ================================================= */
          /* FORM */
          /* ================================================= */

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* INTRO */}

            <div className="text-center">
              <p className="font-black uppercase tracking-widest text-sky-500">
                Official Registration Form
              </p>

              <h2 className="mt-3 text-3xl font-black uppercase text-blue-950 md:text-4xl">
                Player Application
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                Please complete all required information carefully before
                submitting your registration.
              </p>
            </div>

            {/* ================================================= */}
            {/* COST */}
            {/* ================================================= */}

            <div className="overflow-hidden rounded-3xl border border-sky-200 bg-sky-50">

              <div className="bg-blue-950 px-7 py-5 text-white">
                <p className="text-xs font-black uppercase tracking-widest text-sky-300">
                  Registration Requirements
                </p>

                <h2 className="mt-1 text-xl font-black uppercase">
                  Initial Registration Cost
                </h2>
              </div>

              <div className="space-y-5 p-7 md:p-9">

                <div className="flex justify-between gap-5 border-b border-sky-200 pb-4">
                  <div>
                    <p className="font-black text-blue-950">
                      Registration Fee
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Academy registration
                    </p>
                  </div>

                  <p className="font-black text-blue-950">
                    Ksh 500
                  </p>
                </div>

                <div className="flex justify-between gap-5 border-b border-sky-200 pb-4">
                  <div>
                    <p className="font-black text-blue-950">
                      Two Full Kits
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Yellow kit + luminous kit
                    </p>
                  </div>

                  <p className="font-black text-blue-950">
                    Ksh 3,000
                  </p>
                </div>

                <div className="flex justify-between gap-5 border-b border-sky-200 pb-4">
                  <div>
                    <p className="font-black text-blue-950">
                      First Month Training Fee
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      First month academy training
                    </p>
                  </div>

                  <p className="font-black text-blue-950">
                    Ksh 3,000
                  </p>
                </div>

                <div className="flex justify-between gap-5">
                  <div>
                    <p className="font-black text-blue-950">
                      Football
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      One football to be submitted physically
                    </p>
                  </div>

                  <p className="text-right text-sm font-bold text-slate-500">
                    Physical Item
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-black uppercase text-blue-950">
                    Total Payable
                  </p>

                  <p className="text-2xl font-black text-emerald-600">
                    Ksh {TOTAL_FEE.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* PLAYER DETAILS */}
            {/* ================================================= */}

            <FormSection
              number="01"
              title="Player Information"
              description="Tell us about the player joining the academy."
            >
              <div className="grid gap-6 md:grid-cols-2">

                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full name of player"
                  required
                />

                <InputField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />

                <SelectField
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  options={[
                    ["", "Select Gender"],
                    ["Male", "Male"],
                    ["Female", "Female"],
                  ]}
                />

                <InputField
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                />

                <SelectField
                  label="Category / Age Group"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  options={[
                    ["", "Select Category"],
                    ["U7", "U7 (Under 7)"],
                    ["U9", "U9 (Under 9)"],
                    ["U11", "U11 (Under 11)"],
                    ["U13", "U13 (Under 13)"],
                    ["U15", "U15 (Under 15)"],
                    ["U17", "U17 (Under 17)"],
                    ["Senior", "Senior Team"],
                  ]}
                />

                <SelectField
                  label="Preferred Position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  options={[
                    ["", "Select Position"],
                    ["Goalkeeper", "Goalkeeper (GK)"],
                    ["Defender", "Defender (CB / LB / RB)"],
                    ["Midfielder", "Midfielder (CM / CDM / CAM)"],
                    ["Forward", "Forward / Winger (ST / LW / RW)"],
                    ["Utility", "Flexible / Any Position"],
                  ]}
                />

                <InputField
                  label="Home Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. Nasra Estate, Nairobi"
                  required
                />

                <InputField
                  label="Player / Parent Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="07XXXXXXXX"
                  required
                />
              </div>
            </FormSection>

            {/* ================================================= */}
            {/* EMERGENCY CONTACT */}
            {/* ================================================= */}

            <FormSection
              number="02"
              title="Emergency Contact"
              description="Provide the person we should contact in case of an emergency."
            >
              <div className="grid gap-6 md:grid-cols-3">

                <InputField
                  label="Contact Name"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  required
                />

                <InputField
                  label="Relationship"
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleInputChange}
                  placeholder="Parent / Guardian"
                  required
                />

                <InputField
                  label="Phone Number"
                  name="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  placeholder="07XXXXXXXX"
                  required
                />
              </div>
            </FormSection>

            {/* ================================================= */}
            {/* MEDICAL */}
            {/* ================================================= */}

            <FormSection
              number="03"
              title="Medical Information"
              description="Provide information that may help academy staff respond appropriately during training or matches."
            >
              <div className="grid gap-6 md:grid-cols-2">

                <TextAreaField
                  label="Allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="Enter known allergies or write None"
                />

                <TextAreaField
                  label="Medical Conditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  placeholder="Enter relevant medical information or write None"
                />
              </div>
            </FormSection>

            {/* ================================================= */}
            {/* PAYMENT */}
            {/* ================================================= */}

            <div className="overflow-hidden rounded-3xl border-2 border-emerald-200 bg-emerald-50">

              <div className="flex flex-col gap-4 bg-emerald-700 px-7 py-6 text-white sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-100">
                    Step 04
                  </p>

                  <h2 className="mt-1 text-xl font-black uppercase">
                    M-Pesa Payment
                  </h2>
                </div>

                <span
                  className={`self-start rounded-full px-4 py-2 text-xs font-black uppercase ${
                    codeAttached
                      ? "bg-white text-emerald-700"
                      : "bg-emerald-900 text-white"
                  }`}
                >
                  {codeAttached
                    ? "Code Attached"
                    : "Payment Required"}
                </span>
              </div>

              <div className="space-y-7 p-7 md:p-9">

                <div>
                  <p className="font-black text-emerald-950">
                    Pay Ksh {TOTAL_FEE.toLocaleString()} via M-Pesa
                  </p>

                  <p className="mt-2 text-sm leading-7 text-emerald-900/80">
                    Complete the payment first, then enter the transaction
                    code from the M-Pesa confirmation message.
                  </p>
                </div>

                {/* PAYMENT NUMBER */}

                <div className="rounded-2xl border border-emerald-200 bg-white p-6 text-center">

                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Send Money To
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-wide text-blue-950">
                    {PAYMENT_NUMBER}
                  </p>

                  <p className="mt-2 text-sm font-bold text-emerald-700">
                    Amount: Ksh {TOTAL_FEE.toLocaleString()}
                  </p>
                </div>

                {/* INSTRUCTIONS */}

                <div className="rounded-2xl bg-white p-6">
                  <p className="font-black uppercase text-blue-950">
                    Payment Instructions
                  </p>

                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
                    <li>Open M-Pesa on your phone.</li>
                    <li>
                      Select <strong>Send Money</strong>.
                    </li>
                    <li>
                      Enter <strong>{PAYMENT_NUMBER}</strong>.
                    </li>
                    <li>
                      Enter{" "}
                      <strong>
                        Ksh {TOTAL_FEE.toLocaleString()}
                      </strong>.
                    </li>
                    <li>Complete the transaction using your M-Pesa PIN.</li>
                    <li>
                      Copy the transaction code from the confirmation message.
                    </li>
                  </ol>
                </div>

                {/* MPESA CODE */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-emerald-950">
                    M-Pesa Transaction Code *
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">

                    <input
                      type="text"
                      value={mpesaCode}
                      onChange={(e) => {
                        setMpesaCode(e.target.value.toUpperCase());

                        if (codeAttached) {
                          setCodeAttached(false);
                        }
                      }}
                      disabled={codeAttached}
                      placeholder="Enter transaction code"
                      className="min-w-0 flex-1 rounded-xl border border-emerald-300 bg-white px-4 py-4 font-mono text-sm uppercase outline-none transition focus:border-emerald-600 disabled:bg-slate-100"
                    />

                    {!codeAttached ? (
                      <button
                        type="button"
                        onClick={handleAttachCode}
                        className="rounded-xl bg-emerald-700 px-7 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-emerald-800"
                      >
                        Attach Code
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCodeAttached(false)}
                        className="rounded-xl bg-slate-200 px-7 py-4 text-xs font-black uppercase tracking-wider text-slate-700 transition hover:bg-slate-300"
                      >
                        Edit Code
                      </button>
                    )}
                  </div>

                  {codeAttached && (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-4">
                      <p className="text-sm font-bold text-emerald-700">
                        ✓ Transaction code {mpesaCode} attached.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        This does not confirm payment. Academy management
                        will verify the transaction before approving the
                        registration.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* CONSENT */}
            {/* ================================================= */}

            <FormSection
              number="05"
              title="Consent & Declaration"
              description="Please read the declaration carefully before submitting."
            >
              <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                By submitting this form, I confirm that the information
                provided is accurate. As the parent/guardian of an applicant
                under 18, or as an adult applicant, I give permission to
                participate in Nasra Santos Football Academy activities. I
                understand that football involves physical activity and agree
                to follow academy rules and the Code of Conduct. I authorize
                academy staff to seek appropriate emergency assistance when
                reasonably necessary.
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-sky-300">

                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-5 w-5 flex-shrink-0"
                />

                <span className="text-sm font-semibold leading-6 text-slate-700">
                  I have read and agree to the registration declaration,
                  parental consent requirements, academy rules and Code of
                  Conduct. *
                </span>
              </label>
            </FormSection>

            {/* ================================================= */}
            {/* SUBMIT */}
            {/* ================================================= */}

            <div className="rounded-3xl bg-blue-950 p-7 text-center text-white md:p-10">

              <h2 className="text-2xl font-black uppercase">
                Ready To Join The Gardeners?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Review your information carefully before submitting.
                Registration remains pending until academy management
                verifies the payment and application.
              </p>

              <button
                type="submit"
                disabled={!codeAttached || !agreed}
                className={`mt-7 w-full rounded-full px-8 py-4 font-black uppercase tracking-wider transition sm:w-auto ${
                  codeAttached && agreed
                    ? "bg-sky-400 text-blue-950 hover:bg-white"
                    : "cursor-not-allowed bg-slate-700 text-slate-400"
                }`}
              >
                {!codeAttached
                  ? "Attach M-Pesa Code First"
                  : !agreed
                  ? "Accept Consent To Continue"
                  : "Submit Registration"}
              </button>

              <p className="mt-4 text-xs text-slate-400">
                Submission does not automatically confirm academy admission.
              </p>
            </div>

          </form>
        )}
      </section>

      {/* ================================================= */}
      {/* CONTACT */}
      {/* ================================================= */}

      {!submitted && (
        <section className="bg-slate-50 px-6 py-14 text-center print:hidden">
          <p className="text-sm font-black uppercase tracking-widest text-sky-500">
            Need Help?
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            Contact Nasra Santos FA
          </h2>

          <p className="mt-4 text-slate-600">
            For registration assistance, contact the academy on{" "}
            <strong>{PAYMENT_NUMBER}</strong>.
          </p>

          <Link
            href="/#contact"
            className="mt-6 inline-block rounded-full border-2 border-blue-950 px-7 py-3 text-sm font-black uppercase text-blue-950 transition hover:bg-blue-950 hover:text-white"
          >
            Contact Us
          </Link>
        </section>
      )}
    </main>
  );
}

/* ================================================= */
/* REUSABLE FORM SECTION */
/* ================================================= */

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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">

      <div className="mb-8 flex items-start gap-4 border-b border-slate-200 pb-6">

        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-950 text-sm font-black text-sky-300">
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
    </div>
  );
}

/* ================================================= */
/* INPUT */
/* ================================================= */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
        {label} {required && "*"}
      </label>

      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}

/* ================================================= */
/* SELECT */
/* ================================================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[][];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
        {label} {required && "*"}
      </label>

      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      >
        {options.map(([value, label]) => (
          <option key={`${name}-${value}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ================================================= */
/* TEXTAREA */
/* ================================================= */

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}