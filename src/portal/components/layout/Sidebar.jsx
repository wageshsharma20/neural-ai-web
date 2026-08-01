import React, { useState } from 'react';
import {
  LayoutDashboard, Users, CheckSquare, TrendingUp, FolderOpen,
  Calendar, Megaphone, FileText, Image, Trophy, BarChart2,
  Settings, User, ChevronLeft, Menu, Zap, LogOut,
  Building2, Activity,
} from 'lucide-react';
import { currentUser } from '../../data/mockData';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'people', label: 'People', icon: Users },
      { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: 23 },
      { id: 'team-progress', label: 'Team Progress', icon: TrendingUp },
      { id: 'projects', label: 'Projects', icon: FolderOpen },
      { id: 'events', label: 'Events', icon: Calendar },
      { id: 'recruitment', label: 'Recruitment', icon: Building2 },
    ],
  },
  {
    label: 'Content',
    items: [
      { id: 'notices', label: 'Notice Board', icon: Megaphone },
      { id: 'blogs', label: 'Blogs', icon: FileText },
      { id: 'gallery', label: 'Gallery', icon: Image },
      { id: 'achievements', label: 'Achievements', icon: Trophy },
    ],
  },
  {
    label: 'Insights',
    items: [
      { id: 'analytics', label: 'Analytics', icon: BarChart2 },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
      { id: 'health', label: 'Platform Health', icon: Activity },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];



export default function PortalSidebar({ activeModule, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`portal-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand__mark">
          <img src="/logo.png" alt="Neural AI" style={{ width: 18, height: 18, objectFit: 'contain' }} />
        </div>
        <div className="sidebar-brand__text">
          <div className="sidebar-brand__name">Neural AI</div>
          <div className="sidebar-brand__subtitle">Operations</div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setCollapsed((c) => !c)}
          style={{ marginLeft: 'auto', padding: '4px', minWidth: 0, border: 'none' }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <ChevronLeft
            size={14}
            style={{
              transform: collapsed ? 'rotate(180deg)' : 'none',
              transition: 'transform var(--transition-slow)',
            }}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav" aria-label="Portal navigation">
        {NAV_GROUPS.map((group) => (
          <div className="sidebar-nav__group" key={group.label}>
            <div className="sidebar-nav__group-label">{group.label}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  className={`sidebar-nav__item ${isActive ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="sidebar-nav__item-icon" size={16} />
                  <span className="sidebar-nav__item-label">{item.label}</span>
                  {item.badge && !collapsed && (
                    <span className="sidebar-nav__badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <button
          className="sidebar-user"
          onClick={() => onNavigate('profile')}
          title={collapsed ? currentUser.name : undefined}
        >
          <div className="sidebar-user__avatar">{currentUser.initials}</div>
          <div className="sidebar-user__info">
            <div className="sidebar-user__name">{currentUser.name}</div>
            <div className="sidebar-user__role">{currentUser.role}</div>
          </div>
        </button>

        {!collapsed ? (
          <button 
            className="btn btn-outline w-full"
            onClick={() => window.location.href = '/'}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '0 var(--space-4) var(--space-4) var(--space-4)', width: 'calc(100% - var(--space-8))', opacity: 0.8 }}
          >
            <LogOut size={14} /> Log Out
          </button>
        ) : (
          <button 
            className="btn btn-ghost"
            onClick={() => window.location.href = '/'}
            title="Log Out"
            style={{ margin: '0 auto var(--space-4) auto', padding: '8px', color: 'var(--mist)' }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}
