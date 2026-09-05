import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';
import { notificationsAPI } from '../../../services/api';

const MODULE_LABELS = {
  dashboard: 'Dashboard',
  people: 'People',
  tasks: 'Tasks',

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
  rbac: 'Roles & Permissions',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-IN');
}

export default function PortalTopbar({ activeModule, onMobileMenuToggle }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const { data: notifData, refetch: refetchNotifs } = useApi(() => notificationsAPI.getAll());
  const notifications = notifData?.data?.notifications || [];
  const unreadCount = notifData?.data?.unreadCount || 0;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationsAPI.markAllRead();
      refetchNotifs();
    } catch (err) {
      console.error('Mark all read failed:', err.message);
    }
  };

  const handleClickNotif = async (id) => {
    try {
      await notificationsAPI.markRead(id);
      refetchNotifs();
    } catch (err) {
      console.error('Mark read failed:', err.message);
    }
  };

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
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
              >
                Mark all read
              </button>
            </div>
            {notifications.length === 0 && (
              <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--mist)' }}>No notifications yet</p>
              </div>
            )}
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`notif-item ${!n.read ? 'unread' : ''}`}
                onClick={() => handleClickNotif(n._id)}
              >
                <div className="notif-item__title">{n.title}</div>
                <div className="notif-item__msg">{n.message}</div>
                <div className="notif-item__time">{timeAgo(n.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
