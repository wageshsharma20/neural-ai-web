import React, { useState } from 'react';
import { Plus, MapPin, Calendar } from 'lucide-react';
import { events, members } from '../data/mockData';

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };
function getMember(id) { return members.find((m) => m.id === id); }

function EventCard({ event }) {
  // const budgetPct = event.budget > 0 ? Math.round((event.budgetSpent / event.budget) * 100) : 0;
  // const regPct = event.capacity > 0 ? Math.round((event.registrations / event.capacity) * 100) : 0;

  const typeColor = {
    'Hackathon': 'signal-violet',
    'Workshop': 'signal-cyan',
    'Guest Lecture': 'signal-magenta',
    'Academic': 'signal-cyan',
    'Ceremony': 'signal-violet',
  }[event.type] || 'signal-violet';

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
            <span className={`badge badge-status-${event.status}`}>{event.status}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: `var(--${typeColor})`, border: `1px solid var(--${typeColor})`, padding: '1px 6px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>
              {event.type}
            </span>
          </div>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--bone)' }}>{event.title}</h3>
        </div>
        <span className="text-2xs text-mono text-mist flex-shrink-0">{event.id}</span>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', lineHeight: 1.6 }}>{event.description}</p>

      {/* Meta grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        <div className="flex items-center gap-2">
          <Calendar size={12} style={{ color: 'var(--mist)' }} />
          <span className="text-xs text-mist">{event.date}{event.endDate !== event.date ? ` → ${event.endDate}` : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={12} style={{ color: 'var(--mist)' }} />
          <span className="text-xs text-mist" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.venue}</span>
        </div>
      </div>

      {/* Registrations */}
      {event.capacity > 0 && (
        <div>
          <div className="flex justify-between" style={{ marginBottom: 4 }}>
            <span className="text-2xs text-mono text-mist">Registrations</span>
            <span className="text-2xs text-mono text-bone">{event.registrations} / {event.capacity}</span>
          </div>

        </div>
      )}

      {/* Budget */}
      {event.budget > 0 && (
        <div>
          <div className="flex justify-between" style={{ marginBottom: 4 }}>
            <span className="text-2xs text-mono text-mist">Budget Utilized</span>
            <span className="text-2xs text-mono text-bone">₹{event.budgetSpent.toLocaleString()} / ₹{event.budget.toLocaleString()}</span>
          </div>

        </div>
      )}

      {/* Status detail */}
      {event.status_detail && (
        <p style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--signal-amber)', paddingTop: 'var(--space-1)', borderTop: '1px solid var(--surface-border)' }}>
          ⚑ {event.status_detail}
        </p>
      )}

      {/* Sponsors */}
      {event.sponsors.length > 0 && (
        <div>
          <p className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ marginBottom: 4 }}>Sponsors</p>
          <div className="flex flex-wrap gap-1">
            {event.sponsors.map((s) => (
              <span key={s} className="badge badge-core">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Volunteers */}
      {event.volunteers.length > 0 && (
        <div>
          <p className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ marginBottom: 4 }}>Volunteers</p>
          <div className="flex items-center gap-1">
            {event.volunteers.map((id) => {
              const m = getMember(id);
              if (!m) return null;
              return (
                <div key={id} className={`avatar avatar-sm avatar-${AVATAR_COLORS[m.role]}`} title={m.name}>
                  {m.initials}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-2" style={{ marginTop: 'auto' }}>
        <button className="btn btn-secondary btn-sm">Edit</button>
        <button className="btn btn-ghost btn-sm">View Details</button>
      </div>
    </div>
  );
}

export default function EventsModule() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = events.filter((e) => statusFilter === 'All' || e.status === statusFilter);
  const statuses = ['All', 'upcoming', 'ongoing', 'past'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Schedule</p>
          <h1 className="page-header__title">Events</h1>
          <p className="page-header__desc">{events.filter((e) => e.status === 'upcoming').length} upcoming · {events.filter((e) => e.status === 'ongoing').length} ongoing</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm"><Plus size={14} /> New Event</button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === 'All' ? 'All Events' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {filtered.map((e) => <EventCard key={e.id} event={e} />)}
      </div>
    </div>
  );
}
