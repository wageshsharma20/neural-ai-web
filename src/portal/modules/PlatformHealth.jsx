import React, { useState, useEffect } from 'react';
import { 
  Activity, Server, Clock, Database, ShieldAlert, Cpu, 
  HardDrive, Key, Globe, Bell, GitBranch
} from 'lucide-react';
import './PlatformHealth.css';

export default function PlatformHealth() {
  const [uptime, setUptime] = useState(0);

  // Mock uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds) => {
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  const initialUptimeSeconds = 42 * 24 * 3600 + 14 * 3600 + 22 * 60 + uptime; // 42 days running

  const SERVICES = [
    { name: 'Core API', icon: Activity, status: 'operational', latency: '42ms', uptime: '99.99%' },
    { name: 'Database', icon: Database, status: 'operational', latency: '12ms', uptime: '99.99%' },
    { name: 'Authentication', icon: Key, status: 'operational', latency: '28ms', uptime: '100.00%' },
    { name: 'Storage CDN', icon: HardDrive, status: 'operational', latency: '18ms', uptime: '99.95%' },
    { name: 'Email Provider', icon: Globe, status: 'operational', latency: '120ms', uptime: '99.90%' },
    { name: 'Notifications', icon: Bell, status: 'degraded', latency: '450ms', uptime: '99.85%' },
  ];

  const DEPLOYMENTS = [
    { id: 'deploy_f3a1', commit: 'update-auth-flow', env: 'Production', status: 'success', time: '2 hours ago' },
    { id: 'deploy_c89b', commit: 'fix-nav-links', env: 'Production', status: 'success', time: '1 day ago' },
    { id: 'deploy_e22d', commit: 'cache-invalidation', env: 'Preview', status: 'error', time: '2 days ago' },
    { id: 'deploy_9a01', commit: 'feat/gallery-upload', env: 'Production', status: 'success', time: '3 days ago' },
  ];

  const INCIDENTS = [
    { title: 'Elevated Latency on Notification Service', status: 'investigating', time: 'Today, 14:30', desc: 'We are investigating reports of delayed push notifications.' },
    { title: 'Database Maintenance', status: 'resolved', time: 'Aug 1, 02:00', desc: 'Scheduled maintenance completed successfully. Downtime was 2m 14s.' },
    { title: 'CDN Edge Node Failure (Frankfurt)', status: 'resolved', time: 'Jul 28, 09:15', desc: 'Traffic rerouted to Paris edge node automatically. No customer impact.' },
  ];

  return (
    <div className="health-dashboard fade-in">
      
      {/* ── Header ── */}
      <div className="page-header" style={{ borderBottom: '1px solid var(--ink-border)', paddingBottom: 'var(--space-5)' }}>
        <div>
          <p className="page-header__eyebrow">Platform Operations</p>
          <h1 className="page-header__title">Health & Monitoring</h1>
          <p className="page-header__desc">Real-time infrastructure metrics and service status.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(46, 204, 212, 0.1)', padding: '6px 12px', borderRadius: '20px' }}>
             <div className="status-dot operational"></div>
             <span className="text-xs text-mono text-cyan">All Core Systems Operational</span>
           </div>
           <span className="text-2xs text-mist text-mono">Uptime: {formatUptime(initialUptimeSeconds)}</span>
        </div>
      </div>

      {/* ── Infrastructure Metrics ── */}
      <div className="health-infra-grid">
        <div className="infra-metric-card">
          <div className="infra-metric-header">
            <span className="infra-metric-title"><Cpu size={16} /> CPU Usage</span>
            <span className="infra-metric-value">24%</span>
          </div>
          <div className="text-xs text-mist">Average across 4 instances</div>
          <div className="infra-progress-bg">
            <div className="infra-progress-fill" style={{ width: '24%', background: 'var(--signal-cyan)' }}></div>
          </div>
        </div>

        <div className="infra-metric-card">
          <div className="infra-metric-header">
            <span className="infra-metric-title"><Server size={16} /> Memory</span>
            <span className="infra-metric-value">4.2<span style={{ fontSize: '0.8rem', color: 'var(--mist)' }}>GB</span></span>
          </div>
          <div className="text-xs text-mist">Of 8.0GB provisioned</div>
          <div className="infra-progress-bg">
            <div className="infra-progress-fill" style={{ width: '52%', background: 'var(--signal-violet)' }}></div>
          </div>
        </div>

        <div className="infra-metric-card">
          <div className="infra-metric-header">
            <span className="infra-metric-title"><Activity size={16} /> Network</span>
            <span className="infra-metric-value">1.4<span style={{ fontSize: '0.8rem', color: 'var(--mist)' }}>MB/s</span></span>
          </div>
          <div className="text-xs text-mist">Egress traffic (p95)</div>
          <div className="infra-progress-bg">
            <div className="infra-progress-fill" style={{ width: '15%', background: 'var(--signal-amber)' }}></div>
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div>
        <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--bone)', marginBottom: 'var(--space-4)' }}>Services</h2>
        <div className="health-services-grid">
          {SERVICES.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="health-service-card">
                <div className="health-service-header">
                  <div className="health-service-title">
                    <Icon size={16} color="var(--mist)" />
                    {s.name}
                  </div>
                  <div className="health-service-status">
                    <div className={`status-dot ${s.status}`}></div>
                    <span style={{ textTransform: 'capitalize' }}>{s.status}</span>
                  </div>
                </div>
                <div className="health-service-metrics">
                  <div className="health-metric">
                    <span className="health-metric-label">Latency</span>
                    <span className="health-metric-value">{s.latency}</span>
                  </div>
                  <div className="health-metric" style={{ alignItems: 'flex-end' }}>
                    <span className="health-metric-label">30d Uptime</span>
                    <span className="health-metric-value">{s.uptime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Section (Logs & Incidents) ── */}
      <div className="grid-12">
        
        {/* Deployments Table */}
        <div className="card col-span-7" style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--bone)' }}>Recent Deployments</h2>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div className="health-table-container">
            <table className="health-table">
              <thead>
                <tr>
                  <th>Deployment</th>
                  <th>Environment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {DEPLOYMENTS.map(dep => (
                  <tr key={dep.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <GitBranch size={14} color="var(--mist)" />
                        <span style={{ fontFamily: 'var(--font-mono)' }}>{dep.commit}</span>
                      </div>
                    </td>
                    <td>{dep.env}</td>
                    <td>
                      <span className={`table-tag ${dep.status}`}>
                        {dep.status === 'success' ? 'Ready' : 'Failed'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--mist)' }}>{dep.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Incident Timeline */}
        <div className="card col-span-5" style={{ padding: 'var(--space-5)' }}>
          <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--bone)', marginBottom: 'var(--space-5)' }}>Incident Timeline</h2>
          <div className="health-timeline">
            {INCIDENTS.map((inc, i) => (
              <div key={i} className="timeline-item">
                <div className={`timeline-dot ${inc.status}`}></div>
                <div className="timeline-time">{inc.time}</div>
                <div className="timeline-title">{inc.title}</div>
                <div className="timeline-desc">{inc.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
