import React, { useState } from 'react';
import { Trophy, Users, Plus } from 'lucide-react';
import { achievements, members } from '../data/mockData';
import { StatusBadge, SectionHeader } from '../components/shared/Primitives';

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

export default function AchievementsModule() {
  const [catFilter, setCatFilter] = useState('All');
  const cats = ['All', ...new Set(achievements.map((a) => a.category))];
  const filtered = achievements.filter((a) => catFilter === 'All' || a.category === catFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Recognition</p>
          <h1 className="page-header__title">Achievements</h1>
          <p className="page-header__desc">{achievements.length} total achievements logged</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Log Achievement</button>
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
