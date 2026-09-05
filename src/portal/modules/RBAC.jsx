import React, { useState } from 'react';
import './RBAC.css';
import {
  Shield, Users, Plus, Edit, Copy, Trash2, Search, Settings, 
  History, ArrowRight, UserPlus, CheckSquare, XSquare
} from 'lucide-react';
import { rbacRoles, rbacModules, rbacPermissions, rbacUsers, rbacAuditLogs } from '../data/rbacMockData';
import { SectionHeader, KpiCard, Avatar } from '../components/shared/Primitives';

// Switch Component
const ToggleSwitch = ({ checked, onChange, disabled }) => (
  <label className="rbac-switch">
    <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
    <span className="rbac-switch-slider"></span>
  </label>
);

export default function RBAC() {
  const [activeRoleId, setActiveRoleId] = useState(rbacRoles[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('permissions'); // 'permissions', 'users', 'audit'

  const activeRole = rbacRoles.find(r => r.id === activeRoleId) || rbacRoles[0];
  const rolePermissions = rbacPermissions[activeRole.name] || {};
  const roleUsers = rbacUsers.filter(u => u.role === activeRole.name);

  // Stats
  const totalRoles = rbacRoles.length;
  const totalUsers = rbacUsers.length;
  const customRoles = rbacRoles.filter(r => r.custom).length;
  const permissionChanges = rbacAuditLogs.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Access Management</p>
          <h1 className="page-header__title">Roles & Permissions</h1>
          <p className="page-header__desc">Manage society hierarchy, configure granular permissions, and oversee platform access.</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm">
            <Plus size={14} /> Create Role
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid">
        <KpiCard label="Total Roles" value={totalRoles} delta="System & Custom" icon={Shield} iconColor="violet" />
        <KpiCard label="Total Users" value={totalUsers} delta="Across all roles" icon={Users} iconColor="cyan" />
        <KpiCard label="Custom Roles" value={customRoles} delta="User-defined" icon={Settings} iconColor="amber" />
        <KpiCard label="Permission Updates" value={permissionChanges} delta="Recent activity" icon={History} iconColor="magenta" />
      </div>

      {/* Main Layout */}
      <div className="rbac-layout">
        
        {/* Left Sidebar - Roles List */}
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <SectionHeader eyebrow="Hierarchy" title="Roles" />
          
          <div className="topbar-search" style={{ marginBottom: 'var(--space-4)', width: '100%' }}>
            <Search className="topbar-search__icon" />
            <input 
              type="search" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="rbac-sidebar">
            {rbacRoles
              .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(role => (
              <button 
                key={role.id}
                className={`rbac-role-btn ${activeRoleId === role.id ? 'active' : ''}`}
                onClick={() => setActiveRoleId(role.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ 
                    width: 8, height: 8, borderRadius: '50%', 
                    background: `var(--signal-${role.color})` 
                  }} />
                  {role.name}
                </div>
                <span className="text-2xs text-mono">{role.users}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Role Details */}
        <div className="card" style={{ padding: 0 }}>
          
          {/* Role Header */}
          <div style={{ padding: 'var(--space-5)', borderBottom: '1px solid var(--surface-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--bone)', fontFamily: 'var(--font-display)' }}>
                    {activeRole.name}
                  </h2>
                  {activeRole.custom && (
                    <span className="badge badge-member" style={{ fontSize: 'var(--text-2xs)' }}>Custom</span>
                  )}
                </div>
                <p style={{ color: 'var(--mist)', fontSize: 'var(--text-sm)', maxWidth: 600 }}>
                  {activeRole.description}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--mist)' }}>
                  <span>CREATED: {activeRole.created}</span>
                  <span>BY: {activeRole.createdBy}</span>
                </div>
              </div>

              {/* Role Actions */}
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button className="btn btn-ghost btn-sm" title="Edit Role"><Edit size={14} /></button>
                <button className="btn btn-ghost btn-sm" title="Clone Role"><Copy size={14} /></button>
                <button className="btn btn-ghost btn-sm" title="Delete Role" disabled={!activeRole.custom} style={{ opacity: !activeRole.custom ? 0.5 : 1 }}>
                  <Trash2 size={14} color={activeRole.custom ? 'var(--signal-magenta)' : 'var(--mist)'} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ padding: '0 var(--space-5)', borderBottom: '1px solid var(--surface-border)', display: 'flex', gap: 'var(--space-4)' }}>
            {['permissions', 'users', 'audit'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: 'var(--space-3) 0',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: activeTab === tab ? 'var(--bone)' : 'var(--mist)',
                  borderBottom: `2px solid ${activeTab === tab ? 'var(--signal-violet)' : 'transparent'}`,
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content: Permissions */}
          {activeTab === 'permissions' && (
            <div style={{ overflowX: 'auto' }}>
              <table className="rbac-matrix">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>View</th>
                    <th>Create</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Publish</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {rbacModules.map(module => {
                    const perms = rolePermissions[module] || { view: false, create: false, edit: false, delete: false, publish: false, manage: false };
                    return (
                      <tr key={module}>
                        <td className="rbac-matrix-module">{module}</td>
                        <td><ToggleSwitch checked={perms.view} onChange={() => {}} disabled={activeRole.name === 'Super Admin'} /></td>
                        <td><ToggleSwitch checked={perms.create} onChange={() => {}} disabled={activeRole.name === 'Super Admin'} /></td>
                        <td><ToggleSwitch checked={perms.edit} onChange={() => {}} disabled={activeRole.name === 'Super Admin'} /></td>
                        <td><ToggleSwitch checked={perms.delete} onChange={() => {}} disabled={activeRole.name === 'Super Admin'} /></td>
                        <td><ToggleSwitch checked={perms.publish} onChange={() => {}} disabled={activeRole.name === 'Super Admin'} /></td>
                        <td><ToggleSwitch checked={perms.manage} onChange={() => {}} disabled={activeRole.name === 'Super Admin'} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'flex-end' }}>
                 <button className="btn btn-secondary btn-sm" disabled={activeRole.name === 'Super Admin'}>Save Changes</button>
              </div>
            </div>
          )}

          {/* Tab Content: Users */}
          {activeTab === 'users' && (
            <div>
              <div style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mist)' }}>{roleUsers.length} users assigned to this role</span>
                <button className="btn btn-secondary btn-sm"><UserPlus size={14} /> Assign Users</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="rbac-user-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Assigned On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleUsers.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--mist)' }}>
                          No users assigned to this role.
                        </td>
                      </tr>
                    ) : (
                      roleUsers.map(u => (
                        <tr key={u.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                              <Avatar initials={u.initials} size="sm" colorIndex={1} />
                              <span style={{ color: 'var(--bone)' }}>{u.name}</span>
                            </div>
                          </td>
                          <td style={{ color: 'var(--mist)' }}>{u.email}</td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--mist)' }}>{u.assigned}</td>
                          <td>
                            <span className="badge badge-member" style={{ fontSize: 'var(--text-2xs)' }}>{u.status}</span>
                          </td>
                          <td>
                            <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }}>Change</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: Audit Log */}
          {activeTab === 'audit' && (
            <div style={{ padding: 'var(--space-5)' }}>
              <div className="rbac-audit-log">
                {rbacAuditLogs.map(log => (
                  <div key={log.id} className="rbac-audit-item">
                    <div className="rbac-audit-time">{log.time}</div>
                    <div className="rbac-audit-content">
                      <div className="rbac-audit-title">
                        <span style={{ color: 'var(--signal-cyan)' }}>{log.user}</span> {log.action.toLowerCase()} for <strong>{log.target}</strong>
                      </div>
                      <div className="rbac-audit-detail">
                        {log.previous} <ArrowRight size={10} style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} /> {log.updated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
