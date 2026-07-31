import React from 'react';

// ─── Avatar ────────────────────────────────────────────────────────────────
const AVATAR_COLORS = ['violet', 'cyan', 'magenta', 'amber', 'mist'];

export function Avatar({ initials = '?', size = 'md', colorIndex = 0 }) {
  const color = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];
  return (
    <span className={`avatar avatar-${size} avatar-${color}`} aria-hidden="true">
      {initials}
    </span>
  );
}

// ─── Badge (Role) ──────────────────────────────────────────────────────────
export function RoleBadge({ role }) {
  const map = {
    'Super Admin': 'badge-superadmin',
    'Admin': 'badge-admin',
    'Core Team': 'badge-core',
    'Member': 'badge-member',
  };
  return (
    <span className={`badge ${map[role] || 'badge-member'}`}>{role}</span>
  );
}

// ─── Badge (Status) ────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const label = status?.replace(/_/g, ' ');
  return (
    <span className={`badge badge-status-${status}`}>{label}</span>
  );
}

// ─── Badge (Priority) ─────────────────────────────────────────────────────
export function PriorityBadge({ priority }) {
  return (
    <span className={`badge badge-priority-${priority}`}>{priority}</span>
  );
}

// ─── Stat Dot ─────────────────────────────────────────────────────────────
export function StatusDot({ status }) {
  const cls = {
    active: 'active', inactive: 'inactive', blocked: 'blocked',
    pending: 'pending', in_progress: 'active',
  }[status] || 'inactive';
  return <span className={`status-dot ${cls}`} />;
}

// ─── Section header ────────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="flex items-center justify-between gap-4" style={{ marginBottom: 'var(--space-4)' }}>
      <div>
        {eyebrow && (
          <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>
            {eyebrow}
          </p>
        )}
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)', color: 'var(--bone)', letterSpacing: 'var(--tracking-tight)' }}>
          {title}
        </h2>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, message }) {
  return (
    <div className="empty-state">
      {Icon && <Icon className="empty-state__icon" />}
      <p className="empty-state__title">{message}</p>
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────
export function KpiCard({ label, value, delta, deltaPositive, icon: Icon, iconColor = 'violet' }) {
  return (
    <div className="kpi-card">
      {Icon && (
        <div className={`kpi-card__icon`} style={{
          background: `var(--signal-${iconColor}-muted)`,
          color: `var(--signal-${iconColor})`,
        }}>
          <Icon size={16} />
        </div>
      )}
      <div className="kpi-card__label">{label}</div>
      <div className="kpi-card__value">{value}</div>
      {delta && (
        <div className={`kpi-card__delta ${deltaPositive ? 'positive' : deltaPositive === false ? 'negative' : ''}`}>
          {delta}
        </div>
      )}
    </div>
  );
}

// ─── Tag list ──────────────────────────────────────────────────────────────
export function TagList({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="badge badge-member"
          style={{ fontSize: 'var(--text-2xs)' }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
