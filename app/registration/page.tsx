"use client";

import React, { useState } from "react";

export default function RegistrationPage() {
  const [agreed, setAgreed] = useState(false);
  const [mpesaCode, setMpesaCode] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manual M-Pesa Code Verification
  const handleVerifyCode = () => {
    const cleanedCode = mpesaCode.trim().toUpperCase();
    if (cleanedCode.length < 8) {
      alert("Please enter a valid M-Pesa transaction code (e.g. QX82319402)");
      return;
    }
    setMpesaCode(cleanedCode);
    setIsPaid(true);
    alert("M-Pesa Transaction Code " + cleanedCode + " captured successfully!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPaid) {
      alert("Payment is compulsory! Please enter and verify your M-Pesa transaction code before submitting.");
      return;
    }

    if (!agreed) {
      alert("Please agree to the Parental Consent & Terms before submitting.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 scroll-smooth print:bg-white print:p-0">
      {/* Navigation Bar - Hidden on print */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Nasra Santos Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-blue-950 tracking-tight leading-none">
                NASRA SANTOS
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-sky-500 mt-0.5">
                Football Academy
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700">
            <a href="/" className="hover:text-blue-950 transition">Home</a>
            <a href="/about" className="hover:text-blue-950 transition">About</a>
            <a href="/teams" className="hover:text-blue-950 transition">Teams</a>
            <a href="/#fixtures" className="hover:text-blue-950 transition">Fixtures & Results</a>
            <a href="/registration" className="text-blue-950 font-bold underline decoration-sky-400 decoration-2">Register</a>
            <a href="/#contact" className="hover:text-blue-950 transition">Contact</a>
          </div>

          <a
            href="/registration"
            className="rounded-full bg-blue-950 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-900 transition shadow-md"
          >
            REGISTER NOW
          </a>
        </div>
      </nav>

      {/* Header Banner with Clean, Larger Logo */}
      <section className="bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white px-6 py-12 print:hidden">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-center md:justify-start gap-8">
          
          {/* Prominent Academy Logo */}
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl">
            <img
              src="/logo.png"
              alt="Nasra Santos Football Academy Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain filter drop-shadow-lg"
            />
          </div>

          {/* Banner Text Details */}
          <div className="text-center md:text-left space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              Official Academy Form
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none">
              Nasra Santos Football Academy
            </h1>
            <p className="text-xs md:text-sm text-sky-100 font-medium pt-1">
              📍 Nasra Garden Estate, Gate D, Checkmate Plaza, 1st Floor, Opposite Aster Point Hospital, Kayole Spine Road, Nairobi, Kenya
            </p>
            <p className="text-xs text-sky-300 font-medium">
              📞 +254 745 342 961 | +254 746 360 438 &nbsp;|&nbsp; ✉️ nasrasantosfootballacademy@gmail.com
            </p>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        {submitted ? (
          /* Official Submission Receipt */
          <div className="bg-slate-50 border-2 border-slate-200 p-8 md:p-12 rounded-3xl shadow-sm text-slate-800 space-y-8 print:p-0 print:border-none print:shadow-none">
            <div className="text-center border-b border-slate-200 pb-6">
              <div className="inline-block bg-emerald-100 text-emerald-800 font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Registration Received & Pending Admin Approval
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-blue-950">
                OFFICIAL REGISTRATION RECEIPT
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Nasra Santos Football Academy • Nairobi, Kenya
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 text-sm">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Player Details
                </p>
                <p><strong>Name:</strong> {formData.fullName || "N/A"}</p>
                <p><strong>Category:</strong> {formData.category || "N/A"}</p>
                <p><strong>Position:</strong> {formData.position || "N/A"}</p>
                <p><strong>Phone:</strong> {formData.phone || "N/A"}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Payment Details
                </p>
                <p><strong>Amount Paid:</strong> <span className="text-emerald-600 font-bold">Ksh 6,500</span></p>
                <p><strong>M-Pesa Reference:</strong> <span className="font-mono font-bold text-blue-950">{mpesaCode}</span></p>
                <p><strong>Breakdown:</strong> Reg Fee (Ksh 500) + 2 Kits (Ksh 3,000) + 1st Month Fee (Ksh 3,000)</p>
                <p><strong>Approval Status:</strong> <span className="text-amber-600 font-bold">Pending Admin Verification</span></p>
              </div>
            </div>

            <div className="bg-sky-50 border border-sky-200 p-6 rounded-2xl text-xs leading-relaxed text-slate-700">
              <p className="font-bold text-blue-950 mb-1">📌 What Happens Next?</p>
              <p>
                1. Your payment reference <strong>{mpesaCode}</strong> has been logged into our system.
              </p>
              <p>
                2. Our academy administration team will verify the M-Pesa transaction against mobile number <strong>0746360438</strong>.
              </p>
              <p>
                3. Upon verification and admin approval, you will receive an official SMS/WhatsApp confirmation to collect your kit and begin training.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-blue-950 px-8 py-3 text-sm font-bold text-white hover:bg-blue-900 transition shadow-md"
              >
                Print / Save Receipt
              </button>
              <a
                href="/"
                className="rounded-full border border-slate-300 px-8 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Return to Home
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Registration Requirements Banner */}
            <div className="bg-slate-50 border-2 border-sky-200 p-6 md:p-8 rounded-3xl shadow-sm">
              <h2 className="text-lg font-black text-blue-950 mb-4 uppercase tracking-wider flex items-center gap-2">
                📌 Registration Requirements & Cost Breakdown
              </h2>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-950">1.</span>
                  <span><strong>Registration Fee:</strong> Ksh 500</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-950">2.</span>
                  <span>
                    <strong>Purchase of two pairs of full kits:</strong> Yellow kit (Ksh 1,500) + Luminous kit (Ksh 1,500) = <strong>Ksh 3,000</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-950">3.</span>
                  <span><strong>First Month Training Fee:</strong> Ksh 3,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-950">4.</span>
                  <span><strong>Equipment:</strong> One football (to be submitted physically at registration)</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-sky-200 flex justify-between items-center">
                <span className="font-black text-blue-950 text-base">Total Initial Payable Amount:</span>
                <span className="font-black text-emerald-600 text-xl md:text-2xl">Ksh 6,500</span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm space-y-6">
              <h2 className="text-xl font-black text-blue-950 border-b border-slate-200 pb-3 uppercase tracking-wider">
                Personal Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name of Player"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleInputChange}
                    placeholder="e.g. Kenyan"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Category & Preferred Position */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Category (Age Group) *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="">Select Category</option>
                    <option value="U7">U7 (Under 7)</option>
                    <option value="U9">U9 (Under 9)</option>
                    <option value="U11">U11 (Under 11)</option>
                    <option value="U13">U13 (Under 13)</option>
                    <option value="U15">U15 (Under 15)</option>
                    <option value="U17">U17 (Under 17)</option>
                    <option value="Seniors">Seniors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Preferred Position *
                  </label>
                  <select
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="">Select Position</option>
                    <option value="Goalkeeper">Goalkeeper (GK)</option>
                    <option value="Defender">Defender (CB / LB / RB)</option>
                    <option value="Midfielder">Midfielder (CM / CDM / CAM)</option>
                    <option value="Forward">Forward / Winger (ST / LW / RW)</option>
                    <option value="Utility">Flexible / Any Position</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. Nasra Estate, Nairobi"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="07XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm space-y-6">
              <h2 className="text-xl font-black text-blue-950 border-b border-slate-200 pb-3 uppercase tracking-wider">
                Emergency Contact Information
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    name="emergencyName"
                    required
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Relation *
                  </label>
                  <input
                    type="text"
                    name="emergencyRelation"
                    required
                    value={formData.emergencyRelation}
                    onChange={handleInputChange}
                    placeholder="e.g. Parent, Guardian"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Emergency Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    required
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="07XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* MANDATORY M-PESA PAYMENT SECTION */}
            <div className="bg-emerald-50 border-2 border-emerald-300 p-8 md:p-10 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-4">
                <div>
                  <h2 className="text-xl font-black text-emerald-950 uppercase tracking-wider">
                    💳 Mandatory M-Pesa Payment
                  </h2>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Total Amount to Send: <strong className="text-emerald-900 font-bold">Ksh 6,500</strong>
                  </p>
                </div>
                <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {isPaid ? "✓ CODE VERIFIED" : "Payment Required"}
                </div>
              </div>

              {/* M-Pesa Payment Steps */}
              <div className="bg-white p-6 rounded-2xl border border-emerald-200 space-y-4">
                <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                  <p className="font-bold text-blue-950 text-sm">
                    How to Complete Payment:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 font-medium text-slate-800">
                    <li>Go to M-Pesa on your phone.</li>
                    <li>Select <strong>Send Money</strong>.</li>
                    <li>Enter Mobile Number: <strong className="text-blue-950 bg-amber-100 px-2 py-0.5 rounded">0746360438</strong></li>
                    <li>Enter Amount: <strong className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Ksh 6,500</strong></li>
                    <li>Enter your M-Pesa PIN and press send.</li>
                    <li>Enter the received 10-character M-Pesa Transaction Code below.</li>
                  </ol>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Enter M-Pesa Transaction Code *
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                      placeholder="e.g. QX82319402"
                      disabled={isPaid}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm uppercase font-mono focus:outline-none focus:border-emerald-500 disabled:bg-slate-100 disabled:text-slate-500"
                    />
                    {!isPaid ? (
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition"
                      >
                        Verify Code
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsPaid(false)}
                        className="bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-300 transition"
                      >
                        Edit Code
                      </button>
                    )}
                  </div>
                </div>

                {isPaid && (
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-2">
                    ✓ Transaction Code <span className="font-mono">{mpesaCode}</span> attached successfully.
                  </p>
                )}
              </div>
            </div>

            {/* Combined Parental Consent & Declaration */}
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm space-y-4">
              <h2 className="text-xl font-black text-blue-950 border-b border-slate-200 pb-3 uppercase tracking-wider">
                Parental Consent & Terms Agreement
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                By submitting this form, I (Parent/Guardian for applicants under 18 or Adult Applicant) grant permission to participate in Nasra Santos Football Academy activities. I assume all inherent risks of participation and authorize academy staff to seek emergency medical treatment if necessary. I agree to abide by the academy’s Code of Conduct and rules, and permit the use of photographs or video for academy promotional purposes.
              </p>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-950 focus:ring-sky-500"
                  />
                  <span className="text-xs md:text-sm font-semibold text-slate-800 leading-snug">
                    I have read, understood, and agree to the Parental Consent, Release of Liability, Code of Conduct, and Academy Rules & Regulations. *
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isPaid}
              className={`w-full py-4 rounded-2xl font-black text-base transition shadow-lg tracking-wider ${
                isPaid
                  ? "bg-blue-950 text-white hover:bg-blue-900 cursor-pointer"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              {isPaid ? "SUBMIT REGISTRATION FORM" : "VERIFY M-PESA CODE TO SUBMIT"}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-6 py-6 text-center text-xs text-slate-400 print:hidden">
        © 2026 Nasra Santos Football Academy. All rights reserved.
      </footer>
    </main>
  );
}