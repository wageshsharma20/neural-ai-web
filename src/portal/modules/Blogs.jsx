import React, { useState } from 'react';
import { Plus, Clock, Eye, Heart, Star, Edit2 } from 'lucide-react';
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

export default function BlogsModule() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');

  const cats = ['All', ...new Set(blogs.map((b) => b.category))];
  const filtered = blogs.filter((b) => {
    const ms = statusFilter === 'All' || b.status === statusFilter;
    const mc = catFilter === 'All' || b.category === catFilter;
    return ms && mc;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Content</p>
          <h1 className="page-header__title">Blogs</h1>
          <p className="page-header__desc">{blogs.filter((b) => b.status === 'published').length} published · {blogs.filter((b) => b.status === 'draft').length} drafts</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Write Blog</button>
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
