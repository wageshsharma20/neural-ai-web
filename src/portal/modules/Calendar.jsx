import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, X, Check, Trash2, MapPin, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { useApi, useMutation } from '../../hooks/useApi';
import { eventsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CATEGORY_COLORS = {
  'Hackathon': 'signal-violet',
  'Workshop': 'signal-cyan',
  'Talk': 'signal-magenta',
  'Project': 'signal-amber',
  'Competition': 'signal-magenta',
  'Mentorship': 'signal-cyan',
  'Seminar': 'signal-violet',
  'Other': 'mist',
};

const EVENT_CATEGORIES = ['Hackathon', 'Workshop', 'Talk', 'Project', 'Competition', 'Mentorship', 'Seminar', 'Other'];
const EVENT_STATUSES = ['draft', 'upcoming', 'ongoing', 'past', 'cancelled'];
const ROLES = ['Super Admin', 'Admin', 'Core Team', 'Co Heads', 'Member'];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── Event form (create / edit) ───────────────────────────────────────────────
function EventFormModal({ event, onClose, onSuccess }) {
  const isEdit = !!event;
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    category: event?.category || 'Workshop',
    status: event?.status || 'upcoming',
    date: event?.date ? new Date(event.date).toISOString().slice(0, 10) : '',
    endDate: event?.endDate ? new Date(event.endDate).toISOString().slice(0, 10) : '',
    time: event?.time || '',
    venue: event?.venue || '',
    visibleToRoles: event?.visibleToRoles || [],
  });
  const [error, setError] = useState(null);
  const { mutate: createEvent, loading: creating } = useMutation((data) => eventsAPI.create(data));
  const { mutate: updateEvent, loading: updating } = useMutation((data) => eventsAPI.update(event._id, data));
  const loading = creating || updating;

  const toggleRole = (role) => {
    setFormData((prev) => ({
      ...prev,
      visibleToRoles: prev.visibleToRoles.includes(role)
        ? prev.visibleToRoles.filter((r) => r !== role)
        : [...prev.visibleToRoles, role],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.date) {
      setError('Title, description, and date are required.');
      return;
    }
    setError(null);
    try {
      const payload = { ...formData, visibleToRoles: formData.visibleToRoles };
      if (isEdit) await updateEvent(payload);
      else await createEvent(payload);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while saving the event.');
    }
  };

  const label = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--mist)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', marginBottom: 6 };
  const inputStyle = { background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', colorScheme: 'dark' };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 680 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Schedule</p>
            <h2 className="modal__title">{isEdit ? 'Edit Event' : 'Schedule Event'}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div>
            <label style={label}>Event Name</label>
            <input type="text" className="input w-full" placeholder="e.g. AI Hackathon 2026" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={inputStyle} />
          </div>

          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            <div>
              <label style={label}>Category</label>
              <select className="input w-full" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ ...inputStyle, appearance: 'none' }}>
                {EVENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Status</label>
              <select className="input w-full" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={{ ...inputStyle, appearance: 'none' }}>
                {EVENT_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          </div>

          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            <div>
              <label style={label}>Start Date *</label>
              <input type="date" className="input w-full" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={label}>End Date (optional)</label>
              <input type="date" className="input w-full" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} style={inputStyle} />
            </div>
          </div>

          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            <div>
              <label style={label}>Time</label>
              <input type="time" className="input w-full" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={label}>Venue</label>
              <input type="text" className="input w-full" placeholder="e.g. DTU Seminar Hall" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={label}>Description</label>
            <textarea className="input w-full" placeholder="Describe the event..." rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div>
            <label style={label}>Visible to (society roles)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {ROLES.map((role) => {
                const checked = formData.visibleToRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)',
                      padding: '4px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                      background: checked ? 'var(--signal-violet-muted)' : 'var(--surface-2)',
                      border: checked ? '1px solid var(--signal-violet)' : '1px solid var(--surface-border-hover)',
                      color: checked ? 'var(--bone)' : 'var(--mist)',
                    }}
                  >
                    {checked ? '✓ ' : ''}{role}
                  </button>
                );
              })}
            </div>
            <p className="text-2xs text-mono text-mist" style={{ marginTop: 6 }}>
              Leave empty to show to every society role. Events are internal — never shown on the public website.
            </p>
          </div>

          {error && <p style={{ color: 'var(--signal-magenta)', fontSize: 'var(--text-xs)' }}>{error}</p>}
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            <Check size={14} /> {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Schedule Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Event detail modal ───────────────────────────────────────────────────────
function EventDetailModal({ event, canManage, onClose, onEdit, onDelete }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">{event.category}</p>
            <h2 className="modal__title">{event.title}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
          <div className="flex items-center gap-2 text-mist">
            <CalendarIcon size={14} /> {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            {event.endDate && <> – {new Date(event.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</>}
          </div>
          {event.time && (
            <div className="flex items-center gap-2 text-mist"><Clock size={14} /> {event.time}</div>
          )}
          {event.venue && (
            <div className="flex items-center gap-2 text-mist"><MapPin size={14} /> {event.venue}</div>
          )}
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Status</p>
            <span className={`badge badge-status-${event.status}`}>{event.status}</span>
          </div>
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Visible to</p>
            <div className="flex flex-wrap gap-1">
              {event.visibleToRoles?.length
                ? event.visibleToRoles.map((r) => <span key={r} className="badge badge-core">{r}</span>)
                : <span className="text-xs text-mist">All society roles</span>}
            </div>
          </div>
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Description</p>
            <p style={{ color: 'var(--mist)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{event.description}</p>
          </div>
          {event.createdBy?.name && (
            <p className="text-2xs text-mono text-mist">Scheduled by {event.createdBy.name}</p>
          )}
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          {canManage && (
            <button className="btn btn-danger" onClick={() => onDelete(event._id)}><Trash2 size={14} /> Delete</button>
          )}
          {canManage && (
            <button className="btn btn-secondary" onClick={() => onEdit(event)}>Edit</button>
          )}
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── Calendar module ──────────────────────────────────────────────────────────
export default function CalendarModule() {
  const { user } = useAuth();
  const canManage = ['Super Admin', 'Admin'].includes(user?.role);

  const [view, setView] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() }; // month: 0-11
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [detailEvent, setDetailEvent] = useState(null);

  const { data, loading, refetch } = useApi(
    () => eventsAPI.getCalendar({ year: view.year, month: view.month + 1 }),
    [view.year, view.month]
  );
  const events = data?.data?.events || [];
  const { mutate: deleteEvent } = useMutation((id) => eventsAPI.remove(id));

  const shiftMonth = (delta) => {
    const d = new Date(view.year, view.month + delta, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  const goToday = () => {
    const now = new Date();
    setView({ year: now.getFullYear(), month: now.getMonth() });
  };

  // Grid geometry
  const year = view.year;
  const month = view.month;
  const today = new Date();
  const firstDayOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstDayOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const eventsForDay = (day) =>
    events.filter((e) => {
      const d = new Date(e.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });

  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    await deleteEvent(id);
    setDetailEvent(null);
    refetch();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
      {formOpen && (
        <EventFormModal
          event={editingEvent}
          onClose={() => { setFormOpen(false); setEditingEvent(null); }}
          onSuccess={refetch}
        />
      )}
      {detailEvent && !formOpen && (
        <EventDetailModal
          event={detailEvent}
          canManage={canManage}
          onClose={() => setDetailEvent(null)}
          onEdit={(ev) => { setEditingEvent(ev); setDetailEvent(null); setFormOpen(true); }}
          onDelete={handleDelete}
        />
      )}

      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Schedule</p>
          <h1 className="page-header__title">Calendar</h1>
          <p className="page-header__desc">
            {events.filter((e) => e.status !== 'cancelled').length} internal events · visible to society roles only
          </p>
        </div>
        <div className="page-header__actions">
          {canManage && (
            <button className="btn btn-primary btn-sm" onClick={() => { setEditingEvent(null); setFormOpen(true); }}>
              <Plus size={14} /> Add Event
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, minHeight: 480 }}>
        {/* Calendar Header */}
        <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div className="flex items-center gap-4">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--bone)' }}>{monthLabel}</h2>
            <div className="flex gap-1">
              <button className="btn btn-ghost btn-sm" style={{ padding: 4 }} onClick={() => shiftMonth(-1)}><ChevronLeft size={16} /></button>
              <button className="btn btn-ghost btn-sm" style={{ padding: 4 }} onClick={() => shiftMonth(1)}><ChevronRight size={16} /></button>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'var(--space-2)' }} onClick={goToday}>Today</button>
          </div>

          <div className="flex items-center gap-3">
            {['Events', 'Workshops'].map((label) => (
              <div key={label} className="flex items-center gap-2 text-2xs text-mono text-mist uppercase tracking-wider">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-violet)' }}></span> {label}
              </div>
            ))}
          </div>
        </div>

        {/* Weekday header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--surface-border)', background: 'var(--surface-1)' }}>
          {WEEKDAYS.map((day) => (
            <div key={day} style={{ padding: 'var(--space-2)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', color: 'var(--mist)' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="spinner" style={{ margin: '3rem auto' }}></div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: 'minmax(100px, 1fr)', flex: 1, background: 'var(--surface-0)' }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} style={{ borderRight: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)', background: 'var(--surface-0)' }} />;
              const dayEvents = eventsForDay(day);
              const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
              return (
                <div key={i} style={{
                  borderRight: '1px solid var(--surface-border)',
                  borderBottom: '1px solid var(--surface-border)',
                  padding: 'var(--space-2)',
                  background: isToday ? 'var(--surface-2)' : 'transparent',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
                    color: isToday ? 'var(--signal-violet)' : 'var(--mist)',
                    marginBottom: 'var(--space-2)', fontWeight: isToday ? 600 : 400,
                  }}>
                    {day}
                  </div>
                  <div className="flex flex-col gap-1">
                    {dayEvents.slice(0, 3).map((e) => {
                      const color = CATEGORY_COLORS[e.category] || 'mist';
                      return (
                        <button
                          key={e._id}
                          onClick={() => setDetailEvent(e)}
                          title={`${e.title}${e.time ? ` · ${e.time}` : ''}`}
                          style={{
                            fontSize: 'var(--text-2xs)', textAlign: 'left', cursor: 'pointer',
                            padding: '2px 4px', borderRadius: 'var(--radius-sm)',
                            background: `var(--${color}-muted)`,
                            color: `var(--${color})`,
                            border: `1px solid var(--${color})`,
                            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {e.title}
                        </button>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <span className="text-2xs text-mono text-mist" style={{ paddingLeft: 4 }}>
                        +{dayEvents.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
