'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-blue-900">NASRA SANTOS ADMIN CONTROL</h1>
            <p className="text-sm text-slate-500">Manage your website content and academy registrations</p>
          </div>
          <Link href="/" className="text-sm text-blue-600 font-semibold hover:underline">
            ← Back to Website
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Registrations */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-2">📝 Registrations</h2>
            <p className="text-sm text-slate-600 mb-4">View player applications and approve or reject candidates.</p>
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full font-bold mb-4">
              2 Pending
            </span>
            <Link 
              href="/admin/registrations" 
              className="block w-full text-center bg-blue-700 text-white py-2 text-sm font-bold rounded hover:bg-blue-800 transition-colors"
            >
              Manage Registrations
            </Link>
          </div>

          {/* Card 2: Fixtures & Results */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-2">⚽ Fixtures & Results</h2>
            <p className="text-sm text-slate-600 mb-4">Add new match schedules or update match scores.</p>
            <Link 
              href="/admin/fixtures" 
              className="block w-full text-center bg-blue-700 text-white py-2 text-sm font-bold rounded hover:bg-blue-800 transition-colors"
            >
              Update Scores
            </Link>
          </div>

          {/* Card 3: Site Content */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-2">⚙️ Page Content</h2>
            <p className="text-sm text-slate-600 mb-4">Change text/photos on Home, About, and Contact pages.</p>
            <Link 
              href="/admin/content" 
              className="block w-full text-center bg-blue-700 text-white py-2 text-sm font-bold rounded hover:bg-blue-800 transition-colors"
            >
              Edit Pages
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}