import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import RegistrationInformationForm from "./registration-information-form";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

export default async function RegistrationInformationPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("registration_information")
    .select(
      "id, registration_fee, yellow_kit_fee, luminous_kit_fee, monthly_training_fee, payment_method, till_number, equipment_requirement, payment_instructions"
    )
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/content"
          className="text-sm font-black uppercase tracking-wider text-blue-950 hover:text-sky-500"
        >
          ← Back to Website Content
        </Link>

        <div className="mt-6 rounded-3xl bg-blue-950 p-8 text-white shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-400">
            Website Content
          </p>

          <h1 className="mt-3 text-3xl font-black uppercase md:text-5xl">
            Registration Information
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Manage academy registration fees, kit costs, training fees,
            Buy Goods payment details and registration instructions.
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
          <div className="border-b border-slate-200 pb-6">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-sky-600">
              Registration Settings
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase text-blue-950">
              Edit Registration Information
            </h2>

            <p className="mt-3 text-slate-600">
              Update the registration fees, M-Pesa Buy Goods Till Number,
              equipment requirement and payment instructions.
            </p>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              Unable to load the registration information.
            </div>
          ) : data ? (
            <RegistrationInformationForm
              registration={data as RegistrationInformation}
            />
          ) : (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
              No registration information was found in the database.
            </div>
          )}
        </section>

        <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-black uppercase tracking-wider text-emerald-800">
            Database Connected
          </p>

          <p className="mt-2 text-sm leading-6 text-emerald-700">
            Registration information is stored in Supabase. Changes made here
            can be displayed automatically on the public registration page.
          </p>
        </div>
      </div>
    </main>
  );
}