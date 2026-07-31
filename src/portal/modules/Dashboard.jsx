import React from 'react';
import {
  Users, CheckSquare, TrendingUp, Calendar, FolderOpen, Megaphone,
  ArrowRight, Plus,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  stats, recentActivity, analyticsData, events, tasks, notices,
} from '../data/mockData';
import { KpiCard, StatusBadge, PriorityBadge, SectionHeader } from '../components/shared/Primitives';

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
          {p.value}
        </p>
      ))}
    </div>
  );
};

const activityTypeColor = {
  task_completed: '#5EC26A',
  blog_published: 'var(--signal-cyan)',
  member_joined: 'var(--signal-violet)',
  notice_published: 'var(--signal-amber)',
  project_update: 'var(--signal-magenta)',
  achievement_added: 'var(--signal-violet)',
  task_blocked: '#E05A5A',
  event_created: 'var(--signal-cyan)',
};

export default function DashboardModule({ onNavigate }) {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const pendingTasks = tasks.filter((t) => t.status !== 'completed').slice(0, 5);
  const latestNotices = notices.filter((n) => n.status === 'published').slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Page header */}
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Overview</p>
          <h1 className="page-header__title">Dashboard</h1>
          <p className="page-header__desc">Welcome back, Arjun. Here's what's happening.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-secondary btn-sm">
            <Plus size={14} /> Quick Action
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="kpi-grid">
        <KpiCard
          label="Active Members"
          value={stats.activeMembers}
          delta={stats.memberGrowth + ' this month'}
          deltaPositive={true}
          icon={Users}
          iconColor="violet"
        />
        <KpiCard
          label="Pending Tasks"
          value={stats.pendingTasks}
          delta="Across all departments"
          icon={CheckSquare}
          iconColor="amber"
        />
        <KpiCard
          label="Completed Tasks"
          value={stats.completedTasks}
          delta={stats.taskCompletionRate + ' rate'}
          deltaPositive={true}
          icon={TrendingUp}
          iconColor="cyan"
        />
        <KpiCard
          label="Upcoming Events"
          value={stats.upcomingEvents}
          delta="Next: HackNeural 4.0"
          icon={Calendar}
          iconColor="violet"
        />
        <KpiCard
          label="Active Projects"
          value={stats.activeProjects}
          delta="3 nearing deadline"
          icon={FolderOpen}
          iconColor="cyan"
        />
        <KpiCard
          label="Notices Published"
          value={stats.totalNotices}
          delta="2 drafts pending"
          icon={Megaphone}
          iconColor="magenta"
        />
      </div>

      {/* Charts row */}
      <div className="grid-12">
        {/* Member growth chart */}
        <div className="card col-span-12" style={{ padding: 'var(--space-5)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>Trend</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', color: 'var(--bone)', letterSpacing: 'var(--tracking-tight)' }}>
              Member Growth
            </h2>
          </div>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.memberGrowth} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="memberGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6B4FA0" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6B4FA0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--mist)' }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--mist)' }}
                  axisLine={false} tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone" dataKey="count"
                  stroke="#6B4FA0" strokeWidth={2}
                  fill="url(#memberGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom grid: tasks + activity + events */}
      <div className="grid-12">
        {/* Pending tasks */}
        <div className="card col-span-5" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Action Required" title="Pending Tasks">
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('tasks')}>
                View all <ArrowRight size={12} />
              </button>
            </SectionHeader>
          </div>
          <div>
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  borderBottom: '1px solid var(--surface-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500, flex: 1, minWidth: 0 }} className="text-truncate">
                    {task.title}
                  </span>
                  <PriorityBadge priority={task.priority} />
                </div>
                <div className="flex items-center justify-between gap-2">

                  <span className="text-2xs text-mono text-mist">Due {task.dueDate}</span>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card col-span-4" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Feed" title="Recent Activity" />
          </div>
          <div style={{ padding: 'var(--space-2) var(--space-5)' }} className="activity-feed">
            {recentActivity.map((item) => (
              <div key={item.id} className="activity-item">
                <span
                  className="activity-item__dot"
                  style={{ background: activityTypeColor[item.type] || 'var(--signal-violet)' }}
                />
                <span className="activity-item__text">{item.message}</span>
                <span className="activity-item__time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="card col-span-3" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Schedule" title="Events">
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('events')}>
                <ArrowRight size={12} />
              </button>
            </SectionHeader>
          </div>
          <div style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {upcomingEvents.map((ev) => (
              <div
                key={ev.id}
                style={{
                  padding: 'var(--space-3)',
                  background: 'var(--surface-3)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--surface-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="text-2xs text-mono text-mist">{ev.type}</span>
                  <StatusBadge status={ev.status} />
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500, marginBottom: 4 }}>{ev.title}</p>
                <p className="text-2xs text-mono text-mist">{ev.date}</p>
              </div>
            ))}

            {/* Latest notice */}
            <div style={{ marginTop: 'var(--space-2)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--surface-border)' }}>
              <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 'var(--space-2)' }}>Latest Notice</p>
              {latestNotices[0] && (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }}>{latestNotices[0].title}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <SectionHeader eyebrow="Shortcuts" title="Quick Actions" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
          {[
            { label: 'New Task', module: 'tasks' },
            { label: 'Add Member', module: 'people' },
            { label: 'Create Notice', module: 'notices' },
            { label: 'Schedule Event', module: 'events' },
            { label: 'Start Project', module: 'projects' },
            { label: 'Write Blog', module: 'blogs' },
            { label: 'Log Achievement', module: 'achievements' },
            { label: 'View Analytics', module: 'analytics' },
          ].map((a) => (
            <button key={a.label} className="btn btn-secondary btn-sm" onClick={() => onNavigate(a.module)}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
