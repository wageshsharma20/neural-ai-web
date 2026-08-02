import React, { useState } from 'react';
import { Trophy, Plus, X, Check } from 'lucide-react';
import { achievements, members } from '../data/mockData';
import { StatusBadge } from '../components/shared/Primitives';

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };
function getMember(id) { return members.find((m) => m.id === id); }

const CAT_COLORS = {
  Research: 'signal-violet', Competition: 'signal-cyan',
  Individual: 'signal-magenta', Publication: 'signal-amber',
};

function AchievementCard({ ach }) {
  const achMembers = ach.members.map(getMember).filter(Boolean);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', borderLeft: `3px solid var(--${CAT_COLORS[ach.category] || 'signal-violet'})` }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)',
              color: `var(--${CAT_COLORS[ach.category] || 'signal-violet'})`,
              border: `1px solid var(--${CAT_COLORS[ach.category] || 'signal-violet'})`,
              padding: '1px 6px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)',
            }}>
              {ach.category}
            </span>
            <span className="text-2xs text-mono text-mist">{ach.date}</span>
          </div>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--bone)', lineHeight: 1.4 }}>{ach.title}</h3>
        </div>
        <StatusBadge status={ach.status} />
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', lineHeight: 1.6 }}>{ach.description}</p>

      <hr className="section-rule" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {achMembers.map((m, i) => (
            <div key={i} className={`avatar avatar-sm avatar-${AVATAR_COLORS[m.role]}`} title={m.name}>{m.initials}</div>
          ))}
          {achMembers.length > 1 && (
            <span className="text-2xs text-mono text-mist" style={{ marginLeft: 6 }}>{achMembers.length} members</span>
          )}
          {achMembers.length === 1 && (
            <span className="text-2xs text-mono text-mist" style={{ marginLeft: 6 }}>{achMembers[0].name}</span>
          )}
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm">Edit</button>
          {ach.status === 'draft' && <button className="btn btn-primary btn-sm">Publish</button>}
        </div>
      </div>
    </div>
  );
}

function AchievementModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Recognition</p>
            <h2 className="modal__title">Log Achievement</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Heading</label>
            <input 
              type="text" 
              className="input w-full" 
              placeholder="e.g. 1st Place - Smart India Hackathon"
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Category</label>
              <select 
                className="input w-full"
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', appearance: 'none' }}
              >
                <option value="Research">Research</option>
                <option value="Competition">Competition</option>
                <option value="Individual">Individual</option>
                <option value="Publication">Publication</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Date</label>
              <input 
                type="date" 
                className="input w-full"
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', colorScheme: 'dark' }}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Image URL</label>
            <input 
              type="text" 
              className="input w-full" 
              placeholder="https://..."
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Detail</label>
            <textarea 
              className="input w-full" 
              placeholder="Describe the achievement in detail..."
              rows={4}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', resize: 'vertical' }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onClose}>
            <Check size={14} /> Log Achievement
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AchievementsModule() {
  const [catFilter, setCatFilter] = useState('All');
  const [isCreating, setIsCreating] = useState(false);
  const cats = ['All', ...new Set(achievements.map((a) => a.category))];
  const filtered = achievements.filter((a) => catFilter === 'All' || a.category === catFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {isCreating && <AchievementModal onClose={() => setIsCreating(false)} />}
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Recognition</p>
          <h1 className="page-header__title">Achievements</h1>
          <p className="page-header__desc">{achievements.length} total achievements logged</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm" onClick={() => setIsCreating(true)}><Plus size={14} /> Log Achievement</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        {cats.filter((c) => c !== 'All').map((cat) => (
          <div key={cat} className="kpi-card">
            <div style={{
              width: 32, height: 32, borderRadius: 'var(--radius)',
              background: `var(--${CAT_COLORS[cat] || 'signal-violet'}-muted, rgba(107,79,160,0.15))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 'var(--space-2)',
            }}>
              <Trophy size={16} style={{ color: `var(--${CAT_COLORS[cat] || 'signal-violet'})` }} />
            </div>
            <div className="kpi-card__label">{cat}</div>
            <div className="kpi-card__value">{achievements.filter((a) => a.category === cat).length}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {cats.map((c) => (
          <button key={c} className={`btn btn-sm ${catFilter === c ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setCatFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filtered.map((a) => <AchievementCard key={a.id} ach={a} />)}
      </div>
    </div>
  );
}
