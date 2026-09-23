import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import StatusButtons from "./status-buttons";

type Registration = {
  id: string;
  created_at: string;
  full_name: string;
  dob: string;
  gender: string;
  nationality: string;
  category: string;
  position: string;
  address: string;
  phone: string;
  emergency_name: string;
  emergency_relation: string;
  emergency_phone: string;
  allergies: string | null;
  medical_conditions: string | null;
  mpesa_code: string;
  status: string;
};

function getStatusClasses(status: string) {
  switch (status) {
    case "Approved":
      return "bg-emerald-100 text-emerald-800";

    case "Rejected":
      return "bg-red-100 text-red-800";

    default:
      return "bg-amber-100 text-amber-800";
  }
}

export default async function AdminRegistrationsPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  const registrations = (data ?? []) as Registration[];

  const pendingCount = registrations.filter(
    (registration) =>
      (registration.status || "Pending") === "Pending"
  ).length;

  const approvedCount = registrations.filter(
    (registration) => registration.status === "Approved"
  ).length;

  const rejectedCount = registrations.filter(
    (registration) => registration.status === "Rejected"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="rounded-3xl bg-blue-950 p-7 text-white shadow-lg md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-400">
            Nasra Santos FA
          </p>

          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-black uppercase md:text-5xl">
                Player Registrations
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                Review player applications, verify payment information and
                manage registration status.
              </p>
            </div>

            <Link
              href="/admin"
              className="w-fit rounded-full border border-sky-400 px-5 py-3 text-xs font-black uppercase tracking-wider text-sky-300 transition hover:bg-sky-400 hover:text-blue-950"
            >
              ← Admin Dashboard
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={registrations.length}
          />

          <StatCard title="Pending" value={pendingCount} />

          <StatCard title="Approved" value={approvedCount} />

          <StatCard title="Rejected" value={rejectedCount} />
        </div>

        {/* Database error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-black text-red-700">
              Could not load registrations.
            </p>

            <p className="mt-2 text-sm text-red-600">
              {error.message}
            </p>
          </div>
        )}

        {/* No registrations */}
        {!error && registrations.length === 0 && (
          <div className="mt-6 rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">📝</div>

            <h2 className="mt-4 text-xl font-black uppercase text-blue-950">
              No Registrations Yet
            </h2>

            <p className="mt-2 text-slate-600">
              New player applications will appear here after they are
              submitted.
            </p>
          </div>
        )}

        {/* Registration cards */}
        {!error && registrations.length > 0 && (
          <div className="mt-6 space-y-6">
            {registrations.map((registration) => {
              const currentStatus =
                registration.status || "Pending";

              return (
                <article
                  key={registration.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm"
                >
                  {/* Player heading */}
                  <div className="border-b border-slate-100 p-6 md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-sky-500">
                          {registration.category ||
                            "Category not provided"}
                        </p>

                        <h2 className="mt-1 text-2xl font-black uppercase text-blue-950">
                          {registration.full_name}
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                          Submitted{" "}
                          {registration.created_at
                            ? new Date(
                                registration.created_at
                              ).toLocaleString("en-KE")
                            : "Date unavailable"}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-4 py-2 text-xs font-black uppercase ${getStatusClasses(
                          currentStatus
                        )}`}
                      >
                        {currentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-3">
                    <Section title="Player Details">
                      <Detail
                        label="Date of Birth"
                        value={registration.dob}
                      />

                      <Detail
                        label="Gender"
                        value={registration.gender}
                      />

                      <Detail
                        label="Nationality"
                        value={registration.nationality}
                      />

                      <Detail
                        label="Position"
                        value={registration.position}
                      />
                    </Section>

                    <Section title="Contact Details">
                      <Detail
                        label="Phone"
                        value={registration.phone}
                      />

                      <Detail
                        label="Address"
                        value={registration.address}
                      />
                    </Section>

                    <Section title="Emergency Contact">
                      <Detail
                        label="Name"
                        value={registration.emergency_name}
                      />

                      <Detail
                        label="Relationship"
                        value={registration.emergency_relation}
                      />

                      <Detail
                        label="Phone"
                        value={registration.emergency_phone}
                      />
                    </Section>

                    <Section title="Medical Information">
                      <Detail
                        label="Allergies"
                        value={
                          registration.allergies ||
                          "None reported"
                        }
                      />

                      <Detail
                        label="Medical Conditions"
                        value={
                          registration.medical_conditions ||
                          "None reported"
                        }
                      />
                    </Section>

                    <Section title="Payment">
                      <Detail
                        label="M-Pesa Code"
                        value={registration.mpesa_code}
                      />

                      <div className="mt-3 rounded-xl bg-amber-50 p-3">
                        <p className="text-xs font-bold leading-5 text-amber-800">
                          Payment code requires manual verification
                          before the registration is approved.
                        </p>
                      </div>
                    </Section>

                    <Section title="Application">
                      <Detail
                        label="Registration ID"
                        value={registration.id}
                      />

                      <Detail
                        label="Status"
                        value={currentStatus}
                      />

                      <StatusButtons
                        registrationId={registration.id}
                        currentStatus={currentStatus}
                      />
                    </Section>
                  </div>
                </article>
              );
            })}
          </div>
        )}
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
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-4xl font-black text-blue-950">
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="border-b border-slate-200 pb-2 text-sm font-black uppercase tracking-wider text-blue-950">
        {title}
      </h3>

      <div className="mt-4 space-y-4">
        {children}
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-700">
        {value || "Not provided"}
      </p>
    </div>
  );
}