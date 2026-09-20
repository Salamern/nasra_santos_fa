'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContentAdmin() {
  const [heroTitle, setHeroTitle] = useState('Nurturing Future Football Stars');
  const [aboutText, setAboutText] = useState('Nasra Santos Football Academy is dedicated to developing young talent in Nairobi, Kenya.');
  const [phone, setPhone] = useState('+254 746 360 438');
  const [location, setLocation] = useState('Nasra Garden Estate, Gate D, Checkmate Plaza, Nairobi, Kenya');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-blue-900">PAGE CONTENT EDITOR</h1>
            <p className="text-sm text-slate-500">Update text and contact information across your website</p>
          </div>
          <Link href="/admin" className="text-sm text-blue-600 font-semibold hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Success Alert */}
        {isSaved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm font-bold">
            ✓ Website content updated successfully!
          </div>
        )}

        {/* Content Form */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Homepage Hero Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Homepage Hero Title</h2>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">Main Banner Headline</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">About Page Summary</h2>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">Short Description</label>
              <textarea
                rows={3}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Academy Address</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-md shadow hover:bg-blue-800 transition-colors"
          >
            Save All Changes
          </button>

        </form>

      </div>
    </div>
  );
}