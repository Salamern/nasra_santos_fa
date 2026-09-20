'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Match {
  id: string;
  opponent: string;
  date: string;
  venue: string;
  nasraScore: number | string;
  opponentScore: number | string;
  status: 'Upcoming' | 'Completed';
}

const INITIAL_FIXTURES: Match[] = [
  { id: '1', opponent: 'Kariobangi Youth', date: '2026-10-05', venue: 'Nasra Grounds', nasraScore: '-', opponentScore: '-', status: 'Upcoming' },
  { id: '2', opponent: 'Kayole All Stars', date: '2026-09-12', venue: 'Spine Road Pitch', nasraScore: 3, opponentScore: 1, status: 'Completed' },
];

export default function FixturesAdmin() {
  const [fixtures, setFixtures] = useState<Match[]>(INITIAL_FIXTURES);
  const [opponent, setOpponent] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('Nasra Grounds');

  const addFixture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opponent || !date) return;

    const newMatch: Match = {
      id: Date.now().toString(),
      opponent,
      date,
      venue,
      nasraScore: '-',
      opponentScore: '-',
      status: 'Upcoming',
    };

    setFixtures([newMatch, ...fixtures]);
    setOpponent('');
    setDate('');
  };

  const updateScore = (id: string, nasra: string, opp: string) => {
    setFixtures(
      fixtures.map((f) =>
        f.id === id
          ? {
              ...f,
              nasraScore: nasra !== '' ? Number(nasra) : '-',
              opponentScore: opp !== '' ? Number(opp) : '-',
              status: 'Completed',
            }
          : f
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-blue-900">FIXTURES & RESULTS</h1>
            <p className="text-sm text-slate-500">Schedule matches and record match results</p>
          </div>
          <Link href="/admin" className="text-sm text-blue-600 font-semibold hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Add Match Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Add New Fixture</h2>
          <form onSubmit={addFixture} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Opponent Name"
              value={opponent}
              onChange={(e) => setOpponent(e.target.value)}
              className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold text-sm rounded py-2 hover:bg-blue-800 transition-colors"
            >
              Add Match
            </button>
          </form>
        </div>

        {/* Fixtures List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="p-4">Match</th>
                <th className="p-4">Date & Venue</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Score (Nasra vs Opponent)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {fixtures.map((match) => (
                <tr key={match.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">
                    Nasra Santos vs {match.opponent}
                  </td>
                  <td className="p-4 text-slate-500">
                    <div>{match.date}</div>
                    <div className="text-xs text-slate-400">{match.venue}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      match.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <input
                        type="number"
                        placeholder="0"
                        defaultValue={match.nasraScore === '-' ? '' : match.nasraScore}
                        onBlur={(e) => updateScore(match.id, e.target.value, String(match.opponentScore === '-' ? '' : match.opponentScore))}
                        className="w-12 p-1 text-center border rounded text-sm font-bold"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="0"
                        defaultValue={match.opponentScore === '-' ? '' : match.opponentScore}
                        onBlur={(e) => updateScore(match.id, String(match.nasraScore === '-' ? '' : match.nasraScore), e.target.value)}
                        className="w-12 p-1 text-center border rounded text-sm font-bold"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}