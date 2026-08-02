import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { analyticsData, recruitmentData } from '../data/mockData';
import { KpiCard } from '../components/shared/Primitives';
import { TrendingUp, Users, CheckSquare, Calendar } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--surface-3)', border: '1px solid var(--surface-border-hover)',
      borderRadius: 'var(--radius)', padding: '8px 12px',
    }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--mist)', marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: p.color || 'var(--bone)' }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const PIE_COLORS = ['#6B4FA0', '#3FC7D6', '#C765A8', '#C9A227', '#5EC26A'];

export default function AnalyticsModule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Insights</p>
          <h1 className="page-header__title">Analytics</h1>
          <p className="page-header__desc">Society activity overview — all data is mock.</p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="kpi-grid">
        <KpiCard label="Total Members" value={147} delta="+12% this month" deltaPositive icon={Users} iconColor="violet" />
        <KpiCard label="Tasks Completed" value={312} delta="87% completion rate" deltaPositive icon={CheckSquare} iconColor="cyan" />
        <KpiCard label="Events Hosted" value={18} delta="This academic year" icon={Calendar} iconColor="magenta" />
        <KpiCard label="Research Papers" value={6} delta="3 accepted, 3 in review" icon={TrendingUp} iconColor="amber" />
      </div>

      {/* Charts row 1 */}
      <div className="grid-12">
        {/* Member growth */}
        <div className="card col-span-8" style={{ padding: 'var(--space-5)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>12-Month Trend</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', color: 'var(--bone)', letterSpacing: 'var(--tracking-tight)' }}>Member Growth</h2>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.memberGrowth} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6B4FA0" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6B4FA0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--mist)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--mist)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#6B4FA0" strokeWidth={2} fill="url(#ag1)" name="Members" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event participation pie */}
        <div className="card col-span-4" style={{ padding: 'var(--space-5)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>Breakdown</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', color: 'var(--bone)', letterSpacing: 'var(--tracking-tight)' }}>Event Participation</h2>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.eventParticipation}
                  dataKey="participants"
                  nameKey="event"
                  cx="50%" cy="50%" outerRadius={80}
                  strokeWidth={0}
                >
                  {analyticsData.eventParticipation.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {analyticsData.eventParticipation.map((ep, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: PIE_COLORS[i % PIE_COLORS.length], flexShrink: 0 }} />
                  <span className="text-2xs text-mono text-mist" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.event}</span>
                </div>
                <span className="text-2xs text-mono text-bone">{ep.participants}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid-12">
        {/* Task completion */}
        <div className="card col-span-7" style={{ padding: 'var(--space-5)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>Weekly</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', color: 'var(--bone)', letterSpacing: 'var(--tracking-tight)' }}>Task Velocity</h2>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.taskCompletion} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="week" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--mist)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--mist)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completed" fill="#3FC7D6" radius={[2, 2, 0, 0]} name="Completed" />
                <Bar dataKey="added" fill="#6B4FA0" radius={[2, 2, 0, 0]} name="Added" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recruitment funnel */}
        <div className="card col-span-5" style={{ padding: 'var(--space-5)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>Recruitment 2026</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', color: 'var(--bone)', letterSpacing: 'var(--tracking-tight)' }}>Funnel</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {analyticsData.recruitmentStats.map((stage) => {
              const max = analyticsData.recruitmentStats[0].count;
              // const pct = max > 0 ? (stage.count / max) * 100 : 0; // Removing unused
              return (
                <div key={stage.stage}>
                  <div className="flex justify-between" style={{ marginBottom: 4 }}>
                    <span className="text-xs text-mono text-mist">{stage.stage}</span>
                    <span className="text-xs text-mono text-bone">{stage.count}</span>
                  </div>

                </div>
              );
            })}
          </div>

          <hr className="section-rule" style={{ margin: 'var(--space-4) 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            {recruitmentData.domains.map((d) => (
              <div key={d.name}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }}>{d.name}</p>
                <p className="text-2xs text-mono text-mist">{d.applications} applicants · {d.openings} openings</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
