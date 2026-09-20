"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function TeamsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "U7", "U9", "U11", "U13", "U15", "U17", "Senior Team"];

  const teamsData = [
    {
      category: "U7",
      title: "Under 7s - Young Cubs",
      ageGroup: "Ages 5 - 7",
      schedule: "Sat & Sun | 8:00 AM - 9:30 AM",
      focus: "Basic ball familiarity, balance, coordination, and fun group games.",
      headCoach: "Coach Evans",
    },
    {
      category: "U9",
      title: "Under 9s - Junior Grasshoppers",
      ageGroup: "Ages 8 - 9",
      schedule: "Sat & Sun | 9:30 AM - 11:00 AM",
      focus: "Passing fundamentals, 1v1 dribbling, and small-sided games.",
      headCoach: "Coach Samuel",
    },
    {
      category: "U11",
      title: "Under 11s - Rising Stars",
      ageGroup: "Ages 10 - 11",
      schedule: "Wed & Sat | 4:00 PM - 5:30 PM",
      focus: "Positional play, spatial awareness, basic tactical drills, and team defense.",
      headCoach: "Coach Brian",
    },
    {
      category: "U13",
      title: "Under 13s - Academy Prospects",
      ageGroup: "Ages 12 - 13",
      schedule: "Tue, Thu & Sat | 4:00 PM - 5:40 PM",
      focus: "High-tempo ball mastery, set pieces, game stamina, and competitive matchplay.",
      headCoach: "Coach Hassan",
    },
    {
      category: "U15",
      title: "Under 15s - Youth Strikers",
      ageGroup: "Ages 14 - 15",
      schedule: "Mon, Wed, Fri | 4:30 PM - 6:00 PM",
      focus: "Advanced tactics, physical conditioning, league competition, and positional analysis.",
      headCoach: "Coach Derrick",
    },
    {
      category: "U17",
      title: "Under 17s - Elite Development",
      ageGroup: "Ages 16 - 17",
      schedule: "Mon to Thu | 4:30 PM - 6:15 PM",
      focus: "Transition to senior football, strength & speed training, high-stakes tournament play.",
      headCoach: "Coach Santos",
    },
    {
      category: "Senior Team",
      title: "Nasra Santos First Team",
      ageGroup: "Ages 18+",
      schedule: "Mon to Fri | 5:00 PM - 6:45 PM",
      focus: "Full tactical preparation, regional league matches, and professional pathway scouting.",
      headCoach: "Head Coach Santos",
    },
  ];

  const filteredTeams =
    selectedCategory === "All"
      ? teamsData
      : teamsData.filter((team) => team.category === selectedCategory);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-sky-900 text-white py-16 px-6 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <span className="inline-block rounded-full bg-sky-400/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 border border-sky-400/30">
            Academy Squads
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Our Teams & Squads
          </h1>
          <p className="text-sky-100 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Structured development programs designed for every age group, built around technical skills, teamwork, and sportsmanship.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="py-8 px-6 bg-white border-b border-slate-200 sticky top-[61px] z-40 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-950 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Squad Cards Grid */}
      <section className="py-12 px-6 mx-auto max-w-7xl space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    {team.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{team.ageGroup}</span>
                </div>

                <h2 className="text-xl font-black text-blue-950 uppercase">{team.title}</h2>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <p>
                    <strong className="text-slate-800">Training Days:</strong> {team.schedule}
                  </p>
                  <p>
                    <strong className="text-slate-800">Key Focus:</strong> {team.focus}
                  </p>
                  <p>
                    <strong className="text-slate-800">Lead Coach:</strong> {team.headCoach}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/registration"
                  className="block w-full text-center rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-blue-950 transition uppercase tracking-wider"
                >
                  Join {team.category} Squad
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Callout */}
      <section className="bg-sky-50 border-y border-sky-200 py-12 px-6 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-2xl font-black text-blue-950 uppercase">Not sure which squad fits best?</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Our coaches offer placement assessments during training sessions to ensure your child joins the correct age and skill level group.
          </p>
          <div className="pt-2">
            <Link
              href="/registration"
              className="inline-block rounded-full bg-blue-950 px-8 py-3 text-xs font-bold uppercase text-white hover:bg-blue-900 transition shadow"
            >
              Register for Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-6 text-center text-xs border-t border-slate-800">
        <p className="text-white font-bold">Nasra Santos Football Academy</p>
        <p className="mt-1">Nasra Garden Estate, Gate D, Checkmate Plaza, 1st Floor (Opp. Aster Point Hospital)</p>
        <p className="mt-2 text-slate-500">© 2026 All rights reserved.</p>
      </footer>
    </main>
  );
}