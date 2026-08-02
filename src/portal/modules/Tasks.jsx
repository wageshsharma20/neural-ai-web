import React, { useState } from 'react';
import { Plus, MessageSquare, X, Check } from 'lucide-react';
import { tasks, members } from '../data/mockData';
import { PriorityBadge, StatusBadge } from '../components/shared/Primitives';

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: 'var(--mist)' },
  { id: 'in_progress', label: 'In Progress', color: 'var(--signal-cyan)' },
  { id: 'under_review', label: 'Under Review', color: 'var(--signal-violet)' },
  { id: 'blocked', label: 'Blocked', color: '#E05A5A' },
  { id: 'completed', label: 'Completed', color: '#5EC26A' },
];

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };

function getMemberColor(memberId) {
  const m = members.find((x) => x.id === memberId);
  return m ? (AVATAR_COLORS[m.role] || 'mist') : 'mist';
}

function getMemberInitials(memberId) {
  const m = members.find((x) => x.id === memberId);
  return m ? m.initials : '?';
}

function TaskCard({ task }) {
  return (
    <div className="kanban-card">
      <div className="flex items-center justify-between gap-2" style={{ marginBottom: 'var(--space-2)' }}>
        <PriorityBadge priority={task.priority} />
        <span className="text-2xs text-mono text-mist">{task.id}</span>
      </div>
      <p className="kanban-card__title">{task.title}</p>



      <div className="kanban-card__meta">
        <div className="flex items-center gap-2">
          {task.assignedTo.map((uid) => (
            <div key={uid} className={`avatar avatar-sm avatar-${getMemberColor(uid)}`} title={uid}>
              {getMemberInitials(uid)}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-mist">
          <span className="flex items-center gap-1 text-2xs text-mono">
            <MessageSquare size={10} /> {task.comments}
          </span>
          <span className="text-2xs text-mono">{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task }) {
  const assignees = task.assignedTo.map((id) => members.find((m) => m.id === id)).filter(Boolean);
  const assignedBy = members.find((m) => m.id === task.assignedBy);

  return (
    <tr>
      <td>
        <div>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--bone)', marginBottom: 2 }}>{task.title}</p>
          <span className="text-2xs text-mono text-mist">{task.id}</span>
        </div>
      </td>
      <td><StatusBadge status={task.status} /></td>
      <td><PriorityBadge priority={task.priority} /></td>
      <td>
        <div className="flex items-center gap-1">
          {assignees.map((a, i) => (
            <div key={i} className={`avatar avatar-sm avatar-${AVATAR_COLORS[a.role]}`} title={a.name}>
              {a.initials}
            </div>
          ))}
        </div>
      </td>
      <td>
        {assignedBy && (
          <div className="flex items-center gap-2">
            <div className={`avatar avatar-sm avatar-${AVATAR_COLORS[assignedBy.role]}`}>{assignedBy.initials}</div>
            <span className="text-xs text-mist">{assignedBy.name}</span>
          </div>
        )}
      </td>
      <td className="mono" style={{ fontSize: 'var(--text-2xs)', color: 'var(--mist)' }}>{task.dueDate}</td>
      <td>
        <div className="flex items-center gap-1 text-mist text-2xs text-mono">
          <MessageSquare size={12} /> {task.comments}
        </div>
      </td>
    </tr>
  );
}

function TaskModal({ allMembers, onClose, onConfirm }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [scope, setScope] = useState('mass');
  const [assigneeId, setAssigneeId] = useState('');

  const roleMap = {
    'heads': ['Super Admin', 'Admin'],
    'co-heads': ['Core Team'],
    'members': ['Member']
  };

  const availableMembers = targetRole ? allMembers.filter(m => roleMap[targetRole]?.includes(m.role)) : [];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Assignment</p>
            <h2 className="modal__title">New Task</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Task Title</label>
            <input 
              type="text" 
              className="input w-full" 
              placeholder="e.g. Review Q3 Analytics Report"
              value={taskTitle}
              onChange={e => setTaskTitle(e.target.value)}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Target Group</label>
            <select 
              className="input w-full"
              value={targetRole}
              onChange={e => { 
                setTargetRole(e.target.value); 
                setScope('mass');
                setAssigneeId(''); 
              }}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', appearance: 'none' }}
            >
              <option value="" disabled>Select a group...</option>
              <option value="heads">Heads (Admins)</option>
              <option value="co-heads">Co-Heads (Core Team)</option>
              <option value="members">Members</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Description (Optional)</label>
            <textarea 
              className="input w-full" 
              placeholder="Add details, links, or context..."
              value={taskDesc}
              onChange={e => setTaskDesc(e.target.value)}
              rows={3}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', resize: 'none' }}
            />
          </div>

          {targetRole && (
            <div style={{ marginTop: 'var(--space-2)' }}>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-3 block">Assignment Scope</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ 
                  display: 'flex', gap: '12px', padding: '12px', 
                  border: `1px solid ${scope === 'mass' ? 'var(--signal-violet)' : 'var(--surface-border)'}`, 
                  borderRadius: 'var(--radius)', background: scope === 'mass' ? 'var(--signal-violet-muted)' : 'var(--surface-1)',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <input type="radio" name="scope" value="mass" checked={scope === 'mass'} onChange={() => { setScope('mass'); setAssigneeId(''); }} style={{ marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--bone)', fontWeight: 500 }}>Mass Assign</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', marginTop: 2 }}>Assign to all selected members simultaneously.</div>
                  </div>
                </label>
                
                <label style={{ 
                  display: 'flex', gap: '12px', padding: '12px', 
                  border: `1px solid ${scope === 'individual' ? 'var(--signal-cyan)' : 'var(--surface-border)'}`, 
                  borderRadius: 'var(--radius)', background: scope === 'individual' ? 'var(--signal-cyan-muted)' : 'var(--surface-1)',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <input type="radio" name="scope" value="individual" checked={scope === 'individual'} onChange={() => setScope('individual')} style={{ marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--bone)', fontWeight: 500 }}>Assign Individually</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', marginTop: 2 }}>Assign to a specific member within this group.</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {targetRole && scope === 'individual' && (
            <div style={{ marginTop: 'var(--space-2)' }}>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Select Member</label>
              <select 
                className="input w-full"
                value={assigneeId}
                onChange={e => setAssigneeId(e.target.value)}
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', appearance: 'none' }}
              >
                <option value="" disabled>Select a member...</option>
                {availableMembers.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button 
            className="btn btn-primary" 
            disabled={!taskTitle.trim() || !targetRole || (scope === 'individual' && !assigneeId)}
            onClick={() => {
              const finalAssignee = scope === 'mass' ? targetRole : assigneeId;
              onConfirm(taskTitle, finalAssignee, scope);
              onClose();
            }}
          >
            <Check size={14} /> Assign Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TasksModule() {
  const [view, setView] = useState('kanban');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const filtered = tasks.filter((t) => {
    return priorityFilter === 'All' || t.priority === priorityFilter;
  });

  const groupedByStatus = Object.fromEntries(
    COLUMNS.map((col) => [col.id, filtered.filter((t) => t.status === col.id)])
  );


  const priorities = ['All', 'urgent', 'high', 'medium', 'low'];

  const handleAssignTask = (title, assigneeId, scope) => {
    const member = members.find(m => m.id === assigneeId);
    const recipient = scope === 'team' ? `${member.name} and their team` : member.name;
    setToastMsg(`Task "${title}" assigned to ${recipient}.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {isModalOpen && (
        <TaskModal 
          allMembers={members} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleAssignTask}
        />
      )}

      {toastMsg && (
        <div className="anim-fade-up" style={{
          position: 'fixed', bottom: 32, right: 32, 
          background: 'var(--bone)', color: 'var(--surface-0)', 
          padding: '12px 24px', borderRadius: 'var(--radius)', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          fontWeight: 500, fontSize: 'var(--text-sm)', zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Check size={16} />
          {toastMsg}
        </div>
      )}

      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Work</p>
          <h1 className="page-header__title">Tasks</h1>
          <p className="page-header__desc">{tasks.filter((t) => t.status !== 'completed').length} open · {tasks.filter((t) => t.status === 'completed').length} completed</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}><Plus size={14} /> New Task</button>
        </div>
      </div>

      {/* View switcher + filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="tabs" style={{ borderBottom: 'none' }}>
          {['kanban', 'table'].map((v) => (
            <button
              key={v}
              className={`tab-btn ${view === v ? 'active' : ''}`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select className="select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            {priorities.map((p) => <option key={p}>{p === 'All' ? 'All Priorities' : p}</option>)}
          </select>
        </div>
      </div>

      {/* Kanban view */}
      {view === 'kanban' && (
        <div className="kanban-board">
          {COLUMNS.map((col) => {
            const colTasks = groupedByStatus[col.id] || [];
            return (
              <div className="kanban-col" key={col.id}>
                <div className="kanban-col__header">
                  <div className="kanban-col__title">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: col.color, flexShrink: 0, display: 'inline-block' }} />
                    {col.label}
                  </div>
                  <span className="kanban-col__count">{colTasks.length}</span>
                </div>
                <div className="kanban-col__body">
                  {colTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {colTasks.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 'var(--space-4)', color: 'var(--mist)', fontSize: 'var(--text-xs)' }}>
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table view */}
      {view === 'table' && (
        <div className="card" style={{ padding: 0 }}>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Assigned By</th>

                  <th>Due Date</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => <TaskRow key={task.id} task={task} />)}
              </tbody>
            </table>
          </div>
          <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--surface-border)' }}>
            <span className="text-2xs text-mono text-mist">{filtered.length} tasks</span>
          </div>
        </div>
      )}
    </div>
  );
}
