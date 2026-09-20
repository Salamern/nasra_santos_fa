'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Player {
  id: string;
  name: string;
  category: string;
  phone: string;
  date: string;
  status: string;
}

const INITIAL_DATA: Player[] = [
  { id: '1', name: 'David Ochieng', category: 'Under 15', phone: '+254 712 345 678', date: '2026-09-18', status: 'Pending' },
  { id: '2', name: 'Samuel Mwangi', category: 'Under 17', phone: '+254 722 987 654', date: '2026-09-19', status: 'Pending' },
  { id: '3', name: 'Brian Kiprop', category: 'Senior Team', phone: '+254 733 112 233', date: '2026-09-15', status: 'Approved' },
];

export default function RegistrationsAdmin() {
  const [players, setPlayers] = useState<Player[]>(INITIAL_DATA);

  const updateStatus = (id: string, newStatus: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-blue-900">PLAYER REGISTRATIONS</h1>
            <p className="text-sm text-slate-500">Review and approve applications for Nasra Santos Football Academy</p>
          </div>
          <Link href="/admin" className="text-sm text-blue-600 font-semibold hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Players Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="p-4">Player Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{player.name}</td>
                  <td className="p-4">{player.category}</td>
                  <td className="p-4">{player.phone}</td>
                  <td className="p-4 text-slate-500">{player.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      player.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      player.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => updateStatus(player.id, 'Approved')}
                      className="bg-green-600 text-white text-xs px-3 py-1.5 rounded font-bold hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(player.id, 'Rejected')}
                      className="bg-red-600 text-white text-xs px-3 py-1.5 rounded font-bold hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
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