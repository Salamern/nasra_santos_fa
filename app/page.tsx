import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-blue-950 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <img
            src="/logo.png"
            alt="Nasra Santos Football Academy"
            className="mx-auto mb-8 h-40 w-40 object-contain"
          />

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            Nasra Santos Football Academy
          </h1>

          <p className="mt-5 text-lg text-sky-200">
            Your chance to join the gardeners.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300">
            Developing young football talent through discipline, teamwork,
            hard work and opportunity.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/registration"
              className="rounded-full bg-sky-400 px-7 py-3 font-bold text-blue-950"
            >
              REGISTER NOW
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-white px-7 py-3 font-bold text-white"
            >
              ABOUT US
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-3xl font-black uppercase text-blue-950">
          Welcome to Nasra Santos FA
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-slate-600">
          Nasra Santos Football Academy is a grassroots football academy
          based in Nairobi, Kenya, providing structured football development
          for young players.
        </p>
      </section>

      <section
        id="contact"
        className="bg-blue-950 px-6 py-16 text-center text-white"
      >
        <h2 className="text-3xl font-black uppercase">Contact Us</h2>

        <p className="mt-4 text-sky-200">
          Nasra Garden Estate, Nairobi, Kenya
        </p>

        <p className="mt-2 text-sky-200">
          Phone: 0746360438
        </p>

        <p className="mt-2 text-sky-200">
          Email: nasrasantosfootballacademy@gmail.com
        </p>
      </section>
    </main>
  );
}