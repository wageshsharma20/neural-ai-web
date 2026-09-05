import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X, Check } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';
import { galleryAPI, uploadAPI } from '../../services/api';
import { StatusBadge } from '../components/shared/Primitives';

const ADMIN_ROLES = ['Super Admin', 'Admin'];
const canManageGallery = (role) => ADMIN_ROLES.includes(role);

const GALLERY_CATEGORIES = ['Events', 'Workshops', 'Hackathons', 'Team', 'Recruitment', 'General'];

function UploadMediaModal({ onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [isPublic, setIsPublic] = useState(false);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (!title.trim() || files.length === 0) {
      setError('Title and at least one image are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Step 1: upload all files to Cloudinary in one request
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));
      const uploadRes = await uploadAPI.gallery(formData);
      const uploadedImages = uploadRes.data.data.images; // [{ url, publicId, width, height, format }]

      // Step 2: create the Gallery document referencing the uploaded images
      await galleryAPI.create({
        title,
        description,
        category,
        isPublic,
        images: uploadedImages,
      });

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while uploading.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <p className="text-2xs text-mono uppercase tracking-widest text-mist mb-1">Content</p>
            <h2 className="modal__title">Upload Media</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Title</label>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. HackNeural 3.0 Winners"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)' }}
            />
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Category</label>
            <select
              className="input w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', appearance: 'none' }}
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Description</label>
            <textarea
              className="input w-full"
              placeholder="Optional description..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', padding: '10px 12px', borderRadius: 'var(--radius)', outline: 'none', width: '100%', fontSize: 'var(--text-sm)', resize: 'vertical' }}
            />
          </div>

          <div>
            <label className="text-xs font-mono text-mist uppercase tracking-wider mb-2 block">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ color: 'var(--bone)', fontSize: 'var(--text-sm)' }}
            />
            {files.length > 0 && (
              <p className="text-2xs text-mist" style={{ marginTop: 6 }}>{files.length} file(s) selected</p>
            )}
          </div>

          <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span className="text-xs text-mist">Make visible on public website</span>
          </label>

          {error && (
            <p style={{ color: 'var(--signal-magenta)', fontSize: 'var(--text-xs)' }}>{error}</p>
          )}
        </div>

        <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-6)' }}>
          <button className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
            <Check size={14} /> {isSubmitting ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GalleryModule() {
  const [filter, setFilter] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const canUpload = canManageGallery(user?.role);

  const { data, loading, refetch } = useApi(() => galleryAPI.getAll());
  const galleries = data?.data?.galleries || [];

  const categories = ['All', ...GALLERY_CATEGORIES];
  const filtered = galleries.filter((g) => filter === 'All' || g.category === filter);

  if (loading) return <div className="spinner" style={{ margin: '3rem auto' }}></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {isUploading && (
        <UploadMediaModal
          onClose={() => setIsUploading(false)}
          onSuccess={() => { setIsUploading(false); refetch(); }}
        />
      )}

      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Content</p>
          <h1 className="page-header__title">Gallery</h1>
          <p className="page-header__desc">Manage society photos and event albums.</p>
        </div>
        <div className="page-header__actions">
          {canUpload && (
            <button className="btn btn-primary btn-sm" onClick={() => setIsUploading(true)}>
              <Upload size={14} /> Upload Media
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            className={`btn btn-sm ${filter === c ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {filtered.map((item) => (
          <div key={item._id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: 160, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--surface-border)', overflow: 'hidden' }}>
              {item.coverImage?.url || item.images?.[0]?.url ? (
                <img
                  src={item.coverImage?.url || item.images[0].url}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <ImageIcon size={32} style={{ color: 'var(--surface-border-hover)' }} />
              )}
            </div>
            <div style={{ padding: 'var(--space-3)' }}>
              <div className="flex items-center justify-between mb-1" style={{ marginBottom: 4 }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xs text-mono text-mist uppercase tracking-wider">{item.category}</span>
                  <StatusBadge status={item.isPublic ? 'public' : 'private'} />
                </div>
                <span className="text-2xs text-mono text-mist">{new Date(item.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--bone)', fontWeight: 500 }}>{item.title}</h3>
              <p className="text-2xs text-mist" style={{ marginTop: 4 }}>{item.imageCount ?? item.images?.length ?? 0} photos</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}