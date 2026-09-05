// RBAC Mock Data
export const rbacRoles = [
  { id: 'R-01', name: 'Super Admin', description: 'Full access to all modules and system settings.', users: 3, created: '2021-08-10', createdBy: 'System', color: 'violet' },
  { id: 'R-02', name: 'Head', description: 'Department lead with full operational access within their domain.', users: 8, created: '2022-09-01', createdBy: 'Arjun Sharma', color: 'cyan' },
  { id: 'R-03', name: 'Co-Head', description: 'Assists Head with execution and team management.', users: 15, created: '2022-09-01', createdBy: 'Arjun Sharma', color: 'amber' },
  { id: 'R-04', name: 'Member', description: 'Standard society member with read access and personal tasks.', users: 121, created: '2022-09-05', createdBy: 'Arjun Sharma', color: 'mist' },
  { id: 'R-05', name: 'Event Coordinator', description: 'Temporary role for managing specific events.', users: 5, created: '2025-10-12', createdBy: 'Priya Mehta', color: 'magenta', custom: true },
  { id: 'R-06', name: 'Content Editor', description: 'Manages blogs and notice board content.', users: 2, created: '2026-02-14', createdBy: 'Rahul Nair', color: 'cyan', custom: true },
];

export const rbacModules = [
  'Dashboard', 'People', 'Tasks', 'Projects', 'Events', 'Recruitment',
  'Notice Board', 'Blogs & Resources', 'Gallery', 'Achievements',
  'Contact Messages', 'Analytics', 'Platform Health', 'Settings', 'Roles & Permissions'
];

export const rbacPermissions = {
  'Super Admin': rbacModules.reduce((acc, mod) => ({ ...acc, [mod]: { view: true, create: true, edit: true, delete: true, publish: true, manage: true } }), {}),
  'Head': rbacModules.reduce((acc, mod) => {
    const isGlobal = ['Analytics', 'Platform Health', 'Roles & Permissions', 'Settings'].includes(mod);
    return { ...acc, [mod]: { view: !isGlobal, create: !isGlobal, edit: !isGlobal, delete: false, publish: !isGlobal, manage: !isGlobal } };
  }, {}),
  'Co-Head': rbacModules.reduce((acc, mod) => {
    const hasAccess = ['People', 'Tasks', 'Projects', 'Events', 'Blogs & Resources'].includes(mod);
    return { ...acc, [mod]: { view: hasAccess, create: hasAccess, edit: hasAccess, delete: false, publish: false, manage: false } };
  }, {}),
  'Member': rbacModules.reduce((acc, mod) => {
    const hasView = ['Dashboard', 'People', 'Tasks', 'Projects', 'Events', 'Blogs & Resources', 'Gallery'].includes(mod);
    return { ...acc, [mod]: { view: hasView, create: false, edit: false, delete: false, publish: false, manage: false } };
  }, {}),
};

export const rbacUsers = [
  { id: 'U-1', name: 'Arjun Sharma', email: 'arjun.sharma@dtu.ac.in', role: 'Super Admin', assigned: '2021-08-10', status: 'active', initials: 'AS' },
  { id: 'U-2', name: 'Priya Mehta', email: 'priya.mehta@dtu.ac.in', role: 'Super Admin', assigned: '2023-05-15', status: 'active', initials: 'PM' },
  { id: 'U-3', name: 'Rohan Gupta', email: 'rohan.gupta@dtu.ac.in', role: 'Head', assigned: '2024-08-20', status: 'active', initials: 'RG' },
  { id: 'U-4', name: 'Ananya Singh', email: 'ananya.s@dtu.ac.in', role: 'Co-Head', assigned: '2025-01-10', status: 'active', initials: 'AS' },
  { id: 'U-5', name: 'Kavya Desai', email: 'kavya.d@dtu.ac.in', role: 'Member', assigned: '2025-09-05', status: 'active', initials: 'KD' },
  { id: 'U-6', name: 'Rahul Nair', email: 'rahul.n@dtu.ac.in', role: 'Content Editor', assigned: '2026-03-01', status: 'active', initials: 'RN' },
];

export const rbacAuditLogs = [
  { id: 'AL-01', time: '2 hours ago', user: 'Arjun Sharma', action: 'Assigned Role', target: 'Rahul Nair', previous: 'Member', updated: 'Content Editor' },
  { id: 'AL-02', time: 'Yesterday', user: 'Priya Mehta', action: 'Modified Permissions', target: 'Content Editor', previous: 'Gallery (View)', updated: 'Gallery (Create, Edit)' },
  { id: 'AL-03', time: '2 days ago', user: 'System', action: 'Revoked Role', target: 'Ishita Sharma', previous: 'Event Coordinator', updated: 'Member' },
  { id: 'AL-04', time: '4 days ago', user: 'Arjun Sharma', action: 'Created Role', target: 'Content Editor', previous: '-', updated: '-' },
];
