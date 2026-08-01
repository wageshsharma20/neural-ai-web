import React, { useState, Suspense } from 'react';
import '../portal/portal.css'; // Global portal styles
import Sidebar from '../portal/components/layout/Sidebar';
import Topbar from '../portal/components/layout/Topbar';

// Eager load for smoother UX, since it's an app shell
import Dashboard from '../portal/modules/Dashboard';
import People from '../portal/modules/People';
import Tasks from '../portal/modules/Tasks';
import Projects from '../portal/modules/Projects';
import Events from '../portal/modules/Events';
import Recruitment from '../portal/modules/Recruitment';
import Notices from '../portal/modules/Notices';
import Blogs from '../portal/modules/Blogs';
import Gallery from '../portal/modules/Gallery';
import Achievements from '../portal/modules/Achievements';
import Analytics from '../portal/modules/Analytics';
import Calendar from '../portal/modules/Calendar';
import PlatformHealth from '../portal/modules/PlatformHealth';
import Profile from '../portal/modules/Profile';
import Settings from '../portal/modules/Settings';

const MODULES = {
  dashboard: Dashboard,
  people: People,
  tasks: Tasks,
  'team-progress': () => <div style={{ color: 'var(--mist)' }}>Team Progress Module (Under Construction)</div>,
  projects: Projects,
  events: Events,
  recruitment: Recruitment,
  notices: Notices,
  blogs: Blogs,
  gallery: Gallery,
  achievements: Achievements,
  analytics: Analytics,
  calendar: Calendar,
  health: PlatformHealth,
  profile: Profile,
  settings: Settings,
};

export default function PortalPage() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = MODULES[activeModule] || Dashboard;

  return (
    <div className="portal-root">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div style={{
        position: 'relative',
        zIndex: 100,
        transform: mobileMenuOpen ? 'translateX(0)' : undefined, // Simplistic mobile handling
        transition: 'transform var(--transition-base)'
      }} className="portal-sidebar-wrapper">
        <Sidebar activeModule={activeModule} onNavigate={(mod) => {
          setActiveModule(mod);
          setMobileMenuOpen(false);
        }} />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100dvh' }}>
        <Topbar activeModule={activeModule} onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        
        <main style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)', position: 'relative' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Suspense fallback={<div style={{ color: 'var(--mist)' }}>Loading module...</div>}>
              <ActiveComponent />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
