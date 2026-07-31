import React from 'react';
import { Mail, Briefcase, Calendar, MapPin, Edit2, Shield } from 'lucide-react';
import { currentUser } from '../data/mockData';
import { SectionHeader, RoleBadge, TagList } from '../components/shared/Primitives';

export default function ProfileModule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Account</p>
          <h1 className="page-header__title">Profile</h1>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-secondary btn-sm"><Edit2 size={14} /> Edit Profile</button>
        </div>
      </div>

      <div className="profile-hero">
        <div className="avatar avatar-xl avatar-magenta" style={{ width: 100, height: 100, fontSize: 'var(--text-xl)' }}>
          {currentUser.initials}
        </div>
        
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 500, color: 'var(--bone)', marginBottom: 'var(--space-1)' }}>
            {currentUser.name}
          </h2>
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-4)' }}>
            <span className="text-sm text-mist">{currentUser.email}</span>
          </div>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mist)', lineHeight: 1.6, maxWidth: 600 }}>
            {currentUser.bio}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', minWidth: 200 }}>
          <div className="flex items-center gap-2 text-sm text-mist">
            <Mail size={14} /> {currentUser.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-mist">
            <Briefcase size={14} /> {currentUser.rollNumber}
          </div>
          <div className="flex items-center gap-2 text-sm text-mist">
            <Calendar size={14} /> Joined {currentUser.joined}
          </div>
          <div className="flex items-center gap-2 text-sm text-mist">
            <MapPin size={14} /> {currentUser.location}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <SectionHeader eyebrow="Expertise" title="Skills & Technologies" />
          <div style={{ marginTop: 'var(--space-4)' }}>
            <TagList tags={currentUser.skills} />
          </div>
        </div>

        <div className="card">
          <SectionHeader eyebrow="Security" title="Access Level" />
          <div style={{ marginTop: 'var(--space-4)' }}>
             <div className="flex items-start gap-3">
               <div style={{ color: 'var(--signal-magenta)' }}><Shield size={20} /></div>
               <div>
                 <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--bone)' }}>Super Admin Access</p>
                 <p className="text-xs text-mist" style={{ marginTop: 2 }}>
                   You have full access to all society operations, member management, and configurations.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
