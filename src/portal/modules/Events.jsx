import React, { useState } from 'react';
import { Plus, MapPin, Calendar, X, Check } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { eventsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };

const EVENT_CATEGORIES = ['Hackathon', 'Workshop', 'Talk', 'Project', 'Competition', 'Mentorship', 'Seminar', 'Other'];

function EventCard({ event }) {
  const typeColor = {
    'Hackathon': 'signal-violet',
    'Workshop': 'signal-cyan',
    'Guest Lecture': 'signal-magenta',
    'Academic': 'signal-cyan',
    'Ceremony': 'signal-violet',
  }[event.type] || 'signal-violet';

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
            <span className={`badge badge-status-${event.status}`}>{event.status}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: `var(--${typeColor})`, border: `1px solid var(--${typeColor})`, padding: '1px 6px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>
              {event.category}
            </span>
          </div>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--bone)' }}>{event.title}</h3>
        </div>
        <span className="text-2xs text-mono text-mist flex-shrink-0">{event._id}</span>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', lineHeight: 1.6 }}>{event.description}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        <div className="flex items-center gap-2">
          <Calendar size={12} style={{ color: 'var(--mist)' }} />
          <span className="text-xs text-mist">{new Date(event.date).toLocaleDateString('en-IN')}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={12} style={{ color: 'var(--mist)' }} />
          <span className="text-xs text-mist" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.venue || 'TBA'}</span>
        </div>
      </div>

      {event.maxParticipants > 0 && (
        <div>
          <div className="flex justify-between" style={{ marginBottom: 4 }}>
            <span className="text-2xs text-mono text-mist">Registrations</span>
            <span className="text-2xs text-mono text-bone">{event.registrations || 0} / {event.maxParticipants}</span>
          </div>
        </div>
      )}

      {event.budget?.allocated > 0 && (
        <div>
          <div className="flex justify-between" style={{ marginBottom: 4 }}>
            <span className="text-2xs text-mono text-mist">Budget Utilized</span>
            <span className="text-2xs text-mono text-bone">₹{event.budget.spent.toLocaleString()} / ₹{event.budget.allocated.toLocaleString()}</span>
          </div>
        </div>
      )}

      {event.sponsors?.length > 0 && (
        <div>
          <p className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ marginBottom: 4 }}>Sponsors</p>
          <div className="flex flex-wrap gap-1">
            {event.sponsors.map((s) => (
              <span key={s.name} className="badge badge-core">{s.name}</span>
            ))}
          </div>
        </div>
      )}

      {event.volunteers?.length > 0 && (
        <div>
          <p className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ marginBottom: 4 }}>Volunteers</p>
          <div className="flex items-center gap-1">
            {event.volunteers.map((m) => {
              if (!m) return null;
              return (
                <div key={m._id} className={`avatar avatar-sm avatar-${AVATAR_COLORS[m.role] || 'mist'}`} title={m.name}>
                  {m.name?.charAt(0)}
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

function AddEventModal({ onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(EVENT_CATEGORIES[0]);
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !date) {
      setError('Title, description, and date are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await eventsAPI.create({ title, description, category, date });
      onCreated?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while creating the event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Schedule</p>
            <h2 className="modal__title">New Event</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Title</label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. AI Hackathon 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Category</label>
              <select
                className="input w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', appearance: 'none' }}
              >
                {EVENT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Date</label>
              <input
                type="date"
                className="input w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', colorScheme: 'dark' }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Description</label>
            <textarea
              className="input w-full"
              placeholder="Describe the event..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', resize: 'vertical' }}
            />
          </div>

          {error && (
            <p style={{ color: 'var(--signal-magenta)', fontSize: 'var(--text-xs)' }}>{error}</p>
          )}
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
            <Check size={14} /> {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventsModule() {
  const { user } = useAuth();
  const canManage = ['Super Admin', 'Admin'].includes(user?.role);
  const [statusFilter, setStatusFilter] = useState('All');
  const [isCreating, setIsCreating] = useState(false);

  const { data, loading, refetch } = useApi(() => eventsAPI.getAll());
  const events = data?.data?.events || [];

  const filtered = events.filter((e) => statusFilter === 'All' || e.status === statusFilter);
  const statuses = ['All', 'upcoming', 'ongoing', 'completed'];

  if (loading) return <div className="spinner" style={{ margin: '3rem auto' }}></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {isCreating && (
        <AddEventModal onClose={() => setIsCreating(false)} onCreated={refetch} />
      )}

      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Schedule</p>
          <h1 className="page-header__title">Events</h1>
          <p className="page-header__desc">{events.filter((e) => e.status === 'upcoming').length} upcoming · {events.filter((e) => e.status === 'ongoing').length} ongoing</p>
        </div>
        <div className="page-header__actions">
          {canManage && (
            <button className="btn btn-primary btn-sm" onClick={() => setIsCreating(true)}>
              <Plus size={14} /> New Event
            </button>
          )}
        </div>
      </div>

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
        {filtered.map((e) => <EventCard key={e._id} event={e} />)}
      </div>
    </div>
  );
}