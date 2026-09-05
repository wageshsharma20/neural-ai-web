import React, { useState, useEffect } from 'react';
import { Plus, Eye, Star, Trash2, Edit2, X, Check } from 'lucide-react';
import { StatusBadge } from '../components/shared/Primitives';
import { useApi, useMutation } from '../../hooks/useApi';
import { noticesAPI } from '../../services/api';

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };

const CATEGORY_COLORS = {
  Events: 'signal-violet',
  Recruitment: 'signal-magenta',
  Workshops: 'signal-cyan',
  Academic: 'signal-cyan',
  General: 'mist',
};

function NoticeRow({ notice, onSelect, onDelete }) {
  const author = notice.createdBy;
  const dateStr = new Date(notice.publishedAt || notice.createdAt).toLocaleDateString('en-IN');

  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => onSelect(notice)}>
      <td>
        <div className="flex items-center gap-2">
          {notice.isPinned && <Star size={12} style={{ color: 'var(--signal-amber)', flexShrink: 0 }} fill="var(--signal-amber)" />}
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--bone)', lineHeight: 1.4 }}>{notice.title}</p>
        </div>
      </td>
      <td>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)',
          color: `var(--${CATEGORY_COLORS[notice.category] || 'mist'})`,
          border: `1px solid var(--${CATEGORY_COLORS[notice.category] || 'mist'})`,
          padding: '1px 6px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)',
        }}>
          {notice.category}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {author && (
            <>
              <div className={`avatar avatar-sm avatar-${AVATAR_COLORS[author.role] || 'mist'}`}>{author.name?.charAt(0)}</div>
              <span className="text-xs text-mist">{author.name}</span>
            </>
          )}
        </div>
      </td>
      <td><StatusBadge status={notice.status} /></td>
      <td className="mono" style={{ fontSize: 'var(--text-2xs)', color: 'var(--mist)' }}>
        {dateStr}
      </td>
      <td>
        <div className="flex items-center gap-1">
          <button className="btn btn-ghost btn-sm" style={{ padding: '2px 6px' }} onClick={(e) => { e.stopPropagation(); onDelete(notice._id); }}><Trash2 size={12} /></button>
        </div>
      </td>
    </tr>
  );
}

function NoticeDetail({ notice, onClose, onUpdate, onDelete }) {
  if (!notice) return null;
  const author = notice.createdBy;
  const dateStr = new Date(notice.publishedAt || notice.createdAt).toLocaleDateString('en-IN');
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>{notice.category}</p>
            <h2 className="modal__title">{notice.title}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-4)' }}>
          <StatusBadge status={notice.status} />
          {notice.isPinned && (
            <span className="flex items-center gap-1 text-2xs text-mono" style={{ color: 'var(--signal-amber)' }}>
              <Star size={10} fill="var(--signal-amber)" /> Pinned
            </span>
          )}
          <span className="text-2xs text-mono text-mist">{dateStr}</span>
        </div>

        {author && (
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-4)' }}>
            <div className={`avatar avatar-sm avatar-${AVATAR_COLORS[author.role] || 'mist'}`}>{author.name?.charAt(0)}</div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)' }}>{author.name}</p>
              <p className="text-2xs text-mono text-mist">{author.role}</p>
            </div>
          </div>
        )}

        <hr className="section-rule" style={{ marginBottom: 'var(--space-4)' }} />

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mist)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{notice.description}</p>

        <div className="flex gap-2" style={{ marginTop: 'var(--space-5)' }}>
          {notice.status === 'draft' ? (
            <button className="btn btn-primary btn-sm" onClick={() => onUpdate(notice._id, { status: 'published' })}>Publish</button>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => onUpdate(notice._id, { status: 'draft' })}>Unpublish</button>
          )}
          <button className="btn btn-danger btn-sm" style={{ marginLeft: 'auto' }} onClick={() => onDelete(notice._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

const ROLES = ['Super Admin', 'Admin', 'Core Team', 'Member', 'Co Heads'];

function NoticeModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({ title: '', category: 'General', description: '', status: 'draft' });
  const [visibleRoles, setVisibleRoles] = useState([]); // empty = All
  const { mutate: createNotice, loading } = useMutation((data) => noticesAPI.create(data));

  const isAllSelected = visibleRoles.length === 0;

  const toggleAll = () => {
    setVisibleRoles([]); // clears back to "All"
  };

  const toggleRole = (role) => {
    setVisibleRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async () => {
    try {
      await createNotice({ ...formData, visibleRoles });
      onSuccess();
    } catch (e) {
      alert('Error creating notice');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Notice Board</p>
            <h2 className="modal__title">New Notice</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Heading</label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. Recruitment Drive 2026"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Category</label>
              <select
                className="input w-full"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', appearance: 'none' }}
              >
                <option value="General">General</option>
                <option value="Events">Events</option>
                <option value="Recruitment">Recruitment</option>
                <option value="Workshops">Workshops</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Status</label>
              <select
                className="input w-full"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', appearance: 'none' }}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Visible To</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={toggleAll}
                className={`btn btn-sm ${isAllSelected ? 'btn-primary' : 'btn-secondary'}`}
              >
                All
              </button>
              {ROLES.map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => toggleRole(role)}
                  className={`btn btn-sm ${visibleRoles.includes(role) ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Detail / Content</label>
            <textarea
              className="input w-full"
              placeholder="Write the full notice here..."
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', resize: 'vertical' }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating...' : <><Check size={14} /> Create Notice</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NoticesModule() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data, loading, refetch } = useApi(() => noticesAPI.getAll());
  const notices = data?.data?.notices || [];

  const { mutate: updateNotice } = useMutation((id, updateData) => noticesAPI.update(id, updateData));
  const { mutate: deleteNotice } = useMutation((id) => noticesAPI.remove(id));

  const handleUpdate = async (id, updateData) => {
    await updateNotice(id, updateData);
    setSelected(null);
    refetch();
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      await deleteNotice(id);
      setSelected(null);
      refetch();
    }
  };

  const filtered = notices.filter((n) => statusFilter === 'All' || n.status === statusFilter);
  const featured = notices.find((n) => n.isPinned && n.status === 'published');

  if (loading) return <div className="spinner" style={{ margin: '3rem auto' }}></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {selected && <NoticeDetail notice={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} onDelete={handleDelete} />}
      {isCreating && <NoticeModal onClose={() => setIsCreating(false)} onSuccess={() => { setIsCreating(false); refetch(); }} />}

      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Communication</p>
          <h1 className="page-header__title">Notice Board</h1>
          <p className="page-header__desc">{notices.filter((n) => n.status === 'published').length} published · {notices.filter((n) => n.status === 'draft').length} drafts</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm" onClick={() => setIsCreating(true)}><Plus size={14} /> New Notice</button>
        </div>
      </div>

      {/* Featured notice */}
      {featured && (
        <div className="card" style={{ borderColor: 'var(--signal-violet)', background: 'var(--signal-violet-muted)' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-2)' }}>
            <Star size={12} style={{ color: 'var(--signal-amber)' }} fill="var(--signal-amber)" />
            <span className="text-2xs text-mono uppercase tracking-widest text-mist">Featured Notice</span>
          </div>
          <h3 style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--bone)', letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-2)' }}>
            {featured.title}
          </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mist)', lineHeight: 1.7, marginBottom: 'var(--space-3)' }}>
            {featured.description}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-2xs text-mono text-mist">{new Date(featured.publishedAt).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-2">
        {['All', 'published', 'draft'].map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === 'All' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Published</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => <NoticeRow key={n._id} notice={n} onSelect={setSelected} onDelete={handleDelete} />)}
            </tbody>
          </table>
        </div>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--surface-border)' }}>
          <span className="text-2xs text-mono text-mist">{filtered.length} notices</span>
        </div>
      </div>
    </div>
  );
}
