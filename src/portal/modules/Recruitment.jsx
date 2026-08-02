import React, { useState } from 'react';
import { Users, CheckCircle, Clock, Search } from 'lucide-react';
import { recruitmentData, recruitmentApplications, recruitmentInterviews } from '../data/mockData';
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
        <div className="card fade-in" style={{ padding: 'var(--space-6)' }}>
          <div className="flex justify-between items-center mb-6">
            <SectionHeader eyebrow="Database" title="Applicant Pool" />
            <div className="flex gap-3">
              <div className="relative">
                <Search size={14} className="text-mist absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search applicants..." className="input pl-9 py-1.5 text-sm w-64" style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', borderRadius: 'var(--radius)' }} />
              </div>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--mist)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontFamily: 'var(--font-mono)' }}>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>Name</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>Roll Number</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {recruitmentApplications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }} className="hover:bg-surface-2 transition-colors">
                    <td style={{ padding: 'var(--space-4)', color: 'var(--bone)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{app.name}</td>
                    <td style={{ padding: 'var(--space-4)', color: 'var(--mist-light)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>{app.rollNumber}</td>
                    <td style={{ padding: 'var(--space-4)', color: 'var(--mist)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>{app.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'interviews' && (
        <div className="card fade-in" style={{ padding: 'var(--space-6)' }}>
          <div className="flex justify-between items-center mb-6">
            <SectionHeader eyebrow="Scheduling" title="Upcoming Interviews" />
            <div className="flex gap-3">
              <div className="relative">
                <Search size={14} className="text-mist absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search schedule..." className="input pl-9 py-1.5 text-sm w-64" style={{ background: 'var(--surface-1)', border: '1px solid var(--surface-border)', color: 'var(--bone)', borderRadius: 'var(--radius)' }} />
              </div>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--mist)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontFamily: 'var(--font-mono)' }}>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>Name</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>Roll Number</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>Phone Number</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>Slot</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>Interviewer (Co-Head)</th>
                </tr>
              </thead>
              <tbody>
                {recruitmentInterviews.map((int) => (
                  <tr key={int.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }} className="hover:bg-surface-2 transition-colors">
                    <td style={{ padding: 'var(--space-4)', color: 'var(--bone)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{int.name}</td>
                    <td style={{ padding: 'var(--space-4)', color: 'var(--mist-light)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>{int.rollNumber}</td>
                    <td style={{ padding: 'var(--space-4)', color: 'var(--mist)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>{int.phone}</td>
                    <td style={{ padding: 'var(--space-4)' }}>
                      <div style={{ color: 'var(--bone)', fontSize: 'var(--text-sm)' }}>{int.date}</div>
                      <div style={{ color: 'var(--mist)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{int.time}</div>
                    </td>
                    <td style={{ padding: 'var(--space-4)' }}>
                      <div className="flex items-center gap-2">
                        <div className="avatar avatar-sm" style={{ background: 'var(--signal-violet-muted)', color: 'var(--signal-violet)' }}>
                          {int.interviewer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span style={{ color: 'var(--bone)', fontSize: 'var(--text-sm)' }}>{int.interviewer}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
