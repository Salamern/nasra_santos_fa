import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type Payment = {
  id: string;
  registration_id: string | null;
  player_name: string | null;
  phone_number: string | null;
  payment_items: string[] | null;
  registration_fee: number | null;
  yellow_kit_fee: number | null;
  luminous_kit_fee: number | null;
  monthly_training_fee: number | null;
  amount_expected: number | null;
  amount_paid: number | null;
  status: string | null;
  mpesa_receipt_number: string | null;
  result_code: number | null;
  result_description: string | null;
  transaction_date: string | null;
  created_at: string | null;
};

function formatMoney(value: number | null | undefined) {
  return `KSh ${Number(value ?? 0).toLocaleString("en-KE")}`;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Nairobi",
  }).format(date);
}

function formatItem(item: string) {
  switch (item) {
    case "registration_fee":
      return "Registration Fee";

    case "yellow_kit":
      return "Yellow Kit";

    case "luminous_kit":
      return "Luminous Kit";

    case "monthly_training":
      return "Monthly Training";

    default:
      return item
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }
}

function statusClasses(status: string | null) {
  switch (status) {
    case "Paid":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";

    case "Pending":
      return "bg-amber-100 text-amber-800 border-amber-200";

    case "Failed":
      return "bg-red-100 text-red-800 border-red-200";

    case "Cancelled":
      return "bg-slate-200 text-slate-700 border-slate-300";

    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default async function AdminPaymentsPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("registration_payments")
    .select(
      `
        id,
        registration_id,
        player_name,
        phone_number,
        payment_items,
        registration_fee,
        yellow_kit_fee,
        luminous_kit_fee,
        monthly_training_fee,
        amount_expected,
        amount_paid,
        status,
        mpesa_receipt_number,
        result_code,
        result_description,
        transaction_date,
        created_at
      `
    )
    .order("created_at", { ascending: false });

  const payments = (data ?? []) as Payment[];

  const totalPayments = payments.length;

  const paidPayments = payments.filter(
    (payment) => payment.status === "Paid"
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  );

  const failedPayments = payments.filter(
    (payment) =>
      payment.status === "Failed" || payment.status === "Cancelled"
  );

  const academyAmountConfirmed = paidPayments.reduce(
    (total, payment) => total + Number(payment.amount_expected ?? 0),
    0
  );

  const actualMpesaReceived = paidPayments.reduce(
    (total, payment) => total + Number(payment.amount_paid ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-br from-blue-950 via-blue-900 to-sky-700 text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-sky-300">
                Nasra Santos FA
              </p>

              <h1 className="text-3xl font-black sm:text-4xl">
                Registration Payments
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                View M-Pesa registration payments, payment status, academy
                amounts, receipts and transaction details.
              </p>
            </div>

            <Link
              href="/admin"
              className="inline-flex w-fit items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              ← Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        {error ? (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
            <p className="font-bold">Unable to load payments.</p>

            <p className="mt-1 text-sm">
              Please check the registration_payments table and try again.
            </p>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Payment Records
            </p>

            <p className="mt-2 text-3xl font-black text-slate-950">
              {totalPayments}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">Paid</p>

            <p className="mt-2 text-3xl font-black text-emerald-900">
              {paidPayments.length}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-amber-700">Pending</p>

            <p className="mt-2 text-3xl font-black text-amber-900">
              {pendingPayments.length}
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-red-700">
              Failed / Cancelled
            </p>

            <p className="mt-2 text-3xl font-black text-red-900">
              {failedPayments.length}
            </p>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-sky-700">
              Academy Value
            </p>

            <p className="mt-2 text-2xl font-black text-blue-950">
              {formatMoney(academyAmountConfirmed)}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-bold text-blue-950">
            M-Pesa Environment Notice
          </p>

          <p className="mt-2 text-sm leading-6 text-blue-900">
            While the website is using Safaricom Daraja Sandbox, the academy
            amount can be KSh 6,500 while the actual M-Pesa test amount received
            is KSh 1. Do not treat the sandbox amount as real academy income.
          </p>

          <p className="mt-3 text-sm font-bold text-blue-950">
            Confirmed sandbox M-Pesa amount:{" "}
            {formatMoney(actualMpesaReceived)}
          </p>
        </div>

        <div className="mt-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Payment History
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Newest payment attempts appear first.
              </p>
            </div>

            <p className="text-sm font-semibold text-slate-500">
              {totalPayments}{" "}
              {totalPayments === 1 ? "record" : "records"}
            </p>
          </div>

          {payments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-lg font-black text-slate-900">
                No payment records yet
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Registration M-Pesa payments will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {payments.map((payment) => {
                const items = Array.isArray(payment.payment_items)
                  ? payment.payment_items
                  : [];

                return (
                  <article
                    key={payment.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-black text-slate-950">
                          {payment.player_name || "Unknown Player"}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Payment ID: {payment.id}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${statusClasses(
                          payment.status
                        )}`}
                      >
                        {payment.status || "Unknown"}
                      </span>
                    </div>

                    <div className="grid gap-6 p-5 md:grid-cols-2 xl:grid-cols-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Payment
                        </p>

                        <div className="mt-3 space-y-2 text-sm">
                          <p>
                            <span className="font-semibold text-slate-500">
                              Academy amount:
                            </span>{" "}
                            <span className="font-black text-slate-900">
                              {formatMoney(payment.amount_expected)}
                            </span>
                          </p>

                          <p>
                            <span className="font-semibold text-slate-500">
                              M-Pesa amount:
                            </span>{" "}
                            <span className="font-black text-slate-900">
                              {formatMoney(payment.amount_paid)}
                            </span>
                          </p>

                          <p>
                            <span className="font-semibold text-slate-500">
                              Receipt:
                            </span>{" "}
                            <span className="font-black text-slate-900">
                              {payment.mpesa_receipt_number || "—"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Player / Registration
                        </p>

                        <div className="mt-3 space-y-2 text-sm">
                          <p>
                            <span className="font-semibold text-slate-500">
                              Phone:
                            </span>{" "}
                            <span className="text-slate-900">
                              {payment.phone_number || "—"}
                            </span>
                          </p>

                          <p className="break-all">
                            <span className="font-semibold text-slate-500">
                              Registration ID:
                            </span>{" "}
                            <span className="text-slate-900">
                              {payment.registration_id || "—"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Items
                        </p>

                        {items.length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {items.map((item) => (
                              <span
                                key={item}
                                className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800"
                              >
                                {formatItem(item)}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-3 text-sm text-slate-500">
                            No items recorded.
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Transaction
                        </p>

                        <div className="mt-3 space-y-2 text-sm">
                          <p>
                            <span className="font-semibold text-slate-500">
                              Transaction date:
                            </span>{" "}
                            <span className="text-slate-900">
                              {formatDate(payment.transaction_date)}
                            </span>
                          </p>

                          <p>
                            <span className="font-semibold text-slate-500">
                              Attempt created:
                            </span>{" "}
                            <span className="text-slate-900">
                              {formatDate(payment.created_at)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {(payment.status === "Failed" ||
                      payment.status === "Cancelled") &&
                    payment.result_description ? (
                      <div className="border-t border-red-100 bg-red-50 px-5 py-4">
                        <p className="text-sm text-red-800">
                          <span className="font-black">M-Pesa response:</span>{" "}
                          {payment.result_description}
                        </p>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}