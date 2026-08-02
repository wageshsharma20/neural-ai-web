import React, { useState } from 'react';
import { Plus, Eye, Star, Trash2, Edit2, X, Check } from 'lucide-react';
import { notices, members } from '../data/mockData';
import { StatusBadge } from '../components/shared/Primitives';

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };
function getMember(id) { return members.find((m) => m.id === id); }

const CATEGORY_COLORS = {
  Events: 'signal-violet',
  Recruitment: 'signal-magenta',
  Workshops: 'signal-cyan',
  Academic: 'signal-cyan',
  General: 'mist',
};

function NoticeRow({ notice, onSelect }) {
  const author = getMember(notice.author);

  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => onSelect(notice)}>
      <td>
        <div className="flex items-center gap-2">
          {notice.featured && <Star size={12} style={{ color: 'var(--signal-amber)', flexShrink: 0 }} fill="var(--signal-amber)" />}
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
              <div className={`avatar avatar-sm avatar-${AVATAR_COLORS[author.role]}`}>{author.initials}</div>
              <span className="text-xs text-mist">{author.name}</span>
            </>
          )}
        </div>
      </td>
      <td><StatusBadge status={notice.status} /></td>
      <td className="mono" style={{ fontSize: 'var(--text-2xs)', color: 'var(--mist)' }}>
        {notice.publishedAt || '—'}
      </td>
      <td>
        <div className="flex items-center gap-1 text-mist">
          <Eye size={12} />
          <span className="text-2xs text-mono">{notice.views}</span>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-1">
          <button className="btn btn-ghost btn-sm" style={{ padding: '2px 6px' }}><Edit2 size={12} /></button>
          <button className="btn btn-ghost btn-sm" style={{ padding: '2px 6px' }}><Trash2 size={12} /></button>
        </div>
      </td>
    </tr>
  );
}

function NoticeDetail({ notice, onClose }) {
  if (!notice) return null;
  const author = getMember(notice.author);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist" style={{ marginBottom: 4 }}>{notice.id} · {notice.category}</p>
            <h2 className="modal__title">{notice.title}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-4)' }}>
          <StatusBadge status={notice.status} />
          {notice.featured && (
            <span className="flex items-center gap-1 text-2xs text-mono" style={{ color: 'var(--signal-amber)' }}>
              <Star size={10} fill="var(--signal-amber)" /> Featured
            </span>
          )}
          {notice.publishedAt && (
            <span className="text-2xs text-mono text-mist">{notice.publishedAt}</span>
          )}
        </div>

        {author && (
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-4)' }}>
            <div className={`avatar avatar-sm avatar-${AVATAR_COLORS[author.role]}`}>{author.initials}</div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)' }}>{author.name}</p>
              <p className="text-2xs text-mono text-mist">{author.role}</p>
            </div>
          </div>
        )}

        <hr className="section-rule" style={{ marginBottom: 'var(--space-4)' }} />

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mist)', lineHeight: 1.8 }}>{notice.content}</p>

        <div className="flex gap-2" style={{ marginTop: 'var(--space-5)' }}>
          {notice.status === 'draft' ? (
            <button className="btn btn-primary btn-sm">Publish</button>
          ) : (
            <button className="btn btn-secondary btn-sm">Unpublish</button>
          )}
          <button className="btn btn-secondary btn-sm"><Edit2 size={14} /> Edit</button>
          <button className="btn btn-danger btn-sm" style={{ marginLeft: 'auto' }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function NoticeModal({ onClose }) {
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
                <option value="General">General</option>
                <option value="Events">Events</option>
                <option value="Recruitment">Recruitment</option>
                <option value="Workshops">Workshops</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Date Posted</label>
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
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Detail / Content</label>
            <textarea 
              className="input w-full" 
              placeholder="Write the full notice here..."
              rows={5}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', resize: 'vertical' }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onClose}>
            <Check size={14} /> Create Notice
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

  const filtered = notices.filter((n) => statusFilter === 'All' || n.status === statusFilter);
  const featured = notices.find((n) => n.featured && n.status === 'published');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {selected && <NoticeDetail notice={selected} onClose={() => setSelected(null)} />}
      {isCreating && <NoticeModal onClose={() => setIsCreating(false)} />}

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
            {featured.content}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-mist">
              <Eye size={12} />
              <span className="text-2xs text-mono">{featured.views} views</span>
            </div>
            <span className="text-2xs text-mono text-mist">{featured.publishedAt}</span>
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
              {filtered.map((n) => <NoticeRow key={n.id} notice={n} onSelect={setSelected} />)}
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
