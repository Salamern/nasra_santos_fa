import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import LogoutButton from "./logout-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createAdminClient();

  // Registration statistics
  const { data: registrationData, error: registrationError } = await supabase
    .from("registrations")
    .select("status");

  const registrations = registrationData ?? [];

  const total = registrations.length;

  const pending = registrations.filter(
    (registration) =>
      !registration.status ||
      registration.status.toLowerCase() === "pending"
  ).length;

  const approved = registrations.filter(
    (registration) => registration.status?.toLowerCase() === "approved"
  ).length;

  const rejected = registrations.filter(
    (registration) => registration.status?.toLowerCase() === "rejected"
  ).length;

  // M-Pesa payment statistics
  const { data: paymentData, error: paymentError } = await supabase
    .from("registration_payments")
    .select("status, amount_expected, amount_paid");

  const payments = paymentData ?? [];

  const totalPayments = payments.length;

  const paidPayments = payments.filter(
    (payment) => payment.status?.toLowerCase() === "paid"
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status?.toLowerCase() === "pending"
  ).length;

  const academyPaymentValue = paidPayments.reduce(
    (totalAmount, payment) =>
      totalAmount + Number(payment.amount_expected ?? 0),
    0
  );

  const sandboxAmountPaid = paidPayments.reduce(
    (totalAmount, payment) =>
      totalAmount + Number(payment.amount_paid ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-lg md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-400">
                Nasra Santos FA
              </p>

              <h1 className="mt-3 text-3xl font-black uppercase md:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Manage academy registrations, M-Pesa payments, fixtures,
                results and website information from one place.
              </p>
            </div>

            <LogoutButton />
          </div>

          <Link
            href="/"
            className="mt-7 inline-block rounded-full border border-sky-400 px-6 py-3 text-sm font-black uppercase text-sky-300 transition hover:bg-sky-400 hover:text-blue-950"
          >
            ← Back To Website
          </Link>
        </div>

        {/* Database Error */}
        {(registrationError || paymentError) && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700">
            Some dashboard statistics could not be loaded. Please refresh the
            page or check the database connection.
          </div>
        )}

        {/* Registration Statistics */}
        <section className="mt-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
            Registration Overview
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            Applications
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total" value={total} />
            <StatCard title="Pending" value={pending} />
            <StatCard title="Approved" value={approved} />
            <StatCard title="Rejected" value={rejected} />
          </div>
        </section>

        {/* Payment Statistics */}
        <section className="mt-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">
            M-Pesa Overview
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            Registration Payments
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PaymentStatCard
              title="Payment Records"
              value={totalPayments.toString()}
            />

            <PaymentStatCard
              title="Paid"
              value={paidPayments.length.toString()}
            />

            <PaymentStatCard
              title="Pending"
              value={pendingPayments.toString()}
            />

            <PaymentStatCard
              title="Academy Value"
              value={`KSh ${academyPaymentValue.toLocaleString("en-KE")}`}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-black uppercase tracking-wider text-blue-800">
              Daraja Sandbox
            </p>

            <p className="mt-1 text-sm text-blue-900">
              Successful academy payment value:{" "}
              <span className="font-black">
                KSh {academyPaymentValue.toLocaleString("en-KE")}
              </span>
              {" · "}
              Actual sandbox amount processed:{" "}
              <span className="font-black">
                KSh {sandboxAmountPaid.toLocaleString("en-KE")}
              </span>
            </p>
          </div>
        </section>

        {/* Management Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Registrations */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
              📝
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-blue-950">
              Registrations
            </h2>

            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
              Review player applications, player information and manage
              registration approval status.
            </p>

            <div className="mt-6 rounded-2xl bg-sky-50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-sky-700">
                {pending} Pending
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {total} total application{total === 1 ? "" : "s"}
              </p>
            </div>

            <Link
              href="/admin/registrations"
              className="mt-5 block rounded-xl bg-blue-950 px-5 py-3 text-center text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
            >
              Manage Registrations
            </Link>
          </div>

          {/* M-Pesa Payments */}
          <div className="rounded-3xl border border-emerald-200 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl">
              💳
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-blue-950">
              M-Pesa Payments
            </h2>

            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
              Review registration payment attempts, successful M-Pesa
              confirmations, receipts and transaction information.
            </p>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                {paidPayments.length} Paid
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {totalPayments} total payment{" "}
                {totalPayments === 1 ? "record" : "records"}
              </p>
            </div>

            <Link
              href="/admin/payments"
              className="mt-5 block rounded-xl bg-blue-950 px-5 py-3 text-center text-sm font-black uppercase tracking-wider text-white transition hover:bg-emerald-400 hover:text-blue-950"
            >
              Manage M-Pesa Payments
            </Link>
          </div>

          {/* Fixtures */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
              ⚽
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-blue-950">
              Fixtures & Results
            </h2>

            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
              Add upcoming matches and update results that appear on the public
              website.
            </p>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                System Active
              </p>

              <p className="mt-1 text-sm text-slate-700">
                Manage fixtures and match results
              </p>
            </div>

            <Link
              href="/admin/fixtures"
              className="mt-5 block rounded-xl bg-blue-950 px-5 py-3 text-center text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
            >
              Manage Fixtures & Results
            </Link>
          </div>

          {/* Website Content */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
              🌐
            </div>

            <h2 className="mt-5 text-xl font-black uppercase text-blue-950">
              Website Content
            </h2>

            <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
              Manage academy information, contact details, training
              information, social media and registration settings.
            </p>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                System Active
              </p>

              <p className="mt-1 text-sm text-slate-700">
                Website content management
              </p>
            </div>

            <Link
              href="/admin/content"
              className="mt-5 block rounded-xl bg-blue-950 px-5 py-3 text-center text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950"
            >
              Manage Website Content
            </Link>
          </div>
        </div>

        {/* Development Progress */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
          <p className="text-xs font-black uppercase tracking-widest text-sky-500">
            Admin Development
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
            Development Progress
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <ProgressCard number="01" title="Secure Admin Login" complete />

            <ProgressCard
              number="02"
              title="Registration Database"
              complete
            />

            <ProgressCard
              number="03"
              title="Registration Management"
              complete
            />

            <ProgressCard
              number="04"
              title="Fixtures & Content"
              complete
            />

            <ProgressCard
              number="05"
              title="M-Pesa Payments"
              complete
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-4xl font-black text-blue-950">{value}</p>
    </div>
  );
}

function PaymentStatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-black text-blue-950">{value}</p>
    </div>
  );
}

function ProgressCard({
  number,
  title,
  complete = false,
}: {
  number: string;
  title: string;
  complete?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        complete
          ? "border border-emerald-200 bg-emerald-50"
          : "bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`font-black ${
            complete ? "text-emerald-600" : "text-sky-500"
          }`}
        >
          {number}
        </p>

        {complete && (
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-black uppercase text-emerald-700">
            ✓ Done
          </span>
        )}
      </div>

      <p className="mt-2 text-sm font-black text-blue-950">{title}</p>
    </div>
  );
}