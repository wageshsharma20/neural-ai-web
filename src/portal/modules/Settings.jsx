import React, { useState } from 'react';
import { 
  Save, User, Bell, Shield, Laptop, 
  Smartphone, MessageSquare, Key, Fingerprint
} from 'lucide-react';
import { SectionHeader } from '../components/shared/Primitives';
import './Settings.css';
import { currentUser } from '../../data/mockData';

// Custom Toggle Switch Component
const Toggle = ({ checked, onChange }) => (
  <button 
    type="button" 
    className="toggle-switch" 
    role="switch" 
    aria-checked={checked} 
    onClick={() => onChange(!checked)}
  >
    <span className="toggle-knob" />
  </button>
);

export default function SettingsModule() {
  const [activeTab, setActiveTab] = useState('account');
  
  // Notification States
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSlack, setNotifSlack] = useState(false);
  const [notifUpdates, setNotifUpdates] = useState(true);
  
  // Security States
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="settings-layout fade-in">
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Preferences</p>
          <h1 className="page-header__title">Settings</h1>
          <p className="page-header__desc">Manage your personal account, notifications, and security preferences.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm"><Save size={14} /> Save Changes</button>
        </div>
      </div>

      <div className="grid-12">
        {/* ── Settings Sidebar ── */}
        <div className="col-span-3">
          <div className="settings-nav">
            <button 
              className={`settings-nav-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <User size={16} /> Account Details
            </button>
            <button 
              className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={16} /> Notifications
            </button>
            <button 
              className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={16} /> Security
            </button>
          </div>
        </div>

        {/* ── Content Area ── */}
        <div className="col-span-9" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* ACCOUNT TAB */}
          {activeTab === 'account' && (
            <div className="settings-card fade-in">
              <SectionHeader eyebrow="Personal" title="Account Profile" />
              
              <div style={{ marginTop: 'var(--space-6)' }}>
                {/* Avatar Section */}
                <div className="avatar-upload">
                  <div className="avatar-preview">
                    {currentUser.initials}
                  </div>
                  <div className="avatar-actions">
                    <button className="btn btn-outline btn-sm">Change Avatar</button>
                    <span className="avatar-hint">JPG, GIF or PNG. 1MB max.</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid-2" style={{ gap: 'var(--space-5)' }}>
                  <div className="settings-form-group">
                    <label className="settings-label">Full Name</label>
                    <input type="text" className="settings-input" defaultValue={currentUser.name} />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-label">Email Address</label>
                    <input type="email" className="settings-input" defaultValue="a.sharma@dtu.ac.in" disabled />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: 'var(--space-5)' }}>
                  <div className="settings-form-group">
                    <label className="settings-label">Role</label>
                    <input type="text" className="settings-input" defaultValue={currentUser.role} disabled />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-label">Department</label>
                    <input type="text" className="settings-input" defaultValue="Computer Engineering" />
                  </div>
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">Bio</label>
                  <textarea 
                    className="settings-input settings-textarea" 
                    defaultValue="Passionate about Deep Learning and distributed systems. Leading the core technical team for Neural AI's flagship projects." 
                  />
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <>
              <div className="settings-card fade-in">
                <SectionHeader eyebrow="Preferences" title="Communication" />
                <div style={{ marginTop: 'var(--space-6)' }}>
                  <div className="settings-toggle-row">
                    <div className="toggle-info">
                      <span className="toggle-title">Email Digests</span>
                      <span className="toggle-desc">Receive a weekly summary of tasks, events, and society updates.</span>
                    </div>
                    <Toggle checked={notifEmail} onChange={setNotifEmail} />
                  </div>
                  <div className="settings-toggle-row">
                    <div className="toggle-info">
                      <span className="toggle-title">Push Notifications</span>
                      <span className="toggle-desc">Real-time alerts for direct mentions and critical task updates.</span>
                    </div>
                    <Toggle checked={notifPush} onChange={setNotifPush} />
                  </div>
                  <div className="settings-toggle-row">
                    <div className="toggle-info">
                      <span className="toggle-title">Product Updates</span>
                      <span className="toggle-desc">Hear about new features and platform improvements.</span>
                    </div>
                    <Toggle checked={notifUpdates} onChange={setNotifUpdates} />
                  </div>
                </div>
              </div>

              <div className="settings-card fade-in" style={{ animationDelay: '50ms' }}>
                <SectionHeader eyebrow="Integrations" title="Webhooks & Chat" />
                <div style={{ marginTop: 'var(--space-6)' }}>
                  <div className="settings-toggle-row">
                    <div className="toggle-info">
                      <span className="toggle-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MessageSquare size={16} color="var(--signal-cyan)" /> Slack Integration</span>
                      <span className="toggle-desc">Send activity alerts and deployment logs directly to your Slack workspace.</span>
                    </div>
                    <Toggle checked={notifSlack} onChange={setNotifSlack} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <>
              <div className="settings-card fade-in">
                <SectionHeader eyebrow="Authentication" title="Security Details" />
                <div style={{ marginTop: 'var(--space-6)' }}>
                  <div className="settings-form-group">
                    <label className="settings-label">Current Password</label>
                    <input type="password" className="settings-input" placeholder="••••••••" />
                  </div>
                  <div className="grid-2" style={{ gap: 'var(--space-5)' }}>
                    <div className="settings-form-group">
                      <label className="settings-label">New Password</label>
                      <input type="password" className="settings-input" placeholder="••••••••" />
                    </div>
                    <div className="settings-form-group">
                      <label className="settings-label">Confirm New Password</label>
                      <input type="password" className="settings-input" placeholder="••••••••" />
                    </div>
                  </div>
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <button className="btn btn-outline btn-sm"><Key size={14} /> Update Password</button>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--ink-border)' }}>
                  <div className="settings-toggle-row" style={{ padding: 0, border: 'none' }}>
                    <div className="toggle-info">
                      <span className="toggle-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Fingerprint size={16} color="var(--signal-violet)" /> Two-Factor Authentication (2FA)</span>
                      <span className="toggle-desc">Add an extra layer of security to your account using an authenticator app.</span>
                    </div>
                    <Toggle checked={twoFactor} onChange={setTwoFactor} />
                  </div>
                </div>
              </div>

              <div className="card fade-in" style={{ animationDelay: '50ms' }}>
                <SectionHeader eyebrow="Access" title="Active Sessions" />
                <p className="text-xs text-mist" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                  These devices currently have active sessions. If you recognize an unfamiliar device, revoke its access immediately.
                </p>
                
                <div className="session-list">
                  <div className="session-item">
                    <div className="session-icon"><Laptop size={20} /></div>
                    <div className="session-details">
                      <div className="session-device">MacBook Pro (M2) <span className="session-badge">Current</span></div>
                      <div className="session-meta">Delhi, India • Chrome (macOS) • Active now</div>
                    </div>
                  </div>
                  
                  <div className="session-item">
                    <div className="session-icon"><Smartphone size={20} /></div>
                    <div className="session-details">
                      <div className="session-device">iPhone 14 Pro</div>
                      <div className="session-meta">Delhi, India • Safari (iOS) • Last active 2 hours ago</div>
                    </div>
                    <button className="session-action">Revoke</button>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
