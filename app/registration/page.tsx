"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

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
  total_fee: number;
};

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

type PaymentItem =
  | "registration_fee"
  | "yellow_kit"
  | "luminous_kit"
  | "monthly_training";

type PaymentStatus =
  | "Not Started"
  | "Pending"
  | "Paid"
  | "Failed"
  | "Cancelled";

type PaymentStatusResponse = {
  success: boolean;
  message?: string;
  payment?: {
    id: string;
    registrationId: string | null;
    playerName: string;
    items: PaymentItem[];
    amountExpected: number;
    amountPaid: number;
    status: PaymentStatus;
    mpesaReceiptNumber: string | null;
    resultCode: number | null;
    resultDescription: string | null;
    transactionDate: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
};

const initialFormData: FormData = {
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
  mpesaCode: "",
};

const allPaymentItems: PaymentItem[] = [
  "registration_fee",
  "yellow_kit",
  "luminous_kit",
  "monthly_training",
];

export default function RegistrationPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [registrationInfo, setRegistrationInfo] =
    useState<RegistrationInformation | null>(null);

  const [loadingInfo, setLoadingInfo] = useState(true);
  const [infoError, setInfoError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const [selectedItems, setSelectedItems] =
    useState<PaymentItem[]>(allPaymentItems);

  const [mpesaPhone, setMpesaPhone] = useState("");

  const [paymentId, setPaymentId] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState("");

  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("Not Started");

  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);

  const [mpesaReceiptNumber, setMpesaReceiptNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [transactionDate, setTransactionDate] = useState("");

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollCountRef = useRef(0);

  useEffect(() => {
    async function loadRegistrationInformation() {
      try {
        setLoadingInfo(true);
        setInfoError("");

        const response = await fetch("/api/registration-information", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Unable to load registration information."
          );
        }

        setRegistrationInfo(result.registration);
      } catch (error) {
        console.error("Registration information error:", error);

        setInfoError(
          error instanceof Error
            ? error.message
            : "Unable to load registration information."
        );
      } finally {
        setLoadingInfo(false);
      }
    }

    loadRegistrationInformation();
  }, []);

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  const totalFee = registrationInfo?.total_fee ?? 0;

  const kitsTotal =
    (registrationInfo?.yellow_kit_fee ?? 0) +
    (registrationInfo?.luminous_kit_fee ?? 0);

  const selectedAmount = useMemo(() => {
    if (!registrationInfo) {
      return 0;
    }

    let total = 0;

    if (selectedItems.includes("registration_fee")) {
      total += Number(registrationInfo.registration_fee);
    }

    if (selectedItems.includes("yellow_kit")) {
      total += Number(registrationInfo.yellow_kit_fee);
    }

    if (selectedItems.includes("luminous_kit")) {
      total += Number(registrationInfo.luminous_kit_fee);
    }

    if (selectedItems.includes("monthly_training")) {
      total += Number(registrationInfo.monthly_training_fee);
    }

    return total;
  }, [registrationInfo, selectedItems]);

  function updateField(field: keyof FormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function togglePaymentItem(item: PaymentItem) {
    if (
      paymentLoading ||
      paymentStatus === "Pending" ||
      paymentStatus === "Paid"
    ) {
      return;
    }

    setSelectedItems((previous) => {
      if (previous.includes(item)) {
        return previous.filter((currentItem) => currentItem !== item);
      }

      return [...previous, item];
    });
  }

  function selectAllPaymentItems() {
    if (
      paymentLoading ||
      paymentStatus === "Pending" ||
      paymentStatus === "Paid"
    ) {
      return;
    }

    setSelectedItems(allPaymentItems);
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

      const newRegistrationId = result.registration?.id || "";

      if (!newRegistrationId) {
        throw new Error(
          "Registration was received, but no registration reference was returned."
        );
      }

      setRegistrationId(newRegistrationId);
      setMpesaPhone(formData.phone);
      setSubmitted(true);

      setPaymentId("");
      setCheckoutRequestId("");
      setPaymentStatus("Not Started");
      setPaymentMessage("");
      setPaymentError("");
      setMpesaReceiptNumber("");
      setAmountPaid(0);
      setTransactionDate("");
      setSelectedItems(allPaymentItems);

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

  function stopPaymentPolling() {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }

  async function checkPaymentStatus(currentPaymentId?: string) {
    const idToCheck = currentPaymentId || paymentId;

    if (!idToCheck) {
      return;
    }

    try {
      setCheckingPayment(true);

      const response = await fetch(
        `/api/mpesa/payment-status/${encodeURIComponent(idToCheck)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result =
        (await response.json()) as PaymentStatusResponse;

      if (!response.ok || !result.success || !result.payment) {
        throw new Error(
          result.message || "Unable to check payment status."
        );
      }

      const payment = result.payment;

      setPaymentStatus(payment.status);
      setAmountPaid(payment.amountPaid || 0);
      setMpesaReceiptNumber(payment.mpesaReceiptNumber || "");
      setTransactionDate(payment.transactionDate || "");

      if (payment.status === "Paid") {
        stopPaymentPolling();

        setPaymentError("");
        setPaymentMessage(
          payment.resultDescription ||
            "M-Pesa payment confirmed successfully."
        );

        return;
      }

      if (payment.status === "Cancelled") {
        stopPaymentPolling();

        setPaymentMessage("");
        setPaymentError(
          payment.resultDescription ||
            "The M-Pesa payment was cancelled."
        );

        return;
      }

      if (payment.status === "Failed") {
        stopPaymentPolling();

        setPaymentMessage("");
        setPaymentError(
          payment.resultDescription ||
            "The M-Pesa payment was not completed."
        );

        return;
      }

      setPaymentStatus("Pending");
      setPaymentMessage(
        "Waiting for Safaricom to confirm the M-Pesa payment..."
      );
    } catch (error) {
      console.error("Payment status check error:", error);
    } finally {
      setCheckingPayment(false);
    }
  }

  function startPaymentPolling(currentPaymentId: string) {
    stopPaymentPolling();

    pollCountRef.current = 0;

    pollingRef.current = setInterval(() => {
      pollCountRef.current += 1;

      void checkPaymentStatus(currentPaymentId);

      if (pollCountRef.current >= 40) {
        stopPaymentPolling();

        setPaymentMessage(
          "The payment is taking longer than expected to confirm. You can use Check Payment Status below."
        );
      }
    }, 3000);
  }

  async function handleMpesaPayment() {
    if (!registrationId) {
      setPaymentError(
        "The registration reference is missing. Please submit the registration again."
      );
      return;
    }

    if (!mpesaPhone.trim()) {
      setPaymentError(
        "Enter the Safaricom phone number that should receive the M-Pesa prompt."
      );
      return;
    }

    if (selectedItems.length === 0) {
      setPaymentError("Select at least one payment item.");
      return;
    }

    if (paymentStatus === "Paid") {
      return;
    }

    setPaymentLoading(true);
    setPaymentError("");
    setPaymentMessage("");
    setMpesaReceiptNumber("");
    setAmountPaid(0);
    setTransactionDate("");

    try {
      const response = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationId,
          playerName: formData.fullName,
          phone: mpesaPhone,
          items: selectedItems,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to send the M-Pesa payment prompt."
        );
      }

      const newPaymentId = String(result.paymentId || "");
      const newCheckoutRequestId = String(
        result.checkoutRequestId || ""
      );

      if (!newPaymentId) {
        throw new Error(
          "M-Pesa accepted the request, but the payment reference is missing."
        );
      }

      setPaymentId(newPaymentId);
      setCheckoutRequestId(newCheckoutRequestId);
      setPaymentStatus("Pending");

      setPaymentMessage(
        "M-Pesa prompt sent. Check your phone, enter your M-Pesa PIN, then wait for automatic confirmation."
      );

      startPaymentPolling(newPaymentId);
    } catch (error) {
      setPaymentStatus("Failed");

      setPaymentError(
        error instanceof Error
          ? error.message
          : "Unable to initiate M-Pesa payment."
      );
    } finally {
      setPaymentLoading(false);
    }
  }

  function startNewRegistration() {
    stopPaymentPolling();

    setFormData(initialFormData);
    setRegistrationId("");
    setSubmitted(false);
    setError("");

    setSelectedItems(allPaymentItems);
    setMpesaPhone("");

    setPaymentId("");
    setCheckoutRequestId("");
    setPaymentStatus("Not Started");
    setPaymentMessage("");
    setPaymentError("");
    setPaymentLoading(false);
    setCheckingPayment(false);

    setMpesaReceiptNumber("");
    setAmountPaid(0);
    setTransactionDate("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (submitted) {
    const paymentConfirmed = paymentStatus === "Paid";

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
              The player registration has been received successfully.
              You can now complete the academy payment securely through
              M-Pesa.
            </p>
          </div>
        </section>

        <section className="px-5 py-12">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
              <div className="border-b border-slate-200 pb-6">
                <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                  Registration Details
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
                  {formData.fullName}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  The registration has been saved. Keep the registration
                  reference for your records.
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <ReceiptItem
                  label="Player"
                  value={formData.fullName}
                />

                <ReceiptItem
                  label="Category"
                  value={formData.category}
                />

                <ReceiptItem
                  label="Position"
                  value={formData.position}
                />

                <ReceiptItem
                  label="Contact Phone"
                  value={formData.phone}
                />

                <ReceiptItem
                  label="Registration Package"
                  value={`KSh ${totalFee.toLocaleString()}`}
                />

                <ReceiptItem
                  label="Registration Status"
                  value="Received"
                />
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Registration Reference
                </p>

                <p className="mt-2 break-all text-sm font-bold text-blue-950">
                  {registrationId}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                  M-Pesa Payment
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
                  Pay With M-Pesa
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Select the academy fees you want to pay, enter the
                  Safaricom number that should receive the prompt, then
                  click Pay with M-Pesa.
                </p>
              </div>

              {registrationInfo && (
                <>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <PaymentChoice
                      title="Registration Fee"
                      amount={registrationInfo.registration_fee}
                      checked={selectedItems.includes(
                        "registration_fee"
                      )}
                      disabled={
                        paymentLoading ||
                        paymentStatus === "Pending" ||
                        paymentStatus === "Paid"
                      }
                      onChange={() =>
                        togglePaymentItem("registration_fee")
                      }
                    />

                    <PaymentChoice
                      title="Yellow Academy Kit"
                      amount={registrationInfo.yellow_kit_fee}
                      checked={selectedItems.includes("yellow_kit")}
                      disabled={
                        paymentLoading ||
                        paymentStatus === "Pending" ||
                        paymentStatus === "Paid"
                      }
                      onChange={() =>
                        togglePaymentItem("yellow_kit")
                      }
                    />

                    <PaymentChoice
                      title="Luminous Academy Kit"
                      amount={registrationInfo.luminous_kit_fee}
                      checked={selectedItems.includes(
                        "luminous_kit"
                      )}
                      disabled={
                        paymentLoading ||
                        paymentStatus === "Pending" ||
                        paymentStatus === "Paid"
                      }
                      onChange={() =>
                        togglePaymentItem("luminous_kit")
                      }
                    />

                    <PaymentChoice
                      title="First Month Training"
                      amount={registrationInfo.monthly_training_fee}
                      checked={selectedItems.includes(
                        "monthly_training"
                      )}
                      disabled={
                        paymentLoading ||
                        paymentStatus === "Pending" ||
                        paymentStatus === "Paid"
                      }
                      onChange={() =>
                        togglePaymentItem("monthly_training")
                      }
                    />
                  </div>

                  <button
                    type="button"
                    onClick={selectAllPaymentItems}
                    disabled={
                      paymentLoading ||
                      paymentStatus === "Pending" ||
                      paymentStatus === "Paid"
                    }
                    className="mt-4 text-sm font-black text-sky-600 hover:text-blue-950 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Select Full Registration Package
                  </button>

                  <div className="mt-6 rounded-2xl bg-blue-950 p-6 text-white">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-sky-400">
                          Selected Academy Fees
                        </p>

                        <p className="mt-2 text-3xl font-black">
                          KSh {selectedAmount.toLocaleString()}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/10 px-4 py-3 text-sm">
                        {selectedItems.length} item
                        {selectedItems.length === 1 ? "" : "s"} selected
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="font-black text-amber-900">
                      Sandbox Testing
                    </p>

                    <p className="mt-2 text-sm leading-6 text-amber-800">
                      The academy amount above is recorded as the expected
                      payment. During the current Daraja sandbox test,
                      the M-Pesa prompt requests only KSh 1.
                    </p>
                  </div>
                </>
              )}

              <div className="mt-7">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  M-Pesa Phone Number
                </label>

                <input
                  type="tel"
                  value={mpesaPhone}
                  onChange={(event) =>
                    setMpesaPhone(event.target.value)
                  }
                  disabled={
                    paymentLoading ||
                    paymentStatus === "Pending" ||
                    paymentStatus === "Paid"
                  }
                  placeholder="Example: 0712345678"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-100"
                />

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Enter the Safaricom number that should receive the
                  M-Pesa PIN prompt.
                </p>
              </div>

              {paymentError && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                  <p className="font-black text-red-800">
                    Payment Not Completed
                  </p>

                  <p className="mt-2 text-sm leading-6 text-red-700">
                    {paymentError}
                  </p>
                </div>
              )}

              {paymentMessage && !paymentConfirmed && (
                <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
                  <p className="font-black text-blue-950">
                    {paymentStatus === "Pending"
                      ? "Waiting for M-Pesa"
                      : "Payment Update"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {paymentMessage}
                  </p>

                  {paymentStatus === "Pending" && (
                    <div className="mt-4 flex items-center gap-3 text-sm font-bold text-sky-700">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-sky-600 border-t-transparent" />
                      Checking payment automatically...
                    </div>
                  )}
                </div>
              )}

              {paymentConfirmed && (
                <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-xl font-black text-white">
                      ✓
                    </div>

                    <div>
                      <p className="text-lg font-black text-green-900">
                        Payment Confirmed
                      </p>

                      <p className="mt-1 text-sm leading-6 text-green-800">
                        Safaricom has confirmed the M-Pesa payment and
                        the academy payment record has been updated
                        automatically.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <PaymentDetail
                      label="Academy Amount"
                      value={`KSh ${selectedAmount.toLocaleString()}`}
                    />

                    <PaymentDetail
                      label="Sandbox Amount Paid"
                      value={`KSh ${amountPaid.toLocaleString()}`}
                    />

                    <PaymentDetail
                      label="M-Pesa Receipt"
                      value={
                        mpesaReceiptNumber || "Confirmed by Safaricom"
                      }
                    />

                    <PaymentDetail
                      label="Payment Status"
                      value="Paid"
                    />
                  </div>

                  {transactionDate && (
                    <p className="mt-4 text-xs text-green-700">
                      Transaction recorded:{" "}
                      {new Date(transactionDate).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {paymentId && (
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Payment Reference
                  </p>

                  <p className="mt-2 break-all text-sm font-bold text-blue-950">
                    {paymentId}
                  </p>

                  {checkoutRequestId && (
                    <>
                      <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-500">
                        M-Pesa Checkout Reference
                      </p>

                      <p className="mt-2 break-all text-sm font-semibold text-slate-700">
                        {checkoutRequestId}
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {paymentStatus !== "Paid" &&
                  paymentStatus !== "Pending" && (
                    <button
                      type="button"
                      onClick={handleMpesaPayment}
                      disabled={
                        paymentLoading ||
                        selectedItems.length === 0 ||
                        !mpesaPhone.trim()
                      }
                      className="rounded-xl bg-green-600 px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {paymentLoading
                        ? "Sending M-Pesa Prompt..."
                        : `Pay KSh ${selectedAmount.toLocaleString()} with M-Pesa`}
                    </button>
                  )}

                {paymentStatus === "Pending" && (
                  <button
                    type="button"
                    onClick={() => void checkPaymentStatus()}
                    disabled={checkingPayment}
                    className="rounded-xl bg-blue-950 px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {checkingPayment
                      ? "Checking..."
                      : "Check Payment Status"}
                  </button>
                )}
              </div>

              {paymentStatus === "Failed" ||
              paymentStatus === "Cancelled" ? (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentStatus("Not Started");
                      setPaymentId("");
                      setCheckoutRequestId("");
                      setPaymentError("");
                      setPaymentMessage("");
                    }}
                    className="text-sm font-black text-blue-950 underline decoration-sky-400 decoration-2 underline-offset-4"
                  >
                    Try another M-Pesa payment
                  </button>
                </div>
              ) : null}
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
              <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                Registration Receipt
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
                {paymentConfirmed
                  ? "Registration & Payment Receipt"
                  : "Registration Receipt"}
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <ReceiptItem
                  label="Player"
                  value={formData.fullName}
                />

                <ReceiptItem
                  label="Category"
                  value={formData.category}
                />

                <ReceiptItem
                  label="Position"
                  value={formData.position}
                />

                <ReceiptItem
                  label="Phone"
                  value={formData.phone}
                />

                <ReceiptItem
                  label="Payment Status"
                  value={
                    paymentConfirmed
                      ? "Paid"
                      : paymentStatus === "Not Started"
                        ? "Not Yet Paid"
                        : paymentStatus
                  }
                />

                {paymentConfirmed && (
                  <ReceiptItem
                    label="M-Pesa Receipt"
                    value={
                      mpesaReceiptNumber || "Confirmed by Safaricom"
                    }
                  />
                )}
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
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-blue-950 px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-400">
            Join The Gardeners
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase md:text-6xl">
            Player Registration
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            Register your player with Nasra Santos Football Academy and
            begin the journey of development, discipline and
            opportunity.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
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
                  onChange={(value) =>
                    updateField("fullName", value)
                  }
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
                  onChange={(value) =>
                    updateField("gender", value)
                  }
                  options={["Male", "Female"]}
                  required
                />

                <InputField
                  label="Nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={(value) =>
                    updateField("nationality", value)
                  }
                  required
                />

                <SelectField
                  label="Team Category"
                  value={formData.category}
                  onChange={(value) =>
                    updateField("category", value)
                  }
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
                  onChange={(value) =>
                    updateField("position", value)
                  }
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
                  onChange={(value) =>
                    updateField("phone", value)
                  }
                  required
                />

                <InputField
                  label="Home Address / Area"
                  type="text"
                  value={formData.address}
                  onChange={(value) =>
                    updateField("address", value)
                  }
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
                  onChange={(value) =>
                    updateField("emergencyName", value)
                  }
                  required
                />

                <InputField
                  label="Relationship to Player"
                  type="text"
                  value={formData.emergencyRelation}
                  onChange={(value) =>
                    updateField("emergencyRelation", value)
                  }
                  required
                />

                <div className="md:col-span-2">
                  <InputField
                    label="Emergency Phone Number"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(value) =>
                      updateField("emergencyPhone", value)
                    }
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
                  onChange={(value) =>
                    updateField("allergies", value)
                  }
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
              title="Registration & M-Pesa"
              description="Submit the player registration first. The secure M-Pesa payment screen will appear immediately afterwards."
            >
              {loadingInfo ? (
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="font-bold text-slate-600">
                    Loading registration information...
                  </p>
                </div>
              ) : infoError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                  <p className="font-bold text-red-700">
                    Registration payment information is temporarily
                    unavailable.
                  </p>

                  <p className="mt-2 text-sm text-red-600">
                    {infoError}
                  </p>
                </div>
              ) : registrationInfo ? (
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
                  <p className="font-black text-blue-950">
                    Registration Package: KSh{" "}
                    {totalFee.toLocaleString()}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    After submitting this form, choose the fees you want
                    to pay and enter the Safaricom number that should
                    receive the M-Pesa prompt.
                  </p>
                </div>
              ) : null}
            </FormSection>

            <FormSection
              number="05"
              title="Consent"
              description="Please review before submitting the application."
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                By submitting this registration, you confirm that the
                information provided is accurate and that Nasra Santos
                Football Academy may use it for player registration,
                communication, safety and academy administration.
              </div>
            </FormSection>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={
                submitting || loadingInfo || !registrationInfo
              }
              className="w-full rounded-xl bg-blue-950 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400 hover:text-blue-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Submitting Registration..."
                : "Submit Registration & Continue to M-Pesa"}
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-blue-950 p-7 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-sky-400">
                Registration Package
              </p>

              {loadingInfo ? (
                <p className="mt-3 text-sm text-slate-300">
                  Loading registration fees...
                </p>
              ) : registrationInfo ? (
                <>
                  <h2 className="mt-2 text-3xl font-black">
                    KSh {totalFee.toLocaleString()}
                  </h2>

                  <div className="mt-6 space-y-4 text-sm">
                    <FeeRow
                      label="Registration Fee"
                      amount={`KSh ${registrationInfo.registration_fee.toLocaleString()}`}
                    />

                    <FeeRow
                      label="Yellow Academy Kit"
                      amount={`KSh ${registrationInfo.yellow_kit_fee.toLocaleString()}`}
                    />

                    <FeeRow
                      label="Luminous Academy Kit"
                      amount={`KSh ${registrationInfo.luminous_kit_fee.toLocaleString()}`}
                    />

                    <FeeRow
                      label="Two Academy Kits"
                      amount={`KSh ${kitsTotal.toLocaleString()}`}
                    />

                    <FeeRow
                      label="First Month Training"
                      amount={`KSh ${registrationInfo.monthly_training_fee.toLocaleString()}`}
                    />
                  </div>

                  {registrationInfo.equipment_requirement && (
                    <div className="mt-6 border-t border-blue-800 pt-5">
                      <p className="text-xs font-black uppercase tracking-wider text-sky-400">
                        Equipment Requirement
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {registrationInfo.equipment_requirement}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-3 text-sm text-red-300">
                  Registration fees are currently unavailable.
                </p>
              )}
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                M-Pesa Express
              </p>

              <h3 className="mt-2 text-xl font-black uppercase text-blue-950">
                Automatic Payment
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                After registration, the parent or guardian can request
                an M-Pesa prompt directly from this website. Successful
                payments are confirmed automatically.
              </p>

              <div className="mt-5 rounded-xl bg-green-50 p-4">
                <p className="text-sm font-black text-green-800">
                  M-Pesa STK Push
                </p>

                <p className="mt-1 text-xs leading-5 text-green-700">
                  No manual M-Pesa transaction code is required for the
                  new payment flow.
                </p>
              </div>
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

              <p className="mt-3 font-black text-blue-950">
                0746360438
              </p>

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

function FeeRow({
  label,
  amount,
}: {
  label: string;
  amount: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-300">{label}</span>
      <span className="font-black">{amount}</span>
    </div>
  );
}

function ReceiptItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words font-bold text-blue-950">
        {value}
      </p>
    </div>
  );
}

function PaymentChoice({
  title,
  amount,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  amount: number;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition ${
        checked
          ? "border-sky-400 bg-sky-50"
          : "border-slate-200 bg-white"
      } ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:border-sky-300"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="h-5 w-5 accent-sky-500"
      />

      <div className="flex-1">
        <p className="font-black text-blue-950">{title}</p>

        <p className="mt-1 text-sm font-bold text-slate-500">
          KSh {Number(amount).toLocaleString()}
        </p>
      </div>
    </label>
  );
}

function PaymentDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/70 p-4">
      <p className="text-xs font-black uppercase tracking-wider text-green-700">
        {label}
      </p>

      <p className="mt-1 break-all font-black text-green-950">
        {value}
      </p>
    </div>
  );
}