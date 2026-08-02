import React from 'react';
import {
  Users, CheckSquare, TrendingUp, Calendar, FolderOpen, Megaphone,
  ArrowRight, Plus, Activity, BookOpen, Clock, Target, Shield, Briefcase, FileText,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  stats, recentActivity, analyticsData, events, tasks, notices, currentUser,
  headData, coHeadData, memberData
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

function SuperAdminDashboard({ onNavigate }) {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const pendingTasks = tasks.filter((t) => t.status !== 'completed').slice(0, 5);
  const latestNotices = notices.filter((n) => n.status === 'published').slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Super Admin Overview</p>
          <h1 className="page-header__title">Society Dashboard</h1>
          <p className="page-header__desc">Welcome back, {currentUser.name}. Here's the complete society overview.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('settings')}>
            <SettingsIcon /> Manage Society
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Active Members" value={stats.activeMembers} delta={stats.memberGrowth + ' this month'} deltaPositive={true} icon={Users} iconColor="violet" />
        <KpiCard label="Pending Tasks" value={stats.pendingTasks} delta="Across all departments" icon={CheckSquare} iconColor="amber" />
        <KpiCard label="Completed Tasks" value={stats.completedTasks} delta={stats.taskCompletionRate + ' rate'} deltaPositive={true} icon={TrendingUp} iconColor="cyan" />
        <KpiCard label="Upcoming Events" value={stats.upcomingEvents} delta="Next: HackNeural 4.0" icon={Calendar} iconColor="violet" />
        <KpiCard label="Active Projects" value={stats.activeProjects} delta="3 nearing deadline" icon={FolderOpen} iconColor="cyan" />
        <KpiCard label="Notices Published" value={stats.totalNotices} delta="2 drafts pending" icon={Megaphone} iconColor="magenta" />
      </div>

      <div className="grid-12">
        <div className="card col-span-12" style={{ padding: 'var(--space-5)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>Trend</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', color: 'var(--bone)', letterSpacing: 'var(--tracking-tight)' }}>Member Growth</h2>
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
                <XAxis dataKey="month" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--mist)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--mist)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#6B4FA0" strokeWidth={2} fill="url(#memberGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-12">
        <div className="card col-span-5" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Action Required" title="Pending Tasks">
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('tasks')}>View all <ArrowRight size={12} /></button>
            </SectionHeader>
          </div>
          <div>
            {pendingTasks.map((task) => (
              <div key={task.id} style={{ padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="flex items-center justify-between gap-2">
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500, flex: 1, minWidth: 0 }} className="text-truncate">{task.title}</span>
                  <PriorityBadge priority={task.priority} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xs text-mono text-mist">Due {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card col-span-4" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Feed" title="Recent Activity" />
          </div>
          <div style={{ padding: 'var(--space-2) var(--space-5)' }} className="activity-feed">
            {recentActivity.map((item) => (
              <div key={item.id} className="activity-item">
                <span className="activity-item__dot" style={{ background: activityTypeColor[item.type] || 'var(--signal-violet)' }} />
                <span className="activity-item__text">{item.message}</span>
                <span className="activity-item__time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card col-span-3" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Schedule" title="Events">
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('events')}><ArrowRight size={12} /></button>
            </SectionHeader>
          </div>
          <div style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {upcomingEvents.map((ev) => (
              <div key={ev.id} style={{ padding: 'var(--space-3)', background: 'var(--surface-3)', borderRadius: 'var(--radius)', border: '1px solid var(--surface-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="text-2xs text-mono text-mist">{ev.type}</span>
                  <StatusBadge status={ev.status} />
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500, marginBottom: 4 }}>{ev.title}</p>
                <p className="text-2xs text-mono text-mist">{ev.date}</p>
              </div>
            ))}
            <div style={{ marginTop: 'var(--space-2)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--surface-border)' }}>
              <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 'var(--space-2)' }}>Latest Notice</p>
              {latestNotices[0] && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }}>{latestNotices[0].title}</p>}
            </div>
          </div>
        </div>
      </div>

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
            <button key={a.label} className="btn btn-secondary btn-sm" onClick={() => onNavigate(a.module)}>{a.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

const SettingsIcon = () => <Settings size={14} />;
import { Settings } from 'lucide-react';

function HeadDashboard({ onNavigate }) {
  const pendingTasks = tasks.filter((t) => t.status !== 'completed').slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">{headData.department} Department</p>
          <h1 className="page-header__title">Head Dashboard</h1>
          <p className="page-header__desc">Welcome back, {currentUser.name}. Here's your department overview.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('tasks')}>
            <Plus size={14} /> Assign Task
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Team Performance" value={`${headData.teamPerformance}%`} delta="Up 4% this week" deltaPositive={true} icon={TrendingUp} iconColor="cyan" />
        <KpiCard label="Active Projects" value={headData.activeProjects} delta="1 at risk" icon={FolderOpen} iconColor="magenta" />
        <KpiCard label="Pending Approvals" value={headData.pendingApprovals} delta="Needs your review" icon={CheckSquare} iconColor="amber" />
        <KpiCard label="Dept Members" value={headData.departmentMembers} delta="2 new this month" icon={Users} iconColor="violet" />
      </div>

      <div className="grid-12">
        <div className="card col-span-6" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Action Required" title="Pending Approvals & Tasks" />
          </div>
          <div>
            {pendingTasks.map((task) => (
              <div key={task.id} style={{ padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="flex items-center justify-between gap-2">
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500, flex: 1, minWidth: 0 }} className="text-truncate">{task.title}</span>
                  <PriorityBadge priority={task.priority} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xs text-mono text-mist">Due {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card col-span-6" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Operations" title="Projects & Leadership" />
          </div>
          <div style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist">Active Projects</p>
            {headData.activeProjectsList.map((proj, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--surface-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }}>{proj.name}</span>
                  <span className="text-2xs text-mono text-mist">{proj.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-bar__fill ${proj.progress > 50 ? 'cyan' : 'magenta'}`} style={{ width: `${proj.progress}%` }} />
                </div>
              </div>
            ))}
            
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginTop: 'var(--space-2)' }}>Co-Heads Reporting</p>
            {headData.coHeads.map((ch, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: i !== headData.coHeads.length - 1 ? '1px solid var(--surface-border)' : 'none' }}>
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }}>{ch.name}</p>
                  <p className="text-2xs text-mono text-mist">{ch.role}</p>
                </div>
                <StatusBadge status={ch.status === 'On Track' ? 'completed' : 'blocked'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CoHeadDashboard({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">{coHeadData.department} Execution</p>
          <h1 className="page-header__title">Co-Head Workspace</h1>
          <p className="page-header__desc">Welcome back, {currentUser.name}. Here are your operational priorities.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('tasks')}>
            <Plus size={14} /> Update Tasks
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Assigned Projects" value={coHeadData.assignedProjects} delta="Executing" icon={FolderOpen} iconColor="cyan" />
        <KpiCard label="Team Members" value={coHeadData.teamMembers} delta="Under your wing" icon={Users} iconColor="violet" />
        <KpiCard label="Pending Reviews" value={coHeadData.pendingReviews} delta="Requires action" icon={CheckSquare} iconColor="amber" />
        <KpiCard label="Upcoming Deadlines" value={coHeadData.upcomingDeadlines} delta="This week" icon={Target} iconColor="magenta" />
      </div>

      <div className="grid-12">
        <div className="card col-span-6" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Personal" title="My Assigned Tasks" />
          </div>
          <div>
            {coHeadData.myTasks.map((t, i) => (
              <div key={i} style={{ padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="flex items-center justify-between gap-2">
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500, flex: 1, minWidth: 0 }} className="text-truncate">{t.title}</span>
                  <PriorityBadge priority={t.priority} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xs text-mono text-mist">Due {t.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card col-span-6" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Team" title="Team Task Progress" />
          </div>
          <div>
            {coHeadData.teamTasks.map((t, i) => (
              <div key={i} style={{ padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="flex items-center justify-between gap-2">
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500, flex: 1, minWidth: 0 }} className="text-truncate">{t.title}</span>
                  <StatusBadge status={t.status.toLowerCase().replace(' ', '_')} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xs text-mono text-mist">Assignee: {t.assignee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberDashboard({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Personal Workspace</p>
          <h1 className="page-header__title">Member Dashboard</h1>
          <p className="page-header__desc">Welcome back, {currentUser.name}. Ready to build something great?</p>
        </div>
      </div>

      <div className="kpi-grid">
        <KpiCard label="My Tasks" value={memberData.myTasksCount} delta="2 high priority" icon={CheckSquare} iconColor="cyan" />
        <KpiCard label="Completed" value={memberData.completedTasks} delta="Total contribution" icon={TrendingUp} iconColor="violet" />
        <KpiCard label="Projects" value={memberData.myProjects.length} delta="Active involvement" icon={FolderOpen} iconColor="magenta" />
        <KpiCard label="Events" value={memberData.upcomingEvents} delta="Registered for" icon={Calendar} iconColor="amber" />
      </div>

      <div className="grid-12">
        <div className="card col-span-6" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Action Required" title="Assigned Tasks" />
          </div>
          <div>
            {memberData.myTasks.map((t, i) => (
              <div key={i} style={{ padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="flex items-center justify-between gap-2">
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500, flex: 1, minWidth: 0 }} className="text-truncate">{t.title}</span>
                  <PriorityBadge priority={t.priority} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge status={t.status.toLowerCase().replace(' ', '_')} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card col-span-6" style={{ padding: 0 }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <SectionHeader eyebrow="Activity" title="My Recent Updates" />
          </div>
          <div style={{ padding: 'var(--space-2) var(--space-5)' }} className="activity-feed">
            {memberData.recentActivity.map((item, i) => (
              <div key={i} className="activity-item">
                <span className="activity-item__dot" style={{ background: 'var(--signal-cyan)' }} />
                <span className="activity-item__text">{item.message}</span>
                <span className="activity-item__time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardModule({ onNavigate }) {
  const [activeRole, setActiveRole] = React.useState(currentUser.role);

  const renderDashboard = () => {
    switch (activeRole) {
      case 'Super Admin':
        return <SuperAdminDashboard onNavigate={onNavigate} />;
      case 'Head':
        return <HeadDashboard onNavigate={onNavigate} />;
      case 'Co-Head':
        return <CoHeadDashboard onNavigate={onNavigate} />;
      case 'Member':
      default:
        return <MemberDashboard onNavigate={onNavigate} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Role Switcher (For Development/Testing) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'calc(-1 * var(--space-4))', zIndex: 10, position: 'relative' }}>
        <div style={{
          padding: 'var(--space-2) var(--space-3)',
          background: 'var(--surface-2)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <AlertCircle size={14} color="var(--mist)" />
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--mist)', fontFamily: 'var(--font-mono)' }}>VIEW AS:</span>
          </div>
          <select 
            value={activeRole} 
            onChange={(e) => setActiveRole(e.target.value)}
            style={{
              background: 'var(--ink-raised)',
              color: 'var(--bone)',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius)',
              padding: '2px 6px',
              fontSize: 'var(--text-2xs)',
              fontFamily: 'var(--font-mono)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="Super Admin">Super Admin</option>
            <option value="Head">Head</option>
            <option value="Co-Head">Co-Head</option>
            <option value="Member">Member</option>
          </select>
        </div>
      </div>

      {renderDashboard()}
    </div>
  );
}
