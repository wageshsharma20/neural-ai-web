import React from 'react';
import { Settings2, Save, User, Bell, Shield, Paintbrush } from 'lucide-react';
import { SectionHeader } from '../components/shared/Primitives';

export default function SettingsModule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Account</p>
          <h1 className="page-header__title">Settings</h1>
          <p className="page-header__desc">Manage your account preferences and society configurations.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm"><Save size={14} /> Save Changes</button>
        </div>
      </div>

      <div className="grid-12">
        {/* Settings nav sidebar */}
        <div className="col-span-3">
          <div className="card" style={{ padding: 'var(--space-2)' }}>
            <div className="sidebar-nav__item active"><User size={16} /> Account</div>
            <div className="sidebar-nav__item"><Building2 size={16} /> Society Profile</div>
            <div className="sidebar-nav__item"><Paintbrush size={16} /> Appearance</div>
            <div className="sidebar-nav__item"><Bell size={16} /> Notifications</div>
            <div className="sidebar-nav__item"><Shield size={16} /> Security</div>
          </div>
        </div>

        {/* Content area */}
        <div className="col-span-9" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div className="card">
            <SectionHeader eyebrow="Configuration" title="Society Profile" />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <div>
                <label className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Society Name</label>
                <input type="text" className="input" defaultValue="Neural AI" />
              </div>
              
              <div>
                <label className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Short Description</label>
                <textarea className="input" rows={3} defaultValue="The official Artificial Intelligence Society of Delhi Technological University (DTU)." />
              </div>

              <div className="grid-2">
                <div>
                  <label className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Contact Email</label>
                  <input type="email" className="input" defaultValue="neuralai@dtu.ac.in" />
                </div>
                <div>
                  <label className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Founded Year</label>
                  <input type="text" className="input" defaultValue="2018" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <SectionHeader eyebrow="System" title="Academic Session" />
            <div style={{ marginTop: 'var(--space-4)' }}>
               <label className="text-2xs text-mono uppercase tracking-wider text-mist" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Current Active Session</label>
               <select className="select" defaultValue="2026-27">
                 <option>2026-27</option>
                 <option>2025-26</option>
                 <option>2024-25</option>
               </select>
               <p className="text-xs text-mist" style={{ marginTop: 'var(--space-2)' }}>
                 This affects the default view for events, projects, and recruitment cycles.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Just a quick placeholder icon since Building2 wasn't imported from lucide-react above
function Building2({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  );
}
