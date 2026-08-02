import React, { useState } from 'react';
import { Plus, Clock, Eye, Heart, Star, Edit2, X, Check } from 'lucide-react';
import { blogs, members } from '../data/mockData';
import { StatusBadge, TagList, SectionHeader } from '../components/shared/Primitives';

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };
function getMember(id) { return members.find((m) => m.id === id); }

const CATEGORY_COLORS = {
  'NLP': 'signal-cyan', 'Deep Learning': 'signal-violet', 'LLMs': 'signal-magenta',
  'Computer Vision': 'signal-cyan', 'Research': 'signal-violet',
};

function BlogCard({ blog }) {
  const author = getMember(blog.author);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {/* Meta */}
      <div className="flex items-center justify-between gap-2">
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)',
          color: `var(--${CATEGORY_COLORS[blog.category] || 'mist'})`,
          border: `1px solid var(--${CATEGORY_COLORS[blog.category] || 'mist'})`,
          padding: '1px 6px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)',
        }}>
          {blog.category}
        </span>
        <div className="flex items-center gap-2">
          {blog.featured && <Star size={12} style={{ color: 'var(--signal-amber)' }} fill="var(--signal-amber)" />}
          <StatusBadge status={blog.status} />
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--bone)', lineHeight: 1.4 }}>
        {blog.title}
      </h3>

      {/* Excerpt */}
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', lineHeight: 1.6 }}>{blog.excerpt}</p>

      {/* Tags */}
      <TagList tags={blog.tags} />

      <hr className="section-rule" />

      {/* Author + stats */}
      <div className="flex items-center justify-between">
        {author && (
          <div className="flex items-center gap-2">
            <div className={`avatar avatar-sm avatar-${AVATAR_COLORS[author.role]}`}>{author.initials}</div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)' }}>{author.name}</p>
              {blog.publishedAt && <p className="text-2xs text-mono text-mist">{blog.publishedAt}</p>}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 text-mist">
          {blog.status === 'published' && (
            <>
              <span className="flex items-center gap-1 text-2xs text-mono">
                <Clock size={10} /> {blog.readTime}
              </span>
              <span className="flex items-center gap-1 text-2xs text-mono">
                <Eye size={10} /> {blog.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-2xs text-mono">
                <Heart size={10} /> {blog.likes}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="btn btn-secondary btn-sm"><Edit2 size={12} /> Edit</button>
        {blog.status === 'draft' ? (
          <button className="btn btn-primary btn-sm">Publish</button>
        ) : (
          <button className="btn btn-ghost btn-sm"><Eye size={12} /> Preview</button>
        )}
      </div>
    </div>
  );
}

function BlogModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 700 }} onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Content</p>
            <h2 className="modal__title">Write Blog</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Heading</label>
            <input 
              type="text" 
              className="input w-full" 
              placeholder="e.g. Understanding Neural Networks"
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Authors</label>
              <input 
                type="text" 
                className="input w-full" 
                placeholder="e.g. Arjun Sharma"
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
              />
            </div>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Category</label>
              <select 
                className="input w-full"
                style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', appearance: 'none' }}
              >
                <option value="NLP">NLP</option>
                <option value="Deep Learning">Deep Learning</option>
                <option value="LLMs">LLMs</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="Research">Research</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Content (Markdown supported)</label>
            <textarea 
              className="input w-full" 
              placeholder="Write the full blog content here..."
              rows={8}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', resize: 'vertical' }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onClose}>
            <Check size={14} /> Submit Blog
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogsModule() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');
  const [isCreating, setIsCreating] = useState(false);

  const cats = ['All', ...new Set(blogs.map((b) => b.category))];
  const filtered = blogs.filter((b) => {
    const ms = statusFilter === 'All' || b.status === statusFilter;
    const mc = catFilter === 'All' || b.category === catFilter;
    return ms && mc;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {isCreating && <BlogModal onClose={() => setIsCreating(false)} />}
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Content</p>
          <h1 className="page-header__title">Blogs</h1>
          <p className="page-header__desc">{blogs.filter((b) => b.status === 'published').length} published · {blogs.filter((b) => b.status === 'draft').length} drafts</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm" onClick={() => setIsCreating(true)}><Plus size={14} /> Write Blog</button>
        </div>
      </div>

      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
        {[
          { label: 'Total Views', value: blogs.reduce((a, b) => a + b.views, 0).toLocaleString() },
          { label: 'Total Likes', value: blogs.reduce((a, b) => a + b.likes, 0) },
          { label: 'Authors', value: new Set(blogs.map((b) => b.author)).size },
        ].map((s) => (
          <div key={s.label} className="card card-sm" style={{ textAlign: 'center' }}>
            <div className="text-mono" style={{ fontSize: 'var(--text-2xl)', color: 'var(--bone)', fontWeight: 600 }}>{s.value}</div>
            <div className="text-2xs text-mono uppercase tracking-wider text-mist">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {['All', 'published', 'draft'].map((s) => (
            <button key={s} className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setStatusFilter(s)}>
              {s === 'All' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <select className="select" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          {cats.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid-3">
        {filtered.map((b) => <BlogCard key={b.id} blog={b} />)}
      </div>
    </div>
  );
}
