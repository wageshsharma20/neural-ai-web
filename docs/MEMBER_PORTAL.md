# MEMBER_PORTAL.md

# Neural AI Operations Platform

Version: 2.0

Status: UI Prototype

Project Type: Frontend Only

---

# 1. Overview

The Neural AI Operations Platform is the internal dashboard used to manage every aspect of the society.

It serves as the central workspace for society heads, coordinators and members to manage people, projects, events, tasks, notices, blogs, recruitment and internal operations.

This project is **UI only**.

No backend, authentication, APIs or database functionality is included.

All pages should use realistic mock data and demonstrate production-quality user interfaces.

---

# 2. Objective

Design a modern operations dashboard that feels comparable to professional management platforms like:

- Linear
- Jira
- Notion
- GitHub
- ClickUp
- Vercel Dashboard

The interface should be clean, modern, scalable and optimized for daily use.

---

# 3. RBAC Hierarchy

The system contains four user roles.

Super Admin

↓

Admin

↓

Core Team

↓

Member

The Super Admin has access to every module.

Other roles will later inherit the same interface with restricted permissions.

During development, only the Super Admin interface will be designed.

---

# 4. Layout

Shared Application Shell

- Left Sidebar
- Top Navigation
- Search
- Notifications
- User Menu
- Breadcrumbs
- Main Workspace

All modules should share the same layout.

---

# 5. Modules

The platform consists of the following modules.

## Dashboard

Purpose

Provide a complete overview of society activity.

Widgets

- Active Members
- Pending Tasks
- Completed Tasks
- Upcoming Events
- Active Projects
- Latest Notices
- Recent Activity
- Calendar
- Quick Actions

---

## People

Purpose

Manage the organization hierarchy.

Features

- Organization Tree
- Departments
- Heads
- Co-Heads
- Members
- Member Profiles
- Reporting Structure

Each profile contains

- Name
- Role
- Department
- Reports To
- Team Members
- Skills
- Assigned Tasks
- Performance Summary
- Contact Information

---

## Task Management

Purpose

Track and manage all work inside the society.

Views

- Kanban
- Table
- Calendar
- Timeline

Task Information

- Title
- Description
- Priority
- Status
- Due Date
- Assigned By
- Assigned To
- Progress
- Attachments
- Comments

Task Status

- To Do
- In Progress
- Under Review
- Completed
- Blocked

Tasks may be assigned to

- Individual Members
- Multiple Members
- Entire Departments

---

## Team Progress

Purpose

Monitor progress of every department.

Each Head should be able to view

- Pending Tasks
- Completed Tasks
- Overdue Tasks
- Active Projects
- Team Performance
- Individual Progress

Super Admin can view every department.

---

## Projects

Manage all society projects.

Each project includes

- Cover Image
- Description
- Team
- Timeline
- Status
- Technologies
- Repository
- Demo
- Documentation

---

## Events

Manage society events.

Features

- Upcoming Events
- Past Events
- Draft Events
- Volunteers
- Event Timeline
- Sponsors
- Budget
- Gallery

---

## Recruitment

Manage recruitment cycles.

Contains

- Recruitment Status
- Applications
- Timeline
- Interview Stages
- Selected Members
- Rejected Members

---

## Notice Board

Acts as the CMS for public notices.

Create

Edit

Delete

Publish

Featured Notice

Publishing a notice updates the Public Website (UI Demonstration Only).

---

## Blogs & Resources

CMS for educational content.

Features

- Drafts
- Published Blogs
- Categories
- Resources
- Featured Articles
- Preview

Publishing updates the Public Website (UI Demonstration Only).

---

## Gallery

Media Management

Albums

Images

Videos

Tags

Featured Gallery

Publishing updates the Public Website (UI Demonstration Only).

---

## Achievements

Manage

- Awards
- Competitions
- Research Papers
- Placements
- Hall of Fame

Publishing updates the Public Website (UI Demonstration Only).

---

## Analytics

Overview

- Member Growth
- Task Completion
- Event Participation
- Recruitment Statistics
- Projects
- Blog Engagement

Charts use mock data.

---

## Calendar

Unified Calendar

Displays

- Events
- Meetings
- Deadlines
- Recruitment Timeline
- Tasks

---

## Settings

Manage

- Society Information
- Branding
- Departments
- Academic Session
- Theme
- Preferences

UI only.

---

## Profile

Contains

- Avatar
- Name
- Role
- Department
- Skills
- Bio
- Contact Information
- Personal Statistics

---

# 6. Public Website Integration

The Operations Platform acts as the content management interface for the public website.

Changes made in these modules should conceptually update the public website.

Modules

- Notice Board
- Events
- Blogs
- Gallery
- Achievements
- Recruitment

This interaction is represented only through the interface.

No backend functionality is implemented.

---

# 7. Design Principles

The platform should feel like a premium internal product.

Characteristics

- Minimal
- Professional
- Fast
- Structured
- Content First
- Dark Theme
- Accessible

Inspired by

- Linear
- GitHub
- Notion
- Vercel Dashboard
- Atlassian
- ClickUp

Avoid

- Excessive gradients
- Heavy glassmorphism
- Decorative dashboards
- Visual clutter

---

# 8. UI Components

Reusable components

- Sidebar
- Header
- Cards
- KPI Cards
- Data Tables
- Charts
- Kanban Boards
- Dialogs
- Drawers
- Forms
- Modals
- Avatars
- Activity Feed
- Calendar
- Notifications
- Empty States
- Loading States

---

# 9. Technical Scope

Frontend Only

Framework

- React.js

Routing

- React Router

Styling

- Tailwind CSS

Components

- shadcn/ui

Icons

- Lucide React

Charts

- Recharts

Animations

- Framer Motion

State Management

- React Context / Zustand

No backend implementation.

All data is static.

No authentication.

No API calls.

No database.

No role validation.

No persistence.

---

# 10. Future Scope

- Backend Integration
- Authentication
- Real RBAC
- Database
- Notifications
- Attendance
- AI Assistant
- Internal Messaging
- Task Automation
- File Storage
- Analytics Engine

---

# End of Document