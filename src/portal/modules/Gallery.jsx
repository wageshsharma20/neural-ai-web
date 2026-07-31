import React, { useState } from 'react';
import { Plus, Filter, Upload, Image as ImageIcon } from 'lucide-react';
import { SectionHeader } from '../components/shared/Primitives';

// Mock gallery data
const galleryItems = [
  { id: 'IMG-1', title: 'HackNeural 3.0 Winners', event: 'HackNeural', date: '2025-08-20', type: 'image' },
  { id: 'IMG-2', title: 'ML Bootcamp Kickoff', event: 'ML Bootcamp', date: '2026-08-05', type: 'image' },
  { id: 'IMG-3', title: 'Annual Day Celebrations', event: 'Ceremony', date: '2026-06-20', type: 'image' },
  { id: 'IMG-4', title: 'Research Lab Working Session', event: 'Internal', date: '2026-07-15', type: 'image' },
  { id: 'IMG-5', title: 'Guest Lecture by Dr. Krishnan', event: 'Guest Lecture', date: '2026-08-12', type: 'image' },
  { id: 'IMG-6', title: 'Team Outing 2026', event: 'Internal', date: '2026-07-01', type: 'image' },
];

export default function GalleryModule() {
  const [filter, setFilter] = useState('All');
  const events = ['All', 'HackNeural', 'ML Bootcamp', 'Ceremony', 'Internal', 'Guest Lecture'];

  const filtered = galleryItems.filter(i => filter === 'All' || i.event === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Content</p>
          <h1 className="page-header__title">Gallery</h1>
          <p className="page-header__desc">Manage society photos and event albums.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm"><Upload size={14} /> Upload Media</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {events.map((e) => (
          <button
            key={e}
            className={`btn btn-sm ${filter === e ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(e)}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid-3">
        {filtered.map(item => (
          <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: 160, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--surface-border)' }}>
              <ImageIcon size={32} style={{ color: 'var(--surface-border-hover)' }} />
            </div>
            <div style={{ padding: 'var(--space-3)' }}>
              <div className="flex items-center justify-between mb-1" style={{ marginBottom: 4 }}>
                 <span className="text-2xs text-mono text-mist uppercase tracking-wider">{item.event}</span>
                 <span className="text-2xs text-mono text-mist">{item.date}</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--bone)', fontWeight: 500 }}>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
