import React, { useState } from 'react';
import { Users, CheckCircle, Clock, Search } from 'lucide-react';
import { SectionHeader, StatusBadge } from '../components/shared/Primitives';
import { useApi, useMutation } from '../../hooks/useApi';
import { recruitmentAPI } from '../../services/api';

export default function RecruitmentModule() {
  const [activeTab, setActiveTab] = useState('overview');

  const { data: statsData, loading: statsLoading } = useApi(() => recruitmentAPI.getStats());
  const { data: appsData, loading: appsLoading } = useApi(() => recruitmentAPI.getApplications());

  const recruitmentData = statsData?.data || { totalApplications: 0, byStatus: [], byDomain: [] };
  const recruitmentApplications = appsData?.data?.applications || [];

  const byStatus = (status) => recruitmentData.byStatus?.find(s => s._id === status)?.count || 0;

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
                <span className="text-xs text-mist">Under Review</span>
              </div>
              <div className="text-2xl text-cyan mono font-semibold">{byStatus('under_review')}</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-mist" />
                <span className="text-xs text-mist">Interviewed</span>
              </div>
              <div className="text-2xl text-violet mono font-semibold">{byStatus('interviewed')}</div>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-mist" />
                <span className="text-xs text-mist">Accepted</span>
              </div>
              <div className="text-2xl text-green mono font-semibold">{byStatus('accepted')}</div>
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
                {recruitmentData.byDomain?.map(d => {
                  return (
                    <div key={d._id}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-bone">{d._id}</span>
                        <span className="text-xs text-mist">{d.count}</span>
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
                  <tr key={app._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }} className="hover:bg-surface-2 transition-colors">
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
                {recruitmentApplications.filter(a => a.status === 'interviewed' || a.status === 'under_review').map((int) => (
                  <tr key={int._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }} className="hover:bg-surface-2 transition-colors">
                    <td style={{ padding: 'var(--space-4)', color: 'var(--bone)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{int.name}</td>
                    <td style={{ padding: 'var(--space-4)', color: 'var(--mist-light)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>{int.rollNumber}</td>
                    <td style={{ padding: 'var(--space-4)', color: 'var(--mist)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>{int.phone}</td>
                    <td style={{ padding: 'var(--space-4)' }}>
                      <div style={{ color: 'var(--bone)', fontSize: 'var(--text-sm)' }}>Pending Scheduling</div>
                    </td>
                    <td style={{ padding: 'var(--space-4)' }}>
                      <div className="flex items-center gap-2">
                        <span style={{ color: 'var(--bone)', fontSize: 'var(--text-sm)' }}>TBA</span>
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
