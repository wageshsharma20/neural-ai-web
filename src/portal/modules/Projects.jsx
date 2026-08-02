import React, { useState } from 'react';
import { Plus, Globe, ExternalLink, Users } from 'lucide-react';
import { projects, members } from '../data/mockData';
import { StatusBadge, SectionHeader, TagList } from '../components/shared/Primitives';

const AVATAR_COLORS = { 'Super Admin': 'magenta', 'Admin': 'violet', 'Core Team': 'cyan', 'Member': 'mist' };

function getMember(id) { return members.find((m) => m.id === id); }

function ProjectCard({ project }) {
  const lead = getMember(project.lead);
  const teamMembers = project.team.map(getMember).filter(Boolean);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xs text-mono text-mist" style={{ marginBottom: 4 }}>{project.id} · {project.category}</p>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--bone)', lineHeight: 1.4 }}>{project.title}</h3>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Description */}
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)', lineHeight: 1.6 }}>{project.description}</p>

      {/* Technologies */}
      <TagList tags={project.technologies} />

      {/* Timeline */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xs text-mono text-mist">Start: </span>
          <span className="text-2xs text-mono text-bone">{project.startDate}</span>
        </div>
        <div>
          <span className="text-2xs text-mono text-mist">Deadline: </span>
          <span className="text-2xs text-mono text-bone">{project.deadline}</span>
        </div>
      </div>

      <hr className="section-rule" />

      {/* Team + links */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {teamMembers.map((m, i) => (
            <div key={i} className={`avatar avatar-sm avatar-${AVATAR_COLORS[m.role] || 'mist'}`} title={m.name}>
              {m.initials}
            </div>
          ))}
          <span className="text-2xs text-mono text-mist" style={{ marginLeft: 6 }}>{teamMembers.length} members</span>
        </div>
        <div className="flex items-center gap-2">
          {project.repo && (
            <a href={`https://${project.repo}`} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
              <Globe size={12} />
            </a>
          )}
          {project.demo && (
            <a href={`https://${project.demo}`} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsModule() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = projects.filter((p) =>
    statusFilter === 'All' || p.status === statusFilter
  );

  const statuses = ['All', 'active', 'completed', 'on_hold'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Build</p>
          <h1 className="page-header__title">Projects</h1>
          <p className="page-header__desc">{projects.filter((p) => p.status === 'active').length} active · {projects.filter((p) => p.status === 'completed').length} completed</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm"><Plus size={14} /> New Project</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === 'All' ? 'All' : s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card">
          <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--mist)', fontSize: 'var(--text-sm)' }}>
            No projects match the selected filter.
          </div>
        </div>
      )}
    </div>
  );
}
