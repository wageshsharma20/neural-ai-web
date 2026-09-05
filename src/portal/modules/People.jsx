import React, { useState } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { RoleBadge } from '../components/shared/Primitives';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';
import { usersAPI } from '../../services/api';

const AVATAR_COLOR_MAP = {
  'Super Admin': 'magenta',
  'Admin': 'violet',
  'Head': 'violet',
  'Heads': 'violet',
  'Co-Head': 'cyan',
  'Co Heads': 'cyan',
  'Core Team': 'cyan',
  'Member': 'mist',
  'Members': 'mist'
};

// Role rank order, highest first. Adjust labels to exactly match your backend's Role enum.
const ROLE_HIERARCHY = ['Super Admin', 'Admin', 'Co Heads', 'Core Team', 'Member'];

function groupMembersByRole(members) {
  const groups = {};
  ROLE_HIERARCHY.forEach((role) => { groups[role] = []; });

  members.forEach((m) => {
    if (groups[m.role]) {
      groups[m.role].push(m);
    } else {
      // Unknown/unmapped role — bucket into a fallback group at the end
      groups['Other'] = groups['Other'] || [];
      groups['Other'].push(m);
    }
  });

  return groups;
}

function MemberProfileCard({ member, currentUser }) {
  const color = AVATAR_COLOR_MAP[member.role] || 'mist';
  const isSuperAdmin = currentUser?.role === 'Super Admin';
  const canRemove = isSuperAdmin && member._id !== currentUser?._id;

  return (
    <div className="card hover:border-surface-border-hover transition-colors" style={{
      width: '340px',
      padding: 'var(--space-5)',
      background: 'var(--surface-1)',
      border: '1px solid var(--surface-border)',
      borderTop: `3px solid var(--signal-${color})`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }}>
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className={`avatar avatar-lg avatar-${color}`}>{member.name?.charAt(0)}</div>
          <div>
            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--bone)', fontWeight: 600, letterSpacing: 'var(--tracking-tight)' }}>{member.name}</h3>
            <p className="text-xs text-mist mt-1">{member.email}</p>
          </div>
        </div>
        {canRemove && (
          <button className="btn btn-ghost" style={{ padding: '4px', color: 'var(--signal-red)', opacity: 0.7 }} title="Remove Member">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex justify-between items-center">
        <RoleBadge role={member.role} />
      </div>
    </div>
  );
}

// One rank level of the tree — a row of all members at that role, with the next rank nested below
function RoleLevel({ role, members, nextLevels, currentUser }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (members.length === 0 && nextLevels.every(([, m]) => m.length === 0)) {
    return null;
  }

  return (
    <li>
      {members.length > 0 && (
        <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-3)' }}>
          <span className="text-2xs text-mono uppercase tracking-widest text-mist">{role}</span>
          <span className="text-2xs text-mono text-mist">({members.length})</span>
          {nextLevels.some(([, m]) => m.length > 0) && (
            <button
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-2 border border-surface-border hover:bg-surface-3 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ cursor: 'pointer' }}
            >
              {isExpanded ? <ChevronUp size={12} className="text-mist" /> : <ChevronDown size={12} className="text-mist" />}
            </button>
          )}
        </div>
      )}

      <div className="flex gap-4" style={{ flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
        {members.map((member) => (
          <MemberProfileCard key={member._id} member={member} currentUser={currentUser} />
        ))}
      </div>

      {isExpanded && nextLevels.length > 0 && (
        <ul style={{ paddingLeft: 'var(--space-6)', borderLeft: '1px dashed var(--surface-border)' }}>
          <RoleLevel
            role={nextLevels[0][0]}
            members={nextLevels[0][1]}
            nextLevels={nextLevels.slice(1)}
            currentUser={currentUser}
          />
        </ul>
      )}
    </li>
  );
}

function AddMemberModal({ isOpen, onClose, onAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Members',
    department: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await usersAPI.addMember(formData);
      onAdded?.();
      onClose();
      setFormData({ name: '', email: '', password: '', role: 'Members', department: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add member.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Add New Member</h2>
          <button className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close" style={{ padding: 4 }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ display: 'flex' }}>

          <div className="flex-col gap-1" style={{ display: 'flex' }}>
            <label className="text-xs text-mist text-mono tracking-wider uppercase">Full Name</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="flex-col gap-1" style={{ display: 'flex' }}>
            <label className="text-xs text-mist text-mono tracking-wider uppercase">Email Address</label>
            <input
              type="email"
              className="input"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="flex-col gap-1" style={{ display: 'flex' }}>
            <label className="text-xs text-mist text-mono tracking-wider uppercase">Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="flex-col gap-1" style={{ display: 'flex' }}>
            <label className="text-xs text-mist text-mono tracking-wider uppercase">Department</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Web Development"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>

          <div className="flex-col gap-1" style={{ display: 'flex' }}>
            <label className="text-xs text-mist text-mono tracking-wider uppercase">Role</label>
            <select
              className="select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Member">Member</option>
              <option value="Co Heads">Co Heads</option>
              <option value="Heads">Heads</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          {error && (
            <p style={{ color: 'var(--signal-red, red)', fontSize: 'var(--text-xs)' }}>{error}</p>
          )}

          <div className="flex justify-end gap-3" style={{ marginTop: 'var(--space-4)' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PeopleModule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: currentUser } = useAuth();

  const { data, loading } = useApi(() => usersAPI.getAll({ limit: 100 }));
  const members = data?.data?.users || [];

  const grouped = groupMembersByRole(members);
  console.log('ALL MEMBERS:', members.map(m => ({ name: m.name, role: m.role })));
  console.log('GROUPED:', grouped);
  const levels = ROLE_HIERARCHY.map((role) => [role, grouped[role] || []]);

  if (loading) return <div className="spinner" style={{ margin: '3rem auto' }}></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>

      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <p className="page-header__eyebrow">Organization</p>
          <h1 className="page-header__title">Team Hierarchy</h1>
          <p className="page-header__desc">View the society structure and assign tasks across teams.</p>
        </div>
        {currentUser?.role === 'Super Admin' && (
          <div className="page-header__actions">
            <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
              <Plus size={14} /> Add Member
            </button>
          </div>
        )}
      </div>

      <div className="hierarchy-container" style={{
        padding: 'var(--space-8)',
        background: 'var(--surface-0)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        overflowX: 'auto'
      }}>
        <div className="org-tree">
          <ul>
            <RoleLevel
              role={levels[0][0]}
              members={levels[0][1]}
              nextLevels={levels.slice(1)}
              currentUser={currentUser}
            />
          </ul>
        </div>
      </div>

      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}