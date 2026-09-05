import React, { useState, useEffect } from 'react';
import { Plus, Clock, Heart, Star, X, Check, Trash2, Send, ShieldCheck, Ban } from 'lucide-react';
import { StatusBadge, RoleBadge, TagList } from '../components/shared/Primitives';
import { useApi, useMutation } from '../../hooks/useApi';
import { blogsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist', 'Co Heads': 'cyan' };

const CATEGORY_COLORS = {
  'NLP': 'signal-cyan', 'Deep Learning': 'signal-violet', 'LLMs': 'signal-magenta',
  'Computer Vision': 'signal-cyan', 'Research': 'signal-violet',
};

function SubmittedBy({ blog }) {
  const author = blog.author;
  const isPending = blog.status === 'pending';
  const date = isPending
    ? (blog.submittedAt || blog.createdAt)
    : (blog.publishedAt || blog.createdAt);

  return (
    <div className="flex items-center gap-2">
      {author && (
        <>
          <div className={`avatar avatar-sm avatar-${AVATAR_COLORS[author.role] || 'mist'}`}>{author.name?.charAt(0)}</div>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--bone)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              {author.name}
              <RoleBadge role={author.role} />
            </p>
            {date && (
              <p className="text-2xs text-mono text-mist">
                {isPending ? 'Submitted for review' : blog.status === 'rejected' ? 'Submitted on' : 'Published'} · {new Date(date).toLocaleDateString('en-IN')}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ReviewNote({ blog }) {
  if (blog.status === 'rejected') {
    return (
      <div style={{
        background: 'rgba(224, 90, 90, 0.08)', border: '1px solid rgba(224, 90, 90, 0.3)',
        borderRadius: 'var(--radius)', padding: 'var(--space-3)', fontSize: 'var(--text-xs)',
        color: '#E05A5A', lineHeight: 1.5,
      }}>
        <strong>Rejected{blog.reviewedBy?.name ? ` by ${blog.reviewedBy.name}` : ''}:</strong>{' '}
        {blog.reviewNote || 'No feedback provided.'}
      </div>
    );
  }
  if (blog.status === 'pending' && blog.reviewedBy) {
    return (
      <p className="text-2xs text-mono text-mist">
        Resubmitted after review by {blog.reviewedBy.name} — awaiting fresh review
      </p>
    );
  }
  if (blog.status === 'published' && blog.reviewedBy) {
    return (
      <p className="text-2xs text-mono text-mist">
        Approved by {blog.reviewedBy.name}{blog.reviewedAt ? ` · ${new Date(blog.reviewedAt).toLocaleDateString('en-IN')}` : ''}
      </p>
    );
  }
  return null;
}

function BlogCard({ blog, currentUser, onDelete, onSubmit, onReview, onPublish, onUnpublish }) {
  const author = blog.author;
  const isFeatured = blog.isFeatured || blog.featured;
  const currentUserId = currentUser?._id?.toString?.() || '';
  const isAuthor = author?._id?.toString?.() === currentUserId;
  const role = currentUser?.role;
  const isSuperAdmin = role === 'Super Admin';
  const isAdmin = role === 'Admin';
  const canReview = (isSuperAdmin || isAdmin) && !isAuthor;

  const canDelete = isAuthor || isSuperAdmin || isAdmin;

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
          {isFeatured && <Star size={12} style={{ color: 'var(--signal-amber)' }} fill="var(--signal-amber)" />}
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

      {/* Rejection / reviewer feedback */}
      <ReviewNote blog={blog} />

      <hr className="section-rule" />

      {/* Who submitted the blog + stats */}
      <div className="flex items-center justify-between">
        <SubmittedBy blog={blog} />
        <div className="flex items-center gap-3 text-mist">
          {blog.status === 'published' && (
            <>
              <span className="flex items-center gap-1 text-2xs text-mono">
                <Clock size={10} /> {blog.readTime || '5m'}
              </span>
              <span className="flex items-center gap-1 text-2xs text-mono">
                <Heart size={10} /> {blog.likeCount || 0}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {canDelete && (
          <button className="btn btn-secondary btn-sm" onClick={() => onDelete(blog._id)} title="Delete"><Trash2 size={12} /></button>
        )}

        {blog.status === 'pending' && canReview && (
          <button className="btn btn-primary btn-sm" onClick={() => onReview(blog)}>
            <ShieldCheck size={12} /> Review
          </button>
        )}

        {(blog.status === 'draft' || blog.status === 'rejected') && isAuthor && !isSuperAdmin && (
          <button className="btn btn-primary btn-sm" onClick={() => onSubmit(blog._id)}>
            <Send size={12} /> Submit for Review
          </button>
        )}

        {(blog.status === 'draft' || blog.status === 'rejected') && isSuperAdmin && (
          <button className="btn btn-primary btn-sm" onClick={() => onPublish(blog._id)}>
            <Check size={12} /> Publish
          </button>
        )}

        {blog.status === 'published' && isSuperAdmin && (
          <button className="btn btn-secondary btn-sm" onClick={() => onUnpublish(blog._id)}>
            <Ban size={12} /> Unpublish
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Review modal: shows full blog context + who submitted it ─────────────────
function ReviewModal({ blogId, onClose, onReview }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { mutate: review } = useMutation((data) => blogsAPI.review(blogId, data));

  useEffect(() => {
    let cancelled = false;
    blogsAPI.getById(blogId)
      .then((res) => { if (!cancelled) setBlog(res.data.data.blog); })
      .catch(() => { if (!cancelled) alert('Failed to load blog for review'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [blogId]);

  const handleReview = async (action) => {
    if (action === 'reject' && !note.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }
    setSubmitting(true);
    try {
      await review({ action, note: note.trim() });
      onReview(action);
    } catch {
      alert('Review failed. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 760 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Review Queue</p>
            <h2 className="modal__title">Review Blog</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        {loading ? (
          <div className="spinner" style={{ margin: '3rem auto' }}></div>
        ) : blog ? (
          <>
            {/* Who submitted this blog */}
            <div className="flex items-center gap-3" style={{
              background: 'var(--surface-1)', border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
            }}>
              <div className={`avatar avatar-md avatar-${AVATAR_COLORS[blog.author?.role] || 'mist'}`}>{blog.author?.name?.charAt(0)}</div>
              <div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--bone)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {blog.author?.name}
                  <RoleBadge role={blog.author?.role} />
                </p>
                <p className="text-2xs text-mono text-mist">
                  Submitted for review · {new Date(blog.submittedAt || blog.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Blog context */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div>
                <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Title</p>
                <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--bone)', fontWeight: 600 }}>{blog.title}</h3>
              </div>
              <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
                <div>
                  <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Category</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--signal-cyan)' }}>{blog.category}</p>
                </div>
                <div>
                  <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Tags</p>
                  <TagList tags={blog.tags} />
                </div>
              </div>
              <div>
                <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Excerpt</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)' }}>{blog.excerpt}</p>
              </div>
              <div>
                <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Content</p>
                <div style={{
                  background: 'var(--surface-1)', border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius)', padding: 'var(--space-4)', maxHeight: 260, overflowY: 'auto',
                  fontSize: 'var(--text-xs)', color: 'var(--bone)', whiteSpace: 'pre-wrap', lineHeight: 1.7, fontFamily: 'var(--font-mono)',
                }}>
                  {blog.content}
                </div>
              </div>
            </div>

            {/* Review note */}
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Feedback / Reason (required for rejection)</label>
              <textarea
                className="input w-full"
                placeholder="e.g. Please add references, fix formatting, or include more technical depth..."
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
              <button className="btn btn-danger" onClick={() => handleReview('reject')} disabled={submitting}>
                <Ban size={14} /> Reject
              </button>
              <button className="btn btn-primary" onClick={() => handleReview('approve')} disabled={submitting}>
                <Check size={14} /> {submitting ? 'Submitting...' : 'Approve & Publish'}
              </button>
            </div>
          </>
        ) : (
          <p className="text-mist" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>Blog not found.</p>
        )}
      </div>
    </div>
  );
}

function BlogModal({ onClose, onSuccess, userRole }) {
  const [formData, setFormData] = useState({ title: '', category: 'NLP', content: '', excerpt: '', status: 'draft' });
  const { mutate: createBlog, loading } = useMutation((data) => blogsAPI.create(data));

  const handleSubmit = async () => {
    try {
      await createBlog(formData);
      onSuccess();
    } catch {
      alert('Error creating blog');
    }
  };

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
          {userRole !== 'Super Admin' && (
            <div style={{
              background: 'var(--signal-amber-muted)', border: '1px solid var(--signal-amber)',
              borderRadius: 'var(--radius)', padding: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--signal-amber)',
            }}>
              Your blog will be sent to the Admin / Super Admin for review before it is published.
            </div>
          )}
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Heading</label>
            <input 
              type="text" 
              className="input w-full" 
              placeholder="e.g. Understanding Neural Networks"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Excerpt</label>
              <input 
                type="text" 
                className="input w-full" 
                placeholder="Short description..."
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Category</label>
              <select 
                className="input w-full"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={{ appearance: 'none' }}
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
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : <><Check size={14} /> Submit Blog</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogsModule() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');
  const [isCreating, setIsCreating] = useState(false);
  const [reviewTarget, setReviewTarget] = useState(null);

  const { data, loading, refetch } = useApi(() => blogsAPI.getAll());
  const blogs = data?.data?.blogs || [];

  const { mutate: updateBlog } = useMutation((id, updateData) => blogsAPI.update(id, updateData));
  const { mutate: deleteBlog } = useMutation((id) => blogsAPI.remove(id));
  const { mutate: submitBlog } = useMutation((id) => blogsAPI.submit(id));

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(id);
      refetch();
    }
  };

  const handleSubmitForReview = async (id) => {
    try {
      await submitBlog(id);
      refetch();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to submit blog for review');
    }
  };

  const handleReviewDone = async () => {
    setReviewTarget(null);
    refetch();
  };

  const handlePublish = async (id) => {
    await updateBlog(id, { status: 'published' });
    refetch();
  };

  const handleUnpublish = async (id) => {
    await updateBlog(id, { status: 'draft' });
    refetch();
  };

  const cats = ['All', ...new Set(blogs.map((b) => b.category))];
  const filtered = blogs.filter((b) => {
    const ms = statusFilter === 'All' || b.status === statusFilter;
    const mc = catFilter === 'All' || b.category === catFilter;
    return ms && mc;
  });

  if (loading) return <div className="spinner" style={{ margin: '3rem auto' }}></div>;

  const publishedCount = blogs.filter((b) => b.status === 'published').length;
  const pendingCount = blogs.filter((b) => b.status === 'pending').length;
  const draftCount = blogs.filter((b) => b.status === 'draft').length;
  const authorCount = new Set(blogs.map((b) => b.author?._id?.toString?.())).size;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {isCreating && (
        <BlogModal
          onClose={() => setIsCreating(false)}
          onSuccess={() => { setIsCreating(false); refetch(); }}
          userRole={user?.role}
        />
      )}
      {reviewTarget && (
        <ReviewModal blogId={reviewTarget._id} onClose={() => setReviewTarget(null)} onReview={handleReviewDone} />
      )}
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Content</p>
          <h1 className="page-header__title">Blogs</h1>
          <p className="page-header__desc">
            {publishedCount} published · {pendingCount} awaiting review · {draftCount} drafts
          </p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm" onClick={() => setIsCreating(true)}><Plus size={14} /> Write Blog</button>
        </div>
      </div>

      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
        {[
          { label: 'Published', value: publishedCount, color: 'var(--signal-cyan)' },
          { label: 'Awaiting Review', value: pendingCount, color: 'var(--signal-amber)' },
          { label: 'Authors', value: authorCount, color: 'var(--signal-violet)' },
        ].map((s) => (
          <div key={s.label} className="card card-sm" style={{ textAlign: 'center' }}>
            <div className="text-mono" style={{ fontSize: 'var(--text-2xl)', color: s.color, fontWeight: 600 }}>{s.value}</div>
            <div className="text-2xs text-mono uppercase tracking-wider text-mist">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {['All', 'pending', 'published', 'draft', 'rejected'].map((s) => (
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
        {filtered.map((b) => (
          <BlogCard
            key={b._id}
            blog={b}
            currentUser={user}
            onDelete={handleDelete}
            onSubmit={handleSubmitForReview}
            onReview={setReviewTarget}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
          />
        ))}
      </div>
    </div>
  );
}
