import React, { useState, useMemo } from 'react';
import {
  Plus, MessageSquare, X, Check, FileText, Pencil, History,
  Users, Mail, Send, RotateCcw, ShieldCheck, ShieldX, Loader,
} from 'lucide-react';
import { PriorityBadge, StatusBadge } from '../components/shared/Primitives';
import { useApi } from '../../hooks/useApi';
import { tasksAPI, usersAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const STATUSES = ['To Do', 'In Progress', 'Under Review', 'Completed', 'Blocked'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

const STATUS_COLOR = {
  'To Do': 'var(--mist)',
  'In Progress': 'var(--signal-cyan)',
  'Under Review': 'var(--signal-violet)',
  'Blocked': '#E05A5A',
  'Completed': '#5EC26A',
};

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist', 'Co Heads': 'amber' };

const ROLE_GROUPS = [
  { id: 'all', label: 'All Members', roles: null },
  { id: 'heads', label: 'Heads (Super Admin / Admin)', roles: ['Super Admin', 'Admin'] },
  { id: 'core', label: 'Core Team / Co-Heads', roles: ['Core Team', 'Co Heads'] },
  { id: 'members', label: 'Members', roles: ['Member'] },
];

const avatarClass = (m) => (m ? (AVATAR_COLORS[m.role] || 'mist') : 'mist');
const initialsOf = (m) => (m?.name ? m.name.charAt(0) : '?');
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-IN') : '—');
const fmtDateTime = (d) => (d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '');

// ─── Assignee picker (shared by New Task + Edit) ─────────────────────────────
function AssigneePicker({ members, selected, onChange, showEmails = true }) {
  const [group, setGroup] = useState('all');

  const filtered = useMemo(() => {
    const g = ROLE_GROUPS.find((x) => x.id === group);
    if (!g || !g.roles) return members;
    return members.filter((m) => g.roles.includes(m.role));
  }, [members, group]);

  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
        {ROLE_GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            className="btn btn-sm"
            style={{
              background: group === g.id ? 'var(--signal-violet-muted)' : 'var(--surface-2)',
              color: group === g.id ? 'var(--bone)' : 'var(--mist)',
              border: `1px solid ${group === g.id ? 'var(--signal-violet)' : 'var(--surface-border)'}`,
            }}
            onClick={() => setGroup(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius)', padding: 'var(--space-2)' }}>
        {filtered.length === 0 && (
          <p className="text-2xs text-mono text-mist" style={{ padding: 'var(--space-2)' }}>No members in this group.</p>
        )}
        {filtered.map((m) => {
          const isSel = selected.includes(m._id);
          return (
            <label
              key={m._id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                background: isSel ? 'var(--signal-violet-muted)' : 'transparent',
                transition: 'background var(--transition-fast)',
              }}
            >
              <input type="checkbox" checked={isSel} onChange={() => toggle(m._id)} style={{ accentColor: 'var(--signal-violet)' }} />
              <div className={`avatar avatar-sm avatar-${avatarClass(m)}`}>{initialsOf(m)}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }}>{m.name}</div>
                <div className="text-2xs text-mono text-mist" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {showEmails && <Mail size={9} />}
                  {showEmails ? m.email : m.role}
                </div>
              </div>
              <span className="badge badge-member" style={{ fontSize: 'var(--text-2xs)' }}>{m.role}</span>
            </label>
          );
        })}
      </div>

      <p className="text-2xs text-mono text-mist" style={{ marginTop: 'var(--space-2)' }}>
        {selected.length} member{selected.length === 1 ? '' : 's'} selected
      </p>
    </div>
  );
}

// ─── New Task modal ──────────────────────────────────────────────────────────
function NewTaskModal({ members, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignees, setAssignees] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSaving(true);
    setError('');
    try {
      await tasksAPI.create({
        title: title.trim(),
        description: desc.trim(),
        dueDate: dueDate || undefined,
        priority,
        assignedTo: assignees,
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create task');
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Assignment</p>
            <h2 className="modal__title">New Task</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Task Title *</label>
            <input type="text" className="input w-full" placeholder="e.g. Review Q3 Analytics Report" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Description (Optional)</label>
            <textarea className="input w-full" rows={3} placeholder="Add details, links, or context..." value={desc} onChange={(e) => setDesc(e.target.value)} style={{ resize: 'none' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Due Date</label>
              <input type="date" className="input w-full" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Priority</label>
              <select className="input w-full" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Assign To *</label>
            <AssigneePicker members={members} selected={assignees} onChange={setAssignees} />
          </div>

          {error && <p style={{ color: '#E05A5A', fontSize: 'var(--text-xs)' }}>{error}</p>}

          <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-2)' }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" disabled={!title.trim() || assignees.length === 0 || saving} onClick={handleCreate}>
              {saving ? <Loader size={14} className="anim-spin" /> : <Check size={14} />}
              {saving ? 'Creating...' : 'Assign Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Task modal ─────────────────────────────────────────────────────────
function EditTaskModal({ task, members, onClose, onUpdated }) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : '');
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [assignees, setAssignees] = useState((task.assignedTo || []).map((a) => a._id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    setError('');
    try {
      await tasksAPI.update(task._id, {
        title: title.trim(),
        description: desc.trim(),
        dueDate: dueDate || undefined,
        priority,
        status,
        assignedTo: assignees,
      });
      onUpdated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update task');
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Edit</p>
            <h2 className="modal__title">Edit Task</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Task Title *</label>
            <input type="text" className="input w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Description</label>
            <textarea className="input w-full" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} style={{ resize: 'none' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Due Date</label>
              <input type="date" className="input w-full" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Priority</label>
              <select className="input w-full" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Status</label>
            <select className="input w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Assigned To</label>
            <AssigneePicker members={members} selected={assignees} onChange={setAssignees} />
          </div>

          {error && <p style={{ color: '#E05A5A', fontSize: 'var(--text-xs)' }}>{error}</p>}

          <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-2)' }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" disabled={!title.trim() || saving} onClick={handleSave}>
              {saving ? <Loader size={14} className="anim-spin" /> : <Check size={14} />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Submit modal (assignee marks complete with description + optional PDF) ───
function SubmitModal({ task, onClose, onDone }) {
  const [description, setDescription] = useState('');
  const [pdfInfo, setPdfInfo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePdfChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('solution', file);
      const res = await tasksAPI.uploadSolution(task._id, fd);
      setPdfInfo({
        name: res.data?.data?.task?.submission?.pdf?.name || file.name,
        url: res.data?.data?.task?.submission?.pdf?.url,
        publicId: res.data?.data?.task?.submission?.pdf?.publicId || '',
      });
      setUploading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'PDF upload failed');
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await tasksAPI.submit(task._id, {
        description: description.trim(),
        pdf: pdfInfo || undefined,
      });
      onDone('Task submitted for review');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Submission failed');
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Mark Complete</p>
            <h2 className="modal__title">Submit Task</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)' }}>
            Describe what you completed for <strong style={{ color: 'var(--bone)' }}>"{task.title}"</strong>. The assigner will review this before accepting.
          </p>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Completion Description *</label>
            <textarea
              className="input w-full" rows={4} placeholder="Explain what was done, how it was done, and any links or context..."
              value={description} onChange={(e) => setDescription(e.target.value)} style={{ resize: 'none' }}
            />
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Solution PDF (Optional)</label>
            <input type="file" accept="application/pdf" onChange={handlePdfChange} style={{ color: 'var(--mist)', fontSize: 'var(--text-xs)' }} />
            {uploading && <p className="text-2xs text-mono text-mist" style={{ marginTop: 6 }}>Uploading PDF...</p>}
            {pdfInfo && !uploading && (
              <p className="text-2xs text-mono" style={{ marginTop: 6, color: '#5EC26A', display: 'flex', alignItems: 'center', gap: 4 }}>
                <FileText size={11} /> {pdfInfo.name}
              </p>
            )}
          </div>

          {error && <p style={{ color: '#E05A5A', fontSize: 'var(--text-xs)' }}>{error}</p>}

          <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-2)' }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" disabled={!description.trim() || submitting || uploading} onClick={handleSubmit}>
              {submitting ? <Loader size={14} className="anim-spin" /> : <Send size={14} />}
              {submitting ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── History timeline ────────────────────────────────────────────────────────
const HISTORY_LABEL = {
  created: 'Task created',
  assigned: 'Assigned',
  updated: 'Task updated',
  submitted: 'Submitted for review',
  unsubmitted: 'Marked incomplete',
  approved: 'Approved',
  rejected: 'Rejected',
  pdf_uploaded: 'Solution PDF uploaded',
};

function HistoryTimeline({ history }) {
  const items = [...(history || [])].reverse();
  if (items.length === 0) return <p className="text-2xs text-mono text-mist">No activity yet.</p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((h, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: 'var(--space-2) 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: h.action === 'rejected' ? '#E05A5A' : h.action === 'approved' ? '#5EC26A' : 'var(--signal-violet)', flexShrink: 0, marginTop: 4 }} />
            {i < items.length - 1 && <span style={{ width: 1, flex: 1, background: 'var(--surface-border)' }} />}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }}>
              {HISTORY_LABEL[h.action] || h.action}
              {h.user?.name ? ` — ${h.user.name}` : ''}
            </p>
            {h.detail && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', lineHeight: 1.5, wordBreak: 'break-word' }}>{h.detail}</p>}
            <p className="text-2xs text-mono text-mist" style={{ marginTop: 2 }}>{fmtDateTime(h.at)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Task detail modal ───────────────────────────────────────────────────────
function TaskDetailModal({ task, user, onClose, onAction, openSubmit, openEdit, reviewing }) {
  const isAssignee = (task.assignedTo || []).some((a) => a._id === user._id);
  const isAssigner = task.assignedBy?._id === user._id;
  const isPrivileged = ['Super Admin', 'Admin', 'Core Team'].includes(user.role);
  const canModify = isAssigner || isPrivileged;
  const awaitingReview = task.status === 'Under Review' && task.review?.status === 'pending';
  const canSubmit = isAssignee && !['Under Review', 'Completed'].includes(task.status);
  const canUnsubmit = isAssignee && (task.status === 'Under Review' || task.status === 'Completed');

  const [rejectNote, setRejectNote] = useState('');
  const [showReject, setShowReject] = useState(false);

  const handleReject = () => {
    if (rejectNote.trim()) onAction('reject', { note: rejectNote.trim() });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">
              {task.id} · Assigned by {task.assignedBy?.name || '—'}
            </p>
            <h2 className="modal__title">{task.title}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
          <span className="text-2xs text-mono text-mist">Due {fmtDate(task.dueDate)}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {task.description && (
            <div>
              <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Description</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--bone)', whiteSpace: 'pre-wrap' }}>{task.description}</p>
            </div>
          )}

          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-2">Assigned To</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(task.assignedTo || []).map((a) => (
                <div key={a._id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className={`avatar avatar-sm avatar-${avatarClass(a)}`}>{initialsOf(a)}</div>
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }}>{a.name}</p>
                    <p className="text-2xs text-mono text-mist" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Mail size={9} /> {a.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission + review */}
          {task.submission && (
            <div style={{ border: '1px solid var(--surface-border)', borderRadius: 'var(--radius)', padding: 'var(--space-4)' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                <p className="text-2xs text-mono uppercase tracking-widest text-mist">Submission</p>
                {task.review?.status === 'pending' && <span className="badge badge-status-pending">Awaiting review</span>}
                {task.review?.status === 'approved' && <span className="badge badge-status-completed">Approved</span>}
                {task.review?.status === 'rejected' && <span className="badge badge-status-rejected">Rejected</span>}
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', whiteSpace: 'pre-wrap' }}>
                {task.submission.description}
              </p>
              {task.submission.submittedBy && (
                <p className="text-2xs text-mono text-mist" style={{ marginTop: 6 }}>
                  Submitted by {task.submission.submittedBy.name || 'Assignee'} · {fmtDateTime(task.submission.submittedAt)}
                </p>
              )}
              {task.submission.pdf?.url && (
                <a
                  href={task.submission.pdf.url}
                  target="_blank" rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 'var(--space-2)', display: 'inline-flex' }}
                >
                  <FileText size={12} /> {task.submission.pdf.name || 'Solution PDF'}
                </a>
              )}
              {task.review?.note && (
                <p style={{ fontSize: 'var(--text-xs)', color: '#E05A5A', marginTop: 8, fontStyle: 'italic' }}>
                  Review note: {task.review.note}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {canSubmit && (
              <button className="btn btn-primary btn-sm" onClick={openSubmit}>
                <Check size={12} /> Mark Complete
              </button>
            )}
            {canUnsubmit && (
              <button className="btn btn-secondary btn-sm" onClick={() => onAction('unsubmit')}>
                <RotateCcw size={12} /> Mark Uncomplete
              </button>
            )}
            {canModify && (
              <button className="btn btn-secondary btn-sm" onClick={openEdit}>
                <Pencil size={12} /> Edit Task
              </button>
            )}
            {canModify && awaitingReview && !reviewing && (
              <>
                <button className="btn btn-secondary btn-sm" style={{ borderColor: '#5EC26A', color: '#5EC26A' }} onClick={() => onAction('approve')}>
                  <ShieldCheck size={12} /> Accept
                </button>
                <button className="btn btn-secondary btn-sm" style={{ borderColor: '#E05A5A', color: '#E05A5A' }} onClick={() => setShowReject((v) => !v)}>
                  <ShieldX size={12} /> Reject
                </button>
              </>
            )}
            {reviewing && <Loader size={14} className="anim-spin" />}
          </div>

          {showReject && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <textarea
                className="input w-full" rows={2} placeholder="Reason for rejection (required)"
                value={rejectNote} onChange={(e) => setRejectNote(e.target.value)} style={{ resize: 'none' }}
              />
              <div className="flex justify-end gap-2">
                <button className="btn btn-ghost btn-sm" onClick={() => setShowReject(false)}>Cancel</button>
                <button className="btn btn-danger btn-sm" disabled={!rejectNote.trim()} onClick={handleReject}>
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}

          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-2" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <History size={12} /> Task History
            </p>
            <HistoryTimeline history={task.history} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Kanban card ─────────────────────────────────────────────────────────────
function TaskCard({ task, onClick }) {
  return (
    <div className="kanban-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="flex items-center justify-between gap-2" style={{ marginBottom: 'var(--space-2)' }}>
        <PriorityBadge priority={task.priority} />
        {task.review?.status === 'pending' && <span className="badge badge-status-pending">Review</span>}
        {task.review?.status === 'rejected' && <span className="badge badge-status-rejected">Rejected</span>}
      </div>
      <p className="kanban-card__title">{task.title}</p>

      <div className="kanban-card__meta">
        <div className="flex items-center gap-2">
          {(task.assignedTo || []).map((m) => (
            <div key={m._id} className={`avatar avatar-sm avatar-${avatarClass(m)}`} title={m.name}>
              {initialsOf(m)}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-mist">
          <span className="flex items-center gap-1 text-2xs text-mono">
            <MessageSquare size={10} /> {task.comments?.length || 0}
          </span>
          <span className="text-2xs text-mono">{fmtDate(task.dueDate)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Table row ───────────────────────────────────────────────────────────────
function TaskRow({ task, onClick }) {
  return (
    <tr onClick={onClick} style={{ cursor: 'pointer' }}>
      <td>
        <div>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--bone)', marginBottom: 2 }}>{task.title}</p>
          <span className="text-2xs text-mono text-mist">{task.id}</span>
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLOR[task.status] || 'var(--mist)', display: 'inline-block' }} />
          <StatusBadge status={task.status} />
        </div>
        {task.review?.status === 'pending' && <span className="badge badge-status-pending" style={{ marginTop: 4 }}>Awaiting review</span>}
      </td>
      <td><PriorityBadge priority={task.priority} /></td>
      <td>
        <div className="flex items-center gap-1">
          {(task.assignedTo || []).map((a, i) => (
            <div key={i} className={`avatar avatar-sm avatar-${avatarClass(a)}`} title={a.name}>{initialsOf(a)}</div>
          ))}
        </div>
      </td>
      <td>
        {task.assignedBy && (
          <div className="flex items-center gap-2">
            <div className={`avatar avatar-sm avatar-${avatarClass(task.assignedBy)}`}>{initialsOf(task.assignedBy)}</div>
            <span className="text-xs text-mist">{task.assignedBy.name}</span>
          </div>
        )}
      </td>
      <td className="mono" style={{ fontSize: 'var(--text-2xs)', color: 'var(--mist)' }}>{fmtDate(task.dueDate)}</td>
      <td>
        <div className="flex items-center gap-1 text-mist text-2xs text-mono">
          <MessageSquare size={12} /> {task.comments?.length || 0}
        </div>
      </td>
    </tr>
  );
}

// ─── Super Admin: assignments overview ───────────────────────────────────────
function AssignmentsView({ onOpenTask }) {
  const { data, loading } = useApi(() => tasksAPI.getAssignments());
  const assignments = data?.data?.assignments || [];

  if (loading) return <div className="spinner" style={{ margin: '3rem auto' }}></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {assignments.length === 0 && (
        <div className="card"><p className="text-2xs text-mono text-mist">No tasks have been assigned yet.</p></div>
      )}
      {assignments.map((g) => (
        <div className="card" key={g.assigner?._id || 'unknown'} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div className={`avatar avatar-md avatar-${avatarClass(g.assigner)}`}>
              {g.assigner?.name ? g.assigner.name.charAt(0) : '?'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--bone)', fontWeight: 500 }}>{g.assigner?.name || 'Unknown assigner'}</p>
              <p className="text-2xs text-mono text-mist" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Users size={10} /> {g.assigner?.role || '—'} · {g.total} task{g.total === 1 ? '' : 's'} assigned
              </p>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {STATUSES.map((s) =>
                g.statuses[s] ? (
                  <span key={s} className="badge badge-member" style={{ border: `1px solid ${STATUS_COLOR[s]}`, color: STATUS_COLOR[s] }}>
                    {s}: {g.statuses[s]}
                  </span>
                ) : null
              )}
            </div>
          </div>
          <div>
            {g.tasks.map((t) => (
              <div
                key={t._id}
                onClick={() => onOpenTask(t)}
                style={{ padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'background var(--transition-fast)' }}
                className="task-row-hover"
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', fontWeight: 500 }} className="text-truncate">{t.title}</p>
                  <p className="text-2xs text-mono text-mist">{t.id} · Due {fmtDate(t.dueDate)}</p>
                </div>
                <div className="flex items-center gap-1">
                  {(t.assignedTo || []).map((a, i) => (
                    <div key={i} className={`avatar avatar-sm avatar-${avatarClass(a)}`} title={a.name}>{initialsOf(a)}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 130, justifyContent: 'flex-end' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLOR[t.status] || 'var(--mist)', display: 'inline-block' }} />
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main module ─────────────────────────────────────────────────────────────
export default function TasksModule() {
  const { user } = useAuth();
  const [view, setView] = useState('kanban');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [detailTask, setDetailTask] = useState(null);
  const [submitTask, setSubmitTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [reviewing, setReviewing] = useState(false);
  const [toast, setToast] = useState(null);

  const isSuperAdmin = user?.role === 'Super Admin';
  const isPrivileged = ['Super Admin', 'Admin', 'Core Team'].includes(user?.role);

  const { data: tasksData, loading: tasksLoading, refetch: refetchTasks } = useApi(() => tasksAPI.getAll());
  const tasks = tasksData?.data?.tasks || [];

  const { data: usersData } = useApi(() => usersAPI.getAll());
  const members = usersData?.data?.users || [];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const refresh = async () => {
    await refetchTasks();
    // keep detail view in sync
    if (detailTask) {
      try {
        const res = await tasksAPI.getAll();
        const fresh = res.data?.data?.tasks?.find((t) => t._id === detailTask._id);
        if (fresh) setDetailTask(fresh);
      } catch { /* noop */ }
    }
  };

  const filtered = tasks.filter((t) => {
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    return true;
  });

  const groupedByStatus = Object.fromEntries(STATUSES.map((s) => [s, filtered.filter((t) => t.status === s)]));
  const openCount = filtered.filter((t) => t.status !== 'Completed').length;

  const handleAction = async (action, payload) => {
    if (!detailTask) return;
    setReviewing(true);
    try {
      if (action === 'submit') {
        await tasksAPI.submit(detailTask._id, payload);
        showToast('Task submitted for review');
      } else if (action === 'unsubmit') {
        await tasksAPI.unsubmit(detailTask._id);
        showToast('Task marked as incomplete');
      } else if (action === 'approve') {
        await tasksAPI.review(detailTask._id, { action: 'approve' });
        showToast('Task approved');
      } else if (action === 'reject') {
        await tasksAPI.review(detailTask._id, { action: 'reject', note: payload?.note || '' });
        showToast('Task rejected and reopened');
      }
      await refresh();
    } catch (err) {
      showToast(err.response?.data?.message || err.message || 'Action failed');
    } finally {
      setReviewing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {isNewOpen && (
        <NewTaskModal members={members} onClose={() => setIsNewOpen(false)} onCreated={() => { showToast('Task assigned'); refetchTasks(); }} />
      )}
      {detailTask && (
        <TaskDetailModal
          task={detailTask}
          user={user}
          reviewing={reviewing}
          onClose={() => setDetailTask(null)}
          onAction={handleAction}
          openSubmit={() => setSubmitTask(detailTask)}
          openEdit={() => setEditTask(detailTask)}
        />
      )}
      {submitTask && (
        <SubmitModal task={submitTask} onClose={() => setSubmitTask(null)} onDone={(m) => { showToast(m); refresh(); }} />
      )}
      {editTask && (
        <EditTaskModal task={editTask} members={members} onClose={() => setEditTask(null)} onUpdated={() => { showToast('Task updated'); refresh(); }} />
      )}

      {toast && (
        <div className="anim-fade-up" style={{
          position: 'fixed', bottom: 32, right: 32,
          background: 'var(--bone)', color: 'var(--surface-0)',
          padding: '12px 24px', borderRadius: 'var(--radius)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          fontWeight: 500, fontSize: 'var(--text-sm)', zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Check size={16} />
          {toast}
        </div>
      )}

      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Work</p>
          <h1 className="page-header__title">Tasks</h1>
          <p className="page-header__desc">{openCount} open · {tasks.filter((t) => t.status === 'Completed').length} completed</p>
        </div>
        <div className="page-header__actions">
          {isPrivileged && (
            <button className="btn btn-primary btn-sm" onClick={() => setIsNewOpen(true)}><Plus size={14} /> New Task</button>
          )}
        </div>
      </div>

      {/* View switcher + filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="tabs" style={{ borderBottom: 'none' }}>
          {['kanban', 'table', ...(isSuperAdmin ? ['assignments'] : [])].map((v) => (
            <button key={v} className={`tab-btn ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>
              {v === 'assignments' ? 'Assignments' : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        {view !== 'assignments' && (
          <div className="flex items-center gap-2 flex-wrap">
            <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="All">All Priorities</option>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        )}
      </div>

      {view === 'assignments' ? (
        <AssignmentsView onOpenTask={setDetailTask} />
      ) : tasksLoading ? (
        <div className="spinner" style={{ margin: '3rem auto' }}></div>
      ) : (
        <>
          {view === 'kanban' && (
            <div className="kanban-board">
              {STATUSES.map((status) => {
                const colTasks = groupedByStatus[status] || [];
                return (
                  <div className="kanban-col" key={status}>
                    <div className="kanban-col__header">
                      <div className="kanban-col__title">
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLOR[status], flexShrink: 0, display: 'inline-block' }} />
                        {status}
                      </div>
                      <span className="kanban-col__count">{colTasks.length}</span>
                    </div>
                    <div className="kanban-col__body">
                      {colTasks.map((task) => (
                        <TaskCard key={task._id} task={task} onClick={() => setDetailTask(task)} />
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
                    {filtered.map((task) => <TaskRow key={task._id} task={task} onClick={() => setDetailTask(task)} />)}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--surface-border)' }}>
                <span className="text-2xs text-mono text-mist">{filtered.length} tasks</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
