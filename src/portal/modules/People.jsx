import React, { useState } from 'react';
import { Plus, X, Check, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { members, currentUser } from '../data/mockData';
import { RoleBadge } from '../components/shared/Primitives';

const AVATAR_COLOR_MAP = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };

function MemberProfileCard({ member, directReports, onAssignTask, isExpanded, onToggleExpand }) {
  const color = AVATAR_COLOR_MAP[member.role] || 'mist';
  const isSuperAdmin = currentUser.role === 'Super Admin';
  const canRemove = isSuperAdmin && member.id !== currentUser.id;
  
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
          <div className={`avatar avatar-lg avatar-${color}`}>{member.initials}</div>
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
        {directReports > 0 && (
          <button 
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-2 border border-surface-border hover:bg-surface-3 transition-colors"
            onClick={onToggleExpand}
            style={{ cursor: 'pointer' }}
          >
            {isExpanded ? <ChevronUp size={12} className="text-mist" /> : <ChevronDown size={12} className="text-mist" />}
            <span className="text-2xs text-mono text-mist uppercase tracking-wider">
              {directReports} Team
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function OrgNode({ member, allMembers }) {
  const reports = allMembers.filter(m => m.reportsTo === member.id);
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <li>
      <MemberProfileCard 
        member={member} 
        directReports={reports.length} 
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />

      {reports.length > 0 && isExpanded && (
        <ul>
          {reports.map(rep => (
            <OrgNode key={rep.id} member={rep} allMembers={allMembers} />
          ))}
        </ul>
      )}
    </li>
  );
}



export default function PeopleModule() {
  const roots = members.filter(m => !m.reportsTo);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>

      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <p className="page-header__eyebrow">Organization</p>
          <h1 className="page-header__title">Team Hierarchy</h1>
          <p className="page-header__desc">View the society structure and assign tasks across teams.</p>
        </div>
        {currentUser.role === 'Super Admin' && (
          <div className="page-header__actions">
            <button className="btn btn-primary btn-sm"><Plus size={14}/> Add Member</button>
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
            {roots.map(root => (
              <OrgNode key={root.id} member={root} allMembers={members} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
