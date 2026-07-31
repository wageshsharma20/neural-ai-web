import React, { useState } from 'react';
import { Plus, Users, CheckCircle, Clock, Search } from 'lucide-react';
import { recruitmentData } from '../data/mockData';
import { SectionHeader } from '../components/shared/Primitives';

export default function RecruitmentModule() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Operations</p>
          <h1 className="page-header__title">Recruitment</h1>
          <p className="page-header__desc">Cycle {recruitmentData.cycle} • {recruitmentData.status === 'active' ? 'Active' : 'Closed'}</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-secondary btn-sm">Configure Cycle</button>
        </div>
      </div>

      <div className="tabs">
        {['overview', 'applications', 'interviews'].map((t) => (
          <button
            key={t}
            className={`tab-btn ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-mist" />
                <span className="text-xs text-mist">Total Applications</span>
              </div>
              <div className="text-2xl text-bone mono font-semibold">{recruitmentData.totalApplications}</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-mist" />
                <span className="text-xs text-mist">Shortlisted</span>
              </div>
              <div className="text-2xl text-cyan mono font-semibold">{recruitmentData.shortlisted}</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-mist" />
                <span className="text-xs text-mist">Interviewed</span>
              </div>
              <div className="text-2xl text-violet mono font-semibold">{recruitmentData.interviewed}</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-mist" />
                <span className="text-xs text-mist">Selected</span>
              </div>
              <div className="text-2xl text-green mono font-semibold">{recruitmentData.selected}</div>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <SectionHeader eyebrow="Timeline" title="Process Stages" />
              <div className="flex flex-col gap-4 mt-4">
                {recruitmentData.stages.map((stage, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: stage.status === 'completed' ? '#5EC26A' : 'var(--surface-3)', border: stage.status === 'completed' ? 'none' : '1px solid var(--surface-border)' }}></div>
                    <div className="flex-1">
                      <div className="text-sm text-bone">{stage.name}</div>
                      <div className="text-2xs text-mono text-mist">{stage.date}</div>
                    </div>
                    <div>
                      <span className={`badge ${stage.status === 'completed' ? 'badge-status-completed' : 'badge-status-pending'}`}>{stage.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <SectionHeader eyebrow="Breakdown" title="Applications by Domain" />
              <div className="flex flex-col gap-4 mt-4">
                {recruitmentData.domains.map(d => {
                  return (
                    <div key={d.name}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-bone">{d.name}</span>
                        <span className="text-xs text-mist">{d.applications}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'applications' && (
        <div className="card empty-state">
           <Search size={32} className="text-mist" />
           <p className="text-mist text-sm">Application viewer UI will go here.</p>
        </div>
      )}
      
      {activeTab === 'interviews' && (
        <div className="card empty-state">
           <Users size={32} className="text-mist" />
           <p className="text-mist text-sm">Interview scheduling and feedback UI will go here.</p>
        </div>
      )}
    </div>
  );
}
