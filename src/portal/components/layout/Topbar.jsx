import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';
import { notifications } from '../../data/mockData';

const MODULE_LABELS = {
  dashboard: 'Dashboard',
  people: 'People',
  tasks: 'Tasks',
  'team-progress': 'Team Progress',
  projects: 'Projects',
  events: 'Events',
  recruitment: 'Recruitment',
  notices: 'Notice Board',
  blogs: 'Blogs',
  gallery: 'Gallery',
  achievements: 'Achievements',
  analytics: 'Analytics',
  calendar: 'Calendar',
  profile: 'Profile',
  settings: 'Settings',
};

export default function PortalTopbar({ activeModule, onMobileMenuToggle }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="portal-topbar" role="banner">
      {/* Mobile menu toggle */}
      <button
        className="topbar-toggle"
        onClick={onMobileMenuToggle}
        aria-label="Toggle menu"
      >
        <Menu size={16} />
      </button>

      {/* Breadcrumb */}
      <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
        <span>Neural AI</span>
        <span className="topbar-breadcrumb__sep">/</span>
        <span className="topbar-breadcrumb__current">{MODULE_LABELS[activeModule] || 'Portal'}</span>
      </nav>

      {/* Search */}
      <div className="topbar-search" role="search">
        <Search className="topbar-search__icon" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search anything…"
          aria-label="Search portal"
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            color: 'var(--mist)',
            background: 'var(--surface-3)',
            padding: '1px 6px',
            borderRadius: 'var(--radius-sm)',
            whiteSpace: 'nowrap',
          }}
        >
          ⌘K
        </span>
      </div>

      {/* Actions */}
      <div className="topbar-actions" style={{ position: 'relative' }} ref={notifRef}>
        <button
          className="topbar-icon-btn"
          onClick={() => setNotifOpen((v) => !v)}
          aria-label={`Notifications — ${unreadCount} unread`}
          aria-expanded={notifOpen}
        >
          <Bell size={15} />
          {unreadCount > 0 && <span className="topbar-icon-btn__badge" aria-hidden="true" />}
        </button>

        {/* Notification dropdown */}
        {notifOpen && (
          <div className="notif-panel" role="dialog" aria-label="Notifications">
            <div className="notif-panel__header">
              <span className="notif-panel__title">Notifications</span>
              <button
                className="btn btn-ghost btn-sm"
                style={{ padding: '2px 6px', fontSize: 'var(--text-2xs)' }}
                onClick={() => setNotifOpen(false)}
              >
                Mark all read
              </button>
            </div>
            {notifications.map((n) => (
              <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                <div className="notif-item__title">{n.title}</div>
                <div className="notif-item__msg">{n.message}</div>
                <div className="notif-item__time">{n.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
